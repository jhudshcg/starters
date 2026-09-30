# Theme editing

The small palette button beside the sun/moon control opens eight selectable abstract previews, grouped into light and dark themes. Each button has a name and an accessible light/dark label. The menu stays open for comparison and adjustments. The sun/moon button switches to the same palette in the opposite mode, falling back to Sage/Forest when there is no counterpart. Mode and palette are saved locally; existing light/dark preferences are retained.

| Light | Dark | Treatment |
| --- | --- | --- |
| Sage | Forest | Solid green (default) |
| Blue sky | Midnight blue | Blue page and card gradients |
| Rose | Berry | Pink/plum gradients and gradient borders |
| Apricot | Ember | Solid warm orange |

Edit `css/tokens.css`: the shared base and dark blocks define Sage/Forest; `data-palette` blocks define the other colours. Paired names live in `js/theme.js`. Use `npm run dev` for immediate CSS preview.

| Role | Tokens | Used for |
| --- | --- | --- |
| Main | `--main`, `--main-hover`, `--main-text` | Actions, headings, progress bars |
| Accent | `--accent`, `--accent-bg`, `--accent-border`, `--accent-text` | Focus rings, contextual panels and grids |
| Selected | `--selection-bg`, `--selection-border`, `--selection-text` | Unmarked options and puzzle selections |
| Correct / incorrect | `--correct-*`, `--incorrect-*` | Marking feedback |
| Supporting | `--warning-*`, `--page`, `--surface*`, `--text`, `--muted`, `--line`, `--control-border` | Partial marks, notices and neutral UI |

Change foreground/background/border combinations together. Before marking, all palettes use pastel amber selections (light in light mode, deeper in dark mode), including radio indicators. Visible marking results switch the chosen option or answer field to green for correct, red for incorrect, or amber for partial/unreviewed answers. Retry and edits clear stale outcome styling; changing themes does not change answers or marks. Palette blocks must not override the shared selection/feedback colours. Code panels have their own paired colours. Puzzle illustrations, Go boards/stones, blocked-cell hatching and geometric piece colours remain component-specific; they can carry information and are not global theme colours.

## Preview and adjustment controls

Preview swatches reuse the palette CSS through `.theme-swatch`. Saturation spans **0–100%**: it directly sets background HSL saturation while holding HSL lightness constant. Other theme colour tokens scale down to grey or up to full saturation around their authored saturation at the palette default. There is no page filter; fixed artwork colours are not transformed. Perceived brightness can still vary with hue/saturation.

Background lightness retains **55–96% in light mode** and **5–45% in dark mode**. Related surfaces retain small offsets; main/hover/accent lightness tracks 20% of movement from the default. No contrast guard is applied.

Each palette defines `--theme-saturation-default` and `--theme-bg-default` in `css/tokens.css`, based on its original background. Light defaults are capped at 94% to leave upward adjustment room. Rose uses the requested 90% saturation / 92% lightness. Original foreground and semantic colours are retained at the default saturation; their `--*-raw` values are the authoring inputs. CSS defaults also drive preview swatches and slider initial values.

`dsd-starters-theme-adjustments` stores overrides keyed by mode and palette, e.g. `{"light:rose": {"saturation": 90, "lightness": 92}}`. Switching themes restores their own settings; Reset adjustments restores the current theme. Old global filter-based preferences are ignored because their saturation/lightness mapping differs. Mode and palette preferences remain.

The full adjustment ranges are intentionally exploratory, without automatic contrast correction. Relative-colour support is required for adjustments; older browsers retain authored fallback colours.

## Blend feedback with the palette

The shared semantic base colours use `--selection-base`, `--correct-base`, `--incorrect-base` and corresponding `--*-border-base` tokens. Their public fill/border tokens use `color-mix(in oklab, …)` with the active `--main`: **6% theme colour for amber, 10% for green and 14% for red**. This keeps unmarked amber distinct while giving feedback a subtle palette tint (blue themes soften red towards purple). Text stays in its semantic colour for clarity and contrast. Browsers without `color-mix` use the unmixed aliases.

Adjust the percentages in the single `@supports` block, then rerun the theme checks. Keep the amber contribution small; selection must never look like a correct-answer state.

## Decoration

Page fill uses `--page` plus optional `--page-image`. Cards use `--card-image`, `--card-border-image`, `--card-border-color`, `--card-border-width`, `--card-border-style`, `--card-radius` and `--card-shadow`. These cover home/activity cards, question cards, progress panels/statistics, set toolbars and note panels. Layout and artwork positioning are unchanged.

The base Sage/Forest decoration is solid, with a 1px border, 16px radius and no shadow. Blue/Rose override it as listed above. To change a preset, edit its existing block (or the base for defaults), for example:

```css
--page-image: linear-gradient(135deg, var(--page), var(--surface-soft));
--card-image: linear-gradient(145deg, var(--surface), var(--surface-soft));
--card-border-image: linear-gradient(135deg, var(--main), var(--accent));
--card-border-color: transparent;
--card-border-width: 2px;
--card-shadow: 0 4px 16px rgb(0 0 0 / 8%);
```

The inner fill must be an **opaque CSS image** (a gradient, including a same-colour gradient). It masks the border gradient behind the card content. Rounded borders use layered backgrounds, not `border-image`. Keep border style `solid` and colour `transparent` for a gradient border. For solid/dashed borders set `--card-border-image: none` and a visible border colour. Shared declarations inherit into dark mode; override only values that need to differ. Forced-colour mode uses a solid system border.

Check all eight themes, selected/hover/keyboard-focus and marked states, and a narrow viewport. Target 4.5:1 normal text contrast and 3:1 meaningful boundaries/focus indicators. Check gradient extremes as well as the middle. Production still needs a build before release.
