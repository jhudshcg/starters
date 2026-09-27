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
