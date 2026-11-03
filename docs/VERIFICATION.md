# Verification — November 3, 2026

Local preview: `http://127.0.0.1:4178`. No hosted preview, merge or deployment. The separate MusicNerdWeb worktree was preserved.

## Observed visitor journey

Arrive → optional official player → enter remix → Three Oscillators → Boy Untitled → oral-history source → close back to the remix → Walls → CHAOS → Sound → Zoratopia → Network Archives → people index → search Dutchyyy → detail → Escape back to the retained search. Repeated at 1440×1000 and 390×844, in dark and light themes.

| Contract | Observed result |
| --- | --- |
| Evocative opening with a concrete connection | Original sleeves, explicit 2022–24 partial chapter, remix → Three Oscillators → CHAOS trail, entry/listen actions visible on phone. |
| Moment, people, music and provenance | All six curated stops and sourced side paths render. Artist panels identify the relationship type; each moment exposes every supporting source. |
| Back, nested sheets and deep links | Nested person/source Back and close pass; direct source link closes into containing moment; filtered people search restored; moment browser Back restores scroll. |
| Keyboard | Skip link receives initial Tab focus; keyboard entry works; native dialog focus confinement, focused heading, Escape and return-to-trigger tested. |
| Reduced motion | No running animation during tested keyboard/reduced-motion navigation. |
| Touch layout | 390px phone viewport with touch emulation; no horizontal document overflow on the path. Fixed detail sheet fits the viewport and scrolls. |
| Light and dark | Both rendered and visually inspected; contrast, controls, source sheets and path remain coherent. |
| Optional audio | No iframe before request. Real official player initially paused at 0; explicit play advanced audio; pause held current time stable; Stop removed iframe. Phone player captured. |
| Media failure | Blocked embed still leaves the artist release link and stop control. No other media preloaded. |
| Directory failure and slowness | Mocked failed response and stalled request both reach explicit retry state while the source-backed story stays usable. |
| Real Music Nerd integration | Live server reads confirmed Dutchyyy, Sound of Fractures and Three Oscillators using pinned IDs plus independent handles. Real Three Oscillators phone panel captured. |
| Public/private boundary | Unknown identities, raw research, docs, Git config and server modules return 404; write methods return 405. Unit test rejects ambiguous/external-only candidates and strips private fields. |
| Source URLs | 17 of 18 direct HTTP GET checks returned 200; nft now returned 403 to the automated check despite prior content retrieval. Original Sound page unavailable and not used as the authoritative link. See SOURCE-LINK-CHECKS.md. |

## Checks

`npm run ci` passed: JavaScript syntax, Prettier, **5 unit tests**, **12 browser tests**. Browser tests use Chromium, desktop and touch-emulated phone. They deliberately mock directory/media failures; those tests do not prove production integrations. The separate live playback/identity check was also run successfully against actual services.

No runtime dependencies, web fonts, image CDN or framework hydration on initial load. The server serves a small set of local ES modules/CSS; third-party media loads only after listening is requested. Native scrolling and short transform/opacity transitions were inspected. This is not a measured Core Web Vitals claim or a physical-device battery/performance audit.

## Captures

- [Desktop opening, dark](../captures/opening-desktop-dark.png) / [light](../captures/opening-desktop-light.png)
- [Phone opening, dark](../captures/opening-phone-dark.png) / [light](../captures/opening-phone-light.png)
- [Desktop Walls chapter](../captures/walls-desktop-dark.png) / [phone](../captures/walls-phone-dark.png)
- [Phone relationship, light](../captures/relationship-phone-light.png) — intentionally simulated unavailable directory
- [Phone relationship, real live directory](../captures/live-directory-phone.png)
- [Official player, desktop](../captures/listening-desktop.png) / [phone](../captures/listening-phone.png)

Reference screenshots are local research evidence and not redistributed in the public repository.

## Design review

Compared against the live Music Nerd home and the current approved design reference: charcoal canvas, pink actions with black labels, system sans, rounded controls, restrained cyan/mint accents. The editorial spread is an intentional standalone treatment described before implementation in DESIGN.md. No Wodniack banner, copied assets, marketplace grid or graph cloud.

| Before | After | Why |
| --- | --- | --- |
| Initial route focused main automatically | Initial Tab begins at the skip link | Preserve predictable keyboard entry. |
| Whole-page transition briefly expanded horizontal bounds | Story transition contained inside the main region | Prevent sideways movement/overflow. |
| Only first source exposed on a moment | Every source has its own detail link | Make provenance inspectable without leaving the moment. |
| Split letter treatment made “Walls” break awkwardly | Single word and a concise subtitle | Keep the original composition readable on phone. |
| Generic sleeve reused a different release’s title on Dutchyyy’s side path | Dedicated Thoughtful Jawn, Rocks and El Niño Estrella compositions | Avoid misleading artifact associations. |

## Limits and remaining publication steps

Physical iOS/Safari, Firefox, screen-reader speech output and deployed-host behavior are unverified. External embeds and publisher pages may change or restrict access. The complete CHAOS roster, independent accounts of its allocation dispute and cross-chain collection coverage remain research gaps, not completed work.

For publication: Pete reviews this local journey; contributors review the historical scope; choose and authorize hosting; adapt the same read-only routes if needed; rerun browser/CSP/live checks there; approve deployment. No new database or migration is required. The issue stays open for owner acceptance.
