// Dedicated test Chrome profile on port 9227 only; never use a personal browser.
import assert from 'node:assert/strict';
const base=process.env.STARTERS_PREVIEW_URL??'http://127.0.0.1:8765';
const pages=await(await fetch('http://127.0.0.1:9227/json/list')).json();
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map(),errors=[];
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const callback=pending.get(m.id);pending.delete(m.id);m.error?callback.reject(Error(JSON.stringify(m.error))):callback.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);};
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const until=async expression=>{for(let i=0;i<200;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression);};
try {
 await send('Runtime.enable');await send('Page.enable');await send('Page.navigate',{url:base+'/?header-check='+Date.now()+'#home'});await until('!!document.querySelector(".hero")');
 await evaluate('document.querySelector("#profile-welcome>small").textContent="Last tracked: 13 Sept 2026, 06:33"');
 for(const width of [1440,1280,1200,1100,1024,1023,1000,850,600,390,320]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:950,deviceScaleFactor:1,mobile:false});
  const layout=await evaluate(`(()=>{const p=document.querySelector('#profile-welcome'),g=p.querySelector('.profile-greeting').getBoundingClientRect(),t=p.querySelector('small').getBoundingClientRect();const brand=document.querySelector('.brand').getBoundingClientRect(),profile=p.getBoundingClientRect();const boxes=[...document.querySelector('.site-header').children].filter(e=>getComputedStyle(e).display!=='none').map(e=>e.getBoundingClientRect());return {overlap:boxes.some((r,i)=>i&&r.left<boxes[i-1].right-1&&r.top<boxes[i-1].bottom),headerOneRow:profile.top<brand.bottom&&brand.top<profile.bottom,sameRow:Math.abs((g.top+g.bottom)/2-(t.top+t.bottom)/2)<2,padding:getComputedStyle(document.querySelector('main')).paddingTop,overflow:document.documentElement.scrollWidth>innerWidth+1}})()`);
  if(width>=1024){assert.equal(layout.overlap,false);assert.ok(layout.headerOneRow,JSON.stringify({width,...layout}));assert.equal(layout.sameRow,false);}
  if(width===1023||width===1000||width===850||width===600)assert.ok(layout.sameRow,JSON.stringify({width,...layout}));
  assert.equal(layout.padding,width>850?'28px':'12px');assert.equal(layout.overflow,false);
 }
 console.log('Header checks passed: inline profile details at wrapped-header widths, natural mobile wrapping, 20px smaller Home gap, no overflow.');
}finally{ws.close();}
