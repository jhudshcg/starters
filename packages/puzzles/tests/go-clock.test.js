/** Deterministic Japanese overtime, history and background-clock regressions. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {newGoClock, startGoClock, advanceGoClock, pauseGoClock, finishGoTurn} from '../rules/go-clock.js';
import {newGoGame, setHumanGoClock, playHumanGo, undoHumanGo, redoHumanGo, countHumanGo, resumeHumanGo} from '../rules/go-game.js';
const clock = () => startGoClock(newGoClock({mainMs:60000, periodMs:10000, periods:3}), 0);
test('main time flows into overtime, delayed updates consume multiple periods, exact expiry loses', () => {
 const start = clock();
 assert.equal(advanceGoClock(start, 60000).players.b.periodMs, 10000);
 const late = advanceGoClock(start, 85000);
 assert.deepEqual(late.players.b, {mainMs:0, periodMs:5000, periods:1});
 assert.deepEqual(late.players.w, start.players.w);
 assert.equal(advanceGoClock(late, 90000).expired, 'b');
 assert.equal(start.players.b.mainMs, 60000);
 assert.equal(advanceGoClock(start, -100).players.b.mainMs, 60000);
});
test('moves reset surviving period, pauses exclude time, sudden death and invalid settings', () => {
 const moved = finishGoTurn(clock(), 75000);
 assert.equal(moved.active, 'w');
 assert.deepEqual(moved.players.b, {mainMs:0, periodMs:10000, periods:2});
 const paused = pauseGoClock(moved, 80000);
 assert.equal(advanceGoClock(paused, 999999), paused);
 assert.equal(advanceGoClock(startGoClock(paused, 90000), 95000).players.w.mainMs, 50000);
 const sudden = startGoClock(newGoClock({mainMs:1000, periodMs:10000, periods:0}), 0);
 assert.equal(advanceGoClock(sudden, 1000).expired, 'b');
 assert.throws(() => newGoClock({mainMs:0,periodMs:1000,periods:0}));
});
test('legal moves settle clocks; undo/redo pause snapshots; counting resumes without charging the break', () => {
 const initial = setHumanGoClock(newGoGame(5), clock());
 const game = playHumanGo(initial, 0, 5000).game;
 assert.equal(game.clock.players.b.mainMs, 55000);
 assert.ok(playHumanGo(game, 0, 7000).error);
 const undo = undoHumanGo(game), redo = redoHumanGo(undo);
 assert.equal(undo.clock.running, false);
 assert.equal(undo.clock.players.b.mainMs, 55000);
 assert.equal(redo.clock.running, false);
 assert.equal(redo.clock.active, 'w');
 const resumed = resumeHumanGo(countHumanGo(game, 10000), 20000);
 assert.equal(advanceGoClock(resumed.clock, 21000).players.w.mainMs, 54000);
 assert.ok(playHumanGo(initial, 0, 90000).error);
 assert.equal(playHumanGo(initial, 0, 90000).game.positions.length, 1);
});
