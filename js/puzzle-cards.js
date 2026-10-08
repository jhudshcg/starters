/**
 * Purpose: render this app's type selector with optional shared puzzle artwork.
 * Main contents: type-card markup. Used by: app. Uses: shared graphics. Libs: none.
 */
import {puzzleTypeArt as art} from '../packages/puzzles/graphics.js';
export function puzzleCards(focuses,names,selected) {
  return `<nav class="puzzle-cards" aria-label="Puzzle types">${focuses.map(f=>`<button type="button" data-puzzle-focus="${f}" aria-pressed="${f===selected}"><span class="puzzle-card-art" aria-hidden="true">${art[f]?.[0]??'?'}</span><strong>${names[f]}</strong><small>${art[f]?.[1]??''}</small></button>`).join('')}</nav>`;
}
