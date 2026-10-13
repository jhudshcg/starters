/* GNU Go worker interface, GPL-3.0-or-later. Copyright (c) 2026 Joe Hudson.
 * Loaded only when the user requests estimation. See COPYING and build.sh.
 */
import createGnuGo from './gnugo.js';
const engine = createGnuGo();
self.onmessage = async ({ data: { id, position } }) => {
  try {
    const { size, board, turn, komi } = position;
    if (![5, 9, 13, 19].includes(size) || typeof board !== 'string' ||
        board.length !== size * size || /[^BW.]/.test(board) ||
        !['b', 'w'].includes(turn) || !Number.isFinite(komi))
      throw Error('Invalid board position');
    const module = await engine;
    const result = JSON.parse(module.ccall('estimate_position', 'string',
      ['number', 'string', 'number', 'number'], [size, board, turn === 'b' ? 1 : 2, komi]));
    if (result.error) throw Error(result.error);
    self.postMessage({ id, result });
  } catch (error) {
    self.postMessage({ id, error: error.message || 'GNU Go could not estimate this position.' });
  }
};
