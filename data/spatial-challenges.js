import {question as q,number as n,choice as c} from './helpers.js';
import {transformCell} from '../js/puzzle-rules.js';
const position=(prompt,row,col,size=5)=>c(prompt,`${row},${col}`,Array.from({length:size**2},(_,i)=>`${Math.floor(i/size)+1},${i%size+1}`),{kind:'board',size,marks:3,explanation:'Work through every instruction in order. Keep track of row and column after each step.'});
export default [
 q(15,'spatial','Follow the transformation pipeline','Combine transformations',[],i=>{
   const [r,col]=[[2,2],[3,1],[4,3],[2,4],[4,2]][i],endR=6-col,endC=7-r;
   return {prompt:`A marker starts at row ${r}, column ${col} on this 5 × 5 board. Rotate its position 90° clockwise about the centre, reflect the result in the horizontal centre line, then move one cell right. Click the final position.`,board:{r,c:col,size:5,label:'Starting marker'},hint:'Record an intermediate coordinate after each operation. The horizontal reflection swaps top and bottom, not left and right.',parts:[position('Click the final position',endR,endC),n('Fewest one-cell moves between the start and final cells (no diagonals)',Math.abs(endR-r)+Math.abs(endC-col),{explanation:'Add the horizontal distance to the vertical distance.'})]};
 }),
 q(16,'spatial','Work backwards','Reverse transformations',[],i=>{
   const [r,col]=[[2,1],[4,2],[1,3],[3,4],[5,2]][i],finalR=5-col,finalC=6-r;
   return {prompt:`A marker finishes at row ${finalR}, column ${finalC}. To get there, it was reflected in the vertical centre line, rotated 90° clockwise about the centre, then moved one cell up. Click where it started.`,board:{r:finalR,c:finalC,size:5,label:'Given final marker'},hint:'Undo the last operation first. Reverse the upward move, then reverse the rotation, then reverse the reflection.',parts:[position('Click the original position',r,col),c('What is the first move when working backwards?','Move one cell down',['Move one cell down','Move one cell up','Reflect left to right','Rotate clockwise'],{explanation:'Reverse the last operation first: undo up by moving down.'})]};
 }),
 q(17,'spatial','Trace the robot route','Track direction and obstacles',[],i=>{
   const source=transformCell(0,5,i),target=transformCell(9,5,i),blocked=[13].map(c=>transformCell(c,5,i));
   const heading=['right','down','left','up','left'][i],turn1=i===4?'left':'right',turn2=i===4?'right':'left';
   return {prompt:`The robot starts at S, facing ${heading}. Follow: forward 3 → turn ${turn1} → forward 3 → turn ${turn2} → forward 2. A blocked cell or board edge ends that forward command early; then continue with the next command. Click its final cell.`,board:{r:Math.floor(source/5)+1,c:source%5+1,size:5,label:'Robot start',blocked,marker:'S'},hint:'A turn changes direction without moving. When a forward command is blocked, stop that command only and continue with the next instruction.',parts:[position('Click where the robot finishes',Math.floor(target/5)+1,target%5+1),n('Total successful one-cell forward moves',5,{explanation:'Count only moves actually completed; blocked attempts and turns do not move the robot.'})]};
 })
];
