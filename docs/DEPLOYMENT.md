# Hosted review deployment — November 4, 2026

URL: https://music-nft-era.vercel.app
Team/project: Music Nerd / music-nft-era
Project ID: prj_7QaYNHXRvI3pyhViDaUNiPnyvTSH
Deployment ID: dpl_GootZMnKdRuR9aPcdFeNpoERWBfE
Immutable URL: https://music-nft-lx6zfcglq-musicnerd.vercel.app
Status: READY. Vercel classified the first deployment as production and assigned the project alias; it is used as a protected review environment, not an unrestricted public launch.

Access: Vercel authentication required on all deployment URLs (`ssoProtection.deploymentType=all`). Verified anonymously: HTTP 302 to Vercel login. Default initial protection exempted the production alias; this was detected and corrected during verification. Do not disable protection without resolving the publication notes in MEDIA.md.

Source: current dirty local standalone workspace, uploaded using the Vercel CLI after verifying team/project. Not a Git main merge or an exact committed release. Local user edits preserved; no Git push/merge performed. Future releases should capture an agreed source commit and retain this evidence.

Deployment adaptation: server.mjs exports its existing allowlisted read-only handler; api/index.mjs forwards to it. vercel.json packages the exhibition files and routes requests through the same handler. .vercelignore excludes research, data inventories, docs, captures, tests, local environment files and private research folders. Original recordings continue to stream from their metadata addresses.

Verification:
- Syntax checks and 15 unit tests passed after handler extraction.
- Hosted pages rendered at 1440px and 390px using Vercel-authenticated requests, with 29 Park cards, working queue actions and zero page errors. Captures: hosted-queue-1440.png and hosted-queue-390.png.
- Hosted /api/nft/park-sound-do-it returned live Ethereum token metadata and the original Arweave recording address.
- /src/app.js served successfully; /docs/research/SOUND-PARK-IMPORT.md returned 404 through authenticated access.
- Vercel error-log query returned no logs during the verification window. This is a short smoke check, not long-term monitoring; no observability drain was configured.
- Full 15-unit/54-browser suite passed before the deployment-only handler extraction. Hosted smoke tests do not prove every original media file streams reliably.

Public launch gaps: asset publication rights flagged in MEDIA.md, sustained playback/error monitoring and source/content review. Archive completeness can remain explicitly partial; it does not require pretending the documentary covers every participant or release.

## November 4 follow-up deployment

Current deployment: dpl_CvUR8bgyR9EG585Lbjo1TGw5ioda (READY), https://music-nft-ha0yizzcp-musicnerd.vercel.app, assigned to the same protected alias. Adds explicit NFT definitions, The Park's deeper chapter with three playable works, Sound V1 discovery output, 31 additional Optimism recordings and bounded shared metadata reads. Total selected library: 194 records. Local checks: 17 unit tests and 56 browser checks passed; definition layout was additionally reviewed at 1440px and 390px. Image reuse audit remains incomplete and does not establish blanket clearance. No merge or Git push.

## Integrated review deployment — November 4

Deployed `dpl_4S9TKVMxGViUjgSUF4DoAEvoYB8f`, immutable URL https://music-nft-2xwhz4a0y-musicnerd.vercel.app, alias https://music-nft-era.vercel.app. Vercel completed build and alias assignment. The alias remains protected: anonymous request returns302 to authentication. No Git push or merge.

This build includes 218 selected recordings, new editorial branches and portraits, correction-draft links, same-content gateway recovery and edition-level queue controls. `npm run ci`:24 unit tests,60 browser checks passed. Hosted browser checks at1440px and390px showed29 Park cards and3 Charm Taylor cards, successful queue additions and zero page errors. Captures:hosted-queue-{1440,390}.png and hosted-charm-{1440,390}.png. These checks validate rendering/queue behavior, not continuous playback of every remote asset.

## Lab embedded preview correction

Production alias is now public (anonymous200); immutable preview URLs remain Vercel protected. Updated CSP frame-ancestors to self and the two official Lab origins. Added current opening capture at /media/lab-preview-20261104.png. Deployment dpl_91GpUoERKvQpM3KCtqDK71gWFCtB. Updated the existing Lab entry through its supported API to embedded mode and replaced the stale cover URL.24 unit tests passed.
