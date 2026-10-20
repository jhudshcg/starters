# Current handover — 20 October 2026

## Current state and next action
Completed responsive code text and horizontal scrolling: both tabs use 16px at >=768px and 14px below, preserve authored lines and scroll horizontally when needed. The prior grip clipping and two-column sticky fixes remain. Next action: respond to further UI feedback. No pending implementation, approval, commit or deployment.

## Latest font/scroll verification
- --code-layout-only passes at 360/767/768/1280px for both tabs: computed code/gutter sizes, unwrapped lines, actual horizontal scrolling and no page overflow. The 360px screenshot was visually inspected.
- JavaScript syntax checks, /starters build and git diff --check pass. Earlier component/marking checks remain applicable.
- Logs: /private/tmp/editor-font-final-{build,browser}.log. Screenshot: /private/tmp/editor-code-360.png.
- Source: prototypes/pyscript/{adapter,editor-theme}.js; prepare-site copies these to live/python/. Media font styling targets .cm-scroller because a nested root selector inside the pinned style generator’s media rule was not emitted correctly.

## Earlier docking verification
- Zero Svelte errors/warnings; /starters build and git diff --check pass.
- --dock-layout-only passed at 1280/1024/360px: real expanded/collapsed results, code visibility through scrolling, 60/40 columns, frame/grip alignment and hit-testing beside/on the grip.
- --mobile-scroll-only passed: focus clearance, manual resize, editor-only scrolling, short landscape, release at question end and normal-flow border continuity.
- Logs: /private/tmp/editor-dock-fix-{check,build,browser,mobile}.log; inspected screenshots /private/tmp/editor-dock-{1280,360}.png.

## Completed plan
- [x] Reuse shared card decoration and horizontal mobile gradients below 768px across main question/progress/search/exam cards. Keep compact home/progress tile grids.
- [x] Pin only tabs/code/grip in single-column layouts; guidance, controls and questions scroll normally. Add accessible icon-only guidance/results disclosures and subtle selected tabs.
- [x] Keep editor-only sizing/scrolling, manual resize and focused fields visible below the pinned editor.
- [x] Verify the final outline fix without changing sizing or sticky geometry; update documentation and DEV_LOG.

## Current behaviour
- Code text is 16px from 768px and 14px below. Live editors scroll horizontally instead of soft wrapping; static snippets retain their wrapping policy.
- Main cards below 768px extend to the usable viewport edges, with no side borders/corners and horizontal top/bottom gradient borders where applicable.
- At all widths, the coding-workspace uses display: contents so the editor dock can remain sticky through all associated question parts. Requirements/guidance and controls remain in normal flow. Only the editor scrolls internally.
- Normal initial editor height still follows code length and max(viewport width × 1.4, viewport height × 0.75). While pinned, automatic height is at most 45% of viewport height in one column or 65% in two columns; reserved flow space avoids a jump. Manual resizing overrides compact height and survives unpinning. A dynamic scroll margin keeps focused answer controls below the code.
- At >960px, retain the 60/40 split with explicit grid areas and editor-only sticky positioning. The code spans workspace padding; its square 1px frame, grip and workspace use --line.
- Guidance/results controls show only −/+, with accessible names/expanded state and 44px targets. New checks reopen results. Selected tabs use a subtle tint, top accent and bold text.
- Six detailed attempts per question/variation, older score/skill summaries, own-test marking and original/edited run evidence remain unchanged. Previous terminal hydration/source-map fixes and Python blank-region/prediction work remain.

## Verification
- Final Svelte check: zero errors/warnings; /starters build and git diff --check pass.
- Presentation checks: 360/767/768/960/1280px mobile edges, gradients, no page overflow, local test-log scrolling, disclosures, tabs, sticky editor and progress/search/exam cards. 360px is the routine phone check; do not duplicate sweeps at 320px unless investigating a specific issue.
- Final focused scrolling check: native focus clearance, manual pinned resize, editor-only overflow, restored height, short landscape, release after questions and continuous outline geometry. Visually inspected final outline and mobile/desktop layouts.
- Logs: /private/tmp/mobile-editor-browser.log and /private/tmp/mobile-editor-final-{check,build,scroll}.log. Screenshots: /private/tmp/task2-pinned-360.png, /private/tmp/task2-tabs.png, /private/tmp/task2-continuous-outline.png.
- Prior unchanged-domain evidence: 25 ESP/editor/service/profile tests plus 23 metadata/search/packing/compatibility tests passed; all 18 Task 2 original/repair browser runs passed. Durable history and earlier limits remain in DEV_LOG.md.

## Relevant files and commands
- src/lib/components/practice/{LivePython,Question,TestPlan,Task2Response}.svelte; css/styles.css; src/lib/styles/breakpoints.css.
- scripts/browser-editor-workflow.mjs; scripts/browser-assessment.mjs; docs/{style-guide,theming,local-development}.md.
- STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-editor-workflow.mjs --presentation-only
- STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-editor-workflow.mjs --mobile-scroll-only
- STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-editor-workflow.mjs --dock-layout-only
- STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-editor-workflow.mjs --code-layout-only
- npm run check; BASE_PATH=/starters npm run build
- Domain checks when relevant: node --test tests/esp-task2.test.js tests/esp.test.js tests/editor-workflow.test.js tests/framework-session.test.js tests/profile-lock.test.js

## Runtime and limits
Generated live/ uses BASE_PATH=/starters. Preview remains at http://127.0.0.1:8791/starters, serving /private/tmp/starters-editor-final-preview. Dedicated Chrome uses /private/tmp/starters-editor-browser and CDP9227; browser suites clear only this isolated profile. Port 8766 is unrelated.

Preserve the substantial existing working tree, vendor cache/licences and prior feature changes. No full-suite, physical-device/high-zoom, screen-reader, college Edge/Windows or classroom timing claim. No commit or deployment. Completed session review gates remain in the development history; no new broad refactoring is authorised.
