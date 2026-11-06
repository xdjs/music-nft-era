# Verification — November 3, 2026

Local preview: `http://127.0.0.1:4178`. No hosted preview, merge or deployment. The separate MusicNerdWeb worktree was preserved.

## Observed visitor journey

Arrive → music-NFT primer (including keyboard tabs and copyright source) → early records → online rooms → Sound → CHAOS → Walls → Three Oscillators → Boy Untitled → oral-history source → close back to Walls → Zoratopia → later remix → platform afterlives → people index → retained Dutchyyy search. Repeated at 1440×1000 and 390×844 in dark and light themes.

| Contract | Observed result |
| --- | --- |
| Evocative opening with a concrete connection | Three photographic/artwork portals, 2021–24 community chapter with a 2020 prologue and platform afterlives, question-led entry trail, entry/listen actions visible on phone. |
| Moment, people, music and provenance | All nine curated stops and sourced side paths render. Artist panels identify the relationship type; each moment exposes every supporting source. |
| Back, nested sheets and deep links | Nested person/source Back and close pass; direct source link closes into containing moment; filtered people search restored; moment browser Back restores scroll. |
| Keyboard | Skip link receives initial Tab focus; keyboard entry works; native dialog focus confinement, focused heading, Escape and return-to-trigger tested. |
| Reduced motion | No running animation during tested keyboard/reduced-motion navigation. |
| Touch layout | 390px phone viewport with touch emulation; no horizontal document overflow on the path. Fixed detail sheet fits the viewport and scrolls. |
| Light and dark | Both rendered and visually inspected; contrast, controls, source sheets and path remain coherent. |
| Optional audio | No iframe before request. Real official player initially paused at 0; explicit play advanced audio; pause held current time stable; Stop removed iframe. Phone player captured. |
| Media failure | Blocked embed still leaves the artist release link and stop control. Photography loads as responsive local images; third-party audio remains opt-in. |
| Directory failure and slowness | Mocked failed response and stalled request both reach explicit retry state while the source-backed story stays usable. |
| Real Music Nerd integration | Live server reads confirmed Dutchyyy, Sound of Fractures and Three Oscillators using pinned IDs plus independent handles. Real Three Oscillators phone panel captured. |
| Public/private boundary | Unknown identities, raw research, docs, Git config and server modules return 404; write methods return 405. Unit test rejects ambiguous/external-only candidates and strips private fields. |
| Source URLs | 17 of 18 direct HTTP GET checks returned 200; nft now returned 403 to the automated check despite prior content retrieval. Original Sound page unavailable and not used as the authoritative link. See SOURCE-LINK-CHECKS.md. |

## Checks

`npm run ci` passed: JavaScript syntax, Prettier, **5 unit tests**, **12 browser tests**. Browser tests use Chromium, desktop and touch-emulated phone. They deliberately mock directory/media failures; those tests do not prove production integrations. The separate live playback/identity check was also run successfully against actual services.

No runtime dependencies, third-party font/image CDN or framework hydration on initial load. Barlow Condensed is locally hosted; artist/project imagery uses responsive WebP derivatives. The server serves a small set of local ES modules/CSS; third-party media loads only after listening is requested. Native scrolling and short transform/opacity transitions were inspected. This is not a measured Core Web Vitals claim or a physical-device battery/performance audit.

## Captures

- [Desktop opening, dark](../captures/opening-desktop-dark.png) / [light](../captures/opening-desktop-light.png)
- [Phone opening, dark](../captures/opening-phone-dark.png) / [light](../captures/opening-phone-light.png)
- [Desktop Walls chapter](../captures/walls-desktop-dark.png) / [phone](../captures/walls-phone-dark.png)
- [Phone relationship, light](../captures/relationship-phone-light.png) — intentionally simulated unavailable directory
- [Phone relationship, real live directory](../captures/live-directory-phone.png)
- [Official player, desktop](../captures/listening-desktop.png) / [phone](../captures/listening-phone.png)

Reference screenshots are local research evidence and not redistributed in the public repository.

## Design review — rebuilt presentation

The previous typographic sleeve-stack direction was rejected. The revised opening uses artist portraits and authentic CC0lab artwork, monumental Barlow display type and navigable image portals. Full-frame moment scenes replace the sidebar layout. A six-image contact sheet shows position; explanatory text and credits sit below the scene, with sources in an expandable section and reversible panels.

Desktop and phone captures were visually reviewed. The first phone review exposed a cropped Sound of Fractures face; the focal position was corrected. Mobile portal captions were moved clear of the overlapping central artwork. Both themes retain deliberately dark photographic stages for readable white typography. The presentation shares Music Nerd's quiet wordmark and pink controls, but is an independently proposed exhibition direction, awaiting Pete's review.

## Limits and remaining publication steps

Physical iOS/Safari, Firefox, screen-reader speech output and deployed-host behavior are unverified. External embeds and publisher pages may change or restrict access. The complete CHAOS roster, independent accounts of its allocation dispute and cross-chain collection coverage remain research gaps, not completed work.

For publication: resolve the photograph redistribution terms in MEDIA.md (especially the DMY-delivered Sound of Fractures image); Pete reviews this local journey; contributors review the historical scope; choose and authorize hosting; adapt the same read-only routes if needed; rerun browser/CSP/live checks there; approve deployment. No new database or migration is required. The issue stays open for owner acceptance.

## People imagery pass — November 3

All 46 people/contributor entries now show researched images in the directory, moment-credit chips and detail panels. Public profile avatars and collective icons are described accurately; no face is invented for a pseudonymous contributor. See PEOPLE-IMAGES.md for the complete source map. A dedicated browser pass loaded all 46 directory images and all 46 detail images, then checked phone layout and Escape back to the people view. Full `npm run ci` passed again (5 unit tests, 12 browser tests). Desktop directory and phone detail captures: `captures/people-desktop.png`, `captures/people-phone.png`, `captures/black-dave-phone.png`.

The narrative remains under revision following the transcript review. Passing UI tests does not establish that the current remix-first opening explains the era adequately. The next content pass must establish what music NFTs are, why this community formed, how people connected, what they made, and what persisted. The latest local changes have not been pushed or deployed.

## Narrative revision verification

New opening, three-layer primer and historical virtual gathering were captured at desktop and phone widths in `captures/narrative-*.png`. The main path uses nine scenes; the expanded source-backed fixture has 26 moments and 47 people. A test's obsolete closing-route expectation was corrected to the remix it actually opened; application history behavior was retained. Historical fixture content remains locally authored, not live Music Nerd historical data.

Final revision checks: `npm run ci` passed (5 unit and 12 browser tests). A separate phone-width sweep loaded all 26 scene images and Daniel Allan’s detail portrait, with no document overflow or JavaScript errors. `npm run check:live` again confirmed real Bandcamp play/pause/stop and the three pinned Music Nerd identities. Native physical-phone testing and hosted production behavior remain unverified.

## Continuous-scroll revision

The homepage now contains five illustrated sequences and ten short passages, before the optional index. `npm run ci` passes 5 unit tests and 14 browser tests, including scroll-only entry, source detour and retained position. Desktop and phone captures: `scroll-rooms-{desktop,phone}.png`, `scroll-band-{desktop,phone}-{dark,light}.png`. Both themes were rendered and inspected. The artist composition activates on the collaboration passage; reduced-motion mode reports no image transform. No audio starts on scroll. Broader era coverage is still research work; see EXPANSION.md.

## Seven-section documentary pass

`npm run ci` passes 5 unit and 16 browser tests. The new test checks keyboard chapter jumps, expanded format comparison, source close and returning from a deeper chapter. Desktop 1440×1000, wide 2048×1080 and phone 390×844 have no document overflow. Reviewed LATASHÁ's contained portrait at these sizes, including removal of zoom. The seven-section reading path is roughly 1,200 words; the 6–8 minute duration is a pacing target with optional listening, not a measured completion time. Broader historical coverage remains outstanding.

## Original NFT media — 3 November 2026

- 38 selected Ethereum contracts have a featured edition resolved through a live block-specific `tokenURI` read. Initial batch resolved 36/38; two Arpeggi kits failed because the original metadata endpoint was not approved. After adding only its contract-specific kit route, both resolved successfully. This proves metadata resolution, not playback of every file.
- Actual browser playback advanced for Black Dave's Calm Down (desktop), CHAOS Walls (phone, 147.5-second recording) and Iman Europe's MWWM Zoratopia performance (phone, 50-second video). Pause worked; Stop & close removed the media element; no page errors occurred. No autoplay sound.
- Iman Europe's collection index paginated from 50 to 100 entries with full uint256 token IDs preserved. Index results are not represented as live chain proofs; playback resolves the chosen edition separately.
- Captures: [documentary interlude](../captures/nft-documentary-desktop.png), [Black Dave player](../captures/nft-black-dave-desktop.png), [Walls phone](../captures/nft-walls-phone.png), [Iman performance phone](../captures/nft-iman-film-phone.png), [collection phone](../captures/nft-collection-phone.png). Desktop interlude and phone performance captures visually inspected.
- Repeatable checks: 12 unit tests and 20 desktop/phone browser cases, including dark/light documentary navigation, keyboard, reduced motion, blocked/private routes, source/back navigation, opt-in NFT media, close/stop, pagination and retryable failures. Browser integration tests mock upstream replies; the playback observations above were separate live checks.
- Incomplete: exhaustive artist wallets/collections, ERC-1155 support, non-Ethereum chains, every media file, native mobile Safari, and hosted behavior. No production changes or deployment.

## Inline listening and composition revision

NFT cards now play directly in place after the visitor presses Play. There is no NFT listening modal. One recording is active at a time; pause/resume and native seeking stay on the card, provenance is collapsed, and route changes release media. Actual Black Dave audio playback and pause verified at 1440px and 390px; captures `inline-player-1440.png` and `inline-player-390.png`. Source-resolution and unavailable-media paths remain explicit. Bandcamp still uses its separate listening dialog.

Composition now varies left-reading portraits, full-width editions with paired passages, alternating online-room panels and staggered record sleeves. Reviewed rendered desktop artist composition and mobile inline player; captures `rhythm-*`. These changes retain the existing palette and type. The Mint Songs detail includes Erin Ivey's attributed firsthand account; it is not represented as a newly resolved NFT.

### Artwork playback refinement

Replaced the below-card playback button and visible native audio bar with a single circular control over the artwork. Playing, paused, loading and retry states occupy that control; audio controls and status remain visually hidden, with accessible labels and live status. Video renders within the artwork. Source details remain inside the existing collapsed edition disclosure. A 20-second media-start timeout prevents an indefinitely spinning control. Live audio play/pause reverified at 1440px and 390px; updated inline-player captures visually reviewed.

## Coverage and filters expansion

81 selected works / 39 contracts; 43 CHAOS songs verified through token metadata, with the two-song difference from the published 45-song account unresolved. New CHAOS recording “Chaos” advanced in the actual browser at desktop and phone widths. Catalog’s EPROM “How U Make Me Feel” also played, with a 180.5-second duration; pause verified at both widths. This does not prove every newly added media file plays.

Recordings now combine artist, platform, collection, audio/video and sorting filters with search. URLs preserve selections across reload; clearing filters updates the actual results; impossible combinations explain the empty state. Five currently labeled audiovisual works remain visible under Video. Specific Glass release attribution remains unverified; its primary-source story is included without inventing a platform filter for unverified releases.

Captures: `chaos-filters-1440.png`, `chaos-filters-390.png`, `catalog-chapter-1440.png`, `catalog-chapter-390.png`, `catalog-record-1440.png`, `catalog-record-390.png`, `video-filter-1440.png`, `video-filter-390.png`. Source discovery is documented separately from articles read in ERA-RESEARCH-LEDGER.md.

## Persistent collection playlist

Opening now has a single “Play the collection” action. A persistent bottom dock queues all 81 selected works, including audiovisual records; it is outside the routed page. It supports pause/resume, previous/next, seeking, shuffle of upcoming entries, direct queue selection and stop/close. Expanded queue displays the current video. It does not claim complete artist discographies.

Only the current NFT is resolved and loaded; starting a card or Bandcamp pauses the collection player, and starting the collection stops other playback. Page navigation preserves the collection player. Failed recordings advance with notice; three consecutive failures stop the queue. Requests and media are released on stop/change, with a bounded loading timeout.

Live Sara Phillips playback advanced at desktop and phone widths, continued through navigation to Recordings, then paused correctly with no page errors. Captures: `playlist-dock-1440.png`, `playlist-dock-390.png`, `playlist-queue-1440.png`, `playlist-queue-390.png`; desktop queue and phone dock visually inspected. Browser tests additionally exercise automatic end-to-next transition using a short local WAV response, shuffle/current-track stability, persistent queue navigation and bounded error skipping. Full-duration playback of the entire catalogue and native mobile background playback remain unverified.

## One-track lookahead

The collection player now resolves and buffers exactly one upcoming recording after current playback starts. Skip/end promotes the same media element, preserving its downloaded buffer and avoiding another NFT lookup. An in-flight metadata request can also be adopted. Shuffle replaces the pending selection; unrelated jumps discard it; close aborts metadata and releases both media elements. No queue prefetch occurs before listening starts. Browser preload is advisory and does not guarantee gapless playback or a fully downloaded large video.

Verification: 13 unit tests and 28 desktop/phone browser cases passed. New controlled-media tests verify the upcoming element is buffered but paused, the same element is promoted, no second metadata lookup occurs for that track, and close removes both elements. Real-world skip latency has not been measured in this pass.

## Six-movement documentary pass — 3 November 2026

Implemented the story arc documented in DOCUMENTARY-SCRIPT.md: artist stakes and NFT primer, online rooms, release formats, CHAOS collaboration, gatherings, and afterlives/builder perspective. Pete’s reflection is explicitly attributed and is not presented as a universal historical conclusion. This pass synthesizes the existing source inventory; it does not claim new comprehensive research.

Reviewed the actual local Chrome desktop scene and the Playwright-rendered desktop/390px phone captures. The first review caught an over-enlarged Daniel Allan portrait and delayed CHAOS artwork. Corrected the portrait framing, cached responsive derivatives of the exact token artwork, and added those explicit filenames to the static allowlist. A new image-readiness assertion caught the initially missing asset route; the route was fixed rather than relaxing the check. Captures are `captures/six-movements-*`.

Verification covers six chapter destinations, optional evidence, source detour/Escape return, CHAOS filter/Back return, dark/light journeys, keyboard focus, reduced motion, playback controls, queue persistence, and one-track lookahead. External playback and directory tests use controlled responses; this pass does not re-verify every live gateway, every artist collection, or publication rights. The 6–8 minute duration is an editorial target with optional listening, not a measured participant-study result. No deployment, merge, or production data changes.

## Scene-led rebuild — 3 November 2026

Supersedes the preceding six-movement visual pass. New scoped `src/film.css`, full-frame photographic opening, native-scroll image drift, reversible frame crossfades, lilac CHAOS scene, compact evidence, and archival-object framing. Compared against the reference’s actual Chrome mobile view and its served CSS. Local Playwright desktop/phone render captures cover the opening, Catalog, rooms and trio; browser host access was unavailable and the user was actively changing Chrome, so automated browser captures provide the isolated local visual review.

Added behavioral coverage for forward/backward scene-frame changes, reduced-motion transition removal, named Catalog-founder source navigation, and exact scroll restoration. Fixed source-panel focus restoration to prevent a second unwanted scroll. Existing NFT-player, queue, filter, privacy and source-navigation coverage retained. External audio/identity integrations in those tests remain mocked; this visual pass does not claim to re-audition every live token.

Updated source inventory establishes earlier context and gives Catalog's builders names and a usable account. All historical copy remains editorial fixtures with source links. New images are responsive local derivatives of original token artwork; no production or database writes.

### Deeper artist accounts — 3 November 2026

Introduced blockchain/NFT context in the prelude, strengthened the Walls scene with participant recollections, and added optional closer readings for Catalog, Walls, CHAOS and the NFT primer. Source panels retain attribution and dates. Added browser regression: Walls → CHAOS mechanics → source → Escape → browser Back, at desktop and phone widths. Full CI passed (13 unit, 34 browser). Final copy/source additions passed syntax, formatting and unit checks. Reviewed generated `chaos-close-reading-desktop.png` and `chaos-close-reading-phone.png`; existing typography and responsive article layout preserved. New historical copy is local editorial fixture content. No new recording or wallet attribution is claimed; playback tests use mocked media.

## 4 November 2026 — broader story edit
See [story edit and evidence inventory](STORY-EDIT-2026-11-04.md). Full CI passed: 13 unit tests and 38 browser tests across desktop and phone, plus syntax/format checks. The final primer-copy refinement passed syntax and the four new chapter/alias browser checks. Inspected desktop and phone captures of the opening and Eternal Garden. Fixed frame-selection ordering so a single viewport reading position selects the image in either scroll direction. No new production or all-token playback claim: media tests use controlled responses, and new collection imports remain separate from historical research.

## 4 November 2026 — contextual people and Lab protocol
Names in editorial passages and selected recording credits open the existing person drawer. Added source-backed introductions, verified external links where available, canonical aliases and token-credit participants. Short ambiguous names are not automatically linked in ordinary prose. Metadata credit records are not independently verified wallet identities or full biographies. Original release/social URLs are never synthesized from names.

Reviewed Benjamin James’s rendered drawer at 1440×1000 and 390×844. Full CI passed with 44 browser cases (desktop/phone) and the existing unit suite; an additional person-source/public-link boundary test passed afterward. New cases cover nested sources, history/focus restoration, original credit aliases, recording collaborators and retaining the same inline player element across a profile detour. Mocked media remains distinct from live audition.

Lab recreation packet is prepared under `docs/protocol/`; not submitted or deployed. It documents the reconstructed prompt/process rather than pretending one initial prompt generated the finished experience.

## November 4 · platform context and earlier roots

Added a full Imogen Heap / Mycelia / Ujo passage and optional Tiny Human chapter. Added eight period-specific platform/project/gathering records, exposed through inline context links and the existing dialog/history mechanism. Desktop hover titles give brief orientation; full explanations remain keyboard- and touch-accessible. Zora → Catalog → panel back → Escape restores the original link focus and scroll position. Record playback element continuity is covered by the existing mocked browser check.

Reviewed rendered captures at 1440×1000 and 390×844: `captures/zora-context-{desktop,phone}.png` and `captures/imogen-context-{desktop,phone}.png`. Corrected the phone composition after review: the song diagram appears in document flow instead of behind white text. Browser checks do not constitute a live audition of all original NFT media. No production changes or publishing.

## November 4 · library discovery and coverage correction

`npm run ci` passed: syntax, formatting, 14 unit tests and 48 browser checks. New desktop/phone flow verifies Pete Rango contributor filtering returns two explicitly credited records, Xcelencia returns four selected works, and CHAOS remains filterable to 43 songs without a separate library promotion. EPROM’s source-profile image loads in the person drawer; desktop and phone captures reviewed. Four new token references were resolved against live Ethereum and their original metadata read. This verifies provenance resolution, not a complete audible playback audit or complete collection coverage. Added four profile images; total portrait registry is 51, with many profiles still missing images. Research and application changes remain local.

## November 4 · profiles that lead into listening

Final `npm run ci` passed: formatting/syntax, 14 unit tests and 50 desktop/phone browser tests. Reviewed `captures/profile-work-desktop.png`, `captures/profile-work-phone.png` and library filter captures. Profile cards now reuse artwork playback, explicit role credits and collection provenance; the original full library selection remains available. Closing/changing a profile removes its inline player without destroying a player on the underlying records page. Failure behavior uses mocked NFT requests; this is not live audio audition evidence. Five original-artwork derivatives were fetched and decoded into responsive local thumbnails, and the profile test checks successful image loading. The library and compact profile changes remain local, with no deployment.

## November 4 · whole-documentary editorial pass

`npm run ci` passed (14 unit tests, 50 browser tests; syntax and formatting). A separate browser traversal opened all 36 deeper chapters at desktop and phone sizes (72 route checks), confirmed their revised body text, and recorded no page errors. Reviewed desktop/phone Future Surf composition and opening/band/closing captures. Fixed participant-chip rendering to tolerate missing portraits and kept explicit dated transitions for the 2023 Future Surf and remix passages. The rendered film has 18 passages and about 2,000 words including optional evidence labels. This verifies functioning routes and rendering, not editorial acceptance, complete research coverage or live audio audition.

## November 4 — cross-chain imports and manual queue

- `npm run ci`: passed syntax/format, 15 unit tests and 54 browser checks across desktop and phone.
- New coverage: manual queue remains silent until play; adding/deduplicating another track preserves current selection; The Park search plus Base filter retains provenance and queue actions; explicit chain RPC routing and ERC1155 selector; unsupported chains fail before network access.
- Browser review caught and corrected an undefined hover color token on Add to queue. Reuses the existing pink accent and dock.
- Real local API reads returned live original metadata for an imported Optimism edition and a Park Base edition. All 29 Park imports resolved original token metadata during import. This does not prove every remote media file will stream reliably or that all songs have been auditioned. Browser playback regression tests use a controlled WAV fixture.
- Captures: `captures/manual-queue-desktop.png`, `captures/manual-queue-phone.png`, `captures/park-library-desktop.png`, `captures/park-library-phone.png`.
- Source inventories and remaining completeness work: `docs/research/SOUND-PARK-IMPORT.md`. No deployment, production data changes or purchase.

## November 4 — terminology and deeper Park chapter

17 unit tests and 56 browser checks passed. Added regression coverage for The Park's chapter → full recording list → browser back while retaining the queue. New metadata-cache tests verify concurrent request sharing, TTL expiration, bounded storage and retryability after both unavailable responses and thrown errors. Reviewed definition layout on desktop/phone and corrected the initial wall of text into two clear definitions. Original media availability remains external; no claim that every imported song has been auditioned.

## Integrated documentary pass — November 4

The main film now connects the search for agency to learning in public, community release experiments, and the work of keeping access alive. New optional chapters cover Erin Ivey and Mint Songs, LNRZ/Sara Phillips, and CAMPFIRE Miami; expanded Heart Project and Black Dave/Glass passages distinguish announcements from demonstrated outcomes. The Park anchors the aftermath before Pete's attributed builder reflection. Definitions distinguish a unique token from a copyable recording.

The library contains 218 selected representative recordings, including 22 newly recovered Optimism V1 releases and two legacy Sound releases. Discovery found 1,787 Optimism V1 release contracts and 172 legacy artist contracts; these are inventories, not counts of imported songs or proof of exhaustive coverage. Legacy indexing remains retryable after public API rate limits. See sound-legacy-coverage.md and SOUND-PARK-IMPORT.md.

Playback now retries the identical IPFS content address through a second fixed gateway on failure, buffers the next track, and lets individual collection editions enter the queue without losing full-precision token IDs. This does not restore unavailable content. Correction links open a prefilled GitHub issue draft; visitors choose whether to submit.

Portraits added for Imogen Heap (CC BY-SA with attribution), Erin Ivey and Nate Mercereau (artist-distributed press sources). Direct license links and crop/source captions are preserved. The image audit records the actual evidence rather than implying every image has blanket publication clearance.

Final integrated check: `npm run ci` passed syntax, formatting, 24 unit tests and 60 desktop/phone browser checks. The initial run exposed a stale running server allowlist after new data modules were added; restarting the server fixed the cause, and the full suite passed without weakening checks. Additional rendered captures: final-opening-{1440,390}, campfire-deeper-{1440,390}, portrait-{imogen-heap,erin-ivey,nate-mercereau}-{1440,390}, charm-records-{1440,390}. Controlled playback tests cover gateway failure and queue behavior; they do not establish permanent availability of every external recording.


## November 5: documentary opening and context navigation

`npm run ci` passed: 24 unit tests and 60 browser checks. Renamed chapter/source selectors to match the intentional UI labels; preserved their focus, scroll-restoration and history assertions. The participant-context test now opens the optional notes where Benjamin James lives.

Manually reviewed 1440px and 390px captures, dark/light themes and reduced motion. Verified Sound profile → source → Back → related story → Back. Source rows show hover background and keyboard outline; no horizontal overflow. Bright artwork exposed a phone text-contrast issue, fixed with the shared reading surface. Captures: `captures/structure-opening-*`, `captures/structure-panel-*`. This does not verify all original remote media or claim historical coverage is complete.

Published to https://music-nft-era.vercel.app; verified the revised opening within the actual Lab iframe at 1440px and 390px, plus hosted Sound source/Back navigation. Updated the existing Lab protocol through its publishing API (HTTP 200). Deployment: https://music-nft-p5me6qzit-musicnerd.vercel.app. The public alias is the visitor URL; immutable deployment URLs can remain protected.

## November 5 artist coverage recovery

Fourteen additions bring the catalogue to 232. Direct contract tokenURI reads verified their original metadata. Source metadata and explicit descriptions supply artist/film credits. Jamee's real shit tho played with advancing time and a 176.55-second duration at 1440px and 390px; artwork loaded in the phone profile. Cam's Love U Down video played in installed Chrome with a 1280×720 decoded frame and a 27.328-second duration. Bundled Chromium initially played its audio without a decoded picture; ffprobe identified H.264/AAC and Chrome verified the actual video. No transcoded replacement was uploaded.

The new recordings reuse the existing profile players, library filters and queue. Remaining Art School Dropout/RISE, Mavi Taylor, Forrest Mortifee and Polygon/Mint Songs gaps are explicit in research/ARTIST-COVERAGE-2026-11-05.md. External gateways can still fail; the checks are not a perpetual playback guarantee.

Recovery release: `npm run ci` passed (24 unit tests; 60 browser checks). Deployed to the public alias https://music-nft-era.vercel.app through https://music-nft-8rawx55st-musicnerd.vercel.app.

Lab protocol sync blocked: PUT with the existing creator-scoped publishing key returned HTTP 403, `This id belongs to another creator`. No ownership or authorization changes attempted. The updated 232-work protocol is saved locally in docs/protocol/LAB-SUBMISSION.json; the previous success receipt is historical, not evidence that this revision persisted.

Hosted verification: Jamee's profile shows three works at desktop/phone widths, Add to queue opens the collection player, and original audio playback advanced on phone and desktop. The first desktop attempt reached retry; the public NFT endpoint subsequently returned live original metadata, and a fresh desktop playback succeeded. Treat remote startup latency as an ongoing limitation rather than claiming uniformly instant playback. Lab publishing remains blocked by the creator-scope mismatch documented above.
