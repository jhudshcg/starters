# Python challenge specification

Status: draft; shared behaviour is in [spec-common.md](spec-common.md).

## Scope

Two questions per set, testing different aspects, totalling 10–15 marks. Each focus has at least three distinct question templates, each with at least five variations. Code generally has no more than 12 nonblank, noncomment lines. Use readable PEP8 style except in deliberate style questions.

**Proposal for v1:** token completion, token replacement, multiple choice, output prediction, trace tables and selected style issues. Defer free-form function writing and arbitrary code execution. This is a staged delivery of the full brief, not removal of those formats.

Topic tags include iteration, selection, functions, data types, operators, Boolean expressions, input/output and algorithms. Format tags include completion, debugging, prediction, tracing and style. A set focused on iteration can pair tracing with debugging. Secondary tags allow overlap without treating every tag as a separate minimum-size bank.

**Proposal:** enforce the three-template minimum on selectable primary focuses. Classify other tags as searchable secondary tags until they have enough templates to become selectable focuses.

## Marking rules

Token entries are compared against explicit accepted alternatives after permitted whitespace normalisation. Preserve case where Python requires it. Never suggest that a token comparison validates arbitrary Python code.

Output responses declare whether quotes, whitespace and numeric equivalents are accepted. Trace cells have explicit expected values; each assessed cell is marked independently unless a documented dependency applies. Avoid awarding the same fact twice.

Hints address the concept; misconception feedback addresses the submitted error. Reveal includes the completed code and explanation. Use no syntax errors in ordinary snippets; deliberate errors are labelled as tasks to fix.

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

Add free-form completion, debugging and writing small functions only after an execution prototype is validated. Assess candidate browser Python runtimes against supported syntax, startup size, college network availability, timeout/cancellation, memory/output limits and accessible editing. Run student code in a terminable worker and isolate runs. Test behaviour with normal, boundary and invalid inputs; assess requested constructs and style separately. Do not rely on literal model-answer equality.

Cover linear and binary search and bubble, insertion and merge sort through appropriate short snippets, tracing and completion. Use fragments for algorithms that cannot fit the line guidance clearly. Any exception to the line limit must have an authoring rationale.

## Acceptance

Check five variations per template and three templates per selectable focus. Execute corrected reference snippets during content validation and compare trace/output answers. Never execute deliberately nonterminating examples without a timeout. Check that each pair tests different aspects and totals 10–15 marks. Pilot hints with students of differing experience.
