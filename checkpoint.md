# Current handover — 3 November 2026

## Current state and next action

All agreed ESP Task 2 execution/output corrections and follow-on layout/style changes are implemented and verified locally. No commit or deployment. No outstanding implementation decision or test process. Next action: review the local result. Preview and dedicated Chrome remain running.

Current contracts: docs/esp/task-2-designs.md (“Current execution contract — agreed 3 November 2026”) and docs/style-guide.md. DEV_LOG.md records the investigation, agreements, failures/corrections and completed verification.

- Available inputs run without expected/actual-answer gates. Defaults apply only to an entirely empty plan; partial plans never receive silent supplementation.
- Your code runs obtain missing Original results and reuse completed matches by source, runtime revision, fixtures, function call and exact inputs. Exceptions can be reused; timeouts/infrastructure failures are retried. Original-only cache hits need no runtime load. Old timestamps and pre-run expectations remain unchanged; legacy records without revision metadata remain visible but require one fresh execution before reuse.
- Full output and compact cards share saved evidence. Both code versions remain beside actual-result fields; Original is collapsible. Card output wraps and shows everything, without scrolling or clipping.
- Main output stays attached below the pinned editor/grip. Expanded output has an 8rem minimum and grows only to its content, up to remaining window height with a 1rem bottom margin on phones too. Its heading remains visible and can collapse output without discarding results. The collapsed state is exempt from the minimum.
- The full output heading region is opaque even while scrolled. Top insets above Program output and Code guidance are 4px at the default root size (12px less than before).
- Native scrollbar styling is the app default: theme-coloured thumbs and transparent tracks via standard CSS, retaining native controls/behaviour. The embedded editor theme explicitly applies the same colours because its host resets inherited scrollbar styling.
- Later tabs/actions/themes/width expansion/grip behaviour, source-bound history, cancellation and marking remain intact. Height budgeting now includes wrapper/native scrollbar space as well as the code/header. Focus clearance uses the current editor/output height.

## Completed verification

- [x] Resolve execution, source reuse, card positioning, wrapping and output height/collapse choices.
- [x] Implement available/default execution and shared evidence; preserve marking and saved history.
- [x] Implement pinned, collapsible output and native scrollbar default; fix opaque heading coverage/insets.
- [x] Verify targeted tests, build, desktop/mobile layouts and screenshots; update contracts and durable log.

31 focused execution/domain/session tests pass; final 12 editor tests include cache-only runtime loading. Prior content/metadata checks remain applicable: no further bank changes in the layout/style follow-ons. Final Svelte diagnostics: zero errors/warnings. Final /starters build and git diff --check pass.

Final --dock-layout-only passes short/long output, 8rem minimum, remaining height, result-preserving collapse, keyboard scrolling, native colour checks in light/dark modes and page/test-log/shadow editor, uncapped card wrapping, opaque header coverage and 4px heading insets. Desktop/phone focus after collapse, resizing, short landscape and release pass. Final --code-layout-only passes every 360–1280px boundary and both tabs. Inspected dark Rose desktop and phone screenshots. Earlier --independent-inputs-only, --width-overlay-only and --mobile-scroll-only passes remain recorded in DEV_LOG; execution/state paths were unchanged by the final styling work.

No full-suite, physical-device, college Edge/Windows, screen-reader, all-theme visual or classroom acceptance claim. No new migration of older active drafts. The scoped project-refactor-checks stage 1 findings were discussed/corrected; no broader review completion is claimed.

## Files, logs and preview

Runtime/evidence: src/lib/application/python-practice.js, practice.js, js/task2-tests.js. Components: LivePython.svelte and Task2Response.svelte. Shared scrollbars: css/styles.css and prototypes/pyscript/editor-theme.js. Tests: tests/editor-workflow.test.js, esp-task2.test.js, framework-session.test.js; scripts/browser-editor-workflow.mjs, browser-task2-independent.mjs and browser-task2-inputs.mjs. Guidance/status: docs/esp/task-2-designs.md, docs/style-guide.md, docs/local-development.md, docs/planned-work.md, feature_ideas.md and DEV_LOG.md.

Earlier correction restored defaults in data/esp-task2-live.js (runtime revision 4/question revision 33), with generated data/code-history.json and js/code-compatibility.js. Generated live/ includes all final source changes.

Final logs: /private/tmp/task2-output-header-{check,build}.log and /private/tmp/task2-header-{dock-layout,code-layout}.log. Earlier logs: /private/tmp/task2-pinned-*.log and task2-output-*.log. Screenshots: /private/tmp/editor-dock-{1280,1024,360}.png. Keep temporary artefacts outside the repository.

Preview: http://127.0.0.1:8791/starters, from /private/tmp/starters-output-preview linked to live/. Dedicated Chrome: /private/tmp/starters-output-browser, CDP9227. Browser checks clear only that profile; run serially and never during a rebuild. The editor fixture now starts on about:blank to avoid replaying errors from a page left open during an earlier rebuild.

Commands: node --test tests/editor-workflow.test.js tests/esp-task2.test.js tests/framework-session.test.js tests/application-lifecycle.test.js; npm run check; BASE_PATH=/starters npm run build; STARTERS_PREVIEW_URL=http://127.0.0.1:8791/starters node scripts/browser-editor-workflow.mjs --dock-layout-only. Other selectors: --independent-inputs-only, --code-layout-only, --width-overlay-only, --mobile-scroll-only.
