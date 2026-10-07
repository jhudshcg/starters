# Local development

For the planned move out of OneDrive and automatic selection between GitHub accounts, follow [GitHub account and local repository setup](git-account-setup.md). SSH setup is deferred to the next session.

Run `npm ci` once after checkout or dependency changes, then `npm run dev`.
Open <http://127.0.0.1:5173>. Keep the terminal running; Ctrl+C stops it.
Use a Node version supported by the pinned Vite release: 20.19+ within Node 20, or Node 22.12+. This integration was checked with Node 26.

CSS saves update the page without a full reload. JavaScript/question-bank edits reload the page as needed. Vite resolves npm imports and serves readable authoring banks; no manual mode flag, packing or production build is needed. The existing authoring loader loads all four banks eagerly. Browser progress is separate from port 8765 because storage belongs to an origin.

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
