import {goPosition,goCoordinate} from './go-rules.js';

export function renderGo(part,state,locked){
  const moves=state.moves??[],node=goPosition(part,moves)??goPosition(part,[]),n=part.size,coordinate=i=>goCoordinate(i,n);
  const [x0,y0,x1,y1]=part.view,w=x1-x0+1,h=y1-y0+1;
  const last=moves.at(-1),pending=state.pending;
  const line=(x1,y1,x2,y2,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#806437" stroke-width=".022" ${extra}/>`;
  let svg=Array.from({length:w},(_,x)=>line(x+.6,.6,x+.6,h-.4)).join('')+Array.from({length:h},(_,y)=>line(.6,y+.6,w-.4,y+.6)).join('');
  // Dashed margins mean a cropped view, not an edge of the real 19×19 board.
  if(x0>0)svg+=line(.1,.1,.1,h+.1,'stroke-dasharray=".12 .1"');
  if(x1<n-1)svg+=line(w+.1,.1,w+.1,h+.1,'stroke-dasharray=".12 .1"');
  if(y0>0)svg+=line(.1,.1,w+.1,.1,'stroke-dasharray=".12 .1"');
  if(y1<n-1)svg+=line(.1,h+.1,w+.1,h+.1,'stroke-dasharray=".12 .1"');
  let buttons='';
  for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){
    const i=y*n+x,cx=x-x0+.6,cy=y-y0+.6,stone=node.board[i],selected=i===pending||i===last;
    if(stone!=='.')svg+=`<circle data-go-stone="${i}" cx="${cx}" cy="${cy}" r=".43" fill="${stone==='B'?'#222':'#fff'}" stroke="#303030" stroke-width=".025"/>`;
    if(selected)svg+=`<circle cx="${cx}" cy="${cy}" r=".23" fill="none" stroke="#efb93b" stroke-width=".09"/>`;
    if(i===state.hintMove&&!locked)svg+=`<circle cx="${cx}" cy="${cy}" r=".36" fill="none" stroke="#926000" stroke-width=".08" stroke-dasharray=".12 .08"/><text x="${cx}" y="${cy+.16}" text-anchor="middle" font-size=".5" fill="#684300">?</text>`;
    buttons+=`<button type="button" class="go-point" data-challenge-action="go" data-value="${i}" ${locked?'disabled':''} aria-label="${coordinate(i)}, ${stone==='.'?'empty':stone==='B'?'black':'white'}${i===pending?', proposed move':i===last?', last move':''}" aria-pressed="${selected}" style="left:${(cx-.48)/(w+.2)*100}%;top:${(cy-.48)/(h+.2)*100}%;width:${.96/(w+.2)*100}%;height:${.96/(h+.2)*100}%"></button>`;
  }
  const previous=moves.length?goPosition(part,moves.slice(0,-1)):null;
  const replies=previous?.children.filter(c=>c.colour!==part.player)??[];
  const all=state.replay??moves;
  const replay=locked?`<div class="go-replay"><label>Replay recorded moves <input data-go-replay type="range" min="0" max="${all.length}" value="${moves.length}" step="1"></label><span>${moves.length} / ${all.length}</span></div>`:'';
  const status=pending!==undefined&&pending!==null?`Proposed ${coordinate(pending)}: no recorded response. Check for details, or choose another move.`:node.success?'Well done! You’ve completed a correct solution.':node.failure?'End of recorded line. Use Check answer to assess your attempt.':`Your turn: ${part.player==='b'?'Black':'White'}.`;
  return `<p><strong>${part.player==='b'?'Black':'White'} to play</strong> · <a href="https://www.britgo.org/intro/intro2.html" target="_blank" rel="noopener noreferrer">Go rules reminder</a></p><div class="board-scroll go-scroll" tabindex="0" aria-label="Go board, scroll horizontally if needed"><div class="go-board" style="width:${w*44}px;aspect-ratio:${w+.2}/${h+.2}" role="group" aria-label="Go intersections"><svg viewBox="0 0 ${w+.2} ${h+.2}" aria-hidden="true">${svg}</svg>${buttons}</div></div><p class="puzzle-help">Showing ${coordinate(y1*n+x0)}–${coordinate(y0*n+x1)} of a ${n}×${n} board. Dashed margins indicate that the board continues. Click an empty intersection to play; arrow keys move focus and Enter or Space plays.</p><p class="go-status ${node.success&&!locked?'go-success':''}" role="status">${locked?'Use the replay slider to inspect each move and capture.':status}</p>${!locked&&replies.length>1?`<label class="go-reply">Explore another opponent reply <select data-go-reply>${replies.map(c=>`<option value="${c.move}" ${c.move===last?'selected':''}>${coordinate(c.move)}</option>`).join('')}</select></label>`:''}<p class="go-moves">Moves: ${moves.length?moves.map((m,i)=>`${i+1}. ${coordinate(m)}`).join(' · '):'none yet'}</p>${replay}${!locked?`<div class="challenge-toolbar"><button type="button" data-challenge-action="go-hint" data-value="">Hint: next move</button>${state.hintMove!==undefined&&state.hintMove!==null?`<span class="puzzle-help">Consider ${coordinate(state.hintMove)}. The move has not been played.</span>`:''}</div>`:''}`;
}
