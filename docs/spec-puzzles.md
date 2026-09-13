# Puzzle specification

Status: draft; shared behaviour is in [spec-common.md](spec-common.md).

Puzzles provide variety, enjoyment and short reasoning practice. Curriculum links and industry contexts are useful where natural. Puzzles do not contribute to revision priorities.

## Initial families

**Proposal:** launch with number grids, spatial transformations and ordering constraints. Each family is a selectable focus. Add sequences and Go problems later; do not block the first release on them.

| Family | Input | Validity rule |
| --- | --- | --- |
| Number grids | Labelled numeric cells | Clues determine each requested value |
| Spatial transformations | Clickable cells or labelled choices | Explicit coordinate system, direction and rotation centre |
| Ordering constraints | Select item then position; optional drag | Checker accepts every ordering satisfying all stated constraints |
| Sequences, later | Numeric entry or choice | State the generating rule or constrain the rule family; avoid claiming any finite sequence has only one possible continuation |
| Go, optional later | Clickable board plus keyboard coordinates | Authored goal, player to move, legal moves and verified continuation tree |

**Proposal:** two puzzles per set, 5–10 minutes combined, three templates per launch family and five authored variations per template. These are proposed production targets; AGENTS.md does not set puzzle counts. Allocate 1–3 points to each independent action or result according to difficulty. No speed bonus. Publish the point breakdown before play.

Prefer known-answer generation at build time. A solver or independent validator checks all published variations. When uniqueness is required, validate uniqueness. Never use a single stored solution to reject another valid solution to an open constraint puzzle.

## Complete example set: number grids

Two questions, 8 points, estimated 5 minutes. Arrays below describe rows. Both templates have a fixed two-by-two layout with missing top-right and bottom-right cells.

### PZ-GRID-001: row and column totals (4 points)

Prompt: “Enter the two missing numbers. Each row and column must match its total.” Grid `[[2, ?], [3, ?]]`; row totals `7, 9`; column totals `5, 11`. Answers top-right `5`, bottom-right `6`, two points each. Incorrect cells receive zero without losing points on the other cell.

| Variation | Known left column | Row totals | Column totals | Missing right column |
| --- | --- | --- | --- | --- |
| V01 | 2, 3 | 7, 9 | 5, 11 | 5, 6 |
| V02 | 4, 2 | 7, 9 | 6, 10 | 3, 7 |
| V03 | 1, 5 | 9, 7 | 6, 10 | 8, 2 |
| V04 | 6, 3 | 10, 8 | 9, 9 | 4, 5 |
| V05 | 2, 7 | 8, 8 | 9, 7 | 6, 1 |

Hint: “Subtract the known number from its row total.” For V01, top-right `7` gets “7 is the whole row total. Account for the 2 already in the row.” Reveal explains `7 - 2 = 5` and `9 - 3 = 6`, then checks columns. Use corresponding arithmetic for other variations.

### PZ-GRID-002: row products (4 points)

Prompt: “Enter the missing positive whole numbers. Multiply the two numbers in each row to obtain its target.” Grid `[[3, ?], [4, ?]]`; targets `12, 20`. Answers `4, 5`, two points each.

| Variation | Known left column | Row targets | Missing right column |
| --- | --- | --- | --- |
| V01 | 3, 4 | 12, 20 | 4, 5 |
| V02 | 2, 5 | 14, 15 | 7, 3 |
| V03 | 6, 3 | 12, 18 | 2, 6 |
| V04 | 4, 2 | 24, 16 | 6, 8 |
| V05 | 5, 7 | 20, 14 | 4, 2 |

Hint: “Which number multiplied by the left cell gives the target?” V01 answer `9` gets “This target is a product, not a sum.” Reveal shows division and checks multiplication for each row.

These two templates illustrate a complete set; a third template is still required under the proposed launch target. Use a grid with explicit adjacent-difference rules and verify unique missing values.

## Spatial and logic interaction examples

Spatial: “In a 3×3 board, rotate the marked cell at row 1, column 2 by 90 degrees clockwise about the centre. Select its new cell.” Correct answer: row 2, column 3. Show row/column labels and provide equivalent labelled radio options. A counter-clockwise answer gets feedback about direction, not an unexplained failure.

Ordering: “Put jobs A, B and C in order. A must run before B. C must run after B.” Correct order A, B, C. Allow keyboard selection of a job and destination. For variants with more than one legal ordering, score the constraints, not similarity to one reference order. Prevent duplicate placement and keep every job reachable.

## Optional Go scope

Students already know the rules. Target the requested 10–20 kyu range with reviewed authored positions. Include an optional rules-reminder link, verified when this feature is built. Specify capture or survival goal, colour to play, orientation, move legality, ko policy and opponent replies. **Proposal:** start with positions that avoid ko and require only short verified lines. Do not grade a move solely by matching one first move if alternatives work. Rank difficulty needs knowledgeable review.

## Acceptance

Every puzzle is usable without dragging, without colour discrimination and by keyboard. Marked coordinates and clues have text labels. Layout remains usable at high zoom. Each variation passes rule and answer validation, has useful feedback and can be completed within its estimated time in a student pilot.

## Implemented expansion

The active bank now has five puzzle focuses with three templates and five variations per template. Earlier single-step spatial questions are retired from random selection but remain resolvable by their old codes. Their replacements use new slots, preserving bank-version-1 code meanings.

| Focus | Templates | Interaction and marking |
| --- | --- | --- |
| Number grids | Totals, factors, differences | Numeric cells; 4 points per question |
| Spatial | Combined transformations, reverse transformations, robot commands with obstacles | Select directly on one 5×5 grid; 3 points for position and 1 for a related response |
| Logic | Job ordering, device assignment, switch deduction | Click to order/match/toggle; 1 point per satisfied clue or correct assignment, up to 3 |
| Shapes | Reflection, rotation, exclusive mask combination | Click to fill/clear cells; 3 points for the exact selected cell set, independent of click order |
| Paths | Exact-length route, checkpoint visit, limited turns | Click adjacent cells, backtrack, undo/reset; 3 points for any route satisfying all constraints |

Logic solutions are checked for uniqueness. Path solutions are checked against constraints, not equality with a stored route; the stored route is only an example for answer reveal. Malformed answers and repeated matching assignments are rejected. Grid cell selections use yellow, with text and pressed states, rather than green correctness cues.

The spatial difficulty changes respond to teacher feedback that one-step transformations are too basic. Difficulty and timings still need classroom trials. Dragging is optional future enhancement; every implemented puzzle works by click and keyboard.
