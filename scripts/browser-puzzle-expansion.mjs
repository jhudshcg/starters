// Run against an isolated headless Chrome started with --remote-debugging-port=9227.
// The profile must be dedicated to testing: this script clears the app's test storage.
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {encode,BANK_VERSION} from '../js/codes.js';
import {choose,resolve,banks} from '../js/bank.js';
const legacyExamDisplay=resolve('BIAkAiAg').code;
const legacyPuzzleDisplay=resolve('BA8D_x_4').code;
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
// Focused coverage of the expanded addresses, real puzzle controls and old timer migration.
async function fresh(code){
 await send('Page.navigate',{url:'about:blank'});
 const init=await send('Page.addScriptToEvaluateOnNewDocument',{source:'localStorage.removeItem("dsd-starters-v1")'});
 await send('Page.navigate',{url:base+'/#set='+code});
 await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}`);
 await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:init.identifier});
}
try{
 await send('Runtime.enable');await send('Page.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
 for(const slot of (process.argv.includes('--migration-only')?[]:[1024,1049,1074,1099,1124,1149,1174,1189,1199,1202,1215,1223,1229])){
  const set=resolve({version:BANK_VERSION,type:0,entries:[{slot,variation:0}],minutes:null}),q=set.questions[0],p=q.parts[0];
  await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  await fresh(set.code);assert.equal(set.code.length,9);
  assert.equal(await evaluate('document.querySelector(".question").dataset.question'),String(slot));
  if(p.kind==='tiling')assert.equal(await evaluate('document.querySelectorAll("[data-tiling-board] [stroke-dasharray]").length'),4);
  await evaluate(`(()=>{
   const q=${JSON.stringify(q)},p=q.parts[0];
   const button=(action,value)=>document.querySelector('[data-challenge-action="'+action+'"]'+(value===undefined?'':'[data-value="'+value+'"]')).click();
   if(['logic-grid','equation-grid'].includes(p.kind))JSON.parse(p.answer).forEach((row,c)=>row.forEach((v,r)=>{button('candidate',c+','+r+','+v);button('candidate',c+','+r+','+v);}));
   else if(['sudoku','cage-grid'].includes(p.kind))JSON.parse(p.answer).forEach((v,i)=>{if(!p.givens[i]){button('cell',i);button('digit',v);}});
   else if(p.kind==='cover-path')JSON.parse(p.answer).forEach(v=>button('path',v));
   else if(p.kind==='tiling')JSON.parse(p.answer).forEach((place,i)=>{
    button('piece',i);button('place');
    for(let n=0;n<((place.rotation%360)+360)%360/45;n++)button('rotate',45);
    if(place.flipped)button('flip');
    for(let n=0;n<Math.abs(place.x-4)*2;n++)button('move',place.x<4?'-0.5,0':'0.5,0');
    for(let n=0;n<Math.abs(place.y-4)*2;n++)button('move',place.y<4?'0,-0.5':'0,0.5');
   });
   else for(const part of q.parts){const input=document.querySelector('[data-part="'+part.id+'"]');input.value=part.answer;input.dispatchEvent(new Event('input',{bubbles:true}));}
  })()`);
  // Real answer entry must persist unchanged and score through the production marker.
  const answers=await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("dsd-starters-v1")).active.answers)');
  await send('Page.reload');await until('Boolean(document.querySelector("#submit"))');
  assert.equal(await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("dsd-starters-v1")).active.answers)'),answers);
  await click('#submit');await until('Boolean(document.querySelector("#submit-result"))');
  assert.equal(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1")).active.result.percentage'),100,`${slot}: ${q.title}`);
  await click('[data-reveal]');assert.ok(await evaluate('Boolean(document.querySelector(".solution"))'));
  for(const [width,zoom] of [[1280,2],[320,1]]){
   await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===320});
   await evaluate(`document.body.style.zoom=${zoom}`);
   assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),`${slot}: overflow at ${width}, zoom ${zoom}`);
  }
  if([1124,1229].includes(slot)){const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});await writeFile(`/private/tmp/starters-expanded-${slot}.png`,Buffer.from(shot.data,'base64'));}
  console.log(`Expanded puzzle ${slot}: controls, scoring, reload, reveal and reflow passed.`);
 }
 // Legacy timed active attempts migrate without losing work, history or deadline.
 const legacy='BA8D_x_4A';
 const {decodeLegacyCode}=await import('../js/codes.js');
 const migrated=encode(decodeLegacyCode(legacy));await fresh(migrated);
 const fixture=await evaluate(`(()=>{const s=JSON.parse(localStorage.getItem('dsd-starters-v1'));s.active.code=${JSON.stringify(legacy)};s.active.answers={120:{0:'saved draft'}};s.active.deadline=Date.now()+240000;delete s.codeFormat;delete s.active.tracking;return s;})()`);
 const install=await send('Page.addScriptToEvaluateOnNewDocument',{source:`localStorage.setItem('dsd-starters-v1',${JSON.stringify(JSON.stringify(fixture))})`});
 await send('Page.navigate',{url:base+'/?migration='+Date.now()+'#set='+legacy});await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(migrated)}`);
 await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:install.identifier});
 const restored=await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1"))');
 assert.equal(restored.active.id,fixture.active.id);assert.equal(restored.active.deadline,fixture.active.deadline);assert.deepEqual(restored.active.answers,fixture.active.answers);
 assert.equal(await evaluate('location.hash'),'#set='+migrated);
 await send('Page.reload');await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(migrated)}`);
 const saved=await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1"))');
 assert.equal(saved.codeFormat,'54-bank3');assert.equal(saved.active.code,migrated);assert.equal(saved.active.id,fixture.active.id);assert.equal(saved.active.deadline,fixture.active.deadline);assert.deepEqual(saved.active.answers,fixture.active.answers);
 assert.deepEqual(errors,[]);console.log('Expanded puzzle browser checks passed; legacy timed work and deadline survive migration and a second reload.');
}finally{ws.close();}
