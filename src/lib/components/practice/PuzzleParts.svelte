<!-- The portable player exclusively owns this subtree; Svelte supplies state and callbacks. -->
<script>
  import { onMount, tick, untrack } from 'svelte';
  import { puzzlePartHTML } from '#domain/puzzle-view.js';
  import { bindChallenges, disposeChallenges } from '#domain/challenge-controls.js';
  import { challengeKinds } from '#domain/challenge-rules.js';
  import { esc } from '#domain/view-utils.js';
  let { q, set, attempt, results, app, href } = $props();
  let root;
  const html = $derived.by(() => {
    const a = attempt,
      go = q.focus === 'go',
      hintVisible = a.hints[q.slot] && !a.hiddenHints?.[q.slot];
    return q.parts
      .map((part, index) =>
        puzzlePartHTML(
          part,
          challengeKinds.includes(part.kind) ? (a.answers[q.slot]?.[part.id] ?? '') : '',
          {
            instanceId: q.slot,
            index,
            locked: Boolean(a.finished),
            result: results?.[index],
            labelHTML: `<span class="part-label">${String.fromCharCode(97 + index)})</span> ${esc(part.prompt)} <span class="part-marks">(${part.marks})</span>`,
            guidanceActionsHTML: go
              ? `<button class="puzzle-link" data-hint="${q.slot}" aria-expanded="${Boolean(hintVisible)}">${hintVisible ? 'Hide hint' : 'Show hint'}</button> <a class="puzzle-link" href="${href('#go')}">Practice board</a>`
              : '',
            guidanceHTML:
              go && hintVisible
                ? `<p class="hint-text"><strong>Hint:</strong> ${esc(q.hint)}</p>`
                : '',
            referenceHTML:
              go && q.source
                ? `<a href="${esc(q.source.url)}" target="_blank" rel="noopener noreferrer">Puzzle source</a>`
                : '',
          },
        ),
      )
      .join('');
  });
  $effect(() => {
    root.innerHTML = html;
    // Timer-only snapshots must not replace the board or interrupt a pointer gesture.
    untrack(() =>
      bindChallenges(
        root,
        set,
        () => app.profile.data.active,
        async (slot, id, value, selector) => {
          app.practice.answer(slot, id, value);
          await tick();
          const control = selector
            ? root.querySelector(selector)
            : root.querySelector('[data-puzzle-action]:not(:disabled)');
          if (control && !control.disabled) control.focus({ preventScroll: true });
        },
        app.toast,
        (slot) => app.practice.hint(slot, true),
      ),
    );
  });
  $effect(() => {
    // Keep ordinary inputs mounted while typing; only board answers require new markup.
    if (!html) return;
    const answers = attempt.answers[q.slot] ?? {};
    for (const input of root.querySelectorAll('[data-part]')) {
      const value = answers[input.dataset.part] ?? '';
      if (input.type === 'radio') input.checked = input.value === value;
      else if (input.value !== value) input.value = value;
    }
  });
  onMount(() => {
    const input = (event) => {
      const el = event.target.closest('[data-part]');
      if (el) app.practice.answer(q.slot, el.dataset.part, el.value);
    };
    const click = (event) => {
      if (event.target.closest('[data-hint]')) app.practice.hint(q.slot);
    };
    root.addEventListener('input', input);
    root.addEventListener('change', input);
    root.addEventListener('click', click);
    return () => {
      root.removeEventListener('input', input);
      root.removeEventListener('change', input);
      root.removeEventListener('click', click);
      disposeChallenges(root);
    };
  });
</script>

<div class="parts" bind:this={root}></div>
