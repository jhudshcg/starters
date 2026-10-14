<!-- Only the shared board renderer owns this element; host controls are Svelte components. -->
<script>
  import { tick } from 'svelte';
  import { renderGoBoard } from '../../../../packages/puzzles/ui/go-board.js';
  import { bindGoPress } from '../../../../packages/puzzles/ui/go-press.js';
  import { currentGoPosition, playHumanGo } from '../../../../packages/puzzles/rules/go-game.js';
  let { size, position, dead, ownership, counting, getGame, onmove } = $props();
  let board;
  $effect(() => {
    const events = new AbortController();
    board.innerHTML = renderGoBoard({
      size,
      board: position.board,
      last: position.move,
      dead,
      zoom: true,
      coordinates: true,
      ownership,
    });
    bindGoPress(
      board,
      { size, view: [0, 0, size - 1, size - 1] },
      {
        getState: getGame,
        isLocked: () => false,
        signal: events.signal,
        validate: (game, move) =>
          counting ? { error: 'Counting' } : playHumanGo(game, move, Date.now()),
        getColour: (game) => currentGoPosition(game).turn,
      },
    );
    board.addEventListener(
      'click',
      async (event) => {
        const button = event.target.closest('[data-challenge-action="go"]');
        if (!button) return;
        const move = Number(button.dataset.value);
        if (counting || position.board[move] === '.') onmove(move);
        await tick();
        board.querySelector(`[data-value="${move}"]`)?.focus({ preventScroll: true });
      },
      { signal: events.signal },
    );
    return () => events.abort();
  });
</script>

<div id="go-practice-board" class="puzzle-controls human-go-controls" bind:this={board}></div>
