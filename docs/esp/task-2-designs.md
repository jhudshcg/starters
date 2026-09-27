# Task 2 — testing and debugging starter designs

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

The worked numeric/code examples are checked by [validate-esp-designs.py](../../scripts/validate-esp-designs.py). It runs only our bounded reference snippets, never supplied interactive source or student text. Checks include exact boundary cases, leading-zero IDs, plausible harmful repairs, tier calculations, observation differences and valid schedule examples from Task1.

During content implementation, each variation needs independent expected results, a complete fault/repair explanation and representative wrong-answer cases. Preserve both the failing and corrected reference outcomes. Avoid merely executing the same algorithm used by the marker to claim independent validation. Source line numbers are unstable; name the function and show a local snippet. Test-log screenshots can support evidence but are not mandatory input to this browser practice.
