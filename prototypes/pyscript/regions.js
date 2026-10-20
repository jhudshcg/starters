/** Purpose: Keep question regions, editing permissions and history in CodeMirror state.
 * Main contents: region mapping, edit filtering, inline controls and mode changes.
 * Used by: adapter.js. Uses: authored region definitions. Libs: PyScript's CodeMirror modules.
 */
export function regionExtension({ state, view, commands }, definitions, initial, notify) {
  const { StateField, StateEffect, EditorState, Transaction } = state;
  const { Decoration, WidgetType, EditorView } = view;
  const { invertedEffects, isolateHistory } = commands;
  const modes = ['choices', 'regions', 'free'];
  const byId = new Map(definitions.map((region) => [region.id, region]));
  const original = initial.original;
  const originalRegions = initialRegions(original, definitions);
  const originalState = () => ({ regions: originalRegions, manual: false });
  const setMode = StateEffect.define(),
    setFill = StateEffect.define();
  const restore = StateEffect.define({
    map: (value, changes) => ({ ...value, regions: mapRegions(value.regions, changes) }),
  });
  const substitute = StateEffect.define();
  const modeField = StateField.define({
    create: () => initial.mode,
    update: (value, tr) => tr.effects.find((e) => e.is(setMode))?.value ?? value,
  });
  const fillField = StateField.define({
    create: () => initial.fill,
    update: (value, tr) => tr.effects.find((e) => e.is(setFill))?.value ?? value,
  });
  // Inclusive edges let an empty permitted region receive text again.
  function mapRegions(regions, changes, inclusive = true) {
    return regions.map((r) => ({
      ...r,
      from: changes.mapPos(r.from, inclusive ? -1 : 1),
      to: changes.mapPos(r.to, inclusive ? 1 : -1),
    }));
  }
  function touches(changes, region) {
    let touched = false;
    changes.iterChangedRanges((from, to) => {
      if (
        from === to
          ? from >= region.from && from <= region.to
          : (from < region.to && to > region.from) ||
            (region.from === region.to && from <= region.from && to >= region.to)
      )
        touched = true;
    });
    return touched;
  }
  const regionField = StateField.define({
    create: (state) =>
      state.doc.toString() === original
        ? originalState()
        : { regions: initial.regions, manual: initial.manual },
    update(value, tr) {
      if (tr.docChanged) {
        const controlled = tr.effects.some((e) => e.is(substitute));
        const freeEdit = tr.startState.field(modeField) === 'free' && !controlled;
        const regions = freeEdit
          ? value.regions.filter((r) => !touches(tr.changes, r))
          : value.regions;
        value = {
          regions: mapRegions(regions, tr.changes, !freeEdit),
          manual: value.manual || !controlled,
        };
      }
      // History effects restore region identity and validity with the corresponding source.
      for (const effect of tr.effects) if (effect.is(restore)) value = effect.value;
      // Eligibility follows current source, including manual reversal without Undo.
      if (tr.newDoc.toString() === original) return originalState();
      return value;
    },
  });
  function selectRegion(editor, id) {
    const r = editor.state.field(regionField).regions.find((r) => r.id === id);
    if (!r) return;
    editor.dispatch({ selection: { anchor: r.from, head: r.to }, scrollIntoView: true });
    editor.focus();
  }
  function replace(editor, id, text) {
    const r = editor.state.field(regionField).regions.find((r) => r.id === id);
    if (!r || editor.state.field(modeField) !== 'choices' || !byId.get(id).choices.includes(text))
      return;
    editor.dispatch({
      changes: { from: r.from, to: r.to, insert: text },
      selection: { anchor: r.from, head: r.from + text.length },
      effects: substitute.of(id),
      annotations: isolateHistory.of('full'),
      userEvent: 'input.region',
    });
    editor.focus();
  }
  class RegionControl extends WidgetType {
    constructor(id, text, mode) {
      super();
      Object.assign(this, { id, text, mode });
    }
    eq(other) {
      return this.id === other.id && this.text === other.text && this.mode === other.mode;
    }
    toDOM(editor) {
      const definition = byId.get(this.id);
      if (this.mode !== 'choices') {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'region-empty';
        button.textContent = '…';
        button.setAttribute('aria-label', `Edit ${definition.label}`);
        button.onclick = () => selectRegion(editor, this.id);
        return button;
      }
      const select = document.createElement('select');
      select.className = 'region-choice';
      select.dataset.region = this.id;
      select.setAttribute('aria-label', `Replacement for ${definition.label}`);
      select.title = `Choose a replacement for ${definition.label}`;
      select.append(...definition.choices.map((text) => new Option(text, text)));
      select.value = this.text;
      // CSS focus-within emphasises the region without rebuilding the focused widget.
      select.onchange = () => replace(editor, this.id, select.value);
      select.onkeydown = (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          editor.focus();
        }
      };
      return select;
    }
    ignoreEvent() {
      return true;
    }
  }
  function decorations(editorState) {
    const mode = editorState.field(modeField),
      fill = editorState.field(fillField);
    const selection = editorState.selection.main;
    const ranges = [];
    for (const r of editorState.field(regionField).regions) {
      const active = selection.from === r.from && selection.to === r.to;
      if (r.from !== r.to)
        ranges.push(
          Decoration.mark({
            class: `question-region${active ? ' region-active' : ''}${fill ? ' region-fill' : ''}`,
            inclusiveEnd: false,
            attributes: { 'data-region': r.id, title: byId.get(r.id).label },
          }).range(r.from, r.to),
        );
      if (mode === 'choices' || r.from === r.to)
        ranges.push(
          Decoration.widget({
            widget: new RegionControl(r.id, editorState.sliceDoc(r.from, r.to), mode),
            side: -1,
          }).range(r.to),
        );
    }
    return Decoration.set(ranges, true);
  }
  const decorationField = StateField.define({
    create: decorations,
    update: (_, tr) => decorations(tr.state),
    provide: (field) => EditorView.decorations.from(field),
  });
  // Keep a choice and its control together inside one border with a straight divider.
  const choiceGroups = EditorView.outerDecorations.compute([regionField, modeField], (state) =>
    Decoration.set(
      state.field(modeField) === 'choices'
        ? state
            .field(regionField)
            .regions.filter((r) => r.to > r.from)
            .map((r) =>
              Decoration.mark({ class: 'region-choice-group', inclusiveEnd: true }).range(
                r.from,
                r.to,
              ),
            )
        : [],
      true,
    ),
  );
  const extensions = [
    modeField,
    fillField,
    regionField,
    decorationField,
    choiceGroups,
    EditorState.transactionFilter.of((tr) => {
      if (!tr.docChanged) return tr;
      const mode = tr.startState.field(modeField);
      const controlled = tr.effects.find((e) => e.is(substitute));
      let permitted = mode === 'free';
      if (controlled) permitted = mode === 'choices';
      else if (mode === 'regions') {
        permitted = true;
        const regions = tr.startState.field(regionField).regions;
        tr.changes.iterChangedRanges((from, to) => {
          if (!regions.some((r) => from >= r.from && to <= r.to)) permitted = false;
        });
      }
      if (!permitted) {
        queueMicrotask(() =>
          notify(
            mode === 'choices'
              ? 'Use a dropdown to change the code in this mode.'
              : 'Edit inside an outlined region. Code outside these regions is fixed.',
          ),
        );
        return [];
      }
      return tr;
    }),
    invertedEffects.of((tr) =>
      tr.docChanged ? [restore.of(tr.startState.field(regionField))] : [],
    ),
    EditorView.domEventHandlers({
      mousedown(event, editor) {
        const target = event.target.closest?.('.question-region');
        if (
          !target ||
          event.button !== 0 ||
          event.shiftKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.altKey
        )
          return false;
        const r = editor.state
          .field(regionField)
          .regions.find((r) => r.id === target.dataset.region);
        const selected = editor.state.selection.main;
        // First click selects a region; subsequent clicks allow normal caret placement.
        if (!r || (selected.from === r.from && selected.to === r.to)) return false;
        event.preventDefault();
        selectRegion(editor, r.id);
        return true;
      },
    }),
    EditorView.theme({
      '.question-region': {
        outline: '1px solid var(--code-muted)',
        borderRadius: '3px',
        padding: '1px',
        cursor: 'text',
      },
      '.region-choice-group': {
        display: 'inline-flex',
        alignItems: 'stretch',
        verticalAlign: 'middle',
        whiteSpace: 'pre',
        lineHeight: '18px',
        border: '1px solid var(--code-muted)',
        borderRadius: '3px',
      },
      '.region-fill': { backgroundColor: 'var(--editor-region-bg)' },
      '.region-active, .region-choice-group:focus-within .question-region': {
        outline: '2px solid var(--selection-border)',
        backgroundColor: 'var(--selection-bg)',
        color: 'var(--selection-text)',
      },
      '.region-active span, .region-choice-group:focus-within .question-region span': {
        color: 'var(--selection-text) !important',
      },
      '.region-choice-group .question-region, .region-choice-group:focus-within .question-region': {
        outline: 'none',
        borderRadius: '2px 0 0 2px',
      },
      '.region-choice-group:has(.region-active), .region-choice-group:focus-within': {
        borderColor: 'var(--selection-border)',
      },
      '.region-choice, .region-empty': {
        font: 'inherit',
        fontSize: '13px',
        width: '22px',
        height: '20px',
        padding: '0',
        margin: '0 3px',
        border: '1px solid var(--code-muted)',
        borderRadius: '4px',
        backgroundColor: 'var(--code-bg)',
        color: 'var(--code-text)',
        verticalAlign: 'middle',
        cursor: 'pointer',
      },
      '.region-choice': {
        fontSize: '0',
        height: 'auto',
        margin: '0',
        border: '0',
        borderLeft: '1px solid var(--code-muted)',
        borderRadius: '0 2px 2px 0',
      },
      '.region-choice option': { fontSize: '14px' },
      '.region-choice:focus-visible, .region-empty:focus-visible': {
        outline: '2px solid var(--selection-border)',
        outlineOffset: '2px',
      },
    }),
  ];
  return {
    extensions,
    snapshot(editor) {
      return {
        ...editor.state.field(regionField),
        regions: editor.state.field(regionField).regions.map((r) => ({ ...r })),
        mode: editor.state.field(modeField),
        fill: editor.state.field(fillField),
      };
    },
    setMode(editor, mode) {
      if (!modes.includes(mode)) return false;
      if (mode !== 'free' && !editor.state.field(regionField).regions.length) {
        notify('No marked regions remain in this draft. Reset code to restore them.');
        return false;
      }
      if (mode === 'choices' && editor.state.field(regionField).manual) {
        notify('You’ve edited the code. Reset code to use replacement choices.');
        return false;
      }
      editor.dispatch({
        effects: setMode.of(mode),
        annotations: [Transaction.addToHistory.of(false), isolateHistory.of('full')],
      });
      return true;
    },
    setFill(editor, fill) {
      editor.dispatch({
        effects: setFill.of(fill),
        annotations: Transaction.addToHistory.of(false),
      });
    },
    selectRegion,
    replace,
  };
}

/** Resolve authored fragments once, against original code only. Reject ambiguous definitions. */
export function initialRegions(source, definitions) {
  const ids = new Set();
  const regions = definitions
    .map(({ id, text, choices }) => {
      const from = source.indexOf(text);
      if (
        !text ||
        from < 0 ||
        source.indexOf(text, from + 1) !== -1 ||
        ids.has(id) ||
        !choices.includes(text)
      )
        throw Error(`Invalid or ambiguous question region: ${id}`);
      ids.add(id);
      return { id, from, to: from + text.length };
    })
    .sort((a, b) => a.from - b.from);
  if (regions.some((r, i) => i && regions[i - 1].to >= r.from))
    throw Error('Question regions must be separated.');
  return regions;
}

/** Recover old drafts only if the entire source matches fixed text and authored alternatives. */
export function recoverRegions(original, source, definitions) {
  const regions = initialRegions(original, definitions);
  const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let pattern = '^',
    end = 0;
  for (const r of regions) {
    const choices = definitions.find((d) => d.id === r.id).choices;
    pattern += escape(original.slice(end, r.from)) + '(' + choices.map(escape).join('|') + ')';
    end = r.to;
  }
  const match = new RegExp(pattern + escape(original.slice(end)) + '$').exec(source);
  if (!match || match[0].length !== source.length) return null;
  let offset = 0;
  return regions.map((r, i) => {
    const from = r.from + offset,
      text = match[i + 1];
    offset += text.length - (r.to - r.from);
    return { id: r.id, from, to: from + text.length };
  });
}
