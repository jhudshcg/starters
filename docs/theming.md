# Theme editing

The small palette button beside the sun/moon control opens eight selectable abstract previews, grouped into light and dark themes. Each button has a name and an accessible light/dark label. The menu stays open for comparison and adjustments. The sun/moon button switches to the same palette in the opposite mode, falling back to Sage/Forest when there is no counterpart. Mode and palette are saved locally; existing light/dark preferences are retained.

| Light | Dark | Treatment |
| --- | --- | --- |
| Sage | Forest | Solid green (default) |
| Blue sky | Midnight blue | Blue page and card gradients |
| Rose | Berry | Pink/plum gradients and gradient borders |
| Apricot | Ember | Solid warm orange |

Saved mode, palette and adjustments are restored by a synchronous script in the document head, before the page paints. `src/hooks.server.js` generates it from `restoreTheme` in `js/theme.js`; the mounted controller uses the same function. Keep restoration independent of the application bundle so slow loading does not flash the default palette. Missing or invalid preferences and unavailable storage fall back safely.

Edit `css/tokens.css`: the shared base and dark blocks define Sage/Forest; `data-palette` blocks define the other colours. Paired names live in `js/theme.js`. Use `npm run dev` for immediate CSS preview.

| Role | Tokens | Used for |
| --- | --- | --- |
| Main | `--main`, `--main-hover`, `--main-text` | Actions, headings, progress bars |
| Accent | `--accent`, `--accent-bg`, `--accent-border`, `--accent-text` | Focus rings, contextual panels and grids |
| Selected | `--selection-bg`, `--selection-border`, `--selection-text` | Unmarked options and puzzle selections |
| Correct / incorrect | `--correct-*`, `--incorrect-*` | Marking feedback |
| Supporting | `--warning-*`, `--page`, `--surface*`, `--text`, `--muted`, `--line`, `--control-border` | Partial marks, notices and neutral UI |

Feedback mixes its semantic colours with `--surface`, the normal selectable surface, rather than the dominant theme accent. Progress priorities use separate `--priority-*` tokens: RAG fills/borders and the icy fill/border/texture colours mix 90% semantic base with 10% `--main` in OKLab. Text colours and icy texture geometry remain unchanged; unmixed semantic bases provide the fallback. Missing and stale evidence retain grey and icy treatments plus text labels. Missing-data `--missing-bg` and `--missing-border` mix 90% neutral grey with 10% `--main` (the dominant theme colour) in OKLab, subtly tying the grey to its surroundings; browsers without colour mixing retain neutral grey. This is a perceptual adjustment, not a guarantee of identical perceived grey in every theme.

Change foreground/background/border combinations together. Before marking, all palettes use pastel amber selections (light in light mode, deeper in dark mode), including radio indicators. Visible marking results switch the chosen option or answer field to green for correct, red for incorrect, or amber for partial/unreviewed answers. Retry and edits clear stale outcome styling; changing themes does not change answers or marks. Palette blocks must not override the shared selection/feedback colours. Code panels have their own paired colours. Puzzle illustrations, Go boards/stones, blocked-cell hatching and geometric piece colours remain component-specific; they can carry information and are not global theme colours.

## Preview and adjustment controls

Preview swatches reuse the palette CSS through `.theme-swatch`. Saturation spans **0–100%**: it directly sets background HSL saturation while holding HSL lightness constant. Other theme colour tokens scale down to grey or up to full saturation around their authored saturation at the palette default. There is no page filter; fixed artwork colours are not transformed. Perceived brightness can still vary with hue/saturation.

Background lightness retains **55–96% in light mode** and **5–45% in dark mode**. Related surfaces retain small offsets; main/hover/accent lightness tracks 20% of movement from the default. No contrast guard is applied.

Each palette defines `--theme-saturation-default` and `--theme-bg-default` in `css/tokens.css`, based on its original background. Light defaults are capped at 94% to leave upward adjustment room. Rose uses the requested 90% saturation / 92% lightness. Original foreground and semantic colours are retained at the default saturation; their `--*-raw` values are the authoring inputs. CSS defaults also drive preview swatches and slider initial values.

`dsd-starters-theme-adjustments` stores overrides keyed by mode and palette, e.g. `{"light:rose": {"saturation": 90, "lightness": 92}}`. Switching themes restores their own settings; Reset adjustments restores the current theme. Old global filter-based preferences are ignored because their saturation/lightness mapping differs. Mode and palette preferences remain.

The full adjustment ranges are intentionally exploratory, without automatic contrast correction. Relative-colour support is required for adjustments; older browsers retain authored fallback colours.

## Blend feedback with the palette

The shared semantic base colours use `--selection-base`, `--correct-base`, `--incorrect-base` and corresponding `--*-border-base` tokens. Their public fill/border tokens use `color-mix(in oklab, …)` with the default selectable `--surface`: **6% surface colour for amber, 10% for green and 14% for red**. This keeps feedback related to the surface it replaces. Text stays in its semantic colour for clarity and contrast. Browsers without `color-mix` use the unmixed aliases.

Adjust the percentages in the single `@supports` block, then rerun the theme checks. Keep the amber contribution small; selection must never look like a correct-answer state.

## Decoration

Page fill uses `--page` plus optional `--page-image`. Cards use `--card-image`, `--card-border-image`, `--card-mobile-border-image`, `--card-border-color`, `--card-border-width`, `--card-border-style`, `--card-radius` and `--card-shadow`. These cover home/activity cards, question cards, progress panels/statistics, set toolbars and note panels. Layout and artwork positioning are unchanged.

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

## Shared puzzle presentation

Puzzle board geometry and default appearance now live in `packages/puzzles/styles/`. `css/challenges.css` imports them and maps the app's current colours to `--puzzle-*` properties, keeping all eight app themes. Type-card art and tangram piece colours come from `packages/puzzles/graphics.js`. Edit shared presentation there; keep question-card layout and navigation styles in this app. See the [library markup and styling contract](../packages/puzzles/styles/README.md) for consumer overrides and SVG limitations.

Main single-column cards across the app at widths <768px use `--card-mobile-border-image` for their top/bottom borders: `none` for solid palettes, a 90-degree main-to-accent gradient for Rose/Berry. The ordinary 135-degree border remains at wider widths. Home’s lower note panels use `--line` and a solid `--surface` fill to remain quieter than activity choices.

## Framework integration

`src/lib/styles/app.css` imports Tailwind and selected daisyUI component foundations without Preflight or default daisyUI themes. `controls.css` composes semantic classes with `@apply`; `theme-mapping.css` is the single bridge from existing tokens to daisyUI roles. Continue editing palette values in `css/tokens.css`.

`src/lib/theme/preferences.js` owns stored preferences and adjustments; `ThemeControls.svelte` renders them through a Bits UI popover and native range inputs. `js/theme.js` supplies palette names and the shared restoration function. Tokens stay on the root so dialogs/popovers in portals inherit the active palette. Do not reintroduce a second theme initializer or per-component colour literals.

## Python editor preview

The [PyScript trial](../prototypes/pyscript/README.md#theme-integration) imports these tokens and the existing preference controller. Live editor backgrounds, plain text and gutters follow the app’s `--surface`, `--text` and `--muted` tokens in both light and dark modes. `--editor-color-scheme` carries the mode through PyScript’s shadow-root style reset so native scrollbars also match. Mode-aware `--editor-keyword`, `--editor-string`, `--editor-number` and `--editor-function` tokens keep distinct syntax hues, with a 12% text tint and the shared saturation adjustment. Light mode uses saturated violet keywords, blue functions, green strings and burnt-orange numbers/booleans, retaining the 12% theme-text blend; dark mode retains the brighter syntax hues. Local `--code-*` aliases keep region controls consistent without changing static code or the dark home code-entry panel. Theme switches update mounted editors through inherited CSS variables, preserving code, selections and undo history. Region fills derive from code and accent colours; active regions use the shared selection pair. Its Theme selector previews all eight presets without defining a separate palette. The adapter removes PyScript's secondary hover play button; Run code and its keyboard shortcut remain available. The same syntax tokens serve production `LivePython.svelte` questions, including ESP Task 2, through the shared adapter. The host adds a 1px code-area frame and small resize grip, and hides the generated runtime label without changing distributed licence notices. Dedicated production checks cover the extension; trial checks alone are not production evidence.
