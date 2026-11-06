# Sound legacy and Optimism coverage supplement

Research run: November 4, 2026 Pacific (checkpoint timestamps use November 5 UTC).

## Material additions

| Deployment | Discovery unit | Discovered | Resolved recordings |
| --- | --- | ---: | ---: |
| Ethereum pre-protocol ArtistCreator proxy | Artist contract, potentially many releases | 172 | 2 |
| Optimism SoundCreatorV1 | Release contract | 1,787 | 22 |

These counts are not a complete Sound discography or a count of all minted NFTs. Discovery exhausted the public indexer's pagination for these particular factories. Permissionless factory creation also does not prove a release appeared on Sound's curated frontend. Metadata hydration was bounded; failures remain retryable.

The two legacy recordings are Charm Taylor's **infinite** and Sound of Fractures' **No One Knows Me Like You ft. Scott Quinn**. Each artist's indexed mint history contains 25 unique token IDs and one purchase-event release group through Ethereum block **26,346,664**. Mint histories include tokens subsequently transferred or burned; they are not current holdings. No recipient wallet list is exported.

## Deployment evidence

The old [official Sound protocol repository](https://github.com/soundxyz/protocol) contains [ArtistCreatorV2](https://github.com/soundxyz/protocol/blob/master/contracts/ArtistCreatorV2.sol). Ethereum proxy `0x78e3adc0e811e4f93bd9f1f9389b923c9a3355c2` points to implementation `0x5912eb98dcc819894aae9e06f5fb6a3bec459346`. The [verified implementation source](https://eth.blockscout.com/api/v2/smart-contracts/0x5912eb98dcc819894aae9e06f5fb6a3bec459346) exactly matches that official file after line-ending normalization and trimming. Its CreatedArtist event identifies an artist contract, not an individual release.

Optimism V1 factory `0x5bcf5773bcf1f131a0cad5c74aa9be1a80b63c55` differs from Ethereum V1's address. Its [verified source](https://optimism.blockscout.com/api/v2/smart-contracts/0x5bcf5773bcf1f131a0cad5c74aa9be1a80b63c55) exactly matches [official SoundCreatorV1](https://github.com/soundxyz/sound-protocol/blob/main/contracts/core/SoundCreatorV1.sol). This corroborates contract implementation; it is not a claim that the official deployment list enumerates every chain. Normalized source hashes and comparison results are preserved in `data/sound-deployment-verification.json`.

The registry in `scripts/sound-contracts.mjs` validates factory and event signature before accepting a created address. V0 and V1 use indexed topic 1. V2 uses topic 2, avoiding confusing its implementation address with the created edition.

Legacy grouping follows the two EditionPurchased event signatures in official [Artist.sol](https://github.com/soundxyz/protocol/blob/master/contracts/Artist.sol) and [ArtistV5.sol](https://github.com/soundxyz/protocol/blob/master/contracts/ArtistV5.sol). Each representative token must also have a matching Transfer-from-zero mint event. We do not infer edition from token arithmetic: older sequential IDs and later packed IDs have different rules.

## Integration files

- `data/sound-v1-10-import.js`: exports `soundImport`, 22 records.
- `data/sound-legacy-records.js`: exports `soundLegacyImport`, 2 records.
- `data/sound-v1-10-index.json`: 1,787 discovered release contracts, metadata attempt state.
- `data/sound-v0-1-index.json`: 172 discovered artist contracts, including Xcelencia, TAROT, Black Dave, the park, Iman Europe and Jamee Cornelia.
- `data/sound-legacy-mints.json`: fixed-block mint evidence, release groups and retryable errors.

Parent integration should copy the two populated modules into its public data boundary and deduplicate against existing records. `data/sound-legacy-import.js` is the intentionally empty generic factory output: do not integrate it. The generic importer refuses to hydrate V0 as if each artist contract were a song.

## Remaining boundary and reproducible continuation

The legacy index began returning HTTP 429 after two artists. Further calls have stopped. The checkpoint retains unresolved artists instead of interpreting errors as empty collections. The importer now throttles requests, applies bounded backoff, saves state and stops on sustained rate limiting. A later authorized local run can resume with `SOUND_LEGACY_ARTIST_LIMIT=8 node scripts/sound-legacy-import.mjs`; that limit bounds candidate artists, not guaranteed successful imports.

Optimism V1 can resume with `SOUND_VERSION=1 SOUND_CHAIN_ID=10 SOUND_HYDRATE_LIMIT=30 node scripts/import-sound.mjs`. Metadata resolution does not verify every original media byte plays. A representative recording is one chosen minted token per release, not every edition. Older deployments beyond the confirmed legacy proxy and newer chains remain outside this inventory.

Tests: `node --test scripts/sound-contracts.test.mjs scripts/sound-legacy-events.test.mjs` checks deployment topic positions, wrong emitters, unsupported chain combinations, full uint256 token IDs, mint-vs-transfer distinction, and purchase/mint correspondence. These tests require explicit invocation because the project's default test glob currently targets `tests/`.
