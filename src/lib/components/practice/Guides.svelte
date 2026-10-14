<!-- General introductions never mark an answer as assisted. -->
<script>
  import { pythonGuides, guidesForQuestions } from '#domain/python-guides.js';
  import { algorithmGuideHTML } from '#domain/algorithm-guide.js';
  let { questions, opened = {}, onchange } = $props();
  const algorithmContent = algorithmGuideHTML()
    .replace(/^<details[^>]*>\s*<summary>[^<]*<\/summary>/, '')
    .replace(/<\/details>\s*$/, '');
</script>

{#each guidesForQuestions(questions) as key}
  <details
    class="algorithm-guide"
    id={key === 'algorithms' ? 'algorithm-guide' : undefined}
    data-python-guide={key}
    open={Boolean(opened[key])}
    ontoggle={(e) => {
      if (Boolean(opened[key]) !== e.currentTarget.open) onchange(key, e.currentTarget.open);
    }}
  >
    <summary>{key === 'algorithms' ? 'Search and sort guide' : pythonGuides[key].title}</summary>
    {#if key === 'algorithms'}{@html algorithmContent}{:else}
      <p class="muted">
        Read this introduction whenever you need it. Your challenge answers still count towards
        progress.
      </p>
      <p>{pythonGuides[key].intro}</p>
      {#each pythonGuides[key].examples as example}<p>{example.text}</p>
        <pre><code>{example.code}</code></pre>
        <p class="guide-output-label">Output:</p>
        <pre class="guide-output"><samp>{example.output}</samp></pre>{/each}
    {/if}
  </details>
{/each}
