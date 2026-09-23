const art={
  'logic grids':['✓ · ×','Match the clues'],
  'logic equations':['◆ + ● = 9','Find each value'],
  tangrams:['◢ ◤ ◣','Fit the shapes'],
  'cover paths':['●─●┐','Join every dot'],
  sudoku:['1  ·  3','Complete the grid'],
  'number constraints':['┌ 6+ ┐','Solve the cages'],
  sequences:['2 4 8 ?','Spot the pattern'],
  'classic maths':['½ × 12','Work it out'],
  go:['● ○ ●','Life and death']
};
export function puzzleCards(focuses,names,selected) {
  return `<nav class="puzzle-cards" aria-label="Puzzle types">${focuses.map(f=>`<button type="button" data-puzzle-focus="${f}" aria-pressed="${f===selected}"><span class="puzzle-card-art" aria-hidden="true">${art[f]?.[0]??'?'}</span><strong>${names[f]}</strong><small>${art[f]?.[1]??''}</small></button>`).join('')}</nav>`;
}
