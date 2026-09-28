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
 await send('Runtime.enable');await send('Page.enable');
 await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url:base+'/#home'});await acceptLeaveIfShown();await until('Boolean(document.querySelector("#code-form"))');
 await evaluate('localStorage.removeItem("dsd-starters-v1")');await send('Page.reload');await until('Boolean(document.querySelector("#code-form"))');
 assert.equal(await evaluate('document.querySelectorAll("[data-start]").length'),3);
 if(process.argv.includes('--navigation-only')){
  await click('[data-start="1"]');await until('Boolean(document.querySelector("[data-exam-start]"))');await click('[data-exam-start="3"]');await until('Boolean(document.querySelector("#esp-recipe"))');
  await evaluate('{const s=document.querySelector("#esp-recipe");s.value="T1.4";s.dispatchEvent(new Event("change"));}');
  await until('document.querySelector("#esp-recipe")?.value==="T1.4" && Boolean(document.querySelector("textarea"))');
  const before=await evaluate('document.querySelector("#display-code").textContent');
  await click('#permutation');await until(`document.querySelector('#display-code').textContent!==${JSON.stringify(before)}`);
  assert.equal(await evaluate('document.querySelector("#esp-recipe").value'),'T1.4');
  await click('#new-focus');await until('document.querySelector("#esp-recipe").value!=="T1.4"');
  await evaluate('{const s=document.querySelector("#focus");s.value="task2";s.dispatchEvent(new Event("change"));}');
  await until('document.querySelector("#esp-recipe").value.startsWith("T2.")');
  await evaluate('{const s=document.querySelector("#esp-recipe");s.value="T2.3";s.dispatchEvent(new Event("change"));}');
  await until('document.querySelector("#esp-recipe").value==="T2.3" && Boolean(document.querySelector("pre"))');
  assert.ok(await evaluate('document.querySelector(".page-top p.muted").textContent.includes("Up to 15")'));
  await send('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:true});
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
  await send('Page.navigate',{url:base+'/#home'});await until('Boolean(document.querySelector(".type-1 [data-start]"))');
  assert.ok(await evaluate('document.querySelector(".type-1 .card-body").textContent.includes("ESP")'));
  for(const width of [1280,640,320]){
   await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===320});
   for(const theme of ['light','dark']){
    if(await evaluate('document.documentElement.dataset.theme')!==theme)await click('#theme-toggle');
    assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
    assert.ok(await evaluate('[...document.querySelectorAll(".type-card")].every(c=>{const a=c.querySelector(".card-art").getBoundingClientRect(),b=c.querySelector(".card-body").getBoundingClientRect();return a.top<=b.top+1&&a.bottom>=b.bottom-1&&b.width>=c.getBoundingClientRect().width-3;})'));
    assert.equal(await evaluate('document.querySelector("#theme-toggle svg").getBoundingClientRect().width'),22);
    await evaluate('document.querySelector("#theme-toggle").focus()');
    assert.ok(await evaluate('document.activeElement.id==="theme-toggle"'));
    await screenshot(`home-${theme}-${width}`);
   }
   await click('[data-start="1"]');await until('Boolean(document.querySelector("[data-exam-start]"))');
   assert.equal(await evaluate('document.querySelectorAll("[data-exam-start]").length'),2);
   assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
   await screenshot(`exam-menu-${width}`);
   await send('Page.reload');await until('Boolean(document.querySelector("[data-exam-start]"))');
   await click('a.back');await until('Boolean(document.querySelector("#code-form"))');
  }
  assert.deepEqual(errors,[]);console.log('ESP navigation and home layout passed: Core/ESP menu, recipe, permutation, reload, light/dark icon, keyboard focus and 1280/640/320px reflow.');
 }else{
 let savedRecord;
 for(let recipe=0;recipe<10;recipe++)for(let variation=0;variation<5;variation++){
  const slots=[recipe*3,recipe*3+1,recipe*3+2];
  const set=resolve({version:BANK_VERSION,type:3,entries:slots.map(slot=>({slot,variation})),minutes:null});
  await send('Page.navigate',{url:base+'/#set='+set.code});await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(set.code)}`);
  assert.equal(await evaluate('document.querySelectorAll(".question").length'),3);
  assert.equal(await evaluate('document.querySelector("#esp-recipe").value'),set.questions[0].recipe);
  const answers=set.questions.flatMap(q=>q.parts.map(p=>({slot:q.slot,id:p.id,value:p.answer})));
  await evaluate(`{for(const a of ${JSON.stringify(answers)}){const nodes=[...document.querySelectorAll('[data-slot="'+a.slot+'"][data-part="'+a.id+'"]')];const input=nodes.find(n=>n.type!=='radio'||n.value===a.value);if(!input)throw Error('Missing answer control');if(input.type==='radio'){input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));}else{input.value=a.value;input.dispatchEvent(new Event('input',{bubbles:true}));}}for(const t of document.querySelectorAll('textarea')){t.value='A specific reason < & evidence.';t.dispatchEvent(new Event('input',{bubbles:true}));}}`);
  if(recipe===3&&variation===0){
   await send('Page.reload');await until('Boolean(document.querySelector("textarea"))');
   assert.equal(await evaluate('document.querySelector("textarea").value'),'A specific reason < & evidence.');
  }
  await click('#submit');await until('Boolean(document.querySelector(".result-score"))');
  assert.equal(await evaluate('document.querySelector(".result-score").textContent'),'100%');
  assert.ok(await evaluate('document.querySelector(".esp-notice").textContent.includes("not ESP grades")'));
  if(set.questions.some(q=>q.review)){
   assert.ok(await evaluate('document.querySelector("textarea").disabled'));
   await evaluate('{const s=document.querySelector("[data-review-status]");s.value="Self-reviewed";s.dispatchEvent(new Event("change"));}');
   const record=await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).history.at(-1)');
   assert.ok(Object.values(record.espReview).some(v=>v.status==='Self-reviewed'));
   savedRecord=record;
  }
  if([0,3,8].includes(recipe)&&variation===0){
   await screenshot('esp-desktop-'+recipe);
   await send('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:true});
   assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),'ESP must reflow at320px');
   await screenshot('esp-mobile-'+recipe);
   await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  }
 }
 // History exposes the separately saved prose; JSON backup restores it unchanged.
 await send('Page.navigate',{url:base+'/#progress'});await until('Boolean(document.querySelector("#export-backup"))');
 assert.ok(await evaluate('document.body.textContent.includes("A specific reason < & evidence.")'));
 const backup={schema:1,codeFormat:54,history:[savedRecord]};
 await evaluate('localStorage.setItem("dsd-starters-v1",JSON.stringify({schema:1,history:[],active:null}))');
 await send('Page.reload');await until('Boolean(document.querySelector("#backup-file"))');
 await evaluate(`{const dt=new DataTransfer();dt.items.add(new File([${JSON.stringify(JSON.stringify(backup))}],'esp-backup.json',{type:'application/json'}));document.querySelector('#backup-file').files=dt.files;document.querySelector('#backup-file').dispatchEvent(new Event('change'));}`);
 await until('JSON.parse(localStorage.getItem("dsd-starters-v1")).history.length===1');
 assert.deepEqual(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).history[0].espReview'),savedRecord.espReview);
 // Timed expiry preserves and submits entered prose, without awarding it marks.
 const timed=resolve({version:BANK_VERSION,type:3,entries:[{slot:24,variation:2},{slot:25,variation:2},{slot:26,variation:2}],minutes:5});
 await send('Page.navigate',{url:base+'/#set='+timed.code});await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(timed.code)}`);
 await evaluate('const t=document.querySelector("textarea");t.value="Keep this timed response";t.dispatchEvent(new Event("input"));const d=JSON.parse(localStorage.getItem("dsd-starters-v1"));d.active.deadline=Date.now()-1;localStorage.setItem("dsd-starters-v1",JSON.stringify(d))');
 const expiry=await send('Page.addScriptToEvaluateOnNewDocument',{source:'{const d=JSON.parse(localStorage.getItem("dsd-starters-v1"));d.active.deadline=Date.now()-1;localStorage.setItem("dsd-starters-v1",JSON.stringify(d));}'});
 await send('Page.reload');await until('Boolean(document.querySelector(".result-score"))');await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:expiry.identifier});
 assert.equal(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).active.result.earned'),0);
 assert.ok(await evaluate('document.querySelector("textarea").value.includes("Keep this timed response")'));
 assert.equal(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).active.outcome'),'expired');
 assert.deepEqual(errors,[]);
 console.log('ESP browser passed: all50 sets/150 variations scored; task/recipe controls, prose refresh/review/history/backup, timed submission, 320px reflow and desktop/mobile screenshots.');
}
}finally{ws.close();}
