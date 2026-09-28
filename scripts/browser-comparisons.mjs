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
 for(const slot of [161,162,163,164,165,166,167,168,169])for(const variation of [0,1]){
  const set=resolve({version:BANK_VERSION,type:1,entries:[{slot,variation}],minutes:null});
  await send('Page.navigate',{url:base+'/#set='+set.code});await acceptLeaveIfShown();await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(set.code)}`);
  const answers=set.questions[0].parts.map(p=>({id:p.id,value:p.answer}));
  await evaluate(`{for(const a of ${JSON.stringify(answers)}){const nodes=[...document.querySelectorAll('[data-part="'+a.id+'"]')];const input=nodes.find(n=>n.type!=='radio'||n.value===a.value);if(!input)throw Error('Missing control');if(input.type==='radio'){input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));}else{input.value=a.value;input.dispatchEvent(new Event('input',{bubbles:true}));}}}`);
  await send('Page.reload');await until('Boolean(document.querySelector("#submit"))');
  await click('#submit');await until('Boolean(document.querySelector(".result-score"))');
  assert.equal(await evaluate('document.querySelector(".result-score").textContent'),'100%');
  await click(`[data-reveal="${slot}"]`);assert.ok(await evaluate('Boolean(document.querySelector(".solution"))'));
  await send('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:true});
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
 }
 assert.deepEqual(errors,[]);console.log('18 comparison variations passed scoring, saved-answer reload, reveal and 320px reflow.');
}finally{ws.close();}
