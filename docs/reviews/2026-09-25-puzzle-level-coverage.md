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
