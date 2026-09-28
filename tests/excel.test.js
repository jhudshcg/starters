import test from 'node:test';
import assert from 'node:assert/strict';
import {markExcel} from '../js/excel-answer.js';
const part={answer:'=B5*$B$2',marks:2,excel:{cells:{B2:30,B5:6,B6:8,B7:5},copies:[{row:1,col:0},{row:2,col:0}]}};
test('Excel formulas compare symbolically and check filled destinations',()=>{
 for(const s of ['= B5 * B$2','=($B$2)*B5','=SUM(B5)*B$2'])assert.equal(markExcel(s,part).correct,true,s);
 for(const s of ['=B5*B2','=180','=B5*30','=B5+B$2','=B$5*B$2'])assert.equal(markExcel(s,part).correct,false,s);
 assert.equal(markExcel('=PRODUCT(B5,B$2)',part).needsReview,true);
 for(const s of ['=globalThis.alert(1)','=B5.constructor','=B5;alert(1)','B5*B2','=SUM('])assert.equal(markExcel(s,part).correct,false);
});
test('SUM expands ranges and authored subtotals without accepting omitted/doubled terms',()=>{
 const p={answer:'=SUM(D3:D5,D7)',marks:2,excel:{cells:{D3:600,D4:540,D5:400,D6:1540,D7:100},formulas:{D6:'=SUM(D3:D5)'}}};
 for(const s of ['=D3+D4+D5+D7','=D6+D7','=SUM(D7;D6)'])assert.equal(markExcel(s,p).correct,true,s);
 for(const s of ['=SUM(D3:D7)','=SUM(D4:D5,D7)','=1640'])assert.equal(markExcel(s,p).correct,false,s);
});
test('SUMIF preserves data/criterion dependencies and mixed-lock copy behaviour',()=>{
 const p={answer:'=SUMIF($A$3:$A$6,F3,$B$3:$B$6)',marks:2,excel:{cells:{A3:'Jo',A4:'Lee',A5:'Jo',A6:'Lee',B3:6,B4:4,B5:5,B6:3,F3:'Jo',F4:'Lee'},copies:[{row:1,col:0}]}};
 assert.equal(markExcel('=sumif(A$3:A$6,F3,B$3:B$6)',p).correct,true);
 for(const s of ['=SUMIF(A3:A6,F3,B3:B6)','=SUMIF(A$3:A$6,$F$3,B$3:B$6)','=B3+B5'])assert.equal(markExcel(s,p).correct,false,s);
 assert.equal(markExcel('=SUMIF(A3:A6,F3,B3:B5)',p).needsReview,true);
});
