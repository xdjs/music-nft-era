import { people } from "/src/data.js";
import { nftCatalog } from "/src/nft-catalog.js";
import { createPlaylist } from "/src/playlist.js";
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const image = (uri) => {
  if (!uri) return "";
  if (uri.startsWith("ipfs://"))
    return "https://ipfs.filebase.io/ipfs/" + uri.slice(7);
  if (uri.startsWith("ar://")) return "https://arweave.net/" + uri.slice(5);
  return [
    "https://arpeggi-prod-public.s3.us-west-2.amazonaws.com/",
    "https://arweave.net/",
    "https://soundxyz.mypinata.cloud/ipfs/",
  ].some((p) => uri.startsWith(p))
    ? uri
    : "";
};
const searchText = (text) =>
  String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const featured = ["record-69c77ef0", "record-1e31c103", "record-chaos-walls"];
const records = [...nftCatalog].sort((a, b) =>
  (featured.includes(a.id) ? featured.indexOf(a.id) : -1) < 0
    ? featured.includes(b.id)
      ? 1
      : 0
    : featured.includes(b.id)
      ? featured.indexOf(a.id) - featured.indexOf(b.id)
      : -1,
);
const artwork = (r) =>
  r.localArtwork ||
  (r.id === "record-69c77ef0"
    ? "/media/record-69c77ef0-480.webp"
    : r.id === "record-1e31c103"
      ? "/sequence/performance-frame.webp"
      : r.id === "record-chaos-walls"
        ? "/media/chaos-walls-480.webp"
        : image(r.imageURI));
export function createLibrary({ pauseStory }) {
  const root = document.querySelector("#music-library"),
    film = document.querySelector("#film");
  let savedY = 0,
    limit = 24,
    active = false,
    entryHash = "",
    musicY = 0;
  history.scrollRestoration = "manual";
  const player = createPlaylist({
    records,
    imageURL: (_uri, record) => artwork(record),
    beforePlay: pauseStory,
    escape: esc,
  });
  let playingId = null;
  const syncButtons = () =>
    document
      .querySelectorAll("[data-listen],[data-library-play]")
      .forEach((b) => {
        const id = b.dataset.listen || b.dataset.libraryPlay;
        const r = records.find((r) => r.id === id);
        if (!r) return;
        const playing = id === playingId;
        b.setAttribute(
          "aria-label",
          `${playing ? "Pause" : "Play"} ${r.title}`,
        );
        if (b.matches(".doc-play,[data-listen]"))
          b.textContent = playing ? "Ⅱ" : "▶";
      });
  document.addEventListener("collection-playback", (e) => {
    playingId = e.detail.playing ? e.detail.id : null;
    syncButtons();
  });
  const filters = { q: "", artist: "", collection: "", platform: "", kind: "" };
  const credits = (r) =>
    people
      .filter(
        (p) =>
          r.artistIds?.includes(p.id) ||
          r.personIds?.includes(p.id) ||
          p.recordIds?.includes(r.id) ||
          r.artistId === p.id,
      )
      .map((p) => p.name);
  const options = (key) =>
    [
      ...new Set(
        records
          .flatMap((r) =>
            key === "artist" ? [r.artist, ...credits(r)] : [r[key]],
          )
          .filter(Boolean),
      ),
    ]
      .sort()
      .map((v) => `<option value="${esc(v)}">${esc(v)}</option>`)
      .join("");
  root.innerHTML = `<div class="library-top"><button id="back-story">← Back to the story</button><span>Original NFT media · selected archive</span></div><div class="library-heading"><div><h1 id="music-title">The Collection</h1><p>Songs, music videos and live performances from the scene.</p></div><button class="pill" id="play-library">▶ Play the archive</button></div><div class="library-filters"><label class="search-field">Search<input id="music-search" type="search" placeholder="Artist, song or credit"></label><details class="filter-disclosure" ${innerWidth > 700 ? "open" : ""}><summary>Filters</summary><div class="filter-options"><label>Artist or contributor<select id="music-artist"><option value="">All artists</option>${options("artist")}</select></label><label>Collection<select id="music-collection"><option value="">All collections</option>${options("collection")}</select></label><label>Platform<select id="music-platform"><option value="">All platforms</option>${options("platform")}</select></label><label>Format<select id="music-kind"><option value="">Audio & video</option><option value="audio">Audio</option><option value="video">Video</option></select></label><button id="clear-music">Clear filters</button></div></details></div><p id="music-count" role="status"></p><div class="music-grid"></div><button id="more-music" class="pill">Show more recordings</button><p class="library-scope">Selected works, not complete artist discographies. Multiple collectible editions can refer to the same song. Media loads from the original NFT’s storage when you press play.</p>`;
  function render() {
    const matched = records.filter(
      (r) =>
        (!filters.artist ||
          r.artist === filters.artist ||
          credits(r).includes(filters.artist)) &&
        (!filters.collection || r.collection === filters.collection) &&
        (!filters.platform || r.platform === filters.platform) &&
        (!filters.kind || (r.kind || "audio") === filters.kind) &&
        searchText(
          JSON.stringify([
            r.artist,
            r.title,
            r.note,
            r.artistIds,
            r.collection,
            r.platform,
            credits(r),
          ]),
        ).includes(searchText(filters.q)),
    );
    root.querySelector("#music-count").textContent =
      `${matched.length} recordings${filters.q || filters.artist || filters.collection || filters.kind ? " matching your filters" : ""}`;
    root.querySelector(".music-grid").innerHTML =
      matched
        .slice(0, limit)
        .map(
          (r) =>
            `<article class="music-card"><div class="music-art"><img src="${esc(artwork(r))}" alt="${esc(r.artworkCredit || `${r.title} artwork`)}" ${r.localArtwork?.includes("latasha-press") ? 'style="object-position: center top"' : ""} loading="lazy"><button data-listen="${esc(r.id)}" aria-label="Play ${esc(r.title)}">▶</button><span>${r.kind === "video" ? "Video" : "Audio"}</span></div>${r.localArtwork?.includes("latasha-press") ? "<small>Artist portrait · video frame unavailable</small>" : ""}<p>${esc(r.artist)}</p><h2>${esc(r.title)}</h2><div class="music-card-actions"><button data-queue="${esc(r.id)}">＋ Queue</button><a href="#record-${esc(r.id)}">Details ↗</a></div></article>`,
        )
        .join("") ||
      '<p class="no-results">No recordings match. Try another artist or clear the filters.</p>';
    root.querySelector("#more-music").hidden = matched.length <= limit;
    syncButtons();
    root.querySelectorAll("img").forEach(
      (img) =>
        (img.onerror = () => {
          img.hidden = true;
          img.parentElement.classList.add("missing-art");
        }),
    );
    root
      .querySelectorAll("[data-listen]")
      .forEach(
        (b) =>
          (b.onclick = () =>
            player.play(records.find((r) => r.id === b.dataset.listen))),
      );
    root.querySelectorAll("[data-queue]").forEach(
      (b) =>
        (b.onclick = () => {
          player.enqueue(records.find((r) => r.id === b.dataset.queue));
          b.textContent = "Queued ✓";
        }),
    );
  }
  function setURL() {
    const q = new URLSearchParams(Object.entries(filters).filter(([, v]) => v));
    history.replaceState(
      { ...history.state },
      "",
      "#music" + (q.size ? "?" + q : ""),
    );
  }
  for (const [id, key] of [
    ["music-search", "q"],
    ["music-artist", "artist"],
    ["music-collection", "collection"],
    ["music-kind", "kind"],
    ["music-platform", "platform"],
  ])
    root
      .querySelector("#" + id)
      .addEventListener(key === "q" ? "input" : "change", (e) => {
        filters[key] = e.target.value;
        limit = 24;
        setURL();
        render();
      });
  root.querySelector("#clear-music").onclick = () => {
    Object.keys(filters).forEach((k) => (filters[k] = ""));
    root.querySelectorAll("input,select").forEach((e) => (e.value = ""));
    limit = 24;
    setURL();
    render();
  };
  root.querySelector("#more-music").onclick = () => {
    limit += 24;
    render();
  };
  root.querySelector("#play-library").onclick = () => player.start();
  root.querySelector("#back-story").onclick = () => {
    history.pushState({}, "", "#beat-return");
    route();
  };
  function route() {
    if (location.hash.startsWith("#music")) {
      const entering = !active,
        previousFilters = JSON.stringify(filters);
      if (!active) {
        savedY = scrollY;
        entryHash = history.state?.storyHash || entryHash;
        active = true;
        pauseStory();
        film.hidden = true;
        root.hidden = false;
        document.body.classList.add("library-open");
        scrollTo(0, musicY);
      }
      const params = new URLSearchParams(location.hash.split("?")[1] || "");
      for (const key of Object.keys(filters))
        filters[key] = params.get(key) || "";
      const artist = people.find((p) =>
        [p.name, ...(p.aliases || [])].some(
          (name) => searchText(name) === searchText(filters.artist),
        ),
      );
      if (artist) filters.artist = artist.name;
      root.querySelector("#music-search").value = filters.q;
      root.querySelector("#music-artist").value = filters.artist;
      root.querySelector("#music-collection").value = filters.collection;
      root.querySelector("#music-kind").value = filters.kind;
      root.querySelector("#music-platform").value = filters.platform;
      render();
    } else if (
      active &&
      !/^#(note-|person-|chapter-|concept-|record-|scenes)/.test(location.hash)
    ) {
      ((active = false), (entryHash = ""), (musicY = 0));
      history.scrollRestoration = "manual";
      film.hidden = false;
      root.hidden = true;
      document.body.classList.remove("library-open");
      requestAnimationFrame(() => {
        if (
          location.hash === "#beat-return" ||
          !location.hash ||
          location.hash === entryHash
        )
          scrollTo({ top: savedY, behavior: "instant" });
        else
          document
            .querySelector(location.hash)
            ?.scrollIntoView({ behavior: "instant" });
      });
    }
  }
  window.addEventListener("hashchange", route);
  window.addEventListener("popstate", route);
  route();
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#music"]');
    if (a && !active) {
      entryHash = location.hash;
      savedY = scrollY;
    }
  });
  return {
    start: player.start,
    pause: player.close,
    route,
    play: (id) => {
      const r = records.find((r) => r.id === id);
      if (r) player.play(r);
    },
  };
}
