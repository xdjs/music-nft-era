# Portrait sources and remaining gaps — November 4, 2026

## Implemented

- **Imogen Heap:** [source and license record](https://commons.wikimedia.org/wiki/File:Imogen_Heap_11_-_Pop_Tech_2008.jpg), [original image](https://upload.wikimedia.org/wikipedia/commons/b/b6/Imogen_Heap_11_-_Pop_Tech_2008.jpg). Photo by kris krüg, PopTech, October 24, 2008. Original 704 × 1024. Upper 704px square crop keeps her face and instrument visible. `imogen-heap-160.webp` and `imogen-heap-640.webp` retain [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/). Changes: crop, resize and WebP conversion. The license applies to these photo derivatives, not the application as a whole.
- **Nate Mercereau:** [publicist press materials](https://www.forcefieldpr.com/press-assets/nate-mercereau-press-assets/), [selected original](https://www.forcefieldpr.com/wp-content/uploads/2021/07/PhotobyAlyssaRowatt_Nate2.jpg). Alyssa Rowatt is credited in the supplied image filename. The press page also has other photos with different credits; do not transfer those credits to this image. Center square crop, 160/640px WebP. The page explicitly supplies high-resolution press photos; no broader license inferred.

Registry: `src/portraits.js`. Assets: `public/people/`. Browser pass used the unchanged existing profile component on isolated local port 4180 at 1440 × 900 and 390 × 900. Each image loaded and its caption linked to the relevant evidence; face crops were inspected in the rendered dialogs. Disposable screenshots are `/tmp/music-nft-portraits/{imogen-heap,nate-mercereau}-{1440,390}.png`.

## Located and visually inspected, not installed in this pass

| Person | Verified artist source | Finding |
| --- | --- | --- |
| Jamee Cornelia | [Official Carrd](https://artschooldropout.carrd.co/), [profile image](https://artschooldropout.carrd.co/assets/images/image02.jpg?v=a4c1766f) | Artist page identifies Jamee and links their music and social accounts. Image is only 210 × 210, an artist lying amidst colorful artwork. No press designation or explicit reuse terms observed. Candidate for future editorial selection, not represented as licensed. |
| Sara Phillips | [Official biography](https://www.saraphillipsmusic.com/about), [portrait](https://static.wixstatic.com/media/8e9c8a_1057213f924d4068bb5eddeee90ea811~mv2.jpg) | Montréal-born, Los Angeles-based singer-songwriter. This is Sara without an h, not the similarly named British singer Sarah Phillips. Official biography photograph was visually inspected. No explicit press/reuse terms observed. |
| RAC | [Commons concert file](https://commons.wikimedia.org/wiki/File:RAC_@_Concord,_Chicago_11-1-2014_(15761741295).jpg) | File metadata identifies RAC at Concord Chicago, November 1, 2014, swimfinfan, CC BY-SA 2.0. Candidate only: individual subject and crop not yet visually verified, so not installed as an André Anjos portrait. |

## Next useful portrait targets

Foregrounded participants still worth researching include Jamee Cornelia, Jazii, Diamond Doll, Cooper Turley, Sara Phillips, Derek Taylor, Josh Lippi and Ben Schwier. Verify each against independent artist identity and the actual recording credits before selecting a face. A project logo or album cover must not silently become a person’s portrait. Current social images are not automatically era-dated.

This bounded pass improves two real gaps. It is neither full artist-image coverage nor a complete permissions audit. Existing social-profile and publisher images remain documented with their actual source status; no blanket clearance claim and no mass removal.

## Follow-up: Erin Ivey added

[Official artist bio](https://erinivey.com/pages/bio) has a “HI RES PHOTOS” section linking downloadable artist images. Selected [Nicola Gell studio photograph](https://www.dropbox.com/s/7rgwawqyrb06gaz/Erin%20Ivey_Photo%201%20by%20Nicola%20Gell.jpg?dl=0); the filename supplies the photographer credit. Center-square 160/640px WebP assets added. This is an artist-distributed press image for editorial context, with no invented broad license.

The same official bio independently confirms Austin singer-songwriter identity and describes selection for the first international Mashibeats Web3 Creator Club cohort. That statement is a research lead for the documentary, not proof of a particular collaboration.

Further target checks: Cam Murdoch was already present in `src/portraits.js`; Sara's current site has Home/About/Music/Tour/Shop/Contact but no observed EPK. Jamee's Carrd has official social/music/NFT links but no observed press-photo distribution link. [AbJo's Bandcamp](https://abjo.bandcamp.com/) links abjonian.com, unavailable in this pass. A search hit for “Abjos” identifies a different Nigerian musician and must not be used for AbJo.
