# Five deeper branches: invitations, working rooms and tools

Reviewed November 4, 2026. Implemented in `src/narrative.js`; not a claim of complete scene coverage.

## Editorial boundary

Keep the main film a six-to-eight-minute argument about artists gaining agency over the work around a song. These branches offer evidence someone can hear or inspect after a particular scene catches their attention. They are not five more compulsory stops. The opening chapter remains a selected history of overlapping experiments, not the definitive roster of music NFTs.

The strongest connective thread is a sequence of actions: someone invites participation; people find a way to work together; a finished artifact names what they contributed; another person can follow that trail. The technology matters when it changes one of those actions. This gives the cultural story a firmer shape than a procession of platforms or successful sales.

## Implemented branches and evidence

### Erin Ivey: the missing tool was instructions

New moment `learning-in-public`, person `erin-ivey`. Connect from Mint Songs or the recurring-community-room scene, then return to the film.

[Artist’s original first-mint guide](https://erinivey.com/pages/how-to-collect-your-first-music-nft-step-by-step), live-read in this review. Ivey describes two months learning, a December 31, 2021 mint of 50 editions, a recording including her grandmother’s voice, help from Mint Songs and a listing delay. The story follows her conversion of a difficult first attempt into a guide for the next person. Source ID already existed: `erinMint`.

**Limit:** this is a historical account, not current wallet advice. The linked Mint Songs song page (`https://www.mintsongs.com/songs/2321`) failed during review. The actual token has not been recovered here, so this branch does not invent an onchain listening button.

### Heart Project: a community label still needed a process

Expanded existing `heart-project` moment: an invitation needs selection, writing, recording, mixing, artwork and distribution before it becomes an album. Names Aidan Cullen, D33J, Alex Valenti and Tjani Warren through canonical IDs `aidan-cullen`, `d33j`, `alex-valenti`, `tjani-warren`.

[Heart Project April update](https://theheartproject.medium.com/heart-project-april-update-2aef98e4b80), April 11, 2022, live-read. Its staged plan is important: members could submit skills or material; a proposed label would combine community participation with conventional distribution. It explicitly explains why reaching listeners did not require every part of the release to use a blockchain.

**Limit:** a detailed proposal is not evidence that the album and every stage were completed. The chapter describes the proposal confidently and keeps the unverified outcome in its notes.

### LNRZ: a release becomes someone else’s raw material

New moment `lnrz-satellites`; people `lnrz`, `sara-phillips`; playable existing record `record-00396a23`. Connect from CHAOS or the remix sequence.

[Original Spotlight Week 7 token metadata](https://arweave.net/DFd4uJIzrHxOh7-MbyaCv6ednO7sBYDC6-vEb6MKDJQ/0), resolved through Ethereum `tokenURI` for `0x00396A23e204f3cf9E3a768C0218525501f45af1`, token 1306. The notes describe a free SATELLITES sample pack with Kits.io, an invitation for remixes/beats and Sara Phillips’ selected submission. The track is *i don’t feel like dancing anymore*. New source ID `lnrzSpotlightNotes`.

The contract-creation transaction `0x3ec17e5b51d7c36d462be88e632997d698250176e03d1919c9bb7742d93e9867` was independently read through Blockscout: May 29, 2023, block 17363385. This establishes the release-era bound, not the sample-pack announcement’s date.

**Limit:** notes do not establish the complete participant list, exact selection process or rights terms. The story does not imply unrestricted reuse of the finished song.

### CAMPFIRE: a gathering leaves a record

New moment `campfire-miami`; people `campfire`, `lackhoney`, `tarot`, `tk`, `abjo`, `pete-rango`; playable existing record `record-69c77ef0`. Connect from the gatherings sequence. Other credited names remain accurately written even where a canonical profile is not yet available.

[MIAMI FREESTYLE original token metadata](https://arweave.net/94tDeSdxSDQfUwmJTmBTwUfvVVdPB3J14f7Y-inl70E/105), resolved through Ethereum `tokenURI` for `0x69C77EF0b1b4bbAa9ea64F221Ffb891F651F501F`, token 105. CAMPFIRE describes its first Art Basel Miami artist camp, with over 50 artists; the recording credits Aly (now Lackhoney), Tarot, Elle Symone, Early and TK, production by AbJo, mixing/mastering by Pete Rango, and artwork by Karey and TK. The description also describes community-voted S1. New source ID `campfireGenesisNotes`.

The contract-creation transaction `0x3b1f1ed6d8831ec6c5b316e14c76243e46e9b2c3dd1812a8760ff88029aa1c1c` was independently read through Blockscout: June 6, 2023, block 17418342.

**Limit:** that is not a verified camp date. Over 50 camp participants does not mean 50 people made this track. The chapter does not call this song a vote winner without specific evidence.

### Black Dave: assembling a toolbox around a performance

Expanded `black-dave-glass` moment; canonical person `black-dave-mk2`. Connect from Zoratopia and the final reflection about building tools.

[Black Dave’s original essay](https://paragraph.com/@blackdave-2/can-music-nft-collectors-actually-win), live-read. Dave describes an intimate wavWRLD token-holder performance filmed by Glass, and a plan to route 30 percent of its video sales to 154 existing collector wallets through Reveel. The cultural question is what supporters could participate in or receive, and how an artist assembled existing services when he could not immediately build the software himself.

The essay links [the original Glass release](https://glass.xyz/v/2PpDFJmqlVJGkZKDNvsv48jN4xeu7ssF6Mo2VoTea2w=). That page was unavailable during this review. It also supplies a split address, `0x96417ADEB3DDe0c8450A8e56386c02DD6fD568fd`.

**Limit:** this verifies the artist’s account and announced arrangement, not an independent audit of every payment. Do not promise working video playback until the release token/media has been recovered.

## Implementation and verification

`src/narrative.js` preserves the existing Park chapter and adds the new branches after it. The two newly playable branches use `recordIds` containing existing library record IDs. Parent integration owns generic record rendering and film entry links. Every new person/source/related-moment reference passes `tests/content.test.mjs`; JavaScript syntax check passes. Rendered layout and media playback are separate integration checks, not established by those data checks.

## Remaining depth worth pursuing

- Recover Erin Ivey’s first Mint Songs token and Black Dave’s original Glass video token/media.
- Follow the Heart Project proposal through subsequent artist releases before writing an outcome.
- Document the exact CAMPFIRE camp date, additional individual participant accounts and complete S1 selection trail.
- Extend TK’s personal trajectory with first-person accounts; a CAMPFIRE credit alone does not tell that story.
- Give Chill Pill its own artifact-backed account once the specified official thread, release mechanics and creator identity are corroborated. Do not merge unrelated projects sharing a similar name.
- Add complete canonical identities for Elle Symone, Early and Karey after verification, rather than making a guess from a common name.
