# Current handover — 21 October 2026

## Current state and next action

Grouped valid Task 2 execution is implemented and verified. One Run action tests all chosen valid inputs independently in order, after all expected results are entered. Returns, exceptions and per-input timeouts continue to later inputs; Stop and edits cancel the group. Timeout evidence has unknown output/input count, remains reviewable and does not earn recorded-outcome credit. Each valid text input has its own expected result, original/edited runs and actual result. Stable identities preserve the remaining results when another input is removed; edits reject stale evidence. Invalid tests remain ordered sequences and parameter tests are unchanged. Old single-input outcomes remain compatible; queued multi-input evidence needs independent reruns. Existing group marks/totals and completed historical scores are unchanged. Draft logs keep two logical rows and saved attempts retain named per-input evidence.

No pending implementation, commit or deployment. Next action: respond to feedback. Completed work and earlier breakpoint/editor decisions are recorded chronologically in DEV_LOG.md.

## Latest verification

- [x] Focused domain/service/archive tests: 19/19 pass across tests/esp-task2.test.js and tests/editor-workflow.test.js, including all 18 Task 2 investigations and new grouped-run, timeout, cancellation and archive regressions.
- [x] Svelte check: zero errors/warnings; /starters build passes.
- [x] --independent-inputs-only: real grouped valid runs continuing after exceptions and timeouts, ordered invalid sequence, whole-group gating, original/edited results, identity-preserving removal/edit/reload, 9/9 submission, 360px fitting and saved review pass.
- Logs: /private/tmp/task2-group-{tests,check,build,browser}.log. Svelte check, build and git diff --check pass. No full-suite or broad visual sweep was rerun.

## Preserved layout

Coding questions use 60/40 columns from 744px and one column below. Main cards are full width through 820px inclusive, with outer gutters above. Shared controls favour the 744px stacking boundary to conserve vertical space; compact spacing uses <=820px. Code fonts use 14px by default and 12.5px at <=440px, without line wrapping.

Only tabs/code/grip pin: automatic pinned height is 45% of viewport height below 744px and 65% above; manual resizing overrides it. The initial default cap uses max(viewport width × 1.4, viewport height × 0.75). Only the grip projects below the frame. Guidance/results and answers scroll normally. The triangle control at >=744px expands code over the answer column without reflow or height changes; it hides/collapses below 744px. Tabs remain fixed and single-line; original/edited documents retain drafts and scroll position. Earlier layout checks and visual acceptance are in DEV_LOG.md.

## Relevant files and commands

- js/task2-tests.js; js/code-history.js; src/lib/application/python-practice.js.
- src/lib/components/practice/{Task2Response,TestPlan,LivePython,Question}.svelte; src/lib/components/progress/CodeHistory.svelte.
- tests/{esp-task2,editor-workflow}.test.js; scripts/browser-task2-independent.mjs; scripts/browser-editor-workflow.mjs.
- docs/esp/task-2-designs.md; docs/local-development.md.
- node --test tests/esp-task2.test.js tests/editor-workflow.test.js
- STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-editor-workflow.mjs --independent-inputs-only
- Other targeted browser modes: --presentation-only, --width-overlay-only, --code-layout-only, --editor-theme-only, --dock-layout-only, --mobile-scroll-only.
- npm run check; BASE_PATH=/starters npm run build

## Runtime and limits

Generated live/ uses BASE_PATH=/starters. Preview remains at http://127.0.0.1:8791/starters, serving /private/tmp/starters-editor-final-preview. Dedicated Chrome uses /private/tmp/starters-editor-browser and CDP9227; browser suites clear only this isolated profile. Port 8766 is unrelated.

Preserve the substantial existing working tree, vendor cache/licences and prior feature changes. No physical-device/high-zoom, screen-reader, college Edge/Windows or classroom timing claim. No commit or deployment. Completed session review gates remain in the development history; no new broad refactoring is authorised.
