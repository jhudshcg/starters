# Current handover — 21 October 2026

## Current state and next action

Practice-area entry now opens a question set immediately for Puzzles, Coding practice, Core and ESP. The profile's last available focus/subsection/challenge persists across visits without expiry; an active matching set resumes. New profiles use the first discoverable focus, and stale choices fall back to available sets. Breadcrumbs follow the same behaviour. Leave guards and direct codes remain unchanged.

No pending implementation, commit or deployment. Next action: respond to feedback. Completed work and earlier decisions are recorded chronologically in DEV_LOG.md.

## Latest verification

- [x] Six focused selection/session tests pass: defaults across all banks, active-set resume, profile isolation, lasting recall, stale selection fallback and cancelled replacement.
- [x] Svelte check: zero errors/warnings; /starters build and git diff --check pass.
- [x] browser-migration.mjs --entry-only: all four entry links, breadcrumb recall, 30-day recall and reload pass.
- Logs: /private/tmp/practice-entry-{tests,check,build,browser}.log. Initial test-fixture assumptions and a navigation wait race were corrected. Broader navigation/home-card assertions were updated but those full suites were not rerun.

## Preserved Task 2 behaviour

One Run action tests all chosen valid inputs independently in order after all expectations are complete. Returns, exceptions and per-input timeouts continue to later inputs; Stop/edits cancel the group. Each input retains its own outcomes and stable evidence identity. Invalid sequences and parameter tests are unchanged. Old single-input responses remain compatible; queued multi-input runs need rerunning. Timeout output/input count are unknown and cannot earn recorded-outcome credit. The previous 19-test and real-runtime browser verification is recorded in DEV_LOG.md and /private/tmp/task2-group-{tests,check,build,browser}.log.

## Preserved layout

Coding questions use 60/40 columns from 744px and one column below. Main cards are full width through 820px inclusive, with outer gutters above. Shared controls favour the 744px stacking boundary to conserve vertical space; compact spacing uses <=820px. Code fonts use 14px by default and 12.5px at <=440px, without line wrapping.

Only tabs/code/grip pin: automatic pinned height is 45% of viewport height below 744px and 65% above; manual resizing overrides it. The initial default cap uses max(viewport width × 1.4, viewport height × 0.75). Only the grip projects below the frame. Guidance/results and answers scroll normally. The triangle control at >=744px expands code over the answer column without reflow or height changes; it hides/collapses below 744px. Tabs remain fixed and single-line; original/edited documents retain drafts and scroll position. Earlier layout checks and visual acceptance are in DEV_LOG.md.

## Relevant files and commands

- Current entry change: js/practice-selection.js; src/lib/application/practice.js; src/lib/components/practice/Breadcrumbs.svelte.
- node --test tests/practice-selection.test.js tests/framework-session.test.js
- STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-migration.mjs --entry-only

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
