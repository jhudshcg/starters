/**
 * Purpose: verify the package alone in an isolated Chrome on port 9227.
 * Main contents: mount, state, marking, lock, assistance, replay and disposal checks.
 * Uses: package entry points only in the browser fixture. Libs: esbuild and Node.
 */
import assert from 'node:assert/strict';
import {mkdtemp,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {build} from 'esbuild';
const directory=await mkdtemp(join(tmpdir(),'puzzle-player-'));
const packageRoot=join(process.cwd(),'packages/puzzles');
await build({stdin:{contents:`import puzzles from './catalogue.js';import {mountPuzzle} from './player.js';window.library={puzzles,mountPuzzle};`,resolveDir:packageRoot},bundle:true,format:'iife',outfile:join(directory,'fixture.js')});
await writeFile(join(directory,'index.html'),`<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="${pathToFileURL(join(packageRoot,'styles/index.css'))}"><div id="a"></div><div id="b"></div><script src="fixture.js"></script>`);
const pages=await(await fetch('http://127.0.0.1:9227/json/list')).json();
const ws=new WebSocket(pages.find(page=>page.type==='page').webSocketDebuggerUrl);await new Promise(resolve=>ws.onopen=resolve);
let next=0;const pending=new Map(),errors=[];
ws.onmessage=event=>{const value=JSON.parse(event.data);if(value.id){const task=pending.get(value.id);pending.delete(value.id);value.error?task.reject(Error(JSON.stringify(value.error))):task.resolve(value.result);}else if(value.method==='Runtime.exceptionThrown')errors.push(value.params.exceptionDetails);};
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++next,{resolve,reject});ws.send(JSON.stringify({id:next,method,params}));});
const evaluate=async expression=>{const value=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(value.exceptionDetails)throw Error(JSON.stringify(value.exceptionDetails));return value.result.value;};
try{
 await send('Page.enable');await send('Runtime.enable');await send('Page.navigate',{url:pathToFileURL(join(directory,'index.html')).href});
 for(let i=0;i<100&&!await evaluate('Boolean(window.library)');i++)await new Promise(resolve=>setTimeout(resolve,50));
 assert.ok(await evaluate('Boolean(window.library)'));
 const result=await evaluate(`(()=>{
  const {puzzles,mountPuzzle}=library,a=document.querySelector('#a'),b=document.querySelector('#b');
  const sudoku=puzzles.find(q=>q.type==='sudoku').variations[0];
  window.changes=[];window.player=mountPuzzle(a,sudoku,{onChange:s=>changes.push(s)});
  window.other=mountPuzzle(b,sudoku);
  const first=a.querySelector('.digit-cell:not(.given)');first.click();a.querySelector('[data-challenge-action="digit"][data-value="1"]').click();
  const saved=player.getState(),detached=player.getState();detached['0']='changed outside';
  const isolated=other.getState()['0']===undefined&&player.getState()['0']!=='changed outside';
  const selected=a.querySelector('.digit-cell.selected'),savedBeforeTheme=JSON.stringify(player.getState());
  const sheet=document.createElement('style');sheet.textContent='#a .puzzle-controls { --puzzle-selection-bg: var(--host-selection); --puzzle-cell-width: 60px; --puzzle-cell-height: 64px; }';document.head.append(sheet);
  a.style.setProperty('--host-selection','#123456');
  const firstTheme=getComputedStyle(selected).backgroundColor;
  a.style.setProperty('--host-selection','#654321');
  const themed=firstTheme==='rgb(18, 52, 86)'&&getComputedStyle(selected).backgroundColor==='rgb(101, 67, 33)'&&selected===a.querySelector('.digit-cell.selected')&&JSON.stringify(player.getState())===savedBeforeTheme;
  const layoutOverrides=getComputedStyle(selected).width==='60px'&&getComputedStyle(selected).height==='64px'&&getComputedStyle(b.querySelector('.digit-cell')).width!=='60px';
  sheet.remove();
  const before=JSON.stringify(saved);player.showHint();player.showSolution();const noRevealMutation=JSON.stringify(player.getState())===before;
  const noImplicitMark=player.getResult()===null;
  player.setLocked(true);const count=changes.length;a.querySelector('[data-challenge-action="digit"]')?.click();const locked=changes.length===count;
  player.setLocked(false);player.setState(saved);player.reset();player.setState(saved);
  const restored=JSON.stringify(player.getState())===before;
  const stale=a.querySelector('[data-challenge-action="digit"]');player.destroy();stale.click();
  const disposed=a.childElementCount===0&&changes.length===count+1;
  other.destroy();
  let allTypes=true;
  for(const type of new Set(puzzles.map(q=>q.type))){
   const v=puzzles.find(q=>q.type===type).variations[0],state=Object.fromEntries(v.parts.map(p=>[p.id,p.answer]));
   const control=mountPuzzle(a,v,{state,tools:false,assistance:false});
   const result=control.evaluate();allTypes&&=result.earned===control.getMaximumMark()&&result.complete;
   control.setResult(result);allTypes&&=control.getResult().earned===result.earned;
   control.showSolution();allTypes&&=!a.querySelector('[data-challenge-action="reset"]')&&!a.querySelector('[data-challenge-action="go-hint"]');
   control.destroy();
  }
  return {isolated,themed,layoutOverrides,noRevealMutation,noImplicitMark,locked,restored,disposed,allTypes};
 })()`);
 for(const [key,value] of Object.entries(result))assert.equal(value,true,key);
 await send('Emulation.setFocusEmulationEnabled',{enabled:true});
 const go=await evaluate(`(async()=>{
  const q=library.puzzles.find(q=>q.type==='go'),v=q.variations[0],p=v.parts[0],a=document.querySelector('#a');
  window.assisted=0;window.statuses=[];window.goPlayer=library.mountPuzzle(a,v,{onAssist:()=>assisted++,onStatus:s=>statuses.push(s),liveFeedback:false});
  a.querySelector('[data-challenge-action="go-hint"]').click();
  const hint=assisted===1&&JSON.parse(goPlayer.getState()[p.id]).hintMove!==undefined;
  a.querySelector('[data-challenge-action="go-hint"]').click();
  const hiddenHint=JSON.parse(goPlayer.getState()[p.id]).hintMove===null&&assisted===1;
  const point=a.querySelector('[data-go-coordinate-value]'),coordinate=point.dataset.goCoordinateValue;
  const savedState=JSON.stringify(goPlayer.getState()),board=a.querySelector('.go-board');
  point.dispatchEvent(new PointerEvent('pointerover',{bubbles:true}));
  const hoverCoordinate=a.querySelector('[data-go-coordinate]').textContent===coordinate;
  point.dispatchEvent(new PointerEvent('pointerout',{bubbles:true}));
  const clearedCoordinate=a.querySelector('[data-go-coordinate]').textContent==='—';
  point.focus();const focusCoordinate=a.querySelector('[data-go-coordinate]').textContent===coordinate;
  const coordinateReadOnly=JSON.stringify(goPlayer.getState())===savedState&&a.querySelector('.go-board')===board;
  const moves=JSON.parse(p.answer).moves;
  goPlayer.setState({});
  for(let i=0;i<moves.length;i++){const index=JSON.parse(goPlayer.getState()[p.id]??'{}').moves?.length??0;if(index>=moves.length)break;a.querySelector('[data-challenge-action="go"][data-value="'+moves[index]+'"]').click();await new Promise(resolve=>setTimeout(resolve,750));}
  const win=statuses.at(-1)?.recordedWin===true;
  const noAutoResult=goPlayer.getResult()===null;
  goPlayer.setState({[p.id]:p.answer});goPlayer.showSolution();
  const before=JSON.stringify(goPlayer.getState()),slider=a.querySelector('[data-go-replay]');slider.value='0';slider.dispatchEvent(new Event('input',{bubbles:true}));
  const replay=slider.isConnected&&JSON.stringify(goPlayer.getState())===before;
  goPlayer.destroy();return {hint,hiddenHint,hoverCoordinate,clearedCoordinate,focusCoordinate,coordinateReadOnly,win,noAutoResult,replay};
 })()`);
 for(const [key,value] of Object.entries(go))assert.equal(value,true,key);
 // A source-like sacrifice fixture makes the intermediate frame and timer lifecycle observable.
 const playback=await evaluate(`(async()=>{
  const part={id:'0',kind:'go',size:3,player:'b',marks:3,view:[0,0,2,2],
   tree:{board:'...W.W.W.',children:[{move:4,colour:'b',board:'...WBW.W.',children:[{move:1,colour:'w',board:'.W.W.W.W.',children:[],success:true}]}]},
   answer:'{"moves":[4,1]}',explanation:'A sacrifice fixture.'};
  const a=document.querySelector('#a'),b=document.querySelector('#b'),wait=()=>new Promise(r=>setTimeout(r,800));
  let changes=0;const player=library.mountPuzzle(a,{parts:[part]},{onChange:()=>changes++});
  const click=(action,value)=>a.querySelector('[data-challenge-action="'+action+'"]'+(value===undefined?'':'[data-value="'+value+'"]')).click();
  const state=()=>JSON.parse(player.getState()['0']??'{}');
  click('go',4);const visible=!!a.querySelector('[data-go-stone="4"]')&&state().moves.length===1;
  await wait();const captured=!a.querySelector('[data-go-stone="4"]')&&state().moves.length===2;
  click('undo');const wholeTurnUndo=!(state().moves??[]).length;
  click('go',4);click('undo');await wait();const cancelledUndo=!(state().moves??[]).length;
  click('go',4);const saved=player.getState();player.setState({});await wait();const cancelledRestore=!player.getState()['0'];
  player.setState(saved);await wait();const resumed=state().moves.length===2;
  player.reset();click('go',4);player.setLocked(true);await wait();const locked=state().moves.length===1;
  player.reset();const lockedReset=state().moves.length===1;player.setLocked(false);await wait();
  player.reset();click('go',0);const unrecorded=!!a.querySelector('[data-go-stone="0"]')&&a.querySelector('.go-status').textContent.includes('No recorded response')&&player.evaluate().earned===0;
  click('go',1);const explored=state().moves.length===2&&!a.querySelector('[data-go-stone="0"]');
  player.reset();click('go',4);
  const other=library.mountPuzzle(b,{parts:[part]});b.querySelector('[data-challenge-action="go"][data-value="4"]').click();
  player.destroy();const before=changes;await wait();const disposed=changes===before&&a.children.length===0;
  const isolated=JSON.parse(other.getState()['0']).moves.length===2;other.destroy();
  return {visible,captured,wholeTurnUndo,cancelledUndo,cancelledRestore,resumed,locked,lockedReset,unrecorded,explored,disposed,isolated};
 })()`);
 for(const [key,value] of Object.entries(playback))assert.equal(value,true,'Go playback: '+key);
 // Real pointer/key input must show a preview without saving or starting a reply.
 await evaluate(`window.pressPlayer=library.mountPuzzle(document.querySelector('#a'),{parts:[{id:'0',kind:'go',size:3,player:'b',marks:3,view:[0,0,2,2],tree:{board:'...W.W.W.',children:[{move:4,colour:'b',board:'...WBW.W.',children:[{move:1,colour:'w',board:'.W.W.W.W.',children:[],success:true}]}]},answer:'{"moves":[4,1]}'}]});`);
 const pressPoint=()=>evaluate(`(()=>{const b=document.querySelector('#a [data-challenge-action="go"][data-value="4"]');b.scrollIntoView({block:'center'});const r=b.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
 const pressState=()=>evaluate(`({preview:!!document.querySelector('#a [data-go-preview]'),moves:JSON.parse(pressPlayer.getState()['0']??'{}').moves??[]})`);
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 let point=await pressPoint();
 await send('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',clickCount:1});
 await pause(300);assert.deepEqual(await pressState(),{preview:true,moves:[]});
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',clickCount:1});
 assert.deepEqual(await pressState(),{preview:false,moves:[4]});
 await pause(300);assert.deepEqual((await pressState()).moves,[4,1]);
 await evaluate('pressPlayer.reset()');point=await pressPoint();
 await send('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',clickCount:1});
 await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x+200,y:point.y,buttons:1,button:'left'});
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',clickCount:1});
 assert.deepEqual(await pressState(),{preview:false,moves:[]});
 for(const key of ['Enter',' ']){
  await evaluate(`document.querySelector('#a [data-challenge-action="go"][data-value="4"]').focus()`);
  await send('Input.dispatchKeyEvent',{type:'keyDown',key,code:key==='Enter'?'Enter':'Space',windowsVirtualKeyCode:key==='Enter'?13:32});
  await pause(250);assert.deepEqual(await pressState(),{preview:true,moves:[]});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key,code:key==='Enter'?'Enter':'Space',windowsVirtualKeyCode:key==='Enter'?13:32});
  assert.deepEqual(await pressState(),{preview:false,moves:[4]});
  await pause(250);assert.deepEqual((await pressState()).moves,[4,1]);await evaluate('pressPlayer.reset()');
 }
 point=await pressPoint();
 await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...point,id:1}]});
 await pause(250);assert.deepEqual(await pressState(),{preview:true,moves:[]});
 await send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});
 assert.deepEqual(await pressState(),{preview:false,moves:[]});
 await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...point,id:2}]});
 await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await pause(300);assert.deepEqual(await pressState(),{preview:false,moves:[4,1]});
 await evaluate('pressPlayer.reset()');point=await pressPoint();
 await send('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',clickCount:1});
 await evaluate('pressPlayer.destroy()');
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',clickCount:1});
 assert.equal(await evaluate('document.querySelectorAll("#a [data-go-preview]").length'),0);
 await evaluate(`window.pathPlayer=library.mountPuzzle(document.querySelector('#a'),{parts:[{id:'0',kind:'cover-path',size:3,blocked:[],marks:3,answer:'[0,1,2,5,4,3,6,7,8]',explanation:'Cover all dots.'}]});`);
 const board=await evaluate(`(()=>{const r=document.querySelector('.path-board').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};})()`);
 await send('Input.dispatchMouseEvent',{type:'mousePressed',x:board.x+board.w/6,y:board.y+board.h/6,button:'left',clickCount:1});
 await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:board.x+board.w*5/6,y:board.y+board.h/6,button:'left',buttons:1});
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:board.x+board.w*5/6,y:board.y+board.h/6,button:'left',clickCount:1});
 assert.deepEqual(await evaluate(`JSON.parse(pathPlayer.getState()['0']).path`),[0,1,2]);
 await evaluate('pathPlayer.destroy()');
 assert.deepEqual(errors,[]);
 console.log('Package-only browser checks passed: all nine types, independent instances, live parent theme/sizing overrides, state/restore, explicit marking, lock/reset/disposal, hints, Go win events/replay and continuous path drag.');
}finally{ws.close();}
