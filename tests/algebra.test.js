import test from 'node:test';
import assert from 'node:assert/strict';
import {markQuestion} from '../js/marking.js';
import {packBank} from '../scripts/pack-bank.mjs';

const part = (answer, algebraForm='simplified', variables=['x']) => ({id:'0',kind:'algebra',answer,algebraForm,variables,marks:2,equivalentMarks:1});
const check = (input, p) => markQuestion({parts:[p]}, {'0':input})[0];
test('equivalent polynomials receive full credit in finished form', () => {
  for (const input of ['2x + 3','3+2*x','3 + x*2','2×x+3']) assert.equal(check(input,part('2x+3')).earned,2,input);
  for (const input of ['x² + 2x + 1','1+x^2+2*x']) assert.equal(check(input,part('x^2+2x+1')).earned,2,input);
  assert.equal(check('ba+2a',part('ab+2a','simplified',['a','b'])).earned,2);
  assert.equal(check('x/3+x/6',part('x/2','equivalent')).earned,2);
  assert.equal(check('-x^2',part('-(x^2)','equivalent')).earned,2);
  assert.equal(check('(-x)^2',part('-(x^2)','equivalent')).earned,0);
});
test('unfinished equivalents receive authored partial marks and targeted feedback', () => {
  const p=part('2x+3');
  for (const input of ['(4x+6)/2','x+x+3','2(x+1)+1']) assert.equal(check(input,p).earned,1,input);
  assert.match(check('(4x+6)/2',p).message,/Divide each term in the numerator by 2/);
  assert.match(check('x+x+3',p).message,/same letters and powers/);
  assert.match(check('2(x+1)+1',p).message,/every term inside the brackets/);
  assert.equal(check('(4x+6)/2',part('2x+3','equivalent')).earned,2);
  assert.equal(check('(4x+6)/2',{...p,equivalentMarks:0}).earned,0);
  assert.equal(check('',p).earned,0);
});
test('factorised form recognises reordered factors and detects unfinished work', () => {
  const p=part('(x+2)(x-3)','factorised');
  for (const input of ['(x-3)*(2+x)','(-x+3)(-x-2)']) assert.equal(check(input,p).earned,2,input);
  assert.equal(check('x^2-x-6',p).earned,1);
  assert.equal(check('(x+3)(x-2)',p).earned,0);
  assert.equal(check('3(2x+4)',part('6(x+2)','factorised')).earned,1);
  assert.equal(check('(x+2)*6',part('6(x+2)','factorised')).earned,2);
  assert.equal(check('12(x/2+1)',part('6(x+2)','factorised')).earned,1);
  assert.equal(check('(x+1)^2',part('(x+1)(x+1)','factorised')).earned,2);
  assert.equal(check('(x^2-1)',part('(x-1)(x+1)','factorised')).earned,1);
});
test('rearrangement requires a finished expression but allows a reduced single fraction',()=>{
  const p=part('(x+3)/2','rearranged');
  for(const input of ['(x+3)/2','x/2+3/2','0.5x+1.5'])assert.equal(check(input,p).earned,2,input);
  for(const input of ['(2x+6)/4','(x+1+2)/2','(x+3)/(1+1)','((x+3)*2)/4'])assert.equal(check(input,p).earned,1,input);
  assert.match(check('(2x+6)/4',p).message,/cancel any common numerical factor/);
  assert.equal(check('(x+3)/4',p).earned,0);
  for(const input of ['2*3x','x*x*x','(2x)/4'])assert.equal(check(input,part(input==='2*3x'?'6x':input==='x*x*x'?'x^3':'x/2','rearranged')).earned,1,input);
  assert.equal(check('y+y',part('2y','rearranged',['y'])).earned,1);
});
test('comparison is exact and rejects syntax, domain changes and excessive input', () => {
  for (const input of ['2x+3.00000000001','2y+3','2X+3','2x+3=0','alert(1)','x;2x+3','x\n+3','x[0]','x.__proto__','x!','sqrt(x)','2 3+x','1/0','(2x^2+3x)/x','x^99999999','x^-1','('.repeat(50)+'x'+')'.repeat(50)]) assert.equal(check(input,part('2x+3')).earned,0,input);
  assert.equal(check('0.10000000000000001x',part('0.1x')).earned,0);
  assert.equal(check('0.1x+0.2x',part('0.3x','equivalent')).earned,2);
  assert.equal(check('x+x*(x-1)*(x-2)*(x-3)',part('x','equivalent')).earned,0);
});
test('packed delivery preserves partial scoring and dependencies', () => {
  const p=part('2x+3');
  const packed=packBank([{variations:[{parts:[p]}]}])[0].variations[0];
  assert.equal(markQuestion(packed,{'0':'(4x+6)/2'})[0].earned,1);
  const q={parts:[{id:'0',kind:'number',answer:'1',marks:1},{...p,id:'1',dependsOn:'0'}]};
  assert.equal(markQuestion(q,{'0':'0','1':'(4x+6)/2'})[1].earned,0);
});
