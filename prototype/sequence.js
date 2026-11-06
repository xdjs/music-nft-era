import {
  buildDocumentary,
  chapterList,
  extraChapters,
  contextHTML,
} from "/sequence/documentary.js";
buildDocumentary();
import { createLibrary } from "/sequence/library.js";
import { sources, people } from "/src/data.js";
import { createMediaRecovery } from "/src/media-recovery.js";
const $ = (s) => document.querySelector(s),
  clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
const escape = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const video = $("#performance"),
  audio = new Audio(),
  stage = $(".stage"),
  beats = [...document.querySelectorAll(".beat")];
const reducedQuery = matchMedia("(prefers-reduced-motion:reduce)");
let reduced = reducedQuery.matches,
  scene = 0,
  frame = false,
  active = video,
  origin,
  loading = false,
  userPaused = false,
  userInteracted = false;
audio.hidden = true;
audio.preload = "none";
document.body.append(audio);
video.addEventListener(
  "loadedmetadata",
  () => {
    if (video.duration > 8) video.currentTime = 8;
  },
  { once: true },
);
let library;
const loads = new Map(),
  recoveries = new Map();
function status(s) {
  $("#status").textContent = s;
}
async function load(id, media) {
  if (loads.has(id)) return loads.get(id);
  const promise = (async () => {
    const response = await fetch("/api/nft/" + id, {
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok)
      throw Error("The recording could not be reached. Try again.");
    const data = await response.json();
    if (data.status !== "live" || !data.mediaURL)
      throw Error(
        "Original media is unavailable. The source notes are still accessible.",
      );
    media.src = data.mediaURL;
    media.preload = "metadata";
    recoveries.get(media)?.dispose();
    recoveries.set(
      media,
      createMediaRecovery(media, {
        originalURL: data.mediaURL,
        shouldPlay: () => active === media && !userPaused,
        onSwitch: () =>
          status("Trying the same original file through another gateway…"),
        onExhausted: () => {
          status(
            "Original media could not load. Press play to retry, or explore its source.",
          );
          loads.delete(id);
          if (media === video) document.body.classList.add("media-failed");
        },
      }),
    );
    return data;
  })();
  loads.set(id, promise);
  try {
    return await promise;
  } catch (e) {
    loads.delete(id);
    throw e;
  }
}
function updateControls() {
  const playing = !active.paused;
  $("#pause").textContent = playing ? "Pause" : "Play";
  $("#pause").setAttribute(
    "aria-label",
    playing ? "Pause playback" : "Play recording",
  );
  $("#sound").textContent = active.muted ? "Sound off" : "Sound on";
  $("#sound").setAttribute(
    "aria-label",
    active.muted ? "Turn sound on" : "Mute sound",
  );
  $("#now-label").textContent =
    active === video ? "Iman Europe · MWWM" : "CAMPFIRE · Miami Freestyle";
  $("#play-record").textContent = active === audio && !audio.paused ? "Ⅱ" : "▶";
  $("#play-record").setAttribute(
    "aria-label",
    active === audio && !audio.paused
      ? "Pause Miami Freestyle"
      : "Play Miami Freestyle",
  );
}
for (const media of [video, audio]) {
  media.addEventListener("play", () => {
    if (media === video) audio.pause();
    else video.pause();
    active = media;
    updateControls();
  });
  media.addEventListener("pause", updateControls);
  media.addEventListener("playing", () => {
    status("");
    document.body.classList.remove("media-failed");
  });
  media.addEventListener("waiting", () => {
    if (active === media) status("Buffering the original recording…");
  });
  media.addEventListener("ended", updateControls);
}
async function play(media, { muted = false } = {}) {
  if (loading) return;
  loading = true;
  userInteracted = true;
  library?.pause();
  status("Loading the original recording…");
  active.pause();
  active = media;
  userPaused = false;
  media.muted = muted;
  try {
    await load(media === video ? "record-1e31c103" : "record-69c77ef0", media);
    if (userPaused) return;
    await media.play();
  } catch (e) {
    if (e.name === "AbortError" && userPaused) status("");
    else
      status(
        e.name === "NotAllowedError"
          ? "Press play when you’re ready."
          : "The original recording could not start. Press play to retry; sources remain available.",
      );
  } finally {
    loading = false;
    updateControls();
  }
}
$("#play-record").onclick = () => {
  if (active === audio && !audio.paused) {
    userPaused = true;
    audio.pause();
  } else play(audio);
};
$("#pause").onclick = () => {
  if (!active.paused) {
    userPaused = true;
    active.pause();
  } else play(active, { muted: active.muted });
};
$("#sound").onclick = () => {
  userInteracted = true;
  if (active.paused) play(active, { muted: false });
  else {
    active.muted = !active.muted;
    updateControls();
  }
};
function setReduced(value) {
  reduced = value;
  document.body.classList.toggle("motion-reduced", reduced);
  $("#motion").setAttribute("aria-pressed", String(reduced));
  $("#motion").textContent = reduced ? "Motion reduced" : "Reduce motion";
  if (reduced) {
    userPaused = true;
    video.pause();
  }
  schedule();
}
$("#motion").onclick = () => setReduced(!reduced);
reducedQuery.addEventListener("change", (e) => setReduced(e.matches));
setReduced(reduced);
// Each camera position is a different scale of the same documented artifacts.
function keyframes(mobile) {
  return mobile
    ? [
        {
          fx: 0,
          fy: 0,
          fs: 1,
          fo: 1,
          fc: 0,
          v: 1,
          sx: 0,
          sy: 0,
          ss: 0.7,
          so: 0,
          sr: 10,
          po: 0,
          py: 60,
          no: 0,
          ny: 50,
          w: 0,
        },
        {
          fx: 0,
          fy: -27,
          fs: 0.38,
          fo: 1,
          fc: 1,
          v: 0,
          sx: 0,
          sy: 0,
          ss: 0.7,
          so: 0,
          sr: 10,
          po: 0,
          py: 60,
          no: 0,
          ny: 50,
          w: 0.4,
        },
        {
          fx: -45,
          fy: -27,
          fs: 0.22,
          fo: 0,
          fc: 0,
          v: 0,
          sx: 0,
          sy: -26,
          ss: 0.82,
          so: 1,
          sr: -4,
          po: 0,
          py: 60,
          no: 0,
          ny: 50,
          w: 1,
        },
        {
          fx: -45,
          fy: -27,
          fs: 0.22,
          fo: 0,
          fc: 0,
          v: 0,
          sx: -35,
          sy: -13,
          ss: 0.25,
          so: 0,
          sr: -10,
          po: 1,
          py: 0,
          no: 0,
          ny: 50,
          w: 0.5,
        },
        {
          fx: -45,
          fy: -27,
          fs: 0.22,
          fo: 0,
          fc: 0,
          v: 0,
          sx: -35,
          sy: -13,
          ss: 0.25,
          so: 0,
          sr: -10,
          po: 0,
          py: -60,
          no: 1,
          ny: 0,
          w: 0.4,
        },
        {
          fx: 15,
          fy: -18,
          fs: 0.5,
          fo: 0.15,
          fc: 0,
          v: 0,
          sx: -25,
          sy: 20,
          ss: 0.65,
          so: 0.18,
          sr: -12,
          po: 0,
          py: -60,
          no: 0,
          ny: -40,
          w: 0.1,
        },
      ]
    : [
        {
          fx: 0,
          fy: 0,
          fs: 1,
          fo: 1,
          fc: 0,
          v: 1,
          sx: 20,
          sy: 0,
          ss: 0.6,
          so: 0,
          sr: 12,
          po: 0,
          py: 60,
          no: 0,
          ny: 50,
          w: 0,
        },
        {
          fx: 23,
          fy: -3,
          fs: 0.46,
          fo: 1,
          fc: 1,
          v: 0,
          sx: 20,
          sy: 0,
          ss: 0.6,
          so: 0,
          sr: 12,
          po: 0,
          py: 60,
          no: 0,
          ny: 50,
          w: 0.5,
        },
        {
          fx: -27,
          fy: -15,
          fs: 0.2,
          fo: 0,
          fc: 0,
          v: 0,
          sx: 24,
          sy: -3,
          ss: 1,
          so: 1,
          sr: -5,
          po: 0,
          py: 60,
          no: 0,
          ny: 50,
          w: 1,
        },
        {
          fx: -27,
          fy: -15,
          fs: 0.2,
          fo: 0,
          fc: 0,
          v: 0,
          sx: -33,
          sy: -7,
          ss: 0.48,
          so: 1,
          sr: -10,
          po: 1,
          py: 0,
          no: 0,
          ny: 50,
          w: 0.5,
        },
        {
          fx: -27,
          fy: -15,
          fs: 0.2,
          fo: 0,
          fc: 0,
          v: 0,
          sx: -9,
          sy: 10,
          ss: 0.4,
          so: 0.14,
          sr: -10,
          po: 0,
          py: -70,
          no: 1,
          ny: 0,
          w: 0.5,
        },
        {
          fx: 23,
          fy: -17,
          fs: 0.37,
          fo: 0.18,
          fc: 0,
          v: 0,
          sx: -30,
          sy: 10,
          ss: 0.8,
          so: 0.2,
          sr: -14,
          po: 0,
          py: -70,
          no: 0,
          ny: -50,
          w: 0.1,
        },
      ];
}
function update() {
  frame = false;
  if (document.body.classList.contains("library-open")) return;
  for (const shot of document.querySelectorAll(".cinema-intro,.doc-chapter")) {
    const bounds = shot.getBoundingClientRect();
    if (bounds.bottom > 0 && bounds.top < innerHeight)
      shot.style.setProperty(
        "--shot-progress",
        String(
          reduced
            ? 0
            : clamp((innerHeight - bounds.top) / (innerHeight + bounds.height)),
        ),
      );
  }
  const mobile = innerWidth < 701,
    frames = keyframes(mobile);
  const starts = beats.map((b) => b.getBoundingClientRect().top + scrollY);
  let index = 0;
  while (
    index < beats.length - 1 &&
    scrollY >= starts[index + 1] - innerHeight * 0.25
  )
    index++;
  const next = Math.min(index + 1, 5),
    start = starts[index] - innerHeight * 0.25,
    end = starts[next] - innerHeight * 0.25;
  let t = next === index ? 0 : clamp((scrollY - start) / (end - start));
  t = clamp((t - 0.35) / 0.65);
  if (reduced) t = t > 0.5 ? 1 : 0;
  else t = t * t * (3 - 2 * t);
  const f = {};
  for (const key of Object.keys(frames[index]))
    f[key] = frames[index][key] + (frames[next][key] - frames[index][key]) * t;
  const vars = {
    "film-x": f.fx + "vw",
    "film-y": f.fy + "svh",
    "film-scale": f.fs,
    "film-opacity": f.fo,
    "film-caption": f.fc,
    vignette: f.v,
    "sleeve-x": f.sx + "vw",
    "sleeve-y": f.sy + "svh",
    "sleeve-scale": f.ss,
    "sleeve-opacity": f.so,
    "sleeve-rotate": f.sr + "deg",
    "people-opacity": f.po,
    "people-y": f.py + "px",
    "note-opacity": f.no,
    "note-y": f.ny + "px",
    warm: f.w,
  };
  for (const [k, v] of Object.entries(vars))
    stage.style.setProperty("--" + k, v);
  const gatheringBounds = document
    .querySelector("#gathering-sequence")
    .getBoundingClientRect();
  const inHistory =
    gatheringBounds.top > innerHeight * 0.25 ||
    gatheringBounds.bottom < innerHeight * 0.5;
  document.body.classList.toggle("in-history", inHistory);
  stage.inert = inHistory;
  scene = index;
  document.body.dataset.scene = String(index);
  $("#scene-count").textContent = inHistory
    ? "The history"
    : String(index + 1).padStart(2, "0") + " / 06";
  document.documentElement.style.setProperty(
    "--progress",
    clamp(scrollY / (document.documentElement.scrollHeight - innerHeight)) *
      100 +
      "%",
  );
  for (const [sel, visible] of [
    [".performance", f.fc > 0.8],
    [".sleeve", f.so > 0.8],
    [".people", f.po > 0.8],
    [".release-note", f.no > 0.8],
  ]) {
    const el = $(sel);
    el.classList.toggle("is-interactive", visible);
    el.setAttribute("aria-hidden", String(!visible));
    el.querySelectorAll("button").forEach((b) => {
      b.tabIndex = visible ? 0 : -1;
    });
  }
  if ((inHistory || index > 1) && active === video && !video.paused) {
    video.pause();
  } // The performance does not soundtrack the separate camp by accident.
}
function schedule() {
  if (!frame) {
    frame = true;
    requestAnimationFrame(update);
  }
}
window.addEventListener("scroll", schedule, { passive: true });
window.addEventListener("resize", schedule);
update();
$("#replay").onclick = () => {
  audio.pause();
  active = video;
  document
    .querySelector("#beat-0")
    .scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  updateControls();
};
const dialog = $("#context"),
  body = $("#context-body");
const links = (keys) =>
  keys
    .map((k) => sources[k])
    .filter(Boolean)
    .map(
      (s) =>
        `<a href="${escape(s.url)}" target="_blank" rel="noreferrer">${escape(s.title)} ↗<small>${escape(s.by)} · ${escape(s.date)}</small></a>`,
    )
    .join("");
const notes = {
  performance: {
    title: "The night, and its record",
    copy: "The original token caption identifies this as Iman Europe performing MWWM at Zoratopia FETE in Miami on December 3, 2022. The image behind the opening is a frame extracted from that same original film. Playback resolves the token’s original media; it is not a substitute streaming upload.",
    html: '<a href="https://etherscan.io/token/0x1e31c103D422046d156aadf4752bD37B61D06EFE?a=3" target="_blank" rel="noreferrer">Inspect Ethereum token 3 ↗<small>Contract 0x1e31c103…06EFE</small></a><a href="https://ipfs.filebase.io/ipfs/bafybeickizrxavfhil2vdtfxx3fdivtq7b7jjxgtwkj6zqj7w22pc3enj4" target="_blank" rel="noreferrer">Open the original film ↗</a>',
  },
  release: {
    title: "From camp to release",
    copy: "CAMPFIRE’s original release notes connect MIAMI FREESTYLE to its first Art Basel artist camp in Miami and describe its first season as selected by community vote. This does not establish that the camp was the same gathering as Zoratopia FETE, or that every person at the camp appears on this track. The 2023 label is the release period; the exact camp date remains unconfirmed in this record.",
    html: links(["campfireGenesisNotes"]),
  },
};
function show() {
  const hash = location.hash;
  if (hash === "#scenes") {
    body.innerHTML =
      '<h2>The Music NFT era</h2><p>Follow the story, or return to a chapter.</p><a href="#history-start">The Music NFT era</a><a href="#why-this-mattered">Why artists wanted alternatives</a><a href="#understanding-nfts">What is a music NFT?</a>' +
      chapterList
        .map(
          (c) =>
            `<a href="#history-${c.id}">${c.title}<small>${c.date}</small></a>${c.id === "zoratopia" ? '<a href="#beat-0">Iman Europe · live in Miami</a><a href="#beat-1">The performance as an NFT</a><a href="#beat-2">CAMPFIRE · making and releasing together</a>' : ""}`,
        )
        .join("");
    body.innerHTML +=
      "<h3>More stories and experiments</h3>" +
      extraChapters
        .map((c) => `<a href="#chapter-${c.id}">${c.short || c.title}</a>`)
        .join("");
  } else if (contextHTML(hash)) {
    body.innerHTML = contextHTML(hash);
  } else if (hash.startsWith("#note-")) {
    const n = notes[hash.slice(6)];
    if (!n) return;
    body.innerHTML = `<h2>${n.title}</h2><p>${n.copy}</p>${n.html}`;
  } else if (hash.startsWith("#person-")) {
    const id = hash.slice(8),
      p = people.find((p) => p.id === id);
    if (!p) return;
    body.innerHTML = `<img src="/people/${escape(id)}-640.webp" alt="${escape(p.name)}"><h2>${escape(p.name)}</h2><p>${escape(p.bio || p.role)}</p>${links(["campfireGenesisNotes", ...(p.sources || []).slice(0, 2)])}`;
  } else {
    if (dialog.open) dialog.close();
    return;
  }
  $("#back-context").hidden = !(history.state?.panelDepth > 1);
  dialog.scrollTop = 0;
  if (!dialog.open) dialog.showModal();
}
function open(hash, e) {
  if (!dialog.open) origin = e.currentTarget;
  history.pushState(
    { panel: true, panelDepth: (history.state?.panelDepth || 0) + 1 },
    "",
    hash,
  );
  show();
}
document
  .querySelectorAll("[data-note]")
  .forEach((b) => (b.onclick = (e) => open("#note-" + b.dataset.note, e)));
document
  .querySelectorAll("[data-person]")
  .forEach((b) => (b.onclick = (e) => open("#person-" + b.dataset.person, e)));
$("#chapters").onclick = (e) => open("#scenes", e);
function close() {
  if (history.state?.panel) history.go(-(history.state.panelDepth || 1));
  else {
    history.replaceState({}, "", location.pathname);
    dialog.close();
  }
}
$("#close-context").onclick = close;
$("#back-context").onclick = () => history.back();
dialog.addEventListener("cancel", (e) => {
  e.preventDefault();
  close();
});
dialog.addEventListener("close", () => origin?.focus({ preventScroll: true }));
window.addEventListener("popstate", show);
window.addEventListener("hashchange", show);
show();
// Fetch the performance only when its chapter enters the viewport.
const performanceObserver = new IntersectionObserver(
  (entries) => {
    if (
      !entries.some((e) => e.isIntersecting) ||
      reduced ||
      navigator.connection?.saveData
    )
      return;
    performanceObserver.disconnect();
    load("record-1e31c103", video)
      .then(() => {
        if (
          scene < 2 &&
          !reduced &&
          !userPaused &&
          !userInteracted &&
          !document.body.classList.contains("in-history") &&
          !document.body.classList.contains("library-open")
        ) {
          video.muted = true;
          return video.play();
        }
      })
      .catch(() => status("Press play to load the original footage."));
  },
  { threshold: 0.1 },
);
performanceObserver.observe(document.querySelector("#beat-0"));

updateControls();

library = createLibrary({
  pauseStory: () => {
    userPaused = true;
    video.pause();
    audio.pause();
    status("");
  },
});

document.addEventListener("click", (e) => {
  if (e.target.closest("[data-library-start]")) {
    library.start();
    return;
  }
  const play = e.target.closest("[data-library-play]");
  if (play) {
    library.play(play.dataset.libraryPlay);
    return;
  }
  const a = e.target.closest('a[href^="#"]');
  if (a && /^#(chapter-|concept-|person-|record-)/.test(a.hash)) {
    e.preventDefault();
    open(a.hash, { currentTarget: a });
  }
});
