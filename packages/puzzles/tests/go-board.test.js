/** Coordinate axes and hit geometry for human games and recorded puzzles. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {renderGoBoard} from '../ui/go-board.js';
test('coordinates skip I, run upwards, and do not alter recorded-puzzle geometry by default', () => {
 const board='.'.repeat(361),plain=renderGoBoard({size:19,board}),labelled=renderGoBoard({size:19,board,coordinates:true});
 assert.match(plain,/viewBox="0 0 19.2 19.2"/);
 assert.equal((labelled.match(/class="go-axis-label"/g)||[]).length,76);
 assert.match(labelled,/>T<\/text>/); assert.doesNotMatch(labelled,/>I<\/text>/);
 assert.match(labelled,/aria-label="A19, empty/); assert.match(labelled,/aria-label="T1, empty/);
});

test('expanding the human grid keeps all four coordinate axes in their established positions', () => {
 const html=renderGoBoard({size:9,board:'.'.repeat(81),coordinates:true});
 const [,left,top,width,height]=html.match(/viewBox="([^ ]+) ([^ ]+) ([^ ]+) ([^"]+)"/).map(Number);
 const labels=[...html.matchAll(/class="go-axis-label" x="([^"]+)" y="([^"]+)"[^>]*>([^<]+)<\/text>/g)];
 const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-10);
 const columns=labels.filter(label=>label[3]==='A'),rows=labels.filter(label=>label[3]==='9');
 near((Number(columns[0][2])-top)/height,.275/9.9);
 near((Number(columns[1][2])-top)/height,1-.275/9.9);
 near((Number(rows[0][1])-left)/width,.283/9.9);
 near((Number(rows[1][1])-left)/width,1-.283/9.9);
 near(width,9.9); near(height,9.9);
 assert.match(html,/font-size="0.28"/,'label font size stays fixed');
 const [scaleX,,,,offsetX]=html.match(/data-go-grid transform="matrix\(([^ ]+) ([^ ]+) ([^ ]+) ([^ ]+) ([^ ]+) ([^)]+)\)"/).slice(1).map(Number);
 near(scaleX*.6+offsetX,.3);
});


test('coordinate centres align with every enlarged grid line on every human board size', () => {
 for(const size of [5,9,13,19]) {
  const html=renderGoBoard({size,board:'.'.repeat(size*size),coordinates:true});
  const [sx,, ,sy,tx,ty]=html.match(/data-go-grid transform="matrix\(([^)]+)\)"/)[1].split(' ').map(Number);
  const lines=[...html.matchAll(/<line x1="([^"]+)" y1="([^"]+)" x2="([^"]+)" y2="([^"]+)"/g)];
  const labels=[...html.matchAll(/class="go-axis-label" x="([^"]+)" y="([^"]+)"/g)];
  for(let i=0;i<size;i++) {
   const x=Number(lines[i][1])*sx+tx,y=Number(lines[size+i][2])*sy+ty;
   for(const side of [0,1]) {
    assert.ok(Math.abs(Number(labels[2*i+side][1])-x)<1e-10,`${size}: column ${i}, side ${side}`);
    assert.ok(Math.abs(Number(labels[2*(size+i)+side][2])-y)<1e-10,`${size}: row ${i}, side ${side}`);
   }
  }
 }
});
