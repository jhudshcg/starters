# DSD starters

A static, self-marking starter page for year 1 Digital Software Development T-Level students. Core specification content is treated as version 1.1.

## Try it

Open [the local preview](http://127.0.0.1:8765) in VS Code’s integrated browser. If needed, start the server from this directory:

```sh
npm ci
npm start
```

The preview builds and serves `live`, the same artifact deployed to Pages. Rebuild after editing source files. Do not serve the repository root or open its authoring HTML directly; production bundles resolve the browser dependencies. Students need only a browser.

| Activity | Direct preview |
| --- | --- |
| Logic grid | [Four-person deduction](http://127.0.0.1:8765/#set=CAyD_x_4) |
| Cover every dot | [Choose a start and drag a route](http://127.0.0.1:8765/#set=BA5j_x_4) |
| Tangram | [Fit seven pieces into a silhouette](http://127.0.0.1:8765/#set=BA8D_x_4) |
| Sudoku | [Grid with pencil notes](http://127.0.0.1:8765/#set=BA3D_x_4) |
| CA1 exam practice | [Computational thinking](http://127.0.0.1:8765/#set=CoAAAQAQ) |
| CA2 exam practice | [Data types](http://127.0.0.1:8765/#set=CIGADQBw) |
| Function/procedure practice | [Build and repair code](http://127.0.0.1:8765/#set=CpKglgRQ) |
| New CA2 exam practice | [Loop state and stopping conditions](http://127.0.0.1:8765/#set=CpEkHQDx) |
| Python | [Iteration](http://127.0.0.1:8765/#set=BQAAAR_4) |

The Focus selector chooses other subtypes/topics. Copy controls share the exact questions and variations. Codes are case-sensitive Base64url. Revision 5 includes the revised hints and reading cautions. Older codes open unchanged variations; updated/removed variations receive a specific message. The original revision-1 demo bank remains unsupported, as previously agreed. Existing history is preserved; an unsupported unfinished activity is cleared rather than interpreted as different questions.

## Current content

- **Puzzles:** 450 templates across nine subtypes; three puzzles per set. Individual codes open one. Some sets exceed the starter timer.
- **Exam practice:** 112 multipart templates with 628 parts, each in two variations (1,256 part instances), across all 15 CA1–CA2 subsections. Three questions per set, 15–21 marks; short terms, values, constrained code and linked reasons.
- **Python:** 63 templates, five variations each; two challenges testing different aspects, 12 marks per set.

Teacher review and mixed-ability timing trials remain pending. The [generated coverage report](docs/coverage-ca1-ca2.md) distinguishes direct assessment, supporting practice and reviewed coverage. Every CA1–CA2 inventory element has a linked activity, with 285 of 369 having the required two distinct questions; 56 still have one and 28 broader practical skills have supporting practice only. This is not complete or approved Core coverage.

## Interaction

Logic/equation candidate cells cycle unknown → excluded → selected. Sudoku and arithmetic cages support a digit palette, keyboard entry and pencil notes. Tangrams use a piece tray, board placement, rotation, flipping and movement controls. Paths start anywhere: hold and drag to draw, or use clicks/keyboard; every dot must be visited exactly once and every blocked position avoided. Alternative valid paths and tilings are accepted.

Undo, Reset and hints are available during an attempt. Checking and solution reveal unlock after submitting the set (including timer expiry), and lock again when the set is reloaded or left. Completed saved answers can be submitted again to unlock review without duplicating the progress record. A code-entry form is available on every page. Selected cells are yellow; correctness appears only after explicit checking or submission. The score appears beside Submit and at the top. Answers, notes and timing survive refresh. Timer expiry submits once. Puzzles are excluded from revision priorities.

Progress stays in browser-local storage. CSV export and JSON backup/restore are available; accounts, OneDrive integration and CSV import are not implemented. Python code answers are compared as constrained tokens, never executed. Text marking uses explicit accepted answers; unrestricted sentence understanding is not implemented.

## Maintaining content

`data/puzzles.js`, `data/exam.js` and `data/python.js` are the public activity banks. Each puzzle subtype has its own module under `data/puzzles/`; exam content uses `data/exam-ca1.js`, `data/exam-ca2.js`, `data/exam-expanded.js` the three `data/exam-depth-*.js` modules and `data/exam-priority.js`. The [expansion review](docs/exam-depth-review.md) records their source calibration and distinct angles. Shared controls and rule checks live in `js/challenge-controls.js` and `js/challenge-rules.js`.

`data/coverage/core-inventory.json` is the authoritative nested inventory. Each official CA focus has permanent local letter keys. Parts carry structured `{focus, elements}` links; the report displays `CA2.1.1[a,b]`. Counts are generated, not edited. Supporting practice does not establish full practical-skill coverage. See [spec-exam.md](docs/spec-exam.md) for counting and review rules.

Use [content authoring](docs/content-authoring.md) and the [refinement checklist](docs/content-refinement.md) for edits, including hints alone. `npm run hints:audit` rejects known placeholders and reports cross-question repetition for editorial review; it cannot judge usefulness. Validation checks model answers, identities and stale coverage. If Node is absent from PATH, use `/opt/homebrew/bin/node`.

`scripts/build-puzzles.py` reproducibly generates the six grid/geometry family files, checking uniqueness or a valid solution witness. It overwrites those generated files; edit generator inputs or keep additional authored templates in separate modules. Sequence and classic-maths banks are authored separately. `scripts/validate-puzzles.py` independently checks the served grid instances.

`scripts/browser-smoke.mjs` uses an isolated Chrome debugging session on port 9227 and the preview on 8765. It clears test-profile storage; do not point it at a student profile. VS Code’s browser is preferred for manual testing; this session could not automate it.

The [puzzle specification](docs/spec-puzzles.md) gives each subtype’s format, interaction, difficulty and marking requirements. [checkpoint.md](checkpoint.md) records decisions, source findings and remaining work. The live site is https://jhudshcg.github.io/starters/.

## GitHub Pages

All application building happens locally. The workflow in `.github/workflows/pages.yml` uploads the committed `live/` folder and deploys it on pushes to `main` (or a manual run on `main`). GitHub does not install dependencies, run tests or rebuild the site. Keep **Settings → Pages → Source → GitHub Actions**.

Once per clone, install dependencies and enable the tracked hook:

```sh
npm ci
npm run hooks:install
```

Then edit, stage your source changes, commit and push. The pre-commit hook builds from an isolated copy of the **Git index**, so partially staged files and unrelated uncommitted edits cannot leak into the published site. On success it replaces and stages `live/`, including removal of old hashed assets. A failed build blocks the commit. Generated files should not be edited by hand. Node.js and installed dependencies are required when committing; after dependency changes run `npm ci` first. Hooks can be bypassed, so avoid `--no-verify` for publishing commits. Web-based commits do not run your local hook.

`npm run build` builds your working files into `live/` for local preview; `npm start` builds and serves it. Preview builds do not stage files. The hook rebuilds from the staged source at commit time. You do not need to run the build manually before each commit.

Run the [local refinement checks](docs/content-refinement.md) for content changes and `npm test` / `npm run validate` for application changes. The hook validates bank identities/content, including hint placeholders; it does not run the full suite.

The maths collection is **30 of 30 implemented** as concise adaptations with explicit rules and self-marking answers. [The source inventory](data/coverage/classic-maths-inventory.json) links every source item to its live bank slot.

Go uses 49 attributed GoProblems positions and the linked OGS example. Click to play; opponent stones and captures appear immediately. Undo, alternative recorded replies, next-move hints and draggable solution replay are available. A completed winning line shows immediate green feedback. Hints mark the attempt as assisted. Moves outside the supplied trees are unverified; the app is not a general Go engine. Ko and seki outcomes are identified in their prompts.

Go source board sizes and branches are preserved. `scripts/import-go.py` imports downloaded public API JSON using `sgfmill`; `data/coverage/go-source-inventory.json` records the selection. Install `scripts/requirements-content.txt` to run `python scripts/validate-go.py`. Run this locally to check all 1,528 recorded positions.

## Repeat attempts and progress

Leave **four hours between completing a set and starting its next tracked attempt**. Earlier practice shows a result and recency notice but changes no history, averages, charts or priorities. It resets the four-hour gap; waiting in an already-started attempt cannot make it eligible.

Identity uses slots and exact variations, ignoring order/timer; another permutation is a different set. JSON backups carry recent practice dates; older backups use tracked result dates. Existing history is retained.

## Production bank packaging

`npm run build` uses pinned **esbuild** and **fflate** dependencies. It validates the source bank, compresses JSON using zlib, wraps it in Base64 with a fixed 17-position alphabet rotation, and emits minified content-hashed JavaScript/CSS. All assets use relative paths for repository Pages hosting. Install local dependencies with `npm ci`.

Readable `data/*.js` stays in Git; bundling replaces its imports with an on-demand loader. `live` excludes authoring banks, drafts, coverage reports, build metadata and source maps. Separate encoded assets are `banks/puzzles-<hash>.txt`, `banks/exam-<hash>.txt` and `banks/python-<hash>.txt`, addressed relative to the app bundle for repository Pages hosting. Only the selected/restored activity's bank downloads; home/progress downloads none. Loaded display data is reused for the visit; failed downloads can be retried.

Parts retain separate encoded marking and reveal payloads. Marking decodes accepted answers as needed; explicit reveal decodes model answers/explanations. Neither decoded payload is cached on the bank or stored locally. Generic checking feedback does not decode explanations.

Go also has a separately encoded playing tree, decoded as needed for board rendering, opponent replies, hints and marking; those interactive features necessarily need the tree before submission. The rest of the bank does not need its model solutions for display.

This discourages casual source inspection, not determined runtime inspection. Readable source remains available to anyone who can access this repository, as requested. Build hashes do not change question-set codes. Slot numbering and the 48-bit encoding layout remain unchanged; content revisions selectively preserve unchanged historical variations. The rotation applies only to bank payloads, never to share codes.

Checks: `npm test`, `npm run validate`, `npm run build`. Run `scripts/browser-smoke.mjs` against a server serving `live`; `STARTERS_PREVIEW_URL` can include a repository path. The smoke runner reads authoring fixtures locally, never via the production page.

## Maintaining shared codes

Follow the [refinement workflow](docs/content-refinement.md) and commit both generated compatibility files. Validation/build reject stale records. `codes:update` is unchanged for identical content; unused addresses extend the current revision, while changing/removing a variation creates a revision preserving unchanged historical addresses.

History stores SHA-256 fingerprints and focus/marks metadata, not old answers. Fingerprints cover each variation's text, answers, hints, code and assessment metadata, excluding review/retirement status and sibling variations. Unchanged siblings keep their codes. Document/style/build-only edits consume no revision.

Never renumber/reuse slots or variation positions. Retirement removes a question from random selection while preserving codes; revisions/removals produce update messages. Historical results remain viewable/importable. Equivalent historical/current codes share the four-hour tracking identity; revised content forms a different set.

The replacement for `BIAkAiAg`, `BoAkAiAg` and `CIAkAiAg` is **`CoAkAiAg`**. Hint changes affect compatibility. Packaging format and code layout are separate from content revision.
