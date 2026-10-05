import {initialisePractice,settlePractice,engagePractice,notePracticeInteraction,pollPractice,INTERACTION_POLL_MS,pausePractice,practiceSeconds,validPracticeTime,backupFilename} from './practice-time.js';
import {lastTracked,weeklyProgress,averageSetPercentage} from './weekly-progress.js';
import {profiles,loadProfile,saveProfile,selectProfile,activateProfile,nameMatch,normaliseName} from './profiles.js';
import {revisionPriorities,updateRecommendations} from './revision.js';
import {bankRelease,CODE_FORMAT} from './bank-release.js';
import {generationLabel,sameGeneration} from './progress-generation.js';
import {examSections,isExamBank} from './exam-sections.js';
import {pageStatus,developmentNotice} from './page-status.js';
import {hasRecentSubmission} from './review.js';
import {initTheme} from './theme.js';
import {puzzleCards} from './puzzle-cards.js';
import {revealPart} from './packed-data.js';
import {formatCoverage} from './coverage.js';
import {challengeKinds as interactiveKinds} from './challenge-rules.js';
import {renderChallenge as renderPuzzle,bindChallenges as bindPuzzles} from './challenge-controls.js';
import {banks, types, focuses, focusNames, espRecipeNames, resolve, choose, marks, historicalSet, recordedSet, contentChanged, ensureBank, loadSet, challengeLevels, challengeLabel, availableChallenges, puzzlePool, examSubtopics, nextExamSubtopic, matchesSubtopic, hasAlternativeExamSet} from './bank.js';
import {hasUnsubmittedAnswers} from './unsent-answers.js';
import {codeDiagnostics} from './code-diagnostics.js';
import {openIssueReport} from './issue-report.js';
import {encode, questionCode, BANK_VERSION} from './codes.js';
import {markQuestion} from './marking.js';
import {loadStorage, migrateStoredCodes, deadlineState, exportCSV, attemptEligibility, recordPractice, REATTEMPT_HOURS, partScores, validatePartScores} from './progress.js';

const $=s=>document.querySelector(s);
const main=$('#main');
initTheme($('#theme-toggle'));
$('#build-info').textContent=`Build ${new URL(import.meta.url).pathname.split('/').pop()} · bank ${BANK_VERSION}`;
function showCodeError(element,input,error){
  element.textContent=error.message;
  element.reportDiagnostics=codeDiagnostics(input,error,{pageURL:location.href,scriptURL:import.meta.url,browser:navigator.userAgent});
  const button=document.createElement('button');button.type='button';button.textContent='Copy error details';button.className='subtle code-diagnostics';
  button.onclick=()=>copy(JSON.stringify(codeDiagnostics(input,error,{pageURL:location.href,scriptURL:import.meta.url,browser:navigator.userAgent}),null,2));
  element.append(' ',button);
  if(error.replacement){
    const replacement=document.createElement('button');replacement.type='button';replacement.textContent='Choose a replacement set';
    replacement.onclick=async()=>{try{
      const {type,focus}=error.replacement;await ensureBank(type);
      await start(choose(type,focuses(type).includes(focus)?focus:focuses(type)[0]));
    }catch(e){toast(e.message);}};
    element.append(' ',replacement);
  }
}
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
$('#report-issue').onclick=()=>{
  const set=$('#display-code')?activeSet():null;
  const error=[...document.querySelectorAll('#code-error, #global-code-error')].find(el=>el.textContent&&el.getClientRects().length);
  openIssueReport({
    questions:set?set.questions.map((q,i)=>({number:i+1,title:q.title,code:questionCode(set.type,q.slot,q.variation,set.version)})):[],
    setCode:set?.code,page:`${location.origin}${location.pathname}${set?'#set='+set.code:location.hash==='#progress'?'#progress':'#home'}`,
    build:$('#build-info').textContent,browser:navigator.userAgent,time:new Date().toISOString(),error:error?.reportDiagnostics
  });
};
let data={schema:1,active:null,history:[]};
let storageOK=true;
let toastTimer;
const canReview=()=>hasRecentSubmission(data.active);
let priorityLevel='topic';
let filters={type:'all',focus:'all',from:'',to:'',sort:'newest'};
function storageError(){storageOK=false;$('#storage-warning').hidden=false;$('#storage-warning').textContent='Progress could not be saved on this browser. You can keep practising. Export a backup from My progress to keep your results.';}
try{data=profiles().current?loadProfile(profiles().current):loadStorage();if(data.active?.migratedCodeFrom){if(location.hash===`#set=${encodeURIComponent(data.active.migratedCodeFrom)}`)history.replaceState(null,'',`#set=${encodeURIComponent(data.active.code)}`);delete data.active.migratedCodeFrom;}if(data.active){try{historicalSet(data.active.code);}catch{data.active=null;saveProfile(data);}}}catch{storageError();}
function persist(){if(data.active&&!data.active.finished)settlePractice(data.active);try{saveProfile(data);}catch{storageError();}if(data.username)profileHeader();}
function profileHeader(){
  let el=$('#profile-welcome');
  if(!el){el=document.createElement('div');el.id='profile-welcome';$('.site-header').append(el);}
  const last=lastTracked(data.history);
  el.innerHTML=`<span>Welcome back ${esc(data.username??'')}</span> <button class="subtle" id="switch-profile">Not you?</button><small class="last-tracked">${last===null?'No tracked practice yet':`Last tracked: ${esc(new Date(last).toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'short'}))}`}</small>`;
  $('#switch-profile').onclick=()=>chooseProfile(true);
}
function chooseProfile(switching=false){
  if(data.active&&!data.active.finished){pausePractice(data.active);persist();}
  return new Promise(resolve=>{
    const dialog=document.createElement('dialog');dialog.setAttribute('aria-labelledby','profile-title');
    dialog.innerHTML=`<h2 id="profile-title">Your progress profile</h2><p>Enter your name to keep your progress on this computer. Export regularly to your student OneDrive.</p><form><label for="profile-name">Your name</label><input id="profile-name" name="username" maxlength="80" required autocomplete="name"><p id="profile-message" role="status"></p><div class="actions"><button class="primary" type="submit">Continue</button>${switching?'<button type="button" id="profile-cancel">Cancel</button>':''}</div></form>`;
    document.body.append(dialog);dialog.showModal();
    dialog.oncancel=e=>{if(!switching)e.preventDefault();};dialog.onclose=()=>{dialog.remove();if(practiceVisible())engagePractice(data.active);resolve();};
    dialog.querySelector('#profile-cancel')?.addEventListener('click',()=>dialog.close());
    const finish=name=>{
      try{persist();data=selectProfile(name);}catch{storageError();data={schema:1,active:null,history:[],username:name};}
      filters={type:'all',focus:'all',from:'',to:'',sort:'newest'};profileHeader();dialog.close();
      if(switching){history.replaceState(null,'','#home');main.innerHTML='';render();}
    };
    dialog.querySelector('form').onsubmit=e=>{
      e.preventDefault();const name=normaliseName(dialog.querySelector('input').value);if(!name)return;
      let names=[];try{names=profiles().names;}catch{storageError();}
      const match=nameMatch(name,names);
      if(match.suggestion){
        const message=dialog.querySelector('#profile-message');
        message.innerHTML=`Did you mean <strong>${esc(match.suggestion)}</strong>? <button type="button" id="use-match">Yes, use this profile</button> <button type="button" id="use-entered">No, use ${esc(name)}</button>`;
        message.querySelector('#use-match').onclick=()=>finish(match.suggestion);
        message.querySelector('#use-entered').onclick=()=>finish(name);
      }else finish(match.exact??name);
    };
  });
}
function revisionAreas(level){
  return level==='subtopic'?focuses(1).flatMap(parent=>examSubtopics(parent).map(({reference})=>({type:1,focus:reference,parent}))):[1,2].flatMap(type=>focuses(type).map(focus=>({type,focus})));
}
function toast(message){$('#toast').textContent=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').textContent='',4500);}
function activeSet(){return data.active?{...resolve(data.active.code),examSubtopic:data.active.examSubtopic??'all'}:null;}
function navigate(hash){if(location.hash===hash)render();else location.hash=hash;}
function setHash(code){history.replaceState(null,'',`#set=${encodeURIComponent(code)}`);}
function duration(seconds){const s=Math.max(0,Math.floor(seconds));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
function needsLeaveWarning(){return Boolean($('#display-code'))&&hasUnsubmittedAnswers(data.active,activeSet());}
let leaveDecision=null;
function askLeave(){
  if(!needsLeaveWarning()) return Promise.resolve(true);
  if(leaveDecision)return leaveDecision;
  leaveDecision=new Promise(resolveAnswer=>{
    const dialog=document.createElement('dialog');
    dialog.innerHTML='<h2>Leave unsubmitted answers?</h2><p>You have entered answers but have not submitted this activity. You can keep working and submit them first.</p><div class="actions"><button value="stay">Keep working</button><button class="primary" value="leave">Leave activity</button></div>';
    document.body.append(dialog);dialog.addEventListener('click',e=>{if(e.target.matches('button'))dialog.close(e.target.value);});
    dialog.addEventListener('cancel',e=>{e.preventDefault();dialog.close('stay');});
    dialog.addEventListener('close',()=>{const yes=dialog.returnValue==='leave';dialog.remove();leaveDecision=null;resolveAnswer(yes);});dialog.showModal();
  });
  return leaveDecision;
}
async function start(set,{force=false,challengeLevel=null,inSequence=false}={}){
  if(!force && !await askLeave())return;
  if(data.active&&!data.active.finished){pausePractice(data.active);persist();}
  if(set.type===0){const levels=new Set(set.questions.map(q=>q.challengeLevel));data.puzzleChallenge=challengeLevel??(levels.size===1?[...levels][0]:'all');}
  const now=Date.now();
  clearTimeout(toastTimer);$('#toast').textContent='';
  data.active={generation:bankRelease.generation,bankVersion:BANK_VERSION,id:crypto.randomUUID(),contentVersion:BANK_VERSION,code:set.code,mathsTopic:set.mathsTopic??'all',examSubtopic:set.type===1?(set.examSubtopic??'all'):'all',inSequence:set.type===1&&inSequence,answers:{},checks:{},first:{},hints:{},reveals:{},started:now,origin:now,saved:now,deadline:set.minutes?now+set.minutes*60000:null,finished:null,outcome:null,timingEvents:[],tracking:attemptEligibility(data,set.code,now)};
  initialisePractice(data.active,now);
  persist();setHash(set.code);render();main.focus();
}
function home(){
  $('.global-code-entry').hidden=true;
  const completed=data.history.length;
  main.innerHTML=`<section class="hero"><div><div class="eyebrow">A little practice goes a long way</div><h1>Start small.<br><em>Think bigger.</em></h1><p>Get your brain into gear with a quick puzzle, a little Core revision, a Python challenge or ESP practice.</p><div class="meta-row"><span>5–15 minutes</span><span>Instant feedback</span><span>Your own pace</span></div></div><aside class="code-entry"><div class="eyebrow">Got a code from your teacher?</div><h2>Jump straight in.</h2><p>Open the exact same questions, ready to go.</p><form id="code-form"><input name="code" aria-label="Question or set code" placeholder="Enter your code" autocomplete="off" autocapitalize="off" spellcheck="false" required><button type="submit">Open <span aria-hidden="true">↗</span></button></form><p class="error" id="code-error" role="alert"></p><small>9 characters · capitals matter · optional timer character</small></aside></section>
  <div class="section-heading"><h2>What will you try today?</h2><span>Pick an activity to get started</span></div>
  <section class="activity-grid" aria-label="Activity types">${types.slice(0,3).map((t,i)=>`<article class="type-card type-${i}"><div class="card-art" aria-hidden="true">${i===0?'<div class="mini-grid"><span>2</span><span>5</span><span>7</span><span>3</span><span>?</span><span>9</span><span>5</span><span>11</span><span>16</span></div>':i===1?'<div class="art-lines"><span>○ &nbsp; identify</span><span>● &nbsp; understand</span><span>○ &nbsp; explain</span></div>':i===3?'<div class="art-lines"><span>▦ &nbsp; plan</span><span>✓ &nbsp; test</span><span>≡ &nbsp; explain</span></div>':'<div class="art-code">for idea in ideas:<br>&nbsp; &nbsp; give_it_a_go()</div>'}</div><div class="card-body"><div class="eyebrow">0${i+1} / ${t.label}</div><h3>${t.name}</h3><p>${i===1?'Core exam questions and ESP tasks. Practise knowledge and apply your skills.':t.description}</p><div class="card-bottom"><small>${i===1?'Core papers and ESP':i===2?'2 challenges · 12 marks':i===3?'3 questions · up to 5 minutes each':'3 puzzles · choose your pace'}</small><button data-start="${i}" aria-label="Start ${t.name}">Let’s go <span aria-hidden="true">↗</span></button></div></div></article>`).join('')}</section>
  <section class="lower-panel"><div class="note-panel"><span class="note-icon" aria-hidden="true">↗</span><div><h3>${completed?`${completed} ${completed===1?'activity':'activities'} completed. Keep building.`:'Small steps add up.'}</h3><p>See your results and find out what to practise next.</p></div><a href="#progress">My progress →</a></div><div class="note-panel"><span class="note-icon" aria-hidden="true">◷</span><div><h3>No rush. Unless you want one.</h3><p>Practise at your pace, or add a timer for a challenge.</p></div></div></section>
  ${data.active&&!data.active.finished?`<p class="muted" style="margin-top:1.5rem">You have an unfinished activity. <a href="#set=${encodeURIComponent(data.active.code)}">Continue ${esc(data.active.code)}</a></p>`:''}`;
  $('#code-form').onsubmit=async e=>{e.preventDefault();const input=new FormData(e.target).get('code');$('#code-error').textContent='';try{await start(await loadSet(input));}catch(error){showCodeError($('#code-error'),input,error);}};
  main.querySelectorAll('[data-start]').forEach(b=>b.onclick=async()=>{try{if(b.dataset.start==='1'){navigate('#exam');return;}await ensureBank(Number(b.dataset.start));await start(choose(Number(b.dataset.start),focuses(Number(b.dataset.start))[0]),{challengeLevel:'all'});}catch(e){toast(e.message);}});
}
function examHome(){
  $('.global-code-entry').hidden=false;
  main.innerHTML=`<a href="#home" class="back">← All activities</a><div class="page-top"><div><h1>Exam practice</h1><p class="muted">Choose Core paper questions or Employer Set Project (ESP) practice.</p></div></div><section class="exam-options" aria-label="Exam practice options">${examSections.map(section=>`<article class="note-panel"><div><h2>${esc(section.title)}</h2><p>${esc(section.description)}</p><button class="primary" data-exam-start="${section.bankType}">${esc(section.action)} <span aria-hidden="true">↗</span></button></div></article>`).join('')}</section>`;
  main.querySelectorAll('[data-exam-start]').forEach(button=>button.onclick=async()=>{try{const type=Number(button.dataset.examStart);await ensureBank(type);await start(choose(type,focuses(type)[0]));}catch(error){toast(error.message);}});
}
function stimulus(q){
  if(q.sheet){
    const entries=Object.keys(q.sheet.cells),colNo=s=>[...s].reduce((n,c)=>n*26+c.charCodeAt(0)-64,0);
    const lastRow=Math.max(...entries.map(k=>Number(k.match(/\d+$/)[0]))),lastCol=Math.max(...entries.map(k=>colNo(k.match(/^[A-Z]+/)[0])));
    const cols=Array.from({length:lastCol},(_,i)=>String.fromCharCode(65+i));
    return `<div class="grid-wrap"><table class="puzzle-grid spreadsheet"><caption>${esc(q.title)} · spreadsheet extract</caption><thead><tr><th scope="col">Cell</th>${cols.map(c=>`<th scope="col">${c}</th>`).join('')}</tr></thead><tbody>${Array.from({length:lastRow},(_,r)=>`<tr><th scope="row">${r+1}</th>${cols.map(c=>{const key=c+(r+1),value=q.sheet.cells[key]??'',format=q.sheet.formats?.[key];return `<td title="${key}${q.sheet.formulas?.[key]?' '+esc(q.sheet.formulas[key]):''}">${esc(format==='percent'?Number(value)*100+'%':format==='money'?Number(value).toFixed(2):value)}</td>`;}).join('')}</tr>`).join('')}</tbody></table><p class="muted">Use the displayed cell addresses. Supported: =, +, −, *, / by a number, brackets, SUM and SUMIF; $ fixes a row or column. Equivalent formulas are accepted. Unsupported formulas need review and receive no automatic credit.</p></div>`;
  }
  if(q.code)return `<pre class="code-panel" tabindex="0" aria-label="Python code"><code>${esc(q.code)}</code></pre>`;
  if(q.grid)return `<div class="grid-wrap"><table class="puzzle-grid"><caption>${esc(q.title)}</caption><thead><tr><th scope="col">Row</th>${q.grid.headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${q.grid.rows.map((row,i)=>`<tr><th scope="row">${i+1}</th>${row.map(v=>`<td${v===null?' class="missing"':''}>${v===null?'<span aria-label="Missing value">?</span>':v}</td>`).join('')}</tr>`).join('')}</tbody>${q.grid.footer?`<tfoot><tr><th scope="row">Column<br>total</th>${q.grid.footer.map(v=>`<td>${v}</td>`).join('')}</tr></tfoot>`:''}</table></div>`;

  if(q.clues)return `<aside class="logic-clues"><h3>Your clues</h3><ol>${q.clues.map(clue=>`<li>${esc(clue)}</li>`).join('')}</ol></aside>`;
  return '';
}
function espReviewHTML(q,a){
  if(!q.review)return '';
  const saved=a.answers[q.slot]?.reflection??'';
  return `<section class="esp-review"><h3>Written reasoning · separate review</h3><label for="review-${q.slot}">${esc(q.review.prompt)}</label><textarea id="review-${q.slot}" data-slot="${q.slot}" data-part="reflection" maxlength="1200" rows="3" ${a.finished?'disabled':''}>${esc(saved)}</textarea><p class="muted">This response is not automatically marked. Automatic marks do not assess your written reasoning.</p>${a.finished?`<details><summary>Review criteria and example</summary><ul>${q.review.criteria.map(c=>`<li>${esc(c)}</li>`).join('')}</ul><p>${esc(q.review.example)}</p></details><label>Review status <select data-review-status="${q.slot}">${['Needs review','Self-reviewed','Teacher-reviewed'].map(status=>`<option ${((a.espReview??{})[q.slot]?.status??'Needs review')===status?'selected':''}>${status}</option>`).join('')}</select></label><small>A recorded review status is not a grade or verified teacher approval.</small>`:''}</section>`;
}
function questionHTML(q,index,set){
  const a=data.active,answers=a.answers[q.slot]??{}, results=canReview()&&a.checks[q.slot]&&(!a.feedbackHidden?.[q.slot]||a.finished)?markQuestion(q,answers):null;
  const locked=Boolean(a.finished);
  const subtopic=set.type===1?(a.examSubtopic??'all'):'all';
  const matchCount=subtopic==='all'?0:q.parts.filter(p=>matchesSubtopic(p,subtopic)).length;
  return `<article class="question type-${set.type}" data-question="${q.slot}"><div class="question-top"><span class="question-number">${String(index+1).padStart(2,'0')}</span><div><h2>${esc(q.title)}</h2><div class="muted">${esc(q.format)}${set.type===0?` · ${esc(challengeLabel(q.challengeLevel,q.focus))}`:''} · <span title="Individual question code">${questionCode(set.type,q.slot,q.variation,set.version)}</span>${q.tags.filter(t=>t.startsWith('CA')).length?` · ${q.tags.filter(t=>t.startsWith('CA')).join(', ')}`:''}</div></div><span class="marks-badge">${marks(q)} ${set.type===0?'points':'marks'}</span></div><p class="question-prompt">${esc(q.prompt)}</p>${subtopic!=='all'?`<p class="subtopic-context">${matchCount?`Includes ${esc(subtopic)} · ${matchCount} matching ${matchCount===1?'part':'parts'}`:`Related practice from ${esc(set.focus)}`}</p>`:''}${q.source?`<p class="muted"><a href="${esc(q.source.url)}" target="_blank" rel="noopener noreferrer">Puzzle source</a> · ${esc(q.source.note)}</p>`:''}<div class="question-layout ${q.code||q.grid||q.sheet||q.clues?'':'no-stimulus'}">${stimulus(q)}<div class="parts">${q.parts.map((p,j)=>{
    const id=`answer-${q.slot}-${p.id}`,answer=answers[p.id]??'',result=results?.[j];
    const outcome=result?(result.needsReview?'review':result.earned===result.max?'correct':result.earned>0?'partial':'incorrect'):'';
    const outcomeAttribute=outcome?` data-result="${outcome}"`:'';
    const codeBlock=p.code?`<pre class="code-panel part-code" tabindex="0" aria-label="Python code for part ${j+1}"><code>${esc(p.code)}</code></pre>`:'';
    const label=`${subtopic!=='all'&&matchesSubtopic(p,subtopic)?`<span class="subtopic-match">Selected subtopic · ${esc(subtopic)}</span> `:''}<span class="part-label">${String.fromCharCode(97+j)})</span> ${esc(p.prompt)} <span class="part-marks">(${p.marks})</span>`;
    const input=(interactiveKinds.includes(p.kind)||p.kind==='board')?`<div class="part interactive-part"${outcomeAttribute}>${renderPuzzle(p,answer,locked,q.slot,q.board)}`:p.options?`<fieldset class="part"${outcomeAttribute} ${locked?'disabled':''}><legend>${label}</legend>${codeBlock}<div class="options ${p.kind==='board'?'board-options':''}">${p.options.map((option,k)=>`<label class="option"><input type="radio" name="${id}" value="${esc(option)}" data-slot="${q.slot}" data-part="${p.id}" ${answer===option?'checked':''}>${p.kind==='board'?`<span>Row ${option[0]}<br>Col ${option[2]}</span>`:esc(option)}</label>`).join('')}</div>`:`<div class="part"${outcomeAttribute}><label for="${id}">${label}</label>${codeBlock}${p.kind==='algebra'?`<small id="format-${q.slot}-${p.id}">Use ${esc(p.variables.join(', '))}; write powers as x^2 and fractions with /. ${p.equivalentMarks?'Equivalent unfinished expressions can earn partial credit.':''}</small>`:''}<input id="${id}" data-slot="${q.slot}" data-part="${p.id}" value="${esc(answer)}" ${locked?'disabled':''} ${p.kind==='number'?'inputmode="decimal"':''} autocomplete="off" autocapitalize="off" spellcheck="false" ${result||p.kind==='algebra'?`aria-describedby="${[p.kind==='algebra'?`format-${q.slot}-${p.id}`:'',result?`feedback-${q.slot}-${j}`:''].filter(Boolean).join(' ')}"`:''}>`;
    return input+(p.coverage?.length?`<details class="part-coverage"><summary>Spec reference</summary><small>${esc(formatCoverage(p.coverage))}${p.coverageMode==='practice'?' · Supporting practice':''}</small></details>`:'')+(result?`<p id="feedback-${q.slot}-${j}" class="feedback ${outcome}">${result.earned}/${result.max} · ${esc(result.message)}</p>`:'')+(p.options&&!interactiveKinds.includes(p.kind)&&p.kind!=='board'?'</fieldset>':'</div>');
  }).join('')}</div></div>${espReviewHTML(q,a)}<div class="question-actions"><button class="subtle" data-hint="${q.slot}" ${a.hints[q.slot]?'disabled':''}>${a.hints[q.slot]?'Hint shown':'Show hint'}</button>${canReview()?`<button data-check="${q.slot}">Check answer</button><button class="subtle" data-reveal="${q.slot}" ${a.reveals[q.slot]?'disabled':''}>${a.reveals[q.slot]?'Answer shown':'Show answer'}</button>`:''}${a.hints[q.slot]||a.reveals[q.slot]?'<small>Assisted practice</small>':''}</div>${a.hints[q.slot]?`<p class="hint-text"><strong>Hint:</strong> ${esc(q.hint)}</p>`:''}${canReview()&&a.reveals[q.slot]?`<div class="solution"><h3>Answers and explanations</h3><ol class="solution-list" role="list">${q.parts.map(revealPart).map((p,j)=>`<li class="solution-part"><p class="solution-answer"><span class="part-label">${String.fromCharCode(97+j)})</span> <strong>${esc(p.solutionText??p.answer)}</strong></p><p class="solution-explanation">${esc(p.explanation)}</p>${interactiveKinds.includes(p.kind)?renderPuzzle(p,p.answer,true,q.slot):''}</li>`).join('')}</ol></div>`:''}</article>`;
}
function activity(){
  $('.global-code-entry').hidden=false;
  const set=activeSet(),a=data.active;
  if(!set){home();return;}
  if(!a.finished&&!document.hidden&&!document.querySelector('dialog[open]')&&$('#display-code')?.textContent!==a.code)engagePractice(a);
  const record=a.result??data.history.find(r=>r.id===a.id);
  a.tracking??={...attemptEligibility({...data,history:data.history.filter(r=>r.id!==a.id)},a.code,a.started),...(record?{eligible:true}:{})};
  const untracked=!a.tracking.eligible;
  const trackingNotice=untracked?`<p class="tracking-notice" role="status">You attempted this set ${Math.max(0,(a.tracking.checkedAt-a.tracking.previous)/3600000).toFixed(1)} hours ago. To have your progress tracked, wait at least ${REATTEMPT_HOURS} hours between reattempts. You can practise now, but this attempt will not update your progress.</p>`:'';
  const level=set.type===0?(data.puzzleChallenge??'all'):'all';
  const subtopic=set.type===1?(a.examSubtopic??'all'):'all';
  const mathsTopic=set.type===0&&set.focus==='classic maths'?(a.mathsTopic??'all'):'all';
  const inSequence=set.type===1&&Boolean(a.inSequence);
  const nextSubtopic=inSequence?nextExamSubtopic(set.focus,subtopic):null;
  const matchingQuestions=subtopic==='all'?0:set.questions.filter(q=>q.parts.some(p=>matchesSubtopic(p,subtopic))).length;
  const sameFocusAlternatives=set.type===1?hasAlternativeExamSet(set,subtopic):(set.type===0?puzzlePool(set.focus,level,mathsTopic):banks[set.type].filter(q=>q.focus===set.focus&&!q.retired)).length>set.questions.length;
  main.innerHTML=`<a href="${isExamBank(set.type)?'#exam':'#home'}" class="back">← ${isExamBank(set.type)?'Exam practice':'All activities'}</a><div class="page-top"><div><div class="eyebrow">${types[set.type].name} / ${set.questions.length===1?'Single question':'Starter set'}</div><h1>${esc(focusNames[set.focus])}</h1>${pageStatus[set.type]?.inDevelopment?`<p class="development-notice" role="note">${esc(developmentNotice)}</p>`:''}<p class="muted">${set.questions.length} ${set.questions.length===1?'question':'questions'} · ${set.total} ${set.type===0?'points':'marks'} · ${set.type===3?'Up to':'About'} ${set.questions.length===1?(set.questions[0].estimatedMinutes??types[set.type].minutes):types[set.type].minutes} minutes</p></div><div class="focus-row">${set.type===0?'':`<span class="primary-focus-controls"><label for="focus">${set.type===1?'Topic':'Focus'}</label><select id="focus">${focuses(set.type).map(f=>`<option value="${f}" ${f===set.focus?'selected':''}>${esc(focusNames[f])}</option>`).join('')}</select></span>`}${set.type===3?`<span class="subtopic-controls"><label for="esp-recipe">Activity</label><select id="esp-recipe">${Object.entries(espRecipeNames).filter(([r])=>r.startsWith(set.focus==='task1'?'T1.':'T2.')).map(([r,label])=>`<option value="${r}" ${r===set.questions[0].recipe?'selected':''}>${esc(label)}</option>`).join('')}</select></span>`:''}${set.type===1?`<span class="subtopic-controls"><label for="subtopic">Subtopic</label><select id="subtopic"><option value="all">All subtopics</option>${examSubtopics(set.focus).map(({reference,count})=>`<option value="${reference}" ${reference===subtopic?'selected':''}>${reference} · ${count} ${count===1?'question':'questions'}</option>`).join('')}</select><label class="sequence-toggle"><input id="in-sequence" type="checkbox" aria-describedby="sequence-tooltip" ${inSequence?'checked':''}> In sequence<span class="sequence-tooltip" id="sequence-tooltip" role="tooltip">Advance new sets through subtopics in spec order.</span></label></span>`:''}${set.type===0&&set.focus==='classic maths'?`<label for="maths-topic">Maths topic</label><select id="maths-topic">${Object.entries({all:'All maths',algebra:'Algebra',number:'Number and measures'}).map(([key,label])=>`<option value="${key}" ${key===mathsTopic?'selected':''}>${label}</option>`).join('')}</select>`:''}${set.type===0?`<label for="challenge-level">Challenge</label><select id="challenge-level">${Object.entries(challengeLevels).map(([key,label])=>`<option value="${key}" ${key===level?'selected':''} ${availableChallenges(set.focus,mathsTopic).includes(key)?'':'disabled'}>${challengeLabel(key,set.focus)}${availableChallenges(set.focus,mathsTopic).includes(key)?'':' (not available)'}</option>`).join('')}</select>`:''}</div></div>
  ${set.type===0?puzzleCards(focuses(0),focusNames,set.focus):''}
  ${set.updated?'<p class="set-update-notice">This set has been updated since this code was created.</p>':''}
  ${trackingNotice}
  ${set.type===3?'<p class="esp-notice">Each question is independent and designed for no more than 5 minutes. Scores cover automatic checks only; written reasoning needs separate review. These are practice marks, not ESP grades.</p>':''}
  ${subtopic!=='all'?`<details class="subtopic-notice"><summary>In sequence questions info</summary><p>Primary focus: <strong>${esc(subtopic)}</strong>. ${matchingQuestions} of ${set.questions.length} questions match.${matchingQuestions<set.questions.length?` ${set.questions.length-matchingQuestions} ${set.questions.length-matchingQuestions===1?'question adds':'questions add'} related ${esc(set.focus)} practice.`:''} Matching parts are labelled; marks are tracked against each part’s spec references.</p></details>`:''}
  ${record?`<section class="result-banner" aria-label="Activity result"><span class="result-score">${record.percentage}%</span><div><h2>${record.outcome==='expired'?'Time’s up. Answers submitted.':'Activity complete.'}</h2><p>${record.earned}/${record.max} marks · ${record.engagedSeconds===undefined?'elapsed time':'estimated practice time'}: ${duration(practiceSeconds(record))}${record.assisted?' · Assisted practice':''}${untracked?' · Practice only — progress not updated':''}. ${canReview()?'Review your feedback below.':'Submit your saved answers to unlock review for another four hours.'}</p></div><button id="retry">Try this set again</button></section>`:''}
  <section class="set-toolbar" aria-label="Set code and timing"><div class="code-block"><div><div class="code-label">YOUR ${set.questions.length===1?'ACTIVITY':'SET'} CODE</div><div class="set-code" id="display-code">${esc(a.code)}</div></div><div class="code-actions"><button id="copy-code">Copy code</button><button id="copy-link">Copy link</button></div></div><div class="timer-controls"><span class="timer-display" id="timer">${a.deadline?'':'Untimed'}</span><label for="minutes">Timer</label><select id="minutes" ${a.finished?'disabled':''}>${Array.from({length:11},(_,i)=>i+5).map(m=>`<option value="${m}" ${m===(set.minutes??types[set.type].minutes)?'selected':''}>${m} min</option>`).join('')}</select><button id="timer-toggle" ${a.finished?'disabled':''}>${a.deadline?'Stop timer':'Start timer'}</button></div></section>
  <div class="random-controls"><button id="new-type" ${inSequence&&!nextSubtopic?'disabled title="End of available subtopics."':''}>${inSequence?'Next question set':'Get new question set ↗'}</button><button id="new-focus" ${inSequence&&!nextSubtopic?'disabled title="End of available subtopics."':!inSequence&&!sameFocusAlternatives?'disabled title="No other question combination matches this selection. Use Get new permutation."':''}>${inSequence?'Next set in sequence':subtopic==='all'?'New set in this focus':'New set with this subtopic'}</button><button id="permutation" ${set.questions.some(q=>q.variations.length<2)?'disabled title="This set includes a fixed problem. Choose a new set for different puzzles."':''}>Get new permutation ↻</button></div>
  <section class="questions" aria-label="Questions">${set.questions.map((q,i)=>questionHTML(q,i,set)).join('')}</section><div class="submit-bar">${record?`<div class="submit-result" id="submit-result" tabindex="-1" role="status"><strong>${record.percentage}%</strong><span>${record.earned}/${record.max} ${set.type===0?'points':'marks'} · ${record.engagedSeconds===undefined?'elapsed time':'estimated practice time'}: ${duration(practiceSeconds(record))}${record.assisted?' · Assisted practice':''}<br>${record.outcome==='expired'?'Time’s up. Answers submitted.':'Activity complete.'}</span></div>`:'<p>Try all questions, then submit your best try.</p>'}<button class="primary" id="submit" ${a.finished&&canReview()?'disabled':''}>${a.finished?(canReview()?'Submitted ✓':'Submit saved answers →'):'Submit set answers →'}</button></div>`;
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
    article.querySelectorAll('[data-result]').forEach(part=>part.removeAttribute('data-result'));
    a.feedbackHidden??={};a.feedbackHidden[el.dataset.slot]=true;
    a.saved=Date.now();persist();
  }));
  main.querySelectorAll('[data-review-status]').forEach(el=>el.onchange=()=>{
    const slot=el.dataset.reviewStatus;
    a.espReview??={};a.espReview[slot]={text:a.answers[slot]?.reflection??'',status:el.value};
    if(a.result)a.result.espReview=structuredClone(a.espReview);
    const record=data.history.find(r=>r.id===a.id);if(record)record.espReview=structuredClone(a.espReview);
    persist();
  });
  main.querySelectorAll('[data-check]').forEach(b=>b.onclick=()=>{
    if(!canReview())return;
    check(Number(b.dataset.check));persist();activity();main.querySelector(`[data-check="${b.dataset.check}"]`).focus();
  });
  main.querySelectorAll('[data-hint]').forEach(b=>b.onclick=()=>{a.hints[b.dataset.hint]=true;persist();activity();const panel=main.querySelector('[data-question="'+b.dataset.hint+'"] .hint-text');panel.tabIndex=-1;panel.focus();toast('Hint shown. This question is marked as assisted practice.');});
  main.querySelectorAll('[data-reveal]').forEach(b=>b.onclick=()=>{if(!canReview())return;a.reveals[b.dataset.reveal]=true;persist();activity();const panel=main.querySelector('[data-question="'+b.dataset.reveal+'"] .solution');panel.tabIndex=-1;panel.focus();toast('Model answers shown. Your submitted score is unchanged.');});
  $('#submit').onclick=()=>submit('submitted');
  $('#retry')?.addEventListener('click',()=>start(set,{inSequence}));
  $('#new-type').onclick=()=>replaceSet(set, 'type');$('#new-focus').onclick=()=>replaceSet(set,'focus');$('#permutation').onclick=()=>replaceSet(set,'permutation');
  if(set.type===3)$('#esp-recipe').onchange=async e=>{try{await start(choose(3,set.focus,null,'new','all',e.target.value));}catch(err){toast(err.message);}activity();};
  if(set.type===1){
    $('#in-sequence').onchange=e=>{a.inSequence=e.target.checked;persist();activity();};
    $('#subtopic').onchange=async e=>{const requested=e.target.value;try{await start(choose(1,set.focus,null,'new','all',requested),{inSequence});}catch(err){toast(err.message);}activity();};
  }
  if(set.type===0)$('#challenge-level').onchange=async e=>{const requested=e.target.value,prior=data.active?.id;try{await start(choose(0,set.focus,null,'new',requested,mathsTopic),{challengeLevel:requested});if(data.active?.id!==prior){data.puzzleChallenge=requested;persist();}}catch(err){toast(err.message);}activity();};
  if($('#maths-topic'))$('#maths-topic').onchange=async e=>{const topic=e.target.value,nextLevel=availableChallenges(set.focus,topic).includes(level)?level:'all';try{await start(choose(0,set.focus,null,'new',nextLevel,topic),{challengeLevel:nextLevel});}catch(err){toast(err.message);}activity();};
  const changeFocus=async target=>{try{const level=set.type===0?(data.puzzleChallenge??'all'):'all';
    const nextLevel=set.type===0&&!availableChallenges(target).includes(level)?'all':level;
    const prior=data.active?.id;await start(choose(set.type,target,null,'new',nextLevel),{challengeLevel:nextLevel,inSequence});
    if(data.active?.id!==prior){if(set.type===0)data.puzzleChallenge=nextLevel;persist();activity();}}catch(err){toast(err.message);}if(data.active?.id===a.id)activity();};
  if($('#focus'))$('#focus').onchange=e=>changeFocus(e.target.value);
  main.querySelectorAll('[data-puzzle-focus]').forEach(b=>b.onclick=()=>changeFocus(b.dataset.puzzleFocus));
  $('#copy-code').onclick=()=>copy(a.code);
  $('#copy-link').onclick=()=>copy(`${location.href.split('#')[0]}#set=${encodeURIComponent(a.code)}`);
  $('#timer-toggle').onclick=()=>{
    if(a.finished)return;
    const now=Date.now(),stop=a.deadline!==null,minutes=stop?null:Number($('#minutes').value);
    a.deadline=stop?null:now+minutes*60000;if(!stop){a.origin=now;a.warned=false;}
    a.timingEvents.push({at:now,minutes});a.code=encode({...set,minutes});a.saved=now;
    setHash(a.code);persist();activity();toast(stop?'Timer stopped. You can continue at your own pace.':'Timer started. Estimated practice time continues accumulating.');
  };
  tick();
}
async function replaceSet(set,mode){
  try{
    const level=set.type===0?(data.puzzleChallenge??'all'):'all';
    const inSequence=set.type===1&&Boolean(data.active.inSequence);
    if(inSequence&&mode!=='permutation'){
      const next=nextExamSubtopic(set.focus,data.active.examSubtopic??'all');
      if(!next)throw Error('You have reached the end of the available subtopics.');
      await start(choose(1,next.focus,set,'sequence','all',next.reference),{inSequence:true});
      return;
    }
    const alternatives=focuses(set.type).filter(f=>f!==set.focus&&(set.type!==0||availableChallenges(f).includes(level)));
    const focus=mode==='type'?alternatives[Math.floor(Math.random()*alternatives.length)]:set.focus;
    const subtopic=mode==='type'?'all':set.type===1?(data.active.examSubtopic??'all'):set.type===0&&set.focus==='classic maths'?(data.active.mathsTopic??'all'):'all';
    await start(choose(set.type,focus,set,mode==='permutation'?'permutation':'new',level,subtopic),{challengeLevel:level,inSequence});
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
  a.reviewSubmittedAt=Date.now();
  // A restored completed attempt unlocks review without recording it twice.
  if(a.finished){persist();render();$('#submit-result')?.focus();return;}
  const set=activeSet(),now=Date.now();let earned=0,firstEarned=0,firstMax=0;const finalResults={};
  for(const q of set.questions){
    if(!a.first[q.slot])check(q.slot,false);
    else a.checks[q.slot]??=1;
    finalResults[q.slot]=markQuestion(q,a.answers[q.slot]);
    earned+=finalResults[q.slot].reduce((s,r)=>s+r.earned,0);
    const first=a.first[q.slot];if(!first.assisted)for(const r of first.results){firstEarned+=r.earned;firstMax+=r.max;}
  }
  a.finished=now;a.outcome=outcome;
  const stop=outcome==='expired'?a.deadline:now;
  if(a.practiceClock)pausePractice(a,stop);
  const record={generation:a.generation,bankVersion:BANK_VERSION,started:a.started,id:a.id,code:encode({...set,version:BANK_VERSION}),type:set.type,focus:set.focus,finished:now,earned,max:set.total,percentage:Math.round(earned/set.total*100),seconds:Math.max(0,Math.round((stop-a.origin)/1000)),totalSeconds:Math.max(0,Math.round((stop-a.started)/1000)),attemptChecks:Object.values(a.checks).reduce((s,n)=>s+n,0),assisted:Object.keys(a.hints).length>0||Object.keys(a.reveals).length>0,outcome,firstEarned,firstMax,partScores:partScores(set,a.first,finalResults)};
  if(set.type===3){
    a.espReview=Object.fromEntries(set.questions.flatMap(q=>{
      const pending=(finalResults[q.slot]??[]).filter(r=>r.needsReview).map(r=>`${q.parts.find(p=>p.id===r.id).prompt}: ${a.answers[q.slot]?.[r.id]??''}`);
      return q.review||pending.length?[[q.slot,{text:[a.answers[q.slot]?.reflection??'',...pending].filter(Boolean).join('\n'),status:'Needs review'}]]:[];
    }));
    record.espReview=structuredClone(a.espReview);
  }
  a.tracking??=attemptEligibility(data,a.code,a.started);
  if(a.practiceClock){record.engagedSeconds=Math.floor(a.practiceClock.milliseconds/1000);record.practiceMeasuredFrom=a.practiceClock.measuredFrom;}
  recordPractice(data,record,a.tracking);a.result=record;persist();render();if(location.hash.startsWith('#set=')&&outcome==='submitted')$('#submit-result')?.focus();toast(`${outcome==='expired'?'Time’s up. ':''}${record.percentage}%. ${!a.tracking.eligible?'Practice only — progress not updated.':storageOK?'Result saved.':'Export to keep your result.'}`);
}
let lastPracticeSave=Date.now();
function practiceVisible(){return data.active&&!data.active.finished&&!document.hidden&&$('#display-code')?.textContent===data.active.code&&!document.querySelector('#profile-name');}
function tick(){
  if(data.active&&!banks[historicalSet(data.active.code).type])return;
  const a=data.active;if(!a)return;
  if(a.finished&&!canReview()&&main.querySelector('[data-reveal]')){activity();return;}
  if(!a.finished&&a.practiceClock){settlePractice(a);if(Date.now()-lastPracticeSave>=15000){lastPracticeSave=Date.now();persist();}}
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
function weeklyHTML(rows){
  const weeks=weeklyProgress(rows),current=weeks.at(-1),previous=weeks.at(-2);
  const label=at=>new Date(at).toLocaleDateString('en-GB',{day:'numeric',month:'short'});
  const change=current.average===null||previous.average===null?null:Math.round(current.average-previous.average);
  const trend=change===null?'Complete tracked sets each week to build your trend.':change===0?'Your average so far this week matches last week.':`Your average so far this week is ${Math.abs(change)} percentage points ${change>0?'higher':'lower'} than last week.`;
  return `<section class="progress-panel" id="weekly-progress"><h2>This week’s practice</h2><p class="muted">Week beginning ${label(current.start)} · Monday–Sunday · uses the filters above.</p><div class="progress-summary"><div class="stat"><strong>${current.count}</strong><span>Sets completed so far</span></div><div class="stat"><strong>${current.average===null?'—':Math.round(current.average)+'%'}</strong><span>Average final percentage</span></div><div class="stat"><strong>${current.days}</strong><span>Days practised this week</span></div><div class="stat"><strong>${current.minutes}</strong><span>Minutes practised this week</span></div><div class="stat"><strong>${previous.minutes}</strong><span>Minutes practised last week</span></div></div><p>${trend}</p><h3>Weekly average percentage</h3><p class="muted">Last eight weeks, including this week so far. Each set’s marks are converted to a percentage, then averaged equally. Final scores include retries. Different topics and difficulty can affect the trend.</p><div class="weekly-chart" role="img" aria-label="Weekly average final percentages. Exact dates, scores and completion counts follow in the weekly results table.">${weeks.map(w=>`<div class="weekly-column"><strong>${w.average===null?'—':Math.round(w.average)+'%'}</strong><div class="weekly-track">${w.average===null?'':`<div class="weekly-bar" style="height:${Math.max(2,w.average)}%"></div>`}</div><small>${label(w.start)}</small></div>`).join('')}</div><details><summary>Weekly results table</summary><div class="history-wrap"><table class="history"><caption>Weeks beginning Monday · current week is incomplete</caption><thead><tr><th>Week beginning</th><th>Sets completed</th><th>Average percentage</th><th>Days practised</th><th>Minutes</th></tr></thead><tbody>${weeks.map(w=>`<tr><td>${esc(new Date(w.start).toLocaleDateString('en-GB'))}</td><td>${w.count}</td><td>${w.average===null?'No tracked sets':Math.round(w.average)+'%'}</td><td>${w.days}</td><td>${w.minutes}</td></tr>`).join('')}</tbody></table></div></details></section>`;
}
function progress(){
  $('.global-code-entry').hidden=false;
  let rows=data.history.filter(r=>(filters.type==='all'||r.type===Number(filters.type))&&(filters.focus==='all'||r.focus===filters.focus)&&(!filters.from||r.finished>=new Date(`${filters.from}T00:00:00`).getTime())&&(!filters.to||r.finished<new Date(`${filters.to}T23:59:59.999`).getTime()+1));
  rows.sort((a,b)=>filters.sort==='score'?b.percentage-a.percentage:filters.sort==='oldest'?a.finished-b.finished:b.finished-a.finished);
  const average=rows.length?Math.round(averageSetPercentage(rows)):0,priority=revisionPriorities(rows,revisionAreas(priorityLevel).filter(a=>(filters.type==='all'||a.type===Number(filters.type))&&(filters.focus==='all'||a.focus===filters.focus||a.parent===filters.focus)));
  if(updateRecommendations(data,revisionAreas('subtopic'),area=>choose(1,area.parent,null,'new','all',area.focus)))persist();
  const evidenceMarks=value=>Number(value.toFixed(2)).toString();
  const select=(key,options)=>`<select id="filter-${key}">${options.map(([v,l])=>`<option value="${v}" ${filters[key]===v?'selected':''}>${esc(l)}</option>`).join('')}</select>`;
  main.innerHTML=`<a href="#home" class="back">← All activities</a><div class="page-top"><div><div class="eyebrow">A little better, every time</div><h1>My progress</h1><p class="muted">Tracked attempts, saved on this browser. Leave at least four hours after completing a set before starting another tracked attempt at it. Export regularly to your student OneDrive. Practice time pauses after two minutes without interaction and while the activity is hidden. Older records retain elapsed time.</p></div><div class="progress-transfers"><div class="progress-transfer-actions"><button class="primary" id="export-backup">Save backup</button><button class="primary" id="import-backup">Restore backup</button><details class="spreadsheet-options"><summary>Spreadsheet options</summary><p>CSV is for viewing results in a spreadsheet. Use a backup to restore your progress.</p><button id="export-csv">Export CSV</button></details></div><p class="muted">Save a backup to keep your progress or move it to another computer.</p><input type="file" id="backup-file" accept="text/plain,application/json,.txt,.json" hidden></div></div>
  <div class="filters"><label>Type${select('type',[['all','All types'],...types.map((t,i)=>[String(i),t.name])])}</label><label>Focus${select('focus',[['all','All focuses'],...Object.entries(focusNames)])}</label><label>From<input type="date" id="filter-from" value="${filters.from}"></label><label>To<input type="date" id="filter-to" value="${filters.to}"></label><label>Sort${select('sort',[['newest','Newest first'],['oldest','Oldest first'],['score','Highest score']])}</label></div>
  <section class="progress-summary" style="margin-top:1.5rem"><div class="stat"><strong>${rows.length}</strong><span>Completed activities</span></div><div class="stat"><strong>${rows.length?average+'%':'—'}</strong><span>Average final percentage</span></div><div class="stat"><strong>${Math.round(rows.reduce((s,r)=>s+practiceSeconds(r),0)/60)}</strong><span>Minutes of practice</span></div></section>
  ${weeklyHTML(rows)}
  <section class="progress-panel"><h2>Recommended exam revision</h2><p>Missing data first, then scores from lowest to highest, then stale data.</p>${data.recommendations?.celebrate?'<p role="status">good job on completing some recommended revision! see what’s next...</p>':''}<div class="recommended-sets">${data.recommendations?.items.map(item=>`<div><p>${esc(item.focus)} · ${esc(item.reason)}</p>${item.completed?`<strong>Completed · <code>${esc(item.code)}</code></strong>`:`<button class="history-code" data-code="${esc(item.code)}"><code>${esc(item.code)}</code> · Practise</button>`}</div>`).join('')??'<p>No available recommendations yet.</p>'}</div></section>
  <section class="progress-panel"><h2>What to practise next</h2><label for="priority-level">Show priorities by</label> <select id="priority-level"><option value="topic" ${priorityLevel==='topic'?'selected':''}>Topic / programming focus</option><option value="subtopic" ${priorityLevel==='subtopic'?'selected':''}>Exam subtopic</option></select>
  <p class="muted" style="font-size:.8rem">First responses from your latest five eligible detailed attempts per topic or programming focus. Subtopics use their latest five relevant attempts. Answers assisted before the first check and puzzles are excluded.</p>
  <p class="muted" style="font-size:.8rem">Earlier results without subtopic scores stay in your history, but do not contribute to these priorities.</p>
  ${priority.map(p=>`<div class="priority-row priority-${p.status}"><span>${esc(focusNames[p.focus]??p.focus)}</span><strong>${p.score===null?'No score':Math.floor(p.score)+'%'}</strong><small>${p.status==='missing'?'missing data, please practice this area to assess revision priority':p.status==='stale'?'stale data, revise this area soon to check if you still have the skills!':p.status==='red'?'High revision priority':p.status==='amber'?'Developing skills':'Secure skills'}${p.last?` · Last practised ${esc(new Date(p.last).toLocaleDateString('en-GB'))} · ${p.count} attempts · ${evidenceMarks(p.max)} marks assessed`:''}</small></div>`).join('')}</section>

  ${rows.length?`<section class="progress-panel"><h2>Score over time</h2><div class="chart" role="img" aria-label="Final scores for up to 12 recent activities, oldest to newest. Exact scores and dates are in the table below.">${[...rows].sort((a,b)=>a.finished-b.finished).slice(-12).map(r=>`<div class="chart-column"><span>${r.percentage}%</span><div class="chart-bar" style="height:${Math.max(2,r.percentage)}%"></div></div>`).join('')}</div><div class="history-wrap"><table class="history"><caption>Activity history · final scores include retries within an activity</caption><thead><tr><th>Date</th><th>Activity / focus</th><th>Code</th><th>Score</th><th>Time</th><th>Checks</th><th>Practice</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(new Date(r.finished).toLocaleString('en-GB',{dateStyle:'short',timeStyle:'short'}))}</td><td>${types[r.type]?.name??'Bank '+r.type}<br><span class="muted">${esc(focusNames[r.focus]??r.focus)}</span>${r.partScores?.length?`<details><summary>Topic / subtopic results</summary>${revisionPriorities([r],[...new Set(r.partScores.flatMap(p=>p.refs))].map(focus=>({type:r.type,focus})),r.finished).map(p=>`<div>${esc(p.focus)}: ${p.score===null?'Assisted — no independent score':Math.round(p.score)+'% first response'}</div>`).join('')}</details>`:''}</td><td>${sameGeneration(r)?`<button class="subtle history-code" data-code="${esc(r.code)}">`: '<span>'}<code>${esc(r.code)}</code>${sameGeneration(r)?'</button>':'</span>'}${generationLabel(r)?`<br><small>${esc(generationLabel(r))}</small>`:''}</td><td><strong>${r.percentage}%</strong><br>${r.earned}/${r.max}</td><td>${duration(practiceSeconds(r))}<br><small>${r.engagedSeconds===undefined?'Elapsed (older record)':'Estimated active time'}</small></td><td>${r.attemptChecks}</td><td>${r.assisted?'Assisted':'Independent'}${r.outcome==='expired'?'<br>Timer expired':''}</td></tr>`).join('')}</tbody></table></div></section>`:'<div class="empty-state"><h2>No results here yet.</h2><p class="muted">Try an activity, or adjust your filters.</p><a href="#home">Find an activity →</a></div>'}
  <p class="muted" style="font-size:.8rem">${bankRelease.latestRolloverAt?`Latest bank rollover: ${esc(new Date(bankRelease.latestRolloverAt).toLocaleDateString('en-GB'))}. Codes issued before that date may open different questions. `:''}CSV is for viewing in a spreadsheet. Use Save backup / Restore backup to move your complete history between browsers. CSV import is planned for a later release.</p>`;
  for(const key of Object.keys(filters))$(`#filter-${key}`).onchange=e=>{filters[key]=e.target.value;progress();$(`#filter-${key}`).focus();};
  $('#priority-level').onchange=e=>{priorityLevel=e.target.value;progress();$('#priority-level').focus();};
  $('#export-csv').onclick=()=>download(exportCSV(data.history),'starter-progress.csv','text/csv;charset=utf-8');
  if(rows.some(r=>r.espReview)){
    main.insertAdjacentHTML('beforeend',`<section class="esp-review"><h2>Saved ESP written reasoning</h2><p>Automatic percentages exclude these responses. Review status records a review, not a grade. Backups and CSV exports include the text.</p>${rows.filter(r=>r.espReview).map(r=>`<details><summary>${esc(r.code)} · ${esc(new Date(r.finished).toLocaleDateString())}</summary>${Object.entries(r.espReview).map(([slot,v])=>`<h3>Question slot ${esc(slot)} · ${esc(v.status)}</h3><p>${esc(v.text||'No written response entered.')}</p>`).join('')}</details>`).join('')}</section>`);
  }
  $('#export-backup').onclick=()=>download(JSON.stringify({schema:1,codeFormat:CODE_FORMAT,lastSeenRelease:{...bankRelease},username:data.username,history:data.history,recentAttempts:data.recentAttempts??{},recentAttemptsGeneration:data.recentAttemptsGeneration??bankRelease.generation,archivedActive:data.archivedActive??[],archivedRecentAttempts:data.archivedRecentAttempts??[]},null,2),backupFilename(data.username),'application/json');
  $('#import-backup').onclick=()=>$('#backup-file').click();
  $('#backup-file').onchange=async e=>{
    try{
      const file=e.target.files[0];if(!file)return;if(file.size>5000000)throw Error('Backup is too large (maximum 5 MB).');
      const imported=JSON.parse(await file.text());
      if(imported.schema!==1||!Array.isArray(imported.history)||imported.history.length>10000)throw Error('Unsupported backup format.');
      if(imported.username!==undefined&&(typeof imported.username!=='string'||!normaliseName(imported.username)||normaliseName(imported.username).length>80))throw Error('Backup contains an invalid username. Nothing was imported.');
      const requested=imported.username===undefined?data.username:normaliseName(imported.username);
      const username=nameMatch(requested,profiles().names).exact??requested;
      const switching=username!==data.username;
      const target=switching?loadProfile(username):data;
      migrateStoredCodes(imported);
      let added=0,duplicate=0;let next=[...target.history];
      for(const r of imported.history){
        const set=recordedSet(r);
        if(typeof r.id!=='string'||r.id.length>100||r.type!==set.type||r.focus!==set.focus||r.max!==set.total||!Number.isFinite(r.finished)||!Number.isFinite(new Date(r.finished).getTime())||!Number.isFinite(r.seconds)||r.seconds<0||!Number.isInteger(r.earned)||r.earned<0||r.earned>r.max||r.percentage!==Math.round(r.earned/r.max*100)||!Number.isInteger(r.firstMax)||r.firstMax<0||r.firstMax>r.max||!Number.isInteger(r.firstEarned)||r.firstEarned<0||r.firstEarned>r.firstMax||!Number.isInteger(r.attemptChecks)||r.attemptChecks<0||typeof r.assisted!=='boolean'||!['submitted','expired'].includes(r.outcome))throw Error('Backup contains an invalid result. Nothing was imported.');
        if(!validPracticeTime(r))throw Error('Backup contains invalid practice time. Nothing was imported.');
        if(!validatePartScores(r,set))throw Error('Backup contains invalid part scores. Nothing was imported.');
        if(r.espReview!==undefined&&(!r.espReview||typeof r.espReview!=='object'||Array.isArray(r.espReview)||Object.entries(r.espReview).some(([slot,v])=>!set.entries.some(e=>String(e.slot)===slot)||!v||typeof v.text!=='string'||v.text.length>1200||!['Needs review','Self-reviewed','Teacher-reviewed'].includes(v.status))))throw Error('Backup contains invalid written reviews.');
        const old=next.find(a=>a.id===r.id);
        if(old){if(JSON.stringify(old)!==JSON.stringify(r))throw Error('A result conflicts with this browser’s history. Nothing was imported.');duplicate++;}else{next.push(r);added++;}
      }
      const recent={...target.recentAttempts};
      if(imported.recentAttempts!==undefined&&imported.recentAttemptsGeneration===bankRelease.generation){
        if(!imported.recentAttempts||typeof imported.recentAttempts!=='object'||Array.isArray(imported.recentAttempts)||Object.keys(imported.recentAttempts).length>10000)throw Error('Backup contains invalid practice dates.');
        for(const [code,at] of Object.entries(imported.recentAttempts)){
          const key=attemptEligibility({history:[]},historicalSet(code).code).key;
          if(!Number.isFinite(at)||at<0||!Number.isFinite(new Date(at).getTime()))throw Error('Backup contains an invalid practice date.');
          recent[key]=Math.max(recent[key]??0,at);
        }
      }
      const merged={...target,history:next,recentAttempts:recent,recentAttemptsGeneration:bankRelease.generation};
      for(const key of ['archivedActive','archivedRecentAttempts'])if(Array.isArray(imported[key]))merged[key]=[...target[key]??[],...imported[key]];
      // Validation above is read-only: a bad backup must never select another profile.
      try{data=activateProfile(merged);}catch{storageError();throw Error('Could not save the restored profile. Your selected profile has not changed.');}
      if(switching)filters={type:'all',focus:'all',from:'',to:'',sort:'newest'};
      profileHeader();progress();
      const message=`${switching?`Switched to ${data.username}, the profile named in this backup. `:''}${added} results restored; ${duplicate} duplicates skipped.`;
      const notice=document.createElement('p');notice.className='restore-notice';notice.setAttribute('role','status');notice.textContent=message;main.querySelector('.page-top').after(notice);toast(message);
    }catch(error){toast(error.message);}
  };
  main.querySelectorAll('.history-code').forEach(b=>b.onclick=async()=>{try{await start(await loadSet(b.dataset.code));}catch(e){toast(e.message);}});
}
let renderId=0;
async function render(){
  const requestId=++renderId;
  const route=location.hash;
  if($('#display-code')&&route!==`#set=${encodeURIComponent(data.active.code)}`){
    if(!await askLeave()){if(requestId===renderId)setHash(data.active.code);return;}
    if(requestId!==renderId)return;
  }
  if(data.active&&!data.active.finished&&route!==`#set=${encodeURIComponent(data.active.code)}`){pausePractice(data.active);persist();}
  $('#nav-home').setAttribute('aria-current',route==='#progress'?'false':'page');
  $('#nav-progress').setAttribute('aria-current',route==='#progress'?'page':'false');
  if(route==='#progress'){await Promise.all([ensureBank(1),ensureBank(2)]);if(requestId===renderId)progress();return;}
  if(route==='#exam'){examHome();return;}
  if(route.startsWith('#set=')){
    try{
      const code=decodeURIComponent(route.slice(5));
      const set=banks[historicalSet(code).type]?resolve(code):await loadSet(code);
      if(requestId!==renderId)return;
      if(data.active?.code===set.code){activity();return;}
      // External links are explicit navigation; preserve unfinished work until confirmed.
      await start(set,{force:true});if(data.active?.code!==set.code)navigate('#home');return;
    }catch(e){if(requestId!==renderId)return;home();showCodeError($('#code-error'),route.slice(5),e);return;}
  }
  home();
}
if(!data.username)await chooseProfile();else profileHeader();
try{
  if(data.active){
    if(data.active.practiceClock)data.active.practiceClock.running=false;
    const restored=await loadSet(data.active.code);
    if(contentChanged(restored,data.active.contentVersion??restored.version)){
      data.active=null;persist();
      toast('These questions have been updated. Start a fresh attempt; your saved results are unchanged.');
    }
    if(data.active&&!data.active.finished&&deadlineState(data.active).expired)submit('expired');
    else if(data.active&&!data.active.finished&&Date.now()-data.active.saved>45*60000){data.active=null;persist();toast('Your previous untimed activity was inactive for over 45 minutes. Start a fresh attempt.');}
  }
}catch(error){toast(error.message);}
$('#global-code-form').onsubmit=async e=>{
  e.preventDefault();
  const error=$('#global-code-error');error.textContent='';
  const input=new FormData(e.target).get('code');
  try{
    const set=await loadSet(input);
    await start(set);
    if(data.active?.code===set.code)e.target.reset();
  }catch(err){showCodeError(error,input,err);}
};
document.addEventListener('click',async event=>{
  const link=event.target.closest('a[href]');
  if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
  if(link.getAttribute('href')==='#main'){event.preventDefault();main.focus();return;}
  const url=new URL(link.href,location.href);
  if(url.origin===location.origin&&url.pathname===location.pathname&&url.search===location.search)return;
  if(!needsLeaveWarning())return;
  event.preventDefault();if(await askLeave())location.href=url.href;
});
window.addEventListener('hashchange',()=>{render();main.focus();});
window.addEventListener('pagehide',()=>{if(data.active&&!data.active.finished){pausePractice(data.active);data.active.saved=Date.now();persist();}});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){if(data.active&&!data.active.finished){pausePractice(data.active);persist();}}
  else {tick();if(practiceVisible())engagePractice(data.active);}
});
window.addEventListener('pageshow',()=>{if(practiceVisible())engagePractice(data.active);});
for(const type of ['pointerdown','pointermove','mousemove','click','keydown','input','wheel','touchstart','touchmove','scroll'])document.addEventListener(type,()=>{
  const clock=data.active?.practiceClock;
  if(clock?.running&&clock.interacted)return;
  if(practiceVisible())notePracticeInteraction(data.active);
},{capture:true,passive:true});
setInterval(()=>{if(practiceVisible())pollPractice(data.active);},INTERACTION_POLL_MS);
setInterval(tick,1000);
render();
