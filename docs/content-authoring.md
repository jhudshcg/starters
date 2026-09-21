# Content authoring rules

Shared rules for all question types; type-specific limits remain in [exam](spec-exam.md), [Python](spec-python.md) and [puzzles](spec-puzzles.md). Use the [refinement checklist](content-refinement.md) for changes.

## Grounding and wording

Use Core [specification 1.1](../../agents/spec.md) despite stale 1.0 labels; never edit reference materials. Calibrate original items against specimen [Paper 1](../../agents/SAM/paper1.md), [its mark scheme](../../agents/SAM/mark_scheme_paper1.md), [Paper 2](../../agents/SAM/paper2.md) and [its mark scheme](../../agents/SAM/mark_scheme_paper2.md): content, challenge, wording, command words and marking points.

Record the assessed reference and, for new or materially revised assessment, a relevant SAM paper/question and why its command word, marks and demand fit. Batches may share evidence; record exceptions. Puzzle reasoning need not have a curriculum link. Source inventories retain attribution/review limits.

For coverage expansion, compare existing questions at the same assessable element and CAx.y.z focus. Record the gap and the different angle the addition tests: application, representation, misconception, boundary case or linked reason. Keep it clearly exam-style, grounded in the exact specification requirement and calibrated to SAM demand/marks. A different scenario alone does not establish a distinct question. A different angle must still fit the intended short-answer demand and specification scope. Use SAM to calibrate difficulty, including where existing questions are too easy.

Use British English, direct command words and consistent technical terms: **type**, **focus**, **question**, **part**, **variation**, **set**, **attempt**. State units, rounding and necessary scenario assumptions. Keep short answers bounded. Vary scenarios, values or reasoning, never synonyms merely for variety. Each mark must assess a distinct point; avoid answer-copying padding and implausible distractors. Do not let one part supply another's answer unintentionally.

## Marking

For words, normalise case/whitespace; author synonyms and simple sentence wrappers (“It is an integer.”). Reject contradictory additions. Spelling tolerance is opt-in per term, bounded and tested against confusing terms; never fuzzy-match numbers, operators or Python identifiers.

For lists, credit distinct concepts, not repeated mentions or synonyms. For descriptions, define points, accepted phrases and required links/sequence. Distinguish opposite claims from correct negative statements; “not” alone is not grounds for rejection. Use short, focused responses and selected reasons/structured inputs where relationships need stronger checking. Unrecognised wording receives “This answer was not recognised. Check the feedback or compare with the model answer.”

Linked justifications use an explicit table of valid choice/reason pairs. **Proposal:** award the first choice independently; award a linked reason only for a valid pair. Any error-carried-forward exception must be authored for that item.

## Hints, feedback and reveal

Author a hint explicitly; no generic fallback. Give a relevant starting point, distinction or reasoning step beyond the instruction. Check it against every variation and all neighbouring parts: no stale values, unsupported assumptions, assessed answer or complete solution. Reuse wording only where the same useful reasoning applies; repetition across unrelated tasks requires review, not synonym rotation. A board hint may direct attention to a visible clue or constrained region without supplying the move/value.

Where a task is easily misread, put the caution **only in its hint**, never in the question: symbol name versus geometric shape, identifier versus value, one algorithm pass versus the finished result. For example, a flowchart symbol may be called a decision, while its shape is a diamond. Avoid examples that supply this question's answer. Prompts must still state the task unambiguously; hints must not introduce hidden requirements or contradict accepted answers.

Keep hints separate from prompts. Misconception feedback addresses the submitted error; reveal gives the model answer and explanation (completed code for Python). Hints remain available before submission; checking/reveal and assisted scoring follow [the common lifecycle](spec-common.md#marking-and-attempts). Pilot usefulness with students of differing experience; automated checks cannot establish it.
