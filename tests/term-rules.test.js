import test from 'node:test';
import assert from 'node:assert/strict';
import {markQuestion} from '../js/marking.js';
import {packBank} from '../scripts/pack-bank.mjs';
import {snapshotBanks} from '../scripts/question-identities.mjs';
import exam from '../data/exam.js';
import {validateBank} from '../js/bank.js';

const part={id:'0',kind:'text',marks:1,answer:'top-down',allowSentence:true,
  accepted:['hierarchical design'],
  termRules:[{terms:['top-down','top down'],qualifiers:['design','approach','method']}]};
const mark=(p,value)=>markQuestion({parts:[p]},{[p.id]:value})[0].earned;

test('a complete term takes zero or one linked qualifier, with existing sentence normalisation',()=>{
  for(const value of ['top-down','TOP DOWN','top down design','top-down approach','top-down method',
    '  It is a TOP-DOWN   design.  ','hierarchical design'])assert.equal(mark(part,value),1,value);
  for(const value of ['','design','top','topdown','top-dwon','top-down testing','top-down system',
    'top-down design method','top-down and bottom-up','top-down top down','not top-down',
    'top-down is wrong','top-down design but bottom-up approach','design top-down'])assert.equal(mark(part,value),0,value);
});

test('qualifiers belong only to their own term group; full phrases are single authored terms',()=>{
  const p={...part,answer:'float',accepted:[],termRules:[
    {terms:['float','real','floating point','floating-point'],qualifiers:['number','data type']},
    {terms:['floating-point representation']}
  ]};
  for(const value of ['real','real number','floating point data type','floating-point representation'])assert.equal(mark(p,value),1,value);
  for(const value of ['real array','floating-point representation number','float number data type','float real',
    'unreal','floating-point representation method'])assert.equal(mark(p,value),0,value);
});

test('rules never broaden code, identifiers, case-sensitive text or selected answers',()=>{
  for(const extra of [{kind:'code'},{kind:'identifier'},{caseSensitive:true},{options:['float','integer']},{kind:'choice'}]) {
    const p={...part,answer:'float',accepted:[],termRules:[{terms:['real']}],...extra};
    assert.equal(mark(p,'float'),1);
    assert.equal(mark(p,'real'),0);
  }
});

test('packing seals term rules and preserves scoring and linked dependencies',()=>{
  const question={slot:0,variations:[{parts:[part,{id:'1',kind:'text',marks:1,answer:'reason',dependsOn:0}]}]};
  const packed=packBank([question])[0].variations[0];
  assert.equal(packed.parts[0].termRules,undefined);
  assert.equal(packed.parts[0].revealData.includes('top-down'),false);
  assert.deepEqual(markQuestion(packed,{'0':'top down method','1':'reason'}).map(r=>r.earned),[1,1]);
  assert.deepEqual(markQuestion(packed,{'0':'top down testing','1':'reason'}).map(r=>r.earned),[0,0]);
});

test('changing a synonym or its qualifiers changes the question fingerprint',()=>{
  const bank=[{slot:0,variations:[{parts:[part]}]}];
  const before=snapshotBanks([bank])['0:0:0'].fingerprint;
  for(const field of ['terms','qualifiers']) {
    const changed=structuredClone(bank);
    changed[0].variations[0].parts[0].termRules[0][field].push('extra');
    assert.notEqual(snapshotBanks([changed])['0:0:0'].fingerprint,before);
  }
});

test('reviewed equivalents pass consistently, but distinct technical concepts remain distinct',()=>{
  const cases=[
    [9,'0',['top-down method','top down design'],['bottom-up design','top-down testing']],
    [9,'2',['modular design','modular approach'],['monolithic design']],
    [10,'3',['close the ticket','closing the issue'],['reopen the ticket']],
    [10,'4',['logging','record the findings'],['delete the findings']],
    [11,'1',['collect information','gather evidence'],['analyse information']],
    [12,'1',['real','real number','floating-point data type'],['integer','decimal','real array']],
    [17,'2',['float','float()'],['real','floating point','float type']],
    [7,'2',['off by one error'],['off by two error']],
    [47,'3',['black-box testing','closed-box test'],['white-box testing','black-box integration testing']],
    [47,'4',['white-box testing','open-box test'],['black-box testing']],
    [48,'0',['boundary value analysis'],['range check']],
    [153,'0',['sequential search','linear search algorithm'],['binary search']],
    [45,'1',['elapsed time','running time'],['time complexity']],
    [155,'3',['memory usage','storage requirement'],['execution time']],
  ];
  for(const [slot,id,good,bad] of cases)for(const v of exam.find(q=>q.slot===slot).variations) {
    const p=v.parts.find(p=>p.id===id);
    for(const value of good)assert.equal(mark(p,value),1,`${slot}/${id}: ${value}`);
    for(const value of bad)assert.equal(mark(p,value),0,`${slot}/${id}: ${value}`);
  }
});

test('every authored term combination works in both source and packed banks, with no extra claims',()=>{
  const packed=packBank(exam);
  for(const [qi,q] of exam.entries())for(const [vi,v] of q.variations.entries())for(const [pi,p] of v.parts.entries()) {
    if(!p.termRules)continue;
    for(const rule of p.termRules)for(const term of rule.terms)for(const suffix of ['',...(rule.qualifiers??[])]) {
      const value=suffix?`${term} ${suffix}`:term;
      for(const candidate of [p,packed[qi].variations[vi].parts[pi]]) {
        assert.equal(mark(candidate,value),p.marks,`${q.slot}/${vi}/${p.id}: ${value}`);
        for(const wrong of [`not ${value}`,`${value} but not ${p.answer}`,`${value} unrelated`,`${value} ${value}`]) {
          assert.equal(mark(candidate,wrong),0,`${q.slot}/${vi}/${p.id}: ${wrong}`);
        }
      }
    }
  }
});

test('bank validation rejects malformed or inapplicable term rules',()=>{
  const p=exam[0].variations[0].parts[0],original=p.termRules;
  try {
    for(const invalid of [null,[],[null],[{terms:[]}],[{terms:['']}],[{terms:['x'],qualifiers:['']}],[{terms:[' x']}]] ) {
      p.termRules=invalid;
      assert.ok(validateBank().some(e=>e.includes('invalid conceptual term rules')));
    }
  } finally {p.termRules=original;}
  assert.ok(!validateBank().some(e=>e.includes('invalid conceptual term rules')));
});
