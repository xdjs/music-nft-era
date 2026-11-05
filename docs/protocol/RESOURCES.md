# Resource and implementation map

## Historical evidence

- `src/data.js` and `src/narrative.js`: the actual source records, moments, people, relationships and optional close readings used by the site.
- `docs/SOURCES.md`, `docs/ERA-RESEARCH-LEDGER.md`, `docs/STORY-EDIT-2026-11-04.md`: source inventory, expansion leads and latest editorial decisions.
- `src/nft-catalog.js`: selected chain/contract/token editions, original artwork pointers, credits and checked-block metadata. A selection, not an artist's complete discography.
- `docs/NFT-COVERAGE.md`, `docs/MEDIA.md`, `docs/PEOPLE-IMAGES.md`: coverage and image attribution/limitations.

Primary starting points: Songcamp journals and the Walls oral history; Catalog founder interviews; artist release notes; Sound announcements; Zoratopia event records; Future Surf newsletters; TK's Digital Punks interview; Black Dave's Glass/Reveel essay; original Heart Project updates; Violetta Zironi's Moonshot page; the Chill Pill retrospective; Coop Records founder accounts. Exact links and dates are in the source records, not reconstructed from handles.

## Design and implementation

- `docs/CINEMATIC-DIRECTION.md`, `docs/DESIGN.md`, `docs/RESEARCH.md`: visual decisions, reference behavior and its adaptation.
- `src/app.js`: routing, scrolling scenes, drawer/history behavior, inline listening, recording filters and contextual name links.
- `src/film.css`: current documentary treatment. `src/style.css`: shared pages, controls and drawers.
- `src/playlist.js`: persistent queue, playback state, skip/shuffle and one-upcoming-track buffering.
- `src/nft-reader.mjs`: original-token metadata/media resolution and URL boundaries.
- `src/nft-collections.mjs`: collection browsing adapter.
- `src/directory.js`: constrained Music Nerd identity lookup.
- `server.mjs`: local server and explicit public-file allowlist. Adding a browser module/asset requires updating it.
- `tests/`: data-edge checks, adapter boundaries and browser journeys.

## Access and rights

Local source-backed editorial fixtures are sufficient to reproduce the journey without a production database. Live Music Nerd checks are limited to independently pinned identities. No private Lore, raw internal research or credentials belong in the client or protocol.

A public source is not a blanket asset license. Preserve attribution and provenance, use lawful embeds, and review rights before public distribution. Local contextual artwork use and verification of its original token address do not confer publication rights.

The original private meeting Doc, authenticated Grok conversation state and raw working transcripts are not part of this public packet. Keep their lessons and public citations, not private payloads.
