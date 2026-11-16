# Current handover — 16 November 2026

Both ESD worksheets are approved for student testing and built locally. They are labelled Student testing, answerable from Home/direct codes/search, and searchable by ESD, sustainable, sustainability and sustainable decisions. They open individually and remain outside random multi-question sets. Classroom timing/feedback remains pending.

- Starter (six-minute target): http://127.0.0.1:8765/starters/set/?code=mCZw__H_4
- Longer (12–15 minute target, two linked grids): http://127.0.0.1:8765/starters/set/?code=mCZ4__H_4
- Search: http://127.0.0.1:8765/starters/search/?q=ESD

Revision 38; old codes retain compatibility. Thirty focused ESD/search/compatibility tests, Svelte check, production build and focused search/opening browser checks passed. Logs: /private/tmp/esd-student-{codes,tests,check,build,browser}.log. Earlier shared fields/labels, per-option feedback, cost-grid solution and source checks remain recorded in DEV_LOG.md.

Startup: an unavailable initial app file reproduced the loading screen. Added one guarded pre-mount refresh, then a clear Reload control for persistent failure. Mount removes the listener; saved answers and URL remain intact. Six startup/lifecycle tests, Svelte/build and browser fault-injection/recovery checks passed. Exact cause of the reported first refresh is not established; no claim of eliminating all update failures. Logs: /private/tmp/startup-recovery-{tests,check,build,browser}.log.

Nothing committed or pushed; live GitHub Pages remains unchanged. The repository's normal commit hook builds staged source into live/, and a push to main deploys it. Next action is publication through that workflow when requested, or further student-testing feedback.

Preview runs on port 8765 under /starters/; dedicated Chrome CDP is 9227. Preserve unrelated .githooks/pre-commit, engines/gnugo/gnugo.wasm, live/engines/gnugo/gnugo.wasm, student_bug_reports.md, css/tokens.css and references/esp/dataset-inventory.json changes (including staged mode changes). No dependency reinstall or sync-setting change. Main sources: packages/puzzles/data/esd.js, docs/esd-activity-drafts.md and references/esd/. Durable history is in DEV_LOG.md.
