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
| Portable puzzle rules/content or API | Affected package tests; package browser fixture for standalone controls; packed-bank/algebra/code checks when answer/data contracts change; production integration for shared rendering/bindings |
| Puzzle host rendering, gestures or input focus | Build once; `node scripts/browser-interaction-regressions.mjs --puzzles`; use `browser-puzzle-integration.mjs` when shared bindings/rendering affect other puzzle kinds |
| Profile ownership or persistence lifecycle | `node --test tests/profile-lock.test.js tests/application-lifecycle.test.js tests/framework-session.test.js`; build once, then `node scripts/browser-interaction-regressions.mjs --profiles`; add backup/file checks only when their paths change |
| OneDrive save/failure changes | Progress-file/profile tests; build and `browser-onedrive-go.mjs --files-only` |
| Shared Go changes | Package rule/clock/engine tests, then package/production integration |
| Bank metadata/compatibility | Search, packed-bank and code-compatibility tests; content validation/build |
| Documentation only | Changed local links and whitespace; no app rebuild |

The interaction regression script accepts `--puzzles` and `--profiles` independently; omitting both runs both. It uses real browser input and closes the dedicated test tabs. These checks are not added to every development command or unrelated content/theme work. Reuse passing results while their source/build inputs are unchanged. Neither the focused checks nor a documentation edit calls for a full test-suite rerun.

The [puzzle library](../packages/puzzles/README.md) is ordinary source, not a submodule. `npm test` includes its portable checks. `browser-puzzle-player.mjs` builds a package-only temporary fixture; the production integration checks parent-owned answers/submission. Preserve the library's extraction and disposal contracts.

Search metadata lives in `js/search.js`, `data/search-keywords.js` and generated topics. Progress rules remain in `js/progress.js`, `profiles.js`, `revision.js`, `weekly-progress.js` and `practice-time.js`; UI/session ownership is documented separately. Read the current checkpoint and adopted specifications before treating a dated log entry as current status.
