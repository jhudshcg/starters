/**
 * Purpose: preview and drag a Go stone while pressed, committing through the existing click handler.
 * Main contents: pointer/key previews and cancellation. Used by: board bindings.
 * Uses: Go move validation. Libs: browser DOM APIs only.
 */
import {playGo} from '../rules/go-rules.js';

/** Bind transient previews; releasing activates the existing move handler once. */
export function bindGoPress(container,part,{getState,isLocked,signal,validate=(state,move)=>playGo(part,state,move,{deferReply:true}),getColour=state=>(state.moves?.length??0)%2?(part.player==='b'?'w':'b'):part.player}){
 let pressed=null,preview=null,cancelledClick=false;
 const listen=(node,type,handler,options={})=>node.addEventListener(type,handler,{...options,signal});
 const point=target=>target.closest?.('[data-challenge-action="go"]');
 const clear=()=>{preview?.remove();preview=null;pressed=null;};
 const cancel=()=>{if(pressed?.pointerId!==undefined)cancelledClick=true;clear();};
 const show=(button,press)=>{
  clear();
  if(isLocked()||button.disabled)return;
  const state=getState(),move=Number(button.dataset.value);
  pressed={button,...press};
  if(validate(state,move).error)return;
  const [x0,y0]=part.view,colour=getColour(state);
  preview=document.createElementNS('http://www.w3.org/2000/svg','circle');
  const attributes={'data-go-preview':move,cx:move%part.size-x0+.6,cy:Math.floor(move/part.size)-y0+.6,r:.43,fill:colour==='b'?'#222':'#fff',stroke:'#303030','stroke-width':.025,opacity:.8};
  for(const [name,value] of Object.entries(attributes))preview.setAttribute(name,String(value));
  container.querySelector('[data-go-grid]').append(preview);
 };
 // Hit-test viewport coordinates: touch implicitly captures its original intersection.
 const at=event=>{
  const board=container.querySelector('.go-board'),box=board.getBoundingClientRect();
  const gridPoint=new DOMPoint(event.clientX,event.clientY).matrixTransform(board.querySelector('[data-go-grid]').getScreenCTM().inverse());
  if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)return null;
  const [x0,y0,x1,y1]=part.view;
  const x=Math.max(x0,Math.min(x1,Math.round(gridPoint.x+x0-.6)));
  const y=Math.max(y0,Math.min(y1,Math.round(gridPoint.y+y0-.6)));
  return container.querySelector(`[data-challenge-action="go"][data-value="${y*part.size+x}"]`);
 };
 listen(container,'pointerdown',event=>{
  if(!event.isPrimary){cancel();return;}
  const button=point(event.target);if(!button||event.button!==0)return;
  cancelledClick=false;show(button,{pointerId:event.pointerId});
 });
 // Window listeners handle release outside the board; touch may implicitly capture the pointer.
 listen(window,'pointermove',event=>{
  if(pressed?.pointerId!==event.pointerId)return;
  const button=at(event);
  if(!button){cancel();return;}
  if(button!==pressed.button)show(button,{pointerId:event.pointerId});
 });
 listen(window,'pointerup',event=>{
  if(pressed?.pointerId!==event.pointerId)return;
  const button=at(event);
  // Suppress the browser's following click on the original down target, including touch.
  cancelledClick=true;clear();
  if(button&&!button.disabled)button.click();
 });
 listen(window,'pointercancel',event=>{if(pressed?.pointerId===event.pointerId)cancel();});
 listen(container,'click',event=>{
  if(point(event.target)&&event.detail>0&&cancelledClick){event.preventDefault();event.stopImmediatePropagation();cancelledClick=false;}
 },{capture:true});
 listen(container,'keydown',event=>{
  if(event.key==='Escape'){cancel();return;}
  const button=point(event.target);if(!button||!['Enter',' '].includes(event.key))return;
  event.preventDefault();
  if(!event.repeat)show(button,{key:event.key});
 });
 listen(container,'keyup',event=>{
  if(!['Enter',' '].includes(event.key)||!point(event.target))return;
  event.preventDefault();
  const button=pressed?.key===event.key?pressed.button:null;clear();
  if(button&&document.activeElement===button)button.click();
 });
 listen(container,'focusout',event=>{if(pressed?.button===event.target)cancel();});
 listen(window,'blur',cancel);
 signal.addEventListener('abort',clear,{once:true});
}
