import {
  moments,
  people,
  sources,
  relationships,
  chapter,
  identities,
} from "./data.js";

const main = document.querySelector("#main");
const sheet = document.querySelector("#sheet");
const listening = document.querySelector("#listening");
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const momentById = (id) => moments.find((m) => m.id === id);
const personById = (id) => people.find((p) => p.id === id);
let currentBase = "",
  lastFocus = null,
  mediaTimer = null,
  directoryController = null,
  lastRenderedHref = "",
  keyboardInput = false;
const params = () => new URLSearchParams(location.hash.split("?")[1] || "");
const base = () => location.hash.split("?")[0] || "#/";
const detailHref = (kind, id) => {
  const p = params();
  p.delete("person");
  p.delete("source");
  p.set(kind, id);
  return `${base()}?${p}`;
};
const personLink = (id) => {
  const p = personById(id);
  return `<a class="person-chip" href="${detailHref("person", id)}"><span class="initial">${esc(
    p.name
      .split(" ")
      .map((x) => x[0])
      .slice(0, 2)
      .join(""),
  )}</span>${esc(p.name)}<span aria-hidden="true">↗</span></a>`;
};
const sourceButton = (m) =>
  `<div class="small-label">Inspect the record</div>${m.sources.map((id) => `<a class="source-link" href="${detailHref("source", id)}"><span class="source-dot"></span> ${esc(sources[id].title)} ↗</a>`).join("")}`;
const nextLink = (id, text, cls = "") =>
  `<a class="${cls}" href="#/moment/${id}">${text}</a>`;

function sleeveArt(m, hero = false) {
  const designs = {
    remix: ["No one", "knows me", "like you.", "A song, reimagined."],
    trio: ["Walls.", "A song made together."],
    camp: ["A band", "with many", "centres.", "Songcamp / CHAOS"],
    mix: ["A shared", "frequency.", "Music finds another route."],
    gathering: ["From URLs", "to rooms.", "A place to meet."],
    archive: ["People.", "Process.", "Possibility.", "Network Archives"],
    scenes: ["A song.", "A memory.", "A scene.", "Sound of Fractures / SCENES"],
    dutch: ["Thoughtful", "Jawn.", "A challenge becomes a release."],
    xcelencia: ["El Niño", "Estrella.", "An album that keeps growing."],
    rocks: ["Rocks.", "Songs.", "Stories.", "Rae Isla"],
  };
  const words = designs[m.art] || designs.remix;
  return `<div class="sleeve-composition ${hero ? "hero-art" : ""} art-${m.art}" aria-label="Original editorial illustration of ${esc(m.short)}">
 <div class="sleeve ghost back"><span>music nerd / field notes</span><div class="rings"></div><small>Follow the credits</small></div>
 <div class="sleeve ghost middle"><span>A connection worth following</span><div class="middle-word">${m.art === "remix" ? "Three<br>Oscillators" : "Made<br>together"}</div></div>
 <div class="sleeve front"><div class="sleeve-meta"><span>${esc(m.type)}</span><span>${esc(m.date)}</span></div><div class="sleeve-title">${words.map((w) => `<span>${esc(w)}</span>`).join("")}</div><div class="sleeve-bottom"><span>${m.art === "remix" ? "Sound of Fractures<br>with Scott Quinn" : esc(m.short)}</span><span class="sleeve-mark" aria-hidden="true">✳</span></div></div>
 <div class="art-caption">Original exhibition composition · not release artwork</div></div>`;
}

function home() {
  const m = momentById("remix");
  return `<section class="opening"><div class="opening-copy"><div class="edition"><span class="live-dot"></span> The Music NFT era <span class="edition-date">2022–2024</span></div><h1>A scene,<br>in the making.</h1><p class="intro">Songs became meeting places.<br>Follow one thread through the people who made an internet feel like a scene.</p><div class="actions"><a class="button primary" href="#/moment/remix">Enter the chapter <span>↗</span></a><button class="button secondary" data-listen="remix"><span>▶</span> Listen first</button></div><p class="opening-note">Begin with a remix. Find a temporary band.<br>Leave with a different way of hearing the credits.</p></div><div class="opening-art">${sleeveArt(m, true)}<a class="art-link" href="#/moment/remix">Sound of Fractures <span>→</span> Three Oscillators <span>→</span> CHAOS</a></div></section>
 <section class="opening-bottom"><div><span class="small-label">One opening chapter</span><p>Six stops. Many ways to wander.</p></div><p>A partial history, with the sources left in.<br>Made for the people who were there—and those who weren’t.</p><a href="#/explore">Explore the connections <span>↗</span></a></section>`;
}

function momentView(m) {
  const index = chapter.indexOf(m.id),
    previous = index > 0 ? chapter[index - 1] : null,
    next = index >= 0 ? chapter[index + 1] : null;
  return `<div class="chapter-shell"><aside class="chapter-rail"><a class="back-link" href="#/">← The opening</a><p class="small-label">The thread</p><ol>${chapter.map((id, i) => `<li class="${m.id === id ? "active" : ""}"><a href="#/moment/${id}" ${m.id === id ? 'aria-current="step"' : ""}><span>${String(i + 1).padStart(2, "0")}</span><span>${esc(momentById(id).short)}</span></a></li>`).join("")}</ol><a class="rail-footer" href="#/explore">All moments & people ↗</a></aside>
 <article class="story"><div class="story-meta"><span>${esc(m.date)}</span><span>${esc(m.type)}</span>${index >= 0 ? `<span>${index + 1} of ${chapter.length}</span>` : "<span>A side path</span>"}</div><div class="story-spread"><div class="story-copy"><h1>${esc(m.title)}</h1><p class="deck">${esc(m.deck)}</p><p class="body-copy">${esc(m.body)}</p>${m.album ? `<button class="button primary" data-listen="${m.id}">▶ Listen to the release</button>` : `<a class="button secondary" target="_blank" rel="noopener noreferrer" href="${m.artifactUrl}">${esc(m.artifact)} ↗</a>`}<div class="provenance">${sourceButton(m)}</div></div><div class="story-art">${sleeveArt(m)}</div></div>
 <section class="credits"><div><h2>The people in this moment</h2><p>${m.id === "network" ? "Publication credits. These are not all musical collaborations." : m.people.length ? "Follow a name to see the connection and its evidence." : "This record concerns platforms; individual artist participation is not asserted."}</p></div><div class="people-strip">${m.people.map(personLink).join("")}</div></section>
 ${m.uncertainty ? `<details class="uncertainty"><summary>Where the record is incomplete <span>＋</span></summary><p>${esc(m.uncertainty)}</p></details>` : ""}
 ${m.interpretation ? `<div class="curator-note"><span class="small-label">A way to hear it</span><p>${esc(m.interpretation)}</p><span class="muted">Editorial interpretation</span></div>` : ""}
 <section class="connections"><h2>Follow another thread</h2><div>${m.related
   .map((id) => {
     const r = momentById(id);
     return `<a href="#/moment/${id}" class="connection"><span>${esc(r.date)}</span><strong>${esc(r.short)}</strong><span aria-hidden="true">↗</span></a>`;
   })
   .join("")}</div></section>
 <footer class="story-footer">${previous ? nextLink(previous, "← Previous stop", "quiet") : '<a class="quiet" href="#/">← Opening</a>'}${next ? nextLink(next, `<span>Next in the chapter</span><strong>${esc(momentById(next).short)} →</strong>`, "next-stop") : '<a class="next-stop" href="#/explore"><span>The chapter continues through you</span><strong>Find someone to hear next →</strong></a>'}</footer></article></div>`;
}

function explore() {
  return `<section class="explore-page"><div class="explore-heading"><div><p class="small-label">The wider orbit</p><h1>Follow the people.<br>Keep the context.</h1></div><p>Some made songs together. Some shared a stage, a platform, or a publication. Every connection here says which.</p></div><div class="explore-controls"><div role="group" aria-label="Explore view"><button data-view="moments" class="selected" aria-pressed="true">Moments <span>${moments.length}</span></button><button data-view="people" aria-pressed="false">People <span>${people.length}</span></button></div><label class="search-box"><span class="sr-only">Search moments or people</span><span aria-hidden="true">⌕</span><input type="search" id="search" placeholder="A name, a song, a place…" autocomplete="off"></label></div><p class="scope-note">A sourced selection, not a complete census. Network Archives credits are included in full as listed; the complete CHAOS roster is still being reconciled.</p><div id="explore-results"></div></section>`;
}

function renderResults(view = "moments", query = "") {
  const target = document.querySelector("#explore-results");
  if (!target) return;
  const term = query.trim().toLowerCase();
  if (view === "people") {
    const list = people
      .filter((p) =>
        `${p.name} ${p.role} ${p.groups.join(" ")}`
          .toLowerCase()
          .includes(term),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
    target.innerHTML = `<p class="result-count" role="status">${list.length} people and credited contributors</p><div class="people-index">${list.map((p) => `<a href="${detailHref("person", p.id)}"><span class="index-avatar">${esc(p.name.slice(0, 1))}</span><div><h2>${esc(p.name)}</h2><p>${esc(p.role)}</p></div><span>↗</span></a>`).join("")}</div>${!list.length ? '<div class="empty"><h2>No match in this chapter.</h2><p>Try a surname, a project, or clear the search. Missing from this selection does not mean absent from the scene.</p></div>' : ""}`;
  } else {
    const list = moments
      .filter((m) =>
        `${m.title} ${m.short} ${m.body} ${m.people.map((id) => personById(id).name).join(" ")}`
          .toLowerCase()
          .includes(term),
      )
      .sort((a, b) => a.year - b.year);
    target.innerHTML = `<p class="result-count" role="status">${list.length} moments · dates shown at the precision the sources support</p><div class="moment-index">${list.map((m) => `<a href="#/moment/${m.id}"><span class="index-date">${esc(m.date)}</span><span><small>${esc(m.type)}</small><h2>${esc(m.short)}</h2><p>${esc(m.deck)}</p></span><span class="index-arrow">↗</span></a>`).join("")}</div>${!list.length ? '<div class="empty"><h2>No match in this chapter.</h2><p>Clear the search or try an artist’s name.</p></div>' : ""}`;
  }
}

function about() {
  return `<article class="about-page"><a class="back-link" href="#/">← Back to the exhibition</a><p class="small-label">About this experiment</p><h1>A small slice.<br>Room to go deep.</h1><p class="deck">Music Nerd can hold the knowledge. An experience can help us feel the connections.</p><p>This opening follows a 2023 remix credit back into CHAOS in 2022, then across releases, platforms and gatherings to Network Archives in 2024. It is an editorial path through a partial account, not a definitive history of the Music NFT era.</p><h2>What kind of connection?</h2><dl class="evidence-key"><dt>Made together</dt><dd>A named creative credit or participant account.</dd><dt>Shared event</dt><dd>A reported performance or announced billing. Those are distinguished.</dd><dt>Shared publication</dt><dd>Credited in the same archive. No friendship or musical collaboration is implied.</dd><dt>Collected</dt><dd>A transaction or holding. Useful as a research lead, not proof of influence.</dd></dl><h2>What comes from where?</h2><p>The historical moments and connections are locally authored, source-backed fixtures. Three independently matched artist identities—Dutchyyy, Sound of Fractures and Three Oscillators—can be checked live against Music Nerd’s public directory when their detail opens. Nothing here writes to Music Nerd or reads private Lore.</p><p>Music loads only when requested, through official Bandcamp embeds. The record-sleeve illustrations are original exhibition compositions, not original release artwork. All source material remains with its publishers.</p><h2>The record is unfinished</h2><p>The complete CHAOS contributor roster has not been recovered. Early plans and later retrospectives differ on song counts, duration and participant totals. The named contributors here are a verified subset. A dated, contributor-reviewed roster is the next research step.</p><p>Pete’s public collection was inspected as a source of leads. A partial Ethereum inventory surfaced releases by Black Dave and others; it is neither a complete cross-chain inventory nor evidence of creative collaboration. Raw wallet records are not included in this exhibit.</p><h2>Another perspective</h2><p>Benjamin James, also known as musicben, documented music NFTs and now publishes STVDIO. His <a href="${sources.ben.url}" target="_blank" rel="noopener noreferrer">2025 retrospective</a> provides a later view of the platforms’ changing fortunes.</p><h2>Were you there?</h2><p>Contributor submissions are a future feature. For now, this is a reviewable local prototype: bring the missing story, a correction, or an original source to the Music Nerd team.</p><a class="button primary" href="#/explore">Explore the evidence ↗</a><h2>Source index</h2><div class="source-index">${Object.entries(
    sources,
  )
    .map(
      ([id, s]) =>
        `<a href="${detailHref("source", id)}"><span>${esc(s.kind)} · ${esc(s.date)}</span><strong>${esc(s.title)}</strong></a>`,
    )
    .join("")}</div></article>`;
}

function personPanel(id) {
  const p = personById(id);
  if (!p)
    return '<h2 id="sheet-title">Person not found</h2><p>This person is not in the verified selection.</p>';
  const edges = relationships.filter((r) => r.from === id || r.to === id);
  const linked = moments.filter((m) => m.people.includes(id));
  return `<p class="small-label">A person, in context</p><h2 id="sheet-title">${esc(p.name)}</h2><p class="deck">${esc(p.role)}</p><div id="directory-status">${identities[id] ? '<p class="muted">Checking the confirmed Music Nerd identity…</p>' : '<p class="muted">Directory identity not independently matched in this prototype.</p>'}</div><h3>Documented connections</h3>${
    edges.length
      ? edges
          .map((r) => {
            const other = personById(r.from === id ? r.to : r.from);
            return `<div class="relationship"><span class="small-label">${esc(r.type)}</span><a class="relationship-name" href="${detailHref("person", other.id)}">${esc(other.name)} ↗</a><p>${esc(r.note)}</p><a href="${detailHref("source", r.source)}">Inspect evidence</a> <span class="muted">/</span> <a href="#/moment/${r.moment}">Open moment</a></div>`;
          })
          .join("")
      : "<p>This contributor is credited in the linked moments. No pairwise creative relationship is asserted yet.</p>"
  }<h3>Identity and credit sources</h3>${p.sources.map((sid) => `<a class="panel-moment" href="${detailHref("source", sid)}"><strong>${esc(sources[sid].title)} ↗</strong></a>`).join("")}<h3>Find them in the story</h3>${linked.map((m) => `<a class="panel-moment" href="#/moment/${m.id}"><small>${esc(m.date)}</small><strong>${esc(m.short)} ↗</strong></a>`).join("")}<div class="panel-footnote">Credits are roles, not a ranking. This record may be incomplete.</div>`;
}

function sourcePanel(id) {
  const s = sources[id];
  if (!s)
    return '<h2 id="sheet-title">Source not found</h2><p>The link may be incomplete. Close this panel to keep exploring.</p>';
  const related = moments.filter((m) => m.sources.includes(id));
  return `<p class="small-label">${esc(s.kind)}</p><h2 id="sheet-title">${esc(s.title)}</h2><p class="source-by">${esc(s.by)}</p><p class="source-date">${esc(s.date)}</p><h3>What this supports</h3><p>${esc(s.note)}</p><a class="button primary" href="${s.url}" target="_blank" rel="noopener noreferrer">Open original source ↗</a><p class="muted source-url">${esc(s.url)}</p><h3>Used in this chapter</h3>${related.map((m) => `<a class="panel-moment" href="#/moment/${m.id}"><small>${esc(m.date)}</small><strong>${esc(m.short)} ↗</strong></a>`).join("")}<h3>Read with care</h3><p>Publication date, event date and date recalled are different things. A participant account is attributed; an interpretation is labeled. Access checked during research on November 3, 2026; external sites can change.</p>`;
}

async function refreshDirectory(id) {
  if (!identities[id]) return;
  directoryController?.abort();
  directoryController = new AbortController();
  const controller = directoryController;
  const timeout = setTimeout(() => controller.abort(), 8000);
  let result;
  try {
    const r = await fetch(`/api/directory/${id}`, {
      signal: controller.signal,
    });
    result = r.ok ? await r.json() : { status: "unavailable" };
  } catch {
    result = { status: "unavailable" };
  } finally {
    clearTimeout(timeout);
  }
  if (params().get("person") !== id || directoryController !== controller)
    return;
  const el = document.querySelector("#directory-status");
  if (!el) return;
  el.innerHTML =
    result.status === "live"
      ? `<a class="directory-link" href="https://musicnerd.net/artist/${identities[id].id}" target="_blank" rel="noopener noreferrer"><span class="live-dot"></span> Open Music Nerd profile ↗</a><p class="muted">Identity checked live against a confirmed artist reference.</p>`
      : `<p class="muted">${result.status === "unconfirmed" ? "The current directory result could not be confirmed." : "Music Nerd is taking a moment. The sourced story is still available."}</p><button class="quiet" data-retry="${id}">Try directory again</button>`;
}

function stopListening() {
  clearTimeout(mediaTimer);
  document.querySelector("#player").replaceChildren();
  if (listening.open) listening.close();
}
function listen(id) {
  const m = momentById(id);
  if (!m?.album) return;
  lastFocus = document.activeElement;
  stopListening();
  document.querySelector("#listen-title").textContent = m.listenLabel;
  const fallback = document.querySelector("#player-fallback");
  fallback.href = m.id === "scenes" ? sources.scenes.url : sources.remixes.url;
  const status = document.querySelector("#player-status");
  status.textContent = "Loading the official player…";
  const iframe = document.createElement("iframe");
  iframe.title = m.listenLabel + " — official Bandcamp player";
  iframe.src = `https://bandcamp.com/EmbeddedPlayer/album=${m.album}/size=large/bgcol=ffffff/linkcol=333333/artwork=small/transparent=true/`;
  iframe.loading = "eager";
  iframe.allow = "encrypted-media";
  iframe.addEventListener("load", () => {
    clearTimeout(mediaTimer);
    status.textContent =
      "If the player cannot play here, open the artist’s release below.";
  });
  document.querySelector("#player").append(iframe);
  mediaTimer = setTimeout(() => {
    status.textContent =
      "The player is taking longer than expected. You can listen on the artist’s Bandcamp below.";
  }, 9000);
  listening.showModal();
}

function navigate(href, replace = false) {
  const oldBase = base(),
    newBase = href.split("?")[0],
    isDetail = /[?&](person|source)=/.test(href);
  history.replaceState(
    { ...history.state, scroll: scrollY },
    "",
    location.href,
  );
  const depth =
    isDetail && oldBase === newBase
      ? (history.state?.depth || 0) + 1
      : isDetail
        ? 1
        : 0;
  const state = { depth, scroll: 0 };
  if (replace) history.replaceState(state, "", href);
  else history.pushState(state, "", href);
  render(false);
}

function closeSheet() {
  if (history.state?.depth > 0) history.go(-history.state.depth);
  else {
    const p = params();
    p.delete("person");
    p.delete("source");
    navigate(base() + (p.size ? "?" + p : ""), true);
  }
}

function render(pop = false) {
  if (lastRenderedHref === location.href) return;
  lastRenderedHref = location.href;
  const hasPreviousPage = Boolean(currentBase);
  const route = base();
  const changed = route !== currentBase;
  if (changed) {
    stopListening();
    if (sheet.open) sheet.close();
    const parts = route.split("/");
    const m = parts[1] === "moment" ? momentById(parts[2]) : null;
    let html =
      route === "#/"
        ? home()
        : route === "#/explore"
          ? explore()
          : route === "#/about"
            ? about()
            : m
              ? momentView(m)
              : `<section class="about-page"><h1>This thread isn’t here.</h1><p>The link may be incomplete. The chapter is still ready to explore.</p><a class="button primary" href="#/">Back to the opening</a></section>`;
    const update = () => {
      main.innerHTML = html;
      currentBase = route;
      document.title =
        (m
          ? m.short
          : route === "#/explore"
            ? "People & connections"
            : "A scene, in the making") + " — Music Nerd";
    };
    update();
    main.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    if (
      hasPreviousPage &&
      !keyboardInput &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      main.firstElementChild.animate(
        [
          { opacity: 0.2, transform: `translateX(${pop ? -10 : 10}px)` },
          { opacity: 1, transform: "translateX(0)" },
        ],
        { duration: 240, easing: "cubic-bezier(.2,.7,.2,1)" },
      );
    if (route === "#/explore") {
      const q = params().get("q") || "",
        view = params().get("view") === "people" ? "people" : "moments";
      document.querySelector("#search").value = q;
      setExploreView(view, q);
    }
    window.scrollTo({
      top: pop ? history.state?.scroll || 0 : 0,
      behavior: "instant",
    });
    if (hasPreviousPage) main.focus({ preventScroll: true });
  }
  const p = params();
  const person = p.get("person"),
    source = p.get("source");
  if (person || source) {
    if (!sheet.open) lastFocus = document.activeElement;
    document.querySelector("#sheet-content").innerHTML = person
      ? personPanel(person)
      : sourcePanel(source);
    sheet.scrollTop = 0;
    if (!sheet.open) sheet.showModal();
    document.querySelector("#sheet-back").hidden = !(history.state?.depth > 1);
    document.querySelector("#sheet-title")?.setAttribute("tabindex", "-1");
    document.querySelector("#sheet-title")?.focus();
    if (person) refreshDirectory(person);
  } else if (sheet.open) {
    sheet.close();
    directoryController?.abort();
    if (lastFocus?.isConnected) lastFocus.focus();
  }
  if (route === "#/explore" && !person && !source) {
    const q = p.get("q") || "",
      view = p.get("view") === "people" ? "people" : "moments";
    document.querySelector("#search").value = q;
    setExploreView(view, q);
  }
  document
    .querySelector("#chapter-link")
    .setAttribute(
      "aria-current",
      route.startsWith("#/moment") ? "page" : "false",
    );
  document
    .querySelector("#explore-link")
    .setAttribute("aria-current", route === "#/explore" ? "page" : "false");
  document.querySelector("#announcement").textContent = person
    ? personById(person)?.name || "Person"
    : source
      ? "Source detail"
      : document.title;
}

function setExploreView(view, query) {
  document.querySelectorAll("[data-view]").forEach((b) => {
    b.classList.toggle("selected", b.dataset.view === view);
    b.setAttribute("aria-pressed", String(b.dataset.view === view));
  });
  renderResults(view, query);
}

document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#/"]');
  if (a && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
    e.preventDefault();
    lastFocus = a;
    navigate(a.getAttribute("href"));
    return;
  }
  const play = e.target.closest("[data-listen]");
  if (play) listen(play.dataset.listen);
  const retry = e.target.closest("[data-retry]");
  if (retry) refreshDirectory(retry.dataset.retry);
  const view = e.target.closest("[data-view]");
  if (view) {
    const q = document.querySelector("#search").value;
    const p = new URLSearchParams({ view: view.dataset.view });
    if (q) p.set("q", q);
    history.replaceState({ ...history.state }, "", `#/explore?${p}`);
    setExploreView(view.dataset.view, q);
  }
});
document.addEventListener("keydown", () => {
  keyboardInput = true;
  document.documentElement.dataset.input = "keyboard";
});
document.addEventListener("pointerdown", () => {
  keyboardInput = false;
  document.documentElement.dataset.input = "pointer";
});
document.addEventListener("input", (e) => {
  if (e.target.id === "search") {
    const view = document.querySelector("[data-view].selected").dataset.view,
      q = e.target.value;
    const p = new URLSearchParams({ view });
    if (q) p.set("q", q);
    history.replaceState({ ...history.state }, "", `#/explore?${p}`);
    renderResults(view, q);
  }
});
document.querySelector("#sheet-close").onclick = closeSheet;
document.querySelector("#sheet-back").onclick = () => history.back();
sheet.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeSheet();
});
document.querySelector("#listen-close").onclick = stopListening;
listening.addEventListener("cancel", (e) => {
  e.preventDefault();
  stopListening();
});
listening.addEventListener("close", () => {
  document.querySelector("#player").replaceChildren();
  if (lastFocus?.isConnected) lastFocus.focus();
});
window.addEventListener("popstate", () => render(true));
window.addEventListener("hashchange", () => render(true));
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector("#theme")
    .setAttribute(
      "aria-label",
      `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
    );
  try {
    localStorage.setItem("era-theme", theme);
  } catch {}
}
try {
  setTheme(localStorage.getItem("era-theme") || "dark");
} catch {
  setTheme("dark");
}
document.querySelector("#theme").onclick = () =>
  setTheme(
    document.documentElement.dataset.theme === "dark" ? "light" : "dark",
  );
history.scrollRestoration = "manual";
history.replaceState({ depth: 0, scroll: 0 }, "", location.href);
render();
