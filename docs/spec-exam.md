# Exam practice specification

Status: draft; shared behaviour is in [spec-common.md](spec-common.md).

## Requirements

Requirements moved from AGENTS.md on 7 October 2026 retain their original status; moving them into a document containing drafts does not make them proposals. Later explicitly adopted decisions and the exceptions identified below still apply.

Questions should focus on A) for programming related CA, lower point value logic and programming related knowledge questions, including questions involving applying the python operators listed in the spec and B) for all parts of the Core spec, name, state, list and describe lower point value questions, and on questions that link reasons/justications that students must pick to previous answers, to aid slightly deeper understanding of spec content areas. The aim is more towards coverage than question depth.

For text entry questions, the HTML JS should be able to check for key words and phrases, match close spellings or synonyms, and provide informative feedback on the answer. Any text entry should be either single word or short sentence.

Questions should be presented in groups of 3, where each question could have multiple parts, each with a 1-3 mark value. The total mark value for all question parts from all 3 questions should be in the range 15-22.

For spec related questions the question focus is the CA reference.

For CA 2 (programming) related questions, some questions can be more probing, e.g. for a given function description, choose appropriate test types and input values and expected output values.

The bank of spec related questions should completely cover the Core CA spec. Each assessable element must have at least **two distinct questions**, each with at least two permutations for question phrasing, values and correct answers where appropriate. Each question should be tagged with the relevant spec content area and subsection, e.g. CA1.3.2. The two-question minimum is the recorded teacher clarification; variations of one question do not count as two questions.

Add precise assessable-element references to relevant parts; a part may assess more than one element. Full-bank coverage targets Core CA1–CA8, not Occupational Specialism content. Prefer explicit response slots over a paragraph requesting several points; multiple choice should not displace intended short-answer practice.

**Proposal:** selectable focus is normally a subsection such as `CA2.4`; show precise references such as `CA2.4.1` on questions. Permit broader CA groupings where a subsection cannot support a useful three-question set. Declare these groupings in the question bank.

## Sources and coverage

For spec reference, see: [`spec.md`](../../agents/spec.md). For past exam questions and mark schemes for Core paper 1 and paper 2 (covering CA1-CA8), see: [`SAM/`](../../agents/SAM/) folder. Again the focus is on lower point value, simple command word questions (1-4 points).

Use the [exam resource map](exam-resource-map.md) to select only the relevant source extracts.

Apply [shared authoring rules](content-authoring.md), including the specification/SAM source baseline, marking and hint requirements.

Coverage must show whether every assessable Core element has at least two distinct questions, each with at least two variations. The two-question minimum follows the teacher's latest clarification; the older one-question wording is retained only in the [consolidation record](decisions/2026-10-agent-guidance-consolidation.md).

**Implemented: nested JSON inventory and generated reports.** The authoritative inventory is [core-inventory.json](../data/coverage/core-inventory.json). Each official `focus` contains `elements` with permanent local letter keys and explicit requirements. For example, `CA2.1.1[a,b]` identifies integer definition and appropriate use. Letters are identifiers, not list positions: append new keys, retain retired keys, and never reuse a key for a changed requirement.

Question parts carry structured links:

```json
{"coverage": [{"focus": "CA2.1.1", "elements": ["a", "b"]}]}
```

A part may link to several focuses, each listing several subelements. Store links on the variations that actually assess them. Merely mentioning a concept or using it as a distractor does not establish coverage. Constrained exercises that support a broader practical skill use `coverageMode: "practice"`; they do not count as demonstrating that full skill.

Run `npm run coverage` to regenerate [JSON counts](../data/coverage/report.json) and the [readable report](coverage-ca1-ca2.md). Counts are nested beneath each focus and include zero-count elements. Count a distinct question once per element only if at least two variations directly assess it. `live_question_count` includes qualifying practice-bank questions; `question_count` additionally requires `reviewStatus: "approved"`. Supporting practice, drafts and insufficient variations have separate counts. Automated checks do not confer subject approval.

Use the report to find remaining gaps towards the reviewed target. It supersedes the coarse objective inventory/draft report; the 106-question draft remains historical authoring material.

`data/exam.js` imports the CA1 and CA2 content modules. Puzzle and Python banks remain separate. Explicit question slots support the implemented codec, but coverage does not depend on their display order or on a future public question-ID decision. Bank revision 2 replaces the demo contents; old demo-code compatibility is not maintained at the teacher’s request.

## Programming-related example set: operators

Focus `CA2.4`; 15 marks. Each listed part is worth one mark. This example illustrates the programming-related branch of exam practice, not the intended balance across the whole bank. Further sets must demonstrate name, state, list and describe responses. Completion time has not been validated.

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

Apply the [refinement definition of done](content-refinement.md). Coverage needs two distinct reviewed questions per element and two applicable variations per counted question; retain zero-count and insufficient-coverage rows.

## Editorial update — 15 September 2026

Applied the reviewed classroom feedback to 52 parts in both variations, plus concise wording and accepted-answer corrections elsewhere. The print-cost and function-call wording is corrected; the output-name task accepts meaningful authored Python identifiers. Patterns has one numerical prediction, followed by an assumption, a reusable validation rule, changing its limits and filtering irrelevant information. Sorting asks for an actual pass, shifts or next comparison rather than a fully sorted list.

Added selected linked reasons and distinct application tasks, removed implausible distractors, clarified file/loop assumptions, and separated displayed Python code from prose in subprogram questions. Alternative terms, expressions and numeric answers (including valid negative indexing) are tested. Numeric and fraction markers now consult explicit alternatives; identifier matching preserves case. Generic checking feedback does not decode the model explanation; explanation remains available through Show answer after submission.

The existing slots, variation numbers and total marks are retained. Under the subsequently agreed policy, these content edits create revision 3; revision-2 codes continue to open unchanged variations and explicitly reject altered ones. The corrected example set is BoAkAiAg. See README.md for the fingerprint/compatibility workflow. All templates remain pending teacher subject approval. Coverage reports are regenerated from the revised tasks, including removed or practice-only links.

## CA1/CA2 gap expansion (20 September 2026)

`data/exam-expanded.js` adds 26 scenario-based templates, each with two variations, covering all previously uncovered inventory entries. Added questions have five to seven one-mark parts, so three-question sets remain within 15–21 marks. Content includes computational-thinking tradeoffs, decomposition and abstraction, notation and strategy choices, code repairs, algorithm tradeoffs, test-method purposes/benefits/limitations and test data.

The generated report now distinguishes 341 elements with direct live assessment from 28 with supporting practice only. No element remains without either kind of question. The 28 broad skills (such as independently designing an algorithm, developing code or producing a diagram) remain explicitly `coverageMode: 'practice'`: choosing a valid fragment does not establish the complete skill. No content is automatically teacher-approved. Two distinct questions per element remains a later coverage target; two scenario variations are not counted as two questions.

## Whole-question subtopic filtering (20 September 2026)

The exam activity page offers Topic (for example CA1.2) and Subtopic (All subtopics, CA1.2.3, etc.). Subtopic options show the number of distinct matching question templates. They are derived from explicit part-level coverage in the loaded bank, including intermediate references where deeper levels exist; CA2.12.1 includes CA2.12.1.1, but CA1.2.1 does not accidentally match CA1.2.10.

Filtering preserves whole questions, their scenarios, code and linked parts. Choose three distinct templates with as many matches as possible (up to three); if fewer than three match, fill from the same broad topic. Matching parts are visibly labelled, each question states whether it includes the selection or provides related practice, and the set states the matching-question count. Selection never changes marks, coverage attribution or assessment rules.

For CA1.2.3, the expanded bank supplies three matching whole questions. CA1.2.10 supplies two matches plus one related CA1.2 question. Only variations whose displayed parts contain the selected reference qualify as direct matches. New set with this subtopic retains the filter; Get new permutation keeps the templates and qualifying coverage. Changing the broad topic or requesting a different topic resets the subtopic to All. Do not silently drop matching questions to manufacture another combination: disable the new-combination button if none remains, while allowing permutations where available.

The selected subtopic is stored with the active attempt and survives refresh. Cancelling replacement retains the old set and filter. Shared codes continue to encode the exact question slots and variations, not UI filtering preferences. A recipient opens those exact whole questions regardless of local preferences, with All subtopics initially selected; no codec revision or historical code migration is needed.

## Further depth — 21 September 2026

The [expansion review](exam-depth-review.md) records 23 additions, their comparison with existing tasks, SAM calibration, checks and remaining gaps. Counts remain in the generated coverage report. Cautions appear only in hints; original questions are unchanged.


## Planned extended-response practice

The student-requested [scaffolded discuss/evaluate plan](extended-response-plan.md) proposes a separate Core practice format: editable linked point, explanation and scenario-impact cards, plus an evidence-supported judgement for evaluate. This is planned, not implemented. It extends exam technique practice without replacing the short-answer coverage/mark requirements above or inserting longer questions into existing random sets. Useful automatic marking is required for every question, including the substantive reasoning; teacher marking is optional. Bounded recognition must include automatically marked clarification/retry for unrecognised wording, not a review-only completion path. Practice scores must not claim an official exam level; see the plan for source calibration and progress separation.
