# Cover Paths challenge review — 8 October 2026

The teacher reported that Cover Paths · 91 (`PZ-21-875-0`) was an empty rectangle labelled Stretch. It could be solved by an ordinary alternating sweep. Inspection of all 30 Stretch templates found that the generators mainly used board dimensions and broad silhouette types to assign difficulty. Slots 870, 875 and 880 had no blocks. Other examples were simple L-shapes, stepped outlines or a rectangle with one gap. A valid witness established solvability, not challenge.

## Correction and reasoning

Revised the obstacle layout, witness, hint and explanation for slots 465–479 and 870–884. These remain the same cover-every-dot task at the same permanent slots and variation positions. Other levels and puzzle families are unchanged. Every revised board has 35 open dots on a 7×7 grid, with 14 blocked positions. Board size is deliberately held constant instead of being used as the challenge criterion.

Each board has two structural endpoints: dots with only one neighbour. These are deductions from the obstacles, not prescribed start/end markers; players can start anywhere and every complete valid route remains accepted. Two-neighbour dots force further connections. Repeated local degree deductions still leave 20–34 undecided edges, so identifying endpoints and following forced connections does not finish the puzzle. Players must arrange the remaining connections without making a premature loop or disconnecting an unvisited region. Inspected all 30 masks and their endpoint positions; hints now point to these applicable deductions and each explanation identifies its own endpoints.

Ordinary alternating row and column sweeps fail in both directions. Exhaustive enumeration finds 2–12 routes per board, counting reversal once; these are not unique-solution puzzles. The layouts are distinct even under reflection and rotation. These checks reject the demonstrated weak layouts and support provisional Stretch classification. Neither a low route count nor a search runtime alone measures human difficulty. Teacher review and student timing trials remain required; ten minutes is an estimate, not a measured duration.

## Per-board evidence

Coordinates below are one-based. “Undecided edges” means edges remaining after repeated local degree deductions, before connectivity or loop reasoning.

| Slot | Structural endpoints (row, column) | Undecided edges | Routes excluding reversal |
| --- | --- | --- | --- |
| 465 | (1, 7); (6, 2) | 34 | 12 |
| 466 | (2, 1); (7, 4) | 23 | 5 |
| 467 | (5, 1); (7, 3) | 32 | 4 |
| 468 | (1, 7); (7, 3) | 25 | 4 |
| 469 | (1, 1); (5, 7) | 21 | 12 |
| 470 | (2, 5); (3, 6) | 22 | 6 |
| 471 | (4, 1); (6, 1) | 21 | 6 |
| 472 | (7, 1); (7, 5) | 28 | 6 |
| 473 | (1, 6); (7, 2) | 23 | 3 |
| 474 | (1, 1); (1, 7) | 21 | 6 |
| 475 | (1, 7); (7, 1) | 24 | 12 |
| 476 | (1, 1); (3, 7) | 23 | 3 |
| 477 | (1, 7); (5, 7) | 27 | 4 |
| 478 | (3, 7); (6, 6) | 25 | 10 |
| 479 | (7, 1); (7, 3) | 30 | 4 |
| 870 | (1, 2); (6, 1) | 22 | 2 |
| 871 | (3, 7); (5, 7) | 22 | 11 |
| 872 | (2, 2); (7, 7) | 22 | 8 |
| 873 | (3, 7); (7, 1) | 24 | 6 |
| 874 | (1, 4); (2, 3) | 23 | 12 |
| 875 | (1, 2); (2, 7) | 30 | 11 |
| 876 | (4, 2); (5, 1) | 24 | 6 |
| 877 | (1, 2); (1, 4) | 22 | 8 |
| 878 | (6, 1); (6, 3) | 21 | 11 |
| 879 | (1, 7); (6, 2) | 23 | 7 |
| 880 | (1, 7); (7, 7) | 26 | 12 |
| 881 | (1, 1); (1, 5) | 20 | 8 |
| 882 | (1, 7); (7, 1) | 20 | 8 |
| 883 | (6, 7); (7, 2) | 23 | 10 |
| 884 | (1, 7); (7, 1) | 24 | 4 |

## Reusable checks and compatibility

Run `python3 scripts/audit-cover-paths.py` from the repository root. It independently checks all 145 authored Cover Paths witnesses and the structural safeguards and recorded route counts for every Stretch board. The bounded enumerator rejects incomplete searches; its pruning was cross-checked against an unpruned enumerator on all 290 eligible 3×3 obstacle masks with two endpoints. `tests/puzzle-enrichment.test.js` also rejects ordinary sweeps through the production marker. Existing path tests check reverse routes and reject missing, repeated and blocked dots.

The historical `expand-puzzles.py` and `enrich-puzzles.py` generators are not approved difficulty classifiers. Rerunning them can overwrite reviewed content: run the audit and review the changes before accepting generated boards. The authored bank is authoritative. A future generator must screen reasoning demand instead of assigning Stretch from grid size or generation order.

Slots and variation ordering are preserved. Content fingerprints require a new bank revision; old question and set codes continue resolving those slots with the normal content-change notice. Existing saved results retain their historical metadata. No Go ranks, package API, UI or marking rules changed.

## Verification results

All 145 path witnesses and all 30 Stretch structural reviews passed. All 221 independently enumerated routes, plus their reverses, receive full marks through the application checker. Four focused path/coverage regression tests passed. Full content validation passed for 1,340 templates and 2,933 variations; coverage is current and the production build passed. Bank revision 22 records exactly these 30 corrected templates; all other path records, permanent slots and variation counts are unchanged. `PZ-21-875-0` still resolves with the content-change notice.

The isolated browser check of slot 875 passed answer entry, named-profile save/reload, submission, reveal and 1280/640/320-pixel reflow against the source preview. Inspected the mobile screenshot. An initial test assertion counted all 49 board controls, including 14 disabled obstacles; correcting it to count enabled controls confirmed 35 open dots. No application defect was involved. No full cross-family difficulty review or classroom calibration is claimed.
