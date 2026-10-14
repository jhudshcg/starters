# Current handover — 14 October 2026

## Latest completed work
- Development refresh investigation: browser cache is reused; no application cache reset was found. On-demand readable banks now replace eager development imports through js/bank-data.dev.js and vite.config.js. Node tools stay eager; production keeps encoded lazy banks. Explicit development serving paths cover data and packages/puzzles. Home loads no bank and each practice page loads its own bank only.
- Header spacing: greeting and Last tracked form a compact stack beside Not you?, preserving the 44px target. Smaller header row gap/mobile bottom padding. My progress stays visible below the hamburger and in its menu; icons and subtitle remain correctly aligned.
- Toolbar gap: explicit row direction on set-toolbar/result-banner prevents daisyUI's card column default from turning the summary's horizontal flex basis into a large vertical gap. Timer selector sizes to its content.
- docs/style-guide.md, docs/local-development.md and docs/application-architecture.md reflect these changes and focused checks. Durable details are appended to DEV_LOG.md.

## Latest verification and limits
- Svelte diagnostics: zero errors/warnings. Four bank-loader/production-build/staged-build tests pass, including deterministic output and lazy packed banks. Production rebuilt after the toolbar CSS correction; whitespace checks pass.
- Development home/four practice routes verify on-demand bank imports. Node checks verify repeated/concurrent data reuse and unchanged eager authoring imports.
- Normal warm Python refreshes before the change: development 171–328ms, built preview 56–61ms. Afterward, development 137–382ms and 195 resource requests versus 227 previously. The multi-second user-observed pause was not reproduced; do not claim a guaranteed speed improvement or that all startup costs are solved. Development still loads larger modules/source maps than production.
- Compact header: long profile name, direct/menu progress links and layout pass on home/programming/progress at 360/440/768/1280px. Profile switch remains 44px; subtitle position and icon row preserved.
- browser-assessment.mjs --layout-only passes toolbar spacing, intrinsic selector sizing, mobile borders and submission at 360/440/441/768/1024px. A 360px Python screenshot was visually checked: no stretched summary gap.
- The full assessment run stalled during clock mocking. Stopped the process and replaced only the dedicated test tab to remove the mock; focused checks passed afterwards. Cause remains unconfirmed; no new timer implementation changes and no full-assessment pass claimed. This needs separate investigation if timer/clock tests are revisited.

## Existing completed work
Full SvelteKit/Svelte, Tailwind, daisyUI and Bits UI migration; real-pointer home-card fix; responsive scale consolidation (440/768/1024, explicit inclusive mobile variant, intrinsic home gutters); pre-paint saved-theme restoration through shared logic. Earlier migration/136 responsive comparison/eight-theme/54 pointer-case evidence is retained in DEV_LOG.md. Those unchanged suites were not all repeated.

## Workspace and evidence
Uncommitted and undeployed. Preserve pre-migration baseline 67c927a and unrelated work. Source preview is on 5173, built preview on 8765, dedicated test Chrome on 9227; check availability before use. live/ is a root preview build; the commit hook builds staged source with /starters.

Latest disposable evidence: /private/tmp/tlevel-refresh-timing*.log, tlevel-dev-bank-check.log, tlevel-startup-build-tests.log, tlevel-startup-spacing-check.log, tlevel-toolbar-{build,layout,assessment}.log, tlevel-compact-header-final.log and tlevel-toolbar-fixed.png. Temporary measurement/layout harnesses are also in /private/tmp.

## Separate pending work
Physical Safari, screen readers and OneDrive syncing remain untested. Large client chunk remains. Earlier heading-focus/small-code findings, broad test-quality review and legacy fixture assumptions remain separate; the stalled clock test above is newly recorded evidence.

## daisyUI guidance
Use supported variants where appropriate, shared semantic classes and explicit component layouts. Avoid accumulating overrides that fight component defaults. The recent fixes use ordinary CSS, but repeated inherited-style conflicts exposed integration-check gaps; a complete daisyUI audit has not been performed or newly authorised.

## Next action
Session closed at the teacher's request; no pending requested code changes. Await feedback on compact header/toolbar and development refresh behaviour. If the loading pause persists, measure the user's browser/device with these changes; local timings did not reproduce multiple seconds. Commit/publish only when requested.
