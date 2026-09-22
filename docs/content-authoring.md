# Content authoring rules

Shared rules for all question types; type-specific limits remain in [exam](spec-exam.md), [Python](spec-python.md) and [puzzles](spec-puzzles.md). Use the [refinement checklist](content-refinement.md) for changes.

## Grounding and wording

Use Core [specification 1.1](../../agents/spec.md) despite stale 1.0 labels; never edit reference materials. Calibrate original items against specimen [Paper 1](../../agents/SAM/paper1.md), [its mark scheme](../../agents/SAM/mark_scheme_paper1.md), [Paper 2](../../agents/SAM/paper2.md) and [its mark scheme](../../agents/SAM/mark_scheme_paper2.md): content, challenge, wording, command words and marking points.

Record the assessed reference and, for new or materially revised assessment, a relevant SAM paper/question and why its command word, marks and demand fit. Batches may share evidence; record exceptions. Puzzle reasoning need not have a curriculum link. Source inventories retain attribution/review limits.

For coverage expansion, compare existing questions at the same assessable element and CAx.y.z focus. Record the gap and the different angle the addition tests: application, representation, misconception, boundary case or linked reason. Keep it clearly exam-style, grounded in the exact specification requirement and calibrated to SAM demand/marks. A different scenario alone does not establish a distinct question. A different angle must still fit the intended short-answer demand and specification scope. Use SAM to calibrate difficulty, including where existing questions are too easy.

Use British English, direct command words and consistent technical terms: **type**, **focus**, **question**, **part**, **variation**, **set**, **attempt**. State units, rounding and necessary scenario assumptions. Keep short answers bounded. Vary scenarios, values or reasoning, never synonyms merely for variety. Each mark must assess a distinct point; avoid answer-copying padding and implausible distractors. Do not let one part supply another's answer unintentionally.

## Marking

For words, normalise case/whitespace; author synonyms and simple sentence wrappers (“It is an integer.”). Reject contradictory additions. Spelling tolerance is opt-in per term, bounded and tested against confusing terms; never fuzzy-match numbers, operators or Python identifiers.

Conceptual text parts may use `termRules: [{terms: ['top-down', 'top down'], qualifiers: ['design', 'approach', 'method']}]`. By default, match the entire normalised answer against exactly one listed term, optionally followed by one qualifier from that same group. The prefix/alternative policy below adds explicit opt-in tolerance. A term or qualifier can be a phrase; do not strip arbitrary words or accept substring matches. Multiple groups can link different qualifiers to different synonyms. Existing `accepted` answers remain exact alternatives for irregular wording. Rules apply only to free-text, case-insensitive concept answers, never choices, code, identifiers or literal outputs.

Include common technical synonyms where they fit the particular question, without inventing synonyms to meet a count. For example, a data-type question can accept `float`, `floating point`, `floating-point` and `real`, while a Python conversion-function question still requires `float` or its explicitly accepted call notation. Qualifiers must preserve the concept; do not make essential objects optional (for example, `gather` alone does not identify the information-gathering step). Check both variations and neighbouring parts. Add just enough category context to prompts without supplying another part's answer.

The exam bank's [term rules](../data/exam-term-rules.js) explicitly assign groups to permanent `slot:part[:variation]` addresses. Omitting the variation applies to both versions. Expected-answer guards fail if an assignment becomes stale. Keep those opt-ins beside the shared vocabulary, and review them when changing a question. Compiled rules are sealed with the marking data and included in compatibility fingerprints. Test accepted combinations, unrelated qualifiers, multiple terms/qualifiers, near spellings and contradictory additions.

For lists, credit distinct concepts, not repeated mentions or synonyms. For descriptions, define points, accepted phrases and required links/sequence. Distinguish opposite claims from correct negative statements; “not” alone is not grounds for rejection. Use short, focused responses and selected reasons/structured inputs where relationships need stronger checking. Unrecognised wording receives “This answer was not recognised. Check the feedback or compare with the model answer.”

Linked justifications use an explicit table of valid choice/reason pairs. **Proposal:** award the first choice independently; award a linked reason only for a valid pair. Any error-carried-forward exception must be authored for that item.

## Hints, feedback and reveal

Author a hint explicitly; no generic fallback. Give a relevant starting point, distinction or reasoning step beyond the instruction. Check it against every variation and all neighbouring parts: no stale values, unsupported assumptions, assessed answer or complete solution. Reuse wording only where the same useful reasoning applies; repetition across unrelated tasks requires review, not synonym rotation. A board hint may direct attention to a visible clue or constrained region without supplying the move/value.

Where a task is easily misread, put the caution **only in its hint**, never in the question: symbol name versus geometric shape, identifier versus value, one algorithm pass versus the finished result. For example, a flowchart symbol may be called a decision, while its shape is a diamond. Avoid examples that supply this question's answer. Prompts must still state the task unambiguously; hints must not introduce hidden requirements or contradict accepted answers.

Keep hints separate from prompts. Misconception feedback addresses the submitted error; reveal gives the model answer and explanation (completed code for Python). Hints remain available before submission; checking/reveal and assisted scoring follow [the common lifecycle](spec-common.md#marking-and-attempts). Pilot usefulness with students of differing experience; automated checks cannot establish it.

### Descriptive prefixes and alternative names

Concept term groups can opt into `prefixWords: 3`: allow up to three whitespace-separated prefix words before the complete term (and its permitted optional suffix). The exam groups use this tolerant policy; omit the property or set it to zero for strict questions. Block negation (including non-/non, neither/nor, without and contracted not), contrast and combined-answer constructions in prefixes. Do not infer semantic correctness of every descriptive adjective. Exact authored phrases, including correct negative statements, remain valid.

For a response using standalone `or`, every non-empty operand must independently match the question's accepted answers or term rules. Thus `float or real` passes, but `integer or float` fails. Authored atomic phrases such as `start or end` remain explicit alternatives. Prefix tolerance applies only to opted-in conceptual terms, never Python keywords, identifiers or literal outputs.
