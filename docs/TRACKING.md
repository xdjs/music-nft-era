A standalone, read-only Music Nerd exhibition prototype requested by Pete on November 3, 2026. Local implementation and verification only; deployment and merge are not authorized.

**Owner:** Pete Rango — prototype acceptance; Carl's concept informs the brief.
**Customer:** Music Nerd community members and listeners discovering this history.
**Done when:** A visitor can enter a source-backed opening chapter, hear an optional lawful artifact, inspect a moment and its provenance, follow a documented relationship, and return coherently on desktop and phone.

## Goal

Build an original exhibition interface in this repository. Foreground a bounded CHAOS collaboration story and offer sourced branches into the wider Music NFT community, platforms, and subsequent work. Use a small fixture/adapter boundary; never mutate production data or expose private Lore.

## Open

- [x] Research 6–8 useful interface references, including at least three desktop/mobile interaction reviews; inspect wodniack.dev outside its interactive banner.
- [x] Source the chapter and wider orbit with typed relationships, date precision, and explicit conflicts/gaps.
- [x] Build arrival, curated path, moment detail, people/connections, provenance, optional listening, and coherent back/forward/deep links.
- [x] Verify keyboard, reduced motion, desktop/phone layouts, media lifecycle, API failures, and field allowlisting.
- [x] Deliver local preview, code, captures, reference matrix, source inventory, and live/fixture inventory.

## Architecture decisions

- Separate repository, as explicitly requested by Pete; MusicNerdWeb is a read-only reference.
- Local source-backed fixtures hold editorial history. Public Music Nerd artist search supplies independently matched directory identities through a read-only adapter.
- No wallet signing, account system, ingestion, production write, deployment, or merge.
- A public collection can supply research leads; token ownership does not establish collaboration or friendship. Keep raw wallet research out of this repository.
- Wider orbit membership is a bounded editorial scope, not a claim to a definitive community roster.

## Source references

- [Music Nerd public API](https://docs.musicnerd.net/api-reference/lookups/search-artists)
- [CHAOS participant oral history](https://archive.metalabel.com/magazine/features/creating-chaos-an-oral-history-of-walls)
- [Songcamp retrospective](https://paragraph.com/@songcamp/chaos-one-year-in-the-life-of-a-massive-multiplayer-band)
- [Network Archives release credits](https://networkarchives.metalabel.com/directoryofinspiration)
- [Motion reference](https://wodniack.dev/) — banner excluded by Pete.

## PRs

Implementation is locally verified on `codex/opening-chapter`; draft PR link will be recorded on issue #1. No merge or deployment. Owner acceptance remains pending.
