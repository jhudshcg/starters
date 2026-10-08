/**
 * Purpose: supply app-independent challenge bands and puzzle-type guidance.
 * Main contents: default labels, Go band mapping, family instructions and links.
 * Used by: catalogue and consuming apps. Uses: none. Libs: none.
 */
export const schemaVersion = 1;
export const challengeBands = [
  {level: 1, key: 'beginner', defaultLabel: 'Beginner', description: 'Introductory tasks with more supporting clues.'},
  {level: 2, key: 'foundation', defaultLabel: 'Foundation', description: 'Tasks requiring some linked reasoning.'},
  {level: 3, key: 'standard', defaultLabel: 'Standard', description: 'Tasks requiring sustained reasoning across several constraints.'},
  {level: 4, key: 'stretch', defaultLabel: 'Stretch', description: 'Tasks requiring more demanding reasoning or techniques.'}
];

/** Map an individual source kyu rating to a broad band without changing its rank. */
export function bandForGoRank(kyu) {
  if (!Number.isFinite(kyu)) throw Error('A finite source kyu rating is required.');
  return kyu >= 25 ? 1 : kyu >= 18 ? 2 : kyu >= 12 ? 3 : 4;
}

export const puzzleTypes = [
  {id: 'logic grids', name: 'Logic grids',
    instructions: 'Match each person to one value in each category using all the clues. Each value is used once. Crosses are working notes; selected values form your answer.',
    guidance: 'Combine clues across categories. Check one-to-one assignments as well as individual clues.', links: []},
  {id: 'logic equations', name: 'Logic equations',
    instructions: 'Assign a different value from the stated domain to each variable. Every equation and inequality must hold.',
    guidance: 'Use products, bounds and differences to reduce the possible values.', links: []},
  {id: 'tangrams', name: 'Tangrams',
    instructions: 'Use all seven pieces to fill the silhouette without overlaps or gaps. Move and rotate pieces; the parallelogram can also be flipped.',
    guidance: 'Every valid tiling is accepted. The revealed arrangement is one possible solution.', links: []},
  {id: 'cover paths', name: 'Cover every dot',
    instructions: 'Start at any open dot. Visit every open dot exactly once using horizontal or vertical steps. Do not pass through blocked positions.',
    guidance: 'There is no prescribed finish. All complete valid routes are accepted.', links: []},
  {id: 'sudoku', name: 'Sudoku',
    instructions: 'Fill each row, column and box with every permitted digit exactly once. Given digits cannot be changed.',
    guidance: 'Check the board size and box dimensions. Pencil notes are working notes, not final answers.', links: []},
  {id: 'number constraints', name: 'Number constraints',
    instructions: 'Use each permitted digit once in every row and column. Each cage must meet its target using the shown operation.',
    guidance: 'Combine cage arithmetic with row and column exclusions. For subtraction and division, use the larger value first.', links: []},
  {id: 'sequences', name: 'Sequences',
    instructions: 'Use the stated rule or constraints to find the requested terms, positions or totals.',
    guidance: 'Read which quantity is requested. A finite sequence alone does not determine a unique continuation.', links: []},
  {id: 'classic maths', name: 'Classic maths',
    instructions: 'Solve the problem using its stated assumptions and enter your answer in the requested form.',
    guidance: 'Check units, permitted operations and final-form requirements. Equivalent unfinished algebra can receive partial credit.',
    links: [{label: 'Mr Barton Maths puzzles', url: 'https://mrbartonmaths.com/puzzles/'}]},
  {id: 'go', name: 'Go · life and death',
    instructions: 'Play the indicated colour to achieve the stated objective. The opponent replies using the supplied solution tree.',
    guidance: 'Unlisted moves are unverified, not proven losing. Individual source ranks remain separate from broad challenge bands. Read any ko or seki conditions.',
    links: [{label: 'Go rules reminder', url: 'https://www.britgo.org/intro/intro2.html'},
      {label: 'GoProblems', url: 'https://goproblems.com/'},
      {label: 'Online Go puzzles', url: 'https://online-go.com/puzzle/2625'}]}
];
