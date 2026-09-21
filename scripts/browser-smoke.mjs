// Run against an isolated headless Chrome started with --remote-debugging-port=9227.
// The profile must be dedicated to testing: this script clears the app's test storage.
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {encode,BANK_VERSION} from '../js/codes.js';
import {choose,resolve,banks} from '../js/bank.js';
const currentExamCode=encode({version:BANK_VERSION,type:1,entries:[{slot:1,variation:1},{slot:2,variation:1},{slot:4,variation:0}]});
const endpoint=process.env.STARTERS_DEBUG_URL??'http://127.0.0.1:9227';
const base=process.env.STARTERS_PREVIEW_URL??'http://127.0.0.1:8765';
const pages=await (await fetch(endpoint+'/json/list')).json();
const page=pages.find(p=>p.type==='page');
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res,rej)=>{ws.onopen=res;ws.onerror=rej;});
let nextId=0;const pending=new Map(),errors=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(m.error)p.reject(Error(m.error.message));else p.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text+' '+JSON.stringify(m.params.exceptionDetails.exception));};
function send(method,params={}){const id=++nextId;return new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function until(expression){for(let i=0;i<80;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression);}
async function click(selector){await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);}
async function acceptLeaveIfShown(){
 // Older scenarios may start from blank activities, which no longer need confirmation.
 await new Promise(r=>setTimeout(r,200));
 if(await evaluate('Boolean(document.querySelector("dialog button[value=leave]"))')){await click('dialog button[value="leave"]');await until('!document.querySelector("dialog")');}
}
async function enterUnsubmittedAnswer(){
 await evaluate(`{const input=document.querySelector('[data-part]');if(input){if(input.type==='radio'){input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));}else{input.value='test';input.dispatchEvent(new Event('input',{bubbles:true}));}}}`);
}
async function screenshot(name){const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});await writeFile(`/private/tmp/starters-${name}.png`,Buffer.from(r.data,'base64'));}
async function openFocus(type,focus,count=1){
 await send('Page.navigate',{url:base+'/#home'});await acceptLeaveIfShown();await until('Boolean(document.querySelector("#code-form"))');
 const fixedSlots=type===1?({'CA2.1':[12,13,14],'CA2.7':[31,32,33]})[focus]:null;
 const set=fixedSlots?resolve({...choose(type,focus),entries:fixedSlots.map(slot=>({slot,variation:0}))}):choose(type,focus);
 const code=(type===0?resolve({...set,entries:set.entries.slice(0,count)}):set).code;
 await evaluate(`document.querySelector('#code-form input').value=${JSON.stringify(code)};document.querySelector('#code-form').requestSubmit()`);
 await until(`Boolean(document.querySelector('dialog')) || document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}`);
 if(await evaluate('Boolean(document.querySelector("dialog"))'))await click('dialog button[value="leave"]');
 await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}`);
 return code;
}
const puzzlePart=async()=>resolve(await evaluate("document.querySelector('#display-code').textContent")).questions[0].parts[0];
try{
 await send('Runtime.enable');await send('Page.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
 await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
 const clearOnLoad=await send('Page.addScriptToEvaluateOnNewDocument',{source:'localStorage.removeItem("dsd-starters-v1")'});
 await send('Page.navigate',{url:base+'/?smoke='+Date.now()});await until('Boolean(document.querySelector("#code-form"))');
 await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:clearOnLoad.identifier});
 assert.equal(await evaluate('document.querySelectorAll("[data-start]").length'),3);
 assert.deepEqual(await evaluate('performance.getEntriesByType("resource").filter(r=>r.name.includes("/banks/")).map(r=>r.name)'),[],'Fresh home must not download banks');
 await openFocus(1,'CA2.1');assert.equal(await evaluate('document.querySelectorAll(".question").length'),3);
 // Reports use one global button, preserve the attempt and select multiple exact items.
 assert.equal(await evaluate('document.querySelectorAll("#report-issue").length'),1);
 const beforeReport=await evaluate('localStorage.getItem("dsd-starters-v1")');
 await click('#report-issue');
 await evaluate('document.querySelector("#report-kind").value="content";document.querySelector("#report-kind").dispatchEvent(new Event("change"));document.querySelector("#report-description").value="Answer & marking unclear? π";document.querySelector("#report-description").dispatchEvent(new Event("input"))');
 await click('#issue-report button[value="copy"]');
 assert.match(await evaluate('document.querySelector("#report-error").textContent'),/Select at least one/);
 await evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async text=>{window.reportCopy=text;}}});document.querySelectorAll("#report-items input")[0].click();document.querySelectorAll("#report-items input")[2].click()');
 await click('#issue-report button[value="copy"]');
 await until('Boolean(window.reportCopy)');
 const report=await evaluate('window.reportCopy');
 const reportSet=resolve(await evaluate('document.querySelector("#display-code").textContent'));
 assert.ok(report.includes(reportSet.questions[0].title));assert.ok(report.includes(reportSet.questions[2].title));assert.ok(!report.includes(reportSet.questions[1].title));
 assert.match(report,/Answer & marking unclear\? π/);
 await evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async()=>{throw Error("denied");}}})');
 await click('#issue-report button[value="copy"]');
 await until('document.querySelector("#report-status").textContent.includes("selected preview")');
 assert.equal(await evaluate('document.activeElement.id'),'report-preview');
 await send('Emulation.setDeviceMetricsOverride',{width:320,height:800,deviceScaleFactor:1,mobile:false});
 assert.ok(await evaluate('document.querySelector("#issue-report").scrollWidth<=document.querySelector("#issue-report").clientWidth+1'));
 await click('#report-close');await until('!document.querySelector("#issue-report")');
 assert.equal(await evaluate('localStorage.getItem("dsd-starters-v1")'),beforeReport);
 await click('#nav-home');await until('Boolean(document.querySelector("#code-form"))');
 await click('#report-issue');
 assert.equal(await evaluate('document.querySelector("#report-kind").options.length'),1);
 assert.ok(!(await evaluate('document.querySelector("#report-preview").value')).includes('Set:'));
 await click('#report-close');await until('!document.querySelector("#issue-report")');
 await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
 await openFocus(1,'CA2.1');
 const downloadedBanks=await evaluate('performance.getEntriesByType("resource").filter(r=>r.name.includes("/banks/")).map(r=>r.name)');
 assert.equal(downloadedBanks.length,1);assert.match(downloadedBanks[0],/\/banks\/exam-[a-f0-9]+\.txt$/);
 assert.equal(await evaluate('document.querySelectorAll(".part-coverage").length'),15);
 // Navigation warning is tied to entered answers on the visible activity.
 await click('#nav-home');await until('Boolean(document.querySelector("#code-form"))');
 assert.equal(await evaluate('Boolean(document.querySelector("dialog"))'),false);
 await openFocus(1,'CA2.1');await enterUnsubmittedAnswer();
 const guardedCode=await evaluate('document.querySelector("#display-code").textContent');
 await click('#nav-home');await until('Boolean(document.querySelector("dialog button[value=stay]"))');
 assert.ok(await evaluate('Boolean(document.querySelector("#display-code"))'),'Warning stays over activity, not home');
 await click('dialog button[value="stay"]');await until('!document.querySelector("dialog")&&location.hash.startsWith("#set=")');
 assert.equal(await evaluate('document.querySelector("#display-code").textContent'),guardedCode);
 await click('#nav-home');await until('Boolean(document.querySelector("dialog button[value=leave]"))');
 await click('dialog button[value="leave"]');await until('Boolean(document.querySelector("#code-form"))');
 await openFocus(1,'CA2.1');
 assert.equal(await evaluate('Boolean(document.querySelector("dialog"))'),false,'Starting from home must not warn about saved answers');
 const examQuestions=resolve(await evaluate('document.querySelector("#display-code").textContent')).questions;
 await evaluate(`for(const q of ${JSON.stringify(examQuestions)})for(const p of q.parts){const elements=[...document.querySelectorAll('[data-slot="'+q.slot+'"][data-part="'+p.id+'"]')];const el=elements.find(el=>el.type!=='radio'||el.value===p.answer);if(el.type==='radio'){el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}else{el.value=p.answer;el.dispatchEvent(new Event('input',{bubbles:true}));}}`);
 await send('Page.reload');await until('Boolean(document.querySelector("#submit"))');await click('#submit');await until('Boolean(document.querySelector("#submit-result"))');assert.ok(await evaluate('document.querySelector("#submit-result").textContent.includes("100%")'));await screenshot('exam-expanded');
 // New history stores part evidence; legacy imports remain visible without affecting priorities.
 const detailed=await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).history.at(-1)');
 assert.equal(detailed.partScores.length,15);
 assert.equal(detailed.partScores.reduce((sum,p)=>sum+p.firstMax,0),15);
 assert.ok(detailed.partScores.every(p=>p.refs.includes('CA2.1.1')));
 await click('#nav-progress');await acceptLeaveIfShown();await until('Boolean(document.querySelector("#priority-level"))');
 assert.equal(await evaluate('document.querySelector(".priority-row meter").value'),100);
 await evaluate('document.querySelector("#priority-level").value="subtopic";document.querySelector("#priority-level").dispatchEvent(new Event("change"))');
 assert.ok(await evaluate('document.querySelector(".priority-row").textContent.includes("CA2.1.1")'));
 assert.ok(await evaluate('document.querySelector(".priority-row").textContent.includes("15 marks assessed")'));
 const legacyAggregate={...detailed,id:'legacy-aggregate',finished:detailed.finished-6*3600000,earned:0,percentage:0,firstEarned:0};delete legacyAggregate.partScores;
 const backup={schema:1,history:[detailed,legacyAggregate]};
 await evaluate(`{const transfer=new DataTransfer();transfer.items.add(new File([JSON.stringify(${JSON.stringify(backup)})],"mixed-progress.json",{type:"application/json"}));const input=document.querySelector('#backup-file');input.files=transfer.files;input.dispatchEvent(new Event('change',{bubbles:true}));}`);
 await until('JSON.parse(localStorage.getItem("dsd-starters-v1")).history.length===2');
 assert.equal(await evaluate('document.querySelector(".priority-row meter").value'),100);
 assert.deepEqual(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).history.find(r=>r.id==='+JSON.stringify(detailed.id)+').partScores'),detailed.partScores);
 const invalid={...detailed,id:'invalid-parts',partScores:detailed.partScores.map((p,i)=>i? p:{...p,refs:[]})};
 await evaluate(`{const transfer=new DataTransfer();transfer.items.add(new File([JSON.stringify({schema:1,history:[${JSON.stringify(invalid)}]})],"invalid-progress.json",{type:"application/json"}));const input=document.querySelector('#backup-file');input.files=transfer.files;input.dispatchEvent(new Event('change',{bubbles:true}));}`);
 await until('document.querySelector("#toast").textContent.includes("invalid part scores")');
 assert.equal(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).history.length'),2);
 await screenshot('subtopic-progress');
 await evaluate(`location.hash='#set='+${JSON.stringify(detailed.code)}`);await until('Boolean(document.querySelector("#submit"))');await click('#submit');
 // Review gates reset on reload, guard handlers, and preserve recorded attempts.
 await click('[data-reveal]');assert.equal(await evaluate('document.querySelectorAll(".solution").length'),1);
 const historyBefore=await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("dsd-starters-v1")).history)');
 const legacyOnReload=await send('Page.addScriptToEvaluateOnNewDocument',{source:'const old=JSON.parse(localStorage.getItem("dsd-starters-v1"));if(old?.active){delete old.active.tracking;delete old.active.result;delete old.recentAttempts;localStorage.setItem("dsd-starters-v1",JSON.stringify(old));}'});
 await send('Page.reload');await until('Boolean(document.querySelector("#submit"))');
 await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:legacyOnReload.identifier});
 assert.equal(await evaluate('Boolean(document.querySelector(".tracking-notice"))'),false,'A legacy tracked attempt must stay tracked');
 assert.equal(await evaluate('document.querySelectorAll(".solution,.feedback").length'),0);
 assert.ok(await evaluate('document.querySelector("[data-check]").disabled && document.querySelector("[data-reveal]").disabled'));
 await evaluate('document.querySelector("[data-check]").onclick();document.querySelector("[data-reveal]").onclick()');
 assert.equal(await evaluate('document.querySelectorAll(".solution,.feedback").length'),0);
 await click('#submit');assert.ok(await evaluate('!document.querySelector("[data-check]").disabled'));
 await click('[data-check]');
 assert.equal(await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("dsd-starters-v1")).history)'),historyBefore);
 await click('#retry');await until('!document.querySelector("#submit").disabled');
 assert.ok(await evaluate('document.querySelector("[data-reveal]").disabled'));
 assert.ok(await evaluate('document.querySelector(".tracking-notice").textContent.includes("4 hours")'));
 await click('#submit');await until('Boolean(document.querySelector("#submit-result"))');
 assert.equal(await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("dsd-starters-v1")).history)'),historyBefore);
 assert.ok(await evaluate('document.querySelector(".result-banner").textContent.includes("progress not updated")'));
 await send('Page.reload');await until('Boolean(document.querySelector("#submit"))');await click('#submit');
 assert.equal(await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("dsd-starters-v1")).history)'),historyBefore);
 await click('#retry');await until('!document.querySelector("#submit").disabled');
 // The shared form works on activity and progress pages, including errors/cancel.
 await evaluate('document.querySelector("#global-code").value="bad";document.querySelector("#global-code-form").requestSubmit()');
 await until('Boolean(document.querySelector("#global-code-error").textContent)');
 assert.ok(await evaluate('Boolean(document.querySelector("#submit"))'));
 await evaluate('document.querySelector("#global-code").value="BIAkAiAg";document.querySelector("#global-code-form").requestSubmit()');
 await until('document.querySelector("#global-code-error").textContent.includes("updated or removed")');
 assert.equal(await evaluate('Boolean(document.querySelector("dialog"))'),false);
 await enterUnsubmittedAnswer();
 await evaluate(`document.querySelector("#global-code").value=${JSON.stringify(currentExamCode)};document.querySelector("#global-code-form").requestSubmit()`);
 await until('Boolean(document.querySelector("dialog"))');await click('dialog button[value="stay"]');
 await until('!document.querySelector("dialog")');
 assert.notEqual(await evaluate('document.querySelector("#display-code").textContent'),currentExamCode);
 await click('#nav-progress');await acceptLeaveIfShown();await until('Boolean(document.querySelector("#export-csv"))');
 await evaluate('document.querySelector("#global-code-form").requestSubmit()');
 await acceptLeaveIfShown();
 await until(`document.querySelector("#display-code")?.textContent===${JSON.stringify(currentExamCode)}`);
 await screenshot('exam-reviewed');
 assert.ok(await evaluate('document.querySelector("[data-check]").disabled && document.querySelector("[data-reveal]").disabled'));
 await click('#timer-toggle');
 const expireOnReload=await send('Page.addScriptToEvaluateOnNewDocument',{source:'const saved=JSON.parse(localStorage.getItem("dsd-starters-v1"));if(saved?.active){saved.active.deadline=Date.now()-1000;localStorage.setItem("dsd-starters-v1",JSON.stringify(saved));}'});
 await send('Page.reload');await until('Boolean(document.querySelector("#submit-result"))');
 await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:expireOnReload.identifier});
 assert.ok(await evaluate('!document.querySelector("[data-reveal]").disabled'),'Automatic submission must unlock review');
 await openFocus(0,'logic grids');assert.equal(await evaluate('document.querySelectorAll(".question").length'),1);
 await click('[data-challenge-action="candidate"]');assert.equal(await evaluate('document.querySelector("[data-challenge-action=candidate]").textContent'),'×');
 await click('[data-challenge-action="candidate"]');assert.equal(await evaluate('document.querySelector("[data-challenge-action=candidate]").textContent'),'✓');
 await send('Page.reload');await until('Boolean(document.querySelector(".candidate-table"))');assert.equal(await evaluate('document.querySelector("[data-challenge-action=candidate]").textContent'),'✓');
 await click('[data-challenge-action="undo"]');assert.equal(await evaluate('document.querySelector("[data-challenge-action=candidate]").textContent'),'×');
 await screenshot('logic-grid');
 await openFocus(0,'sudoku');
 const cell=await evaluate('document.querySelector(".digit-cell:not(.given)").dataset.value');
 await click(`[data-challenge-action="cell"][data-value="${cell}"]`);await click('[data-challenge-action="notes"]');await click('[data-challenge-action="digit"][data-value="3"]');
 assert.equal(await evaluate(`document.querySelector('[data-challenge-action="cell"][data-value="${cell}"] .pencil-notes').textContent`),'3');
 await send('Page.reload');await until('Boolean(document.querySelector(".digit-grid"))');
 assert.equal(await evaluate(`document.querySelector('[data-challenge-action="cell"][data-value="${cell}"] .pencil-notes').textContent`),'3');await screenshot('sudoku');
 await openFocus(0,'cover paths');const part=await puzzlePart(),route=JSON.parse(part.answer).reverse();
 await evaluate('document.querySelector("[data-path-board]").scrollIntoView({block:"center"})');
 const rect=await evaluate('(()=>{const r=document.querySelector("[data-path-board]").getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};})()');
 const point=cell=>({x:rect.x+(cell%part.size+.5)/part.size*rect.width,y:rect.y+(Math.floor(cell/part.size)+.5)/part.size*rect.height});
 await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...point(route[0])});
 for(const cell of route.slice(1))await send('Input.dispatchMouseEvent',{type:'mouseMoved',button:'left',buttons:1,...point(cell)});
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...point(route.at(-1))});
 assert.ok(await evaluate(`document.querySelector('.path-count').textContent.startsWith('${route.length} / ${route.length}')`));
 await send('Page.reload');await until('Boolean(document.querySelector("[data-path-board]"))');assert.ok(await evaluate(`document.querySelector('.path-count').textContent.startsWith('${route.length} /')`));
 await click('#submit');assert.ok(await evaluate('document.querySelector("#submit-result").textContent.includes("100%")'));await screenshot('path-drag');
 await openFocus(0,'tangrams');const tiling=await puzzlePart(),places=JSON.parse(tiling.answer);
 for(let i=0;i<places.length;i++){
  await click(`[data-challenge-action="piece"][data-value="${i}"]`);
  await evaluate('document.querySelector("[data-tiling-board]").scrollIntoView({block:"center"})');
  const r=await evaluate('(()=>{const r=document.querySelector("[data-tiling-board]").getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};})()');
  const place=places[i],point={x:r.x+place.x/tiling.size*r.width,y:r.y+place.y/tiling.size*r.height};
  await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...point});await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...point});
  for(let n=0;n<place.rotation/45;n++)await click('[data-challenge-action="rotate"][data-value="45"]');
  if(place.flipped)await click('[data-challenge-action="flip"]');
 }
 await click('#submit');assert.ok(await evaluate('document.querySelector("#submit-result").textContent.includes("100%")'));await screenshot('tangram');
 await click('.answer-tools summary');await click('[data-reveal]');assert.equal(await evaluate('document.querySelectorAll(".solution .tangram-board").length'),1);
 for(const focus of ['logic equations','number constraints','sequences','classic maths']){
  await openFocus(0,focus);assert.equal(await evaluate('document.querySelectorAll(".question").length'),1);
  if(focus==='classic maths')assert.equal(await evaluate('document.querySelector("#permutation").disabled'),true);
 }
 await openFocus(0,'sudoku');await send('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:false});
 assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Sudoku causes whole-page overflow');await screenshot('sudoku-mobile');
 await openFocus(0,'logic grids');assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Logic grid causes whole-page overflow');
 await openFocus(0,'cover paths');assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Path board causes whole-page overflow');
 await click('#timer-toggle');const deadline=await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).active.deadline');await send('Page.reload');await until('Boolean(document.querySelector("#timer"))');assert.equal(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).active.deadline'),deadline);

 await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
 await openFocus(0,'go',3);assert.equal(await evaluate('document.querySelectorAll(".question").length'),3);
 const goQuestions=resolve(await evaluate('document.querySelector("#display-code").textContent')).questions;
 const goQ=goQuestions.find(q=>JSON.parse(q.parts[0].answer).moves.length>=2)??goQuestions[0];
 const goP=goQ.parts[0],goMoves=JSON.parse(goP.answer).moves,goRoot=`[data-question="${goQ.slot}"] .challenge:not([data-locked])`;
 await click(goRoot+' [data-challenge-action="go-hint"]');
 assert.ok(await evaluate(`JSON.parse(localStorage.getItem('dsd-starters-v1')).active.hints[${goQ.slot}]`));
 assert.equal(await evaluate(`JSON.parse(JSON.parse(localStorage.getItem('dsd-starters-v1')).active.answers[${goQ.slot}]['0']).moves?.length??0`),0);
 for(let moveIndex=0;moveIndex<goMoves.length;){
  await click(goRoot+` [data-challenge-action="go"][data-value="${goMoves[moveIndex]}"]`);
  const played=await evaluate(`JSON.parse(JSON.parse(localStorage.getItem('dsd-starters-v1')).active.answers[${goQ.slot}]['0']).moves`);
  assert.ok(played.length>moveIndex);moveIndex=played.length;
  const last=played.at(-1);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector(${JSON.stringify(goRoot+` [data-value="${last}"]`)})).backgroundColor`),'rgba(0, 0, 0, 0)');
  assert.ok(await evaluate(`Boolean(document.querySelector(${JSON.stringify(goRoot+` [data-go-stone="${last}"]`)}))`),'Latest played stone is missing');
 }
 assert.ok(await evaluate(`document.querySelector(${JSON.stringify(goRoot+' .go-success')}).textContent.includes('Well done!')`));
 await screenshot('go-reply-visible');
 await send('Page.reload');await until(`Boolean(document.querySelector(${JSON.stringify(goRoot)}))`);
 assert.deepEqual(await evaluate(`JSON.parse(JSON.parse(localStorage.getItem('dsd-starters-v1')).active.answers[${goQ.slot}]['0']).moves`),goMoves);
 await click("#submit");await click(`[data-question="${goQ.slot}"] .answer-tools summary`);await click(`[data-reveal="${goQ.slot}"]`);
 const slider=`[data-question="${goQ.slot}"] .solution [data-go-replay]`;
 await evaluate(`document.querySelector(${JSON.stringify(slider)}).scrollIntoView({block:'center'});window.testReplaySlider=document.querySelector(${JSON.stringify(slider)});`);
 const sr=await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(slider)}).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};})()`);
 const sy=sr.y+sr.height/2;
 await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,x:sr.x+sr.width-8,y:sy});
 for(const fraction of [.7,.45,.05]){
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',button:'left',buttons:1,x:sr.x+sr.width*fraction,y:sy});
  assert.ok(await evaluate(`window.testReplaySlider===document.querySelector(${JSON.stringify(slider)})`),'Dragging replaced the slider');
 }
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,x:sr.x+sr.width*.05,y:sy});
 assert.equal(await evaluate(`Number(document.querySelector(${JSON.stringify(slider)}).value)`),0);
 assert.ok(await evaluate(`document.querySelector('[data-question="${goQ.slot}"] .solution .go-moves').textContent.includes('none yet')`));
 await screenshot('go-replay');
 await openFocus(0,'classic maths',3);assert.equal(await evaluate('document.querySelectorAll(".question").length'),3);
 await openFocus(1,'CA2.7');
 assert.equal(await evaluate('document.querySelectorAll(".part-code").length'),2);
 assert.equal(await evaluate('document.querySelectorAll(".part > .part-code").length'),2,'Code must stay with its answer input');
 assert.ok(await evaluate('document.querySelectorAll(".part-label").length>=15'));
 await screenshot('exam-subprograms');
 await openFocus(2,'functions');assert.equal(await evaluate('document.querySelectorAll(".question").length'),2);
 await openFocus(2,'algorithms');assert.equal(await evaluate('document.querySelectorAll(".question").length'),2);
 await openFocus(0,'go',3);await send('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:false});
 assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Go causes whole-page overflow');
 assert.ok(await evaluate("document.querySelector('footer').textContent.includes('designed by Joe Hudson')"));
 await screenshot('go-mobile');

 // Historical results remain importable even when the old question code is stale.
 await click('#nav-progress');await acceptLeaveIfShown();await until('Boolean(document.querySelector("#backup-file"))');
 const legacyResult={id:'legacy-changed-question',code:'BIAkAiAg',type:1,focus:'CA1.1',max:15,earned:9,percentage:60,firstMax:15,firstEarned:9,attemptChecks:3,assisted:false,outcome:'submitted',seconds:180,finished:Date.now()-6*3600000};
 await evaluate(`{const transfer=new DataTransfer();transfer.items.add(new File([JSON.stringify(${JSON.stringify({schema:1,history:[legacyResult]})})],"old-progress.json",{type:"application/json"}));const input=document.querySelector('#backup-file');input.files=transfer.files;input.dispatchEvent(new Event('change',{bubbles:true}));}`);
 await until('JSON.parse(localStorage.getItem("dsd-starters-v1")).history.some(r=>r.id==="legacy-changed-question")');
 await evaluate('document.querySelector("#global-code").value="BA8D_x_4";document.querySelector("#global-code-form").requestSubmit()');
 await acceptLeaveIfShown();
 await until('document.querySelector("#display-code")?.textContent==="BA8D_x_4"');
 assert.ok(await evaluate('document.querySelector(".question").textContent.includes("PZ-2-120-0")'));
 await click('#permutation');await acceptLeaveIfShown();
 await until('document.querySelector("#display-code")?.textContent!=="BA8D_x_4"');
 assert.ok(await evaluate(`document.querySelector(".question").textContent.includes("PZ-${BANK_VERSION}-120-")`));

 // Select a fine reference while retaining all parts and related-question context.
 await openFocus(1,'CA1.2');
 await enterUnsubmittedAnswer();
 const unfiltered=await evaluate('document.querySelector("#display-code").textContent');
 await evaluate('document.querySelector("#subtopic").value="CA1.2.10";document.querySelector("#subtopic").dispatchEvent(new Event("change"))');
 await until('Boolean(document.querySelector("dialog"))');await click('dialog button[value="stay"]');
 await until('!document.querySelector("dialog")&&document.querySelector("#subtopic")?.value==="all"');
 assert.equal(await evaluate('document.querySelector("#display-code").textContent'),unfiltered);
 await evaluate('document.querySelector("#subtopic").value="CA1.2.10";document.querySelector("#subtopic").dispatchEvent(new Event("change"))');
 await acceptLeaveIfShown();
 await until('document.querySelector("#subtopic")?.value==="CA1.2.10"&&!document.querySelector("dialog")');
 assert.equal(await evaluate('document.querySelectorAll(".question").length'),3);
 assert.equal(await evaluate('document.querySelectorAll(".subtopic-match").length'),2);
 assert.ok(await evaluate('document.querySelector(".subtopic-notice").textContent.includes("2 of 3")'));
 assert.equal(await evaluate('[...document.querySelectorAll(".subtopic-context")].filter(p=>p.textContent.includes("Related practice")).length'),1);
 const filtered=resolve(await evaluate('document.querySelector("#display-code").textContent'));
 assert.equal(await evaluate('document.querySelectorAll(".part-coverage").length'),filtered.questions.reduce((sum,q)=>sum+q.parts.length,0));
 await send('Page.reload');await until('document.querySelector("#subtopic")?.value==="CA1.2.10"');
 await click('#permutation');await acceptLeaveIfShown();
 await until(`document.querySelector('#display-code')?.textContent!==${JSON.stringify(filtered.code)}&&!document.querySelector('dialog')`);
 assert.equal(await evaluate('document.querySelectorAll(".subtopic-match").length'),2);
 const permuted=resolve(await evaluate('document.querySelector("#display-code").textContent'));
 assert.deepEqual(permuted.entries.map(e=>e.slot),filtered.entries.map(e=>e.slot));
 await click('#new-focus');await acceptLeaveIfShown();
 await until(`document.querySelector('#display-code')?.textContent!==${JSON.stringify(permuted.code)}&&!document.querySelector('dialog')`);
 assert.equal(await evaluate('document.querySelector("#subtopic").value'),'CA1.2.10');
 assert.equal(await evaluate('document.querySelectorAll(".subtopic-match").length'),2);
 await send('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:false});
 assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Subtopic controls cause overflow');
 await screenshot('exam-subtopic-mobile');
 await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
 await evaluate('document.querySelector("#focus").value="CA2.1";document.querySelector("#focus").dispatchEvent(new Event("change"))');
 await acceptLeaveIfShown();
 await until('document.querySelector("#focus")?.value==="CA2.1"&&!document.querySelector("dialog")');
 assert.equal(await evaluate('document.querySelector("#subtopic").value'),'all');
 // Challenge filters preserve the activity on cancel and constrain all new sets.
 await openFocus(0,'logic grids',3);
 await click('[data-challenge-action="candidate"]');
 const beforeFilter=await evaluate('document.querySelector("#display-code").textContent');
 const beforeLevel=await evaluate('document.querySelector("#challenge-level").value');
 await evaluate('document.querySelector("#challenge-level").value="foundation";document.querySelector("#challenge-level").dispatchEvent(new Event("change"))');
 await until('Boolean(document.querySelector("dialog"))');await click('dialog button[value="stay"]');
 await until(`!document.querySelector('dialog')&&document.querySelector('#challenge-level')?.value===${JSON.stringify(beforeLevel)}`);
 assert.equal(await evaluate('document.querySelector("#display-code").textContent'),beforeFilter);
 for(const level of ['foundation','stretch']){
  await evaluate(`document.querySelector('#challenge-level').value=${JSON.stringify(level)};document.querySelector('#challenge-level').dispatchEvent(new Event('change'))`);
  await acceptLeaveIfShown();
  await until(`document.querySelector('#challenge-level')?.value===${JSON.stringify(level)}&&!document.querySelector('dialog')`);
  let current=resolve(await evaluate('document.querySelector("#display-code").textContent'));
  assert.ok(current.questions.every(q=>q.challengeLevel===level));
  const oldCode=current.code;await click('#new-focus');await acceptLeaveIfShown();
  await until(`document.querySelector('#display-code').textContent!==${JSON.stringify(oldCode)}`);
  current=resolve(await evaluate('document.querySelector("#display-code").textContent'));
  assert.ok(current.questions.every(q=>q.challengeLevel===level));
 }
 await send('Page.reload');await until('document.querySelector("#challenge-level")?.value==="stretch"');
 await send('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:false});
 assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Challenge selector causes whole-page overflow');
 await screenshot('challenge-filter-mobile');
 // A shared code overrides the filter and still opens the exact original questions.
 await openFocus(0,'classic maths',3);
 const shared=resolve(await evaluate('document.querySelector("#display-code").textContent'));
 assert.equal(shared.questions.length,3);
 await openFocus(2,'validation');assert.equal(await evaluate('document.querySelectorAll(".question").length'),2);
 await openFocus(2,'arrays');assert.equal(await evaluate('document.querySelectorAll(".question").length'),2);
 // Generate through the interface, copy through its buttons, and open in a
 // separate browser context with no shared local storage or loaded bank.
 const browserInfo=await (await fetch(endpoint+'/json/version')).json();
 const controlSocket=new WebSocket(browserInfo.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{controlSocket.onopen=resolve;controlSocket.onerror=reject;});
 let controlId=0;const controlPending=new Map();
 controlSocket.onmessage=e=>{const message=JSON.parse(e.data);if(message.id){const task=controlPending.get(message.id);controlPending.delete(message.id);message.error?task.reject(Error(message.error.message)):task.resolve(message.result);}};
 const controlSend=(method,params={})=>new Promise((resolve,reject)=>{const id=++controlId;controlPending.set(id,{resolve,reject});controlSocket.send(JSON.stringify({id,method,params}));});
 const {browserContextId}=await controlSend('Target.createBrowserContext');
 let peerSocket;
 try{
  const {targetId}=await controlSend('Target.createTarget',{url:'about:blank',browserContextId});
  const peers=await (await fetch(endpoint+'/json/list')).json();
  peerSocket=new WebSocket(peers.find(p=>p.id===targetId).webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{peerSocket.onopen=resolve;peerSocket.onerror=reject;});
  let peerId=0;const peerPending=new Map();
  peerSocket.onmessage=e=>{const message=JSON.parse(e.data);if(message.id){const task=peerPending.get(message.id);peerPending.delete(message.id);message.error?task.reject(Error(message.error.message)):task.resolve(message.result);}};
  const peerSend=(method,params={})=>new Promise((resolve,reject)=>{const id=++peerId;peerPending.set(id,{resolve,reject});peerSocket.send(JSON.stringify({id,method,params}));});
  const peerEval=async expression=>{const result=await peerSend('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));return result.result.value;};
  const peerUntil=async expression=>{for(let i=0;i<100;i++){if(await peerEval(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Peer timed out: '+expression);};
  async function peerOpen(code,global=false){
   await peerEval(`{const form=document.querySelector(${JSON.stringify(global?'#global-code-form':'#code-form')});form.querySelector('input').value=${JSON.stringify(code)};form.requestSubmit();}`);
   await peerUntil(`document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}||Boolean(document.querySelector('dialog'))`);
   if(await peerEval('Boolean(document.querySelector("dialog"))'))await peerEval('document.querySelector("dialog button[value=leave]").click()');
   await peerUntil(`document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}&&!document.querySelector('dialog')`);
  }
  await peerSend('Page.enable');
  for(const type of [0,1,2]){
   await send('Page.navigate',{url:base+'/#home'});await acceptLeaveIfShown();await until('Boolean(document.querySelector("#code-form"))');
   await click(`[data-start="${type}"]`);await until('Boolean(document.querySelector("dialog"))||Boolean(document.querySelector("#display-code"))');
   if(await evaluate('Boolean(document.querySelector("dialog"))'))await click('dialog button[value="leave"]');
   await until('Boolean(document.querySelector("#display-code"))&&!document.querySelector("dialog")');
   // Capture the exact strings passed by the copy buttons without touching the OS clipboard.
   await evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async text=>{window.copiedForTest=text;}}})');
   await click('#copy-code');const copied=await evaluate('window.copiedForTest');
   assert.equal(copied,await evaluate('document.querySelector("#display-code").textContent'));
   await peerSend('Page.navigate',{url:base+'/#home'});await peerUntil('Boolean(document.querySelector("#code-form"))');
   if(type===0)assert.equal(await peerEval('localStorage.getItem("dsd-starters-v1")'),null);
   await peerOpen(copied);
   assert.deepEqual(await peerEval('[...document.querySelectorAll(".question")].map(q=>q.dataset.question)'),await evaluate('[...document.querySelectorAll(".question")].map(q=>q.dataset.question)'));
   assert.equal(await peerEval('document.querySelector(".questions").textContent'),await evaluate('document.querySelector(".questions").textContent'));
   await evaluate('document.querySelector("#minutes").value="10"');await click('#timer-toggle');await click('#copy-code');
   const timed=await evaluate('window.copiedForTest');assert.equal(timed.length,9);await peerOpen(timed,true);
   assert.ok(await peerEval('JSON.parse(localStorage.getItem("dsd-starters-v1")).active.deadline>Date.now()'));
   const current=resolve(timed),single=encode({...current,minutes:null,entries:[current.entries[0]]});await peerOpen(single,true);
   assert.equal(await peerEval('document.querySelectorAll(".question").length'),1);
   await click('#copy-link');const link=await evaluate('window.copiedForTest');assert.ok(link.endsWith('#set='+timed));
   await peerSend('Page.navigate',{url:link});await peerUntil('Boolean(document.querySelector("dialog"))||document.querySelector("#display-code")?.textContent==='+JSON.stringify(timed));
   if(await peerEval('Boolean(document.querySelector("dialog"))'))await peerEval('document.querySelector("dialog button[value=leave]").click()');
   await peerUntil('document.querySelector("#display-code")?.textContent==='+JSON.stringify(timed));
  }
  await evaluate('document.querySelector("#global-code").value="bad";document.querySelector("#global-code-form").requestSubmit()');
  await until('Boolean(document.querySelector("#global-code-error .code-diagnostics"))');
  await click('#global-code-error .code-diagnostics');
  const diagnostics=JSON.parse(await evaluate('window.copiedForTest'));
  assert.equal(diagnostics.enteredCode,'bad');assert.match(diagnostics.build,/app-[A-Z0-9]+.js/);assert.ok(!('history' in diagnostics));
  assert.ok(await evaluate(`document.querySelector("#build-info").textContent.includes("bank ${BANK_VERSION}")`));
 }finally{peerSocket?.close();await controlSend('Target.disposeBrowserContext',{browserContextId});controlSocket.close();}
 // Revised content hints remain separate from solutions and accessible on mobile.
 for(const [type,focus] of [[1,'CA1.1'],[0,'logic grids'],[0,'go']]){
  await openFocus(type,focus);
  const hinted=resolve(await evaluate('document.querySelector("#display-code").textContent'));
  for(const q of hinted.questions){
   await click(`[data-hint="${q.slot}"]`);
   assert.equal(await evaluate(`document.querySelector('[data-question="${q.slot}"] .hint-text').textContent`),'Hint: '+q.hint);
   assert.ok(await evaluate('document.activeElement.matches(".hint-text")'));
  }
  assert.equal(await evaluate('document.querySelectorAll(".solution").length'),0);
  assert.ok(await evaluate('[...document.querySelectorAll("[data-reveal]")].every(b=>b.disabled)'));
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Hint causes whole-page overflow');
  await screenshot(`hints-${type}-${focus.replaceAll(' ','-')}`);
 }
 // Preview every new exam variation, including complete code and contextual hints.
 for(const template of banks[1].filter(q=>q.slot>=126&&q.slot<=156))for(const variation of [0,1]){
  const companions=banks[1].filter(q=>q.focus===template.focus&&q.slot!==template.slot).slice(0,2);
  const code=encode({version:BANK_VERSION,type:1,entries:[{slot:template.slot,variation},...companions.map(q=>({slot:q.slot,variation:0}))]});
  await send('Page.navigate',{url:base+'/#set='+code});await acceptLeaveIfShown();
  await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}`);
  const opened=resolve(code),q=opened.questions[0],root=`[data-question="${q.slot}"]`;
  assert.equal(await evaluate(`document.querySelector(${JSON.stringify(root+' .question-prompt')}).textContent`),q.prompt);
  assert.equal(await evaluate(`document.querySelectorAll(${JSON.stringify(root+' .hint-text')}).length`),0);
  assert.equal(await evaluate(`document.querySelectorAll(${JSON.stringify(root+' .solution')}).length`),0);
  for(const part of q.parts)assert.ok(await evaluate(`document.querySelector(${JSON.stringify(root)}).textContent.includes(${JSON.stringify(part.prompt)})`));
  if(q.code)assert.equal(await evaluate(`document.querySelector(${JSON.stringify(root+' pre code')}).textContent`),q.code);
  await click(`[data-hint="${q.slot}"]`);
  assert.equal(await evaluate(`document.querySelector(${JSON.stringify(root+' .hint-text')}).textContent`),'Hint: '+q.hint);
  assert.ok(await evaluate('document.activeElement.matches(".hint-text")'));
  assert.ok(await evaluate(`document.querySelector('[data-reveal="${q.slot}"]').disabled`));
  await evaluate(`for(const q of ${JSON.stringify(opened.questions)})for(const p of q.parts){const elements=[...document.querySelectorAll('[data-slot="'+q.slot+'"][data-part="'+p.id+'"]')];const el=elements.find(el=>el.type!=='radio'||el.value===p.answer);if(el.type==='radio'){el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}else{el.value=p.answer;el.dispatchEvent(new Event('input',{bubbles:true}));}}`);
  await click('#submit');await until('Boolean(document.querySelector("#submit-result"))');
  assert.ok(await evaluate('document.querySelector("#submit-result").textContent.includes("100%")'),`Scoring ${q.slot}/${variation}`);
  await click(`[data-reveal="${q.slot}"]`);
  assert.ok(await evaluate(`document.querySelector(${JSON.stringify(root+' .solution')}).textContent.includes(${JSON.stringify(q.parts[0].explanation)})`));
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),`Reflow ${q.slot}/${variation}`);
  if([129,136,146].includes(q.slot)&&variation===0)await screenshot(`exam-depth-${q.slot}`);
  if(variation===1&&[150,152,154,156].includes(q.slot))console.log(`Priority pair ${q.slot-1}–${q.slot}: both variations passed browser scoring, hints, reveal and mobile checks.`);
 }
 assert.deepEqual(errors,[]);console.log('Browser smoke passed: all 62 added exam variations/scoring/reveal/mobile, authored hints/focus/reveal separation/mobile, whole-question subtopic filtering/cancel/reload/mobile, UI-generated codes and links in an independent browser context, error diagnostics, detailed topic/subtopic priorities and mixed/invalid backup imports, challenge filtering/cancellation/reload/mobile, arrays and validation, legacy/current codes and historical imports, rotated encoded production banks, four-hour repeat tracking, submission gating, global code entry, exam scoring and coverage, candidate grid and Undo, Sudoku notes/reload, continuous path drag with arbitrary start, tangram placement/reveal, all nine subtypes, three-puzzle sets, Go replies/hints/reload/drag replay, new coding focuses, footer, timer recovery and 320px reflow.');
} catch(error) {console.error('Browser state:',await evaluate(`({hash:location.hash,level:document.querySelector('#challenge-level')?.value,toast:document.querySelector('#toast')?.textContent,dialog:document.querySelector('dialog')?.textContent})`));throw error;} finally {ws.close();}
