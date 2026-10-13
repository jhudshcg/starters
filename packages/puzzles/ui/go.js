/**
 * Purpose: draw Go positions and recorded-solution replay controls.
 * Main contents: board SVG, hit targets, guidance and replay. Used by: boards.
 * Uses: package Go rules and type guidance. Libs: none.
 */
import {puzzleTypes} from '../metadata.js';
const rulesLink=puzzleTypes.find(type=>type.id==='go').links[0];
import {renderGoBoard} from './go-board.js';
import {goPosition,goCoordinate} from '../rules/go-rules.js';

export function renderGo(part,state,locked,{assistance=true,liveFeedback=true,guidanceActionsHTML='',guidanceHTML='',referenceHTML=''}={}){
  const moves=state.moves??[],last=moves.at(-1),node=goPosition(part,moves)??goPosition(part,[]),n=part.size,coordinate=i=>goCoordinate(i,n);
  const previous=moves.length?goPosition(part,moves.slice(0,-1)):null;
  const replies=previous?.children.filter(c=>c.colour!==part.player)??[];
  const all=state.replay??moves;
  const replay=locked?`<div class="go-replay"><label>Replay moves <input data-go-replay type="range" min="0" max="${all.length}" value="${moves.length}" step="1"></label><span>${moves.length} / ${all.length}</span></div>`:'';
  const awaiting=state.replyMove!==undefined&&state.replyMove!==null;
  const turn=moves.length%2?(part.player==='b'?'w':'b'):part.player;
  const status=awaiting?'Recorded reply follows…':node.recorded===false?`No recorded response. You can explore ${turn==='b'?'Black':'White'}’s next move, or Undo.`:state.pending!==undefined&&state.pending!==null?`Proposed ${coordinate(state.pending)}: no recorded response. Choose another move or Undo.`:node.success&&liveFeedback?'Well done! You’ve completed a correct solution.':node.failure?'End of a recorded incorrect line. Undo or Reset to try another move.':`Your turn: ${part.player==='b'?'Black':'White'}.`;
  const moveHint=!locked&&assistance?`<button type="button" class="puzzle-link" data-challenge-action="go-hint" data-value="" aria-expanded="${state.hintMove!=null}">${state.hintMove!=null?'Hide next move':'Show next move'}</button>`:'';
  const hint=state.hintMove!=null&&!locked&&assistance?`<p class="puzzle-help">Consider ${coordinate(state.hintMove)}. The move has not been played.</p>`:'';
  return `<div class="go-guidance"><span class="puzzle-help">Showing ${coordinate(part.view[3]*n+part.view[0])}–${coordinate(part.view[1]*n+part.view[2])} of a ${n}×${n} board.</span><div class="go-hint-actions">${guidanceActionsHTML}${moveHint}</div></div>
    <div class="board-scroll go-scroll" tabindex="0" aria-label="Go board, scroll horizontally if needed">${renderGoBoard({size:n,board:node.board,view:part.view,last:moves.at(-1),pending:state.pending,hintMove:state.hintMove,locked})}</div>
    <div class="puzzle-help go-reference"><span class="go-coordinate">Coordinate: <span data-go-coordinate>—</span></span>${referenceHTML}<a href="${rulesLink.url}" target="_blank" rel="noopener noreferrer">${rulesLink.label}</a></div>
    ${guidanceHTML}${hint}
    <p class="go-status ${node.success&&liveFeedback&&!locked?'go-success':''}" role="status">${locked?'Use the replay slider to inspect each move and capture.':status}</p>
    ${!locked&&replies.length>1?`<label class="go-reply">Explore another opponent reply <select data-go-reply>${replies.map(c=>`<option value="${c.move}" ${c.move===last?'selected':''}>${coordinate(c.move)}</option>`).join('')}</select></label>`:''}
    <p class="go-moves">Moves: ${moves.length?moves.map((m,i)=>`${i+1}. ${coordinate(m)}`).join(' · '):'none yet'}</p>${replay}`;
}
