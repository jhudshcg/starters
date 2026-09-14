import logic from './puzzles/logic-grids.js';
import equations from './puzzles/logic-equations.js';
import tangrams from './puzzles/tangrams.js';
import paths from './puzzles/cover-paths.js';
import sudoku from './puzzles/sudoku.js';
import numbers from './puzzles/number-constraints.js';
import sequences from './puzzles/sequences.js';
import classics from './puzzles/classic-maths.js';
export default [...logic,...equations,...tangrams,...paths,...sudoku,...numbers,...sequences,...classics];
