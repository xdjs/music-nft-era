import { moments, people, sources } from "/src/data.js";
import { portraits } from "/src/portraits.js";
import { nftCatalog } from "/src/nft-catalog.js";
export const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const dimensions = {
  "catalog-eprom": [960, 960],
  "helmet-city-poster": [960, 1423],
  "genesis-chat": [960, 751],
  "cc0lab-01": [960, 1248],
  "record-69c77ef0": [960, 960],
  "sound-of-fractures-press": [960, 432],
  "record-not4me-acoustic": [960, 960],
  "record-xcelencia-soltera": [960, 960],
  "tk-never-forget": [960, 960],
  "record-not4me": [960, 960],
  "genesis-party": [960, 751],
  "rae-isla-live": [960, 894],
  "cc0lab-08": [960, 715],
  "iman-europe-press": [960, 719],
  "tape-launch": [960, 602],
  "chaos-walls": [960, 960],
  "record-xcelencia-isla": [960, 960],
  "latasha-press": [960, 1440],
  "imogen-song-map": [960, 540],
  "sound-year": [960, 480],
  "daniel-allan": [960, 1440],
  overstimulated: [960, 480],
};
const chapters = [
  [
    "tiny-human",
    "2015 / before music NFTs",
    "Who gets credited when a song travels?",
    "imogen-song-map",
    "Imogen Heap’s Tiny Human song map, published in her 2018 account.",
    "heapMycelia",
    "map",
    null,
    ["tape", "music-nft"],
  ],
  [
    "tape",
    "May 2020 / artists and builders",
    "A cassette became a release experiment.",
    "tape-launch",
    "RAC and Zora · BOY cassette release, 2020.",
    "tape",
    "record",
    null,
    ["music-nft"],
  ],
  [
    "catalog",
    "2021 / a different kind of record shop",
    "Hear it freely. Collect its edition.",
    "catalog-eprom",
    "EPROM · How U Make Me Feel · original release artwork.",
    "catalogInterview",
    "record",
    "catalog-eprom-1715",
    ["early-records", "tape"],
  ],
  [
    "latasha-videos",
    "2021 onward / the artist’s terms",
    "The video was the work.",
    "latasha-press",
    "LATASHÁ · 2016 press portrait, not an event photograph.",
    "latashaJah",
    "portrait",
    "latasha-zora-623",
    ["glass", "black-dave-glass", "royalties"],
  ],
  [
    "genesis",
    "April 2021 / making together online",
    "A camp, without the commute.",
    "genesis-party",
    "Songcamp · Genesis virtual gathering, May 2021.",
    "genesis",
    "wide",
    null,
    ["elektra", "meeting-places"],
  ],
  [
    "overstimulated",
    "September 2021–January 2022 / support before release",
    "The audience helped the record happen.",
    "daniel-allan",
    "Daniel Allan · artist’s author photograph.",
    "allan",
    "record",
    null,
    ["music-nft"],
  ],
  [
    "sound-genesis",
    "Late 2021–2022 / editions and introductions",
    "A song could gather its own audience.",
    "sound-year",
    "Sound · first-anniversary artwork, 2022.",
    "soundYear",
    "wide",
    null,
    ["sound", "soulection", "mint-songs", "open-doors"],
  ],
  [
    "chaos",
    "Spring–June 2022 / Songcamp expands",
    "77 contributors. No single frontperson.",
    "chaos-walls",
    "Walls · original CHAOS edition artwork.",
    "architecture",
    "record",
    "record-chaos-walls",
    ["genesis", "elektra", "splits", "common-pool", "club-chaos"],
  ],
  [
    "walls",
    "2022 / inside one collaboration",
    "Three people changed the same song.",
    "chaos-walls",
    "Walls · CHAOS, Act II.",
    "walls",
    "collaboration",
    "record-chaos-walls",
    ["remix", "cc0lab"],
  ],
  [
    "zoratopia",
    "2022 / who makes a scene welcoming?",
    "Access took more than a new technology.",
    "iman-europe-press",
    "Iman Europe · official press portrait; date unspecified.",
    "zoraJune",
    "portrait",
    "record-1e31c103",
    ["campfire-miami", "the-park"],
  ],
  [
    "future-surf",
    "2023 / the work between releases",
    "People kept showing up.",
    "cam-murdoch",
    "Cam Murdoch · public Metalabel profile image; not a photograph of the radio sessions.",
    "genesis",
    "map",
    "recovery-8b64bbf8e0b14aa3d7f5f6ddcb7553706c9c6ef3-25",
    ["learning-in-public", "lnrz-satellites", "heart-project"],
  ],
  [
    "remix",
    "2023–2024 / ideas travel between projects",
    "A credit leads to another record.",
    "sound-of-fractures-press",
    "Sound of Fractures · Let Go press photograph, 2023.",
    "remixes",
    "portrait",
    "sound-legacy-fa947daea2b941da51ed42147cb9e8cdcf6445fc-1",
    [
      "scenes",
      "eternal-garden",
      "xcelencia",
      "rae",
      "dutch",
      "chill-pill",
      "coop-records",
    ],
  ],
  [
    "royalties",
    "The downturn / the limits of the promise",
    "A payment rule still needed people to honor it.",
    "cc0lab-08",
    "Songcamp · CC0lab artwork, a later open-source experiment.",
    "year",
    "wide",
    null,
    ["common-pool", "open-doors"],
  ],
  [
    "afterglow",
    "2024–2026 / keeping the music available",
    "The website and the record have different lives.",
    "rae-isla-live",
    "Rae Isla · photograph by Fede Petro; performance date unconfirmed.",
    "rae",
    "portrait",
    null,
    ["spinamp", "network", "scenes"],
  ],
].map(
  ([
    id,
    date,
    title,
    image,
    credit,
    creditSource,
    layout,
    record,
    related,
  ]) => ({
    id,
    date,
    title,
    image,
    credit,
    creditSource,
    layout,
    record,
    related,
    moment: moments.find((m) => m.id === id),
  }),
);
export const chapterList = chapters;
export const extraChapters = moments.filter(
  (m) => !chapters.some((c) => c.id === m.id),
);
const media = (c, size) =>
  c.id === "future-surf"
    ? "/people/cam-murdoch-640.webp"
    : `/media/${c.image}-${size}.webp`;
const creditURL = (c) =>
  c.id === "future-surf"
    ? portraits["cam-murdoch"].url
    : sources[c.creditSource]?.url;

const concepts = {
  headlines: {
    name: "2021: several kinds of music release",
    text: "3LAU’s Ultraviolet auction announcement offered 33 NFTs with redemption for vinyl, unreleased music and experiences. Kings of Leon and YellowHeart announced When You See Yourself alongside a collection of artwork, vinyl and ticket experiences. These were bundles with specific promises, not simply another way to stream an album. The Kings of Leon announcement credits Night After Night, creative director Casey McGrath and Matthew Followill’s photography, and names Crew Nation as a beneficiary. These announcements document the offered terms; they do not establish that every promise was fulfilled. Neither is presented here as the origin of all music NFTs.",
    sources: [],
    links: [
      [
        "3LAU’s artist-issued announcement · February 17, 2021",
        "https://www.globenewswire.com/news-release/2021/02/17/2177446/0/en/acclaimed-musician-3lau-launches-first-nft-album-on-origin-s-dshop.html",
      ],
      [
        "Live Nation: Kings of Leon and YellowHeart · March 3, 2021",
        "https://www.livenation.com/exclusives/185/kings-leon-team-up-yellowheart-present",
      ],
    ],
  },
  zora: {
    name: "Zora",
    text: "In this chapter, Zora is the publishing infrastructure and marketplace used by early collectible releases. Catalog could offer its own record-store interface while an edition remained accessible through Zora. The 2020 RAC cassette experiment predates these one-of-one music records. Later Zora products should not be read back into those early releases.",
    sources: ["tape", "catalogInterview"],
  },
  nft: {
    name: "A music NFT",
    text: "Non-fungible means individually identifiable and not interchangeable like-for-like. A token is a digital representation. A music NFT associates that token with a recording or other work. The token has an ownership history; the audio can still be copied and heard by other people. Buying an NFT does not automatically buy copyright. Releases can offer different rights and benefits, so their actual terms matter.",
    sources: ["nftBasics"],
  },
};
const entityEntries = people.flatMap((p) =>
  [p.name, ...(p.aliases || [])]
    .filter((n) => n.length > 3)
    .map((name) => [name, "person", p.id]),
);
entityEntries.push(
  ["Catalog", "chapter", "catalog"],
  ["Spinamp", "chapter", "spinamp"],
  ["Sound.xyz", "chapter", "sound-genesis"],
  ["Songcamp", "chapter", "genesis"],
  ["Camp Genesis", "chapter", "genesis"],
  ["Camp Elektra", "chapter", "elektra"],
  ["Elektra", "chapter", "elektra"],
  ["Zoratopia", "chapter", "zoratopia"],
  ["Zora", "concept", "zora"],
  ["Mint Songs", "chapter", "mint-songs"],
  ["Glass", "chapter", "glass"],
  ["music NFTs", "concept", "nft"],
);
entityEntries.sort((a, b) => b[0].length - a[0].length);
export function linked(text) {
  const names = new Map(entityEntries.map((e) => [e[0].toLowerCase(), e]));
  const regex = new RegExp(
    "(?<![\\w])(" +
      [...names.values()]
        .map((e) => e[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|") +
      ")(?![\\w])",
    "gi",
  );
  let result = "",
    at = 0;
  for (const m of String(text).matchAll(regex)) {
    const [, type, id] = names.get(m[0].toLowerCase());
    result +=
      esc(text.slice(at, m.index)) +
      `<a class="entity" href="#${type}-${esc(id)}">${esc(m[0])}</a>`;
    at = m.index + m[0].length;
  }
  return result + esc(text.slice(at));
}
export const sourceLinks = (ids) =>
  ids
    .map((id) => sources[id])
    .filter(Boolean)
    .map(
      (s) =>
        `<a class="source-row" href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.title)} ↗<small>${esc(s.by)} · ${esc(s.date)}</small></a>`,
    )
    .join("");
const portrait = (p) => {
  const v = portraits[p.id];
  return v
    ? `<figure class="profile-photo"><img src="${v.file ? "/media/" + esc(v.file.replace(/\.(jpg|png|gif)$/, "")) + "-960.webp" : "/people/" + esc(p.id) + "-640.webp"}" alt="${esc(v.alt || p.name)}" onerror="this.parentElement.hidden=true"><figcaption><a href="${esc(v.url || v.evidence)}" target="_blank" rel="noreferrer">${esc(v.credit)}</a></figcaption></figure>`
    : "";
};
const storyPeople = {
  catalog: ["jeremy-stern", "mike-mckain", "eprom"],
  genesis: ["matthew-chaim"],
  "latasha-videos": ["latasha", "jamee-cornelia"],
  "sound-genesis": ["daniel-allan", "iman-europe"],
  zoratopia: ["latasha", "iman-europe", "black-dave-mk2"],
  "future-surf": ["cam-murdoch", "jamee-cornelia", "charm-taylor"],
  walls: ["three-oscillators", "lackhoney", "boy-untitled"],
};
function peopleStrip(id) {
  const list = (storyPeople[id] || [])
    .map((id) => people.find((p) => p.id === id))
    .filter((p) => p && portraits[p.id]);
  return list.length
    ? `<div class="doc-people">${list
        .map((p) => {
          const v = portraits[p.id];
          const url = v.file
            ? `/media/${v.file.replace(/\.(jpg|png|gif)$/, "")}-960.webp`
            : `/people/${p.id}-640.webp`;
          return `<a href="#person-${p.id}"><img src="${esc(url)}" alt="" loading="lazy"><span>${esc(p.name)}</span></a>`;
        })
        .join("")}</div>`
    : "";
}
const chapterArtifact = (id) => {
  const c = chapters.find((c) => c.id === id);
  if (!c) return "";
  const r = nftCatalog.find((r) => r.id === c.record);
  const art = r?.localArtwork || media(c, 960);
  return `<figure class="chapter-artifact"><div class="artifact-media"><img src="${esc(art)}" alt="${esc(r?.title || c.credit)}" loading="lazy">${r ? `<button data-library-play="${esc(r.id)}" aria-label="${r.kind === "video" ? "Watch" : "Play"} ${esc(r.title)}">▶</button>` : ""}</div><figcaption>${r ? `<strong>${esc(r.title)}</strong><span>${esc(r.artist)} · ${r.kind === "video" ? "Watch the original video" : "Listen to the original recording"}</span>` : esc(c.credit)}<a href="${esc(creditURL(c) || "#")}" target="_blank" rel="noreferrer">Source ↗</a></figcaption></figure>`;
};
export function contextHTML(hash) {
  if (hash.startsWith("#record-")) {
    const r = nftCatalog.find((r) => r.id === hash.slice(8));
    if (!r) return "<h2>Recording not found</h2>";
    const explorer =
      {
        1: "https://etherscan.io",
        10: "https://optimistic.etherscan.io",
        8453: "https://basescan.org",
        7777777: "https://explorer.zora.energy",
      }[r.chainId] || "https://etherscan.io";
    return `<p class="kicker">${esc(r.platform)} · ${r.kind === "video" ? "Video" : "Audio"}</p><h2>${esc(r.title)}</h2><p>${linked(r.artist)}</p><p>${linked(r.note || "This selected edition is resolved from its original token metadata when you press play.")}</p><button class="context-record" data-library-play="${r.id}">▶ Play recording</button>${r.artworkCredit ? `<p class="context-note">${esc(r.artworkCredit)}</p>` : ""}<h3>The edition</h3><p>${esc(r.collection)}<br>Token ${esc(r.tokenId)} · ${{ 1: "Ethereum", 10: "Optimism", 8453: "Base", 7777777: "Zora" }[r.chainId] || `Chain ${r.chainId}`}</p><a class="source-row" href="${explorer}/token/${esc(r.contract)}?a=${esc(r.tokenId)}" target="_blank" rel="noreferrer">Inspect the token ↗</a>${r.originalRelease ? `<a class="source-row" href="${esc(r.originalRelease)}" target="_blank" rel="noreferrer">Original release page ↗</a>` : ""}<p class="context-note">Media is retrieved through the existing read-only NFT adapter. Availability depends on the original storage; no replacement recording is uploaded here.</p>`;
  }
  if (hash.startsWith("#concept-")) {
    const c = concepts[hash.slice(9)];
    return c
      ? `<h2>${c.name}</h2><p>${linked(c.text)}</p>${sourceLinks(c.sources)}${(c.links || []).map(([label, url]) => `<a class="source-row" href="${esc(url)}" target="_blank" rel="noreferrer">${esc(label)} ↗</a>`).join("")}`
      : null;
  }
  if (hash.startsWith("#chapter-")) {
    const m = moments.find((m) => m.id === hash.slice(9));
    if (!m)
      return "<h2>Chapter not found</h2><p>Choose another chapter from the story.</p>";
    return `<p class="kicker">${esc(m.date)}</p><h2>${esc(m.title)}</h2>${m.body
      .split("\n\n")
      .map(
        (t, i) => `<p>${linked(t)}</p>${i === 0 ? chapterArtifact(m.id) : ""}`,
      )
      .join(
        "",
      )}${m.uncertainty ? `<details><summary>What remains unconfirmed</summary><p>${esc(m.uncertainty)}</p></details>` : ""}<div class="context-people">${(
      m.people || []
    )
      .map((id) => people.find((p) => p.id === id))
      .filter(Boolean)
      .map((p) => `<a href="#person-${p.id}">${esc(p.name)} ↗</a>`)
      .join(
        "",
      )}</div><h3>Sources</h3>${sourceLinks(m.sources || [])}<h3>Follow this thread</h3>${(
      m.related || []
    )
      .map((id) => moments.find((m) => m.id === id))
      .filter(Boolean)
      .map(
        (m) =>
          `<a class="source-row" href="#chapter-${m.id}">${esc(m.title)} →</a>`,
      )
      .join("")}`;
  }
  if (hash.startsWith("#person-")) {
    const p = people.find((p) => p.id === hash.slice(8));
    if (!p) return "<h2>Profile unavailable</h2>";
    const works = nftCatalog.filter(
      (r) =>
        r.artistId === p.id ||
        r.artistIds?.includes(p.id) ||
        r.personIds?.includes(p.id) ||
        p.recordIds?.includes(r.id),
    );
    return `<header class="person-header">${portrait(p)}<div><p class="kicker">The people behind the music</p><h2>${esc(p.name)}</h2></div></header><p>${linked(p.bio || p.role)}</p>${(p.links || []).map((l) => `<a class="source-row" href="${esc(l.url)}" target="_blank" rel="noreferrer">${esc(l.label)} ↗</a>`).join("")}${
      works.length
        ? `<h3>Hear their work</h3>${works
            .slice(0, 5)
            .map(
              (r) =>
                `<button class="context-record" data-library-play="${r.id}">▶ ${esc(r.title)}</button>`,
            )
            .join("")}`
        : "<p>No verified recording is linked to this profile yet.</p>"
    }<h3>In this history</h3>${moments
      .filter((m) => m.people?.includes(p.id))
      .slice(0, 5)
      .map(
        (m) =>
          `<a class="source-row" href="#chapter-${m.id}">${esc(m.title)} →</a>`,
      )
      .join("")}<h3>Sources</h3>${sourceLinks(p.sources || [])}`;
  }
  return null;
}
export function buildDocumentary() {
  const root = document.querySelector("#documentary");
  root.insertAdjacentHTML(
    "beforeend",
    `<section class="cinema-intro stakes-scene" id="why-this-mattered"><figure class="intro-world"><img src="/media/latasha-press-1500.webp" alt="LATASHÁ, 2016 press portrait"><figcaption>LATASHÁ · press portrait, 2016</figcaption></figure><div class="scene-copy"><p class="kicker">The problem before the token</p><h2>Making the work.<br>On whose terms?</h2><p>${linked("LATASHÁ wanted to make videos without becoming the performer labels wanted her to be. She recalls paying for independent production with unemployment checks. Reaching an audience was one problem. Being able to keep making her work was another.")}</p><p>Other musicians were asking their own versions of that question. Could support come more directly from the people who cared about the music?</p><a class="chapter-deeper" href="#chapter-latasha-videos">Her account ＋</a><a class="inline-link" href="#chapter-early-records">Why others looked for alternatives</a></div></section>
    <section class="cinema-intro token-explainer" id="understanding-nfts"><figure class="intro-world"><img src="/media/video-latasha-623-1500.webp" alt="Frame from LATASHÁ’s ilikedat video" width="1500" height="844"><button class="doc-play" data-library-play="latasha-zora-623" aria-label="Watch ilikedat">▶</button><figcaption>LATASHÁ · ilikedat · original video frame<br>Watch the work. No token needed.</figcaption></figure><div class="scene-copy"><p class="kicker">A new way to collect music</p><h2>The song could be copied.<br>The edition had a history.</h2><p><strong>Non-fungible</strong> means individually identifiable, not interchangeable like-for-like. A <strong>token</strong> is a digital representation. Here, it is associated with a piece of music.</p><p>A blockchain records who holds that token and when it changes hands. Anyone can still hear the song. Buying its edition does not automatically buy its copyright.</p><a class="chapter-deeper" href="#concept-nft">What could owning an edition mean? ＋</a></div></section>` +
      chapters
        .map((c, i) => {
          let copy = c.moment.body.split("\n\n")[0];
          if (c.id === "tiny-human")
            copy =
              "Imogen Heap wanted a song to carry more of its makers with it: musicians, artwork, permissions and the paths by which it could be used. In 2015, she and Ujo tested part of that idea with Tiny Human on Ethereum. A listener could choose a licence and payments could flow to contributors. This was a blockchain licensing experiment, before the collectible editions explored here. Ujo closed the prototype in 2016 to concentrate on its next platform. The ambition and the difficulty were already present: a different system was imaginable, but somebody had to keep it working.";
          if (c.id === "tape")
            copy +=
              " $TAPE used fungible, redeemable tokens—not the unique editions that later became central to music NFTs. The connection is the people and the question they were testing: could artists and builders design the terms of a release together?";
          if (c.id === "genesis")
            copy =
              "Songcamp put the act of making music at the center of the experiment. Founded by Matthew Chaim, it brought nine musicians into three bands for Camp Genesis in April 2021, alongside two visual artists and two operators. The group made songs and built the release around them. Artists were not only supplying recordings to a platform; they were helping construct the project that would release them. Camp Elektra followed that summer, adding a story and game around the songs. In 2022, CHAOS would expand that shared work dramatically.";
          if (c.id === "afterglow")
            copy +=
              " Spinamp addressed another part of that problem: hearing music scattered across different release platforms. Its player and developer tools showed how another team could build a new listening experience around those releases.";
          if (c.id === "royalties")
            copy +=
              " A token can specify a resale royalty without making every marketplace pay it. The arrangement depended on technical choices and on platforms honoring it. Payment splits, resale royalties and ownership of music rights are different things; an edition did not automatically confer all three.";

          if (c.id === "latasha-videos")
            copy =
              "LATASHÁ and Jahmel Reynolds were making videos before they tried NFTs. She had chosen independence over pressure to change her image for a label, then faced the cost of producing work on her own terms. She recalls using unemployment checks to pay for shoots.\n\nJah filmed ilikedat and encouraged her to mint it. A first bid could cover her rent, she remembers. The work had not changed; a new route for supporting it had opened. Later, she would teach other artists how to use those tools and help create spaces where they could meet.";
          if (c.id === "sound-genesis")
            copy +=
              " A release could now gather several visible supporters. Yet Sound initially selected its artists: a different route into music still had gatekeepers. Its later opening to uploads would test that boundary. Daniel Allan’s presence here connects his experiment in funding an unfinished EP to a new way of releasing individual songs.";
          if (c.id === "zoratopia")
            copy +=
              " Zoratopia brought that organizing into physical gatherings. June 2022 reporting from New York names both LATASHÁ and Iman Europe. By December, an original video release gives us something more direct than a lineup: Iman performing in Miami. Watch that performance next.";
          if (c.id === "catalog")
            copy +=
              " The founders’ EPROM example could be discovered on Catalog and bid on through Zora: two interfaces, one underlying edition.";
          if (c.id === "chaos")
            copy +=
              " Camp Genesis and Camp Elektra had come before it. CHAOS expanded those experiments into 48 songs. Hear one next, then follow its makers.";
          return `<section id="history-${c.id}" class="doc-chapter layout-${c.layout} ${i % 2 ? "reverse" : ""}" data-chapter="${i}"><figure class="doc-art"><img src="${media(c, 960)}" srcset="${media(c, 480)} 480w, ${media(c, 960)} 960w, ${media(c, 1500)} 1500w" sizes="(max-width:700px) 100vw, 60vw" alt="${esc(c.credit)}" loading="lazy" decoding="async" width="${dimensions[c.image]?.[0] || 960}" height="${dimensions[c.image]?.[1] || 960}">${c.record ? `<button class="doc-play" data-library-play="${c.record}" aria-label="Play ${esc(nftCatalog.find((r) => r.id === c.record)?.title || "recording")}">▶</button>` : ""}<figcaption><a href="${esc(creditURL(c) || "#")}" target="_blank" rel="noreferrer">${esc(c.credit)} ↗</a>${c.record ? `<span class="artifact-title">${c.id === "latasha-videos" ? "Also in the archive: " : "Listen: "}${esc(nftCatalog.find((r) => r.id === c.record)?.title || "")}</span>` : ""}</figcaption></figure><div class="doc-copy"><p class="kicker">${esc(c.date)}</p><h2>${esc(c.title)}</h2>${copy
            .split(/(?<=\.)\s+(?=[A-Z])/)
            .reduce((groups, sentence, i, all) => {
              if (
                i === 0 ||
                (i === Math.ceil(all.length / 2) && all.length > 4)
              )
                groups.push(sentence);
              else groups[groups.length - 1] += " " + sentence;
              return groups;
            }, [])
            .map((t) => `<p>${linked(t)}</p>`)
            .join(
              "",
            )}${c.id === "catalog" ? `<p>${linked("The NFT is the edition’s identifiable token, not an uncopyable song. The music remains available to hear.")} <a class="entity" href="#concept-nft">What does owning it mean?</a></p>` : ""}${peopleStrip(c.id)}<a class="chapter-deeper" href="#chapter-${c.id}">Inside this story <span>＋</span></a>${c.id === "latasha-videos" ? `<p class="context-note">Her recollections are drawn from <a href="${esc(sources.minted.url)}" target="_blank" rel="noreferrer">Minted ↗</a>.</p>` : ""}<details class="doc-branches"><summary>More from this chapter</summary>${c.related
            .map((id) => moments.find((m) => m.id === id))
            .filter(Boolean)
            .map(
              (m) =>
                `<a href="#chapter-${m.id}">${esc(m.short || m.title)} →</a>`,
            )
            .join(
              "",
            )}${c.id === "chaos" ? '<a href="#music?collection=CHAOS">Browse CHAOS recordings →</a>' : ""}</details></div></section>${c.id === "tape" ? `<section class="doc-transition foundation headline-scene" id="public-attention"><div class="headline-art" aria-hidden="true"></div><p class="kicker">Early 2021 / a wider public encounters music NFTs</p><h2>An album, a collectible, an invitation.</h2><p>In February, 3LAU announced an Ultraviolet auction combining NFTs with vinyl, unreleased music and experiences. In March, Kings of Leon and YellowHeart paired When You See Yourself with collectible artwork, vinyl and ticket offers.</p><p>These prominent releases made the range of possibilities visible. An NFT could sit inside a bundle of promises. Meanwhile, musicians and builders were exploring a smaller proposition: let anyone hear a recording, and let a supporter collect its edition.</p><a class="chapter-deeper" href="#concept-headlines">What did those releases offer? ＋</a></section>` : ""}`;
        })
        .join("") +
      `<section class="doc-transition doc-finish" id="history-end"><p class="kicker">Pete’s perspective / shared for this documentary</p><h2>We could build the tools ourselves.</h2><p>Pete connects this period to becoming a technology entrepreneur. The lasting value, in his account, was in the people, their work and their ability to make things together. New software tools now let him act on that lesson: build what the community needs, rather than wait for a platform to provide it.</p><p>This is one participant’s interpretation. The archive holds other experiences too: opportunities, unfinished projects, exclusion, experiments that endured and platforms that closed.</p><a class="pill" href="#music">Explore the collection</a><p class="duration">A selected, source-backed account. This is not a complete census of the era or its participants.</p></section>`,
  );
  const film = document.querySelector("#film");
  const gathering = document.createElement("div");
  gathering.id = "gathering-sequence";
  const template = film.querySelector("#gathering-template");
  gathering.append(template.content);
  template.remove();
  root.querySelector("#history-zoratopia").after(gathering);
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries)
        e.target.classList.toggle("in-view", e.isIntersecting);
    },
    { threshold: 0.12 },
  );
  root.querySelectorAll(".doc-chapter").forEach((e) => observer.observe(e));
}
