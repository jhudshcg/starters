import {question as q, number as n, choice as c} from './helpers.js';
import expansion from './puzzle-expansion.js';
import spatialChallenges from './spatial-challenges.js';
export default [
 q(0,'number grids','Complete the totals','Number grid',[],i=>{
   const [a,b,x,y]=[[2,3,5,6],[4,2,3,7],[1,5,8,2],[6,3,4,5],[2,7,6,1]][i];
   return {prompt:'Fill the two empty cells. Every row and column must match its total.',grid:{rows:[[a,null,a+x],[b,null,b+y]],footer:[a+b,x+y,a+b+x+y],headers:['Column 1','Column 2','Row total']},hint:'Subtract the known number from its row total.',parts:[n('Top-right missing cell',x,{marks:2}),n('Bottom-right missing cell',y,{marks:2})]};
 }),
 q(1,'number grids','Find the factors','Number grid',[],i=>{
   const [a,b,x,y]=[[3,4,4,5],[2,5,7,3],[6,3,2,6],[4,2,6,8],[5,7,4,2]][i];
   return {prompt:'Enter positive whole numbers. Multiply the two cells in each row to obtain its target.',grid:{rows:[[a,null,a*x],[b,null,b*y]],headers:['Column 1','Column 2','Product']},hint:'Divide each target by the known number.',parts:[n('Top-right missing cell',x,{marks:2}),n('Bottom-right missing cell',y,{marks:2})]};
 }),
 q(2,'number grids','Follow the difference','Number grid',[],i=>{
   const step=i+2,a=i+3,b=i+7;
   return {prompt:`In each row, the right cell is ${step} greater than the left cell. Complete the grid.`,grid:{rows:[[a,null],[b,null]],headers:['Left','Right']},hint:`Add ${step} to each left cell.`,parts:[n('Top-right missing cell',a+step,{marks:2}),n('Bottom-right missing cell',b+step,{marks:2})]};
 }),
 q(3,'spatial','Rotate the signal','Spatial reasoning',[],i=>{
   const [r,col]=[[1,2],[1,1],[2,3],[3,2],[3,1]][i];
   return {prompt:`Rotate the marked cell at row ${r}, column ${col} by 90° clockwise about the centre of the 3 × 3 board. Select its new position.`,board:{r,c:col},hint:'The top-middle cell moves to the middle-right cell. Use the same turn for your cell.',parts:[c('New position',`${col},${4-r}`,Array.from({length:9},(_,j)=>`${Math.floor(j/3)+1},${j%3+1}`),{kind:'board',marks:3,explanation:'A clockwise quarter-turn maps (row, column) to (column, 4 − row).'}),n('Quarter-turns in one complete turn',4)]};
 }),
 q(4,'spatial','Reflect the marker','Spatial reasoning',[],i=>{
   const [r,col]=[[1,1],[2,3],[3,1],[1,3],[3,3]][i];
   return {prompt:`Reflect the marked cell at row ${r}, column ${col} in the vertical centre line of the board. Select its new position.`,board:{r,c:col},hint:'Swap left and right; keep the same row.',parts:[c('Reflected position',`${r},${4-col}`,Array.from({length:9},(_,j)=>`${Math.floor(j/3)+1},${j%3+1}`),{kind:'board',marks:3,explanation:'Reflection in the vertical centre line keeps the row and swaps columns 1 and 3.'}),n('Which column lies on the mirror line?',2)]};
 }),
 q(5,'spatial','Move the marker','Spatial reasoning',[],i=>{
   const [r,col,dr,dc]=[[1,1,1,1],[1,2,2,1],[3,3,-1,-1],[2,1,1,2],[3,2,-2,-1]][i];
   return {prompt:`Start at row ${r}, column ${col}. Move ${Math.abs(dr)} row(s) ${dr>0?'down':'up'}, then ${Math.abs(dc)} column(s) ${dc>0?'right':'left'}. Select the final cell.`,board:{r,c:col},hint:'Rows increase downwards. Columns increase to the right.',parts:[c('Final position',`${r+dr},${col+dc}`,Array.from({length:9},(_,j)=>`${Math.floor(j/3)+1},${j%3+1}`),{kind:'board',marks:3}),n('Total one-cell moves',Math.abs(dr)+Math.abs(dc))]};
 })
 ,...expansion,...spatialChallenges
].map(question=>[3,4,5].includes(question.slot)?{...question,retired:true}:question);
