# Film integration: make the branches serve one story

November 4, 2026. Read-only review of the effective `scrollStory()` sequence in `src/app.js`, including its post-construction replacements. The replacement copy below uses evidence already represented by existing sources. No new historical claim is required.

## The documentary's argument

A song is not made or sustained by a file alone. Artists wanted more say over the people, decisions and systems around their work. They experimented with releases, working rooms and tools; the artifacts let us follow what they actually made. When storefronts changed or closed, those relationships and the work of maintaining access mattered again.

Keep the six movements. Do not turn the five new deeper chapters into five additional film beats. The most useful structure is an opening question, earlier experiments, a deliberately thematic middle, and an unfinished aftermath. Label that structure honestly: this is not a strictly chronological slideshow.

## Five precise integration changes

### 1. Open with a person and explicitly earn the rewind to 2015

Current gap: the prelude states the thesis, Benjamin's beat repeats it at length, then the story jumps from his 2022 recollection to 2015. A newcomer can read three introductions before reaching an artifact. Keep the prelude short and use Benjamin to make the stakes human. Replace `opening.beats[0]` body with:

> Benjamin James knew what it meant to have someone else decide a record's future. Writing as musicben in February 2022, he recalled being signed and dropped by a major label in 2014. Music NFTs interested him as another way to reach supporters and keep making work. His question runs through this history: who gets to decide what happens around a song? To understand the experiments he was watching, we need to go back—before collectible records, to an artist trying to change the machinery behind a release.

Keep heading **Who gets to decide what happens next?** and source `musicben2022`. The final sentence is the editor's transition, not a claim Benjamin discussed Imogen Heap.

Do not explain “non-fungible” twice. Keep the fuller explanation beside the playable EPROM artifact; the prelude needs only: **“A music NFT is a digital token associated with a recording or other work. The music can still be copied and heard. The experiment was in what people could build around it.”** Put the two existing word definitions at the EPROM beat, or inside its optional explainer—not both places. Preserve the correct distinction: unique ownership history does not mean audio cannot be copied.

### 2. Make the EPROM listening moment do one complete job

Current gap: the beat combines dictionary definitions, copyright, storage and interoperability without a clear order. A concrete recording can teach the idea, then lead into the people. Replace `opening.beats[4]` with heading **Hear the song. Follow the record.** and body:

> Listen to EPROM's How U Make Me Feel. You do not need to own its NFT to hear it. “Non-fungible” means not interchangeable like-for-like; a “token” represents something else. Here, that token is associated with a particular recording. A blockchain records who holds it and when it changes hands. Copying the audio does not copy that ownership history, and buying the token does not automatically buy the copyright. Catalog's founders pointed to another possibility: this record could be found through Catalog and bid on through Zora. Different front doors could lead to the same edition. But a record still needed people to find it.

Keep source `catalogInterview` plus `nftBasics` available in evidence. Zora must retain its contextual person/platform link. Pair with the existing playable EPROM artwork, not another decorative photograph. Link **How Catalog worked** to `#/moment/catalog` in Notes & connections; keep the full infrastructure discussion optional.

### 3. Make the time shift in “The rooms” intentional

Current gap: this movement goes from 2021 to Future Surf in February 2023, then the next movement silently jumps back to September 2021. The dates are individually correct; the causal sequence feels accidental. Keep Future Surf in the main film because routine community work belongs beside the spectacular releases. Label the movement **2021–2023 / making a place to return**. Replace `rooms.beats[2]` with heading **A scene needed people who kept showing up.** and body:

> Those rooms mattered beyond a launch. By February 2023, Future Surf Radio's weekly schedule moved between rollout discussions, music reviews and technical conversations. Cam Murdoch appeared with different collaborators; Charm Taylor and Diamond Doll used a recurring session to build For The People DAO in public. The newsletter sent listeners toward new releases too. A scene was taking shape through repetition: bring an idea, hear someone else's work, learn something and return. Alongside that everyday work, artists were testing how a release could invite people in.

Source `futureSurf`. Optional links **Artists teaching artists** → `#/moment/learning-in-public` and **Inside Future Surf** → `#/moment/future-surf`. No need to name Erin or Mint Songs in this paragraph: that is what the branch is for.

At the first “editions” beat, replace only its opening sentence with **“Rewind to September 2021, when Daniel Allan asked listeners to help a record happen before it was finished.”** Continue with the existing campaign/January EP facts, trimming the redundant next sentence that repeats the campaign date. This is a clear documentary rewind, not an implied direct sequence from Future Surf to Allan.

### 4. Let the gathering be a gathering; let a branch carry the second experiment

Current gap: the only in-person beat gives Zoratopia a few lines, then rushes through the entire Black Dave/Glass/Reveel mechanism. It asks one photograph and one paragraph to stand in for different events. Replace `gather.beats[0]` body with:

> LATASHÁ helped make places where the online scene could meet in person. Zoratopia's Austin program billed Black Dave in March 2022. In June, reporting from New York described three days of programming, with performances by LATASHÁ and Iman Europe. The work people had encountered through profiles and release pages could now be heard together. These gatherings opened another part of the story: what happened when the people behind the handles shared a room—and what they made after they left it.

Sources remain `zoratopia` and the existing New York event source. The last sentence introduces questions answered by branches; it does not assert that everyone collaborated or that CAMPFIRE emerged from Zoratopia.

Place two optional links together in Notes & connections: **A performance became a video experiment** → `#/moment/black-dave-glass`; **Inside CAMPFIRE's Miami recording** → `#/moment/campfire-miami`. Never label the latter “What Zoratopia led to.” The CAMPFIRE branch has its own credited artifact and its camp date remains unresolved.

Elsewhere, at the end of `band.beats[2]`, add only the optional link **A sample pack became Sara Phillips' next release** → `#/moment/lnrz-satellites`. The current main-film remix connection already does its job; do not add another paragraph there.

### 5. End with a concrete practice, then Pete's perspective

Current gap: the aftermath stacks institutional names (Network Archives, Nina, SoundCloud) before returning to a general statement about preservation. The documentary has a stronger example in its own library: The Park's artist-maintained archive. Keep the institutional accounts in the deeper afterglow chapter. Replace `remain.beats[1]` heading with **Someone still has to keep the door open.** and body:

> The Park's own archive gathers releases scattered across Catalog, Sound and Zora. A listener can follow a song to its credits, a playlist or an original edition without remembering which storefront first hosted it. That is practical work, and it changes what remains available to discover. This documentary tries a smaller version of the same task: follow the recording back to the people and the media it names. A record of ownership can survive. Keeping the music findable still takes care.

Change that beat's source to `parkWorks` and include **Inside The Park's continuing archive** → `#/moment/the-park`. This attributes the archive to The Park without assuming who designed or implemented it. It also gives a specific example of building one's own front door before Pete's reflection.

Replace final `remain.beats[2]` body with:

> For Pete, the lasting change was where he located value: in people, their work and their ability to make things together. He connects that experience to becoming a technology entrepreneur. With new software tools, he sees less reason to wait for a platform to build what his community needs. His perspective brings us back to the question we began with. Who gets to decide what happens around a song? This chapter follows artists trying to take a larger part in that answer—by making records, making room for one another, and sometimes making the tools themselves.

Keep date **Pete's perspective / shared for this documentary**, no external source invented. The existing note already states that this is his account; the main prose does not need a second defensive disclaimer.

## Exact scope language

Replace About's opening scope paragraph with:

> This is a selected history of artists experimenting with the systems around their music. Its main story follows overlapping communities and releases in 2021–2023, with earlier experiments from 2015 and 2020 and an aftermath reaching into 2026. We go deepest inside Songcamp's CHAOS, then follow credited work, gatherings and artist-built tools into related projects. It is one connected route through the Music NFT era, not its definitive origin story or a complete account of every community, platform or release.

Opening small label:

> A selected history · 2015 roots, 2021–2023 core, an unfinished aftermath

Closing scope sentence, near the existing exit navigation rather than as another spoken beat:

> The film ends here. The records and relationships continue: follow a person, hear a release or inspect the sources behind a chapter.

Keep the library's separate partial-coverage notice. An archive inventory and an editorial chapter have different boundaries; neither makes the other exhaustive.

## Runtime and pacing guardrails

These replacements mostly reduce or redistribute existing copy. Do not add all five deeper branches to the required scroll. Keep one unfolding musical example in the main path (CHAOS → Walls → remix) and use the other examples as invitations. The runtime target is approximately 1,300–1,600 main-path words at a comfortable reading pace, excluding optional branches, source disclosures and music playback. Count rendered prose after integration and test with an actual unhurried scroll; a “6–8 minute” label is not established by the code's scroll distance.

No new full-screen interstitial is needed. One clear play interaction and at most two related chapter links per relevant beat will give more depth without returning to a crowded wiki. Dates, evidence and qualifications stay accessible, while the main sequence carries a complete thought from one beat to the next.
