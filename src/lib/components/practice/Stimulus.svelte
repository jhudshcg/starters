<!-- Authored question stimulus; answers are rendered separately. -->
<script>
  let { q } = $props();
  const columns = $derived(
    q.sheet
      ? Array.from(
          {
            length: Math.max(
              ...Object.keys(q.sheet.cells).map((key) =>
                [...key.match(/^[A-Z]+/)[0]].reduce((n, c) => n * 26 + c.charCodeAt(0) - 64, 0),
              ),
            ),
          },
          (_, i) => String.fromCharCode(65 + i),
        )
      : [],
  );
  const rowCount = $derived(
    q.sheet
      ? Math.max(...Object.keys(q.sheet.cells).map((key) => Number(key.match(/\d+$/)[0])))
      : 0,
  );
  function cell(key) {
    const value = q.sheet.cells[key] ?? '';
    return q.sheet.formats?.[key] === 'percent'
      ? Number(value) * 100 + '%'
      : q.sheet.formats?.[key] === 'money'
        ? Number(value).toFixed(2)
        : value;
  }
</script>

{#snippet python()}
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Code panels remain keyboard-scrollable at high zoom.) -->
  <pre class="code-panel" tabindex="0" role="region" aria-label="Python code"><code>{q.code}</code
    ></pre>
{/snippet}

{#if q.requirements}
  <div class="investigation-stimulus">
    <section class="requirements">
      <h3>Requirements</h3>
      <ul>
        {#each q.requirements as requirement}<li>{requirement}</li>{/each}
      </ul>
      <p class="muted">
        Predict the supplied tests by reading the code. Each test starts a fresh call; no Python is
        run here.
      </p>
    </section>
    {@render python()}
  </div>
{:else if q.sheet}
  <div class="grid-wrap">
    <table class="puzzle-grid spreadsheet">
      <caption>{q.title} · spreadsheet extract</caption><thead
        ><tr
          ><th scope="col">Cell</th>{#each columns as col}<th scope="col">{col}</th>{/each}</tr
        ></thead
      ><tbody
        >{#each Array(rowCount) as _, row}<tr
            ><th scope="row">{row + 1}</th>{#each columns as col}{@const key = col + (row + 1)}<td
                title={key + (q.sheet.formulas?.[key] ? ' ' + q.sheet.formulas[key] : '')}
                >{cell(key)}</td
              >{/each}</tr
          >{/each}</tbody
      >
    </table>
    <p class="muted">
      Use the displayed cell addresses. Supported: =, +, −, *, / by a number, brackets, SUM and
      SUMIF; $ fixes a row or column. Equivalent formulas are accepted. Unsupported formulas need
      review and receive no automatic credit.
    </p>
  </div>
{:else if q.code}{@render python()}
{:else if q.grid}
  <div class="grid-wrap">
    <table class="puzzle-grid">
      <caption>{q.title}</caption><thead
        ><tr
          ><th scope="col">Row</th>{#each q.grid.headers as heading}<th scope="col">{heading}</th
            >{/each}</tr
        ></thead
      ><tbody
        >{#each q.grid.rows as row, index}<tr
            ><th scope="row">{index + 1}</th>{#each row as value}<td class:missing={value === null}
                >{#if value === null}<span aria-label="Missing value">?</span
                  >{:else}{value}{/if}</td
              >{/each}</tr
          >{/each}</tbody
      >{#if q.grid.footer}<tfoot
          ><tr
            ><th scope="row">Column<br />total</th>{#each q.grid.footer as value}<td>{value}</td
              >{/each}</tr
          ></tfoot
        >{/if}
    </table>
  </div>
{:else if q.clues}<aside class="logic-clues">
    <h3>Your clues</h3>
    <ol>
      {#each q.clues as clue}<li>{clue}</li>{/each}
    </ol>
  </aside>{/if}
