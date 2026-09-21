# Puzzle specification

Status: replacement content implemented for local testing; teacher difficulty review pending. Shared behaviour: [spec-common.md](spec-common.md). Audience: 16–19-year-old T-Level students, at A-Level-equivalent academic level. Puzzles are for reasoning and variety; they do not contribute to revision priorities.

## Difficulty and scope

A starter should sustain 5–15 minutes of thought. Use linked deductions, interacting constraints, planning or systematic enumeration. A larger grid, longer calculation or more clicks alone does not meet this requirement. Each family needs five distinct puzzles, with meaningful variations; renamed clues or rotated copies do not count as five distinct puzzles. Timing remains an estimate until classroom trials.

The implemented bank includes the example types, numerical constraints and sequences, all 30 classic maths problems, and 50 Go problems. The maths and Go totals override the five-per-type baseline.

| Selectable subtype | Five-puzzle production brief | Interaction and correctness |
| --- | --- | --- |
| Logic grids | Four entities and three or four categories; combine exclusions, relative positions/differences and either/or clues. Require deductions across clues. | Candidate grid cycles unknown → excluded → selected; selections are yellow and labelled. Final category mappings must satisfy all clues and one-to-one rules. |
| Logic equations | Five or six distinct integer values assigned to variables; combine products, sums, inequalities and differences. | Candidate grid with cross/tick states and Undo. State the domain and all-different rule. Use explicit multiplication, never ambiguous `AB`. |
| Tangrams | Seven geometric pieces; five different connected silhouettes that require planning orientations and remaining space. | Select/place/rotate/flip pieces; optional dragging with click and keyboard alternatives. Use every piece once, inside the silhouette, with no overlap or gaps. Accept every valid tiling. |
| Cover every dot | Five different obstacle layouts, roughly 20–35 traversable positions; routes must avoid isolating unvisited areas. | Press an open dot to start, then drag while pressed, snapping to neighbouring tracks. Click/keyboard alternatives, Undo and Reset. Visit every available position exactly once from any player-chosen start; no prescribed end. No diagonals or crossings. Accept all valid routes. |
| Sudoku | Five different 9×9 boards with a unique solution and a recorded deduction route; include hidden singles and interactions between rows, columns and boxes. | Click a cell, enter a digit; pencil notes, clear, Undo; givens immutable. Validate rows, columns, boxes and givens. Do not grade by clue count alone. |
| Number constraints | Five distinct coupled arithmetic arrangements, not independent one-operation blanks. Include restricted domains, row/column constraints and ordering or diagonal restrictions where needed. | Numeric cells or candidate grid. Check the whole system and report useful constraints on explicit checking. |
| Sequences | Five different rule structures, such as alternating operations, interleaving, second differences, recurrence and constrained transformations. | Short numeric answers; constrain the rule family and request intermediate reasoning where practical. Do not claim an arbitrary finite sequence has a unique continuation. |
| Classic maths | Five selected problems with bounded, checkable answers and independently derived explanations. | Short structured answers or choices; source link; separate hidden solution. Avoid subjective questions that cannot be self-marked fairly. |

Normal puzzle selection produces three distinct puzzles of the selected subtype. Individual question codes may open one puzzle. Three substantial puzzles can exceed 15 minutes; the starter timer is a practice limit, not a guarantee that every student will finish the set.

## What the examples establish

All nine local images were inspected. `logic_grid_start_here.png` explicitly describes a sub-minute introduction; use it only to inform onboarding. The three easy logic grids introduce relative numeric clues and either/or exclusions. `harder_logic_grid.png` combines four categories and eight clues: this is a more useful reasoning benchmark, not an automatic difficulty certification.

The tangram example allows more than one solution. The dot-path example requires covering all dots. The equations example uses a cross/tick grid. The Sudoku screenshot shows candidate-oriented grid interaction. Preserve those mechanics; do not replace them with single-coordinate questions.

The old two-by-two totals/products, one-step spatial transformations and three-item ordering examples are superseded as production benchmarks. Existing UI tests alone never established suitable challenge.

## Source review

- [Mr Barton Maths collection](https://mrbartonmaths.com/puzzles/): reviewed the 30 embedded prompts and page behaviour, not just the landing-page text. It contains self-reported completion, not supplied solutions or automatic marking. Some prompts need clearer assumptions; the birthday prompt reverses the information assignments relative to its dialogue. Use selected classic ideas, concise authored wording, attribution and independently checked answers. The collection is not ordered by difficulty.
- [Mathschallenge one-star PDF](https://mathschallenge.net/problems/pdfs/mathschallenge_1_star.pdf): sampled numerical, arrangement and geometric problems and their printed solutions. Questions and solutions appear together, so embedding complete pages would disclose answers. Use as additional inspiration; no claim that all 127 pages were reviewed.
- [GoProblems](https://goproblems.com/) and [OGS puzzle 2625](https://online-go.com/puzzle/2625): retrieved public API data, inspected positions and imported their solution trees. The bank contains 49 GoProblems examples rated 10–20 kyu and the linked OGS example. Preserve attribution and original board sizes. Source winning markers establish the accepted lines; validation checks move legality and captures, not independent strategic optimality.

Keep source URLs and adaptation notes in content records. Do not import an entire externally authored collection as though it were original content.

## Data and validation

One public `data/puzzles.js` bank imports the family data. Keep renderers and checkers separate from authored instances. Each puzzle records subtype, rules, prompt, hint, model solution, explanation, estimated duration and validation evidence. Generate data before publication, with reproducible seeds where relevant; no unbounded client-side search.

- Logic/equations: independently enumerate solutions; enforce uniqueness; include a clue-dependency review. A simple list of direct assignments is insufficient.
- Tangrams: verify piece identity, allowed transformations, polygon containment, pairwise non-overlap and complete target coverage. A saved reference arrangement is one solution, not the only permitted arrangement.
- Dot paths: verify adjacency, a player-chosen start, blocked positions, no repeats and complete coverage. Record that at least one valid route exists; uniqueness is not required.
- Sudoku: solve independently, count solutions up to two, and record the techniques needed. Reject unsatisfiable or ambiguous boards.
- Numerical/sequence/classic problems: calculate independently, check every variation and test wrong answers corresponding to common mistakes. Explicitly state conventions and allowed operations.

Apply [shared hint rules](content-authoring.md#hints-feedback-and-reveal) and the [refinement checklist](content-refinement.md). For Go, show green feedback immediately on reaching a recorded winning position; other puzzle families retain explicit checking. Avoid scoring trivial exclusions or safe moves as if they solved the puzzle; publish the scoring rule.

## Accessible controls

All actions work by click and keyboard; dragging is optional. Use warm yellow for selections, with a cross/tick/number and an accessible state label. No second radio-selector grid for spatial answers. Preserve undo, reset and refresh recovery. Larger grids may scroll within a labelled board region, but must not cause whole-page overflow. Do not shrink controls to make a complex grid fit a phone.

## Go: format, approach and presentation

`data/puzzles/go.js` contains 50 fixed positions with side to move, objective, original board size, cropped viewport and a tree of recorded moves, resulting boards and success/failure markers. `sgfmill` parses source SGF and computes captures during import. Keep the selected source inventory in `data/coverage/go-source-inventory.json`.

Click or keyboard activation plays a recorded move and the opponent’s reply immediately. Stone colours remain visible beneath yellow last-move rings. Offer Undo, Reset and a choice among recorded opponent replies. Unlisted moves are proposed but unverified, never declared proven losing. Ko/seki outcomes must be explicit in the question.

“Hint: next move” marks a recommended intersection without playing it and records assisted practice. Reaching a source-marked winning node immediately shows a green success message. The source tree accepts alternative recorded wins; no general Go engine searches for unlisted solutions. Show-answer replay supports click, continuous dragging and keyboard steps without replacing the slider during input. Include a Go rules reminder link.

## Acceptance

Five distinct active puzzles in each production subtype; all published variations pass independent rule checks and model-answer tests. The browser flow must cover input, Undo, reveal, submission, saved-state recovery, keyboard operation and high zoom. Record unsolved usability or difficulty issues. Classroom timing and teacher judgement remain required before claiming the content meets the intended challenge level.

## Logic grids: format, approach and presentation

Four named entities are matched to every value in two or three further categories. Each category is a permutation. Store category labels, clue text and machine-readable constraints separately; the wording must express the same rule as the checker. Numeric-category clues may compare ordered time positions. Exactly-one alternatives must be stated explicitly.

Present the clues above separate labelled candidate tables, one per category. A cell cycles unknown, excluded, selected. Exclusions are working notes; selected values form the answer. Do not auto-fill the solution or silently propagate deductions. Undo restores the prior state. Completion requires every row assigned and all one-to-one and clue constraints satisfied; award the displayed three points only for a complete solution.

Generate from a hidden permutation, then independently enumerate to establish uniqueness. Remove redundant clues, retain linked deductions, and review whether the puzzle can be solved by reasoning without arbitrary guessing. Five different clue systems count as five puzzles; renamed people do not.

## Logic equations: format, approach and presentation

Use five to seven variables and an explicit domain of distinct integers 1–N. Combine multiplication, addition, directed subtraction and inequalities. Store each expression as an operation and operands; do not evaluate arbitrary text or student code. Symbols and operand order must be explicit.

Show the equations beside or above a candidate table. Use the same cross/tick/unknown controls as logic grids. Every variable needs one value, every value is used once, and every equation must hold. Check the full system for three points. Hints identify a useful factorisation, bound or difference without supplying the mapping. Enumerate candidate permutations independently to verify uniqueness for each variation.

## Tangrams: format, approach and presentation

Use the seven conventional piece shapes: two large triangles, a medium triangle, two small triangles, a square and a parallelogram. A silhouette is an unlabelled union of their polygons. Store local piece vertices, the target polygons and one reference arrangement; never expose the reference’s internal boundaries on the target.

Show a labelled piece tray and one board. Select a piece, click to place its anchor, move in half-unit steps, rotate ±45° and flip the parallelogram. Provide keyboard-operable controls for all operations. The selected piece has a yellow outline. A reset returns pieces to the tray; Undo restores positions and orientation. Dragging pieces may be added without removing these controls.

Mark geometry, not similarity to reference placements. Every piece must be placed, contained in the silhouette, and non-overlapping. Equal total area then establishes full coverage. Use a small numerical tolerance only for floating-point polygon arithmetic. Identical triangles may exchange positions. Reveal displays a complete arrangement and explains that alternatives are accepted. Award three points for a valid completed tiling.

## Cover every dot: format, approach and presentation

Store board dimensions and blocked positions. There is **no prescribed start or finish**. The player chooses an open dot as the first position. Five boards must use distinct obstacle arrangements with meaningful branches and bottlenecks; simply rotating one layout does not create five puzzles.

Press an open dot to start. While the pointer remains pressed, the route follows it, snapping to adjacent horizontal or vertical tracks. Sample intervening positions during fast movement so a cursor event cannot jump over dots. Never draw through a block, across a diagonal or over an already used segment. Releasing stops drawing; pressing the endpoint resumes. Moving backwards along the route removes the later portion. Keep click-by-click and arrow-key/Space controls as equivalent alternatives.

Draw the route on the board and show a covered-dot count. Blocks have a distinct shape and accessible label. Save the ordered route after every accepted move and retain Undo/Reset. A route earns three points exactly when it contains every open dot once, no blocked dots, and only adjacent moves. Accept reversed and otherwise different valid routes. Generate a known complete route before deriving obstacles, and independently validate that witness; do not claim uniqueness.

## Sudoku: format, approach and presentation

Use standard 9×9 rows, columns and 3×3 boxes. Store givens separately from one completed solution. Every board must have exactly one solution. Record a human deduction route; the current batch requires naked and hidden singles, rather than judging difficulty by the number of givens alone. More advanced techniques can follow if classroom trials show these boards are too quick.

Use one directly editable grid, a digit palette, a clear action and a pencil-note toggle. Arrow keys move the selected cell; typing enters a value. Given digits are immutable. Pencil notes are saved but are not scored. At high zoom, allow the grid’s own labelled region to scroll without widening the page.

Mark all rows, columns, boxes and givens. Do not award points for entering an individually compatible digit that may lead to an impossible board. Award three points for completion. Reveal shows the completed grid; hints should point to a deduction technique.

## Number constraints: format, approach and presentation

The first five are 5×5 arithmetic-cage grids. Each row and column uses 1–5 once. Connected cages specify a target and addition, multiplication, subtraction or division; singleton cages give a value. Subtraction and division apply only to two-cell cages and use larger-first order.

Present heavy cage boundaries and a target/operator in the cage’s first cell. Use the same numeric entry, pencil notes and Undo controls as Sudoku. Combine arithmetic possibilities with row/column exclusions. Solve and count solutions independently before publication. Check every row, column and cage for the three-point completion score.

## Sequences: format, approach and presentation

Five structures: interleaved quadratics, a recurrence with an offset, alternating operations, a quadratic with a missing term, and an inverse recurrence. State the permitted rule family so that “next term” has a defined interpretation. Variations change coefficients and values, not only wording.

Display the terms in order and request three short numeric results, including a recovered parameter or missing earlier term where useful. Award one point per result. Use independent reference calculations to verify outputs and explanations. These have a provisional seven-minute estimate; do not advertise the estimate as measured student time.

## Classic maths: format, approach and presentation

The initial five adapt the circular-elimination, locker-toggling, bridge-and-torch, two-pan weights and two-object threshold problems. They are fixed problems, with no artificial permutations. Disable “Get new permutation” for them; “New set in this focus” chooses another problem.

Display concise assumptions, a source link and short structured answer fields. Keep the explanation hidden behind Show answer. Validate solutions independently by simulation, state search or a mathematical bound as appropriate. For open answers, accept every valid solution instead of only one sample. This batch deliberately selects bounded answer formats; a general proof or strategy would need a different marking approach.

## Challenge levels and expanded bank (20 September 2026)

Every puzzle has a `challengeLevel` (`foundation`, `standard` or `stretch`) and a matching `challenge:<level>` tag. These are provisional author judgements, not measured completion times or Go ranks.

- **Foundation:** fewer interacting constraints or a more visible route into the problem. Examples include two-category logic grids, four-by-four cages and Sudoku with 40 givens.
- **Standard:** combine several deductions or stages. Examples include three-category logic grids with an explicit starting relationship and five-by-five cages.
- **Stretch:** more interdependent constraints, less scaffolding or deeper planning. Examples include eight-variable equation grids, six-by-six cages, Sudoku with further uniqueness-preserving clue removal, mixed recurrences and counting/optimisation problems.

Tangram levels use compactness as a provisional indication of how much the outline conceals piece placement. Go levels use recorded tree depth, including replies; this is a reading-depth proxy, not a rank assessment. Both need classroom calibration. A level need not exist for every subtype. Only levels with at least three puzzles are selectable.

The puzzle page has a Challenge selector, initially Mixed challenge. Changing it requests a new three-puzzle set within the current subtype. New set and New set in this focus respect the selection; Get new permutation preserves the exact templates. Each puzzle displays its own level. Switching to a subtype without the selected level falls back to Mixed challenge. A shared code always opens its exact questions regardless of the saved filter. Cancelling replacement preserves the previous activity and filter.

The bank has **50 puzzles per subtype**, including the existing 50 Go problems. Counts mean independently addressable puzzles, not 50 different mechanics. The sequence collection explicitly reuses named rule families with different values; grid puzzles have different checked layouts/constraints. Existing variations remain. New fixed grid/geometry boards do not claim artificial permutations; their permutation button is disabled. Sequences and new maths problems have five variations each.

Generation: `python3 scripts/expand-puzzles.py` appends deterministic boards and runs `scripts/refine-puzzles.py` to apply scaffolding and remove tangram silhouettes equivalent under translation, rotation or reflection. `python3 scripts/validate-puzzles.py` checks the served boards independently. Sudoku uniqueness is required at every level; stretch boards need not be solvable solely with singles. Multiple valid paths and tangram arrangements remain accepted.

Challenge labels are selection metadata and do not invalidate existing question codes. Changing puzzle content or marking still uses the normal selective code-compatibility process.
