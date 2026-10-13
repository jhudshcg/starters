# Go improvements adopted from GCSE Maths — 13 October 2026

Reviewed `/Users/joehudson/Dev/Maths/practice-gcse-maths/DEV_LOG.md` entries from 11–13 October and its `docs/puzzles_patches.md`. Maths originally vendored this package from commit `69560b227aaedefe72457241a53205ee93b7e024`. Reconciled its portable changes into this repository; no puzzle data, source ranks, question slots or marking identities changed.

## Adopted behaviour and reasons

- Drag a held stone to aim at another intersection; release commits once. Leaving the board, cancellation, focus loss and a second finger cancel previews. Coordinate hit testing uses the SVG transformation so expanded grids stay aligned. Keyboard press/release remains supported. Occupied taps are quiet.
- Share Go geometry between puzzles and the human practice board. Human boards have aligned coordinates on all four sides and allow native pinch zoom; puzzle boards keep their drawing gestures. The existing T-Level plain turn notice and below-board hints are preserved.
- Candidate tables retain useful column widths and explicit variable/person axes; digit boards fit their container. These portable changes accompanied the shared board extraction and replace Maths-only sizing workarounds.
- `#go` offers 5/9/13/19 boards, immediate size changes, reset, komi (default 6.5), Count/Pass/Undo/Redo, dead-group marking and resume. It shares capture/suicide rules and adds positional superko. Returning to a puzzle retains its existing saved answers. Practice games are transient and do not enter progress or backups.
- Optional clocks default to five minutes plus three 30-second Japanese byo-yomi periods. Background elapsed time counts; legal moves reset the surviving period. Counting and history review pause clocks. Starting closes Timing options; pausing does not reopen it.
- Count loads GNU Go 3.8 in a worker on demand. Estimates have ownership squares, cancellation, stale-result protection, errors and retry. Manual area counting remains available. The original distance heuristic was rejected in Maths because proximity alone did not read groups or territory; it is not imported. Predictions do not override agreed dead groups or establish final scores. No computer opponent is supplied.

The package owns rules, pointer handling, drawing and the engine client. `js/go-practice.js` owns the route's controls/lifecycle; the host serves the worker and engine. This keeps the existing package boundary without importing Svelte or changing the site framework.

## Engine provenance and distribution

Reused Maths's existing compiled engine, complete source archive, build script and licences, with no new download. [Third-party notices](../THIRD_PARTY_NOTICES.md) links all assets. The production builder copies `engines/` and the notice into `live/`; the worker URL resolves relative to the document for GitHub Pages project paths. Ordinary visits do not fetch the engine.

Original GNU source archive SHA-256: `da68d7a65f44dcf6ce6e4e630b6f6dd9897249d34425920bfdd4e07ff1866a72`. WASM SHA-256: `1d514701c21adfdefcdcb0faae255e3a9a328d0a2d341925c96cc39630080d36`. Emscripten 4.0.22 build details are retained in `engines/gnugo/build.sh`.

## Verification

Portable tests cover rules, clock boundaries, coordinate alignment, actual compiled-engine results, lazy workers and cancellation. `scripts/browser-onedrive-go.mjs` exercises the host with an isolated Chrome profile. Existing puzzle integration covers scoring, restore, reveal and responsive layouts. Browser touch emulation is not physical-device pinch testing. Consult the current checkpoint/development log for run results.
