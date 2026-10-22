# Task 2 — testing and debugging starter designs

## Adopted live-editor extension — 20 October 2026

Implemented for all 18 investigations on 20 October 2026. The activities cover parts of an ESP Task 2 test plan: students enter their own test data, establish expected outcomes from requirements, run code, record actual outcomes, explain discrepancies, repair code and retest. This supersedes the earlier draft's no-runtime/prediction-only interaction; its requirements, test coverage and assessment safeguards remain where compatible.

- Put two tabs inside the editor only: **Original code**, read-only, and **Your code**, initially an editable copy. The requirements, questions and test plan stay outside the tabs. Switching tabs must preserve edits.
- Allow students to run either version before submission. Original code remains immutable; distinguish its results from runs of Your code. Preserve the shared submission and answer-reveal rules.
- Adapt suitable prediction questions to recorded actual outcomes and explanation. Actual outcome means what an identified run observed, including exceptions, incorrect output or non-termination; it must not be filled from an authored expected answer or an unexecuted prediction. Keep expected outcomes requirement-led. A proposed repair is not a successful retest.
- Retain reasoning questions with genuine learning value. Reword prompts and options that reveal code-completion or repair answers instead of removing useful reasoning.
- Keep the editor visible while scrolling through its associated questions. Use the shared [code-editor sizing and resize requirements](../style-guide.md#code-editor-presentation).

Automatic marking follows the adopted run-record, repair and bounded-reasoning contracts below. This extension does not claim that a short starter establishes independent completion of the full ESP task or an official grade.

## Adopted assessment adaptation — 20 October 2026

Apply the editor workflow to all 18 current investigations in slots 36–38. Preserve the explicit function/input contracts, valid/invalid test groups, working-code example and useful diagnosis/retest reasoning. Current totals range from 6–11 marks per question; retain each total while moving credit to the equivalent test-plan work below. The adaptation is implemented and independently reference-checked; classroom subject acceptance remains outstanding.

| Earlier assessed part | Adopted live-editor assessment |
| --- | --- |
| Test-data choice | Students enter their own values for the valid/invalid groups. Mark suitability, not a match to supplied examples. Each valid text input runs independently; all chosen values must be valid and different. Invalid sequences contain rejected entries followed by a valid recovery entry. Parameter tests obey the caller contract. |
| Expected result | Record the return type/value and number of input entries used before running. Check these against the authored corrected Python reference for the student’s exact inputs. A faulty run is not the expected answer. |
| Predicted result | Replace with an accurately recorded/interpreted actual result from an identified original-code run. Capture raw run evidence automatically, but award the existing mark for the student's accurate outcome response, not for pressing Run. An unrun case cannot earn observation credit. |
| Cause | Retain automatically checkable reasoning about the original code and requirements; reword any options that give away the repair. |
| Correction choice | Apply the correction in Your code and assess the relevant requirement with independent tests. Accept valid alternative implementations. Keep passing-code cases: justified no-change and successful checks must be possible. |
| Next test | Retain meaningful confirmation/regression reasoning and allow the selected follow-up test to be run. Distinguish an intended retest from an observed result. |

Use fresh part identities for changed input/expectation/observation/correction contracts so older dropdown selections cannot silently become recorded observations or implemented repairs. Preserve question identities where the investigation remains the same, update content fingerprints, and explicitly handle old saved drafts and results. Retests identify edited source and exact inputs; earlier original-code evidence remains reviewable. Exhausted supplied inputs, worker timeouts and runtime startup failures need distinct outcomes: an incomplete test or infrastructure failure is not a fabricated successful return.

**Own-test workflow, adopted 20 October:** the marked test plan replaces the fixed supplied-case selector and the separate “Your own test” mode. Input functions use plain-text entries, including empty strings, whitespace and leading zeroes; parameter functions use named fields with typed values. Valid entries are separate executions with one value per input, each with its own expected and actual result. One Run action executes every chosen valid input in order on the selected code version; all expected results must be entered first. Returns, Python exceptions and per-input timeouts must not skip later inputs. Stop, edits or a profile change cancel the remaining runs. Invalid entries remain one ordered sequence. Do not require Python function-call syntax or JSON arrays. Keep labels above full-width fields and group related actions with their test. Each test has explicit Original code and Your code run buttons. Run captures the entered expectation; it does not fill the actual-result answer. Changing inputs invalidates old matching evidence, while older inputs/code and results stay reviewable. Existing mark totals are unchanged: the group's data, expected-result and actual-result marks require all its current inputs to satisfy the respective criterion. The draft preview uses the five ESP test-log columns with one compact row per existing test group (normally valid and invalid), showing independent inputs within each cell, visible dividers and local horizontal scrolling. Saved run evidence remains expandable in the actual-outcome cells.

**21 October header refinement:** Run & test and Ctrl/Cmd + Enter run all current student-configured tests on the visible Original code/Your code tab. Validate every test and expected result before starting; keep each independent input as its own run and invalid-input recovery sequences intact. Continue through returns, exceptions and per-run timeouts; Stop/edits cancel the remaining runs. Individual test-plan buttons still run their selected group. The header action now executes student tests; authored repair checks and test-plan marking remain part of submission. Run evidence does not automatically fill students' recorded outcomes or award marks.

Give valid inputs stable identities so removing one cannot attach its answers or evidence to another. Preserve old single-input responses and runs; old queued multi-input runs do not satisfy the independent-input contract and must be rerun. Completed historical scores remain unchanged. Saved attempts retain per-input outcomes and named run evidence. A worker timeout records an execution limit, with output and input count unavailable; do not invent a Python exception or award recorded-outcome credit for missing evidence.

Automatic outcome credit covers the recorded return type/value or exception and number of entries consumed. Printed output remains visible evidence, and repair checks still verify required output messages; these compact outcome fields do not assess a full prose test-log explanation. Credit for input suitability is separate from fault diagnosis and repair. Working code may pass a student-chosen test without exposing every defect; the independent repair checks cover authored requirements beyond those chosen tests.

For progression, display Run, hints, replacement choices and pre-submission correctness checks separately. Existing tracked-score and revision calculations remain unchanged; independent-readiness redesign is deferred. See the [code-history and evidence rules](../spec-progress.md#code-attempt-review-and-skill-progression--adopted-20-october-2026). Keep automatic scores bounded to the assessed skills; do not infer an official ESP grade or independent readiness from assisted repair success.

## Agreed draft revision — 19 October 2026

The teacher approved the direction in the [improvement brief](task_improvements.md) and the refinements below. This section governs the existing bounded draft, subject to the later live-editor extension above; the earlier recipes and first-release controls below remain reference material where compatible. The draft is implemented in `data/esp-task2.js`; classroom timing and teacher subject review remain pending.

Each revised question centres on concise requirements and a short, readable Python function or block. State the input types, allowed values, return types and any calculation or rounding rules. Students connect test data, expected results, code behaviour, fault cause and correction within the same independent question.

**19 October teacher refinement after reviewing the draft:** the initial tiny functions were too far from the supplied Task 2 code. Use representative function-sized extracts, retaining input prompts, validation flags, nested branches, conversion handlers, retry messages and return paths. Calculation examples should retain meaningful accumulation, intermediate values, conditional rates or summaries. This supersedes the earlier 12-line cap; the revised examples have 13–21 lines. Validation allows up to 30 non-blank, non-comment lines for these Task 2 investigations; ordinary Python challenges retain their existing limit. Do not pad a small expression with unrelated code. Keep one investigation focused on a few supplied tests, and keep the agreed automatic marking and runtime-only faults.

The refinement was checked against the actual Python sources and matched task requirements, reusing the existing assessment/exemplar review. These are original teaching examples, not copies of whole assessment programs:

| Revised examples | Supplied-code calibration |
| --- | --- |
| 36/0, 36/3, 38/1, 38/4 | Glenstar `get_target_weght`, `get_start_weight`, `calc_weightloss_rate_needed`; RBSX `get_check_investment_amount`: conversion inside an input loop, exception paths, bounds, stored/returned types |
| 36/1, 36/4, 38/0, 38/3, 38/5 | RetailX `loyalty_card_check`; RBSX `get_check_client_ID`: validation flags, nested length/character checks, messages and termination |
| 36/2, 38/2 | Glenstar `get_name`: input collection, validation, retry and returned name; whitespace/length rules are original requirements |
| 36/5 | RetailX `get_platform`: displayed menu, string/integer comparisons, branches and returned selection |
| 37/0–4 | RetailX `get_items`, `calculate_points`, `main`; Glenstar calculation functions: accumulated values, per-item conversion, rates, summaries, variable use and scope |
| 37/5 | RBSX `savings_plan`: repeated calculation, loop limits and summary; the original hire-day rule avoids the source's monthly/annual ambiguity |

Sources: the three Task 2 `.py` files under the RBSX SAM, RetailX AdSAM and summer 2026 Glenstar folders in the [resource map](../exam-resource-map.md). Matched requirements: RBSX booklet p4, RetailX pp4–5 and Glenstar p4. The scale, prices and contexts used here are instructional choices. Source syntax faults are excluded under the teacher's runtime-only requirement. Prompts, answer choices, repairs, hints and follow-up tests were revised with each function; supplied entry sequences now assess recovery and early termination as well as returned values.

- Normally use two tests per function, described as `function_name: valid inputs` and `function_name: invalid inputs`. Each test contains an input suite, not one row per prediction example. Test-data columns contain values/sequences and category labels without repeating the function name. Cover normal valid values and valid boundaries; invalid suites may be longer, covering invalid boundaries, other invalid values of the correct type and incorrect types/formats. Use 3–5 inputs per group where the domain permits; do not duplicate values to fill a group with fewer valid possibilities.
- Students select a bounded, labelled input suite for each test. Supplied prediction cases sit within the corresponding test and have separately marked expected/predicted results. The summary displays the student's selected suite, including incorrect selections; it identifies which results cover supplied cases and leaves other inputs pending testing. Calculation functions whose callers guarantee valid arguments have a valid-input test only; state that caller contract rather than inventing validation requirements.
- Automatically mark substantive answers wherever possible, including diagnosis and correction. Prefer bounded choices and clearly specified numeric inputs; do not require teacher assessment of free prose to complete the task.
- Use supplied inputs for code-prediction parts when tracking student-chosen data would complicate reliable automatic marking. Show the exact call or entry sequence. These supplied cases are separate from the student's test-data choices.
- Expected-result dropdowns include a precise result and type/behaviour, plausible incorrect results and vague descriptions. Prediction dropdowns require students to trace the supplied Python, including exceptions or retry behaviour where relevant. Include at least as many incorrect options as correct ones.
- Label a traced answer **Predicted result**. Explain that the exam test log's **Actual outcome** records what happened when the code ran. Do not present a student's prediction as an observed run.
- Ask for the cause and suitable correction separately. Retain confirmation/regression practice and some passing cases. No in-browser Python execution is required for this draft.
- Use neutral question titles and test-linked diagnosis headings such as “Test 1: cause and correction”. Prompts must not name the faulty line, check, variable or error type. Ask what explains the code's behaviour and which correction or next action is appropriate; do not imply every supplied test fails. This applies to all variations, including working code.
- Cover range, length, presence, type and format checks, including natural combinations. Functions may have faults in either or both validation checks and elsewhere in the function. All new snippets must be syntactically valid: faults appear during execution as exceptions, incorrect results or incorrect behaviour. Include variable-name typos and scope errors; use separate tests where an earlier failure masks a later fault.
- Keep requirements and code together, with clearly ordered answer sections and a compact summary using the five test-log columns. Give the code more width on desktop; preserve Python lines and indentation with keyboard-scrollable overflow on narrow screens. Stack requirements, code and labelled summary fields on narrow screens. The summary must preserve the distinction between a prediction and an actual observation.
- Visually separate test-plan stages into labelled, bordered panels: Test data, Expected outcome, Predicted outcome, and Comments and actions. Give predicted outcomes a distinct theme-aware header tint. Keep each test's cause/correction pair together and preserve the original answer order; labels and borders must convey the structure without relying on colour alone.

The first complete draft is recipe **T2.6 — Read Python and build a test plan**, with three independent questions and six coordinated variations each:

| Slot | Coverage |
| --- | --- |
| 36 | Combined type/range, length/format, presence, conversion/return type, booking-code format, text/integer menu comparison |
| 37 | Name typo, local scope, two incorrect calculation branches, numeric conversion, working code, incorrect iteration count |
| 38 | Retry variable update, combined conversion/range faults, name typo after validation, local counter scope, combined bounds, initial flag skipping the loop |

The teacher authorised retirement of slots 15–29 after transferring useful menu-comparison, iteration-count and skipped-loop cases. Retired questions retain their code access; new practice and search use the replacement. With one live recipe, New set selects a different coordinated variation. A recalled retired recipe falls back to current practice; an already active historical question remains accessible.

Each independent question targets at most five minutes; larger test-data exercises may occupy a longer starter. The grouped draft has 6–11 bounded answer parts per question and needs classroom timing review. New substantive questions use unused slots rather than changing historical meanings. All draft answers are automatically marked; input choices are bounded, prediction cases supplied, and the optional test-plan summary displays student selections without claiming an observed run or successful repair. Subject approval and student timing remain separate from technical verification.

## Earlier design and first release

**27 September implementation update:** authorised first release implemented with native bounded controls and separately reviewed prose. The [activity evidence map](activity-evidence.md) records exact slots, coverage, refinements and verification limits; it supersedes earlier optional UI proposals.


**Broad progression accepted with teacher refinements, 26 September 2026; detailed content still to be authored and checked.** Apply the [shared design/marking contract](activity-designs.md). Five recipes, three questions each, five coordinated variations per recipe. All program fragments are original teaching examples; source faults calibrate the skills and demand. The initial release uses bounded repairs/authored run evidence, not arbitrary student-code execution.

## Agreed question size and independence

Each recipe is a **three-question set, up to five minutes per multipart question** (no more than 15 minutes total; shorter questions and sets are welcome). Reading, interaction and checking fit inside that budget. Each question includes its own brief, required data/code and assumptions and can be completed without solving an earlier question or opening an external resource. A shared scenario may connect the set, but later questions supply a fresh starting state; earlier mistakes must not block them. Within a question, parts may form a coherent sequence. These are authoring targets, not classroom-verified timings.

## Source-to-skill mapping

| Evidence | Teaching consequence | Recipes |
| --- | --- | --- |
| Task2 briefs across all packs; spec Task2 | Derive tests from requirements, repair code and document what happened | All |
| SAM scheme pp12–13; live scheme p13; examiner pp17,66 | Test boundaries and calculations, including apparently working branches; manually establish expected results | T2.1, T2.2, T2.5 |
| Grade A p14 versus Grade E p11 | Distinguish syntax repair from logic/precision errors; use a discriminating range of inputs | T2.2, T2.3 |
| Examiner pp18–21 | A systematic log needs specific data, observations and confirmation tests; finding all errors alone is not enough | T2.4, T2.5 |
| Three supplied Task2 Python files, read without execution | Real faults include length/comparison boundaries, type retention, loop count, category branches, parameters, state and output formatting | T2.1–T2.5 |

Sources are linked in the [conversion register](conversion-register.md). User errors, normal/extreme/invalid data and required outputs are part of the reasoning, not just labels to memorise.

## Validation emphasis and deliberate repetition

Validation is a major strand throughout all five recipes, alongside calculation/control-flow logic and a smaller number of syntax errors. As an **authoring target, not an assessment weighting**, at least three of the five coordinated variants in T2.1, T2.3, T2.4 and T2.5 should centrally involve validation. Keep T2.2 rich in independently calculated outputs while also distinguishing expected rejection, re-prompt and acceptance behaviour.

Cover inclusive/exclusive bounds; minimum/maximum and exact length; empty/whitespace input; permitted characters and leading-zero identifiers; numeric parsing and retained conversion; string versus numeric comparisons; combined conditions (`and`/`or`); and validation loops that skip, fail to update, stop too early or fail to terminate. State permitted characters, whitespace handling and conversion policy in each brief. Do not assume `isdigit()` means ASCII digits, or that every numeric-looking string parses as the required type. Introduce these distinctions only where specified and appropriate to the level. Include valid inputs incorrectly rejected as well as invalid inputs incorrectly accepted, crashes and repeated invalid-then-valid entry sequences.

Retain some non-validation logic and syntax cases. A syntax repair should be followed by a behavioural test; making code run is not evidence that it meets the requirement. Limit each five-minute question to one validation idea, or at most two closely related faults in the final investigation.

Repeat the same test-log layout and procedure with small changes to a boundary, permitted format or observed run. First identify good evidence, then complete missing fields, then produce a short row with less support. Follow close repeats with a contrasting case so students must derive the rule rather than memorise values. Five variants is an initial bank size, not a ceiling on later validation coverage.

## Teach every test-template column explicitly

The cached AdSAM DOCX template uses the exact headings below. These columns are practised across the recipes, not introduced only in T2.4. Use the matching source template when comparing exemplar evidence; any shortened UI label must preserve its meaning.

| Template column | What students must understand and practise | Five-minute exercise and feedback focus |
| --- | --- | --- |
| **Description of test** | State the requirement/behaviour and what the test checks. “Boundary test” alone does not explain which boundary or requirement. | Match descriptions to requirements/data; improve a vague description; distinguish purpose from input and result. |
| **Test data to be used (if required)** | Supply exact reproducible input, including entry order and setup where relevant; preserve types, spaces and leading zeros. Use “not required” only when the test genuinely needs no input. | Choose a discriminating value; complete a minimal input sequence; compare duplicate versus additional coverage. |
| **Expected outcome** | Predict specific output/behaviour from the brief before observing the program. Rejection may require a message, re-prompt and unchanged state, not just “invalid”. | Derive a numerical result or precise validation response; distinguish requirement-led expectation from copying the faulty output. |
| **Actual outcome** | Record what was observed, even when unexpected: output, exception or looping behaviour. Distinguish “not yet run” from a pass or failure. | Translate an authored run/trace into accurate evidence; reject invented results or merely writing “works”. Stop an infinite-loop simulation at a declared trace limit; do not hang the browser. |
| **Comments and intended actions** | Compare expected/actual, explain the discrepancy, identify a supported next action and link confirmation/regression evidence. Do not claim an intended repair has already succeeded. | Choose or complete an evidence-backed action; link a retest; distinguish an unresolved hypothesis from a demonstrated fix. A passing case may need no repair. |

### How the five recipes use the columns

- **T2.1:** Q1 purpose + exact data for a boundary; Q2 purpose + data for a different validation rule; Q3 complete an independently supplied short planning row (purpose/data/expected) and explain its coverage.
- **T2.2:** Q1 derive expected outcomes; Q2 distinguish expected and actual in a fresh supplied case; Q3 choose follow-up data and expectations for an independently supplied mismatch.
- **T2.3:** Q1 use a supplied row to diagnose a validation fault; Q2 repair a fresh bounded snippet and record intended action; Q3 use supplied original/fixed evidence to choose confirmation and regression tests.
- **T2.4:** Q1 improve purpose/data/expected in a small log; Q2 accurately record actual outcomes from a separate observed run; Q3 complete comments/actions and a linked retest for a fresh supplied row. Each question has its own evidence and assesses its target column(s).
- **T2.5:** three separate miniature investigations, each with its own requirement, snippet and evidence. Each question combines a small test-design decision, fault/repair reasoning and a brief log/retest response. Supply some columns to keep each within five minutes; rotate the missing columns across variants. Include at least three validation-centred variants. This replaces a single investigation dependent on answers from the preceding two questions.

Keep the existing worked examples below as source material for these rebalanced questions, not as already finalised timed content. Before authoring, record a coverage matrix showing each column practised in recognition, completion and independent production, including multiple close-repeat opportunities. Each family's source-evidence comparison must meet the close-reading gate in the review process.

## T2.1 — Choose tests that expose the fault

**Outcome:** choose concrete data and expected outcomes that check the requirement and distinguish a plausible bug. **3 × up to 5 minutes; 10 automatic points.** Prerequisites: comparisons, types and reading a short validation rule.

| Question | Response and marking |
| --- | --- |
| 1. Cover the boundary | Select or enter test inputs for below/at/above a stated boundary, **4** = appropriate data coverage (2) + expected accept/reject outcomes (2). Distinct values alone do not guarantee useful coverage. |
| 2. Test another requirement | Choose valid and invalid data for an identifier/type requirement and expected outcomes, **4** = correct cases (2) + outcomes (2). Preserve identifiers as strings. |
| 3. Explain a discriminating case | Choose which test exposes the given comparator mistake and why, **2**. A normal case that both programs pass does not distinguish them. |

**Worked case:** order value must be a whole number of pounds from 1 to 500 inclusive. Inputs **499,500,501** should accept/accept/reject; **0** rejects, **1** accepts, and `abc` fails numeric parsing. A faulty upper check `value >= 500` rejects 500, so 500 is the discriminating test for that fault; 499 and 501 alone miss it. A separate loyalty ID requires eight digit characters. `00001234` is valid, a seven-digit ID and a nine-digit ID are invalid, and `1234ABCD` is invalid. Do not convert the ID to an integer and lose its leading zeros.

**Variations:** inclusive maximum; minimum; exact string length; menu values and input type; zero or negative divisor/timeframe. Change the validation rule and candidate fault. Accept different inputs that occupy the same specified equivalence class, but no duplicate coverage credit.

**Hint:** “Choose values where the requirement changes from allowed to not allowed.” **Feedback:** name an untested boundary or show that both candidate programs behave the same on the chosen input. **Reveal:** coverage table, not just a list of memorised test labels. **Transfer:** derive a short test plan from a new brief before opening its code.

## T2.2 — Calculate an independent expected result

**Outcome:** establish an oracle from requirements, independently of faulty program output. **3 × up to 5 minutes; 10 automatic points.** Prerequisites: arithmetic, percentages or a short recurrence, with all rounding/unit rules stated.

| Question | Response and marking |
| --- | --- |
| 1. Work out the expected output | Small calculation/trace table, **4** = correct rule/method (2) + intermediate/final results (2). A copied observed output is not a reference calculation. |
| 2. Compare expected with actual | Use an authored observed run supplied after the expectation is recorded; **4** = identify mismatch (1), classify affected rule (1), select cause consistent with the evidence (2). The observation is a stimulus, not a reveal of the correct answer. |
| 3. Choose a follow-up test | Discriminate the proposed cause from another plausible explanation, **2**, using a valid data/outcome pair. |

**Worked case:** home-electrical points use whole pounds per item: 4 per pound up to £500 and 2 per pound above it. Item price **£501.75** becomes **501** whole pounds; expected points **2,002**. A faulty calculation applying 4 throughout returns 2,004. For £500.75, 500 whole pounds earns 2,000; this checks conversion/threshold handling but does not by itself expose the wrong higher-tier rate. A follow-up at £510 expects 2,020 and returns 2,040 under that fault.

A transaction variant can add two £1.75 items. State explicitly: base points truncate each item independently; bonus uses whole pounds of the transaction total. At four base points/pound and two bonus points/pound, base=8, bonus=6, total=14. Rounding each item before calculating the transaction bonus would give 12; do not leave the rounding level implicit.

**Variations:** tiered rewards; annual contribution added before growth; percentage rate entered ten times too large; count/loop off-by-one; integer conversion losing decimals. Use a non-health original case for the same percentage/division logic seen in Glenstar. For financial recurrences define deposit timing, fees and display rounding; do not inherit ambiguous monthly/annual wording.

**Hint:** “Apply the written rule to one small input before comparing it with the program.” **Feedback:** separate wrong rate, wrong units, rounding stage and iteration count. **Reveal:** manual calculation alongside the faulty trace. **Transfer:** document manually calculated expected results for several paths in a larger test log.

## T2.3 — Repair, then prove the repair

**Outcome:** make a targeted repair and test the behaviour the change should restore. **3 × up to 5 minutes; 10 automatic points.** Prerequisites: basic Python comparisons, parameters, types and control flow.

| Question | Response and marking |
| --- | --- |
| 1. Locate and explain the defect | Select line/operation and a reason supported by the supplied failure, **4** = location (1), violated requirement (1), causal link (2). Syntax labels alone do not diagnose a logic error. |
| 2. Complete the repair | One or two bounded token/line fields in a ≤12-line snippet, **4** = correct repaired behaviour (2) + preserved required behaviour (2). Score semantic cases for the supported edit space, not an arbitrary preference between equivalent operators. |
| 3. Select confirmation and regression tests | One reproduces the failing condition after repair, another checks an unaffected valid path, **2**. Both must include correct expected results. |

**Worked case:** `return len(code) >= 8 and code.isdigit()` must implement “exactly eight digits”. Replacing `>=` with `==` restores the rule. Nine digits must now return False; `00001234` still returns True; seven digits and `1234ABCD` remain False. Changing `and` to `or` is a plausible harmful repair: it admits eight non-digit characters and some IDs of the wrong length.

**Variations:** comparison boundary; numeric conversion result not assigned/returned; wrong parameter or missing argument; off-by-one loop; string/integer menu comparison. Any allowed alternate repair is tested across the authored equivalence classes. A whitelist of tokens bounds the interpreter; the browser never runs arbitrary Python or `eval` on student text.

**Hint:** “Which part of the condition lets the failing input through?” **Feedback:** give one counterexample for an over-broad repair. **Reveal:** corrected snippet, causal explanation, failing-before/passing-after evidence and a regression case. **Transfer:** apply and test a repair in the student's own IDE; the starter does not certify full-program debugging.

## T2.4 — Produce a useful test-log row

**Outcome:** record a traceable test → observation → action → retest chain. **3 × up to 5 minutes; 8 automatic points plus a reviewed response.** Prerequisites: T2.1/T2.2 skills and expected versus actual distinction.

Use the source template's five columns: **description/purpose; data; expected outcome; actual outcome; comments/actions**. Retests are linked rows with a visible original-test ID. On small screens edit one row at a time, with a read-only overview.

| Question | Response and marking |
| --- | --- |
| 1. Plan the test | Complete purpose, concrete data and expected outcome, **4** = relevant purpose (1), discriminating data (1), precise expected result (2). Expected outcomes must be entered before viewing the observed run. |
| 2. Record action and retest | Fill actual outcome from supplied observation; select a justified change and linked confirmation case, **4** = accurate observation (1), justified repair (1), retest data (1), expected retest outcome (1). Do not let students invent an actual result. |
| 3. Explain the evidence | One sentence explaining how the before/after evidence supports the fix, with a remaining test if applicable; reviewed for specificity and causal reasoning. |

**Worked row:** purpose “check inclusive maximum”; data 500; expected “accepted”; observed “rejected”; action “replace the upper rejection condition `>= 500` with `> 500`”. Retest same input 500: expected accepted, authored post-fix observation accepted. Regression input 501 must still reject. “Works”, “valid data” and “N/A” are insufficient where a specific input/output exists.

**Variations:** boundary failure, arithmetic mismatch, returned wrong type, incorrect repeat count, invalid-input crash. At least one observed run should pass: students must avoid inventing a defect just because it appears in a debugging activity.

**Hint:** “Could someone else repeat the test using only your row?” **Feedback:** distinguish vague purpose, unspecified input, expectation copied from the bug, and a change with no confirmation. **Reveal:** a complete reproducible row and retest, plus why a screenshot alone can be insufficient. **Transfer:** reproduce the same evidence structure in the DOCX template while testing real code; an authored observation is explicitly a simulation.

## T2.5 — Investigate a small faulty function

**Outcome:** select a test strategy, make bounded repairs and assess the evidence of success. **3 × up to 5 minutes; 12 automatic points.** Prerequisites: earlier testing/repair skills. Limit to one function of at most 12 lines and at most two interacting faults; the task is not a hunt through a full source file.

| Question | Response and marking |
| --- | --- |
| 1. Propose discriminating tests | Three-case table for relevant paths/boundaries with expected outputs, **4** = path/boundary coverage (2), independent expectations (2). Show the brief before the code, but allow revisiting the plan. |
| 2. Diagnose and repair | Compare against authored traces, edit bounded coefficients/conditions and explain the faulty rule through linked choices, **4** = both intended faults corrected (2), consistency of the diagnosis (2). All valid supported repairs must be accepted. |
| 3. Retest and assess confidence | Complete confirmation/regression outcomes and identify what the evidence does/does not establish, **4** = confirmation (1), regression (1), correct observed outcomes (1), justified limitation/next case (1). Passing three tests is not proof of every possible input. |

**Worked function, with positive prices validated by the caller:**

```python
def points(price):
    value = int(price)
    if value > 500:
        return 2000 + (value - 500) * 4
    return value * 2
```

The brief requires 4 per whole pound up to 500 and 2 thereafter. Test prices 499/500/501 have expected **1996/2000/2002**, but faulty results **998/1000/2004**. Repair the upper-tier multiplier to 2 and lower-tier multiplier to 4. Retests of the original inputs and a fractional-price case such as 501.75 establish the intended tier/whole-pound behaviour for those cases. The set does not infer how negative or nonnumeric input is handled outside the given caller contract.

**Variations:** prioritise boundary plus loop/state defects, length plus character validation, and conversion plus re-prompt handling; retain contrasting cases of incorrect category branch plus rate; wrong iteration bound plus accumulator; wrong comparison plus return type; parameters swapped plus wrong sign in a non-health calculation; wrong selected field plus total/count confusion. Avoid arbitrary syntactic mutation or several unrelated errors in one tiny function. Recheck that each chosen test can reveal the authored fault.

**Hint:** “Which test takes each branch, and what should that branch calculate?” **Feedback:** name the still-failing case, not the next token to enter. **Reveal:** requirements-to-tests table, corrected snippet and a concise evidence-based conclusion. **Transfer:** a larger independent debugging task using the real test-log template; students choose their own testing sequence and capture actual outputs.

## Reference verification and implementation limits

The revised draft has permanent checks in `tests/esp-task2.test.js` and `tests/fixtures/esp-task2.py`: independently specified Python executions check the faulty and repaired snippets against the authored result choices. They also cover packed marking and historical-code access. `scripts/browser-esp-task2.mjs` checks the 18 variations through the shared UI; see [local development](../local-development.md) for commands and interaction limits. These checks do not establish classroom timing or subject approval.

The worked numeric/code examples are checked by [validate-esp-designs.py](../../scripts/validate-esp-designs.py). It runs only our bounded reference snippets, never supplied interactive source or student text. Checks include exact boundary cases, leading-zero IDs, plausible harmful repairs, tier calculations, observation differences and valid schedule examples from Task1.

During content implementation, each variation needs independent expected results, a complete fault/repair explanation and representative wrong-answer cases. Preserve both the failing and corrected reference outcomes. Avoid merely executing the same algorithm used by the marker to claim independent validation. Source line numbers are unstable; name the function and show a local snippet. Test-log screenshots can support evidence but are not mandatory input to this browser practice.
