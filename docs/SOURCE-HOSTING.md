# Source and hosting audit — 2026-11-05

| Project | GitHub | Vercel owner | Deployment method at audit |
| --- | --- | --- | --- |
| Music Nerd Lab | https://github.com/xdjs/music-nerd-lab | Music Nerd (`musicnerd`) | Local CLI upload; no Git connection |
| Medellín Metal | https://github.com/xdjs/medellin-metal | Music Nerd (`musicnerd`) | Local CLI upload; no Git connection |
| Music NFT Era | https://github.com/xdjs/music-nft-era/tree/codex/opening-chapter | Music Nerd (`musicnerd`) | Local CLI upload; no Git connection |
| Music Nerd Lens | https://github.com/p3t3rango/musicnerd-lens | Pete's personal team (`pete-peterangocos-projects`) | Git deployment from `main`; private repository |

## This snapshot

The runtime snapshot matches the inspected production source except for a newer local `src/film.css`. Browser accessibility dumps are excluded. The source is on the existing draft PR branch, not yet merged into main. Source publication does not deploy the newer CSS.

Public source is not a blanket license to reuse third-party photography, artwork, fonts or recordings. Preserve attribution and check the existing image/source audits. Credentials, private transcripts, research caches and environment files are not included.

Vercel account ownership is independent of GitHub ownership. No project transfer, Git connection, new deployment or production promotion was performed by this source-publication task.

Tracking: https://github.com/xdjs/MusicNerdWeb/issues/1666

## November 6 merge candidate

Pete authorized moving the reviewed documentary work to main. The candidate adds the cinematic `/sequence/` draft, The Collection naming, nine LATASHÁ video records, original-video expansion/fullscreen, collaborator filtering, the accented artist display name, and a source-backed Spinamp section. Older source and Pete Rango's originator credit are retained. The dirty working folder was preserved; integration used a clean worktree based on the latest remote PR branch.

Spinamp sources: founder interview published by Quicknode on July 5, 2024, and the project's ETHGlobal Metabolism developer brief. Its historical claims are attributed; current playback coverage is not inferred.

The server's explicit static-file list and Vercel packaging now include the cinematic draft. CI runs both the shared experience and cinematic browser suites. Original media availability, Niqa Mor's unresolved Glass video, and the existing media-rights inventory remain open limitations. Main-source publication is separate from a Vercel deployment; this operation does not deploy or change the Lab listing.
