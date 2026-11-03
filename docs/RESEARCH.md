# Research and interaction decisions

Reviewed November 3, 2026. This is an original exhibition, not a recreation of any reference. Screenshots named `reference-*` are local research evidence, excluded from the public repository. Links below point to actual interfaces visited; inspection limits are explicit.

## Reference matrix

| Reference | Actually inspected | Useful behavior | Weakness for this project | Adaptation |
| --- | --- | --- | --- | --- |
| [Metalabel: Walls oral history](https://archive.metalabel.com/magazine/features/creating-chaos-an-oral-history-of-walls) | Desktop 1440×1000 and phone 390×844; article, dated author/editor, participant links, interview sections and demo location. Local `reference-metalabel-{desktop,mobile}.png`. | Credits and voices give an abstract collective a human scale; audio sits inside the account. | A long article makes lateral discovery depend on reading and scrolling. | A specific song first; named roles and attributed sources; short side panels for lateral connections. |
| [Radio Garden](https://radio.garden/) | Desktop and phone; entered through Start, loaded KXSU FM, opened mobile search. Local `reference-radio-*` and `reference-radio-search-mobile.png`. | Location, current station and persistent controls remain legible while searching. | The globe is delightful but does not explain why people are connected; starting the experience also starts a stream. | Keep the visitor’s story behind a detail sheet; listening is a separate, explicit action with stop always available. |
| [SCENES / Sound of Fractures](https://scenes.soundoffractures.com/) | Desktop and phone home/gallery; Explore menu and scene controls; phone capture displays Scene 1, Willow’s Heartbeat. Local `reference-scenes-{desktop,mobile}.png`. Scene switching was not reliably verified. | Artwork, a song and a listener’s memory occupy one world. | Collection/connect controls compete with the newcomer’s listening path. | Give the song an evocative composition and a clear listening action. No wallet requirement. Do not borrow images or identity. |
| [Wodniack](https://wodniack.dev/) | Desktop below the interactive banner: scrolled through awards and work typography, perspective/grid composition. Local `reference-wodniack-work-desktop.png` and `reference-wodniack-work-detail.png`. Work-anchor click did not demonstrably change URL or scroll. Phone loaded after an initial delay; scrolled to the awards section and captured `reference-wodniack-mobile.png`. | Strong shifts in scale and depth mark movement between sections. | Long theatrical transitions and uncertain location can impede a source-reading task. | Original sleeve depth; short directional transitions and a side sheet. Native history and reduced motion. The interactive banner, grid, assets, font and identity are excluded. |
| [Museum of Youth Culture](https://museumofyouthculture.com/) | Desktop homepage, exhibition artwork and editorial/navigation structure. Local `reference-museum-desktop.png`. Collection-object navigation not tested. | One culturally specific exhibition makes a broad archive feel immediate. | The institution’s many tasks and large promotional hero postpone entry into an individual record. | One bounded chapter with a concrete artifact and six stops. |
| [Radiooooo](https://radiooooo.com/) | Desktop rendered map, decade selectors, shuffle introduction and player. Local `reference-radiooooo-desktop.png`. No paid/account flow tested. | Place + period offer understandable discovery constraints; curator credit sits beside the music. | More controls and taxonomy than this small history needs. | Visible dates and curator context; keep only one primary path and one searchable index. |
| [Collaboration Cookbook: Songcamp](https://www.collaborationcookbook.com/recipes/5) | Desktop actual recipe, ingredients, method and Previous/Random/Next controls. Local `reference-cookbook-desktop.png`. | Turns an unfamiliar creative organization into an understandable process. | Recipe framing can smooth over conflict or unequal experiences. | Explain roles and working structure; preserve the later disagreement account and avoid presenting a universal formula. |

An additional [Musicmap](https://musicmap.info/) visit exposed a dense genre taxonomy and bibliography in the rendered DOM, but the visible session remained behind consent; declining left the site. It is not counted as an in-depth visual reference. No graph interaction is claimed from that visit.

The three deepest desktop/phone reviews were Metalabel, Radio Garden and SCENES. These were browser visits, not search-result thumbnails. Reference captures remain available in the local `captures/` folder.

## Design lessons applied

1. **Follow a credit before presenting a network.** NOKMLY → Three Oscillators → Walls is a verifiable route from music to people.
2. **Keep context visible when crossing a connection.** Artist/source sheets preserve the moment behind them, retain search state, and support browser Back and Escape.
3. **Let provenance be part of the experience.** Every moment exposes all supporting sources; relationship labels distinguish remix, shared release, event and publication.
4. **Use expressive framing without fabricating an archive.** Original sleeve compositions supply visual identity; they are labeled as editorial illustrations. Official music/artwork appears only inside requested embeds.
5. **Give newcomers a route, and insiders an index.** Six curated stops plus a searchable ledger of the same data. No decorative graph.
6. **Keep disagreement visible.** CHAOS’ aftermath, source-count conflicts and incomplete roster are part of the record.

## Historical opening and boundaries

The chosen path starts with the May 2023 collaborative remix release, looks back to the 2022 Walls collaboration and CHAOS structure, then explores Sound, Zoratopia and the 2024 Network Archives publication. It is deliberately editorial rather than strictly chronological. Dates stay visible. The chapter is not a claim that the era began in 2022 or ended in 2024.

The opening has six stops, with nine side paths: 15 moments, 46 people/credited contributors and 34 typed relationships. The wider index includes the named artists requested by Pete. It includes Network Archives’ 28 listed contributors, but is not a complete inventory of everyone in Music Nerd’s orbit or the full CHAOS roster.

Primary anchors: [official remix credits](https://sofractures.bandcamp.com/album/nokmly-the-collaborative-remixes), [participant oral history](https://archive.metalabel.com/magazine/features/creating-chaos-an-oral-history-of-walls), [Songcamp organizer retrospective](https://paragraph.com/@songcamp/chaos-one-year-in-the-life-of-a-massive-multiplayer-band), and [Network Archives credits](https://networkarchives.metalabel.com/directoryofinspiration). Exact support and limitations are in [SOURCES.md](SOURCES.md).

## musicben and collection leads

The research identified musicben as Benjamin James, publishing **STVDIO**. His [2023 web3 music guide](https://stvdio.substack.com/p/biggest-ever-guide-to-web3-music) and [July 2025 retrospective](https://stvdio.substack.com/p/does-web3-music-still-exist) are useful editorial leads. X itself was not reliably readable; the publication was inspected directly. Later analysis is labeled as such, not used as firsthand evidence of every historical event.

Pete’s ENS resolved through the public ENS Ideas API. Two Blockscout Ethereum holdings pages (100 token records, including duplicates) were inspected read-only. The next-page cursor remained: this is a partial Ethereum snapshot, not a complete wallet history or cross-chain census. No wallet was connected, no signature requested, no transaction initiated, and raw exports are excluded from the app and public repository.

| Metadata lead | Research value | Boundary |
| --- | --- | --- |
| Black Dave — Calm Down, token 91 | Connects Pete’s collection to an artist already in the chapter. | Metadata/holding evidence only; not proof of collaboration or influence. |
| AL3C Acoustic Session #00 — Never Forget by TK, tokens 19/20 | A possible performance/artifact path alongside TK’s Network Archives credit. | Original session credits still need checking. |
| wavWRLD presents wavROOM × Art Basel 2022, token 19 | A gathering lead alongside wavWRLD’s publication credit. | Holding does not establish attendance. |
| MIAMI FREESTYLE, tokens 104/105 | Metadata names Aly, Tarot, Elle Symone, Early, TK and producer AbJo; a promising creative-credit lead. | Verify against artist release notes before adding relationship edges. |
| Sara Phillips, Beachcrimes, vaarwell, Julian Mudd | Potential artists for a later chapter. | Not added to the verified story solely from token names. |
| Building Blocks, token 4 | Possible Sound of Fractures artifact. | Name match alone is insufficient; remains a lead. |

Public holdings endpoint: [Blockscout address inventory](https://eth.blockscout.com/address/0x625307dE45Bd25AD6bf6cC7391a308fc84067cf7?tab=tokens_nfts). The saved private research exports preserve contract/token references for follow-up.

## What remains research, not an implementation defect

- Obtain a dated CHAOS roster and artist-reviewed roles. The historical website was unavailable; a similarly named GitHub metadata repository contained unrelated sample material and was rejected as evidence.
- Reconcile original Sound track-level credits; the original artist page returned “Page not found.” The chapter explicitly uses contemporary reporting here.
- Get multiple participant perspectives on the CHAOS allocation/IP dispute. The present account is Songcamp’s retrospective.
- Complete cross-chain collection research only if a later chapter needs it; verify promising metadata against original artist releases.
- Invite contributor review before any public launch. No outreach was sent.
