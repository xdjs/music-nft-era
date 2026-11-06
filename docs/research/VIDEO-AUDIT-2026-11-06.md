# Music-video recovery — 6 November 2026

Pete requested a dedicated video pass, specifically Niqa Mor / Glass and LATASHÁ. This pass adds nine source-backed LATASHÁ records to the local selected archive (241 records, 18 marked video). It does not establish complete artist or platform coverage. No production writes or deployment.

## Recovery method

Read Ethereum tokenURI and, for the legacy Zora media contract, tokenMetadataURI at one block. These are different addresses: tokenURI identifies the media, not JSON. Follow metadata and credited creator information, excluding image-only tokens. A wallet connection is a discovery lead, not sufficient artist attribution. Source snapshots remain in ignored `work/video-audit/`; curated records are in `src/video-import.js`.

The adapter previously assumed every legacy Zora record used Catalog’s nested `body.title`. It now also supports the original Zora `name` schema, without exporting raw descriptions. A regression test preserves same-block reads and the public-field boundary.

## Added works

All legacy entries use Ethereum contract `0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7`. URLs below point to original release references; playback resolves the contract rather than depending on that website remaining operational.

| Work | Original token | Credit / context |
| --- | --- | --- |
| Ilikedat | https://zora.co/collections/zora/623 | B(LA)K; Ircasim production, Jahmel Reynolds film. Work dated 2017, not mint date. |
| GOGO WYNE | https://zora.co/collections/zora/6561 | Jah direction; Lytehaus production; Jim Bianco music production. |
| CULTURE | https://zora.co/collections/zora/8233 | Terrance Young direction; LATASHÁ, Danilo Lima and Jamee Cornelia editing. |
| HEADRAPS | https://zora.co/collections/zora/7681 | Jason Chandler direction; Ducky dance. Work dated 2016. |
| TALK MY SH*T | https://zora.co/collections/zora/7298 | PURP production; Jah direction; T-Reel camera support. |
| Who I Am | https://zora.co/collections/zora/5730 | Lytehaus film; Jah direction; LATASHÁ creative direction; Jim Bianco music. |
| SUMPN | https://zora.co/collections/zora/2792 | Ircasim / Segnon production; FatKingFilms film; Jahmel Reynolds edit. |
| When I met J.Cole | https://zora.co/collections/zora/860 | Ircasim production; A. Vargas film; Jahmel Reynolds / LATASHÁ edit. |
| JOYRIDE II: SHOWTIME | https://market.zora.co/collections/0x75c8e01B4697A9b1346f8D5fA7492449d07738bD | Video edition #1, distinct from the MP3 contract. Angel Darmella E’Stash direction; Terrance Young cinematography; Jah production/VFX; LATASHÁ editing. |

Contemporaneous corroboration for Joyride: [DMY, 16 September 2022](https://dmy.co/new-music/web3-trailblazer-latasha-delivers-mtv-inspired-joyride-ii-showtime-video). GOGO discovery lead: [Trends.vc](https://trends.vc/trends-0085-music-nfts/); attribution comes from original metadata, not that secondary article.

## Visuals and media boundaries

Thumbnail frames extracted from original NFT video bytes are presentation assets, not replacement playback uploads. For GOGO WYNE and Who I Am, extraction failed through available gateways; the card uses a labeled 2016 LATASHÁ press portrait instead. Joyride uses its token artwork. Work dates embedded in titles do not imply those videos were minted that year.

All added tokens resolved metadata live. This does **not** mean every media gateway successfully plays the full video. Initial real-browser CULTURE playback remained buffering through the fallback gateway, although ffmpeg recovered a frame from the original content. Preserve retry/failure UI and report playback separately from discovery. Do not silently replace original video media with YouTube or a re-upload.

## Niqa Mor / Glass: unresolved

[Official artist site](https://niqamormusic.com) confirms identity. The discovered Ethereum contract `0xb05808A2732e694Bc43C86f6AcBefA811DEBeAf4` contains **BO$$ RELOADED MOVIE POSTER** editions. Their Arweave image is a poster, not a recovered video. No video added from that contract.

Glass’s publicly shipped site query currently returns `glassVideo` missing from the public GraphQL schema. The older Glass Editions V1 contract `0x68E1eeA3BE3ddA4F36E2d870121eA619Cd5D75ea` was inspected across 144 token URIs; it contains other releases, not an identified Niqa video. Neither result proves Niqa’s original video is gone. Next lead: an artist-issued Glass release URL or a verifiable later edition contract, then original metadata/media resolution.

Other recovered LATASHÁ poetry/performance tokens remain research leads rather than automatically importing every minted object. This pass prioritizes the music videos and collaborator credits requested.

## Verification / local handoff

- Preview: `http://127.0.0.1:4195/sequence/#music?artist=LATASHA&kind=video` (new server process, not production).
- Syntax and formatting passed; 25 unit tests passed, including the new legacy-Zora metadata regression.
- 60 shared-app browser tests passed against the fresh server on 4195; 20 cinematic desktop/phone tests passed. The contributor test now expects both Jamee’s Dizzy performance and her CULTURE editing credit.
- The first `npm run ci` browser stage hit an older process on 4178 that lacked the new module route. That stage was interrupted; the complete browser suite was then run against 4195. No checks were removed.
- Actual Ilikedat original-media browser playback: 1920px decoded video, duration 95.695 seconds, playback advanced past 2 seconds. Automatic expansion and browser fullscreen both succeeded. At 390px the expanded view remained within the viewport. This is startup verification, not a full-length audition of every added work.
- Reviewed desktop library and phone player captures: `/tmp/video-audit-desktop.png`, `/tmp/video-audit-playing.png`, `/tmp/video-audit-phone.png`. Portrait fallbacks are labeled; extracted title-card/black frames were replaced with later frames where possible.
- CULTURE media startup stalled in the first real-browser check despite successful frame extraction. GOGO and Who I Am thumbnail extraction failed. Other new videos have metadata verification but not complete browser playback verification. Gateway availability remains a limitation, not a claim of missing originals.
- No commit, push, merge, deployment, or Lab update in this pass.
