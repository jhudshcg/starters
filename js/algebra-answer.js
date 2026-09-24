import {create, parseDependencies, bignumberDependencies, fraction} from 'mathjs';
const {parse} = create({parseDependencies, bignumberDependencies}, {number:'BigNumber'});

// Parse only; never compile or evaluate a student's expression. Polynomial
// coefficients are exact fractions, not values sampled at a few test points.
const unwrap = node => node.isParenthesisNode ? unwrap(node.content) : node;
const zero = () => fraction(0);
const constant = value => new Map([['', fraction(value)]]);
function bounded(poly) {
  for (const [key, value] of poly) {
    if (value.equals(0)) poly.delete(key);
    if (key.length > 12 || String(value.n).length > 60 || String(value.d).length > 60) throw Error('limit');
  }
  if (poly.size > 128) throw Error('limit');
  return poly;
}
function add(a, b, sign = 1) {
  const result = new Map(a);
  for (const [key, value] of b) result.set(key, (result.get(key) ?? zero()).add(value.mul(sign)));
  return bounded(result);
}
function multiply(a, b) {
  if (a.size * b.size > 4096) throw Error('limit');
  const result = new Map();
  for (const [ka, va] of a) for (const [kb, vb] of b) {
    const key = [...ka, ...kb].sort().join('');
    result.set(key, (result.get(key) ?? zero()).add(va.mul(vb)));
  }
  return bounded(result);
}
function polynomial(node) {
  node = unwrap(node);
  if (node.isConstantNode) return bounded(constant(node.value.toFixed()));
  if (node.isSymbolNode) return new Map([[node.name, fraction(1)]]);
  const [a, b] = node.args.map(polynomial);
  if (node.fn === 'unaryMinus') return multiply(constant(-1), a);
  if (node.fn === 'unaryPlus') return a;
  if (node.op === '+') return add(a, b);
  if (node.op === '-') return add(a, b, -1);
  if (node.op === '*') return multiply(a, b);
  if (node.op === '/') {
    if (b.size !== 1 || !b.has('') || b.get('').equals(0)) throw Error('denominator');
    return bounded(new Map([...a].map(([k, v]) => [k, v.div(b.get(''))])));
  }
  if (node.op === '^') {
    const exponent = b.size ? b.get('') : fraction(0);
    if (b.size > 1 || !exponent || !exponent.d || !exponent.equals(Math.trunc(exponent.valueOf())) || exponent.valueOf() < 0 || exponent.valueOf() > 12) throw Error('power');
    let result = constant(1);
    for (let i = 0; i < exponent.valueOf(); i++) result = multiply(result, a);
    return result;
  }
  throw Error('operator');
}
function parsePolynomial(input, variables) {
  if (!Array.isArray(variables) || !variables.length || variables.some(v => !/^[a-z]$/.test(v))) throw Error('variables');
  let source = String(input).trim();
  if (source.length > 240 || /[\r\n]/.test(source)) throw Error('length');
  source = source.replace(/[−–]/g, '-').replace(/[×·]/g, '*').replace(/÷/g, '/')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, s => '^' + [...s].map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).join(''));
  if (!/^[a-z0-9. +*/^()\t-]+$/.test(source) || /\d\s+\d/.test(source)) throw Error('syntax');
  if ([...source.matchAll(/[a-z]/g)].some(([v]) => !variables.includes(v))) throw Error('symbol');
  // GCSE notation: adjacent single-letter variables and x(...) mean products.
  source = source.replace(/([a-z])(?=[a-z])/g, '$1*').replace(/([a-z])\s*\(/g, '$1*(');
  const node = parse(source);
  let count = 0;
  function check(n, depth = 0) {
    if (++count > 160 || depth > 24) throw Error('limit');
    if (n.isParenthesisNode) return check(n.content, depth + 1);
    if (n.isConstantNode) {
      if (!n.value?.isFinite?.() || n.value.toFixed().length > 60) throw Error('constant');
      return;
    }
    if (n.isSymbolNode && variables.includes(n.name)) return;
    if (!n.isOperatorNode || !['add','subtract','multiply','divide','pow','unaryMinus','unaryPlus'].includes(n.fn)) throw Error('syntax');
    n.args.forEach(child => check(child, depth + 1));
  }
  check(node);
  return {node, poly: polynomial(node)};
}
const equal = (a, b) => a.size === b.size && [...a].every(([k, v]) => b.has(k) && v.equals(b.get(k)));
const gcd = (a, b) => b ? gcd(b, a % b) : a;
function monomial(node) {
  const letters = new Set();
  let numerators = [], denominators = [];
  function visit(n, denominator=false) {
    n = unwrap(n);
    if(n.isConstantNode) {(denominator?denominators:numerators).push(fraction(n.value.toFixed()));return true;}
    if(n.isSymbolNode) {if(denominator||letters.has(n.name))return false;letters.add(n.name);return true;}
    if(['unaryMinus','unaryPlus'].includes(n.fn))return visit(n.args[0],denominator);
    if(n.op==='*')return n.args.every(a=>visit(a,denominator));
    if(n.op==='/')return !denominator&&visit(n.args[0])&&visit(n.args[1],true);
    if(n.op==='^') {
      const base=unwrap(n.args[0]),exponent=unwrap(n.args[1]);
      return base.isSymbolNode&&exponent.isConstantNode&&Number(exponent.value)>1&&visit(base,denominator);
    }
    return false;
  }
  if(!visit(node)||numerators.length>1||denominators.length>1)return false;
  const top=numerators[0]??fraction(1),bottom=denominators[0]??fraction(1);
  if(letters.size&&numerators.length&&top.equals(1)&&!denominators.length)return false;
  if(denominators.length) {
    if(bottom.s<0||bottom.equals(1))return false;
    if(String(top.d)!=='1'||String(bottom.d)!=='1'||gcd(BigInt(top.n),BigInt(bottom.n))!==1n)return false;
  }
  return true;
}

// Expanded/simplified answers must have one monomial per power combination:
// reject uncollected terms and products that still need distribution.
function expanded(node) {
  const terms = [];
  function collect(n) {
    n = unwrap(n);
    if (n.isOperatorNode && ['+','-'].includes(n.op)) return n.args.forEach(collect);
    terms.push(n);
  }
  collect(node);
  const keys = new Set();
  for (const term of terms) {
    let distribution = false;
    function visit(n) {
      n = unwrap(n);
      if (n.isOperatorNode && n.args.length === 2 && ['+','-'].includes(n.op)) distribution = true;
      n.args?.forEach(visit);
    }
    visit(term);
    const p = polynomial(term);
    if (distribution || !monomial(term) || p.size > 1 || (!p.size && terms.length > 1)) return false;
    const key = p.keys().next().value ?? '';
    if (keys.has(key)) return false;
    keys.add(key);
  }
  return true;
}
function rearranged(node) {
  if(expanded(node))return true;
  const root=unwrap(node);
  if(root.op!=='/'||!expanded(root.args[0]))return false;
  const denominator=unwrap(root.args[1]);
  if(!denominator.isConstantNode)return false;
  const d=fraction(denominator.value.toFixed());
  if(d.s<0||d.equals(0)||d.equals(1)||String(d.d)!=='1')return false;
  const coefficients=[...polynomial(root.args[0]).values()];
  return coefficients.every(v=>String(v.d)==='1')&&coefficients.reduce((g,v)=>gcd(g,BigInt(v.n)),BigInt(d.n))===1n;
}
function factors(node) {
  node = unwrap(node);
  if (node.isOperatorNode && node.op === '*') return node.args.flatMap(factors);
  if (node.isOperatorNode && ['unaryMinus','unaryPlus'].includes(node.fn)) return factors(node.args[0]);
  if (node.isOperatorNode && node.op === '^') {
    const power = polynomial(node.args[1]).get('')?.valueOf();
    if (Number.isInteger(power) && power > 0 && power <= 12) return Array.from({length:power}, () => factors(node.args[0])).flat();
  }
  if (!expanded(node)) throw Error('form');
  const p = polynomial(node);
  if (![...p.keys()].some(Boolean)) return [];
  // Reject factors with an integer common divisor still to take out.
  const values = [...p.values()];
  if (values.some(v => String(v.d) !== '1') || values.reduce((g, v) => gcd(g, BigInt(v.n)), 0n) > 1n) throw Error('common factor');
  const ordered = [...p].sort(([a], [b]) => a.localeCompare(b));
  const scale = ordered[0][1];
  return [JSON.stringify(ordered.map(([key, value]) => [key, value.div(scale).toFraction()]))];
}

export function markAlgebra(input, part) {
  const partial = message => ({correct:false, earned:part.equivalentMarks ?? 0, message});
  try {
    const actual = parsePolynomial(input, part.variables), expected = parsePolynomial(part.answer, part.variables);
    if (!equal(actual.poly, expected.poly)) return {correct:false, message:'The expression is not equivalent. Recheck the signs, coefficients and powers.'};
    const form = part.algebraForm ?? 'equivalent';
    if (['expanded','simplified','rearranged'].includes(form) && !(form==='rearranged'?rearranged(actual.node):expanded(actual.node))) {
      const root = unwrap(actual.node);
      if (root.op === '/' && polynomial(root.args[0]).size > 1) {
        if(form==='rearranged')return partial('Your expression is equivalent. Simplify the numerator and denominator, then cancel any common numerical factor. A single simplified fraction is fine.');
        const divisor = polynomial(root.args[1]).get('')?.toFraction();
        return partial(`Your expression is equivalent. Divide each term in the numerator by ${divisor}, then collect like terms.`);
      }
      let brackets = false;
      actual.node.traverse(n => {if (n.op === '*' && n.args.some(a => polynomial(a).size > 1)) brackets = true;});
      if(!brackets&&actual.poly.size===1)return partial('Your expression is equivalent. Calculate the numerical factors, cancel common numerical factors and write repeated letters as powers.');
      return partial(brackets ? 'Your expression is equivalent. Multiply every term inside the brackets by the outside factor, then collect like terms.' : 'Your expression is equivalent. Combine terms with the same letters and powers, and combine the constants.');
    }
    if (form === 'factorised') {
      let valid = false;
      try { valid = JSON.stringify(factors(actual.node).sort()) === JSON.stringify(factors(expected.node).sort()); } catch { /* unfinished factorisation */ }
      if (!valid) return partial('Your expression is equivalent. Take out the greatest common factor and factorise any remaining brackets where possible.');
    }
    if (!['equivalent','expanded','simplified','factorised','rearranged'].includes(form)) throw Error('form');
    return {correct:true, earned:part.marks, message:'Correct.'};
  } catch {
    return {correct:false, message:'Enter an expression using the stated letters, numbers, +, −, ×, /, brackets and whole-number powers such as x^2. Divide only by a non-zero number.'};
  }
}
