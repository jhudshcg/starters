// Run against an isolated headless Chrome started with --remote-debugging-port=9227.
// Use a dedicated test profile. --hmr temporarily edits/restores tokens.css; use only against Vite.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {choose,banks,resolve} from '../js/bank.js';
import {encode,BANK_VERSION} from '../js/codes.js';
import {themePalettes} from '../js/theme.js';
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

async function selectTheme(mode,palette) {
 if(!await evaluate('document.querySelector("#theme-menu").matches(":popover-open")'))await click('#theme-picker');
 await until('document.querySelector("#theme-menu").matches(":popover-open")');
 assert.ok(await evaluate('(()=>{const b=document.querySelector("#theme-menu").getBoundingClientRect();return b.left>=0&&b.right<=innerWidth&&b.top>=0&&b.bottom<=innerHeight;})()'));
 const selector=`[data-theme-choice="${mode}:${palette}"]`;
 await click(selector);
 assert.equal(await evaluate(`document.querySelector(${JSON.stringify(selector)}).getAttribute('aria-pressed')`),'true');
 assert.equal(await evaluate('document.querySelectorAll(".theme-preview[aria-pressed=true]").length'),1);
 assert.equal(await evaluate('document.querySelector("#theme-menu").matches(":popover-open")'),true);
 await evaluate('document.querySelector("#theme-menu").hidePopover()');
}
const colours=()=>evaluate(`(()=>{const s=getComputedStyle(document.documentElement);return Object.fromEntries(['selection','correct','incorrect','warning'].map(k=>{const e=document.createElement('i');e.style.backgroundColor=s.getPropertyValue('--'+k+'-bg');document.body.append(e);const value=getComputedStyle(e).backgroundColor;e.remove();return [k,value];}));})()`);
try {
 await send('Runtime.enable');await send('Page.enable');
 await send('Page.navigate',{url:base+'/#home'});await until('Boolean(document.querySelector("#code-form"))');
 // Legacy mode preference and unknown palettes fall back without resetting the mode.
 await evaluate('localStorage.removeItem("dsd-starters-v1");localStorage.setItem("dsd-starters-theme","dark");localStorage.setItem("dsd-starters-palette","unknown");localStorage.removeItem("dsd-starters-theme-adjustments")');
 let oldOrigin=await evaluate('performance.timeOrigin');
 await send('Page.reload');await until(`performance.timeOrigin!==${oldOrigin} && Boolean(document.querySelector('#code-form')) && document.documentElement.dataset.palette==='sage'`);
 assert.equal(await evaluate('document.documentElement.dataset.theme'),'dark');
 assert.equal(await evaluate('document.querySelectorAll(".theme-preview").length'),8);
 await click('#theme-picker');
 await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
 await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
 await until('!document.querySelector("#theme-menu").matches(":popover-open")');
 if(process.argv.includes('--hmr')) {
  const tokenFile=new URL('../css/tokens.css',import.meta.url),original=await readFile(tokenFile,'utf8');
  await evaluate('window.__themeHmrProbe=true;document.querySelector("#code-form input").value="HMR"');
  try {
   await writeFile(tokenFile,original+'\n:root,:root[data-theme=dark]{--card-radius:19px}\n');
   await until('getComputedStyle(document.querySelector(".type-card")).borderRadius==="19px"');
   assert.ok(await evaluate('window.__themeHmrProbe===true && document.querySelector("#code-form input").value==="HMR"'));
  } finally {await writeFile(tokenFile,original);}
  await until('getComputedStyle(document.querySelector(".type-card")).borderRadius==="16px"');
 }
 for(const width of [1280,640,320]) {
  await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===320});
  for(const {id:palette} of themePalettes)for(const mode of ['light','dark']) {
   await selectTheme(mode,palette);
   assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
   assert.ok(await evaluate('document.querySelector(".theme-preview[aria-pressed=true]").getAttribute("aria-label").includes(document.documentElement.dataset.theme)'));
   const contrast=await evaluate(`(window.themeContrast=() => {
    const root=getComputedStyle(document.documentElement);
    function rgb(token){const e=document.createElement('i');e.style.color=root.getPropertyValue(token);document.body.append(e);const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d');ctx.fillStyle=getComputedStyle(e).color;ctx.fillRect(0,0,1,1);const c=[...ctx.getImageData(0,0,1,1).data].slice(0,3);e.remove();return c;}
    function lum(c){return c.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);}
    function ratio(a,b){const x=lum(rgb(a)),y=lum(rgb(b));return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
    const pairs=[['--text','--surface'],['--muted','--surface'],['--text','--page'],['--muted','--page'],['--text','--surface-soft'],['--muted','--surface-soft'],['--main-text','--main'],['--main-text','--main-hover'],['--accent-text','--accent-bg'],['--selection-text','--selection-bg'],['--correct-text','--correct-bg'],['--incorrect-text','--incorrect-bg'],['--warning-text','--warning-bg']];
    if(root.getPropertyValue('--page-image').trim()!=='none')pairs.push(['--text','--page-glow'],['--muted','--page-glow']);
    return pairs.map(([a,b])=>[a+'/'+b,ratio(a,b)]);
   })()`);
   // Adjustable backgrounds are exploratory; retain assertions for fixed semantic/action pairs.
   for(const [role,ratio] of contrast.filter(([role])=>!/^--(?:text|muted)\//.test(role)))assert.ok(ratio>=4.5,`${palette} ${mode} ${role} contrast ${ratio}`);
   const decoration=await evaluate(`(()=>{const s=getComputedStyle(document.querySelector('.type-card'));return {page:getComputedStyle(document.body).backgroundImage,card:s.backgroundImage,width:s.borderTopWidth,color:s.borderTopColor};})()`);
   assert.equal(decoration.page!=='none',['blue','rose'].includes(palette));
   assert.equal(decoration.color==='rgba(0, 0, 0, 0)',palette==='rose');
   assert.equal(decoration.width,palette==='rose'?'2px':'1px');
   await evaluate(`{const e=document.createElement('section');e.id='theme-fixture';e.innerHTML='<label class="option"><input type="radio" checked>Selected</label><div class="feedback correct">Correct</div><div class="feedback incorrect">Incorrect</div><div class="feedback partial">Partial</div><div class="challenge"><button class="digit-cell selected">1</button></div>';document.querySelector('main').append(e);}`);
   const styles=await evaluate(`[...document.querySelectorAll('#theme-fixture .option,#theme-fixture .feedback,#theme-fixture button')].map(e=>{const s=getComputedStyle(e);return [s.backgroundColor,s.color];})`);
   assert.deepEqual(styles[0],styles[4]);assert.notEqual(styles[0][0],styles[1][0]);assert.notEqual(styles[1][0],styles[2][0]);
   if(width!==640)await screenshot(`theme-${palette}-${mode}-${width}`);
   await evaluate('document.querySelector("#theme-fixture").remove()');
   await click('#theme-toggle');
   assert.equal(await evaluate('document.documentElement.dataset.palette'),palette);
   assert.equal(await evaluate('document.documentElement.dataset.theme'),mode==='light'?'dark':'light');
  }
 }
 // Full ranges are exploratory: verify behaviour, not contrast at extremes.
 const setSlider=async(id,value)=>evaluate(`{const e=document.querySelector(${JSON.stringify('#'+id)});e.value=${value};e.dispatchEvent(new Event('input'));}`);
 const readTones=()=>evaluate(`(()=>{const e=document.createElement('i');document.body.append(e);const result={};for(const name of ['page','surface','main','accent','text','code-bg']){e.style.color='var(--'+name+')';result[name]=getComputedStyle(e).color;}const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d');ctx.fillStyle=result.page;ctx.fillRect(0,0,1,1);const rgb=[...ctx.getImageData(0,0,1,1).data].slice(0,3);result.pageLightness=(Math.max(...rgb)+Math.min(...rgb))/510;result.pageSaturated=Math.min(...rgb)===0||Math.max(...rgb)===255;e.remove();return result;})()`);
 const lightnessOf=color=>Number(color.match(/^oklch\(([^ ]+)/)?.[1]);
 for(const {id} of themePalettes)for(const mode of ['light','dark']) {
  await selectTheme(mode,id);
  await setSlider('theme-saturation',100);
  const bounds=mode==='light'?[55,96]:[5,45];
  assert.deepEqual(await evaluate('[Number(document.querySelector("#theme-lightness").min),Number(document.querySelector("#theme-lightness").max)]'),bounds);
  const states=[];
  for(const value of bounds) {
   await setSlider('theme-lightness',value);
   const tones=await readTones();states.push(tones);
   assert.ok(Math.abs(tones.pageLightness-value/100)<.003);
   assert.ok(tones.pageSaturated);
   assert.equal(await evaluate('document.querySelector("#theme-lightness-value").value'),value+'%');
   assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
  }
  assert.notEqual(states[0].surface,states[1].surface);
  for(const role of ['main','accent'])assert.ok(Math.abs(lightnessOf(states[1][role])-lightnessOf(states[0][role])-(bounds[1]-bounds[0])*.002)<.0001);
  assert.equal(states[0].text,states[1].text);assert.equal(states[0]['code-bg'],states[1]['code-bg']);
 }
 // Independent light/dark levels and global saturation survive mode changes/reload.
 await selectTheme('light','blue');await setSlider('theme-lightness',61);
 await selectTheme('dark','blue');await setSlider('theme-lightness',37);await setSlider('theme-saturation',65);
 oldOrigin=await evaluate('performance.timeOrigin');
 await send('Page.reload');await until(`performance.timeOrigin!==${oldOrigin} && document.documentElement.dataset.palette==='blue' && Boolean(document.querySelector('#code-form'))`);
 assert.deepEqual(await evaluate('[Number(document.querySelector("#theme-lightness").value),Number(document.querySelector("#theme-saturation").value)]'),[37,65]);
 await click('#theme-toggle');assert.equal(await evaluate('Number(document.querySelector("#theme-lightness").value)'),61);
 await click('#theme-picker');await click('#theme-reset');
 await evaluate(`{const e=document.querySelector('#theme-saturation');e.value=0;e.dispatchEvent(new Event('input'));}`);
 await screenshot('theme-popout-desaturated');
 assert.equal(await evaluate('getComputedStyle(document.documentElement).filter'),'none');
 assert.equal(await evaluate('getComputedStyle(document.querySelector("#theme-menu")).filter'),'none');
 await evaluate(`{const e=document.querySelector('#theme-saturation');e.value=100;e.dispatchEvent(new Event('input'));}`);
 await screenshot('theme-popout-saturated');
 await click('#theme-reset');await screenshot('theme-popout-previews');
 assert.equal(await evaluate('JSON.parse(localStorage.getItem("dsd-starters-theme-adjustments"))["light:blue"]'),undefined);
 await evaluate('document.querySelector("#theme-menu").hidePopover()');
 await selectTheme('dark','blue');oldOrigin=await evaluate('performance.timeOrigin');
 await send('Page.reload');await until(`performance.timeOrigin!==${oldOrigin} && document.documentElement.dataset.palette==='blue' && Boolean(document.querySelector('#code-form'))`);
 assert.equal(await evaluate('document.documentElement.dataset.theme'),'dark');
 // Deterministic mixed correct/incorrect answers, before/after marking and retry.
 const set=resolve(encode({version:BANK_VERSION,type:1,entries:[{slot:12,variation:0},{slot:13,variation:0},{slot:14,variation:0}]}));
 await send('Page.navigate',{url:base+'/#set='+set.code});await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(set.code)}`);
 const choices=set.questions.flatMap(q=>q.parts.filter(p=>p.options).map(p=>({slot:q.slot,...p}))).slice(0,2);
 assert.equal(choices.length,2);
 const field=set.questions.flatMap(q=>q.parts.filter(p=>!p.options).map(p=>({slot:q.slot,...p})))[0];
 const answerSelector=p=>`[data-slot="${p.slot}"][data-part="${p.id}"]`;
 for(const [i,p] of choices.entries()) {
  const answer=i===0?p.answer:p.options.find(o=>o!==p.answer);
  await evaluate(`{const e=[...document.querySelectorAll(${JSON.stringify(answerSelector(p))})].find(e=>e.value===${JSON.stringify(answer)});e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}));}`);
 }
 await evaluate(`{const e=document.querySelector(${JSON.stringify(answerSelector(field))});e.value=${JSON.stringify(String(field.answer))};e.dispatchEvent(new Event('input',{bubbles:true}));}`);
 const selected=p=>answerSelector(p)+':checked';
 for(const {id} of themePalettes)for(const mode of ['light','dark']) {
  await selectTheme(mode,id);const c=await colours();
  for(const p of choices)assert.equal(await evaluate(`getComputedStyle(document.querySelector(${JSON.stringify(selected(p))}).closest('.option')).backgroundColor`),c.selection);
 }
 await click('#submit');await until('Boolean(document.querySelector("#retry"))');
 for(const {id} of themePalettes)for(const mode of ['light','dark']) {
  await selectTheme(mode,id);const c=await colours();
  for(const [i,p] of choices.entries())assert.equal(await evaluate(`getComputedStyle(document.querySelector(${JSON.stringify(selected(p))}).closest('.option')).backgroundColor`),i===0?c.correct:c.incorrect);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector(${JSON.stringify(answerSelector(field))})).backgroundColor`),c.correct);
 }
 await screenshot('theme-marked');
 await click('#retry');await until('!document.querySelector("#retry")');
 assert.equal(await evaluate('document.querySelectorAll(".part[data-result]").length'),0);
 const p=choices[0];await evaluate(`{const e=document.querySelector(${JSON.stringify(answerSelector(p))});e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}));}`);
 assert.equal(await evaluate(`getComputedStyle(document.querySelector(${JSON.stringify(selected(p))}).closest('.option')).backgroundColor`),(await colours()).selection);
 await click('#submit');await until('Boolean(document.querySelector("#retry"))');
 for(const type of [0,1,2,3]) {
  const activity=choose(type,banks[type][0].focus);
  await send('Page.navigate',{url:base+'/#set='+activity.code});await until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(activity.code)}`);
  assert.ok(await evaluate('document.querySelectorAll(".question").length>0'));
 }
 assert.deepEqual(errors,[]);
 console.log('Theme checks passed: eight previews, full background ranges, linked accents, saturation, semantic/action contrast, responsive popover, paired toggle, persistence/reset, amber selections, green/red marking, retry and four banks.');
} finally {ws.close();}
