# Current checkpoint — 8 October 2026

## Latest follow-up — completed

Added brief SvelteKit, daisyUI and Bits UI integration guidance to `packages/puzzles/README.md`, including lifecycle, state snapshots, styling and portals. Clarified that the separate repository/submodule remains deferred; `git submodule status` is empty. README local links and whitespace checks pass. Documentation only; runtime tests were not repeated. Completion is recorded in DEV_LOG.md.

## Completed current work

Completed the agreed puzzle package boundary and documented it in `packages/puzzles/ARCHITECTURE.md` and `API.md`. The package owns puzzle rendering, interactions, serialisable answer state, hints/solution views, meaningful-work detection and all puzzle evaluation. Parent owns grouping, question cards/prompts, codes, submission, persistence, assistance/results policy and coherent presentation.

- [x] Document approach and rationale before implementation.
- [x] Extract board UI, all-part rendering and headless evaluation; add mountable control with explicit lifecycle.
- [x] Adapt parent rendering/marking while preserving packed-data separation and orchestration.
- [x] Verify package/player, existing tests, production interaction, themes and codes.
- [x] Update documentation and completed evidence in DEV_LOG.md.

The library remains ordinary source in this repository, not a submodule. No framework migration, deployment or commit was performed. Prior extraction/style work and unrelated student_bug_reports.md were preserved.

## Important files and APIs

- `packages/puzzles/player.js`: mount/state/lock/reset, explicit evaluation, supplied feedback, hint/solution views and destruction.
- `packages/puzzles/evaluation.js`: `evaluatePuzzle`, `maximumMark` and shared per-part marking.
- `packages/puzzles/ui/`: reusable board interactions, Go and part/solution rendering.
- `packages/puzzles/styles/`: optional layout/theme with generic parent-mappable colour and sizing tokens; no current theme names.
- `js/puzzle-view.js`, `js/challenge-controls.js`, `js/go-controls.js`: packed-data/state adapters. `js/app.js` retains cards and activity workflow.
- `scripts/browser-puzzle-player.mjs`: package-only fixture; isolated Chrome port 9227.
- `scripts/browser-puzzle-integration.mjs`: production port 8765 with named-profile storage. Clears only the dedicated test browser's storage.

## Final evidence and limitations

Final npm test passed 167/167. Full validation passed 1,340 templates / 2,933 variations and all model answers. Package-only browser checks cover all nine types, state isolation/restore, locking, disposal, explicit marking, hints, Go status/replay, continuous path drag and live parent theme/sizing overrides. Production integration passed 14 representative puzzles through controls/save/reload/submit/reveal and 1280/640/320 CSS-pixel layouts. The saved eight-theme board comparison has no sampled differences. All 1,120 resolved puzzle records still match the pre-extraction snapshot; code identities need no update. Links and whitespace pass.

Older broad smoke/expansion browser scripts assume legacy unscoped storage and remain incompatible with named-profile checks. Temporary smoke-script edits were reverted. The new focused integration uses current storage. CSS zoom did not simulate media-query reflow correctly; final checks use effective viewport widths. No comprehensive accessibility or external-link availability claim is made.

Temporary evidence remains under `/private/tmp/puzzle-css-check/`, `/private/tmp/check-puzzle-css.mjs` and `/private/tmp/starters-puzzles-before.json`. Isolated Chrome uses profile `/private/tmp/puzzle-css-browser` on port 9227. Production preview was served on 8765; verify before reuse. Vite startup was inconclusive and was not used for verification.

## Exact next action

Review the accumulated library extraction and presentation changes before committing. No requested implementation remains outstanding. Preserve the unrelated student issue file; Git may show moved content as deletions plus untracked package files until staging detects renames.

For a future submodule move, transfer applicable maintenance tools/cached evidence and update the staged-source hook to materialise the staged gitlink commit. That move remains deferred. Account-specific SSH setup and repository relocation are also deferred; see docs/git-account-setup.md.
