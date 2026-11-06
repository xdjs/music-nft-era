# Sound and The Park import — November 4, 2026

Local implementation; not deployed. These are discovery inventories and selected verified editions, **not all minted NFTs**.

## Sound

Official deployment and event reference:
- https://github.com/soundxyz/sound-protocol
- https://github.com/soundxyz/sound-protocol/blob/main/contracts/core/interfaces/ISoundCreatorV2.sol

Read-only importer: `scripts/import-sound.mjs`. It paginates Blockscout logs for the official V2 factory `0x0000000000aec84F5BFc2af15EAfb943bf4e3522`, selects its exact Created event topic, extracts the indexed edition address, and checkpoints contracts, transaction/block hashes and pagination. This is stronger discovery evidence than a token-name search. A permissionless factory event does not establish that Sound curated a release or establish creator identity.

Current snapshot:
- Ethereum: 115 discovered contracts; public-index pagination exhausted. Creation-event blocks 18,340,621–21,262,515.
- Optimism: 5,774 discovered contracts; public-index pagination exhausted. Creation-event blocks 110,008,364–129,343,887.
- Playable metadata recovered for 39 Ethereum and 7 Optimism representative editions. These have been imported into the recording library.

Those block ranges describe returned creation events, not an independently verified full-chain scan. The index may omit contracts or tokens. It frequently returned missing metadata or 404s; failures remain recorded and retryable. The resolver then reads tokenURI directly on the correct chain, at a recorded block, and fetches the original metadata. This recovered recordings that the index alone could not describe.

Resume another batch:

```sh
SOUND_CHAIN_ID=10 SOUND_HYDRATE_LIMIT=100 node scripts/import-sound.mjs
```

Use `SOUND_RETRY=1` to retry prior failed metadata attempts. Discovery state and results live in `data/sound-v2-index.json` and `data/sound-v2-10-index.json`. Generated public modules contain allowlisted recording fields only. Restart the local server after regenerating modules because its import allowlist loads at startup.

Remaining completeness work: official V1 and pre-protocol deployments; any additional verified factory deployments/chains; full minted-token enumeration (including burns/history) rather than one representative edition; all remaining metadata recovery; independent log reconciliation through fixed chain-head blocks. Current collection browsing paginates indexed editions on demand. No complete artist discography or wallet ownership claim follows from factory discovery.

## The Park

Reference: https://works.fridaysatthepark.org/onchain

`scripts/import-the-park.mjs` inspected all 163 track links exposed by the onchain page, reading public page data without executing remote scripts. It matched 162 records. One route (`s001-onchain-summer-12`) did not expose a matching contract-bearing record. The source inventory is preserved in `data/the-park-site-inventory.json`.

`scripts/resolve-the-park.mjs` verified **29 works** with explicit token IDs against Ethereum, Base or Zora, including Sound's Do It, PB&J and Rainwater, Catalog's Belle, Base releases including becky v2 and the Season 002 tracks, and the Zora Season 001 sequence. Each imported record retains the artist's track-page source, chain, contract, token ID and checked block. ERC1155 uri and ERC721 tokenURI reads are supported; no token IDs were invented for remaining entries.

The other records include videos, later Zora releases, DAO records and records without explicit token references. Their absence from the playable NFT list is a classification/resolution gap, not evidence that they do not exist. Coin contracts must be distinguished from NFTs before attempting tokenURI reads. Do not claim all Park NFTs recovered.

## Listening and UI

The library now filters by original chain. Recording and profile cards offer Add to queue. With no active dock this creates a silent queue; press play explicitly. During an existing queue, a requested track moves next without interrupting the current recording. Duplicate pending copies are removed. The existing next-track prebuffer is refreshed to match the new order. Queue, skip, pause, shuffle and navigation persistence reuse the existing player.

The documentary's authored selection is unchanged. Imported artist credits are metadata attribution, not biographical verification. No new Music Nerd backend or production writes were introduced.

## November 4 follow-up: earlier contracts and another Optimism pass

The official Ethereum deployment artifact at https://github.com/soundxyz/sound-protocol/blob/main/broadcast/Deploy.s.sol/1/run-latest.json names SoundCreatorV1 at `0xaef3e8c8723d9c31863be8de54df2668ef7c4b89`. Its `SoundEditionCreated` event, defined in the repository interface, differs from V2; the importer uses that event's correct indexed edition position.

The V1 Ethereum public-index pagination returned 1,640 collections. The initial recovery pass supplied 3 representative recordings. Another 200-collection Optimism attempt increased its recovered recordings from 7 to 38. The selected library now contains 194 records, including 29 Park records. These figures supersede the earlier recovery counts above; the discovery limitations remain.

Commands:

```sh
SOUND_VERSION=1 SOUND_CHAIN_ID=1 SOUND_HYDRATE_LIMIT=100 node scripts/import-sound.mjs
SOUND_VERSION=2 SOUND_CHAIN_ID=10 SOUND_HYDRATE_LIMIT=100 node scripts/import-sound.mjs
```

The V1 script defaults to the only deployment verified in this pass (Ethereum); it rejects an unsupported V1 chain instead of assuming the same address exists there. Pre-protocol Sound contracts and full minted-token history remain outstanding.
