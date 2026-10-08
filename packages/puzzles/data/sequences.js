import {number as n} from '../helpers.js';
const templates=[
 {slot:130,title:'Interleaved quadratic sequences',make:i=>{
  const a=i+2,b=i+5,values=Array.from({length:8},(_,k)=>{const t=Math.floor(k/2)+1;return k%2?a*t*t+b:b*t*t-a;});
  return {prompt:`The odd and even positions each follow a quadratic rule of the form A × n² + B, where n starts at 1 within that subsequence. Sequence: ${values.join(', ')}. Recover both rules before extending it.`,parts:[n('Value at position 9',b*25-a),n('Value at position 10',a*25+b),n('Coefficient A in the odd-position rule',b)],hint:'Separate alternate terms, then compare their first differences.'};}},
 {slot:131,title:'A recurrence with an offset',make:i=>{
  const offset=i+2,a=[i+1,i+3];for(let k=2;k<7;k++)a.push(a[k-1]+a[k-2]+offset);
  return {prompt:`After the first two terms, each term is the sum of the previous two plus the same fixed integer. Sequence: ${a.slice(0,5).join(', ')}.`,parts:[n('Find the fixed integer',offset),n('Sixth term',a[5]),n('Seventh term',a[6])],hint:'Compare the third term with the sum of the first two; check your constant on the next term.'};}},
 {slot:132,title:'Alternating operations',make:i=>{
  const add=3+i,mult=2+i%3,a=[2+i];for(let k=1;k<8;k++)a.push(k%2?a[k-1]+add:a[k-1]*mult);
  return {prompt:`Two operations alternate: first add a fixed positive integer, then multiply by a fixed integer greater than 1. Sequence: ${a.slice(0,6).join(', ')}.`,parts:[n('The fixed multiplier',mult),n('Seventh term',a[6]),n('Eighth term',a[7])],hint:'Compare transitions in pairs. The same addition and multiplication must explain every given transition.'};}},
 {slot:133,title:'Second differences and a missing term',make:i=>{
  const a=i+2,b=3*i-2,c=7-i,term=k=>a*k*k+b*k,values=Array.from({length:7},(_,k)=>term(k+1)+c);
  return {prompt:`This sequence follows one quadratic rule A × n² + B × n + C, with n starting at 1. Its terms are ${values[0]}, ${values[1]}, ?, ${values[3]}, ${values[4]}, ${values[5]}.`,parts:[n('Missing third term',values[2]),n('Seventh term',values[6]),n('Constant second difference',2*a)],hint:'Find differences across the known consecutive terms near the end, then work backwards.'};}},
 {slot:134,title:'Reverse the recurrence',make:i=>{
  const m=2+i%3,d=3+i,a=[i+4];for(let k=1;k<7;k++)a.push(m*a[k-1]-d);
  return {prompt:`Each term is the previous term multiplied by M, then reduced by D. M is an integer from 2 to 4; D is a positive integer. The first term is hidden: ?, ${a[1]}, ${a[2]}, ${a[3]}, ${a[4]}. Recover the rule.`,parts:[n('Value of M',m),n('Hidden first term',a[0]),n('Sixth term',a[5])],hint:'Compare successive differences to identify the multiplier, then determine D and reverse one step.'};}}
];
export default templates.map(t=>({slot:t.slot,focus:'sequences',title:t.title,format:'Find and apply a constrained rule',tags:[],setSize:1,estimatedMinutes:7,variations:Array.from({length:5},(_,i)=>{const v=t.make(i);return {...v,parts:v.parts.map((p,j)=>({...p,id:String(j)}))};})}));
