// Dedicated test Chrome profile on port 9227 only; never use a personal browser.
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {decode} from '../js/codes.js';
const base=process.env.STARTERS_PREVIEW_URL??'http://127.0.0.1:8765';
const pages=await(await fetch('http://127.0.0.1:9227/json/list')).json();
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map(),errors=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const callback=pending.get(m.id);pending.delete(m.id);m.error?callback.reject(Error(JSON.stringify(m.error))):callback.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);};
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const until=async expression=>{for(let i=0;i<200;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression);};
const click=selector=>evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
const pointer=async(type,x,y)=>send('Input.dispatchMouseEvent',{type,x,y,button:'left',clickCount:1});
const backdrop=async()=>{await pointer('mousePressed',2,2);await pointer('mouseReleased',2,2);};
const route=async hash=>{await evaluate(`location.hash=${JSON.stringify(hash)}`);};
const name=async value=>{await evaluate(`document.querySelector('#profile-name').value=${JSON.stringify(value)};document.querySelector('dialog form').requestSubmit()`);await until('!document.querySelector("dialog")');};
const submit=async()=>{await click('#submit');await until('!!document.querySelector("#submit-result")');};
const search=async(type,query)=>{await route(`#search=${type}&q=${encodeURIComponent(query)}`);await until(`document.querySelector('#topic-search')?.value===${JSON.stringify(query)}&&document.querySelector('#search-results')?.children.length>0`);};
const setCode=()=>evaluate('document.querySelector("#display-code").textContent');
const slots=code=>decode(code).entries.map(e=>e.slot).sort((a,b)=>a-b);
try{
 await send('Runtime.enable');await send('Page.enable');await send('Page.navigate',{url:base+'/#home'});await until('!!document.querySelector("#main")');
 await evaluate('localStorage.clear()');await send('Page.reload');await until('!!document.querySelector("#profile-name")');await name('Search review');
 await click('#switch-profile');await until('!!document.querySelector("dialog")');
 const bounds=await evaluate('(()=>{const r=document.querySelector("dialog").getBoundingClientRect();return {x:r.left+5,y:r.top+5}})()');
 await pointer('mousePressed',bounds.x,bounds.y);await pointer('mouseReleased',bounds.x,bounds.y);assert.ok(await evaluate('!!document.querySelector("dialog[open]")'));
 await pointer('mousePressed',bounds.x,bounds.y);await pointer('mouseReleased',2,2);assert.ok(await evaluate('!!document.querySelector("dialog[open]")'));
 await backdrop();await until('!document.querySelector("dialog")');

 for(const width of [1280,850,700,650,600,390,320]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:950,deviceScaleFactor:1,mobile:false});
  assert.ok(await evaluate('document.querySelector(".code-entry").getBoundingClientRect().width>=295'));
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".meta-row")).rowGap'),'0px');
  const buttonSizes=await evaluate('[...document.querySelectorAll(".card-bottom button")].map(b=>({width:b.getBoundingClientRect().width,height:b.getBoundingClientRect().height,wrap:getComputedStyle(b).whiteSpace}))');
  assert.equal(buttonSizes.length,3);for(const size of buttonSizes){assert.ok(Math.abs(size.width-buttonSizes[1].width)<1);assert.equal(size.height,buttonSizes[1].height);assert.equal(size.wrap,'nowrap');}

 }
 await click('footer a[href="#about"]');await until('!!document.querySelector(".about-page")');
 assert.match(await evaluate('document.querySelector(".about-page").textContent'),/Joe Hudson.*Agentic development.*expert human input/s);
 await send('Page.reload');await until('!!document.querySelector(".about-page")');
 for(const width of [1280,390,320]){await send('Emulation.setDeviceMetricsOverride',{width,height:950,deviceScaleFactor:1,mobile:false});assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));}
 await click('.about-page a[href="#home"]');await until('!!document.querySelector("#code-form")');
 await send('Emulation.setDeviceMetricsOverride',{width:1280,height:950,deviceScaleFactor:1,mobile:false});
 assert.equal(await evaluate('document.querySelectorAll(".activity-grid a[href^=\\"#search=\\"]").length'),2);
 await evaluate('document.querySelector("#code-form input").value="loops";document.querySelector("#code-form").requestSubmit()');
 await until('location.hash.startsWith("#search=all")&&document.querySelectorAll(".search-result").length>0');
 assert.match(await evaluate('document.querySelector("#main").textContent'),/Programming/);
 await search(2,'loops');assert.ok(await evaluate('document.querySelector("#search-status").textContent.includes("matching questions")'));
 assert.match(await evaluate(`document.querySelector('[data-search-bank="2"]').textContent`),/All 2 questions/);
 await click('[data-search-bank="2"] button');await until('!!document.querySelector(".search-context")');
 assert.equal(await evaluate('!!document.querySelector("#activity-search-form")'),false);
 assert.equal(await evaluate('document.querySelector("#global-code-help").textContent'),'Search all questions');
 for(const width of [1280,390]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:950,deviceScaleFactor:1,mobile:false});
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
  await evaluate('document.querySelector(".global-code-entry").scrollIntoView()');
  const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile(`/private/tmp/starters-search-strip-${width}.png`,Buffer.from(shot.data,'base64'));
 }
 await send('Emulation.setDeviceMetricsOverride',{width:1280,height:950,deviceScaleFactor:1,mobile:false});
 await click('#report-issue');await until('!!document.querySelector("#report-close")');await backdrop();await until('!document.querySelector("dialog")');
 await evaluate('navigator.clipboard.writeText=async()=>{throw Error("Clipboard unavailable for dismissal check")};document.querySelector("#copy-code").click()');
 await until('!!document.querySelector("dialog[open]")');await backdrop();await until('!document.querySelector("dialog")');
 const original=await setCode();assert.equal(decode(original).type,2);assert.match(await evaluate('document.querySelector(".search-context").textContent'),/2 of 2/);
 await evaluate('const input=document.querySelector(".parts input:not([type=radio])");input.value="saved response";input.dispatchEvent(new Event("input",{bubbles:true}));');
 await click('#new-type');await until('!!document.querySelector("dialog button[value=stay]")');await backdrop();await until('!!document.querySelector(".search-context")&&!document.querySelector("dialog")');
 assert.equal(await setCode(),original);
 assert.equal(await evaluate('!!document.querySelector("#activity-search-form")'),false);
 await send('Page.reload');await until('!!document.querySelector(".search-context")');assert.match(await evaluate('document.querySelector(".search-context").textContent'),/loops/);
 assert.equal(await evaluate('document.querySelector(".parts input:not([type=radio])").value'),'saved response');
 await click('#permutation');await until('!!document.querySelector("dialog button[value=leave]")');await click('dialog button[value=leave]');await until(`document.querySelector('#display-code')?.textContent!==${JSON.stringify(original)}`);
 const permuted=await setCode();assert.deepEqual(decode(permuted).entries.map(e=>e.slot),decode(original).entries.map(e=>e.slot));assert.ok(decode(permuted).entries.every((e,i)=>e.variation!==decode(original).entries[i].variation));
 await click('#new-focus');await until(`document.querySelector('#display-code')?.textContent!==${JSON.stringify(permuted)}`);assert.notDeepEqual(slots(await setCode()),slots(permuted));assert.match(await evaluate('document.querySelector(".search-context").textContent'),/loops/);
 const returnCode=await setCode();
 await click('#switch-profile');await name('Search other');await until('!document.querySelector(".search-context")');
 await click('#switch-profile');await name('Search review');await route('#set='+returnCode);await until('!!document.querySelector(".search-context")');
 await click('#clear-search');assert.equal(await evaluate('!!document.querySelector(".search-context")'),false);
 await submit();
 await search(1,'CA2.3.4');assert.match(await evaluate(`document.querySelector('[data-search-bank="1"]').textContent`),/2 matching questions and 1 related question/);
 await click('[data-search-bank="1"] button');await until('!!document.querySelector(".search-context")');
 assert.match(await evaluate('document.querySelector(".search-context").textContent'),/2 of 3.*related/);
 const sharedCode=await setCode();
 await evaluate('window.__links=[];navigator.clipboard.writeText=async value=>window.__links.push(value);document.querySelector("#copy-link").click()');
 const link=await evaluate('window.__links[0]');assert.ok(link.endsWith('#set='+sharedCode));assert.ok(!link.includes('search='));
 const titles=await evaluate('[...document.querySelectorAll(".question h2,.question h3")].map(e=>e.textContent)');
 // A new local profile has no active search; normal shared codes still resolve identically.
 await submit();await click('#switch-profile');await name('Shared recipient');await route('#set='+sharedCode);await until('!!document.querySelector("#display-code")');
 assert.equal(await evaluate('!!document.querySelector(".search-context")'),false);assert.equal(await setCode(),sharedCode);
 assert.deepEqual(await evaluate('[...document.querySelectorAll(".question h2,.question h3")].map(e=>e.textContent)'),titles);
 await submit();await route('#home');await until('!!document.querySelector("#code-form")');
 await evaluate(`document.querySelector('#code-form input').value=${JSON.stringify(sharedCode)};document.querySelector('#code-form').requestSubmit()`);await until('!!document.querySelector("#display-code")');assert.equal(await setCode(),sharedCode);await submit();
 await route('#home');await until('!!document.querySelector("#code-form")');
 await evaluate('document.querySelector("#code-form input").value="BADCODE00";document.querySelector("#code-form").requestSubmit()');await until('!!document.querySelector("#code-error a")');assert.match(await evaluate('document.querySelector("#code-error a").textContent'),/Search for this term instead/);
 await evaluate('document.querySelector("#global-code").value="data type conversion";document.querySelector("#global-code-form").requestSubmit()');
 await until('document.querySelector("#topic-search")?.value==="data type conversion"');
 assert.ok(await evaluate(`!!document.querySelector('[data-search-bank="1"]')&&!!document.querySelector('[data-search-bank="2"]')`));
 assert.ok(await evaluate('location.hash.startsWith("#search=all")'));
 await evaluate(`document.querySelector('#global-code').value=${JSON.stringify(sharedCode)};document.querySelector('#global-code-form').requestSubmit()`);
 await until('!!document.querySelector("#display-code")&&document.querySelector("#global-code").value===""');assert.equal(await setCode(),sharedCode);await submit();
 await search(3,'excel');await click('[data-search-result="0"]');await until('!!document.querySelector(".search-context")');
 const esp=decode(await setCode());assert.equal(esp.entries.length,3);assert.equal(new Set(esp.entries.map(e=>e.variation)).size,1);
 assert.equal(await evaluate('document.querySelector("#new-focus").disabled'),true);await submit();
 await search(0,'sudoku');await click('[data-search-result="0"]');await until('!!document.querySelector(".search-context")');assert.equal(decode(await setCode()).entries.length,3);await submit();
 await search(1,'decomposition');
 for(const [width,font] of [[1280,16],[390,16],[320,16],[640,32]]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:950,deviceScaleFactor:1,mobile:false});await evaluate(`document.documentElement.style.fontSize='${font}px'`);
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
  if(width===1280||width===390){await evaluate('document.querySelector(".breadcrumbs").scrollIntoView()');const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile(`/private/tmp/starters-search-${width}.png`,Buffer.from(shot.data,'base64'));}
 }
 await evaluate('document.documentElement.style.fontSize="16px";document.querySelector("#topic-search").value="zzznomatch";document.querySelector("#topic-search-form").requestSubmit()');assert.match(await evaluate('document.querySelector("#search-status").textContent'),/No matching topics/);
 await evaluate('document.querySelector("#topic-search").value="<script>alert(1)</script>";document.querySelector("#topic-search-form").requestSubmit()');assert.equal(await evaluate('document.querySelectorAll("#main script").length'),0);
 await evaluate('document.querySelector("#topic-search").value="";document.querySelector("#topic-search-form").requestSubmit()');assert.match(await evaluate('document.querySelector("#search-status").textContent'),/Enter a key term/);
 assert.deepEqual(errors,[]);console.log('Search browser checks passed: all four banks, exact/related sets, variation and combination rules, leave/cancel, reload, profile isolation, independent shared-code opening, empty/no-result input and responsive layouts.');
}finally{ws.close();}
