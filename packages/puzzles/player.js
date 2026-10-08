/**
 * Purpose: mount an individual puzzle into a parent-owned container.
 * Main contents: serialisable state, controlled rendering, callbacks and disposal.
 * Used by: consumers without a custom renderer. Uses: UI modules and evaluator.
 * Libs: none. No storage, submission, CSS imports or app theme knowledge.
 */
import {renderPart,renderHint,renderSolution} from './ui/render.js';
import {bindChallenges} from './ui/boards.js';
import {evaluatePuzzle,maximumMark} from './evaluation.js';
let nextInstance=0;

/** Mount a resolved variation. The returned controller never submits or persists results. */
export function mountPuzzle(root,puzzle,options={}){
 const instanceId=options.instanceId??`puzzle-${++nextInstance}`;
 let state=structuredClone(options.state??{}),result=null,locked=Boolean(options.locked),destroyed=false;
 let showHint=false,showSolution=false,disposeBoards=()=>{},events;
 const emit=options.onChange??(()=>{});
 const notify=options.onMessage??(()=>{});
 function assertAlive(){if(destroyed)throw Error('Puzzle control has been destroyed.');}
 function change(id,value,selector){
  if(locked||destroyed)return;
  state[id]=value;result=null;draw();
  if(selector)root.querySelector(selector)?.focus({preventScroll:true});
  emit(structuredClone(state),{partId:id});
 }
 function draw(){
  disposeBoards({preserveDrag:true});events?.abort();events=new AbortController();
  root.innerHTML=puzzle.parts.map((part,index)=>renderPart(part,state[part.id]??'',{
   instanceId,index,locked,result:result?.parts[index],tools:options.tools??true,
   assistance:options.assistance??true,liveFeedback:options.liveFeedback??true
  })).join('')+(showHint?renderHint(puzzle):'')+(showSolution?renderSolution(puzzle,instanceId,{tools:options.tools??true,assistance:false}):'');
  disposeBoards=bindChallenges(root,{
   getPart:(_,id)=>puzzle.parts.find(part=>part.id===id),getAnswer:(_,id)=>state[id],
   isLocked:()=>locked||destroyed,onChange:(_,id,value,selector)=>change(id,value,selector),notify,
   onAssist:()=>options.onAssist?.({kind:'next-move-hint'}),onStatus:status=>options.onStatus?.(status)
  });
  // Text entry retains focus/caret; only the affected feedback is removed on editing.
  for(const input of root.querySelectorAll('[data-part]'))input.addEventListener(input.type==='radio'?'change':'input',()=>{
   if(locked||destroyed)return;
   state[input.dataset.part]=input.value;result=null;
   root.querySelectorAll('.feedback').forEach(node=>node.remove());
   root.querySelectorAll('[data-result]').forEach(node=>node.removeAttribute('data-result'));
   emit(structuredClone(state),{partId:input.dataset.part});
  },{signal:events.signal});
 }
 draw();
 return {
  getState(){assertAlive();return structuredClone(state);},
  setState(next){assertAlive();state=structuredClone(next??{});result=null;draw();},
  setLocked(value){assertAlive();locked=Boolean(value);draw();},
  reset(){assertAlive();if(locked)return;state={};result=null;draw();emit({}, {kind:'reset'});},
  getMaximumMark(){return maximumMark(puzzle);},
  evaluate(){assertAlive();return evaluatePuzzle(puzzle,state);},
  getResult(){assertAlive();return result?structuredClone(result):null;},
  setResult(value){assertAlive();result=value?structuredClone(value):null;draw();},
  showHint(value=true){assertAlive();showHint=Boolean(value);draw();},
  showSolution(value=true){assertAlive();showSolution=Boolean(value);draw();},
  destroy(){if(destroyed)return;destroyed=true;disposeBoards();events.abort();root.replaceChildren();}
 };
}
