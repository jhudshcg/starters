<!-- Home content and compact activity cards. Edit card text/art here. -->
<script>
  import { types } from '#domain/bank.js';
  import CodeEntry from '../ui/CodeEntry.svelte';
  let { app, view, href } = $props();
  const completed = $derived(view.data.history.length);
</script>

<section class="hero">
  <div>
    <div class="eyebrow">A little practice goes a long way</div>
    <h1>Start small.<br /><em>Think bigger.</em></h1>
    <p>
      Get your brain into gear with a quick puzzle, a little Core revision, a Python challenge or
      ESP practice.
    </p>
    <div class="meta-row">
      <span>5–15 minutes</span><span>Instant feedback</span><span>Your own pace</span>
    </div>
  </div>
  <aside class="code-entry">
    <div class="eyebrow">Have a code or a topic in mind?</div>
    <h2>Jump straight in.</h2>
    <p>Open a question set or find practice by key term.</p>
    <CodeEntry {app} error={view.error} {href} /><small
      >9 characters · capitals matter · optional timer character<br />or enter key term to search
      for</small
    >
  </aside>
</section>
<div class="section-heading">
  <h2>What will you try today?</h2>
  <span>Pick an activity to get started</span>
</div>
<section class="activity-grid" aria-label="Activity types">
  {#each [1, 2, 0] as type, order}
    <article class={`surface-card type-card type-${type}`}>
      <div class="eyebrow">0{order + 1} / {types[type].label}</div>
      <div class="card-art" aria-hidden="true">
        {#if type === 0}<div class="mini-grid">
            {#each [2, 5, 7, 3, '?', 9, 5, 11, 16] as value}<span>{value}</span>{/each}
          </div>
        {:else if type === 1}<div class="art-lines">
            <span>○ identify</span><span>● understand</span><span>○ explain</span>
          </div>
        {:else}<div class="art-code">
            for idea in ideas:<br />&nbsp; give_it_a_go()<br />if persistent == True:<br />&nbsp;
            print("I ♥ coding!")
          </div>{/if}
      </div>
      <h3>{types[type].name}</h3>
      <div class="card-bottom">
        <small
          >{type === 1
            ? 'Core papers and ESP'
            : type === 2
              ? '2 challenges · 12 marks'
              : '3 puzzles · choose your pace'}</small
        ><a
          class="action-button"
          data-start={type}
          aria-label={`Start ${types[type].name}`}
          href={href(type === 1 ? '#exam' : `#practice=${type}`)}
          >Let’s go <span aria-hidden="true">↗</span></a
        >
      </div>
    </article>
  {/each}
</section>
<section class="lower-panel">
  <div class="note-panel">
    <span class="note-icon" aria-hidden="true">↗</span>
    <div>
      <h3>
        {completed
          ? `${completed} ${completed === 1 ? 'activity' : 'activities'} completed. Keep building.`
          : 'Small steps add up.'}
      </h3>
      <p>See your results and find out what to practise next.</p>
    </div>
    <a href={href('#progress')}>My progress →</a>
  </div>
  <div class="note-panel">
    <span class="note-icon" aria-hidden="true">◷</span>
    <div>
      <h3>No rush. Unless you want one.</h3>
      <p>Practise at your pace, or add a timer for a challenge.</p>
    </div>
  </div>
</section>
{#if view.data.active && !view.data.active.finished}<p class="muted unfinished-notice">
    You have an unfinished activity. <a
      href={href(`#set=${encodeURIComponent(view.data.active.code)}`)}
      >Continue {view.data.active.code}</a
    >
  </p>{/if}
