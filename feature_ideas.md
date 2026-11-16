# scratchpad for feature ideas


## scaffolded extended open response questions

need a plan for implementing exam practice questions closer to extended open response (discuss and evaluate) questions. this has been a student request and would be high value for revision. the way I see it working initially is where questions (inspired closely by actual past papers and paper 1 and paper 2 SAMs and associated mark schemes) are initially broken into blocks and sub blocks so that they can be automarked with full free text evaluation (which might require an LLM, which is not the direction we're taking). E.g. An evaluate questions such as "A company Z has several 1000 and growing customer records to store and search. Evaluate choices for search algorithm" could be split into 3 sections: advantages, disadvantages, conclusion. Then in the advantages answer section students could enter free text to identify a search algorithm which gets added to a list in that section. Then such list item students can add a 'linked statement' subsection, where the format is [advantage] because/meaning [reason/justification], where each of those 2 fields is a 1 line text entry. The auto marking would then search for key advantage terms and matching explanations/reasons for why those things are advantages. Drawing in the question scenario in the answer is very important for high mark band answers, so that could either be searched for in those 2 fields, or perhaps manageably a 3rd field for context could be added. E.g. [linear search][simple to code] meaning [shorter dev time and less mistakes] [business depends on accurate processing of customer data] Make sense? Idea might need a bit of work..

Then a similar format would be used for disadvantages.

For conclusions the subsection format could be [pro/con] [and [pro/con]] is most important becasue [business context reference], which makes [choice] the best choice| so either choice could be justified. etc.

The key idea is to decompose and scaffold the extended open response questions, A so they are more manageable for students who are just getting used to them and may have poor exam technique and B, so they are more tractable for auto-marking. Sub-sections for such answers would need a UI that allows them to be added or removed, to build or edit their final answers.

Does this idea have legs? Does it seem reasonable, achievable and like it might have good UX for students?
The scaffolding need to help students without becoming clunky and off putting.

With a scaffolded approach such as above, there must be a clear notice to students that in the actual exam, they must produce the structure themselves, write in complete sentences and ensure their clear and related to the context of the question.

## Go problems

implement practice board, or selectable size, 9x9, 13x13, 19x19.
have basic scoring/counting feature
reasonable to have an optional, basic, upto ~1 dan amateur computer player built in, using JS not more than a few MB?

## multi-player co-studying activities, comps - without server and behind college network

## integration with personal individual learner cloud storage for syncing progress tracking

## teacher page to colate and visualize shared tracking data

## Small enhancements seen in GCSE Maths — 13 October 2026

Candidates for later adoption, not new implementation commitments:

- Profile rename preserving UUID/history, plus explicitly confirmed local reset/delete that unlinks but never deletes an external progress file.
- Last-backup date and a gentle reminder when a backup is overdue.
- Per-check input-hash caching and a conservative change-to-check map for verification; retain successful unchanged evidence and rerun failures only after fixes. See [local development](docs/local-development.md#select-checks-from-the-change).

The requested OneDrive linked-file saving, Go practice board, responsive puzzle sizing and optional Python topic guides are now implemented. A Go computer opponent remains a separate idea; the imported GNU Go engine supplies estimates only.

20 October teacher ideas: reuse the existing practice challenge levels to choose suitable live-Python editing defaults and replacement-choice availability; showing a question hint can offer replacement choices, then hiding it restores the question's default mode. Keep edits and assistance records. See [Python requirements](docs/spec-python.md#live-coding-pilot--adopted-direction-20-october-2026) for the adopted direction and unresolved switching details. The requested revealable Getting started guidance and Easy/Medium/Harder ratings for independent projects are now implemented.

## Review earlier code attempts — 20 October 2026

Be able to review earlier attempts at ESP Task 2 questions and free-code editing questions, and review skill progression. Retain the code and test evidence so students can see changes in their work, not just past percentages. [Requirements and proposed delivery](docs/spec-progress.md#code-attempt-review-and-skill-progression--adopted-20-october-2026); implementation status belongs in [planned work](docs/planned-work.md).

## ESP Task 2 own test plans — 20 October 2026

Students choose their own input values and expected results, run Original code, record actual results, then repair and retest Your code. Mark those student-authored tests instead of fixed supplied cases. Keep the code editor’s height and internal scrolling independent of its surrounding workspace. Clearly separate scored check feedback from program output. [Adopted requirements](docs/esp/task-2-designs.md#adopted-assessment-adaptation--20-october-2026).

## Temporary wider code view — 20 October 2026

Proposed: mouse-down or press-and-hold reveals long code lines by temporarily widening the editor up to the available full width, without changing layout or height. Suggested interaction: a dedicated expand control overlays neighbouring content while held, restoring width on release, with click/tap toggle and keyboard support as alternatives. Avoid taking ordinary presses away from code selection or touch gestures. Preserve caret and scroll position, and retain horizontal scrolling for lines beyond the width cap. The hold gesture was superseded by the adopted right/left triangle toggle on two-column layouts. The toggle now overlays the neighbouring questions without changing layout or height; single-column layouts hide it. See [editor presentation](docs/style-guide.md#code-editor-presentation).

## ESP Task 2 shared run output — 3 November 2026

Run whatever test inputs are available and always give useful feedback below the editor, including when inputs are missing or supplied defaults are used. Execute each test once and reuse its result in a compact display beside the recorded actual-result fields. Use minimal Valid/Invalid test result labels; retain both code versions, with Original code collapsible. Preserve later editor styling and interactions. [Current execution contract](docs/esp/task-2-designs.md#current-execution-contract--agreed-3-november-2026).

## ESD scenarios with deduction and evaluation — 15 November 2026

Proposed: add a new set similar to `hCAIK6CCo`, using Education for Sustainable Development scenarios. Original idea: deduce recycling facilities to build from cost constraints and energy/emissions savings, then answer multiple-choice questions evaluating the deduced choice using ESD principles. Consider a hybrid question or a set combining selected puzzles with exam questions. Discuss before implementation; no architecture or content decision adopted yet.

Candidate alternatives: allocate refurbished laptops to community projects, or match digital services to hosting options. Each combines a logic grid with evidence-based choices about environmental, economic and social effects. Keep genuinely assessed Core knowledge distinct from general ESD reasoning.

Source for ESD framing: UNESCO, [Education for Sustainable Development Goals: learning objectives](https://www.unesco.org/en/articles/education-sustainable-development-goals-learning-objectives), 2017; consulted 15 November 2026. Environmental, economic and social consequences inform the proposed evaluation; illustrative facility figures are invented, not empirical claims.

15 November follow-up: figures must be broadly defensible against actual costs, emissions and energy, with realistic capacities and utilisation for a comparable city/catchment. The earlier invented table is not suitable for publication. Extend the idea to stages: budget clues first leave several feasible options; later packaging-policy/material-flow evidence and minimum environmental targets narrow the choices; conclude with ESD evaluation. Preserve the distinction between an enacted rule and an assumed response to it. Source leads and unresolved evidence are in [ESD reference notes](references/esd/README.md). Staged interaction and marking remain proposals, not implemented features.

15 November scope refinement: initially develop two ESD puzzle/multiple-choice activities. One is a simpler starter using initial costs only, with no running costs. The second is a slightly longer activity involving more detailed decisions and relevant elements of CA6.1.2–6.1.4: data sources, ethical data practices and quantity/timeframe/source/veracity, and organisational uses of information. Include these only where they reasonably inform the scenario; avoid unmanageable complexity. Suggested design, not yet adopted: reuse one city and facility shortlist; add a small evidence pack and a single operating-cost horizon to the longer activity. Surveys, delivery transactions and connected sensor records could support source/quality/monitoring questions. AI feedback loops are a possible replacement challenge question, not a mandatory extra section. No requirement to cover every example under the three references in these two activities.

15 November timing/accessibility correction: target about six minutes for the starter and at most 12–15 minutes for the longer activity. These replace the proposed 10-minute and 20–25-minute targets. Only small, relevant selections from CA6.1.2–6.1.4 are needed; extensive coverage in one activity is unnecessary. The mixed-ability group requires an approachable core task. Revised proposal: starter with one small cost-matching puzzle, a bounded feasible-choice decision and two brief multiple-choice questions; longer activity with two short evidence stages, at most two evidence cards and three multiple-choice questions in total. Prefer data source and reliability/timeframe as the first CA6 selections; rotate other elements into later variations. Use short wording, rounded defensible figures, visible units, optional first-step hints and modest calculations. Keep any extension outside the required core and within the overall time cap.

15 November stage clarification: the starter can have 2–3 stages followed by a multiple-choice evaluation; manageable complexity, not fewer stages, is the requirement. The longer activity should require more thinking and deduction with slightly more complex data, such as running costs alongside building costs. The previous proposed reductions in stage/question count and supplied running-cost totals are not adopted requirements. Retain the six-minute and 12–15-minute targets, approachable mixed-ability core, defensible figures and selective CA6 content. Use short, simple deductions in the starter; use more interacting constraints and meaningful cost calculations in the longer activity.

15 November drafts requested: [two content drafts](docs/esd-activity-drafts.md) now provide student stages, optional hints, evaluation choices and separate teacher answers. Record actual references used for every numerical figure, with derivation and rounding; each eventual puzzle page must reveal its references when a small Sources link is clicked. The drafts include Sources disclosures and a [numerical provenance ledger](references/esd/draft-figures.json). Content review is authorised; live question-bank/UI implementation is not yet authorised.
