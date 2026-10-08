# Optional puzzle styles and graphics

Use both style layers, only the layout layer with your own theme, or neither. The library never imports CSS from JavaScript. Styles apply only inside a `.puzzle-controls` root; no body, page, navigation or question-card styles are supplied.

```html
<link rel="stylesheet" href="packages/puzzles/styles/index.css">
```

For layout with your own theme:

```css
@import './packages/puzzles/styles/layout.css';
/* Your scoped appearance rules follow. */
```

Bundlers can resolve the package exports `@subject-apps/puzzles/styles`, `@subject-apps/puzzles/styles/layout.css` and `@subject-apps/puzzles/styles/theme.css` when the package is installed. Relative paths work for the current in-repository directory. Import layout before theme when using separate files. There are no external fonts, images or network requests.

## Theme overrides

Set properties on the puzzle root, after the imports. The default theme defines them on each root, so setting them only on `:root` will not override those defaults.

```css
.my-app .puzzle-controls {
  --puzzle-font: inherit;
  --puzzle-surface: #19232c;
  --puzzle-surface-soft: #25333e;
  --puzzle-text: #f3f6f8;
  --puzzle-muted: #c4ced6;
  --puzzle-control-border: #92a5b5;
  --puzzle-selection-bg: #ffe6a0;
  --puzzle-selection-text: #49350d;
  --puzzle-selection-border: #9b7122;
}
```

Other public tokens are `--puzzle-surface-hover`, `--puzzle-main` (hover border), `--puzzle-accent` (focus), `--puzzle-warning-bg/text`, `--puzzle-correct-bg/border/text`, `--puzzle-path-board/focus` and `--puzzle-go-board/border/focus/hover`. Change foreground/background combinations together and check contrast. Defaults are light; the app owns dark-theme selection. The T-Level adapter in `css/challenges.css` maps its existing theme tokens to these properties.

Layout includes local scrolling, fixed grid-cell dimensions, transparent hit targets, wrapping toolbars and basic control sizing. It does not shrink a two-dimensional grid to fit a phone. Transparent Go/path hit targets remain transparent in every state so they cannot hide the drawing beneath them. Their background/border rules deliberately use `!important`.

## Markup and state contract

Wrap each puzzle in `<div class="puzzle-controls">`. Avoid nesting puzzle roots. Use native controls and supply their labels, keyboard behaviour, focus management and event handling in the consuming app. CSS alone does not implement a puzzle.

| Puzzle/control | Required structure and state |
| --- | --- |
| Shared | `.challenge-clues` for an ordered clue list; `.puzzle-help` for instructions; `.challenge-toolbar` around buttons. `.selected` or `aria-pressed="true"` indicates selection. Keep labels/symbols alongside colour. `disabled` locks controls. |
| Candidate tables | `.candidate-grids` wraps labelled `.board-scroll` regions containing a `.candidate-table`. Use a caption, row/column headings and native buttons in cells. Supply ×/✓ and updated accessible labels for excluded/selected states. |
| Sudoku and cages | `.board-scroll` wraps `.digit-grid` with inline `--cells: 4`, `6` or `9`. Children are `.digit-cell` buttons. `.given`, `.thick-left` and `.thick-top` indicate fixed cells and box/cage boundaries. `.cage-label` and `.pencil-notes` are optional children. Givens must be protected by the app. |
| Dot paths | `.path-board` contains an SVG and absolutely positioned `.path-dot` buttons. Set board aspect ratio and each target's percentage position/size from the grid dimensions. `.path-end` marks the current endpoint. Provide non-drag controls and coordinate labels. |
| Tangrams | `.piece-tray` contains labelled buttons with SVGs; `.tangram-board` contains the silhouette/piece SVG. The consumer supplies geometry, viewBox, placement, transforms and keyboard controls. |
| Go | A labelled `.board-scroll.go-scroll` contains `.go-board` with an explicit width and aspect ratio, an SVG, and positioned `.go-point` buttons. `.go-status.go-success` indicates a recorded win. Optional `.go-reply`, `.go-replay` and `.go-moves` style replies, replay and move text. |

Give scroll regions `tabindex="0"` and an accessible label. Keep essential toolbar controls outside them. Keep `aria-pressed` in sync with selection; use status text and `aria-live` where results change. The existing app's `data-challenge-*` attributes are its event protocol, not a CSS requirement. The app retains its `.challenge` class alongside `.puzzle-controls` for existing handlers.

See the [standalone example](../examples/styles.html), which uses only package CSS. Its boards demonstrate markup and focus, not playable puzzles. Geometry and SVG artwork must still be supplied by a renderer; the package player and render functions supply that renderer; see the [integration API](../API.md). Check narrow widths, zoom, keyboard operation and contrast in the consuming app.

## Default icons and graphics

```js
import {puzzleTypeArt, tangramPieceColours} from './packages/puzzles/graphics.js';

const [artwork, caption] = puzzleTypeArt['go'];
```

`puzzleTypeArt` maps the same type IDs as `puzzleTypes` to `[artwork, caption]`. Artwork is a text symbol for most types and trusted decorative SVG markup for Go. Place it in an `aria-hidden="true"` container beside the visible type name; do not use it as the only label. Only insert markup from this trusted library, never arbitrary user text as HTML. Consumers may replace any entry or ignore the map.

`tangramPieceColours` is the seven-colour default palette in piece order. Apps can substitute their own palette; retain piece labels and a distinct selected outline. Puzzle-specific target polygons, board positions and solution geometry remain with question data. These defaults do not include page/card layout, and CSS variables do not recolour SVG attributes supplied by a renderer.

## Parent-controlled layout and themes

The package does not select themes or know their names. Map your semantic tokens onto `--puzzle-*` on each control root; changes to parent variables propagate without remounting or losing answer state. The current app does this in `css/challenges.css`. Keep outer question-card layout in the parent.

Sizing hooks include `--puzzle-width`, `--puzzle-cell-width`, `--puzzle-cell-height`, `--puzzle-control-gap`, `--puzzle-path-width` and `--puzzle-tangram-width`. Defaults preserve current board geometry. Keep digit width consistent across cells/grid columns and retain local scrolling. Normal selectors such as `.my-app .puzzle-controls .digit-cell` can override element styling. Most rules use a zero-specificity scope; transparent spatial hit targets are the documented exception. For complete control import layout alone or omit both stylesheets.

Go guidance uses `.go-guidance`, `.go-hint-actions` and `.puzzle-link` for wrapping hint actions next to the board range. `.go-reference` lays out the compact coordinate/source/rules row below the board; `.go-coordinate` styles its readout. These selectors are parent-overridable; the coordinate display never changes answer state.
