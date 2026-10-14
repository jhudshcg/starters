<script>
  import { focuses, focusNames } from '#domain/bank.js';
  import { mathsPracticeURL, discoverableFocuses } from '#domain/activity-discovery.js';
  import { puzzleTypeArt } from '../../../../packages/puzzles/graphics.js';
  let { selected = null, onchange } = $props();
</script>

<nav class="puzzle-cards" aria-label="Puzzle types">
  {#each discoverableFocuses(focuses(0), 0) as focus}
    <button
      class="action-button"
      type="button"
      data-puzzle-focus={focus}
      aria-pressed={focus === selected}
      onclick={() => onchange(focus)}
      ><span class="puzzle-card-art" aria-hidden="true"
        >{@html puzzleTypeArt[focus]?.[0] ?? '?'}</span
      ><strong>{focusNames[focus]}</strong><small>{puzzleTypeArt[focus]?.[1] ?? ''}</small></button
    >
  {/each}
  <a class="maths-practice-link" href={mathsPracticeURL} target="_blank" rel="noopener"
    ><strong>Maths practice ↗</strong><small>Open the GCSE Maths site</small></a
  >
</nav>
