// Package integration check against production and isolated Chrome on port 9227.
// The profile must be dedicated to testing: this script clears the app's test storage.
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {BANK_VERSION} from '../js/codes.js';
import {resolve} from '../js/bank.js';
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
// Verify package-backed controls through the parent-owned submission and named profile.
async function fresh(code){
 await send('Page.navigate',{url:'about:blank'});
 const init=await send('Page.addScriptToEvaluateOnNewDocument',{source:'localStorage.clear()'});
 await send('Page.navigate',{url:base+'/#set='+code});
 await until(`document.querySelector('#profile-name') || document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}`);
 if(await evaluate('Boolean(document.querySelector("#profile-name"))'))await evaluate('document.querySelector("#profile-name").value="Puzzle integration";document.querySelector("dialog form").requestSubmit()');
 await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}`);
 await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:init.identifier});
}
try{
 await send('Runtime.enable');await send('Page.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
 for(const slot of [1024,1049,1074,1099,1124,1149,1174,1189,1199,1202,1215,1223,1229,170]){
  const set=resolve({version:BANK_VERSION,type:0,entries:[{slot,variation:0}],minutes:null}),q=set.questions[0],p=q.parts[0];
  await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  await fresh(set.code);assert.equal(set.code.length,9);
  assert.equal(await evaluate('document.querySelector(".question").dataset.question'),String(slot));
  if(slot===170){
   assert.equal(await evaluate('document.querySelectorAll(".go-guidance [data-hint]").length'),1);
   assert.equal(await evaluate('document.querySelector(".go-guidance [data-challenge-action=go-hint]").textContent'),'Show next move');
   assert.ok(await evaluate('document.querySelector(".go-guidance").getBoundingClientRect().bottom<=document.querySelector(".go-board").getBoundingClientRect().top'));
   assert.equal(await evaluate('document.querySelector(".question").textContent.includes("Dashed margins indicate")'),false);

   // Written and move hints toggle independently; hiding never removes assistance.
   await click('[data-hint]');assert.ok(await evaluate('Boolean(document.querySelector(".hint-text"))'));
   await click('[data-hint]');assert.equal(await evaluate('Boolean(document.querySelector(".hint-text"))'),false);
   assert.equal(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1:profile:Puzzle%20integration")).active.hints[170]'),true);
   await send('Page.reload');await until('Boolean(document.querySelector("[data-hint]"))');
   assert.equal(await evaluate('Boolean(document.querySelector(".hint-text"))'),false);
   await click('[data-challenge-action="go-hint"]');
   assert.equal(await evaluate('document.querySelector("[data-challenge-action=go-hint]").getAttribute("aria-expanded")'),'true');
   await click('[data-challenge-action="go-hint"]');
   assert.equal(await evaluate('document.querySelector("[data-challenge-action=go-hint]").getAttribute("aria-expanded")'),'false');
   // This source position has a legal, unrecorded move at the upper-left corner.
   assert.ok(!p.tree.children.some(child=>child.move===0));
   await click('[data-challenge-action="go"][data-value="0"]');
   assert.ok(await evaluate(`Boolean(document.querySelector('[data-go-stone="0"]'))`));
   assert.match(await evaluate('document.querySelector(".go-status").textContent'),/No recorded response/);
   await click('[data-challenge-action="undo"]');
  }
  if(p.kind==='tiling')assert.equal(await evaluate('document.querySelectorAll("[data-tiling-board] [stroke-dasharray]").length'),4);
  await evaluate(`(async()=>{
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
   else if(p.kind==='go'){const moves=JSON.parse(p.answer).moves;for(let i=0;i<moves.length;i++){const index=JSON.parse(document.querySelector('[data-go-moves]').dataset.goMoves).length;if(index>=moves.length)break;button('go',moves[index]);await new Promise(resolve=>setTimeout(resolve,750));}}
   else for(const part of q.parts){const inputs=[...document.querySelectorAll('[data-part="'+part.id+'"]')],input=part.options?inputs.find(input=>input.value===part.answer):inputs[0];input.value=part.answer;if(part.options)input.checked=true;input.dispatchEvent(new Event(part.options?'change':'input',{bubbles:true}));}
  })()`);
  // Real answer entry must persist unchanged and score through the production marker.
  const answers=await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("dsd-starters-v1:profile:Puzzle%20integration")).active.answers)');
  await send('Page.reload');await until('Boolean(document.querySelector("#submit"))');
  assert.equal(await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("dsd-starters-v1:profile:Puzzle%20integration")).active.answers)'),answers);
  await click('#submit');await until('Boolean(document.querySelector("#submit-result"))');
  assert.equal(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1:profile:Puzzle%20integration")).active.result.percentage'),100,`${slot}: ${q.title}`);
  await click('[data-reveal]');assert.ok(await evaluate('Boolean(document.querySelector(".solution"))'));
  // Effective CSS viewport widths cover desktop and 200%/400% zoom reflow.
  for(const width of [1280,640,320]){
   await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===320});
   await evaluate('document.body.style.zoom=1');
   assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),`${slot}: overflow at ${width}`);
  }
  if([1124,1229].includes(slot)){const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});await writeFile(`/private/tmp/starters-expanded-${slot}.png`,Buffer.from(shot.data,'base64'));}
  console.log(`Integrated puzzle ${slot}: controls, scoring, reload, reveal and reflow passed.`);
 }
 assert.deepEqual(errors,[]);console.log('Puzzle package integration passed: parent submission, named-profile persistence, reveal and responsive layout.');
}finally{ws.close();}
