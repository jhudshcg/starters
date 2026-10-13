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

Font stack: system sans-serif for interface and prose; system monospace for code, codes and trace values. Base size `1rem`, line height `1.5`; code at least `1rem`. Use `rem` for spacing and controls. Spacing scale: `0.25`, `0.5`, `0.75`, `1`, `1.5`, `2`, `3rem`. Card radius uses `--card-radius` (default `16px`); shadows default to none. Prose width about `65ch`, page width at most `72rem`.

## Layout and components

Home: title and short instruction, three type cards, prominent code-entry form, progress link. Type cards open question-type entry pages with a Focus selector or graphical puzzle-type selector; see [practice entry and recall](spec-common.md#adopted-practice-entry-and-browser-navigation--13-october-2026). Activity: linked breadcrumbs without a separate back link, heading, one desktop toolbar row containing the prominent copyable code, question count, marks/duration and timer controls, then stacked questions and final submit action. Keep answer fields adjacent to their prompts. Progress: filters, overall and weekly statistics, eight-week average-score chart with equivalent table, three recommended sets, revision priorities, dated attempt table and import/export controls. The header shows the selected username, last tracked date and Not you? action. See [progress specification](spec-progress.md) for labels and colour rules.

Use shared components for buttons, labels, inputs, choice groups, question cards, part marks, hints, feedback, code panels, grid controls and progress tables. Primary action is visually stronger than randomisation and answer reveal. Use the exact navigation labels in the common specification.

Question layouts use one column on small screens and at high zoom. Home activity and lower note cards are the adopted two-column exception from 360px. Do not set fixed card heights or force question controls into narrow sidebars. Code uses authored line breaks and responsive wrapping. Puzzle boards and answer grids must fit without horizontal scrolling, including at 320 CSS pixels. Preserve readable labels and useful answer-cell widths; do not satisfy page width by squashing answer columns. Other genuinely two-dimensional content may scroll locally; the whole page must not require horizontal scrolling.

## Interaction and accessibility checks

- Use native buttons, inputs, radio buttons, checkboxes, fieldsets and legends wherever possible. Every input has a visible label; placeholder text is not its label.
- All controls work by keyboard. Show a strong focus ring with a contrasting outer/inner treatment; never remove the outline without an equivalent.
- Aim for at least 44×44 CSS-pixel interaction targets. Choice labels are clickable. Do not require hover to discover instructions.
- Test at 200% and 400% zoom and a 320 CSS-pixel-wide viewport. Text and controls reflow; no overlapping content or hidden submit controls.
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

Proposed shared files: `css/tokens.css`, `css/base.css`, `css/components.css`, `css/activities.css`, with type-specific rules limited to actual interaction differences. Use shared JS renderers and utilities from the implementation plan. No duplicated page shells or per-question embedded styles.

## Adopted interaction refinements

Show hint remains directly available. Check answer and Show answer appear beside it only after a submission within the last four hours. Each is a direct button; no disclosure or confirmation is needed to reveal answers.

After submission, show percentage, earned/available marks or points, time and assistance status beside the Submit button as well as at the top. Move focus to the nearby result for a manual submission so the student does not have to scroll back to the top.

Use warm yellow (#FFE6A0 with #9B7122 borders) for puzzle selections. Yellow indicates a choice, never correctness; green feedback is reserved for marked results. Reference shapes remain purple. Spatial questions use a single clickable coordinate grid containing the given marker, with no duplicate radio-selector grid. Shape tasks show reference shapes beside a clickable answer board. Path tasks number each selected step and identify the current endpoint; they include Undo and Reset. All interactions have keyboard equivalents.

## Header

The s. icon and “start here” wordmark share an aligned first row. Keep the icon tall enough to contain the wordmark’s visual height. “Digital Software Development T-Level” sits below both, starting at the icon’s left edge. From 360px it stays on one line at that same vertical position and may extend beneath the top-row controls; the brand anchor’s column must not force wrapping. Keep the icon/wordmark and the three controls separate in the top row.

The header has one top row: logo/tagline on the left and colour-theme, light/dark and hamburger controls on the right, in that order. The controls stay together without overlap or row wrapping from 360px. The profile occupies a separate row and may wrap. The hamburger contains Activities, My progress, Python projects, Go practice, Maths practice and FAQ. Go and Maths links no longer appear in the home content.

## Modal dismissal

Dialogs with a Close/Cancel action also dismiss when the user clicks the visible backdrop. This follows the Escape/cancel path: dismissing a leave-warning means Keep working, never Leave activity. Clicks inside the dialog (including its padding), and drags starting inside and ending outside, must not dismiss it. Retain visible buttons and keyboard dismissal. The required initial profile prompt has no Close/Cancel action and retains its existing requirement to enter a name; switching profiles remains cancellable. Use the shared `showModal` helper in `js/dialog.js` for native dialogs.

## Home

Home top padding remains reduced by 20px.

Home hero: keep the code-entry card at least 295px wide and stack the hero columns at narrow widths. Introductory bullet labels retain their horizontal gap but have no extra row gap when wrapping, so successive rows use the normal text line height.

Home activity cards appear in this order: Exam practice, Programming, Puzzles, with no default emphasis. Use two columns from 360px on phones and three from 768px. Each card has its numbered uppercase label, illustration below it, bold title, divider, muted short metadata and a Let’s go button. Omit the longer description and key-term links. Keep each exam-art bullet with its word. Let’s go buttons retain a single-line label. Keep the outer top/bottom inset, but use tight spacing between the label, artwork, title, divider, metadata and button. Artwork is about 30% larger than the first compact layout and may be cropped at the card’s inner border edge. The programming artwork includes the loop and a two-line persistence/“I ♥ coding!” condition.

Keep the Small steps and No rush panels side by side from 360px. Separate them from the activity cards with a horizontal rule; use quiet solid borders and a surface fill rather than the stronger theme gradient borders. Backup/file controls belong on My progress, without repeated blocks below home or activities.

## Footer

Centre footer links and include a concise FAQ.

## Responsive breakpoints

The new header/home layouts use the Maths viewport scale: 440, 768 and 1024px, with narrow rules below each threshold. Site-wide consolidation is deferred to framework migration; existing puzzle/question constraints are not mechanically replaced. Maths also has specialised 678/1150px viewport and 650/780px container thresholds, which should only be adopted where the corresponding layout needs them.

## Narrow question pages

At viewport widths **up to and including 440px**, single-column question cards, the set toolbar and result banner extend to the viewport edges. Remove left/right borders and corner rounding; retain top/bottom borders. Gradient borders run left to right so both colours remain visible along those edges. Keep text and controls padded, with the denser puzzle padding preserved. Other page controls retain side insets. This rule does not widen home cards or multi-column progress cards.
