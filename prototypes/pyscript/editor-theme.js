/** Purpose: Apply shared project colours to Python syntax, editor surfaces and selection.
 * Main contents: CodeMirror theme and semantic syntax styles.
 * Used by: adapter.js. Uses: css/tokens.css through inherited CSS variables.
 * Libs: CodeMirror; the pinned PyScript language bundle supplies Lezer tags.
 */
// PyScript exposes language APIs but not Lezer tags. Keep this release-specific import isolated.
import { t as tags } from './vendor/codemirror_language-hp5FIdgW.js';

export function editorTheme({ EditorView }, { HighlightStyle, syntaxHighlighting }) {
  return [
    EditorView.theme({
      '&': {
        fontSize: '14px',
        colorScheme: 'var(--editor-color-scheme)',
        '--code-bg': 'var(--surface)',
        '--code-text': 'var(--text)',
        '--code-muted': 'var(--muted)',
        '--on-code-error': 'var(--incorrect-text)',
        '--editor-line-bg': 'color-mix(in oklab, var(--code-bg) 93%, var(--code-text))',
        '--editor-region-bg': 'color-mix(in oklab, var(--code-bg) 88%, var(--code-text))',
        '--editor-selection-bg': 'color-mix(in oklab, var(--code-bg) 78%, var(--code-text))',
        backgroundColor: 'var(--code-bg)',
        color: 'var(--code-text)',
        borderRadius: '0',
        overflow: 'hidden',
      },
      '@media (width <= 440px)': { '.cm-scroller': { fontSize: '12.5px' } },
      '.cm-scroller': { overflow: 'auto' },
      '&.cm-focused': { outline: '2px solid var(--accent)', outlineOffset: '3px' },
      '.cm-content': { caretColor: 'var(--code-text)' },
      '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--code-text)' },
      '.cm-gutters': {
        backgroundColor: 'var(--code-bg)',
        color: 'var(--code-muted)',
        borderRight: '1px solid var(--code-muted)',
      },
      '.cm-activeLine, .cm-activeLineGutter': { backgroundColor: 'var(--editor-line-bg)' },
      '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
        backgroundColor: 'var(--editor-selection-bg)',
      },
      '.cm-content ::selection, .cm-content::selection': {
        backgroundColor: 'var(--editor-selection-bg)',
      },
      '.cm-selectionMatch, .cm-matchingBracket': {
        backgroundColor: 'var(--editor-line-bg)',
        outline: '1px solid var(--code-muted)',
      },
      '.cm-foldPlaceholder, .cm-tooltip, .cm-panels': {
        backgroundColor: 'var(--surface)',
        color: 'var(--text)',
        border: '1px solid var(--control-border)',
      },
      '.cm-tooltip-autocomplete ul li[aria-selected]': {
        backgroundColor: 'var(--selection-bg)',
        color: 'var(--selection-text)',
      },
      '.cm-searchMatch': { backgroundColor: 'var(--selection-bg)', color: 'var(--selection-text)' },
    }),
    syntaxHighlighting(
      HighlightStyle.define([
        { tag: tags.keyword, color: 'var(--editor-keyword)', fontWeight: '600' },
        { tag: [tags.string, tags.regexp], color: 'var(--editor-string)' },
        { tag: [tags.number, tags.bool, tags.null], color: 'var(--editor-number)' },
        {
          tag: [tags.function(tags.variableName), tags.definition(tags.variableName)],
          color: 'var(--editor-function)',
        },
        { tag: tags.comment, color: 'var(--code-muted)', fontStyle: 'italic' },
        { tag: tags.invalid, color: 'var(--on-code-error)', textDecoration: 'underline' },
      ]),
    ),
  ];
}
