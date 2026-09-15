import {playTree} from './packed-data.js';
// Read the supplied solution tree. Captures were computed with sgfmill at import.
export function goPosition(part,moves=[]) {
  if(!Array.isArray(moves)||moves.length>100)return null;
  let node=playTree(part);
  for(const move of moves){
    if(!Number.isInteger(move)||move<0||move>=part.size**2)return null;
    node=node.children.find(child=>child.move===move);
    if(!node)return null;
  }
  return node;
}
export function playGo(part,state,move) {
  const moves=Array.isArray(state.moves)?state.moves:[],node=goPosition(part,moves);
  if(!node)return {error:'Reset this position to continue.'};
  if(node.success||node.failure)return {error:'This recorded line has ended. Check your answer, Undo, or Reset.'};
  if(!Number.isInteger(move)||move<0||move>=part.size**2||node.board[move]!=='.')return {error:'Choose an empty intersection.'};
  const next=node.children.find(child=>child.move===move&&child.colour===part.player);
  if(!next)return {state:{...state,moves,pending:move}};
  const path=[...moves,move];
  if(!next.success&&!next.failure&&next.children.length){
    const reply=next.children.find(child=>child.colour!==part.player);
    if(reply)path.push(reply.move);
  }
  return {state:{...state,moves:path,pending:null,hintMove:null}};
}
export function nextGoHint(part,state){
  const node=goPosition(part,state.moves??[]);
  const canWin=n=>Boolean(n.success||n.children.some(canWin));
  return node?.children.find(c=>c.colour===part.player&&canWin(c))?.move??null;
}
export function markGo(part,state) {
  if(state.pending!==undefined&&state.pending!==null)return {earned:0,message:'This move is outside the supplied solution tree. It is unverified, not proven losing. Explore it at the source or try a recorded continuation.'};
  const node=goPosition(part,state.moves);
  if(!Array.isArray(state.moves)||!state.moves.length||!node)return {earned:0,message:'Play a solution on the board.'};
  return node.success?{earned:part.marks,message:'You reached a winning position in the supplied solution tree.'}:
    {earned:0,message:node.failure?'This recorded line does not achieve the objective. Undo and read another continuation.':'Continue the line: the recorded solution has not reached its winning position yet.'};
}
export const goCoordinate=(i,size=19)=>'ABCDEFGHJKLMNOPQRST'[i%size]+(size-Math.floor(i/size));
