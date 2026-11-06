# Prompts and steering

These are reusable prompts reconstructed from the task and its iterations. They are not claimed to be the exact full prompts sent in every prior tool or Grok session. Original meeting transcripts are not reproduced here.

## Starting brief

> Build a working, source-backed documentary about the Music NFT era for someone who was not there and someone who was. Start from a small slice that goes deep: people, releases, gatherings, experiments and evidenced connections. Research before designing. Inspect 6–8 relevant digital exhibitions and music experiences, including actual desktop/mobile behavior. Research the history through original releases, artist accounts, interviews and event records. Separate verified facts, attributed memories and interpretation.
>
> Build separately from MusicNerdWeb, under Documents/Music Nerd, using existing supported Music Nerd APIs only where appropriate. Do not create a speculative knowledge backend or expose private Lore. A clearly labeled source-backed local fixture is acceptable. Do not merge, deploy, purchase services or change production data.
>
> Make the experience an immersive editorial music archive. Let scrolling immediately carry the visitor into the story. Explain what music NFTs were and why artists explored them before requiring prior knowledge. Use expressive, correctly attributed imagery, readable short passages, deliberate changes of composition and restrained motion. No autoplay sound, scroll hijacking, wallet-first entry or decorative graph clouds.
>
> Provide a curated 6–8 minute reading path with optional depth. A visitor can hear work, follow a meaningful connection, inspect its evidence and return without losing their place. Give every named participant a way to be understood through a profile, documented role, work or verified public links. Test the actual browser experience on desktop and phone, including keyboard, reduced motion, failures, history and listening.

## Research interviewer: open discovery

> Investigate music NFTs as a cultural history, without beginning from a supplied artist roster. Find communities, genres, regions, organizers and experiments that are missing from the familiar platform narrative. For each candidate scene: who did what, when, why, what was actually made, what participation meant, what happened afterward, and what remains uncertain. Supply original source URLs, dates and identifiable releases. Distinguish announcement from outcome, billing from attendance, and a transaction from a relationship. Seek disagreement and ordinary organizing work as well as successes. Do not let prices or fundraising dominate the account.

## Research interviewer: follow an existing lead

> For [person/project], reconstruct three concrete scenes using original posts, releases, event records and recorded interviews. Who else did the work? What mechanics were tried? How did participants experience them? What changed or failed? Find original artifacts and exact chain/contract/token references where available. Challenge contradictions in counts, dates and credits. Label participant recollections, contemporary documents and later interpretation. Do not invent missing links or turn plans into completed outcomes.

Grok was used as a lead generator in two threads, one seeded and one initially open. Its answers were not used as primary evidence. The public sources are the reproducible resource; recreating private browser sessions is unnecessary.

## Important steering that changed the result

- Replace the wiki/dashboard feeling with a visual scrolling documentary; do not become attached to the initial layout.
- Use the other local documentary as an interaction reference, but create an independent identity. Wodniack was a motion reference; do not copy its interactive banner.
- Give enough context to complete a thought. An isolated 2015 title card or an unexplained Daniel Allan opening was insufficient.
- Cover Catalog's builders, Songcamp/CHAOS, Sound, Mint Songs, Zora and Glass alongside artists and organizers. Follow music videos, not only audio editions.
- Preserve the cultural frame: the moments, participants, collaboration, experiments, questions and outcomes.
- Put play directly on artwork. Replace the separate listening modal/native-player stack with a persistent collection queue and direct listening.
- Preload one upcoming recording to reduce skip latency; avoid loading all media.
- Treat names as entry points into people. Verify aliases, preserve historical credits, and offer external profiles only when supported.
- End with what participants carried forward, including Pete's explicitly attributed reflection on building tools for one's community. Do not universalize that recollection.

## Verification prompt

> Run the implementation. Follow the whole path at desktop and phone widths. Open a named person's drawer, follow their source and return; verify the exact scroll position and focus. Play, pause, skip, shuffle and inspect the queue; verify one active audio stream and bounded preloading. Distinguish mocked player tests from live auditions. Inspect real screenshots for cropped faces, unreadable text, stale scene frames, busy controls and overflow. Correct failures before calling the preview ready.
