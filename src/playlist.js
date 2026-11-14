import { createMediaRecovery } from "./media-recovery.js";
const recordKey = (record) => `${record.id}:${record.tokenId}`;
const recordEndpoint = (record) =>
  "/api/nft/" +
  record.id +
  (record.playToken ? "?token=" + encodeURIComponent(record.playToken) : "");
export function createPlaylist({ records, imageURL, beforePlay, escape }) {
  const root = document.createElement("section");
  root.className = "collection-player";
  root.hidden = true;
  root.setAttribute("aria-label", "Collection player");
  root.innerHTML = `<div class="player-expanded" hidden><div class="queue-heading"><h2>Up next</h2><span class="queue-count"></span><button data-action="fullscreen" hidden disabled aria-label="Watch video fullscreen">Full screen ⛶</button><button data-action="expand" aria-label="Collapse queue">⌄</button></div><div class="playlist-screen"></div><ol class="playlist-queue"></ol></div><div class="player-dock"><img class="player-cover" alt=""><div class="player-track"><strong></strong><span></span><small role="status"></small></div><div class="player-controls"><button data-action="previous" aria-label="Previous recording">⏮</button><button data-action="toggle" class="player-toggle" aria-label="Pause collection">Ⅱ</button><button data-action="next" aria-label="Next recording">⏭</button><button data-action="shuffle" aria-label="Shuffle queue" aria-pressed="false">⇄</button><button data-action="expand" aria-label="Show queue" aria-expanded="false">Queue</button><button data-action="close" aria-label="Stop and close player">×</button></div><input class="playlist-seek" type="range" min="0" max="100" value="0" step="0.1" aria-label="Seek recording" disabled></div>`;
  root.querySelector(".player-cover").addEventListener("error", (event) => {
    event.currentTarget.hidden = true;
  });
  document.body.append(root);
  let order = [...records],
    index = 0,
    media,
    recovery,
    controller,
    timer,
    transition,
    request = 0,
    wanted = false,
    shuffle = false,
    failures = 0,
    started = false;
  let upcoming = null;
  function discardUpcoming() {
    if (!upcoming) return;
    upcoming.controller.abort();
    if (upcoming.element) {
      upcoming.element.removeAttribute("src");
      upcoming.element.load();
      upcoming.element.remove();
    }
    upcoming = null;
  }
  function prepareNext() {
    const record = order[index + 1];
    if (!record || !wanted || root.hidden) {
      discardUpcoming();
      return;
    }
    if (upcoming?.id === recordKey(record)) return;
    discardUpcoming();
    const slot = {
      id: recordKey(record),
      controller: new AbortController(),
      element: null,
      adopted: false,
    };
    upcoming = slot;
    slot.promise = (async () => {
      try {
        const response = await fetch(recordEndpoint(record), {
          signal: AbortSignal.any([
            slot.controller.signal,
            AbortSignal.timeout(20000),
          ]),
        });
        const data = await response.json();
        if (slot.controller.signal.aborted || data.status !== "live")
          return null;
        const element = document.createElement(
          record.kind === "video" ? "video" : "audio",
        );
        element.preload = "auto";
        element.playsInline = true;
        element.src = data.mediaURL;
        if (data.imageURL && record.kind === "video")
          element.poster = data.imageURL;
        slot.element = element;
        // Download silently; this exact element is promoted, preserving its buffer.
        if (!slot.adopted) {
          element.hidden = true;
          element.className = "playlist-preload";
          root.append(element);
        }
        element.load();
        return { data, element };
      } catch {
        return null;
      }
    })();
  }
  const q = (selector) => root.querySelector(selector);
  const buttons = (action) =>
    root.querySelectorAll(`[data-action="${action}"]`);
  function setExpanded(open) {
    q(".player-expanded").hidden = !open;
    const button = q('.player-controls [data-action="expand"]');
    button.setAttribute("aria-expanded", String(open));
    button.textContent = open
      ? "Minimize"
      : root.classList.contains("watching-video")
        ? "Watch video"
        : "Queue";
    if (open) q(".player-expanded").scrollTop = 0;
  }
  function status(text) {
    q('[role="status"]').textContent = text;
  }
  function toggleState() {
    document.dispatchEvent(
      new CustomEvent("collection-playback", {
        detail: { id: order[index]?.id, playing: wanted },
      }),
    );
    const button = q('[data-action="toggle"]');
    button.textContent = wanted ? "Ⅱ" : "▶";
    button.setAttribute(
      "aria-label",
      wanted ? "Pause collection" : "Play collection",
    );
  }
  function queue() {
    q(".queue-count").textContent = `${index + 1} / ${order.length} recordings`;
    q(".playlist-queue").innerHTML = order
      .map(
        (r, i) =>
          `<li><button data-index="${i}" ${i === index ? 'aria-current="true"' : ""}><span>${String(i + 1).padStart(2, "0")}</span><span><strong>${escape(r.title)}</strong><small>${escape(r.artist)}${r.kind === "video" ? " · Video" : ""}</small></span>${i === index ? '<span aria-hidden="true">●</span>' : ""}</button></li>`,
      )
      .join("");
    q('[data-action="previous"]').disabled = index === 0;
    q('[data-action="next"]').disabled = index === order.length - 1;
  }
  function release() {
    recovery?.dispose();
    recovery = null;
    request++;
    controller?.abort();
    clearTimeout(timer);
    clearTimeout(transition);
    if (media) {
      media.pause();
      media.removeAttribute("src");
      media.load();
      media.remove();
      media = null;
    }
    q(".playlist-seek").disabled = true;
    q(".playlist-seek").value = "0";
  }
  function pause() {
    clearTimeout(timer);
    wanted = false;
    media?.pause();
    clearTimeout(transition);
    toggleState();
  }
  function close() {
    discardUpcoming();
    pause();
    release();
    root.hidden = true;
    document.body.classList.remove("has-collection-player");
  }
  async function playAt(position, continueFailures = false) {
    const prepared =
      upcoming?.id === recordKey(order[position]) ? upcoming : null;
    if (prepared) {
      prepared.adopted = true;
      upcoming = null;
    } else discardUpcoming();
    release();
    const generation = request;
    if (!continueFailures) failures = 0;
    index = position;
    wanted = true;
    started = true;
    beforePlay();
    root.hidden = false;
    document.body.classList.add("has-collection-player");
    const record = order[index];
    const wasVideo = root.classList.contains("watching-video");
    const isVideo = record.kind === "video";
    root.classList.toggle("watching-video", isVideo);
    q(".queue-heading h2").textContent = isVideo ? "Now watching" : "Up next";
    q('[data-action="fullscreen"]').hidden = !isVideo;
    q('[data-action="fullscreen"]').disabled = true;
    if (isVideo || wasVideo) setExpanded(isVideo);
    q(".player-track strong").textContent = record.title;
    q(".player-track > span").textContent = record.artist;
    const cover = imageURL(record.imageURI, record);
    q(".player-cover").hidden = !cover;
    if (cover) q(".player-cover").src = cover;
    status("Loading original recording…");
    toggleState();
    queue();
    controller = prepared?.controller || new AbortController();
    let failed = false;
    const unavailable = () => {
      if (request !== generation || failed) return;
      failed = true;
      clearTimeout(timer);
      media?.pause();
      failures++;
      wanted = false;
      toggleState();
      status(
        "Playback stopped: this recording could not load. Press play to retry, or skip when you’re ready.",
      );
    };
    timer = setTimeout(() => {
      controller.abort();
      unavailable();
    }, 25000);
    try {
      const warmed = prepared ? await prepared.promise : null;
      if (request !== generation) return;
      let data = warmed?.data;
      if (!data) {
        const response = await fetch(recordEndpoint(record), {
          signal: controller.signal,
        });
        data = await response.json();
      }
      if (request !== generation) return;
      if (data.status !== "live") throw Error("unavailable");
      media =
        warmed?.element ||
        document.createElement(record.kind === "video" ? "video" : "audio");
      const current = media;
      media.hidden = false;
      media.classList.remove("playlist-preload");
      if (!warmed) {
        media.preload = "auto";
        media.playsInline = true;
        media.src = data.mediaURL;
        if (data.imageURL && record.kind === "video")
          media.poster = data.imageURL;
      }
      if (record.kind === "video") media.controls = true;
      q(".playlist-screen").append(media);
      q('[data-action="fullscreen"]').disabled = record.kind !== "video";
      recovery = createMediaRecovery(current, {
        originalURL: data.mediaURL,
        shouldPlay: () => wanted && request === generation,
        onSwitch: () =>
          status("Trying another gateway for the same recording…"),
        onExhausted: unavailable,
      });
      media.addEventListener("waiting", () => {
        if (request !== generation || !wanted) return;
        status("Buffering the original recording…");
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (request === generation && wanted) recovery.recover(current.src);
        }, 8000);
      });
      media.addEventListener("playing", () => {
        if (request !== generation) return;
        clearTimeout(timer);
        failures = 0;
        prepareNext();
        status(record.kind === "video" ? "Video playing" : "");
      });
      q(".playlist-seek").disabled = !Number.isFinite(current.duration);
      media.addEventListener("loadedmetadata", () => {
        if (request === generation)
          q(".playlist-seek").disabled = !Number.isFinite(current.duration);
      });
      media.addEventListener("timeupdate", () => {
        if (request === generation && current.duration)
          q(".playlist-seek").value = String(
            (current.currentTime / current.duration) * 100,
          );
      });
      media.addEventListener("ended", () => {
        if (request !== generation) return;
        if (index + 1 < order.length) playAt(index + 1);
        else {
          wanted = false;
          toggleState();
          status("End of the collection. Press play to hear it again.");
        }
      });
      if (wanted) {
        try {
          await media.play();
        } catch (error) {
          if (request !== generation) return;
          if (error.name === "NotAllowedError") {
            clearTimeout(timer);
            wanted = false;
            toggleState();
            status("Press play to start listening.");
          } else if (error.name !== "AbortError")
            recovery.recover(data.mediaURL);
        }
      } else {
        clearTimeout(timer);
        status("Paused");
      }
    } catch {
      unavailable();
    }
  }
  async function toggle() {
    if (wanted) {
      pause();
      status("Paused");
      return;
    }
    beforePlay();
    wanted = true;
    toggleState();
    if (!media || media.error) {
      playAt(index);
      return;
    }
    if (media.ended && index === order.length - 1) {
      playAt(0);
      return;
    }
    try {
      await media.play();
      status("");
    } catch {
      wanted = false;
      toggleState();
      status("Unable to play. Choose another recording.");
    }
  }
  root.addEventListener("click", (event) => {
    const item = event.target.closest("[data-index]");
    if (item) {
      playAt(Number(item.dataset.index));
      return;
    }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "toggle") toggle();
    if (action === "close") close();
    if (action === "next" && index + 1 < order.length) playAt(index + 1);
    if (action === "previous" && index > 0) playAt(index - 1);
    if (action === "expand") {
      setExpanded(q(".player-expanded").hidden);
    }
    if (action === "fullscreen" && media?.tagName === "VIDEO") {
      if (media.requestFullscreen)
        media
          .requestFullscreen()
          .catch(() =>
            status(
              "Fullscreen could not open. Use the video’s controls to try again.",
            ),
          );
      else if (media.webkitEnterFullscreen) media.webkitEnterFullscreen();
      else
        status(
          "Fullscreen is not available in this browser. The expanded video remains playable here.",
        );
    }
    if (action === "shuffle") {
      shuffle = !shuffle;
      const rest = order.slice(index + 1);
      if (shuffle)
        for (let i = rest.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [rest[i], rest[j]] = [rest[j], rest[i]];
        }
      else rest.sort((a, b) => records.indexOf(a) - records.indexOf(b));
      order = [...order.slice(0, index + 1), ...rest];
      buttons("shuffle").forEach((b) =>
        b.setAttribute("aria-pressed", String(shuffle)),
      );
      queue();
      prepareNext();
    }
  });
  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !q(".player-expanded").hidden) {
      q(".player-expanded").hidden = true;
      const b = q('.player-controls [data-action="expand"]');
      b.textContent = "Queue";
      b.setAttribute("aria-expanded", "false");
      b.focus();
    }
  });
  q(".playlist-seek").addEventListener("input", (event) => {
    if (media && Number.isFinite(media.duration))
      media.currentTime = (media.duration * Number(event.target.value)) / 100;
  });
  return {
    pause,
    close,
    play: (record) => {
      if (!root.hidden && recordKey(order[index]) === recordKey(record)) {
        toggle();
        return;
      }
      order = [
        record,
        ...records.filter((r) => recordKey(r) !== recordKey(record)),
      ];
      playAt(0);
    },
    enqueue: (record) => {
      if (root.hidden) {
        order = [record];
        index = 0;
        started = true;
        wanted = false;
        root.hidden = false;
        document.body.classList.add("has-collection-player");
        q(".player-track strong").textContent = record.title;
        q(".player-track > span").textContent = record.artist;
        const cover = imageURL(record.imageURI, record);
        q(".player-cover").hidden = !cover;
        if (cover) q(".player-cover").src = cover;
        toggleState();
        queue();
        status("Queued. Press play when ready.");
        return;
      }
      // Move an already scheduled recording next without restarting current playback.
      if (recordKey(order[index]) === recordKey(record)) {
        status("This recording is already selected.");
        return;
      }
      order = [
        ...order.slice(0, index + 1),
        record,
        ...order
          .slice(index + 1)
          .filter((r) => recordKey(r) !== recordKey(record)),
      ];
      queue();
      prepareNext();
      status(`${record.title} added next`);
    },
    start: () => {
      if (started && !root.hidden) {
        if (!wanted) toggle();
      } else {
        order = [...records];
        playAt(0);
      }
    },
  };
}
