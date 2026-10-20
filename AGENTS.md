# DSD T-Level year 1 starters

## Purpose and audience

The aim is to create a set of permutable starter activities (5 - 15 minutes) for Digital Software Development T-Level students in year 1, studying the Core component of the spec.

They are generally 16-18 year olds, mixed ability and varying experience and subject skill levels (none to moderate/high).

The starter will be accessed through an HTML page. The starter activities should offer:

- puzzles
- short series of spec related multi-choice or short text answer questions
- Python programming challenges (complete the code, fix the code, write a function, etc.)

Exam practice now includes separate Core and ESP banks. This extends the original Core brief; use the specialist guides below for their distinct requirements.

static Github pages site.

## Engineering guidance

For code changes, follow [code style](docs/CODE_STYLE.md) and the [code comments policy](docs/CODE_COMMENTS.md). Use [local development](docs/local-development.md) for development and verification commands, and the [documentation index](docs/README.md) to select relevant specialist guidance.

Run [project-refactor-checks](.agents/skills/project-refactor-checks/SKILL.md) at least once per development session. Follow its ordered review stages and discussion gates; a review does not authorise unagreed refactoring.

For framework work, read the [refactoring brief](T_LEVEL_REFACTOR_AGENT_GUIDE.md), [application ownership](docs/application-architecture.md) and [repository readiness review](docs/reviews/2026-10-07-refactor-readiness.md). Full migration was authorised on 14 October 2026. The ownership map describes the implemented architecture; the readiness review remains historical evidence.

## Working efficiently and preserving handovers

For exam-related work, use the [exam resource map](docs/exam-resource-map.md) to select only the relevant specification, paper/task, mark scheme and commentary.

- Work efficiently: reuse existing research, cached references, tools and completed checks. Do not repeat downloads or investigations when the required material is already available.
- Save downloaded reference material that may be useful in future in the repository, with source URLs and enough metadata to support reuse. Reference importers must use the local cache first. Keep temporary build/browser artefacts outside the repository.
- **Before starting any job expected to take more than 20 seconds, persist its plan in `checkpoint.md`.** Use a dated current work plan with the objective, scope, concrete steps and checks. This applies to follow-on jobs as well as the initial task.
- Use [DEV_LOG.md](DEV_LOG.md) for completed development history in chronological order (oldest first, append new entries): area of focus, files edited/created/deleted, challenges, key decisions and rationale, and bug finds/fixes. Follow the [documentation policy](docs/CODE_STYLE.md#documentation).
- Keep `checkpoint.md` focused on current work: mark plan steps when done and record current failures, outstanding decisions, relevant files, useful commands and the exact next action. On completion, move the durable work record into `DEV_LOG.md` and replace stale checkpoint material with the current handover. Preserve meaningful historical evidence in the log rather than accumulating old sessions in the checkpoint.
- Keep original feature ideas in [feature_ideas.md](feature_ideas.md), implementation tasks in [planned work](docs/planned-work.md), specific requirements/resources in `docs/`, and general developer documentation in `README.md`.
- Record verification results and remaining limitations honestly. Keep completed historical entries in `DEV_LOG.md`; correct stale assumptions in the current checkpoint rather than treating old status text as current truth.

## Read the relevant requirements before changing work

The linked documents own the detailed requirements previously held here. Their authority is unchanged by the move. Explicit recorded teacher decisions supersede older defaults; a section labelled **Proposal** remains a proposal until adopted. Do not infer adoption from implementation alone. Where status or conflicting requirements are unclear, ask before changing their meaning.

| Work | Required guidance |
| --- | --- |
| Shared data, question/set codes, permutations, navigation, marking and timers | [Common specification](docs/spec-common.md); [code compatibility and rollover](docs/code-rollover.md) |
| Puzzle content and interactions | [Puzzle specification](docs/spec-puzzles.md); [local examples and source links](example_puzzles/links.md) |
| Core exam content, marks and coverage | [Exam specification](docs/spec-exam.md); [exam resource map](docs/exam-resource-map.md) |
| ESP content and assessment | [ESP source guide](docs/esp/source-guide.md); [tasks and assessment](docs/esp/tasks-and-assessment.md) |
| Python programming challenges | [Python specification](docs/spec-python.md) |
| Progress, profiles, revision priorities, practice time and backups | [Progress specification](docs/spec-progress.md) |
| Presentation, accessibility and themes | [Style guide](docs/style-guide.md); [theming](docs/theming.md) |
| Implementation, comments, testing, build and hosting | [Code style](docs/CODE_STYLE.md); [code comments](docs/CODE_COMMENTS.md); [local development](docs/local-development.md); [README](README.md) |

The [documentation index](docs/README.md) links supporting evidence and reviews. The [consolidation record](docs/decisions/2026-10-agent-guidance-consolidation.md) maps the original sections and retains superseded wording with its replacement decision. Historical plans and checkpoints do not override later adopted requirements.

## Content and documentation wording

For further project spec files, for specific question types and features and style, content must remain high signal, accurate and concise. Avoid all synonym rotation in text, call a spade a spade.

For content changes, including hints, follow [content authoring](docs/content-authoring.md) and [content refinement](docs/content-refinement.md). Type specifications retain specialist requirements.

## DEV_LOG specific guidance

Keep responsibilities distinct: dated decisions/progress/issues in DEV_LOG; **only current state and next steps in HANDOFF**. Update HANDOFF at meaningful milestones during longer work, before a risky transition or pause, and at the end—not just when a session finishes. Record incomplete edits, running processes, last evidence, failures and exact next action so interruptions are recoverable. Never disguise an untested change as verified or overwrite historical results with present-tense claims.

The DEV_LOG is for dated and titled entries recording:

- concise summaries of work done and issues or bugs identified and the general area(s) of focus
- decisions made and considered, with the rationale and any main rejected options and reasons for rejection.
- files edited or created and for what purpose
- any use of new frameworks or libraries (with the justification) and any discontinued use of such and why.
- what app features or requirements are related to the work carried out or decisions made.
- the key challenges being focused on and any remaining issues or uncertainties (it's very important to be honest here so issues don't get minimized or forgotten)

Apply these rules to dev log entries:

- Verification: record what was checked, the outcome, and anything not verified. Distinguish automated checks from visual inspection or user acceptance.
- Status: distinguish proposed, agreed, implemented and verified work. State explicitly whether anything was committed or deployed when relevant.
- Historical integrity: record later corrections or changed decisions in a subsequent dated entry; don’t rewrite earlier uncertainty or failures as though they never happened.
- Cover the applicable points; do not create empty sections or repeat unchanged information. Group files by purpose where helpful, using explicit paths.

Language in the dev log should be concise, but not so compressed that it becomes hard to figure out what took place and why in the codebase when looking back. Be precise but avoid jargon, unless technical terms are justified. Be consistent in terminology and avoid uncessarily calling the same thing by different names (call a spade a spade).

In DEV_LOG, use exactly one blank line between paragraphs and around headings. When appending entries, account for existing trailing newlines so extra blank lines are not introduced.

Avoid referring directly to the developer or teacher in the dev_log. e.g. instead of 'The teacher approved ...', just use 'approved ...' or 'discussed and approved ...'.
