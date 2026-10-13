/**
 * Purpose: Pure two-player main-time/Japanese byo-yomi clocks using caller-supplied timestamps.
 * Main contents: Start, elapsed-time accounting, move handover and pause.
 * Used by: Human Go game rules and tests. Uses: none. Libs: none.
 */
export function newGoClock({mainMs, periodMs, periods}, active = 'b') {
  if (!Number.isFinite(mainMs) || mainMs < 0 || !Number.isInteger(periods) || periods < 0 ||
      !Number.isFinite(periodMs) || periodMs <= 0 || (!mainMs && !periods))
    throw new RangeError('Choose main time or at least one byo-yomi period.');
  const player = () => ({mainMs, periodMs, periods});
  return {settings: {mainMs, periodMs, periods}, players: {b: player(), w: player()},
    active, running: false, lastAt: null, expired: null};
}
export function startGoClock(clock, now) {
  return clock.expired ? clock : {...clock, running: true, lastAt: now};
}
/** Charge every elapsed millisecond, including background time and multiple lost periods. */
export function advanceGoClock(clock, now) {
  if (!clock?.running) return clock;
  let elapsed = Math.max(0, now - clock.lastAt);
  const player = {...clock.players[clock.active]};
  const mainSpent = Math.min(player.mainMs, elapsed);
  player.mainMs -= mainSpent; elapsed -= mainSpent;
  while (!player.mainMs && player.periods && elapsed >= player.periodMs) {
    elapsed -= player.periodMs; player.periods--;
    player.periodMs = player.periods ? clock.settings.periodMs : 0;
  }
  if (!player.mainMs && player.periods) player.periodMs -= elapsed;
  const expired = !player.mainMs && !player.periods ? clock.active : null;
  return {...clock, players: {...clock.players, [clock.active]: player}, expired,
    running: !expired, lastAt: Math.max(clock.lastAt, now)};
}
export function pauseGoClock(clock, now) {
  if (!clock) return null;
  return {...advanceGoClock(clock, now), running: false, lastAt: null};
}
/** A legal stone or pass resets only the current surviving overtime period, then switches side. */
export function finishGoTurn(clock, now) {
  if (!clock) return null;
  const next = advanceGoClock(clock, now);
  if (next.expired) return next;
  const player = {...next.players[next.active]};
  if (!player.mainMs && player.periods) player.periodMs = next.settings.periodMs;
  return {...next, players: {...next.players, [next.active]: player}, active: next.active === 'b' ? 'w' : 'b'};
}
