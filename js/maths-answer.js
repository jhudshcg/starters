// A deliberately small arithmetic grammar. Student expressions are never executed.
export function expressionValue(input, digit) {
  const source=String(input).replace(/\s/g,'');
  if(source.length>120 || !/^[0-9+*/()!a-z-]+$/.test(source)) return null;
  const digits=source.match(/\d/g)??[];
  if(digits.length!==3 || digits.some(d=>Number(d)!==digit)) return null;
  const tokens=source.match(/sqrt|cbrt|\d|[+*/()!-]/g)??[];
  if(tokens.join('')!==source) return null;
  let i=0,depth=0;
  const bounded=x=>{if(!Number.isFinite(x)||Math.abs(x)>1e6)throw Error();return x;};
  function atom(){
    if(++depth>20)throw Error();
    let x,t=tokens[i++];
    if(t==='('){x=sum();if(tokens[i++]!==')')throw Error();}
    else if(t==='sqrt'||t==='cbrt'){
      if(tokens[i++]!=='(')throw Error();x=sum();if(tokens[i++]!==')')throw Error();
      x=t==='sqrt'?Math.sqrt(x):Math.cbrt(x);
    } else if(t==='-'||t==='+') x=(t==='-'?-1:1)*atom();
    else if(/^\d$/.test(t??''))x=Number(t);
    else throw Error();
    while(tokens[i]==='!'){
      i++;if(!Number.isInteger(x)||x<0||x>10)throw Error();
      let product=1;for(let n=2;n<=x;n++)product*=n;x=product;
    }
    depth--;return bounded(x);
  }
  function product(){let x=atom();while(['*','/'].includes(tokens[i])){const op=tokens[i++],y=atom();x=bounded(op==='*'?x*y:x/y);}return x;}
  function sum(){let x=product();while(['+','-'].includes(tokens[i])){const op=tokens[i++],y=product();x=bounded(op==='+'?x+y:x-y);}return x;}
  try{const value=sum();return i===tokens.length?value:null;}catch{return null;}
}

export function validCoinSystems(input) {
  const groups=String(input).split(';');
  if(groups.length!==2)return false;
  const parsed=groups.map(s=>/^\s*\d+(?:\s*,\s*\d+){3}\s*$/.test(s)?s.split(',').map(Number).sort((a,b)=>a-b):null);
  if(parsed.some(a=>!a||a.some(n=>!Number.isSafeInteger(n)||n<1||n>10)||new Set(a).size!==4))return false;
  if(JSON.stringify(parsed[0])===JSON.stringify(parsed[1]))return false;
  return parsed.every(a=>{
    const possible=new Set([...a,...a.flatMap(x=>a.map(y=>x+y))]);
    return Array.from({length:10},(_,i)=>i+1).every(n=>possible.has(n));
  });
}

export function fractionValue(input){
  const text=String(input).trim();
  if(!/^[+-]?\d+(?:\.\d+)?(?:\s*\/\s*[+-]?\d+(?:\.\d+)?)?$/.test(text))return null;
  const [numerator,denominator=1]=text.split('/').map(Number),value=numerator/denominator;
  return Number.isFinite(value)?value:null;
}
