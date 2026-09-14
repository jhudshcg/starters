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
async function openFocus(type,focus,count=1){
 await send('Page.navigate',{url:base+'/#home'});await until('Boolean(document.querySelector("#code-form"))');
 const code=await evaluate(`(async()=>{const {choose,resolve}=await import('./js/bank.js');const set=choose(${type},${JSON.stringify(focus)});return ${type}===0?resolve({...set,entries:set.entries.slice(0,${count})}).code:set.code;})()`);
 await evaluate(`document.querySelector('#code-form input').value=${JSON.stringify(code)};document.querySelector('#code-form').requestSubmit()`);
 await until(`Boolean(document.querySelector('dialog')) || document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}`);
 if(await evaluate('Boolean(document.querySelector("dialog"))'))await click('dialog button[value="leave"]');
 await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}`);
 return code;
}
const puzzlePart=()=>evaluate(`(async()=>{const {resolve}=await import('./js/bank.js');return resolve(document.querySelector('#display-code').textContent).questions[0].parts[0];})()`);
try{
 await send('Runtime.enable');await send('Page.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
 await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url:base+'/?smoke='+Date.now()});await until('Boolean(document.querySelector("#code-form"))');
 await evaluate('localStorage.removeItem("dsd-starters-v1")');await send('Page.reload');await until('Boolean(document.querySelector("#code-form"))');
 assert.equal(await evaluate('document.querySelectorAll("[data-start]").length'),3);
 await openFocus(1,'CA2.1');assert.equal(await evaluate('document.querySelectorAll(".question").length'),3);
 assert.equal(await evaluate('document.querySelectorAll(".part-coverage").length'),15);
 await evaluate(`(async()=>{const {resolve}=await import('./js/bank.js');for(const q of resolve(document.querySelector('#display-code').textContent).questions)for(const p of q.parts){const el=document.querySelector('[data-slot="'+q.slot+'"][data-part="'+p.id+'"]');el.value=p.answer;el.dispatchEvent(new Event('input',{bubbles:true}));}})()`);
 await send('Page.reload');await until('Boolean(document.querySelector("#submit"))');await click('#submit');await until('Boolean(document.querySelector("#submit-result"))');assert.ok(await evaluate('document.querySelector("#submit-result").textContent.includes("100%")'));await screenshot('exam-expanded');
 // Review gates reset on reload, guard handlers, and preserve recorded attempts.
 await click('[data-reveal]');assert.equal(await evaluate('document.querySelectorAll(".solution").length'),1);
 const historyBefore=await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("dsd-starters-v1")).history)');
 await send('Page.reload');await until('Boolean(document.querySelector("#submit"))');
 assert.equal(await evaluate('document.querySelectorAll(".solution,.feedback").length'),0);
 assert.ok(await evaluate('document.querySelector("[data-check]").disabled && document.querySelector("[data-reveal]").disabled'));
 await evaluate('document.querySelector("[data-check]").onclick();document.querySelector("[data-reveal]").onclick()');
 assert.equal(await evaluate('document.querySelectorAll(".solution,.feedback").length'),0);
 await click('#submit');assert.ok(await evaluate('!document.querySelector("[data-check]").disabled'));
 await click('[data-check]');
 assert.equal(await evaluate('JSON.stringify(JSON.parse(localStorage.getItem("dsd-starters-v1")).history)'),historyBefore);
 await click('#retry');await until('!document.querySelector("#submit").disabled');
 assert.ok(await evaluate('document.querySelector("[data-reveal]").disabled'));
 // The shared form works on activity and progress pages, including errors/cancel.
 await evaluate('document.querySelector("#global-code").value="bad";document.querySelector("#global-code-form").requestSubmit()');
 await until('Boolean(document.querySelector("#global-code-error").textContent)');
 assert.ok(await evaluate('Boolean(document.querySelector("#submit"))'));
 await evaluate('document.querySelector("#global-code").value="BIAkAiAg";document.querySelector("#global-code-form").requestSubmit()');
 await until('Boolean(document.querySelector("dialog"))');await click('dialog button[value="stay"]');
 assert.notEqual(await evaluate('document.querySelector("#display-code").textContent'),'BIAkAiAg');
 await click('#nav-progress');await until('Boolean(document.querySelector("#export-csv"))');
 await evaluate('document.querySelector("#global-code-form").requestSubmit()');
 await until('Boolean(document.querySelector("dialog"))');await click('dialog button[value="leave"]');
 await until('document.querySelector("#display-code")?.textContent==="BIAkAiAg"');
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
 const goQuestions=await evaluate(`(async()=>{const {resolve}=await import('./js/bank.js');return resolve(document.querySelector('#display-code').textContent).questions;})()`);
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
 await openFocus(2,'functions');assert.equal(await evaluate('document.querySelectorAll(".question").length'),2);
 await openFocus(2,'algorithms');assert.equal(await evaluate('document.querySelectorAll(".question").length'),2);
 await openFocus(0,'go',3);await send('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:false});
 assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'Go causes whole-page overflow');
 assert.ok(await evaluate("document.querySelector('footer').textContent.includes('designed by Joe Hudson')"));
 await screenshot('go-mobile');

 assert.deepEqual(errors,[]);console.log('Browser smoke passed: exam scoring and coverage, candidate grid and Undo, Sudoku notes/reload, continuous path drag with arbitrary start, tangram placement/reveal, all nine subtypes, three-puzzle sets, Go replies/hints/reload/drag replay, new coding focuses, footer, timer recovery and 320px reflow.');
} finally {ws.close();}
