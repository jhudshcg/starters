<script>
  import { practiceName } from '#domain/practice-heading.js';
  import { isExamBank } from '#domain/exam-sections.js';
  import { focusNames } from '#domain/bank.js';
  let { type, focus = null, href } = $props();
</script>

<nav class="breadcrumbs eyebrow" aria-label="Breadcrumb">
  <a href={href('#home')}>Home</a><span aria-hidden="true">/</span>
  {#if isExamBank(type)}<a href={href('#exam')}>Exam practice</a><span aria-hidden="true">/</span
    >{/if}
  <a href={href(`#practice=${type}`)} data-practice-picker aria-current={focus ? undefined : 'page'}
    >{practiceName(type)}</a
  >
  {#if focus}<span aria-hidden="true">/</span><span aria-current="page">{focusNames[focus]}</span
    >{/if}
</nav>
