import { sources } from "/src/data.js";
import { nftCatalog } from "/src/nft-catalog.js";
import { createPlaylist } from "/src/playlist.js";
const escape = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const walls = nftCatalog.find((r) => r.id === "record-chaos-walls");
const player = createPlaylist({
  records: [walls],
  imageURL: () => "/media/chaos-walls-480.webp",
  beforePlay: () => {},
  escape,
});
document
  .querySelectorAll("[data-play]")
  .forEach((b) => b.addEventListener("click", () => player.start()));
const notes = {
  primer: {
    title: "A song, an edition, a relationship",
    text: "A non-fungible token has its own identity and transaction history. It can point to a recording stored elsewhere. That does not make the music impossible to copy, and buying a token does not automatically transfer copyright. Different releases offered different terms. Catalog’s founders described a record-collecting experience; Songcamp used the technology as part of a larger collaboration.",
    sources: ["catalogInterview", "architecture", "royaltyStandard"],
  },
  latasha: {
    title: "Making room for other artists",
    text: "LATASHÁ also recalls exclusion at NFT NYC and describes organizing seminars to help other artists understand the tools. The promise of access did not remove the need to build welcoming spaces. Her account gives us a question to carry through the era: who does the work of turning an available technology into a place people can actually participate?",
    sources: ["minted", "latashaJah"],
  },
  chaos: {
    title: "A band with many kinds of work",
    text: "Songcamp’s architecture account describes rotating trios and a wider group working on visual art, technology, radio, lore and operations. Its later retrospective records 48 songs and a twelve-week process. The earlier plan described 45 songs and eight weeks: the plan and the eventual account are different records, not interchangeable statistics.",
    sources: ["architecture", "year", "splits"],
  },
  walls: {
    title: "Inside “Walls”",
    text: "Three Oscillators, Lackhoney and Boy Untitled describe their part in making Walls in a participant oral history. The token credits production and mixing to Three Oscillators, vocals and songwriting to Lackhoney, and vocals to Boy Untitled. Hearing one track lets us move from the scale of CHAOS to a specific creative relationship.",
    sources: ["walls", "architecture"],
  },
  reading: {
    title: "Sources for this cut",
    text: "This short prototype reuses the existing documentary’s source-backed editorial records and original NFT reader. It is a design study, not the newly researched full script. Images retain their original captions; a press portrait is not evidence of an event.",
    sources: [
      "catalogInterview",
      "minted",
      "latashaJah",
      "genesis",
      "architecture",
      "year",
      "walls",
    ],
  },
};
const people = {
  three: {
    name: "Three Oscillators",
    img: "three-oscillators",
    role: "Production and mixing on Walls. The oral history follows this collaboration alongside Lackhoney and Boy Untitled.",
  },
  lack: {
    name: "Lackhoney",
    img: "lackhoney",
    role: "Vocals and songwriting on Walls. Also credited historically as Aly elsewhere in the archive; original release credits retain the names used at the time.",
  },
  boy: {
    name: "Boy Untitled",
    img: "boy-untitled",
    role: "Vocals on Walls. A participant in the oral history of the song, which supplies context beyond the metadata credits.",
  },
};
const dialog = document.querySelector("#context"),
  body = document.querySelector("#context-body");
let origin;
const sourceList = (keys) =>
  keys
    .map((key) => sources[key])
    .filter(Boolean)
    .map(
      (s) =>
        `<a href="${escape(s.url)}" target="_blank" rel="noreferrer">${escape(s.title)} ↗<small>${escape(s.by)} · ${escape(s.date)}</small></a>`,
    )
    .join("");
function render() {
  const hash = location.hash;
  if (hash.startsWith("#note-")) {
    const n = notes[hash.slice(6)];
    if (!n) return;
    body.innerHTML = `<h2>${escape(n.title)}</h2><p>${escape(n.text)}</p>${sourceList(n.sources)}`;
  } else if (hash.startsWith("#person-")) {
    const n = people[hash.slice(8)];
    if (!n) return;
    body.innerHTML = `<img class="context-portrait" src="/people/${n.img}-640.webp" alt="${escape(n.name)}"><h2>${escape(n.name)}</h2><p>${escape(n.role)}</p>${sourceList(["walls"])}`;
  } else if (hash === "#chapters") {
    body.innerHTML =
      "<h2>Follow the story</h2>" +
      [...document.querySelectorAll("section[data-label]")]
        .map((s) => `<a href="#${s.id}">${s.dataset.label}</a>`)
        .join("");
  } else {
    if (dialog.open) dialog.close();
    return;
  }
  if (!dialog.open) dialog.showModal();
}
function open(hash, event) {
  origin = event.currentTarget;
  history.pushState({ context: true }, "", hash);
  render();
}
document
  .querySelectorAll("[data-note]")
  .forEach((b) => (b.onclick = (e) => open("#note-" + b.dataset.note, e)));
document
  .querySelectorAll("[data-person]")
  .forEach((b) => (b.onclick = (e) => open("#person-" + b.dataset.person, e)));
document.querySelector("#contents").onclick = (e) => open("#chapters", e);
function close() {
  if (history.state?.context) history.back();
  else {
    history.replaceState({}, "", location.pathname);
    dialog.close();
  }
}
document.querySelector(".dialog-close").onclick = close;
dialog.addEventListener("cancel", (e) => {
  e.preventDefault();
  close();
});
dialog.addEventListener("close", () => origin?.focus({ preventScroll: true }));
window.addEventListener("hashchange", render);
window.addEventListener("popstate", render);
render();
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
let pending = false;
function motion() {
  pending = false;
  const opening = document.querySelector(".overture");
  const progress = Math.max(
    0,
    Math.min(
      1,
      -opening.getBoundingClientRect().top /
        (opening.offsetHeight - innerHeight),
    ),
  );
  if (!reduced.matches) {
    opening.style.setProperty("--opening-scale", String(1 + progress * 0.12));
    opening.style.setProperty("--opening-shift", `${-progress * 60}px`);
    const room = document.querySelector(".online-scene");
    const t = Math.max(
      0,
      Math.min(
        1,
        -room.getBoundingClientRect().top / (room.offsetHeight - innerHeight),
      ),
    );
    room.style.setProperty("--room-scale", String(1 + t * 0.06));
  }
  const sections = [...document.querySelectorAll("section[data-label]")];
  const current = sections
    .filter((s) => s.getBoundingClientRect().top < innerHeight * 0.5)
    .at(-1);
  document.querySelector(".proto-position").textContent =
    current?.dataset.label || "A scene, in the making";
}
window.addEventListener(
  "scroll",
  () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(motion);
    }
  },
  { passive: true },
);
motion();
