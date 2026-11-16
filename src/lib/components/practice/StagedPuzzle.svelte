<!-- Ordered worksheet sections share the normal attempt and portable answer controls. -->
<script>
  import PuzzleParts from './PuzzleParts.svelte';
  let { q, set, attempt, results, app, href } = $props();
</script>

{#snippet content(stage)}
  {#each stage.paragraphs ?? [] as paragraph}<p>{paragraph}</p>{/each}
  {#if stage.table}
    <!-- svelte-ignore a11y_no_noninteractive_tabindex (The evidence table remains keyboard-scrollable at high zoom.) -->
    <div class="stage-table" tabindex="0" role="region" aria-label={stage.table.caption}>
      <table>
        <caption>{stage.table.caption}</caption>
        <thead
          ><tr
            >{#each stage.table.columns as column}<th scope="col">{column}</th>{/each}</tr
          ></thead
        >
        <tbody>
          {#each stage.table.rows as row}<tr
              >{#each row as value, i}{#if i === 0}<th scope="row">{value}</th>{:else}<td
                    >{value}</td
                  >{/if}{/each}</tr
            >{/each}
        </tbody>
      </table>
    </div>
  {/if}
  {#each stage.cards ?? [] as card, i}
    <aside class="stage-evidence">
      <h4>Evidence {i + 1} · {card.title}</h4>
      <p>{card.text}</p>
    </aside>
  {/each}
  <PuzzleParts {q} {set} {attempt} {results} {app} {href} partIds={stage.parts} />
{/snippet}

<div class="staged-puzzle">
  {#if !attempt.finished}<p class="muted">
      Work through the stages in order. You can change any answer before submitting at the end.
    </p>{/if}
  {#each q.stages as stage, index}
    <section aria-labelledby={`stage-${q.slot}-${index}`}>
      <p class="eyebrow">Stage {index + 1} of {q.stages.length}</p>
      <h3 id={`stage-${q.slot}-${index}`}>{stage.title}</h3>
      {@render content(stage)}
    </section>
  {/each}
</div>

<style>
  .staged-puzzle {
    min-width: 0;
    width: 100%;
  }
  section + section {
    border-block-start: 1px solid var(--line);
    margin-block-start: 1.5rem;
    padding-block-start: 1.5rem;
  }
  .stage-table {
    overflow-x: auto;
    margin-block: 1rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;
  }
  caption {
    text-align: start;
    font-weight: 600;
    padding-block-end: 0.5rem;
  }
  th,
  td {
    text-align: start;
    padding: 0.5rem;
    border-block-end: 1px solid var(--line);
  }
  th {
    font-weight: 600;
  }
  .stage-evidence {
    padding: 1rem;
    background: var(--surface-soft);
    border: 1px solid var(--line);
    border-radius: 0.5rem;
    margin-block: 0.75rem;
  }
  .stage-evidence h4,
  .stage-evidence p {
    margin: 0;
  }
  .stage-evidence p {
    margin-block-start: 0.5rem;
  }
</style>
