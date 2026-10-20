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
        colorScheme: 'dark',
        backgroundColor: 'var(--code-bg)',
        color: 'var(--code-text)',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      },
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
        { tag: tags.keyword, color: 'var(--code-keyword)', fontWeight: '600' },
        { tag: [tags.string, tags.regexp], color: 'var(--code-string)' },
        { tag: [tags.number, tags.bool, tags.null], color: 'var(--code-number)' },
        {
          tag: [tags.function(tags.variableName), tags.definition(tags.variableName)],
          color: 'var(--code-function)',
        },
        { tag: tags.comment, color: 'var(--code-muted)', fontStyle: 'italic' },
        { tag: tags.invalid, color: 'var(--on-code-error)', textDecoration: 'underline' },
      ]),
    ),
  ];
}
