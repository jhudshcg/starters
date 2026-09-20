import test from 'node:test';
import assert from 'node:assert/strict';
import {makeReport,emailURL,REPORT_EMAIL} from '../js/issue-report.js';
const context={questions:[{number:1,title:'A & B',code:'EX-3-1-0'},{number:2,title:'Other',code:'EX-3-2-1'}],setCode:'BoAkAiAg',page:'https://example.test/#set=BoAkAiAg',build:'build-123',browser:'Test browser',time:'2026-09-21',error:{enteredCode:'bad',error:'Unrecognised'}};
test('content reports include only selected exact questions and omit unrelated code errors',()=>{
 const report=makeReport(context,'content','  Marking issue\nExpected 5  ',['EX-3-2-1']);
 assert.match(report.body,/2\. Other \(EX-3-2-1\)/);
 assert.ok(!report.body.includes('A & B'));assert.ok(!report.body.includes('Unrecognised'));
 assert.match(report.body,/Marking issue\nExpected 5\n/);
 assert.match(makeReport(context,'content','Both',context.questions.map(q=>q.code)).body,/1\. A & B/);
});
test('bug reports include code diagnostics but not stale content selections',()=>{
 const report=makeReport(context,'bug','Cannot open',['EX-3-1-0']);
 assert.match(report.body,/Unrecognised/);assert.ok(!report.body.includes('Selected items:'));
 assert.match(report.body,/Set: BoAkAiAg/);
});
test('email keeps recipient blank, encodes user text as body only, and uses CRLF',()=>{
 assert.equal(REPORT_EMAIL,'');
 const report=makeReport(context,'content','&bcc=other@example.test? # π\nSecond line',['EX-3-1-0']);
 const url=emailURL(report);assert.ok(url.startsWith('mailto:?subject='));
 const fields=new URL(url).searchParams;
 assert.deepEqual([...fields.keys()],['subject','body']);
 assert.equal(fields.get('subject'),report.subject);
 assert.equal(fields.get('body'),report.body.replace(/\n/g,'\r\n'));
});
