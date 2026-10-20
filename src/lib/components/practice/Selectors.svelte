<script>
  import {
    focuses,
    focusNames,
    espRecipeNames,
    espRecipes,
    examSubtopics,
    availableChallenges,
    challengeLevels,
    challengeLabel,
  } from '#domain/bank.js';
  let { set, a, model, practice } = $props();
</script>

<div class="focus-row">
  {#if set.type !== 0}<span class="primary-focus-controls"
      ><label for="focus">Focus</label><select
        class="choice-field"
        id="focus"
        value={set.focus}
        onchange={(e) => practice.select(set.type, e.currentTarget.value)}
        >{#each focuses(set.type) as focus}<option value={focus}>{focusNames[focus]}</option
          >{/each}</select
      ></span
    >{/if}
  {#if set.type === 3}<span class="subtopic-controls"
      ><label for="esp-recipe">Activity</label><select
        class="choice-field"
        id="esp-recipe"
        value={set.questions[0].recipe}
        onchange={(e) => practice.select(3, e.currentTarget.value, 'recipe')}
        >{#if !espRecipes(set.focus).includes(set.questions[0].recipe)}
          <option value={set.questions[0].recipe} disabled
            >{espRecipeNames[set.questions[0].recipe]} (retired)</option
          >
        {/if}
        {#each espRecipes(set.focus) as recipe}<option value={recipe}
            >{espRecipeNames[recipe]}</option
          >{/each}</select
      ></span
    >{/if}
  {#if set.type === 1}<span class="subtopic-controls"
      ><label for="subtopic">Subtopic</label><select
        class="choice-field"
        id="subtopic"
        value={model.subtopic}
        onchange={(e) => practice.select(1, e.currentTarget.value, 'subtopic')}
        ><option value="all">All subtopics</option
        >{#each examSubtopics(set.focus) as { reference, count }}<option value={reference}
            >{reference} · {count}
            {count === 1 ? 'question' : 'questions'}</option
          >{/each}</select
      ><label class="sequence-toggle"
        ><input
          id="in-sequence"
          type="checkbox"
          aria-describedby="sequence-tooltip"
          checked={model.inSequence}
          onchange={(e) => practice.sequence(e.currentTarget.checked)}
        />
        In sequence<span class="sequence-tooltip" id="sequence-tooltip" role="tooltip"
          >Advance new sets through subtopics in spec order.</span
        ></label
      ></span
    >{/if}
  {#if set.type === 0 && set.focus === 'classic maths'}<label for="maths-topic">Maths topic</label
    ><select
      class="choice-field"
      id="maths-topic"
      value={model.mathsTopic}
      onchange={(e) => practice.select(0, e.currentTarget.value, 'maths')}
      >{#each Object.entries( { all: 'All maths', algebra: 'Algebra', number: 'Number and measures' } ) as [key, label]}<option
          value={key}>{label}</option
        >{/each}</select
    >{/if}
  {#if set.type === 2 && set.questions.some((q) => q.livePython)}<label for="python-challenge"
      >Challenge</label
    ><select
      class="choice-field"
      id="python-challenge"
      value={a.pythonLevel ?? 'foundation'}
      disabled={Boolean(a.finished || a.pythonSubmission)}
      onchange={(e) => practice.pythonLevel(e.currentTarget.value)}
      >{#each Object.entries(challengeLevels) as [value, label]}<option {value}>{label}</option
        >{/each}</select
    >{/if}
  {#if set.type === 0}<label for="challenge-level">Challenge</label><select
      class="choice-field"
      id="challenge-level"
      value={model.level}
      onchange={(e) => practice.select(0, e.currentTarget.value, 'challenge')}
      >{#each Object.keys(challengeLevels) as level}{@const available = availableChallenges(
          set.focus,
          model.mathsTopic,
        ).includes(level)}<option value={level} disabled={!available}
          >{challengeLabel(level, set.focus)}{available ? '' : ' (not available)'}</option
        >{/each}</select
    >{/if}
</div>
