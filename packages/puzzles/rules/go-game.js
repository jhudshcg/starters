/**
 * Purpose: Human Go games with passes, undo, positional superko and area counting.
 * Used by: the demo board and package tests. Uses: existing legal-move rules.
 * No automatic life/death judgement: players agree which groups to remove.
 */
import {advanceGoClock, pauseGoClock, startGoClock, finishGoTurn} from './go-clock.js';
import {applyGoMove} from './go-rules.js';

export const goBoardSizes = [5, 9, 13, 19];
export function newGoGame(size = 9) {
  if (!goBoardSizes.includes(size)) throw new RangeError('Unsupported Go board size');
  return {size, positions: [{board: '.'.repeat(size ** 2), turn: 'b', passes: 0, move: null}], dead: [], future: [], counting: false, clock: null, resumeClock: false};
}
export const currentGoPosition = game => game.positions.at(-1);

/** Validate without mutating, so pointer previews and committed moves share legality. */
export function playHumanGo(game, move, now = 0) {
  const current = currentGoPosition(game);
  if (game.counting || current.passes >= 2) return {error: 'Resume play before placing another stone.'};
  const next = move === null ? {board: current.board} : applyGoMove(current.board, game.size, current.turn, move);
  if (next.error) return next;
  if (move !== null && game.positions.some(position => position.board === next.board))
    return {error: 'That repeats an earlier board position (ko). Play elsewhere or pass.'};
  const clock = advanceGoClock(game.clock, now);
  if (clock?.expired) return {game: {...game, clock}, error: `${clock.expired === 'b' ? 'Black' : 'White'} ran out of time. Reset clocks or continue without timing.`};
  // Store the settled clock before the move, so Undo does not refund thinking time.
  const positions = [...game.positions.slice(0, -1), {...current, clock: pauseGoClock(clock, now)}];
  const nextClock = finishGoTurn(clock, now);
  positions.push({board: next.board, turn: current.turn === 'b' ? 'w' : 'b',
    passes: move === null ? current.passes + 1 : 0, move, clock: pauseGoClock(nextClock, now)});
  let result = {...game, dead: [], future: [], positions, clock: nextClock};
  if (positions.at(-1).passes >= 2) result = countHumanGo(result, now);
  return {game: result};
}
/** Undo/redo restore the position and its clock, paused for review. New play discards redo. */
export function undoHumanGo(game) {
  if (game.positions.length === 1) return game;
  const positions = game.positions.slice(0, -1);
  return {...game, positions, future: [game.positions.at(-1), ...(game.future ?? [])], dead: [],
    counting: false, resumeClock: false, clock: positions.at(-1).clock ?? null};
}
export function redoHumanGo(game) {
  if (!game.future?.length) return game;
  const [position, ...future] = game.future;
  return {...game, positions: [...game.positions, position], future, dead: [],
    counting: position.passes >= 2, resumeClock: false, clock: position.clock ?? null};
}
/** Counting is a paused view of this position, available before or after two passes. */
export function countHumanGo(game, now = 0) {
  return {...game, counting: true, resumeClock: Boolean(game.clock?.running), clock: pauseGoClock(game.clock, now)};
}
export function resumeHumanGo(game, now = 0) {
  const positions = currentGoPosition(game).passes >= 2 ? game.positions.slice(0, -2) : game.positions;
  return {...game, positions, dead: [], counting: false, future: currentGoPosition(game).passes >= 2 ? [] : game.future, resumeClock: false,
    clock: game.resumeClock && game.clock ? startGoClock(game.clock, now) : game.clock};
}

/** Changing timing policy clears historical clock snapshots, never the board or move history. */
export function setHumanGoClock(game, clock) {
  return {...game, clock, resumeClock: false,
    positions: game.positions.map(position => ({...position, clock: null})),
    future: (game.future ?? []).map(position => ({...position, clock: null}))};
}
const neighbours = (index, size) => [index - size, index + size, index - 1, index + 1]
  .filter(next => next >= 0 && next < size ** 2 && Math.abs(index % size - next % size) + Math.abs(Math.floor(index / size) - Math.floor(next / size)) === 1);

/** Flood one connected region of equal stones or empty intersections. */
function region(board, size, start) {
  const found = new Set([start]), todo = [start];
  while (todo.length) for (const next of neighbours(todo.pop(), size)) {
    if (board[next] === board[start] && !found.has(next)) {found.add(next); todo.push(next);}
  }
  return [...found];
}
export function toggleDeadGroup(game, move) {
  const {board, passes} = currentGoPosition(game);
  if ((!game.counting && passes < 2) || !Number.isInteger(move) || !board[move] || board[move] === '.') return game;
  const group = region(board, game.size, move), dead = new Set(game.dead);
  const remove = dead.has(move);
  for (const point of group) remove ? dead.delete(point) : dead.add(point);
  return {...game, dead: [...dead]};
}

/** Area = living stones + exclusively surrounded empty points; mixed borders are neutral. */
export function scoreGoArea(game, komi = 6.5) {
  if (!Number.isFinite(komi)) throw new RangeError('Komi must be a number');
  const board = [...currentGoPosition(game).board];
  for (const index of game.dead) board[index] = '.';
  const score = {black: 0, white: komi, neutral: 0, komi}, seen = new Set();
  for (let index = 0; index < board.length; index++) {
    if (board[index] !== '.') {score[board[index] === 'B' ? 'black' : 'white']++; continue;}
    if (seen.has(index)) continue;
    const empty = region(board, game.size, index), borders = new Set();
    for (const point of empty) {
      seen.add(point);
      for (const next of neighbours(point, game.size)) if (board[next] !== '.') borders.add(board[next]);
    }
    const owner = borders.size === 1 ? (borders.has('B') ? 'black' : 'white') : 'neutral';
    score[owner] += empty.length;
  }
  return score;
}
