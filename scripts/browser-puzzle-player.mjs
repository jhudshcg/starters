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
 const go=await evaluate(`(()=>{
  const q=library.puzzles.find(q=>q.type==='go'),v=q.variations[0],p=v.parts[0],a=document.querySelector('#a');
  window.assisted=0;window.statuses=[];window.goPlayer=library.mountPuzzle(a,v,{onAssist:()=>assisted++,onStatus:s=>statuses.push(s),liveFeedback:false});
  a.querySelector('[data-challenge-action="go-hint"]').click();
  const hint=assisted===1&&JSON.parse(goPlayer.getState()[p.id]).hintMove!==undefined;
  const moves=JSON.parse(p.answer).moves;
  goPlayer.setState({});
  for(let i=0;i<moves.length;i++){const index=JSON.parse(goPlayer.getState()[p.id]??'{}').moves?.length??0;if(index>=moves.length)break;a.querySelector('[data-challenge-action="go"][data-value="'+moves[index]+'"]').click();}
  const win=statuses.at(-1)?.recordedWin===true;
  const noAutoResult=goPlayer.getResult()===null;
  goPlayer.setState({[p.id]:p.answer});goPlayer.showSolution();
  const before=JSON.stringify(goPlayer.getState()),slider=a.querySelector('[data-go-replay]');slider.value='0';slider.dispatchEvent(new Event('input',{bubbles:true}));
  const replay=slider.isConnected&&JSON.stringify(goPlayer.getState())===before;
  goPlayer.destroy();return {hint,win,noAutoResult,replay};
 })()`);
 for(const [key,value] of Object.entries(go))assert.equal(value,true,key);
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
