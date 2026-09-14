# Starter review: shared codes, exam quality and obfuscation

Date: 14 September 2026. Review only; no question or application changes made.

## Follow-up clarification

The teacher confirms students used the live site, and the later sync changed only the puzzle specification, checkpoint and README. Inspection confirms commit `45cc13e` changes exactly those three documents. Neither that commit nor the preceding Go expansion changes `js/codes.js`; there is no difference in the codec or live exam bank between `7e2e857` and HEAD. The build copies assets and does not derive bank versions from documentation, commits or deployment counts. **The documentation sync did not change question codes or the bank version.** There is no evidence of the suspected automatic version-bump bug.

The historical version-1/version-2 incompatibility below is a possible failure mechanism only. It explains teacher success and student failure only if their browsers actually loaded different releases, which has not been established. Treat the incident as unresolved; capture the exact error, URL and loaded release before attributing it to caching.

Equivalent-answer lists already exist for text (including names) and code fragments through `accepted`. The immediate authoring work is to populate them properly. Numeric and mathematical-expression branches do not uniformly consult that list; standardise explicit alternatives across answer kinds while retaining the appropriate comparison rules for each kind. Do not rely on unrestricted semantic inference.

The intended obfuscation design is clarified as **encoded downloaded data with separate marking rules and reveal text**. Decode the relevant marking rules only when checking/submitting, and decode model answers/explanations only when reveal is permitted. Avoid retaining the entire decoded bank. Support an explicit reveal policy: always available, after first set submission, or disabled. Feedback must honour that policy too, since present explanations can reveal the answer before submission. Keep this policy separate from the existing timer suffix; persist it with an attempt and define a backward-compatible sharing format if teachers need to share the setting. This is a sensible source-inspection deterrent, although browser-local marking still makes its rules accessible to a determined student.

## Summary

- **Code failures:** the strongest repository-supported explanation is different bank versions on teacher and student browsers. A bank replacement was committed at 01:57 BST today. The old application rejects every version-2 code, even when copied perfectly. This is a plausible mechanism, not a confirmed account of the classroom incident.
- **Question quality:** the feedback is about educational value, precise language and fair marking. Preserve accessible recall and short answers, but make each mark represent useful Core knowledge. Avoid padding sets with trivial arithmetic, obvious alternatives or repeated versions of the same fact.
- **Scope:** reviewed all 51 live exam templates, both variations, comprising 514 part instances. The live exam bank contains CA1 and CA2 only. CA3–CA8 are absent. The historical 106-question draft is not loaded by the application and is outside this live-bank review.
- **Obfuscation:** a build step can deter casual source browsing. It cannot prevent a technically capable student extracting answers that the browser must decode and mark locally. A lightweight build transformation is proportionate for these practice activities, provided that limitation is accepted.

## 1. Why codes could fail in class and work later

### Verified locally

`BIAkAiAg` decodes to bank version 2, exam practice, and the following entries, in order:

| Position | Individual code | Question | Marks |
| --- | --- | --- | ---: |
| 1 | EX-2-1-1 | Abstraction in a calculation | 5 |
| 2 | EX-2-2-1 | Patterns and relevant information | 5 |
| 3 | EX-2-4-0 | Benefits and limitations | 5 |

The code is eight characters and has no timer. It is a reversible encoding of version, type, slots and variations; it does not rely on a teacher-specific cache, registration or a server lookup. A hash collision is therefore not an explanation for this incident.

I enumerated all **312 current exam combinations** (ascending slot order, three questions sharing a focus, all two-variation combinations). Every code resolved successfully. All **514 authored model answers** also received their allocated marks. These checks establish internal consistency, not classroom browser compatibility or fair treatment of alternative answers.

### Ranked explanations

| Priority | Explanation | Evidence and limits | How to distinguish it |
| --- | --- | --- | --- |
| 1 | Teacher and students had different bank releases | Commit `7e2e857`, 14 September 01:57:35 BST, replaced the demo bank. The initial resolver requires version 1; the current resolver requires version 2. Either rejects the other's codes. Commit time is not verified deployment time. | Compare the actual teacher/student URL, loaded bank version and release identifier. The expected error is “This question-bank version is not available. Reload to check for an update.” |
| 2 | Older open tabs or cached application assets | The build copies modules to stable names, such as `js/bank.js` and `data/exam-ca1.js`. There is no build fingerprint in asset URLs. A tab already running the old application stays old until reloaded. Browser caching can also reuse assets. | Before reloading a failing browser, record the error and loaded version. Then compare with a fresh tab and a hard reload of the same URL. A school caching layer is possible but unverified. |
| 3 | Different page locations | A local preview, downloaded copy, older published path or different host can show the same design with different content. | Compare complete addresses, including host and path; use the page's Copy link action. |
| 4 | Shared browser/runtime restriction | Starting any activity calls `crypto.randomUUID()` without a fallback. On an unsupported browser or insecure non-localhost HTTP page this can fail after decoding. This is less likely on normal HTTPS GitHub Pages. | Check whether randomly starting an activity also fails; capture the exact error. `crypto.randomUUID is not a function` points to this path. |
| 5 | Formatting introduced while copying | Codes preserve case and trim only outer whitespace. Embedded spaces, line breaks, zero-width characters, Markdown asterisks and full URLs are not accepted by the code field. The alphabet includes visually confusable characters. | Compare the exact pasted value with the copied code; try Copy link. A common formatted source could affect everyone, but individual typos are not the leading explanation. |

Versioned asset filenames are an established way to prevent an updated release reusing an older resource at the same URL. They do not update an already running tab by themselves. See [MDN: HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching). The runtime restriction above is documented in [MDN: randomUUID](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID).

**Limit of this investigation:** there is no incident error message, classroom network trace or loaded-release record. The attempted public-page fetch through the research tool failed, so this report does not claim to have verified the current deployment or its cache headers. The supplied set is the quality example; it is not assumed to be the code that failed earlier.

### Proposed reliability work

1. Add a compact release identifier and bank version, plus a “Copy diagnostic details” action on failures. Include URL, entered code, error category and browser capability information; omit student answers/history.
2. Give version mismatches a specific explanation: the code's version, the loaded version, and a reload action. Distinguish malformed codes, missing questions and failures starting an activity.
3. Build the whole module dependency graph with content-hashed filenames. Changing only the top-level script URL leaves imported bank files vulnerable to reuse. Retain previous release assets for a defined compatibility period.
4. Check for a newer release when opening a shared code or returning to the page. Offer an update without silently discarding an active attempt. Prevent mixed application/bank releases through a manifest consistency check.
5. Keep existing code case intact. Improve code typography and allow a copied site link in the entry field. Validate a link's origin/path; do not silently guess ambiguous codes or open a different valid set.
6. Test cross-browser sharing on two actual student machines: fresh and old tabs, timer suffixes, single-question codes, prior-version codes, blocked storage and unavailable clipboard access. Include a deployment/update test.

**Compatibility decision:** old demo codes were deliberately discontinued in the previous project specification. Do not restore them blindly: the same slots represent different questions. Going forward, keep IDs stable for wording corrections, and give materially different questions new identities with explicit retirement/migration behaviour. Content hashes for files and question identities serve different purposes.

## 2. Applying the feedback to BIAkAiAg

### The editorial standard

The aim is not to make every starter harder. A simple question identifying a type, operator or computational-thinking component can be valuable. The issue is whether the student must demonstrate the intended concept, whether the scenario supplies enough information, and whether the mark is earned independently of adjacent parts.

Use familiar, accurate technical nouns: “print cost calculator” and “function call”. Avoid replacing them with compressed or vague phrases. Ask explicitly whether the answer should be an output value, variable identifier, operation or explanation. Update the marking rule whenever that requested answer changes.

### Q1: Abstraction in a calculation — retain and refine

Proposed shared context: **“A print cost calculator calculates the cost of a print job from the number of pages and a fixed rate of 5 pence per page.”**

| Part | Proposed action | Marking/coverage consequence |
| --- | --- | --- |
| a | “State the input that changes between print jobs.” | Accept page count, number of pages and equivalent concise wording. |
| b | “Suggest an appropriate Python variable name for storing the total printing cost.” | Model `printing_cost`; accept meaningful valid alternatives such as `total_cost`, `print_cost` and `cost`. Reject identifiers with spaces, initial digits or unrelated meaning. A bounded approved set plus an unrecognised-answer route is safer than pretending all meaningful names can be understood automatically. |
| c | Ask which value stays constant, rather than asking students to copy the already stated number 5. | Model rate per page. Distinguish a constant's role from its numerical value. |
| d | Ask for the calculation using supplied names, e.g. `pages` and `RATE_PER_PAGE`. | Model `pages * RATE_PER_PAGE`; accept reversed multiplication where appropriate. Retain the abstraction focus; do not turn this into a lengthy coding task. |
| e | “The calculator processes a queue of print jobs. State one calculation it repeats for each job.” | Accept calculating each job's cost. Remove the need to reproduce a offered phrase exactly. |

Keep five one-mark parts if each assesses the intended input, output, variable/constant or process concept. Apply equivalent corrections to the parking variation. Part b should continue to assess recognition of the output, with naming as a small application; reassess whether an additional code-style tag is warranted rather than automatically counting full style coverage.

### Q2: Patterns and relevant information — redesign

The live question currently has **two one-mark elementary sequence parts**, followed by one useful shared-validation part and two obvious relevance choices. It is not a five-mark sequence exercise, but the overall five marks still offer too little useful discrimination.

Retain **at most one one-mark numerical prediction**, and use the remaining marks for interpreting a pattern, transferring a rule and selecting relevant data. Suggested five-part replacement outline, for review:

| Part | Draft task | Answer concept | Marks |
| --- | --- | --- | ---: |
| a | Backups start at 02:00, 04:00 and 06:00. Assuming the pattern continues, give the next start time. | 08:00 | 1 |
| b | A developer predicts that every later backup will follow this interval. State one assumption behind that prediction. | The schedule/interval remains unchanged; no interruption changes the starts. | 1 |
| c | A stock form and an age form both reject numbers outside stated minimum and maximum values. Name the validation check that could be reused. | Range check. | 1 |
| d | The stock form accepts 1–50; the age form accepts 16–19. State what must change when reusing the check. | The lower and upper limits. | 1 |
| e | A delivery charge depends only on road distance from a fixed depot. From delivery address, customer account number and parcel weight, select the information needed to calculate the distance. | Delivery address. | 1 |

This is an illustrative replacement, not approved final content. Create a genuinely different second scenario, author bounded concept rules for b/d, and check whether d should instead use a structured response. Check coverage afresh: dropping the original explicit “filter out” part may remove its old coverage link. Restore that coverage in another worthwhile item, rather than keeping an inaccurate tag.

### Q3: Benefits and limitations — retain, clarify and mark fairly

- Replace part d with: **“A library offers a simple function call while hiding the steps used to calculate the result. State which task of abstraction this illustrates.”**
- Accept “hiding internal workings”, “hiding implementation details”, “hide implementation details” and concise equivalents. The current marker rejects **“hiding implementation details”** despite accepting the imperative form.
- Make the API variation equally concrete: state that a public function call hides payment-processing steps.
- Preserve the useful misuse scenarios in b/c. In variation 0, c and e both elicit “abstraction”; revise e to assess the relationship between decomposition and abstraction, with a short reason or structured choice. Naming a second component alone is weak evidence of understanding their relationship.

Keep the set within 15–22 marks; this outline retains 15. If Q2 becomes a materially new question, preserve or explicitly retire its existing identity rather than quietly making a previously shared code mean a different task.

## 3. Findings across the whole live bank

### A. Mark allocation and assessment value

Every live part is worth one mark. That is permissible, but all sets consequently read as bundles of micro-prompts; there are **zero linked-reason dependencies** in the exam bank. The intended name/state/describe balance and selected justifications are not yet represented adequately.

Examples needing attention:

- Slot 12 asks students to identify an integer and then repeats the integer definition in the same question.
- Slots 13 and 14 use almost the same sequence of type-choice tasks. These are useful practice variations but weak evidence of two distinct authored questions.
- Slots 8, 38, 40 and 41 offer irrelevant alternatives such as screen resolution, arithmetic accuracy, hiding errors or changing the screen colour.
- Slots 31 and 35 repeatedly use yes/no answers. Ask for a reason or a relevant example where that earns useful evidence.
- Slot 44's sorting tasks can often be answered by putting small numbers in order, without understanding the named sorting algorithm.

**Action:** replace padding with a small scenario decision, one trace step or one linked reason. Use plausible misconceptions for alternatives. Retain straightforward recall where it serves a distinct learning purpose. Prefer several short response slots over one hard-to-mark paragraph.

### B. Wording and technical assumptions

- Slot 18 asks students to identify an array immediately after naming the array module and constructor; the prompt largely supplies the answer.
- Slot 29's infinite-loop description needs an initially true condition and no other exit. A condition that never becomes false may already be false, and an unchanged variable alone does not prove non-termination.
- Slot 33 writes function definitions inline with a full stop immediately after the code. Display code separately so prose punctuation is not mistaken for syntax.
- Slot 26's file-read task should specify an open text file positioned at its start. `read()` reads from the current position.
- Slot 37's efficiency choice should establish that the repeated fixed calculation has no side effects and can safely be moved.
- Slot 42's “final element” task allows Python's `-1`, although the marker accepts only the positive index. Ask for a non-negative index if that is what is being assessed.

### C. Fair self-marking

`allowSentence` removes a few sentence openings and then compares whole strings against an authored list. It does not understand arbitrary short sentences, synonyms or meaning. The token-based code matcher tolerates spacing and quote style, but does not establish semantic equivalence.

These local probes received zero:

| Item (one-based part) | Response | Assessment |
| --- | --- | --- |
| EX-2-4-0, d | `hiding implementation details` | Correct abstraction task; missing accepted wording. |
| EX-2-32-1, e | `effort` | Grammatically and conceptually valid completion: reuse reduces the effort needed. |
| EX-2-42-0, e | `-1` | Valid Python index for the final list element. |
| EX-2-7-0, e | `total = quantity * price` | Equivalent for the intended numeric price/quantity calculation; specify numeric operands and accept this form. |
| EX-2-11-0, e | `evaluate the solution` | Reasonable alternative to reviewing whether the solution works. |
| EX-2-1-1, b | `printing_cost` | Current prompt asks for the output, so this exposes prompt/answer ambiguity. It must be accepted if changed to the proposed variable-name task. |

Also inspect unit-bearing answers: slot 2 asks about storage in GB but uses a number-only marker, so a natural “5 GB” is rejected. Either request a number explicitly with GB outside the input or support the stated unit. Provide consistent time formatting in the retained backup question.

**Action:** author accepted examples, wrong concepts, contradictions and boundary cases alongside each part. Use opt-in spelling tolerance only for suitable natural-language terms; preserve exactness for Python identifiers, operators and numeric values. For genuine descriptions, use bounded concept rules or structured responses. An unrecognised but plausible answer should be labelled as unrecognised, rather than presented as definitively wrong. Do not solve this by accepting any sentence containing a keyword.

### D. Feedback and revision records

Wrong answers receive the part's explanation; many explanations immediately disclose the answer. This can spoil a retry and sometimes help adjacent parts. Review feedback separately from the full model answer: give a diagnostic hint first, retain explicit reveal, and make assisted scoring reflect assistance actually supplied. Keep feedback specific enough to explain the misunderstanding.

### E. Coverage and variations

The existing report lists 369 CA1–CA2 subelements: 239 with at least one linked live question, only 10 with two, and none meeting the reviewed target. These are recorded links, not proof of educational coverage. All 51 templates are marked `teacher-review-pending`.

Some links overstate what a part demonstrates. For example, slot 4's second-component identification is linked to understanding interrelationships; slots 7 and 48 use very constrained tasks for broader practical outcomes. Review these against the actual specification and use `coverageMode: practice` where appropriate. Never retain a coverage tag solely to preserve counts after a rewrite.

Several second variations change only names or values; others switch the tested fact (e.g. slot 6 clarity versus finiteness, slot 48 load versus stress). Both can be useful, but a shared part-level coverage mapping must be valid for each variation, and difficulty should remain comparable.

The local specimen Paper 1 mark scheme explicitly supports appropriate alternative responses and includes an action plus linked justification in question 14b. That provides a useful calibration for fair marking and small amounts of reasoning; it does not require making these starters full exam-length questions.

## 4. Per-question action register

All rows cover both variations. Numbers are permanent live slots; a specific variation uses `EX-2-<slot>-0` or `EX-2-<slot>-1`. Part letters follow displayed order. “Retain” means no major redesign identified, not final subject approval.

Priority: **P1** = misleading wording, unfair marking or poor assessment value; **P2** = useful refinement/balance. Common marking and feedback actions in section 3 apply throughout.

### CA1 — source: data/exam-ca1.js

| Slot | Title | Decision and concrete action |
| ---: | --- | --- |
| 0 | Computational-thinking components | Retain/P2. Remove the answer cue “failure pattern” in the recognition variation; use a concrete recurring fault. |
| 1 | Abstraction in a calculation | P1 refine. Apply section 2: print cost calculator, explicit identifier request, meaningful constant/process tasks and matching answer rules. |
| 2 | Patterns and relevant information | P1 redesign. Maximum one elementary sequence mark; add prediction assumptions and reuse with changed limits. Replace implausible relevance alternatives. |
| 3 | Representing a problem | Retain/P2. A list of labelled boxes can be ambiguous; show a small block diagram or specify the representation more clearly. Use “written algorithm”/“numbered steps” where appropriate as accepted alternatives. |
| 4 | Benefits and limitations | P1 refine. Use “function call”; accept equivalent abstraction phrases; replace duplicated abstraction identification with a relationship/reason task. |
| 5 | Flowchart notation | Retain/P2. Add an actual small diagram in one variation. Arrow labels alone do not assess reading arrow direction; correct the coverage for e. |
| 6 | Control structures and algorithms | P2. Keep key recall, but replace one definition repetition with identifying a structure in short pseudocode. Check the shared mapping where b changes concept between variations. |
| 7 | Interpret and correct algorithms | P1 marking/P2 content. Accept equivalent numeric multiplication assignments. A verbal “double then add” calculation is thin algorithm interpretation; supply a short sequence or decision. Recheck practical coverage. |
| 8 | Choosing an algorithm representation | P1 revise b/c/e. Replace hierarchy versus execution time, arrows versus spelling and syntax versus resolution with credible distinctions. Ask one representation choice with a reason. |
| 9 | Problem-solving strategies | Retain/P2. Anchor modularisation in defined responsibilities/interfaces to distinguish it from decomposition. Broaden grammatical reuse answers. |
| 10 | Root causes and follow-up | P2. Keep specialist terminology, but reduce acronym expansion and “log or close” cueing; use a short investigation scenario for at least one method/action. |
| 11 | A structured investigation | P1 marking/P2 content. Accept evaluate/review and equivalent action phrasing; use one coherent fault investigation rather than five disconnected descriptions. |

### CA2 — source: data/exam-ca2.js

| Slot | Title | Decision and concrete action |
| ---: | --- | --- |
| 12 | Identify data types | P1 revise e. Remove repeated integer recall; use a distinct misconception such as quoted versus unquoted values with a reason. |
| 13 | Choose suitable types | Retain/P2. Keep authentic type decisions; replace one repeated identification with a reason for the chosen type. Coordinate with slot 14. |
| 14 | Types in application data | P1 differentiate from 13. Use one application record with an unsuitable type to identify/correct, and require the types of quoted/unquoted values instead of yes/no alone. |
| 15 | Variables, constants and scope | Retain/P2. Preserve Python's module-scope qualification. Make local-scope wording exclude an explicit nonlocal declaration or show a simple function. |
| 16 | Using and converting values | P2 retitle to match assignments/updates, or move conversion content here. Avoid direct repetition of slot 15; keep separate variable and constant skills. |
| 17 | Conversion and local names | Retain/P2. Supply a short context joining conversion and local use; add a reason for local scope. Preserve practice-only qualification for completing `global`. |
| 18 | Choose a data structure | P1 revise b. Assess the characteristic/use of typed arrays rather than naming a constructor already given. Keep positional versus keyed lookup decisions. |
| 19 | Read collections | Retain/P2. Use clear code formatting for imports/assignments; avoid repeating the typed-array selection almost verbatim from slot 18. |
| 20 | Complete and fix collection code | Retain/P2. State non-negative index if required, otherwise accept valid negative indices. Preserve exact dictionary-key case and practical-coverage limits. |
| 21 | Arithmetic operators | Retain/P2. Useful basic syntax; introduce one short application or misconception rather than five almost identical “supply operator” tasks. |
| 22 | Division, remainders and comparisons | P2. “Devices are packed, five per box” is clearer than “17 devices fit in boxes of 5”. Pair the quotient/remainder tasks with operator selection; preserve their distinct concepts. |
| 23 | Inclusive and Boolean conditions | Retain/P2. Add one short boundary example/linked reason; keep precise at-most/at-least wording. |
| 24 | Evaluate and repair expressions | Retain/P2. Display expressions as code. Exact Boolean spelling is appropriate if explicitly asking for a Python value. |
| 25 | Keyboard and screen | Retain/P2. Clarify keyboard versus standard input where needed; keep the distinction between input's string result and displayed numeric output. |
| 26 | Text-file operations | P1 clarify e: open text file, cursor at start, exact contents. Show calls as code. Retain reading/writing/truncation distinctions. |
| 27 | Fix input and output | Retain/P2. Place the file name and required mode naturally in the instruction; explain resource handling in feedback without adding an unassessed requirement. |
| 28 | Selection and repetition | P2 retitle to sequence/selection or add repetition. Use one small conditional trace to reduce keyword-definition repetition. |
| 29 | Choose and trace loops | P1 clarify e. Show initial state and why no exit can occur. Do not imply every unchanged condition/control variable necessarily creates an infinite loop. |
| 30 | Read and repair actions | Retain/P2. Render sequence and branches as short code blocks; keep the useful boundary corrections. Accept equivalent valid updates. |
| 31 | Functions and procedures | P1 rebalance. Replace repeated yes/no parameter questions with reading a definition/call and identifying an argument or returned value. Retain the distinction between specification terminology and Python's implicit `None`. |
| 32 | Sources of reusable code | P1 marking: accept effort/work where the completion permits it. P2 clarify “source category” in a and distinguish authoring from built-in/standard/third-party origins. |
| 33 | Read and complete subprograms | P1 presentation. Separate code from prose punctuation; identify displayed output versus return value explicitly. Keep the useful print/return correction. |
| 34 | Validation checks | Retain/P2. Make the numeric type-check example about the stated expected type so it is not confused with format checking. Add a small application in a later revision. |
| 35 | What validation establishes | P1 revise c/d/e. Two unreasoned “no” answers and copying an inclusive limit are weak. Ask what has been established and what additional check is needed. |
| 36 | Interpret and fix validation | Retain/P2. Format expressions clearly; keep the useful impossible `and` condition and boundary repairs. Add explanation feedback for each misconception. |
| 37 | Order and efficiency | P1 clarify e's safe-to-move calculation. P2 replace obvious before/after choice with locating repeated work in a short loop and selecting a reason. |
| 38 | Readable code | P1 revise d/e. Replace arithmetic/storage/missing-file distractors with real readability tradeoffs. Show code needing spacing or line wrapping; distinguish identifying camelCase from recommending Python style. |
| 39 | Judge a design | P1 strengthen a/c/d. Ask which requirement fails or why a constant/shared function helps, rather than rewarding obvious yes/no choices. Retain the streaming-memory scenario. |
| 40 | Robust behaviour | P1 revise b/c/d/e. Remove absurd recovery alternatives and “name the action that fixes errors” tautology. Use an error message/traceback and ask for the useful detail or next action. |
| 41 | Locate errors | P1 revise e's filename/colour distractors. Keep exception diagnosis; ask why retesting the triggering input is needed. Acknowledge this alone does not prove whole-program robustness. |
| 42 | Correct errors | P1 accept `-1` in e or explicitly require non-negative indexing. Retain short syntax/type corrections; avoid requiring an exact replacement when multiple valid answers meet the prompt. |
| 43 | Searching | Retain/P2. Replace “only accepts text” in e with a real reason for sorted input. Use a linked reason for algorithm choice. |
| 44 | Sorting steps | P1 redesign a–c. Ask for a defined bubble-sort pass, insertion shifts or next merge comparison; specify direction/pass convention. Sorted final values alone do not demonstrate the method. |
| 45 | Compare algorithm efficiency | Retain/P2. Use a small comparisons/time/memory table for one applied decision; keep best/worst-case counts concise. Accept ordinary equivalent metric names. |
| 46 | Identify testing methods | Retain/P2. Convert one definition-only item to choosing a test for a concrete change and giving a reason; preserve distinctions among unit, integration, system and acceptance. |
| 47 | Quality and test approach | Retain/P2. Add one applied selection/reason. Keep specification closed/open-box names alongside accepted black/white-box equivalents. |
| 48 | Boundary and workload tests | P1 scope/coverage review. Pair an input with its expected result. Load/stress and regression/integration switches need variation-specific mappings where appropriate; method identification is not full practical test use. |
| 49 | Test data and records | P2. Show a small test record to complete, reducing five definitions. Clarify boundary data may overlap valid/invalid categories. Add erroneous-data coverage through a purposeful future item. |
| 50 | Automation and planning | P2. Replace self-describing tool-category recall with choosing macro/script/tool for a specific repeated task and giving a short reason. |

## 5. Obfuscating the question banks

### What the proposed approach achieves

At present the build copies all bank JavaScript, including answers and explanations, into `_site/data`. Excluding draft and coverage directories does not conceal these live answers.

An encoded production bank removes the obvious readable answer lists from these files. However, the browser receives the data and decoder, and the marker needs the answers in usable form. Students controlling their browser can inspect that decoded data or intercept the marking process. Encryption with a key delivered to the same browser has the same limitation. This follows the client-side trust boundary described by [OWASP's AJAX security guidance](https://cheatsheetseries.owasp.org/cheatsheets/AJAX_Security_Cheat_Sheet.html#never-transmit-secrets-to-the-client).

**Recommendation:** use lightweight obfuscation to discourage casual inspection for this self-marked practice site. Describe it as a deterrent. If preventing answer extraction is essential, move marking and unrevealed answers to a server; that changes the static-only architecture and adds hosting, availability and abuse-control work. Local scores can also be altered, irrespective of bank encoding, so they remain practice records rather than secure assessment evidence.

### Proposed build design

1. Keep readable authored source banks for editing and review. Resolve them at build time into validated plain data with stable slots, variation IDs, tags, marks and answer rules.
2. Serialise the data, compress and encode it using a maintained library or supported standard implementation. Base64 alone is easily recognisable and provides only a minimal obstacle. Avoid elaborate custom cryptography.
3. Emit content-hashed bank assets and a matching application/manifest. Load and decode the selected activity bank on demand, then validate its schema/version before enabling code entry or starting the activity. The current synchronous imports/resolver will need an explicit asynchronous loading stage.
4. Deploy only the production artifact. Exclude original bank modules, drafts, answer-bearing reports and public source maps containing authoring sources. If the GitHub repository is public, its readable banks and history remain a separate route to answers; repository visibility/source separation would need a deliberate decision. Visibility has not been verified here.
5. Do not persist decoded answer banks in progress exports or local storage. This reduces accidental exposure but cannot stop runtime inspection.
6. Add build checks comparing decoded production data with the authored data, verifying known shared codes, marking behaviour, Unicode, load failures and browser performance. Preserve old-code behaviour according to the agreed content policy.

Decoding only in memory does not make the data private. Heavy control-flow obfuscation, debugger traps or blocking developer tools would add fragility and accessibility/support problems without changing that fact.

## 6. Proposed implementation order and acceptance

| Stage | Deliverable | Acceptance |
| --- | --- | --- |
| 1 — Code reliability | Diagnostics, coherent versioned builds and useful version errors | The same link/code opens the intended set on two student machines; stale releases produce a clear recovery path without silent answer loss. |
| 2 — Immediate classroom quality | Revise slots 1, 2 and 4; fix the demonstrated unfair marking and ambiguous valid answers elsewhere | Teacher reviews both variations, expected answers and rejected examples; the reported set's replacement is coherent and within the mark range. |
| 3 — Bank editorial pass | Apply all P1 actions, then P2 refinements across the register | Each mark has a distinct purpose; no absurd alternatives or answer-copying padding; descriptions/reasons are short and reliably marked. |
| 4 — Coverage and identity audit | Update mappings, retire/replace material rewrites deliberately, regenerate reports | No coverage claim relies on a removed task; practical exercises are classified honestly; compatibility behaviour is documented and tested. |
| 5 — Production obfuscation | Encoded assets, no readable answer bank in the artifact, build parity checks | Decoded content and codes match the approved authored bank; loading is reliable on student browsers; deterrence limits are documented. |

The hashed build work in stage 1 can support stage 5; answer obfuscation should not delay the classroom reliability and marking fixes. Leave CA3–CA8 expansion as an explicit subsequent content project rather than claiming this review completes full Core coverage.

### Review evidence

- Local application: `js/codes.js`, `js/bank.js`, `js/app.js`, `js/marking.js`, `js/code-answer.js`.
- Live authored content: `data/exam.js`, `data/exam-ca1.js`, `data/exam-ca2.js`, `data/exam-helpers.js`.
- Build/deployment: `scripts/build-site.mjs`, `.github/workflows/pages.yml`, `index.html`.
- Project requirements: `docs/spec-exam.md`, `docs/coverage-ca1-ca2.md`; targeted checks against `../agents/spec.md` and specimen Paper 1/question mark-scheme material in `../agents/SAM/`.
- Read-only probes: supplied-code resolution; 312 exam code combinations; 514 model-answer checks; targeted alternative-answer checks. No browser reproduction of the original incident and no exhaustive alternative-answer test suite were performed.

This report is the only deliverable changed. All proposed wording, marking, build and compatibility changes remain for review.
