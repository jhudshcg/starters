# Style guide

Status: adopted presentation requirements and retained proposals. Explicitly labelled proposals remain unapproved; recorded teacher decisions supersede older defaults. Shared behaviour is defined in [spec-common.md](spec-common.md).

## Original presentation requirements

Requirements moved from AGENTS.md on 7 October 2026 retain their original status; moving them into a document containing drafts does not make them proposals. Later explicitly adopted decisions and the exceptions identified below still apply.

SPA, colourful, responsive and accessible (layout should remain clear and functional even when zoomed in a lot for partially sighted students).

Language should be clear and concise, using technical terms from the spec where appropriate, but avoiding additional jargon.

## Direction

Colourful, calm and age-appropriate. Use clear question cards, generous spacing and short instructions. Avoid childish decoration, competitive speed pressure and animation unrelated to the task. Use the same words for the same controls throughout.

## Shared CSS tokens

The implemented light/dark palette is in [`css/tokens.css`](../css/tokens.css). See [theme editing](theming.md) for the five semantic roles, supporting neutral/warning colours and page/card decoration settings. This replaces the original proposed purple-primary palette.

Use accents sparingly. Every type and feedback state also has a text label. Selection is distinct from correct/incorrect feedback. Do not colour a whole code snippet as an error. Validate actual foreground/background combinations, including gradient extremes.

Font stack: system sans-serif for interface and prose; system monospace for code, codes and trace values. Base size `1rem`, line height `1.5`; static code at least `1rem`; live editors use the responsive sizes below. Use `rem` for spacing and controls. Spacing scale: `0.25`, `0.5`, `0.75`, `1`, `1.5`, `2`, `3rem`. Card radius uses `--card-radius` (default `16px`); shadows default to none. Prose width about `65ch`, page width at most `72rem`.

## Layout and components

Home: title and short instruction, three type cards, prominent code-entry form, progress link. Type cards open question-type entry pages with a Focus selector or graphical puzzle-type selector; see [practice entry and recall](spec-common.md#adopted-practice-entry-and-browser-navigation--13-october-2026). Activity: linked breadcrumbs without a separate back link, heading, one desktop toolbar row containing the prominent copyable code, question count, marks/duration and timer controls, then stacked questions and final submit action. Keep answer fields adjacent to their prompts. Progress: filters, overall and weekly statistics, eight-week average-score chart with equivalent table, three recommended sets, revision priorities, dated attempt table and import/export controls. The header shows the selected username, last tracked date and Not you? action. See [progress specification](spec-progress.md) for labels and colour rules.

Use shared components for buttons, labels, inputs, choice groups, question cards, part marks, hints, feedback, code panels, grid controls and progress tables. Primary action is visually stronger than randomisation and answer reveal. Use the exact navigation labels in the common specification.

Question layouts use one column on small screens and at high zoom. Home activity and lower note cards are the adopted two-column exception from 360px. Do not set fixed card heights or force question controls into narrow sidebars. Static code uses authored line breaks and responsive wrapping; live editors preserve authored lines and scroll horizontally when needed. Puzzle boards and answer grids must fit without horizontal scrolling, including at 320 CSS pixels. Preserve readable labels and useful answer-cell widths; do not satisfy page width by squashing answer columns. Other genuinely two-dimensional content may scroll locally; the whole page must not require horizontal scrolling.

### Code editor presentation

**Adopted 20 October 2026.** Provide a small centred grip tab attached below the editor, without a visible label or height slider. Use a square-cornered 1px frame around the code area, including the bottom edge above the grip. Match the code frame and grip borders to the workspace outline using --line. Use a 60/40 coding-workspace/answer split from 744px, stacking below that width. Group requirements, instructions, code and execution controls in a `coding-workspace` surface with rounded outer corners and a subtle 1px outline. Keep text and controls inset by 1rem, but extend the code editor across that padding to the full workspace width. In single-column layouts (below 744px), extend only the code frame further to the question card’s inside edges, reaching the viewport edges. In this stretched layout, retain only the code frame’s top and bottom borders. Keep tabs, guidance and controls at their existing inset positions and the grip centred. Keep comfortable spacing between these elements. In both column layouts, pin only the tabs and code while guidance, controls, check results and questions scroll normally. Expanded feedback must not change the code’s sticky offset. The floating surface and side borders stop at the bottom code outline; only the small grip projects below it, with scrolling content visible and interactive beside the grip. Reserve its height in normal flow to keep the workspace outline continuous. When pinned, automatically reduce the editor to at most 45% of viewport height in a single column (below 744px) or 65% in two columns, reserving its original flow space to avoid a page jump. Restore the normal height when scrolling back; manual resizing while pinned overrides the compact height. The subtle surface contrast separates coding work from the answer fields. Show rejected-edit feedback temporarily in place of the usual editing instruction, clearing it on a valid edit or mode change. Hide the generated runtime label; retain distributed licence notices. Keep the grip's accessible name, visible keyboard focus and arrow-key resizing. Empty highlighted gaps place the caret at the left inside edge; the outline keeps that left position when text is first entered. Match the live editor surface, text, gutters, syntax and native scrollbar mode to the selected light/dark app palette; theme switches must preserve edits and undo history. Use 14px live-code text by default and 12.5px at viewport widths <=440px, including line numbers. Disable soft wrapping and allow horizontal scrolling inside the editor, without widening the page. Initially size the editor to its code length, capped at `max(viewport width × 1.4, viewport height × 0.75)` in CSS pixels. The use of **max** is intentional. Apply this cap and internal scrolling only to the code editor. The workspace must have no height cap or internal scrollbar. Longer code scrolls inside the editor; students can manually make the editor taller or shorter. The cap governs the default, not a forced reset of the chosen height after each edit.

Keep program output and check feedback in separately labelled regions. Check results show the part identifier, score and diagnostic in distinct blocks; do not repeat the question’s repair instruction as an output prefix. Provide a Minimise/Expand control that retains the heading and restores the existing results; a new check expands the panel.

In two-column coding layouts, show a small right/left triangle toggle at the right of the tab row (or a control row when there are no tabs). It expands only the code surface over the neighbouring questions to the question content’s right edge, without reflowing columns or changing height. Keep the tab row fixed, centre the height grip beneath the current code width, and preserve the editor instance, edits and horizontal scroll position on restoration. Use a keyboard-operable button with an accessible action label and expanded state. Collapse and hide this control below 744px.

For ESP Task 2, keep the editor visible as its associated questions scroll. Tabs switch only the original and editable code, not the question content. Keep tab labels on one line. Reserve each tab’s bold-label width in both states and centre its visible label so selection never shifts adjacent tabs. Join the tabs to the editor edge, with rounded top corners, square lower corners, and a subtly tinted selected tab with a main-colour top accent and bold text; keep inactive tabs on the plain editor surface, with a smaller tint only on hover. Preserve readable code, accessible tab/focus behaviour and access to all questions and controls at narrow widths and high zoom. Do not change the specified default cap to a minimum of the two dimensions.

Present the test-plan draft as a compact five-column table: Description of test, Test data, Expected outcome, Actual outcome, and Comments and intended actions. Use one row per existing test group, with column/row dividers and smaller text. Allow horizontal scrolling inside a keyboard-accessible preview instead of collapsing the columns or widening the page. Keep saved run evidence expandable within the relevant actual-outcome cell.

Use icon-only −/+ disclosure buttons for code guidance (including function requirements) and check results. Keep their accessible names, expanded state, visible keyboard focus and 44px targets. New explicit checks reopen their results; editing notices remain visible even when guidance is collapsed.

## Interaction and accessibility checks

- Use native buttons, inputs, radio buttons, checkboxes, fieldsets and legends wherever possible. Every input has a visible label; placeholder text is not its label.
- All controls work by keyboard. Show a strong focus ring with a contrasting outer/inner treatment; never remove the outline without an equivalent.
- Aim for at least 44×44 CSS-pixel interaction targets. Choice labels are clickable. Do not require hover to discover instructions.
- Use 360 CSS pixels as the routine small-mobile check. Reserve 320px and 200%/400% zoom for targeted reflow or accessibility checks; do not duplicate every mobile test at 320px. Text and controls reflow; no overlapping content or hidden submit controls.
- Validate normal text contrast at least 4.5:1 and meaningful control boundaries/focus indicators at least 3:1 against adjacent colours. Do not assume token selection alone guarantees this.
- Dragging is optional enhancement. Offer select-then-place or move controls with equivalent feedback.
- On activity navigation, move focus to the new heading. On validation failure, focus the error summary or first invalid field. On marking, announce a concise result without unexpectedly moving focus.
- Use polite status announcements for score and copy confirmation. Announce timer start, one-minute warning and expiry; never every second. Timer colour is not the sole warning.
- Respect reduced-motion preferences. No flashing content, confetti requirement or autoplay sound.
- Charts have an equivalent data table. Spatial interactions have labelled coordinates and keyboard instructions.

These are acceptance targets for this product, not a claim that the draft has passed an accessibility audit.

## Content and feedback

Apply [content authoring rules](content-authoring.md).

Examples:

| State | Copy |
| --- | --- |
| Correct | “Correct — 2/2 marks.” |
| Partial | “1/2 marks. You identified the check; choose a reason linked to it.” |
| Incorrect | “0/1 marks. // counts complete groups; % gives the remainder.” |
| Blank | “No answer entered — 0/1 marks.” |
| Unknown code | “Code not found. Check the code or reload to get the latest question catalogue.” |
| Save failure | “Progress could not be saved on this browser. Export your progress to keep a copy.” |

Show hints on request, then answer reveal as a separate action. Do not imply that assisted success is an independent first attempt. Code highlighting must preserve readable plain text and copying; indentation remains visible.

## Files

The framework implementation uses `src/lib/styles/` for semantic foundations, token mapping and breakpoints, with existing `css/` files for palette and application/puzzle rules. Shared Svelte components own the shell, controls and question presentation. Keep type-specific rules limited to actual interaction differences. No duplicated page shells or per-question embedded styles.

## Adopted interaction refinements

Show hint remains directly available. Check answer and Show answer appear beside it only after a submission within the last four hours. Each is a direct button; no disclosure or confirmation is needed to reveal answers.

After submission, show percentage, earned/available marks or points, time and assistance status beside the Submit button as well as at the top. Move focus to the nearby result for a manual submission so the student does not have to scroll back to the top.

Use warm yellow (#FFE6A0 with #9B7122 borders) for puzzle selections. Yellow indicates a choice, never correctness; green feedback is reserved for marked results. Reference shapes remain purple. Spatial questions use a single clickable coordinate grid containing the given marker, with no duplicate radio-selector grid. Shape tasks show reference shapes beside a clickable answer board. Path tasks number each selected step and identify the current endpoint; they include Undo and Reset. All interactions have keyboard equivalents.

## Header

The s. icon and “start here” wordmark share an aligned first row. Keep the icon tall enough to contain the wordmark’s visual height. “Digital Software Development T-Level” sits below both, starting at the icon’s left edge. From 360px it stays on one line at that same vertical position and may extend beneath the top-row controls; the brand anchor’s column must not force wrapping. Keep the icon/wordmark and the three controls separate in the top row.

The header has one top row: logo/tagline on the left and colour-theme, light/dark and hamburger controls on the right, in that order. The controls stay together without overlap or row wrapping from 360px. The profile occupies a separate row and may wrap. Keep the greeting and Last tracked line closely stacked, with Not you? beside them and a 44px target; avoid extra vertical gaps between this group and the branding. The hamburger contains Activities, My progress, Python projects, Go practice, Maths practice and FAQ. Go and Maths links no longer appear in the home content.

Keep a direct My progress link visible beneath the hamburger, right-aligned with the controls, on every page. Retain its hamburger-menu entry. Give the direct link a 44px minimum target height and current-page semantics; adding it must not move or wrap the brand subtitle or split the top-row icons.

## Modal dismissal

Dialogs with a Close/Cancel action also dismiss when the user clicks the visible backdrop. This follows the Escape/cancel path: dismissing a leave-warning means Keep working, never Leave activity. Clicks inside the dialog (including its padding), and drags starting inside and ending outside, must not dismiss it. Retain visible buttons and keyboard dismissal. The required initial profile prompt has no Close/Cancel action and retains its existing requirement to enter a name; switching profiles remains cancellable. Use the shared Bits UI `Modal.svelte` component; its dismissal path must preserve these behaviours.

## Home

Home top padding remains reduced by 20px.

Home hero: keep the code-entry card at least 295px wide and stack the hero columns at narrow widths. Introductory bullet labels retain their horizontal gap but have no extra row gap when wrapping, so successive rows use the normal text line height.

Home activity cards appear in this order: Exam practice, Programming, Puzzles, with no default emphasis. Use two columns from 360px on phones and three from 744px. Each card has its numbered uppercase label, illustration below it, bold title, divider, muted short metadata and a Let’s go button. Omit the longer description and key-term links. Keep each exam-art bullet with its word. Let’s go buttons retain a single-line label. Keep the outer top/bottom inset, but use tight spacing between the label, artwork, title, divider, metadata and button. Artwork is about 30% larger than the first compact layout and may be cropped at the card’s inner border edge. The programming artwork includes the loop and a two-line persistence/“I ♥ coding!” condition.

Keep the Small steps and No rush panels side by side from 360px. Separate them from the activity cards with a horizontal rule; use quiet solid borders and a surface fill rather than the stronger theme gradient borders. Backup/file controls belong on My progress, without repeated blocks below home or activities.

## Footer

Centre footer links and include a concise FAQ.

## Responsive breakpoints

Use the shared app viewport scale in [breakpoints.css](../src/lib/styles/breakpoints.css). Authored app CSS uses named Tailwind `@variant` rules. An unprefixed variant means **>=** its threshold; `max-` means **<**. Keep responsive rules grouped by owning component in `css/styles.css`; Go rules stay with their component in `css/puzzles.css`.

| Variant suffix | Width | Consumers and purpose |
| --- | --- | --- |
| `viewport-small` | 440px | Compact header, home cards, page gutters and weekly chart. |
| `viewport-editor` | 744px | Coding questions use two columns and home activity cards use three from this width. Below it, stack the hero, code-entry forms, page headings, submission and progress controls; stretch and pin the single-column editor. |
| `viewport-compact` | 820px | Reference threshold for compact controls and main-card edges; use the inclusive variant below. |
| `max-viewport-compact-inclusive` | <=820px | Edge-to-edge main cards, stacked search/exam option cards and compact navigation/question/home/progress spacing and typography. |
| `viewport-large` | 1024px | Question columns, hero proportions, outer spacing and footer layout. |
| `max-viewport-small-inclusive` | <=440px | Go gutters explicitly include the endpoint. |

The <=440px rule in `css/challenges.css` deliberately stays plain CSS for package/source-style consumers that do not run Tailwind. The portable CodeMirror theme also uses the <=440px font-size boundary in its generated stylesheet, without depending on Tailwind. The scoped Question/LivePython media rules and LivePython runtime detection mirror the 744px editor threshold; keep them aligned with the register. Other app width queries belong in the register. Native hover, reduced-motion and forced-colour queries remain plain CSS.

Home gutters shrink intrinsically to preserve the 295px code-entry floor, defined once as `--home-entry-min-width`; this needs no extra viewport breakpoint. Maths's specialised progress/reference/container thresholds are not adopted without a matching layout need. Prefer conserving vertical space: keep working rows and columns until the lower 744px boundary, with compact spacing through 820px. Search/exam main cards remain stacked through 820px so their individual edge-to-edge treatment is preserved. Prefer an existing threshold; record the content-fit reason before adding an exception. Viewport and container widths are distinct measurements.

When changing responsive rules, check the affected thresholds and use 360px as the primary phone width. Check the 320px home entry-card floor only when relevant to the change. Preserve the inclusive Go boundary at 440px. Check affected layouts with long content and enlarged text.

Focus/Activity selectors align to the right within their wrapping `focus-row` container.

## Set toolbar and results

The set toolbar and result banner use a horizontal layout that wraps to fit. Keep the code, summary and timer controls close together; summary text must not reserve vertical space. The timer selector sizes to its options. Set the flex direction explicitly when combining these layouts with daisyUI's column-based card foundation.

## Mobile main cards

At viewport widths **820px and below**, main cards across the app extend to the viewport edges: question cards, set toolbars, result banners, progress panels, search results and exam option cards. Remove left/right borders and corner rounding; retain top/bottom borders. Gradient borders run left to right so both colours remain visible along those edges. Keep text and controls padded, with the denser puzzle padding preserved. Other page controls retain side insets. Compact home and progress tile grids retain their adopted columns and gutters; nested answer fields, code surfaces and controls retain their own borders.
