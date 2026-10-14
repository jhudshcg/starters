<!-- Authored metadata search retains the existing related-question set policy. -->
<script>
  import { banks, types, focusNames, espRecipeNames } from '#domain/bank.js';
  import { discoverableQuestion } from '#domain/activity-discovery.js';
  import { searchGroups, searchPlan, cleanSearchQuery } from '#domain/search.js';
  import { makeSearchSet } from '#domain/search-sets.js';
  let { app, view, href } = $props();
  let query = $state('');
  const value = $derived(cleanSearchQuery(new URLSearchParams(view.route.slice(1)).get('q') ?? ''));
  $effect(() => {
    query = value;
  });
  const groups = $derived(
    [0, 1, 2, 3]
      .flatMap((type) =>
        searchGroups(
          banks[type].filter((q) => discoverableQuestion(q, type)),
          type,
          value,
          { focusNames, recipeNames: espRecipeNames },
        ),
      )
      .sort((a, b) => b.rank - a.rank || b.matches.size - a.matches.size),
  );
  async function start(group) {
    try {
      await app.practice.start(makeSearchSet(group, value));
    } catch (error) {
      app.toast(error.message);
    }
  }
</script>

<nav class="breadcrumbs eyebrow" aria-label="Breadcrumb">
  <a href={href('#home')}>All activities</a><span aria-hidden="true">/</span><a
    href={href('#search=all')}
    aria-current="page">all activities search</a
  >
</nav>
<h1>Find practice by key term</h1>
<p class="muted">Search all questions by topic, skill or specification reference.</p>
<form class="topic-search-form" id="topic-search-form" role="search" action={href('#search=all')}>
  <label for="topic-search">Key term or reference</label>
  <div>
    <input
      class="text-field"
      id="topic-search"
      name="q"
      type="search"
      maxlength="100"
      bind:value={query}
    /><button class="action-button primary" type="submit">Search</button>
  </div>
</form>
<p id="search-status" role="status">
  {!value
    ? 'Enter a key term to see matching topics and question counts.'
    : groups.length
      ? `${groups.reduce((total, g) => total + g.matches.size, 0)} matching questions across ${groups.length} ${groups.length === 1 ? 'topic' : 'topics'}.`
      : 'No matching topics in this section. Try a broader term or a specification reference.'}
</p>
<section id="search-results" class="search-results" aria-label="Matching topics">
  {#each groups as group, index}
    {@const plan = searchPlan(group)}
    <article class="surface-card search-result" data-search-bank={group.type}>
      <h2>
        {group.type === 1 ? 'Core papers' : types[group.type].name} · {group.label}{group.recipe
          ? ' · ' + group.recipeLabel
          : ''}
      </h2>
      <p>
        {group.matches.size} matching {group.matches.size === 1 ? 'question' : 'questions'}{group
          .topics.size
          ? ' · ' + [...group.topics].slice(0, 4).join(', ')
          : ''}
      </p>
      <p class="muted">
        {group.questions
          .filter((q) => group.matches.has(q.slot))
          .slice(0, 3)
          .map((q) => q.title)
          .join(' · ')}{group.matches.size > 3 ? ' …' : ''}
      </p>
      <p>
        {!plan
          ? 'These matches cannot form a complete starter set. Broaden your search.'
          : plan.related
            ? `This set includes ${plan.matched} matching ${plan.matched === 1 ? 'question' : 'questions'} and ${plan.related} related ${plan.related === 1 ? 'question' : 'questions'} from the same topic.`
            : `All ${plan.entries.length} questions in this set match your search.`}
      </p>
      <button
        class="action-button primary"
        data-search-result={index}
        disabled={!plan}
        onclick={() => start(group)}
        >{plan?.related ? 'Start set with related questions' : 'Start matching set'}</button
      >
    </article>
  {/each}
</section>
