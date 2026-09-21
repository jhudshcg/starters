# Style guide

Status: draft design proposal. Shared behaviour is defined in [spec-common.md](spec-common.md).

## Direction

Colourful, calm and age-appropriate. Use clear question cards, generous spacing and short instructions. Avoid childish decoration, competitive speed pressure and animation unrelated to the task. Use the same words for the same controls throughout.

## Shared CSS tokens

Initial palette; validate all actual foreground/background combinations before release.

| Token | Value | Use |
| --- | --- | --- |
| `--page` | `#F5F7FB` | Page background |
| `--surface` | `#FFFFFF` | Cards and input surfaces |
| `--text` | `#172033` | Main text |
| `--muted` | `#475569` | Supporting text |
| `--primary` | `#3730A3` | Main actions, white label |
| `--puzzle` | `#6B21A8` | Puzzle accent |
| `--exam` | `#075985` | Exam accent |
| `--python` | `#065F46` | Programming accent |
| `--success` | `#166534` | Correct-answer text and icon |
| `--error` | `#991B1B` | Error text and icon |
| `--warning` | `#854D0E` | Partial-answer and timer text |
| `--border` | `#64748B` | Control boundaries |

Use type accents sparingly on labels, borders and navigation. Every type and feedback state also has a text label. Do not colour a whole code snippet as an error.

Font stack: system sans-serif for interface and prose; system monospace for code, codes and trace values. Base size `1rem`, line height `1.5`; code at least `1rem`. Use `rem` for spacing and controls. Spacing scale: `0.25`, `0.5`, `0.75`, `1`, `1.5`, `2`, `3rem`. Card radius `0.75rem`; avoid heavy shadows. Prose width about `65ch`, page width at most `72rem`.

## Layout and components

Home: title and short instruction, three type cards, focus selector, prominent code-entry form, progress link. Activity: breadcrumb/back control, heading, prominent copyable code, marks/duration, timer controls, stacked questions and final submit action. Keep answer fields adjacent to their prompts. Progress: filters, revision priorities, chart with table, attempt table, import/export controls.

Use shared components for buttons, labels, inputs, choice groups, question cards, part marks, hints, feedback, code panels, grid controls and progress tables. Primary action is visually stronger than randomisation and answer reveal. Use the exact navigation labels in the common specification.

Small screens and high zoom use one column. Do not set fixed card heights or force question controls into narrow sidebars. Code and genuinely two-dimensional grids may scroll locally; the whole page must not require horizontal scrolling. Keep essential controls outside local scroll regions.

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

Show hint remains directly available. To its right, a native details/summary disclosure labelled “Check / show answer” contains both answer controls and this exact reminder: “try to answer all questions first and submit your best try before checking correct answers”. Keep the disclosure state while checking or revealing an answer.

After submission, show percentage, earned/available marks or points, time and assistance status beside the Submit button as well as at the top. Move focus to the nearby result for a manual submission so the student does not have to scroll back to the top.

The brand subtitle is two lines: “Digital Software Development”, then “T-Level”.

Use warm yellow (#FFE6A0 with #9B7122 borders) for puzzle selections. Yellow indicates a choice, never correctness; green feedback is reserved for marked results. Reference shapes remain purple. Spatial questions use a single clickable coordinate grid containing the given marker, with no duplicate radio-selector grid. Shape tasks show reference shapes beside a clickable answer board. Path tasks number each selected step and identify the current endpoint; they include Undo and Reset. All interactions have keyboard equivalents.
