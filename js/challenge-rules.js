export const challengeKinds=['logic-grid','equation-grid','sudoku','cover-path','tiling','cage-grid'];
export function stateOf(raw,part) {
  let state;try {state=JSON.parse(raw);} catch {state={};}
  if(Array.isArray(state)) return part.kind==='tiling'?{placements:state}:part.kind==='cover-path'?{path:state}:{values:state};
  return state&&typeof state==='object'?state:{};
}
export function near(a,b,size){return Number.isInteger(a)&&Number.isInteger(b)&&Math.abs(Math.floor(a/size)-Math.floor(b/size))+Math.abs(a%size-b%size)===1;}
export function logicRule(rule,values) {
 const [op,c,r,a,b]=rule,x=values[c]?.[r];
 if(op==='eq')return x===a;
 if(op==='ne')return x!==a;
 if(op==='diff')return x-values[c]?.[a]===b;
 if(op==='before')return x<values[c]?.[a];
 if(op==='link')return (x===a)===(values[b[0]]?.[r]===b[1]);
 if(op==='either')return Number(x===a)+Number(values[b[0]]?.[r]===b[1])===1;
 return false;
}
export function equationRule([op,i,j,t],values){const x=values[i],y=values[j];return op==='sum'?x+y===t:op==='product'?x*y===t:op==='difference'?x-y===t:op==='less'?x<y:false;}
export function cageRule(c,values){const a=c.cells.map(i=>values[i]);return c.op==='+'?a.reduce((s,n)=>s+n,0)===c.target:c.op==='×'?a.reduce((s,n)=>s*n,1)===c.target:c.op==='−'?Math.abs(a[0]-a[1])===c.target:c.op==='÷'?Math.max(...a)===Math.min(...a)*c.target:a[0]===c.target;}
export function polygonArea(poly){return Math.abs(poly.reduce((s,p,i)=>{const q=poly[(i+1)%poly.length];return s+p[0]*q[1]-q[0]*p[1];},0))/2;}
export function placedPolygon(shape,place){
 const angle=place.rotation*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle);
 return shape.map(([x,y])=>{if(place.flipped)x=-x;return [place.x+x*c-y*s,place.y+x*s+y*c];});
}
// Convex polygon clipping. Target is a non-overlapping union of convex polygons.
export function intersectionArea(subject,clip){
 let output=subject.map(p=>p.slice());
 const signed=clip.reduce((sum,p,i)=>{const q=clip[(i+1)%clip.length];return sum+p[0]*q[1]-q[0]*p[1];},0),orientation=signed>=0?1:-1;
 const cross=(a,b,p)=>orientation*((b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]));
 for(let i=0;i<clip.length&&output.length;i++){
  const a=clip[i],b=clip[(i+1)%clip.length],input=output;output=[];
  for(let j=0;j<input.length;j++){
   const start=input[j],end=input[(j+1)%input.length],ds=cross(a,b,start),de=cross(a,b,end),si=ds>=-1e-8,ei=de>=-1e-8;
   if(si!==ei){const t=ds/(ds-de);output.push([start[0]+t*(end[0]-start[0]),start[1]+t*(end[1]-start[1])]);}
   if(ei)output.push(end);
  }
 }
 return output.length>=3?polygonArea(output):0;
}
export function markChallenge(part,raw){
 const state=stateOf(raw,part),fail=message=>({earned:0,message}),win=()=>({earned:part.marks,message:'Complete. All puzzle rules are satisfied.'});
 if(['logic-grid','equation-grid'].includes(part.kind)){
  const v=state.values,n=part.names.length;
  if(!Array.isArray(v)||v.length!==part.categories.length||v.some(row=>!Array.isArray(row)||row.length!==n||row.some(x=>!Number.isInteger(x)||x<0||x>=n)))return fail('Select one value for each row in every category.');
  if(v.some(row=>new Set(row).size!==n))return fail('Each value must be used exactly once in its category.');
  const valid=part.rules.every(rule=>part.kind==='logic-grid'?logicRule(rule,v):equationRule(rule,v[0].map(x=>x+1)));
  return valid?win():fail('The assignment conflicts with at least one clue. Recheck how the clues combine.');
 }
 if(['sudoku','cage-grid'].includes(part.kind)){
  const a=state.values,n=part.size;
  if(!Array.isArray(a)||a.length!==n*n||a.some(x=>!Number.isInteger(x)||x<1||x>n))return fail(`Fill every cell with a digit from 1 to ${n}.`);
  if(part.givens.some((x,i)=>x&&a[i]!==x))return fail('The given values must stay unchanged.');
  for(let r=0;r<n;r++)if(new Set(a.slice(r*n,r*n+n)).size!==n||new Set(a.filter((_,i)=>i%n===r)).size!==n)return fail('Every row and column must contain each digit exactly once.');
  if(part.kind==='sudoku')for(let r=0;r<9;r+=3)for(let c=0;c<9;c+=3)if(new Set(Array.from({length:9},(_,i)=>a[(r+Math.floor(i/3))*9+c+i%3])).size!==9)return fail('Recheck the 3×3 boxes.');
  if(part.cages&&!part.cages.every(c=>cageRule(c,a)))return fail('The grid does not yet meet every cage target.');
  return win();
 }
 if(part.kind==='cover-path'){
  const path=state.path,n=part.size,blocked=new Set(part.blocked);
  if(!Array.isArray(path)||path.some(c=>!Number.isInteger(c)||c<0||c>=n*n||blocked.has(c)))return fail('Use only unblocked dots.');
  if(new Set(path).size!==path.length)return fail('Visit each dot only once.');
  if(path.some((c,i)=>i>0&&!near(path[i-1],c,n)))return fail('Every move must join neighbouring dots horizontally or vertically.');
  if(path.length!==n*n-blocked.size)return fail(`${path.length} of ${n*n-blocked.size} dots covered. Continue without isolating unvisited dots.`);
  return win();
 }
 if(part.kind==='tiling'){
  const placements=state.placements;
  if(!Array.isArray(placements)||placements.length!==part.pieces.length||placements.some(p=>!p||![p.x,p.y,p.rotation].every(Number.isFinite)||Math.abs(p.x)>100||Math.abs(p.y)>100||p.rotation%45!==0||typeof p.flipped!=='boolean'))return fail('Place all seven pieces on the board.');
  const polygons=placements.map((p,i)=>placedPolygon(part.pieces[i],p));
  for(let i=0;i<polygons.length;i++){
   const area=polygonArea(polygons[i]),inside=part.target.reduce((sum,target)=>sum+intersectionArea(polygons[i],target),0);
   if(Math.abs(area-inside)>1e-6)return fail('A piece extends outside the silhouette.');
   for(let j=0;j<i;j++)if(intersectionArea(polygons[i],polygons[j])>1e-6)return fail('Two pieces overlap. Try another position or orientation.');
  }
  const filled=polygons.reduce((s,p)=>s+polygonArea(p),0),target=part.target.reduce((s,p)=>s+polygonArea(p),0);
  return Math.abs(filled-target)<1e-6?win():fail('The pieces must cover the entire silhouette.');
 }
 return fail('Unknown puzzle type.');
}
