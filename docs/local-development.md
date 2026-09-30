# Local development

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

With an isolated Chrome debugging session on port 9227 (see existing browser smoke guidance), run `node scripts/browser-theme.mjs` against production. For source preview use `STARTERS_PREVIEW_URL=http://127.0.0.1:5173 node scripts/browser-theme.mjs --hmr`. The optional HMR check temporarily changes and restores `css/tokens.css`; run it while that file is not being edited. It checks CSS updates without reload/input loss. Both modes check all eight palettes, gradient contrast, the compact picker, paired switching, amber selections and green/red marking, retry, narrow layout, persistence and four-bank rendering. Screenshots go to `/private/tmp`.
