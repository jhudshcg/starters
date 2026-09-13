// Run against an isolated headless Chrome started with --remote-debugging-port=9227.
// The profile must be dedicated to testing: this script clears the app's test storage.
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {encode} from '../js/codes.js';
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
async function screenshot(name){const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});await writeFile(`/private/tmp/starters-${name}.png`,Buffer.from(r.data,'base64'));}
try{
 await send('Runtime.enable');await send('Page.enable');
 await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url:base});await until('Boolean(document.querySelector("#code-form"))');
 const clean=await send('Page.addScriptToEvaluateOnNewDocument',{source:'localStorage.removeItem("dsd-starters-v1")'});await send('Page.reload');await until('Boolean(document.querySelector("#code-form"))');await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:clean.identifier});
 assert.equal(await evaluate('document.querySelectorAll("[data-start]").length'),3);
 await screenshot('home');
 await click('[data-start="2"]');await until('document.querySelectorAll(".question").length===2');
 const originalCode=await evaluate('document.querySelector("#display-code").textContent');assert.equal(originalCode.length,8);
 await screenshot('programming');
 // Fill the displayed variation's reference answers using the same inputs as a student.
 await evaluate(`(async()=>{const {resolve}=await import('./js/bank.js');const set=resolve(document.querySelector('#display-code').textContent);for(const q of set.questions)for(const p of q.parts){const els=[...document.querySelectorAll('[data-slot="'+q.slot+'"][data-part="'+p.id+'"]')];if(els[0].type==='radio'){els.find(el=>el.value===p.answer).click();}else{els[0].value=p.answer;els[0].dispatchEvent(new Event('input',{bubbles:true}));}}})()`);
 assert.equal(await evaluate('document.querySelector(".answer-tools").open'),false);await click('.answer-tools summary');await click('[data-check]');assert.ok(await evaluate('document.querySelectorAll(".feedback.correct").length>=6'));
 await send('Page.reload');await until('Boolean(document.querySelector("#submit"))');assert.equal(await evaluate('document.querySelector("#display-code").textContent'),originalCode);
 await click('#submit');await until('Boolean(document.querySelector(".result-score"))');assert.equal(await evaluate('document.querySelector(".result-score").textContent'),'100%');assert.ok(await evaluate('document.querySelector("#submit-result").textContent.includes("100%")'));assert.equal(await evaluate('document.activeElement.id'),'submit-result');assert.ok(await evaluate('document.querySelector("#submit").getBoundingClientRect().bottom<=innerHeight'));
 await click('#nav-progress');await until('Boolean(document.querySelector(".history"))');assert.equal(await evaluate('document.querySelectorAll(".history tbody tr").length'),1);
 await screenshot('progress');
 await click('#nav-home');await until('Boolean(document.querySelector("#code-form"))');await click('[data-start="0"]');await until('Boolean(document.querySelector(".puzzle-grid"))');
 await evaluate('document.querySelector("#focus").value="spatial";document.querySelector("#focus").dispatchEvent(new Event("change"))');await until('Boolean(document.querySelector("dialog"))');await click('dialog button[value="leave"]');await until('Boolean(document.querySelector(".position-board"))');
 await click('[data-puzzle-action=position]:not(:disabled)');assert.ok(await evaluate('Boolean(document.querySelector("[data-puzzle-action=position][aria-pressed=true]"))'));assert.equal(await evaluate('document.querySelectorAll(".board-options").length'),0);await screenshot('spatial');
 await click('#timer-toggle');assert.equal((await evaluate('document.querySelector("#display-code").textContent')).length,9);
 const deadline=await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).active.deadline');
 await send('Page.reload');await until('Boolean(document.querySelector("#timer"))');assert.equal(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).active.deadline'),deadline);
 // Recovery from an expired saved timer must submit once and keep history intact.
 const injected=await send('Page.addScriptToEvaluateOnNewDocument',{source:'const saved=JSON.parse(localStorage.getItem("dsd-starters-v1"));if(saved?.active){saved.active.deadline=Date.now()-1000;localStorage.setItem("dsd-starters-v1",JSON.stringify(saved));}'});
 await send('Page.reload');await until('Boolean(document.querySelector(".result-score"))');await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:injected.identifier});assert.ok(await evaluate('document.querySelector(".result-banner").textContent.includes("Time’s up")'));
 await send('Page.reload');await until('Boolean(document.querySelector(".result-score"))');assert.equal(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).history.length'),2);
 // Exam and invalid-code flows.
 await click('#nav-home');await until('Boolean(document.querySelector("#code-form"))');await click('[data-start="1"]');await until('document.querySelectorAll(".question").length===3');
 assert.equal(await evaluate('document.querySelector("#new-focus").disabled'),true);
 await click('[data-hint]');assert.ok(await evaluate('document.activeElement.classList.contains("hint-text")'));await click('.answer-tools summary');assert.ok(await evaluate('document.querySelector(".answer-tools-content").textContent.includes("try to answer all questions first and submit your best try before checking correct answers")'));await click('[data-reveal]');assert.ok(await evaluate('document.activeElement.classList.contains("solution")'));await screenshot('exam');
 await send('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:false});
 assert.ok(await evaluate('document.documentElement.scrollWidth<=window.innerWidth'), 'Activity page has horizontal overflow at 320px');await screenshot('mobile');
 await click('#nav-home');await until('Boolean(document.querySelector("#code-form"))');
 assert.ok(await evaluate('document.documentElement.scrollWidth<=window.innerWidth'),'Home page has horizontal overflow at 320px');
 await evaluate('document.querySelector("#code-form input").value="bad-code!";document.querySelector("#code-form").requestSubmit()');await until('document.querySelector("#code-error").textContent.length>0');
 // Expanded puzzle families: interact with real controls, then submit.
 await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
 async function openPuzzle(slots){
   const code=encode({version:1,type:0,entries:slots.map(slot=>({slot,variation:0})),minutes:null});
   await click('#nav-home');await until('Boolean(document.querySelector("#code-form"))');
   await evaluate(`document.querySelector('#code-form input').value=${JSON.stringify(code)};document.querySelector('#code-form').requestSubmit()`);
   await until(`Boolean(document.querySelector('dialog')) || document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}`);
   if(await evaluate('Boolean(document.querySelector("dialog"))'))await click('dialog button[value="leave"]');
   await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}`);
 }
 assert.equal(await evaluate('document.querySelector(".brand-sub").innerText'), 'Digital Software Development\nT-Level');
 await openPuzzle([6,7]);
 for(const cell of [0,2,1,3])await click(`[data-puzzle-slot="6"][data-puzzle-action="order-add"][data-value="${cell}"]`);
 for(let i=0;i<3;i++)await click(`[data-puzzle-slot="7"][data-puzzle-action="match"][data-value="${i},${i}"]`);
 await screenshot('logic');await click('#submit');assert.equal(await evaluate('document.querySelector(".result-score").textContent'),'100%');
 await openPuzzle([8]);await click('[data-puzzle-action="switch"][data-value="0"]');await click('[data-puzzle-action="switch"][data-value="2"]');await click('#submit');assert.equal(await evaluate('document.querySelector(".result-score").textContent'),'100%');
 await openPuzzle([9,11]);
 await evaluate(`document.querySelector('[data-puzzle-slot="9"][data-puzzle-action="shape"][data-value="0"]').focus()`);
 await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight',windowsVirtualKeyCode:39});
 assert.equal(await evaluate('document.activeElement.dataset.value'),'1');
 for(let toggle=0;toggle<2;toggle++){
   await send('Input.dispatchKeyEvent',{type:'keyDown',key:' ',code:'Space',windowsVirtualKeyCode:32});
   await send('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',windowsVirtualKeyCode:32});
   assert.equal(await evaluate('document.activeElement.getAttribute("aria-pressed")'),toggle===0?'true':'false');
 }

 await evaluate(`(async()=>{const {resolve}=await import('./js/bank.js');const set=resolve(document.querySelector('#display-code').textContent);for(const q of set.questions){for(const cell of JSON.parse(q.parts[0].answer))document.querySelector('[data-puzzle-slot="'+q.slot+'"][data-puzzle-action="shape"][data-value="'+cell+'"]').click();}})()`);
 assert.equal(await evaluate(`getComputedStyle(document.querySelector('[data-puzzle-action="shape"][aria-pressed="true"]')).backgroundColor`),'rgb(255, 230, 160)');await screenshot('shapes');
 await send('Page.reload');await until('Boolean(document.querySelector("[data-puzzle-action=shape]"))');
 assert.equal(await evaluate('document.querySelectorAll("[data-puzzle-action=shape][aria-pressed=true]").length'),8);
 await send('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:false});
 assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Shape page overflows at 320px');await screenshot('shapes-mobile');
 await click('#submit');assert.equal(await evaluate('document.querySelector(".result-score").textContent'),'100%');
 await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
 await openPuzzle([12,14]);
 // Reject a diagonal move, then exercise undo and reset.
 await click('[data-puzzle-slot="12"][data-puzzle-action="path"][data-value="6"]');assert.ok(await evaluate('document.querySelector("#toast").textContent.includes("neighbouring")'));
 await click('[data-puzzle-slot="12"][data-puzzle-action="path"][data-value="1"]');await click('[data-puzzle-slot="12"][data-puzzle-action="undo"]');
 assert.ok(await evaluate(`document.querySelector('[data-question="12"] .route-status').textContent.startsWith('0 / 6')`));
 // Use a valid alternative to the model route in Q12.
 for(const cell of [1,2,6,10,11,15])await click(`[data-puzzle-slot="12"][data-puzzle-action="path"][data-value="${cell}"]`);
 for(const cell of [1,2,6,10,14,15])await click(`[data-puzzle-slot="14"][data-puzzle-action="path"][data-value="${cell}"]`);
 await screenshot('paths');await send('Page.reload');await until('Boolean(document.querySelector(".route-status"))');
 assert.ok(await evaluate('document.querySelector(".route-status").textContent.startsWith("6 / 6")'));
 await click('#submit');assert.equal(await evaluate('document.querySelector(".result-score").textContent'),'100%');
 await openPuzzle([15,17]);
 await evaluate(`(async()=>{const {resolve}=await import('./js/bank.js');const set=resolve(document.querySelector('#display-code').textContent);for(const q of set.questions){const [r,c]=q.parts[0].answer.split(',').map(Number);document.querySelector('[data-puzzle-slot="'+q.slot+'"][data-puzzle-action="position"][data-value="'+((r-1)*5+c-1)+'"]').click();const field=document.querySelector('[data-slot="'+q.slot+'"][data-part="1"]');field.value=q.parts[1].answer;field.dispatchEvent(new Event('input',{bubbles:true}));}})()`);
 await screenshot('spatial-solved');await click('#submit');assert.equal(await evaluate('document.querySelector(".result-score").textContent'),'100%');
 await screenshot('submitted');
 assert.deepEqual(errors,[]);
 console.log('Browser smoke checks passed: three types, marking, reload, history, spatial input, timer recovery/deduplication, invalid codes, 320px reflow, answer disclosure, nearby submission results, logic, shape painting and alternative valid paths. Screenshots: /private/tmp/starters-*.png');
}finally{ws.close();}
