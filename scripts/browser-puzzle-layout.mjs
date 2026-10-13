/** Dense puzzle layout checks in isolated Chrome: internal scrolling, labels and practical cell widths. */
import assert from 'node:assert/strict';
import {writeFile,readFile} from 'node:fs/promises';
import {banks,resolve} from '../js/bank.js';
import {BANK_VERSION} from '../js/codes.js';
const base=process.env.STARTERS_PREVIEW_URL??'http://127.0.0.1:8765';
const pages=await(await fetch('http://127.0.0.1:9227/json/list')).json();
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);}};
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const until=async expression=>{for(let n=0;n<100;n++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,50));}throw Error('Timed out '+expression);};
const density=q=>Math.max(...q.variations.map(v=>Math.max(...v.parts.map(p=>p.names?.length??p.size??p.cells?.length??0))));
try{
 await send('Page.enable');await send('Page.navigate',{url:base});await until('Boolean(document.querySelector("#main"))');
 await evaluate('localStorage.clear()');await send('Page.reload');await until('Boolean(document.querySelector("#profile-name"))');await evaluate('document.querySelector("#profile-name").value="Puzzle Layout Test";document.querySelector("dialog form").requestSubmit()');await until('!document.querySelector("dialog")');
 if(process.argv.includes('--source-styles')){const css=(await readFile('packages/puzzles/styles/layout.css','utf8'))+(await readFile('css/challenges.css','utf8')).replace(/^@import.*$/gm,'');await evaluate(`{const style=document.createElement('style');style.textContent=${JSON.stringify(css)};document.head.append(style);}`);}
 const examples=[];
 for(const family of new Set(banks[0].map(q=>q.focus).filter(f=>f!=='classic maths'))){
  for(const level of ['beginner','foundation','standard','stretch']){
   const q=banks[0].filter(q=>q.focus===family&&q.challengeLevel===level).sort((a,b)=>density(b)-density(a))[0];if(q)examples.push(q);
  }
 }
 for(const width of [320,640]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
  for(const q of examples){
   const set=resolve({version:BANK_VERSION,type:0,entries:[{slot:q.slot,variation:0}],minutes:null});
   await evaluate(`location.hash='#set=${set.code}'`);await until(`document.querySelector('#display-code')?.textContent==='${set.code}'`);
   const metrics=await evaluate(`(()=>{
    const roots=[...document.querySelectorAll('.puzzle-controls')];
    return {overflow:roots.flatMap(root=>[root,...root.querySelectorAll('.board-scroll')]).filter(node=>node.scrollWidth>node.clientWidth+1).map(node=>node.className),
    grids:[...document.querySelectorAll('.candidate-table')].map(table=>({width:table.getBoundingClientRect().width,headings:[...table.querySelectorAll('th')].map(cell=>({text:cell.textContent,width:cell.getBoundingClientRect().width,font:getComputedStyle(cell).fontSize})),min:Math.min(...[...table.querySelectorAll('button')].map(b=>b.getBoundingClientRect().width)),split:[...table.querySelectorAll('th[scope=col],th[scope=row]')].filter(cell=>/^\\S{1,7}$/.test(cell.textContent)).filter(cell=>{const range=document.createRange();range.selectNodeContents(cell);return range.getClientRects().length!==1;}).map(cell=>cell.textContent)}))};
   })()`);
   assert.deepEqual(metrics.overflow,[],`${q.focus}/${q.challengeLevel}/${width}: internal scroll`);
   for(const grid of metrics.grids){assert.ok(grid.min>=24,`${q.focus}/${q.challengeLevel}/${width}: cell ${grid.min}px`);assert.deepEqual(grid.split,[],`${q.focus}/${q.challengeLevel}/${width}: split labels ${JSON.stringify(grid)}`);}
   if(width===320&&q.challengeLevel==='stretch'&&['logic grids','logic equations','sudoku'].includes(q.focus)){
    await evaluate('document.querySelector(".question").scrollIntoView()');const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile(`/private/tmp/tlevel-${q.focus.replaceAll(' ','-')}-dense.png`,Buffer.from(shot.data,'base64'));
   }
  }
 }
 console.log(`Dense layout passed: ${examples.length} family/level examples at 320/640px, no internal scroll, candidate cells ≥24px, unsplit short labels.`);
}finally{ws.close();}
