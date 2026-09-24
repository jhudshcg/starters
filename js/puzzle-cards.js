// A local ko position: the central white stone has one liberty to its right.
const goArt=`<svg viewBox="0 0 112 64" width="84" height="48" focusable="false" aria-hidden="true">
  <rect x="0" y="0" width="112" height="64" rx="6" fill="#e7bd78"/>
  <path d="M8 8H104M8 24H104M8 40H104M8 56H104M8 8V56M24 8V56M40 8V56M56 8V56M72 8V56M88 8V56M104 8V56" fill="none" stroke="#78552c" stroke-width="1"/>
  <g fill="#202124" stroke="#111" stroke-width="1.2">
    <circle cx="40" cy="24" r="7"/><circle cx="56" cy="8" r="7"/><circle cx="56" cy="40" r="7"/>
  </g>
  <g fill="#fffdf6" stroke="#5e5548" stroke-width="1.2">
    <circle cx="56" cy="24" r="7"/><circle cx="72" cy="8" r="7"/><circle cx="72" cy="40" r="7"/><circle cx="88" cy="24" r="7"/>
  </g>
</svg>`;
const art={
  'logic grids':['✓ · ×','Match the clues'],
  'logic equations':['◆ + ● = 9','Find each value'],
  tangrams:['◢ ◤ ◣','Fit the shapes'],
  'cover paths':['●─●┐','Join every dot'],
  sudoku:['1  ·  3','Complete the grid'],
  'number constraints':['┌ 6+ ┐','Solve the cages'],
  sequences:['2 4 8 ?','Spot the pattern'],
  'classic maths':['½ × 12','Work it out'],
  go:[goArt,'Life and death']
};
export function puzzleCards(focuses,names,selected) {
  return `<nav class="puzzle-cards" aria-label="Puzzle types">${focuses.map(f=>`<button type="button" data-puzzle-focus="${f}" aria-pressed="${f===selected}"><span class="puzzle-card-art" aria-hidden="true">${art[f]?.[0]??'?'}</span><strong>${names[f]}</strong><small>${art[f]?.[1]??''}</small></button>`).join('')}</nav>`;
}
