# Current handover — 20 October 2026

## Current trial — collapse below 768px
Implemented the trial in Question.svelte and LivePython.svelte: question grid, editor CSS and runtime single-column detection now all use <768px. Exactly 768px retains two columns. Await visual review before tests, build or permanent guidance/test-expectation updates; the earlier verification below predates this trial.

## Current research — full-width card breakpoint
Research complete: recommend full-width main cards below 1024px, independently of the accepted <768px column switch. This card breakpoint is a proposal pending agreement; no layout changes or tests made. Apple device-width evidence and rationale are recorded in DEV_LOG.md. The 768px column trial was visually accepted; permanent guidance/test expectations still need updating with the final layout decisions.

## Current state and next action
Completed the full-width code frame for single-column questions (<=960px). It reaches the question card’s inside edges, and the viewport edges below 768px. Tabs, guidance and controls remain inset; the grip stays centred. The stretched code frame now has only top/bottom borders; desktop 60/40 layout and its frame are unchanged. Code and line numbers now use 14px by default and 12.5px at <=440px. Next action: respond to visual feedback. No pending implementation, approval, commit or deployment.

## Latest verification
JavaScript syntax checks, /starters build and git diff --check pass. --code-layout-only passes both tabs at 360/440/441/768/960/1280px: specified code/gutter sizes, horizontal scrolling, no wrapping, card-edge alignment and no page overflow. Logs: /private/tmp/editor-font-small-{build,browser}.log. Source: prototypes/pyscript/editor-theme.js, copied into live/python/ by the build. Svelte/marking checks were not repeated for this theme-only adjustment.

## Previous width verification
- [x] Reuse responsive question padding through --question-inline-padding; extend only the code frame, preserving sticky behaviour and local scrolling.
- [x] Keep tab side rules and pinned code shadow aligned with their respective surfaces.
- [x] Svelte check: zero errors/warnings; /starters build and git diff --check pass.
- [x] --code-layout-only: both tabs at 360/767/768/960/1280px pass code/card alignment, tab inset, grip centring, font sizes, horizontal scrolling and no page overflow.
- [x] --mobile-scroll-only: focus clearance, manual pinned resizing, short landscape, restored height, release at question end and normal-flow alignment pass.
- [x] Visually inspected 360px pinned and 768px normal-flow screenshots. Logs: /private/tmp/editor-full-width-{check,build,browser,mobile}.log. Screenshots: /private/tmp/editor-code-360.png and /private/tmp/task2-continuous-outline.png.
- Updated stale refinement assertions; full refinement suite not rerun. Earlier theme, marking and attempt-history evidence remains in DEV_LOG.md.

## Preserved behaviour
Inactive tabs use the plain surface; selection uses a 12% tint, bold text and top accent. Editors follow app light/dark themes with stronger light syntax. Code/gutters use 12.5px at <=440px and 14px above, preserving authored lines with horizontal scrolling. Pin only tabs/code/grip: automatic pinned height is 45% of viewport height in one column, 65% in two; manual resizing overrides it. The default initial cap intentionally uses max(viewport width × 1.4, viewport height × 0.75). Only the grip projects below the frame. Guidance/results and answers scroll normally.

## Relevant files and commands
- src/lib/components/practice/{LivePython,Question,TestPlan,Task2Response}.svelte; css/styles.css; src/lib/styles/breakpoints.css.
- scripts/browser-editor-workflow.mjs; scripts/browser-assessment.mjs; docs/{style-guide,theming,local-development}.md.
- STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-editor-workflow.mjs --presentation-only
- STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-editor-workflow.mjs --mobile-scroll-only
- STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-editor-workflow.mjs --dock-layout-only
- STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-editor-workflow.mjs --code-layout-only
- STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-editor-workflow.mjs --editor-theme-only
- npm run check; BASE_PATH=/starters npm run build
- Domain checks when relevant: node --test tests/esp-task2.test.js tests/esp.test.js tests/editor-workflow.test.js tests/framework-session.test.js tests/profile-lock.test.js

## Runtime and limits
Generated live/ uses BASE_PATH=/starters. Preview remains at http://127.0.0.1:8791/starters, serving /private/tmp/starters-editor-final-preview. Dedicated Chrome uses /private/tmp/starters-editor-browser and CDP9227; browser suites clear only this isolated profile. Port 8766 is unrelated.

Preserve the substantial existing working tree, vendor cache/licences and prior feature changes. No full-suite, physical-device/high-zoom, screen-reader, college Edge/Windows or classroom timing claim. No commit or deployment. Completed session review gates remain in the development history; no new broad refactoring is authorised.
