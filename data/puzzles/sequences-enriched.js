import {question, number} from '../helpers.js';

// Each rule family has five different tasks, not five renamed instances:
// extend, restore omissions, sum, recover a position, and correct an error.
const families=[
 ['Arithmetic progression','foundation',i=>({terms:Array.from({length:12},(_,k)=>i+3+(k+1)*(i+2)),rule:`The nth term is ${i+2}n + ${i+3}.`,hint:'Multiply the position by the coefficient of n, then add the constant.'})],
 ['Geometric progression','foundation',i=>({terms:Array.from({length:12},(_,k)=>(i+1)*2**k),rule:`Start at ${i+1}; double each term to get the next.`,hint:'Each move forward doubles the value; each move backwards halves it.'})],
 ['Square numbers with an offset','foundation',i=>({terms:Array.from({length:12},(_,k)=>(k+1)**2+i+2),rule:`The nth term is n² + ${i+2}.`,hint:'Work out the square of the position before adding the fixed offset.'})],
 ['Triangular numbers','foundation',i=>({terms:Array.from({length:12},(_,k)=>(k+1)*(k+2)/2+i),rule:`The nth term is n(n + 1)/2 + ${i}.`,hint:'Multiply consecutive position numbers, halve the product, then add the offset.'})],
 ['Alternating addition and multiplication','standard',i=>{const terms=[i+2];for(let k=1;k<12;k++)terms.push(k%2?terms.at(-1)+i+3:terms.at(-1)*2);return {terms,rule:`Start at ${i+2}. Repeatedly add ${i+3}, then multiply by 2.`,hint:'Keep track of which of the two operations applies at each step.'};}],
 ['Repeating increments','standard',i=>{const terms=[i+1],steps=[i+2,i+3,i+5];for(let k=1;k<12;k++)terms.push(terms.at(-1)+steps[(k-1)%3]);return {terms,rule:`Start at ${i+1}. Repeat the increments +${steps.join(', +')} in that order.`,hint:'Label the repeating group of three increments so its position does not drift.'};}],
 ['Sum of the previous two','standard',i=>{const terms=[i+2,i+3];while(terms.length<12)terms.push(terms.at(-1)+terms.at(-2));return {terms,rule:`The first two terms are ${i+2} and ${i+3}. Each later term is the sum of the previous two.`,hint:'Keep the two most recent terms available. Subtraction lets you work backwards.'};}],
 ['Product of shifted positions','standard',i=>({terms:Array.from({length:12},(_,k)=>(k+1)*(k+i+3)),rule:`The nth term is n(n + ${i+2}).`,hint:'Calculate both factors using the same position number, then multiply.'})],
 ['Cumulative squares','stretch',i=>{let total=i+1;return {terms:Array.from({length:12},(_,k)=>total+=(k+1)**2),rule:`Begin with a total of ${i+1}. Add 1² to obtain term 1, then 2² for term 2, then 3², and so on.`,hint:'The increment into position n is n². Distinguish an increment from the running total.'};}],
 ['Scaled second differences','stretch',i=>{const terms=[i+1,i+4];while(terms.length<12)terms.push(3*terms.at(-1)-2*terms.at(-2)+i+1);return {terms,rule:`Start with ${i+1}, ${i+4}. Each later term equals three times the previous term, minus twice the term before that, plus ${i+1}.`,hint:'Substitute both preceding terms with their coefficients and keep the subtraction sign.'};}]
];
const labels=['Extend the rule','Restore missing terms','Total a sequence','Recover a position','Correct a term'];
export default families.flatMap(([name,level,make],family)=>labels.map((task,mode)=>({
 ...question(family*5+mode,'sequences',`${name} · ${task}`,'Sequence reasoning',[`challenge:${level}`],i=>{
   const {terms:a,rule,hint}=make(i),p=(label,value,explanation)=>number(label,value,{explanation});
   let prompt=rule,parts;
   if(mode===0){prompt+=` First five terms: ${a.slice(0,5).join(', ')}.`;parts=[5,6,7].map(k=>p(`Term ${k+1}`,a[k],`Apply the stated rule at position ${k+1}.`));}
   if(mode===1){prompt+=` First eight terms: ${a.slice(0,8).map((v,k)=>[2,4,6].includes(k)?'?':v).join(', ')}.`;parts=[2,4,6].map(k=>p(`Missing term at position ${k+1}`,a[k],`Use the stated rule to restore position ${k+1}; its neighbours provide a check.`));}
   if(mode===2){prompt+=` Terms 1–4: ${a.slice(0,4).join(', ')}.`;parts=[p('Term 5',a[4],'Extend the stated rule by one position.'),p('Sum of terms 1–5',a.slice(0,5).reduce((x,y)=>x+y,0),'Add the first five terms, including the newly found fifth term.'),p('Term 6',a[5],'Continue the same rule for one more position.')];}
   if(mode===3){prompt+=' Consider positions 1–12 only.';parts=[p(`Position of ${a[7]}`,8,'Apply the stated rule and count positions from 1.'),p(`Position of ${a[10]}`,11,'Continue the rule within the specified position range.'),p('Difference between those positions',3,'Subtract the two position numbers, not the two term values.')];}
   if(mode===4){const wrong=3+i%3,shown=a.slice(0,8);shown[wrong]+=i+1;prompt+=` Exactly one term is incorrect in this list: ${shown.join(', ')}.`;parts=[p('Position of the incorrect term',wrong+1,'Compare each displayed term with the stated rule.'),p('Correct value at that position',a[wrong],'Recalculate the value using the rule.'),p('Term 9 of the corrected sequence',a[8],'Continue the corrected sequence, ignoring the deliberately incorrect value.')];}
   return {prompt,hint,parts};
 }),challengeLevel:level,estimatedMinutes:6,reviewStatus:'pending'
})));
