import {markAlgebra} from './algebra-answer.js';

// A small Excel grammar, never eval/compile. Cell values stay symbolic, so a
// formula cannot pass merely because it matches the numbers in one worksheet.
class FormulaError extends Error {constructor(message,review=false){super(message);this.review=review;}}
const fail=(message,review=false)=>{throw new FormulaError(message,review);};
const refPattern=/^(\$?)([A-Z]{1,2})(\$?)([1-9]\d{0,2})$/;
const colNumber=s=>[...s].reduce((n,c)=>n*26+c.charCodeAt(0)-64,0);
const colName=n=>n>0?(n>26?colName(Math.floor((n-1)/26)):'')+String.fromCharCode(65+(n-1)%26):'';
function address(ref,shift){
 const m=refPattern.exec(ref);if(!m)fail('Use A1 cell references.');
 const col=colNumber(m[2])+(m[1]?0:shift.col),row=Number(m[4])+(m[3]?0:shift.row);
 if(col<1||row<1)fail('Copying this formula creates an invalid reference.');
 return colName(col)+row;
}
export function parseExcel(input){
 const source=String(input).trim().toUpperCase();
 if(source.length>240)fail('Formula is too long for this activity.',true);
 if(!source.startsWith('='))fail('Start your formula with =.');
 const tokens=[];let at=1;
 while(at<source.length){
  if(/\s/.test(source[at])){at++;continue;}
  const m=/^(\$?[A-Z]{1,2}\$?[1-9]\d{0,2}(?![A-Z0-9])|[A-Z]+|(?:\d+(?:\.\d*)?|\.\d+)|[()+*/,:;%\-])/.exec(source.slice(at));
  if(!m)fail('Needs review: this formula uses syntax outside the supported subset. Use cell references, arithmetic, SUM or SUMIF.',true);
  tokens.push(m[0]);at+=m[0].length;
 }
 let i=0,depth=0;
 const take=()=>tokens[i++];
 const need=s=>{if(take()!==s)fail(`Check the formula syntax: expected ${s}.`);};
 function atom(){
  if(++depth>24)fail('Formula is too deeply nested.',true);
  let n,t=take();
  if(t==='+'||t==='-')n={op:t==='-'?'neg':'pos',args:[atom()]};
  else if(t==='('){n=expr();need(')');}
  else if(refPattern.test(t??'')){n={ref:t};if(tokens[i]===':'){take();const end=take();if(!refPattern.test(end??''))fail('A range needs two cell references.');n={range:[t,end]};}}
  else if(/^\d|^\.\d/.test(t??''))n={number:t};
  else if(/^[A-Z]+$/.test(t??'')){
   if(!['SUM','SUMIF'].includes(t))fail('Needs review: this function is not supported here. Use SUM, SUMIF or arithmetic, or ask your teacher to review it.',true);
   need('(');const args=[expr()];while([',',';'].includes(tokens[i])){take();args.push(expr());}need(')');n={fn:t,args};
  }else fail('Check the formula syntax: an operand is missing.');
  if(tokens[i]==='%'){take();n={op:'/',args:[n,{number:'100'}]};}
  depth--;return n;
 }
 function product(){let n=atom();while(['*','/'].includes(tokens[i])){const op=take();n={op,args:[n,atom()]};}return n;}
 function expr(){let n=product();while(['+','-'].includes(tokens[i])){const op=take();n={op,args:[n,product()]};}return n;}
 const tree=expr();if(i!==tokens.length)fail('Check separators, operators and closing brackets.');return tree;
}
function cellsIn(range,shift){
 const [a,b]=range.map(r=>address(r,shift)),ma=/^([A-Z]+)(\d+)$/.exec(a),mb=/^([A-Z]+)(\d+)$/.exec(b);
 const c1=colNumber(ma[1]),c2=colNumber(mb[1]),r1=+ma[2],r2=+mb[2];
 if(c2<c1||r2<r1||(c2-c1+1)*(r2-r1+1)>64)fail('Use a small forward range from the displayed extract.',true);
 return Array.from({length:r2-r1+1},(_,r)=>Array.from({length:c2-c1+1},(_,c)=>colName(c1+c)+(r1+r))).flat();
}
function symbolic(tree,policy,shift,symbols,visiting=new Set()){
 const symbol=key=>{if(!symbols.has(key)){if(symbols.size===26)fail('Too many references for this activity.',true);symbols.set(key,String.fromCharCode(97+symbols.size));}return symbols.get(key);};
 const reference=ref=>{
  if(!Object.hasOwn(policy.cells,ref))fail(`The formula refers to ${ref}, outside the supplied data. Check its references and copying behaviour.`);
  if(policy.formulas?.[ref]){
   if(visiting.has(ref))fail('The formula has a circular reference.');
   const next=new Set(visiting);next.add(ref);return symbolic(parseExcel(policy.formulas[ref]),policy,{row:0,col:0},symbols,next);
  }
  if(typeof policy.cells[ref]!=='number')fail(`${ref} contains text rather than a number.`);
  return symbol(ref);
 };
 const walk=n=>{
  if(n.number!==undefined)return n.number;
  if(n.ref)return reference(address(n.ref,shift));
  if(n.range)fail('Use ranges inside SUM or SUMIF.');
  if(n.op){
   if(n.op==='neg'||n.op==='pos')return `(${n.op==='neg'?'-':'+'}${walk(n.args[0])})`;
   if(n.op==='/'&&!(n.args[1].number!==undefined&&Number(n.args[1].number)!==0))fail('Needs review: divide only by a non-zero number in this activity.',true);
   return '('+walk(n.args[0])+n.op+walk(n.args[1])+')';
  }
  if(n.fn==='SUM')return '('+n.args.flatMap(a=>a.range?cellsIn(a.range,shift).map(reference):[walk(a)]).join('+')+')';
  if(n.fn==='SUMIF'){
   if(n.args.length!==3||!n.args[0].range||!n.args[1].ref||!n.args[2].range)fail('Needs review: use SUMIF(criteria range, criterion cell, sum range).',true);
   const criteria=cellsIn(n.args[0].range,shift),values=cellsIn(n.args[2].range,shift),criterion=address(n.args[1].ref,shift);
   if(criteria.length!==values.length)fail('Needs review: this checker supports aligned SUMIF ranges. Unequal ranges do not necessarily cause an Excel error.',true);
   for(const ref of [...criteria,...values,criterion])if(!Object.hasOwn(policy.cells,ref))fail(`Check the SUMIF range or criterion: ${ref} is outside the supplied data.`);
   return '('+criteria.map((ref,i)=>`(${symbol('MATCH:'+ref+':'+criterion)}*${reference(values[i])})`).join('+')+')';
  }
  fail('Unsupported formula.',true);
 };
 return walk(tree);
}
export function markExcel(input,part){
 try{
  const actual=parseExcel(input),expected=parseExcel(part.answer),policy=part.excel;
  for(const shift of [{row:0,col:0},...(policy.copies??[])]){
   const symbols=new Map(),a=symbolic(actual,policy,shift,symbols),b=symbolic(expected,policy,shift,symbols);
   const result=markAlgebra(a,{answer:b,variables:[...symbols.values()],marks:part.marks});
   if(!result.correct)return {correct:false,earned:0,message:'This formula does not preserve the required calculation at every stated destination. Check included cells, units and fixed/moving references.'};
  }
  return {correct:true,earned:part.marks,message:'Correct. The formula and its stated copies are equivalent.'};
 }catch(error){return {correct:false,earned:0,needsReview:Boolean(error.review),message:error instanceof FormulaError?error.message:'This formula could not be checked. Compare it with the supported format.'};}
}
