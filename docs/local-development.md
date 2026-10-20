# Local development

Install the pinned dependencies with `npm ci`, then run `npm run dev` and open <http://127.0.0.1:5173>. The SvelteKit/Vite server listens on loopback and fails if its port is occupied. This migration was checked with Node 26; follow the installed Vite package's Node engine requirement when choosing another runtime.

`predev` validates and prepares distribution assets. Both previews load question banks on demand: development imports readable authoring modules through `js/bank-data.dev.js`, while production fetches hashed encoded banks. Node authoring tools retain eager imports. CSS/component saves update through Vite. Storage belongs to the origin, so ports 5173 and 8765 have separate local profiles. Use the built preview for representative loading performance: development serves more modules and source maps and revalidates source files for edits. The app does not clear the browser cache on refresh.

Use `npm run check` for Svelte diagnostics, `npm run format` for the framework source and `npm test` for domain, framework-session, portable puzzle and production-build checks. `npm run validate` also checks coverage; use `npm run codes:update` and `npm run search:index` when content changes require regenerated metadata. See [application ownership](application-architecture.md) for where to edit code.

## Production and repository paths

`npm run build` builds the working tree into `live/`. `npm start` builds and serves that directory at <http://127.0.0.1:8765>. To serve an existing build without rebuilding:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory live
```

For repository hosting, build with `BASE_PATH=/starters npm run build` and mount `live/` at `/starters/` in the preview server. Incoming hash links remain supported. Direct paths such as `/starters/practice/?type=2` and `/starters/set/?code=…` have prerendered entry files. Do not open generated HTML through `file://`.

The commit hook builds the **Git index**, using `/starters` by default (`BASE_PATH` can override it), and stages generated `live/` only after success. Installed dependencies must match the staged lockfile. It never stages source files. Pages uploads committed output without installing/building. Framework caches `.generated/` and `.svelte-kit/` are disposable; do not edit generated output.

For the planned move out of OneDrive and GitHub account selection, see [repository setup](git-account-setup.md).

## Browser checks

Use a dedicated Chrome profile with remote debugging on port 9227 and a production preview on 8765. **These scripts clear that test browser's storage. Never connect them to a personal/student browser.** Run serially and do not overlap them with a build or `npm test`, which replaces `live/`. `STARTERS_PREVIEW_URL` can include a repository path. Temporary screenshots/logs belong in `/private/tmp`.

The current [ownership map](application-architecture.md#verification) lists the migrated browser suites. Older broad smoke/ESP/expansion fixtures may assume legacy storage, native dialogs or hash-only routing; their historical passes are not evidence for the current framework host. Use current focused checks or adapt the relevant fixture before relying on it.

`browser-theme.mjs --hmr` can check live CSS updates against `STARTERS_PREVIEW_URL=http://127.0.0.1:5173`. It temporarily changes/restores `css/tokens.css`; do not run while someone is editing that file. Full slider ranges test behaviour, not contrast compliance at every custom setting.

`browser-onedrive-go.mjs` uses real origin-private file handles with stubbed native pickers. It checks file contents, permissions/errors/conflicts and Go interactions; it does not exercise OneDrive's desktop sync client. `--files-only` selects file checks. Engine/source/licence assets ship with production; estimation loads on demand.

## Select checks from the change

Reuse completed checks for unchanged inputs. Run focused checks after a coherent batch and inspect full logs for failures. This repository does not yet have Maths's content-hash verification cache or `verify:changed`; importing its dependency map without adapting it would give misleading coverage.

| Change | Relevant checks |
| --- | --- |
| Home card links or button foundations | Build, then `browser-home-cards.mjs`; it uses real pointer input because programmatic `.click()` does not exercise CSS hit areas or pressed styles |
| Theme preference parsing or document startup | Build, then `browser-theme-startup.mjs`; it blocks application scripts to verify pre-paint restoration and checks hydration preserves colours |
| Set toolbar or result-card layout | Build, then `browser-assessment.mjs --layout-only` for spacing, selector sizing, mobile edges and submission |
| Framework components, semantic CSS | `npm run check`; build and affected browser flows/widths/themes |
| Shared application/session/routing | Affected framework session/lifecycle and profile/progress tests; select `browser-migration.mjs` or `browser-navigation.mjs` for route/navigation changes; broaden only to affected integrations |
| Build, packing or hosting | Production-build and pre-commit tests; subpath preview including direct routes, banks and engine assets |
| Python tasks/hints | Python sequence/readability checks, then content coverage/codes/validation/build |
| Python topic guides | `tests/discovery-guide.test.js`; build, then `browser-python-guides.mjs` |
| ESP Task 2 content, dropdowns or retirement | `node --test tests/esp.test.js tests/esp-task2.test.js tests/search.test.js tests/code-compatibility.test.js tests/packed-bank.test.js`; update code metadata before compatibility checks; build, then `node scripts/browser-esp-task2.mjs` |
| Shared code entry or error/search fallback | `node --test tests/code-entry.test.js tests/application-lifecycle.test.js tests/framework-session.test.js tests/code-compatibility.test.js tests/search.test.js`; build, then `browser-esp-task2.mjs` checks copied codes, fresh-profile opening, failed bank downloads and unsupported versions. Test at the build's actual base path. |
| Portable puzzle rules/content or API | Affected package tests; package browser fixture for standalone controls; packed-bank/algebra/code checks when answer/data contracts change; production integration for shared rendering/bindings |
| Puzzle host rendering, gestures or input focus | Build once; `node scripts/browser-interaction-regressions.mjs --puzzles`; use `browser-puzzle-integration.mjs` when shared bindings/rendering affect other puzzle kinds |
| Profile ownership or persistence lifecycle | `node --test tests/profile-lock.test.js tests/application-lifecycle.test.js tests/framework-session.test.js`; build once, then `node scripts/browser-interaction-regressions.mjs --profiles`; add backup/file checks only when their paths change |
| OneDrive save/failure changes | Progress-file/profile tests; build and `browser-onedrive-go.mjs --files-only` |
| Shared Go changes | Package rule/clock/engine tests, then package/production integration |
| Bank metadata/compatibility | Search, packed-bank and code-compatibility tests; content validation/build |
| Documentation only | Changed local links and whitespace; no app rebuild |

The interaction regression script accepts `--puzzles` and `--profiles` independently; omitting both runs both. It uses real browser input and closes the dedicated test tabs. These checks are not added to every development command or unrelated content/theme work. Reuse passing results while their source/build inputs are unchanged. Neither the focused checks nor a documentation edit calls for a full test-suite rerun.

The Task 2 tests execute independent faulty/corrected Python cases using Python 3, checking input sequences, exceptions, returned values, printed summaries and student-entered test data. `browser-esp-task2.mjs` covers all 18 investigations, response-derived summaries, all eight default themes, narrow layouts and code-entry/retirement navigation. `browser-editor-workflow.mjs` covers real Python runs, prediction gating, blank-region caret geometry, original/edited tabs, own-test marking and matching evidence, formatted check feedback, editor-only scrolling, resizing, submission/reload and read-only attempt review. Run these serially. `--independent-inputs-only` checks grouped valid-input runs and separate outcomes, continuation after exceptions and timeouts, whole-group expectation gating, ordered invalid input, stable identities after removal/edit/reload, full marking, 360px fitting and saved attempt review. `--presentation-only` selects the compact test-log, local scrolling, icon-only disclosures, editor tabs, pinned single-column editor and shared mobile card edges using one Task 2 example plus progress/search/exam pages. It checks 360px as the routine phone width and the affected layout boundaries; 320px is reserved for targeted issues. `--editor-theme-only` checks both tabs across all eight app themes, default text/syntax/gutter contrast, live switching, completion-gap styling and preserved drafts/undo. `--code-layout-only` checks both tabs at 360/440/441/743/744/820/821/834/1280px for code-frame/card alignment, unchanged tab insets, centred grips, specified code/gutter font sizes, unwrapped lines, actual horizontal editor scrolling and no page overflow without running Python. `--width-overlay-only` checks expansion over the answer column without reflow or height changes, keyboard activation, retained editor/draft/scroll state, pinned behaviour, resize handling and hiding in one column, including coding questions without tabs. `--dock-layout-only` checks expanded/collapsed results in two columns, code visibility, grip-only projection, pointer access and mobile docking. `--mobile-scroll-only` checks focus clearance, manual pinned resizing, short landscape, release after the questions and continuous workspace side borders without executing Python. `--refinements-only` selects the code-frame/grip/caret check; `--from=38 --variation=5` selects a final Task 2 case while retaining the shared prediction/history checks. Browser fixtures use native select change events; they do not verify operating-system popup keyboard behaviour. Screenshots and logs belong in `/private/tmp`.

The [puzzle library](../packages/puzzles/README.md) is ordinary source, not a submodule. `npm test` includes its portable checks. `browser-puzzle-player.mjs` builds a package-only temporary fixture; the production integration checks parent-owned answers/submission. Preserve the library's extraction and disposal contracts.

Search metadata lives in `js/search.js`, `data/search-keywords.js` and generated topics. Progress rules remain in `js/progress.js`, `profiles.js`, `revision.js`, `weekly-progress.js` and `practice-time.js`; UI/session ownership is documented separately. Read the current checkpoint and adopted specifications before treating a dated log entry as current status.

## Local PyScript trial

The [trial guide](../prototypes/pyscript/README.md) documents the standalone editor/worker prototype, pinned assets and integration limits. Serve the repository root on port 8767 and open `/prototypes/pyscript/`; it is outside the production build. Run `node --test tests/pyscript-trial.test.js tests/pyscript-regions.test.js` for the observation harness and region/history rules. In the dedicated browser, run `node scripts/browser-pyscript-regions.mjs` for three-mode editing and `node scripts/browser-pyscript-trial.mjs` for real runtime/editor checks. `node scripts/browser-pyscript-theme.mjs` covers legacy drafts, empty-region guards, hover controls and all eight shared themes. These checks need no app rebuild. Python and optional data packages download on first use; college Edge/Windows and cold-cache costs remain to be checked.
