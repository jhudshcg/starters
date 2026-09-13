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
