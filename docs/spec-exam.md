# Exam practice specification

Status: draft; shared behaviour is in [spec-common.md](spec-common.md).

## Requirements

- Three questions per set; 15–22 marks total; each part worth 1–3 marks.
- At least two variations per question. Vary meaningful scenarios, values or correct answers; avoid cosmetic synonym rotation.
- Single words or short sentences for text responses. Prefer explicit response slots over a paragraph requesting several points.
- Use name, identify and describe tasks and selected linked justifications. CA2 may include choosing test inputs and predicting results.
- Tag parts with curriculum references and assessable-element IDs. Full-bank coverage targets Core CA1–CA8, not Occupational Specialism content.

**Proposal:** retain the explicit 1–3 mark part limit despite the later reference to 1–4-point source questions. Adapt a four-mark source pattern into smaller parts if appropriate.

**Proposal:** selectable focus is normally a subsection such as `CA2.4`; show precise references such as `CA2.4.1` on questions. Permit broader CA groupings where a subsection cannot support a useful three-question set. The catalogue declares each grouping rather than deciding it at runtime.

## Sources and coverage

Use [spec.md](../../agents/spec.md) and the [Paper 1](../../agents/SAM/mark_scheme_paper1.md) and [Paper 2](../../agents/SAM/mark_scheme_paper2.md) specimen mark schemes to calibrate command words and marking points. The SAM materials are specimen assessments; do not label them as past live papers. Write original items.

The teacher confirmed on 13 September 2026 that the curriculum content is version 1.1; older version labels in spec.md are stale. Use version 1.1 as the source baseline. Correct extraction errors in a separate coverage inventory, preserving the original source.

Create `coverage-map.csv` with columns: `element_id`, `ca_ref`, `element_text`, `source_version`, `source_location`, `question_id`, `part_id`, `coverage_kind`, `review_status`. One row maps one assessable element to one question part; unmapped elements have blank question fields. Stable element IDs distinguish nested bullets, for example `CA2.4.1/modulus`.

Separate `topic` coverage from `skill` coverage. A recognition question about debugging does not demonstrate the ability to debug. Report both honestly; the project's coverage-first approach does not imply full exam preparation. Reviewers confirm that every leaf element and any additional parent-level outcome is represented in the inventory.

## Marking

For single words, normalise case and whitespace and use authored synonyms. Spelling tolerance is opt-in per term, bounded and tested against confusing terms. Never use fuzzy matching for numbers, operators or Python identifiers.

For short sentences, define independent marking points, accepted phrases and contradictions. Award a concept once. Do not award a point solely because a keyword occurs within a negated claim. If a concept cannot be checked reliably with a bounded rule, use a choice or structured response instead. Unrecognised wording receives “This answer was not recognised. Check the feedback or compare with the model answer.” It is not described as authoritative human marking.

Linked justifications use an explicit table of valid choice/reason pairs. **Proposal:** award the first choice independently; award a linked reason only for a valid pair. Any error-carried-forward exception must be authored for that item.

## Complete example set: operators

Focus `CA2.4`; 15 marks; estimated 8–10 minutes. Each listed part is worth one mark, keeping all parts within 1–3 marks. Choices and short entries below are the complete assessed responses.

| Question | Parts and correct answers |
| --- | --- |
| EX-OPS-001: packing devices | (a) Name the operator that gives a remainder: modulus, modulo, MOD or `%`. (b) 17 devices packed in boxes of 5: full boxes, `3`. (c) Unpacked devices, `2`. (d) Choose expression for full boxes: `17 // 5`, distractors `17 / 5`, `17 % 5`. (e) Choose why: “Counts complete groups”, distractors “Returns the remainder”, “Rounds to the nearest whole number”. |
| EX-OPS-002: capacity checks | (a) For `count = 12`, evaluate `count < 12`: `False`. (b) Evaluate `count <= 12`: `True`. (c) Choose equality operator: `==`, distractors `=`, `!=`. (d) Evaluate `count != 12`: `False`. (e) Choose operator meaning at least: `>=`, distractors `>`, `<=`. |
| EX-OPS-003: access rules | Given `has_pass = True`, `is_staff = False`: (a) `has_pass and is_staff`: `False`. (b) `has_pass or is_staff`: `True`. (c) `not has_pass`: `False`. (d) Choose operator requiring both conditions: `and`, distractors `or`, `not`. (e) Choose linked reason: “Both conditions must be true”, distractors “One true condition is enough”, “Reverses one condition”. |

EX-OPS-001(e) depends on (d); EX-OPS-003(e) depends on (d). Other parts are independent. Map Q1 to CA2.4.1 and CA2.4.5, Q2 to CA2.4.2 and CA2.4.5, Q3 to CA2.4.3 and CA2.4.5. Individual element mappings are still required before publication.

Second variations, using the same explicit prompt structure:

- Q1: 23 devices, boxes of 4; answers modulus, `5`, `3`, `23 // 4`, “Counts complete groups”. Update all expression choices to 23 and 4.
- Q2: `count = 8`, compare against 10; answers `True`, `True`, `==`, `True`, `>=`.
- Q3: `has_pass = False`, `is_staff = True`; answers `False`, `True`, `True`, `and`, “Both conditions must be true”.

Hints: Q1 “Separate complete boxes from devices left over”; Q2 “Check whether equality is included”; Q3 “For and, check both values”. Feedback examples: `3.4` for Q1(b) earns zero: “Count only complete boxes”; choosing `=` in Q2(c) earns zero: “= assigns a value; == compares values”. Reveal provides the table answers with these operator explanations. Pilot the duration rather than inferring time from marks alone.

## Acceptance

Validate two or more variations, all mark totals, all option IDs, dependencies and coverage references. Each text rule has accepted, rejected, near-spelling and contradiction examples. Each variation receives subject review. A coverage report lists missing elements and does not count unreviewed drafts as complete.
