# Local development

For the planned move out of OneDrive and automatic selection between GitHub accounts, follow [GitHub account and local repository setup](git-account-setup.md). SSH setup is deferred to the next session.

Run `npm ci` once after checkout or dependency changes, then `npm run dev`.
Open <http://127.0.0.1:5173>. Keep the terminal running; Ctrl+C stops it.
Use a Node version supported by the pinned Vite release: 20.19+ within Node 20, or Node 22.12+. This integration was checked with Node 26.

CSS saves update the page without a full reload. JavaScript/question-bank edits reload the page as needed. Vite resolves npm imports and serves readable authoring banks; no manual mode flag, packing or production build is needed. The existing authoring loader loads all four banks eagerly. Browser progress is separate from port 8765 because storage belongs to an origin.

The source preview can start slowly after cold compilation or invalidation: on 8 October, a cache-disabled browser received about 79 MB of development modules/debugging data. A warm-server sample became ready in about 0.9 seconds, versus 0.3 seconds for the production preview; neither is a cold-start guarantee. Both previews now include initial loading text. Use the production preview for representative startup checks; a reported ten-second source startup was not reproduced in that warm measurement.

`npm start` still builds and serves the production `live/` directory at <http://127.0.0.1:8765>. Use it for release checks, especially encoded/lazy bank loading. Vite does not run bank validation or update question identities: retain `npm run codes:update` when required, `npm run validate`, and the production checks. The commit hook still builds staged source with esbuild and stages `live/`; Vite does not change that process.

Configuration is only `vite.config.js` plus the `dev` script and pinned development dependency. Vite listens on loopback and fails if port 5173 is occupied. No application code depends on Vite. See [Vite features](https://vite.dev/guide/features) and [server options](https://vite.dev/config/server-options).

## Return to the previous workflow

Immediately: stop Vite and run `npm start`. Rebuild after source changes as before.

To remove the integration while keeping theme changes:

1. Run `npm uninstall --save-dev vite` (updates `package.json` and the lockfile).
2. Remove the `dev` script from `package.json` and delete `vite.config.js`.
3. Change README's preview instructions back to `npm start` and port 8765; remove its link to this document if deleting it.
4. Run `npm run build` to check the existing production path.

No application files, theme files, production scripts or commit hooks need reverting. Vite's disposable cache is inside ignored `node_modules/.vite`.

## Focused verification

With an isolated Chrome debugging session on port 9227 (see existing browser smoke guidance), run `node scripts/browser-theme.mjs` against production. For source preview use `STARTERS_PREVIEW_URL=http://127.0.0.1:5173 node scripts/browser-theme.mjs --hmr`. The optional HMR check temporarily changes and restores `css/tokens.css`; run it while that file is not being edited. It checks CSS updates without reload/input loss. Both modes check all eight preview tiles, semantic/action contrast, full background-lightness ranges and linked accents, saturation, paired switching, persistence/reset, amber selections and green/red marking, retry, narrow layout and four-bank rendering. Full slider-range checks verify behaviour, not contrast compliance at every setting. Screenshots go to `/private/tmp`.

## Continuing progress/profile work

Read the current [checkpoint.md](../checkpoint.md), then [progress specification](spec-progress.md) and [theming](theming.md). Completed work and superseded experiments are preserved in [DEV_LOG.md](../DEV_LOG.md); use the current checkpoint and adopted specifications for current choices. Check `git status` and the latest commit before assuming changes remain uncommitted.

The latest session used the production preview at port 8765. First check whether it is responding; if not, serve the existing build with `python3 -m http.server 8765 --bind 127.0.0.1 --directory live`. Rebuild source changes with `PATH=/opt/homebrew/bin:$PATH npm run build` on this machine. A server from a previous session may no longer be running. No redeployment is implied by starting a local preview.

Implementation map:

- `js/profiles.js`: local profile registry, migration, name matching and activation.
- `js/progress.js`: persisted results, detailed part scores, repeat eligibility and CSV export.
- `js/revision.js`: missing/fresh/stale ranking and persistent recommendation batches.
- `js/weekly-progress.js`: local calendar-week summaries and exact per-set percentage means.
- `js/practice-time.js`: interaction flag/poll clock, engaged-time validation and backup filename.
- `js/app.js`: UI, activity lifecycle, profile restore and export handlers.
- `css/tokens.css`: `--missing-*` and `--priority-*` dominant-theme blends; question-option surface blends stay separate.

When a functional change warrants checks, focused unit files are `tests/practice-time.test.js`, `tests/weekly-progress.test.js`, `tests/profiles-revision.test.js` and `tests/repeat-progress.test.js`. `scripts/browser-profiles.mjs` checks profiles, restore/export, recommendations, weekly UI and simulated inactivity against an isolated Chrome debugging session on port 9227. **It clears storage in that test browser**; never run it against the user’s normal browser/profile. Its default preview URL is port 8765. Temporary `/private/tmp` scripts/screenshots mentioned in the checkpoint are disposable and may not survive to the next session.

The user explicitly chose to test the final highlight colour adjustments themselves. Those final adjustments were rebuilt but not browser-tested; do not present earlier palette checks as verification of the final colours. Avoid unnecessary rebuilds, downloads or full-bank tests for documentation-only continuation work.

Search metadata: `js/search.js` provides matching and constrained candidate selection without reading marking data. `data/search-keywords.js` supplies reviewed extra tags; run `npm run search:index` after editing the Core coverage inventory. `node --test tests/search.test.js` checks aliases, variation-specific evidence, packed-bank equivalence and set constraints.

## Shared puzzle library

The [puzzle library](../packages/puzzles/README.md) is currently ordinary source under `packages/puzzles/`, not a submodule. Normal checkout and dependency installation are unchanged; it has no separate hosting. `npm test` includes its portable checks. For extraction changes, run the library tests plus puzzle, packed-bank, algebra and code-compatibility tests, followed by the production-build test. Keep `npm run codes:check` passing without a revision update when content is unchanged. The library README records the required staged-build-hook change before future submodule adoption.

Puzzle control integration: `node scripts/browser-puzzle-player.mjs` builds a package-only fixture in a temporary directory and uses isolated Chrome on port 9227. `node scripts/browser-puzzle-integration.mjs` checks the production app on port 8765, including named-profile persistence, parent submission and reveal, and desktop/640px/320px reflow. It clears storage only in that dedicated test browser. The older broad smoke/expansion scripts assume legacy profile storage and are not evidence of a passing current integration run.


## OneDrive and human Go verification

`node --test tests/progress-file.test.js packages/puzzles/tests/*.test.js` covers file safety, folder choice, profile identity and portable Go rules/engine. `node scripts/browser-onedrive-go.mjs` uses isolated Chrome on 9227 and production on 8765. It clears **only that test browser's** local storage, uses real origin-private handles with stubbed native pickers, and checks file saves/reload/conflicts and Go controls/engine/touch/reflow. It does not exercise the OneDrive desktop client. Never run it against a personal browser. Temporary screenshots go to `/private/tmp`. The production build ships the engine, corresponding source and licence assets; estimation loads only on demand.

## Select checks from the change

Reviewed the Maths repository's `maths-efficient-development` skill and cached verifier documentation on 13 October. Apply its change-selected approach here: reuse completed checks for unchanged inputs, run focused checks after a coherent batch, and read full logs only for failures. Do not repeat all tests because the same uncommitted diff still exists. This repository does **not** yet have Maths's automatic content-hash cache or `verify:changed` command; importing its Svelte-specific dependency map would give misleading coverage.

| Change | Relevant checks |
| --- | --- |
| Python sequence tasks/hints | `node --test tests/python-sequences.test.js tests/python-readability.test.js`; compare unchanged assessment data for hint-only edits, then content coverage/codes/validation/build |
| Python topic guides | `node --test tests/discovery-guide.test.js`; build, then `node scripts/browser-python-guides.mjs` |
| Puzzle sizing only | Build, then `node scripts/browser-puzzle-layout.mjs`; during CSS iteration `--source-styles` injects only the changed sizing styles over the existing build |
| OneDrive save/failure changes | `node --test tests/progress-file.test.js tests/profiles-revision.test.js`; build, then `node scripts/browser-onedrive-go.mjs --files-only` |
| Shared Go changes | Relevant package rule/clock/engine tests, then package and production Go integration; full `browser-onedrive-go.mjs` covers the human board |
| Bank metadata/compatibility | Relevant search, packed-bank and code-compatibility tests; content validation/build |
| Documentation only | Check changed local links and whitespace; no rebuild or browser suite |

Browser scripts use the dedicated debugging profile on 9227 and a production server on 8765, and clear its test storage. Run them serially. Do not overlap a browser run with production-build tests, which replace `live/`. Keep temporary logs/screenshots outside the repo. A future cached runner should hash each job's relevant sources, tests, configuration and runtime identity, include additions/deletions, and cache only successes. Maintain an explicit conservative dependency map and an opt-in force mode; no watcher is started implicitly.

## Header, practice entry and browser navigation

`node --test tests/practice-selection.test.js tests/discovery-guide.test.js tests/repeat-progress.test.js tests/profiles-revision.test.js tests/practice-time.test.js tests/unsent-answers.test.js` covers the affected selection, guide, progress and leave-warning rules. After building, run `node scripts/browser-navigation.mjs` against isolated Chrome on 9227 and production on 8765. It clears only that test browser's storage and checks 360–1280px home/header layout, empty and two-hour recalled focus, Core/ESP subsection recall, reload, Back/Forward/cancellation, puzzle picker/breadcrumbs, projects, FAQ and search history. Screenshots go to `/private/tmp/tlevel-home-360.png` and `/private/tmp/tlevel-home-1280.png`.

The Python guide browser check now verifies that general introductions preserve independent evidence; specific hints still count as assistance. Run browser scripts serially, without overlapping a build. `js/navigation.js` owns history entries and attempt snapshots; `js/practice-selection.js` owns two-hour recall separately from browser-history restoration.
