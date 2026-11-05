# Decisions that shaped the experience

This is a reconstruction of observed iterations, not a complete chronological transcript. Dates are only assigned where the edit is recorded.

| Decision | What prompted it | Result |
| --- | --- | --- |
| Separate repository | Music Nerd is the knowledge layer; the artifact should stand independently | Read-only adapters and editorial fixtures rather than a new knowledge backend |
| Scrolling documentary | Initial directory/wiki layout required clicks before the story began | Six movements unfold on native scroll, with optional branches |
| Human stakes before the early date | An isolated 2015 licensing example did not complete the opening thought | Explain agency and collecting, then step back into selected precursors; no definitive-first claim |
| Original art and accurate captions | Initials, absent visuals and cropped portraits weakened the experience | Responsive imagery, deliberate framing, original token artwork and explicit source captions |
| Direct artwork play | Separate listening modal and native audio controls felt cumbersome | Direct play controls plus persistent collection queue |
| One-track prebuffer | Skipping waited on repeated metadata/media lookup | Silently prepare only the upcoming recording; keep request scope bounded |
| Culture beyond drops | Coverage missed organizers, ordinary participation and artist experiments | Future Surf, artist worlds, filmed performances and changing participation supply deeper branches |
| Names open people | Full names alone still left participants unexplained | Shared contextual drawer, evidence, recordings and verified external links |
| Aliases remain historical | Pete identified Aly as Lackhoney; a contemporary newsletter links the names | Shared person context and search; original titles/credits preserved |
| Lab build record | Pete requested a recreatable protocol | This versioned packet records prompts, process, resources, tests and limits |

An alternative considered and rejected: adding every possible navigation mode or a decorative relationship graph. Connections should first work through a specific person, artifact and source. Broader history remains expandable without bloating the primary reading path.

## Context at the point of discovery · November 4

Pete flagged unexplained Imogen Heap and Zora references. Added a full Tiny Human passage with Heap’s illustrated song map, its later publication date, the licensing/payment experiment and Ujo’s closure explanation. Platform/project names now reuse the same accessible, history-aware drawer as people. Period-specific entries distinguish Zora’s marketplace, shared infrastructure and gatherings; Catalog, Sound, Glass, Loft Radio, Mycelia, Ujo and Zoratopia also have context. Click/tap gives full context; the link title supplies a brief desktop hover hint. Avoid hover-only information. These are editorial fixtures, not new live Music Nerd integrations.

## Coverage and discovery correction · November 4, midday

Pete flagged missing portraits, past-tense NFT definitions, CHAOS dominating the general recordings page, and absent contributor outputs. Removed the CHAOS spotlight from the general library (its story-specific chapter remains); CHAOS is available through the Collections filter. Artist filtering and text search now include source-confirmed contributor identities. Present-tense definitions distinguish the medium from dated events. Four public profile images and four direct-token-verified recordings were added. The research ledger now lists image and recording coverage for every person rather than implying the partial index is a complete discography. CAMPFIRE announcements with unresolved contracts remain evidence links, not fabricated players.

## November 4 · experience refinement

After the coverage audit, the next pass prioritized discovering and hearing work inside artist context. Profile drawers reuse compact recording cards (up to three selected works), place them before source lists, and stop their inline player when the drawer closes or changes. A player in the underlying library remains intact during a profile detour. Role credits distinguish production from performance and ownership. Reduced profile-image and library-header sizes keep the next useful action visible. Browser inspection exposed blank areas during remote artwork loading; five verified token artworks now have local responsive WebP derivatives. Original audio/video URLs remain unchanged. The closing passage now separates surviving tokens, media, websites and community rather than treating a closed platform as the end of NFTs.

## November 4 · whole-documentary editorial rewrite

Pete rejected fact-by-fact narration and requested a music-journalist’s synthesis across the entire experience. Rewrote the 18 film passages and 36 deeper chapter bodies around agency, participation, collective work and afterlives. Retained dates and source/uncertainty records; kept uncertainty in the narration where it changes the story. Added paragraph pacing, removed empty generic sidebars, and made Future Surf’s named hosts actual participant links. New synthesis used the existing research, not newly claimed interviews. See `docs/EDITORIAL-APPROACH.md` and the exported script. A source-backed argument is required; confident tone alone is not sufficient.

## November 4: Sound discovery, Park reconciliation and manual listening queue

User requested all Sound NFTs, specifically Optimism, and supplied The Park's works archive. Added reproducible read-only factory-log discovery, explicit missing-metadata state, cross-chain token readers and ERC1155 URI support. Audited the artist's public release pages separately from chain verification. Imported only recovered representative NFT records; left unresolved records in the coverage inventory. Added chain filtering and card-level queue actions using the existing player. See `../research/SOUND-PARK-IMPORT.md` for commands, exact scope and remaining completeness gaps. Neither the factory inventory nor the Park source list is advertised as a complete NFT archive.

## November 4: terminology, interpretation and verification

Pete asked to define non-fungible and token, and move ahead on the broader gaps. The first definition was too dense on mobile; it became two short editorial definitions within the existing opening. Clarified that music can be copied and that the token carries distinct identity/history, rather than claiming an NFT prevents copying. Added The Park's optional source-backed chapter with three playable records and a route to all 29 imported works. Expanded older Sound factory discovery using official deployment artifacts, rather than extrapolating from V2. Added a bounded shared metadata-request cache; failed reads remain retryable. The image audit distinguishes attribution, official press distribution and unverified licenses; it does not treat protected hosting as copyright clearance.

## November 5 — Minted and music-first editorial scope

Used the user's Minted transcript as a research lead, then checked PBS speaker labels, artist interviews and original work pages. Added LATASHÁ's motivations, exclusion/education account and production sustainability to the existing story; added optional music-video and resale-royalty context. Kept NFT resale payments distinct from music rights and splits.

Pete corrected an over-expansion: Jah belongs as a discoverable filmmaker/collaborator, not a standalone documentary chapter. His linked profile includes Helmet City credits, official film artwork and links to his film, Zora collection and wider practice. Removed the proposed Helmet City chapter before publication. Jasti and the Yusuf twins remain transcript-research corrections; Kina and Paolo are excluded from the music narrative. Identifying someone does not establish relevance.

Original token media for ilikedat, Joyride II and Mecha Gardens remains unresolved; no fabricated playback was added. Film publication dates are not assigned to depicted events. Verification:24 unit tests and60 browser checks passed; Jah's contextual profile and Back navigation reviewed at1440px and390px. The poster is attributed as film artwork, not a portrait or blanket-licensed asset.
