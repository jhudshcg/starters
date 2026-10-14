/** Focused Python guide checks in isolated Chrome; clears only its test profile storage. */
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {banks,resolve} from '../js/bank.js';
import {BANK_VERSION} from '../js/codes.js';
const base=process.env.STARTERS_PREVIEW_URL??'http://127.0.0.1:8765';
const pages=await(await fetch('http://127.0.0.1:9227/json/list')).json();
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);}};
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const until=async expression=>{for(let n=0;n<100;n++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,50));}throw Error('Timed out '+expression+' '+JSON.stringify(await evaluate('({hash:location.hash,heading:document.querySelector("h1")?.textContent})')));};
const profile='JSON.parse(localStorage.getItem("dsd-starters-v1:profile:Guide%20Test"))';
const open=async entries=>{
 // Pace the 60 synthetic page changes below Chrome's history flood limit.
 await new Promise(resolve=>setTimeout(resolve,500));
 const set=resolve({version:BANK_VERSION,type:2,entries,minutes:null});
 await evaluate(`location.hash='#set=${set.code}'`);await until(`document.querySelector('#display-code')?.textContent==='${set.code}'`);return set;
};
// Wait for the new document, rather than accidentally accepting controls from before reload.
const reload=async()=>{const origin=await evaluate('performance.timeOrigin');await send('Page.reload');await until(`performance.timeOrigin!==${origin}`);};

try{
 await send('Page.enable');await send('Emulation.setFocusEmulationEnabled',{enabled:true});await send('Page.navigate',{url:base});await until('Boolean(document.querySelector("#main"))');
 await evaluate('localStorage.clear()');await reload();await until('Boolean(document.querySelector("#profile-name"))');
 await evaluate('document.querySelector("#profile-name").value="Guide Test";document.querySelector("[role=dialog] form").requestSubmit()');await until('!document.querySelector("[role=dialog]")');
 await evaluate('document.querySelector("#nav-toggle").click()');await until('Boolean(document.querySelector("#nav-menu"))');
 assert.ok(await evaluate('Boolean(document.querySelector(\'a[href="https://joe312213.github.io/practice-gcse-maths/"]\'))'));
 await evaluate('document.querySelector("#nav-toggle").click()');
 assert.ok(await evaluate('!document.querySelector("[data-puzzle-focus=\'classic maths\']")'));
 await open([{slot:63,variation:0},{slot:64,variation:0}]);
 assert.equal(await evaluate('document.querySelectorAll("[data-python-guide]").length'),1);
 assert.equal(await evaluate('document.querySelectorAll("[data-python-guide][open]").length'),0);
 await evaluate('document.querySelector("[data-python-guide=lists] summary").focus()');
 await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',unmodifiedText:'\r',windowsVirtualKeyCode:13});
 await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
 await until(`${profile}.active.pythonGuidesOpen?.lists===true`);
 assert.equal(Boolean(await evaluate(`${profile}.active.hints[63]`)),false);
 assert.equal(Boolean(await evaluate(`${profile}.active.hints[64]`)),false);
 await reload();await until('Boolean(document.querySelector("[data-python-guide=lists][open]"))');
 await evaluate('document.querySelector("[data-python-guide=lists] summary").click()');await until(`${profile}.active.pythonGuidesOpen.lists===false`);
 assert.equal(Boolean(await evaluate(`${profile}.active.hints[63]`)),false,'Guides must not add question assistance');
 await evaluate('document.querySelector("#submit").click()');await until('Boolean(document.querySelector("#submit-result"))');
 assert.doesNotMatch(await evaluate('document.querySelector("#submit-result").textContent'),/Assisted practice/);
 assert.ok(await evaluate(`${profile}.history.at(-1).partScores.every(part=>part.firstMax>0)`),'Guide reading retains independent evidence');
 await open([{slot:67,variation:0}]);
 await evaluate('document.querySelector("#submit").click()');await until('Boolean(document.querySelector("#submit-result"))');
 await evaluate('document.querySelector("[data-python-guide=algorithms] summary").click()');await until(`${profile}.active.pythonGuidesOpen.algorithms===true`);
 assert.equal(Boolean(await evaluate(`${profile}.active.hints[67]`)),false,'Post-submission reading must not rewrite the attempt');
 const examples=[...new Set(banks[2].map(q=>q.focus))].map(focus=>banks[2].find(q=>q.focus===focus));
 for(const width of [320,640,1280]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
  for(const q of examples){
   await open([{slot:q.slot,variation:0}]);
   await evaluate('document.querySelectorAll("[data-python-guide]").forEach(guide=>guide.open=true)');
   const layout=await evaluate(`(()=>{const guide=document.querySelector('[data-python-guide]');return {page:document.documentElement.scrollWidth<=innerWidth+1,overflow:[guide,...guide.querySelectorAll('pre,figure')].filter(node=>node.scrollWidth>node.clientWidth+1).map(node=>node.tagName),font:Math.min(...[...guide.querySelectorAll('pre')].map(node=>parseFloat(getComputedStyle(node).fontSize)))};})()`);
   assert.ok(layout.page,`${q.focus}/${width}: page overflow`);assert.deepEqual(layout.overflow,[],`${q.focus}/${width}`);assert.ok(layout.font>=16,`${q.focus}/${width}: small code`);
  }
 }
 await send('Emulation.setDeviceMetricsOverride',{width:320,height:1000,deviceScaleFactor:1,mobile:false});await open([{slot:63,variation:1}]);
 await evaluate('document.querySelector("[data-python-guide]").open=true;document.querySelector("[data-python-guide]").scrollIntoView()');
 const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile('/private/tmp/tlevel-python-guide-mobile.png',Buffer.from(shot.data,'base64'));
 console.log('Python guides passed: 20 focuses at 320/640/1280px; keyboard disclosure, persistence, independent progress, review and Maths link.');
}finally{ws.close();}
