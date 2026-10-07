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

For the framework migration, read the [refactoring brief](T_LEVEL_REFACTOR_AGENT_GUIDE.md) and [repository readiness review](docs/reviews/2026-10-07-refactor-readiness.md). The review is an assessment, not approval to start the migration.

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

For further project spec files, for specific question types and features and style, content much remain high signal, accurate and concise. Avoid all synonym rotation in text, call a spade a spade.

For content changes, including hints, follow [content authoring](docs/content-authoring.md) and [content refinement](docs/content-refinement.md). Type specifications retain specialist requirements.
