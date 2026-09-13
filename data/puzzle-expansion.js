import {question as q,part} from './helpers.js';
import {transformCell} from '../js/puzzle-rules.js';
const task=(prompt,answer,extra)=>part(prompt,JSON.stringify(answer),{marks:3,...extra});
const coords=(cells,size)=>cells.map(c=>`(${Math.floor(c/size)+1}, ${c%size+1})`).join(', ');
const jobSets=[['Build','Publish','Test','Archive'],['Scan','Send','Review','Store'],['Design','Launch','Prototype','Evaluate'],['Collect','Report','Validate','Back up'],['Import','Export','Clean','Log']];
const names=[['Asha','Ben','Chen'],['Dev','Ella','Finn'],['Gabi','Hana','Idris'],['Jas','Kai','Lena'],['Mo','Nia','Owen']];
const devices=['Laptop','Tablet','Desktop'];
export default [
 q(6,'logic','Schedule the jobs','Order from clues',[],i=>{
   const items=jobSets[i],order=[0,2,1,3];
   const clues=[`${items[0]} happens before ${items[1]}.`,`${items[2]} happens immediately after ${items[0]}.`,`${items[3]} is last.`];
   return {prompt:'Arrange four jobs using all three clues. Click jobs in order; click a placed job to remove it.',clues,hint:'Place the final job first in your reasoning. Then find the two jobs that must stay together.',parts:[task('Your job order',order,{kind:'order',items,rules:[{kind:'before',a:0,b:1},{kind:'after',a:0,b:2},{kind:'last',a:3}],solutionText:order.map(j=>items[j]).join(' → '),explanation:'The linked pair comes first, the remaining job follows, and the last job stays at the end.'})]};
 }),
 q(7,'logic','Who has which device?','Match from clues',[],i=>{
   const people=names[i],answer=[[0,1,2],[1,2,0],[2,0,1],[0,2,1],[2,1,0]][i];
   const clues=[`${people[0]} uses the ${devices[answer[0]].toLowerCase()}.`,`${people[1]} does not use the ${devices[answer[2]].toLowerCase()}.`,'Each person uses a different device.'];
   return {prompt:'Three colleagues have one device each. Select a device for every person using the clues.',clues,hint:'Assign the known device, then eliminate it from the other two people.',parts:[task('Assign each device once',answer,{kind:'matching',items:people,choices:devices,solutionText:people.map((person,j)=>`${person}: ${devices[answer[j]]}`).join('; '),explanation:'Use the known assignment, the exclusion and the rule that devices cannot be shared.'})]};
 }),
 q(8,'logic','Set the switches','Deduce a configuration',[],i=>{
   const pair=[[0,2],[1,3],[0,3],[1,2],[0,1]][i],off=[0,1,2,3].find(n=>!pair.includes(n)),items=['A','B','C','D'];
   return {prompt:'Turn switches on or off until all three rules hold. Each switch starts off.',clues:['Exactly two switches are on.',`Switches ${items[pair[0]]} and ${items[pair[1]]} have the same setting.`,`Switch ${items[off]} is off.`],hint:'If the matching pair were both off, could you still turn on two switches?',parts:[task('Switch settings',pair,{kind:'switches',items,rules:[{kind:'count',value:2},{kind:'same',a:pair[0],b:pair[1]},{kind:'off',a:off}],solutionText:`On: ${pair.map(j=>items[j]).join(' and ')}. All other switches off.`,explanation:'The matching pair must both be on to reach two on switches while keeping the specified switch off.'})]};
 }),
 q(9,'shapes','Mirror the shape','Paint a reflection',[],i=>{
   const patterns=[[0,5,6,10],[1,2,6,11],[5,10,11,12],[0,1,6,7],[2,5,6,7]],source=patterns[i],answer=source.map(c=>transformCell(c,5,4));
   return {prompt:'Reflect the shape in the vertical centre line. Click cells on the answer board to draw the reflected shape.',hint:'Keep each cell in the same row. Swap column 1 with 5, and column 2 with 4.',parts:[task('Draw the reflection',answer,{kind:'shape',size:5,references:[{label:'Original shape',cells:source}],solutionText:coords(answer,5),explanation:'Coordinates are (row, column). A vertical reflection keeps rows and reverses columns.'})]};
 }),
 q(10,'shapes','Turn the shape','Paint a rotation',[],i=>{
   const patterns=[[0,5,10,11],[1,2,6,11],[6,7,11,16],[0,1,2,7],[5,10,11,12]],source=patterns[i],answer=source.map(c=>transformCell(c,5,1));
   return {prompt:'Rotate the whole shape 90° clockwise about the centre of the board. Click cells to draw the result.',hint:'Rotate each filled cell. A cell at row 1, column 2 moves to row 2, column 5.',parts:[task('Draw the rotated shape',answer,{kind:'shape',size:5,references:[{label:'Original shape',cells:source}],solutionText:coords(answer,5),explanation:'Coordinates are (row, column). A clockwise quarter-turn maps (row, column) to (column, 6 − row).'})]};
 }),
 q(11,'shapes','Combine the masks','Compare two shapes',['CA2.4.3'],i=>{
   const a=[0,1,5,6].map(c=>transformCell(c,5,i)),b=[1,2,6,7].map(c=>transformCell(c,5,i));
   const answer=[...a.filter(c=>!b.includes(c)),...b.filter(c=>!a.includes(c))];
   return {prompt:'Two image masks overlap. Select cells filled in exactly one mask. Leave cells filled in both masks empty.',hint:'Compare the same coordinate on both masks. Keep it only when one mask is filled and the other is empty.',parts:[task('Draw the combined mask',answer,{kind:'shape',size:5,references:[{label:'Mask A',cells:a},{label:'Mask B',cells:b}],solutionText:coords(answer,5),explanation:'Coordinates are (row, column). Shared cells are removed; cells belonging to only one mask remain.'})]};
 }),
 ...[
   {slot:12,title:'Route the packet',blocked:[5,9],example:[0,1,2,3,7,11,15]},
   {slot:13,title:'Visit the checkpoint',blocked:[5,6],checkpoint:8,example:[0,4,8,9,10,11,15]},
   {slot:14,title:'Limit the turns',blocked:[5,9],turns:2,example:[0,1,2,6,10,14,15]}
 ].map(spec=>q(spec.slot,'paths',spec.title,'Build a route',['CA1.2.1'],i=>{
   const transform=c=>transformCell(c,4,i),answer=spec.example.map(transform);
   const rules={size:4,start:transform(0),end:transform(15),blocked:spec.blocked.map(transform),steps:6,...(spec.checkpoint!==undefined?{checkpoint:transform(spec.checkpoint)}:{}),...(spec.turns!==undefined?{turns:spec.turns}:{})};
   return {prompt:`Build a route from S to E in exactly 6 moves. Move up, down, left or right; avoid blocked cells and do not revisit a cell.${rules.checkpoint!==undefined?' Visit the checkpoint ★ along the way.':''}${rules.turns!==undefined?' Change direction exactly twice.':''}`,hint:rules.checkpoint!==undefined?'Plan a route to the checkpoint, then from the checkpoint to E.':rules.turns!==undefined?'Think of three straight sections joined by two turns.':'Count the horizontal and vertical moves you need before choosing a route.',parts:[task('Click cells to build your path',answer,{kind:'path',rules,solutionText:coords(answer,4),explanation:'Coordinates are (row, column), starting at S. This is one valid route; other routes meeting all the rules also earn full points.'})]};
 }))
];
