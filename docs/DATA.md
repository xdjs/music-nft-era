# Read-only data boundary

## Inspected integration

Music Nerd’s current public [searchArtists contract](https://docs.musicnerd.net/api-reference/lookups/search-artists) lives in MusicNerdAPI: `POST https://api.musicnerd.net/api/searchArtists`, JSON `{query: name}`. POST here is a public search operation, not a data mutation. MusicNerdWeb is only a design/API-reference source; this repository owns the standalone consumer.

The search response can include external-only candidates, null IDs and internal/profile fields the exhibition does not need. The server adapter matches a pinned production-directory ID plus an independently sourced Bandcamp or Instagram handle. A name alone cannot confirm identity. It returns only `{id,name,url}`. No raw response reaches the browser. Successful reads are cached in memory for five minutes; errors are not cached. Upstream timeout: 6.5 seconds; client timeout: 8 seconds.

| Person | Pinned public directory ID | Independent reference |
| --- | --- | --- |
| Dutchyyy | efff5473-fa9f-4eba-b137-16ffb79f15d8 | Artist Bandcamp `dutchmassive` |
| Sound of Fractures | b75dc79f-9e5c-4155-a4c5-ce07010e4b33 | Artist Bandcamp `sofractures` |
| Three Oscillators | 0aaf94cb-1fc3-4e15-9cb8-9b3149895303 | Instagram `threeoscillators`, linked from participant oral history |

The historical API is not being invented. All chapter facts, roles and relationships are reviewed local fixtures. The existing search API supplies only identity confirmation and profile links. Adding a new identity requires source evidence and a deliberate allowlist update.

## Request path

Visitor opens matched person → same-origin `GET /api/directory/:known-key` → allowlisted read-only adapter → Music Nerd public search → pinned identity/reference validation → three public fields. Unknown keys return 404. Non-GET/HEAD methods return 405. The server serves a fixed file allowlist; private research, docs, Git files and server code are not web accessible.

No authentication, writes, persistence, background jobs or private knowledge are involved. The local server is an API consumer/static-file adapter, not a knowledge backend. The authored fixture is already public-safe and can render without any successful external request.

## Media and navigation

A user listening action can resolve an allowlisted Ethereum token through `tokenURI` at a recorded block, then present its original media in a native audio/video player. Metadata and storage redirects are restricted to approved hosts; raw descriptions are not returned. Collection browsing uses the public Blockscout index, preserves uint256 IDs as strings, and is labeled separately from live chain reads. Unknown contracts cannot be requested. RPC/storage failures remain retryable; no replacement audio is substituted. See [coverage and source inventory](NFT-COVERAGE.md).

A separate Bandcamp listening action creates one official iframe. It has no autoplay permission. Closing, Escape or navigating away removes it. Slow/failed embeds retain a link to the artist’s release. Artist/source sheets are native modal dialogs; URLs preserve selection and browser history. Closing nested sheets returns to the originating moment or filtered index. Direct detail links close into their containing route.

## Smallest next connection steps

1. Keep this consumer boundary; add independently matched Music Nerd identities as needed.
2. If Music Nerd later exposes a supported public moment/source API, map it into the same fixture shape. Do not expose private Lore or add speculative ingestion.
3. For hosting, implement these fixed routes in the chosen authorized runtime; keep secrets absent from client props. Preserve the CSP’s official Bandcamp frame origin and rerun identity/media/error tests on that host.
4. Confirm publication rights/editorial review before expanding to locally hosted artist media. Existing embeds and links need no asset-copy pipeline.

## Legacy Catalog / Zora V1

For the explicitly selected original Zora V1 contract only, `tokenURI` is media and `tokenMetadataURI` is metadata. Read both at the same block; return only title, original media/artwork and provenance fields. Shared Zora contract membership does not establish Catalog release or artist attribution. The collection index can include non-music works, and the UI explains this boundary.
