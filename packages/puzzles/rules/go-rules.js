/**
 * Purpose: reusable go rules implementation.
 * Main contents: the existing puzzle checking and reasoning helpers.
 * Used by: consuming app adapters and puzzle tests.
 * Uses: sibling rule modules where imported. Libs: none.
 */
export const GO_REPLY_DELAY_MS=200;

/** Apply one legal move, including captures, suicide rejection and simple ko. */
export function applyGoMove(board,size,colour,move,koBoard=null){
  if(!Number.isInteger(move)||move<0||move>=size**2||board[move]!=='.')return {error:'Choose an empty intersection.'};
  const cells=[...board],stone=colour.toUpperCase(),opponent=stone==='B'?'W':'B';
  const neighbours=i=>[i-size,i+size,i-1,i+1].filter(j=>j>=0&&j<size**2&&Math.abs(i%size-j%size)+Math.abs(Math.floor(i/size)-Math.floor(j/size))===1);
  const group=start=>{
    const stones=new Set([start]),liberties=new Set(),todo=[start];
    while(todo.length)for(const next of neighbours(todo.pop())){
      if(cells[next]==='.')liberties.add(next);
      else if(cells[next]===cells[start]&&!stones.has(next)){stones.add(next);todo.push(next);}
    }
    return {stones,liberties};
  };
  cells[move]=stone;
  for(const next of neighbours(move))if(cells[next]===opponent){
    const adjacent=group(next);
    if(!adjacent.liberties.size)for(const captured of adjacent.stones)cells[captured]='.';
  }
  if(!group(move).liberties.size)return {error:'That move has no liberties and captures nothing. Choose another intersection.'};
  const result=cells.join('');
  if(result===koBoard)return {error:'An immediate ko recapture is not allowed. Play elsewhere first.'};
  return {board:result};
}

/** Replay recorded branches, or legally explore beyond the supplied tree. */
export function goPosition(part,moves=[]) {
  if(!Array.isArray(moves)||moves.length>100)return null;
  let node=part.tree,previousBoard=null,colour=part.player;
  for(const move of moves){
    if(!Number.isInteger(move)||move<0||move>=part.size**2)return null;
    const next=node.children.find(child=>child.move===move&&child.colour===colour);
    if(next){previousBoard=node.board;node=next;}
    else {
      const result=applyGoMove(node.board,part.size,colour,move,previousBoard);
      if(result.error)return null;
      previousBoard=node.board;
      node={board:result.board,children:[],move,colour,recorded:false};
    }
    colour=colour==='b'?'w':'b';
  }
  return node;
}

/** Play a move; controls may defer the recorded reply to show captures clearly. */
export function playGo(part,state,move,{deferReply=false}={}) {
  const moves=Array.isArray(state.moves)?state.moves:[],node=goPosition(part,moves);
  if(!node)return {error:'Reset this position to continue.'};
  if(state.replyMove!==undefined&&state.replyMove!==null)return {error:'Wait for the recorded reply, or Undo.'};
  if(moves.length>=100)return {error:'This exploration has reached 100 moves. Undo or Reset to continue.'};
  const colour=moves.length%2?(part.player==='b'?'w':'b'):part.player;
  const legal=applyGoMove(node.board,part.size,colour,move,moves.length?goPosition(part,moves.slice(0,-1))?.board:null);
  if(legal.error)return legal;
  const next=node.children.find(child=>child.move===move&&child.colour===colour);
  const path=[...moves,move],nextState={...state,moves:path,pending:null,hintMove:null};
  if(next&&!next.success&&!next.failure){
    const reply=next.children.find(child=>child.colour!==part.player);
    if(reply){
      if(deferReply)return {state:{...nextState,replyMove:reply.move,replyDue:Date.now()+GO_REPLY_DELAY_MS}};
      path.push(reply.move);
    }
  }
  return {state:nextState};
}

/** Finish a deferred reply only if it still belongs to this recorded position. */
export function completeGoReply(part,state){
  const node=goPosition(part,state.moves),reply=node?.children.find(child=>child.move===state.replyMove&&child.colour!==part.player);
  const {replyMove,replyDue,...rest}=state;
  return reply?{...rest,moves:[...state.moves,reply.move]}:rest;
}
export function nextGoHint(part,state){
  if(state.replyMove!==undefined&&state.replyMove!==null)return null;
  const node=goPosition(part,state.moves??[]);
  const canWin=n=>Boolean(n.success||n.children.some(canWin));
  return node?.children.find(c=>c.colour===part.player&&canWin(c))?.move??null;
}
export function markGo(part,state) {
  if(state.pending!==undefined&&state.pending!==null)return {earned:0,message:'This move is outside the supplied solution tree. It is unverified, not proven losing. Explore it at the source or try a recorded continuation.'};
  const node=goPosition(part,state.moves);
  if(node?.recorded===false)return {earned:0,message:'No recorded response. This continuation is unverified, not proven losing. Undo to return to the recorded line.'};
  if(!Array.isArray(state.moves)||!state.moves.length||!node)return {earned:0,message:'Play a solution on the board.'};
  return node.success?{earned:part.marks,message:'You reached a winning position in the supplied solution tree.'}:
    {earned:0,message:node.failure?'This recorded line does not achieve the objective. Undo and read another continuation.':'Continue the line: the recorded solution has not reached its winning position yet.'};
}
export const goCoordinate=(i,size=19)=>'ABCDEFGHJKLMNOPQRST'[i%size]+(size-Math.floor(i/size));
