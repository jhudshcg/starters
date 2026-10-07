# DSD starters

A static, self-marking starter page for year 1 Digital Software Development T-Level students. Core specification content is treated as version 1.1.

## Development records

- [Development log](DEV_LOG.md): chronological completed-work history, with original detailed records preserved.
- [Current checkpoint](checkpoint.md): current work plan, state, unresolved issues and exact next actions.
- [Feature ideas](feature_ideas.md): persistent original ideas and requests.
- [Planned work](docs/planned-work.md): outstanding implementation tasks.
- [Feature and requirement docs](docs/README.md): specialist reference material.

## Try it

Open [the local preview](http://127.0.0.1:5173) in VS Code’s integrated browser. If needed, start the server from this directory:

```sh
npm ci
npm run dev
```

Vite previews source files and updates CSS on save. `npm start` retains the production build/preview at port 8765. See [local development and removal instructions](docs/local-development.md) and [theme editing](docs/theming.md). Use these servers rather than opening HTML directly. Students need only a browser.

| Activity | Direct preview |
| --- | --- |
| Logic grid | [Four-person deduction](http://127.0.0.1:5173/#set=CAyD_x_4) |
| Cover every dot | [Choose a start and drag a route](http://127.0.0.1:5173/#set=BA5j_x_4) |
| Tangram | [Fit seven pieces into a silhouette](http://127.0.0.1:5173/#set=BA8D_x_4) |
| Sudoku | [Grid with pencil notes](http://127.0.0.1:5173/#set=BA3D_x_4) |
| CA1 exam practice | [Computational thinking](http://127.0.0.1:5173/#set=CoAAAQAQ) |
| CA2 exam practice | [Data types](http://127.0.0.1:5173/#set=CIGADQBw) |
| Function/procedure practice | [Build and repair code](http://127.0.0.1:5173/#set=CpKglgRQ) |
| New CA2 exam practice | [Loop state and stopping conditions](http://127.0.0.1:5173/#set=CpEkHQDx) |
| Python | [Iteration](http://127.0.0.1:5173/#set=BQAAAR_4) |

The Focus selector chooses other subtypes/topics. Copy controls share the exact questions and variations. Codes are case-sensitive Base64url. The current bank revision is **19**. New set codes use nine characters, plus an optional tenth timer character; legacy eight-character untimed codes remain readable and open a canonical current code. Older codes open current versions of their questions with a discreet update notice when needed. Removed questions offer an explicit replacement-set action. The original revision-1 demo bank remains unsupported, as previously agreed. Existing history is preserved; unsupported or historical unfinished work is never interpreted as different current questions.

## Current content

- **Puzzles:** 1,120 templates across nine subtypes; three puzzles per set. Every subtype has at least 25 templates at each challenge level. Individual codes open one. Some sets exceed the starter timer.
- **Core exam practice:** 121 multipart templates, each in two variations, across all 15 CA1–CA2 subsections. Three questions per set, 15–22 marks; short terms, values, constrained code and linked reasons.
- **Python:** 63 templates, five variations each; two challenges testing different aspects, 12 marks per set.
- **ESP practice:** 36 templates, five variations each, covering Task 1 planning/Excel formula practice and Task 2 testing/repair. Task 3–4 activities are designed but not implemented.

Teacher review and mixed-ability timing trials remain pending. The [generated coverage report](docs/coverage-ca1-ca2.md) distinguishes direct assessment, supporting practice and reviewed coverage. Every CA1–CA2 inventory element has a linked activity: 289 of 369 have at least two distinct direct questions, 52 have one and 28 broader practical skills have supporting practice only. None is yet teacher-approved complete.

See [planned work](docs/planned-work.md) for the current unfinished-feature backlog and superseded planning notes.

## Interaction

Logic/equation candidate cells cycle unknown → excluded → selected. Sudoku and arithmetic cages support a digit palette, keyboard entry and pencil notes. Tangrams use a piece tray, board placement, rotation, flipping and movement controls. Paths start anywhere: hold and drag to draw, or use clicks/keyboard; every dot must be visited exactly once and every blocked position avoided. Alternative valid paths and tilings are accepted.

Undo, Reset and hints are available during an attempt. Checking and solution reveal unlock after submitting the set (including timer expiry), and remain available for four hours across refreshes. Completed saved answers can be submitted again to unlock review without duplicating the progress record. A code-entry form is available on every page. Selected cells are yellow; correctness appears only after explicit checking or submission. The score appears beside Submit and at the top. Answers, notes and timing survive refresh. Timer expiry submits once. Puzzles are excluded from revision priorities.

Progress stays in browser-local storage. CSV export and JSON backup/restore are available. Named local profiles separate progress on a shared computer; these are not secure accounts. OneDrive integration and CSV import are not implemented. Python code answers are compared as constrained tokens, never executed. Text marking uses explicit accepted answers and, for opted-in concepts, one authored term with up to one linked qualifier. Unrestricted sentence understanding is not implemented.

## Maintaining content

`data/puzzles.js`, `data/exam.js`, `data/python.js` and `data/esp.js` are the public activity banks. Each puzzle subtype has its own module under `data/puzzles/`; exam content uses `data/exam-ca1.js`, `data/exam-ca2.js`, `data/exam-expanded.js`, the three `data/exam-depth-*.js` modules, `data/exam-priority.js` and `data/exam-comparisons.js`. The [expansion review](docs/exam-depth-review.md) records their source calibration and distinct angles. Shared controls and rule checks live in `js/challenge-controls.js` and `js/challenge-rules.js`.

`data/coverage/core-inventory.json` is the authoritative nested inventory. Each official CA focus has permanent local letter keys. Parts carry structured `{focus, elements}` links; the report displays `CA2.1.1[a,b]`. Counts are generated, not edited. Supporting practice does not establish full practical-skill coverage. See [spec-exam.md](docs/spec-exam.md) for counting and review rules.

Use [content authoring](docs/content-authoring.md) and the [refinement checklist](docs/content-refinement.md) for edits, including hints alone. `npm run hints:audit` rejects known placeholders and reports cross-question repetition for editorial review; it cannot judge usefulness. Validation checks model answers, identities and stale coverage. If Node is absent from PATH, use `/opt/homebrew/bin/node`.

`scripts/build-puzzles.py` reproducibly generates the six grid/geometry family files, checking uniqueness or a valid solution witness. It overwrites those generated files; edit generator inputs or keep additional authored templates in separate modules. Sequence and classic-maths banks are authored separately. `scripts/validate-puzzles.py` independently checks the served grid instances.

`scripts/browser-smoke.mjs` uses an isolated Chrome debugging session on port 9227 and the preview on 8765. It clears test-profile storage; do not point it at a student profile. VS Code’s browser is preferred for manual testing; this session could not automate it.

Browser checks are deliberately proportionate. Focused scripts such as `scripts/browser-comparisons.mjs`, `scripts/browser-esp.mjs` and `scripts/browser-puzzle-expansion.mjs` cover only the changed surface and are run directly when relevant; they are not bundled into a standard all-purpose script. Bank-only or minor visual changes do not require the full suite or whole-app smoke. Run `npm test` and the shared browser smoke when shared application behavior, storage, codecs, schemas, markers, selection or build tooling changes, or when a focused failure suggests wider risk. See the [refinement checklist](docs/content-refinement.md#proportionate-checks).

The [puzzle specification](docs/spec-puzzles.md) gives each subtype’s format, interaction, difficulty and marking requirements. [DEV_LOG.md](DEV_LOG.md) records completed decisions and source findings; [checkpoint.md](checkpoint.md) records the current handover. The live site is https://jhudshcg.github.io/starters/.

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

Readable `data/*.js` stays in Git; bundling replaces its imports with an on-demand loader. `live` excludes authoring banks, drafts, coverage reports, build metadata and source maps. Separate encoded assets are `banks/puzzles-<hash>.txt`, `banks/exam-<hash>.txt`, `banks/python-<hash>.txt` and `banks/esp-<hash>.txt`, addressed relative to the app bundle for repository Pages hosting. Only the selected/restored activity's bank downloads; progress also loads exam and programming banks to list missing areas and generate recommendations. Loaded display data is reused for the visit; failed downloads can be retried.

Parts retain separate encoded marking and reveal payloads. Marking decodes accepted answers as needed; explicit reveal decodes model answers/explanations. Neither decoded payload is cached on the bank or stored locally. Generic checking feedback does not decode explanations.

Go also has a separately encoded playing tree, decoded as needed for board rendering, opponent replies, hints and marking; those interactive features necessarily need the tree before submission. The rest of the bank does not need its model solutions for display.

This discourages casual source inspection, not determined runtime inspection. Readable source remains available to anyone who can access this repository, as requested. Build hashes do not change question-set codes. Current codes use the 54-bit, six-version-bit/three-bank-bit layout documented in [bank rollover and progress](docs/code-rollover.md); generation-zero revisions 0–18 retain their published legacy layout. Content revisions preserve codes for surviving question identities within a generation. The rotation applies only to bank payloads, never to share codes.

Checks: `npm test`, `npm run validate`, `npm run build`. Run `scripts/browser-smoke.mjs` against a server serving `live`; `STARTERS_PREVIEW_URL` can include a repository path. The smoke runner reads authoring fixtures locally, never via the production page.

## Maintaining shared codes

Follow the [refinement workflow](docs/content-refinement.md) and commit both generated compatibility files. Validation/build reject stale records. `codes:update` is unchanged for identical content; unused addresses extend the current revision, while changing/removing a variation creates a revision recording changes for notices and historical metadata.

History stores SHA-256 fingerprints and focus/marks metadata, not old answers. Fingerprints cover each variation's text, answers, hints, code and assessment metadata, excluding review/retirement status and sibling variations. All surviving identities keep their codes; fingerprints control only the update notice. Document/style/build-only edits consume no revision.

Never renumber/reuse slots or variation positions. Substantive task changes require a new question slot. Retirement removes a question from random selection while preserving codes. Corrections open under old codes with an update notice; removals offer an explicit replacement set. Historical results remain unchanged and importable. Old and current codes for the same question/variation identities share the four-hour tracking window. Saved attempts record their content revision: if their questions change, a fresh attempt avoids regrading stale answers. New scores record the revision actually marked.

The replacement for `BIAkAiAg`, `BoAkAiAg` and `CIAkAiAg` is **`CoAkAiAg`**. Hint changes affect compatibility. Packaging format and code layout are separate from content revision.

### Named profiles and revision recommendations

The first visit asks for a name; the first profile inherits existing unnamed progress. “Not you?” switches profiles, preserving each profile’s active activity, history and recommendations. Similar spellings require confirmation. JSON backups embed the username; a validated restore automatically switches to that profile and reports the switch. The header shows its last tracked date. Unnamed older backups restore into the selected profile. Export regularly to your student OneDrive.

Dated attempt records retain topic and part-level subtopic scores, including initial and final marks. Expand an activity’s topic/subtopic results in the history table. Earlier aggregate-only records remain visible but cannot supply subtopic evidence. Priorities use the latest five eligible independent first-response results for each area: below 45% red, 45–under 65% amber, and 65% or higher green. No evidence is grey; evidence older than 15 days has an icy pattern and reminder. Puzzles and assisted first responses are excluded.

Three recommended exam sets persist per profile until all are completed. Selection uses all history, independently of display filters: missing areas first, fresh scores from lowest to highest next, then stale areas. Sets respect the existing four-hour repeat rule. Completing the batch displays encouragement and generates the next three.

Weekly progress shows sets completed, average final percentage, practice days and minutes practised this week and last week, with an eight-week trend chart and equivalent table. Set percentages are calculated from earned/available marks before averaging equally and rounding the display. See the [progress specification](docs/spec-progress.md) for exact calculations, profile/restore rules, priority thresholds, recommendation ordering and current limitations.

Practice duration now estimates engagement: a lightweight interaction flag is consumed every five seconds to renew a two-minute inactivity expiry; recording pauses on expiry and when the activity is hidden, without pausing the visible countdown. Older elapsed-time records remain intact. Save backup downloads JSON content as `tlevel-practice-[username]-[YYYY-MM-DD-HHMMSS].json`; Restore backup accepts `.json` and JSON-formatted `.txt` files. Save backup and Restore backup are primary actions; CSV export is secondary, under Spreadsheet options.

Key-term search: enter a term in the shared code/search field or use **Find practice by key term**. Every entry point searches Puzzles, Programming, Core and ESP, including relevant programming CA tags. Results show matching topic counts and disclose any related questions needed for a complete set. Search matches authored curriculum/skill metadata and titles, not answers. The requested queue of three matching questions at a time, with a smaller final batch, is not yet implemented. [Search decisions, rationale and remaining work](docs/spec-common.md#key-term-search-6-october-2026).
