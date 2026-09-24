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
try {
 await send('Runtime.enable');await send('Page.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
 await send('Page.navigate',{url:base+'/?enrichment='+Date.now()});await until('Boolean(document.querySelector("#code-form"))');
 async function openSlot(slot,variation=0){
  await send('Page.navigate',{url:base+'/#home'});await acceptLeaveIfShown();await until('Boolean(document.querySelector("#code-form"))');
  const code=encode({version:BANK_VERSION,type:0,entries:[{slot,variation}],minutes:null});
  await evaluate(`document.querySelector('#code-form input').value=${JSON.stringify(code)};document.querySelector('#code-form').requestSubmit()`);
  await acceptLeaveIfShown();await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}`);
  return code;
 }
 async function answer(part,value){await evaluate(`{const e=document.querySelector('[data-part="${part}"]');e.value=${JSON.stringify(value)};e.dispatchEvent(new Event('input',{bubbles:true}));}`);}
 await send('Emulation.setDeviceMetricsOverride',{width:1100,height:1000,deviceScaleFactor:1,mobile:false});
 await openSlot(652); // divide an expression, Foundation
 await answer('0','(4x+6)/2');await click('#submit');
 assert.ok(await evaluate(`document.querySelector('#feedback-652-0').textContent.includes('1/2')`));
 assert.ok(await evaluate(`document.querySelector('#feedback-652-0').textContent.includes('Divide each term in the numerator by 2')`));
 assert.ok(await evaluate(`document.querySelector('#feedback-652-0').classList.contains('partial')`));
 await screenshot('algebra-partial-desktop');
 await send('Page.reload');await until('Boolean(document.querySelector("#feedback-652-0"))');
 assert.ok(await evaluate(`document.querySelector('#feedback-652-0').textContent.includes('1/2')`));
 await click('#retry');await until('!document.querySelector("#submit-result")');
 await answer('0','2x+3');await answer('1','2x-1');await click('#submit');
 assert.ok(await evaluate(`document.querySelector('#feedback-652-0').textContent.includes('2/2')`));
 assert.ok(await evaluate(`document.querySelector('#submit-result').textContent.includes('100%')`));
 await openSlot(665); // inverse linear function: (x+3)/2 is finished
 await answer('0','(2x+6)/4');await click('#submit');
 assert.ok(await evaluate(`document.querySelector('#feedback-665-0').textContent.includes('1/2')`));
 assert.ok(await evaluate(`document.querySelector('#feedback-665-0').textContent.includes('cancel any common numerical factor')`));
 await click('#retry');await until('!document.querySelector("#submit-result")');
 await answer('0','(x+3)/2');await click('#submit');
 assert.ok(await evaluate(`document.querySelector('#feedback-665-0').textContent.includes('2/2')`));
 await send('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:false});
 assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'));
 await screenshot('algebra-mobile');
 await click('#submit');
 await evaluate(`document.querySelector('#maths-topic').value='algebra';document.querySelector('#maths-topic').dispatchEvent(new Event('change'))`);
 await until(`document.querySelector('#maths-topic')?.value==='algebra'`);
 await evaluate(`document.querySelector('#challenge-level').value='beginner';document.querySelector('#challenge-level').dispatchEvent(new Event('change'))`);
 await until(`document.querySelector('#challenge-level')?.value==='beginner'`);
 let set=resolve(await evaluate(`document.querySelector('#display-code').textContent`));
 assert.ok(set.questions.every(q=>q.challengeLevel==='beginner'&&q.tags.includes('maths:algebra')));
 await click('#new-focus');await until(`document.querySelector('#display-code').textContent!==${JSON.stringify(set.code)}`);
 set=resolve(await evaluate(`document.querySelector('#display-code').textContent`));assert.ok(set.questions.every(q=>q.tags.includes('maths:algebra')));
 await send('Page.reload');await until(`document.querySelector('#maths-topic')?.value==='algebra'&&document.querySelector('#challenge-level')?.value==='beginner'`);
 await screenshot('algebra-filter-mobile');
 // Check reflow at 200% text size, with visible keyboard focus.
 await send('Emulation.setDeviceMetricsOverride',{width:550,height:850,deviceScaleFactor:1,mobile:false});
 await evaluate(`document.documentElement.style.fontSize='200%';document.querySelector('#maths-topic').focus()`);
 assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'));
 await screenshot('algebra-zoom');
 await evaluate(`document.documentElement.style.fontSize=''`);
 for(const slot of [785,792,835,885]){
  await openSlot(slot);assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'));await screenshot('enriched-'+slot);
 }
 await openSlot(50);
 assert.ok(await evaluate(`document.querySelector('#challenge-level').selectedOptions[0].textContent.includes('25k+')`));
 assert.equal(await evaluate(`document.querySelectorAll('[data-puzzle-focus="go"] svg circle').length`),7);
 await screenshot('go-card-enriched');
 assert.deepEqual(errors,[]);
 console.log('Enrichment browser checks passed: partial/full algebra, reduced rearrangement, reload/submission, maths topic/level/new sets, mobile/text zoom, small Sudoku, rectangular path, guided tangram and Go rank/card.');
} finally {ws.close();}
