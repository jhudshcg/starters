// Shared, deterministic puzzle rules. The model answer is an example, not a path whitelist.
export function readList(raw) {
  try { const value=JSON.parse(raw);return Array.isArray(value)&&value.every(Number.isInteger)?value:[]; } catch { return []; }
}
export function orderRule(order,rule) {
  if(rule.kind==='before')return order.indexOf(rule.a)<order.indexOf(rule.b);
  if(rule.kind==='after')return order.indexOf(rule.b)===order.indexOf(rule.a)+1;
  if(rule.kind==='last')return order.at(-1)===rule.a;
  return false;
}
export function switchRule(on,rule) {
  if(rule.kind==='count')return on.length===rule.value;
  if(rule.kind==='same')return on.includes(rule.a)===on.includes(rule.b);
  if(rule.kind==='off')return !on.includes(rule.a);
  return false;
}
export function adjacent(a,b,size){return Math.abs(Math.floor(a/size)-Math.floor(b/size))+Math.abs(a%size-b%size)===1;}
export function turns(path,size){
  let count=0;
  for(let i=2;i<path.length;i++)if(path[i]-path[i-1]!==path[i-1]-path[i-2])count++;
  return count;
}
export function pathError(path,rules) {
  if(path.some(c=>c<0||c>=rules.size**2))return 'The path contains a cell outside the board.';
  if(path[0]!==rules.start||path.at(-1)!==rules.end)return 'Start at S and reach E before checking.';
  if(new Set(path).size!==path.length)return 'Visit each cell at most once.';
  if(path.some(c=>rules.blocked.includes(c)))return 'The path cannot cross a blocked cell.';
  if(path.some((c,i)=>i>0&&!adjacent(path[i-1],c,rules.size)))return 'Move one cell at a time, up, down, left or right.';
  if(path.length-1!==rules.steps)return `Use exactly ${rules.steps} moves. Your path uses ${path.length-1}.`;
  if(rules.checkpoint!==undefined&&!path.includes(rules.checkpoint))return 'Your path must visit the checkpoint ★.';
  if(rules.turns!==undefined&&turns(path,rules.size)!==rules.turns)return `The route needs exactly ${rules.turns} changes of direction.`;
  return '';
}
export function markPuzzle(part,raw) {
  try {const parsed=JSON.parse(raw);if(!Array.isArray(parsed)||!parsed.every(Number.isInteger))throw Error();}
  catch {return {earned:0,message:'This puzzle answer could not be read. Clear it and try again.'};}
  const values=readList(raw), unique=new Set(values).size===values.length;
  const complete=values.length===part.items?.length&&unique&&values.every(v=>v>=0&&v<part.items.length);
  if(part.kind==='order'){
    if(!complete)return {earned:0,message:'Place each job once before checking the order.'};
    const passed=part.rules.filter(r=>orderRule(values,r)).length;
    return {earned:passed,message:passed===part.marks?'All three clues are satisfied.':`${passed} of 3 clues are satisfied. Check the order against each clue.`};
  }
  if(part.kind==='matching'){
    const expected=readList(part.answer);
    if(values.length!==part.items.length)return {earned:0,message:'Choose one device for each person.'};
    if(!complete)return {earned:0,message:'Give each person a different device.'};
    const earned=values.filter((v,i)=>v===expected[i]).length;
    return {earned,message:earned===part.marks?'Every assignment fits the clues.':`${earned} assignments fit the solution. Check the clues again.`};
  }
  if(part.kind==='switches'){
    if(!unique||values.some(v=>v<0||v>=part.items.length))return {earned:0,message:'Select valid switches.'};
    const earned=part.rules.filter(r=>switchRule(values,r)).length;
    return {earned,message:earned===part.marks?'All three rules are satisfied.':`${earned} of 3 rules are satisfied. Compare each rule with your switch settings.`};
  }
  if(part.kind==='shape'){
    const expected=readList(part.answer);
    const correct=unique&&values.length===expected.length&&values.every(v=>expected.includes(v));
    return {earned:correct?part.marks:0,message:correct?'The shape is correct.':'Check every selected cell against the transformation. Click a selected cell to clear it.'};
  }
  if(part.kind==='path'){
    const error=pathError(values,part.rules);
    return {earned:error?0:part.marks,message:error||'Your route meets all the rules.'};
  }
  return null;
}
export const interactiveKinds=['order','matching','switches','shape','path'];

export function transformCell(cell,size,variation){
  let r=Math.floor(cell/size),c=cell%size;
  if(variation===4)return r*size+(size-1-c);
  for(let i=0;i<variation;i++)[r,c]=[c,size-1-r];
  return r*size+c;
}
