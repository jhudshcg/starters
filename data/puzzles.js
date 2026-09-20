import logic from './puzzles/logic-grids.js';
import equations from './puzzles/logic-equations.js';
import tangrams from './puzzles/tangrams.js';
import paths from './puzzles/cover-paths.js';
import sudoku from './puzzles/sudoku.js';
import numbers from './puzzles/number-constraints.js';
import sequences from './puzzles/sequences.js';
import classics from './puzzles/classic-maths.js';
import go from './puzzles/go.js';
import sequenceMore from './puzzles/sequences-more.js';
import mathsMore from './puzzles/maths-more.js';
export default [...logic,...equations,...tangrams,...paths,...sudoku,...numbers,...sequences,...classics,...go,...sequenceMore,...mathsMore].map(question=>{
 const depth=node=>node.children?.length?1+Math.max(...node.children.map(depth)):0;
 const level=question.challengeLevel??(question.focus==='go'?(depth(question.variations[0].parts[0].tree)>=6?'stretch':depth(question.variations[0].parts[0].tree)>=3?'standard':'foundation'):'standard');
 return {...question,setSize:3,challengeLevel:level,tags:[...new Set([...question.tags,`challenge:${level}`])]};
});
