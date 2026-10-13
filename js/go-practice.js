/**
 * Purpose: Host the untracked two-player Go practice board within the T-Level app.
 * Main contents: controls, clock display, engine estimates and disposal.
 * Used by: app route #go. Uses: portable puzzle Go rules/renderers. Libs: none.
 */
import {renderGoBoard} from '../packages/puzzles/ui/go-board.js';
import {bindGoPress} from '../packages/puzzles/ui/go-press.js';
import {newGoGame,goBoardSizes,currentGoPosition,playHumanGo,undoHumanGo,redoHumanGo,countHumanGo,setHumanGoClock,resumeHumanGo,toggleDeadGroup,scoreGoArea} from '../packages/puzzles/rules/go-game.js';
import {newGoClock,advanceGoClock,startGoClock,pauseGoClock} from '../packages/puzzles/rules/go-clock.js';
import {createGnuGoEstimator} from '../packages/puzzles/ui/gnugo-client.js';

const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const options=(values,current,suffix='')=>values.map(value=>`<option value="${value}" ${value===current?'selected':''}>${value}${suffix}</option>`).join('');
// Transient route state is separate from learner history and JSON backups.
let savedGame=newGoGame(),savedKomi=6.5;
export function mountGoPractice(main,back='#home'){
 let game=savedGame,komi=savedKomi,message='',estimate=true,result=null,engineError='',request=null,binding=null,disposed=false;
 let timingOpen=false,settings={minutes:5,seconds:30,periods:3};
 const estimator=createGnuGoEstimator(new URL('engines/gnugo/worker.js',document.baseURI));
 const counting=()=>game.counting||currentGoPosition(game).passes>=2;
 main.innerHTML=`<a class="back" href="${esc(back)}">← Back to activities</a><div class="page-top"><h1>Go practice board</h1><a href="https://www.britgo.org/intro/intro2.html" target="_blank" rel="noopener">Go rules reminder ↗</a></div><section class="human-go" aria-label="Two-player Go"><div id="go-setup" class="go-setup"><label>Board size <select id="go-size">${options(goBoardSizes,game.size)}</select></label><button id="go-reset">Reset board</button><label>White’s komi <select id="go-komi">${options([0,5.5,6.5,7.5],komi)}</select></label></div><div id="go-timing"></div><div id="go-practice-board" class="puzzle-controls human-go-controls"></div><p id="go-message" role="status"></p><div id="go-actions" class="actions go-play-controls"></div><div id="go-count"></div><details><summary>Counting and rules</summary><p>Count at any point, or pass twice. Agree which groups are dead and tap them to mark or restore them. Area counting adds living stones and surrounded empty points, plus White’s komi; captures are not added again. Fill open borders before treating the count as final. Suicide and repeating earlier board positions are forbidden. Undo and Redo pause clocks. Practice games are not recorded as scored progress.</p><p><a href="THIRD_PARTY_NOTICES.md" target="_blank">GNU Go source, build instructions and licences</a></p></details></section>`;
 const $=selector=>main.querySelector(selector),board=$('#go-practice-board');
 function clockText(ms){const seconds=Math.ceil(ms/1000);return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;}
 function clockDisplay(){
  const clock=game.clock;
  for(const colour of ['b','w']){
   const node=$(`[data-clock="${colour}"]`);if(!node||!clock)continue;
   const player=clock.players[colour];node.querySelector('output').textContent=clockText(player.mainMs||(player.periods?player.periodMs:0));
   node.querySelector('small').textContent=player.mainMs?'Main time':`${player.periods} byo-yomi periods left`;
   node.classList.toggle('active',clock.active===colour);
  }
 }
 function timing(){
  const clock=game.clock;
  $('#go-timing').innerHTML=`<details id="go-timing-options" ${timingOpen?'open':''}><summary>Timing options</summary><fieldset ${clock?'disabled':''}><div class="go-setup"><label>Main time <select data-setting="minutes">${options([0,1,5,10,15,20,30,45,60],settings.minutes,' min')}</select></label><label>Byo-yomi <select data-setting="seconds">${options([10,15,20,30,45,60],settings.seconds,' sec')}</select></label><label>Periods <select data-setting="periods">${options([0,1,3,5,10],settings.periods)}</select></label></div></fieldset>${!clock?`<button id="go-clock-start" ${counting()||(!settings.minutes&&!settings.periods)?'disabled':''}>Start clocks</button>`:''}${!clock?.running?'<p>Settings apply to each player. After main time, a legal move resets the surviving byo-yomi period. Taking longer uses up periods. Clocks keep running in background tabs; pause before stepping away.</p>':''}</details>${clock?`<div class="go-clocks" aria-label="Game clocks">${['b','w'].map(colour=>`<div data-clock="${colour}"><strong>${colour==='b'?'Black':'White'}</strong><output role="timer" aria-live="off" aria-label="${colour==='b'?'Black':'White'} time"></output><small></small></div>`).join('')}</div><div class="actions"><button id="go-clock-toggle" ${counting()||clock.expired?'disabled':''}>${clock.running?'Pause':'Resume'} clocks</button><button id="go-clock-reset">Reset clocks</button></div>`:''}`;
  $('#go-timing-options').ontoggle=e=>{timingOpen=e.target.open;};
  main.querySelectorAll('[data-setting]').forEach(select=>select.onchange=()=>{settings[select.dataset.setting]=Number(select.value);timing();});
  $('#go-clock-start')?.addEventListener('click',()=>{game=setHumanGoClock(game,startGoClock(newGoClock({mainMs:settings.minutes*60000,periodMs:settings.seconds*1000,periods:settings.periods},currentGoPosition(game).turn),Date.now()));timingOpen=false;draw();});
  $('#go-clock-toggle')?.addEventListener('click',()=>{game={...game,clock:game.clock.running?pauseGoClock(game.clock,Date.now()):startGoClock(game.clock,Date.now())};draw();});
  $('#go-clock-reset')?.addEventListener('click',()=>{game=setHumanGoClock(game,null);message='';draw();});clockDisplay();
 }
 function status(){
  const position=currentGoPosition(game);
  $('#go-message').textContent=message||(game.clock?.expired?`${game.clock.expired==='b'?'Black':'White'} ran out of time. Reset clocks to continue.`:counting()?'Counting: agree on dead groups, then tap to mark or restore them. Clocks are paused.':`${position.turn==='b'?'Black':'White'} to play.${position.passes?' The other player passed.':''}`);
 }
 function drawBoard(){
  binding?.abort();binding=new AbortController();
  const position=currentGoPosition(game);
  board.innerHTML=renderGoBoard({size:game.size,board:position.board,last:position.move,dead:game.dead,zoom:true,coordinates:true,ownership:counting()&&estimate?(result?.ownership??[]):[]});
  bindGoPress(board,{size:game.size,view:[0,0,game.size-1,game.size-1]},{getState:()=>game,isLocked:()=>false,signal:binding.signal,validate:(state,move)=>counting()?{error:'Counting'}:playHumanGo(state,move,Date.now()),getColour:state=>currentGoPosition(state).turn});
  board.addEventListener('click',event=>{
   const button=event.target.closest('[data-challenge-action="go"]');if(!button)return;
   const move=Number(button.dataset.value);
   if(counting()){game=toggleDeadGroup(game,move);draw();}
   else if(position.board[move]==='.')play(move);
   board.querySelector(`[data-value="${move}"]`)?.focus({preventScroll:true});
  },{signal:binding.signal});
 }
 function countView(){
  const area=$('#go-count');if(!counting()){area.innerHTML='';return;}
  area.innerHTML=`<label><input id="go-estimate" type="checkbox" ${estimate?'checked':''}> Estimate open territory</label><div id="go-estimate-result" role="status"></div>`;
  $('#go-estimate').onchange=e=>{estimate=e.target.checked;draw();};
  const output=$('#go-estimate-result');
  if(!estimate){const score=scoreGoArea(game,komi);output.textContent=`Area count — Black: ${score.black} · White: ${score.white} (includes ${komi} komi). ${score.neutral} neutral points.`;return;}
  if(engineError){output.textContent=engineError;const retry=document.createElement('button');retry.textContent='Try estimate again';retry.onclick=()=>draw();output.append(retry);return;}
  if(!result){output.textContent='Estimating with GNU Go…';return;}
  output.textContent=`GNU Go estimate — ${Math.abs(result.lead)<.05?'Even.':`${result.lead>0?'White':'Black'} leads by ${Math.abs(result.lead).toFixed(1)}.`} Includes ${komi} komi using area scoring. Squares show predicted territory, not a final result. Turn off estimates for agreed-dead-group area counting.`;
 }
 function draw(){
  request?.abort();request=null;result=null;engineError='';
  drawBoard();timing();status();countView();
  $('#go-actions').innerHTML=`${counting()?'<button data-action="resume">Resume play</button>':`<button data-action="count">Count</button><button data-action="pass" ${game.clock?.expired?'disabled':''}>Pass</button>`}<button data-action="undo" ${game.positions.length===1?'disabled':''}>Undo</button><button data-action="redo" ${!game.future.length?'disabled':''}>Redo</button>`;
  main.querySelectorAll('[data-action]').forEach(button=>button.onclick=()=>{
   message='';const kind=button.dataset.action;
   if(kind==='pass'){play(null);return;}
   game=kind==='count'?countHumanGo(game,Date.now()):kind==='resume'?resumeHumanGo(game,Date.now()):kind==='undo'?undoHumanGo(game):redoHumanGo(game);draw();
  });
  if(counting()&&estimate){
   request=new AbortController();const signal=request.signal,position=currentGoPosition(game);
   estimator.estimate({size:game.size,board:[...position.board].map((stone,i)=>game.dead.includes(i)?'.':stone).join(''),turn:position.turn,komi},signal).then(value=>{if(signal.aborted||disposed)return;result=value;drawBoard();countView();}).catch(error=>{if(signal.aborted||disposed)return;engineError=error.message;countView();});
  }
 }
 function play(move){const next=playHumanGo(game,move,Date.now());message=next.error??'';if(next.game)game=next.game;draw();}
 $('#go-size').onchange=e=>{game=newGoGame(Number(e.target.value));message='';draw();};
 $('#go-reset').onclick=()=>{game=newGoGame(game.size);message='';draw();};
 $('#go-komi').onchange=e=>{komi=Number(e.target.value);draw();};
 const refresh=()=>{if(game.clock?.running){const expired=game.clock.expired;game={...game,clock:advanceGoClock(game.clock,Date.now())};clockDisplay();if(expired!==game.clock.expired){timing();status();const pass=$('[data-action="pass"]');if(pass)pass.disabled=true;}}};
 const interval=setInterval(refresh,250);document.addEventListener('visibilitychange',refresh);draw();
 return ()=>{disposed=true;request?.abort();binding?.abort();estimator.dispose();clearInterval(interval);document.removeEventListener('visibilitychange',refresh);savedGame=game;savedKomi=komi;};
}
