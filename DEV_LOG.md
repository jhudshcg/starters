# Development log

Entries run from oldest to newest. Each summary explains what changed, why it changed, which files were involved, and what the checks established. New completed work is added at the end, following the [documentation guidance](docs/CODE_STYLE.md#documentation).

Use [checkpoint.md](checkpoint.md) for the current work plan and next actions. The [feature ideas](feature_ideas.md) file keeps the teacher's original requests, while [planned work](docs/planned-work.md) lists implementation tasks. The [documentation index](docs/README.md) links feature requirements, and [README](README.md) explains general development and repository use.

The detailed checkpoint history was moved here on 7 October 2026. The expandable sections preserve those original records unchanged, including unfinished plans, later corrections and verification limits. Some work continued after the date of its initial plan; its completion notes remain with that plan. Statements such as “current” or “uncommitted” inside those records describe the situation at the time. They are not today's handover. Older summaries were written retrospectively from those records and Git history; this documentation work did not rerun their tests or establish new deployment dates.

Four archived links refer to files that no longer exist: `js/puzzle-rules.js`, `js/puzzle-controls.js`, `data/puzzle-expansion.js` and `data/spatial-challenges.js`. Their names have been preserved as historical evidence. For the current implementation, start with [challenge rules](js/challenge-rules.js), [challenge controls](js/challenge-controls.js) and the [puzzle bank](data/puzzles.js). These are current entry points, not claims that each replaced one particular old file.

## Date index

[2026-09-13](#2026-09-13) · [2026-09-14](#2026-09-14) · [2026-09-15](#2026-09-15) · [2026-09-20](#2026-09-20) · [2026-09-21](#2026-09-21) · [2026-09-22](#2026-09-22) · [2026-09-23](#2026-09-23) · [2026-09-24](#2026-09-24) · [2026-09-25](#2026-09-25) · [2026-09-26](#2026-09-26) · [2026-09-27](#2026-09-27) · [2026-09-28](#2026-09-28) · [2026-09-29](#2026-09-29) · [2026-09-30](#2026-09-30) · [2026-10-05](#2026-10-05) · [2026-10-06](#2026-10-06) · [2026-10-07](#2026-10-07)

## Undated publication record

The source heading did not supply a date. It appeared between the 14 and 15 September records; that placement is not treated as proof of the deployment date.

<details>
<summary>Original record: GitHub Pages is live</summary>

# GitHub Pages is live

- Published at https://jhudshcg.github.io/starters/ from `jhudshcg/starters`, branch `main`.
- Enabled Pages with `build_type: workflow`. The existing build passed; rerunning the failed deployment succeeded (run 34796389719, attempt 2).
- Verified public HTTP 200 and the Joe Hudson footer credit. Future pushes to `main` run validation and deploy automatically.

</details>

## 2026-09-13

### Initial application and puzzle difficulty

The first application could display activities, mark answers and save progress. However, the teacher found that the puzzles did not require enough reasoning to occupy students for the intended 5–15 minutes. The application working correctly was therefore not evidence that the questions were suitable.

**Files changed.** The work involved `index.html`, application files in `js/`, styles in `css/`, the initial question banks, tests and specifications.

**Decisions and challenges.** Question and question-set codes needed to keep identifying the same activities as the site developed. Puzzle redesign also needed clearer examples of the intended difficulty. The plan was to test a few substantially better puzzles before generating large numbers of variations.

**Checks and remaining work.** The original record below contains the initial checks and known limitations. Puzzle difficulty, classroom timing and complete curriculum coverage remained unresolved at this point.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-13</summary>

# Session checkpoint · 13 September 2026

## Read this first: puzzle difficulty is still inadequate

Latest teacher feedback:

> “those spatial challenges are barely any more challenging. I suppose I'll need to find some examples for you. and in general the challenges for all puzzles needs to be raised, so T-Level students can be kept busy thinking for 5-15 minutes.”

This applies to **all puzzle families**, not only spatial reasoning. The recent multi-step spatial replacements did not meet the intended difficulty. Do not interpret earlier positive feedback on the app as approval of puzzle difficulty. The interface is testable; the educational challenge still needs substantial work.

- Target: year 1 Digital Software Development T-Level students, generally 16–18, mixed experience. A starter set should sustain meaningful thinking for 5–15 minutes.
- Current duration labels are estimates, not validated student completion times. Passing automated checks establishes functional correctness, not age-appropriate challenge or engagement.
- Adding a few transformations or more clicks did not solve the difficulty problem. Future tasks need stronger reasoning demands, such as linked deductions, planning, interacting constraints or evaluation of alternatives. These are design directions, not agreed example puzzles.
- The teacher may bring examples to establish the intended level. No examples have been supplied yet. Use them to calibrate puzzle structure, difficulty and timing before producing another large bank of similarly simple tasks.
- Latest request is to save this checkpoint for the next session. No further puzzle redesign was requested for the remainder of this session.

## Recommended next-session starting point

1. Read this checkpoint, [AGENTS.md](AGENTS.md), and any new teacher examples or instructions.
2. Identify what makes the examples demanding: deductions needed, constraints that interact, planning depth, plausible wrong approaches and expected solving time.
3. Develop a small number of representative puzzles at the intended level and make them testable for teacher review before generating many variations. If examples are still unavailable, acknowledge that difficulty calibration remains unresolved rather than claiming the existing puzzles now meet the target.
4. Preserve the interface improvements below. Increase intellectual difficulty without adding confusing controls, unnecessary reading or repetitive clicking.
5. Validate solvability, solution uniqueness where required, acceptance of alternative valid answers and marking; then use student/teacher trials to assess the 5–15-minute target.

## Current working application

Static SPA, no installation/build step required for browser use. Local preview:

`http://127.0.0.1:8765`

If it is not running, start from the project root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

The server was running at the end of development; do not assume that process survives into the next session. Use HTTP rather than opening index.html directly because the app uses ES modules. No public deployment has been performed; GitHub Pages is the intended hosting platform.

**Browser preference:** use VS Code's integrated browser where possible. This session had no tool to automate it, so automated checks used an isolated headless Chrome session. Do not repeatedly ask the teacher to approve routine actions already authorised; follow any actual sandbox approval requirements.

Implemented:

- Puzzles, exam practice and constrained Python challenges, with type/focus selection and exact code entry.
- Marking, hints, model answers, retries and submission.
- Three selection actions: new set with another focus; different question combination within the focus; same questions with new variations.
- Optional 5–15-minute timer, hidden elapsed time, answer persistence, deadline recovery after refresh and single submission on expiry.
- Local progress, type/focus/date filters, history, score chart/table, revision priorities, CSV export and JSON backup/restore with duplicate detection.
- Click/keyboard controls for job ordering, device assignments, switches, drawing shapes, building paths and selecting spatial coordinates.

Current content: **27 active templates / 135 active variations**, five variations per template. Including retired spatial questions: **30 stored templates / 150 variations**.

| Type | Active focuses | Set size / marks |
| --- | --- | --- |
| Puzzles | Number grids, spatial reasoning, logic, shapes, paths | Two questions; six or eight points |
| Exam practice | CA2.4 operators, CA2.8 validation | Three questions; 15 marks |
| Programming | Iteration, selection | Two questions; 12 marks |

The puzzle bank remains too easy according to the latest teacher review.

## Interface decisions to retain

- Show hint stays directly visible.
- To its right, a collapsed native details/summary container labelled **Check / show answer** holds Check answer and Show answer. When opened, it displays this exact reminder:

  “try to answer all questions first and submit your best try before checking correct answers”

- Disclosure state persists while interacting. Submission remains available without opening the answer controls.
- Submitted results appear **beside Submit as well as at the top**. Manual submission focuses the nearby result so students do not need to scroll to the top.
- The brand subtitle is two lines: **Digital Software Development**, then **T-Level**.
- Spatial questions use a **single clickable puzzle grid** showing the given marker. The second “new position” radio-selector grid was removed, including for old spatial codes.
- **Warm yellow means selected, not correct.** Puzzle selections use `#FFE6A0` with `#9B7122` borders. Reference shapes are purple; marked-correct feedback may be green. Retain text, symbols and pressed states rather than relying only on colour.
- New puzzle controls support click and keyboard. Shape cells toggle; paths support backtracking, Undo and Reset. Dragging is not required.
- Path marking accepts any route satisfying the constraints, not just the stored model path.

## Settled technical and curriculum decisions

- The teacher confirmed the curriculum **content is version 1.1**; older version references inside `../agents/spec.md` are stale. Preserve the source file and use 1.1 as the baseline. SAM files are in `../agents/SAM/`.
- Set codes use **Base64url**, case-sensitive alphabet `A–Z a–z 0–9 - _`. Eight characters encode 48 bits with no padding:

  `[version:7][type:2][question1:10][variation1:3][question2:10][variation2:3][question3:10][variation3:3]`

- An optional ninth character gives the timer duration: `5`–`9`, `A`–`F` for 5–15 minutes.
- Types: 0=puzzles, 1=exam, 2=programming; 3 reserved. Question slot 1023 denotes an unused trailing position, with variation zero. Active slots are 0–1022. Eight possible variations per slot; the bank currently uses five.
- Codes decode directly; no exhaustive set-code catalogue, question-text hash or shared seed is needed. Preserve case; reject standard Base64 `+` and `/`, invalid fields and invalid compositions.
- Slots are stable IDs, not array positions. Preserve existing code meanings; use new slots or a new retained bank version for different tasks. Curriculum version 1.1 and encoded question-bank version 1 are distinct.
- Original spatial slots 3–5 are marked `retired` and excluded from random selection. Old codes still resolve. New spatial slots 15–17 contain the attempted replacements, which the teacher also considers insufficiently challenging.
- Some AGENTS.md paragraphs still describe superseded six-character/hash/ASCII ideas. The explicit conversation decisions and the implemented Base64url specification supersede those passages. Do not revert to them.

## Useful files

| File | Purpose |
| --- | --- |
| [README.md](README.md) | Running the pilot, known codes, test checklist and limits |
| [docs/README.md](docs/README.md) | Index of drafted specifications, style guide and implementation plan |
| [index.html](index.html) | Page shell and subtitle |
| [js/app.js](js/app.js) | Navigation, question rendering, answer disclosure, attempts, timer and progress UI |
| [js/codes.js](js/codes.js) | 48-bit codec and individual question codes |
| [js/bank.js](js/bank.js) | Bank loading, set selection and content validation |
| [js/marking.js](js/marking.js) | Shared marking, delegating interactive puzzles to their rules |
| [js/puzzle-rules.js](js/puzzle-rules.js) | Order, switch, matching, shape and path validation |
| [js/puzzle-controls.js](js/puzzle-controls.js) | Clickable and keyboard puzzle controls |
| [js/progress.js](js/progress.js) | Storage, deadline helpers, history, revision priorities and CSV export |
| [data/puzzles.js](data/puzzles.js) | Original puzzles plus imported expansion and retirement flags |
| [data/puzzle-expansion.js](data/puzzle-expansion.js) | Logic, shape and path templates, slots 6–14 |
| [data/spatial-challenges.js](data/spatial-challenges.js) | Latest spatial templates, slots 15–17 |
| [data/exam.js](data/exam.js), [data/python.js](data/python.js) | Other question banks |
| [css/puzzles.css](css/puzzles.css) | New controls, yellow selection, disclosure and nearby result styles |
| [css/styles.css](css/styles.css), [css/tokens.css](css/tokens.css) | Shared layout and palette |

## Reference codes

| Focus | Code |
| --- | --- |
| Number grids | `AgAAAR_4` |
| Exam operators | `AoAAAQAQ` |
| Python iteration | `AwAAAR_4` |
| Logic | `AgDABx_4` |
| Shapes | `AgEgCx_4` |
| Paths | `AgGADh_4` |
| Latest spatial tasks (still too easy) | `AgHgER_4` |

Open with `http://127.0.0.1:8765/#set=<code>`. Individual question example: `PY-1-0-0`.

## Verification at last implementation checkpoint

**22 automated tests passed**, and all 150 stored variation model answers passed bank validation. Tests cover codec boundaries and compatibility, marking, selection, deadlines, puzzle arithmetic, unique logic solutions, independent shape/spatial/robot reference calculations and alternative valid paths.

```sh
/opt/homebrew/bin/node --test tests/*.test.js
/opt/homebrew/bin/node scripts/validate.js
```

Node was available at `/opt/homebrew/bin/node` but absent from the default shell PATH. Python 3 is used for reference-code checks.

Browser smoke checks also passed: three activity types, scoring, history, refresh, timer expiry/deduplication, answer disclosure, nearby submission results, direct spatial selection, logic interactions, shape painting, keyboard arrows/Space, yellow selection colour, saved puzzle answers, alternative paths and 320px reflow.

`scripts/browser-smoke.mjs` expects the preview on port 8765 and an isolated Chrome debug endpoint on 9227. It **clears app storage in the test profile**; do not use a real student/user browser profile. Previous isolated profile: `/private/tmp/dsd-starters-pilot-browser`. Screenshots were saved as `/private/tmp/starters-*.png`; these temporary files/processes may not survive. This is not a full accessibility audit or cross-browser certification.

No tests were rerun merely to save this documentation checkpoint.

## Other outstanding work and limits

- Full curriculum coverage inventory and reviewed question bank are not built. Topic coverage is distinct from demonstrating every specified skill.
- Free-form Python execution, extended text marking and CSV import are not implemented. JSON backup/restore is the current history-transfer mechanism.
- Revision evidence is recorded at question level, not part level. Assisted first responses and puzzles are excluded from revision priorities. Final scores may include retries within the activity.
- Progress is browser-local; no accounts or OneDrive integration. One active activity per browser profile. Abandoned drafts are not retained as completed history.
- Classroom timing and difficulty calibration are unresolved. **Raising puzzle difficulty is the next content priority; do not treat it as completed because the interface and automated tests work.**

</details>

## 2026-09-14

### Curriculum coverage, puzzle expansion and publication preparation

The coverage records were changed to track the individual requirements within each specification reference. This made it possible to distinguish a question that directly assesses a skill from one that merely gives supporting practice. The maths and Go collections were expanded, and the site was prepared for GitHub Pages.

**Files changed.** The work updated question banks, the coverage inventory and generated report, Go and maths import tools, puzzle controls, specifications and publishing configuration.

**Decisions and challenges.** Each assessable requirement received a permanent identifier so that reordering the inventory would not change its meaning. Puzzle answers needed independent checks rather than relying only on the application's own marking.

**Checks and remaining work.** Solver checks, browser checks and publication preparation are recorded below. The separate publication note has no recorded date, so this entry does not assign a deployment date.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-14</summary>

# Current checkpoint — 14 September 2026

This section supersedes the earlier session snapshots below.

## Deployment and maths collection follow-up

- Corrected scope: all 30 Mr Barton Maths problems are requested, exempt from the five-per-type limit. All prompts were read, but only five are integrated; the remaining 25 are unfinished work. `data/coverage/classic-maths-inventory.json` tracks every source ID, live bank slots and known authoring issues. Do not describe this collection as completed.
- `.github/workflows/pages.yml` validates and packages the site on pull requests and deploys successful `main` builds through GitHub Pages. `npm run build` creates `_site` from browser assets only.
- No GitHub remote was configured at setup time. Repository URL and the repository’s Pages source setting are still needed before public deployment can be verified.

## Ready for local testing

- Preview: http://127.0.0.1:8765. Prefer VS Code’s integrated browser. An isolated Chrome profile was used for automated tests because no VS Code browser tool was available.
- 97 templates / 312 variations across the app: **40 puzzles**, **51 exam questions**, **6 Python questions**.
- Puzzles: eight subtypes with five distinct puzzles each — logic grids, logic equations, tangrams, cover-every-dot paths, Sudoku, arithmetic cages, sequences and classic maths. Original templates have five variations; the five classic problems are fixed. Each subtype has its own file in `data/puzzles/`, imported by `data/puzzles.js`. One substantial puzzle per activity, with a provisional 5–15-minute duration.
- Exam: every CA1–CA2 subsection is selectable, with three multipart questions per activity (currently 15–16 marks). `data/exam.js` imports CA1 and CA2 files. Term aliases and simple sentence wrappers are supported; code fragments are compared by tokens, preserving case and string contents, without execution.
- Coverage: `data/coverage/core-inventory.json` contains 106 official focuses / **369 subelements**, with permanent letters. Parts link to `{focus, elements}`; display notation is `CA2.1.1[a,b]`. Generated report: **239 elements with a qualifying live question**, **10 with two live questions**, **10 supporting-practice-only**, **120 uncovered**, **0 teacher-approved complete**. Do not present topic-level or live counts as full reviewed coverage. Run `npm run coverage` after edits; validation rejects stale reports.
- Bank revision **2** replaces the demo bank at the user’s request. Old demo codes are rejected rather than mapped to different content. History is retained; unsupported unfinished activities are cleared. The eight-character Base64url format is unchanged.

## Latest puzzle interaction decisions

- Paths have **no fixed start or endpoint**. Choose any open dot. Press and drag while held; snap through adjacent tracks, release to stop, and press the endpoint to resume. Backtracking removes the later route. Click and keyboard alternatives remain. All open dots must be visited exactly once; no blocked dots, jumps or diagonals. Accept any valid route, including reversed solutions. Every obstacle layout has a checked complete witness route.
- Logic and equation grids cycle unknown → × excluded → ✓ selected. Persist candidate notes and Undo history. Yellow means selected, not correct.
- Sudoku and arithmetic cages use directly selected cells, digit buttons, keyboard input and pencil notes. Givens are immutable; large boards scroll within their region at high zoom.
- Tangrams use seven geometric pieces with click placement, half-unit movement, ±45° rotation and parallelogram flipping. Check geometric coverage and overlap, accepting alternative tilings. The 25 supplied silhouettes are distinct even after rotation/reflection. Piece dragging is not implemented; all placement operations work by click/keyboard.
- Keep Show hint visible and checking/reveal in the existing disclosure. Solutions remain hidden until requested. Results appear beside Submit and at the top.
- Each subtype now has its own format, approach, presentation and marking section in `docs/spec-puzzles.md`.

## Source review and boundaries

- Inspected all nine images in `example_puzzles`, including the easy and harder logic grids, equations, tangram, dot path and Sudoku. The under-one-minute basic example is onboarding, not the difficulty benchmark.
- Read all 30 prompts embedded in the linked Mr Barton Maths HTML. The page has self-reported completion, no answer key or automatic marking. Found ambiguous/mistaken wording, including reversed information assignments in the birthday puzzle. The five imported classic ideas use concise adapted wording, source links and independently checked explanations, rather than copying the entire collection.
- Sampled the linked Mathschallenge PDF; did not claim to review all 127 pages. Questions and solutions share pages and must be separated if used.
- Go remains the optional separate extension. GoProblems/OGS links exposed app shells through the reader; positions and ranks were not verified. No Go puzzles are claimed implemented.

## Verification completed

- **28 automated tests passed**, covering codes, set selection, marking/negation/code tokens, coverage counting and variation requirements, puzzle constraints, alternative paths/tilings, and independently calculated classic answers.
- Bank validation passed for all 97 templates / 312 variations. Generated coverage files are current.
- `python3 scripts/validate-puzzles.py` independently checked all **150 served grid/geometry variations**, including unique logic/equation solutions, Sudoku uniqueness and deduction traces, cage uniqueness, feasible routes and exact lattice tangram coverage.
- Browser smoke passed: exam input/scoring and subelement references; candidate states and Undo; Sudoku notes and reload; real continuous mouse dragging from an arbitrary path start; tangram click placement/rotation and reveal; all eight subtypes; timer recovery; 320px reflow. Screenshots: `/private/tmp/starters-*.png`.

## Next priorities

1. Teacher review the new puzzle difficulty and run mixed-ability timing trials; solver checks do not establish challenge level. Sequences and some equation boards may particularly need calibration.
2. Review the subelement inventory and direct-assessment mappings, then fill the generated coverage gaps. Add a second distinct question and two applicable variations per element; do not bulk-mark current content approved.
3. Further improve short-description marking and misconception feedback. Current text rules are deliberately bounded; unrestricted semantic marking is not implemented.
4. Optional later work: Go, tangram dragging, more advanced Sudoku techniques, richer linked explanations, CSV import and broader Python challenges. No public deployment performed.

---

# Publish checkpoint — 14 September 2026

This section supersedes the historical snapshots below.

- Ready for the user to publish to GitHub. Pages Actions workflow validates and packages browser assets, then deploys successful `main` builds. No remote is configured locally; the user is creating the repository. Select Settings → Pages → Source → GitHub Actions, then push `main` or run the workflow manually.
- Current bank: **178 templates / 417 variations**: **115 puzzles**, **51 exam questions**, **12 Python challenges**. Normal puzzle sets contain **three** distinct questions of one subtype; individual question codes still open one. Existing revision-2 slots remain stable.
- All **30 maths source ideas** are in the live classic maths bank, with source IDs and counts in the JSON inventory. Concise adaptations repair ambiguous source rules. Coin-system and arithmetic-expression marking accepts valid alternatives without executing input.
- **50 Go problems** imported: 49 attributed GoProblems examples plus OGS 2625. Original board sizes, setup, captures and supplied branches are preserved. The import/validation tool uses pinned sgfmill 1.1.1. All **1,528 recorded positions** pass legality/capture checks. Winning outcomes rely on source annotations; unlisted moves remain explicitly unverified. Ko and seki are identified in relevant prompts.
- Go UX: click/keyboard play, immediate visible opponent stone and captures, alternative recorded replies, Undo/Reset, persistent next-move hints counted as assisted, and immediate green success feedback. Removed redundant automatic-reply wording. Solution replay supports actual dragging without replacing the slider node during input.
- Six new coding templates, five variations each: functions, returns, scope, bounds, binary/linear search and bubble-sort passes. Python now has four selectable focuses. Existing CA1/CA2 content was not changed in this batch; the user will provide feedback later.
- Footer includes “designed by Joe Hudson”.
- Browser smoke passed: all nine puzzle subtypes, three-puzzle sets, new coding focuses, Go stone visibility/hints/reload/drag replay/success feedback, existing path/tangram interactions, score placement, timer recovery and 320px reflow. An earlier coding-focus failure disappeared after a fresh browser load with caching disabled.
- Final local checks: 33 Node tests passed; all model answers and coverage report passed; Go tree validation passed. All 150 grid/geometry variations passed independent validation and the static site build succeeded.
- The user wants concise progress updates and quick completion; do not leave long silent periods while testing. Public deployment itself has not been verified.

---

## Current session: coverage and puzzle recalibration (14 September 2026)

- The initial 106-question draft sampled numbered objectives and did not cover their constituent elements. This was a serious limitation, not complete CA1–CA2 coverage.
- Agreed coverage model: each official focus has permanent local letters; parts link structurally to `{focus, elements}` and display `CA2.1.1[a,b]`. Counts are generated, never hand-maintained. Reordering must not reassign letters. Count distinct questions, require two applicable variations, and distinguish supporting practice from direct assessment and teacher-approved coverage.
- New inventory: 106 focuses / 369 subelements. Current exam expansion: 51 live multipart questions, two variations each, spanning all CA1–CA2 subsections. Initial generated report: 235 elements with live questions, 14 practice-only, 120 uncovered; only 10 elements have two live questions. None is teacher-approved. Re-run the report for current counts.
- User authorises dropping old demo-code compatibility to prioritise clean, robust, maintainable implementation. Keep separate banks by activity type. Exam implementation and checks are still being completed; do not claim final verification yet.
- Reread updated AGENTS.md: numerical/maths, spatial, sequence, logic and example-derived types; subtype filtering is desirable. User clarifies students are 16–19 at A-Level-equivalent academic level.
- Inspected all nine local example images. Basic 1 logic is explicitly under-one-minute onboarding; it is not the difficulty target. Four-entity logic examples require linked exclusions, time differences and either/or reasoning; the harder example has four categories and eight clues. Tangram requires using every piece without gaps/overlap and may admit alternative solutions. Dot paths require visiting all dots, not merely reaching an end. Equation grids use cross/tick candidate marking. Sudoku needs candidate notes and deductions.
- The old arithmetic grids, direct transformations and three-item ordering examples in spec-puzzles must be replaced as production benchmarks. Larger grids and more clicks alone do not establish difficulty. New items need linked reasoning, independently checked solutions and student timing calibration.
- User now authorises implementation of five distinct puzzles per planned type, including all local example types, and asks to use the ready-made maths problems from the linked HTML collection where practical. Read source questions/solutions first; separate prompt from hidden solution. Do not treat the request as preparation-only any more.
- Linked sources: Mr Barton Maths puzzle collection; mathschallenge 1-star PDF; GoProblems; OGS collection 2625. Web reader exposes the Barton landing page but not its client-rendered problems; downloaded HTML for full review. Go content has not yet been inspected beyond its app shell. Record source-review limits accurately.

</details>

## 2026-09-15

### Compressed question files, repeat attempts and loading activities

The production build began storing questions in compressed files and loading the required bank when students opened an activity. Question display data, answer-checking data and answer explanations were kept separate so that ordinary display and checking did not reveal model explanations.

**Files changed.** The work updated application modules in `js/`, versioned question banks, build and compression scripts, tests and preview configuration.

**Decisions and challenges.** A repeat attempt could contribute to tracked progress only after a four-hour gap. Students could still practise sooner, but those results did not change progress statistics. Existing compatible question codes and saved results had to remain usable.

**Checks and remaining work.** Build, marking, code-compatibility and browser checks were recorded. The archived references to `_site` and the earlier automated build workflow describe that version; later entries record their replacements.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-15</summary>

# Local implementation checkpoint — 15 September 2026

- Four-hour gap from the last completed attempt to the next tracked start for the same exact set; timer/order ignored, permutations distinct. Early practice scores are shown without changing progress; recent practice dates are included in JSON backups. Legacy tracked attempts keep their status.
- Applied classroom review to 52 exam parts in both variations and further wording/accepted-answer fixes. The encoding layout and slots are unchanged. The teacher agreed to selective compatibility: content revision 3 accepts the 344 unchanged revision-2 variations and rejects the 73 altered ones. Updated example: BoAkAiAg. Use codes:update after future content edits; docs/build-only changes do not affect revisions.
- Build uses pinned esbuild and fflate: compressed/Base64 display banks with a reversible 17-position alphabet rotation, separate per-part marking and reveal payloads, and a separately encoded Go playing tree. No plaintext authoring banks or source maps in `_site`; authoring files remain in Git. Decoding is temporary and model explanations are decoded only for reveal.
- Use `npm ci` then `npm start` to build and serve `_site`. Serving repository-root HTML is no longer the preview workflow. CI installs JavaScript dependencies before validation/build.
- 55 Node tests pass, covering packed/source parity, production artifacts, selective code compatibility, four-hour boundaries and marking alternatives. Browser checks pass against the built site; validate/build pass. These changes are local and have not been deployed by the assistant.

# Separate on-demand banks — 15 September 2026

- Production emits `banks/puzzles-<hash>.txt`, `banks/exam-<hash>.txt` and `banks/python-<hash>.txt`; the app bundle contains URLs and the loader, not bank payloads. Relative URLs work under the repository Pages path.
- Selecting an activity or entering a code fetches only its bank. Display data is reused in memory; answer payloads remain encoded until checking/reveal. An active saved attempt loads its bank on startup; a fresh home/progress page loads none.
- Failed fetches/decodes can be retried; saved attempts are preserved after a network error. Concurrent requests share one download. Content/code revisions are unchanged by this packaging change.
- 57 Node tests pass, including separate-artifact and loader/cache/retry checks. Production browser checks pass, including saved attempts, codes and progress imports. Changes are local, not deployed.

</details>

## 2026-09-20

### More questions, detailed progress and shared-code checks

The question banks were expanded, and progress records gained scores for individual question parts. Selection and filtering continued to choose complete questions rather than assembling unrelated parts into a set.

**Files changed.** The work updated question banks, progress and filtering modules, question-code handling, coverage reports, compatibility tools and tests.

**Decisions and challenges.** Scores needed to be attributed to the correct topics while shared codes continued to open the intended questions and variations. Older results were retained without inventing detailed scores that had never been recorded.

**Checks and remaining work.** The checks compared authored questions with their compressed production versions and examined old and current shared codes. They did not establish the cause of the reported classroom failure because the exact failing code was unavailable.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-20</summary>

# Content expansion and challenge selector — 20 September 2026

- **590 templates / 1,319 variations**: 450 puzzles (50 in each of nine subtypes), 77 exam questions, 63 Python challenges (five variations each). Changes are local, not pushed or deployed.
- Programming adds varied output, completion, repair, data-structure, string, array, match/case, exception, scope, sorting, file-operation, testing, code-style and validation tasks. Check-digit generation and its inability to detect digit swaps are explicit. Bounded answers remain the assessment model; no student Python execution.
- Exam adds 26 two-scenario templates with 137 new paired parts. CA1/CA2 report: **341 direct live elements, 28 supporting-practice-only, 0 uncovered, 0 teacher-approved complete**. The broad independent-development/diagramming skills are deliberately not claimed as fully assessed. Only 23 elements currently have two distinct live question templates; this remains a later coverage target.
- Puzzle levels: Foundation, Standard, Stretch and Mixed challenge. Each question carries `challengeLevel` plus `challenge:<level>`. Selector constrains new sets; shared codes open their exact questions; replacement cancellation and reload preserve state. Unavailable levels are disabled; changing focus falls back to mixed if necessary. Labels are provisional; especially tangram compactness and Go tree-depth proxies need classroom calibration.
- Six board families append 45 fixed, checked boards each. Existing five templates and their variations are retained. Foundations include 4×4 cages and 40-given Sudoku; stretch includes 6×6 cages, eight-variable equations, reduced-clue Sudoku and larger paths. Tangrams have 70 distinct silhouettes across all variations, even after rotation/reflection. Added sequences use nine clearly stated rule families; maths adds 20 problem designs with five variations each. Existing 50 Go problems are retained and labelled.
- `scripts/expand-puzzles.py` and `scripts/refine-puzzles.py` reproduce board additions. New original sequence/maths content is in separate authoring modules. Offline Python references live in `data/coverage/python-reference.json`, excluded from the student bank.
- Existing question fingerprints remain unchanged. Content revision stays **3**; all previously valid current-revision codes still work. Challenge selection metadata is excluded from identity hashes. Token comparison now supports method dots and augmented floor/power operators without executing input. Python set selection excludes same-format pairs.
- **63 Node tests pass**, content/code/coverage validation and production build pass, and independent Python solvers validate **420 grid/geometry variations**. Browser smoke passes all prior interactions plus challenge filter/cancel/reload/320px layout and the arrays/validation focuses. Screenshots include `/private/tmp/starters-challenge-filter-mobile.png`.
- Local preview server: `http://127.0.0.1:8765`, serving `_site`. Browser checks use an isolated Chrome profile, not the user's browser data.

---

# Detailed progress tracking — 20 September 2026

- Agreed policy: **only attempts containing the new `partScores` breakdown contribute to revision priorities**. Existing aggregate-only records are left untouched and remain in history, charts, averages, exports and four-hour repeat eligibility checks. There is no per-user migration, redistribution of old marks, date cutoff or persisted migration flag. Reopening a completed old attempt does not upgrade it.
- New exam/programming submissions snapshot question slot/variation, part ID, reporting references, final marks and eligible first-response marks. Exam references come from each part's explicit coverage mappings (CAx.y.z, or CAx.y.z.w where authored). Multiple subelement letters under one reference do not create extra credit. Programming retains its existing named focus because its tags are not part-level curriculum mappings. Puzzles remain excluded.
- Whole questions stay intact. For a part mapped to several distinct subtopics, divide both earned and available marks equally. Broad-topic totals count the original part once, never the original plus its child allocations. Percentages are calculated from summed marks, not averaged percentages.
- Apply history filters, then choose the latest five eligible detailed attempts with unassisted evidence per broad topic/programming focus. Both broad and fine views use the same parent window. This deliberately avoids different parent/child time windows; older evidence for an otherwise-unseen subtopic can fall out of that common window.
- Existing assistance and repeat rules remain: a question assisted before its first check contributes no first-response marks; early repeats do not enter history. Final results remain visible. An unfinished older activity submitted under the new code can receive detailed scores.
- My progress now has Topic / programming focus and Exam subtopic priority views, with contributing attempt counts and assessed marks. Fewer than three attempts OR ten marks is labelled Limited evidence. The page explains why earlier records do not affect priorities.
- JSON backups preserve the recorded breakdown. Import accepts legacy absence but rejects malformed detail, duplicate coordinates/references, invalid/out-of-parent references and inconsistent mark totals before any write. CSV includes first-response totals and the breakdown in a quoted JSON cell; restore remains JSON-based.
- Regression coverage includes the agreed example: an old 20/20 remains in history; a new detailed 3/5 gives 60% in priorities, with no inherited or guessed historical marks. Tests also cover equal splitting, repeated references, parent/child conservation, common recent windows, assisted scores, repeat eligibility and every current exam/Python variation's portable record.
- Validation: all 70 automated tests passed (the production-artifact check was rerun alone after concurrent builds interfered with its first run); content/coverage checks and production build passed. Browser smoke passed detailed topic/subtopic display, mixed legacy/detailed backup restoration, rejection of malformed part scores, reload/repeat behaviour and the prior activity interactions. Screenshot: `/private/tmp/starters-subtopic-progress.png`. Changes remain local and undeployed.
- This changes progress reporting only; finer filtering of the activity question bank is still a separate task. The agreed direction for that is to retain whole questions and select questions containing the chosen subtopic.

---

# Whole-question filtering and shared-code audit — 20 September 2026

- **Fine exam filtering is implemented.** Topic selects x.y; Subtopic selects x.y.z and deeper authored references, with counts of distinct matching questions. The filter preserves entire questions and their linked parts. It maximises matching questions in a three-question set and fills any shortage with explicitly labelled related questions from the same topic. Matching parts are highlighted. Example: CA1.2.3 selects its two matching questions plus one related CA1.2 question.
- New set with this subtopic retains the selection; permutations preserve the templates and matching variations. Changing topic / requesting a different topic resets to All. Cancellation preserves the previous attempt/filter; refresh restores it. Set codes retain exact questions and variations without encoding the UI filter, so recipients open the same questions independently of their preferences. Scoring still uses each part's coverage, never the selected filter.
- Existing question identities and bank revision **3** are unchanged. No content added or revised for this task; the bank remains 590 templates / 1,319 variations. CA6 content is the next requested development stage and has not been started here.
- **Code audit:** `scripts/audit-shared-codes.mjs` checks saved commit `45cc13e` (14 September) in an isolated temporary checkout and the current authoring bank. The archived release passed 417 individual variations and 2,240 generated/timed set checks; the current bank passed 1,319 individual variations and 3,520 generated/timed set checks. No encoder/resolver mismatch was reproduced. We cannot establish that this commit was the exact classroom deployment, and the original failing code/error/build remain unknown. Do not describe caching, transcription or architecture as the established cause.
- **Browser verification:** actual UI-started activities and Copy code / Copy link handlers were exercised for puzzles, exam practice and programming. Their exact strings opened matching question text in a separate browser context with independent storage. Timed codes, individual codes and link navigation also passed. The test intercepts the clipboard-write argument rather than reading the OS clipboard. This was Chrome on the development Mac, not a physical Windows classroom test.
- Footer now shows the loaded application asset/build and bank revision. Home/global code-entry errors and link errors offer **Copy error details**: entered text, Unicode character values, decoded fields when possible, error, build, bank revision, page origin/path and browser identity. No answers, history, storage or query parameters are included; nothing is transmitted automatically. Link-start errors are awaited and handled through the visible error path.
- **Validation:** all 74 automated tests pass; content/identity validation and production build pass. Browser smoke passes fine filtering, cancellation, refresh, permutations, related-question labels, intact parts, 320px layout, sharing across independent contexts, diagnostics and all earlier progress/puzzle checks. Screenshot: `/private/tmp/starters-exam-subtopic-mobile.png`.
- Updated `docs/spec-exam.md` and `docs/spec-common.md`. Changes remain local and undeployed; preview serves `_site` at `http://127.0.0.1:8765`.

---

</details>

## 2026-09-21

### Exam coverage, useful hints, issue reports and commit builds

New exam questions addressed gaps in the low-mark coverage, and the authoring guidance was expanded to require useful hints and evidence from the specification and specimen papers. Students also gained a way to prepare issue reports for their teacher.

**Files changed.** The work updated exam expansion and priority-question data, authoring and refinement guides, issue-report and navigation controls, and the scripts used when committing changes.

**Decisions and challenges.** The commit script was made to build the files selected for the commit, rather than include unrelated unfinished edits. Issue reporting remained an explicit student action. Navigation warnings were limited to entered, unsubmitted work so that empty or completed activities did not cause unnecessary prompts.

**Checks and remaining work.** The original records describe the question, marking and build checks. They also distinguish the completed additions from remaining coverage and classroom-review work.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-21</summary>

# Student issue reports — 21 September 2026

- Added one Report an issue button in the shared footer. Activity pages offer Bug or Content issue; content reports require one or more current questions/puzzles/challenges. Other pages offer Bug. A nonblank description is required (maximum 1,500 characters).
- Preview gathers selected item numbers/titles/exact permutation codes, visible set code, page link, build/bank identifier, browser and timestamp. Bug reports include currently visible code-entry diagnostics. No saved progress or answers are automatically included. Report context is captured when the dialog opens; the activity and its timer continue normally.
- Open email draft creates a standard mailto URL with an encoded subject and body, using CRLF line endings. Recipient remains blank by explicit user preference; students know their teacher’s email address. Outlook is the likely classroom handler but is not guaranteed, so this remains client-independent. The student reviews and sends; the site does not send or confirm delivery.
- Copy report supports other email setups and incomplete/blocked mailto handling. If clipboard permission is unavailable, the preview is selected for manual copying. No backend, reporting account, automatic transmission or dependency added.
- Validation: all 77 automated tests pass, production build passes and full browser smoke passes. New checks cover multiple selected items, required selection, exact context, clipboard failure, 320px dialog layout, home-page context and preservation of the active attempt. Unit tests check email field escaping (including Unicode and header-like text) and newline formatting. No real email was opened/sent; the classroom Outlook/default-handler integration still needs a manual check.
- Documented in docs/spec-common.md. Changes are local and undeployed. CA6 content remains the next content task.

---

# Local commit-time builds — 21 September 2026

- Application builds now output tracked `live/`, replacing ignored `_site/`. `npm start` serves `live/`. Existing docs remain documentation.
- Enabled `core.hooksPath=.githooks` in this clone. New clones run `npm ci` and `npm run hooks:install` once. The executable pre-commit hook invokes scripts/pre-commit-build.mjs; it exports the Git index into a temporary directory, uses installed local dependencies, builds there, then replaces and stages live/ only after success. Unstaged source is not published or staged. Failure blocks the commit. A staged lockfile differing from the working lockfile is rejected; run npm ci after dependency changes.
- esbuild preserves dependency symlink paths so temporary-index builds and ordinary local builds have matching hashes. Verified the full project through the hook in an isolated Git repository; output HTML matches the normal local build.
- GitHub workflow now only checks out committed files, uploads live/, and deploys Pages on main pushes/manual main runs. No dependency installation, application building or tests on GitHub. Keep Pages source set to GitHub Actions. Local full tests/coverage/puzzle checks remain explicit authoring checks; the hook runs bank identity and bank validation through the build.
- Validation: all 78 tests passed; after the dependency path adjustment, production build and hook tests passed again. Hook regression covers partial staging and failed-build preservation. Generated live/ is ready to commit along with source/config changes. No commit, push or deployment performed here.
- This supersedes prior checkpoint instructions to preview/deploy _site and run builds in GitHub Actions.

---

# Unsubmitted-answer navigation warning — 21 September 2026

- The leave warning now requires the activity to be visible, unfinished and contain entered answers or puzzle work. Saved unfinished activities no longer trigger a warning when starting from Home/Progress. Empty activities, whitespace-only answers, submitted work and puzzle UI selections alone do not trigger it.
- Navigating from an answered activity to Home/Progress or a different set prompts before replacing the visible activity. Cancel restores the activity route and preserves answers. Replacement controls and same-tab external links use the same condition; links opening another tab do not leave the activity. Skip-to-content simply focuses main.
- Puzzle checks include candidate selections/exclusions, entered grid values/notes, paths, placed pieces and Go moves/pending attempts; givens, selection state, undo history and reset-only state do not count.
- Validation: all 81 tests pass; full browser smoke passes, including explicit blank/home navigation, entered-answer cancellation/confirmation, unchanged answers, and the prior filtering/reporting/sharing/puzzle checks. Rebuilt live/ locally. No commit or push performed.

---

# Content guidance and hints — 21 September 2026

Shared [authoring](docs/content-authoring.md) and [refinement](docs/content-refinement.md) guides replace duplicated rules. Reviewed all exam/puzzle hints: revised 77 exam templates (154 variations) and 158 puzzle templates (230 variations). Other assessment data is unchanged. Logic hints use visible constraints; Go anchors identify existing groups. Generators/import inventory preserve edits. Repeated strategies remain where applicable to the same constraints, geometry or sequence rule; 30 audit groups were reviewed.

Grounding: specification 1.1; SAM Paper 1 questions/mark scheme 1–3, 7–8 calibrate terminology, short responses and distinct marking points. Assessment was not rewritten. Teacher approval and student trials remain pending.

Checks: 83 tests, content/coverage/identity validation, 420 grid variations, 1,528 Go positions, build and browser smoke pass, including hint focus/reveal separation/mobile. Revision 4; current example `CIAkAiAg`. No commit/push.

---

# Reading cautions and future coverage — 21 September 2026

Teacher clarification is recorded in the shared authoring/refinement guides: hints address likely misreadings; coverage additions must document the gap, existing-question comparison, distinct angle and SAM-calibrated demand. Added cautions to both variations of exam slots 1, 5, 8, 44 and 49; no prompts, answers, marking or coverage changed. Technical symbol names are encouraged without rejecting existing accepted shape aliases. Revision 5; example `CoAkAiAg`. Content validation, 83 tests, build and browser smoke pass. Teacher approval/student trials remain pending; no coverage expansion or publication performed.

---

# CA1–CA2 further exam coverage — 21 September 2026

Confirmed from the pre-caution snapshot that only hints changed for slots 1, 5, 8, 44 and 49. The shared rule now explicitly confines reading cautions to hints. Added **23 questions / 46 variations / 290 part instances**, slots 126–148, across all 15 broad CA1–CA2 topics; the original 77 questions remain byte-for-byte equivalent as data. The exam bank is now **100 templates / 557 paired parts**. Full bank: 613 templates / 1,365 variations. Additions extend revision 5 without changing existing identities; all 154 prior exam variations still resolve.

The [expansion review](docs/exam-depth-review.md) records specification/SAM evidence, comparisons and new angles. Tasks include state tracing, capacity decisions, unsafe reuse/optimisation, file effects, interface diagnosis and interpreting test evidence. Generated coverage rises from **23 to 224 elements with two distinct direct questions**. Still outstanding: **117 with one direct question, 28 supporting-practice-only**; no teacher-approved complete elements. This is progress towards the two-question target, not completion. No CA3–CA8 expansion is included.

Validation: 86 tests, independent Python reference execution, all authored aliases, linked reasons, content/coverage/identity validation, zero hint-audit errors and production build pass. All 46 added variations passed browser checks for prompt/code fidelity, model scoring, hint focus, reveal separation and 320 px reflow; full browser regression also passes. Prior puzzle repetition warnings are unchanged. Updated tests whose old fixed-bank assumptions no longer hold. Teacher review and classroom timing/hint trials remain pending. Preview example: `CpEkHQDx`. No commit, push or deployment.

---

# Bounded priority expansion — 21 September 2026

Completed the agreed eight questions, slots 149–156, each with two variations: function/procedure development and debugging first, then decomposition, searching/sorting and maintainability. Added 47 paired parts (94 instances). Exam bank: **108 questions / 604 paired parts**. Full bank: 621 templates / 1,381 variations. Original questions are unchanged; additions extend revision 5. Preview: `CpKglgRQ`.

Code tasks assess headers, bodies, expressions, calls and repairs separately. Required identifiers/forms keep answers bounded; token matching accepts spacing and quote variants, never executes student code. Independent Python tests assemble the authored answers and check boundaries, outputs and list effects. Scaffolded code development remains supporting practice. Coverage links remain within the selectable topic so progress exports retain their existing validation contract; selection within functions is assessed under function interpretation/debugging.

Two-question coverage rises **224 → 263 of 369 elements**, including **28/28 searching/sorting elements**. Remaining: 78 with one direct question, 28 practice-only; teacher approval and timing trials remain pending. Source/angle evidence is appended to [the existing review](docs/exam-depth-review.md), avoiding another guide.

Checks: all 88 tests, content/coverage/identity validation, build and full browser smoke pass. Browser checks explicitly cover both variations of each new pair, scoring, hint/reveal separation and 320 px layout. The first pair was saved/validated/built before the remaining six were authored; reporting then caught up with pair-by-pair browser results. All work is saved locally; no commit, push or deployment.

---

</details>

## 2026-09-22

### Accepted answer wording, labelled answers and sequence navigation

Concept questions gained more ways to recognise equivalent answers, while code answers remained exact. Model answers were labelled to match their question parts. An optional sequence mode let students move through exam subtopics in specification order.

**Files changed.** The work updated `js/marking.js`, exam term rules and content, answer-reveal and navigation controls, shared specifications and tests.

**Decisions and challenges.** Matching rules allowed specified terms, related qualifiers and a limited number of descriptive words. They still rejected contradictions and guessing. If a student entered alternatives separated by “or”, every alternative had to be valid. Python function names and other code answers were not given this wording tolerance.

**Checks and fixes.** Prompts and titles were clarified, and answer displays were made easier to follow. The detailed records contain accepted-answer, rejected-answer, build and browser checks, including their scope and limitations.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-22</summary>

# Streamlined checks, four questions and home emphasis — 22 September 2026

Persisted the adopted smaller check set and escalation conditions in [content-refinement.md](docs/content-refinement.md): focused answer/reference checks, coverage/identities/content validation and build for bank-only edits; targeted previews when needed. Shared behaviour changes or relevant failures justify broader checks. A small cosmetic change gets an affected-view preview, not an automatic full regression run.

Added slots 157–160: input/output, selection/sequence, reusable-code sources and investigation. Each has two variations and six one-mark parts. Bank now **112 exam questions / 628 paired parts**; two-question coverage **263 → 285**, with 56 elements still at one question and 28 practice-only. Original questions remain unchanged; additions extend revision 5. Source/angle evidence is appended to the existing expansion review.

The home exam card gains a blue border and subtle shadow through one commented `.activity-grid > .type-card.type-1` rule in `css/styles.css`. Delete that rule to restore equal card styling. No DOM, order or interaction changes.

Checks passed: two focused tests, reference execution, coverage/identity/content validation, production build; targeted browser scoring/hints/reveal for all eight new variations and desktop/mobile/keyboard home preview. No full suite or whole-bank smoke. Generated live files are updated. All work remains local; no commit/push/deployment. Teacher review and classroom calibration remain pending.

---

# Sequential exam sets and descriptive titles — 22 September 2026

Added optional **In sequence** exam navigation. It advances both new-set controls through selectable subtopics in specification order, crosses topic boundaries, preserves the visible Topic/Subtopic cursor and stops at the final available subtopic. Shared set/question code formats are unchanged; sequence preference remains local attempt state and is not encoded. Adjacent subtopics may retain their only best whole-question combination while changing qualifying variations. The control has a hover/focus tooltip, and focused-set guidance and matching-part labels are compact disclosures or badges.

Retitled expanded exam slots 100–125 after reviewing every part in both variations. Removed all generic `CAx.y · Applying ideas N` titles and replaced them with concise descriptions of the assessed concepts, without changing prompts, options, answers, hints, coverage, slots or variation positions. Titles are fingerprinted user-visible content, so the 52 affected variations create revision **6**; unchanged older entries remain compatible. Teacher subject review and classroom wording calibration remain pending.

Checks passed: focused expansion and sequence tests, all **92 tests**, coverage generation, identity/content validation and production build. Browser checks confirm bank 6, a retitled packed question, tooltip visibility on hover and keyboard focus, selector alignment, compact disclosures and selected-subtopic labels above question text. Generated `live/`, compatibility and coverage files are updated. No commit, push or deployment was performed.

---

# Context and conceptual answer rules — 22 September 2026

Implemented the agreed whole-answer rule: exactly one authored key term/synonym, optionally followed by one qualifier linked to that term group. Rules are opt-in for case-insensitive conceptual text parts; code, identifiers, choices and literal outputs retain their existing marking. Explicit irregular alternatives and sentence normalisation remain supported. Qualifier lists are reused, with permanent slot/part/variation assignments and expected-answer guards in [exam-term-rules.js](data/exam-term-rules.js). Rules are sealed in marking payloads, validated and included in compatibility fingerprints.

Reviewed term answers across the CA1–CA2 bank. Added rules to **336 parts** and clarified **106 prompts** across **62 templates / 124 variations**, without changing marks, code, answer values, coverage, hints or explanations. Examples include real/floating-point for data types, modular design, logging, sequential search, memory usage, elapsed time and hyphenated box-testing names. The float conversion function stays exact. Category wording now specifies control structures, problem-solving steps, variable naming and validation where needed; neighbouring-part answer leakage was checked. See [review evidence and limits](docs/exam-term-review.md).

Checks passed: **100 tests**, coverage generation, compatibility update, all-model validation and production build. Full isolated browser smoke passed, including 12 synonym/rejection submissions across both variations, sharing, timer/storage, hints/reveals and 320px layout. An initial navigation race in the added browser test was corrected before the successful rerun. The mobile result screenshot confirms “real number” and qualified type names earn credit. Question revision **7** preserves unchanged historical entries and explicitly rejects changed entries under the existing policy. Generated coverage is unchanged; `live/` and compatibility records are updated.

Work remains local; no commit, push or deployment. Teacher subject review and classroom calibration remain pending.

---

# Labelled answer reveals — 22 September 2026

Show answer now uses the same `a)`, `b)`, etc. labels as the question parts. Each list item presents the model answer in bold, its explanation on a separate line, and spacing/dividers between parts. Removed repeated question prompts and the extra punctuation previously appended to answers. Multiline answers preserve line breaks; interactive puzzle solutions remain inside their corresponding item.

Added `written representation` and its plural as accepted synonyms for `written description` in both variations of exam slot 3, part e (CA1.1.9). This is an equivalent name for the existing plain-language representation task; marks, source mapping and demand are unchanged. Compatibility advances to revision **8** for these two variations; unchanged historical entries remain usable.

Checks passed: 17 focused marking/packing/alternative-answer tests, explicit synonym acceptance and rejection in both variations, coverage generation, compatibility/content validation and production build. Targeted browser checks cover both exam variations plus a Python challenge: matching labels, model answers, explanations, full-credit scoring, reveal focus and desktop/320px reflow. Desktop/mobile screenshots were inspected. Work remains local and uncommitted; teacher subject approval remains pending.

---

# Tolerant concept prefixes and equivalent alternatives — 22 September 2026

Exam concept groups now opt into up to three descriptive prefix words, with negating/contrast/combined-answer prefixes rejected. A permitted suffix remains optional. Standalone `or` separates alternatives that must all pass independently; empty or incorrect operands fail. Explicit authored phrases remain atomic. Function/procedure concept questions are opted in; Python function-name and code tasks stay exact. Set `prefixWords: 0` or omit it for strict groups. This deliberately tolerates imprecise non-negating descriptors, as agreed with the teacher.

Checks passed: 18 focused term-rule, packed-bank and existing alternative-answer tests, including positive/negative prefix cases, equivalent versus guessing alternatives, and both raw and packed marking. Coverage/compatibility generation, whole-bank model validation, production build and diff whitespace checks pass. No browser or full-suite run, as requested. Source and `live/` are synchronised; work remains uncommitted.

---

</details>

## 2026-09-23

### Classroom feedback and keeping shared codes useful

The site was updated in response to student reports. Correcting a question now kept its existing question and variation identifiers, so an old code could open the corrected content with an update notice. A genuinely different task still needed a new identifier.

**Files changed.** The work updated `js/app.js`, `js/bank.js`, `js/progress.js`, `js/review.js`, `js/theme.js`, `js/issue-report.js`, puzzle controls, styles and compatibility tests. The decisions are recorded in `docs/decisions/2026-09-student-experience-and-shared-codes.md`. ESP source and planning documents were also started. The commit was `54d7472`.

**Decisions and challenges.** Historical scores had to remain unchanged when question wording changed. An unfinished attempt whose question had changed was restarted rather than marked against a different version. Students remained responsible for choosing whether to send an issue report.

**Fixes and limits.** The decision record describes the interface, answer-review, theme and shared-code fixes. The withdrawn demonstration bank remained unsupported. Keeping a question identifier did not promise access to every previous version of its wording.

## 2026-09-24

### More varied puzzles and partial credit for algebra

The puzzle collection gained smaller Sudoku boards, rectangular paths, guided tangrams and more maths and sequence tasks. Algebra marking could recognise an equivalent answer while still checking whether the student had completed the requested simplification, expansion or rearrangement.

**Files changed.** The work added `js/algebra-answer.js`, puzzle content and generation tools. It updated puzzle controls and marking, `js/puzzle-cards.js`, bank modules, tests and cached references. The commit was `2f08265`.

**Decisions and challenges.** Algebra comparisons used exact fractions to avoid rounding errors. Beginner and Foundation maths stayed within routine Foundation GCSE demand. Go difficulty used the problem's recorded source rank instead of the depth of its solution tree.

**Fixes and remaining work.** The work corrected Go difficulty selection, handled duplicate moves in imported solutions and fixed a browser test that assumed every path board was square. Later entries record the final checks and further expansion; the unfinished steps in the original 24 September plan are not all still outstanding.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-24</summary>

## 2026-09-24 — Puzzle enrichment, GCSE maths and symbolic marking (in progress)

This is the current work plan/status. Earlier dated entries below are historical. User now requires efficient work, reusable references cached in the repository, and a checkpoint plan **before every job expected to exceed 20 seconds**. These directives are also in AGENTS.md. This entry records work already performed before that instruction, plus the remaining plan.

**Objective:** at least 100 puzzles in each of nine families with meaningful variety; rank-based Go challenge bands; improved Go card; GCSE Foundation ceiling for Beginner/Foundation maths; polynomial expression marking with partial credit for equivalent unfinished forms. The user approved the variety proposals, smaller Sudoku and scaffolded tangrams. No delegation was requested.

### Plan and completion record

- [x] Inspect existing banks: initially 50 per family. Go used tree-depth grading; Foundation had only two problems and was unavailable. Tangrams were 43 Stretch / seven Standard.
- [x] Replace Go card row with a small SVG ko pattern (`js/puzzle-cards.js`).
- [x] Add restricted mathjs parsing and exact rational polynomial equivalence (`js/algebra-answer.js`). Never compile/evaluate student trees. Full/partial credit depends on equivalence and requested form. Forms: equivalent, simplified, expanded, factorised, rearranged. Rearranged allows a reduced single fraction, rejects uncancelled factors/unfinished arithmetic. Variable denominators, roots/functions/inequalities are unsupported. Marker integrates with packed banks and dependencies. Focused tests: six passed at last run.
- [x] Add 50 Classic maths tasks / 250 variations in `data/puzzles/maths-practice.js` (slots 635–684): 35 algebra, 15 other maths. Classic maths total 100. Beginner/Foundation constrained to routine GCSE Foundation content. Four older combinatorial tasks moved to Standard. Algebra topic filter added. See `docs/maths-practice-review.md` for evidence and limitations; teacher review remains pending.
- [x] Expand six grid/shape families to 100 each using `scripts/enrich-puzzles.py` (slots 685–984). Includes three-person logic grids, equation mixes, 4×4/6×6 Sudoku, rectangular/shaped paths, guided tangrams and addition-only/mixed cages. `scripts/validate-puzzles.py` passed: 720 served variations independently checked. Runtime supports path `rows`, Sudoku `boxRows/boxCols`, tangram `guides`.
- [x] Add 50 sequence templates / 250 variations in `data/puzzles/sequences-enriched.js` (slots 0–49). Ten rule families × extend/restore/sum/position/error tasks. Sequences total 100.
- [x] Cache useful Go references in `references/go`. `scripts/cache-go-sources.py` reuses existing files and stores public SGFs, ranks, contributor attribution and catalogue sample. The API ignores difficultyFrom/difficultyTo in catalogue queries, so filter returned ranks locally. Working public endpoints: `/api/v2/problems?resultNumber=100&offset=N&sortBy=p.id&sortDirection=asc`, `/api/v2/problems/ID`. Eight catalogue pages and 69 problem files were cached; do not redownload them. One OGS problem and collection index also cached.
- [x] Finish Go import and grading. `scripts/import-go-enrichment.py` selects 51 cached positions with authored objectives/hints; currently creates 101 Go problems. Duplicate sibling moves in source problems 191 and 25 are merged after checking equal board/colour, retaining all continuations and winning markers. Independent replay passed: 101 problems / 3,833 recorded positions. Tree-depth grading removed; original source ranks and cached OGS rank classify all four bands, and UI labels show rank ranges.
- [ ] Finish independent maths/sequence content checks and targeted tests for rectangular paths, small Sudoku, guides, maths topic selection and partial marks. All model answers passed the last bank validator, but independent source-expression checks and the newly added structures deserve focused verification.
- [ ] Finish browser checks. Initial full smoke failed at line 193: test drag coordinates assumed square path boards. Corrected the test to use `part.rows`; the runtime already used the correct rectangular geometry. Rerun after the final build. Add focused algebra partial/full credit, rearranged fractions, maths filters, small Sudoku and rectangular-path checks, then inspect desktop/mobile/high zoom screenshots. Chrome isolated profile `/private/tmp/starters-enrichment-browser`, debug port 9227; preview server port 8765 serving `live/`. Do not use a personal profile.
- [ ] Update reference documentation and puzzle specification, record final counts/limits, regenerate identities/build, run relevant tests and final validation. Previous full suite: 109 tests passed before the later grid/sequence/rearrangement changes. Latest bank validation/build passed at revision 10 (1025 total templates, before Go additions). Do not claim final verification yet.

### Resume commands and current files

- Go environment: `/private/tmp/starters-content-venv/bin/python` has sgfmill 1.1.1. `scripts/requirements-content.txt` already records it. Run importer and `scripts/validate-go.py` offline. Regular `python3` has SymPy available, but not sgfmill.
- `/opt/homebrew/bin/node --test tests/algebra.test.js`; `python3 scripts/validate-puzzles.py`; `npm run codes:update`; `npm run validate`; `npm run build`; `npm test`.
- Browser: `/opt/homebrew/bin/node scripts/browser-smoke.mjs` requires local debug-socket access outside the sandbox. Current output in `/private/tmp/browser-smoke.log`.
- Working tree changes are uncommitted. Initial Go-card change predates the latest user request and is intentional. Generated `live/` currently predates the new Go bank. Preserve stable slots/variation positions; no commit/deployment was requested.

</details>

## 2026-09-25

### Finding exam resources and preparing reusable conversions

An exam resource map was added to help future work select the relevant paper, task and mark scheme without repeatedly opening whole collections. Existing ESP sources were converted into reusable local text and image files. Puzzle difficulty bands were also audited before further questions were added.

**Files changed.** The work created `docs/exam-resource-map.md`, the puzzle-level review, ESP conversion and checking scripts, and reference records. It updated `AGENTS.md`, the documentation index and ESP source and process notes. The commit was `85e1b48`; design work continued on 26 September.

**Decisions and challenges.** Conversion tools reused existing results where possible and recorded which original files they came from. The work covered 36 documents and 341 PDF pages. Converted files were placed beside the sources under approved access; the originals were not changed.

**Fixes and verification limits.** The conversion work corrected missing pseudocode table content, overlapping contents-page text, lost code indentation and unwanted print identifiers in footers. File, link and selected visual checks passed, but they did not certify every word or diagram. Later records describe the closer assessment review.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-25</summary>

## 2026-09-25 — Workflow summary, puzzle band audit and exam-resource map

**Objective/scope:** summarise persisted efficiency guidance; investigate and report puzzle-family difficulty gaps without changing content; inspect only directory/file names under `../agents` and write a concise resource-routing guide linked from AGENTS.md.

- [x] Read recent workflow guidance and current puzzle selection/band metadata.
- [x] Calculate active challenge counts and selectable sets per family/band; report gaps and causes without editing puzzles.
- [x] List exam-resource directories/file names only; map resource types to suitable tasks in a new documentation file and link it from AGENTS.md.
- [x] Verify links and audit results; record findings, limitations and exact next action here.

**Checks:** use existing local files/caches; no downloads or exam-resource content reads. No build/browser rerun for documentation-only changes. Preserve unrelated unfinished work from 24 September.

**Completed findings:** seven puzzle families have no Beginner templates. All nine support Foundation/Standard/Stretch. Number and measures filtering supports only Foundation (counts 0/13/2/0); Algebra supports all bands (12/11/8/4). Source counts match the cached inventory, 901 active templates. See `docs/reviews/2026-09-25-puzzle-level-coverage.md` for counts, cause, thresholds and suggested follow-up. No puzzles changed.

**Resource routing:** created `docs/exam-resource-map.md`, linked from AGENTS.md and docs/README.md. Inspected only directory/file names under `../agents`; no exam-resource contents read. Covers Core SAM and summer 2026 papers/schemes/reports, ESP SAM/AdSAM/live tasks, A/E exemplars, OS and old-spec topic questions. Conversion/PDF equivalence remains unverified.

**Current-state correction:** working tree was clean before this documentation job except the newly appended plan. The 24 September entry's claim that implementation was uncommitted is historical, not current evidence; its unfinished verification items were not rerun in this task.

**Next action:** report findings for review; await the user's direction on Beginner authoring/reclassification and Number and measures gaps. Do not silently implement puzzle changes. Prior implementation verification remains outside this audit's scope.

**Verification:** fresh runtime pool counts matched the saved inventory for every family/band; inspected actual selection threshold and topic filtering. All 20 local Markdown links across the changed guide/index/instructions and audit resolve. `git diff --check` passed. Documentation only; no source-bank edits, downloads, rebuild, commit or deployment.

## 2026-09-25 — ESP conversion, evidence review and starter design programme

**Authorised objective:** (1) carefully convert ESP PDF/DOCX resources into adjacent `md/` directories with matching basenames, retaining assessment images/tables/lists and removing repeating headers/footers; (2) document a repeatable cross-session evidence-review process; (3) apply it to starter designs for every ESP task; (4) ONLY AFTER teacher discussion/agreement, implement Task 1 and Task 2 designs. User explicitly requires checkpointed progress and a working site throughout. No delegation requested.

### Programme checklist

- [x] Inventory sources, existing extracts and reliable local tooling; build a resumable converter/manifest with source hashes and quality checks. Original resources remain untouched. Obtain sandbox approval for adjacent output under `../agents`.
- [x] Convert/check original ESP SAM (RBSX): pre-release, tasks, scheme, DOCX log.
- [x] Convert/check additional ESP SAM (RetailX): pre-release, tasks, scheme, PDF/DOCX logs; preserve both formats without basename collisions.
- [x] Convert/check summer 2026 ESP (Glenstar): pre-release, task papers and DOCX log.
- [x] Convert/check summer 2026 ESP mark scheme and examiner report.
- [x] Convert/check ESP Grade A/E exemplification reports and task PDFs; inspect extensionless Grade E flowchart format and preserve relevant visual evidence.
- [x] Record conversion completeness, tables/images, review evidence and limitations per resource. Verify provenance, output links, page coverage and representative/all flagged visual pages. Do not equate extraction with verified fidelity.
- [x] Document repeatable ESP analysis workflow and task evidence matrices: requirements → assessed criteria → top-band evidence → examiner difficulties → teachable subskills → starter design → marking/validation.
- [x] Apply workflow across Task 1, Task 2, Task 3, Task 4a and Task 4b; triangulate SAM/AdSAM/live scheme, examiner commentary and A/E exemplars. Reuse existing `docs/esp` notes and cached assets, verify current paths. Read supplied Python/CSV/XLSX as needed for analysis, without expanding PDF/DOCX conversion scope to OS/Core written exams.
- [x] Write detailed activity-set designs, progression, meaningful variations, accessible UI, deterministic versus rubric/self/teacher assessment, feedback and review limits. Document implementation increments and checks for Tasks 1/2.
- [ ] Share designs and material choices with teacher; STOP before implementation until agreement.
- [ ] After agreement: implement/test Task 1 in independently usable increments; checkpoint each.
- [ ] After agreement: implement/test Task 2 in independently usable increments; checkpoint each.

**Current state:** previous documentation edits are present, including user's scenario-label clarification; preserve them. No application changes required for conversion/design phases. Original sibling resource area is read-only under current sandbox; prepare converter/output review before requesting narrowly scoped write approval. Keep transient extraction/render files in `/private/tmp`, reusable tools/manifests/notes in this repo; published conversions/images beside sources as requested. Cache first; no repeated successful conversion if source and converter hashes match.

**Next action:** inspect existing ESP source guide/assessment notes and local converter availability, inventory PDF pages/structure and DOCX tables/images. Choose tooling based on evidence, then pilot representative task/scheme/exemplar conversions before batch processing.

**Conversion increment completed:** 36 documents (33 PDFs including the extensionless Grade E flowchart; 3 DOCX), 341 PDF pages, 269 linked table/figure assets. Generated outputs are in source-adjacent `md/` directories, with unchanged basenames and `.conversion.json` provenance records. PDF/DOCX names do not collide in this inventory. `references/esp/conversion-manifest.json` records every page, source hash, outputs and checks. Published successfully with approved filesystem escalation; originals unchanged. Used installed pdfplumber 0.11.9/PDFium 5.5.0 and Pandoc 3.11, no downloads.

**Conversion checks/limits:** page anchors, source/converter/output hashes, native alphanumeric retention (normalised sub-bullets accounted for), all linked assets and DOCX five-column labels checked. Initial contact sheets sampled 138 visual-bearing pages; some first-pilot stale assets appeared in contacts but were excluded from publication, which copies only current links. Visually checked the original SAM rubric, live scheme p17 and Grade A contents p2 at readable size. Fixed open-bottom pseudocode table loss (live scheme p17), Grade A overlapping contents text, native code indentation and live print-ID footers. This is structural verification plus visual sampling, not word-for-word certification or complete diagram transcription. Figures remain linked images. No source content silently corrected; source mistakes retained.

**Repeatable workflow:** `docs/esp/review-process.md` created. Source review currently confirms Task 3 revised SAM/AdSAM booklets explicitly total 18 including communication, superseding old notes' 21/18 discrepancy. Examiner report pp5–23/33/55/65–66 read for planning/testing/design/evaluation weaknesses. Current original SAM + AdSAM + live Task2–4b requirements read (some initial oversized output was truncated; AdSAM T2/T3 reread in full). Local spec ESP section read.

**Exact next action:** finish task evidence matrices from scheme bands, Grade A/E commentary and artefacts; review Task1 briefs and supplied data/code as needed, independently verify proposed numeric examples; write all-task starter designs for teacher discussion. Do not implement before agreement. Conversion tools: `python3 scripts/check-esp-conversions.py` restores published cache to staging when missing and checks; only run `convert-esp-resources.py --match <resource>` for missing/changed resources, then check/publish. Use non-login shell for escalated commands to avoid unrelated pyenv startup lock delay.

### 2026-09-25 — Added Task 1 workbook conversion (user steering)

User explicitly adds XLSX Task 1 spreadsheets to conversion scope, requesting a readable open format that preserves formulas and charts. Preserve the original ESP programme and approval gate.

- [x] Inventory all ESP Task1 XLSX files, including A/E example plans; inspect sheets, formulas, cached results, native charts/images, merges and conditional formatting.
- [x] Export source-adjacent `md/<same-stem>.md` workbook guide plus linked CSV/JSON data with exact cell addresses, formulas and separately identified cached values. Preserve chart definitions/images and meaningful Gantt formatting; record any rendering/recalculation limitations.
- [x] Verify cell/formula counts and source hashes; inspect representative plan views. Add outputs/provenance to conversion register and source review. Reuse originals/existing tools; no source edits.

**Next action:** inspect workbook structures using installed openpyxl and OOXML ZIP metadata. Choose the least complex faithful representation before exporting. Do not imply cached formula results are freshly recalculated.

</details>

## 2026-09-26

### Reviewing ESP assessment evidence and planning activities

ESP source material was examined more closely to establish what each task assesses and how it could be practised in a short activity. The work developed `docs/esp/` source notes, assessment summaries, task designs and validation guidance. The challenge was to preserve the assessment purpose without treating a shortened exercise as proof of the whole skill. Implementation began during this period and continued through 28 September; the completion summary appears under that date. The original records below retain the source-review findings and limitations.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-26</summary>

## 2026-09-26 — Resume ESP evidence-to-design work

**Objective:** finish the conversion handover and evidence review, then produce concrete all-task activity designs for discussion. No implementation before teacher agreement; later implementation is limited to Tasks 1 and 2.

- [x] Reconcile published PDF/DOCX/workbook manifests with the stale last checkpoint; check output presence/hashes without reconverting unchanged sources. Finish the conversion register, useful links and limitations.
- [x] Read saved evidence review/process and only targeted outstanding source sections; verify any new worked-example calculations/code. Record new findings so subsequent sessions do not repeat source review.
- [x] Document sets for all five assessed tasks, with progression, worked examples, meaningful variations, UI, marking contracts, feedback, transfer limits and Task1/Task2 delivery increments.
- [x] Verify documentation links, examples and source claims; record completion/remaining decisions and present the designs for discussion. STOP at this gate.

**Resume observation:** initial `git status --short` is clean. The previous turn successfully published five XLSX exports (17 sheets, 698 formulas, zero chart objects), but the final checkpoint checkboxes were not updated. `docs/esp/evidence-review.md` and both manifests exist; `conversion-register.md` has not yet been created. Reuse them; do not restart extraction. No application files have changed during this programme.


### 2026-09-26 completion and exact handover

**Conversion reconciliation complete:** all 36 PDF/DOCX source/output hashes and linked assets checked without reconversion. Final manifest count is **270** linked assets, superseding the earlier 269. Five published XLSX exports contain 17 sheets and 698 formulas; source hashes and declared output files checked. Workbook exports include same-stem MD guides, formula/value CSVs, addressed-cell JSON, styled HTML and retained OOXML. No native charts or conditional formatting present. Cached results were not recalculated. Direct Gantt cell fills and basic merges are preserved; theme/tint colours, exact number formats, printing/interactivity and browser visual fidelity are not certified. Checkbox completion does not imply those limitations were removed. Originals unchanged; no sibling-folder writes this session.

**Evidence/design complete for discussion:** `docs/esp/conversion-register.md` indexes all outputs. `docs/esp/source-guide.md` is now the current entry point, linked from docs/README.md; old source guide retained as historical research, superseded Task3 21/18 discrepancy corrected in task notes. `docs/esp/evidence-review.md` records targeted source reads, all three supplied Task2 code reviews (read only), examiner testing examples, scheme wording anomaly and CSV findings. `references/esp/dataset-inventory.json` records six file hashes/schemas/counts/date ranges. Both RetailX CSVs contain a 2026 date among November 2025 records; preserve and state assumptions, do not silently correct.

**Proposals:** `docs/esp/activity-designs.md` covers 21 three-question set recipes (T1:5, T2:5, T3:4, T4a:4, T4b:3), UI/feedback/marking contracts, progression and implementation increments. `task-1-designs.md` and `task-2-designs.md` provide detailed worked examples and meaningful variation axes. First-phase scope proposes five coordinated variations for each of ten T1/T2 recipes: 30 question templates / 150 variations. These are designs, not completed question banks. Recommended marking combines automatic constrained checks with separately reviewed short prose; no automatic ESP grade. Review statuses do not imply a teacher inbox/account system.

**Verification:** `python3 scripts/validate-esp-designs.py` passed independent schedule/availability, costs/forecast, boundary/ID, tier/rounding, repair and small data examples. All 98 local Markdown links across docs/esp and docs/README.md resolve. `git diff --check` passed. Application files untouched; no app build/browser tests repeated for this documentation-only change. Workbook rendering limits and unverified full exemplar formulas remain recorded.

**Exact next action:** discuss the proposed activity coverage, separate ESP navigation and hybrid marking with the teacher. Do not implement until agreement, as explicitly requested. After agreement, persist the next incremental plan before code changes; first deliver one usable T1/T2 slice, then expand the agreed scope. Existing codec rejects type 3 despite two type bits, so explicitly test backward-compatible code/loader/navigation/progress integration. Preserve existing share codes. Do not restart conversions or bulk source reading. No commit or deployment performed.

## 2026-09-26 — Teacher refinement: timing, close reading and validation practice

**Objective:** incorporate teacher acceptance of the broad progression with explicit refinements: each set is three self-contained multipart questions of about five minutes each; Task2 needs generous validation fault-finding and repeated practice of every test-template column. This turn updates design requirements, not application code.

- [x] Confirm exact template headings from cached conversions and identify evidence-review requirements before authoring.
- [x] Update shared and Task1/Task2 designs for timing, validation coverage, column-level objectives and deliberate repetition.
- [x] Check documentation consistency and record exact next authoring action, including any evidence still needing close comparison.

**Scope decision:** broad activity progression accepted by teacher (“seems reasonable”), subject to these refinements. Do not request the same broad approval again. Prior design-level evidence synthesis is not certification of every future question/variation; source-to-question checks remain required.


**Completed refinement:** shared designs, both task designs and review process now require three independently answerable multipart questions, **at most five minutes each**, with reading/interaction included; shorter questions/sets explicitly welcome (teacher clarification). Task2 now has a validation coverage requirement, all five exact AdSAM template headings with column-specific objectives/exercises, a recipe-to-column map and deliberate small-variation repetition. T2.5 is revised to three independent miniature investigations rather than a chain relying on previous answers. Existing worked examples remain reusable design material; they are not yet final timed questions.

**Close-reading requirement:** before authoring each question family, compare all relevant scheme bands, examiner judgement against the actual response, and A/E artefacts/commentary; inspect relevant figures and persist claim → evidence → question/feedback links. Task-level summaries alone do not certify every future question. Reuse completed close comparisons, fill specific gaps, and record limitations. No application changes or source reconversion this turn.

**Checks:** cached AdSAM DOCX headings read directly; `git diff --check` passed. No executable content changed; no runtime tests required. **Next action:** begin the question-family evidence/coverage matrix for Tasks1/2, then author a small representative slice under the accepted progression and refined requirements. Do not seek repeated approval of the broad progression. Classroom timing remains unverified; narrow any question that exceeds the five-minute ceiling instead of requiring every question to use the whole allowance.

## 2026-09-26 — Authorised ESP close-reading and implementation

**User authorisation:** complete close reading of all supplied ESP assessment references, persist high-signal distillations, refine designs, then implement Task1/Task2. The previous discussion gate is satisfied; no repeat approval required. Three independent multipart questions per set, each <=5 minutes, with strong validation and all test-log columns. Keep existing app functional; no deployment requested.

- [ ] Audit source/page coverage; complete missing task/scheme/report/exemplar reading and relevant visuals; persist a coverage ledger and concise distilled findings with precise references and limits.
- [ ] Reconcile question designs against evidence; persist family/column/validation coverage and concrete scope.
- [ ] Implement ESP infrastructure and an independently usable vertical slice; verify compatibility before expansion.
- [ ] Complete five Task1 and five Task2 recipes with five variations each, bounded marking, feedback, separate prose review and accessible controls.
- [ ] Run focused and shared tests, validation/build and browser checks; update checkpoint at each working boundary with exact next action.

**Starting state:** earlier documentation edits remain uncommitted; preserve them. Read cached conversions, never repeat unchanged extraction. No subagents authorised. Close reading must distinguish fully examined material from sampled visuals; do not overclaim completion.

**Close-reading increment 1:** reread all three Task1/Task2 scheme guidance/bands; completed SAM/AdSAM later-task textual guidance, all live report commentary through33 and53–66 (remaining code/visual examples still to cover). Read both complete A/E Task2 logs and all nine full table images, plus both Python solutions; matched against commentary. Inspected live Task1 report figures pp7,9–12 and all task1 staff/task tables. Added `docs/esp/assessment-distilled.md`, including new live scheme income/cost label conflict and exemplar expected-result limitations. Broader remaining visual/code reading must not be claimed complete. No application changes yet.

</details>

## 2026-09-27

### Continuing ESP activities and filling puzzle difficulty gaps

Work continued on ESP Task 1 and Task 2 activities and on adding enough puzzles at every challenge level. The teacher clarified that existing good content should be kept and that each family should have at least 25 questions per level. The work updated activity banks, puzzle-generation tools, application modules and the related design and evidence documents. Time-limited sessions left some checks unfinished, so the records distinguish partial progress from the final checks recorded on 28 September.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-27</summary>

## 2026-09-27 — Resume authorised ESP delivery

**Objective:** finish the outstanding review ledger and high-signal references, then implement and verify the agreed Task1/Task2 activities. Existing authorisation persists; no repeated design approval. The working tree is clean at resume, so earlier documentation has been saved externally.

- [x] Reconcile reading completed after the previous checkpoint; finish genuine gaps and record exact coverage, source conflicts and family evidence.
- [x] Implement a compatible fourth ESP bank, coherent recipe selection, accessible multipart controls and separate prose review; test a vertical slice.
- [x] Complete ten recipes × three questions × five variations, with strong validation and all test-log columns; independently verify cases and marking.
- [x] Run appropriate tests, codes/validation/build and browser checks; record working boundaries and remaining classroom limits.

**No repeat work:** all three schemes' text and indicative code/flowchart images were read in the previous conversation; full A/E Task2 logs (nine images) and both Python files read. Later report code pp34–53, flowchart figures pp24–30, evaluation images pp56–64, A/E Task3 flowcharts and Task4a code were also read after the last checkpoint. Task1 report figures pp7,9–12 inspected. Preserve those results; remaining narrow gaps include exemplar workbook complete plan/cost comparison and any unique standalone review images not duplicated in the reports. No application implementation exists yet.

**27 September reading increment:** completed full populated A/E workbook Markdown comparison and live report p20 test-log image. Added `docs/esp/close-reading-ledger.md` with reconciled reading scope, explicit residual visual gaps and newly identified omission of developer costs in BOTH exemplars (E £79,491.50; A £97,261.50). Distillation updated. Do not repeat workbook/cost reading. Next: confirm report p30 second/p31 visuals and standalone evaluation duplicates, then implement original bounded cases; none of the exemplar totals is an automatic answer oracle.

### 27 September — functional ESP bank and integration increment

- [x] Reconciled prior close-reading coverage in `docs/esp/close-reading-ledger.md`; appended cost-model findings to `assessment-distilled.md`. Confirmed report p20, p30 second figure and p31. Standalone E Task4b screenshots all three read; A screenshots pp1–3 including both p3 figures read. **Remaining source image reading:** A Task4b pp4–7 (five images); these have unique binary hashes, so inspect rather than assume duplicates. All related native code/text already read.
- [x] Authored `data/esp.js`: ten coherent recipes, 30 independent multipart question templates, five variations each (150). T1 schedule/capacity/testing, costs/forecast, adaptation, rationale, reconciliation; T2 test selection, expected results, repair/retest, all five log columns, independent investigations. Uses tables, code, numeric/token inputs, choices and separately reviewed prose. No student code execution.
- [x] Integrated fourth bank, ESP individual codes and existing eight-character set format, lazy production asset, task/activity selection, coherent recipe/permutation selection, separate written review controls, local persistence/history display, CSV and JSON backup text. Existing question identities retained; provisional new ESP edits generated revisions12/13. Source files: `js/{bank,bank-data,codes,app,progress,unsent-answers}.js`, `scripts/build-site.mjs`, `css/styles.css`.
- [x] Added `tests/esp.test.js`: codes/recipes/permutations, packed marking and wrong answers, prose excluded from automatic marks, independent Python execution and working-day/accounting checks. Updated production-build expectation to four banks. **Full suite: 120 passed, 0 failed**, including deterministic production builds.
- [x] Diagnosed initial wider-suite failure as default system Python3.9 lacking match/case; rerun uses installed3.13.3. Useful command: `PATH=/Users/joehudson/.pyenv/versions/3.13.3/bin:/opt/homebrew/bin:/usr/bin:/bin /opt/homebrew/bin/node --test tests/*.test.js`. Node is not on non-login default PATH; use `/opt/homebrew/bin/node`.
- [ ] Complete family evidence map and current design status; check every variation for semantic alternatives, hint leakage and coverage omissions. In particular, character validation and flag state should be compared against the accepted design before declaring complete.
- [ ] Add/run focused ESP browser checks (all recipes, written response refresh/save/review, timer, mobile/zoom); complete shared browser smoke already running. Then final validation/build, link/diff checks and checkpoint closure.

**Browser state:** preview server running on127.0.0.1:8765 (session54821); isolated Chrome profile `/private/tmp/starters-esp-chrome`, debug9227 (session28829). Sandbox blocked local server/Chrome/socket access; narrow escalated launches approved. Shared smoke running session50903; log `/private/tmp/esp-browser.log`. Full suite log `/private/tmp/esp-tests.log`; focused log older failure was a test fixture missing `finished`, corrected and full suite passed. Screenshots/temp tools stay outside repo. No commit or deployment performed.

**Exact next actions:** finish five A evaluation images; persist `activity-evidence.md` (source guide currently links this not-yet-created file), reconcile validation coverage, finish focused browser test, inspect screenshots and run final checks. Do not repeat completed source reading, conversion or full test suite absent relevant changes/failures. App currently builds and passes tests; browser verification not yet certified. Timing and per-variation subject approval remain pending classroom/teacher review.

**27 September checkpoint follow-up:** all remaining twelve standalone A/E Task4b review screenshots now inspected (including five outstanding A images); reading ledger updated. Created `docs/esp/activity-evidence.md`: every recipe linked to assessment/exemplar findings, all five log columns mapped, validation coverage and UI refinements explicit. Closed character-restriction and initial-flag practice gaps in slot22 variants0/4; retained whitespace/retry-update practice elsewhere. These are newly authored unpublished content refinements, now bank revision14; four focused tests pass after change. Shared browser smoke **passed** before this content-only refinement. Full suite120-pass remains applicable to unchanged shared integration. Remaining: focused ESP browser checks/visual inspection and final validate/build/link/diff checks; no need to rerun the full suite for these isolated authored-case edits.

**27 September verification boundary:** focused ESP browser checks now pass all50 complete sets (all150 variations), 100% model scoring, saved prose after reload, independent review status, history display, JSON backup restoration and expiry submission with prose preserved and zero unearned automatic marks. Desktop/mobile screenshots inspected; all tested layouts reflow at320px. Fixed two test-only issues (persistent DevTools lexical variable and pagehide overwriting simulated deadline); no application timer defect found. Shared browser smoke passed.112 local documentation links resolve; codes freshness, design-example validator and diff whitespace checks pass. Final small presentation refinement: ESP home card now has plan/test/explain artwork and timing says “Up to”15 minutes. Rebuild and focused navigation check remain before closure; no full-suite rerun needed for this copy/art change.

### 27 September — teacher question: Excel formula practice

**Confirmed gap:** the implemented Task1 bank practises formula results and accounting logic, but has **no dedicated Excel formula-writing/debugging challenges**. Do not describe numeric costing questions as Excel syntax/reference practice. Recommended next authoring scope: SUM over complete cost ranges; SUMIF staff-hour aggregation; hours×rate; relative versus absolute references when filling a forecast; percentage-growth multipliers; annual versus cumulative profit formulas; missing cost rows/ranges. Ground these in the actual workbook formulas (both exemplars' omitted developer-cost totals are especially useful). Keep any new questions within the existing three-question recipe/five-minute-per-question model; make a concrete follow-on plan before implementation. The user's question is answered as a coverage check; no new Excel questions have been claimed or silently added.

**Current working state:** Task1/Task2 implementation, distillations and family map are saved in the working tree. Full suite120 passed; all50 ESP sets passed browser scoring/persistence/backup/timer/mobile; shared smoke passed. Final presentation build passed. Final navigation-only script exercised task/activity/new-set/permutation but failed on a test selector's quoting when returning home; selector corrected, rerun next. This is a test-script failure, not an observed application failure. Exact command: `/opt/homebrew/bin/node scripts/browser-esp.mjs --navigation-only` (local browser/server require the already-approved escalation). No commit/deployment.


**27 September final working boundary:** final navigation-only browser check passed after fixing the test selector: ESP home card, task/activity selection, new set, coordinated permutation, up-to timing and320px layout. All four steps of the current resume plan are complete to the documented review limits. Built `live/` is current. No known failing checks remain; teacher per-variation approval and classroom timing are still pending. No commit/deployment. **Next substantive action:** discuss/plan the identified Excel-formula coverage addition; reuse current evidence and workbook analysis rather than rereading or reconverting sources. Commands/results are recorded above; no need to repeat passing checks without a relevant change.

## 2026-09-27 — Add agreed Task1 Excel formula requirements

**Objective/scope:** user explicitly requests adding Excel formula practice, including “fix the errors in this formula”, to the Task1 design requirements. Documentation only; no activity implementation in this increment.

- [x] Make formula writing/completion and debugging required coverage in `docs/esp/task-1-designs.md`, mapped to costing/forecasting/reconciliation.
- [x] Specify relevant functions, reference errors, independent checks, bounded marking and existing timing limits; reconcile the evidence-map gap status.
- [x] Check documentation diff and record completion/next action. Reuse existing workbook evidence; no reconversion or runtime tests needed.


**Completed:** Task1 design now requires explicit formula writing/completion and formula-error repair, with SUM/SUMIF, rate/unit calculations, copied references, growth and annual/cumulative profit coverage. Added bounded UI/marking contracts, source grounding, worked authoring seeds and independent formula/copy checks; mapped additions to T1.2/T1.5 while preserving three-question sets and five-minute ceiling. Evidence map now records this as an agreed requirement, not merely a suggested gap. Documentation links/section anchor and `git diff --check` verified. No executable files changed or runtime checks repeated. **Next action:** plan/implement the documented formula coverage when requested; current150 variations still do not include dedicated Excel formula questions.

## 2026-09-27 — Time-boxed puzzle difficulty gap fix

**Plan (user limit about one minute):** reuse the saved25September audit; inspect existing untagged Number and measures candidates, make only defensible metadata fixes, validate/build and record remaining gaps. Do not relabel harder puzzles Beginner or claim all28 missing templates can be authored/tested in this time.
- [x] Review and tag appropriate existing mathematical-reasoning tasks for Number and measures.
- [x] Validate model answers/identities and build; record fresh filtered counts and remaining Beginner gaps.


**Completed within the bounded follow-up:** tagged nine existing numerical/counting/rate/measure tasks in `data/puzzles/maths-more.js` as `maths:number` (slots616,617,621,622,623,624,627,631,633). Inspected their generators; question text, answers, hints and difficulty levels unchanged. Number and measures counts now0 Beginner /15 Foundation /5 Standard /4 Stretch. Standard and Stretch are now selectable and both have alternative three-question combinations. Updated the original audit with the change and exact scope.

**Verification:** revision15 identities regenerated, all1106 templates/2390 variations validated with full-credit model answers; Core coverage freshness unchanged/passed; production `live/` rebuilt; explicit filtered Standard/Stretch set-selection checks and `git diff --check` passed. No runtime changes, full-suite/browser rerun, commit or deployment.

**Remaining / exact next action:** seven non-Go/non-maths puzzle families still need genuine Beginner content, and Number and measures needs Beginner content. Plan a separate authoring increment against the saved audit (at least21+3 new templates if using additions alone; prefer four per band for new-set variety). Do not relabel harder puzzles merely to make a selector available. The original one-minute request did not allow safe completion of all these authoring gaps. ESP Excel-formula requirements remain documented but unimplemented. Current site builds and no known checks are failing.

## 2026-09-27 — Teacher clarification: puzzle totals and distribution

**Confirmed target:** approximately100 active question templates per puzzle family/subtype, roughly distributed across the four challenge levels—not100 per level, and not merely the minimum three needed to enable each selector. Current family totals are100 each, with101 Go. The recent maths tag fix changes filtering only, not these totals or difficulty distribution.

**Correction to the previous next action:** do not simply add21+3 templates on top of already-full families. First compare each family's distribution with a roughly balanced four-level allocation (about25 each as a guide, not a quota that overrides difficulty). Review existing genuinely introductory candidates; where new Beginner content is necessary, rebalance the active pool by retiring appropriate surplus templates while preserving historical slots/codes. Never relabel a harder question solely to fill a band. Number and measures is a filter within Classic maths, not another100-question family; balance its coverage within the overall maths pool and maintain useful Algebra coverage.

**Next action:** persist a family-by-family rebalance plan with current/proposed active counts, educational difficulty criteria and replacements; then implement/test bounded increments. All preceding additive-minimum suggestions are superseded by this clarified target. No content changes in this clarification turn.

## 2026-09-27 — Final clarification: minimum coverage, preserve good content

**Supersedes the preceding rebalance/retirement direction:** aim for at least approximately25 active, good-quality question templates at each challenge level in each puzzle family. Preserve good existing questions even where a level already exceeds25; add suitable content to underrepresented levels. Approximately100 per family is therefore a baseline, not a cap. Do not retire good questions just to keep a family at100, or relabel difficulty merely to satisfy counts.

**Exact next action:** use the saved family/band audit to plan additions toward the approximately25-per-level minimum (not merely three to enable selection). Keep existing excess coverage. Review Number and measures/Algebra filter availability within Classic maths alongside this work; the teacher has not specified a separate100-template quota for each maths filter. No content changes or tests in this clarification turn.

## 2026-09-27 — Authorised additions to approximately25 per challenge level

**Objective:** preserve all good existing puzzles and add genuinely appropriate content until each family has at least approximately25 templates per level. Current deficits:25 Beginner in each of seven families; Classic maths13 Beginner and15 Stretch; Go none. Total planned additions203; family totals may exceed100. Inspect Number and measures/Algebra availability as part of maths authoring.

- [ ] Confirm slot capacity and choose a backward-compatible identity approach before using new addresses: current codec allows slots0–1022, while901+203 active puzzles exceed that capacity. Preserve all published slots/codes; never recycle retired identities.
- [ ] Author/check numerical starters and sequence Beginners as a first functional increment; document level criteria and independent answer checks.
- [ ] Add25 genuinely Beginner logic grids/equations/tangrams/paths/Sudoku/cages per family with independent solution checks and appropriate scaffolding.
- [ ] Complete remaining maths Stretch coverage; regenerate inventories/identities, validate/build, run relevant browser checks and checkpoint each boundary.

**Implementation constraints:** use existing controls and cached generators/solvers, explicit hints, meaningful variations and pending teacher calibration. Do not turn a count target into synonymous duplicate templates or relabel existing harder content. Keep completed increments buildable. No delegation authorised. Next inspect actual unused historical slots and existing helper/generator APIs, then implement a bounded increment while recording the upcoming codec capacity change.

**27 September first functional authoring increment completed:** added13 Beginner Number and measures templates ×5 variations (65) in `data/puzzles/maths-beginner.js`, slots985–997, imported in `data/puzzles.js`. Reviewed prompt/hint/answer pairs and removed duplicated/directly supplied assessed points. Independently checked all65 numeric answers with Python arithmetic/unit/statistics calculations. Model marking and production build pass after final editorial changes; puzzle inventory regenerated (914 templates). Existing content preserved. Classic maths now25/26/52/10 across Beginner/Foundation/Standard/Stretch; Number and measures13/15/5/4. Subject approval/timing pending; no new controls or full-suite/browser rerun. No commit/deployment.

**Exact resume point:** remaining190 family-level additions (seven families ×25 Beginner;15 Stretch maths). Historical address audit:122 unused slots before this increment,109 now; all190 cannot fit the current1023-slot per-type codec. Design/test a backwards-compatible extended address format before exceeding capacity; preserve old codes and identities. Current bank and `live/` are functional. The first numerical increment is complete; the overall approximately25-per-level programme remains unfinished. Reuse saved audit, existing generators/solvers and the new level criteria; do not repeat completed ESP reading or this65-variation arithmetic check.

## 2026-09-27 — Agreed54-bit codec and continued puzzle additions

**User-approved format:** nine Base64url characters,54bits =7 version +2 type +3×(12 slot +3 variation). Slots0–4094 usable;4095 unused sentinel. Optional tenth timer character. Supersede old nine-character timed share codes; retain eight-character untimed decoding. Individual textual codes retain their variable-length numeric slot. Preserve stored historical progress where its old format can be identified unambiguously from saved metadata; do not guess ambiguous pasted nine-character strings.

- [ ] Implement/test codec and update sharing, timer, diagnostics and documentation; audit persisted history/active attempts/backup handling for legacy timer format.
- [ ] Verify a working build before expanding slots; then continue remaining190 puzzle additions from the previous plan, retaining good content and approximately25 minimum per level.
- [ ] Independently check new content, update inventories and run relevant browser/shared checks at working boundaries.

**Next:** inspect progress canonicalisation and existing codec/history tests. No subagents authorised; no deployment requested. Earlier one-minute increment is complete; this is the newly approved format-and-content continuation.

### 27 September — codec/content progress and fairness requirement

-54-bit codec implemented (nine/tenth timer), legacy untimed decoding and explicitly marked saved-data migration. Existing120 tests passed before the final migration-route refinement; three new boundary/migration tests pass. Browser check still pending. Documentation updated; format fields use BigInt throughout.
- Generated25 Beginner boards in each of six interactive families, at slots1024–1173. New single-category logic, small sum/difference grids, heavily supplied4×4 Sudoku, short dot paths, four-guide tangrams and3×3 addition cages. All existing boards retained. Generator `scripts/add-beginner-puzzles.py`; generation complete. Independent solver/marking/browser checks pending.
- Drafted25 Beginner sequence templates (1174–1198) and15 numerical maths templates (1199–1213), five variants each. **Do not claim final level coverage yet:** numerical drafts include routine multi-step calculations that need Foundation/Standard classification rather than automatic Stretch labels. Models/editorial review pending.

**User fairness refinement:** review existing as well as new labels; reclassify genuinely misgraded items. Counts must not dictate difficulty. Preserve quality and add genuine Stretch replacements where a reclassification creates a shortfall. Pending work: define/evaluate evidence-based family criteria, classify the numerical drafts fairly, add real Stretch content, independently verify all additions, update code/docs/build and browser tests. The large generation is saved; do not repeat completed tangram generation.

**27 September fairness/content increment:** independent solver validation passed all870 served interactive puzzle variations (including the150 new Beginner boards). All seven Beginner families now authored (25 sequence templates additionally have five variations). Reclassified13 of the15 numerical drafts as Standard: routine multi-step calculation alone is not Stretch. Retained pack optimisation/three-set reasoning as Stretch and added15 distinct harder reasoning templates (1214–1228). Existing Weighing capacity and Reliable majority are reclassified Stretch→Standard after inspecting all generators: their supplied structure substantially reduces inference. Corrected misleading “Optimal adjacent merges” title to “Optimal merges” (prompt already permits any pair). Added two replacement Stretch reasoning families for limited-stock guarantees and box-volume optimisation, preserving minimum coverage. Fixed the draft filtering example so every percentage produces whole record counts. Numerical independent checks, final fairness documentation and browser checks still pending; generated boards need not be rebuilt.

**Teacher reminder — Go:** preserve source problem grading and the agreed mapping (Beginner25k+, Foundation18–24k, Standard12–17k, Stretch11k and stronger). Do not substitute tree depth or generic puzzle heuristics. Existing Go pools26/25/25/25 already meet the target; `data/puzzles.js` continues deriving Go levels from recorded sourceRank/cached rank attribution. No Go problems or grades changed in this work.

**27 September independent checks saved:** all275 new sequence/maths variations pass `scripts/verify-puzzle-additions.py`, using independent Python enumeration, recurrence, combinations and Decimal arithmetic. Interactive validation already passed870 served variations. No Go data changed. Final steps: refresh inventory and identities, enforce25-per-band regression checks, build, run shared tests/browser checks for the codec migration and inspect new high-slot puzzles. Teacher approval and student timing remain pending.

## 2026-09-27 — User-requested stop and handover

**Stopped at the user's explicit request.** Implementation is saved but this codec/puzzle increment is not fully verified. Do not describe it as ready to deploy. No commit or deployment performed.

### Completed and saved

- Implemented the agreed54-bit codec: nine-character set codes, optional tenth timer character,4095 usable question slots per type. Eight-character untimed legacy decoding remains. Old nine-character timed pasted codes are superseded; explicitly old saved progress/backups migrate using format metadata. Changes in `js/codes.js`, `js/progress.js`, `js/app.js`, codec tests and sharing documentation.
- Added150 Beginner interactive boards (25 each: logic grids, equations, Sudoku, paths, tangrams, number constraints),25 Beginner sequence templates with125 variations, and30 numerical maths templates with150 variations. Earlier13 Beginner maths templates with65 variations are also saved. Preserve generated content; especially do not repeat tangram generation.
- Fairness review placed13 new routine applied maths templates at Standard, two at Stretch;15 additional reasoning templates at Stretch. Existing slots621 and632 were moved Stretch→Standard based on supplied scaffolding. Slot633's misleading “adjacent” title was corrected; its prompt already allowed any pair.
- **Go unchanged:** source problem grades govern levels: Beginner25k+, Foundation18–24k, Standard12–17k, Stretch11k and stronger. Existing26/25/25/25 distribution meets target. No tree-depth grading. Corrected the obsolete historical tree-depth statement in `docs/spec-puzzles.md` to make its supersession explicit.
- Latest generated inventory: **1119 puzzle templates**, at least25 per family/level. `data/coverage/puzzle-inventory.json` regenerated27September. Classic maths143; sequences125; six interactive families125 each; Go101. Inventory is the authoritative detailed count.
- Last edits renamed the misleading `data/puzzles/maths-stretch.js` draft to **`data/puzzles/maths-applied.js`** (13 Standard/two Stretch), updated imports and the independent checker, and fixed prompt spacing. Other new files: `maths-reasoning-stretch.js`, `sequences-beginner.js`, `scripts/add-beginner-puzzles.py`, `scripts/verify-puzzle-additions.py`, `tests/extended-codes.test.js`.
- Updated `tests/puzzle-enrichment.test.js` to require25 per level in every family, retaining explicit Go source-rank assertions. Updated current specification total and target in `docs/spec-puzzles.md`.
- **Last command completed:** `node scripts/question-codes.mjs --update` prepared question revision17 after the final authoring edits; no subsequent validation/build/test run before the stop.

### Verification already completed (reuse these results within their limits)

- Existing120 tests passed after the initial codec implementation, before the final migration-route refinement and bank additions. Three new codec boundary/migration tests passed after that refinement.
- Independent interactive solver validation passed all870 served interactive variations, including all150 new boards. No board changes since that pass.
- Independent Python checker passed all275 new sequence/applied/reasoning numerical variations. Subsequent changes were the applied-file rename, prompt spacing and portable Node lookup; rerun the checker once to verify those final edits/imports.
- Earlier13 Beginner maths variations (65) independently checked and that earlier increment validated/built.
- **Not yet verified:** final all-bank validation, full test suite, production build and browser tests for the combined codec/content changes. The current `live/` output predates these final changes and must be rebuilt. Do not infer current source readiness from the earlier live build.

### Exact next actions when resumed

1. Read this entry and relevant diff only. Run `scripts/verify-puzzle-additions.py` once after its rename/import edits. Review final new numerical wording and hints; new questions remain `reviewStatus: pending` for teacher approval/student timing.
2. Finish a concise fairness/coverage completion section in `docs/reviews/2026-09-25-puzzle-level-coverage.md` using the regenerated inventory; its latest narrative still describes the earlier partial increment. Keep historical records rather than overwriting them. Check other current count/code-format documentation for stale claims.
3. Run identity check, bank validation and coverage freshness, then build: `node scripts/question-codes.mjs --check`, `node scripts/validate.js`, `node scripts/coverage.js --check`, `node scripts/build-site.mjs`. Revision17 was already generated; regenerate only if subsequent edits change fingerprints.
4. Run the full tests because codec/progress/sharing changed: `PATH=/Users/joehudson/.pyenv/versions/3.13.3/bin:/opt/homebrew/bin:/usr/bin:/bin /opt/homebrew/bin/node --test tests/*.test.js`. The default Python3.9 is too old for some existing test helpers. Resolve failures and record results.
5. Run shared browser smoke against freshly built `live/`, adapting legacy test assumptions only where the agreed codec changes require it. `scripts/browser-smoke.mjs` already has new nine/tenth-character expectations and codeFormat54 in new backup fixtures. Preview representative new boards/numerical questions, high-slot sharing in an independent browser context and timed progress recovery. ESP navigation/share checks as relevant. Existing isolated preview8765/Chrome9227 may still be running; check rather than duplicate them. Screenshots/logs belong in `/private/tmp`.
6. Record final checks and remaining limits in this checkpoint; mark the codec/content plan complete only when those checks pass. No deployment authorised/requested here.

**Other preserved scope:** dedicated Task1 Excel formula writing/debugging is documented in `docs/esp/task-1-designs.md` but not implemented. Existing ESP Task1/Task2 activity implementation and source research remain saved; do not repeat conversions or close reading. Preserve all pre-existing repository modifications. No further implementation or tests were run after the stop request.

</details>

## 2026-09-28

### ESP activities and puzzle difficulty expansion, completed 26–28 September

Task 1 and Task 2 ESP activities were delivered, while the puzzle collection was expanded to provide at least 25 questions in every challenge band for every family. The final puzzle total was 1,120. Existing good questions were retained even where a band exceeded the minimum.

**Files changed.** The work added or updated ESP banks, `js/app.js`, `js/bank.js`, `js/progress.js`, `js/unsent-answers.js`, beginner puzzle data and generators, inventory checks and tests. It also updated `docs/esp/` and the puzzle-level review. Related commits include `2185d0a` and `3ba5519`.

**Decisions and challenges.** ESP tasks needed to preserve the assessment purpose while fitting short practice sessions. Beginner puzzles needed more guidance and simpler reasoning, not just smaller boards. The ESP design at this stage separated automatic marks from written answers that required review. The later 7 October requirement calls for useful automatic marking for every exam-practice question, so those written-answer formats now need an audit.

**Fixes and checks.** The work improved beginner guidance, independent puzzle validation and warnings before leaving unfinished work. The 28 September records contain the final expansion checks. Teacher difficulty judgement and classroom timing remained separate from technical test success.

### Excel formula activities and Home artwork

Six Excel formula question templates, each with five variations, were added to ESP practice. Their marker could recognise supported equivalent formulas and check how references changed when a formula was copied. The accepted Home artwork was also restored after layout changes.

**Files changed.** The work added `js/excel-answer.js`, Excel and ESP content, and tests. It updated `js/marking.js`, `js/page-status.js`, `js/app.js`, packages, ESP design documents and `css/styles.css`. Related commits were `e86f43b`, `70aa784` and `e4abc81`.

**Decisions and challenges.** Formula checks were deliberately limited to supported syntax and relationships. Unsupported formulas were not presented as fully understood. The maxGraph library was installed for a later flowchart activity, but installing it did not implement the Task 3 editor.

**Fixes and remaining work.** Background graphics were put back in their intended positions, and redundant Home card rules were removed. The detailed records contain formula and browser checks. The Task 3 editor remained planned.

### More question-bank capacity, comparison questions and navigation

The question-code format was extended to support eight banks while keeping existing codes and saved progress usable. Core and ESP remained separate banks within the Exam practice navigation group. New questions also practised comparisons and linked reasoning.

**Files changed.** The work updated `js/codes.js`, `js/bank.js`, `js/progress.js`, question-identity tools, `js/exam-sections.js`, `js/progress-generation.js`, comparison content and tests, and `docs/code-rollover.md`. The main commit was `9189056`; later records contain the completed checks.

**Decisions and challenges.** The new format allocated six bits to the bank version and three to the bank type. Explicit conversion rules distinguished old formats from new ones. Progress also recorded the bank generation so that reusing version numbers later would not confuse old results with new content.

**Fixes and checks.** Theme icons and navigation wording were corrected, and sharing and progress cases were checked. The commit message described work that was still unfinished. Later records report completion with 132 tests, validation, a production build and browser checks for sharing and comparison questions. Search was still planned at this stage.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-28</summary>

## 2026-09-28 — Resume final puzzle/codec verification

Objective: finish the saved slice without repeating completed generation or solution checks. The repository starts clean; prior work has been persisted in its current baseline.
- [x] Review final numerical wording and current coverage/code documentation; document fair difficulty criteria and final counts.
- [x] Rerun numerical checker after its rename, validate identities/bank/coverage, build and run full tests for shared codec/progress changes.
- [x] Verify browser sharing, timers/migration and representative new high-slot puzzles; resolve concrete failures.
- [x] Record results and exact remaining limitations; keep the site build functional. No deployment or ESP formula implementation in this slice.

**28 September checks:** numerical reference checker passes275 variations; identities, bank validation (1324 templates/2880 variations), coverage freshness and production build pass. Full suite now123/123 after removing an obsolete clue-count assertion; exhaustive logic-grid uniqueness remains enforced. Browser checks required canonical nine-character display expectations for legacy links; updated assertions and added ESP to peer-browser sharing. Browser completion pending.

**Final fairness correction plan:** the newly added cumulative doubling task (slot1223) supplies its recurrence and only requires running totals, so classify it Standard. Preserve the question/identity. Add one genuinely Stretch constrained-order counting task at unused slot1229, independently enumerate its five variations, refresh identities/inventory/build and verify. This avoids retaining an inflated difficulty label to satisfy the25 minimum.

**28 September final verification progress:** shared browser smoke passed, including peer-browser sharing for all four types and timer/backup/legacy-code flows. The final fairness correction added slot1229 (five independently enumerated variations) and relabelled1223 Standard; inventory now1120 puzzles, Classic maths144 (25/26/68/25), all families at least25 per level. Independent numerical checker now passes280 variations. Final bank validation1325 templates/2885 variations and production build pass;18 focused puzzle/codec tests pass after the numerical addition. Full123-test pass remains applicable to unchanged shared runtime code.

Focused browser checks exercised13 high-slot puzzles through actual controls, marking, saved-answer reload, reveal,320px and200% zoom. All passed. Legacy timed active work also passed migration/second reload with the same ID, answers and deadline. Test harness corrections: use a full navigation to install a legacy fixture (hash navigation does not reload scripts), and check persisted migration after pagehide/reload, matching the app's existing save lifecycle. No application runtime fix was needed. Screenshots/logs in `/private/tmp/starters-*`; updated review in `docs/reviews/2026-09-25-puzzle-level-coverage.md`.

## 2026-09-28 — Slice complete

The puzzle coverage and54-bit sharing-code slice is complete for local use. All current plan steps above are checked. Earlier unchecked historical plans describe interrupted stages, not remaining implementation. Final ESP navigation check also passed; `git diff --check` passed. The current `live/` build matches source and includes all1120 puzzles. No commit or deployment performed in this session.

**Outcome:** all nine puzzle families have at least25 templates per challenge level; existing good surplus questions retained. Source-graded Go unchanged. Nine-character set codes and optional tenth timer support slots0–4094; legacy untimed links and explicitly old saved data/backup migration verified. See the28September review for counts, fairness criteria and test evidence.

**Remaining limitations, not unfinished checks:** teacher subject approval and measured student timing/hint calibration remain pending. Browser verification used isolated Chrome, not a cross-browser accessibility certification. Dedicated ESP Task1 formula challenges remain documented but unimplemented and were outside this slice. No further puzzle additions, broad reruns or deployment are needed merely to resume; await the next task.

**Clarification to user:**1119 puzzles were already authored at the prior stop. This session primarily completed the previously outstanding whole-slice verification and documentation. The one additional question replaced Stretch coverage after a fairness-driven reclassification; it was not the main workload.

## 2026-09-28 — ESP Excel formula slice and optional design review

Objective: prepare the agreed two Task1 Excel formula sets, using cached assessment/workbook evidence, and present the concrete outline for teacher review before implementation, as agreed in the immediately preceding exchange.
- [x] Read only relevant Task1 requirements, evidence routing and existing activity structure.
- [x] Document two three-question sets (each question ≤5 minutes), meaningful variations, equivalent-formula marking, feedback and independent checks; share for review.
- [ ] Pending outline review: implement the agreed sets, validate/build and run focused checks in a subsequent authorised increment.
- [x] If capacity permits, review saved Task3/Task4a/4b designs and primary documentation for reusable browser flowchart editing; document recommendations without implementation.

**28 September formula outline completed:** `docs/esp/task-1-formula-outline.md` now specifies six independent questions, timing/points, worked spreadsheet cells, five meaningful variation roles, equivalent/copy-aware formula marking and integration checks. Reused cached A/E workbook cell evidence and distilled assessment; no conversions repeated. Verified current Microsoft SUMIF and reference semantics to avoid teaching that unequal SUMIF range sizes necessarily raise an error. The outline is awaiting the teacher's requested pre-implementation review; an asynchronous question is pending while the independent Task3/4 design review continues.

**Buildability constraint reaffirmed:** this increment changes documentation only; tested source and `live/` remain intact. Future implementation must use small validated/buildable boundaries, record exact pending work before approaching a limit, and avoid partially wired runtime features.

**28 September design increment complete, awaiting outline response:** `docs/esp/tasks-3-4-design-review.md` records revised Task3 make/fix/trace flowchart practice, focused Task4a/4b refinements, bounded semantic grading/accessibility requirements and primary-source comparison of draw.io embed, maxGraph and React Flow. Recommend a later two-question maxGraph prototype, not a new custom canvas editor; no package installation/prototype performed. Source-guide links and parent design links updated. Six Task1 outline arithmetic seeds independently checked with Python/Decimal; spreadsheet-engine verification belongs to implementation. Documentation diff checks pass; no runtime/source-bank/build changes in this design increment, so the previously tested working build remains intact without an unnecessary rebuild.

**Exact next action:** read the teacher's response to the pending Task1 outline review. If accepted, plan the smallest complete formula-marking/content increment, preserving buildability; use `task-1-formula-outline.md` instead of repeating workbook/web research. If changes requested, revise the outline first. The preceding offer explicitly put outline review before implementation; no skill-imposed approval barrier. Task3/4 work remains design-only. Current completed scope is the concrete outline plus optional design/tooling review, not implemented formula activities.

## 2026-09-28 — Compare Task3 interactive flowchart options

User redirects the active task to Task3 tooling comparison. Task1 formula implementation remains pending; no pre-implementation outline approval is needed merely for its later student-facing review, but do not resume it during this Task3 comparison.
- [x] Reuse saved tooling research; verify primary documentation for maxGraph and credible alternatives against standard shapes, editing, persistence, accessible interaction and assessment integration.
- [x] Persist a concise comparison and recommend the best bounded prototype for this vanilla-JS/esbuild static site.
- [x] Present choices and material trade-offs. Research/documentation only; preserve the working build without dependency or runtime changes.

**Completed:** expanded comparison saved in `docs/esp/flowchart-editor-comparison.md`, linked from design/source guides. Verified maxGraph conventional primitives/custom stencils and editing/persistence; compared draw.io complete hosted editor, JointJS core versus commercial UI plugins, and React Flow custom shapes/framework/accessibility trade-offs. Recommend a bounded maxGraph make/repair prototype; documentation evidence only, no performance/usability claims from testing. No dependency/runtime/build changes; documentation diff check passed and existing functional site preserved.

**Exact next action:** follow the user's Task3 direction after presenting the comparison; if proceeding, plan a small buildable editor prototype with normal flowchart shapes, saved graph semantics, keyboard edge controls and a make/fix pair. Task1 outline-review gate from the previous entry is superseded by the user's preference to review implemented activities later; Task1 implementation itself is deferred while Task3 is the focus. Do not repeat completed source conversions or library research.

## 2026-09-28 — Implement Task1 formula activities; record Task3 decision

User authorises implementation for evaluation in the starter pages. No further outline approval required.
- [ ] Record maxGraph/vanilla-JS choice, limited standard-shape UI, inspectable marking model and rationale in Task3 plan.
- [ ] Inspect existing marker/renderer/ESP recipe contracts; implement a bounded Excel formula marker with meaningful equivalence/copy tests as a standalone buildable increment.
- [ ] Add six independent questions ×five variations in two formula recipes under Task1, preserving existing slots; wire rendering/marking/selection and regenerate compatibility/build.
- [ ] Verify independent spreadsheet/reference calculations, accepted/wrong formulas, browser scoring/navigation/reload and relevant shared tests. Record direct review codes and limitations.

**Standalone marker boundary:** Task3 maxGraph choice/plan recorded. Added `js/excel-answer.js` and three focused tests; all pass. Parser admits only bounded Excel syntax and reuses the existing exact polynomial comparator, keeping cell inputs symbolic and checking each copy destination. SUMIF uses symbolic match/amount dependencies; unsupported functions/range semantics return a Needs review message. No app wiring yet; existing build remains functional. Added the six-question draft bank in a separate unimported module; next integrate it atomically with renderer/marker/recipe changes, verify all models, then build.

**Scope update — user clarification:** implement the Excel activities directly in the app now, also implement draft Task3 activities, and add a centrally configured per-activity-type “In development” header notice (ESP enabled; exam configurable). No further design approval. Complete Excel integration/build first, then a small maxGraph integration and Task3 draft bank with focused checks. Preserve buildable boundaries; no live deployment requested.
- [ ] Add central page/type development-status configuration and ESP header notice.
- [ ] Implement draft Task3 activities with standard-shape make/fix controls, inspectable marking and existing persistence.

**Excel integration boundary complete:** six questions ×five variations are now imported into ESP as T1.2F and T1.5F (slots30–35). The spreadsheet extract renderer, equivalent/copy-aware marker and review routing are wired. All models validate (1331 total templates/2915 variations), production build succeeds and focused Excel/ESP tests pass. Browser/reference checks still pending. Central `js/page-status.js` enables the header notice for ESP(type3) only; exam(type1), programming and puzzles are disabled. User explicitly reconfirmed ESP-only notice.

## 2026-09-28 — Navigation, theme and question-language review

Objective: place ESP within exam practice, fix card graphic layering, simplify the theme toggle, assess search tags and audit ambiguous synonym choices and reasoning coverage.
- [x] Inspect navigation/style contracts; implement ESP entry within exam practice and compact adaptive theme icon.
- [x] Audit authored question wording across banks; correct concrete awkward synonyms without changing assessed concepts or stable slots; record scope and limitations.
- [x] Inspect tagging and data-structure/computational-thinking choice/reason coverage; document findings and search proposal (no search implementation requested).
- [x] Refresh affected generated data/build, run proportionate validation and focused browser checks; record outcomes and next action.

**Scope clarification:** future Year 2 OS belongs beside Core and ESP within Exam practice. Preserve independent full-capacity banks (4,095 usable slots each), never partition Core's slots or encode section IDs in question-slot bits. Current sharing format has only four bank IDs; OS will require a backward-compatible bank-ID extension before its content is added. This navigation increment will use a section registry, with the codec extension recorded as an explicit OS prerequisite rather than silently claiming a fifth bank already works.


**Completed:** home now has three full-width cards with content over faded background graphics. Exam practice opens registry-driven Core/ESP choices, and activity back links return there. Theme control is a 22px changing moon/sun icon with a 44px keyboard/touch target and persisted preference. Independent banks/codes remain unchanged by navigation. Future OS capacity contract is in `docs/spec-common.md` and `docs/reviews/2026-09-28-navigation-wording-search.md`; the 2-bit bank identifier still requires expansion before a fifth bank can be added.

**Wording/coverage:** targeted vocabulary screen of all rendered banks, followed by contextual review of candidates, corrected nine templates (exam26/43/101/103/117/142/151/152, ESP15). Pre/post rendered-data comparison confirms all answers, alternatives, options, marks, dependencies, coverage, hints and explanations unchanged. Search proposal and precise choice/reason gaps are in the review. No search feature or new questions added. Teacher subject review remains pending; this is not an exhaustive fresh subject approval.

**Verification:** coverage regeneration, compatibility revision18, bank/model validation (1331 templates/2915 variations), production build and32 focused tests passed. Full existing browser smoke passed including peer-browser sharing for all four banks, persistence, scoring and navigation. Final focused browser checks passed at1280/640/320px in both themes, keyboard focus, menu reload and ESP recipes. Visual inspection caught obsolete four-column desktop and90px mobile card rules; both removed, rebuilt and focused checks repeated with an explicit full-card text-width assertion. Final light desktop/dark mobile screenshots inspected. Artefacts remain in `/private/tmp/starters-*`. `git diff --check` passes. No deployment or commit.

**Resolved check harness issues:** pre/post comparison initially distinguished undefined properties from missing JSON properties; normalised both snapshots before comparing. Browser access required approved local server/Chrome commands. One non-login npm call could not find npm; used the absolute Node path for the build. These were tooling issues, not remaining application failures.

**Exact next action:** present the implemented changes and search/coverage discussion. Await direction on keyword search and/or new linked-reason question authoring. OS content/codec implementation is future work; keep its full independent bank capacity requirement. Prior session Task3 drafting is not part of this navigation/wording increment.

## 2026-09-28 — Record agreed rollover policy and finish numbered review

Objective: document the agreed eight-bank/nine-character design and rollover-aware progress policy, then complete the original five-item response using the verified implementation and saved audit.
- [x] Record six version bits/three bank bits, rollover metadata/date fallback, stable topic-level revision evidence and explicit old-code compatibility cutoff; distinguish agreed design from current runtime.
- [x] Reconcile conflicting current specification statements and link the decision from the navigation review.
- [x] Finish items3/5 with concrete tagging/selection recommendations and existing-versus-missing justification coverage; reuse completed items1/2/4 and checks.
- [x] Check documentation diff and record completed work. No search, question expansion or codec implementation inferred from a request to document/discuss.


**Completed:** `docs/code-rollover.md` records the agreed6+3-bit successor layout,64 version values/eight independent banks, generation metadata, latest UTC rollover date, live-versus-tracked version fallback, date limitations, import/export preservation and retained comparable CA/topic evidence. Old shared-code ambiguity after rollover is explicitly accepted. Initial7+2→6+3 layout migration is separately identified as unresolved implementation design; runtime remains unchanged. Reconciled no-rollover and permanent-identity wording in `docs/spec-common.md` / `docs/implementation-plan.md`, linked the decision from the navigation review. Documentation diff check passed; no build/tests repeated for documentation-only work.

**Original numbered list:**1/2 implemented and browser-verified in the preceding entry;4 targeted wording audit and nine-template corrections complete with recorded scope;3 search suitability/design discussion and5 existing/missing choice-reason coverage ready for final response. Search implementation and new question authoring were not requested by those discussion/check questions and are not silently treated as completed features.

**Exact next action:** deliver the five-item findings and documentation link, then follow the user's choice of search implementation or linked-reason content expansion. Do not reopen completed UI checks or implement the new codec merely because its design is now documented.

## 2026-09-28 — Implement eight-bank encoding and reasoning questions

Objective: implement the agreed six-version-bit/three-bank-bit code format and add a few linked choice/reason questions for data structures, computational thinking and specification search algorithms.
- [ ] Inspect codec/history/progress contracts and choose an explicit compatible format transition; implement eight-bank encoding, generation/rollover metadata and necessary persistence protections.
- [ ] Reuse source mapping; author a small grounded batch of new stable-slot questions with two meaningful variations each and linked reasons.
- [ ] Update focused codec/progress/content checks, generated compatibility/coverage and production build; run shared regression checks appropriate to the encoding change.
- [ ] Record exact compatibility behaviour, verification and remaining limits.

**Scope update:** user adds sorting comparisons, naming bubble/quicksort/merge. Current spec CA2.11 lists bubble/insertion/merge, so include insertion as Core and clearly label quicksort extension; do not claim quicksort-specific work as assessable Core coverage. Encoding transition uses published legacy versions<=18 in7+2 and new versions19–63 in6+3 for generation0; after rollover all0–63 use6+3. No ambiguous best-guess decoding.

**Paused mid-implementation, pre checks** must carefully check for incomplete work and finish testing.

## 2026-09-28 — Reconcile README and current status

Objective: update current-facing documentation after the paused implementation was reviewed and tested, without rewriting historical checkpoint records.
- [x] Update README counts, bank revision/code format and implemented ESP scope from generated/current sources.
- [x] Append a minimal current-state clarification distinguishing implemented, planned and pending-review work.
- [x] Confirm the browser-test guidance reflects proportionate checks for minor changes; verify links and documentation diffs. No application changes.

**Current true state:** the clean repository baseline implements bank revision 19, the generation-aware 54-bit six-version-bit/three-bank-bit code format, four lazy banks, 1,120 puzzles, 121 Core exam questions, 63 Python questions and 36 ESP questions. ESP Task 1/2, including the six Excel-formula questions, is implemented. Core comparison/reasoning slots 161–169 are implemented. Task 3 flowchart activities, Tasks 4a/4b, keyword search and Year 2 OS content are planned only; maxGraph is installed and the Task 3 design is recorded, but there is no Task 3 runtime bank, editor integration or test coverage yet.

**Verification after the paused commit:** 132 tests pass; question identities, all 1,340 templates / 2,933 variations and generated coverage validate; all 18 new comparison variations pass focused browser scoring, reload, reveal and 320 px checks; shared browser smoke passes current/legacy sharing, migration, timers, persistence and all four banks. Teacher subject approval and classroom timing remain pending.

**Efficient-check policy:** focused browser scripts are intentionally standalone and selected for the changed surface. Bank-only and minor visual changes use focused checks rather than the full suite. Shared codec, storage, schema, marker, selection or build changes justify broader tests and shared smoke; the revision-19 codec change received those broader checks. README now states this explicitly. Documentation diff checks pass; no application files changed in this clarification.

## 2026-09-28 — Restore home-card artwork presentation

Objective: retain selector-card artwork behind content while surgically restoring its prior opacity and vertical position.
- [x] Compare the current CSS with the immediate pre-layering commit and identify only the artwork opacity/position changes.
- [x] Restore those values without changing card structure, layering or unrelated responsive rules.
- [x] Build and inspect the home cards at desktop/mobile widths; record the exact change and checks.

**Completed:** retained the absolute full-card background layer and `z-index:-1`, removed the added light/dark opacity reductions and restored the three graphics to their measured pre-layering vertical offsets. Desktop rendered positions match within 0.5 px; opacity is `1`. Production build passes with 1,340 templates. Light/dark desktop and 320 px mobile cards were inspected; no card/page overflow or hidden controls. This isolated CSS correction used the documented focused visual check rather than the full suite. Generated `live/` is current; no other application behavior changed.

### Card-art readability follow-up

- [x] Add white/light-theme and black/dark-theme shadows to selector-card paragraph text only.
- [x] Move only the puzzle grid background artwork up 10 px.
- [x] Rebuild and inspect desktop/mobile cards in both themes; record completion.

Paragraph text now uses a 5 px white shadow in light mode and black shadow in dark mode. The puzzle grid top offset is 17 px, exactly 10 px above the prior restored 27 px position; the other graphics are unchanged. Production build, computed-style checks and light/dark desktop plus 320 px inspection pass with no page/card overflow. No full suite was needed for this isolated CSS follow-up.

### Paragraph wrapping around card artwork

- [x] Add per-card floated exclusion shapes inside paragraph text, aligned with the existing artwork bounds.
- [x] Use a small negative inline margin so text intentionally overlaps the exclusion boundary.
- [x] Rebuild and inspect desktop/mobile wrapping in light and dark themes; preserve artwork position and opacity.

Puzzle and exam paragraphs now use rotated `shape-outside` polygons matched to their rendered artwork bounds, with `margin-inline-start:-8px` for the requested slight overlap. The programming artwork ends above its paragraph, so no unnecessary exclusion is added. Shapes apply from 601 px upward with adjusted tablet alignment; at 600 px and below the artwork already ends at the paragraph boundary, so wrapping remains unchanged. Production build and focused 1280/640/320 px checks pass without horizontal overflow; artwork position, opacity and theme shadows are unchanged.

### Simplify responsive home-card layout

- [x] Replace the selector grid with one centered, wrapping flex layout that fits three, two or one card per row.
- [x] Keep one card composition and one artwork size at all breakpoints; allow cards below 340 px only when the viewport requires it and cap them at the current 380 px design.
- [x] Remove obsolete breakpoint-specific card layout/graphic sizing rules, rebuild and inspect representative three/two/one-column widths.

**Completed:** `.activity-grid` is one centered wrapping flex row; cards use `flex:1 1 340px` and `max-width:380px`. The current 380 px card is the canonical design. Three, two or one card fits per row according to available width; cards stay within 340–380 px unless the content area itself is narrower than 340 px. Removed mobile/tablet changes to card padding, typography, artwork dimensions/transforms/offsets and paragraph-shape alignment. Production build passes. Focused checks confirm centered 380 px two-card and one-card layouts, 323/263 px constrained cards at narrow widths, unchanged artwork dimensions and no horizontal overflow. No full suite was needed for this isolated layout change.

### Neutral multiple-choice selection colour

- [x] Audit pre-marking selected-option styles and existing shared colour tokens.
- [x] Define one commented amber selection source of truth and apply it only to unanswered/selected multiple-choice options.
- [x] Preserve marked correct/incorrect feedback colours; rebuild and inspect selected and submitted states.

**Completed:** `css/tokens.css` now owns the commented semantic `--selection-bg`, `--selection-border` and `--selection-text` values, including the dark-theme amber background. Generic multiple-choice options and existing puzzle/challenge pre-marking selections use those tokens; the dark green checked-option override was removed. Correct/incorrect feedback retains its separate green/red palette. Production build passes. Focused browser checks confirm amber selected options in both themes and a submitted 100% answer retains dark-theme green correctness feedback. No full suite was needed for this isolated styling change.

</details>

## 2026-09-29

### Making selected answers readable in dark mode

Selected answers were changed to remain visible in dark mode before marking. Selection continued to have a different appearance from the green and red feedback used for correct and incorrect answers.

**Files changed.** The work updated `css/tokens.css`, `css/styles.css`, `css/puzzles.css`, `css/challenges.css` and the then-current checkpoint. The commit was `b448cd9`.

**Decisions and challenges.** The same colour meaning needed to apply across ordinary questions and puzzles. Planning therefore began for shared colour settings, rather than separate fixes for every control.

**Fixes and later work.** The dark-mode selection highlight was corrected. The eight-theme work that followed replaced the initial palette plan, but retained the distinction between selection and correctness.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-29</summary>

## 2026-09-29 — Plan simple semantic colour theming

Objective: first correct the dark-theme selected tone, then migrate the current visual palette to five centrally defined semantic roles: main tone, accent, selected, correct and incorrect. Planning and risk review precede implementation.
- [ ] Inventory current tokens, hard-coded component colours, theme overrides and state-specific contrast dependencies.
- [ ] Define light/dark role tokens and a bounded mapping from existing UI roles; identify colours that should remain neutral or component-specific.
- [ ] Present migration order, validation scope and risks before implementation. First implementation increment will correct dark selected styling; broader token conversion follows only after the plan is reviewed.

</details>

## 2026-09-30

### Faster local preview and eight adjustable themes

Vite was added so that developers could see CSS changes immediately during local work. The site also gained eight paired light and dark themes, with previews and controls for background lightness, saturation and accent colours.

**Files changed.** The work created `vite.config.js`, `docs/local-development.md` and `scripts/browser-theme.mjs`. It updated packages and the lockfile, `js/theme.js`, `js/app.js`, `index.html`, styles and theming documentation. The commits were `8bacf8b` and `8906225`.

**Decisions and challenges.** Vite was used only for local source preview. The existing production script still built the files in `live/`, including the compressed question banks. Theme controls changed shared colours without recolouring puzzle artwork or altering answers and marks.

**Fixes and checks.** Slider ranges and defaults were adjusted so that the controls had useful room in both directions. Selected and marked answers were checked across themes. Browser and build evidence is recorded below; unrestricted user colour adjustments were not claimed to maintain contrast at every possible setting.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-09-30</summary>

## 2026-09-30 — Investigate theming progress and requirements

Objective: establish the implemented theming baseline and locate the intended approach/features without changing application behaviour.
- [x] Read theming handovers, design/decision documents and relevant source/history.
- [x] Compare the current implementation with the latest five-role migration plan; identify gaps and stale documentation.
- [x] Record findings, verification limits and the exact next action; report relevant references to the user.

Scope: repository investigation and checkpoint update only. Checks: source/history comparison and documentation diff; no build or browser run unless needed to resolve a discrepancy.

**Findings:** the light/dark toggle is implemented in `js/theme.js`, wired by `js/app.js`, with a changing sun/moon icon, `aria-pressed`, and browser-local preference (`dsd-starters-theme`). It defaults to light when no dark preference is stored. Selection background/border/text tokens are centralised in `css/tokens.css` and used by generic choices plus puzzle/challenge controls. Latest commit `b448cd9` (29 September) includes dark selection values and generated assets; its title says the dark highlight was fixed. This is more progress than the unchecked 29 September planning entry alone suggests, but does not establish that the latest requested tone is visually accepted.

**Outstanding:** five-role conversion (main tone, accent, selected, correct, incorrect) is not implemented. Most dark base overrides remain in `css/styles.css:68`; feedback, hover and other component colours remain hard-coded. The 29 September checkpoint is the only located explicit five-role migration brief: inventory first, define light/dark role mapping and exceptions, then present migration order/checks/risks before broader implementation. No completed mapping or dedicated migration design document was found. `docs/style-guide.md` remains explicitly a draft and its initial purple primary palette is not the implemented green palette. `docs/decisions/2026-09-student-experience-and-shared-codes.md#selectable-theme` is the adopted functional requirement: saved local toggle and readable controls, feedback, puzzles and progress in both themes. Style-guide contrast/reflow/keyboard targets remain relevant.

**Verification/limits:** compared source, relevant documentation and Git history; existing smoke/ESP browser scripts contain theme persistence, icon and light/dark layout checks. Did not rerun browser tests or build for this investigation; historical passing checks are not a new visual or contrast certification. Application files unchanged.

**Exact next action:** if implementation is requested, inventory remaining colour declarations and prepare the five-role light/dark token mapping, neutral/component exceptions and focused contrast/state checks for review; first reconcile the already-committed dark selection tone with the intended correction.

## 2026-09-30 — Assess a faster local development workflow

Objective: recommend a local preview workflow before implementation, and preserve the expanded theming scope (configurable page gradients and card borders, including gradient borders).
- [x] Inspect source/production bank routing, dependency imports and commit build behaviour.
- [x] Compare a manual local/prod flag with automatic development serving; record a concrete recommendation and limitations.
- [x] Report findings without implementing the workflow or theme changes.

Checks: inspect existing scripts and relevant official tooling documentation. No production rebuild needed for this assessment.

**Assessment completed:** source `js/bank-data.js` already imports readable banks; `scripts/build-site.mjs` substitutes the encoded lazy loader only for production. `scripts/pre-commit-build.mjs` builds an isolated staged snapshot and stages `live/`; changing a tracked mode flag is unnecessary and would complicate that boundary. A plain static root server is insufficient because browser imports include npm packages (`mathjs`, `fflate`).

**Recommendation (not implemented):** add Vite for local development only, with `npm run dev` serving the authoring entry, resolving dependencies and updating CSS on save; preserve the existing esbuild production build and staged-source hook. No tracked local/prod switch. Source banks remain readable and currently load eagerly; production retains encoded lazy loading. Development skips production packing/validation; keep those checks at production/commit boundaries and verify production behaviour separately. An esbuild watch/serve alternative reuses the existing dependency but still incrementally bundles and requires additional reload plumbing. Official references checked: https://vite.dev/guide/why.html and https://esbuild.github.io/api/#serve .

**Expanded theme scope:** add centrally controlled page/card backgrounds (solid or gradient), card border width/style/colour and optional gradient treatment, radius and shadow, with light/dark definitions and semantic feedback colours kept legible. This is a proposed design scope, not implemented token names or defaults.

**Verification/next action:** source and hook inspection only; no build/test run needed, no runtime edits. Discuss recommendation with user, then implement the selected dev workflow before the theme migration. Validate live CSS/source edits, bank loading/scoring and unchanged encoded production output.

## 2026-09-30 — Implement Vite preview and minimal theme system

Objective: add lightweight source preview with removal instructions, then implement central light/dark semantic colours and decorative settings.
- [x] Add Vite dev command/config and concise use/reversal documentation; retain staged production build.
- [x] Centralise main/accent/selected/correct/incorrect palettes, neutral/partial states and page/card decoration; remove superseded dark overrides.
- [x] Verify source preview, CSS live updates, both themes and selection/feedback contrast; run production build, appropriate tests and production smoke.
- [x] Document theme editing, completed checks and limitations.

Mapping: main = actions/headings; accent = contextual panels/focus; selected = unmarked amber; correct/incorrect = feedback. Neutral surfaces/text/borders and partial/warning remain explicit supporting roles. Puzzle artwork/board geometry colours remain component-specific where meaningful. Decoration uses page background image plus card fill/border image, width/style/radius/shadow with solid defaults. Risks: cascade overrides, gradient fill masking, contrast and source/production differences; check these directly. User has authorised this implementation and the earlier review gate is satisfied by the discussed approach.

**Completed:** pinned Vite 8.3.1 adds only `npm run dev` and a small `vite.config.js` (loopback 5173, strict port, no public directory, dependency scan limited to authoring index). Existing source-bank adapter, production esbuild/encoding and staged-source pre-commit hook are unchanged. `npm start` remains the original production preview. `docs/local-development.md` documents use, separate-origin browser storage, validation boundaries and complete removal without reverting theming. README now defaults to source preview.

**Theming:** `css/tokens.css` now defines light/dark main, accent, selected, correct/incorrect, warning and neutral pairs. Shared CSS consumes tokens instead of a second hard-coded dark cascade. Dark selection uses a dark amber fill/light amber label; feedback remains separate. Page image and shared card fill/border-image/colour/width/style/radius/shadow are centrally editable. Solid defaults; gradient recipe in `docs/theming.md`. Layered card backgrounds support rounded gradient borders; home artwork no longer masks the fill. Selected puzzle controls retain their fill on hover. Code surfaces and meaningful puzzle artwork have explicit exceptions. Updated stale palette guidance in `docs/style-guide.md`.

**Verification:** npm install reported zero vulnerabilities. All 132 tests pass; identities/coverage and 1,340 templates / 2,933 variations validate. Final production build passes and `live/` is regenerated. New `scripts/browser-theme.mjs` passes against Vite and production: both palettes, semantic text contrast >=4.5:1, distinct selected/correct/incorrect states, selected digit styling, gradient borders/radius, 1280/320px reflow, theme persistence and rendering all four banks. Its optional `--hmr` check passed: source token changed/restored with no reload or lost input. Final Vite configuration rechecked. Sampled control/selection/feedback boundaries exceed 3:1 in both themes. Full existing production browser smoke passes encoded lazy loading, scoring/reveal, sharing, progress, timers and puzzle interactions. Light desktop and dark narrow gradient screenshots visually inspected; screenshots remain in `/private/tmp/starters-theme-*.png`. Documentation diff check passes.

**Limits/next action:** this is not a full accessibility audit or certification of arbitrary future gradients. Defaults are deliberately solid; edit documented token values to enable decoration. No commit/deployment. Vite remains available at http://127.0.0.1:5173 and production preview at http://127.0.0.1:8765. User can review the appearance, then adjust only the central tokens. Infrastructure note: network/server/browser commands needed sandbox escalation; shell startup also emitted existing pyenv rehash-lock warnings, avoided for later browser commands with direct Node and non-login shell. These did not prevent successful checks.

## 2026-09-30 — Eight selectable themes and marked-answer colours

Objective: provide four light/four dark themes (blue, rose, apricot, sage), with two gradient themes per mode and rose gradient borders; preserve amber pre-marking and green/red marked answers.
- [x] Add paired palette presets and a persistent accessible theme selector, retaining the light/dark shortcut and old preference.
- [x] Apply outcome colours to marked selections/answer fields; clear stale outcome styling on edits and retry. Partial remains amber.
- [x] Check all eight themes, contrast at gradient extremes, responsive selector, persistence, scoring/retry and live/production behaviour.
- [x] Update concise theme docs, build output and handover with results.

Scope: theme CSS/UI and outcome presentation only; no content, code identities or marking rules change. Existing uncommitted Vite/theme work is retained. Tests: focused theme browser checks, marker/review tests and production build; broaden only for failures or shared-state concerns.

**Selector refinement:** user requests a discreet palette button adjacent to the light/dark button, explicit light/dark names and paired opposite-mode switching with default fallback. Implemented direction: native popover with labelled native select; all four palettes have counterparts, with Sage/Forest as fallback. No changes to answers when switching themes.

### Follow-on plan — Subtle semantic colour mixing

User asks for unmarked/correct/incorrect tones to blend with the palette, e.g. red leaning purple in blue themes.
- [x] Add CSS perceptual mixing of semantic base fills/borders with the active main colour; retain amber/green/red identity and readable text.
- [x] Recheck all eight palettes, gradient/semantic contrast and marking behaviour; update documentation and production assets.

Approach: `color-mix(in oklab, …)` with a smaller theme contribution for amber than correctness feedback; unmixed fallback for unsupported browsers. No changes to marks or outcome logic.

**Implemented so far:** paired Sage/Forest, Blue sky/Midnight blue, Rose/Berry and Apricot/Ember. Blue and Rose pairs have page/card gradients; only Rose/Berry have gradient borders. Discreet palette icon opens a native popover next to the sun/moon shortcut; native select labels include light/dark. Saved palette complements the existing saved mode, with validated fallback and paired toggling. No answer or score changes on theme switches.

**Marking/mixing:** current results annotate the part container so selected options, radio indicators, direct answer fields and interactive selections consume correct/incorrect (partial/review amber) tokens. Edits clear stale outcome attributes and hide stale feedback across re-render; retry starts unmarked. Shared semantic fills/borders mix in the active main colour using OKLab: 6% amber, 10% green, 14% red. Foreground text retains semantic colours. Unsupported CSS mixing falls back to the base colours. `docs/theming.md` covers presets, pairing and mixing controls.

**Checks to date:** eight-theme browser suite passes on Vite and final production: preset gradient counts, text contrast >=4.5:1 including gradient endpoints (CSS colours sampled into sRGB), popover bounds/Escape at 1280/640/320px, paired toggles, saved/invalid-palette fallback, mixed correct/incorrect MCQs and text fields before/after submission, retry and all four banks. Twenty-two focused core/packed-data/review/unsent-answer tests pass. Production build passes (1,340 templates); no bank content/identity changes. Inspected blue light desktop and Berry dark narrow screenshots, including mixed feedback. Full existing production smoke is running; exact next action: collect its result, then finish this handover. Earlier pre-mixing contrast checks are historical; current checks use mixed colours.

**Completed / final handover:** full production browser smoke passed, including encoded bank loading, scoring/reveal, persistence, shared codes, timers and puzzle interactions. All steps in this entry and the mixing follow-on are complete. Source and production previews remain on ports 5173 and 8765. `live/` matches the final implementation; changes are uncommitted and undeployed. No outstanding implementation blocker. Next action is user visual review; any aesthetic adjustments belong in `css/tokens.css`.

**Mixing source of truth:** the final `@supports` block in `css/tokens.css` derives semantic fills/borders from `--selection-base`, `--correct-base`, `--incorrect-base` (and border-base equivalents) plus the active palette's `--main`. It uses variables, not precomputed/hard-coded mixed colours per theme. Only the shared mix proportions are fixed (6/10/14% main). `docs/theming.md` documents editing and fallback; `js/theme.js` owns paired names/preference handling; `js/app.js` supplies visible marking-state attributes. The final browser contrast checks cover all eight palettes with the actual CSS mixes, but are not a full accessibility audit. No further testing is required absent new changes.

## 2026-09-30 — Planned-feature audit and theme preview/tweak controls

Objective: identify genuinely planned but unfinished features, replace the theme dropdown with eight abstract preview buttons, and add saturation plus primary-colour lightness sliders to the popover.
- [x] Reconcile current source with search/ESP/OS and remaining-feature docs; record a concise current backlog without treating historical gaps as current.
- [x] Implement accessible preview tiles and persistent tweak sliders/reset; saturation affects rendered colours, lightness changes dominant backgrounds with gently linked accents (revised by the subsequent user clarification).
- [x] Update focused browser checks for previews, sliders, reload/reset, popover bounds, selection/outcome colours and production build.
- [x] Update theme documentation and final handover; report backlog and completed changes.

Scope: implement only theme controls in this request; search and other backlog items are an investigation. Reuse existing eight-theme/token system and browser tests. Preserve paired mode switching, saved preferences and answer state. Check filter/top-layer behaviour and primary-label contrast before selecting final slider ranges.

**Current clarification / pause boundary:** user suggests 55–96% brightness for light themes and 5–45% for dark themes. Current implementation is a signed −8…+8 OKLCH primary-accent adjustment (headings/buttons), not page brightness. Explained that the proposed ranges fit background lightness better and would break primary foreground contrast if applied directly. Asked whether the slider should target page/card backgrounds or retain the bounded accent adjustment. Do not implement the proposed new range/target until the user answers. Keep already authorised preview/saturation work and backlog audit. Broad background ranges would also need foreground contrast checking before claiming them safe.

**Independent progress:** added `docs/planned-work.md` and README link, reconciling keyword search, ESP3/4, CA3–8/coverage review, OS, CSV import and later Python execution with current source. Preview buttons reuse the actual token blocks via `.theme-swatch`; no duplicated colour map or dependency. Saturation uses one CSS rule for root plus top-layer popovers/dialogs (native top layer bypasses root filters). Source browser tests passed the previews and original ±8 lightness endpoints before the top-layer filter addition; final screenshot/filter/persistence checks and docs/build remain pending.

**Independent check completed while awaiting clarification:** source eight-theme suite passes after the top-layer saturation fix. Pixel inspection of the full 0%-saturation screenshot found maximum RGB channel difference 0, including the open popout; all rendered colours are desaturated. No library or filter workaround beyond the shared root/top-layer rule was required. Updated theme docs for previews/saturation and explicitly marked lightness range/target provisional. No production build yet: resolve the lightness question first, then add final tweak persistence/reset/bounds tests and rebuild once.

**Latest design discussion:** user confirmed the lightness control targets dominant page/card backgrounds and wants accents to track it somewhat for coherence. Background-only wide ranges have foreground-contrast problems. Proposed a single coordinated lightness value: largest background shift, smaller hue-preserving accent shift, contrast-safe foregrounds/feedback. Asked whether to use a narrower tested range (minimal) or the proposed broad ranges with automatic foreground adjustment; this choice remains unresolved. User explicitly requested pausing/discussion if implementation becomes non-minimal, so do not introduce a recolouring/contrast engine without resolving that choice. Current lightness code is still the earlier provisional ±8 primary-accent prototype, NOT the final background-target design. Preview/saturation work and backlog audit are complete at source level, but final persistence tests, correct background/linked-accent implementation, documentation reconciliation and production build remain outstanding. Exact next action: agree range/contrast policy, then replace the provisional slider mapping with the agreed coordinated background/accent mapping and complete focused checks.

## 2026-09-30 — Finish full-range background lightness controls

User resolves the range decision: keep the implementation minimal, expose 55–96% (light) and 5–45% (dark), and leave contrast refinement for their own exploration. This supersedes the earlier pause and safe-range proposal.
- [x] Replace provisional primary slider with absolute background OKLCH lightness, related surface offsets and a gentle shared accent shift; no contrast engine.
- [x] Persist separate light/dark settings, retain global saturation and preview tiles, and implement reset/defaults.
- [x] Check full endpoints, mode changes, persistence/reset, source/production rendering and update documentation/build/checkpoint.

Defaults: 96% light, 20% dark. Related surfaces retain small mode-specific offsets; main/accent colours shift by 20% of the change from the mode default, retaining hue. Shared CSS tokens own these mappings. Test baseline contrast separately from full-range behaviour; do not claim all user-selected settings meet contrast targets.

**Completed — current state supersedes the earlier pause/prototype notes:** full requested ranges are implemented, without a contrast/recolouring engine or new dependency. The lightness slider sets page OKLCH L to 55–96% in light mode and 5–45% in dark mode. Defaults are 96% and 20%. Related surfaces/glow use fixed mode offsets; main/hover/accent track 20% of movement from the mode default. Text and code surfaces remain unchanged. The two mode values persist independently with shared saturation 0–150%; reset restores all defaults. Eight abstract buttons reuse the real CSS palette definitions. Saturation filters the root and independently rendered top-layer popovers/dialogs exactly once.

**Final verification:** focused browser suite passes against Vite and generated production output: eight previews, 1280/640/320px layouts/popover bounds, default contrast, exact full-range endpoints, background and surface movement, 20% linked accent movement, unchanged text/code colours, mode-specific limits, persistence across reload and paired mode switch, reset, global saturation, selected/marked/retry states and all four banks. Production build passes with 1,340 templates and matching identities; `live/` is current. Default preview popout screenshot inspected. `git diff --check` passes. Existing marking/codec/bank logic was not changed; no repeat full unit/smoke run was needed for this focused theme change.

**Documentation and next action:** `docs/theming.md` records tokens/ranges/defaults, persistence and deliberate lack of full-range contrast correction. `docs/planned-work.md` is the reconciled unfinished-feature backlog, linked from README. Source preview remains http://127.0.0.1:5173; production preview http://127.0.0.1:8765. Changes are uncommitted/undeployed. No unresolved implementation work; user will explore full-range appearance and decide any later refinement. Do not narrow ranges or add automatic contrast handling without a new request.

## 2026-09-30 — Make saturation an absolute 0–100% control

User requests efficient, proportionate work: 100% should mean maximum background saturation at the current lightness, not a relative 150% boost to low-chroma presets.
- [x] Use fully saturated HSL background colours at the slider's selected lightness, with the existing global saturation filter reducing them from 100% to 0%. Keep palette hue, surface offsets and gentle accent tracking.
- [x] Change slider/storage bounds to 0–100%, update docs/check expectations, and run one production build plus diff check. No broad browser/unit suite for this bounded CSS/control change.

This changes dominant background lightness from OKLCH L to HSL lightness so 100% saturation has a standard, explicit meaning at each lightness. Very pale colours near white are a gamut/lightness constraint, not an additional saturation cap. Existing full-range contrast exploration remains intentional.

Completed: backgrounds and related surfaces now derive full HSL saturation from the palette main hue; the global filter reduces saturation across the interface. Slider and saved-value bounds are 0–100 (legacy values above 100 clamp on load). Documentation and browser-check expectations now reflect HSL backgrounds and exploratory background contrast.

Verification: production build passed (1340 templates), and `git diff --check` passed. Updated browser checks were not run, as requested to keep verification proportionate. Initial build invocation could not find npm; succeeded with `PATH=/opt/homebrew/bin:$PATH npm run build`. No outstanding implementation steps; next action is user exploration of saturation/lightness in the local preview.

## 2026-09-30 — Give theme defaults adjustment room

Objective: start both controls inside their ranges so colour/lightness can move in either direction.
- [x] Set defaults to saturation 50%, light lightness 90%, dark lightness 20%; align CSS, initial controls and reset.
- [x] Migrate the exact previous saved default combination; preserve other custom settings. Update documentation/check expectations, build once and check the diff. No browser suite.

Completed: defaults/reset and initial HTML/CSS agree at 50% saturation, 90% light-mode lightness and 20% dark-mode lightness. Exact old saved defaults migrate on load; other custom preferences remain. Production build passed (1340 templates), diff check passed; no browser suite run. Next action: reload preview; use Reset adjustments if existing custom settings should also return to these defaults.

## 2026-09-30 — Independent colour controls and palette defaults

- [x] Replace rendered-page saturation filter with relative HSL token adjustments; retain 0–100 saturation and 55–96 / 5–45 lightness ranges.
- [x] Restore palette-derived default background saturation/lightness (Rose 90/92); use per-theme saved overrides and CSS defaults shared with previews. Preserve authored non-background colours at defaults.
- [x] Update docs and focused check expectations; run production build and diff check. Small browser control check deferred at user request to wrap up.

Current state: page-wide saturation filter removed. Relative HSL colour tokens adjust saturation without changing their numerical HSL lightness. Dominant backgrounds use absolute saturation; other authored theme colours scale around their original saturation at palette default. Fixed artwork is no longer globally filtered. Lightness ranges remain 55–96% light / 5–45% dark; saturation remains 0–100%. Accent OKLCH lightness still tracks 20% of background movement. No contrast guard.

Defaults derive from original page backgrounds, with light defaults capped at 94% to leave upward room and Rose explicitly 90% saturation / 92% lightness. Related surfaces retain existing offsets, so the original palette is a starting point, not an exact reconstruction of every old surface. CSS drives defaults and preview swatches. Slider display rounds defaults to whole percentages. Each light/dark palette has separate overrides in `dsd-starters-theme-adjustments`; Reset clears only the current theme. Prior global filter-based tweaks are ignored (different colour mapping), while saved mode/palette remain.

Relevant files: `css/tokens.css` (raw colours, defaults and relative transforms), `css/styles.css` (filter removed), `js/theme.js` (per-theme overrides/defaults), `docs/theming.md` (current behaviour), `scripts/browser-theme.mjs` (updated expectations), generated `live/` output.

Verification: `PATH=/opt/homebrew/bin:$PATH npm run build` passed with 1340 templates; `git diff --check` passed. No browser suite or visual check run for this change. Existing browser script expectations were updated but remain unverified. Perceived brightness may still vary with saturation even though numerical HSL lightness does not. Fixed artwork no longer follows saturation; theme token colours do. Changes remain uncommitted and undeployed.

Next action, only when resumed: inspect Rose at default 90/92 and compare low/high saturation at one fixed low lightness; confirm per-theme persistence/reset. Do not repeat broad suites or add contrast handling without need. User requested wrap-up now.

</details>

## 2026-10-05

### Named profiles, revision priorities and weekly progress

Students gained separate named profiles on a shared browser, named backup restoration, a last-tracked date and weekly progress summaries. Revision priorities used each topic's five most recent qualifying attempts and distinguished missing, old and recent evidence. Red, amber and green indicated the recent score ranges.

**Files changed.** The work created `js/profiles.js`, `js/revision.js`, `js/weekly-progress.js`, `js/practice-time.js`, `docs/spec-progress.md` and related tests and browser checks. It updated `js/progress.js`, `js/app.js`, styles and developer documentation. The commits were `624ac74` and `4debacc`.

**Decisions and challenges.** Old results and each profile's work had to remain intact. Weekly averages gave each completed set equal weight. Practice time stopped accumulating when the page was hidden or the student was inactive; the five-second check avoided doing repeated storage work for every mouse movement. JSON backups were used for restoration, while CSV remained a spreadsheet export. Revision recommendations were kept as a saved batch of three sets.

**Fixes and checks.** Marks shared across subtopics were divided correctly, and assisted-only attempts no longer displaced independent evidence. Backup files were validated before switching profiles. Focused tests, browser checks and builds covered these changes. The user reviewed the final highlight colours; earlier colour checks were not treated as proof of every later adjustment.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-10-05</summary>

## 2026-10-05 — Feedback surfaces, revision priorities and named progress

Objective: blend feedback with selectable surfaces; retain dated topic/subtopic outcomes per named local profile; colour priorities and automatically maintain three recommended exam revision sets.
- [x] Inspect existing tokens, storage, progress aggregation, recommendations and UI.
- [x] Implement surface blending, dated records, RAG/missing/stale priorities and persistent recommendation batches.
- [x] Add local username selection, close-match confirmation, profile isolation and named JSON import/export; preserve legacy records.
- [x] Run relevant unit/browser checks and production build; record outcomes and limitations.
Scope: local profiles are convenience only, with no authentication. Missing evidence ranks first, scored weaknesses second, stale evidence third. Stale means more than 15 days since latest practice. Preserve existing unrelated work.
Next action: inspect progress and application code before implementing.


Completed: semantic feedback fills/borders now mix with `--surface` rather than `--main`. Local named profiles isolate active activity, history, repeat-attempt dates and recommendation batches. The first profile inherits unnamed legacy progress; the original save remains intact. Case/spacing normalisation reuses exact names; bounded edit-distance suggestions require explicit confirmation. Header supports switching profiles. JSON backup embeds the username and rejects restoring into a differently named profile with instructions to switch first. Older unnamed backups remain supported.

Progress review: existing attempt timestamps and `partScores` already retain topic/subtopic attribution and first/final results. History now exposes per-attempt subtopic first-response scores. No invented backfill for legacy aggregate-only records. Priorities use the latest five eligible independent attempts for each area, splitting shared marks across references, excluding assisted-only visits, and using exact unrounded thresholds (<45, <65, otherwise green). More than 15 days is stale; no independent evidence is missing. Labels accompany grey/RAG/icy styles. Displayed whole percentages truncate to avoid rounding below-threshold evidence into the next colour band.

Recommendations appear above the full priority list. Three distinct eligible exam sets persist until completed, then show the requested encouragement and generate another batch. Ordering is missing evidence, fresh results ascending, then stale evidence. Selection uses complete profile history, independent of display filters, and honours the four-hour repeat rule. Progress now loads exam/programming banks for the available-area inventory. README and theming documentation updated.

Relevant files: `js/profiles.js`, `js/revision.js`, `js/app.js`, `css/tokens.css`, `css/styles.css`, `tests/profiles-revision.test.js`, `scripts/browser-profiles.mjs`; regenerated `live/`.

Verification: all 16 initial targeted profile/revision/subtopic/repeat tests passed (the existing all-variation subtopic check takes about four minutes including module setup). After refining shared-subtopic weighting, 10 profile/revision/repeat tests passed, including a new regression for assisted-only visits and fractional shared marks. Production build passed with 1340 templates; compatibility records unchanged. Focused production browser checks pass for first-use modal, fuzzy confirmation, switching, profile isolation, reload persistence, genuine set submissions, three-set batch renewal, named export, dated subtopic evidence, stale display and 390px layout; no browser exceptions. No full unrelated bank test suite was run. Browser artefacts stay under `/private/tmp`.

Final next action: record final backup round-trip/browser result and diff check, then hand back for user review. No deployment or commit requested; local preview is http://127.0.0.1:8765. Local profiles are intentionally not secure accounts. Aggregate-only historical results cannot supply subtopic evidence. Existing four-hour tracking policy remains in force.

Final verification complete: the expanded production browser check also passed a named JSON backup restore round-trip (three duplicate records correctly skipped), after the shared-subtopic weighting fix. Final `git diff --check` passed. Implementation complete, uncommitted and undeployed; next action is user review of the local preview.

## 2026-10-05 — Document progress rules and improve profile restore / weekly feedback

Objective: faithfully document the updated progress specification; automatically switch to the username in a restored backup; show the last tracked date in the header; add weekly activity and average-score trends.
- [x] Inspect current progress documentation, import/profile lifecycle and test coverage.
- [x] Implement validated automatic named-backup profile switching with feedback, last tracked date and weekly statistics/chart.
- [x] Document exact behaviours, calculations, migration and limitations in the project specification.
- [x] Run focused unit/browser checks, build static output and record results.
Scope: preserve existing named profiles and reject invalid backups before switching or merging. Weekly figures use tracked completions, Monday–Sunday local calendar weeks, with clear labels and accessible chart data.
Next action: inspect existing progress specifications and restore logic.


Completed: `docs/spec-progress.md` is the adopted detailed progress/profile specification. It records exact dated evidence, profile matching/migration, last tracked dates, RAG thresholds and missing/stale annotations, independent per-area latest-five windows, shared-mark attribution, recommendation ordering/batch renewal, weekly metrics, named JSON restore and known backlog. The common spec links to it instead of retaining superseded parent-window/limited-evidence/manual-restore rules; docs index, README and style guide are aligned. Historic checkpoint entries remain unchanged as history.

Named restores now validate/merge against the backup’s target profile without mutation, then activate the merged target and update the remembered username. Existing case/spacing-equivalent names are reused; new exact backup names create profiles; fuzzy backup matching is not automatic. A persistent on-page status and toast explain the switch and restored/duplicate counts. Invalid backups do not switch/create profiles. The outgoing profile remains intact. Header last-tracked date/time uses the latest tracked completion across that profile’s whole history, with an explicit no-records label, and refreshes on selection, submission and restore.

Weekly section: selected-history filters apply; Monday–Sunday local calendar weeks; current-week tracked sets, equal-weight average final percentage per set, practice days; eight-week chart and equivalent table including minutes; comparison with the previous week when both have records. No-data weeks differ from 0%; current week is labelled incomplete; future records excluded. Unit checks cover Monday boundaries, UK daylight-saving change (169-hour week), empty/zero/future records, equal weighting and last tracked dates. Implementation in `js/weekly-progress.js`, `js/app.js`, `js/profiles.js`, shared CSS; tests in `tests/weekly-progress.test.js` and expanded `scripts/browser-profiles.mjs`.

Verification: 13 focused weekly/profile/revision/repeat-attempt tests passed. Production build passed with 1340 templates and unchanged bank compatibility records. Production browser checks passed existing/new-profile automatic restore, same-profile duplicate restore, invalid-backup isolation, header dates, reload persistence, weekly stats/filtering, recommendation completion/renewal and mobile layout; no browser exceptions. Desktop (1280px) and mobile (390px) weekly screenshots inspected; temporary artefacts at `/private/tmp/starters-weekly-{desktop,mobile}.png`. No full unrelated bank suite repeated. Final diff check passed.

Current next action: user review at http://127.0.0.1:8765. No required work remains for this request; changes are uncommitted and undeployed. The older 5 October manual profile-switch requirement is superseded by this completed entry and `docs/spec-progress.md`.

## 2026-10-05 — Idle-aware practice time and named text backups

Objective: record estimated engaged practice time, pausing after over one minute of inactivity, and export restorable JSON in `tlevel-practice-[username]-[datestring].txt` files.
- [x] Inspect activity timing, resume/submission lifecycle and existing export/import tests.
- [x] Implement persistent idle-aware practice timing without changing countdown deadlines; update export filenames and .txt restore support.
- [x] Document timing semantics, compatibility and filename format; run focused tests, browser checks and production build.
Scope: meaningful interaction resumes timing; reading/thinking without input can be undercounted. Preserve historical elapsed seconds and label the timing basis. Visible countdowns continue by deadline. Use a filename-safe username and local date/time string.
Next action: inspect start, submit, tick and persistence handlers.

Latest clarification: use 120 seconds (not 60) before pausing, and count any mouse movement, clicks/taps or scroll anywhere on the page while the activity is open; keyboard input also continues to count. Updated implementation/docs/tests accordingly. Recommended `.json` as the format-matching backup extension; a filename preference question is pending while timing work continues. Keep .txt until the user chooses otherwise. During focused testing, fixed a clock-accounting edge case so extending a countdown cannot retroactively add previously excluded time.

Resolved filename choice: user selects `.json` (recommended). Final backup name is `tlevel-practice-[filename-safe username]-YYYY-MM-DD-HHMMSS.json`, using local export date/time. JSON-formatted .txt imports remain accepted. This supersedes the original .txt output request and pending question above.


Completed with latest user choices: 120-second inactivity threshold; any mouse/pointer movement, clicks/taps, scrolling/touch movement or keyboard interaction across the open practice page resumes/renews measurement. Hidden documents, leaving the activity, profile switches and unload pause it immediately. Accumulated practice time persists separately from countdown/wall-clock time; loaded profile checkpoints never charge the offline gap. Visible timer deadlines continue running and submission caps measurement at the deadline. New `engagedSeconds` and `practiceMeasuredFrom` fields are stored with results and exported in JSON/CSV; old elapsed fields remain intact. Result/history/overall/weekly durations prefer engaged seconds and label older elapsed records. No engagement backfill for older completed work; older unfinished work begins measurement when displayed.

Backup download is `tlevel-practice-[filename-safe username]-YYYY-MM-DD-HHMMSS.json` using local date/time; username inside JSON remains unchanged. Restore accepts JSON and JSON-formatted TXT and validates optional engaged-time fields. README, progress specification and shared timing specification document the 120-second policy, raw/engaged time distinction and filenames. No pause-state ticker was added: measurement remains hidden, with its policy explained on My progress.

Verification: 18 focused timing/weekly/profile/revision/repeat tests passed. Production browser checks passed 120-second idle capping, mouse/click/scroll/keyboard renewal, hidden/reload gap exclusion, unchanged countdown deadline, engaged-time submission, final JSON filename and existing named-profile/recommendation/restore flows, with no browser exceptions. Browser scenario advances its isolated clock; no multi-minute idle wait. Production build passed with 1340 templates. One initial clock test exposed post-deadline accounting; the fixed implementation marks deadline-capped clocks inactive and retains the latest accounted timestamp. Final small profile-load hardening additionally marks loaded clocks paused; rerun focused profile/timing checks and rebuild before handoff.

Remaining limitation: interaction is only a proxy for engagement; quiet reading/thinking longer than two minutes is undercounted. Abrupt browser termination can lose up to the latest 15-second checkpoint interval. Normal reloads preserve recorded accumulation. Next action: final focused checks/build/diff check, then user review; no deployment or commit requested.

Final checks complete: all 10 focused timing/profile tests passed after profile-load hardening; final production rebuild (1340 templates) and `git diff --check` passed. Required work is complete. Next action is user review of the local preview; changes remain uncommitted and undeployed.

## 2026-10-05 — Flag-and-poll inactivity tracking

Objective: replace per-interaction clock settlement with a lightweight activity flag, consumed every five seconds to renew a two-minute expiry. Resume paused practice measurement immediately on interaction; start when the first question is displayed. Keep countdown deadlines independent.
- [x] Inspect existing practice clock and browser tests.
- [x] Implement flag/poll lifecycle, migrate active clock checkpoints and update exact documentation.
- [x] Run focused clock/browser checks, rebuild and record outcomes.
Next action: inspect practice-time module and activity lifecycle integration.


Completed: page interactions now set IV; once pending, repeated mouse/pointer/click/scroll/keyboard events return without DOM queries, Date reads, clock settlement, storage writes or timer renewal. A single five-second interval consumes IV and renews the timestamp expiry by 120 seconds. Paused measurement resumes immediately on interaction. Initial display of Q1 starts measurement; ordinary rerendering alone cannot revive an idle clock. Settlement still caps at expiry/deadline so callback delays cannot add unlimited absence. Hiding/leaving/profile loading clears pending flags, and older clock checkpoints migrate their lastActivity-based expiry without losing measured totals. Countdown deadlines and JSON export conventions remain unchanged.

Documentation: `docs/spec-progress.md` now states the exact IV/IT polling mechanism, ordinary 120–125-second inactivity window, fast event path, timestamp-based expiry and delayed-callback handling; README aligned. This supersedes the earlier per-event renewal mechanism, not the general policy of recording continuous engaged practice with idle pauses.

Verification: 12 focused timing/profile tests passed, including bursts of thousands of events, five-second flag consumption, immediate resume, delayed polls, pause flag clearing and old clock migration. Production build passed (1340 templates), complete focused profile/progress/timing browser regression passed with no browser exceptions, and `git diff --check` passed. Browser simulated idle/background/reload intervals still record the expected engaged duration. No unrelated whole-bank suite repeated.

Current next action: user review at http://127.0.0.1:8765. All requested work is complete, uncommitted and undeployed. The previous implementation updated timestamps rather than recreating timers per event; this change specifically reduces per-event processing and adopts the requested flag/poll timing semantics.

## 2026-10-05 — Weekly minutes and priority colour verification

- [x] Add current/previous-week practice minutes to the weekly card and document the display.
- [x] Verify missing, red, amber, green and stale rules; remove the missing-state grey tint.
- [x] Build and check the affected browser view/styles and focused statistics tests.
Next action: inspect weekly markup and shared priority CSS.


Completed: weekly card now displays minutes practised this week and last week, using existing filtered calendar-week totals and engaged-time/legacy fallback. Five stat tiles wrap responsively. Missing-data CSS was a cool grey (#e5e7eb), not the green state; replaced fill/text/border with neutral greys (#e6e6e6/#333/#888) to remove colour tint. RAG classes still reuse question feedback tokens; stale rows retain icy blue cross-line texture and annotation. Priority thresholds remain <45 red, >=45/<65 amber, >=65 green; missing overrides absence, stale overrides scored evidence older than 15 days.

Verification: eight weekly/profile/revision unit tests passed, including threshold and stale boundaries. Production build passed (1340 templates), final diff check passed. Isolated browser fixture verified 5 current-week minutes and 7 prior-week minutes, exact rgb(230,230,230) missing fill across all eight palettes, distinct RAG fills and stale texture; no browser exceptions. Desktop 1280px and mobile 390px screenshots inspected, with no horizontal overflow. Temporary check/script/screenshots are under /private/tmp/browser-weekly-colours.mjs and /private/tmp/starters-weekly-colours-*.png; no student profile was modified (dedicated test browser only). Documentation updated in docs/spec-progress.md. No unrelated full browser/bank suite repeated.

Next action: user reloads http://127.0.0.1:8765 to inspect. Implementation complete, uncommitted and undeployed.

## 2026-10-05 — Clarify progress export controls

- [x] Prioritise Save backup and Restore backup; reveal secondary CSV export through a small labelled disclosure.
- [x] Explain backup versus spreadsheet use, update documentation, build and check the affected UI.
Next action: update progress toolbar while preserving export/import handlers.


Completed: Save backup and Restore backup use primary styling and appear before the smaller native “Spreadsheet options” disclosure. CSV is initially hidden; opening the disclosure explains spreadsheet viewing versus restoring progress. Backup actions also carry a concise preservation/transfer explanation. Handlers, filenames and data formats are unchanged. The disclosure supports touch and native keyboard activation, without requiring a prior download. Documentation updated in docs/spec-progress.md.

Verification: production build passed (1340 templates). Focused isolated browser check passed initial CSV invisibility, primary backup styling, Space-key disclosure activation, backup/CSV download names and contents, restore-file-picker handler and desktop/mobile bounds. Inspected screenshots at /private/tmp/starters-backup-controls-{1280,390}.png. Initial Enter-only CDP key dispatch did not activate the disclosure; Space activation passed using native behaviour. Widened the desktop control group slightly after inspection to keep both primary buttons together. No data/marking tests repeated for this presentation-only change. Final rebuild/diff check pending; next action: finish those and user reloads preview.

Final production rebuild and diff check passed. No required work remains. Next action: user review at http://127.0.0.1:8765; changes remain uncommitted and undeployed.

## 2026-10-05 — Clarify and refine percentage averages

- [x] Use exact per-set earned/available percentages for overall/weekly averages, rounding only the displayed mean.
- [x] Make percentage labels explicit in cards, weekly chart/table and specification.
- [x] Check mixed-maxima and rounding cases; rebuild static output.
Finding: current implementation already averages saved percentages and displays %, but saved percentages are rounded first. Preserve equal weighting per set and improve precision; no marks pooling.


Completed: shared averageSetPercentage calculates each set’s earned/max × 100 before taking an equal-weight mean; only the display is rounded. Legacy percentage-only values remain supported. Overall and weekly cards now say “Average final percentage”; weekly chart/table labels explicitly say percentage and explain normalisation. Specification includes the 1/2 + 9/10 → 70% example. Existing saved records are unchanged.

Verification: all four weekly-statistics tests passed, including unequal maxima (70%, not pooled 83%) and a double-rounding regression (2/3 plus 1/2 displays 58%, not 59%). Production build passed (1340 templates) and diff check passed. No browser suite repeated for this arithmetic/label change. Next action: user reloads local preview; complete, uncommitted and undeployed.

## 2026-10-05 — Blend missing-data grey with the default surface

- [x] Apply a subtle default-surface mix to missing-data grey, with a neutral fallback.
- [x] Update colour documentation; build and check the CSS change.
Scope: use the same surface-based mixing approach as semantic feedback, with a small 5% surface contribution. Perceived neutrality remains theme/context dependent.


Completed: missing-data fill and border use shared --missing-bg/--missing-border tokens with 95% neutral grey and 5% --surface mixed in OKLab; plain grey fallback retained. No main-accent blend or extra separator added. Progress/theming documentation updated.

Verification: production build (1340 templates), diff check and focused isolated browser check passed. Verified colour-mix output across all eight palettes, distinct RAG colours, unchanged icy texture, desktop/mobile bounds; desktop Rose screenshot inspected. Perceived neutrality remains contextual and requires user judgement. Next action: user refreshes local preview to judge the subtle tint; no outstanding implementation work. Uncommitted/undeployed.

## 2026-10-05 — Increase missing-data surface blend

Plan: change missing-data fill/border to 90% grey and 10% surface; update docs and rebuild local preview. User explicitly requests no testing; visual review belongs to the user.
Completed: fill/border now mix 90% grey with 10% surface. Documentation aligned and production preview rebuilt. No tests or browser checks run, as requested. Next action: user refreshes preview and judges colour.

## 2026-10-05 — Mix missing-data grey with the dominant theme colour

Plan: retain 90% grey, replace its 10% surface contribution with the main theme colour for fill and border only; align docs and rebuild. User will test; no tests or browser checks.
Completed: missing-data fill and border now mix 90% grey with 10% --main. RAG highlights continue to mix with --surface. Documentation aligned; local production preview rebuilt. No tests/browser checks run as requested. Next action: user refreshes and evaluates appearance.

## 2026-10-05 — Theme-blend progress RAG and icy highlights

Plan: apply 90% semantic colour / 10% dominant theme colour to progress-only RAG fills/borders and icy fill/texture/border, retaining shared question-option surface blends. Update docs and rebuild preview. Preserve user's preference to do visual testing themselves; no test/browser runs.
Completed: progress RAG fill/border tokens and stale icy fill/border/texture-line tokens now mix 90% semantic base with 10% --main in OKLab. Text colours, icy geometry, priority rules and question-option surface blends are unchanged. Unmixed fallbacks retained. Documentation aligned and preview rebuilt (1340 templates). No tests or browser checks run, respecting the user's ongoing visual-testing preference. Next action: user refreshes local preview; complete, uncommitted and undeployed.

## 2026-10-05 — Session continuation handover

Plan: reconcile current progress/theme specifications and development guidance, remove stale current instructions, and record implemented state, verification limits and the next action. Documentation-only task; no tests or browser checks.

### Current handover — read this before earlier experiments

**Repository state:** current HEAD observed as `624ac74` (`updated tracking features. added username linked tracking.`). Before this documentation handover, only this new checkpoint entry was modified: the implemented app and generated live build had been committed. Earlier “uncommitted” statements describe the state at their date and are not current. This handover itself changes documentation only; no commit or deployment performed. Remote deployment status was not checked.

**Settled behaviour:**
- Local named profiles, case/spacing reuse and explicit close-spelling confirmation; first profile inherits unnamed history. Header identifies username and last tracked completion. Valid named JSON restores automatically switch/merge into the named profile; invalid imports do not switch. No secure login/cloud sync.
- Dated set/part evidence preserves initial/final results and topic/subtopic attribution. Aggregate-only historical records remain intact without invented subtopic data. Four-hour eligibility policy remains.
- Priorities: missing first, fresh scored results weakest first, stale last; <45 red, >=45/<65 amber, >=65 green. Missing data is grey with the requested annotation; >15 days old is icy with the requested annotation. Three Core recommendation codes persist until all completed, then encouragement and another three; recommendation selection ignores display filters.
- Weekly UI: Monday–Sunday calendar weeks, set count, average final percentage, practice days, this-week/last-week minutes, eight-week chart/table. Compute per-set earned/max percentages before averaging equally; round only display. Priority scores instead use independent first-response marks and shared-part attribution.
- Timing: Q1 display starts a two-minute expiry. Page mouse/pointer/click/tap/scroll/keyboard events set IV and immediately resume if paused; repeated events use a fast return path. One five-second poll consumes IV and renews expiry. Keep this scheme: the proposed two-minute-only flag check was rejected because it could wait nearly four minutes. Hidden/away time is excluded; visible countdown remains deadline-based. Engaged seconds are stored separately from retained elapsed fields.
- Export: Save backup and Restore backup are primary. CSV is hidden under a smaller Spreadsheet options disclosure and is for spreadsheet viewing. Main backup filename is `tlevel-practice-[filename-safe username]-YYYY-MM-DD-HHMMSS.json` (not .txt). Both JSON and JSON-formatted TXT restore are accepted.
- Final colours: progress missing grey, RAG fills/borders and icy fill/border/texture lines mix **90% semantic base + 10% --main** in OKLab. User approved the missing-grey dominant-colour approach and requested the same for progress RAG/ice. Question-option RAG remains mixed with **--surface** (amber 94%, green 90%, red 86% semantic base). Text colours and icy geometry were not changed. Earlier pure-grey, 95/5 and surface-mixed progress proposals are superseded.

**Documentation:** `docs/spec-progress.md` is authoritative for the adopted progress requirements; `docs/theming.md` specifies both blend systems. `docs/spec-common.md` links the updated rules. This handover updates README summaries, `docs/planned-work.md`, the stage-3 status note in `docs/implementation-plan.md`, and the module/command guide in `docs/local-development.md`.

**Verification and limits:** focused functional tests/browser flows passed in earlier entries (profiles/restoration, scoring boundaries, recommendation renewal, weekly stats, engaged-time lifecycle). Four weekly tests passed after exact-percentage averaging. Every final colour iteration rebuilt production successfully (1340 templates), but the last 90/10 surface → dominant-theme grey and subsequent progress RAG/ice changes were **not tested**, at the user’s explicit request. Do not claim prior screenshots prove final colours. No full unrelated bank suite or new checks were run for this documentation-only handover. No outstanding known functional failure; final colour perception remains the user’s review.

**Next action:** wait for the user’s next request or visual feedback. If resuming the preview, check http://127.0.0.1:8765 before starting another server. If stopped, serve `live/` using the command in `docs/local-development.md`; rebuild only after runtime/source changes. Do not automatically run colour/browser tests, deploy, commit, clear user storage or resume an older superseded experiment. Inspect Git state anew in the next session. Known backlog remains CSV import, last-export-date display, confirmed history reset and the separately recorded content/search/ESP/OS work; none is implicitly authorised as the next task.

Handover complete. No application code or generated build changed in this documentation pass.

## 2026-10-05 — Simplify distracting Python examples

Objective: review Python examples against the Core specification and remove incidental unfamiliar machinery (especially the array module) while preserving assessed concepts and stable question identities. Topic search remains the subsequent proposed slice.
- [x] Check relevant specification/SAM evidence and inventory examples across programming and Core banks.
- [x] Review all affected variations and simplify unnecessary complexity, retaining required distinctions and algorithms.
- [x] Independently execute affected reference examples and check marking; regenerate coverage/compatibility, validate and build.
- [x] Record reviewed scope, findings, limitations and exact next action.
Scope: content-only refinements, including prompts, hints and explanations; no new execution/runtime features. Teacher approval remains pending.
Next action: inspect arrays/data structures specification and bank authoring patterns.

User steering: retain question IDs when the gist remains the same; update these replacement exercises in place rather than retiring them. Also wrap long displayed code so completing multiple blanks does not require horizontal scrolling, and document embedded code answer fields as near-future work. Extend this plan to inspect the code renderer/CSS, format authored snippets, and run a focused layout check if presentation changes. Existing content runtime remains bounded text marking; embedded fields are documentation only for this slice.

2026-10-06 continuation: source review covers all 63 programming templates (five variations each), plus Python snippets/theory in Core CA2. Revisions retain all original slots and variation positions, following the user's clarification. Earlier plan to retire/replace slots 34/35/54 was superseded before completion; no extra slots or retired tasks remain. Library-free replacements live in data/python-readable.js (same slots 34, 35, 54). Array-index repairs remain 55/56. SAM Paper 1 Q15(a), Figure 11 explicitly uses list literals described as arrays; CA2.3 and Appendix 2 do not demand array-module syntax. Q12(b–d) and Q15(a) marking calibrate bounded completion, tracing and array operations.

Implemented: ordinary lists for array examples; general array/list theory without library/type-code trivia; ordinary file operations instead of StringIO/seek/tell tasks; direct data-type questions instead of __name__; explicit swap and merge steps; manageable quarter-valued division outputs; missing inclusive bounds supplied; stale tuple assistance corrected; unused style-question outputs removed; extension topics visibly labelled. All code remains <=12 noncomment lines. Long print calls use valid parenthesised line breaks; .code-panel also soft-wraps for narrow/high-zoom views. Near-term embedded code-input plan recorded in docs/spec-python.md and docs/planned-work.md, without implementing that renderer change.

Checks so far: focused readability execution/marking/identity checks pass; existing exam-depth checks pass; coverage unchanged (341 direct, 28 practice-only elements; 289 with >=2 direct questions). Coverage/compatibility validation and production build passed (1340 templates). Focused isolated browser check passed nine questions at 1280/390/320px and 640px with doubled text, without code/page horizontal overflow or browser exceptions. Screenshots /private/tmp/python-code-{1280,320}.png. Broader reference-program test still running; investigate before recording final outcome. Tiny final hint/accepted-index refinement needs final compatibility regeneration/build. Next action: finish reference check, regenerate final compatibility/build, inspect diff, record handoff. No commit/deployment requested.


Completed 2026-10-06: all four plan steps complete. Final six focused tests passed, including execution of revised snippets with actual temporary file fixtures, boundary/error cases, marking alternatives and contradictions, and stable identities. All 210 offline Python references executed successfully with exact prediction-count checks (not a truncating zip); 165 variations with formatting-only program changes retain identical Python syntax trees. The existing expanded-banks test wrapper remained silent/running and was interrupted; its Python reference check was run directly against data/python.js instead, avoiding the unrelated full-bank setup. Do not report that interrupted wrapper as passed. Existing exam-depth tests passed independently and in the final focused run. Tests/expanded-banks.test.js now supports temporary file fixtures and directly named type questions for future runs.

Final compatibility revision 21 and production build passed; every bank model answer validates, counts remain 1340 templates / 2933 variations / 46 focuses. No new question IDs, variation positions, or retired entries; coverage counts unchanged. Intermediate local revision 20 is retained in compatibility history. Final browser repeat passed after mobile padding adjustment; desktop and 320px screenshots inspected. At narrow widths long lines soft-wrap while preserving source whitespace; no horizontal scrolling is required. Embedded fields remain planned only. Final git diff --check passed. No full unrelated bank/browser suite, deployment or commit performed. Teacher approval and mixed-ability classroom timing remain pending.

Current next action: user reviews http://127.0.0.1:8765 (live/ preview server started for this session). This requested slice is complete. Subsequent choices are the documented embedded-answer-field renderer slice or the previously agreed topic search; neither was implemented as part of this pass. Reuse /private/tmp/check-python-references.py, /private/tmp/python-references-payload.json, /private/tmp/python-final-focused.log and /private/tmp/browser-python-readable.mjs when relevant; regenerate the temporary payload from current data/python.js before reusing it after content changes.

</details>

## 2026-10-06

### Dialog dismissal, About page and responsive layout

Dialogs could be dismissed by clicking their backdrop where cancellation was allowed. An About page was added using the site's normal navigation. Home cards and the header were adjusted to remain readable as the window narrowed.

**Files changed.** The work created `js/dialog.js` and `scripts/browser-header.mjs`. It updated `index.html`, `js/app.js`, `js/issue-report.js`, `css/styles.css`, browser checks and the layout and common specifications. The commits were `f3906db` and `3b5f7cb`.

**Decisions and challenges.** A drag starting inside a dialog and ending outside it must not dismiss the dialog. The required first profile prompt also had to remain different from a cancellable dialog. The header was kept on one row at widths of at least 1024 pixels. The Home code-entry card was given a minimum width of 295 pixels, with reduced page padding on very narrow screens.

**Fixes and checks.** The work corrected a header that wrapped too early, unequal or wrapped activity buttons, excessive gaps and an awkward profile layout around 600 pixels. Focused browser checks covered header widths and overflow. The final change to the 295-pixel minimum was built but was not followed by another browser run.

### Clearer Python examples and question search

Python examples were simplified so that incidental library syntax did not distract from the skill being practised. A shared “Code or key term” field was also added to search relevant questions across banks while continuing to open exact question-set codes.

**Files changed.** The work updated Python data files, relevant Core questions, `js/app.js`, `css/styles.css`, `scripts/build-site.mjs` and specifications. It added `data/python-readable.js`, `js/search.js`, search metadata and index tools, and focused tests. The commit was `f3906db`.

**Decisions and challenges.** Existing question identifiers were retained. Examples used ordinary lists, simple file operations and direct questions about data types, with code wrapping on narrow screens. Search matched the topics and skills a question actually assesses, using specified alternative terms. It did not search answers or assume that every word in a prompt was an assessed topic. Valid codes took precedence over text search, and saved activity and selection rules still applied.

**Fixes and checks.** Stale hints, missing inclusive bounds and overcomplicated examples were corrected. Six focused checks and 210 offline Python reference programs passed. The structure of 165 programs was unchanged by formatting-only edits. A broader test process was interrupted and was not reported as passing. The requested queue of search results remained planned.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-10-06</summary>

## 2026-10-06 — Compact activity heading and set summary

Objective: save vertical space by replacing the separate activity back link with linked breadcrumbs and moving question count/marks/estimated time into the existing set-code card row.
- [x] Inspect activity heading, navigation routes and responsive card layout.
- [x] Implement linked breadcrumbs and inline set summary; preserve timer/copy behaviour and accessible wrapping.
- [x] Build, check affected layout/navigation at desktop and mobile, and record results.
Scope: presentation/navigation only; preserve existing uncommitted Python review work. Next action: inspect activity markup and relevant CSS.


Completed: activity pages now use linked breadcrumb segments (parent activity landing page and current set, with aria-current) instead of a separate back link. Question count, marks/points and estimated duration moved into the set-code toolbar as a margin-free flexible inline item. Desktop retains one toolbar row; narrow layouts wrap accessibly. Existing copy/timer handlers and navigation protection are unchanged. Other pages without this activity breadcrumb retain their navigation.

Verification: production build (1340 templates) and git diff --check passed. Focused isolated browser check passed breadcrumb targets, keyboard order and parent navigation; summary location; one-row desktop toolbar at 1100/1280px; no page overflow at 390/320px; copy-code/copy-link and start/stop timer controls. Desktop and mobile screenshots inspected at /private/tmp/compact-toolbar-{1280,390}.png. Initial temporary test-script quoting/selector mistakes were corrected before the successful run; no application failure found. No unrelated bank tests repeated. Relevant changes: js/app.js and css/styles.css, rebuilt live/. All earlier Python edits preserved.

Next action: user reloads http://127.0.0.1:8765 to review. Task complete, uncommitted and undeployed.

## 2026-10-06 — Document compact layout and implement key-term search

Objective: document the approved compact activity header/toolbar, then implement section-scoped key-term search using canonical topics, specification references, titles and assessed skills, preserving complete question/variation/mark constraints.
- [x] Read recorded search design and current selection/navigation/data APIs; document adopted layout.
- [x] Implement search metadata/matching and accessible search results, integrating valid set generation and focus/subtopic constraints.
- [x] Check relevant matching/selection behaviour and browser flows; regenerate/build as required.
- [x] Record implementation, verification, limitations and next action.
Scope: never search answers/distractors as topic evidence. Reuse existing search review and cached metadata; preserve previous uncommitted changes. Next action: read search review and shared UI specification.

## 2026-10-06 — Search placement, shared Home input and proposed results queue

User steering: place an activity search bar in the unused left side of the top global code-entry strip. Make Home's main code field dual-purpose (set code or key term), with same-size help text “or enter key term to search for”. User proposes working through every matching question in batches, with a smaller final batch, and asks how this differs from current matching/filler sets.
- [ ] Implement the independent search-placement and Home dual-input changes; retain code diagnostics and accessible labels.
- [ ] Resolve batch-size/topic-boundary preferences (async questions sent), then implement authorised queue changes with sharing/progress compatibility.
- [ ] Run relevant UI/selection/code/progress checks, build, and document results.
Current explanation: current search builds ordinary constrained starter sets with explicit related fill; requested queue should contain all matches once, no filler, and allow smaller final sets. Pending preferences: programming 2 versus 3; keep topics/ESP recipes together versus mixing. Do not treat elapsed time as approval for changes to shared-code/progress rules. Independent next action: inspect global and Home code-entry forms.


Initial key-term search implementation completed before the subsequent queue request. Files: js/search.js, data/search-{topics,keywords}.js, scripts/search-index.mjs, js/app.js, shared CSS, and tests/search.test.js. Compact layout documented in docs/spec-common.md and docs/style-guide.md. Search behaviour/development notes are in README.md, docs/spec-common.md, docs/planned-work.md and docs/local-development.md. Ten focused search/bank-loader tests passed; validation and production builds passed, retaining bank revision 21 and unchanged content counts. Production browser checks passed all four banks, exact/related set disclosures, constrained alternatives/permutations, unsaved-answer cancellation, reload, profile isolation, shared-code reopening without inherited search context, no-result/empty input, 320/390px and doubled-text layout; screenshots inspected. One temporary browser test initially expected profile switching to resume directly rather than return Home; corrected test reopened the saved activity and passed. No application issue was found there.

Independent placement refinement implemented: top-strip activity search at left, direct code entry at right; dual-purpose Home field with requested help text; valid codes win, normal terms/references search all banks, ambiguous invalid code-looking values retain diagnostics plus a search fallback. Search form remains visible if leaving an activity is cancelled. Production build passed. Expanded browser check underway for new entry points/layout. Queue implementation remains pending the two user choices; do not infer approval of mixed-topic batches or a programming batch-size change.

Placement verification complete: expanded scripts/browser-search.mjs passed Home term → all-bank results, Home valid code → exact set, invalid code-looking entry → diagnostics/search fallback, visible activity-strip search prefilled with the active query, leave-cancel visibility, and desktop/mobile page bounds, alongside all original search flows. Desktop/mobile strip screenshots at /private/tmp/starters-search-strip-{1280,390}.png inspected. git diff --check passed. No queue changes implemented yet. Next action: obtain the pending choices (programming 2 versus all banks 3; same-topic/recipe groups versus mixed-topic fill), then plan the queue/codec/progress change using those answers. Preview remains http://127.0.0.1:8765. Uncommitted and undeployed.

## 2026-10-06 — Global question search and cross-bank CA metadata

Objective: all search entry points search every implemented question bank; use “Search all questions” helper text; map terms to CA topic metadata so appropriately tagged programming questions appear with Core results.
- [x] Inspect tag granularity and current search matching/entry points.
- [x] Implement global entry behaviour and accurate CA-term matching across banks, distinguishing broad from precise evidence.
- [x] Run targeted search/UI checks, build and document semantics and limitations.
Queue batching preferences remain unresolved and outside this independent change. Next action: inspect programming CA tags against inventory topics before choosing mapping rules.

## 2026-10-06 — One shared code/search field

User refinement supersedes the separate activity search placement: preserve header whitespace by making the existing global code field dual-purpose too.
- [x] Share Home/global code-or-term submission behaviour and remove the separate activity search field.
- [x] Verify global results and CA term matching, code opening, responsive layout and navigation protection.
- [x] Update documentation, build and record outcomes.
Next action: extract the existing Home submission handler for reuse by both entry points.


Completed both refinements: every search entry point searches all four banks; programming CA tags match curriculum reference descriptions, without expanding a broad tag into every child concept. Core retains exact part-level coverage matching. Both Home and the global code field use one code-or-term handler, preserve code diagnostics/search fallback and leave protection. Removed the separate activity search field; desktop left-side whitespace is restored. Helper reads “Search all questions”. Shared specification and planned-work status updated. Search changes do not change question identities or progress attribution.

Verification: 11 search/bank-loader tests passed; production build passed (1340 templates); git diff --check passed. Updated isolated browser suite passed global results, Core/programming matches for “data type conversion”, Home and global exact-code opening, diagnostic fallback, search persistence, navigation cancellation, all four banks, and mobile/doubled-text bounds. Desktop/mobile strip screenshots inspected. A temporary Python edit command had a quoting error and made no changes; corrected before the successful browser run.

Next action: review the shared field in the preview at http://127.0.0.1:8765. Queue batching and mixed-topic progress attribution remain the next implementation discussion; current results still use disclosed matching/related starter sets. All work remains uncommitted and undeployed.

## 2026-10-06 — Search decisions and rationale audit

Objective: faithfully document the user's search decisions, their rationale, implementation status and genuinely outstanding design details.
- [x] Compare conversation decisions with existing search specifications and planning notes.
- [x] Correct stale or overly tentative statements; record rationale and progress-tracking implications without inventing agreement.
- [x] Check documentation consistency and record exact next action.
Next action: read current search specification, planned work and original design review.


Completed: docs/spec-common.md now records each search choice, rationale, provenance and implementation status, plus the queue/progress implications. README and planned-work distinguish implemented discovery from the unimplemented queue; the September review links to the superseding decisions. Corrected the previous handover's misleading claim that batch size awaited a user answer: the user requested three, with a smaller remainder. Earlier checkpoint entries are historical; this correction is current. Cross-topic relevance is directed; mixed-bank playable batches and scoring policies were not explicitly approved. Same-focus related fill remains an interim implementation, not the final requested experience.

Verification: compared the record with conversation wording, current search implementation, js/progress.js attribution/validation/repeat identity, and js/weekly-progress.js averaging. git diff --check passed. Documentation only; no application build or browser rerun needed. No new runtime behaviour claimed. Next action: implement the requested queue after resolving concrete bank/recipe composition and progress compatibility as described in docs/spec-common.md; do not re-ask whether the requested default batch size is three.

## 2026-10-06 — Dismiss modals by clicking outside

Objective: allow clicking visible space outside a modal to dismiss it, matching its existing close/cancel action.
- [x] Inspect modal creation, cancellation and backdrop handling.
- [x] Add consistent outside-click dismissal without treating clicks inside as dismissal or approving pending actions.
- [x] Verify representative modal flows and build; document outcome.
Next action: locate native dialogs and custom modal implementations.


Completed: shared js/dialog.js helper routes a full primary-pointer backdrop click through the cancel event. Applied to all four native-dialog creation sites: profile, leave-warning, copy fallback and issue report. Inside clicks/padding and drags beginning inside do not dismiss. Leave-warning dismissal selects Keep working through its existing cancel handler. Initial required profile entry retains its existing non-cancellable policy (no close button); switching profiles is cancellable. Documented in docs/style-guide.md.

Verification: production build and git diff --check passed. Isolated Chromium browser checks passed real backdrop dismissal for profile switching, leave-warning (answers retained), report and clipboard-fallback dialogs; inside-padding click and inside-to-outside drag kept the profile modal open. Existing search/code/profile/responsive suite also passed. No new question data or progress semantics. Next action: user reviews modal interaction in preview; changes remain uncommitted and undeployed.

## 2026-10-06 — About page

Objective: add a footer-linked About page with concise motivation, current roadmap, author credit and acknowledgement of extensive agentic development with expert human input.
- [x] Inspect SPA routes, footer and current roadmap.
- [x] Implement accessible About page and footer navigation with concise accurate copy.
- [x] Build and check navigation/layout; record results.
Next action: inspect route dispatch and footer markup.


Completed: footer About link opens #about with motivation for short varied practice, concise planned search/Python/Core/ESP/OS developments, Joe Hudson credit and explicit acknowledgement of extensive agentic development combined with expert human input. Briefly explains agentic development in plain language. Uses existing SPA navigation and leave guard; no activity bank download required by the page. Documented in docs/spec-common.md.

Verification: production build (1340 templates) and git diff --check passed. Isolated Chromium checks passed footer navigation, author/acknowledgement text, direct route after reload, return Home, and no horizontal overflow at 1280/390/320px. Existing browser suite also passed. Next action: review About via the preview footer. Uncommitted and undeployed.

## 2026-10-06 — Home card and wrapped bullet spacing

Objective (corrected by user): keep the Home code-entry card at least 270px wide, stacking the hero before it would shrink below that width, and reduce excessive vertical spacing when the introductory bullet points wrap.
- [x] Inspect responsive hero/card and meta-row rules.
- [x] Adjust intrinsic sizing and wrapped-row spacing.
- [x] Build and verify narrow layouts; record results.
Next action: inspect relevant CSS breakpoints.

## 2026-10-06 — Uniform Home activity buttons

Objective: preserve the Exam practice button's single-line dimensions across all three Let’s go buttons using existing site CSS. UI library migration (Tailwind, DaisyUI, Bits UI) is later work.
- [x] Prevent button shrinking/wrapping and allow surrounding card-footer content to reflow.
- [x] Verify equal button dimensions and no overflow across responsive widths alongside the pending hero fixes.
- [x] Build and document both layout fixes.
Next action: inspect card-footer overrides and apply shared sizing.


Completed both Home layout fixes in existing CSS: hero reserves a 270px minimum code-entry column and stacks at 650px; bullet labels keep their horizontal spacing but use zero added row gap. All Let’s go buttons retain identical single-line intrinsic dimensions without flex shrinking; optional search links occupy their own footer row. Style guide updated; later Tailwind/DaisyUI/Bits UI migration recorded in planned-work without adding dependencies.

Verification: production build and git diff --check passed. Isolated browser checks verified card width >=270px, zero extra bullet row gap, equal widths/heights and nowrap on all three activity buttons, and no page overflow at 1280/850/700/650/600/390/320px. Existing navigation/search/modal suite also passed. Next action: user reviews Home in preview. Uncommitted and undeployed.

## 2026-10-06 — Compact wrapped profile header

Objective: keep Last tracked inline with Welcome back when the profile section wraps below the main header, and reduce the Home content's top gap by about 20px.
- [x] Adjust existing responsive profile and Home spacing rules.
- [x] Build and check the focused CSS changes; document results without repeating unrelated suites.
Next action: inspect profile/header breakpoints and Home top spacing.


Completed: profile details use a wrapping flex row, with greeting and switch action grouped. At <=1200px the section has its own header row; Last tracked sits alongside where space permits, wrapping naturally on phones. Home-only top padding reduced by 20px. Documented in style guide.
Verification: build and diff whitespace check passed. Focused scripts/browser-header.mjs passed 1440/1100/1000/850/600/390/320px checks, including inline details at 1000/850/600, 28px/12px Home padding and no overflow. First check exposed the 600px partial-row case, corrected with explicit profile row breakpoint; a repeat used the old page, fixed by fresh navigation. No unrelated browser suites repeated. Next action: user reviews header in preview. Uncommitted and undeployed.

## 2026-10-06 — Restore header down to 1024px

Objective: correct the premature 1200px wrap introduced last turn; preserve a single header row at >=1024px, with tracking beneath the greeting, and inline profile details below that breakpoint.
- [x] Adjust header sizing/breakpoint without reverting the Home spacing fix.
- [x] Build and run focused checks at and around 1024px; update documentation.
Next action: inspect header sizing rules and remove premature wrapping.


Completed: removed the premature 1200px profile-row breakpoint. Header stays on one row at >=1024px, with tracking beneath the greeting; compact horizontal spacing between 1024–1200px retains all controls. Below 1024px the profile occupies its own row with inline details where space allows. Home spacing fix retained. Style guide corrected.
Verification: build and git diff --check passed. Focused browser checks passed at 1440/1280/1200/1100/1024/1023/1000/850/600/390/320px, explicitly asserting one-row header without overlapping controls at >=1024px, tracking beneath greeting, inline profile below breakpoint, no overflow and retained Home padding. No full suite rerun. Next action: user reviews corrected header. Uncommitted and undeployed.

## 2026-10-06 — Home code-entry minimum 295px

Objective: update the requested Home card minimum from 270px to 295px.
- [x] Update hero constraints and narrow-screen padding so the card fits at 320px.
- [x] Build, check CSS consistency and record results.
Next action: replace the existing 270px Home sizing constraints.


Completed: both hero grid constraints and the code-entry minimum now use 295px. Home horizontal padding reduces to 12px below 337px, leaving 296px at a 320px viewport. Updated style guide and existing browser assertion to 295px. Production build and git diff --check passed; browser suite not rerun for this sizing-only adjustment. Next action: review Home in preview. Uncommitted and undeployed.

</details>

## 2026-10-07

### Consolidating agent guidance and reviewing refactor readiness

Detailed product requirements were moved from `AGENTS.md` into the relevant specialist documents. At that point AGENTS was reduced from 168 to 56 lines. A separate review assessed the proposed framework refactor against the existing application, saved data, build process and tests.

**Files changed.** The work updated `AGENTS.md`, the documentation index and specialist specifications, authoring and style guidance. It created `docs/reviews/2026-10-07-refactor-readiness.md` and `docs/decisions/2026-10-agent-guidance-consolidation.md`, and linked the supplied code policies and refactoring brief.

**Decisions and challenges.** The move accounted for all 65 original content blocks: 49 stayed verbatim, four received minimal edits, and 12 superseded passages retained their original wording in the decision record. Unresolved proposals were not silently adopted. The refactor review recommended gradual migration, with clear responsibility for rendering, saved state and production builds.

**Checks and open issue.** Forty-three focused tests and the commit-build test passed. The production build completed, but `tests/production-build.test.js:31` failed because it rejected all files under `data/`, including two search metadata files that the application intentionally imports. That test still needs correction. No application refactor was implemented.

### Raising the Python question target and planning extended responses

The Python bank was checked and found to contain 63 distinct question templates across 20 primary practice focuses, with five variations each. The teacher then raised the target from three to six templates per focus. Selection already had six; the other 19 focuses needed 57 additional templates in total, with at least 285 additional variations.

**Files changed.** The work updated `docs/spec-python.md`, `docs/spec-exam.md`, `docs/planned-work.md`, `docs/README.md` and the consolidation record. It created `docs/extended-response-plan.md` and the source notes and cached extracts in `references/core-extended-response/`.

**Decisions and challenges.** The extended-response plan proposed editable cards for a point, its explanation and its significance in the scenario. Evaluate questions would also require a supported judgement; discuss questions would use their own scaffold. The design used both specimen papers and selected actual 2026 questions and mark schemes. Its main challenge was useful automatic marking without an LLM.

**Checks and remaining work.** Seventy-six documentation links, four source-file checksums and 14 cached PDF pages were checked. No questions or application code were changed. The validator still enforced the former three-template minimum; raising it was included in the expansion task. The following entry records the stronger automatic-marking requirement.

### Separating development records and requiring automatic exam marking

A concise development log was created because recent work was difficult to find in the long checkpoint file. The teacher also clarified that every exam-practice question must provide useful automatic marking; teacher marking of a student's work is optional.

**Files changed.** The work created `dev_log.md` and updated `AGENTS.md`, `README.md`, `checkpoint.md`, the documentation index, shared and exam specifications, ESP design notes, the extended-response plan and planned work. It followed the new Documentation section in `docs/CODE_STYLE.md`.

**Decisions and challenges.** The first log was newest-first, and the checkpoint still held detailed history. That arrangement was replaced by the chronological log and current-only checkpoint described in the later entry. For exam practice, unrecognised wording needed an automatically marked clarification or guided retry, with any help recorded separately from independent work.

**Fixes and remaining work.** Navigation links made the recent records easier to find. A separate task was added to audit Core and ESP questions whose substantive written answers still required manual review. The requirement and plan changed, but no application marking was implemented in this work.

<details>
<summary>Detailed historical plans, handovers and verification — 2026-10-07</summary>

## 2026-10-07 — Repository guidance and refactor readiness review

Objective: link code comment/style guidance from AGENTS.md, assess splitting its detailed requirements into linked documents, and review T_LEVEL_REFACTOR_AGENT_GUIDE.md against the actual repository.
Scope: documentation updates and evidence-based readiness assessment; do not implement the application refactor or restructure AGENTS.md wholesale.
- [x] Inspect documentation, refactor guide, application structure and existing verification coverage.
- [x] Add the requested code-guidance links and record actionable documentation/refactor findings.
- [x] Run appropriate baseline checks and validate documentation changes; record limitations and next action.
Initial state: T_LEVEL_REFACTOR_AGENT_GUIDE.md, docs/CODE_COMMENTS.md and docs/CODE_STYLE.md are existing untracked user files; preserve their contents.
Next action: read the guide, documentation index and engineering guidance, then inspect the implementation and tests they reference.


Completed: linked docs/CODE_STYLE.md and docs/CODE_COMMENTS.md from AGENTS.md, added development/index/refactor review routing, and indexed the new guidance. Detailed findings and a proposed migration sequence are in docs/reviews/2026-10-07-refactor-readiness.md. Recommend consolidating root product requirements into existing specialist documents; no wholesale split or application refactor performed. Supplied untracked guide/policies preserved unchanged.

Verification: 43/43 focused Node tests passed (code-compatibility, extended-codes, eight-bank-codes, profiles-revision, repeat-progress, practice-time, bank-loader, search). Staged-source hook test passed. Production build completed with unchanged tracked live/ output, but production-build.test.js:31 failed because its blanket data/ exclusion rejects intentional search-keywords.js and search-topics.js metadata imports; later deterministic rebuild assertions were not reached. Logs: /private/tmp/starters-refactor-baseline.log and /private/tmp/starters-refactor-build.log. Added documentation links resolve and git diff --check passed. No fresh browser/visual checks or package compatibility research performed.

Exact next action if migration is requested: reconcile the production-test metadata allowlist and rerun `PATH=/opt/homebrew/bin:$PATH node --test tests/production-build.test.js`; consolidate stale root requirements using the review mapping; discuss Vite/Svelte versus SvelteKit under CODE_STYLE.md before implementation; then capture the browser/persistence baseline. Review is complete; migration and deployment remain unstarted.

## 2026-10-07 — Consolidate root agent guidance

Objective: shorten AGENTS.md by routing detailed requirements to their existing specialist owners without losing original intent; resolve only clearly stale content.
Scope: documentation consolidation only. Pause for user clarification on ambiguous requirement status/value, and stop for review once consolidation is verified.
- [x] Map every root requirement to existing specialist guidance and identify conflicts or omissions.
- [x] Consolidate confirmed requirements and shorten AGENTS.md; retain traceability of superseded proposals.
- [x] Verify requirement preservation and local links; record changes and stop for user review.
Next action: compare AGENTS.md with current specialist specifications and recorded decisions before editing requirements.

Consolidation mapping completed at section level: puzzle mechanics/sources/Go -> spec-puzzles; Core marks, command words, source scope and coverage -> spec-exam + exam-resource-map; Python formats/length/style/coverage/variation minima -> spec-python; variation learning intent, reproducible identities, bank separation, codes/navigation/timing -> spec-common; local history/charts/filtering/backups/OneDrive/revision exclusion -> spec-progress; accessible colourful SPA and language -> style-guide; library reuse and readable implementation -> CODE_STYLE; audience, checkpoint/cache instructions and task routing stay in AGENTS.md.

Clearly superseded content: six/seven-character code proposals -> adopted nine/ten format; content hashes/nearest-match/catalogue proposals -> permanent identity and explicit compatibility; one Core question per element -> recorded teacher requirement for two distinct questions; CSV restore -> adopted JSON restore, with CSV import explicitly deferred; resetting hidden practice time with countdown -> adopted independent engaged-time measurement; optional Go -> implemented rank-banded bank with retained rules link. Preserve historical rationale in a consolidation record, not active instructions. Keep broader Python function-writing ambition as deferred delivery, not deleted scope. Preserve original varied scenario/value/code/answer intent, novice-to-moderate/high audience, real-world/spec connections where practical, and concise terminology explicitly where specialist guidance is incomplete.

Clarification required before changing the Python coverage wording: AGENTS.md requires three distinct templates for each question focus; docs/spec-python.md labels restricting this minimum to selectable primary focuses (with other tags searchable secondary tags) as a Proposal. No explicit adoption record was found in the reviewed guidance/checkpoint matches. Ask whether that restriction is accepted or whether the minimum should extend to every listed topic tag. Do not silently promote the proposal or weaken the original minimum.

Paused at user's requested ambiguity gate. No consolidation edits made yet; only this checkpoint entry was added during this follow-on task. Exact next action: obtain the focus-minimum decision, then preserve requirement-level traceability while editing the specialist docs and root routing; check local links/diff and stop for review. Other draft proposals should retain their labels; do not globally declare draft specifications adopted.

User steering: retain existing wording wherever possible to avoid dilution or loss of resolution when moving requirements. Resume consolidation by preserving the original Python minimum verbatim and retaining the specialist primary-focus restriction as an unadopted proposal; no decision to narrow the minimum is inferred. Use verbatim moves for unsuperseded detailed requirements, and explicit supersession notes for obsolete alternatives. Next action: preserve a temporary pre-edit root snapshot, move requirements to specialist owners and create a requirement-level consolidation record before final verification.


Completed consolidation, awaiting user review: AGENTS.md is 56 lines (previously 168), retaining purpose/audience, working/checkpoint rules, engineering links and original high-signal wording, with an explicit task-to-owner table. Detailed requirements moved to spec-puzzles, spec-exam, spec-python, spec-common, spec-progress, style-guide, content-authoring and CODE_STYLE. docs/decisions/2026-10-agent-guidance-consolidation.md records every source section, minimal edits and exact superseded wording. docs/README indexes it. Corrected the clearly stale eight/nine-character table in implementation-plan and four-bank-capacity wording in spec-common.

Preservation verification: all 65 original non-heading blocks accounted for: 49 verbatim, four minimally edited (typo, moved links, stray If, hash clause), 12 explicit supersessions with original wording retained. Root Python per-focus minimum remains unchanged; tag organisation and primary-focus restriction remain proposals, including an explicit acceptance-check caveat. CSV import stays deferred, not deleted; free-form Python stays staged scope. All 123 local links/anchors checked and git diff --check passed. Temporary reproducible comparison script/snapshot/manifest: /private/tmp/check-starters-guidance.py, /private/tmp/starters-agents-before-consolidation.md, /private/tmp/starters-guidance-move-manifest.json. First move-accounting assertion mistakenly included heading IDs in the non-heading set; corrected by the separate block audit, with no missing requirement blocks. These temporary artefacts are not needed to understand the durable consolidation record.

No application/content/bank changes, runtime tests, production build, commit or deployment. Earlier production-test metadata-allowlist failure remains open, unrelated to this consolidation. Exact next action: await the user's review of AGENTS.md and the consolidation record; do not begin the refactor or further requirements cleanup until asked.

## 2026-10-07 — Confirm Python primary-focus minimum and audit coverage

Objective: adopt the user's clarified minimum target of at least three distinct Python question templates per primary Python practice focus, then verify whether the current bank meets it.
- [x] Inspect primary-focus selection and count distinct templates in the current Python bank, keeping variations separate.
- [x] Update the specification and consolidation record to reflect the explicit decision.
- [x] Verify focused documentation changes and report exact counts/gaps; do not add questions unless requested.
Next action: inspect Python bank metadata and focus selection logic.


Completed: adopted the user's explicit three-distinct-questions-per-primary-Python-focus minimum in docs/spec-python.md and superseded the unresolved-status text in the consolidation decision record, preserving the historical pause. Current bank audit: 20 active primary focuses, 63 unique templates, five variations each (315 variations); selection has six templates and all other focuses have three. No gaps. All focuses have three exercise formats and successfully produce a two-question set through choose(2, focus). Counts exclude retired templates and use unique slots, not variation counts. Existing validateBank already enforces the three-template primary-focus minimum. Full per-focus count table and method recorded in spec-python.

Checks: direct current-bank assertions passed; documentation link/anchor and diff-whitespace checks passed. No question content, implementation or build changes; no broad runtime suite needed. This was a template/count and set-selection audit, not fresh teacher subject approval. Next action: user reviews the confirmed minimum and audit; no further implementation implied.

## 2026-10-07 — Python target increase and scaffolded extended-response plan

Objective: raise the Python primary-focus target to six distinct questions, add implementation work to the project backlog, and assess/plan scaffolded discuss/evaluate exam practice without LLM marking.
Scope: requirements/backlog updates and an evidence-based design/implementation plan; no question expansion or runtime implementation yet.
- [x] Update the Python target, count the gap and add a concrete backlog task.
- [x] Use the exam resource map and cached relevant Paper 1/Paper 2 SAM/past-paper marking evidence to calibrate the proposal.
- [x] Plan the answer-building UI, bounded marking, scenario links, conclusions, feedback and staged validation; distinguish practice scores from exam level judgements.
- [x] Validate documentation links and consistency, record evidence/limitations and present the assessment.
Next action: read current backlog, authoring/refinement guidance and exam source map; identify existing extended-response research and matching cached sources.


Completed: raised the adopted Python primary-focus target to six distinct templates with at least five variations, retained the former three-question audit as historical baseline, and added the implementation task to docs/planned-work.md. Gap: 57 templates / at least 285 variations across 19 focuses; selection already has six. Target totals: at least 120 templates / 600 variations. Runtime validator intentionally remains at its existing three-template floor until expansion; raising it is part of the backlog task.

Extended-response plan: docs/extended-response-plan.md assesses the proposed answer builder, recommends separate short point/explanation/context fields, dynamic editable rows and evidence-referencing conclusions, and distinguishes discuss from evaluate using the specification glossary. Covers bounded per-question relationship recognition, contradiction/duplicate/unknown-answer handling, scenario-specific recommendations, scaffold fading, source-calibrated paper/marker/UI/classroom pilot stages, packed rubric separation, persistence/sharing and progress boundaries. Recommends no automatic official band or mixing guided/pending evidence into current Core score averages/priorities. Added backlog/index/spec-exam links. No implementation or content authoring started.

Evidence reused/read: specification glossary; P1 SAM Q11/Q16 and matching schemes; P2 SAM Q10/Q14(d) and schemes; actual summer 2026 P1 Q11/Q16 and P2 Q10/Q14(d), with matching indicative content and grids. Cached 14 selected actual-paper PDF pages with four source hashes/tool metadata in references/core-extended-response/2026-selected-extracts.json; README records question/page mapping, source paths, interpretation and limitations. No downloads. Original source URLs were unavailable and are explicitly null rather than invented. Existing SAM conversion/PDF equivalence was not rechecked. Schemes use contextual best-fit levels and allow other valid arguments; context weighting is item-specific. Technical claims require independent checking before authoring, especially displayed-program versus adapted-program behaviour and backup generations.

Verification: 76 relevant documentation links/anchors resolved, four original source hashes and 14 nonempty cached pages verified, target arithmetic checked, git diff --check passed. No runtime/build tests were warranted by documentation-only work. No student trials, marker accuracy claims or new subject approvals. Exact next action if approved: prepare two source-calibrated paper prototypes and whole-chain marking fixtures (P1 discuss and P2 evaluate), review with teacher/students, then agree the architecture/persistence/progress boundary before coding. Python bank expansion remains a separate todo. No commit/deployment.

## 2026-10-07 — Development log and automatic-marking requirement

Objective: apply the user's new CODE_STYLE documentation convention, expose recent development history clearly, and make useful automatic marking a requirement for every exam-practice question (teacher review optional).
- [x] Inspect existing checkpoint/Git evidence for recent completed work; create concise dated dev_log.md entries with files, challenges, decisions/rationale and bugs/fixes.
- [x] Link development log and recent checkpoint navigation from root documentation; preserve detailed historical handovers.
- [x] Update extended-response/exam/backlog requirements so teacher review is never the necessary completion path and automatic evidence/feedback has a concrete acceptance gate.
- [x] Verify documentation links, dates, scope and whitespace; record limitations.
Initial finding: no dev_log.md exists; checkpoint.md already has dated entries through 7 October, with that day's first entry at line 1396 before this append. It mixes older front-loaded summaries with later appended entries and is long, which makes recent work easy to miss. The user-added Documentation section in docs/CODE_STYLE.md is read and must remain intact.
Next action: use checkpoint date headings and recent commit summaries to backfill a concise log, clearly labelled as retrospective evidence rather than freshly rerun checks.


Completed: read the user-added Documentation policy in docs/CODE_STYLE.md and left it unchanged. Created root dev_log.md with concise newest-first entries for 7 October and a clearly labelled retrospective summary for 23 September–6 October, grounded in checkpoint/decision records and Git history. Each entry records main files, challenges, decisions/rationale and bugs/fixes; commit references and verification caveats avoid claiming new checks or deployments. Added navigation at the top of checkpoint.md explaining its older opening summaries and linking recent work. Root README, AGENTS and docs index now route to the development log and detailed checkpoint. Historical checkpoint text retained.

Automatic-marking requirement strengthened in spec-common, spec-exam, extended-response plan, planned-work and the ESP design status note: all exam-practice questions must offer useful automatic marking of the substantive reasoning without a teacher marking each attempt. The proposed pilot now includes fixed authored practice points, linked evidence feedback and an automatically marked clarification/guided-retry route for unrecognised free text, preserving independent versus assisted evidence. Teacher review of student work remains optional; authoring quality assurance is a separate activity. Existing review-only Core/ESP formats need the newly listed audit; no retroactive compliance or runtime change claimed.

Verification: 146 local documentation links/anchors passed, including all new checkpoint navigation; git diff --check passed. Historical file creation claims checked against Git additions. No runtime tests/build/deployment: documentation only. Earlier production-test search-metadata allowlist failure remains open. Exact next action: user can inspect dev_log.md for recent development, checkpoint top links for detailed evidence, and the revised extended-response requirement; further implementation remains in the todo list.

## 2026-10-07 — Separate chronological development history from checkpoint

Objective: put completed development history in DEV_LOG.md in chronological order and use checkpoint.md only for the current handover; recognise feature_ideas.md as the persistent idea record.
- [ ] Read the current documentation policy and feature ideas; inventory all checkpoint sections and dates without losing historical detail.
- [ ] Transfer the full historical records into chronological DEV_LOG.md, reconcile the recent concise log, and replace checkpoint.md with a short current checkpoint.
- [ ] Update documentation links and responsibilities, verify historical preservation and chronological ordering, and record the handover.
Scope: documentation only. Preserve the user's feature ideas and all meaningful historical plans/results, including failures and limitations. Do not implement features.
Next action: snapshot checkpoint/dev_log and inspect top-level section boundaries to plan a lossless chronological move.

</details>

### Putting completed history in chronological order

Completed history was moved into `DEV_LOG.md`, ordered from oldest to newest. The checkpoint was reduced to the current work state, unresolved issues and next actions. The original detailed records were retained in expandable sections rather than discarded when the shorter summaries were written.

**Files changed.** The work renamed and rebuilt `dev_log.md` as `DEV_LOG.md`. It updated `checkpoint.md`, `AGENTS.md`, `README.md`, `docs/CODE_STYLE.md`, the documentation index, local-development guidance and ESP navigation. It linked `feature_ideas.md` without rewriting the teacher's original notes, and added the exam-writing reminder to the extended-response plan.

**Decisions and challenges.** All 88 historical checkpoint sections and 14 concise summaries were preserved across 17 dates. One publication note had no date and was kept explicitly undated. Feature ideas stayed separate from agreed implementation tasks. The plan now explained that students must structure their own answers and write complete, contextual sentences in the real exam.

**Checks and limits.** Preservation, chronological ordering and current documentation links were checked. Four links inside the unchanged historical records referred to removed puzzle files; the log identified them and provided current entry points. No application code was changed, built or deployed.


### Making development entries easier to understand

The readable summaries were revised after the teacher clarified the documentation style. Each entry now uses complete sentences and explains the change and its purpose before listing files. Unexplained shorthand was expanded, and the same terms are used consistently for questions, variations, progress and automatic marking.

**Files changed.** This work updated `DEV_LOG.md` and refreshed the current handover in `checkpoint.md`. The teacher's text in `docs/CODE_STYLE.md` and `feature_ideas.md` was read but not edited.

**Decisions and checks.** The original records inside expandable sections were left unchanged. The checks compared those sections before and after the edit, confirmed chronological ordering and checked documentation links and whitespace. No application tests or production build were needed for this wording-only change.


### Planning GitHub account selection and the move out of OneDrive

Recorded a next-session plan to give each GitHub account its own SSH key and host alias. Each repository will select its account through its remote URL, avoiding repeated HTTPS account switches for Git operations. The plan also covers preserving local work when moving the checkout out of OneDrive and changing the remote if ownership changes later.

**Files changed.** Created `docs/git-account-setup.md`, linked it from `docs/local-development.md` and `docs/planned-work.md`, and updated `checkpoint.md` and this log.

**Decisions and challenges.** SSH setup remains deferred. Earlier in the session, GitHub rejected a push authenticated as `joe312213`; a repository-local HTTPS username setting selected `jhudshcg`, and the user subsequently reported successful browser authentication. At the start of this documentation task, Git showed `main` aligned with its local `origin/main` reference at `eaa7c99` and a clean working tree. The user then reported a further commit failure. The user subsequently confirmed that the operation cleared on its own; no cause or fix was established. The configured pre-commit hook builds staged source, so a local commit failure must be distinguished from a push authentication failure.

**Checks and limits.** Checked the new guide against GitHub's SSH documentation, verified new local documentation links and ran the whitespace check. No application code changed, and no runtime tests or build were needed. No SSH keys, remote changes or commits were made by this documentation task.


### 7 October 2026 — Puzzle reuse advice for a related app

Inspected the puzzle bank, specifications, code rollover policy, marking modules, interactive controls and their application integration. Recommended a versioned puzzle content and mechanics bundle with a destination adapter for codes, state and presentation. The source aggregator normalises difficulty, tags and set size, so an export should use its resolved data rather than copy family files alone. Interactive boards require controls and rule checkers; importing question text alone is insufficient.

**Files changed.** Updated `checkpoint.md` and appended this development record. No application code or content changed.

**Decisions and limits.** This is advice, not an adopted architecture or authorised migration. The related repository has not been inspected. Its code capacity, framework and state model must be checked before choosing the exact integration. Preserve stable source question/variation identities, attribution and validation evidence; let the destination own its code encoding. Start with a small representative import before transferring the complete bank.

**Checks.** Read source and existing tests without running them. Ran the whitespace check for the two documentation changes. No runtime verification was needed for this advisory task. The previously recorded production-test failure remains unresolved.


## 8 October 2026

### Extracting the shared puzzle library within this repository

Moved the 18 puzzle family files into `packages/puzzles/data/` and added a portable catalogue, family instructions/guidance/links, numeric challenge bands and reusable rule modules. The library exposes permanent question and variation IDs, levels 1–4 with default labels, and individual Go source kyu ratings alongside broad bands. The user chose to retain the library in this repository for now; no separate repository, submodule or hosting was created.

**Files changed.** Added the library catalogue, metadata, authoring helpers, rules, package manifest, README and tests. Replaced the app's puzzle bank and rule/helper modules with adapters, updated authoring/validation script paths and direct test imports, and included library tests in `npm test`. Updated README, the documentation index, puzzle specification, local development guide and checkpoint. Rebuilt tracked production assets. Preserved the unrelated `student_bug_reports.md` file.

**Decisions and rationale.** App adapters retain existing slots, variation order, source ranks, challenge labels, selection tags and three-question set policy. No codec, code history or question revision changed. Packed Go decoding remains app-owned; portable rules use readable solution trees. Controls, rendering and progress stay in this app. Authoring tools, source caches and detailed requirements remain in the parent repository and must accompany a later separate-repository move. The library README explains consumption and the exact staged-gitlink build requirement before future submodule adoption.

**Finds and fixes.** Moving the authored files exposed their dependency on common authoring helpers; those helpers now live in the library, with unchanged exports through the app's original path. Fixed the previously recorded production-test assertion so it permits only the two intentional search-metadata modules under `data/` and rejects the new library catalogue/family data from the application bundle. No source exclusion was removed wholesale.

**Verification.** All 18 moved family files match their original bytes. Deep comparison of all 1,120 resolved puzzle records against a pre-edit snapshot passed, including every variation and source rank. `codes:check` passed without updating identities. Focused puzzle, enrichment, algebra, content, packed-bank and code tests passed 46/46; portable library tests passed 4/4; production and staged-source hook tests passed 2/2. Production rebuild determinism passed. `npm run validate` passed for 1,340 templates and 2,933 variations, including full marks for every model answer and unchanged coverage metadata. Python maintenance scripts parsed successfully; changed documentation links and whitespace checks passed.

**Limits.** No browser/visual suite or independent Python solver rerun was needed for this content-preserving extraction; the existing controls and styles were not changed. No claim of new teacher difficulty calibration is made. The raw authoring format still uses historical fields, normalised into the public library contract. Generated bank bytes changed through object field order, while resolved content and code fingerprints remained unchanged. No commit, deployment or framework migration was performed.


### Optional puzzle styles and default graphics

Added optional scoped layout and default-theme CSS to the puzzle library, plus shared type artwork and tangram piece colours. The app consumes the styles through a token adapter and retains its own question layout. All seven interactive board renderers now carry the `puzzle-controls` scope class; existing handler classes and attributes are retained. No controls or event behaviour were moved into the library.

**Files changed.** Added `packages/puzzles/styles/layout.css`, `theme.css`, `index.css` and the style/markup contract, a standalone static HTML example, and `graphics.js`. Added package exports and README guidance. Updated `css/challenges.css`, `css/puzzles.css`, `js/challenge-controls.js`, `js/puzzle-cards.js`, the theming guide and checkpoint. Rebuilt production assets. The unrelated student issue file and earlier extraction work were preserved.

**Decisions and fixes.** Geometry, local scrolling and transparent board hit targets belong to layout; colours and other default appearance belong to the optional theme. All selectors are scoped to puzzle roots. Consumers can import both layers, layout alone, or neither, and override documented `--puzzle-*` properties on each root. The app maps its existing tokens rather than adopting new colours. The first browser comparison caught an over-broad variable rename that broke grid columns; retaining the existing `--cells` contract restored exact sampled styles. The keyboard-focus check uses a real Tab event to establish keyboard modality.

**Verification.** Compared computed geometry, typography and colours before/after for all seven board types at 1280px and 320px across all eight themes: no sampled differences remain. The package-only example has no whole-page overflow at 320px; checked grid columns, selected colour, keyboard focus, token overrides and an unaffected button outside the scope. Inspected its screenshot. Production exclusion/deterministic-build test passed; portable library tests passed 4/4. Code identities still pass without a revision update. All nine type cards produce identical original artwork/captions, and seven tangram colours are unchanged. Documentation links and whitespace checks passed.

**Guidance preservation.** Deep comparison against the pre-extraction snapshot passed for all 1,120 resolved records, including hints, explanations and source URLs. Fourteen representative renders (seven board types, each active and locked) match original markup exactly except for the added scope class, including rules links and instructions. The Go rules reminder remains unchanged. This checks link preservation, not current availability of third-party sites.

**Limits.** The example demonstrates static markup and styling, not a shared playable component. The browser checks cover the stated cases, not a full accessibility audit or every possible theme override. Temporary comparison script, baseline and screenshot are under `/private/tmp/puzzle-css-check` and `/private/tmp/check-puzzle-css.mjs`; they are not application dependencies. No commit, deployment, separate repository or submodule was created.


### Completing the embeddable puzzle boundary

Documented the adopted ownership and rationale before implementation in `packages/puzzles/ARCHITECTURE.md`. The package now owns puzzle-specific rendering, interactions, meaningful-work detection and evaluation for every supplied answer kind. Parent apps retain question cards and prompts, grouping, codes, submission, persistence, assistance policy and tracked results. The package remains inside this repository with no separate hosting or submodule.

**Files changed.** Added package `player.js`, `evaluation.js`, `state.js`, `ui/boards.js`, `ui/go.js`, `ui/render.js`, `API.md` and evaluator tests. Added public package exports and updated package/style documentation. Added `js/puzzle-view.js`; reduced `js/challenge-controls.js`, `js/go-controls.js`, `js/marking.js` and `js/unsent-answers.js` to parent adapters/policy. Updated `js/app.js` to delegate puzzle parts and solution rendering, and dispose bindings during navigation. Added package-only and current-profile production browser checks. Updated root README, the documentation index, local development/puzzle guides and checkpoint; rebuilt production assets.

**API decisions.** The control exposes serialisable state snapshots/restore, locking, reset, explicit evaluation, maximum marks, parent-supplied feedback, separate hint/solution views and disposal. Reading state/results never marks or submits. Go reports recorded wins and next-move assistance without tracking attempts. Controls can suppress internal tools and assistance, and callers can suppress immediate win feedback. Headless evaluation and composable render/bind entry points support custom parent interfaces. The parent adapter hydrates packed play/check/reveal data only when needed; ordinary marking still does not decode explanations. Common numeric/text evaluation is reused by the app while Excel, code and identifier-specific checking remains app-owned.

**Style and lifecycle decisions.** The package knows no palette/theme names. Its scoped CSS uses semantic tokens mapped by the parent; added sizing tokens cover cell dimensions, board widths and control gaps. Browser checks confirm live token changes preserve DOM identity and answer state. Abortable listeners and explicit disposal handle unmounting, with a narrowly documented preserve-drag path during immediate redraw. Solution SVG instance IDs are separate from the editable board. The Go rules reminder now comes from the existing package guidance rather than a second hard-coded URL.

**Finds and fixes.** Package-only browser testing caught hidden tools reappearing in solution views; options now apply there too. The old broad smoke and expansion scripts assume legacy unscoped local storage and cannot verify today's named profiles. An attempted broad run stopped at profile setup and, after temporary setup adjustment, at its legacy history lookup. Temporary edits to that script were reverted. Added a focused integration script using the current named profile instead. Its initial CSS `zoom:2` check caused page overflow because it leaves desktop media-query breakpoints unchanged; final checks use effective CSS viewport widths 1280/640/320. This is reflow coverage, not a claim of testing browser UI zoom controls.

**Verification.** Final `npm test` passed 167/167, including production exclusion/determinism, staged-build, code compatibility, packed answers, marking, progress and new package tests. `npm run validate` passed for 1,340 templates and 2,933 variations; every model answer receives full credit. The package evaluator checks every puzzle variation directly. Package-only browser checks passed for all nine types, independent instances, state restore, explicit marking, lock/reset/disposal, hints, Go win events/replay, continuous path drawing and live parent colour/sizing overrides. Production integration passed 14 representative puzzles through real controls, named-profile save/reload, parent submission, reveal and responsive layouts. Saved computed-style comparisons remain identical across seven boards, eight themes and desktop/mobile widths. Deep comparison confirms all 1,120 resolved puzzle records, hints, sources, solutions and Go ranks are unchanged; codes pass without a revision update. Documentation links and whitespace checks passed.

**Limits.** Older broad browser suites still need named-profile maintenance; no full-suite browser pass or comprehensive accessibility audit is claimed. The static styling example remains static; API documentation supplies the actual embeddable-control usage. App-specific selection/authoring tooling and reference caches remain in the parent repository for the later separate-repository decision. No commit or deployment was performed. The unrelated `student_bug_reports.md` remains untouched.

### 8 October 2026 — Puzzle stack integration guidance

Added a short SvelteKit, daisyUI and Bits UI section to `packages/puzzles/README.md`, covering client mounting and cleanup, plain state snapshots, global CSS and theme tokens, and portal focus/dragging checks. Clarified that retaining the package in this repository deferred a separate repository and Git submodule; `git submodule status` confirms none exists. Updated `checkpoint.md`. README local links and whitespace checks passed. No runtime changes or repeated runtime tests; integration with this exact framework stack remains untested.


### 8 October 2026 — Correcting Stretch Cover Paths

The teacher identified obstacle-free slot 875 as wrongly graded Stretch. Reviewed all 30 Stretch Cover Paths templates: the original generators relied mainly on size and silhouette, including three empty rectangles. Revised the 30 obstacle layouts at slots 465–479 and 870–884, their witnesses, hints, explanations and estimated duration. Each now has 35 open dots, forced endpoint deductions and competing connections after local degree rules; ordinary row/column sweeps fail. Kept permanent slots, variation positions, all other path records, Go ranks and runtime mechanics unchanged.

**Files and rationale.** Updated `packages/puzzles/data/cover-paths.js`, added `scripts/audit-cover-paths.py`, and added a sweep regression to `tests/puzzle-enrichment.test.js`. Added the dated challenge review with per-board evidence and linked it from the puzzle specification/documentation index. Updated code history/compatibility to revision 22 and rebuilt `live/`. Structural checks screen the reported failure without treating size, solution count or computer search time as a human difficulty measurement. Historical generators can overwrite reviewed boards; the review requires auditing regenerated output. Teacher/student calibration remains pending.

**Verification.** Independently validated all 145 path witnesses and exhaustively counted 2–12 routes for each revised board, ignoring reversal. All 221 enumerated routes and their reverses pass application marking. Cross-checked the independent enumerator against unpruned search on all 290 eligible 3×3 masks. Four focused path/coverage tests, full content validation (1,340 templates / 2,933 variations), coverage freshness, production build and whitespace checks passed. Browser testing of slot 875 passed controls, saved answers/reload, submission, reveal and desktop/mobile reflow; inspected its mobile screenshot. Corrected a test-only selector that initially included disabled obstacles in the open-dot count. The old `PZ-21-875-0` resolves with the normal content-change notice.

**Preview and limits.** The existing Vite server responds at http://127.0.0.1:5173; left it running for the teacher. The focused review covers Stretch Cover Paths, not every hard puzzle in the other eight families. No full test suite, deployment or commit was performed.


### 8 October 2026 — Go playback, exploration and hint visibility

Fixed the reported Go interaction problems in the shared package. Recorded replies now follow the player move after 700 ms, so a sacrificial stone appears before it is captured. Reply state is serialisable, and bindings cancel stale callbacks on Undo, reset, state replacement, locking and disposal. Restoring an editable intermediate state resumes the reply. Undo removes the entire player/reply turn. Added legal unrecorded play with captures, suicide rejection and simple ko; it displays “No recorded response” and never infers a strategic win or loss. Recorded branches remain authoritative for marks.

Both next-move and written hints now toggle off. Parent-owned assistance records remain true when hints are hidden. Moved the written Go hint above the board and separated its visibility from next-move assistance tracking. Confirmed 98 distinct authored written hints across 101 Go questions. Cached source SGFs contain comments, including objective text and solution annotations; importers deliberately omit raw comments from published trees. No Go content, ranks or question identities changed.

**Files.** Updated package `rules/go-rules.js`, `ui/go.js`, `ui/boards.js` and `API.md`; added `packages/puzzles/tests/go.test.js`. Updated `js/app.js`, both puzzle browser scripts, the puzzle specification and local development guide. Put initial loading text directly in `index.html` for both previews and removed the build-only injection from `scripts/build-site.mjs`. Rebuilt production. Preserved the uncommitted Cover Paths work and bank revision 22.

**Startup evidence.** With browser cache disabled and the development server warm, source preview readiness was about 925 ms with 93 resources and 79 MB of decoded module/debug data; production was about 303 ms with five resources and 3 MB (including the resumed puzzle bank). First contentful paint was about 148/144 ms respectively. These local samples do not reproduce or rule out the reported ten-second cold development start. The readable authoring banks remain eagerly loaded in development; the new loading message addresses the empty content area, not that underlying startup cost. Both servers remain available at ports 5173 and 8765.

**Verification.** Final npm test passed 173/173, including production/staged builds. Full validation passed 1,340 templates / 2,933 variations and current compatibility/coverage. The new Go simulator agrees with every independently imported branch board across all 101 problems. Package browser checks passed visible sacrifices, delayed captures, whole-turn Undo, cancellation, save/restore, locking, independent instances and disposal, plus hint toggling and unrecorded exploration. Production browser checks passed 14 puzzle examples, with dedicated Go assertions for written-hint visibility after reload, assistance retention and unrecorded stones. Documentation links and whitespace passed. One broad browser run overlapped the production-build test, which deletes/rebuilds served files, and timed out on reload; the sequential rerun passed. No deployment or commit.


### 8 October 2026 — Compact Go guidance and coordinate readout

Removed the repeated dashed-margin and input-instruction paragraph. The board-range text now sits above the board with link-styled Show hint and Show next move actions, wrapping when needed. Both retain their hide toggles. Added a coordinate readout below the board that updates on hover and keyboard focus without changing answers or rebuilding the board. Readouts remain local to each puzzle and work with replayed boards.

**Files and boundary.** Updated package Go/board/part rendering and optional layout/theme CSS. Added trusted `guidanceActionsHTML` and `guidanceHTML` slots so the parent can position its written-hint control while retaining assistance ownership. Updated `js/app.js`, package API/style documentation, the puzzle specification and browser regression checks. Rebuilt production; no content/rank/code revision changed.

**Verification.** All 12 package tests passed. Package browser checks passed hint toggles, hover/focus coordinates, unchanged answer state and board identity, plus existing Go playback/lifecycle checks. The initial focus assertion exposed inactive-window test conditions; enabling browser focus emulation exercised real focus events and passed. Focused production Go checks passed grouped controls, removed copy, assistance/persistence, playing, marking, reveal and 1280/640/320 layouts. Inspected the mobile screenshot. Final build and whitespace checks passed. Full suite was not repeated for this focused presentation change. Existing servers remain available on 5173 and 8765; no commit or deployment.


### 8 October 2026 — Compact Go source and rules row

Moved the Go Puzzle source link beside the coordinate readout and rules reminder in a small, wrapping row below the board. Removed the extra source-note text from the display and the redundant side-to-play heading; source attribution remains unchanged in the content. Other puzzle source displays are unchanged.

Updated package Go/board/part renderers with a trusted `referenceHTML` slot, the parent question renderer, optional layout CSS, API/style documentation and puzzle specification. Production build and whitespace checks passed. A focused production Go browser check confirmed the source URL, adjacent rules link, absent duplicate heading/source paragraph, controls, persistence, scoring, reveal and desktop/mobile reflow. No content/code revision change, full-suite rerun, commit or deployment.


### 8 October 2026 — Stable Go coordinate width

Reserved a fixed four-character-width area for the coordinate value in `packages/puzzles/styles/layout.css`, keeping the label together and preventing flex shrink. Source/rules links no longer shift as coordinates change. Rebuilt production. Browser measurements confirmed identical link positions for —, A1, T19, M19 and J9 at 1280, 640 and 320 pixels. Whitespace checks passed; no runtime/content changes or full-suite rerun.


### 8 October 2026 — Consistent Go hint links and stable board position

Removed the parent-only subtle button class from Go's written-hint control so both hint actions use the same package link style and hover rule. The guidance row now shares the smaller board-range text size. Moved both written and next-move hint text below the board/reference row. Hint focus uses preventScroll so opening the written hint does not scroll the board away. Updated `js/app.js`, package Go rendering/theme CSS, API documentation and the puzzle specification.

Rebuilt production. Focused browser checks confirmed identical computed hover styling, matching hint/range font sizes and unchanged board position and size when either hint is shown or hidden at 1280/640/320 pixels. Existing Go controls, assistance/persistence, scoring, replay and reflow checks also passed. Whitespace passed. No content change, full-suite rerun, commit or deployment.


### 8 October 2026 — Halved Go reply delay

Reduced the default recorded-reply pause from 700 ms to 350 ms as requested. Scheduling and restored-state timing share `GO_REPLY_DELAY_MS` in the package Go rules. Updated current API/specification wording. All five focused Go tests and the production build passed. No content or code identity changes.


### 8 October 2026 — Go press preview and 200 ms replies

Set the shared Go reply delay to 200 ms. Added `packages/puzzles/ui/go-press.js` and connected it through board bindings: pressing a legal intersection shows a transient stone, release commits through the existing move handler, and leaving the point/cancelling/focus loss/disposal clears the preview. Enter and Space use the same release-to-play behaviour; ordinary click activation remains available for assistive tools. Previewing never emits answer changes or starts an opponent reply.

Updated package rules, board bindings, API/specification and the package browser regression script; rebuilt production through the test suite. All 173 tests passed. Real-input package browser checks passed held mouse/touch/key previews, unchanged saved state, release without duplicate moves, 200 ms reply behaviour, pointer/touch cancellation and disposal. Focused production browser checks confirmed preview-before-save, commit-on-release, Undo, persistence, marking, reveal and responsive layout. Whitespace passed. No content/code identity changes, commit or deployment.


### 8 October 2026 — Plain Go turn notice

Updated package theme/layout CSS so ordinary Go status text uses the normal text colour without a highlighted background or box padding. Success styling remains distinct. No tests or rebuild run, as requested for this CSS-only adjustment.

### 13 October 2026 — Local-first OneDrive progress files

**Focus and decisions.** Reviewed the current checkpoint and the Maths repository's progress implementation and 11–13 October development log. No urgent unresolved checkpoint defect was recorded. The high-priority content/marking gaps remain the automatic-marking audit, Core CA3–CA8 expansion and the Python six-per-focus target. Added optional linked progress files while retaining browser storage as the primary save. The student chooses their locally synced OneDrive root; reuse T-Level, otherwise DSD T-Level, otherwise create T-Level. Selecting a subject folder itself avoids nesting. Filenames use the Maths safe-name and 12-character FNV-1a UUID hash convention. The UUID is an identifier, not authentication.

**Files and behaviour.** Added `js/progress-identity.js`, `progress-transfer.js`, `progress-file.js` and `onedrive.js`; updated profiles, app controls and progress documentation. Kept schema-1 backups and old no-ID imports compatible. Validation/merge precedes activation; reading profiles does not mutate storage. Existing nonempty files require review. Writes are serialised, permission-aware, fingerprint-checked and read back; external changes stop automatic saving. Controls offer review, retry, explicit keep-browser replacement, unlinking and download. Browser storage is committed before scheduling or manually starting file work. File failures leave local results intact; local-storage failures show the existing warning, stop that file-save attempt and offer a backup of the in-memory data. Native folder access is optional; download/restore remain available elsewhere.

**Verification and fixes.** Progress/file/profile tests and isolated-browser flows passed. Real origin-private handles exercised file writes and IndexedDB reload; only the native picker was stubbed. Deliberate write failure left two local results and one file result; retry saved both. Simulated local quota failure stopped file work and exposed the warning. External-edit conflict was preserved. The initial filename test guessed the hash incorrectly; compared with Maths itself and corrected the fixture. Adding an upload field exposed an ambiguous profile input selector; changed it to `#profile-name`. Profile import/export and named-profile regressions passed. Actual OneDrive desktop cloud upload remains a device check; the UI explicitly confirms a local file save only. Abrupt closure can interrupt asynchronous file work, so the local save remains essential.

### 13 October 2026 — Maths Go reconciliation and puzzle layouts

**Focus and files.** Reconciled Maths's portable Go drawing/input, human-game rules, clocks and engine client into `packages/puzzles`; added host-owned `js/go-practice.js`. Preserved the existing uncommitted plain Go notice CSS and earlier log entries. Added GNU Go worker/WASM, complete corresponding source archive, build script and licences under `engines/gnugo`, third-party notices and production copying. Reused cached Maths assets without downloading. `docs/go-integration.md` records provenance, hashes, decisions and boundaries.

**Behaviour and rationale.** Held stones can be dragged to aim and commit once on release; second-pointer/cancel/focus-loss paths discard previews. SVG coordinate conversion fixes transformed-board hit testing, and occupied taps stay quiet. The transient human practice route offers 5/9/13/19 boards, captures, suicide and positional-superko checks, pass/count/dead groups, undo/redo, komi and optional main-time/Japanese byo-yomi clocks. GNU Go loads on demand for estimates, with manual counting available; there is no computer opponent. Practice games do not become scored history. Existing puzzle answer restoration and assistance remain host-owned.

**Layout and discovery.** Adopted responsive digit/candidate sizing, then corrected T-Level host padding and automatic candidate-column sizing after a 320px check found short labels wrapping. Preserved existing cell-size custom properties and accounted for grid borders. Classic maths leaves home/focus/search/random discovery and is replaced by a link to the deployed Maths site, confirmed HTTP 200. Existing classic-maths slots and shared codes still resolve. Updated puzzle/style/package guidance, discovery tests and browser scripts.

**Verification.** All 189 tests passed at the shared runtime milestone. Portable and package-browser tests passed alongside 14 production puzzle integration scenarios. Human Go checks passed all board sizes, real engine estimation, undo/redo, counting, clocks, touch preview/release/cancel, keyboard and narrow layouts. Final dense-layout checks passed 32 family/level examples at 320/640px with no internal horizontal scroll, candidate buttons at least 24px wide and unsplit short labels. Physical-device pinch/assistive-technology checks remain outstanding. Do not infer a full accessibility audit from these checks.

### 13 October 2026 — Coding practice tasks, beginner guides and efficient checks

**Content.** Added ten six-mark Python templates at slots 63–72, with five variations each: slicing/concatenation, append/extend, stack push/pop, insert/remove/pop, linear search, binary-search singleton repair, search comparisons, bubble early stopping, insertion repair and bubble comparison counts. Refined 55 existing tips for beginner clarity while preserving technical terms. The original 315 assessment records compare unchanged except hints. The bank now has 73 templates / 365 variations. Algorithms/sorting each meet six, lists has seven and selection retains six; 16 focuses still need three each (48 templates). Source calibration and review limits are in `docs/reviews/2026-10-13-python-sequences.md`. These changes apply only to Coding practice; Core exam and ESP content is unchanged.

**Guides.** Added `js/algorithm-guide.js` and `js/python-guides.js` with relevant, initially closed native disclosures for all 20 coding focuses. Search/sort share two accessible diagrams; all topics have concise definitions and two or three independent Python examples. Opening before submission marks matching questions as assisted; closing retains that evidence. Saved disclosure state survives reload; reading after submission does not rewrite results. The mobile view uses wrapping code at a readable size.

**Checks and fixes.** All 50 new variations passed independent Python reference execution, boundary/side-effect checks and model/alternative/wrong-answer marking. All 39 guide examples executed with their stated output; file examples used a temporary directory. Focused Python/progress/discovery checks passed. After the content additions, 23 selected search/packed-bank/compatibility tests passed. Coverage/codes/validation and final production build passed: revision 23, 1,350 total templates / 2,983 variations. All 20 guide focuses passed 320/640/1280px layout checks, keyboard disclosure, assistance, reload and review. An initial browser fixture tried an invalid mixed-focus set; corrected it to use supported same-focus sets. Native summary activation required a complete Enter event including its text; fixing the test driver resolved the keyboard assertion without changing app behaviour. Reviewed the mobile guide and dense puzzle screenshots. Final whitespace and relevant documentation links checked.

**Efficiency and handover.** Read Maths's efficient-development skill and cached verifier documentation. Reused the passing shared-runtime evidence and ran only checks affected by later content, guide and layout changes, rather than repeating the full suite. Documented the selection matrix locally. Maths's automated cache is a future candidate, not installed here. Also recorded profile rename/reset/delete and last-backup reminders as possible small transfers. Teacher review, student timing/hint trials, real OneDrive upload and physical-device review remain limitations. Updated current specifications, counts, README, docs index, planned work and feature ideas. Rebuilt `live/`; no commit or deployment.

### 13 October 2026 — Independent Python project ideas

Added `js/python-projects.js` and a collapsed section on Coding practice activities with ten projects ordered broadly by challenge: quiz, budget, flashcards, tasks, loans, seat booking, adventure, league, algorithms and support tickets. Each has a beginner-friendly brief, covered topics and a stretch feature. Suggested terminal-based development over several sessions, roughly 100–500 lines without treating length as a target, decomposition and normal/boundary/invalid tests. Projects are independent of assessed questions and do not change assistance or progress. Syntax check and production rebuild passed; no additional browser suite within the requested short time budget. No commit or deployment.

### 13 October 2026 — Responsive header, practice entry and navigation

**Area and decisions.** Implemented the teacher’s 20-point follow-up. Interpreted item 13 as removing the card key-term links and item 9 as placing the project link below Submit set answers. Header theme, light/dark and hamburger controls stay in the first row beside the larger wordmark and subtitle; profile details occupy another row. The menu holds Go/Maths links instead of the home content. Home cards are ordered Exam practice, Programming, Puzzles, with compact artwork, no long descriptions or default emphasis, two columns on phones and three from 768px. The two lower panels remain side by side. Footer links are centred and include FAQ. Removed repeated OneDrive/backup blocks from home and activity pages; My progress retains file and backup controls.

**Behaviour.** Added blank Core/ESP/programming Focus entry pages and a puzzle-card entry page. Per-profile focus, Core subtopic, ESP activity, sequence and puzzle challenge choices are recalled for two hours after leaving; direct shared codes remain exact. Puzzle selection collapses above the heading and breadcrumbs read Home / Puzzles / [type]. Browser history now retains visible entry pages, sets with attempt snapshots and search queries. Back/Forward restores the earlier attempt instead of creating a fresh one; cancelling the leave warning returns to the original history entry. Timer URL changes remain replacements. Removed redundant identical history writes after rapid browser testing exposed excessive synthetic navigation.

**Python and content.** Renamed the displayed Records focus to Dictionaries, preserving its internal identifier, progress and question-code identities. Existing related tuple-record content remains; its categorisation is noted in the Python expansion backlog. General Python guides now save disclosure state without adding hint assistance or removing independent first-response marks. Existing historical assistance records are preserved. Moved projects to `#projects`, linked below submission and from programming entry/menu. Expanded ten briefs to eighteen with a harmless Victorian insult generator, a rule-based spaceship chatbot, two Turtle activities, two Arcade games and two pandas/matplotlib investigations. Added a nine-question FAQ. Official library references and setup boundaries are recorded in the Python specification; no packages or assessment questions were added.

**Files.** Edited `index.html`, `css/styles.css`, `js/app.js`, `js/bank.js`, the two guide modules and `js/python-projects.js`. Added `js/navigation.js`, `js/practice-selection.js`, `js/faq.js`, `tests/practice-selection.test.js` and `scripts/browser-navigation.mjs`. Updated the Python guide browser assertions and the ESP browser entry flow; rebuilt hashed output in `live/`. Reconciled README, common/Python/style specifications, the Python review, local-development checks and planned work. No question bank/fingerprint/revision changes; revision remains 23 with 1,350 templates.

**Verification and fixes.** Production build and its compatibility check passed. The 24 focused selection/discovery/guide/repeat/profile/practice-time/unsent-answer tests passed, including independent execution of guide examples. Final navigation browser checks passed at 360, 390, 440, 640, 768, 1024 and 1280px: no page overflow or header overlap, two mobile cards/note panels, theme/menu controls, empty/remembered/expired focus, Core/ESP subsection recall, reload, prior-set restoration, Back/Forward cancellation, puzzle picker/breadcrumbs, projects, FAQ and search history. All 20 guide focuses passed at 320/640/1280px, with keyboard disclosure, reload, independent part-score evidence and post-submission reading. The first visual inspection caught global nav CSS making the closed menu visible; added an explicit closed-popover rule. The initial expiry fixture was overwritten by legitimate page-exit persistence; replaced it with a controlled two-hour clock advance. Rapid guide-page automation initially stalled; paced synthetic navigation and avoided redundant history replacements, then the complete guide run passed. Reviewed 360/1280 home screenshots. Changed local documentation links, JS syntax and whitespace passed. The ESP browser file received a syntax check, not its full suite. No full-suite, deployment or physical-device claim.

**Deferred scope.** Read Maths’s `website/src/lib/styles/breakpoints.css` in the local read-only reference checkout. New header/home styling uses its 440/768/1024px viewport scale. Consolidating all legacy thresholds and evaluating Maths’s specialised 678/1150px viewport and 650/780px container thresholds remains framework-migration work. No migration, commit or deployment performed.

### 13 October 2026 — Logo and compact card refinements

**Scope and decisions.** Completed the teacher’s explicit layout changes while preserving existing uncommitted work. Linked the teacher-provided project-refactor-checks skill without editing it. Its additional review findings follow the ordered discussion gates; the requested layout and skill wiring already had explicit authorisation.

**Files and review.** `AGENTS.md` and `docs/README.md` now lead to the once-per-session skill. `index.html` places the subject subtitle beneath both the icon and wordmark. `css/styles.css` enlarges and aligns the logo, tightens card interiors without reducing their outer vertical inset, enlarges artwork by 30% with card-edge clipping, and gives the lower panels a divider and subdued solid borders. `js/app.js` adds the requested persistence condition and coding message to the programming illustration. `css/tokens.css` supplies a horizontal mobile border-gradient token; `css/challenges.css` removes the conflicting puzzle-page inset. At <=440px, question cards, the set toolbar and result banner meet the viewport edges with only top/bottom borders; other controls retain their inset. `README.md` maps home-card editing to app.js, bank.js, styles.css and tokens.css, including the warning to preserve bank identities. The style and theming guides record these explicit new requirements. Rebuilt hashed production output in `live/`.

**Verification.** Production build and compatibility check passed. Temporary browser measurements passed all eight light/dark palette variants: home at 360/390/440/441/768/1280px, and Sudoku, logic-grid, Core, Python and ESP examples at 360/440/441px. Checked header alignment and overlap, two-column home layout, shortened cards, page overflow, edge widths, absent side borders, horizontal Rose/Berry gradients and an ESP submitted-result banner. Inspected mobile Rose home/question screenshots and desktop Sage home. Screenshots and the temporary checker are outside the repo under `/private/tmp/tlevel-*`. An initial link checker incorrectly treated external URL paths as local; corrected scheme filtering, then all 361 local targets across AGENTS.md, README.md and 49 docs files resolved. Whitespace checks passed. Reused the previous entry’s functional evidence; no new unit tests, full-suite rerun, physical-device claim, commit or deployment.

### 13 October 2026 — Project refactor checks: stage 1 evaluation

**Scope and process.** Applied `.agents/skills/project-refactor-checks/SKILL.md` to documentation and app CSS. Evaluated documentation ownership, links, status and requirements against current code and dated decisions; source comments were checked for presence/shape only. This is not a new question-content or assessment-correctness audit. The following covers all nine stage-1 aspects. No additional review-driven fixes have been made.

| Aspect | Finding and proposed action |
| --- | --- |
| 1. Stale guidance and discovery | High: `docs/style-guide.md` retains a desktop one-row header rule that contradicts its later separate-profile-row requirement. Its Home summary and `docs/spec-common.md` still place Focus on Home, contradicting the adopted entry-page section. Replace only those outdated instructions. Medium: `docs/esp/source-guide.md` says implementation is underway and `task-1-formula-outline.md` says unimplemented; the 28 September baseline reconciliation and current planned-work record confirm Task 1/2 and six formula templates are implemented. Update status and historical framing without declaring outstanding teacher review complete. |
| 2. Ambiguity and dilution | Medium: blanket draft labels in common/style specifications obscure their mixture of adopted requirements and explicit proposals. Clarify that distinction without adopting any proposal. Puzzle/Python historical sections use present-tense counts beside later current inventories; label old snapshots rather than copying another current count. Terminology is generally consistent; preserve established Focus, question, set and challenge distinctions. |
| 3. File proliferation | The 49 docs files largely have distinct specification, source, evidence or historical roles. No broad merge or deletion is justified. ESP source registers, assessment conclusions, designs and ledgers serve different purposes. Keep this review in the existing log, without another review file. |
| 4. Duplication and ownership | Common owns behaviour, style owns presentation, theming owns token implementation. Keep concise cross-references rather than duplicating detailed rules. Historical implementation plans and log entries retain useful evidence; do not rewrite them as current guidance. Four old DEV_LOG source links refer to paths moved into the puzzle package; retain the historical record, with an explanatory annotation only if later agreed. |
| 5. Internal organisation | Medium: unrelated home/header/footer rules sit under “Modal dismissal” in the style guide. Group existing wording under appropriate headings, preserving meaning. Four docs lack a path from AGENTS.md: the September adopted student-experience decisions, comparison-question evidence, superseded CA1–CA2 draft and early September review. Add concise index links, distinguishing current decisions from historical evidence. |
| 6. Regression risk | Conflicting header/Focus guidance can reverse the new UI; stale formula status can trigger duplicate implementation. Prioritise those corrections. Existing rules correctly distinguish historical evidence from current requirements, and explicitly labelled proposals from adopted decisions; retain them. |
| 7. Clarity and wording | Use focused status sentences and existing terms. Preserve human wording and historical content; no cosmetic rewrite, synonym rotation or blanket spelling pass is proposed. |
| 8. Comment presence and shape | App styles lack the lightweight source header required by CODE_COMMENTS.md. An obsolete styles.css comment says graphics sit behind card content. The token/challenge/puzzle styles have headers. Record these for the CSS stage, where comment content and ownership can be assessed with the code; do not refactor comments early. |
| 9. Implementation differences reserved for later | Existing planned work already records the tuple-record task under Dictionaries and the automatic-marking gap for written reasoning. Preserve those as implementation/content gaps rather than changing adopted requirements to match code. CSS ownership and legacy overrides remain stage-2 work; detailed requirements and test alignment remain stages 3/4. |

**Decision and gate.** Presented the proposed focused documentation corrections. The teacher selected “Discuss the findings before editing”. Corrections are pending, not agreed. The next action is to discuss the exact conflicts and proposed wording, then implement only agreed changes and review each altered file. Stage 2 CSS quality has not started; stages 3/4 also remain pending. Each later stage retains its own discussion gate. Direct layout work above is complete and does not imply completion of the full skill.


### 13 October 2026 — Project refactor checks: stage 1 corrections agreed and completed

**Agreement and scope.** After discussion of the prioritised findings, the teacher approved the focused corrections. Preserved historical records and requirement wording; no proposal was adopted by inference, no documents were merged and no application files changed in this step.

**Per-file review.** `docs/style-guide.md` now distinguishes adopted requirements from retained proposals, removes the superseded desktop profile rule, corrects the Home/Focus summary and groups existing header, home, footer and narrow-layout rules under their own headings. `docs/spec-common.md` clarifies the same status distinction and links its corrected Home summary to the adopted practice-entry rules. `docs/esp/source-guide.md` records implemented Task 1/2/formula practice, retains teacher-review/timing limitations and links the exact 28 September implementation record. `docs/esp/task-1-formula-outline.md` retains the design and original integration plan as historical evidence, corrects implementation status and keeps subject review pending. `docs/spec-puzzles.md` labels the five-puzzle baseline and old totals as historical while preserving interaction/correctness requirements; the accurate count for the specific Go source file is unchanged. `docs/spec-python.md` labels the 63-template milestone as historical and points to the current expansion record. `docs/README.md` links the adopted student-experience decisions, comparison evidence and two historical references. No other documentary findings were silently actioned.

**Checks and stage boundary.** Reviewed the altered wording and file diffs. All 369 local file targets resolve; all 49 docs files are reachable from AGENTS.md. Checked four changed section-anchor targets and corrected two initially guessed anchors to the existing headings. Whitespace passed. No build/browser/unit rerun for documentation-only corrections; previous layout evidence remains valid. Stage 1 is complete. Next: evaluate app CSS quality under stage 2 and present a separate proposal before changing CSS.


### 13 October 2026 — Project refactor checks: stage 2 CSS evaluation

**Scope and method.** Read all four app stylesheets (66,670 bytes), their index/build import order, shared puzzle styling contract and relevant renderers. Compared them with CODE_STYLE.md, CODE_COMMENTS.md, the theming guide and existing migration boundary. Used the already installed PostCSS parser for read-only rule/duplicate inventories and searched authored markup, renderer and bank sources for removal candidates. No CSS, application, package or test changes were made. Stage 1 was completed before this evaluation.

**Prioritised findings and proposed actions.**

1. **Medium — unreadable source and accumulated overrides.** `css/styles.css:2` contains 14,232 characters, including base styles for many unrelated components. The file has 24 repeated selector/context groups, which are review candidates rather than 24 proven bugs. Header, brand, hero, card, lower-panel and footer definitions are spread between the base line and lines 213–310; obsolete flex/grid and spacing declarations are repeatedly overridden. Format authored styles for reading without changing rule order, then consolidate only the affected header/home/footer groups, tracing specificity and media order before each removal. Preserve current breakpoint values, layout and theme behaviour. No new stylesheet architecture or framework migration is proposed.
2. **Medium — unclear stylesheet ownership.** `css/puzzles.css:2–7` owns brand and shared submission presentation; lines 84–101 contain progress-file controls and Python guides. Those features depend on a puzzle-named stylesheet loaded after styles.css. Move general app/progress/Python styles into labelled sections of styles.css, merging the already overridden brand rule rather than retaining it as another override. Keep host puzzle/Go presentation in puzzles.css and the portable package mapping in challenges.css. Preserve effective cascade order and do not move app-specific rules into the shared package.
3. **Medium — obsolete selectors obscure current behaviour.** No current renderer emits the old `card-body`, `art-label`, `pilot-badge`, `brand-level` or `topic-search-link` hooks. Legacy job/switch/pixel/route/position control selectors in puzzles.css likewise lack matching rendered controls; the portable package owns current board markup. Remove only individually verified unused rules, not every selector absent from one page or every repeated selector. In particular, retain `logic-clues`, `puzzle-grid`, chart rules and `.back`: renderer inspection confirms they remain used. Remove replaced type-art fills only after checking the effective shared card-art override.
4. **Low — stale/missing comments and small duplicated controls.** styles.css has no lightweight purpose/ownership header. Its line-89 comment says artwork sits behind content; line 196 says search occupies the left strip, both superseded. Correct those comments. Palette and hamburger button boxes repeat the same dimensions, padding and border treatment at lines 119/238; group common declarations while preserving distinct SVG sizing and accessible state selectors. Retain comments explaining opaque gradient layers, outcome-token scoping and narrow question-page edges.

**Other quality checks.** All four files parse with the installed CSS parser; no rule contains a duplicate property. The four `!important` declarations are confined to hidden content and reduced-motion overrides, not an escalating specificity workaround. Semantic tokens, native popovers, inherited outcome colours and the scoped portable puzzle mapping are sound boundaries to preserve. Repeated token blocks intentionally separate palette values, aliases and feature-supported transformations; do not mechanically deduplicate them or replace explicit colour mappings with a new abstraction. Fixed puzzle illustration/Go colours have a documented purpose. Existing specialised 336/500/600/650/850/1000px rules and the different <440 versus <=440 contracts need contextual treatment; global breakpoint replacement stays deferred. No new dependency, purge tool or framework is needed for the proposed cleanup.

**Later-stage evidence.** Source search also found `scripts/browser-esp.mjs:64,70` still asserting the removed `.card-body`/overlay layout. This script was previously syntax-checked, not reported as passing its full suite. Record this for stage 4; do not fix tests ahead of their agreed review stage or treat syntax success as browser coverage. Requirements/contrast/focus compliance remains stage 3, rather than being inferred from syntax or earlier layout checks.

**Proposed validation after agreement.** Check formatting-only changes with parsed selector/declaration/order equivalence. For actual consolidation/moves/removals, rebuild and compare home/header controls, progress/file controls, guide disclosures, question submission and representative puzzles across affected widths and themes. Preserve the 440px boundary and keyboard/selected/marked/forced-colour states. Reuse the prior browser fixtures and run only affected checks; no mirror unit tests or full bank audit. Record any intentionally changed output separately from a refactor. This is a proposal, not completed validation.

**Gate.** Present these four focused CSS actions for agreement. No stage-2 implementation is authorised yet. Stages 3/4 retain separate evaluation and discussion gates.


### 13 October 2026 — Project refactor checks: stage 2 CSS cleanup completed

**Agreement and boundary.** The teacher approved all four focused CSS corrections and asked to leave broader app.js maintainability work until after the Svelte/Tailwind migration. Recorded that sequencing in `docs/planned-work.md`. No framework migration, runtime refactor or test-source repair was included; app.js matches its pre-cleanup SHA-256.

**Files and per-file review.** Formatted `css/styles.css` and `css/puzzles.css` with one declaration per line; the formatting-only pass preserved parsed selectors, declarations and rule order exactly. Consolidated the affected header, brand, hero, activity-card, lower-panel and footer declarations, retaining specialised breakpoint values. Grouped the identical palette/hamburger button boxes while retaining their separate SVG rules. Moved shared submission presentation, progress-file controls and Python guides into documented app sections. Removed the overridden subtitle rule from puzzles.css and retained host puzzle/Go layout there. Removed 72 individually verified obsolete selector rules, including old card wrappers and retired board-control hooks. Retained live clues, table grids, charts and back links. Added ownership comments and corrected stale artwork/search comments. `css/tokens.css`, `css/challenges.css`, portable package sources and runtime JS are unchanged in this step. Rebuilt production output in `live/`.

**Verification and fixes.** Saved previous source/built CSS under `/private/tmp/tlevel-css-cleanup-baseline`. Compared old/new CSS on identical DOMs, including computed visual properties, element rectangles and pseudo-elements. The comparison caught and corrected two consolidation regressions: hero base spacing had moved after narrow overrides, and the mini-grid’s highlighted cell had lost its fill through equal-specificity source order. Preserved footer mobile padding at the same review boundary. An initial checker toggled external stylesheet links synchronously and sampled their reload gap; replaced that with two preloaded style sheets. A stale temporary project-page selector caused a wait failure after home/exam/progress passed; corrected it to the actual `#python-projects` root and continued only the remaining cases.

Completed comparisons cover all eight themes; home widths 320/336/360/390/439/440/441/599/600/601/650/651/767/768/850/851/1023/1024/1280; exam entry, progress/file options, projects, Go and five representative question pages at 360/440/441/600/1000/1280; menu, focus/hover, guide, submitted/revealed and forced-colour states. The continuation alone passed 390 comparisons / 166,659 element snapshots. An explicit selected/correct/incorrect/partial/review fixture also matched in all eight themes at 360/1280. Production navigation passed 360–1280px and its menu/recall/history/puzzle checks. All 20 Python guides passed 320/640/1280px, keyboard, persistence and independent-progress checks. Build/compatibility, CSS parsing and whitespace passed. Built CSS decreased from 72,255 to 65,286 bytes (6,969 bytes removed). No new permanent tests or dependencies; no full-suite, physical-device or full accessibility claim. Temporary logs/checkers are outside the repository.

**Stage boundary.** Stage 2 is complete. The next scoped evaluation is implementation alignment (stage 3), with a separate discussion gate before any new fixes. Broader runtime maintainability remains deferred as the teacher requested.


### 13 October 2026 — Project refactor checks: stage 3 presentation alignment evaluation

**Scope and evidence.** After completing stage 2, compared the adopted presentation, theming and current navigation requirements with the resulting app CSS and its renderer boundary. Reused the completed equivalence/navigation/guide checks and the earlier puzzle/layout evidence where sources were unchanged. This is scoped presentation alignment, not an audit of every question, mark scheme or future framework feature. No additional changes were made.

**Implemented requirements.** The aligned logo/subtitle and three header controls, two-column phone activity/lower panels, compact cropped artwork, quiet lower panels, footer links and <=440px edge-to-edge question cards are implemented and covered by relevant layout/equivalence checks. Existing specialised puzzle constraints, native controls, wrapping guides, outcome colours, gradient layers and theme adjustments are retained. Tokens and portable board rules are unchanged; the previous eight-theme behaviour remains intact. These checks do not certify arbitrary slider settings, cross-browser support, physical devices or every accessibility criterion.

**Existing gaps for discussion.**
- Medium: `docs/style-guide.md` requires navigation focus on the new heading, while `js/app.js` lines 154/564 call `main.focus()` and styles.css suppresses the main outline. This predates the cleanup. The renderer focuses its convenient page container rather than an explicit heading; existing navigation checks do not establish the heading contract. Options: implement consistent heading focus when reviewing the migrated navigation, or explicitly agree a different focus contract. Recommend retaining the requirement and addressing it in the deferred runtime work rather than changing docs to match code. The teacher’s broader app.js deferral still applies.
- Low: the style guide specifies code at least 1rem, but `.part-code` remains .9rem (14.4px at the default root size). Full code panels and Python-guide examples use 1rem. This older compact fragment rule predates the refactor and was deliberately preserved for equivalence. Options: raise question-fragment code to 1rem with focused narrow-layout checks, or agree a documented exception. Recommend raising it in an agreed follow-up. Decorative home artwork is a separate explicitly requested compact treatment.

**Cause and prevention.** These are old local exceptions that were not reconciled with the later common presentation requirements. Keep the authoritative rule next to its component and add focused checks for a behaviour only when implementing its fix. Do not add broad tests or change requirements merely to excuse current code. The new CSS organisation reduces the chance of hidden conflicting declarations; it does not repair unrelated runtime behaviour by itself.

**Planned/deferred versus defects.** Svelte/Tailwind/daisyUI/Bits UI integration and site-wide breakpoint consolidation are explicitly deferred, so their absence is not a failed implemented feature. Preserve existing tokens/package boundaries as migration inputs. Existing content/automatic-marking backlog items stay outside this CSS pass. The old ESP browser-script selector remains a stage-4 test-quality finding, not a change made early.

**Gate and next action.** Stage-3 evaluation is complete; the two proposed fixes remain unapproved. The approved CSS cleanup is complete. Present the findings and await discussion before implementing them or proceeding through the next review stage. Stage 4 has not been completed or waived. Broader app.js maintainability stays deferred until after migration, as requested.


### 13 October 2026 — Single-line header subtitle and migration risks

**Teacher clarification and fix.** At 360px and above, the subject text must remain on its current line below the logo and continue beneath the top-row controls. `css/styles.css` now gives the subtitle its natural content width and prevents wrapping, without changing its font, vertical spacing or the logo/control layout. `docs/style-guide.md` previously explicitly permitted wrapping on phones; replaced that conflicting sentence with the clarified contract. `scripts/browser-navigation.mjs` now checks subtitle line count, alignment/bounds and placement below the logo, while checking control overlap against the actual icon/wordmark row rather than the whole anchor. This small addition guards the observed regression during future layout changes.

**Verification.** Production build/compatibility, JS syntax and whitespace passed. The updated navigation check passed 360–1280px and its existing behaviour checks. A temporary comparison passed all eight themes at 360/390/440/441/768/1280px: one subtitle line, identical document y coordinates before/after for subtitle, wordmark, icon and controls, and no page overflow. The first temporary comparison used viewport coordinates and caught scroll anchoring rather than a layout shift; corrected it to document coordinates. Inspected `/private/tmp/tlevel-subtitle-360.png`. No runtime/content changes, full-suite rerun, migration, commit or deployment.

**Requested migration-risk assessment.** Reused the 7 October readiness review, then checked current source/docs rather than treating its historical findings as current failures. Current risks and preservation boundaries:

- `js/app.js` remains 74,421 bytes across 605 dense lines. Its render function combines bank loading, stale-render protection, puzzle/Go disposal, route selection, persistence and activity lifecycle. Module-level document/window listeners and two intervals assume one lifetime. `js/navigation.js` and `js/theme.js` also install listeners without a public disposal contract. Moving initialisation into remountable components without assigning a single owner/cleanup could duplicate navigation, submissions, timers or theme tiles. Define ownership while migrating each component; do not let legacy and framework rendering mutate the same subtree. This is necessary migration design, not authorisation for a preliminary app.js rewrite.
- The specialised production path in `scripts/build-site.mjs` validates identities/search metadata/hints, packs and lazy-loads banks, substitutes the authoring loader, hashes assets and ships engine/source/licence files. `scripts/pre-commit-build.mjs` builds the staged snapshot; Pages deploys committed live output. `vite.config.js` is source-preview only. A default replacement build would not automatically preserve this contract or project-subpath behaviour.
- Hash history captures attempt snapshots; fresh-entry focus recall is separately limited to two hours. Profile identity, old backups, generation-aware question codes, timer deadlines, first-response/assistance rules and serialised OneDrive file work must remain unchanged during presentation migration. Dictionaries is a display name over the retained records identifier; Core/ESP are separate banks beneath one navigation category. These are behavioural/data contracts, not component-local defaults.
- Theme behaviour includes eight palettes, separate mode/palette/adjustment persistence, scoped outcome variables, opaque layered gradient borders and a different border direction at <=440px. Header/home use <440 rules. Broad reset/component styles or mechanical breakpoint replacement could change these behaviours. Keep the existing token mapping authoritative and verify actual rendering at threshold boundaries. No framework API/version claim was made in this local audit.
- Portable puzzles already expose a host/package boundary and disposal: `js/challenge-controls.js`, `packages/puzzles/ARCHITECTURE.md` and the player API describe it. Preserve pointer/keyboard/Undo/Go timing semantics and parent-owned marking/progress when mounting controls from a component. Dialog backdrop cancellation must retain Keep working semantics and the initial-profile exception.
- Docs contain adopted requirements, labelled proposals and dated historical evidence. The just-corrected subtitle rule shows why current teacher decisions must be explicit. The readiness review predates the portable-package boundary, new navigation/recall and latest UI refinements. Its old production-test metadata rejection has already been corrected in the current test; do not repeat it as a current failing test without evidence. The migration brief is sound direction, but it is not a component/state ownership plan or a current acceptance matrix.
- Browser evidence is partly temporary, and some scripts still assert old DOM structure: `scripts/browser-esp.mjs:64,70` expects card-body/overlay artwork. `tests/production-build.test.js` also assumes exactly three CSS links and a particular app-bundle naming pattern. During migration preserve the meaningful behavioural/packaging assertions while updating obsolete implementation selectors; do not reproduce obsolete UI merely to satisfy a stale test. `npm test` does not invoke browser scripts and Pages does not test/build. A fresh, bounded baseline and named checks per migration slice are still needed.

**Recommendation and boundary.** Before the first migration slice, agree framework/build architecture, component/state/listener ownership and a current acceptance matrix. Preserve existing domain modules and storage/code contracts. Reconcile historical test expectations during the test-quality stage; keep explicit product changes separate from migration equivalence. The broader app.js deferral remains in force. Existing skill stage-3 findings (heading focus and small code fragments) and stage-4 gate remain pending; this requested risk check does not silently approve their fixes.

### 14 October 2026 — Application responsibilities separated before migration

**Agreement and scope.** Following the migration-risk discussion, the teacher approved better separation of concerns before Svelte/Tailwind, superseding the earlier app.js deferral. Applied the approved code-quality work using the project-refactor-checks discipline and existing requirements. This is plain-JavaScript extraction and lifecycle ownership, not framework/build migration or approval of unrelated presentation changes. The prior skill stage-3 findings and broader stage-4 discussion gate remain pending.

**Files and responsibility review.**
- `js/app.js` now mounts the application and exports its cleanup. New `js/application.js` composes controllers, routes, bank loading and stale-render protection; it retains the entry script URL for build diagnostics. No content, storage schema, question identity or production-build contract changed.
- New `js/profile-session.js` owns the current profile, selection/restoration, persistence and same-profile/generation history restoration. New `js/progress-page.js` owns temporary filters, progress rendering and transfer controls. Existing profile, progress, revision and backup calculation modules remain authoritative.
- New `js/practice-controller.js` owns attempt actions, entry recall, answer bindings, hints/review, submission, deadlines and resume. New `js/activity-view.js` and `js/question-view.js` take explicit inputs and produce markup without saving or owning attempt state. Authored JS and major HTML templates are formatted for reading; framework components remain future work.
- New `js/entry-pages.js` contains home cards, exam entry, search results and information pages. New `js/practice-heading.js`, `js/search-sets.js` and `js/view-utils.js` share breadcrumbs, constrained search-set construction, escaping and duration display. New `js/app-feedback.js` owns transient messages, clipboard fallback, diagnostics and downloads.
- New `js/app-lifecycle.js` owns global link/visibility/page events and both polling intervals. `js/navigation.js` now removes its history listener and ignores leave decisions resolving after disposal. `js/theme.js` removes its subscriptions and generated controls. `js/onedrive.js` cancels its debounce and drains queued/current writes during explicit application disposal. Pagehide retains pause/save behaviour for browser-cache restoration; it does not unmount the app. Native file operations already underway may finish; this is not a cancellation API for every pending user action.
- Added `docs/application-architecture.md` as the current ownership and migration-contract map. Linked it from `AGENTS.md` and `docs/README.md`; updated `docs/local-development.md` and the superseded sequencing in `docs/planned-work.md`. `README.md` now directs home-card editing to `entry-pages.js`. Historical reviews remain dated evidence.

**Tests and fixes.** Added four focused unit checks in `tests/activity-view.test.js` and `tests/navigation-lifecycle.test.js`: explicit frozen view inputs, escaped answers, submission-gated feedback, removed history listeners and late asynchronous decisions. Added `scripts/browser-app-lifecycle.mjs` to check repeated disposal/remount, zero retained polling/history/visibility/form listeners, eight theme tiles, retained answers and guarded Back. Its first run found a test-only CDP evaluation wrapper error; corrected the wrapper and reran successfully.

Three older fixtures blocked relevant verification and received narrow corrections: `scripts/browser-profiles.mjs` now advances the display clock for stale evidence because pagehide intentionally overwrites external storage edits with live profile data; `scripts/browser-onedrive-go.mjs` checks file status on My progress after the earlier removal of question-page file controls; `scripts/browser-theme.mjs` uses the portable player's current theme scope for selected controls. Product behaviour was not changed to satisfy these stale expectations. The older ESP script's broader obsolete selectors/storage assumptions remain outside this work.

**Verification.** The final full unit suite passed **199/199**, including production validation/build and deterministic packaging checks. Production browser checks passed navigation at 360–1280px, all 20 Python guides at 320/640/1280px, named profiles/backup merges/recommendations/weekly results and simulated practice timing, puzzle integration, OneDrive real-handle saves/reload/write failures/storage failures/conflicts, Go engine/clocks/touch/keyboard/reflow, repeated app disposal/remount, and all eight themes with adjustments/persistence/marked states across all four banks. A bounded temporary ESP check passed written-answer reload/review, spreadsheet formulas and full marking, and expired timers preserving prose and recording exactly once across reload. It does not claim the old full ESP script passes. New-module unresolved-name checks, JS syntax, changed documentation links and whitespace checks passed. Temporary scripts/logs/screenshots remain in `/private/tmp/tlevel-separation-*`; a cached formatter was reused without adding a dependency.

**Handover.** Rebuilt `live/`; no commit or deployment. CSS, banks, portable puzzle sources, dependencies and build scripts are unchanged. Framework/build architecture, component migration slices and the remaining specialised breakpoints still need agreement. The current controller/view boundaries are a preparation step; they do not claim that template complexity or every future migration risk has been eliminated.

### 14 October 2026 — Maths framework adoption and reuse review

**Scope and decision.** Reviewed the related Maths checkout at commit `6ac4e021f51b13edcf55ff8c6f59fd656733d00c`, including its guidance, actual SvelteKit routes, application session, adapters, Svelte components, Tailwind/daisyUI styles, Bits UI controls, portable puzzle wrapper, build hooks and verification runner. The teacher explicitly confirmed full adoption, semantic classes, token mapping and Bits UI controls as the target. This is a requested reference review, not a new full refactor-checks pass or implementation of the migration. Existing presentation findings and the broader test-quality discussion gate remain pending.

**Files and findings.** Added `docs/reviews/2026-10-14-maths-framework-reuse.md` with source links, provenance, concrete reusable patterns, required adaptations, proposed migration sequence and completion criteria. Updated `T_LEVEL_REFACTOR_AGENT_GUIDE.md` to record SvelteKit as the chosen framework target instead of leaving Kit versus plain Vite/Svelte open. Linked the review through `docs/README.md` and `docs/application-architecture.md`; refreshed the migration row in `docs/planned-work.md`. Updated the checkpoint. No Maths files or app/runtime/build/dependency files were changed by this review.

**Rationale and limits.** Reuse injected session commands and snapshots, lifecycle cleanup, semantic utility/component composition, one theme-token mapping, Bits UI focus/portal patterns and a Svelte wrapper around the portable player. Preserve this app's storage/backups, lazy packed banks, assistance/deadline rules, guarded history, two-hour recall, <=440px borders and staged-snapshot production build. Maths's older-progress waiver, all-bank loading, header geometry and assessment rules do not transfer. The current plain-JavaScript separation still needs DOM bindings removed from application actions during migration; it is not already a framework-neutral session. Route compatibility, build integration and implementation slices remain for architectural discussion.

**Verification.** This was a source/documentation review, not a fresh execution of Maths's recorded test results. Checked review source paths, changed local documentation links and whitespace; Maths remained clean and unchanged. Reused existing T-Level implementation evidence without rerunning app suites for documentation-only work. No migration, install, commit or deployment.

### 14 October 2026 — Full framework migration

**Agreement and scope.** The teacher authorised implementation after confirming full SvelteKit/Svelte, Tailwind, daisyUI and Bits UI adoption and reviewing the Maths reference. This completes that migration rather than another preparatory split. Reused the earlier project-refactor-checks findings and approved separation work; unrelated heading-focus/small-code findings and the broader test-quality discussion gate remain separate. No commit or deployment was requested or performed.

**Application ownership.** Added the static Kit routes and `src/lib/components/` for the shared shell, home/exam/search/information/progress/Go pages, practice/question/guide/puzzle components and controls. `src/lib/application/` owns observable application snapshots, profile persistence, practice commands and derived display models. Components render and bind events; existing domain modules still own codes, marking, progress eligibility, backups, search and puzzle rules. Removed the replaced root HTML and legacy application, navigation, lifecycle, controller, view, dialog and feedback modules. `js/theme.js` now holds palette labels; `js/issue-report.js` retains pure report formatting; OneDrive exposes actions/status without a legacy DOM mount. Home card content is edited in `Home.svelte`.

**Routing and lifecycle.** Kit owns browser history through its navigation hooks and supported snapshot lifecycle API. Static paths represent the finite pages, with codes/types/search in query parameters; old hash links translate through the same router. Per-profile two-hour selection recall remains separate from history snapshots. The detailed acceptance checks caught the hazards of asynchronous shallow-state writes during traversal; replaced those writes with Kit snapshots. Removed obsolete `keepFocus`/leading-slash asset calls after inspecting the installed Kit 3 implementation. Explicit picker breadcrumbs return to the blank selector. Sessions dispose timers, global listeners, prompts and queued saves; portable puzzle/Go controls own and dispose only their assigned subtree. General guides retain independent progress, deadlines survive background/reload, and submitted results are not duplicated.

**Styles and controls.** Added Tailwind semantic composition, selected daisyUI component foundations and one mapping from the existing palette/outcome tokens. Default daisyUI themes and Tailwind Preflight remain disabled to preserve accepted presentation. Bits UI owns dialogs and navigation/theme popovers; native selects/ranges/disclosures remain where appropriate. Preserved the compact header/subject line, home cards and opaque gradient borders. Consolidated shared breakpoints to 440/768/1024px, retaining the explicit <=440px question edge, portable puzzle rule and intrinsic 336px home inset. Popovers use viewport positioning and available-height constraints. Theme tests now bring a trigger into view before a simulated click; closed Bits menus are unmounted.

**Build and distribution.** Added pinned framework dependencies, Svelte diagnostics, formatting configuration and `prepare-site.mjs`. The build validates identities/search/hints, packs the same four lazy banks, replaces authoring imports only for production, and prerenders every public entry into `live/`. Content-derived Kit versions preserve reproducible output. GNU Go worker/WASM/corresponding source/licences remain distributed; added Vite's bundled-dependency licence inventory and CSS dependency notices. The pre-commit builder retains an isolated Git-index checkout and lockfile check, now defaults to `/starters`, and still stages only generated output. An isolated source copy with symlinked installed dependencies built successfully, then passed real static subpath checks. Repaired dataless local lightningcss package files from the exact pinned package; updated the vulnerable transitive source-map-js release, after which npm reported zero vulnerabilities.

**Verification and fixes.** Framework diagnostics report zero errors and warnings. The full test run passed 198 cases and exposed a prerender-only loading-link access to query data; corrected the link text and reran the build test successfully, giving 199 passing cases across the full run and focused repair. The production test rebuilds twice and checks identical output, packed-bank isolation, all static entries and engine/source/licence distribution. New service lifecycle tests cover three disposal/remount cycles, cancelled pending prompts, removed listeners/intervals and saved answers. Updated staged-hook tests retain partial-staging and failure-isolation assertions. Replaced obsolete renderer/history-only tests and the old application-remount browser fixture with the new service tests and migrated browser acceptance cases.

Browser checks passed for:
- Header/home layouts from 360–1280px, theme controls, blank/remembered/expired focus, Core/ESP subsection recall, picker breadcrumbs, Back/Forward/cancel, same-attempt restoration, projects/FAQ/search and legacy share links.
- All eight themes: default semantic/action contrast, full adjustment ranges, paired switching, persistence/reset, marked states and responsive popovers. Development CSS HMR retained entered form text; development navigation passed too.
- Profiles, canonical-name suggestions, validated backup merging/switching, invalid-import isolation, recommendations, weekly history and simulated interaction/idle/background practice time.
- Every Python guide at 320/640/1280px, keyboard disclosure, reload and independent evidence; all 14 puzzle integration cases with saved answers, submission/reveal and reflow.
- ESP formula answers, written review status/text across reload, edge-to-edge question cards at <=440px, and timer expiry after reload recorded exactly once.
- Real origin-private file handles, local-first saves, write/quota failures, conflict protection and retry; Go engine, clocks, touch, keyboard and reflow. The migration, detailed navigation and full file/Go suites also passed under `/starters/` on a file-only server.

Browser fixtures were corrected to wait for a genuinely new document on reload, dispatch bubbling events and supply user activation for simulated navigation. Without activation, Chrome may omit synthetic history entries; that is not a user Back test. Checks used only the dedicated test profile. No physical Safari, screen-reader or OneDrive desktop sync validation is claimed. Vite still reports a large client chunk; bank packing/lazy loading remains intact and further route-level splitting can be evaluated separately.

**Documentation and handover.** Updated AGENTS, README, the refactoring brief, documentation index, ownership map, local development, planned work, style/theming guidance and third-party notices. Dated reference reviews remain historical evidence. Current docs identify the implemented owners, supported commands, deployment prefix, breakpoint exceptions and current browser suites; older broad smoke/ESP fixtures are explicitly not current acceptance evidence. Checked changed local links and whitespace. `live/` is a root preview build; the commit hook builds the repository-prefixed publish output. The source preview is at port 5173 while its local process remains running.

### 14 October 2026 — Repair real pointer navigation on home cards

**Cause and fix.** The teacher reported that clicking the home activity cards did not navigate. Reproduced with real browser mouse-down/up events. daisyUI's active button rule applies `translate: 0 .5px`; on the stretched card link this creates a new containing block, shrinking its absolute overlay from the card to the button during the press. Mouse-up over the title/artwork then misses the link. Added a scoped active-state `translate: none` rule in `css/styles.css`, preserving the existing native links and card appearance. No routing or assessment changes were required.

**Verification gap and prevention.** Earlier browser suites invoked `.click()` directly, bypassing pointer hit testing and pressed styles. Added `scripts/browser-home-cards.mjs`, which checks the actual hit target both before and during a press, then verifies navigation and Back. It covers each card's title, artwork, metadata, button and padding, plus keyboard activation, at 360/440/1280px. It waits for the profile dialog's brief pointer lock to release and for scrolling to settle. Linked this check from the ownership map and local-development guidance. This is a focused regression correction within the authorised migration; it does not replace the separately pending broader test-quality review.

**Results.** The new check failed before the CSS fix with a pressed hit target of null and computed translation `0px 0.5px`. All 54 activation/Back cases pass against both development and rebuilt production. Framework diagnostics report zero errors/warnings; production build and whitespace checks pass. Rebuilt `live/`; no commit or deployment.


## 14 October 2026 — Responsive breakpoint comparison

Reviewed the app's breakpoint register, authored width queries and responsive requirements against the Maths app's register and UI_TASTE guidance. Both use named Tailwind variants and the same 440/768/1024px viewport scale. All three thresholds have active consumers; the Maths-only progress/reference/container thresholds are correctly absent here. This app also retains the inclusive 440px question-edge variant, two plain-CSS 440px rules and a 336px home inset protecting the required 295px code-entry width.

Recommended retaining the shared scale, grouping responsive rules by owning component, documenting consumers and boundary conventions as clearly as Maths, and assessing an intrinsic gutter calculation to remove the 336px exception. The app-owned Go rule could share a named inclusive variant; the challenge rule must retain its documented plain-CSS source-style consumer compatibility. These are recommendations, not adopted changes. Updated only this log and checkpoint.md; no app CSS or requirement changes. Verification was static source and documentation comparison; no new browser checks were needed or run.


## 14 October 2026 — Consolidate responsive rules and prevent the refresh theme flash

Implemented the agreed responsive review. `css/styles.css` groups responsive rules by shell/navigation, home, question/submission, progress and search/exam ownership, merging repeated rules within each group. Retained the 440/768/1024px scale. Replaced the 336px home-gutter exception with intrinsic padding using the single 295px `--home-entry-min-width` constraint. The gutter now also accounts for usable space lost to scrollbars. `src/lib/styles/breakpoints.css` supplies the explicit `max-viewport-small-inclusive` variant for question-card edges and the app-owned Go gutter in `css/puzzles.css`; portable `css/challenges.css` remains plain CSS. `docs/style-guide.md` records consumers, boundary conventions and checks.

During this work, the teacher reported a Sage flash before Rose on refresh. The migrated controls restored saved colours only on mount. Extracted preference validation and restoration into `js/theme.js`, shared with `src/lib/theme/preferences.js`. New `src/hooks.server.js` inserts the same self-contained restoration function at the head marker in `src/app.html`, during development and prerendering. The synchronous script reads local preferences before application scripts load; no saved data is embedded in generated HTML. Saved mode, palette and adjustments now apply before first paint. `docs/theming.md` explains ownership; the local-development and application-architecture guides link the new `browser-theme-startup.mjs` regression check.

Verification: Svelte diagnostics reported zero errors/warnings; production build and whitespace checks passed. A temporary browser harness compared old/new computed responsive styles and geometry across eight representative routes at 14 widths (320, 336, 337, 360, 439, 440, 441, 767, 768, 769, 1023, 1024, 1025, 1280px), plus three widths with 125% root text size: 136 comparisons. Only intended intrinsic home-gutter differences remained; entry-card width, header fit and inclusive question/Go edges passed. All eight themes and saved adjustments passed with application scripts blocked and retained identical colours after mount; invalid preferences and unavailable storage fell back safely. All ten prerendered routes contain the head bootstrap. Real-pointer/keyboard home-card checks passed all 54 activation/Back cases. Initial verification fixtures needed corrections for scrollbar-dependent gutter changes and expected blocked-module errors replayed by CDP; the startup check now restores a healthy document before ending. No outstanding application failures.

Disposable evidence is in `/private/tmp/tlevel-responsive-{check,build,layout,cards}.log`, `/private/tmp/tlevel-theme-startup.log`, and the temporary responsive comparison harness/snapshots. Broader content/domain suites were not rerun for these changes. No commit or deployment; existing migration limitations remain.


## 14 October 2026 — Keep My progress visible in the header

Added a direct My progress link beneath the hamburger in the shared `src/lib/components/ui/Header.svelte`, retaining the existing menu entry. It uses the existing route helper and marks the progress page with `aria-current`. In `css/styles.css`, the control group now uses three grid columns with the link right-aligned beneath them and a 44px minimum target height. The brand stays aligned to the top so its subtitle does not move; profile details retain their full separate row. No new breakpoint was needed. `docs/style-guide.md` records the adopted header requirement.

Verification: Svelte diagnostics reported zero errors/warnings, production build passed and whitespace checks passed. A focused browser check covered home, programming and progress at 360/440/768/1280px with a long profile name. The icon row stayed unwrapped, the brand/subtitle and progress link did not overlap, the subtitle retained its position and the link target met 44px. Real pointer clicks on both the direct link and menu entry opened progress; current-page semantics updated and the menu closed. Evidence: `/private/tmp/tlevel-header-progress-{check,build,browser}.log`; temporary harness: `/private/tmp/tlevel-header-progress.mjs`. Broader unchanged flows were not rerun. Updated checkpoint.md; no commit or deployment.


## 14 October 2026 — Development loading and compact header/toolbar spacing

Investigated the reported delay after the initial page paint on the development preview (5173). No app cache clearing, cache-busting URLs or forced uncached bank fetches were found. Normal reloads reused cached data, with development source revalidation. Three local Python refreshes reached questions in 171–328ms versus 56–61ms in the built preview; the reported multi-second delay was not reproduced. Development nevertheless imported all readable banks unnecessarily. `js/bank-data.dev.js` now loads them through native dynamic imports on demand; `vite.config.js` selects this interface for development and retains the existing packed production loader. Node authoring tools keep their eager interface. The first development check exposed Kit's serving restriction for lazy authoring paths; explicitly allowing only `data` and `packages/puzzles` alongside Kit defaults resolved it. Python reload resources fell from 227 to 195; follow-up timings varied from 137–382ms, so no guaranteed latency improvement is claimed. Home loads no bank; all four practice pages were verified to load only their own readable bank. The new loader shares module data across repeated/concurrent calls.

Tightened the requested header spacing in Header.svelte and css/styles.css: greeting and Last tracked are stacked beside the profile-switch button; the header row gap and narrow bottom inset are smaller. The profile switch retains a 44px target. Direct/menu progress links, unwrapped icons and subtitle placement still pass at 360/440/768/1280px with a long profile name. A 360px fixture measured a 3.16px gap between greeting and metadata and a 159.39px header.

Fixed the separately reported oversized set-toolbar gap. daisyUI's inherited card column direction turned the summary's 10rem flex basis into vertical height. Set-toolbar and result-banner layouts now explicitly use wrapping rows; the timer selector has intrinsic width instead of daisyUI's fixed select width. Added content-height, row-gap and selector-width checks to browser-assessment.mjs, with a --layout-only selection for focused CSS work. Visual inspection of a generated two-question Python set at 360px confirmed the correction: summary height 17.91px and selector width 58.94px, without the blank block. A code transcribed from the screenshot did not resolve, so the visual check used a generated set rather than changing code compatibility.

Verification: zero Svelte errors/warnings; four bank-loader/build/staged-build tests passed, including deterministic production builds and no authoring banks in production bundles. Rebuilt after the toolbar fix. The focused assessment run passed toolbar layout at 360/440/441/768/1024px, mobile question borders and submission; header navigation/layout checks and all four development-bank checks passed. git diff --check passed. The extended assessment run stalled during the clock-mocking scenario and was stopped; its cause remains unconfirmed and it is not recorded as a pass. The dedicated test tab was replaced, removing the mock, and focused checks passed afterwards. No timer implementation changed.

Updated docs/local-development.md, docs/application-architecture.md and docs/style-guide.md with loading and layout ownership/checks, plus checkpoint.md. Evidence is in /private/tmp/tlevel-refresh-timing*.log, tlevel-dev-bank-check.log, tlevel-startup-build-tests.log, tlevel-startup-spacing-check.log, tlevel-toolbar-{build,layout,assessment}.log, tlevel-compact-header-final.log and tlevel-toolbar-fixed.png. No commit or deployment.

## 14 October 2026 — daisyUI maintainability guidance and session close

The teacher reaffirmed that daisyUI adoption must remain maintainable, without accumulating workarounds that fight its components. Use supported variants where they fit, shared semantic classes for customisation, and explicit component layouts where required. The recent spacing corrections use ordinary CSS row direction and intrinsic sizing; they do not patch library code, add !important or introduce JavaScript layout workarounds. Repeated inherited-style conflicts nevertheless exposed gaps in migration integration checks; this is not evidence of a complete daisyUI audit.

Session closed with the requested fixes complete and the checkpoint current. The unreproduced multi-second development loading pause and stalled clock-mocking check retain their recorded limitations. This wrap-up changes only DEV_LOG.md and checkpoint.md; no application tests repeated, commit or deployment.


## 15 October 2026 — Puzzle input regressions and exclusive profile editing

**Investigation and causes.** Reproduced the Cover Paths regression in the committed production build with real pointer input. Moving through [9, 6, 7, 8, 5] saved successive one-dot routes [9], [6], [7], [8], [5]. The root and pointer capture survived redraw; the retained drag callback read the detached attempt snapshot supplied when it was bound. Svelte's asynchronous rendering also exposed stale reads between interpolated moves within one pointer event. A second browser reproduction confirmed that ordinary puzzle inputs were replaced after each character: typing 1 then 2 retained only 1 and focus moved to the body. These are migration integration faults, not changed puzzle rules. The new keyboard check also exposed a missing focus selector when activating a path dot; this gap was in the shared control.

Reproduced a separate history-loss path with real practice/profile services and then two browser tabs: an assisted submission created a history row, but a stale tab's next answer save replaced stored history with an empty array. Another stale writer can restore its own older view, so the visible result depends on which tab saves last. The whole-profile save implementation already existed in pre-migration commit 67c927a. This establishes a possible cause, not the cause of any particular student's missing records; no student browser data was inspected. Hints correctly retain eligible completions and final marks in history, while excluding assisted questions from independent revision evidence. Early repeats remain intentionally untracked under the four-hour rule.

**Changes and decisions.** js/challenge-controls.js now reads the live attempt through a getter, so every accepted move is immediately visible to a continuing gesture. PuzzleParts.svelte keeps ordinary text/radio controls mounted and synchronises their values separately from board markup. packages/puzzles/ui/boards.js returns a focus selector for dot activation, preserving Space/arrow-key continuation. No puzzle content, codes or marking rules changed.

The teacher selected one editable tab per profile instead of merging concurrent saves. New src/lib/application/profile-lock.js uses a browser Web Lock for each name. profile.js acquires ownership before loading/editing, blocks competing startup, guards local/file saves, and acquires destination ownership for switches and named restores. Pending outgoing file saves finish before ownership is released. Backups are revalidated under destination ownership; unreadable saved profiles are not replaced by an empty fallback. session.js shares repeated startup/retry calls and disposes profile ownership with the application. AppShell.svelte shows the blocked reason and Try again. Retry retains the originally requested name and loads the latest saved data, even when another tab has switched profiles. Storage keys and result schemas remain unchanged. Different profiles may still be used in different tabs.

**Ordered project-refactor-checks review.** Stage 1 evaluated the relevant common/puzzle/progress specs, authoring rules, architecture/development guidance, style/comments, migration evidence and handover for alignment, ambiguity, duplication, organisation and discoverability. No requirement rewrite or documentation consolidation was warranted; the teacher agreed to retain the rules. Stage 2 identified the captured-state and whole-profile-write problems; existing service/package ownership remained appropriate, and the teacher authorised focused fixes conditional on that architecture remaining sound. Stage 3 presented the reproduced behaviours and storage choices; the teacher explicitly chose exclusive profile editing. Stage 4 identified missing real gestures, character-by-character input and multi-session persistence coverage. The teacher approved focused regressions and explicitly required efficient, change-selected execution. No broad refactoring or comment-only cleanup was performed. docs/spec-progress.md records the adopted tab policy; docs/application-architecture.md records owners/lifetimes; docs/local-development.md maps changed areas to checks and retains independent selection of the new browser cases.

**Verification and prevention.** Added tests/profile-lock.test.js for exclusive ownership/release, independent profiles, hinted-result retention, blocked switch/restore and corrupt-storage preservation. application-lifecycle.test.js now calls startup concurrently to verify that retry cannot duplicate ownership requests, listeners or polling. New scripts/browser-interaction-regressions.mjs accepts --puzzles and --profiles independently; it is not added to unrelated development commands. It checks real continuous/fast dragging, backtracking, release/resume, Space/arrow focus, Undo, character entry/caret replacement, reload/submission, and two-tab blocking/retry/switching/close behaviour.

All focused checks pass. Initial investigation ran 21 framework/profile/repeat/subtopic/lifecycle cases. After the changes, 12 relevant profile-lock/lifecycle/framework/file cases passed; the final startup change was checked with the eight affected lock/lifecycle/framework cases and Svelte diagnostics (zero errors/warnings). The new puzzle and two-tab browser selections pass. All 14 existing production puzzle integration cases pass, including other puzzle controls, scoring, reload, reveal and narrow layouts. The existing profile/backup browser suite passes naming, switching, named restore, invalid imports, history/recommendations and practice-time behaviour. The linked-file-only browser suite passes local-first saves, browser/file failures, retry, reload and conflict protection. Production build and git diff --check pass. Existing large-client-chunk warnings remain. Unrelated content/theme suites and a full npm test run were not repeated.

Initial reproduction harness failures were corrected: the committed build required /starters mounting; real pointer use activates beforeunload; and tab closure must finish releasing its lock before testing a subsequent switch. These are not recorded as application failures. The keyboard regression test failed before the focus-selector correction and passed afterwards. No physical Safari or OneDrive desktop sync validation is claimed. Ownership requires Web Locks on HTTPS/localhost; unsupported/unreadable startup stays blocked with an explanation. Already-open old-version tabs cannot participate in the new protection and should be closed after updating. This prevents future overwrites; it does not reconstruct already-lost records.

Evidence: /private/tmp/tlevel-regression-{build,tests}.log, tlevel-puzzle-integration.log, tlevel-profile-browser.log, tlevel-profile-files.log and temporary tlevel-reproduce-{drag,progress}.mjs. The current built preview is http://127.0.0.1:8765; the earlier 8766 /starters mount was only for the committed baseline. Updated checkpoint.md. No commit or deployment.


## 15 October 2026 — Session close and handover check

At the teacher's request, checked the completed regression record and current guidance for an immediate session wrap-up. The preceding entry records both reported problems, the additional typing/keyboard findings, reproduced causes, focused fixes, the choice of exclusive profile editing, test-selection rationale and actual verification. It distinguishes the older stale-tab defect from the migration regressions and does not claim to establish the affected students' individual data-loss cause or recover missing records.

Confirmed that the progress specification, ownership map and local-development guide match the implemented behaviour and independently selectable checks. Changed documentation links resolve and whitespace checks pass. Updated checkpoint.md to close the session and retain the next action, source/build status, evidence locations and limitations. Only DEV_LOG.md and checkpoint.md changed during this wrap-up; no application tests or builds repeated. Source changes and regenerated live/ assets remain uncommitted and undeployed. The generated hashed-file additions/removals are build output, not additional feature changes.

## 19 October 2026 — ESP Task 2 comparison with teacher improvement brief

**Focus and scope.** Compared the existing untracked `docs/esp/task_improvements.md` with all 15 Task 2 templates and the generated structure of their 75 variations in `data/esp.js`. Read the current ESP source guide, Task 2 designs, activity evidence, distilled assessment conclusions and relevant shared content, presentation and engineering guidance. Reused saved assessment research; no downloads or source reconversion. Inspected `Question.svelte`, `Stimulus.svelte` and related layout rules to distinguish authored omissions from renderer support. This was a source-level content/UX review, not a browser accessibility audit.

**Findings.** Only slots 15, 21, 22 and 28 provide code: 20/75 variations. All T2.2 and T2.4 questions lack code panels. No Task 2 variation has a test-log table or grouped valid/invalid input-entry structure. Current choices render as radios and repairs use text fields. Slot 15 reveals its selected defect-exposing input in the later expected-result prompt. Slots 19/25 supply actual outcomes for students to repeat; this practises observation recording but not predicting Python behaviour. Slot 24 supplies the test input, asks students to select it again and requests a prose rewrite of an already-selected purpose. Several distractors can be eliminated without reading code. Slot 27 describes its condition in prose and its hint incorrectly refers to an observed shorter case although the observation is overlong. Many code-free questions use the shared two-column desktop parts layout, which does not express a sequential test-plan workflow. These implementation/content findings are recorded for later stages, not fixed during the documentation review.

**Project-refactor-checks stage 1 evaluation.** The older Task 2 design already requires requirement-led tests, snippets for each miniature investigation and repeated test-log structure; the first-release evidence document explicitly supersedes some richer control proposals with bounded native controls. Therefore the differences are a mixture of narrowed implementation and newly requested behaviour, not wholesale failure to implement an agreed editor. The teacher brief should be linked from the source guide and reconciled into the current Task 2 design after agreement, preserving the original brief. Avoid a further competing design document. Clarify that predicted behaviour is not an observed Actual outcome; the current no-runtime design needs explicit labels. Reconcile older separate-review prose guidance with the adopted 7 October useful-automatic-marking requirement (already tracked in planned work). Clarify valid versus invalid boundary labels, function input/return types, value-dependent answer options, and the per-question timing budget. The activity evidence file retains an obsolete pending Task 1 formula addition and verification references to a moving checkpoint; these are low-priority documentation findings outside the Task 2 implementation scope. Source headers/comments are present but the ESP bank has only a brief provenance/slot comment rather than the full policy header; detailed code-quality assessment remains stage 2. No broad documentation reorganisation is justified. Stage 1 awaits teacher discussion; stages 2–4 have not been run or waived.

**Recommendation for review.** Pilot two independent questions: an inclusive-range validation function and a short calculation function. Each should show concise requirements and actual Python, then linked input/category, expected-result, predicted-result, cause and repair controls, with a compact five-column test-plan summary. Use separate valid/invalid groups where appropriate, precise result/type choices, plausible wrong answers, and fixed supplied calls when freely entered data would make prediction choices ambiguous. Keep causes and fixes separately assessed, preserve passing cases and confirmation/regression practice, and keep within five minutes per question. A full 3–5 valid plus 3–5 invalid input exercise with predictions and repairs may need its own longer starter rather than being repeated three times in a set. Use new stable slots if the assessed task changes materially; retain old-code access as required by the authoring policy.

**Checks and changes.** A read-only Node inventory confirmed counts and control shapes across all 75 variations. Independently executed a proposed integer-only `check_choice` example in Python: inputs 1/4/8/0/9/-3 produce 1/4/None/None/None/None with the faulty `< 8` check; only 8 differs from the stated inclusive requirement. No application tests/build were needed for this review. Updated only DEV_LOG.md and checkpoint.md; preserved the teacher brief unchanged. No content, renderer or requirements changes, commit or deployment. The old checkpoint's uncommitted implementation claim was stale against the initial clean tracked working tree. Next action: discuss the comparison and proposed pilot, then complete the ordered review gates before implementing agreed changes.

## 19 October 2026 — Agreed Task 2 draft requirements and code-quality review

**Agreement and documentation.** Approved the comparison and refinements, requested automatic marking wherever possible, explicitly allowed supplied prediction inputs, and asked to proceed towards an improved draft. This completes the stage 1 discussion; it does not explicitly waive later skill gates. Updated `docs/esp/task-2-designs.md` with a dated authoritative revision covering requirements plus Python, grouped valid/invalid inputs, precise expected/predicted results, separate cause/correction choices, confirmation and timing. Linked the unchanged original teacher brief from `docs/esp/source-guide.md`. Marked `activity-evidence.md` as first-release evidence, distinguishing its older prose-review approach from the agreed draft. No unrelated historical corrections or broad documentation reorganisation.

**Stage 2 code-quality evaluation.** Reviewed `data/esp.js`, the adjacent formula authoring pattern, `Question.svelte`, `Stimulus.svelte`, shared marking/evaluation, packing/decoding, and relevant selection/identity paths. The existing exact-choice, numeric and bounded-code markers fit supplied-call questions; no new Python interpreter, evaluator or answer store is needed. Authored metadata survives packing, so grouped presentation can remain separate from scoring. Main maintainability concerns are the ESP bank's very long one-line generators and incomplete policy comments, plus the risk of adding another large answer-rendering branch to the shared question component. Prefer a readable separate Task 2 authoring module, local documented builders, explicit stable slots and a small opt-in renderer extension. Reuse current part IDs, answer commands, feedback and reveal paths; do not duplicate persistence or broadly refactor existing banks. Keep groups as presentation metadata over existing parts rather than changing marking order. Current dependency checks address preceding part indexes, so group rendering must preserve order. A test-plan summary must show saved student responses rather than decoded model answers.

**Boundaries and alternatives.** Keeping only existing radio/text controls would minimise source changes but would miss the agreed UX. A standalone Task 2 renderer/marking system would duplicate lifecycle and feedback behaviour. Recommend extending existing controls narrowly with native selects and grouped labels, plus a compact question-specific summary. New substantive investigations receive unused slots (currently 36 onwards); historical slots 15–29 retain code access. ESP selection requires three coordinated questions, so two pilots can be reviewed using individual codes before a complete new recipe is selectable. Do not change set encoding just to publish a two-question pilot. Free-form numeric marking currently compares authored numeric values, not arbitrary range classes; use bounded input choices initially where needed to retain trustworthy automatic marking. These are implementation boundaries for review, not implemented features.

**State and checks.** Asked for stage 2 agreement through the in-chat question tool. Stage 3 implemented-requirements and stage 4 test-quality evaluations remain outstanding with their separate gates; no later-stage changes were implemented. Checked local link targets in all three changed ESP documents and passed `git diff --check`. No application changes, tests/build, commit or deployment. Updated checkpoint.md. Next action: receive stage 2 response, then continue the ordered review; retain the authorised objective of producing the improved Task 2 draft.

## 19 October 2026 — Task 2 architecture agreed and requirements-alignment review

**Decision.** Following clarification, approved a separate question-content file within the existing ESP bank, with small grouped-control/dropdown/summary additions to the existing Svelte UI. This completes stage 2 discussion. It authorises no separate bank, interpreter, marking system or persistence layer. Existing content was not extracted or reformatted merely to exercise the review stage; the agreed organisation will be applied when authoring the new draft.

**Stage 3 evaluation.** Reused the recorded 75-variation inventory and inspected the exact source and rendering paths against the agreed 19 October design. Existing failures include absent snippets for miniature investigations, answer leakage from later prompts, weak distractors, the stale shorter-case hint in slot 27 and substantive written reasoning without automatic marking. The older first-release implementation deliberately narrowed richer controls; its flat part structure and repeated fault records explain the current disconnected presentation, rather than a Svelte migration deleting existing snippets. Grouped inputs, result/diagnosis dropdowns and a prediction-labelled test-plan summary are newly agreed draft requirements, not already implemented features. In-browser Python execution remains deferred. The current automatic marker and answer service can be reused for fixed supplied calls and bounded choices. The framework brief and historical readiness review were read; their pre-migration state does not supersede the implemented ownership map.

**Concrete proposed first set.** Three independent questions, each with five coordinated variations: an inclusive-range validator; a simple calculation function; an input-retry loop. Begin authoring with validation/calculation, then complete the third question before normal recipe selection. Every question supplies its requirements, typed inputs and Python; asks bounded test-data/category questions where relevant; separates requirement-derived expected results from predicted code behaviour; and separately assesses cause, correction and suitable follow-up tests. Include passing cases and distinct fault variations, not only changed names/numbers. Use supplied calls for prediction. For range-data practice, bounded choices can pair a concrete value with its category and provide separate valid/invalid groups without a new range evaluator. Keep the five-minute target and avoid making every question repeat the largest data suite. A summary must leave Actual outcome as not run and label the student's prediction separately. It must not convert a proposed correction into a claimed successful retest.

**Prevention and scope.** Author explicit type/return/unit contracts; review every option against the code and brief; avoid later prompts disclosing an earlier selected test; keep substantive reasoning automatically marked. Retain old question-code access and use new IDs for the new investigations. An initial complete recipe enables meaningful review before the broader bank revision; it is not a claim that all Task 2 content is improved. The alternative of merely adding snippets to existing flat questions would leave the agreed workflow and reasoning gaps. Asked for stage 3 agreement to the concrete first set. Stage 4 remains a later, separate test-quality gate; no later-stage findings were implemented early.

**Changes and checks.** Only DEV_LOG.md/checkpoint.md changed in this increment. No application/source changes, tests/build, commit or deployment. Reused prior document-link checks; git diff --check passed. Next action: receive the stage 3 response; if agreed, author the draft through the settled architecture with a persisted implementation/check plan, then conduct the required test-quality review. Do not reopen the agreed architecture.

## 19 October 2026 — Revised Task 2 draft, retirement and completed verification

**Agreed scope and requirements review.** Refined and approved stage 3: range, length, presence, type and format validation, combined checks, faults in either/both checks or elsewhere, variable-name typos and scope issues. New snippets must be syntactically valid; faults arise during execution. Supplied prediction inputs and automatic marking remain required. The teacher explicitly authorised retirement of the old set, transferring useful cases into the new structure. Added text/integer menu comparison, incorrect iteration count and a flag that skips the retry loop, giving six coordinated variations of each of three questions. All four project-refactor-checks discussion gates are complete.

**Content and presentation.** Added data/esp-task2.js with 18 original investigations in slots 36–38, recipe T2.6. Each has requirements and Python, supplied prediction cases, separately marked expected/predicted results and causes/corrections, and a follow-up test. Test-data selection/classification is included where appropriate; a working function prevents every example implying a fault. Question.svelte adds opt-in grouped headings and native dropdowns using existing answer storage, marking, feedback and reveal. Stimulus.svelte pairs requirements/code; new TestPlan.svelte displays student selections in the five-column structure, stacked on narrow screens. Actual outcome remains “Not run” and predictions are labelled. Longer selected options are repeated as wrapping text. Activity.svelte accurately describes automatic marking; css/styles.css contains the scoped presentation rules. No browser Python execution or separate evaluator/store was added.

**Retirement and compatibility.** data/esp.js marks slots 15–29 retired while retaining their content and code access. js/bank.js and Selectors.svelte use live recipe IDs, preserve historical labels and fall back from remembered retired recipes. With one live recipe, new sets choose a different coordinated variation. activity-model.js keeps that action available, including entry through an individual question. Regenerated data/code-history.json, js/code-compatibility.js and live/ using existing tools; final revision is 25. Historical content remains accessible. The original untracked teacher brief was preserved.

**Stage 4 evaluation and agreement.** Existing ESP tests assumed five variations, a different recipe for every new set and a Python dispatcher covering every later bank slot. Those assumptions no longer describe the approved draft. Model-answer scores alone cannot verify authored Python predictions or repairs; new controls also need persistence, summary and retirement navigation coverage. Proposed updating the assumptions, retaining historical snippet checks, and adding an independent Python oracle plus focused marking/selection/browser checks. The teacher explicitly agreed: “Agree—update and run the checks.” Updated tests/esp.test.js; added tests/esp-task2.test.js, tests/fixtures/esp-task2.py and scripts/browser-esp-task2.mjs. The fixture executes bounded input sequences and manually specified corrected snippets, then compares observed outcomes with authored answer keys. The browser fixture uses real components/services and checks all 18 variations.

**Bugs found and fixed.** Default case-insensitive marking accepted a wrong booking-code option; draft literal choices now explicitly require case sensitivity. Retirement removed the metadata supporting “test data” searches; added that skill to questions assessing data selection and retained the existing search regression. The compatibility test then correctly rejected stale generated fingerprints; regenerated code metadata before the final checks. Earlier native popup keyboard automation stalled in headless Chrome; it is not recorded as a pass. The permanent fixture dispatches select change events and verifies submitted reload independently.

**Verification.** All 34 focused tests passed across ESP, the new draft, compatibility, search, framework session, practice selection and packing. These include 93 independent Python execution checks, all 18 expectation/prediction/repair keys, rejection of all 241 incorrect draft options and blank answers, and access to all 75 retired variations. npm run validate passed for 1,353 templates and 3,001 variations; npm run check reported zero errors/warnings; the production build passed. The final browser run passed all 18 variations for selection, summaries, automatic marking, reveal, submitted-answer reload, 320/768/1280px reflow and retired-code navigation. Desktop/mobile screenshots were inspected. Logs are /private/tmp/esp-task2-final-{tests,check,build,browser}.log; screenshots are /private/tmp/esp-task2-{320,1280}.png. No full-suite or real-device accessibility pass is claimed. Native popup keyboard interaction, screen-reader behaviour and actual browser zoom remain unverified. Teacher subject review and classroom timing remain pending, especially the 15-part question.

**Documentation and handover.** Updated docs/esp/{task-2-designs,source-guide,activity-evidence}.md for the adopted design, coverage and retirement; docs/local-development.md and docs/application-architecture.md identify the focused checks. Replaced staged checkpoint plans with the completed handover. Final preview: http://127.0.0.1:8765/set/?code=ZYEgAlAEw. No commit or deployment.


## 19 October 2026 — Task 2 code complexity and neutral diagnosis prompts

**Teacher decisions and source review.** Identified that the draft's tiny functions were unlike the actual supplied ESP Task 2 code and requested comparable size and complexity. Read the RBSX SAM, RetailX AdSAM and summer 2026 Glenstar Python files, plus their matched task requirements (RBSX p4, RetailX pp4–5, Glenstar p4). Reused the recorded assessment/exemplar review. The original draft had over-applied the 12-line constraint and removed much of the input/retry and calculation context. This is a refinement of the same authorised draft following its completed four project-refactor-checks gates, not a separate framework refactor. The teacher's later screenshot also identified answer leakage from diagnosis prompts naming the faulty check.

**Content changes.** Revised all 18 variations in data/esp-task2.js to 13–21-line functions with meaningful surrounding control flow. Validation examples now collect input with flags, nested checks, exception handling, messages and retry paths. Calculations include lists, accumulated totals, per-item conversion, conditional rates/discounts and printed summaries. Retained the original assessed concepts, variation order, automatic marking and runtime-only faults. Rewrote requirements, supplied entry sequences, options, causes, repairs, follow-up tests and hints together. Separate reward-points tests expose the two rates independently. All snippets compile; they are original teaching examples calibrated against the source functions, not whole copied assessment programs. Question size remains five to fifteen answer parts; classroom timing is unverified.

Removed fault labels from all question titles, including the title that disclosed working code. The shared content builder now uses “Test 1: cause and correction” / “Test 2: cause and correction”, asks what explains the code's behaviour and requests the appropriate correction or next action. Removed obsolete per-case diagnostic prompt strings rather than leaving them hidden in authoring data. Neutral wording permits the correct no-change conclusion without announcing it. Optional hints and post-submission explanations remain separate from question prompts.

**Validation and presentation fixes.** The first content validation exposed the same obsolete 12-line cap in js/bank.js. Added a narrowly scoped 30-line allowance for ESP Task 2 investigations; ordinary Python limits remain unchanged. A focused regression checks both boundaries and prevents the exception applying to ordinary Python. Visual review exposed wrapped Python lines losing clear indentation. css/styles.css now gives investigation code more desktop width and preserves its original lines, with scrollable overflow on narrow screens. No renderer, answer service, marking or storage changes were needed in this refinement.

**Independent verification.** Reworked tests/fixtures/esp-task2.py to capture prompts and printed output, bound execution steps, execute explicitly specified faulty and corrected outcomes, check partial repairs and compare the actual public test inputs with the fixture. It passes 148 independent executions, including boundaries, invalid-to-valid recovery, leading zeros, per-item truncation, formatted monetary output, repeated-call independence and all 18 prediction/expectation/repair keys. tests/esp-task2.test.js also verifies each cause/correction pair is linked to the intended test. All 241 wrong options and blank answers are rejected. The final focused run passed 44 tests across ESP, revised Task 2, search, compatibility, packed banks and core validation. Coverage, code metadata, content validation and production build pass; final revision is 27. No full-suite rerun was needed. Prior Svelte diagnostics remain applicable: no Svelte source changed in this refinement.

Extended scripts/browser-esp-task2.mjs to check exact rendered Python text, preserved lines and real ArrowRight scrolling of the focused code panel. The final build passed all 18 variations for selection, summaries, automatic marking, submitted reload, reveal, keyboard code scrolling, 320/768/1280px reflow and retired-code navigation. Final desktop/mobile screenshots were inspected. Native select-popup keyboard operation, screen readers, physical devices and actual browser zoom remain unverified. Technical results do not confer teacher subject approval or classroom timing approval.

**Documentation and artifacts.** docs/esp/task-2-designs.md records source-function calibration, the superseded cap and neutral-prompt requirement. docs/esp/activity-evidence.md links this refinement; docs/local-development.md describes expanded checks. Regenerated data/code-history.json, js/code-compatibility.js and live/. Preserved the original teacher brief and all unrelated existing changes. Logs: /private/tmp/esp-task2-realistic-{tests,coverage,codes,validate,build,browser}.log. Screenshots: /private/tmp/esp-task2-{320,1280}.png. Preview: http://127.0.0.1:8765/set/?code=bYEgAlAEw. Documentation links and git diff --check pass. No commit or deployment.


## 19 October 2026 — Visual separation of Task 2 test-plan stages

**Request and implementation.** Need for clearer visual separation between question sections representing different test-plan columns. Question.svelte now groups contiguous Task 2 answers into labelled panels for Test data, Expected outcome, Predicted outcome, and Comments and actions. Groups derive from the existing public test-plan references; the original part IDs, indexes, order and marking are preserved. Each cause/correction pair stays together. The renderer reuses one answer snippet for grouped and ordinary questions, without duplicating controls. No assessment content, answer storage or code identities changed.

css/styles.css adds panel borders, header fills, padding and greater spacing. Predicted-outcome headers use the theme's accent fill/text pair; the other headers use the normal soft surface. Text labels and borders convey the structure independently of colour. Python remains unwrapped and keyboard-scrollable. The test-plan summary still identifies actual outcomes as not run. Updated the adopted design in docs/esp/task-2-designs.md and verification commands in docs/local-development.md.

**Verification.** Svelte reported zero errors/warnings and the production build passed. Extended scripts/browser-esp-task2.mjs to verify that expected, predicted and action controls appear in the correct panels, panels have accessible headings, and expected/predicted header styles remain distinct with at least 4.5:1 text contrast in all eight default themes. All 18 variations passed existing marking, saved-submission reload, reveal, summary, preserved-code, keyboard-scroll, 320/768/1280px layout and retired-code checks. Desktop/mobile screenshots were inspected. A focused shared-renderer check passed real text insertion, retained focus, answer order and full-score marking in representative Core and Python questions, with no Task 2 panels appearing there. Its first harness attempt incorrectly expected programmatic click() to focus a text input; explicit focus corrected the harness, with no production change. The previous 44 content tests and 148 independent Python checks were reused because assessment data and domain logic are unchanged. Native select-popup keyboard operation, screen readers, real browser zoom and physical devices retain their earlier verification limits.

**Artifacts and status.** Rebuilt live/. Logs: /private/tmp/esp-task2-sections-{check,build,browser,shared}.log; final screenshots: /private/tmp/esp-task2-{320,1280}.png. Current preview remains http://127.0.0.1:8765/set/?code=bYEgAlAEw (revision 27). Completed the handover; no commit or deployment. Teacher subject review and classroom timing remain pending.

## 19 October 2026 — Correct Task 2 valid/invalid test-plan grouping

**Teacher correction and cause.** The draft incorrectly made each supplied prediction case a test-plan row, despite the original improvement brief requiring normally two tests per function: valid inputs and invalid inputs. The teacher reiterated descriptions of `function_name: valid inputs` / `function_name: invalid inputs`, values-only test data, and invalid suites that can be longer than valid suites. This is a correction within the authorised Task 2 work; all four project-refactor-checks gates were already completed. Reused the source research and existing repaired Python without repeating downloads or changing the functions.

**Implementation.** data/esp-task2.js now defines validity groups with bounded, labelled input-suite choices. Normal valid data and valid boundaries are grouped together; invalid suites include invalid boundaries, other invalid correct-type values and incorrect types/formats where applicable. The workshop example uses three valid and five invalid values. Exact-domain functions use fewer valid values where appropriate. Five calculation functions whose callers guarantee valid arguments retain one valid-input group and explicitly state that contract. Added eleven supplied prediction cases so all thirteen input-validating functions have valid and invalid cases; expected/predicted outcomes remain independently marked. Each question now has 6–11 parts. New descriptive answer IDs prevent previous numeric answers attaching to changed questions.

Question.svelte reads the grouped references for the existing stage panels. TestPlan.svelte displays one row per validity group with the requested description, the student's selected suite and supplied cases containing only values/sequences. Expected/predicted results identify the supplied cases; other chosen inputs are explicitly pending testing, and actual results remain unobserved. Wrong selections remain visible rather than being silently replaced by answers. Diagnosis headings remain neutral and linked to the relevant test/case. Updated docs/esp/task-2-designs.md, activity-evidence.md and local-development.md. Preserved docs/esp/task_improvements.md.

**Verification.** Updated tests/esp-task2.test.js, tests/fixtures/esp-task2.py and scripts/browser-esp-task2.mjs. All 31 focused tests passed across ESP, revised Task 2, search, compatibility, packed banks and validation. The Python fixture passes 281 execution checks, covering every correct input-suite value, all supplied expected/predicted results and existing repair/partial-repair oracles. All 310 incorrect options and blank answers are rejected. Svelte reports zero errors/warnings; content/code/coverage validation and production build pass. Regenerated code metadata and live/ once, at revision 28.

Browser checks pass all 18 variations, including exact group descriptions, values-only data, wrong selected-suite visibility, automatic marking/reveal, submitted reload, eight theme header contrasts, preserved Python/keyboard scrolling, 320/768/1280px reflow and retired navigation. Inspected desktop/mobile screenshots. No unrelated full-suite rerun; unchanged shared ordinary-question behaviour retains its preceding smoke evidence. Native select-popup keyboard operation, screen readers, physical devices and actual browser zoom remain unverified. Teacher subject review and classroom timing remain pending.

**Artifacts and handover.** Logs: /private/tmp/esp-groups-{final-tests,check,validate,codes,build,browser}.log. Screenshots: /private/tmp/esp-task2-{320,1280}.png. Preview: http://127.0.0.1:8765/set/?code=cYEgAlAEw. No commit or deployment.

## 19 October 2026 — Task 2 sharing investigation and Python execution readiness

**Reported issue and reproduced scope.** The first ESP Task 2 set shown earlier that day failed for every student; the exact code/error was unavailable. Students use Edge on Windows. The published root HTML matched the committed build. Current and earlier example codes cYEgAlAEw, bYEgAlAEw and ZYEgAlAEw resolve in source and open three questions through the published site's code-entry form in an isolated Chrome/macOS profile. This does not reproduce or resolve the classroom failure, nor establish Edge/Windows compatibility. A stale build, failed asset download, transcription or managed-browser/network difference remains possible, not diagnosed. Initial harness attempts ran before profile initialisation and used a root mount for a /starters build; corrected the harness and mount before relying on results.

**Confirmed bug and fix.** session.js treated failed letters-only mixed-case codes as search terms, hiding the original load/version error. Known historical codes now retain errors when loading/starting fails; unrecognised code-shaped strings with lowercase-to-uppercase transitions also retain diagnostics. Ordinary lowercase and title-case search terms still search. Added tests/code-entry.test.js covering real resolution followed by a start failure, an unsupported version and ordinary search terms. Extended browser-esp-task2.mjs to block the ESP bank request, require diagnostics instead of a search redirect, retry successfully, enter/copy all six coordinated Task 2 sets, retain unsupported-version errors, and reopen copied content after clearing the dedicated profile's storage. Existing 18-variation checks remain. No code format, question identity, content or marking rules changed; revision remains 28. Rebuilt live/ with BASE_PATH=/starters. No commit or deployment.

**Review and verification.** This is a targeted correction within the previously reviewed Task 2/sharing scope. Reused completed project-refactor-checks gates; assessed the requirements, implementation and missing form/error-path coverage without initiating unrelated refactoring. Thirty-three focused tests pass across code entry, lifecycle, framework session, Task 2, compatibility, codecs and search. Svelte diagnostics and production build pass. The browser suite passes the new sharing/failure checks and all existing 18-variation checks on Chrome/macOS at the repository base path. Edge on Windows and the college network remain untested. The first new unit-test fixture omitted window; corrected that test setup. Logs: /private/tmp/esp-codes-{tests,check,build,browser}.log. Local preview: http://127.0.0.1:8765/starters/set/?code=cYEgAlAEw. Browser checks intercept the clipboard-write argument in the isolated profile, not the operating-system clipboard. Updated local-development guidance. Final whitespace check passes.

**Python readiness assessment, not implementation approval.** Inspected package.json, the shared question/attempt/marking components, Python specification, Task 2 fixtures, Task 4 designs and backlog. There is no browser Python runtime dependency, worker, executable editor or execution-result marking adapter. Existing components can supply authored requirements, answers, profile persistence and feedback. Task 2 supplies 18 function-sized investigations plus independently specified faulty/corrected executions; programming has offline Python reference programs. These are reusable evidence, not a browser execution layer. The current synchronous marker compares bounded answers; execution-based assessment needs separate test specifications and an asynchronous adapter tied to the exact source/run. Editing source must invalidate results; navigation, profile changes, timeout and submission must not attach late results to a different attempt. Requested constructs/style need checks separate from behavioural success.

Proposed first slice: validate one shared Pyodide worker and accessible saved source editor on one programming function and one Task 2 repair. Queue supplied input strings before a run, capture stdout/stderr/return type/value/exceptions, isolate runs, bound output and execution, and terminate/recreate the worker for Stop/timeouts. Check startup/download size, college Edge/Windows access, resource behaviour, repeated runs, reload, timer/submission and profile cancellation before converting more content. This is ready for a prototype without a framework rewrite, not a nearly completed feature. Task 2 can then record actual observations and retests. Task 4a needs its own activities/data fixtures and later pandas/plot handling; Task 4b prose evaluation is not automated by Python. No runtime or editor package was installed. Recorded this proposal in docs/planned-work.md.

**Primary references checked 19 October 2026.** Pyodide documents module workers and asynchronous host messaging: https://pyodide.org/en/stable/usage/webworker.html . Supplied stdin and stdout/stderr redirection: https://pyodide.org/en/stable/usage/streams.html . Graceful Python interrupts require SharedArrayBuffer and suitable response headers: https://pyodide.org/en/stable/usage/keyboard-interrupts.html . Worker termination offers a hard stop without that interrupt mechanism: https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate . Self-hosting assets: https://pyodide.org/en/stable/usage/downloading-and-deploying.html . The package list includes pandas and matplotlib: https://pyodide.org/en/stable/usage/packages-in-pyodide.html . These support Pyodide as a prototype candidate, not a measured compatibility/performance claim or final version selection. Microsoft documents checking failed requests and bypassing cache in Edge: https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/network/reference . Do not clear students' site storage to troubleshoot; it contains local progress.

## 19 October 2026 — Clarify code confidence and compare PyScript

Explored whether refreshed clients should accept the Task 2 codes and why direct Pyodide was preferred to PyScript. Reused the preceding code/form/sharing checks: no known defect remains in generating/resolving the current Task 2 identities, but clearing caches is not an established fix for the unobserved Edge/Windows classroom failure. The local error-handling change improves diagnostics; it does not change valid-code decoding and remains undeployed.

Reviewed current official PyScript documentation (2026.7.3) rather than assuming the wrapper merely adds DOM bindings. PyScript can use Pyodide as its engine. Its CodeMirror-based editor provides syntax highlighting, lazy interpreter loading, independent worker environments and Run/Stop controls; terminals support interactive input in workers. These could save substantial custom implementation. Direct Pyodide gives our existing Svelte/session layer direct control of execution but requires us to assemble more editor/worker integration. Neither option supplies our test oracles, marks, attempt persistence or late-result handling. PyScript's worker/main-thread synchronisation can require hosting provisions; its sync_main_only mode avoids SharedArrayBuffer for suitable one-way calls. This needs a deployment/input pilot, not a blanket claim that PyScript is incompatible with GitHub Pages.

Recommendation remains provisional: compare PyScript with Pyodide against direct Pyodide using one real question before selecting. The earlier direct-runtime preference was an architectural starting point, not a demonstrated integration/performance advantage. Updated only the planned-work proposal and checkpoint; no app changes, builds or tests required.

Sources checked 19 October 2026: https://docs.pyscript.net/2026.7.3/user-guide/editor/ ; https://docs.pyscript.net/2026.7.3/user-guide/terminal/ ; https://docs.pyscript.net/2026.7.3/user-guide/workers/ ; https://docs.pyscript.net/2026.7.3/user-guide/configuration/#sync_main_only ; https://pyodide.org/en/stable/usage/webworker.html . No package installed or prototype run.

## 19 October 2026 — PyScript execution and question-interaction trial

**Authorised scope and implementation.** Selected PyScript for a local trial with editable runnable code, standard libraries, optional pandas/matplotlib and hooks for question-owned selection, multiple-choice substitution and highlighting. Reused the completed project-refactor-checks discussion gates and preceding readiness review; no framework refactor or live question conversion. Added prototypes/pyscript/ with a pinned PyScript 2026.7.3 editor/PyWorker adapter, Python observation harness, question fixtures, standalone UI and trial guide. The examples use the actual Task 2 workshop function, an original random die function and an original pandas sales calculation with a matplotlib chart. The adapter isolates the version-dependent editor shadow-root lookup and otherwise uses exported CodeMirror APIs. The question toolbar owns execution and retains the editor keyboard binding.

**Execution and lifecycle.** PyScript uses pinned Pyodide 314.0.3 and sync_main_only mode. Actual worker calls succeed without SharedArrayBuffer or cross-origin isolation on a plain local HTTP server. Supplied input sequences, stdout/stderr, typed returns, exceptions/source lines and chart PNGs return to question controls. Each case gets a fresh namespace; source/input changes cancel runs and invalidate results. Question changes ignore stale results. Stop and five-second execution deadlines terminate the worker; subsequent runs recover. Startup has a separate ninety-second limit. Trial drafts use a separate localStorage key; application profiles, marking and timers remain untouched.

**Verification and fixes.** Added tests/pyscript-trial.test.js and scripts/browser-pyscript-trial.mjs. All three independent Python harness tests pass, covering types, output/input recovery, syntax/name errors, source versus call line numbers, namespace reset and output limits. The full browser check passes both Task 2 repairs (eight cases), random bounds (twenty cases), Stop and timeout recovery, reload persistence, real keyboard editing/Ctrl+Enter/focus escape, selections/substitutions/highlights, pandas totals and a visible matplotlib image. Fixed a test-mode call override so editable manual calls cannot replace question-owned test calls; fixed stale cancellation cleanup, late-created worker disposal and old editor cleanup during question switches. Desktop/mobile layout checks pass at 320/1280px. Early screenshots captured CodeMirror before asynchronous line measurement completed; the final targeted check waits for actual gutter/code alignment rather than adding a production workaround. Inspected final screenshots. No JavaScript errors in the full run. App build/full-suite checks were unnecessary because production source and assets were unchanged by this trial.

**Sources and handover.** scripts/prepare-pyscript-trial.mjs caches 27 pinned release JS/CSS files (about 1.2 MB) before attempting downloads and records URLs/hashes. Retained the inspected editor source map and upstream licence texts with provenance in the trial guide. Python/packages still load from jsDelivr. Updated docs/planned-work.md and docs/local-development.md. Logs: /private/tmp/pyscript-trial-browser-final.log and /private/tmp/pyscript-layout-final.log; screenshots: /private/tmp/pyscript-trial-{320,1280}.png. Preview: http://127.0.0.1:8767/prototypes/pyscript/.

**Remaining limits.** No college Edge/Windows, cold-cache performance, screen-reader or real-zoom validation. The observation harness is not a security sandbox and has no hard memory cap; modules persist between cases. Random bounds do not assess the required construct or randomness, and chart appearance is not automatically graded. Application attempt/profile/timer/submission integration, Task 4 fixtures and complete third-party packaging remain future work. No commit or deployment. Preserved the earlier uncommitted code-entry fix and its generated live build; the original classroom sharing failure remains unconfirmed.

## 20 October 2026 — Three-mode region editing in the PyScript preview

**Agreement and review.** Found unreliable reselection and proposed direct in-code controls, then clarified three modes: choose replacements, edit marked regions and edit all code. The accepted discussion established stable region identity, outlines/optional shading, removal of suggested regions after free edits, preservation of empty permitted regions, source/region undo and a reset requirement before returning to choices after manual edits. The teacher explicitly requested creation and an updated preview. Applied project-refactor-checks within that agreed scope, in order: documentation review found the former external controls and two-mode handover stale; code review identified original-text lookup and separate persistent highlights; requirements review applied the three-mode decisions; test review applied the discussed boundary/paste/history checks. Existing discussion and implementation authorisation covered these changes; no additional refactor or live integration was introduced.

**Implementation.** Added prototypes/pyscript/regions.js, using CodeMirror StateFields, decorations/widgets, transaction filtering and inverted history effects. Regions are located once in the original source and validated for unique identity, unambiguous text and separation. Subsequent operations use IDs/positions. In-code native dropdowns have region-specific alternatives and labels. Controlled replacements retain regions; restricted manual edits preserve and resize them, including an empty insertion control. Whole transactions crossing fixed code are rejected. Free edits touching a region invalidate it; adjacent edits map untouched ranges without expanding their outlines. Undo/redo restores region validity and manual-edit status with source. Mode changes separate history groups; reset recreates the editor and clears history.

Updated adapter.js to own the extension and saved region snapshots, retaining the one isolated PyScript DOM lookup. Updated questions.js with labelled region definitions/choices; trial.js, index.html and trial.css replace external select/replace/highlight controls with a mode selector, optional shading and inline controls. Active emphasis follows selection, without a clear-highlight prerequisite. Manual edits block returning to choices; undoing all such edits or explicitly resetting permits it. Drafts save mode, regions and original-source identity. Earlier edited source-only drafts are preserved in free mode; reset restores authored regions. Python worker/harness code and production framework/assets were unchanged.

**Verification and issues found.** Added tests/pyscript-regions.test.js using the actual pinned CodeMirror state/history engine, and scripts/browser-pyscript-regions.mjs. Eight focused tests pass across region rules and the existing Python harness. Tests cover mixed transactions, boundaries, empty regions, repeated substitutions, joined undo/redo, free-edit invalidation and adjacent replacements. The latter review found inclusive mapping could absorb an outside replacement at a region edge; free-edit mapping now excludes those replacements and has a regression test. Browser checks pass actual typing/deletion, rejected spanning paste, repeated inline choices, direct pointer selection, keyboard focus access/escape, history, reload and reset/mode rules. Test harness corrections included looking up regions by ID rather than assuming author/display order, loading the bundle's complete view namespace and binding the state-only history dispatcher correctly.

Updated browser-pyscript-trial.mjs for inline choices and asynchronous reset. Its full execution suite passes Task 2 repairs (8 cases), random bounds (20 cases), Stop/timeouts/recovery, keyboard Run and focus escape, pandas/matplotlib and 320/1280px layout/alignment. Desktop/mobile screenshots were inspected. Native dropdown keyboard selection could not be established through CDP's operating-system popup interaction; focus access and change-event behaviour are verified, but actual popup selection remains a manual check. Edge/Windows, screen readers, physical devices and real zoom retain their earlier limitations. No app rebuild/full-suite rerun was needed for the standalone prototype.

**Documentation and handover.** Updated the trial guide, docs/local-development.md, docs/planned-work.md and checkpoint.md. CodeMirror upstream history/transaction references are linked in the guide; reused cached runtime modules, with no new dependencies. Logs: /private/tmp/pyscript-modes-unit.log, /private/tmp/pyscript-regions-final.log, /private/tmp/pyscript-modes-runtime.log. Screenshots: /private/tmp/pyscript-trial-{320,1280}.png. Preview: http://127.0.0.1:8767/prototypes/pyscript/. Formatting and whitespace checks pass. Earlier code-entry/live changes are preserved. No commit or deployment.

## 20 October 2026 — Restore missing preview regions and integrate themes

**Reported issues and diagnosis.** Teacher screenshots showed Edit marked regions without outlines, a hover play button and default Python styling. The missing-region path is reproducible with older edited drafts lacking usable region metadata, or saved drafts with no surviving regions: the previous code allowed restricted mode even when no regions remained. This explains the screenshot state without assuming a cache problem. PyScript's hover CSS overrode the play button's hidden attribute. The prototype also still used fixed colours rather than the project's theme tokens. These are corrections/refinements within the authorised three-mode trial and its completed review discussion; no new framework refactor.

**Corrections.** regions.js now recovers older drafts only when the entire source matches fixed original text plus authored replacement alternatives. Unknown edits remain intact in free mode; known free-edit invalidation is not silently reversed. Both restricted modes reject an empty region list, and load normalises stale empty restricted drafts to free mode. trial.js explains the empty state and disables meaningless shading, with explicit reset restoring original regions. Added independent recovery and empty-mode tests. adapter.js removes the secondary play button from the DOM instead of setting hidden; its retained PyScript handler still supports keyboard Run.

**Theme integration.** index.html and trial.js reuse css/tokens.css and the existing createTheme controller through a local import map; the preview exposes the same eight palettes and saved adjustments. Replaced trial.css colour literals with shared tokens and derived editor colours. Added editor-theme.js for syntax, gutters, active lines, cursor, code selections and editor surfaces; regions.js uses paired theme colours for outlines, shading and active selection, including nested syntax text. Code panels retain the project's dark paired code backgrounds even in light page themes. One pinned Lezer-tags import is isolated and documented because PyScript's language namespace does not export tags. No new dependency, palette or production styling change. Removed the runtime label from the preview presentation and used the documented 1rem code size.

**Verification.** Ten focused region/Python tests pass. Added browser-pyscript-theme.mjs reproducing legacy replacement recovery, preserved unknown edits, empty-region guards and reset, then checking all eight palettes, region rendering, theme persistence, absent hover button and 320/1280px layouts. Default code text contrast is at least 12.71:1; sampled syntax including shaded regions at least 6.81:1; outlines against code background at least 9.39:1. Desktop/mobile screenshots inspected. These are sampled defaults, not an audit of arbitrary theme adjustments. The full region interaction suite passes. Runtime checks pass Task 2 repairs, random, Stop/timeouts, keyboard Run/focus escape, pandas and matplotlib. Its layout stage initially timed out because the editor was scrolled off-screen and CodeMirror deferred wrapping measurement; the harness now scrolls it into view, and the targeted layout/alignment rerun passes. Reused successful execution stages rather than rerunning Python packages for a measurement-only harness fix. Native OS dropdown selection, Edge/Windows, physical devices, screen readers and actual zoom remain unverified.

**Documentation and status.** Updated trial README, docs/theming.md, docs/local-development.md and checkpoint.md. Logs: /private/tmp/pyscript-theme-tests.log, /private/tmp/pyscript-theme-regions.log, /private/tmp/pyscript-theme-runtime.log, /private/tmp/pyscript-theme-layout.log and /private/tmp/pyscript-theme-final.log. Screenshots: /private/tmp/pyscript-themed-{320,1280}.png. Preview remains http://127.0.0.1:8767/prototypes/pyscript/. Formatting and whitespace checks pass. Earlier code-entry changes and live output are preserved; no app rebuild, commit or deployment.

## 20 October 2026 — Refine preview syntax colours, controls and mode eligibility

**Scope and changes.** The teacher requested distinct theme-aware syntax tones, dropdown alignment with the affected code, recognition of manual edits restored to the original source, and a 20-character mode selector. These refinements remain within the reviewed three-mode trial. Added semantic syntax roles in css/tokens.css: lavender keywords, green strings, amber numbers/constants and blue functions, with a small code-text tint and shared saturation adjustment. Updated prototypes/pyscript/editor-theme.js and trial.css to consume them. The mode selector uses 20ch with a container-width cap. Versioned the shared token stylesheet link in index.html after the isolated browser retained the earlier stylesheet.

**Behaviour and fixes.** regions.js and adapter.js reconcile exact original source with the original region state after edits and on load, restoring mode eligibility without Reset. trial.js clears stale mode notices when the source changes. Added manual reversal, whole-source restoration, undo/redo and near-match regression checks. Dropdown widgets align vertically with code, and a non-wrapping tail decoration keeps each control with its final code character. The first wrapping fix exposed focus loss when focusing a dropdown rebuilt its containing decoration. CSS focus-within now emphasises the target without changing editor selection or rebuilding the focused control; keyboard checks pass.

**Verification and handover.** All 12 region/Python tests pass. Updated scripts/browser-pyscript-regions.mjs verifies manual change-back and reload along with actual editing, keyboard access, repeated choices, pointer selection and history. Updated browser-pyscript-theme.mjs checks distinct syntax tones and actual character/control alignment at 320/1280px. All eight default palettes pass: sampled syntax contrast at least 6.36:1, plain code 12.71:1 and outlines 9.39:1. Inspected desktop/narrow screenshots; formatting and whitespace checks pass. Reused earlier successful Python runtime/package checks because execution code is unchanged. Updated the trial README, docs/theming.md and checkpoint. Logs: /private/tmp/pyscript-refinements-{regions,theme}.log; screenshots: /private/tmp/pyscript-themed-{320,1280}.png. Native OS popup selection, Edge/Windows, screen readers and real zoom remain unverified. Preview: http://127.0.0.1:8767/prototypes/pyscript/. Earlier code-entry/live changes are preserved; no commit or deployment.

## 20 October 2026 — Separate the inline dropdown from the code outline

Smaller dropdown and an outline around code only. Updated prototypes/pyscript/regions.js: controls are 22×20px (previously 26×24px), and code marks exclude the widget. A CodeMirror outer decoration groups each choice with its control while the inner code mark owns the outline and shading. This replaces the tail decoration that included the control in the border. Choice source lines stay together; long choices scroll within the editor at narrow widths. Keyboard focus emphasises the inner code mark without rebuilding the control. Existing editing modes and region tracking are unchanged.

Nine region tests and both browser suites pass, including keyboard access, repeated choices, source restoration, all eight palettes and 320/1280px alignment. Added a browser regression assertion that controls sit outside the outlined code. Inspected desktop/narrow screenshots. Updated the trial guide and checkpoint; formatting and whitespace checks pass. Logs: /private/tmp/pyscript-controls-{regions,theme}.log. Reused unchanged Python execution evidence. No app build, commit or deployment; unrelated changes are preserved.

## 20 October 2026 — Join inline dropdowns flush to code

Aim for straight shared border between code and dropdown. Updated the choice-group styling in prototypes/pyscript/regions.js to share one outer border and equal-height flex items. The dropdown has a single left divider, no intervening margin and rounded outer corners; code shading remains confined to the text. Editing behaviour and source tracking are unchanged. Updated browser-pyscript-theme.mjs to measure the shared border contrast and assert a flush join with equal heights. Theme/layout checks pass for all eight palettes and 320/1280px; the keyboard/region interaction suite also passes. Inspected the desktop screenshot. Updated the trial guide and checkpoint. Logs: /private/tmp/pyscript-joined-{theme,regions}.log. No app rebuild, commit or deployment.

## 20 October 2026 — Code padding and live-programming integration review

**Preview refinement.** Added 1px padding to code regions in prototypes/pyscript/regions.js, retaining the flush dropdown divider. The theme browser suite passes across eight palettes and 320/1280px, including equal-height/flush-join assertions. Log: /private/tmp/pyscript-padding-theme.log. No runtime or application changes for this refinement.

**Integration Stage 1: documentation evaluation, pending agreement.** Need for live programming questions with question-owned default/permitted modes and Run versus Check actions. Reapplied project-refactor-checks for this new scope; the earlier gates covered the standalone trial. Read the Python/common specifications, application ownership, refactoring brief/readiness evidence, planned work, local-development guidance, current question rendering and attempt command boundaries. Python execution is still described as deferred/proposed in spec-python.md, while planned-work.md accurately records the implemented trial. Update those existing owners as the pilot advances; no new specification file is needed. Application ownership already assigns answers/submission to the practice service and DOM to Svelte, so the trial's separate localStorage must not become another persisted application attempt.

The main policy conflict is shared pre-submission correctness gating. Proposed live-coding exception: permit Run/Check during editing, record checks without classifying ordinary testing as a hint, retain hint/reveal assistance rules, and freeze exact source/results on submission. Other question formats retain existing review rules. Requested Stage 1 agreement asynchronously; no policy update or later-stage implementation yet. Existing short-code, five-variation, distinct-format two-question/10–15-mark and no-horizontal-scroll requirements still apply. The prototype's long-choice scrolling is a known integration gap to address, not an adopted production exception. Subsequent gates must settle the integration boundary, actual question set/marking requirements and focused lifecycle/test coverage.


## 20 October 2026 — Configurable execution access and integration Stage 2 review

**Stage 1 decision and documentation.** Clarified that pre-submission execution is a question/set setting: learning questions may allow experimentation, while assessment/exam-readiness questions may withhold execution until submission. Updated docs/spec-python.md, docs/spec-common.md and docs/planned-work.md to record this adopted direction, separate it from mode/difficulty/timer settings, and replace the old optional-runtime proposal with the requested PyScript programming pilot. A set restriction applies across its questions. Production integration, exact pilot content and the progress treatment of permitted checks remain pending; the earlier proposal that ordinary testing is unassisted was not adopted by this reply. Existing short-code, variation, pair-mark and responsive requirements remain. Updated the moved section link; historical consolidation evidence remains unchanged.

**Stage 2 code evaluation and proposed boundary, awaiting agreement.** Reviewed the trial adapter/regions/runner, Question.svelte, practice/session services, marking/packing, build preparation, unsent-answer handling and progress record fields. The reusable editor already owns region identity/history and the worker owns timeouts/cancellation, but the trial UI owns separate draft storage and all three modes. Neither belongs unchanged inside application attempts. Use one shared editor/runtime implementation with a Svelte host; the existing practice service owns source, region snapshots and execution policy. Lazy-load cached pinned runtime assets through production preparation rather than importing the prototype page or duplicating the editor. Reuse declared marking/reveal separation for authored test expectations; checking must not reveal model solutions.

Submission and markQuestion are currently synchronous; profile snapshots and timer handling assume immediate completion. Proposed integration freezes the submitted source before asynchronous execution, accepts results only for the matching profile/attempt/question/source/test revision, and records completion once. Infrastructure startup failures remain pending rather than receiving incorrect marks. Edits cancel/invalidate exploratory results; navigation/profile/disposal must cancel stale work. Preserve the existing synchronous flow for other questions. Extend saved-attempt/backup/report fields deliberately for execution evidence and policy; avoid trusting a student answer field as an execution result. Enforce restrictions in commands, including keyboard execution. The prototype needs configuration for allowed/default modes and submitted read-only state, plus production-compliant wrapping. Requested Stage 2 agreement; no production code, bank or build changes have been made. Stage 3 will settle actual pilot content and feedback/progress rules; Stage 4 covers lifecycle, independent Python checks, packaging and browser verification.

Documentation whitespace checks pass. No runtime tests rerun for documentation-only changes. The earlier 1px padding verification remains current. No commit/deployment.


## 20 October 2026 — Python integration architecture agreed; Stage 3 draft

Discussed Stage 2 approach. Added an explicitly pending-implementation section to docs/application-architecture.md: one shared editor/runtime, Svelte host, practice-owned saved source/permissions/evidence and asynchronous submission with frozen source and idempotent completion. No production implementation yet.

Stage 3 review reused the existing Python bank, helpers, selection rules and local source map. Programming sets pair different formats for 10–15 marks; five variations are required. Existing function slots 6–8 use token repairs, tracing and bounded range completion. Proposed new live tasks assess executing repairs and independent function construction, accepting behaviourally valid alternatives; they need unused identities rather than overwriting the old bounded questions. Core CA2.6.7/2.6.8 and CA2.7.6/2.7.7 support development/debugging. Read local SAM Paper 1 Q12(b–d), Q15(a) and matching mark-scheme extracts: short condition completion and six-mark code construction calibrate the demand, not an official mark-equivalence claim. Resources are ../agents/spec.md and ../agents/SAM/{paper1,mark_scheme_paper1}.md relative to this repository; map links themselves are relative to docs/.

Proposed first pair: (1) repair delivery_cost(order_total, express), with three faulty regions affecting inclusive free-delivery threshold, express addition and returned value; choices by default, marked-region editing also permitted, Run and Check before submission. Six marks across standard charge, threshold waiver and express addition (two per requirement, multiple cases per requirement). Five (threshold, ordinary charge, express addition) variations: (30,4,3), (25,5,2), (40,3,4), (50,6,3), (20,4,5); inputs are non-negative integer order totals and Boolean express flags. (2) write count_readings(readings) for an authored inclusive integer range, full editing only, Check on submission; ordinary counts, duplicates, lower and upper boundaries, outside-range exclusion and empty input each carry one mark, with multiple cases and integer return checking. Five ranges: 1–8, 10–20, -5–5, 0–100, 3–12. No unstated invalid-type or required-syntax constraints. The first pair deliberately demonstrates a guided learning question followed by an independent assessment question; set restrictions can subsequently withhold both actions across a whole set.

Proposed feedback/progress: learning Run/Check is recorded separately from hints; guided learning scores remain visible but are excluded from independent readiness evidence. Assessment work enters independent evidence under existing hint rules. Check reports requirement-level success/failure and Python errors without model code; answer reveal stays after submission. Exact policy is pending teacher agreement, as is the draft pair. Existing prediction/tracing questions receive no new execution controls. No selectable student assessment toggle or codec redesign is proposed in this first slice. Stage 4 will review independent Python/mutation checks, command/lifecycle guards, recovery, packing and browser checks before implementation.


## 20 October 2026 — Interactive programming pair for teacher review

**Scope and decisions.** Evaluation of the Stage 3 content. Confirmed three useful set designs: practice first then assessment, all practice, and all assessed. Created the explicitly requested interactive draft before asking for content approval. This is separate from production integration; the remaining production requirements/progress and test-quality gates are still open. Recorded the three configurations in docs/spec-python.md without adopting a final progress-classification policy.

**Implementation.** Added prototypes/pyscript/pilot.html, pilot.js, pilot.css and pilot-questions.js. The preview reuses the existing editor, region controls, worker and theme controller for the proposed delivery repair and range-count function, with five variations each. Guided repair offers choices/marked-region modes and Run/Check; function writing offers full editing and Check. Configuration and variation are shareable URL parameters and select separate local preview drafts. Assessment permissions guard execution commands and keyboard shortcuts. Submission persists exact sources before mounting read-only editors and evaluating both answers; stopped/unavailable checking remains retryable against locked sources. Requirement feedback and examples are review-only, with no application profile/progress writes. Counts distinguish runs from checks. Added an opt-in read-only flag to adapter.js, covering both editing commands and direct transactions; existing trial behaviour remains the default. Added a link from the original trial and documented the new preview.

**Verification and fixes.** All 14 focused region/runner/pilot tests pass. tests/pyscript-pilot.test.js executes every variation, alternate valid count implementations and plausible threshold, surcharge, duplicate and return-type faults. scripts/browser-pyscript-pilot.mjs passes actual Python Run output and 12/12 marking, pre-submission command/keyboard guards, all three policies, source locking (including rejected programmatic changes), submitted reload, variation switching and 320/1280px page layout. Inspected screenshots. Fixed a missing EditorState import during the first browser run and a test selector escaping error. Separated editor-mount identity from run cancellation so edits remain saveable after stopping a run. Browser setup now uses the New attempt action: clearing storage alone was undone by the pagehide save. Formatting/whitespace checks pass. Logs: /private/tmp/pyscript-pilot-{unit,browser}.log; screenshots: /private/tmp/pyscript-pilot-{320,1280}.png.

**Review link and limits.** http://127.0.0.1:8767/prototypes/pyscript/pilot.html?config=mixed&variation=1 . The isolated browser is left on a fresh mixed draft. Draft settings are review controls, not student permission switches. Final content, marking weights and progress treatment await teacher review. This prototype has no production profile, timer, sharing-code or backup integration; college Edge/Windows, cold startup and accessibility validation remain outstanding. No app rebuild, commit or deployment; unrelated code-entry/live changes are preserved.

## 20 October 2026 — Python project guidance and preview controls

**Scope and decisions.** Continued the existing project-refactor-checks review with the teacher's requested content/UI refinements; no new production architecture was introduced. The teacher clarified that the practice challenge setting should control default editing modes as well as replacement-choice availability, and requested reuse of the existing levels. Confirmed js/bank.js already defines Beginner, Foundation, Standard and Stretch plus Mixed challenge. Recorded that direction in docs/spec-python.md, docs/planned-work.md and feature_ideas.md. Execution access remains independent. Exact per-question mappings and safe hint switching after manual edits remain to be reviewed; no hint/mode switching implementation or new progress classification is claimed. Existing production Stage 3 content/progress and Stage 4 test gates remain open.

**Changes.** js/python-projects.js now supplies all 18 projects with an initially closed Getting started disclosure, three planning pointers, recommended modules, a core-task rating and its rationale. Preserved all original titles, briefs, topics, stretch features and groups. Named fields replace positional tuples within this one content module to keep the added guidance readable; the existing Information.svelte renderer and native disclosures are reused. Added the teacher's Easy/Medium/Harder calibration and clarified that ratings are not awarded grades. Checked module guidance against official Python random/json/collections/turtle documentation, Arcade documentation, pandas introductory tutorials and matplotlib's quick start on 20 October; existing tool links remain in the page. Standard-library references: https://docs.python.org/3/library/random.html, https://docs.python.org/3/library/json.html and https://docs.python.org/3/library/collections.html.

In prototypes/pyscript/pilot.{html,js}, fresh attempts leave the function-call field blank and an empty Run prompts without starting Python or increasing the count. Removed the authored sample call defaults from pilot-questions.js. Previously saved calls remain preserved. Unavailable Run/Check controls and call fields are hidden; Stop appears only during execution and Reset is omitted after submission. Command and keyboard permission guards remain active. Updated the existing browser-pyscript-pilot.mjs check and prototype guide. No new production question identities, marking data or progress behaviour changed.

**Verification.** Five focused pilot/discovery-guide tests pass, including all five Python variations and alternative/incorrect implementations. Production build, formatting and whitespace checks pass. The existing pilot browser suite passes blank-call handling, hidden assessment checks, actual Python execution/marking, keyboard restrictions, frozen submission, reload and 320/1280px layouts. A temporary project check verifies all 18 initially closed disclosures, ratings/plans/modules, real keyboard opening and 320/1280px layouts; inspected the mobile screenshot. Compared old/new project core fields independently: all preserved. Browser fixture fixes addressed the old preview server's path, the fresh-origin profile dialog and waiting for native disclosure focus; these were harness setup issues. No full-suite rerun for this content/preview-only change. Logs: /private/tmp/python-projects-{pilot-unit,build,browser}.log and /private/tmp/pyscript-pilot-browser.log. Screenshots: /private/tmp/python-projects-{320,1280}.png.

**Review and limits.** Projects: http://127.0.0.1:8768/projects/ . Coding preview: http://127.0.0.1:8767/prototypes/pyscript/pilot.html?config=mixed&variation=1 . Built live/ locally, preserving other working-tree changes. No commit or deployment. New project ratings need teacher/classroom calibration; Edge/Windows and production live-coding integration remain outstanding. The isolated browser uses a Project Preview Test profile on port 8768; no personal/student storage was cleared.

## 20 October 2026 — Terminal warning diagnosis after partial Python integration

**Scope and documentation review.** Investigated the reported SvelteKit comment warning and Python vendor source-map 404s. Applied project-refactor-checks Stage 1 to the affected handover, architecture, development/build guidance and source comments. checkpoint.md contains both an approved rollout and older pending-gate statements; docs/application-architecture.md still labels the Python boundary pending implementation despite committed LivePython.svelte, live-python.js and asset packaging. These status statements need reconciliation against the partial integration, not blanket promotion to verified. Existing guidance remains discoverable; no new document or broad consolidation is proposed. No requirement changes or later review-stage implementation were made. The required discussion gate remains open.

**Diagnosis and proposed correction.** src/hooks.server.js replaces the authored theme-bootstrap HTML comment with the theme script. Installed SvelteKit counts comments before/after transformation and warns on a reduction. A direct invocation reproduced a decrease from three comments to two while preserving the two sample hydration markers. Keeping the authored marker alongside the script preserves all three comments. This hook already existed in migration commit c3e8d00; the evidence does not establish why it was not previously noticed. The partial Python integration in commit 07ab760 copies vendor modules unchanged through scripts/prepare-site.mjs. All 25 sourceMappingURL references point to absent local maps. Browser debugging requests for them produce 404 pages, which pass through the same hook and repeat its warning. These map files support debugging and are not Python execution dependencies.

Recommended focused correction: retain the theme marker when inserting the script, and remove unavailable source-map directives from generated vendor copies during preparation while preserving the upstream cache, manifest hashes and licences. Existing production tests prohibit distributed map files but only check application bundles for sourceMappingURL, leaving vendor copies uncovered. Before implementation, agree the scoped review/corrections; subsequently verify comment preservation/theme startup and prepared vendor output with focused build checks. The official warning URL was inaccessible through the web tool; diagnosis used installed framework source and direct execution. No build, browser test, implementation fix, commit or deployment occurred. Only checkpoint.md and this investigation record changed.

## 20 October 2026 — Fix terminal warnings from theme startup and Python assets

**Decision and scope.** Approved the two diagnosed corrections and focused verification with “good, proceed.” Applied the scoped project-refactor-checks findings to these files: retain theme restoration before first paint, preserve framework comments, retain upstream cache provenance and enforce the existing production exclusion of source maps. No broader refactor or Python rollout completion is claimed; the stale integration documentation remains follow-on work. The preceding investigation records the documentation review and approval gate.

**Changes.** src/hooks.server.js now retains the authored theme-bootstrap comment when inserting the startup script. scripts/prepare-site.mjs removes the 25 source-map directives from generated Python vendor JavaScript after copying it; original cached files, manifest hashes and licences remain intact. tests/production-build.test.js extends the existing source-map exclusion assertion to vendor JS/CSS, closing the gap that allowed these references through. Rebuilt live/ with BASE_PATH=/starters after checking the root build. checkpoint.md now records the actual handover rather than conflicting historical pending/approved statements.

**Verification.** Both production-build and pre-commit-build tests pass, including deterministic consecutive root builds. The separate /starters production build passes. Direct hook execution confirms all authored/sample hydration comments survive and the theme script remains in the head. The isolated browser theme-startup suite passes all eight palettes in light/dark modes, saved adjustments before application scripts, unchanged colours after mounting, invalid preferences and unavailable storage. HTTP checks pass for the reported set route and all 27 vendor JS/CSS assets on both the development server and /starters preview; served vendor assets contain no sourceMappingURL. All cached upstream manifest hashes match. An intentional request for the still-undistributed core.js.map returns 404 without emitting the SvelteKit warning; normal libraries no longer request it. Formatting and git diff --check pass.

Local preview/browser access initially hit sandbox EPERM restrictions; reran with approved escalation. Existing build notices about chunk size, plugin timings and colour environment remain; they are unrelated to the reported hydration/source-map messages. No Python execution or broader integration acceptance test was rerun because runtime code was unchanged. No visual screenshot review or Edge/Windows check was performed. Logs: /private/tmp/starters-terminal-fix-{build,subpath,theme,dev}.log; HTTP checker: /private/tmp/starters-terminal-fix-http.mjs. Temporary preview/development servers and isolated Chrome were stopped. No commit or deployment.

**Preserved rollout handover.** The previous checkpoint records approval for a selective six-task/five-variation production rollout and its focused checks, while older text still says production gates are pending. Commit 07ab760 contains partial integration, including data/python-live.js, js/live-python.js, LivePython.svelte, practice-service changes and vendor packaging. Resume by auditing that implementation against the recorded rollout, rather than treating it as either unimplemented or fully verified. Preserve stable identities, exact-source asynchronous marking, cancellation/profile ownership and paper-style questions. Existing practice-level/hint mode direction and safe handling of manual edits need reconciliation; independent-readiness classification was explicitly unresolved in the older handover and should not be inferred from implementation. Earlier completed project-guidance and standalone pilot checks remain in their dated entries. Historical preview ports 8767/8768 and process IDs were not revalidated and are no longer presented as running services.

## 20 October 2026 — Editor completion and ESP Task 2 requirements review

**Adopted direction.** Requested adapting suitable programming questions so variable initialisers and missing keywords/operators/values/function names are completed in highlighted empty editor regions instead of separate fields or underscores. Retain reasoning questions with genuine learning value; reword answer-revealing parts rather than removing them. ESP Task 2 needs two tabs within the editor only: read-only Original code and Your code initialised with an editable copy. Keep the editor visible alongside its questions during scrolling and provide a draggable height control by default. Explicitly confirmed the initial height cap uses max(viewport width × 1.4, viewport height × 0.75), not min; size to code below that cap, allow internal scrolling and manual resizing. These are requested requirements, not implemented or verified behaviour.

**Stage 1 documentation alignment.** Applied project-refactor-checks to this new scope. Read Python/common/identity, ESP source/task/design/improvement guidance, content authoring/refinement and relevant style/theme/architecture/development guidance, reusing cached assessment conclusions. The Python specification still describes production execution as unimplemented and embedded answers as a separate future renderer. Theming and architecture similarly describe preview-only or pending support, although partial integration is present. Update current status narrowly without claiming full rollout acceptance. The Task 2 design's earlier bounded-prediction/no-runtime draft is superseded in scope by the new editor request, but its distinction between Predicted result and observed Actual outcome remains necessary. Existing Python and Task 2 specifications can own the new requirements, with shared sizing/accessibility in style-guide.md and brief links/status corrections in existing supporting docs. No new specification file or broad consolidation is justified; the guidance is discoverable. Historical source/assessment notes should remain historical. Keep terminology consistent and preserve the detailed Task 2 input/test/marking contracts.

Source comment review found concise ownership notes in the shared regions and question editor and a full header in data/esp-task2.js. Detailed code quality review remains Stage 2. The screenshot maps to data/python.js slot 2, Print the tickets: move function/start/stop responses into the code while retaining the remaining useful parts and marks. Question.svelte currently renders live questions through a separate branch from ordinary answer fields; mixed code/reasoning support is an implementation requirement for later review, not a completed change. The shared authoring rule already prohibits unintentional answer leakage, and stable-slot rules permit presentation refinements without new identities. The offline-reference verification instruction in content-refinement.md must be read in its authoring context, alongside the explicitly adopted browser-runtime exception.

**Decision still needed.** Task 2 currently asks for predictions about the original code. Proposed learning workflow: permit running either tab while leaving Original code immutable, and adapt suitable prediction prompts to observed results plus explanation/comparison. Alternative: retain prediction assessment and withhold execution until submission. The editor request alone does not settle this assessment change. Present the existing-document update plan and this choice at the Stage 1 discussion gate; no specification or implementation edits yet. No tests/builds were required for this evaluation. Updated checkpoint.md with the plan and decision state; earlier terminal fixes and generated live/ remain untouched. No commit or deployment.

## 20 October 2026 — Adopt Task 2 run evidence and review the shared editor architecture

**Stage 1 agreed and documented.** Approved running both Task 2 code versions before submission and adapting prediction parts to actual results and explanation, closer to an ESP Task 2 test plan. Updated docs/spec-python.md for highlighted empty completion regions, variable initialisers and retained/reworded reasoning; docs/esp/task-2-designs.md now owns the adopted run/record/repair/retest extension and editor-only Original code/Your code tabs. docs/style-guide.md owns draggable height, keyboard access, sticky Task 2 placement and the explicitly confirmed max(width × 1.4, height × 0.75) default cap. Corrected stale partial-integration status in docs/application-architecture.md, docs/theming.md and docs/spec-common.md; docs/planned-work.md links the current scope. Existing assessment limits and historical draft evidence remain. These are adopted requirements, not implemented feature claims.

**Stage 2 code-quality evaluation, awaiting agreement.** Reviewed the adapter/regions/runner, LivePython/Question/Stimulus/TestPlan components, practice/python-practice/session services, marking, packing, answer-presence and profile storage boundaries. The existing shared worker already returns bounded stdout/stderr, typed values, exceptions and consumed-input counts. Existing services own profile/attempt identity, cancellation and source-bound marking. Reuse those boundaries rather than create an ESP-only runner or draft store.

Priority findings for the extension:
- regions.js initialRegions rejects empty authored text and locates regions by unique text. Its empty-region widget displays an ellipsis after deletion. Explicit authored empty positions and a visibly blank, labelled widget are needed; repeated gaps cannot be found by searching for an empty string. Preserve region identity through editing/history and saved drafts.
- Question.svelte chooses between LivePython and ordinary parts; markQuestion returns immediately for an entire live question, and pythonRequest/assessPython expect pythonTests on every part. Separate the editor surface from question prompts and dispatch marking by each part's assessment contract, preserving marks, dependencies and ordered reasoning feedback. Do not duplicate a code answer in an external input.
- python-practice currently saves only the latest flattened Run output, deletes it on edits and always executes the editable source. Task 2 requires structured observations identifying original/edited source, exact inputs, test identity and run outcome. Preserve prior evidence after edits and distinguish it from a current retest. Store this through the existing attempt service; do not infer an observation from a selected answer or model key. Cancel or reject stale completions on source/input changes and profile/navigation/submission transitions.
- The adapter hardcodes 24 rows and exposes no height control; tabs must preserve both documents' state/history. Use a shared Svelte editor surface for resize/tabs, with adapter-owned CodeMirror sizing and the current theme tokens. Sticky placement belongs to the question layout. Respect the specified max cap while ensuring oversized/narrow-screen editors do not make the surrounding controls unreachable.
- Existing Task 2 cases expose display strings and prediction answer IDs, while test invocation metadata lives in the authoring definitions/offline fixture. Add explicit runnable inputs/calls instead of parsing displayed labels. Preserve the public/marking/reveal packing boundary when adding observations and repair tests.

Scope code-quality findings: compact newly integrated domain/marking code and missing function comments should be brought into the documented style only where these paths change; avoid unrelated formatting/refactoring. Existing live-practice handling automatically flags all practice-mode live questions as assisted, and the UI claims separate readiness treatment. That implementation is not evidence of an adopted ESP progress rule; resolve it in Stage 3 before extending it. No later-stage content/marking policy or test plan is claimed agreed by this review.

**Recommended boundary.** One shared editor surface and runtime; the attempt service owns drafts and structured run evidence; ordinary and code-derived parts retain their own marking rules; the Task 2 summary displays actual run records separately from student expectations and reasoning. A separate ESP editor/service would duplicate lifecycle, history, theme and cancellation behaviour and is not recommended. Stage 2 agreement is pending; content/marking review and test-quality agreement follow before implementation.

**Verification and status.** A read-only probe confirmed authored empty regions are rejected. Checked 75 local documentation link paths and the new section anchors; corrected an initially incorrect hyphen count in the Task 2 anchor. git diff --check passes. No application tests/build/browser run for these documentation edits; no feature code changed. Earlier terminal fixes/live output remain untouched. No commit or deployment.

## 20 October 2026 — Shared editor architecture agreed; code-history and marking review

**Decisions and added scope.** Agreed the shared editor/runtime, part-specific marking and practice-owned run-evidence boundary. Requested review of earlier ESP Task 2 and free-code editing attempts to see skill progression. Recorded the idea in feature_ideas.md, the adopted review objective and explicitly proposed delivery rules in docs/spec-progress.md, and links/status in docs/planned-work.md and docs/application-architecture.md. Historical code/run review is not implemented by the existing score-history links.

**Stage 3 evaluation.** Inventoried 24 completion and 24 repair templates, five variations each, and all 18 current Task 2 variations (slots 36–38). The proposed Python adaptation batch is the 48 completion/repair templates where editing serves the assessed task; tracing/prediction-only formats remain distinct. Print the tickets retains six marks: three embedded code responses and separate last-ticket, iteration and boundary-reason parts. The complete bank adaptation and variation acceptance are not yet implemented or verified. A direct scan found exact completed/repair expressions in later prompts for slots 13, 17, 29 and 56 across all five variations; proposed rewording preserves those questions without supplying the code answer. Indentation repair requires an editable line/block; file examples require isolated declared runtime fixtures. Added the concrete proposal to docs/spec-python.md.

The Task 2 proposal in docs/esp/task-2-designs.md retains each question's 6–11 total marks: test-data selection and requirement-led expectations; accurate outcome responses linked to actual original-code runs; diagnosis; applied repairs assessed against relevant independent tests; confirmation/regression reasoning. Run alone earns no mark. Passing-code cases allow justified no-change; valid alternative repairs are accepted. Changed prediction/correction contracts need fresh part IDs, so previous dropdown selections cannot become actual observations or code repairs. Older source-bound run evidence remains distinguishable from a current retest. Marking-credit direction was explicitly agreed during this review. Detailed migrated content still requires independent checks and subject review.

**History findings.** practice.js records scores/partScores but omits submitted source and runs from history. History.svelte reopens practice by code; backupJSON omits current active work. Completed code must therefore be archived deliberately and included in validated backups, with historical requirements/source snapshots rather than resolving old work through a changed bank. Proposed review preserves completed early repeats without adding them to tracked statistics. Old aggregate-only records cannot acquire invented code evidence. Current local/linked-file import limits are 5 MB, making bounded detailed retention relevant.

A read-only probe confirmed validatePartScores rejects the descriptive part IDs already used by Task 2 because it requires numeric IDs. This is a real backup-compatibility gap to fix and independently test within the archive work, while retaining malformed-ID, duplicate, identity and total checks. No production history or student data was changed.

**Retention discussion.** Suggested a maximum of six previous attempts. Recommended six completed detailed attempts per individual question and variation, alongside the current draft, while retaining older scores/skill summaries. Asked whether the limit should instead group variations or only limit initial display; the response is pending. This is not authorisation to prune existing records yet. Proposed support/independent-evidence rules are also labelled as proposals; agreeing that Run alone earns no credit does not settle every progress-classification rule.

**Verification.** Checked 59 local documentation link paths and the new review anchors; git diff --check passes. Ran non-mutating inventory/leakage/part-validator probes only. No application tests/build/browser checks or feature-code changes for this requirements review. Existing terminal fixes/live output remain untouched. No commit or deployment.

## 20 October 2026 — Six-attempt retention agreed; final test-quality review

**Agreed retention and scope.** Keep six completed detailed code attempts per question and variation within each profile, bank and code generation, alongside the separate current draft. Retain older scores and skill summaries. Updated docs/spec-progress.md and docs/planned-work.md to record the decision, including the same retention limit after backup merges and visible explanation in review. Preserve existing tracked-score and revision calculations; the earlier proposed independent-readiness changes remain deferred. No archive exists yet and no student records were pruned.

**Stage 4 evaluation.** Reviewed tests/pyscript-regions.test.js, pyscript-trial.test.js, pyscript-pilot.test.js, python-live.test.js and esp-task2.test.js; application/session/profile/progress/packing checks; and scripts/browser-pyscript-regions.mjs, browser-pyscript-pilot.mjs and browser-esp-task2.mjs. Region tests exercise real CodeMirror transactions, bounded-edit rejection, history mapping and recovery. Python runner checks cover input exhaustion, exceptions, types, output limits and fresh globals. The independent ESP fixture is valuable evidence for all 18 original/repaired cases and must remain independent of authored answer keys. Existing prototype browser checks do not establish production integration. Current production ESP browser tests assume dropdown predictions and need adaptation to real runs and code repairs.

The main gaps are authored initially empty regions; mixed editor/reasoning marks; original/edited tab state; asynchronous execution during source/input/profile/navigation changes; and completed-code retention/restore. Generic lifecycle tests do not cover pending Python results. Archive review is new and has no existing coverage. Authored-request equality checks alone cannot establish correct assessment, and repeated random selection is weaker than deterministic case coverage. Extend the relevant focused suites rather than introducing a parallel test harness or unrelated broad rewrites.

**Proposed checks, awaiting final-stage agreement.**
- Exercise initially empty and repeated gaps, boundary edits, saved drafts, undo/redo and explicit restoration using the shared region tests. Independently verify affected Python variations and all Task 2 cases with reference outputs, wrong-code mutations, valid alternative repairs and correct unchanged code. Verify mixed marking, no credit for Run alone, and no observed-result credit from missing or mismatched run evidence. Preserve ordinary reasoning marks when runtime infrastructure fails.
- Add controlled pending-runtime lifecycle tests for edits, changed inputs, profile/navigation changes, cancellation, reload and submission/expiry. Reject stale completions, freeze submitted source, complete once, preserve immutable original code and earlier run evidence, and distinguish execution errors from infrastructure failures. Isolate declared file fixtures between runs.
- Check exact six-record retention per question/variation, separate drafts/profiles/banks/generations, deterministic ties, duplicate/conflicting restores and merged retention. Verify that seventh-attempt pruning preserves older score/skill summaries and other groups. Validate historical requirements/source/run snapshots and read-only review without timer or score changes. Cover legitimate descriptive Task 2 part IDs alongside malformed IDs, duplicate parts and inconsistent totals; test explicit storage/backup failure without partial writes or extra pruning. Old score-only records remain valid without invented code.
- Extend production browser checks with real typing and keyboard use: blank regions, mixed reasoning, immutable Original code, editable-copy persistence and tab undo history, original runs and edited retests, stop/error handling, pointer/keyboard resizing, the exact max(width × 1.4, height × 0.75) default cap, sticky positioning and access to controls on narrow screens/high zoom. Check theme contrast, reload, completed review and backup restoration. Reuse the independent ESP fixture rather than relying solely on filling answers from the bank's own keys.
- Run focused content/marking, region, lifecycle and progress/backup groups; packing/code-compatibility checks and production/subpath build checks; then serial production browser checks. Preserve hidden-test/reveal separation and historical totals. Broaden checks only for demonstrated cross-cutting impact or failures, and record any unverified browser/platform acceptance separately.

**Status and next action.** Stage 4 evaluation is complete; the concrete test plan awaits its required discussion gate before feature implementation. git diff --check passes. No feature source/tests were edited or executed during this review. Existing terminal-warning fixes and generated live/ output remain untouched. No commit or deployment.

## 20 October 2026 — Implement shared coding activities, Task 2 evidence and attempt review

**Decisions and scope.** The final review gate was agreed, followed by prediction-first interaction and its preservation rules. Implemented the approved shared editor approach, all 24 completion and 24 repair templates × five variations, and all 18 ESP Task 2 investigations. Retained useful reasoning and reworded answer giveaways in Python slots 13, 17, 29 and 56. Wrong initial predictions trigger a non-revealing rethink prompt; correctness is not required to unlock Run. Earlier predictions and revisions remain associated with the exact source and identify revisions after execution. Run alone earns no marks. Existing tracked-score/revision calculations remain unchanged; independent-readiness redesign is deferred.

**Content and assessment.** Added data/python-editor.js for bounded editor regions and data/esp-task2-live.js for explicit runnable cases, model repairs and regression requirements; connected them through data/python.js and data/esp-task2.js. Preserved question identities and marks, using fresh part IDs where prediction/correction contracts became observations/applied repairs. js/live-python.js and js/marking.js now handle mixed ordinary/code parts, source-bound observation evidence, typed results, consumed inputs and relevant behaviour checks. The independent tests/fixtures/esp-task2.py remains separate from the runtime assessment metadata. Indentation repair uses an editable line; file examples receive isolated fixtures.

**Editor and execution.** LivePython.svelte, Question.svelte and TestPlan.svelte provide editor-only Original code/Your code tabs, immutable originals, retained edits, sticky placement, selected/custom runs and source-labelled results. python-practice.js owns exact-source predictions, runs, checks and cancellation; practice.js freezes submitted code and archives completion once. The shared adapter/regions/runner support authored empty offsets, restoring exact initial whitespace, sizing, read-only state and isolated files. Browser execution exposed a Pyodide EBUSY error when cleaning a temporary directory while it remained the working directory; the runner now restores the previous directory before cleanup. No new runtime/library was introduced.

**Attempt history and backups.** Added js/code-history.js and CodeHistory.svelte, integrated through Progress.svelte and progress-transfer.js. Keep six completed detailed attempts per profile/bank/generation/question/variation, retaining older scores and skill summaries and a separate current draft. Snapshots retain original/submitted source, question requirements, answers, marks, support, predictions and run evidence. Deduplicate repeated source within each record; validate and merge named backups before writing. js/progress.js now accepts legitimate descriptive Task 2 part IDs while rejecting malformed IDs, duplicates and inconsistent totals. Older score-only history remains valid without invented code. Backup restoration preserves the local current draft; exporting active drafts remains outside the existing backup contract.

**Presentation refinements.** Replaced the visible height slider and labelled resize button with an unlabelled centred grip, then reduced its dimensions by about one third. Added a single 1px bottom edge and complete code-area frame. Empty gaps now place the caret at their left inside edge; their outline no longer shifts when typing begins. Kept accessible names, keyboard focus, arrow resizing and corrected Home/End tab navigation. Hid PyScript's generated data-env pseudo-element through host CSS; bundled Apache 2.0 terms require licence/attribution preservation but do not require this runtime label. Vendor cache, licence files and notices remain intact. Default height continues to use the explicitly agreed max(width × 1.4, height × 0.75) cap.

**Verification.** Svelte diagnostics report zero errors and warnings. The final focused run passed 33 tests across editor workflow, profile ownership, framework sessions, regions, Python live models and ESP content/reference checks. This includes all 240 adapted completed models and forty existing live models, prediction gating/stale-result rejection, six-attempt retention and named-backup round trips. Earlier affected packing/search/compatibility/runtime checks and content validation passed; metadata is revision 29, with coverage unchanged. A legacy profile-lock test selected a random live question and incorrectly assumed synchronous submission; it now uses a deterministic non-live question, and the rerun passes.

Production Chrome checks passed all 18 Task 2 original-run/repair cases across the staged runs; the final 38/5 run also passed custom input execution, full 9/9 submission and archived original/edited evidence. Prediction entry, wrong-answer rethink, real output, submission/reload, read-only review, 320/768/1280-width overflow, keyboard/pointer resize and Home/End tabs pass. The initial drag fixture omitted held-button state; corrected CDP pointer events pass without a product change. browser-esp-task2.mjs separately passed all 18 presentation/selection cases, eight default theme contrast checks, code-entry/failure/retirement navigation and responsive layouts. The final screenshot was visually inspected for the frame, small grip and absence of the runtime label; real caret/outline positions were checked geometrically. Root builds pass. Two consecutive /starters production builds passed the determinism/distribution test, including source-map exclusion. The subpath browser frame/grip/caret check passed, and 85 local documentation links resolve.

**Documentation and remaining limits.** Updated the Python, ESP, progress, shared and style requirements; architecture, theming, planned-work and local-development documents now describe the implemented boundaries and relevant test commands. Preserved earlier dated review findings rather than rewriting their pending status as historical success. tests/editor-workflow.test.js and scripts/browser-editor-workflow.mjs provide focused coverage; existing content/lifecycle/browser fixtures were adapted where their earlier assumptions changed. No full test-suite, physical-device/high-zoom, screen-reader, college Edge/Windows, cold-cache cost or classroom timing/subject acceptance is claimed. Tab editing history is preserved by mounted documents; dedicated undo-across-tabs browser coverage remains outstanding. No commit or deployment.

## 20 October 2026 — Round the editor frame and separate introductory text

Added 8px corners to the 1px code-area frame in LivePython.svelte. The frame now owns its bottom border, avoiding a second line at the attached resize grip. Moved requirements, practice information and editing instructions into a separate introduction above the editor/answer columns. LivePython owns the sticky editor surface and controls; Question.svelte no longer wraps the introduction in that surface. This removes the different background under introductory text while retaining sticky code and execution controls. Updated docs/style-guide.md and the focused browser geometry checks.

Explained that Save predictions records initial answers and enables a non-revealing rethink before execution. Combining this with Run and compare was suggested, but is not adopted or implemented in this change; prediction capture and marking behaviour remain unchanged.

Verification: zero Svelte errors/warnings; /starters production build passed; browser checks passed rounded frame, single 1px bottom edge, introduction outside the editor surface, absent runtime label, stable blank caret/outline and sticky layouts without horizontal overflow at 320/768/1280px. Visually inspected the desktop screenshot. The dedicated browser stalled during shutdown and was restarted; the subsequent check passed. Earlier domain/runtime results remain applicable because this follow-up changes presentation only. No commit or deployment.

## 20 October 2026 — Padded coding workspace and prediction capture through Run

**Decision and presentation.** Adopted the padded surface proposal after reviewing the annotated screenshot. LivePython.svelte now groups requirements, instructions, code, prediction guidance and execution controls in a semantic `coding-workspace` container, with 1rem internal padding and rounded outer corners. Retained the subtle surface colour, sticky positioning, thin rounded editor frame and small attached resize grip. This supersedes the preceding introduction-above-surface arrangement. docs/style-guide.md and docs/application-architecture.md now reflect the grouped workspace and component ownership.

**Prediction interaction.** Removed the separate Save predictions button. python-practice.js captures complete predictions and exact source when execution is requested. Missing answers prevent execution. A new incorrect pre-run prediction pauses with a non-revealing rethink; revising predictions or requesting execution again can continue without requiring correctness. Correct initial predictions run immediately. Unchanged repeated requests do not duplicate snapshots; changed answers/source retain earlier records and identify revisions after execution. Both the button and keyboard shortcut use the same service rule. Updated docs/spec-python.md with the adopted interaction; existing marking and tracked-score calculations are unchanged.

**Verification.** Seven focused editor workflow tests pass, covering the 240 adapted models, automatic capture, missing answers, rethink/revision, continuing with incorrect predictions, stale-result rejection, profile changes, six-attempt retention and named backups. Svelte diagnostics report zero errors and warnings; the /starters production build passes. The focused production browser flow passed workspace padding/corners, blank caret geometry, removed Save button, wrong-prediction pause before output, Ctrl+Enter continuation, preserved revisions, submission/reload and read-only history. The representative Task 2 38/5 regression passed original runs, repair checks, custom input execution, 9/9 submission, archived original/edited evidence, pointer/keyboard resizing, Home/End tabs and 320/768/1280px overflow checks. Visually inspected the desktop workspace screenshot. Logs: /private/tmp/workspace-{tests,check,build,browser}.log. git diff --check passes. Earlier unchanged content/runtime checks were reused; no full-suite or new physical-device/screen-reader acceptance claim. No commit or deployment.

## 20 October 2026 — Wider coding workspace with edge-to-edge editor

**Layout decision and changes.** Applied the agreed 60/40 coding-workspace/answer split in Question.svelte, stacking at 960px and below to preserve usable answer widths. Both editor documents in LivePython.svelte now extend across the workspace padding to its full width; instructions and controls retain their 1rem inset. Added a subtle rounded 1px workspace outline using the shared line colour, retaining the stronger editor frame and attached grip. Updated docs/style-guide.md with the full-width exception to workspace padding.

**Feedback.** Restricted-edit feedback now replaces the usual editing instruction instead of adding a near-duplicate paragraph. It clears after an accepted edit, mode change or remount. Kept polite status announcements and the ordinary keyboard-shortcut guidance when no feedback is showing.

**Verification and corrections.** Svelte diagnostics report zero errors/warnings and the /starters build passes. The focused production browser check verifies the 60/40 ratio at 1024/1280px, stacked layout at 320/768/960px, code-frame edges matching the workspace width, retained text padding, no horizontal overflow, sticky placement, outline dimensions, rejected-edit feedback/recovery and unchanged empty-gap caret geometry. The first appearance assertion caught use of --border, which is a framework width token rather than a colour; replaced it with --line and reran successfully. Visually inspected the final Berry-theme screenshot using the app's theme picker; direct dataset changes alone did not update the theme's derived colours and were discarded as screenshot evidence. Logs: /private/tmp/workspace-width-{check,build,browser}.log. Screenshot: /private/tmp/starters-workspace-width.png. Existing domain/runtime checks were reused because their behaviour is unchanged. No commit or deployment.

## 20 October 2026 — Match editor borders and remove editor corner rounding

Updated LivePython.svelte so the editor frame and resize-grip border use the same 1px --line colour as the coding-workspace outline. Removed the editor frame's corner radius and made the shared CodeMirror surface square in prototypes/pyscript/editor-theme.js, including its focused outline shape. Workspace and grip corner shapes remain as requested. Updated docs/style-guide.md and the existing focused browser appearance checks.

Verification: /starters production build passes. Browser checks confirm matching computed border colours, square host and CodeMirror corners, retained 60/40 layout, full-width editor, padded text, narrow-width stacking/overflow, temporary edit feedback and caret alignment. Visually inspected the Berry-theme screenshot. Logs: /private/tmp/editor-borders-{build,browser}.log. git diff --check passes. No runtime/marking behaviour changed; prior domain checks remain applicable. No commit or deployment.

## 20 October 2026 — Editor-only scrolling, student-authored Task 2 tests and check feedback

**Decisions and assessment.** Adopted marking students’ own inputs and expected/actual results in place of the fixed supplied cases. Retained each investigation’s mark total, validity groups, independent repair checks, working-code example and useful reasoning. Added fresh input/expected/actual part identities and updated content compatibility metadata to revision 31. Reworded the working-code reasoning to cover the stated pricing rules rather than a previously supplied input; distinguished the two reward-rate reasoning prompts. Historical draft assessment wording remains identified as superseded in docs/esp/task-2-designs.md.

**Implementation.** Added js/task2-tests.js for safe typed argument construction, exact input/source matching and test-plan marking. The practice service executes the authored corrected reference separately from student repairs, so defective code cannot determine expected-result marks. Actual-result credit requires a student response matching an original-code run with the same inputs. Run records retain the pre-run expectation, expression, exact inputs, source and observation. Checks and submitted attempts preserve the existing cancellation/profile rules. Inputs and outcomes use JSON strings in the existing answer store; students never enter JSON in the Task 2 UI. Automatic outcome marks cover type/value or exception and entries consumed; printed output remains evidence and is checked by the repair cases where required, rather than claiming full prose test-log assessment.

**Forms and layout.** Added Task2Response.svelte and updated Question.svelte/TestPlan.svelte: ordered text entries preserve empty strings, whitespace and leading zeroes; calculation functions use named argument fields. Each test has expected/actual fields and explicit Original code/Your code run buttons. Removed the supplied/custom test selector and raw-call/JSON controls from Task 2. Labels and controls use a consistent stacked layout with wrapping actions. Latest matching original and edited results are shown separately; older runs remain in the draft/archive. Incomplete input and run status feedback appears beside the affected test. Expected input counts start blank, requiring entry before execution rather than silently defaulting to zero.

**Scrolling and feedback correction.** Removed max-height and overflow scrolling from the coding-workspace, correcting the earlier implementation that applied a second scrollbar to requirements and controls. LivePython.svelte retains the exact default code cap max(width × 1.4, height × 0.75), manual resizing and CodeMirror scrolling. Tall desktop workspaces scroll with the page before sticking; narrow stacked layouts use normal page flow so they cannot cover the questions. Existing 60/40 columns, full-width square code frame, matching borders and small grip remain. Check feedback now has a separate labelled panel with part identifiers, scores and diagnostic paragraphs. Repair instructions remain with the question instead of being repeated as a result prefix. EOF diagnostics from hidden checks explain that the check ran out of input, rather than telling students to edit a different test’s input list.

**History and documentation.** CodeHistory.svelte formats structured answers for review and shows saved pre-run expectations and input counts. js/code-history.js validates optional expectation snapshots while accepting earlier records. Updated the ESP, style, architecture and local-development guidance, planned work and original feature ideas. Updated the existing browser suites and added shared browser input helpers; extended independent Python/marking/service tests. Generated live/ is built for /starters. No new dependencies, commit or deployment.

**Verification.** Final focused domain/service/profile/retention tests: 25 pass; final search/packed-bank/code-compatibility tests: 23 pass. Independent execution covers all 18 original/corrected investigations, novel student values, retry completion, leading-zero retention, exact-input evidence, safe parameter calls and reference checks independent of broken student code. Svelte reports zero errors/warnings; content/codes/coverage validation and /starters production builds pass. The first complete browser batch passed real original runs and repair checks across all 18 variations. After the wording/feedback refinements, all 18 passed labelled-input/summary checks, theme contrast and 320/768/1280px reflow. The final representative workflow passed prediction gating, required expectation count, original/edited runs, pointer/keyboard resize, actual CodeMirror overflow at reduced height with no workspace scrollbar, reload persistence, full-mark submission and archived original/edited evidence. Check-result assertions confirm the repair instruction is absent from that panel. Desktop form/editor screenshots were visually inspected; automated geometry covers narrow layouts. Logs: /private/tmp/task2-final-{tests,layout,validate}.log, /private/tmp/task2-last-{check,build,browser,metadata}.log and /private/tmp/task2-own-browser.log. Screenshot: /private/tmp/task2-own-workspace.png. git diff --check passes.

**Limits.** No full-suite, physical-device, college Edge/Windows, high-zoom or screen-reader acceptance claim. Classroom timing and subject acceptance remain outstanding. Automatic scores remain practice marks; existing independent-readiness calculations are unchanged. Preview and dedicated test Chrome remain available for immediate refinements.

## 20 October 2026 — Compact test-log preview, minimised check results and editor tabs

Updated src/lib/components/practice/TestPlan.svelte to present the five ESP test-log columns in a compact semantic table, with one row per existing test group, column/row dividers and smaller text. Multiple cases stay inside their group’s row; original/edited run evidence remains expandable in the actual-outcome cell. The preview scrolls horizontally and supports keyboard focus/arrow scrolling without widening the page. A first narrow-screen check exposed the question grid item’s automatic minimum width; min-width: 0 in Question.svelte fixes the containing layout rather than hiding overflow.

Updated LivePython.svelte with a Minimise/Expand control that preserves the check-results heading and existing feedback. Explicit new checks expand the panel. Original code/Your code now have attached tab shapes with rounded top corners, square bottoms and a clear selected fill using main/main-text theme colours. Inactive tabs use the quieter surface. Existing tab roles, arrow/Home/End navigation, code documents, marking and stored evidence are unchanged. Updated docs/style-guide.md, docs/esp/task-2-designs.md and docs/local-development.md.

Verification was limited to the presentation changes: Svelte diagnostics report zero errors/warnings; /starters production build and git diff --check pass. Added --presentation-only to scripts/browser-editor-workflow.mjs, reusing existing setup/input helpers. Its single Task 2 example verifies the five columns/two group rows, entered expectations and expandable run evidence, minimising/restoring results, automatic expansion on a new check, selected-tab styling and keyboard navigation, and local keyboard scrolling with no page overflow at 320/768/1280px. Visually inspected desktop and narrow Berry screenshots. The focusable scroll-region lint warning is explicitly suppressed with its keyboard-access rationale. Existing domain/marking tests were reused because those paths did not change. Logs: /private/tmp/task2-presentation-final-{check,build,browser}.log; screenshots: /private/tmp/task2-log-{320,1280}.png and /private/tmp/task2-tabs.png. No commit or deployment.

## 20 October 2026 — Shared mobile card edges and a pinned single-column editor

Implemented edge-to-edge main cards below 768px in css/styles.css: question cards, set toolbars, result banners, progress panels, search results and exam options lose side borders and rounding, retaining horizontal top/bottom gradient borders where applicable. Compact home and progress tile grids retain their existing columns and gutters. Updated the shared breakpoint comment and assessment layout check to the new boundary. Use 360px for routine small-mobile verification; 320px is now reserved for targeted issues rather than a duplicate sweep.

LivePython.svelte and Question.svelte separate guidance, the editor dock and execution controls in the single-column grid. Only the tabs/code/grip remain pinned across the associated questions. Pinning automatically limits code height to 45% of viewport height, with reserved flow space to prevent a page jump; the normal default still uses the agreed max(width × 1.4, height × 0.75) cap. Manual pinned resizing remains available and keeps the chosen height. The workspace has no internal scrollbar or height cap. Answer controls use a dynamic scroll margin to remain visible when focused beneath the editor. Guidance and check results use accessible icon-only −/+ controls; collapsed guidance still exposes editing notices. Selected tabs use a subtle main-colour tint, bold text and a top accent.

A subsequent visual report identified missing side outlines beside the tabs and grip. The single-column dock had been separated from the bordered guidance and controls without its own side rules. Added an absolute, non-interactive 1px side border across the dock, preserving editor width and sticky behaviour. This corrects the gap rather than adding spacing or altering the code frame. Updated docs/style-guide.md, docs/theming.md and docs/local-development.md to describe the adopted layout and focused checks.

Verification: final Svelte diagnostics report zero errors/warnings; the /starters build and git diff --check pass. The presentation browser suite passed at 360/767/768/960/1280px, covering mobile edges/gradients, disclosures, tab navigation, local table scrolling, pinned code and shared progress/search/exam cards. The initial edge assertion incorrectly included the browser scrollbar; it now measures the usable document viewport. A separate --mobile-scroll-only check passed against the final build for focused input clearance, manual pinned resizing, code-only scrolling, restored height, short landscape, release after the questions and continuous side-border geometry. Visually inspected the 360px pinned editor, desktop Berry tabs and final continuous outline. Logs: /private/tmp/mobile-editor-browser.log, /private/tmp/mobile-editor-final-{check,build,scroll}.log. Screenshots: /private/tmp/task2-pinned-360.png, /private/tmp/task2-tabs.png and /private/tmp/task2-continuous-outline.png. Reused prior domain/marking checks; no full-suite, physical-device, screen-reader or college Edge/Windows claim. No commit or deployment.

## 20 October 2026 — Pinned grip edge and desktop scrolling regression

Corrected two reported presentation regressions in src/lib/components/practice/LivePython.svelte and Question.svelte. The floating background previously included the full resize-grip row, covering scrolling text below the code outline. The grip now projects from the frame as an absolute control; its surrounding strip is transparent and does not intercept pointer input. A normal-flow spacer retains the continuous workspace sides and room for the grip when the editor is not pinned.

The desktop sticky offset previously used the entire workspace height, including expanded check results. Longer results therefore pushed the code above the viewport. Both layouts now use the same editor-only sticky section, with explicit grid areas preserving the 60/40 desktop columns. Guidance, execution controls and results remain in normal flow. Automatic pinned code height is limited to 65% of viewport height in two columns and retains 45% in one column; default initial sizing and manual overrides are unchanged. No workspace height cap or internal scrollbar was added.

Verification: zero Svelte errors/warnings, /starters build and git diff --check pass. Added a focused --dock-layout-only browser check using real expanded results: 1280/1024px code remains at its sticky top through scrolling and results collapse/expansion; 360px retains mobile behaviour. Frame/grip geometry and browser hit-testing confirm that only the grip extends below the outline and that it remains interactive. The existing mobile-scroll checks also pass for focus clearance, resizing, short landscape, restored height, release after questions and normal-flow borders. Desktop and mobile Berry screenshots were inspected. Updated stale layout assertions and docs/style-guide.md/docs/local-development.md; reused unchanged marking checks. Logs: /private/tmp/editor-dock-fix-{check,build,browser,mobile}.log; screenshots: /private/tmp/editor-dock-{1280,1024,360}.png. No commit, deployment or physical-device acceptance claim.

## 20 October 2026 — Responsive code text and horizontal scrolling

Updated prototypes/pyscript/adapter.js and editor-theme.js, shipped through live/python/, to preserve authored lines instead of enabling CodeMirror soft wrapping. Code and line numbers now use 16px at viewport widths >=768px and 14px below; the former size was 1rem. Long lines scroll horizontally inside each editor. Vertical resizing, original/read-only tabs and marking behaviour are unchanged. Updated docs/style-guide.md, docs/spec-python.md and docs/local-development.md to distinguish live-editor scrolling from static-snippet wrapping.

The first responsive rule used a nested root selector that the pinned style generator did not emit correctly. Applying the mobile font size to the code scroller fixes the rule and keeps code/gutters aligned. A browser-test assignment also needed parentheses around its optional-chain lookup; that fixture syntax issue was corrected before the final run. The final --code-layout-only check passes for both tabs at 360/767/768/1280px: computed font sizes, gutter sizes, unwrapped whitespace, actual horizontal scrolling for long lines and no horizontal page overflow. Visually inspected the 360px editor. JavaScript syntax checks, /starters build and git diff --check pass. Logs: /private/tmp/editor-font-final-{build,browser}.log; screenshot: /private/tmp/editor-code-360.png. Reused unchanged marking and Svelte-component checks; no commit or deployment.

## 20 October 2026 — Live editors follow the app light/dark theme

Updated css/tokens.css with mode-aware editor syntax colours and prototypes/pyscript/editor-theme.js with app surface/text/gutter colours, matching region/selection fills and native colour-scheme handling. Light mode uses darker syntax colours; dark mode retains bright syntax hues. Saturation adjustment and the text tint remain shared. Local editor aliases avoid changing the permanently dark static-code and home code-entry panels. Inherited variables update both mounted code documents immediately without resetting their state.

The first browser check showed that inheriting color-scheme alone produced normal rather than light: PyScript sets all: initial on its shadow host. An explicit --editor-color-scheme token now carries the app mode through that reset, including native scrollbars. Updated docs/theming.md, docs/style-guide.md and docs/local-development.md.

Verification: --editor-theme-only passes for both tabs across all eight default palettes, including light/dark luminance, native mode and at least 4.5:1 sampled plain-text, syntax and gutter contrast. Actual mode/palette controls preserve editor DOM nodes, drafts and undo history; font size and unwrapped lines remain intact. Completion-gap fill/outline checks pass in both modes. Visually inspected Rose and Berry editor screenshots. JavaScript syntax checks, /starters build and git diff --check pass. Logs: /private/tmp/editor-theme-final-{build,browser}.log; screenshots: /private/tmp/editor-theme-{light,dark}.png. No full-suite or physical-device claim, and contrast was not assessed across arbitrary custom adjustment extremes. No commit or deployment.

## 20 October 2026 — Stronger light-mode syntax colours

Strengthened the four light editor syntax bases in css/tokens.css: keywords #8000b5, strings #00752b, numbers/booleans #a34400 and functions #005cc5. Retained the existing 12% theme-text blend and shared saturation adjustment, as agreed. Dark syntax colours are unchanged. Updated docs/theming.md.

The /starters build, script syntax check and git diff --check pass. Reused --editor-theme-only across all eight default palettes, extending its existing contrast check to include the active-line background. Both code tabs pass sampled text/syntax/gutter contrast >=4.5:1, live mode switching and draft/undo preservation. Visually inspected the revised Rose screenshot; perceived colour separation remains subject to visual feedback. Logs: /private/tmp/editor-light-colours-{build,browser}.log; screenshot: /private/tmp/editor-theme-light.png. No commit or deployment.

## 20 October 2026 — Neutral inactive editor tabs

Changed LivePython.svelte so inactive editor tabs use the plain surface rather than surface-soft. In light Rose, surface-soft was more saturated than the selected tab’s subtle tint and incorrectly implied selection. Hover now uses a smaller 6% main-colour tint; selected tabs retain their 12% tint, bold text and top accent. Updated docs/style-guide.md.

Svelte diagnostics report zero errors/warnings; /starters build and git diff --check pass. Reused the existing eight-palette editor-theme check and visually inspected the light Rose tab preview. Logs: /private/tmp/editor-tabs-neutral-{check,build,browser}.log; screenshot: /private/tmp/editor-theme-light.png. No new tests, commit or deployment.

## 20 October 2026 — Full-width code in single-column questions

Extended only the code frame to the question card’s inside edges at widths up to 960px, reaching the viewport edges below 768px. Tabs, guidance and controls retain their inset positions; the grip remains centred. css/styles.css now names the existing responsive question padding, which LivePython.svelte reuses for the extension. Mobile side rules remain beside the tabs rather than crossing the widened code; the pinned shadow follows the code frame. Desktop 60/40 geometry is unchanged. Updated docs/style-guide.md and docs/local-development.md.

Verification: zero Svelte errors/warnings, /starters build and git diff --check pass. Extended the existing --code-layout-only browser check: both tabs pass frame/card alignment, tab inset, grip centring, font sizes, horizontal scrolling and no page overflow at 360/767/768/960/1280px. The existing --mobile-scroll-only check passes focus clearance, resizing, short landscape, release after questions and normal-flow alignment. Updated stale refinement/seam assertions; the full refinement suite was not rerun. Visually inspected 360px pinned and 768px normal-flow screenshots. Logs: /private/tmp/editor-full-width-{check,build,browser,mobile}.log. Unchanged marking checks were reused. No commit or deployment.

## 20 October 2026 — Remove stretched editor side borders

LivePython.svelte now removes the code frame’s inline borders only in single-column layouts (<=960px). Top/bottom edges, tab borders, resize grip and desktop frame remain unchanged. Updated docs/style-guide.md to record the stretched-frame exception.

Verification: Svelte check reports zero errors/warnings; /starters production build and git diff --check pass. This small CSS change was reviewed against the existing breakpoint rules; browser checks were not repeated. Logs: /private/tmp/editor-side-borders-{check,build}.log. No commit or deployment.

## 20 October 2026 — Smaller responsive live-code text

Updated prototypes/pyscript/editor-theme.js (shipped through live/python/) to use 14px code and line numbers by default and 12.5px at viewport widths <=440px. This supersedes the previous 14/16px rule. Updated docs/style-guide.md, docs/spec-python.md and docs/local-development.md, plus existing browser font assertions.

Verification: JavaScript syntax checks, /starters build and git diff --check pass. The existing --code-layout-only check passes both tabs at 360/440/441/768/960/1280px, including the exact new boundary, matching gutters, unwrapped lines, actual horizontal scrolling, card-edge alignment and no page overflow. Logs: /private/tmp/editor-font-small-{build,browser}.log. No new tests, commit or deployment; unchanged component and marking checks were not repeated.

## 20 October 2026 — Trial 768px coding-layout breakpoint

Changed Question.svelte and LivePython.svelte to collapse below 768px instead of at <=960px, including the matching stretched-frame styles and runtime sticky-height detection. Exactly 768px now retains two columns. This is a requested visual trial; no build or tests were run. Permanent guidance and browser expectations still describe the previous breakpoint pending review.

## 20 October 2026 — Proposed wider full-width-card breakpoint

The <768px column switch received visual acceptance. Investigated raising the separate main-card edge-to-edge threshold. Recommend <1024px, reusing the existing viewport-large token: this covers portrait tablet widths near 768–834px while retaining gutters at 1024px and wider. Card changes are still proposed, not implemented. No tests or build were run for this research.

Reference checked 20 October 2026: Apple’s layout specifications (https://developer.apple.com/design/human-interface-guidelines/layout) list logical portrait dimensions 744×1133 for 8.3-inch mini, 768×1024 for 9.7-inch iPads, 810×1080 for 10.2-inch iPads, 820×1180 for 10.9-inch Air, 834×1194 for first–fourth generation 11-inch Pro and 1024×1366 for 12.9-inch Pro. These represent default full-screen sizing; actual browser width varies with windowing, display settings and zoom. The breakpoint recommendation is a layout judgement informed by these dimensions, not device market-share research.

## 20 October 2026 — Separate column and card breakpoints

Replaced the active shared 768px threshold with content-specific 744px and 820px boundaries. Coding questions retain 60/40 columns from 744px; their CSS, stretched-frame rules and runtime sticky-height detection agree. Main cards extend edge-to-edge through 820px inclusive, with horizontal border gradients and inset content. The <=440px code-font rule and unrelated 1024px layouts remain unchanged.

Applied the agreed preference for conserving vertical space: home hero/activity columns, code-entry forms, page headings, submission and progress controls stack only below 744px. Compact typography and spacing start at <=820px. Search results and exam option main cards remain stacked through 820px to preserve their individual full-width treatment. Updated css/styles.css, src/lib/styles/breakpoints.css, Question.svelte and LivePython.svelte. Updated the style guide, theming, planned-work and local-development guidance; the earlier 960px/768px editor trial and proposed <1024px card rule are superseded.

Verification: Svelte check reports zero errors/warnings; /starters build and git diff --check pass. Reused and updated --code-layout-only for both tabs at 360/440/441/743/744/820/821/834/1280px: column count/ratio, code-frame alignment, font/gutter sizes, local horizontal scrolling and no page overflow pass. --presentation-only passes the new card boundaries, pinned single-column editor, disclosures, table scrolling and tab controls, plus progress/search/exam edges at 360/744/820/821px and home/header fitting at 360/743/744/820/821/834px. Inspected 744/834px question screenshots. Updated old assessment/refinement/docking expectations without running those wider suites. No full-suite, physical-device or enlarged-text acceptance claim; no commit or deployment. Logs: /private/tmp/responsive-final-{check,build,editor,presentation}.log.

## 20 October 2026 — Right-aligned selectors and stable code tabs

Added right justification to the shared focus-row in css/styles.css so wrapped Focus/Activity groups align with the container’s right edge. LivePython.svelte now reserves each tab label’s bold width using an invisible, aria-hidden sizing span in the same grid cell as the centred visible label. Selection retains bold text without changing either tab’s width or position; sizing remains responsive and does not require fixed pixel widths. Updated docs/style-guide.md.

Verification: Svelte check reports zero errors/warnings; /starters build and git diff --check pass. A temporary browser geometry check at 360/744/1280px confirms right-aligned selector rows, unchanged tab positions/widths across both selections and no page overflow. Logs: /private/tmp/selector-tabs-{check,build,browser}.log; checker: /private/tmp/check-selector-tabs.mjs. No full suite, commit or deployment. Recorded the proposed temporary code-width expansion in feature_ideas.md; implementation awaits discussion.

## 20 October 2026 — Expand code over the answer column

Added a keyboard-operable right/left triangle toggle to LivePython.svelte for layouts >=744px, on the tab row or a control row for questions without tabs. The code surface expands to the question content’s right edge above the answer column; the grid allocation, question positions, tab row and editor height remain fixed. The resize grip stays centred beneath the current code width. Resizing below 744px restores normal width and hides the toggle. Both documents retain their editor instances and edits; the adapter exposes horizontal scroll position so collapsing restores it after expansion temporarily makes a long line fit.

Visual feedback caught Original code wrapping after introducing the control row: the old 50% cap was inappropriate inside the new tab group. Removed that cap and prevented label wrapping or tab shrinking; the tab group can scroll locally if exceptionally constrained. Bold-label width reservation remains. Visual behaviour was accepted after the correction. Updated the style guide, local-development guidance and original feature idea to record the adopted toggle instead of a hold gesture.

Verification: Svelte check reports zero errors/warnings; final /starters build and git diff --check pass. Added a focused --width-overlay-only check covering 744/834/1280px, both tabs, unchanged grid/page geometry and code height, overlay pointer hit-testing, keyboard activation, retained editor/draft/scroll state, pinned expansion, resize to 820px, automatic collapse/hiding at 743px and questions without tabs. The first keyboard fixture omitted the Enter character and timed out; supplying the native Enter text corrected the fixture, and the final run passes. No full-suite rerun, commit or deployment. Logs: /private/tmp/editor-overlay-check.log, /private/tmp/editor-overlay-final-{build,browser}.log. Screenshots: /private/tmp/editor-overlay-{744,1280}.png.

## 20 October 2026 — Clarify valid text-input instruction

Changed the valid text-input guidance in Task2Response.svelte to “Enter one valid value for this test.” Each Input field supplies one response to Python input(); these valid tests require one response in total. Removed the unnecessary retry sentence. Input handling, marks and invalid-test sequences are unchanged. Reviewed the one-line text change and ran git diff --check; no build or tests for this copy-only edit. No commit or deployment.

## 20 October 2026 — Valid value per input wording

Corrected Task2Response.svelte guidance to “Enter one valid value per input.” This supersedes the previous instruction and its assumption about the intended design. The intended behaviour allows multiple independent valid values per test; current execution still queues entries in one run and marking requires one consumed valid entry. That implementation mismatch remains unresolved. This change updates wording only; no build or tests run. No commit or deployment.

## 21 October 2026 — Independent valid Task 2 inputs

Fixed the mismatch between multiple valid inputs and execution/marking. Each valid text input now runs independently with its own expected and actual result. Invalid inputs remain one ordered rejection/recovery sequence, and named-argument tests keep their existing contract. All current valid values must be suitable and different; each expected/actual response must match its own reference/original run to earn the existing group mark. Question totals are unchanged. The guidance remains “Enter one valid value per input.”

Updated js/task2-tests.js and src/lib/application/python-practice.js for expanded cases, per-input expectation gates and exact run matching. Task2Response.svelte gives each added valid input a stable identity, preserving the remaining answers/evidence when another input is removed. Old single-input outcomes remain readable and markable; old queued multi-input runs cannot satisfy the new independent execution contract. TestPlan.svelte retains two logical log rows with separate case results inside cells and reviewable removed-input runs. CodeHistory.svelte and js/code-history.js retain readable per-input outcomes and named run evidence through archive merging. Updated docs/esp/task-2-designs.md and docs/local-development.md.

Verification: all 18 focused tests in tests/esp-task2.test.js and tests/editor-workflow.test.js pass, covering all 18 investigations, novel independent values, original-code failure on the second value, separate expected/actual credit, duplicates, identity-preserving removal, stale evidence, legacy single-input compatibility, runtime gates and archive merging. Initial new test fixtures incorrectly assumed every test group was populated; corrected the fixture to skip absent cases. Svelte check reports zero errors/warnings; /starters build passes. The focused --independent-inputs-only browser check passes real Pyodide runs for both valid menu values, the ordered invalid/recovery sequence, edited-code retest, removal/edit/reload, 9/9 submission, 360px fitting and saved review. No full suite or broad visual sweep was rerun. Logs: /private/tmp/task2-independent-{tests,check,build,browser}.log. No commit or deployment.

## 21 October 2026 — Run every chosen valid input in order

Changed the valid test group's Original code/Your code actions to run every chosen input independently in order, after all its expected results are complete. The application service gives each input a separate runtime request and time limit, retaining evidence immediately. Returns, Python exceptions and timeouts continue to the next input. Stop, edits and profile changes still cancel outstanding work. Invalid-input sequences and named-argument cases retain their existing execution contracts.

Moved run controls above the per-input outcomes in Task2Response.svelte. Updated src/lib/application/python-practice.js, js/task2-tests.js and js/code-history.js for grouped execution and explicit timeout evidence. A timeout has no fabricated return, exception, output or input count and cannot earn recorded-outcome credit without the missing evidence. Shared evidence formatting now keeps Task2Response, TestPlan and CodeHistory consistent. Updated docs/esp/task-2-designs.md and docs/local-development.md. Explained that src/routes/[[view]] is SvelteKit's optional route segment and that src/lib/components/pages/About.svelte owns About content; no route or About edits were made.

Verification: 19/19 focused domain/service/archive tests pass; Svelte check has zero errors/warnings; /starters build and git diff --check pass. The focused real-browser check runs a faulty input before a successful one, then an infinite-loop input before a successful one, confirming continuation and worker restart. It also passes ordered invalid input, repaired-code retesting, stable removal/edit/reload evidence, 9/9 submission, 360px fitting and saved review. Cancellation and timeout archive validation pass in service tests. Logs: /private/tmp/task2-group-{tests,check,build,browser}.log. No full suite, commit or deployment.

## 21 October 2026 — Default practice sets and lasting selection recall

Restored immediate question sets when opening Puzzles, Coding practice, Core or ESP. The shared practice entry command uses the profile's remembered focus/subsection/challenge, resumes its active set when available, or chooses the first discoverable focus for a new profile. Unavailable remembered filters fall back to a valid selection. Removed the two-hour recall expiry and the breadcrumb override that deliberately opened a blank picker. Existing leave guards and direct-code behaviour remain.

Changed src/lib/application/practice.js, js/practice-selection.js and Breadcrumbs.svelte. Updated the common/Python specifications, application ownership, FAQ and local-development guidance to remove the superseded blank-entry/two-hour instructions. Added focused service/recall tests and a --entry-only browser mode; adjusted existing navigation/home-card fixtures to expect question sets.

Verification: six focused selection/session tests pass, including all four banks, resumed attempts, profile isolation, lasting recall, stale settings and cancelled replacement. Svelte check reports zero errors/warnings; /starters build and git diff --check pass. The focused browser check passes all four entry links, breadcrumb recall, remembered selection after 30 days and reload. Initial unit fixtures assumed different default focus names; corrected to the current bank. The browser fixture initially read the old DOM during navigation; waiting for the replacement code node fixed that test race. No broad layout, full migration/navigation suite, commit or deployment. Logs: /private/tmp/practice-entry-{tests,check,build,browser}.log.
