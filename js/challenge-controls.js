import {stateOf,near,placedPolygon} from './challenge-rules.js';
import {renderGo} from './go-controls.js';
import {playGo,goPosition,nextGoHint} from './go-rules.js';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const palette=['#ffb39a','#a8c9ff','#d9b3ff','#9ddbd1','#ffd579','#d5b798','#c2dba1'];
export function renderChallenge(part,raw,locked,slot){
 const s=stateOf(raw,part),attrs=`data-challenge-slot="${slot}" data-challenge-part="${part.id}"`,disabled=locked?'disabled':'';
 const button=(action,text,value='',extra='')=>`<button type="button" data-challenge-action="${action}" data-value="${esc(value)}" ${disabled} ${extra}>${text}</button>`;
 const toolbar=`<div class="challenge-toolbar">${button('undo','Undo')}${button('reset','Reset')}</div>`;
 let body='';
 if(part.kind==='go')body=renderGo(part,s,locked)+(locked?'':toolbar);
 if(['logic-grid','equation-grid'].includes(part.kind)){
  const values=s.values??part.categories.map(()=>part.names.map(()=>-1));
  body=`<ol class="challenge-clues">${part.clues.map(c=>`<li>${esc(c)}</li>`).join('')}</ol><p class="puzzle-help">Click once for × excluded, again for ✓ selected, again to clear. Each value belongs to one row. Yellow means your selection, not a checked answer.</p><div class="candidate-grids">${part.categories.map((cat,c)=>`<div class="board-scroll" tabindex="0" aria-label="${esc(cat.name)} candidate grid"><table class="candidate-table"><caption>${esc(cat.name)}</caption><thead><tr><th scope="col">${part.kind==='equation-grid'?'Variable':'Person'}</th>${cat.values.map(v=>`<th scope="col">${esc(v)}</th>`).join('')}</tr></thead><tbody>${part.names.map((name,r)=>`<tr><th scope="row">${esc(name)}</th>${cat.values.map((v,i)=>{const key=`${c},${r},${i}`,selected=values[c]?.[r]===i,excluded=s.excluded?.includes(key);return `<td>${button('candidate',selected?'✓':excluded?'×':'·',key,`aria-label="${esc(name)}, ${esc(v)}: ${selected?'selected':excluded?'excluded':'unknown'}" aria-pressed="${selected}" class="candidate ${selected?'selected':''}"`)}</td>`;}).join('')}</tr>`).join('')}</tbody></table></div>`).join('')}</div>${toolbar}`;
 }
 if(['sudoku','cage-grid'].includes(part.kind)){
  const values=s.values??part.givens,selected=s.selected??-1,n=part.size;
  const cageAt=i=>part.cages?.find(c=>c.cells.includes(i));
  body=`<div class="board-scroll" tabindex="0" aria-label="${part.kind==='sudoku'?'Sudoku':'Arithmetic cage'} grid"><div class="digit-grid" style="--cells:${n}" role="group" aria-label="Puzzle cells">${Array.from({length:n*n},(_,i)=>{
   const r=Math.floor(i/n),c=i%n,cage=cageAt(i),label=cage&&Math.min(...cage.cells)===i?`${cage.target}${cage.op}`:'',given=part.givens[i],value=values[i]||'',notes=(s.notes?.[i]??[]).join(' ');
   const borders=part.kind==='sudoku'?`${c%3===0?' thick-left':''}${r%3===0?' thick-top':''}`:`${c===0||cageAt(i-1)!==cage?' thick-left':''}${r===0||cageAt(i-n)!==cage?' thick-top':''}`;
   return button('cell',`<small class="cage-label">${label}</small><strong>${value}</strong>${!value?`<small class="pencil-notes">${notes}</small>`:''}`,i,`class="digit-cell${borders}${given?' given':''}${selected===i?' selected':''}" aria-label="Row ${r+1}, column ${c+1}${label?', cage '+label:''}, ${given?'given ':''}${value||'empty'}${notes?', notes '+notes:''}" aria-pressed="${selected===i}"`);
  }).join('')}</div></div><div class="challenge-toolbar digit-pad">${Array.from({length:n},(_,i)=>button('digit',String(i+1),i+1)).join('')}${button('digit','Clear',0)}${button('notes','Pencil notes', '',`aria-pressed="${Boolean(s.noteMode)}"`)}</div><p class="puzzle-help">Select a cell, then type a digit or use the buttons. Arrow keys move between cells. Delete clears. Given values cannot be changed.</p>${toolbar}`;
 }
 if(part.kind==='cover-path'){
  const n=part.size,path=s.path??[],blocked=new Set(part.blocked);
  body=`<div class="path-board" style="--cells:${n}" data-path-board role="group" aria-label="Draw a route through every dot"><svg viewBox="0 0 ${n} ${n}" aria-hidden="true">${Array.from({length:n*n},(_,i)=>{const x=i%n+.5,y=Math.floor(i/n)+.5;return blocked.has(i)?`<rect x="${x-.33}" y="${y-.33}" width=".66" height=".66" fill="#384349"/>`:`<circle cx="${x}" cy="${y}" r=".18" fill="${path.includes(i)?'#f1be40':'#ffffff'}"/>`;}).join('')}<polyline points="${path.map(i=>`${i%n+.5},${Math.floor(i/n)+.5}`).join(' ')}" fill="none" stroke="#f1be40" stroke-width=".15" stroke-linecap="round" stroke-linejoin="round"/></svg>${Array.from({length:n*n},(_,i)=>button('path','',i,`class="path-dot ${i===path.at(-1)?'path-end':''}" style="left:${i%n/n*100}%;top:${Math.floor(i/n)/n*100}%;width:${100/n}%;height:${100/n}%" ${blocked.has(i)?'disabled':''} aria-label="Row ${Math.floor(i/n)+1}, column ${i%n+1}, ${blocked.has(i)?'blocked':path.includes(i)?'visited at step '+(path.indexOf(i)+1):'unvisited'}" aria-pressed="${path.includes(i)}"`)).join('')}</div><p class="path-count" aria-live="polite">${path.length} / ${n*n-blocked.size} dots covered</p><p class="puzzle-help">Choose any dot to start. Hold and drag from the endpoint to draw; release to stop. Drag back along your route to undo. Click-by-click or arrow keys and Space also work. Dark squares are blocked.</p>${toolbar}`;
 }
 if(part.kind==='tiling'){
  const selected=s.selected??0,placements=s.placements??part.pieces.map(()=>null),n=part.size;
  const polygon=(points,extra)=>`<polygon points="${points.map(p=>p.join(',')).join(' ')}" ${extra}/>`;
  body=`<div class="piece-tray">${part.pieces.map((shape,i)=>button('piece',`<svg viewBox="-1 -1 4 4" aria-hidden="true">${polygon(shape,`fill="${palette[i]}" stroke="#28363c" stroke-width=".05"`)}</svg><span>Piece ${i+1}${placements[i]?' · placed':''}</span>`,i,`aria-pressed="${selected===i}" class="${selected===i?'selected':''}"`)).join('')}</div><div class="tangram-board" data-tiling-board role="group" aria-label="Silhouette and placed pieces"><svg viewBox="0 0 ${n} ${n}" aria-hidden="true"><defs><pattern id="grid-${slot}" width=".5" height=".5" patternUnits="userSpaceOnUse"><path d="M .5 0 L 0 0 0 .5" fill="none" stroke="#d6dfe0" stroke-width=".012"/></pattern></defs><rect width="${n}" height="${n}" fill="url(#grid-${slot})"/>${part.target.map(p=>polygon(p,'fill="#55626d"')).join('')}${placements.map((place,i)=>place?polygon(placedPolygon(part.pieces[i],place),`fill="${palette[i]}" stroke="${selected===i?'#9B7122':'#28363c'}" stroke-width="${selected===i?'.08':'.025'}"`):'').join('')}</svg></div><div class="challenge-toolbar">${button('rotate','Rotate 45°',45)}${button('rotate','Rotate −45°',-45)}${button('flip','Flip')}${button('remove','Return to tray')}</div><div class="challenge-toolbar">${button('move','←','-0.5,0', 'aria-label="Move selected piece left"')}${button('move','↑','0,-0.5','aria-label="Move selected piece up"')}${button('move','↓','0,0.5','aria-label="Move selected piece down"')}${button('move','→','0.5,0','aria-label="Move selected piece right"')}${button('place','Place selected piece at centre')}</div><p class="puzzle-help">Select a piece, then click the board to place its anchor. Move in half-unit steps using the arrows; rotate around its anchor. Only the parallelogram (piece 5) can flip. Dark grey is the target, and yellow outlines show selection.</p>${toolbar}`;
 }
 return `<div class="challenge" ${attrs} data-kind="${part.kind}" ${part.kind==='go'?`data-go-moves="${esc(JSON.stringify(s.moves??[]))}"`:''} ${locked?'data-locked="true"':''}>${body}</div>`;
}
export function bindChallenges(root,set,attempt,onChange,notify,onAssist=()=>{}){
 const find=container=>{const slot=Number(container.dataset.challengeSlot),id=container.dataset.challengePart;return {slot,id,part:set.questions.find(q=>q.slot===slot)?.parts.find(p=>p.id===id)};};
 const read=(slot,id,part)=>stateOf(attempt.answers[slot]?.[id],part);
 root.querySelectorAll('.challenge[data-locked][data-kind="go"]').forEach(container=>{
  const {part}=find(container);if(!part)return;
  const input=container.querySelector('[data-go-replay]');
  const initial=input?Number(input.max):0;
  // The rendered move list is the student's attempt, or the revealed model line.
  const moves=JSON.parse(container.dataset.goMoves??'[]');
  container.addEventListener('input',event=>{
   if(!event.target.matches('[data-go-replay]'))return;
   const step=Math.max(0,Math.min(initial,Number(event.target.value)));
   const preview=document.createElement('div');
   preview.innerHTML=renderGo(part,{moves:moves.slice(0,step),replay:moves},true);
   for(const selector of ['.go-scroll','.go-moves','.go-status']){
    container.querySelector(selector)?.replaceWith(preview.querySelector(selector));
   }
   container.querySelector('.go-replay > span').textContent=`${step} / ${initial}`;
  });
 });
 const update=(slot,id,s,previous,selector)=>{
  const history=previous.history??[];const {history:ignored,...snapshot}=previous;
  s.history=[...history,snapshot].slice(-100);
  onChange(slot,id,JSON.stringify(s),selector);
 };
 const extend=(slot,id,part,cell)=>{
  if(attempt.finished)return;
  const old=read(slot,id,part),path=old.path??[];
  if(!Number.isInteger(cell)||cell<0||cell>=part.size**2||part.blocked.includes(cell))return;
  let next;
  if(!path.length)next=[cell];
  else if(path.includes(cell))next=path.slice(0,path.indexOf(cell)+1);
  else if(near(path.at(-1),cell,part.size))next=[...path,cell];
  else return;
  if(next.length===path.length)return;
  update(slot,id,{...old,path:next},old);
 };
 root.querySelectorAll('.challenge:not([data-locked])').forEach(container=>{
  const {slot,id,part}=find(container);if(!part)return;
  const selector=(action,value)=>`[data-challenge-slot="${slot}"][data-challenge-part="${id}"] [data-challenge-action="${action}"][data-value="${value}"]`;
  container.querySelector('[data-go-reply]')?.addEventListener('change',event=>{
   if(attempt.finished)return;
   const old=read(slot,id,part),moves=old.moves??[],move=Number(event.target.value);
   const parent=goPosition(part,moves.slice(0,-1));
   if(parent?.children.some(c=>c.move===move&&c.colour!==part.player))update(slot,id,{...old,moves:[...moves.slice(0,-1),move],pending:null},old);
  });
  container.querySelectorAll('[data-challenge-action]').forEach(button=>{
   button.addEventListener('click',()=>{
    if(attempt.finished||button.disabled)return;
    const action=button.dataset.challengeAction,value=button.dataset.value,old=read(slot,id,part),s=structuredClone(old);
    if(action==='path'){extend(slot,id,part,Number(value));return;}
    if(action==='go'){
     const result=playGo(part,old,Number(value));
     if(result.error)notify(result.error);else update(slot,id,result.state,old,selector(action,value));
     return;
    }
    if(action==='go-hint'){
     const move=nextGoHint(part,old);
     if(move===null){notify('No winning continuation is recorded here. Undo or Reset to explore another line.');return;}
     onAssist(slot);s.hintMove=move;s.pending=null;
     onChange(slot,id,JSON.stringify(s),selector(action,value));return;
    }
    if(action==='undo'){
     if(!s.history?.length)return;const previous=s.history.pop();onChange(slot,id,JSON.stringify({...previous,history:s.history}),selector(action,value));return;
    }
    if(action==='reset'){update(slot,id,{},old,selector(action,value));return;}
    if(action==='candidate'){
     const [c,r,v]=value.split(',').map(Number);s.values??=part.categories.map(()=>part.names.map(()=>-1));s.excluded??=[];
     if(s.values[c][r]===v)s.values[c][r]=-1;
     else if(s.excluded.includes(value)){s.excluded=s.excluded.filter(x=>x!==value);s.values[c][r]=v;}
     else s.excluded.push(value);
    }
    if(action==='cell'){s.selected=Number(value);onChange(slot,id,JSON.stringify(s),selector(action,value));return;}
    if(action==='notes'){s.noteMode=!s.noteMode;onChange(slot,id,JSON.stringify(s),selector(action,value));return;}
    if(action==='digit'){
     const cell=s.selected;if(!Number.isInteger(cell)||cell<0){notify('Select an editable cell first.');return;}
     if(part.givens[cell]){notify('That is a given value. Choose an empty cell.');return;}
     s.values??=part.givens.slice();s.notes??={};const digit=Number(value);
     if(s.noteMode&&digit){const notes=s.notes[cell]??[];s.notes[cell]=notes.includes(digit)?notes.filter(n=>n!==digit):[...notes,digit].sort();}
     else {s.values[cell]=digit;delete s.notes[cell];}
    }
    if(part.kind==='tiling'){
     s.placements??=part.pieces.map(()=>null);const i=s.selected??0;
     if(action==='piece'){s.selected=Number(value);onChange(slot,id,JSON.stringify(s),selector(action,value));return;}
     if(action==='place')s.placements[i]={x:4,y:4,rotation:0,flipped:false};
     if(action==='remove')s.placements[i]=null;
     if(['rotate','flip','move'].includes(action)){
      s.placements[i]??={x:4,y:4,rotation:0,flipped:false};const place=s.placements[i];
      if(action==='rotate')place.rotation=(place.rotation+Number(value)+360)%360;
      if(action==='flip'){if(i!==4){notify('Only the parallelogram needs flipping.');return;}place.flipped=!place.flipped;}
      if(action==='move'){const [dx,dy]=value.split(',').map(Number);place.x=Math.max(0,Math.min(part.size,place.x+dx));place.y=Math.max(0,Math.min(part.size,place.y+dy));}
     }
    }
    update(slot,id,s,old,selector(action,value));
   });
  });
  container.addEventListener('keydown',event=>{
   const button=event.target.closest('[data-challenge-action]');if(!button)return;
   const action=button.dataset.challengeAction,i=Number(button.dataset.value),n=part.size;
   if(['cell','path','go'].includes(action)&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
    const next=i+({ArrowLeft:-1,ArrowRight:1,ArrowUp:-n,ArrowDown:n}[event.key]);event.preventDefault();
    if(next>=0&&next<n*n&&near(i,next,n)){
     const target=container.querySelector(`[data-challenge-action="${action}"][data-value="${next}"]`);
     if(target&&!target.disabled){if(action==='cell')target.click();else target.focus();}
    }
   }
   if(action==='cell'&&(/^[1-9]$/.test(event.key)||['Backspace','Delete'].includes(event.key))){
    event.preventDefault();const digit=/^[1-9]$/.test(event.key)?Number(event.key):0;if(digit>n)return;
    container.querySelector(`[data-challenge-action="digit"][data-value="${digit}"]`)?.click();
   }
  });
  const board=container.querySelector('[data-tiling-board]');
  if(board)board.addEventListener('click',event=>{
   if(attempt.finished)return;const rect=board.getBoundingClientRect(),old=read(slot,id,part),s=structuredClone(old),i=s.selected??0;
   s.placements??=part.pieces.map(()=>null);s.placements[i]={...(s.placements[i]??{rotation:0,flipped:false}),x:Math.round((event.clientX-rect.left)/rect.width*part.size*2)/2,y:Math.round((event.clientY-rect.top)/rect.height*part.size*2)/2};update(slot,id,s,old);
  });
  const track=container.querySelector('[data-path-board]');
  if(track)track.addEventListener('pointerdown',event=>{
   if(attempt.finished||event.button!==0)return;
   event.preventDefault();let previous={x:event.clientX,y:event.clientY};
   const visit=(x,y)=>{
    const current=root.querySelector(`[data-challenge-slot="${slot}"] [data-path-board]`);if(!current)return;
    const rect=current.getBoundingClientRect(),col=Math.floor((x-rect.left)/rect.width*part.size),row=Math.floor((y-rect.top)/rect.height*part.size);
    if(col>=0&&col<part.size&&row>=0&&row<part.size)extend(slot,id,part,row*part.size+col);
   };
   visit(previous.x,previous.y);root.setPointerCapture(event.pointerId);
   const move=e=>{
    if(e.pointerId!==event.pointerId)return;
    const steps=Math.ceil(Math.hypot(e.clientX-previous.x,e.clientY-previous.y)/6);
    for(let i=1;i<=steps;i++)visit(previous.x+(e.clientX-previous.x)*i/steps,previous.y+(e.clientY-previous.y)*i/steps);
    previous={x:e.clientX,y:e.clientY};
   };
   const end=e=>{if(e.pointerId!==event.pointerId)return;root.removeEventListener('pointermove',move);root.removeEventListener('pointerup',end);root.removeEventListener('pointercancel',end);if(root.hasPointerCapture(e.pointerId))root.releasePointerCapture(e.pointerId);};
   root.addEventListener('pointermove',move);root.addEventListener('pointerup',end);root.addEventListener('pointercancel',end);
  });
 });
}
