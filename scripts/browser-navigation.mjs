/**
 * Purpose: Verify responsive entry pages and browser navigation in isolated Chrome.
 * Main contents: layout, focus recall, history and disclosure checks.
 * Used by: local verification. Uses: production on 8765, debugging on 9227. Libs: Node APIs.
 * Clears storage only in that dedicated test profile; screenshots go to /private/tmp.
 */
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const base=process.env.STARTERS_PREVIEW_URL??'http://127.0.0.1:8765';
const pages=await(await fetch('http://127.0.0.1:9227/json/list')).json();
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);}};
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const until=async expression=>{for(let n=0;n<100;n++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,50));}throw Error('Timed out '+expression+' '+JSON.stringify(await evaluate('({hash:location.pathname+location.search,heading:document.querySelector("h1")?.textContent,state:history.state})')));};
const reload=async()=>{const before=await evaluate('performance.timeOrigin');await send('Page.reload');await until(`performance.timeOrigin!==${before}`);};
const profile='JSON.parse(localStorage.getItem("dsd-starters-v1:profile:Layout%20Test"))';
const click=selector=>evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
const change=(selector,value)=>evaluate(`{const node=document.querySelector(${JSON.stringify(selector)});node.value=${JSON.stringify(value)};node.dispatchEvent(new Event('change',{bubbles:true}));}`);
const home=async()=>{await click('.brand');await until('Boolean(document.querySelector("#code-form"))');};
const back=async expected=>{await evaluate('history.back()');await until(expected);};
const errors=[];
const oldMessage=ws.onmessage;ws.onmessage=event=>{const msg=JSON.parse(event.data);if(msg.method==='Runtime.exceptionThrown')errors.push(msg.params.exceptionDetails);oldMessage(event);};
try{
 await send('Runtime.enable');await send('Page.enable');await send('Emulation.setFocusEmulationEnabled',{enabled:true});
 await send('Page.navigate',{url:base});await until('Boolean(document.querySelector("#main"))');
 await evaluate('localStorage.clear()');await reload();await until('Boolean(document.querySelector("#profile-name"))');
 await evaluate('document.querySelector("#profile-name").value="Layout Test";document.querySelector("[role=dialog] form").requestSubmit()');await until('Boolean(document.querySelector("#code-form"))');
 for(const width of [360,390,440,640,768,1024,1280]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:false});
  const layout=await evaluate(`(()=>{const rect=sel=>document.querySelector(sel).getBoundingClientRect();const icons=['#theme-picker','#theme-toggle','#nav-toggle'].map(rect);const cards=[...document.querySelectorAll('.type-card')].map(n=>n.getBoundingClientRect());const notes=[...document.querySelectorAll('.lower-panel .note-panel')].map(n=>n.getBoundingClientRect());return {overflow:document.documentElement.scrollWidth>innerWidth,icons:icons.map(r=>({top:r.top,left:r.left,right:r.right})),brand:Math.max(rect('.brand-icon').right,rect('.brand-copy').right),subtitle:(()=>{const n=document.querySelector('.brand-sub'),range=document.createRange();range.selectNodeContents(n);return {lines:range.getClientRects().length,top:n.getBoundingClientRect().top,left:n.getBoundingClientRect().left,right:n.getBoundingClientRect().right,logoBottom:rect('.brand-icon').bottom,logoLeft:rect('.brand-icon').left};})(),cards:cards.map(r=>({top:r.top,left:r.left})),notes:notes.map(r=>r.top),links:document.querySelectorAll('.activity-grid .topic-search-link').length};})()`);
  assert.equal(layout.overflow,false,`${width} page overflow`);
  assert.equal(new Set(layout.icons.map(r=>r.top)).size,1,`${width} icons wrap`);
  assert.ok(layout.brand<=layout.icons[0].left,`${width} logo row overlaps controls`);
  assert.equal(layout.subtitle.lines,1,`${width} subject text wraps`);
  assert.ok(layout.subtitle.top>=layout.subtitle.logoBottom&&layout.subtitle.top-layout.subtitle.logoBottom<16,`${width} subtitle moved from beneath logo`);
  assert.ok(Math.abs(layout.subtitle.left-layout.subtitle.logoLeft)<1&&layout.subtitle.right<=width,`${width} subtitle alignment/bounds`);
  assert.ok(layout.icons[2].right<=width,`${width} controls out of bounds`);
  assert.equal(layout.cards[0].top,layout.cards[1].top,`${width} two cards`);
  assert.equal(layout.notes[0],layout.notes[1],`${width} two notes`);
  assert.equal(layout.links,0);
  if(width===360||width===1280){const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});await writeFile(`/private/tmp/tlevel-home-${width}.png`,Buffer.from(shot.data,'base64'));}
 }
 assert.deepEqual(await evaluate('[...document.querySelectorAll("[data-start]")].map(b=>b.dataset.start)'),['1','2','0']);
 assert.equal(await evaluate('document.querySelector("#nav-menu")'),null,'Menu stays hidden until requested');
 await click('#nav-toggle');await until('Boolean(document.querySelector("#nav-menu"))');
 await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
 await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
 await until('!Boolean(document.querySelector("#nav-menu"))');
 await send('Emulation.setDeviceMetricsOverride',{width:360,height:1100,deviceScaleFactor:1,mobile:false});
 await click('#theme-picker');await until('Boolean(document.querySelector("#theme-menu"))');
 assert.ok(await evaluate('(()=>{const r=document.querySelector("#theme-menu").getBoundingClientRect();return r.left>=0&&r.right<=innerWidth;})()'),'Theme picker fits');
 await evaluate('document.querySelector("#theme-picker").click()');
 const mode=await evaluate('document.documentElement.dataset.theme');await click('#theme-toggle');assert.notEqual(await evaluate('document.documentElement.dataset.theme'),mode);await click('#theme-toggle');
 await click('[data-start="2"]');await until('Boolean(document.querySelector("#display-code"))');
 const defaultFocus=await evaluate('document.querySelector("#focus").value');
 assert.ok(await evaluate('document.querySelectorAll(".question").length>0'));
 await change('#focus','records');await until('document.querySelector("h1")?.textContent==="Dictionaries"');
 const first=await evaluate(`${profile}.active`);
 assert.ok(await evaluate('document.querySelector(".project-link").compareDocumentPosition(document.querySelector(".submit-bar")) & Node.DOCUMENT_POSITION_PRECEDING'));
 assert.equal(await evaluate('document.querySelectorAll("main .onedrive-panel").length'),0);
 await click('.project-link a');await until('Boolean(document.querySelector("#python-projects"))');
 assert.equal(await evaluate('document.querySelectorAll("#python-projects details").length'),18);
 await back('document.querySelector("#focus")?.value==="records"');
 assert.equal(await evaluate(`${profile}.active.id`),first.id,'Back restores the same attempt');
 await click('#new-type');await until(`document.querySelector('#focus')?.value!=='records' && Boolean(document.querySelector('#display-code'))`);
 await back('document.querySelector("#focus")?.value==="records"');
 assert.equal(await evaluate(`${profile}.active.id`),first.id,'Back restores previous set');
 await back(`document.querySelector("#focus")?.value===${JSON.stringify(defaultFocus)}`);
 assert.ok(await evaluate('document.querySelectorAll(".question").length>0'),'Back restores the default set');
 await evaluate('history.forward()');await until('document.querySelector("#focus")?.value==="records"');
 await home();await click('[data-start="2"]');await until('document.querySelector("#focus")?.value==="records"');
 await home();
 await evaluate('window.realNow=Date.now;Date.now=()=>window.realNow()+7200001');
 await click('[data-start="2"]');await until('Boolean(document.querySelector("#display-code"))');
 await evaluate('Date.now=window.realNow');
 await home();await click('[data-start="0"]');await until('Boolean(document.querySelector(".puzzle-cards"))');
 assert.ok(await evaluate('document.querySelectorAll(".question").length>0'));
 assert.match(await evaluate('document.querySelector(".breadcrumbs").textContent'),/Home.*Puzzles/);
 const focus=await evaluate('document.querySelector("[data-puzzle-focus]").dataset.puzzleFocus');
 await click('[data-puzzle-focus]');await until('Boolean(document.querySelector("#display-code"))');
 assert.equal(await evaluate('document.querySelector(".puzzle-picker").open'),false);
 assert.ok(await evaluate('document.querySelector(".puzzle-picker").getBoundingClientRect().bottom<=document.querySelector("h1").getBoundingClientRect().top'));
 assert.match(await evaluate('document.querySelector(".breadcrumbs").textContent'),/Home.*Puzzles.*\//);
 await click('.puzzle-picker summary');assert.equal(await evaluate('document.querySelector(".puzzle-picker").open'),true);
 await click('.breadcrumbs [data-practice-picker]');await until('Boolean(document.querySelector("#display-code"))');
 await home();await click('[data-start="0"]');await until('Boolean(document.querySelector("#display-code"))');
 assert.equal(await evaluate(`${profile}.practiceSelections[0].focus`),focus);
 await home();await click('[data-start="1"]');await until('Boolean(document.querySelector("[data-exam-start]"))');
 await click('[data-exam-start="1"]');await until('Boolean(document.querySelector("#display-code"))');
 const topic=await evaluate('document.querySelector("#focus option:nth-child(2)").value');await change('#focus',topic);await until('Boolean(document.querySelector("#subtopic"))');
 const subtopic=await evaluate('document.querySelector("#subtopic option:nth-child(2)").value');await change('#subtopic',subtopic);await until(`document.querySelector('#subtopic')?.value===${JSON.stringify(subtopic)}`);
 await home();await click('[data-start="1"]');await until('Boolean(document.querySelector("[data-exam-start]"))');await click('[data-exam-start="1"]');await until(`document.querySelector('#subtopic')?.value===${JSON.stringify(subtopic)}`);
 const coreCode=await evaluate('location.pathname+location.search');
 await reload();await until(`location.pathname+location.search===${JSON.stringify(coreCode)} && document.querySelector('#subtopic')?.value===${JSON.stringify(subtopic)}`);
 // Keep working cancels Back without replacing the earlier visible page.
 const input=await evaluate('document.querySelector(".question input:not([type=radio])")?.id');
 if(input){
  await evaluate(`{const n=document.getElementById(${JSON.stringify(input)});n.value='draft';n.dispatchEvent(new Event('input',{bubbles:true}));}`);
  const route=await evaluate('location.pathname+location.search');await evaluate('history.back()');await until('Boolean(document.querySelector("[role=dialog] button[value=stay]"))');await click('[role=dialog] button[value=stay]');await until(`location.pathname+location.search===${JSON.stringify(route)} && !document.querySelector('[role=dialog]')`);
  assert.equal(await evaluate(`document.getElementById(${JSON.stringify(input)}).value`),'draft');
  await evaluate('history.back()');await until('Boolean(document.querySelector("[role=dialog] button[value=leave]"))');await click('[role=dialog] button[value=leave]');await until('Boolean(document.querySelector("[data-exam-start]"))');
 }
 await home();await click('[data-start="1"]');await until('Boolean(document.querySelector("[data-exam-start]"))');await click('[data-exam-start="3"]');await until('Boolean(document.querySelector("#display-code"))');
 await change('#focus','task2');await until('Boolean(document.querySelector("#esp-recipe"))');
 const recipe=await evaluate('document.querySelector("#esp-recipe option:last-child").value');await change('#esp-recipe',recipe);await until(`document.querySelector('#esp-recipe')?.value===${JSON.stringify(recipe)}`);
 await home();await click('[data-start="1"]');await until('Boolean(document.querySelector("[data-exam-start]"))');await click('[data-exam-start="3"]');await until(`document.querySelector('#esp-recipe')?.value===${JSON.stringify(recipe)}`);
 await home();
 await evaluate('document.querySelector("#code-form input").value="loop";document.querySelector("#code-form").requestSubmit()');await until('Boolean(document.querySelector("#topic-search"))');
 await evaluate('document.querySelector("#topic-search").value="string";document.querySelector("#topic-search-form").requestSubmit()');await until('location.search.includes("q=string")');
 await back('document.querySelector("#topic-search")?.value==="loop"');
 await click('.footer-links a[href$="/faq/"]');await until('document.querySelector("h1")?.textContent==="A little help."');
 assert.equal(await evaluate('document.querySelectorAll("main details").length'),9);
 assert.deepEqual(errors,[]);
 console.log('Responsive navigation passed: 360–1280px, menu, default/remembered focus, subsection recall, Back/Forward and cancellation, puzzle picker/breadcrumbs, projects and FAQ.');
}finally{ws.close();}
