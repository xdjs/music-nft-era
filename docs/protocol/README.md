# Recreating the Music NFT Era experience

This is the living build record for the protocol published to **lab.musicnerd.net**. It is stored with the implementation so another builder can inspect the recipe alongside the result. Published through the supported PUT /api/protocols API under the musicnerd creator: https://lab.musicnerd.net/musicnerd/music-nft-era. Exact submitted fields and API receipt are preserved in LAB-SUBMISSION.json and LAB-SUBMISSION-RESULT.json.

Start with [the reproduction prompt](PROMPTS.md), then follow [the actual build process](PROCESS.md). Use [the resource map](RESOURCES.md) to find evidence and implementation files, and [the run and verification guide](RECREATE.md) to test a recreation. [The decision log](DECISIONS.md) records why the experience changed; it is essential context, not optional polish.

The outcome is a selected, source-backed scrolling documentary with optional chapters, contextual people, original-NFT listening, provenance and return navigation. It is **not** a complete history, a newly populated Music Nerd database, a full-discography index, or a complete production service; the deployed experience remains a protected review.

## Submission packet

| Item | Repository location | Status |
| --- | --- | --- |
| Starting prompt and steering | PROMPTS.md | Reconstructed from this conversation; not represented as a verbatim transcript |
| Research and editorial method | PROCESS.md; ../RESEARCH.md | Implemented workflow, with gaps identified |
| Story and source inventory | ../STORY-EDIT-2026-11-04.md; ../SOURCES.md; ../ERA-RESEARCH-LEDGER.md | Dated evidence; unresolved leads retained |
| Visual direction | ../CINEMATIC-DIRECTION.md; ../DESIGN.md | Includes rejected directions and rationale |
| Technical boundaries | ../DATA.md; ../NFT-COVERAGE.md | Fixtures, live adapter, API boundaries distinguished |
| Local code and verification | ../../src; ../../tests; ../VERIFICATION.md | Reversible local implementation |
| Review captures | ../../captures | Desktop and phone; captures are not proof of every live media endpoint |
| Actual Lab API/schema | /protocol-api.md; LAB-SUBMISSION.json | Published via creator-scoped key; no database bypass |

Update this record when prompts, research methods, data boundaries, interaction models or validation materially change. Keep private transcripts, credentials and raw internal payloads out of this public-facing packet.
