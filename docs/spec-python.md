# Python challenge specification

Status: draft; shared behaviour is in [spec-common.md](spec-common.md).

## Scope

Requirements moved from AGENTS.md on 7 October 2026 retain their original status; moving them into a document containing drafts does not make them proposals. Later explicitly adopted decisions and the exceptions identified below still apply.

These should focus on reinforcing understanding of basic syntax, data types, control structures, and functions. Challenges should include:

- Completing partially written code snippets
- Debugging code with intentional errors, both syntax and logic errors
- Writing small functions to solve specific problems
- Predicting the output of given code snippets, either per loop (multiple inputs for students to fill in) and/or final value(s).
- Tracing the value of variables through a code snippet, with students filling in the values at each step.
- Testing code style knowledge (e.g. 'find 3 reasons why this code is not PEP8')

Code length should generally not exceed 12 lines (not including comments or blank lines). Each challenge should have a clear, concise problem statement.

Code complexity should extend up to basic sorting and searching algorithms. Code style should be PEP8 (unless the question is to test student knowledge by identifying style issues)

Automatic feedback should include hints and explanations for common mistakes, as well as the correct answer if student opts to view it, otherwise giving the student a chance to try again.

Code challenge questions should be presented in sets of 2, each testing a different aspect of basic python programming knowledge, with a total mark value for both questions in the range 10-15.

For Python programming challenges, question focus would be tags such as 'iteration', 'selection', 'boolean expressions', 'operators', 'syntax', 'logic', 'program tracing', 'typos', 'functions', 'data types', 'input/output', 'algorithms' etc. For each question focus, there should be at least 6 completely different questions, each with their own permutations.

Each question must have at least five variations, as required by the [shared variation requirements](spec-common.md#question-permutations-and-question-sets). The formats above describe the full brief; later execution support remains staged delivery, not removal of function-writing, syntax/logic debugging or other formats. The [shared marking lifecycle](spec-common.md#marking-and-attempts) governs when checking/reveal becomes available and when a fresh retry is required.

Keep static snippets visible without horizontal scrolling, particularly when students must complete several blanks or substitutions. Live code editors instead preserve authored lines and support horizontal scrolling, using 14px text by default and 12.5px at <=440px (adopted 20 October 2026). Insert valid Python line breaks at natural boundaries (for example, within parenthesised calls); aim for lines of about 64 characters. Preserve indentation. Static snippets use responsive soft wrapping at narrow widths or high zoom; do not shrink them to fit. Live editors use the specified responsive font sizes without soft wrapping.

Use familiar syntax for incidental setup. Represent arrays with ordinary Python lists for indexing, `len`, updates and algorithm examples; do not require the `array` module or type codes. Keep the conceptual array/list distinction where it is assessed: Python lists do not enforce a single element type. Use ordinary file operations and explicitly supplied file contents, rather than exposing `StringIO` setup. Ask for a value’s data type directly rather than requiring `type(...).__name__`. Prefer explicit steps to compressed swaps, conditional expressions or Boolean shortcuts when those constructs are not the learning objective. Clearly label deliberately retained extension topics.

Source evidence: Core CA2.3.1–2.3.4 and Appendix 2; SAM Paper 1 Q15(a), Figure 11, uses list literals for collections described as arrays. Its mark scheme assesses indexing, length, copying and iteration, not library construction. Q12(b–d) calibrates short code completion, tracing and boundary reasoning. These support the teaching convention without claiming arrays and Python lists are identical in every language or implementation.

**Original v1 proposal:** token completion, token replacement, multiple choice, output prediction, trace tables and selected style issues. Free-form function writing and code execution were deferred. The adopted live-coding pilot below is the next delivery stage; existing bounded questions remain supported.

Topic tags include iteration, selection, functions, data types, operators, Boolean expressions, input/output and algorithms. Format tags include completion, debugging, prediction, tracing and style. A set focused on iteration can pair tracing with debugging. Secondary tags allow overlap without treating every tag as a separate minimum-size bank.

**Adopted target — 7 October 2026:** at least six distinct Python questions per primary Python practice focus. This supersedes the earlier three-question minimum. Count distinct question templates, not their permutations. Each template must still have at least five variations. Other tags can remain searchable secondary tags; this clarification does not require every secondary tag to become a separate selectable focus. The six-question target is not yet met across the bank; expansion is on the [project todo list](planned-work.md).

## Marking rules

Token entries are compared against explicit accepted alternatives after permitted whitespace normalisation. Preserve case where Python requires it. Never suggest that a token comparison validates arbitrary Python code.

Output responses declare whether quotes, whitespace and numeric equivalents are accepted. Trace cells have explicit expected values; each assessed cell is marked independently unless a documented dependency applies. Avoid awarding the same fact twice.

Apply [shared authoring rules](content-authoring.md). Ordinary snippets must be syntactically valid; label deliberate errors as repair tasks.

## Complete example set: iteration

Two questions; 12 marks; estimated 8–10 minutes. Both carry `iteration`; Q1 format is tracing, Q2 debugging.

### PY-ITER-001: trace an accumulator (6 marks)

Prompt: “A monitor adds readings to a running total. Enter the total after each loop iteration, the number of iterations and the printed value.”

```python
total = 0
for reading in [2, 4, 1, 3]:
    total += reading
print(total)
```

Four trace cells, iteration count and final output are worth one mark each. Answers: `2, 6, 7, 10`; `4`; `10`.

| Variation | Initial total | Readings | Trace totals | Iterations | Output |
| --- | --- | --- | --- | --- | --- |
| V01 | 0 | 2, 4, 1, 3 | 2, 6, 7, 10 | 4 | 10 |
| V02 | 1 | 3, 2, 5, 1 | 4, 6, 11, 12 | 4 | 12 |
| V03 | 0 | 5, 1, 2, 4 | 5, 6, 8, 12 | 4 | 12 |
| V04 | 2 | 1, 3, 2, 5 | 3, 6, 8, 13 | 4 | 13 |
| V05 | 0 | 4, 2, 3, 2 | 4, 6, 9, 11 | 4 | 11 |

Hint: “Carry the previous total into the next iteration.” If a student copies individual readings into cells, feedback says “The total keeps earlier readings; add this reading to the previous total.” Reveal uses the corresponding row and explains accumulation.

### PY-ITER-002: fix a countdown (6 marks)

Prompt: “The display should print 3, 2, 1, then Go. Choose the replacement operator, give the corrected output and explain the error.”

```python
remaining = 3
while remaining > 0:
    print(remaining)
    remaining += 1
print("Go")
```

Parts: replacement operator from `-=`, `*=`, `==` (1); three printed numbers in order (3, one each); final printed text (1); reason from “The value increases, so the condition stays true”, “The print command stops the loop”, “The value is text” (1). Correct responses: `-=`, `3, 2, 1`, `Go`, first reason. Strip optional surrounding quotes only from the output-text answer.

| Variation | Initial value | Condition | Faulty update | Correct update | Correct numeric output | Final text |
| --- | --- | --- | --- | --- | --- | --- |
| V01 | 3 | `> 0` | `+= 1` | `-= 1` | 3, 2, 1 | Go |
| V02 | 6 | `> 0` | `+= 2` | `-= 2` | 6, 4, 2 | Ready |
| V03 | 9 | `> 0` | `+= 3` | `-= 3` | 9, 6, 3 | Start |
| V04 | 4 | `> 1` | `+= 1` | `-= 1` | 4, 3, 2 | Done |
| V05 | 8 | `> 2` | `+= 2` | `-= 2` | 8, 6, 4 | Run |

Update the prompt's expected countdown and code for each variation. Hint: “The value must move towards making the condition false.” Choosing `*=` earns zero for the operator: “Multiplying by this step does not produce the requested countdown.” Reveal shows the corrected snippet and explains why the loop terminates.

### Third template required before this focus ships

PY-ITER-003: complete a for-loop that prints four consecutive ticket numbers; one mark for each of `range`, start argument and exclusive stop argument, plus three marks for choosing the output, iteration count and reason that stop is excluded. Five variations start at 1, 5, 10, 20 and 30, each stopping four above its start. The source bank must expand the full prompts, options, answers, hints and feedback before publication. It can pair with either template above for a 12-mark set.

## Live-coding pilot — adopted direction, 20 October 2026

PyScript is used by the [local trial](../prototypes/pyscript/README.md), production questions in `data/python-live.js`, the 240 bounded completion/repair variations adapted by `data/python-editor.js`, and all 18 ESP Task 2 investigations. These share the editor/runtime and attempt service. Focused reference and production Chrome checks pass; classroom acceptance, college Edge/Windows and cold-cache costs remain outstanding.

- Each question declares its default editing mode and permitted modes: replacement choices, editing marked regions or editing all code. Match the scaffolding to the question's challenge and learning purpose. Questions need not offer every mode or a mode switch.
- The teacher's 20 October refinement reuses the existing practice challenge levels: Beginner, Foundation, Standard and Stretch, with Mixed challenge for a mixture. The level informs the default mode and availability of replacement choices when choices are not the question's only mode. Beginner favours replacement choices; Foundation favours editing marked regions; Standard/Stretch favour less scaffolding where the question supports it. Do not manufacture unsupported modes or equate removing controls with a harder coding task. The partial production integration includes a mode mapping in `js/live-python.js`; its behaviour and preservation of edits still need review against these requirements.
- Question hints may offer replacement choices, then return to the question's configured default mode when hidden. Preserve the student's code and keep hint use recorded after hiding. The exact level-by-question mapping and the response when manual edits prevent safe substitution still need review; do not reset edits automatically. Execution permissions remain a separate setting.
- Each question declares its actions: Run code, Check code, or both. Run exposes execution output for exploration. Check executes question-owned tests against the student's code and reports the result; a fragment may be inserted into an authored test wrapper. Passing those tests is evidence against the stated requirements, not proof of arbitrary program correctness.
- Execution access is configurable at question/set level. Learning activities may allow execution and checking before submission. Assessment or exam-readiness activities may withhold both until submission. A set-level assessment restriction applies to every question; an individual question may restrict access further. Do not infer this policy from a timer or difficulty alone.
- Supported set designs include a first practice question followed by assessment questions, all questions for practice, and all questions assessed. The teacher requested an interactive draft to compare these configurations before approving the pilot content; [the local pair preview](../prototypes/pyscript/README.md#programming-pair-for-teacher-review--20-october-2026) supplies it without writing student progress.
- Enforce the effective policy for buttons, keyboard shortcuts and execution commands. Withholding execution means withholding outputs and test feedback as well as hiding the buttons. Submission locks the exact source being assessed; changing it requires a fresh attempt. Other question types retain the shared review rules.
- Preserve configured modes and execution access with the activity, saved attempt and shared-code identity. The precise pilot configuration, marking breakdown and progress treatment of permitted learning checks remain to be agreed in the requirements review.

Use the trial's evidence for supported syntax, supplied inputs and timeout/cancellation; college network access, first-load costs and broader accessibility still need validation. Run student code in a terminable worker, isolate runs and bound output. Test behaviour with normal, boundary and invalid inputs where relevant; assess requested constructs and style separately. Do not rely on literal model-answer equality. Keep authored code concise. Static snippets retain responsive wrapping; live editors follow the adopted horizontal-scrolling and font-size rules above.

Cover linear and binary search and bubble, insertion and merge sort through appropriate short snippets, tracing and completion. Use fragments for algorithms that cannot fit the line guidance clearly. Any exception to the line limit must have an authoring rationale.

### Prediction before execution — agreed 20 October 2026

Use prediction-first execution selectively for questions where predicting behaviour has learning value. Require complete initial prediction responses before enabling Run, not correct responses. Capture responses and exact code when **Run and compare** is chosen; do not add a separate Save predictions button. If a new pre-run prediction is incorrect, pause before execution with a non-revealing prompt to trace the code again. Allow revision or choosing **Run and compare** again to continue without forcing correct guesses. Correct initial predictions proceed directly to execution. Apply the same capture and rethink flow to keyboard execution. Preserve successive predictions and distinguish revisions after execution. Changed code requires predictions for that code before another run. ESP Task 2 actual-result questions keep their run-and-record workflow.

## Acceptance

Apply the [refinement checklist](content-refinement.md). Check at least five variations per template, six distinct templates per selectable primary focus, reference trace/output agreement, and pairs testing different aspects totalling 10–15 marks. Six is the adopted expansion target; the existing runtime validator still enforces the former three-template floor until the planned content expansion and validator update are delivered.

## Expanded supported bank (20 September 2026)

At this 20 September milestone, the bank contained **63 distinct programming challenges, each with five variations**. This is a historical snapshot; see [the October additions](#coding-topic-guides-and-sequence-expansion--13-october-2026) for current counts. All remain within the supported bounded interactions: token/expression completion, specified repairs, short output fields, traces and multiple choice. Each template has six marks; selection pairs different formats for twelve marks, excluding same-format pairs even when a focus has more than three templates.

| Core scope | Programming coverage |
| --- | --- |
| CA2.1–2.2 | Conversion, numeric and Boolean types, constants, local scope and returned values |
| CA2.3 | Lists (also used to represent arrays), nested lists, dictionaries, tuples, aliasing and copies |
| CA2.4 | Arithmetic, precedence, floor division/remainders, augmented assignment, relational and Boolean expressions, short circuiting |
| CA2.5 | Input-like text conversion, string formatting, reading/writing ordinary text files with supplied contents |
| CA2.6 | Sequence, if/elif/else, match/case and guards, for/while loops, nested loops, break/continue and sentinels |
| CA2.7 | Parameters, calls, return versus print, scope, composition, built-in functions and in-place procedures |
| CA2.8–2.10 | Presence, length/type/range/format constraints, check-digit generation and its limitations, boundary errors, exceptions, readable naming/layout and defensive empty-input handling |
| CA2.11 | Linear/binary search; bubble-sort pass, insertion step, merge step and in-place versus copied sorting |
| CA2.12 | Normal, empty, boundary and erroneous cases; assertion outcomes and exposing faulty comparisons |
| Beyond Core | Sets, comprehensions, enumerate, identity, slicing and a small recursive base-case trace |

This is breadth across the programming sections, not certification of every assessable Core element. Full independent program development is not assessed by the programming bank. The linked exam inventory separately records direct knowledge coverage and supporting practice for broader skills. File examples use ordinary open/read/write/close operations. At this milestone, offline checks created temporary fixture files and the student application did not execute Python or access files. Later live-code support is described above.

`data/coverage/python-reference.json` stores offline reference programs for the 42-template expansion; it is not imported by the student application. The tests execute these programs and compare all predicted fields. The original challenges retain their reference tests. Additional list-based array and match/case tasks are short authored fragments. The October readability pass preserved those 63 question IDs and their five variation positions; file and array refinements replace the previous versions in place. These bounded code answers compare tokens, including method-access dots, and preserve case/string content; they do not execute student input.

## Near-term plan: answers embedded in code

**Adopted and implemented — 20 October 2026.** Adapt suitable completion and repair questions to the shared code editor. Put variable initialisers or values to change in the code itself. Missing keywords, operators, values and function names use highlighted empty regions, not `___` placeholders. Reword instructions to ask students to complete the code in the editor.

Retain separate reasoning parts where they have genuine learning value. If a prompt or its choices reveal another answer, adapt the reasoning question rather than removing it. For Print the tickets, put the START and STOP assignments and missing function name in the editor; retain useful output, iteration and boundary reasoning. Review every variation for leakage and preserve existing assessment identities where the assessed task is unchanged.

- Bind each embedded field to its existing part ID, marks, answer rules, hints and feedback; avoid a second competing answer field below the code.
- Use authored line breaks and preserve Python indentation, readable text size and clear gap boundaries. Static snippets wrap responsively; live editors scroll horizontally using the specified font sizes.
- Give each field an accessible label identifying its gap and purpose; maintain logical keyboard order and visible focus. Checking, retry, reveal and read-only submitted states must work in context.
- Preserve unfinished answers on rerender, reload and profile switches, using the existing answer storage.
- Pilot a single-gap and a multiple-gap question before migrating the rest; verify desktop, narrow-screen and high-zoom layouts, keyboard use, marking and saved-answer restoration.

Use the existing shared editor/runtime and question-owned execution permissions. Embedded responses and separate reasoning parts must coexist in the same question. Shared sizing and resize controls follow the [editor presentation requirements](style-guide.md#code-editor-presentation).


### Adopted adaptation batch and marking — 20 October 2026

The 24 Complete the code and 24 Fix the code templates, each with five variations, now use in-editor completion/repair. Separate tracing and prediction formats remain where editing adds no value. All 240 completed models compile and preserve independently authored printed answers. Existing source calibration remains applicable to unchanged concepts; classroom subject acceptance remains outstanding.

For Print the tickets, keep six marks: function name, START initialiser and STOP initialiser are completed in the editor for one mark each; last ticket, iteration count and the stop-boundary reason remain separate one-mark parts. Keep the approved boundary-reason question. Use the existing part identities and marking rules for bounded answers; free-code assessment must use stated behavioural/construct requirements rather than pretending a token match validates arbitrary code.

Reword later prompts that supply the missing expression. For example, Evaluate precedence currently asks for the first printed value while displaying `a + b * 2`, which is the code answer: ask for the first printed value without supplying that expression. Retain meaningful output/type/reasoning parts and review their wording against the question's permitted Run/Check access. Names/marks/variation positions stay stable where the assessed task is unchanged; altered assessment contracts need distinct part identities and explicit saved-answer compatibility.

Indentation repairs need an editable line/block rather than an artificial empty token. File-operation examples need declared initial file fixtures inside the Python runtime and isolated case setup; do not depend on a previous run's file contents. Execution availability remains question/set-controlled. The Task 2 run-before-submission decision does not automatically change every bounded prediction question's assessment policy.


## Primary-focus minimum audit — 7 October 2026

At the time of the three-question minimum audit, the active Python bank met that former minimum for **all 20 selectable primary focuses**: 63 distinct question templates, each with five variations (315 variations total). Selection has six templates; each other focus has three. Retired templates are excluded, and variations are not counted as separate questions.

| Primary focus | Distinct questions |
| --- | --- |
| iteration | 3 |
| selection | 6 |
| functions | 3 |
| algorithms | 3 |
| operators | 3 |
| data types | 3 |
| strings | 3 |
| lists | 3 |
| records | 3 |
| boolean logic | 3 |
| nested iteration | 3 |
| input output | 3 |
| robust code | 3 |
| testing | 3 |
| sorting | 3 |
| design | 3 |
| collections | 3 |
| code style | 3 |
| arrays | 3 |
| validation | 3 |

Evidence: imported the current `banks[2]` and `focuses(2)` from `js/bank.js`; grouped non-retired templates by `focus` and counted unique question slots. Checked all templates have at least five variations and that `choose(2, focus)` produces a two-question set for every focus. Each focus currently offers three distinct exercise formats. The existing `validateBank()` check already rejects a Python primary focus with fewer than three active templates. This establishes the numeric/template target and available set selection, not teacher approval or a new pedagogical audit of every question.


### Gap against the new six-question target

The table above records the 7 October baseline. Following the 13 October expansion, selection, algorithms and sorting meet six, and lists has seven. The other 16 focuses each need three templates: **48 templates / at least 240 additional variations**, producing at least **121 templates / 605 variations** with the existing 20 focuses. New questions must assess different tasks or reasoning, not merely rename scenarios or split existing permutations into separate slots. The backlog task includes the matching validation change; this documentation update does not add content or change runtime selection.

## Coding topic guides and sequence expansion — 13 October 2026

The current bank has 73 templates / 365 variations. [The review](reviews/2026-10-13-python-sequences.md) records ten new search/sort/list tasks, 55 refined hints, source calibration, verification and remaining gaps. These are Coding practice additions only; the Core exam and ESP banks are unchanged.

Each Python focus has a concise optional introduction with two or three short Python examples. Guides use native disclosures, initially closed, and appear only for the current questions. Search/sort share one guide with two diagrams. The teacher’s later 13 October decision makes these general introductions unassisted: opening them does not flag hints or reduce independent progress credit. Question-specific hints retain their existing assistance rules. Disclosure state survives reload; reading after submission does not change the recorded attempt. Existing historical assistance records are not rewritten. These supplementary guides are outside question fingerprints.

The programming focus formerly displayed as Records is now **Dictionaries**. Keep the internal `records` identifier for saved progress and code compatibility. This is a display-label change; existing assessment content, including its related tuple-record exercise, retains its identity.

A link below Submit set answers opens the separate Python project ideas page (`#projects`). The navigation menu also links there. It contains 18 independent briefs: the original ten terminal projects plus a Victorian insult generator, a quirky rule-based chatbot, two Turtle projects, two Arcade games and two pandas/matplotlib investigations. Each includes a core task, relevant topics and a stretch feature. Projects run over several sessions in the student's Python editor, are not automatically assessed, and do not change progress. Working, readable code matters more than the suggested 100–500-line scale.

Each project has an initially closed Getting started disclosure with planning pointers, recommended modules (or none required), and a challenge rating with a short reason. Ratings apply to the core task before stretch features: Easy uses the basic Python knowledge expected for a T-Level pass; Medium requires confidence combining those basics; Harder requires more learning and design thought, more complex data or interacting parts, and possibly multiple Python files. These describe project complexity, not awarded grades. They are separate from the practice challenge setting above.

Tool references checked on 13 October 2026: [Turtle](https://docs.python.org/3/library/turtle.html), [Arcade](https://api.arcade.academy/en/stable/), [pandas tutorials](https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html) and [matplotlib quick start](https://matplotlib.org/stable/users/explain/quick_start.html). Turtle needs Tk support; the other libraries need installation in the student's Python environment. These are original independent project ideas, not new exam questions or a change to ESP assessment coverage.
