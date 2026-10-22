# Current handover — 22 October 2026

## Current state and next action

The compact floating-editor changes, confirmed execution change and latest icon/notice/spacing refinements are implemented and verified locally. Run & test/Reset stay on the same row as the tabs. Tabs overlap under space pressure with the selected tab above its neighbour; exposed inactive ends support pointer selection, Home/End retain keyboard selection, and narrow labels have full title tooltips. Tab padding is 2px smaller on each side. Actual overlap adds a subtle shadow towards the inactive tab. Below 440px, Run & test/Reset use matching play/question-mark and cross/loop-arrow icons with accessible names, tooltips and 44px targets; exactly 440px retains text.

The width toggle sits inside the bottom-left code area above its scrollbar, with no extra row. Ordinary/expanded code surfaces have rounded bottom corners. Explicit content conditions prevent an empty feedback surface. The normal-flow grip spacer reserves at least 4px before the following content. The earlier requested prompt and notice removals remain. Removed the redundant test-plan run instruction. Activity.svelte temporarily hides the set-update notice via showSetUpdateNotice=false, preserving compatibility metadata.

Run & test and Ctrl/Cmd + Enter run all configured student tests on the current tab after every expected result is complete. Individual test-plan buttons still run their own group. Authored repair checks and marking run on submission. The tooltip uses the exact requested wording. Original code now has keyboard focus through the shared adapter, enabling its shortcut while remaining read-only.

No pending implementation, commit or deployment. Next action: review the local presentation against user feedback, particularly the custom icons and overlap shadows at phone widths. DEV_LOG.md contains the completed history and initial failures. The scoped project-refactor-checks documentation review remains recorded there; later broad review stages/discussion gates were not run.

## Current work plan — complete

- [x] Hide the set-update notice and remove redundant run guidance.
- [x] Add grip clearance, overlap shadows and icons below 440px.
- [x] Verify diagnostics/build, breakpoint fitting, pointer/keyboard access and scrolling; inspect screenshots.
- [x] Update guidance, development history and this handover.

## Latest verification

22 October tooltip fix: decorative action SVGs ignore pointer events so hover reaches the native-title button. Svelte/build/diff and docking checks pass, including direct button targeting/title availability at 360px. Native tooltip popup appearance was not captured. Logs: /private/tmp/editor-tooltip-{check,build,browser}.log. No pending implementation.

Latest icon polish: both outlines inset 3px inside 44px targets; Reset uses a smooth arc and clear arrowhead. Svelte/build/diff checks and --dock-layout-only pass; inspected 360px screenshot. Logs: /private/tmp/editor-icon-polish-{check,build,browser}.log. No pending work; awaiting visual feedback.

- Svelte: zero errors/warnings; final /starters build, browser-script syntax and git diff --check pass.
- --code-layout-only passes at 360/439/440/441/743/744/820/821/834/1280px: icon threshold/labels/targets, shadow presence/direction, grip clearance, overlapping tab pointer/Home/End selection and no page overflow.
- An older revision-31 code opens current content with no update notice; compatibility comparison still reports changed content.
- --dock-layout-only and --mobile-scroll-only pass pinned controls, focus clearance, resizing and release. Inspected /private/tmp/editor-dock-360.png and /private/tmp/task2-continuous-outline.png.
- Logs: /private/tmp/editor-icons-{check,build,layout,dock,mobile}.log.
- Reused preceding execution verification: 20 focused service/domain tests and real-runtime button/Cmd/Ctrl runs on both tabs, exceptions/timeouts, evidence/reload and 9/9 submission. Latest refinements do not change execution.
- Legacy smoke notice expectation was updated but not run. Broader presentation/full workflow and full suite were not rerun; no physical-device, enlarged-text, screen-reader or classroom acceptance claim.

## Relevant files and running preview

- src/lib/components/practice/Activity.svelte; src/lib/components/practice/LivePython.svelte; src/lib/application/python-practice.js; prototypes/pyscript/adapter.js.
- tests/editor-workflow.test.js; scripts/browser-editor-workflow.mjs; scripts/browser-task2-independent.mjs.
- docs/style-guide.md; docs/esp/task-2-designs.md; docs/local-development.md; docs/spec-common.md; docs/decisions/2026-09-student-experience-and-shared-codes.md.
- Preserve the preceding task's data/esp-task2-live.js, data/code-history.json and js/code-compatibility.js changes (revision 32); live/ includes both tasks. No new bank revision was needed for this follow-on.
- Preview: http://127.0.0.1:8791/starters, serving /private/tmp/starters-controls-preview (symlink to live/).
- Dedicated Chrome: /private/tmp/starters-controls-browser, CDP9227. Scripts clear only this isolated profile. Server/browser are running.
- STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-editor-workflow.mjs --independent-inputs-only
- npm run check; BASE_PATH=/starters npm run build

## Preserved behaviour

Practice entry immediately opens/resumes all four banks and remembers available choices indefinitely. Grouped input execution keeps separate evidence, continues after exceptions/timeouts, and cancels on Stop/edits. Prior verification remains in DEV_LOG.md.

Coding questions use 60/40 columns from 744px and one column below; main cards reach viewport edges through 820px. Code fonts remain 14px, or 12.5px at <=440px, without soft wrapping. Automatic pinned code height remains 45% of viewport height below 744px and 65% above; manual resizing overrides it. Width expansion overlays the answer column without reflow and hides/collapses below 744px.
