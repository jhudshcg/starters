/** Isolated-browser integration for OneDrive handles and the human Go route. Clears test storage only. */
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const base=process.env.STARTERS_PREVIEW_URL??'http://127.0.0.1:8765';
const pages=await(await fetch('http://127.0.0.1:9227/json/list')).json();
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map(),errors=[],requests=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);else if(m.method==='Network.requestWillBeSent')requests.push(m.params.request.url);};
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(expression+"\n"+JSON.stringify(r.exceptionDetails));return r.result.value;};
const until=async expression=>{for(let i=0;i<150;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression+'\n'+await evaluate('document.body.innerText')+'\n'+JSON.stringify(errors));};
const click=s=>evaluate(`document.querySelector(${JSON.stringify(s)}).click()`);
try{
 await send('Runtime.enable');await send('Page.enable');await send('Network.enable');await send('Emulation.setFocusEmulationEnabled',{enabled:true});
 if(process.argv.includes('--inspect')){console.log(await evaluate('document.body.innerText'));console.log(errors);process.exit(0);}
 await send('Page.navigate',{url:base});await until('Boolean(document.querySelector("#main"))');
 await evaluate('localStorage.clear()');await send('Page.reload');await until('Boolean(document.querySelector("#profile-name"))');
 await evaluate('document.querySelector("#profile-name").value="File Browser Test";document.querySelector("dialog form").requestSubmit()');
 await until('!document.querySelector("dialog")');await until('Boolean(document.querySelector("#code-form"))');
 await evaluate('location.hash="#progress"');await until('Boolean(document.querySelector("[data-file-action=save]"))');
 // Real origin-private handles exercise writes and IndexedDB; only the native chooser is replaced.
 await evaluate(`(async()=>{window.__root=await navigator.storage.getDirectory();try{await __root.removeEntry('T-Level',{recursive:true});}catch{}try{await __root.removeEntry('DSD T-Level',{recursive:true});}catch{}window.showDirectoryPicker=async()=>__root;const keep=await __root.getFileHandle('unrelated.txt',{create:true});const w=await keep.createWritable();await w.write('keep');await w.close();})()`);
 await click('[data-file-action=save]');await until('document.querySelector("[data-file-status]").textContent.startsWith("Progress saved")');
 const name=await evaluate(`(async()=>{const folder=await __root.getDirectoryHandle('T-Level');window.__file=(await Array.fromAsync(folder.values())).find(f=>f.name.endsWith('.json'));return __file.name;})()`);
 assert.match(name,/^practice_progress_file_browser_test_[a-z0-9]{12}\.json$/);
 const initial=JSON.parse(await evaluate('(async()=>await (await __file.getFile()).text())()'));assert.match(initial.profileId,/^[0-9a-f-]{36}$/);
 assert.equal(await evaluate('(async()=>await (await (await __root.getFileHandle("unrelated.txt")).getFile()).text())()'),'keep');
 await click('.recommended-sets button');await until('Boolean(document.querySelector("#submit"))');await click('#submit');await until('Boolean(document.querySelector("#submit-result"))');
 await until('(async()=>JSON.parse(await (await __file.getFile()).text()).history.length===1)()');
 await send('Page.reload');await until('Boolean(document.querySelector("#submit-result"))');await evaluate('location.hash="#progress"');await until('Boolean(document.querySelector("[data-file-status]"))');
 await evaluate(`(async()=>{window.__root=await navigator.storage.getDirectory();window.__file=await (await __root.getDirectoryHandle('T-Level')).getFileHandle(${JSON.stringify(name)});window.__originalWrite=FileSystemFileHandle.prototype.createWritable;FileSystemFileHandle.prototype.createWritable=async function(){throw Error('Simulated disk failure');};})()`);
 await click('.recommended-sets button');await until('Boolean(document.querySelector("#submit"))');await click('#submit');await until('Boolean(document.querySelector("#submit-result"))');
 // File controls now live on My progress, rather than below question sets.
 await click('#nav-progress');await until('Boolean(document.querySelector("[data-file-status]"))');
 await until('document.querySelector("[data-file-status]").textContent.includes("Simulated disk failure")');
 assert.equal(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1:profile:File%20Browser%20Test")).history.length'),2);
 assert.equal(JSON.parse(await evaluate('(async()=>await (await __file.getFile()).text())()')).history.length,1);
 await evaluate('FileSystemFileHandle.prototype.createWritable=__originalWrite');await click('[data-file-action=save]');
 await until('(async()=>JSON.parse(await (await __file.getFile()).text()).history.length===2)()');
 // Local-storage failure must stop the file write and offer an honest fallback.
 await evaluate(`window.__originalSet=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key.startsWith('dsd-starters-v1:profile:'))throw new DOMException('Simulated quota','QuotaExceededError');return __originalSet.call(this,key,value);};`);
 await click('[data-file-action=save]');await until('document.querySelector("[data-file-status]").textContent.includes("Browser progress could not be saved")');
 assert.equal(await evaluate('document.querySelector("#storage-warning").hidden'),false);
 assert.equal(JSON.parse(await evaluate('(async()=>await (await __file.getFile()).text())()')).history.length,2);
 await evaluate('Storage.prototype.setItem=__originalSet;location.hash="#progress"');await until('Boolean(document.querySelector(".recommended-sets"))');
 await evaluate(`(async()=>{const w=await __file.createWritable();await w.write('external edit');await w.close();})()`);
 await click('[data-file-action=save]');await until('document.querySelector("[data-file-status]").textContent.includes("different progress")');
 assert.equal(await evaluate('(async()=>await (await __file.getFile()).text())()'),'external edit');
 assert.equal(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-v1:profile:File%20Browser%20Test")).history.length'),2);
 if(process.argv.includes('--files-only')){console.log('OneDrive local-first saves, write/local-storage failures, retry, reload and conflict checks passed.');ws.close();process.exit(0);}
 // Clear link without changing external files; the next board visit must not request engine assets.
 await click('[data-file-action=forget]');assert.equal(await evaluate('(async()=>await (await __file.getFile()).text())()'),'external edit');
 await evaluate('location.hash="#go"');await until('Boolean(document.querySelector("#go-size"))');
 assert.equal(requests.some(url=>url.includes('/engines/')),false);
 for(const size of [5,9,13,19]){
  await evaluate(`document.querySelector('#go-size').value='${size}';document.querySelector('#go-size').dispatchEvent(new Event('change'))`);
  assert.equal(await evaluate('document.querySelectorAll("#go-practice-board .go-point").length'),size*size);
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".go-board")).touchAction'),'pinch-zoom');
 }
 await evaluate('document.querySelector("#go-size").value="9";document.querySelector("#go-size").dispatchEvent(new Event("change"))');
 await click('[data-value="13"]');await click('[data-value="46"]');await click('[data-value="24"]');await click('[data-value="56"]');await click('[data-value="34"]');await click('[data-value="67"]');
 assert.equal(await evaluate('document.querySelectorAll("[data-go-stone]").length'),6);
 await click('[data-action=undo]');assert.equal(await evaluate('document.querySelectorAll("[data-go-stone]").length'),5);
 await click('[data-action=redo]');assert.equal(await evaluate('document.querySelectorAll("[data-go-stone]").length'),6);
 await click('#go-clock-start');assert.equal(await evaluate('document.querySelector("#go-timing-options").open'),false);
 await click('#go-clock-toggle');assert.equal(await evaluate('document.querySelector("#go-timing-options").open'),false);
 await click('[data-action=count]');await until('document.querySelector("#go-estimate-result").textContent.includes("GNU Go estimate")');
 assert.ok(await evaluate('document.querySelectorAll("[data-go-ownership]").length>0'));
 await click('#go-estimate');assert.match(await evaluate('document.querySelector("#go-estimate-result").textContent'),/Area count/);
 await click('[data-value="13"]');assert.ok(await evaluate('document.querySelector("[data-value=\'13\']").getAttribute("aria-label").includes("marked dead")'));
 await click('[data-action=resume]');
 await click('[data-action=pass]');await click('[data-action=pass]');assert.ok(await evaluate('Boolean(document.querySelector("#go-estimate"))'));
 await click('[data-action=resume]');await click('#go-reset');
 // A held touch aims at a different intersection and commits exactly once at release.
 await evaluate('document.querySelector(".go-board").scrollIntoView({block:"center"})');
 await send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:2});
 const point=async value=>evaluate(`(()=>{const r=document.querySelector('[data-value="${value}"]').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
 const a=await point(10),b=await point(11);
 await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...a,id:1}]});assert.equal(await evaluate('document.querySelectorAll("[data-go-stone]").length'),0);
 await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...b,id:1}]});assert.equal(await evaluate('document.querySelector("[data-go-preview]")?.getAttribute("data-go-preview")'),'11');
 await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.equal(await evaluate('document.querySelectorAll("[data-go-stone]").length'),1);assert.ok(await evaluate('Boolean(document.querySelector("[data-go-stone=\'11\']"))'));
 await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...a,id:1}]});await send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});assert.equal(await evaluate('document.querySelectorAll("[data-go-stone]").length'),1);
 await evaluate('document.querySelector("[data-value=\'12\']").focus()');await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});assert.equal(await evaluate('document.querySelectorAll("[data-go-stone]").length'),2);
 for(const width of [1280,640,440,320]){await send('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:false});await new Promise(r=>setTimeout(r,100));assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),`overflow ${width}`);}
 const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile('/private/tmp/tlevel-go-mobile.png',Buffer.from(shot.data,'base64'));
 assert.deepEqual(errors,[]);console.log('OneDrive real-handle save/reload/conflict and Go rules, engine, clocks, touch, keyboard and reflow passed.');
}finally{ws.close();}
