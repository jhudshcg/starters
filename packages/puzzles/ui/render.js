/**
 * Purpose: render all puzzle answer controls without an app shell or submission controls.
 * Main contents: part, hint and solution markup. Used by: player and app adapters.
 * Uses: board renderer and answer-kind metadata. Libs: none.
 */
import {renderChallenge} from './boards.js';
import {challengeKinds} from '../rules/challenge-rules.js';
import {puzzleAnswerKinds} from '../evaluation.js';
export const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const esc=escapeHTML;

/** instanceId namespaces sibling controls; labelHTML is trusted parent-authored markup. */
export function renderPart(part,answer='',{instanceId='puzzle',index=0,locked=false,result=null,labelHTML,tools=true,assistance=true,liveFeedback=true,guidanceActionsHTML='',guidanceHTML='',referenceHTML=''}={}){
 if(!/^[\w-]+$/.test(String(instanceId)))throw Error('Puzzle instance IDs must contain only letters, digits, underscores or hyphens.');
 if(!puzzleAnswerKinds.includes(part.kind))throw Error(`Unsupported puzzle answer kind: ${part.kind}`);
 const p=part,id=`answer-${instanceId}-${p.id}`,feedbackId=`feedback-${instanceId}-${index}`;
 const outcome=result?(result.earned===result.max?'correct':result.earned>0?'partial':'incorrect'):'';
 const outcomeAttribute=outcome?` data-result="${outcome}"`:'';
 const label=labelHTML??`<span class="part-label">${String.fromCharCode(97+index)})</span> ${esc(p.prompt)} <span class="part-marks">(${p.marks})</span>`;
 let html;
 if(challengeKinds.includes(p.kind))html=`<div class="part interactive-part"${outcomeAttribute}>${renderChallenge(p,answer,locked,instanceId,{tools,assistance,liveFeedback,guidanceActionsHTML,guidanceHTML,referenceHTML})}`;
 else if(p.options)html=`<fieldset class="part puzzle-controls"${outcomeAttribute} ${locked?'disabled':''}><legend>${label}</legend><div class="options">${p.options.map(option=>`<label class="option"><input type="radio" name="${id}" value="${esc(option)}" data-slot="${instanceId}" data-part="${esc(p.id)}" ${answer===option?'checked':''}>${esc(option)}</label>`).join('')}</div>`;
 else html=`<div class="part puzzle-controls"${outcomeAttribute}><label for="${id}">${label}</label>${p.kind==='algebra'?`<small id="format-${instanceId}-${p.id}">Use ${esc(p.variables.join(', '))}; write powers as x^2 and fractions with /. ${p.equivalentMarks?'Equivalent unfinished expressions can earn partial credit.':''}</small>`:''}<input id="${id}" data-slot="${instanceId}" data-part="${esc(p.id)}" value="${esc(answer)}" ${locked?'disabled':''} ${p.kind==='number'?'inputmode="decimal"':''} autocomplete="off" autocapitalize="off" spellcheck="false" ${result||p.kind==='algebra'?`aria-describedby="${[p.kind==='algebra'?`format-${instanceId}-${p.id}`:'',result?feedbackId:''].filter(Boolean).join(' ')}"`:''}>`;
 return html+(result?`<p id="${feedbackId}" class="feedback ${outcome}">${result.earned}/${result.max} · ${esc(result.message)}</p>`:'')+(p.options&&!challengeKinds.includes(p.kind)?'</fieldset>':'</div>');
}

/** Return hint markup only when the parent explicitly requests it. */
export const renderHint=puzzle=>`<p class="hint-text"><strong>Hint:</strong> ${esc(puzzle.hint)}</p>`;

/** Render a model answer separately; never write it into the student's answer state. */
export function renderSolutionPart(part,index=0,instanceId='puzzle',options={}){
 return `<li class="solution-part"><p class="solution-answer"><span class="part-label">${String.fromCharCode(97+index)})</span> <strong>${esc(part.solutionText??part.answer)}</strong></p><p class="solution-explanation">${esc(part.explanation)}</p>${challengeKinds.includes(part.kind)?renderChallenge(part,part.answer,true,`${instanceId}-solution`,options):''}</li>`;
}
export const renderSolution=(puzzle,instanceId='puzzle',options={})=>`<div class="solution"><h3>Answers and explanations</h3><ol class="solution-list" role="list">${puzzle.parts.map((part,index)=>renderSolutionPart(part,index,instanceId,options)).join('')}</ol></div>`;
