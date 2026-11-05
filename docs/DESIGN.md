> Current implementation: [CINEMATIC-DIRECTION.md](CINEMATIC-DIRECTION.md). The sections below preserve previous iterations; the tilted opening and split-layout treatment were replaced after review.

# A scene, in the making — visual rebuild

The first presentation made the research visible but failed as an immersive music experience. This direction replaces its fabricated sleeve stack and wiki sidebar with a photographic opening and an image-led sequence. This is a proposed independent exhibition identity, not an approved Music Nerd website redesign.

## Composition

```
Music Nerd                                      Chapter / People
        [LATASHÁ portrait]    [CC0lab artwork]    [Rae performance]
              A SCENE,
              IN THE MAKING.
        A song connects people.     Enter chapter / Listen first
Sound of Fractures → Three Oscillators → CHAOS

Scene: [large photograph/artifact across screen]
       date   Title over quiet image area
       one idea + listening control
       compact six-stop contact sheet
       credits / story / evidence / next connection
```

The opening is a collage of real people and a real creative artifact. It is a navigable editorial composition: every photograph goes somewhere, and its caption distinguishes press imagery from event evidence. Scenes then give one subject the full frame. The six-stop contact sheet preserves orientation without a dashboard sidebar. Details remain readable below the frame; evidence and relationships open in reversible panels.

Palette: photographic indigo #20223e, exhibition black #101016, chalk #f4f4f1, Music Nerd pink #ff75d8, muted lilac #b9b5be. Light mode uses cool paper #eeedf2; photographic stages keep their deliberate dark contrast in both themes.

Type: locally hosted Barlow Condensed Bold (OFL) for monumental titles, system sans for readable narrative and controls. Display type is a physical part of the collage. Sentence-case editorial headings remain readable; the home title alone acts like a gig poster.

Motion: a short image reveal on entering a scene, restrained image zoom on intentional hover, horizontal touch scrolling of the scene contact sheet. Native scrolling, ordinary links, browser back and clear previous/next controls remain primary. Reduced motion removes transforms and transitions. No autoplay sound, mouse-dependent navigation or animated banner.

## Critique before implementation

A dark interface with pink buttons alone is generic. The distinguishing material here is the community itself: LATASHÁ's playful press photograph, Rae Isla photographed performing, Iman Europe's portrait and Songcamp's CC0lab artwork. Do not replace missing release covers with invented covers. CC0lab imagery is always identified as that later project, including where it illustrates the wider Songcamp thread. Portraits are not documentary evidence of attendance.

Wodniack informs the sense of depth and entering/leaving compositions, not its banner or identity. Music Nerd retains its quiet wordmark, pink accent, accessible controls and identity connections. A visual journey takes precedence over exposing every field on arrival.

## Narrative revision: a newcomer can enter

Keep the approved-in-progress photographic composition, display type, colors and tactile scene navigation. Change the primary sequence from a remix-first tour to an explanatory documentary: understand the collectible → understand why artists experimented → enter the online rooms → follow release formats → experience CHAOS and Walls → meet in person → hear a later connection → consider what remains.

```
Photographic opening / plain-language premise / enter or listen
  ↓
What is a music NFT? [The music | The token | The relationship]
  ↓
Early records → Online rooms → Sound → CHAOS → Walls → Zoratopia
  ↓                          ↘ sourced branches and artifacts
A later remix → What survives?
```

The primer is a small interactive explanation, not a glossary wall: switching its three controls changes the explanation and preserves focus, with sources one click away. Chapter labels communicate the question each scene answers. Supporting moments stay in a visual timeline below the opening and in the wider index. An era-scale chronological map supplies orientation; it does not claim a comprehensive first/last history. 2020 is a prologue, 2021–24 the main community chapter, and the 2026 platform notices a clearly separated epilogue.

Use new contemporary artifacts from Songcamp's published history (a May 2021 virtual gathering and early Discord) and Daniel Allan's own account. Do not use a later portrait as documentary event evidence. Headlines remain short, body copy explains what changed, and transitions explain why the next moment follows. Preserve all existing deep links and credited imagery.

## Scroll-first direction

Keep Barlow, existing Music Nerd accents, photographs and source sheets. The first screen leads directly into a continuous documentary, then the optional timeline. The visitor should read by scrolling and click only to deepen a thread. Use sticky images to maintain context while short passages change; transform the project artwork into credited people when the subject shifts from structure to collaboration. All passages remain readable without animation. Native scroll and history are retained. See EXPANSION.md for the broader historical coverage plan and current limits.

## Documentary pass informed by Metal colombiano

Read the served implementation at `127.0.0.1:4179` and inspected its actual home flow at desktop and phone widths. Reference captures `reference-4179-*` remain ignored. The useful behavior was continuous entry, full-width image scenes alternating with reading, contextual media stops and chapter navigation. This pass preserves our Barlow/pink identity and uses our own source-backed content; it does not copy the metal prototype's paper collage, artwork or text.

Seven scroll sections / fourteen passages now frame approximately 1,200 words, targeting a 6–8 minute experience with time for images and optional listening (not a measured user-study duration). Full-width online-room and gathering scenes vary the previous uniform two-column layout. LATASHÁ uses a top-anchored contained portrait without zoom; mobile places text after the image so the face is not obscured. Chapter buttons, release-format comparison and end-of-story people/moment/listening paths provide optional navigation.

## Composition rhythm — 3 November revision

Retain exhibition black/chalk/pink/lilac, Barlow display and readable sans body. Change the spatial rhythm, not the identity. Artist and closing chapters put reading on the left and portraits on the right. The editions chapter opens with a wide artifact, then two adjacent arguments beneath it. Online-room passages move from left to right across the shared scene. Listening interludes shift between a paired-record comparison, three vertical sleeves and a featured performance. Mobile reflows these into image/reading sequences without overlap or scroll hijacking. Existing chapter tracking supplies orientation; movement must not hide text or depend on animation.

## Narrative diagnosis and opening revision

The opening previously started three times: the hero invited a route change, a row of topic links offered choices, and a second title banner introduced the scrolling section. Seven persistent chapter buttons then made reading feel like operating an index. Removed the entry/listening CTA pair, topic-link row and second banner. Image credits are disclosed on demand; chapter navigation is collapsed behind one control with a quiet current-chapter label.

Begin with Daniel Allan's September 2021 crowdfund and January 2022 release. A concrete creative goal gives the NFT explanation a reason to follow. Then move through the mechanism, online rooms, release formats, CHAOS, gatherings and afterlives. Copy bridges each opening scene into the next rather than describing the prototype or defending the archive. This is one documented entry into the era, not a claim that Allan originated music NFTs.

Remaining editorial weaknesses: the middle still includes long explanatory passages; the alternate cover-series interlude is a second storyline and needs a clearer transition from Walls; the ending groups several platform histories too quickly. The next editorial pass should distinguish cause from chronology, give each scene one dramatic question and bring firsthand voices forward with source-backed attribution. More animation alone will not fix those problems. Preserve factual caveats in source/details while retaining any distinction necessary to understand the main story correctly.

## Reference reinspection: Medellín Metal

Read current served app.js/style.css at port 4179, then accessed the actual open Chrome window through desktop CUA after the browser host failed. Observed its 402px responsive hero, image-backed prologue and an artist detail panel. Compared with prior saved desktop captures. Its strongest transferable choices: images occupying the scene rather than a fixed half-width illustration; several short beats crossing one persistent image; alternating photographic darkness and quieter reading surfaces; human names linking naturally to details; medium-specific listening/video interludes. Current reference source also uses modest scroll-driven image drift with reduced-motion fallback. A high-end revision should plan these scene changes as a storyboard, retain legibility and source access, and avoid simply adding more decorative animation or copying the reference's torn-paper identity.

## Six-movement implementation

The current sequence supersedes the seven-section description above. See [DOCUMENTARY-SCRIPT.md](DOCUMENTARY-SCRIPT.md) for the editorial and composition brief. The token primer is now within the artist movement. The CHAOS listening interlude features Walls alone and leads to its 43-song selection; the unrelated TK/AL3C comparison remains available in Recordings. Sources and secondary paths sit inside Go deeper. The ending separates closures, preservation, and Pete’s attributed builder perspective. Native scroll, artwork playback, queue and reversible details remain intact.
