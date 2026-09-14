import {formatCoverage} from './coverage.js';
import {challengeKinds as interactiveKinds} from './challenge-rules.js';
import {renderChallenge as renderPuzzle,bindChallenges as bindPuzzles} from './challenge-controls.js';
import {banks, types, focuses, focusNames, resolve, choose, marks} from './bank.js';
import {encode, questionCode} from './codes.js';
import {markQuestion} from './marking.js';
import {loadStorage, saveStorage, deadlineState, appendAttempt, priorities, exportCSV} from './progress.js';

const $=s=>document.querySelector(s);
const main=$('#main');
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let data={schema:1,active:null,history:[]};
let storageOK=true;
let toastTimer;
// Review permission belongs to this page visit, never to persisted progress.
let submittedAttemptId=null;
const canReview=()=>Boolean(data.active && submittedAttemptId===data.active.id);
let filters={type:'all',focus:'all',from:'',to:'',sort:'newest'};
function storageError(){storageOK=false;$('#storage-warning').hidden=false;$('#storage-warning').textContent='Progress could not be saved on this browser. You can keep practising. Export a backup from My progress to keep your results.';}
try{data=loadStorage();if(data.active){try{resolve(data.active.code);}catch{data.active=null;saveStorage(data);}}}catch{storageError();}
function persist(){try{saveStorage(data);}catch{storageError();}}
function toast(message){$('#toast').textContent=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').textContent='',4500);}
function activeSet(){return data.active?resolve(data.active.code):null;}
function navigate(hash){if(location.hash===hash)render();else location.hash=hash;}
function setHash(code){history.replaceState(null,'',`#set=${encodeURIComponent(code)}`);}
function duration(seconds){const s=Math.max(0,Math.floor(seconds));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
function askLeave(){
  if(!data.active||data.active.finished) return Promise.resolve(true);
  return new Promise(resolveAnswer=>{
    const dialog=document.createElement('dialog');
    dialog.innerHTML='<h2>Start a new activity?</h2><p>Your current answers will be replaced. You can keep working and submit them first.</p><div class="actions"><button value="stay">Keep working</button><button class="primary" value="leave">Start new activity</button></div>';
    document.body.append(dialog);dialog.addEventListener('click',e=>{if(e.target.matches('button'))dialog.close(e.target.value);});
    dialog.addEventListener('cancel',e=>{e.preventDefault();dialog.close('stay');});
    dialog.addEventListener('close',()=>{const yes=dialog.returnValue==='leave';dialog.remove();resolveAnswer(yes);});dialog.showModal();
  });
}
async function start(set,{force=false}={}){
  if(!force && !await askLeave())return;
  const now=Date.now();
  submittedAttemptId=null;
  clearTimeout(toastTimer);$('#toast').textContent='';
  data.active={id:crypto.randomUUID(),code:set.code,answers:{},checks:{},first:{},hints:{},reveals:{},started:now,origin:now,saved:now,deadline:set.minutes?now+set.minutes*60000:null,finished:null,outcome:null,timingEvents:[]};
  persist();setHash(set.code);render();main.focus();
}
function home(){
  const completed=data.history.length;
  main.innerHTML=`<section class="hero"><div><div class="eyebrow">A little practice goes a long way</div><h1>Start small.<br><em>Think bigger.</em></h1><p>Get your brain into gear with a quick puzzle, a little Core revision or a Python challenge.</p><div class="meta-row"><span>5–15 minutes</span><span>Instant feedback</span><span>Your own pace</span></div></div><aside class="code-entry"><div class="eyebrow">Got a code from your teacher?</div><h2>Jump straight in.</h2><p>Open the exact same questions, ready to go.</p><form id="code-form"><input name="code" aria-label="Question or set code" placeholder="Enter your code" autocomplete="off" autocapitalize="off" spellcheck="false" required><button type="submit">Open <span aria-hidden="true">↗</span></button></form><p class="error" id="code-error" role="alert"></p><small>8 characters · capitals matter · optional timer character</small></aside></section>
  <div class="section-heading"><h2>What will you try today?</h2><span>Pick an activity to get started</span></div>
  <section class="activity-grid" aria-label="Activity types">${types.map((t,i)=>`<article class="type-card type-${i}"><div class="card-art" aria-hidden="true"><span class="art-label">0${i+1} / ${t.label.toUpperCase()}</span>${i===0?'<div class="mini-grid"><span>2</span><span>5</span><span>7</span><span>3</span><span>?</span><span>9</span><span>5</span><span>11</span><span>16</span></div>':i===1?'<div class="art-lines"><span>○ &nbsp; identify</span><span>● &nbsp; understand</span><span>○ &nbsp; explain</span></div>':'<div class="art-code">for idea in ideas:<br>&nbsp; &nbsp; give_it_a_go()</div>'}</div><div class="card-body"><h3>${t.name}</h3><p>${t.description}</p><div class="card-bottom"><small>${i===1?'3 questions · 15–21 marks':i===2?'2 challenges · 12 marks':'3 puzzles · choose your pace'}</small><button data-start="${i}">Let’s go <span aria-hidden="true">↗</span></button></div></div></article>`).join('')}</section>
  <section class="lower-panel"><div class="note-panel"><span class="note-icon" aria-hidden="true">↗</span><div><h3>${completed?`${completed} ${completed===1?'activity':'activities'} completed. Keep building.`:'Small steps add up.'}</h3><p>See your results and find out what to practise next.</p></div><a href="#progress">My progress →</a></div><div class="note-panel"><span class="note-icon" aria-hidden="true">◷</span><div><h3>No rush. Unless you want one.</h3><p>Practise at your pace, or add a timer for a challenge.</p></div></div></section>
  ${data.active&&!data.active.finished?`<p class="muted" style="margin-top:1.5rem">You have an unfinished activity. <a href="#set=${encodeURIComponent(data.active.code)}">Continue ${esc(data.active.code)}</a></p>`:''}`;
  $('#code-form').onsubmit=async e=>{e.preventDefault();try{await start(resolve(new FormData(e.target).get('code')));}catch(error){$('#code-error').textContent=error.message;}};
  main.querySelectorAll('[data-start]').forEach(b=>b.onclick=async()=>{try{await start(choose(Number(b.dataset.start),focuses(Number(b.dataset.start))[0]));}catch(e){toast(e.message);}});
}
function stimulus(q){
  if(q.code)return `<pre class="code-panel" tabindex="0" aria-label="Python code"><code>${esc(q.code)}</code></pre>`;
  if(q.grid)return `<div class="grid-wrap"><table class="puzzle-grid"><caption>${esc(q.title)}</caption><thead><tr><th scope="col">Row</th>${q.grid.headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${q.grid.rows.map((row,i)=>`<tr><th scope="row">${i+1}</th>${row.map(v=>`<td${v===null?' class="missing"':''}>${v===null?'<span aria-label="Missing value">?</span>':v}</td>`).join('')}</tr>`).join('')}</tbody>${q.grid.footer?`<tfoot><tr><th scope="row">Column<br>total</th>${q.grid.footer.map(v=>`<td>${v}</td>`).join('')}</tr></tfoot>`:''}</table></div>`;

  if(q.clues)return `<aside class="logic-clues"><h3>Your clues</h3><ol>${q.clues.map(clue=>`<li>${esc(clue)}</li>`).join('')}</ol></aside>`;
  return '';
}
function questionHTML(q,index,set){
  const a=data.active,answers=a.answers[q.slot]??{}, results=canReview()&&a.checks[q.slot]&&(!a.feedbackHidden?.[q.slot]||a.finished)?markQuestion(q,answers):null;
  const locked=Boolean(a.finished);
  return `<article class="question type-${set.type}" data-question="${q.slot}"><div class="question-top"><span class="question-number">${String(index+1).padStart(2,'0')}</span><div><h2>${esc(q.title)}</h2><div class="muted">${esc(q.format)} · <span title="Individual question code">${questionCode(set.type,q.slot,q.variation)}</span>${q.tags.filter(t=>t.startsWith('CA')).length?` · ${q.tags.filter(t=>t.startsWith('CA')).join(', ')}`:''}</div></div><span class="marks-badge">${marks(q)} ${set.type===0?'points':'marks'}</span></div><p class="question-prompt">${esc(q.prompt)}</p>${q.source?`<p class="muted"><a href="${esc(q.source.url)}" target="_blank" rel="noopener noreferrer">Puzzle source</a> · ${esc(q.source.note)}</p>`:''}<div class="question-layout ${q.code||q.grid||q.clues?'':'no-stimulus'}">${stimulus(q)}<div class="parts">${q.parts.map((p,j)=>{
    const id=`answer-${q.slot}-${p.id}`,answer=answers[p.id]??'',result=results?.[j];
    const label=`${esc(p.prompt)} <span class="part-marks">(${p.marks})</span>`;
    const input=(interactiveKinds.includes(p.kind)||p.kind==='board')?`<div class="part interactive-part">${renderPuzzle(p,answer,locked,q.slot,q.board)}`:p.options?`<fieldset class="part" ${locked?'disabled':''}><legend>${label}</legend><div class="options ${p.kind==='board'?'board-options':''}">${p.options.map((option,k)=>`<label class="option"><input type="radio" name="${id}" value="${esc(option)}" data-slot="${q.slot}" data-part="${p.id}" ${answer===option?'checked':''}>${p.kind==='board'?`<span>Row ${option[0]}<br>Col ${option[2]}</span>`:esc(option)}</label>`).join('')}</div>`:`<div class="part"><label for="${id}">${label}</label><input id="${id}" data-slot="${q.slot}" data-part="${p.id}" value="${esc(answer)}" ${locked?'disabled':''} ${p.kind==='number'?'inputmode="decimal"':''} autocomplete="off" autocapitalize="off" spellcheck="false" ${result?`aria-describedby="feedback-${q.slot}-${j}"`:''}>`;
    return input+(p.coverage?.length?`<details class="part-coverage"><summary>Spec reference</summary><small>${esc(formatCoverage(p.coverage))}${p.coverageMode==='practice'?' · Supporting practice':''}</small></details>`:'')+(result?`<p id="feedback-${q.slot}-${j}" class="feedback ${result.earned===result.max?'correct':'incorrect'}">${result.earned}/${result.max} · ${esc(result.message)}</p>`:'')+(p.options&&!interactiveKinds.includes(p.kind)&&p.kind!=='board'?'</fieldset>':'</div>');
  }).join('')}</div></div><div class="question-actions"><button class="subtle" data-hint="${q.slot}" ${a.hints[q.slot]?'disabled':''}>${a.hints[q.slot]?'Hint shown':'Show hint'}</button><details class="answer-tools" data-answer-tools="${q.slot}" ${a.answerTools?.[q.slot]?'open':''}><summary>Check / show answer</summary><div class="answer-tools-content"><p>${canReview()?'Your set has been submitted. You can check and reveal answers.':'Submit your set answers first to unlock checking and model answers.'}</p><div class="options"><button data-check="${q.slot}" ${!canReview()?'disabled':''}>Check answer</button><button class="subtle" data-reveal="${q.slot}" ${!canReview()||a.reveals[q.slot]?'disabled':''}>${canReview()&&a.reveals[q.slot]?'Answer shown':'Show answer'}</button></div></div></details>${a.hints[q.slot]||a.reveals[q.slot]?'<small>Assisted practice</small>':''}</div>${a.hints[q.slot]?`<p class="hint-text"><strong>Hint:</strong> ${esc(q.hint)}</p>`:''}${canReview()&&a.reveals[q.slot]?`<div class="solution"><strong>Answers and explanations</strong>${q.parts.map(p=>`<p>${esc(p.prompt)}: <strong>${esc(p.solutionText??p.answer)}</strong>. ${esc(p.explanation)}</p>${interactiveKinds.includes(p.kind)?renderPuzzle(p,p.answer,true,q.slot):''}`).join('')}</div>`:''}</article>`;
}
function activity(){
  const set=activeSet(),a=data.active;
  if(!set){home();return;}
  const record=data.history.find(r=>r.id===a.id);
  const sameFocusAlternatives=banks[set.type].filter(q=>q.focus===set.focus&&!q.retired).length>set.questions.length;
  main.innerHTML=`<a href="#home" class="back">← All activities</a><div class="page-top"><div><div class="eyebrow">${types[set.type].name} / ${set.questions.length===1?'Single question':'Starter set'}</div><h1>${esc(focusNames[set.focus])}</h1><p class="muted">${set.questions.length} ${set.questions.length===1?'question':'questions'} · ${set.total} ${set.type===0?'points':'marks'} · About ${set.questions.length===1?(set.questions[0].estimatedMinutes??types[set.type].minutes):types[set.type].minutes} minutes</p></div><div class="focus-row"><label for="focus">Focus</label><select id="focus">${focuses(set.type).map(f=>`<option value="${f}" ${f===set.focus?'selected':''}>${esc(focusNames[f])}</option>`).join('')}</select></div></div>
  ${record?`<section class="result-banner" aria-label="Activity result"><span class="result-score">${record.percentage}%</span><div><h2>${record.outcome==='expired'?'Time’s up. Answers submitted.':'Activity complete.'}</h2><p>${record.earned}/${record.max} marks · ${duration(record.seconds)}${record.assisted?' · Assisted practice':''}. ${canReview()?'Review your feedback below.':'Submit your saved answers to unlock review for this visit.'}</p></div><button id="retry">Try this set again</button></section>`:''}
  <section class="set-toolbar" aria-label="Set code and timing"><div class="code-block"><div><div class="code-label">YOUR ${set.questions.length===1?'ACTIVITY':'SET'} CODE</div><div class="set-code" id="display-code">${esc(a.code)}</div></div><div class="code-actions"><button id="copy-code">Copy code</button><button id="copy-link">Copy link</button></div></div><div class="timer-controls"><span class="timer-display" id="timer">${a.deadline?'':'Untimed'}</span><label for="minutes">Timer</label><select id="minutes" ${a.finished?'disabled':''}>${Array.from({length:11},(_,i)=>i+5).map(m=>`<option value="${m}" ${m===(set.minutes??types[set.type].minutes)?'selected':''}>${m} min</option>`).join('')}</select><button id="timer-toggle" ${a.finished?'disabled':''}>${a.deadline?'Stop timer':'Start timer'}</button></div></section>
  <div class="random-controls"><button id="new-type">Get new question set ↗</button><button id="new-focus" ${!sameFocusAlternatives?'disabled title="All templates in this focus are already shown. Use Get new permutation."':''}>New set in this focus</button><button id="permutation" ${set.questions.some(q=>q.variations.length<2)?'disabled title="This set includes a fixed problem. Choose a new set for different puzzles."':''}>Get new permutation ↻</button></div>
  <section class="questions" aria-label="Questions">${set.questions.map((q,i)=>questionHTML(q,i,set)).join('')}</section><div class="submit-bar">${record?`<div class="submit-result" id="submit-result" tabindex="-1" role="status"><strong>${record.percentage}%</strong><span>${record.earned}/${record.max} ${set.type===0?'points':'marks'} · ${duration(record.seconds)}${record.assisted?' · Assisted practice':''}<br>${record.outcome==='expired'?'Time’s up. Answers submitted.':'Activity complete.'}</span></div>`:'<p>Try all questions, then submit your best try.</p>'}<button class="primary" id="submit" ${a.finished&&canReview()?'disabled':''}>${a.finished?(canReview()?'Submitted ✓':'Submit saved answers →'):'Submit set answers →'}</button></div>`;
  main.querySelectorAll('[data-answer-tools]').forEach(details=>details.addEventListener('toggle',()=>{if(!details.isConnected)return;a.answerTools??={};a.answerTools[details.dataset.answerTools]=details.open;persist();}));
  bindPuzzles(main,set,a,(slot,id,value,selector)=>{
    a.answers[slot]??={};a.answers[slot][id]=value;a.saved=Date.now();
    // New puzzle moves invalidate visible feedback but retain first-response evidence.
    a.feedbackHidden??={};a.feedbackHidden[slot]=true;persist();activity();
    const control=selector?main.querySelector(selector):null;
    if(control&&!control.disabled)control.focus({preventScroll:true});
    else main.querySelector(`[data-question="${slot}"] [data-puzzle-action]:not(:disabled)`)?.focus({preventScroll:true});
  },toast,slot=>{a.hints[slot]=true;persist();});
  main.querySelectorAll('[data-part]').forEach(el=>el.addEventListener(el.type==='radio'?'change':'input',()=>{
    if(a.finished)return;
    a.answers[el.dataset.slot]??={};a.answers[el.dataset.slot][el.dataset.part]=el.value;
    // Remove stale feedback after an edit, retaining first-check evidence.
    const article=el.closest('.question');article.querySelectorAll('.feedback').forEach(f=>f.remove());
    a.saved=Date.now();persist();
  }));
  main.querySelectorAll('[data-check]').forEach(b=>b.onclick=()=>{
    if(!canReview())return;
    a.answerTools??={};a.answerTools[b.dataset.check]=true;check(Number(b.dataset.check));persist();activity();main.querySelector(`[data-check="${b.dataset.check}"]`).focus();
  });
  main.querySelectorAll('[data-hint]').forEach(b=>b.onclick=()=>{a.hints[b.dataset.hint]=true;persist();activity();const panel=main.querySelector('[data-question="'+b.dataset.hint+'"] .hint-text');panel.tabIndex=-1;panel.focus();toast('Hint shown. This question is marked as assisted practice.');});
  main.querySelectorAll('[data-reveal]').forEach(b=>b.onclick=()=>{if(!canReview())return;a.reveals[b.dataset.reveal]=true;persist();activity();const panel=main.querySelector('[data-question="'+b.dataset.reveal+'"] .solution');panel.tabIndex=-1;panel.focus();toast('Model answers shown. Your submitted score is unchanged.');});
  $('#submit').onclick=()=>submit('submitted');
  $('#retry')?.addEventListener('click',()=>start(set));
  $('#new-type').onclick=()=>replaceSet(set, 'type');$('#new-focus').onclick=()=>replaceSet(set,'focus');$('#permutation').onclick=()=>replaceSet(set,'permutation');
  $('#focus').onchange=async e=>{const target=e.target.value;try{await start(choose(set.type,target));}catch(err){toast(err.message);}if(data.active?.id===a.id)activity();};
  $('#copy-code').onclick=()=>copy(a.code);
  $('#copy-link').onclick=()=>copy(`${location.href.split('#')[0]}#set=${encodeURIComponent(a.code)}`);
  $('#timer-toggle').onclick=()=>{
    if(a.finished)return;
    const now=Date.now(),stop=a.deadline!==null,minutes=stop?null:Number($('#minutes').value);
    a.deadline=stop?null:now+minutes*60000;if(!stop){a.origin=now;a.warned=false;}
    a.timingEvents.push({at:now,minutes});a.code=encode({...set,minutes});a.saved=now;
    setHash(a.code);persist();activity();toast(stop?'Timer stopped. You can continue at your own pace.':'Timer started. Time taken starts from now.');
  };
  tick();
}
async function replaceSet(set,mode){
  try{
    const alternatives=focuses(set.type).filter(f=>f!==set.focus);
    const focus=mode==='type'?alternatives[Math.floor(Math.random()*alternatives.length)]:set.focus;
    await start(choose(set.type,focus,set,mode==='permutation'?'permutation':'new'));
  }catch(e){toast(e.message);}
}
function check(slot,announce=true){
  const a=data.active,q=activeSet().questions.find(q=>q.slot===slot);
  a.feedbackHidden??={};a.feedbackHidden[slot]=false;
  const result=markQuestion(q,a.answers[slot]);
  if(!a.first[slot])a.first[slot]={results:result,assisted:Boolean(a.hints[slot]||a.reveals[slot])};
  if(!a.finished)a.checks[slot]=(a.checks[slot]??0)+1;
  if(announce)toast(`${q.title}: ${result.reduce((s,r)=>s+r.earned,0)} of ${marks(q)} marks.`);
  return result;
}
function submit(outcome){
  const a=data.active;if(!a)return;
  submittedAttemptId=a.id;
  // A restored completed attempt unlocks review without recording it twice.
  if(a.finished){render();$('#submit-result')?.focus();return;}
  const set=activeSet(),now=Date.now();let earned=0,firstEarned=0,firstMax=0;
  for(const q of set.questions){
    if(!a.first[q.slot])check(q.slot,false);
    else a.checks[q.slot]??=1;
    earned+=markQuestion(q,a.answers[q.slot]).reduce((s,r)=>s+r.earned,0);
    const first=a.first[q.slot];if(!first.assisted)for(const r of first.results){firstEarned+=r.earned;firstMax+=r.max;}
  }
  a.finished=now;a.outcome=outcome;
  const stop=outcome==='expired'?a.deadline:now;
  const record={id:a.id,code:a.code,type:set.type,focus:set.focus,finished:now,earned,max:set.total,percentage:Math.round(earned/set.total*100),seconds:Math.max(0,Math.round((stop-a.origin)/1000)),totalSeconds:Math.max(0,Math.round((stop-a.started)/1000)),attemptChecks:Object.values(a.checks).reduce((s,n)=>s+n,0),assisted:Object.keys(a.hints).length>0||Object.keys(a.reveals).length>0,outcome,firstEarned,firstMax};
  data.history=appendAttempt(data.history,record);persist();render();if(location.hash.startsWith('#set=')&&outcome==='submitted')$('#submit-result')?.focus();toast(`${outcome==='expired'?'Time’s up. ':''}${record.percentage}%. ${storageOK?'Result saved.':'Export to keep your result.'}`);
}
function tick(){
  const a=data.active;if(!a)return;
  const state=deadlineState(a);
  if(!a.finished&&state.expired){submit('expired');return;}
  const el=$('#timer');if(!el)return;
  if(a.finished){el.textContent=a.deadline?'Finished':'Untimed';return;}
  el.textContent=state.remaining===null?'Untimed':duration(state.remaining);
  el.classList.toggle('warning',state.remaining!==null&&state.remaining<=60);
  if(state.remaining!==null&&state.remaining<=60&&!a.warned){a.warned=true;persist();toast('One minute or less remaining. Your answers will submit automatically.');}
}
async function copy(value){try{await navigator.clipboard.writeText(value);toast('Copied.');}catch{const dialog=document.createElement('dialog');dialog.innerHTML=`<h2>Copy this code or link</h2><input aria-label="Text to copy" value="${esc(value)}" style="width:100%"><form method="dialog"><button>Close</button></form>`;document.body.append(dialog);dialog.onclose=()=>dialog.remove();dialog.showModal();dialog.querySelector('input').select();}}
function download(content,name,type){const url=URL.createObjectURL(new Blob([content],{type}));const link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function progress(){
  let rows=data.history.filter(r=>(filters.type==='all'||r.type===Number(filters.type))&&(filters.focus==='all'||r.focus===filters.focus)&&(!filters.from||r.finished>=new Date(`${filters.from}T00:00:00`).getTime())&&(!filters.to||r.finished<new Date(`${filters.to}T23:59:59.999`).getTime()+1));
  rows.sort((a,b)=>filters.sort==='score'?b.percentage-a.percentage:filters.sort==='oldest'?a.finished-b.finished:b.finished-a.finished);
  const average=rows.length?Math.round(rows.reduce((s,r)=>s+r.percentage,0)/rows.length):0,priority=priorities(rows);
  const select=(key,options)=>`<select id="filter-${key}">${options.map(([v,l])=>`<option value="${v}" ${filters[key]===v?'selected':''}>${esc(l)}</option>`).join('')}</select>`;
  main.innerHTML=`<a href="#home" class="back">← All activities</a><div class="page-top"><div><div class="eyebrow">A little better, every time</div><h1>My progress</h1><p class="muted">Your practice, saved on this browser. Export regularly to your student OneDrive.</p></div><div class="code-actions"><button id="export-csv">Export CSV</button><button id="export-backup">Save backup</button><button id="import-backup">Restore backup</button><input type="file" id="backup-file" accept="application/json,.json" hidden></div></div>
  <div class="filters"><label>Type${select('type',[['all','All types'],...types.map((t,i)=>[String(i),t.name])])}</label><label>Focus${select('focus',[['all','All focuses'],...Object.entries(focusNames)])}</label><label>From<input type="date" id="filter-from" value="${filters.from}"></label><label>To<input type="date" id="filter-to" value="${filters.to}"></label><label>Sort${select('sort',[['newest','Newest first'],['oldest','Oldest first'],['score','Highest score']])}</label></div>
  <section class="progress-summary" style="margin-top:1.5rem"><div class="stat"><strong>${rows.length}</strong><span>Completed activities</span></div><div class="stat"><strong>${rows.length?average+'%':'—'}</strong><span>Average final score</span></div><div class="stat"><strong>${Math.round(rows.reduce((s,r)=>s+r.seconds,0)/60)}</strong><span>Minutes of practice</span></div></section>
  <section class="progress-panel"><h2>What to practise next</h2><p class="muted" style="font-size:.8rem">First responses from your latest five eligible attempts per focus. Hints and reveals before a first check are excluded. Puzzles are for practice and fun.</p>${priority.length?priority.map(p=>`<div class="priority-row"><span>${esc(focusNames[p.focus]??p.focus)}</span><meter min="0" max="100" value="${p.score}" aria-label="${esc(p.focus)} first-response score">${p.score}%</meter><strong>${p.score}%</strong><small>${p.count<3?'Limited evidence':`${p.count} attempts`}</small></div>`).join(''):'<p class="muted">Complete an exam or programming activity to start finding your revision priorities.</p>'}</section>
  ${rows.length?`<section class="progress-panel"><h2>Score over time</h2><div class="chart" role="img" aria-label="Final scores for up to 12 recent activities, oldest to newest. Exact scores and dates are in the table below.">${[...rows].sort((a,b)=>a.finished-b.finished).slice(-12).map(r=>`<div class="chart-column"><span>${r.percentage}%</span><div class="chart-bar" style="height:${Math.max(2,r.percentage)}%"></div></div>`).join('')}</div><div class="history-wrap"><table class="history"><caption>Activity history · final scores include retries within an activity</caption><thead><tr><th>Date</th><th>Activity / focus</th><th>Code</th><th>Score</th><th>Time</th><th>Checks</th><th>Practice</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(new Date(r.finished).toLocaleString('en-GB',{dateStyle:'short',timeStyle:'short'}))}</td><td>${types[r.type].name}<br><span class="muted">${esc(focusNames[r.focus])}</span></td><td><button class="subtle history-code" data-code="${esc(r.code)}"><code>${esc(r.code)}</code></button></td><td><strong>${r.percentage}%</strong><br>${r.earned}/${r.max}</td><td>${duration(r.seconds)}</td><td>${r.attemptChecks}</td><td>${r.assisted?'Assisted':'Independent'}${r.outcome==='expired'?'<br>Timer expired':''}</td></tr>`).join('')}</tbody></table></div></section>`:'<div class="empty-state"><h2>No results here yet.</h2><p class="muted">Try an activity, or adjust your filters.</p><a href="#home">Find an activity →</a></div>'}
  <p class="muted" style="font-size:.8rem">CSV is for viewing in a spreadsheet. Use Save backup / Restore backup to move your complete history between browsers. CSV import is planned for a later release.</p>`;
  for(const key of Object.keys(filters))$(`#filter-${key}`).onchange=e=>{filters[key]=e.target.value;progress();$(`#filter-${key}`).focus();};
  $('#export-csv').onclick=()=>download(exportCSV(data.history),'starter-progress.csv','text/csv;charset=utf-8');
  $('#export-backup').onclick=()=>download(JSON.stringify({schema:1,history:data.history},null,2),'starter-progress-backup.json','application/json');
  $('#import-backup').onclick=()=>$('#backup-file').click();
  $('#backup-file').onchange=async e=>{
    try{
      const file=e.target.files[0];if(!file)return;if(file.size>5000000)throw Error('Backup is too large (maximum 5 MB).');
      const imported=JSON.parse(await file.text());
      if(imported.schema!==1||!Array.isArray(imported.history)||imported.history.length>10000)throw Error('Unsupported backup format.');
      let added=0,duplicate=0;let next=[...data.history];
      for(const r of imported.history){
        const set=resolve(r.code);
        if(typeof r.id!=='string'||r.id.length>100||r.type!==set.type||r.focus!==set.focus||r.max!==set.total||!Number.isFinite(r.finished)||!Number.isFinite(new Date(r.finished).getTime())||!Number.isFinite(r.seconds)||r.seconds<0||!Number.isInteger(r.earned)||r.earned<0||r.earned>r.max||r.percentage!==Math.round(r.earned/r.max*100)||!Number.isInteger(r.firstMax)||r.firstMax<0||r.firstMax>r.max||!Number.isInteger(r.firstEarned)||r.firstEarned<0||r.firstEarned>r.firstMax||!Number.isInteger(r.attemptChecks)||r.attemptChecks<0||typeof r.assisted!=='boolean'||!['submitted','expired'].includes(r.outcome))throw Error('Backup contains an invalid result. Nothing was imported.');
        const old=next.find(a=>a.id===r.id);
        if(old){if(JSON.stringify(old)!==JSON.stringify(r))throw Error('A result conflicts with this browser’s history. Nothing was imported.');duplicate++;}else{next.push(r);added++;}
      }
      data.history=next;persist();progress();toast(`${added} results restored; ${duplicate} duplicates skipped.`);
    }catch(error){toast(error.message);}
  };
  main.querySelectorAll('.history-code').forEach(b=>b.onclick=()=>{try{start(resolve(b.dataset.code));}catch(e){toast(e.message);}});
}
function render(){
  const route=location.hash;
  $('#nav-home').setAttribute('aria-current',route==='#progress'?'false':'page');
  $('#nav-progress').setAttribute('aria-current',route==='#progress'?'page':'false');
  if(!route.startsWith('#set='))submittedAttemptId=null;
  if(route==='#progress'){progress();return;}
  if(route.startsWith('#set=')){
    try{
      const code=decodeURIComponent(route.slice(5)),set=resolve(code);
      if(data.active?.code===set.code){activity();return;}
      // External links are explicit navigation; preserve unfinished work until confirmed.
      home();start(set).then(()=>{if(data.active?.code!==set.code)navigate('#home');});return;
    }catch(e){home();$('#code-error').textContent=e.message;return;}
  }
  home();
}
try{
  if(data.active){
    resolve(data.active.code);
    if(!data.active.finished&&deadlineState(data.active).expired)submit('expired');
    else if(!data.active.finished&&Date.now()-data.active.saved>45*60000){data.active=null;persist();toast('Your previous untimed activity was inactive for over 45 minutes. Start a fresh attempt.');}
  }
}catch{data.active=null;persist();toast('The unfinished activity could not be restored. Your completed history is still available.');}
$('#global-code-form').onsubmit=async e=>{
  e.preventDefault();
  const error=$('#global-code-error');error.textContent='';
  try{
    const set=resolve(new FormData(e.target).get('code'));
    await start(set);
    if(data.active?.code===set.code)e.target.reset();
  }catch(err){error.textContent=err.message;}
};
window.addEventListener('hashchange',()=>{render();main.focus();});
window.addEventListener('pagehide',()=>{if(data.active&&!data.active.finished){data.active.saved=Date.now();persist();}});
window.addEventListener('visibilitychange',()=>{if(!document.hidden)tick();});
setInterval(tick,1000);
render();
