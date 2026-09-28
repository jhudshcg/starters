# Puzzle difficulty availability — 25 September 2026

Read-only audit of active source templates via `data/puzzles.js` and the actual `puzzlePool` / `availableChallenges` functions in `js/bank.js`. Counts agree with `data/coverage/puzzle-inventory.json`: **901 active templates**. No puzzle content or labels changed.

| Family | Beginner | Foundation | Standard | Stretch |
| --- | ---: | ---: | ---: | ---: |
| Logic grids | 0 | 30 | 40 | 30 |
| Logic equations | 0 | 30 | 40 | 30 |
| Tangram silhouettes | 0 | 30 | 27 | 43 |
| Cover every dot | 0 | 30 | 40 | 30 |
| Sudoku | 0 | 30 | 40 | 30 |
| Arithmetic cages | 0 | 30 | 40 | 30 |
| Sequences | 0 | 30 | 45 | 25 |
| Classic maths | 12 | 26 | 52 | 10 |
| Go | 26 | 25 | 25 | 25 |

Seven families lack Beginner content. Every family can supply Foundation, Standard and Stretch sets. `availableChallenges` requires **three distinct templates**, not three variations; the UI disables bands below that threshold. Four templates allow another question combination, while three allow only permutations of the same trio.

## Maths topic filter

| Filter | Beginner | Foundation | Standard | Stretch |
| --- | ---: | ---: | ---: | ---: |
| Algebra | 12 | 11 | 8 | 4 |
| Number and measures | 0 | 13 | 2 | 0 |

Number and measures offers only Foundation: Standard has two questions, and Beginner/Stretch have none. The filters select explicit `maths:algebra` / `maths:number` tags; their combined 50 templates do not include the other 50 Classic maths templates available through All maths. Review those older tasks before assigning topic tags; no automatic classification was attempted.

## Cause and suggested next work

- `scripts/enrich-puzzles.py` generates Foundation/Standard/Stretch boards, with scaffolded tangrams assigned Foundation/Standard. It has no Beginner branch. `data/puzzles/sequences-enriched.js` likewise starts at Foundation.
- Beginner was supplied for maths algebra and rank-based Go, but not extended across the seven other families. The missing entries are content/metadata gaps, not a selector threshold fault.
- `validateBank()` enforces family totals and variation/structure checks, but does not require three templates per difficulty band or maths topic/band. Thus whole-bank validation can pass with unavailable bands.
- Proposed follow-up: review suitable existing introductory tasks against explicit Beginner criteria, then author genuinely simpler tasks where needed. Avoid relabelling merely to fill counts. To open all currently missing selections using additions alone requires at least **21 Beginner templates** across seven families, plus **3 Beginner, 1 Standard and 3 Stretch** Number and measures templates. More than three per band is preferable for set variety.

This establishes labelled availability, not educational difficulty, solution correctness or live deployment state. Teacher difficulty review and student timing remain outstanding. No build, browser checks or full test suite were needed for this read-only audit.

## 27 September — bounded follow-up completed

Reviewed existing `maths-more.js` tasks and added `maths:number` to slots616,617,621,622,623,624,627,631,633: repeat intervals, remainders, weighing capacity, missing mean, work rates, relative speed, rectangle counting, clock angular speed and merge costs. These assess numerical counting, rates or measures. No question text, answers, hints or challenge levels changed; this fixes topic-filter omissions rather than inventing easier difficulty labels.

Number and measures now has **0 Beginner /15 Foundation /5 Standard /4 Stretch** templates. Foundation, Standard and Stretch are selectable, with alternative three-question combinations at each. Seven puzzle families still lack Beginner content; Number and measures still needs Beginner questions. The earlier counts above remain the historical audit.

Checks: all-bank structure/model-answer validation, coverage freshness, generated identity compatibility (revision15), production build and diff checks passed. Direct selection checks confirmed valid three-question Standard/Stretch Number and measures sets. No shared runtime code changed, so no full-suite/browser rerun. Existing difficulty labels remain provisional pending teacher/student calibration.

## Confirmed target — 27 September clarification

Aim for **approximately100 active templates per puzzle family**, roughly distributed across the four challenge levels (about25 each is a planning guide, subject to appropriate difficulty). The three-template selection threshold is not the content target. The earlier addition-only minimum describes the gap arithmetically, not the agreed implementation plan: rebalance existing100-question pools, author genuinely introductory replacements as needed and retire surplus active templates without recycling historical identities. Number and measures and Algebra are filters within the Classic maths total, not separate100-question families.

## Final target clarification — preserve existing quality

The teacher subsequently clarified that **approximately25 per challenge level is a minimum target, not a cap**. Retain good questions where a band exceeds25 and add appropriate questions to underrepresented bands. Family totals may exceed100. This supersedes the preceding suggestion to retire surplus questions to keep totals near100. Plan genuine content additions against the saved counts; do not meet the target by relabelling harder questions or merely reaching the three-question selector threshold.

## 27 September — first authoring increment

Added13 original Beginner Number and measures templates in `data/puzzles/maths-beginner.js`, slots985–997, five variations each. These cover place value, equal packs, simple fractions/percentages, metric/time conversion, signed temperature change, perimeter, area, ratio, mean, median/range and rounding. Difficulty criterion: explicit rules and familiar small numbers with at most a short sequence of operations; no combinatorial search or unstated formula discovery. Existing questions preserved; teacher calibration pending.

Classic maths now has25 Beginner /26 Foundation /52 Standard /10 Stretch (113 templates); Number and measures has13 Beginner /15 Foundation /5 Standard /4 Stretch. All65 new variations independently checked using arithmetic/unit conversions and Python statistics; model marking and production build pass. Removed redundant assessed parts during editorial review. No new UI or shared runtime behaviour.

The remaining family-level target requires190 additions:25 Beginner for each of seven families and15 Stretch Classic maths. Current historical slot audit finds122 previously unused puzzle addresses before this increment (109 remain afterward). Completing all additions therefore needs an explicit backward-compatible codec extension; do not recycle historical slots or renumber existing puzzles.

## 28 September — expansion and fairness review completed

This supersedes the earlier gap counts and retirement proposal. The bank now has **1,120 templates**, with at least25 at every level in every family. Existing surplus content is retained. Counts come from the [generated inventory](../../data/coverage/puzzle-inventory.json).

| Family | Beginner | Foundation | Standard | Stretch | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Logic grids | 25 | 30 | 40 | 30 | 125 |
| Logic equations | 25 | 30 | 40 | 30 | 125 |
| Tangrams | 25 | 30 | 27 | 43 | 125 |
| Cover paths | 25 | 30 | 40 | 30 | 125 |
| Sudoku | 25 | 30 | 40 | 30 | 125 |
| Number constraints | 25 | 30 | 40 | 30 | 125 |
| Sequences | 25 | 30 | 45 | 25 | 125 |
| Classic maths | 25 | 26 | 68 | 25 | 144 |
| Go | 26 | 25 | 25 | 25 | 101 |

Number and measures now offers13/15/20/20 templates across the four levels; Algebra retains12/11/8/4. Both filters are selectable at every level. The25-per-level target applies to puzzle families, not each maths topic filter.

### Basis for difficulty labels

| Family | Beginner additions and comparison with existing content |
| --- | --- |
| Logic grids | Four people, one category, an explicit starting match and short exclusion/order chains. Existing Foundation puzzles coordinate two or three categories. Uniqueness is exhaustively checked; clue count alone is not a difficulty measure. |
| Logic equations | Three variables and sum/difference/order constraints, without products. Existing Foundation generally uses four or five variables; upper bands require more interacting constraints. |
| Sudoku | 4×4 grids with10–12 givens and short single-candidate deductions. Existing small Foundation grids have substantially fewer givens; upper bands use9×9 boards with less scaffolding. |
| Cover paths | Small masks with8–12 open dots. Existing Foundation boards generally have14–24. Branches and bottlenecks matter as well as size; all valid routes remain accepted. |
| Tangrams | Four visible piece guides, compared with two at Foundation and one or none at Standard. Stretch outlines have no guides. Outline compactness alone does not establish difficulty. |
| Arithmetic cages | 3×3 grids with single cells and two-cell addition cages. Existing Foundation/Standard/Stretch generally use4×4/5×5/6×6 with increasing interaction and mixed operations. |
| Sequences | Explicit equal-step, doubling, halving or repeating-group rules. Five task forms practise continuation, missing positions, error finding, totals and backward steps. Rule families are deliberately repeated with meaningful value changes; these are25 templates, not25 unrelated concepts. |
| Classic maths | Beginner additions use familiar quantities, conversions and short calculations. Routine applied multi-step work is Standard; Stretch requires constrained counting, optimisation, a guarantee or strategy. |
| Go | **Only recorded source problem grading:** Beginner25k+, Foundation18–24k, Standard12–17k, Stretch11k and stronger. No Go content/grades changed; tree depth is not substituted. |

Fairness corrections: existing Weighing capacity (621) and Reliable majority (632) moved from Stretch to Standard because their supplied structure reduces inference. Thirteen of the15 applied maths drafts were classified Standard. The new cumulative doubling task (1223) also moved to Standard; its recurrence is supplied. A separate constrained-order counting task (1229), with five independently enumerated variations, maintains Stretch coverage. The misleading “Optimal adjacent merges” title at633 became “Optimal merges”; its prompt already allowed any pair. Permanent slots and variation positions were preserved.

These are author judgements about the reasoning and scaffolding, not measured classroom difficulty. Existing non-Go levels can overlap in structural measures; those measures alone do not prove an item is correctly calibrated. Teacher approval and student timing/hint trials remain pending. Estimated durations are not a guarantee that three Stretch puzzles fit a15-minute set.

### Checks and reuse

- Independent interactive solver check:870 served variations, including all150 new Beginner boards; uniqueness where required, valid paths/tilings and source-based Go behaviour checked by the appropriate existing validators/tests.
- Independent numerical checks:65 earlier Beginner maths variations, plus280 sequence/applied/reasoning variations. Reference checker: `scripts/verify-puzzle-additions.py`; enumeration and Python arithmetic are independent of JavaScript answer generation.
- Full suite:123 tests passed after correcting the obsolete logic clue-count assertion. Following the final numerical addition, all18 relevant puzzle/codec tests and all-bank model validation passed. Current bank total across activity types:1325 templates/2885 variations.
- Production build passed. Shared browser checks cover canonical legacy links, sharing across all four activity types in a separate browser context, backups, timers, puzzle interactions and mobile layout. Focused expansion checks exercise13 high-slot examples through actual controls, reload, scoring and reveal, plus320px and200% zoom reflow. Old timed active work retains its answers and deadline through migration and another reload.

Use `scripts/browser-puzzle-expansion.mjs` against the isolated preview for the focused checks (`--migration-only` skips already-checked puzzle examples). Do not regenerate checked boards or reconvert exam resources when resuming. The checkpoint records final completion and any later limitations.
