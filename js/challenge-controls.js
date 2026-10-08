/**
 * Purpose: connect package board controls to the app's packed banks and attempts.
 * Main contents: rendering/state adapters. Used by: app activities and reveals.
 * Uses: package boards and packed-data. Libs: none.
 */
import {renderChallenge as render,bindChallenges as bind} from '../packages/puzzles/ui/boards.js';
import {playTree} from './packed-data.js';
const readable=part=>part.playData?{...part,tree:playTree(part)}:part;
const bindings=new WeakMap();
export const renderChallenge=(part,...args)=>render(readable(part),...args);
export function bindChallenges(root,set,attempt,onChange,notify,onAssist){
 bindings.get(root)?.({preserveDrag:true});
 const dispose=bind(root,{
  getPart:(slot,id)=>{const part=set.questions.find(q=>q.slot===Number(String(slot).replace(/-solution$/,'')))?.parts.find(p=>p.id===id);return part?readable(part):null;},
  getAnswer:(slot,id)=>attempt.answers[slot]?.[id],isLocked:()=>Boolean(attempt.finished),
  onChange:(slot,...args)=>onChange(Number(slot),...args),notify,
  onAssist:slot=>onAssist?.(Number(slot))
 });
 bindings.set(root,dispose);return dispose;
}

export function disposeChallenges(root){bindings.get(root)?.();bindings.delete(root);}
