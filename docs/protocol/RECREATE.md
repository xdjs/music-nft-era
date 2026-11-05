# Run and verify a recreation

Repository: `https://github.com/xdjs/music-nft-era`. Current working copy: `<project-root>`.

The local working copy contains changes beyond the remote branch. A future builder must use a reviewed commit containing this packet and the corresponding implementation; do not assume an older remote checkout reproduces the latest preview.

```sh
npm ci
npm start
```

Open `http://127.0.0.1:4178/`. Node requirement is in `package.json` (currently 22+). This is a vanilla JavaScript/CSS app with a Node server, not a Next.js app. No production database migration is needed.

```sh
npm run ci
```

This runs syntax checks, formatting, unit tests and Playwright browser tests. Install the Playwright browser if the environment does not already have it. Do not weaken a check or substitute a mock result for a live claim.

## Observable acceptance

- Scrolling starts the story without a required click; context explains music NFTs and artist motivations.
- Optional chapters and sources return to the same reading position.
- Named people open contextual profiles; source and social links are distinguishable; aliases preserve original credits.
- Original NFT recordings play from artwork, with a persistent collection player, queue, skip, shuffle and one-track prebuffering.
- CHAOS songs and collectible editions can be explored separately; recording filters compose and deep-link.
- Keyboard focus, Escape, Back and reduced motion behave coherently; no phone-width overflow.
- Failed metadata/directory/media requests offer understandable recovery rather than a fake empty success.
- No private file, credential or write endpoint becomes public.

Live playback depends on RPC and original storage availability. The browser suite controls some media responses. Audition representative live audio/video separately and report unavailable originals honestly. The current edition reader is Ethereum-focused; additional chains require supported adapters and independent verification.

## Publishing or Lab submission

Prepare a concrete reviewed commit, rights review, preview URL and representative desktop/phone captures. Inspect Lab's actual submission fields when submission is requested. Map this packet into those fields. Publishing, deployment and merging require the user's authorization; this document does not supply it.

## Additional import and recovery implementation

- `scripts/sound-contracts.mjs` records verified Sound deployment generations. `scripts/import-sound.mjs` discovers edition contracts; `scripts/sound-legacy-import.mjs` groups legacy artist-contract purchase and mint events. Keep legacy artist counts separate from release counts. See `docs/research/sound-legacy-coverage.md` for evidence, invocations and limitations.
- Generated public modules are `src/sound-import-v1-10.js` and `src/sound-legacy-import.js`; unpublished checkpoints remain under `data/`. Expose only curated records through the static allowlist.
- `src/media-recovery.js` retries the same IPFS path once through a second fixed gateway. Unit and browser tests verify this boundary; no media reupload is involved.
- The main script can be inspected in `docs/EDITORIAL-SCRIPT-2026-11-04.md`; optional branches live in `src/narrative.js`.
- Run `npm run ci` (includes importer tests) and restart the local Node server after modifying its file allowlist. Verify actual original-media availability separately from mocked playback.
