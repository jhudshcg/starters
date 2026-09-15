# DSD starters

A static, self-marking starter page for year 1 Digital Software Development T-Level students. Core specification content is treated as version 1.1.

## Try it

Open [the local preview](http://127.0.0.1:8765) in VS Code’s integrated browser. If needed, start the server from this directory:

```sh
npm ci
npm start
```

The preview builds and serves `_site`, the same artifact deployed to Pages. Rebuild after editing source files. Do not serve the repository root or open its authoring HTML directly; production bundles resolve the browser dependencies. Students need only a browser.

| Activity | Direct preview |
| --- | --- |
| Logic grid | [Four-person deduction](http://127.0.0.1:8765/#set=BAyD_x_4) |
| Cover every dot | [Choose a start and drag a route](http://127.0.0.1:8765/#set=BA5j_x_4) |
| Tangram | [Fit seven pieces into a silhouette](http://127.0.0.1:8765/#set=BA8D_x_4) |
| Sudoku | [Grid with pencil notes](http://127.0.0.1:8765/#set=BA3D_x_4) |
| CA1 exam practice | [Computational thinking](http://127.0.0.1:8765/#set=BoAAAQAQ) |
| CA2 exam practice | [Data types](http://127.0.0.1:8765/#set=BoGADQBw) |
| Python | [Iteration](http://127.0.0.1:8765/#set=BQAAAR_4) |

The Focus selector chooses other subtypes/topics. Copy controls share the exact questions and variations. Codes are case-sensitive Base64url. Revision 3 contains the reviewed exam questions. Revision-2 codes still open unchanged variations; codes containing updated/removed variations receive a specific message. The original revision-1 demo bank remains unsupported, as previously agreed. Existing history is preserved; an unsupported unfinished activity is cleared rather than interpreted as different questions.

## Current content

- **Puzzles:** 115 templates across nine subtypes: 35 original grid, shape and sequence puzzles with five variations each, all 30 classic maths problems, and 50 fixed Go problems. Normal selection produces three puzzles; individual question codes still open one. Some sets can take longer than the starter timer.
- **Exam practice:** 51 multipart questions, two variations each, across all 15 CA1–CA2 subsections. Three questions per activity, currently 15–16 marks. Short terms, values, constrained code answers and selected linked reasons. The September review improves 52 parts in both variations, plus wording and accepted answers elsewhere.
- **Python:** 12 templates with five variations each, covering iteration, selection, functions, searching and sorting. Two challenges, 12 marks per activity.

These are working practice materials pending teacher review and student timing trials. They are not a complete or approved Core question bank. The [generated coverage report](docs/coverage-ca1-ca2.md) exposes every subelement, including gaps: 231 of 369 currently have a live question with two applicable variations; only 8 have two distinct live questions. None is marked teacher-approved. Fourteen further elements have supporting practice only and 124 remain uncovered. Coverage counts fell where this review removed overstated links; that is a more accurate account of the remaining work.

## Interaction

Logic/equation candidate cells cycle unknown → excluded → selected. Sudoku and arithmetic cages support a digit palette, keyboard entry and pencil notes. Tangrams use a piece tray, board placement, rotation, flipping and movement controls. Paths start anywhere: hold and drag to draw, or use clicks/keyboard; every dot must be visited exactly once and every blocked position avoided. Alternative valid paths and tilings are accepted.

Undo, Reset and hints are available during an attempt. Checking and solution reveal unlock after submitting the set (including timer expiry), and lock again when the set is reloaded or left. Completed saved answers can be submitted again to unlock review without duplicating the progress record. A code-entry form is available on every page. Selected cells are yellow; correctness appears only after explicit checking or submission. The score appears beside Submit and at the top. Answers, notes and timing survive refresh. Timer expiry submits once. Puzzles are excluded from revision priorities.

Progress stays in browser-local storage. CSV export and JSON backup/restore are available; accounts, OneDrive integration and CSV import are not implemented. Python code answers are compared as constrained tokens, never executed. Text marking uses explicit accepted answers; unrestricted sentence understanding is not implemented.

## Maintaining content

`data/puzzles.js`, `data/exam.js` and `data/python.js` are the public activity banks. Each puzzle subtype has its own module under `data/puzzles/`; exam content is split into `data/exam-ca1.js` and `data/exam-ca2.js`. Shared controls and rule checks live in `js/challenge-controls.js` and `js/challenge-rules.js`.

`data/coverage/core-inventory.json` is the authoritative nested inventory. Each official CA focus has permanent local letter keys. Parts carry structured `{focus, elements}` links; the report displays `CA2.1.1[a,b]`. Counts are generated, not edited. Supporting practice does not establish full practical-skill coverage. See [spec-exam.md](docs/spec-exam.md) for counting and review rules.

```sh
npm test
npm run coverage
npm run validate
```

`npm run validate` checks model answers and rejects a stale coverage report. On this workstation use `/opt/homebrew/bin/node` if Node is absent from PATH.

`scripts/build-puzzles.py` reproducibly generates the six grid/geometry family files, checking uniqueness or a valid solution witness. It overwrites those generated files; edit generator inputs or keep additional authored templates in separate modules. Sequence and classic-maths banks are authored separately. `scripts/validate-puzzles.py` independently checks the served grid instances.

`scripts/browser-smoke.mjs` uses an isolated Chrome debugging session on port 9227 and the preview on 8765. It clears test-profile storage; do not point it at a student profile. VS Code’s browser is preferred for manual testing; this session could not automate it.

The [puzzle specification](docs/spec-puzzles.md) gives each subtype’s format, interaction, difficulty and marking requirements. [checkpoint.md](checkpoint.md) records decisions, source findings and remaining work. The live site is https://jhudshcg.github.io/starters/.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` tests the application, validates coverage and independently checks puzzle solutions before deployment. Pull requests run these checks; pushes to `main` and manual runs on `main` also publish the site.

1. Connect this checkout to the intended GitHub repository and push the project, including the workflow and all question bank files, to `main`.
2. In the repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Run **Actions → Validate and deploy Pages → Run workflow** if the first push happened before Pages was enabled. The deployment job reports the public URL.

This uses the [official GitHub Pages workflow actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). No personal access token or custom deployment secret is required by the workflow. Deployment is verified at https://jhudshcg.github.io/starters/; pushes to `main` deploy automatically after validation.

`npm run build` creates `_site` with HTML, CSS and JavaScript, including the live banks. Specifications, source examples, drafts and coverage inventories are excluded from the Pages artifact. Preview that exact artifact with `python3 -m http.server 8766 --bind 127.0.0.1 --directory _site`.

The maths collection is **30 of 30 implemented** as concise adaptations with explicit rules and self-marking answers. [The source inventory](data/coverage/classic-maths-inventory.json) links every source item to its live bank slot.

Go uses 49 attributed GoProblems positions and the linked OGS example. Click to play; opponent stones and captures appear immediately. Undo, alternative recorded replies, next-move hints and draggable solution replay are available. A completed winning line shows immediate green feedback. Hints mark the attempt as assisted. Moves outside the supplied trees are unverified; the app is not a general Go engine. Ko and seki outcomes are identified in their prompts.

Go source board sizes and branches are preserved. `scripts/import-go.py` imports downloaded public API JSON using `sgfmill`; `data/coverage/go-source-inventory.json` records the selection. Install `scripts/requirements-content.txt` to run `python scripts/validate-go.py`. GitHub Actions does this automatically and checks all 1,528 recorded positions.

## Repeat attempts and progress

Leave at least **four hours from completing a set to starting the next tracked attempt** at it. Earlier practice remains available and displays a result, but does not add a progress row or change averages, charts or revision priorities. A notice states how recently the set was attempted. Early practice also resets the four-hour gap; waiting with an already-started attempt open does not make it eligible.

The identity includes the question slots and exact variations, ignoring order and the optional timer. A different permutation is a different set. Recent practice dates travel in JSON backups; old backups without them still use their tracked result dates. Existing recorded history is not retroactively removed.

## Production bank packaging

`npm run build` uses pinned **esbuild** and **fflate** dependencies. It validates the source bank, compresses JSON using zlib, wraps it in Base64 with a fixed 17-position alphabet rotation, and emits minified content-hashed JavaScript/CSS. All assets use relative paths for repository Pages hosting. CI installs dependencies with `npm ci`.

Readable `data/*.js` authoring banks stay in Git. They are replaced during bundling and are **not shipped or imported by the deployed page**. Drafts, coverage reports, build metadata and source maps are excluded from `_site`. The browser decodes display data at startup; each part retains separate encoded marking and reveal payloads. Marking decodes accepted answers only when needed; reveal decodes the model answer/explanation only when requested. These temporary decoded objects are not cached on the bank or saved to local storage. Checking uses separate generic feedback so it does not need to decode the explanation.

Go also has a separately encoded playing tree, decoded as needed for board rendering, opponent replies, hints and marking; those interactive features necessarily need the tree before submission. The rest of the bank does not need its model solutions for display.

This discourages casual source inspection, not determined runtime inspection. Readable source remains available to anyone who can access this repository, as requested. Build hashes do not change question-set codes. Slot numbering and the 48-bit encoding layout remain unchanged; content revision 3 selectively preserves compatible revision-2 codes. The rotation applies only to bank payloads, never to share codes.

Checks: `npm test`, `npm run validate`, `npm run build`. Run `scripts/browser-smoke.mjs` against a server serving `_site`; `STARTERS_PREVIEW_URL` can include a repository path. The smoke runner reads authoring fixtures locally, never via the production page.

## Maintaining shared codes

After completing question edits, run `npm run codes:update`, then `npm run validate` and `npm test`. Commit both `data/code-history.json` and the generated `js/code-compatibility.js`. Validation and build fail if those records do not match the authored banks. The update command makes no changes when content is unchanged; additions at unused addresses extend the current revision. Changing/removing an existing variation creates the next content revision and preserves every unchanged historical address.

The history stores SHA-256 fingerprints plus focus/marks metadata, not old answer banks. Fingerprints include the selected variation's text, answers, hints, code and assessment metadata. They exclude authoring review/retirement status and other variations of the same template. This allows an unchanged variation to retain its old code even if its sibling changes. Document/style/build-only edits do not consume a revision.

Never renumber/reuse slots or variation positions for unrelated content. Retire a retained question to remove it from random selection while keeping its old codes available. Removing or revising it causes codes containing it to show an update message. Existing result records remain viewable/importable even when their question codes can no longer open. Equivalent old/current codes share the same four-hour tracking identity; a revised question is a different set.

The reviewed replacement for `BIAkAiAg` is **`BoAkAiAg`**. Of the original 417 revision-2 variations, 344 remain compatible and 73 were altered in this review. Bank packaging format and code layout are separate from this content revision.
