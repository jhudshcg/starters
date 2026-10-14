<script>
  import { focuses, focusNames } from '#domain/bank.js';
  import { practiceName } from '#domain/practice-heading.js';
  import { pageStatus, developmentNotice } from '#domain/page-status.js';
  import Breadcrumbs from './Breadcrumbs.svelte';
  import PuzzlePicker from './PuzzlePicker.svelte';
  let { app, type, href } = $props();
</script>

<Breadcrumbs {type} {href} />
{#if type === 0}<PuzzlePicker onchange={(focus) => app.practice.select(type, focus)} />{/if}
<div class="page-top">
  <div>
    <h1>{practiceName(type)}</h1>
    {#if pageStatus[type]?.inDevelopment}<p class="development-notice">
        {developmentNotice}
      </p>{/if}
  </div>
  {#if type !== 0}<div class="focus-row">
      <label for="focus">Focus</label><select
        class="choice-field"
        id="focus"
        value=""
        onchange={(e) => app.practice.select(type, e.currentTarget.value)}
        ><option value="">--</option>{#each focuses(type) as focus}<option value={focus}
            >{focusNames[focus]}</option
          >{/each}</select
      >
    </div>{/if}
</div>
{#if type === 2}<p class="project-link">
    <a href={href('#projects')}>Build something: Python project ideas ↗</a>
  </p>{/if}
