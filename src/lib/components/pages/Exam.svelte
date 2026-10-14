<script>
  import { examSections } from '#domain/exam-sections.js';
  let { href } = $props();
</script>

<a href={href('#home')} class="back">← All activities</a>
<div class="page-top">
  <div>
    <h1>Exam practice</h1>
    <p class="muted">Choose Core paper questions or Employer Set Project (ESP) practice.</p>
  </div>
</div>
<section class="exam-options" aria-label="Exam practice options">
  {#each examSections as section}<article class="note-panel">
      <div>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
        <a
          class="action-button primary"
          data-exam-start={section.bankType}
          href={href(`#practice=${section.bankType}`)}
          >{section.action} <span aria-hidden="true">↗</span></a
        >
      </div>
    </article>{/each}
</section>
