import {question,number} from '../helpers.js';
const families=[
 ['Equal increases',i=>({a:Array.from({length:8},(_,k)=>10+i+k*(i+2)),rule:`Start at ${10+i} and add ${i+2} each time.`,before:8,hint:'Compare neighbouring positions. Each forward step adds the same amount.'})],
 ['Equal decreases',i=>({a:Array.from({length:8},(_,k)=>60+i-k*(i+2)),rule:`Start at ${60+i} and subtract ${i+2} each time.`,before:62+2*i,hint:'Moving forwards subtracts the step; moving backwards adds it.'})],
 ['Doubling',i=>({a:Array.from({length:8},(_,k)=>(i+1)*2**(k+1)),rule:`Start at ${2*(i+1)} and double each time.`,before:i+1,hint:'Multiply by two for one step forwards, and divide by two for one step backwards.'})],
 ['Halving',i=>({a:Array.from({length:8},(_,k)=>(i+1)*128/2**k),rule:`Start at ${128*(i+1)} and halve each time.`,before:256*(i+1),hint:'Halving divides by two. Check a backwards step by doubling.'})],
 ['Repeating groups',i=>({a:Array.from({length:8},(_,k)=>[i+2,i+5,i+8][k%3]),rule:`Repeat the group ${i+2}, ${i+5}, ${i+8} in that order.`,before:i+8,hint:'Mark the three positions in one repeated group; the first position follows the third.'})]
];
const modes=['Continue the sequence','Fill missing positions','Find the wrong term','Add a short run','Step backwards'];
export default families.flatMap(([name,make],f)=>modes.map((mode,m)=>({...question(1174+5*f+m,'sequences',`${name} · ${mode}`,'Sequence reasoning',['challenge:beginner'],i=>{
 const {a,rule,before,hint}=make(i),n=(prompt,answer,explanation)=>number(prompt,answer,{explanation});let prompt=rule,parts;
 if(m===0){prompt+=` Terms1–4 are ${a.slice(0,4).join(', ')}.`;parts=[n('Term5?',a[4],'Apply the rule once after term4.'),n('Term6?',a[5],'Apply the rule again after term5.')];}
 if(m===1){prompt+=` Terms1–6 are ${a.slice(0,6).map((v,k)=>[1,3,5].includes(k)?'?':v).join(', ')}.`;parts=[1,3,5].map(k=>n(`Term${k+1}?`,a[k],'Use the rule and check against the adjacent displayed term.'));}
 if(m===2){const at=2+i%3,shown=a.slice(0,6);shown[at]+=1;prompt+=` Exactly one term is wrong: ${shown.join(', ')}.`;parts=[n('Position of the wrong term (count from1)?',at+1,'Compare every displayed value with the stated rule.'),n('Correct value at that position?',a[at],'Apply the rule to the correct preceding terms.')];}
 if(m===3){prompt+=` The first four terms are ${a.slice(0,4).join(', ')}.`;parts=[n('Total of the first three terms?',a.slice(0,3).reduce((s,v)=>s+v,0),'Add three terms, not the position numbers.'),n('Total of the first four terms?',a.slice(0,4).reduce((s,v)=>s+v,0),'Include the fourth term once.')];}
 if(m===4){prompt+=` Continue the same rule backwards before the stated start.`;parts=[n('Value immediately before the starting value?',before,'Undo one forward step; for a repeated group, move to its preceding position.'),n('Value immediately after the starting value?',a[1],'Apply one forward step from the stated start.')];}
 return {prompt:prompt.replaceAll('Terms1','Terms 1'),hint,parts:parts.map(p=>({...p,prompt:p.prompt.replace(/Term(\d)/,'Term $1').replace('from1','from 1')}))};
}),challengeLevel:'beginner',estimatedMinutes:4,reviewStatus:'pending'})));
