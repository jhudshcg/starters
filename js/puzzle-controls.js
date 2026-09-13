import {readList,adjacent} from './puzzle-rules.js';
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const coordinate=(cell,size)=>`row ${Math.floor(cell/size)+1}, column ${cell%size+1}`;
function referenceBoard(reference,size){
  return `<figure class="shape-reference"><figcaption>${esc(reference.label)}</figcaption><div class="pixel-board reference-board" style="--cells:${size}" role="img" aria-label="${esc(reference.label)}. Filled cells: ${reference.cells.map(c=>coordinate(c,size)).join('; ')}.">${Array.from({length:size**2},(_,cell)=>`<span aria-hidden="true" class="pixel ${reference.cells.includes(cell)?'filled':''}"><small>${Math.floor(cell/size)+1},${cell%size+1}</small></span>`).join('')}</div></figure>`;
}
export function renderPuzzle(part,raw,locked,slot,board=null){
  const values=readList(raw),prefix=`${slot}-${part.id}`;
  const attrs=(action,value='')=>`data-puzzle-action="${action}" data-puzzle-slot="${slot}" data-puzzle-part="${part.id}" data-value="${value}" ${locked?'disabled':''}`;
  const label=`<div class="puzzle-label" id="puzzle-label-${prefix}">${esc(part.prompt)} <span class="part-marks">(${part.marks} points)</span></div>`;
  if(part.kind==='board'){
    const size=part.size??board?.size??3,origin=(board.r-1)*size+board.c-1;
    return `${label}<div class="pixel-board position-board" style="--cells:${size}" role="group" aria-labelledby="puzzle-label-${prefix}">${Array.from({length:size**2},(_,cell)=>{
      const value=`${Math.floor(cell/size)+1},${cell%size+1}`,selected=raw===value,blocked=board.blocked?.includes(cell);
      return `<button class="pixel position-cell ${selected?'selected':''} ${blocked?'blocked':''}" ${attrs('position',cell)} ${blocked?'disabled':''} aria-label="${coordinate(cell,size)}${cell===origin?', '+(board.label??'starting marker'):''}${blocked?', blocked':''}" aria-pressed="${selected}"><strong aria-hidden="true">${cell===origin?board.marker??'◆':blocked?'×':selected?'●':''}</strong><small aria-hidden="true">${Math.floor(cell/size)+1},${cell%size+1}</small></button>`;
    }).join('')}</div><p class="puzzle-help">${board.marker??'◆'} = ${esc(board.label??'starting marker')}. Click a cell to select your answer. Yellow means selected, not marked.${board.blocked?.length?' × = blocked.':''}</p><p class="position-status">${raw?`Selected: row ${esc(raw.split(',')[0])}, column ${esc(raw.split(',')[1])}`:'No position selected.'}</p>`;
  }
  if(part.kind==='order')return `${label}<div class="job-bank" aria-label="Available jobs">${part.items.map((item,i)=>`<button ${attrs('order-add',i)} ${values.includes(i)?'disabled':''}>${esc(item)} <span aria-hidden="true">＋</span></button>`).join('')}</div><ol class="job-order" aria-label="Your job order">${Array.from({length:part.items.length},(_,i)=>`<li>${values[i]!==undefined?`<button ${attrs('order-remove',i)} aria-label="Remove ${esc(part.items[values[i]])} from position ${i+1}">${esc(part.items[values[i]])} <span aria-hidden="true">×</span></button>`:'<span>Choose a job</span>'}</li>`).join('')}</ol><p class="puzzle-help">Click a job to add it. Click a placed job to remove it. All three clues must hold.</p><button ${attrs('reset')}>Clear order</button>`;
  if(part.kind==='matching')return `${label}<div class="matching-rows">${part.items.map((person,i)=>`<div role="group" aria-label="Device for ${esc(person)}"><strong>${esc(person)}</strong><div class="options">${part.choices.map((device,j)=>`<button ${attrs('match',`${i},${j}`)} aria-pressed="${values[i]===j}">${esc(device)}</button>`).join('')}</div></div>`).join('')}</div><p class="puzzle-help">Choose one device per person. Each device can be used once.</p>`;
  if(part.kind==='switches')return `${label}<div class="switches" role="group" aria-labelledby="puzzle-label-${prefix}">${part.items.map((name,i)=>`<button ${attrs('switch',i)} aria-pressed="${values.includes(i)}"><span>${esc(name)}</span><span class="switch-track" aria-hidden="true"></span><strong>${values.includes(i)?'On':'Off'}</strong></button>`).join('')}</div><p class="puzzle-help">Click a switch, or focus it and press Space, to change its setting.</p>`;
  if(part.kind==='shape')return `${label}<div class="shape-workspace"><div class="shape-references">${part.references.map(r=>referenceBoard(r,part.size)).join('')}</div><div class="shape-answer"><h3>Your shape</h3><div class="pixel-board" style="--cells:${part.size}" role="group" aria-labelledby="puzzle-label-${prefix}">${Array.from({length:part.size**2},(_,cell)=>`<button class="pixel ${values.includes(cell)?'filled':''}" ${attrs('shape',cell)} aria-label="${coordinate(cell,part.size)}" aria-pressed="${values.includes(cell)}"><span aria-hidden="true">${values.includes(cell)?'■':''}</span><small aria-hidden="true">${Math.floor(cell/part.size)+1},${cell%part.size+1}</small></button>`).join('')}</div></div></div><p class="puzzle-help">Click cells to fill or clear them. Use arrow keys between cells and Space to toggle. ${values.length} cells selected.</p><button ${attrs('reset')}>Clear shape</button>`;
  if(part.kind==='path'){
    const r=part.rules,path=values.length?values:[r.start];
    return `${label}<div class="route-board pixel-board" style="--cells:${r.size}" role="group" aria-labelledby="puzzle-label-${prefix}">${Array.from({length:r.size**2},(_,cell)=>{
      const index=path.indexOf(cell),blocked=r.blocked.includes(cell),symbol=cell===r.start?'S':cell===r.end?'E':blocked?'×':cell===r.checkpoint?'★':index>=0?index:'';
      const state=cell===r.start?'start':cell===r.end?'end':blocked?'blocked':cell===r.checkpoint?'checkpoint':'';
      return `<button class="pixel route-cell ${blocked?'blocked':''} ${index>=0?'on-path':''} ${cell===path.at(-1)?'path-head':''}" ${attrs('path',cell)} ${blocked?'disabled':''} aria-label="${coordinate(cell,r.size)}${state?', '+state:''}${index>=0?', step '+index:''}" aria-pressed="${index>=0}"><strong aria-hidden="true">${symbol}</strong><small aria-hidden="true">${Math.floor(cell/r.size)+1},${cell%r.size+1}</small></button>`;
    }).join('')}</div><p class="route-status">${path.length-1} / ${r.steps} moves · S = start · E = end${r.checkpoint!==undefined?' · ★ = checkpoint':''} · × = blocked</p><p class="puzzle-help">Start at S. Click a neighbouring cell to extend your route, or an earlier cell to go back. Arrow keys move focus; Space chooses a cell.</p><div class="options"><button ${attrs('undo')}>Undo move</button><button ${attrs('reset')}>Reset path</button></div>`;
  }
  return '';
}

export function bindPuzzles(root,set,attempt,onChange,notify){
  root.querySelectorAll('[data-puzzle-action]').forEach(button=>{
    button.addEventListener('click',()=>{
      if(attempt.finished)return;
      const slot=Number(button.dataset.puzzleSlot),id=button.dataset.puzzlePart,action=button.dataset.puzzleAction;
      const question=set.questions.find(q=>q.slot===slot),part=question.parts.find(p=>p.id===id);
      let values=readList(attempt.answers[slot]?.[id]);const cell=Number(button.dataset.value);
      if(action==='position'){
        const size=part.size??question.board?.size??3;
        onChange(slot,id,`${Math.floor(cell/size)+1},${cell%size+1}`,`[data-puzzle-slot="${slot}"][data-puzzle-part="${id}"][data-puzzle-action="position"][data-value="${cell}"]`);return;
      }
      if(action==='order-add'){if(!values.includes(cell))values.push(cell);}
      if(action==='order-remove')values.splice(cell,1);
      if(action==='match'){if(values.length!==part.items.length)values=part.items.map(()=>-1);const [person,device]=button.dataset.value.split(',').map(Number);values[person]=device;}
      if(action==='switch'||action==='shape')values=values.includes(cell)?values.filter(v=>v!==cell):[...values,cell];
      if(action==='path'){
        if(!values.length)values=[part.rules.start];
        if(values.includes(cell))values=values.slice(0,values.indexOf(cell)+1);
        else if(adjacent(values.at(-1),cell,part.rules.size)&&!part.rules.blocked.includes(cell))values.push(cell);
        else{notify('Choose a neighbouring unblocked cell. No diagonal moves.');return;}
      }
      if(action==='undo')values=values.length>1?values.slice(0,-1):[part.rules.start];
      if(action==='reset')values=part.kind==='path'?[part.rules.start]:[];
      const selector=`[data-puzzle-slot="${slot}"][data-puzzle-part="${id}"][data-puzzle-action="${action}"][data-value="${button.dataset.value}"]`;
      onChange(slot,id,JSON.stringify(values),selector);
    });
    button.addEventListener('keydown',event=>{
      if(!['shape','path','position'].includes(button.dataset.puzzleAction)||!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key))return;
      const board=button.closest('.pixel-board'),size=Number(board.style.getPropertyValue('--cells')),cell=Number(button.dataset.value);
      const delta={ArrowUp:-size,ArrowDown:size,ArrowLeft:-1,ArrowRight:1}[event.key],next=cell+delta;
      event.preventDefault();if(next<0||next>=size**2||!adjacent(cell,next,size))return;
      const target=board.querySelector(`[data-value="${next}"]`);if(target&&!target.disabled)target.focus();
    });
  });
}
