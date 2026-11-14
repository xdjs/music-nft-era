# Documentary refinements — 6 November 2026

Local branch: codex/documentary-refinements. Owning issue: xdjs/music-nft-era#1. These changes were deployed with the Web3 Music Era rebrand; see REBRAND-2026-11-06.md.

Pete requested direct storytelling instead of repeated film attribution, no sale-date caveat in LATASHÁ’s expanded chapter, clearer earlier Songcamp history, varied artwork, more artist profile links, an ambient Iman performance and immediate player artwork updates.

The LATASHÁ narrative now tells her account directly, with one linked Minted credit below the main chapter and the film retained in the source list. Removing the sale-date warning does not invent a sale date.

Songcamp’s own introduction identifies Camp Genesis as the first camp and Elektra as the second, in summer 2021: https://paragraph.com/@songcamp/an-introduction-to-songcamp . The August 16, 2021 auction post describes the Elektra songs and planned patron/DAO mechanics: https://songcamp.mirror.xyz/4pkg2xeNL6BlC-fya7CQ-HPG5FbY2o7Cx3FYQWHWvbI . Plans remain described as plans. Both earlier camps are linked from CHAOS.

## Media provenance

- Iman MWWM ambient loop: ten seconds starting at 00:08, silent, 960px VP9 WebM. Derived from original token media ipfs://bafybeickizrxavfhil2vdtfxx3fdivtq7b7jjxgtwkj6zqj7w22pc3enj4, Ethereum contract 0x1e31c103D422046d156aadf4752bD37B61D06EFE, token 3. Full playback still uses the original NFT media. The ambient excerpt pauses outside the scene and is not loaded under reduced motion or data saver.
- Sound of Fractures cover: 480px local derivative of ar://uXz_JgUC31ZpUW37WvKUG7TGkbU9ROwWK9taFH5LMWw. This lets artwork update independently of audio resolution.
- ilikedat: larger frame extracted from original Zora token 623 video; replaces duplicate EPROM artwork in the NFT explanation. EPROM remains with Catalog.
- Daniel Allan: existing credited artist portrait replaces artwork with embedded text.
- Jamee Cornelia: artist-selected Bandcamp profile image from https://jameecornelia.bandcamp.com/album/harvest, https://f4.bcbits.com/img/0030940565_21.jpg . Current profile artwork, not represented as an era photograph. Original is small; derivatives do not add detail.

## Verification

25 unit tests and 60 shared browser tests passed during this pass. All 28 cinematic tests passed after completing the portrait metadata. Syntax and formatting checks passed. Browser review at 1440px and 390px showed no horizontal overflow or page errors; the Iman excerpt advanced silently in both. Delayed-media regression verifies the cover is available before audio metadata resolves. This does not guarantee every upstream NFT gateway remains available.
