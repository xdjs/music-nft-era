# Artist-to-recording coverage, November 5, 2026

Pete requested Jamee Cornelia's music and an audit of other artists already discussed but absent from listening. This pass adds 14 original-token works, bringing the selected library from 218 to 232. This is representative coverage, not complete collections.

| Artist | Recovered works |
|---|---|
| Jamee Cornelia | real shit tho; SKYZONE (Jon Waltz, Jamee Cornelia, Jadyn Violet); Dizzy (Zoratopia Miami ’22), video |
| Cam Murdoch | SONATA (Cam Murdoch, J Burn, Bongdoe), video; Love U Down (Zoratopia Miami ’22), video |
| Dot | Bounce; AMBUSH EP |
| MoRuf | Moo Better. (GOD IN ME); Gotta Be pt.2; HYPNO |
| Daniel Allan | Honey |
| OSHI | black eyes (with Mara Anne) |
| Emma Miller | Early For Emma, a commemorative video medley, not three full songs |
| Violetta Zironi | Another Life by Violetta Zironi |

Scott Quinn is now linked to the existing No One Knows Me Like You recording; VÉRITÉ to The Park's WATÉR. The original descriptions of the two Zoratopia videos explicitly credit Jahmel Reynolds, so those works also appear on Jah's profile. A film credit is not a musical performance credit.

## Method and evidence

- Start with the existing Sound factory inventory; read each known contract's indexed token instances; resolve tokenURI against live Ethereum and fetch its original metadata. Preserve token IDs as decimal strings. Group representative editions by release, not ownership or wallet proximity.
- Use Blockscout name search only as discovery. Require the token metadata's artist fields or explicit description credits. Media MIME distinguishes video from audio. No replacement files are uploaded.
- Exact references, block numbers and timestamps are in `src/nft-catalog.js`. Discovery reports are `data/artist-recovery-2026-11-05.json`, `data/artist-search-recovery-2026-11-05.json`, `data/artist-credited-recovery.json` and the Optimism search/recovery reports. Reports contain retrieval failures and partial pagination, not assertions that no NFTs exist.
- Jamee context: https://paragraph.com/@futuresurf/art-school-dropout . Community coverage of the album, visuals, Glass role and earlier-holder digital/cassette access. The linked Sound playlist returns 404. Metadata independently identifies the added recordings; the album article does not establish every collection's identity.
- RISE lead: https://paragraph.com/@raedio/the-need-for-variety-in-onchain-music-and-the-future-of-popular-music-invest-in-music-onchain-curator-season-1 . Contemporary coverage names Elcee the Alchemist, Jamee and Three Oscillators. Original token remains unresolved; not imported.

## Remaining gaps

- Art School Dropout: a matching contract was discovered, but indexed media was unavailable. Do not confuse the project/collection with recovered full-album audio.
- Jamee's other collaborations: BOOM!, remix, Flavors, FR3NZ and Cabin Fever surfaced; metadata unavailable or token read failed. Preserve as leads. Photography/visual editions are not automatically recordings.
- Mavi Taylor: Optimism search returned MAVI TAYLORED without usable indexed media. Release lead “Nice”: https://web3music.beehiiv.com/p/origin-stories-launches-new-music-event-fans-co-create-experience . Needs exact token verification.
- Erin Ivey: her own guide identifies a December 31, 2021 Mint Songs release on Polygon, 50 editions: https://erinivey.com/pages/how-to-collect-your-first-music-nft-step-by-step . The current adapter does not support Polygon; exact original token still needed before adding chain support.
- Forrest Mortifee: no token was resolved in this pass. Name-search misses are not evidence of absence. Network Archives credit alone does not identify a music NFT.
- Emma's Artifacts and complete early releases, OSHI's CHILDHOOD, Violetta's Moonshot, and other releases on these artist contracts remain incomplete. A representative work does not fill a chapter-specific artifact gap.

## Interaction and verification

Reuse the existing artwork play controls, queue, artist/collection/media filters, contextual drawers and browser history. No new navigation or backend. Verify live media playback as well as mocked regression checks. Attribution-only corrections must appear both in the artist profile and contributor filtering.
