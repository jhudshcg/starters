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

Keep the whole snippet visible without horizontal scrolling, particularly when students must complete several blanks or substitutions. Insert valid Python line breaks at natural boundaries (for example, within parenthesised calls); aim for lines of about 64 characters. Preserve indentation and use responsive soft wrapping at narrow widths or high zoom. Do not shrink the code text to make it fit.

Use familiar syntax for incidental setup. Represent arrays with ordinary Python lists for indexing, `len`, updates and algorithm examples; do not require the `array` module or type codes. Keep the conceptual array/list distinction where it is assessed: Python lists do not enforce a single element type. Use ordinary file operations and explicitly supplied file contents, rather than exposing `StringIO` setup. Ask for a value’s data type directly rather than requiring `type(...).__name__`. Prefer explicit steps to compressed swaps, conditional expressions or Boolean shortcuts when those constructs are not the learning objective. Clearly label deliberately retained extension topics.

Source evidence: Core CA2.3.1–2.3.4 and Appendix 2; SAM Paper 1 Q15(a), Figure 11, uses list literals for collections described as arrays. Its mark scheme assesses indexing, length, copying and iteration, not library construction. Q12(b–d) calibrates short code completion, tracing and boundary reasoning. These support the teaching convention without claiming arrays and Python lists are identical in every language or implementation.

**Proposal for v1:** token completion, token replacement, multiple choice, output prediction, trace tables and selected style issues. Defer free-form function writing and arbitrary code execution. This is a staged delivery of the full brief, not removal of those formats.

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

## Later execution support

This may include importing Pyscript (although a v1 could keep programming questions to fill in the blank/change the word/symbol/operator and multiple choice).

This is an optional runtime suggestion, not a package requirement or a claim that execution is implemented.

Add free-form completion, debugging and writing small functions only after an execution prototype is validated. Assess candidate browser Python runtimes against supported syntax, startup size, college network availability, timeout/cancellation, memory/output limits and accessible editing. Run student code in a terminable worker and isolate runs. Test behaviour with normal, boundary and invalid inputs; assess requested constructs and style separately. Do not rely on literal model-answer equality.

Cover linear and binary search and bubble, insertion and merge sort through appropriate short snippets, tracing and completion. Use fragments for algorithms that cannot fit the line guidance clearly. Any exception to the line limit must have an authoring rationale.

## Acceptance

Apply the [refinement checklist](content-refinement.md). Check at least five variations per template, six distinct templates per selectable primary focus, reference trace/output agreement, and pairs testing different aspects totalling 10–15 marks. Six is the adopted expansion target; the existing runtime validator still enforces the former three-template floor until the planned content expansion and validator update are delivered.

## Expanded supported bank (20 September 2026)

The bank now contains **63 distinct programming challenges, each with five variations**. All remain within the supported bounded interactions: token/expression completion, specified repairs, short output fields, traces and multiple choice. Each template has six marks; selection pairs different formats for twelve marks, excluding same-format pairs even when a focus has more than three templates.

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

This is breadth across the programming sections, not certification of every assessable Core element. Full independent program development is not assessed by the programming bank. The linked exam inventory separately records direct knowledge coverage and supporting practice for broader skills. File examples use ordinary open/read/write/close operations. Offline checks create temporary fixture files; the student application does not execute Python or access files.

`data/coverage/python-reference.json` stores offline reference programs for the 42-template expansion; it is not imported by the student application. The tests execute these programs and compare all predicted fields. The original challenges retain their reference tests. Additional list-based array and match/case tasks are short authored fragments. The October readability pass keeps all 63 question IDs and their five variation positions; file and array refinements replace the previous versions in place. Code answers compare tokens, including method-access dots, preserve case/string content, and never execute student input.

## Near-term plan: answers embedded in code

Move fill-in-the-blank and substitution inputs into the displayed code, at the relevant gap, so students can read and complete the snippet in one place. This is planned, not implemented in the current renderer.

- Bind each embedded field to its existing part ID, marks, answer rules, hints and feedback; avoid a second competing answer field below the code.
- Keep all code visible using authored line breaks and responsive wrapping. Preserve Python indentation, readable text size and clear gap boundaries.
- Give each field an accessible label identifying its gap and purpose; maintain logical keyboard order and visible focus. Checking, retry, reveal and read-only submitted states must work in context.
- Preserve unfinished answers on rerender, reload and profile switches, using the existing answer storage.
- Pilot a single-gap and a multiple-gap question before migrating the rest; verify desktop, narrow-screen and high-zoom layouts, keyboard use, marking and saved-answer restoration.

Implement this as a separate renderer slice; it does not require free-form Python execution.


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

The counts above remain the current baseline. Selection already meets six; the other 19 primary focuses each need three additional distinct templates. Total addition: **57 templates**, each with at least five variations (**at least 285 additional variations**). Meeting the target with the existing 20 focuses would produce at least **120 templates / 600 variations**. New questions must assess different tasks or reasoning, not merely rename scenarios or split existing permutations into separate slots. The backlog task includes the matching validation change; this documentation update does not add content or change runtime selection.
