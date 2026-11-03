# A scene, in the making

A standalone Music Nerd listening exhibition about one connected chapter of the Music NFT era. Start with a remix, follow Three Oscillators into Songcamp’s CHAOS, then explore releases, gatherings and the Network Archives publication.

**Six guided stops · 15 moments · 46 credited people/contributors · 18 sources.** A partial community account, not a definitive history.

![Opening, desktop](captures/opening-desktop-dark.png)

## Run locally

Node 22 or newer. No credentials, database or runtime packages required.

```sh
npm ci
npm start
```

Open **http://127.0.0.1:4178**. The server binds to localhost only. Change `PORT` if needed. Deep links use hashes, for example `/#/moment/walls?person=three-oscillators`.

## Try the journey

1. Choose **Listen first** and press play in the official Bandcamp player. Pause there or choose **Stop & close**.
2. Enter the chapter; open **Three Oscillators** in the credits.
3. Follow **Boy Untitled**, inspect the oral-history evidence, and go back or close the sheet.
4. Follow the next stop into **Walls**, then **CHAOS**. Side paths cover CC0lab, the common pool, Splits and CLUB CHAOS.
5. Continue through Sound.xyz, Zoratopia and Network Archives, or search the wider people/moment index.

## What is live?

| Surface | Data |
| --- | --- |
| Historical moments, dates, people, relationships and source notes | Locally authored, public source-backed fixture in `src/data.js` |
| Dutchyyy, Sound of Fractures and Three Oscillators directory identities | On-demand, read-only Music Nerd public API check; pinned ID plus independent profile reference |
| Music | Official Bandcamp embeds loaded only on request; no autoplay, local audio files or rehosted artwork |
| Pete’s public collection | Partial Ethereum research only; no wallet connection or raw export in the app/repository |
| Corrections/contributor submissions | Clearly labeled future feature; no account or write API |

The adapter exposes only a confirmed artist ID, name and Music Nerd URL. Failed, slow or ambiguous responses leave the local story available. No private Lore, raw internal payloads, production mutations or ingestion platform.

## Research, design and verification

- [Reference matrix and historical research](docs/RESEARCH.md)
- [Design brief and composition](docs/DESIGN.md)
- [Source inventory](docs/SOURCES.md) and [HTTP link checks](docs/SOURCE-LINK-CHECKS.md)
- [Data contract and implementation boundary](docs/DATA.md)
- [Verification, captures and limitations](docs/VERIFICATION.md)
- [Owning issue #1](https://github.com/xdjs/music-nft-era/issues/1)

```sh
npx playwright install chromium
npm run ci
```

The repeatable browser suite mocks upstream directory failure and media failure intentionally. Separate live checks confirmed all three identities and actual Bandcamp playback/pause/stop. To repeat live checks with the server running: `npm run check:live` (requires network access).

No hosted preview, deployment or merge has been performed. To publish later: review the chapter with contributors, authorize a hosting target, configure the read-only adapter there, rerun same-origin/browser checks, and approve deployment. No data migration is needed.
