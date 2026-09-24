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
import mathsPractice from './puzzles/maths-practice.js';
import sequencesEnriched from './puzzles/sequences-enriched.js';
export default [...logic,...equations,...tangrams,...paths,...sudoku,...numbers,...sequences,...classics,...go,...sequenceMore,...mathsMore,...mathsPractice,...sequencesEnriched].map(question=>{
 // GoProblems ranks are retained with source attribution. The original OGS
 // exercise has puzzle_rank 5 (=25 kyu), cached in references/go/ogs-2625.json.
 const rank=question.focus==='go'?(question.sourceRank??(question.slot===175?25:Number(question.source?.note.match(/(\d+) kyu/)?.[1]))):null;
 if(question.focus==='go'&&!Number.isFinite(rank))throw Error(`Missing Go source rank for slot ${question.slot}`);
 const level=question.focus==='go'?(rank>=25?'beginner':rank>=18?'foundation':rank>=12?'standard':'stretch'):(question.challengeLevel??'standard');
 return {...question,...(rank!==null?{sourceRank:rank}:{}),setSize:3,challengeLevel:level,tags:[...new Set([...question.tags.filter(tag=>!tag.startsWith('challenge:')),`challenge:${level}`])]};
});
