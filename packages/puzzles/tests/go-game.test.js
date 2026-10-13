/** Human-game regression cases: captures, ko, pass lifecycle and agreed-dead area counts. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {newGoGame, currentGoPosition, playHumanGo, undoHumanGo, redoHumanGo, countHumanGo, resumeHumanGo, toggleDeadGroup, scoreGoArea} from '../rules/go-game.js';
const position = (board, turn='b', passes=0) => ({size: Math.sqrt(board.length), positions: [{board, turn, passes, move: null}], dead: []});
const play = (game, move) => {const next=playHumanGo(game,move); assert.equal(next.error,undefined); return next.game;};

test('two players alternate; illegal moves do not change history; pass/undo/resume are reversible', () => {
  const start = newGoGame(9), first = play(start, 40);
  assert.equal(currentGoPosition(first).board[40], 'B');
  assert.equal(currentGoPosition(first).turn, 'w');
  assert.ok(playHumanGo(first, 40).error);
  assert.equal(currentGoPosition(undoHumanGo(first)).board, currentGoPosition(start).board);
  assert.equal(currentGoPosition(redoHumanGo(undoHumanGo(first))).board, currentGoPosition(first).board);
  const passed = play(first, null), counting = play(passed, null);
  assert.equal(currentGoPosition(counting).passes, 2);
  assert.ok(playHumanGo(counting, 0).error);
  assert.equal(currentGoPosition(undoHumanGo(counting)).board, currentGoPosition(passed).board);
  assert.equal(currentGoPosition(resumeHumanGo(counting)).board, currentGoPosition(first).board);
  assert.equal(currentGoPosition(play(passed, 0)).passes, 0);
  assert.deepEqual(undoHumanGo(start), start);
});
test('captures, suicide and positional superko share puzzle legality without the puzzle move limit', () => {
  const cells=Array(25).fill('.');
  for(const i of [7,11,17])cells[i]='B';
  for(const i of [12,8,14,18])cells[i]='W';
  const initial=position(cells.join('')), captured=play(initial,13);
  assert.equal(currentGoPosition(captured).board[12],'.');
  assert.match(playHumanGo(captured,12).error,/ko/);
  assert.ok(playHumanGo(position('.W.W.W.W.'),4).error);
  // Older repeated positions are forbidden too, independent of whose turn was recorded.
  const earlier=play(newGoGame(5),0);
  const history={...newGoGame(5),positions:[currentGoPosition(earlier),currentGoPosition(newGoGame(5))]};
  assert.match(playHumanGo(history,0).error,/ko/);
  assert.equal(playHumanGo({...newGoGame(5),positions:Array(101).fill(currentGoPosition(newGoGame(5)))},0).error,undefined);
});
test('area counts neutral space, territory, komi and whole dead groups without double-counting captures', () => {
  assert.deepEqual(scoreGoArea(newGoGame(5)),{black:0,white:6.5,neutral:25,komi:6.5});
  assert.deepEqual(scoreGoArea(position('BBBB.BBBB'),0),{black:9,white:0,neutral:0,komi:0});
  assert.deepEqual(scoreGoArea(position('B.W......'),0),{black:1,white:1,neutral:7,komi:0});
  const alive=position('BBBBWWBBB','b',2), dead=toggleDeadGroup(alive,4);
  assert.deepEqual(dead.dead.sort(),[4,5]);
  assert.deepEqual(scoreGoArea(dead,0),{black:9,white:0,neutral:0,komi:0});
  assert.deepEqual(toggleDeadGroup(dead,5),alive);
  assert.deepEqual(toggleDeadGroup(newGoGame(5),0),newGoGame(5));
  assert.deepEqual(resumeHumanGo(play(play(newGoGame(5),null),null)).dead,[]);
});

test('count at any point preserves moves, and a new branch discards redo', () => {
 const game = play(play(newGoGame(5), 0), 1);
 const counting = countHumanGo(game);
 assert.equal(counting.counting, true);
 assert.equal(counting.positions, game.positions);
 assert.deepEqual(resumeHumanGo(counting).positions, game.positions);
 const undone = undoHumanGo(game);
 assert.equal(undone.future.length, 1);
 assert.equal(play(undone, 2).future.length, 0);
 assert.equal(currentGoPosition(redoHumanGo(undone)).board, currentGoPosition(game).board);
});
