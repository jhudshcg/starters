# Current work — 20 October 2026

## Active rollout plan
Teacher authorises selective production rollout to a good handful of programming questions, retaining paper-style questions where editing adds little, and preferring at least one editor question in most suitable programming sets.
1. Inspect bank, selection, packing and attempt/component integration; choose six high-value programming tasks with five variations each.
2. [Approved] Teacher approved the focused checks and rollout in the current turn. All production review gates required for this scoped rollout are now agreed.
3. Once the required gate is agreed, implement shared editor/runtime packaging, question-owned modes/actions, exact-source asynchronous submission and persistence/cancellation through the existing attempt service.
4. Add/adapt the agreed tasks and prefer an editor task in eligible sets without forcing execution into paper-style practice. Preserve stable identities/codes.
5. Run targeted independent Python, selection/packing/lifecycle and production browser checks; build and provide actual set links. Record progress and limitations.


## Completed follow-on
- All 18 Python projects now have initially closed Getting started guidance, planning pointers, module suggestions and Easy/Medium/Harder ratings with the teacher's calibration. Original briefs/topics/stretch features preserved.
- Coding preview: new function-call fields are blank, empty Run prompts without execution, unavailable execution controls are hidden, Stop appears during execution and submitted Reset is hidden. Previously saved calls are retained.
- Five focused unit tests, production build, pilot browser suite, temporary 18-project browser check, formatting and whitespace pass. Durable details and official references are in the latest DEV_LOG.md entry.
- Recorded reuse of existing practice levels (Beginner, Foundation, Standard, Stretch and Mixed challenge) for Python editing support. This and hint-driven mode switching are not implemented yet.

Review links:
- http://127.0.0.1:8768/projects/ — current production build, server session 68024.
- http://127.0.0.1:8767/prototypes/pyscript/pilot.html?config=mixed&variation=1 — standalone programming pair.
- http://127.0.0.1:8767/prototypes/pyscript/ — original editor/library trial.

## Next work and existing approvals
1. Continue teacher review of the programming pair and proposed challenge/hint policy. Beginner should favour choices, Foundation marked regions; Standard/Stretch less guidance where supported. Choices-only questions remain possible. Showing hints can offer choices, hiding returns to the configured default; preserve code and assistance records. Resolve how to handle manual edits that prevent safe substitution. Do not reset edits automatically. Execution permission remains separate.
2. Stage 3 production requirements: confirm final content/marks and progress/evidence treatment. The review pair has five variations, two six-mark tasks, mixed/practice/assessment configurations. Separation of learning scores from independent readiness is still unapproved.
3. Stage 4 production test-quality agreement, then integrate the agreed shared editor/runtime and Svelte host through the existing attempt service. Stage 1 configurable execution access and Stage 2 architecture were already agreed; do not reopen those gates.

Important files: docs/spec-python.md, docs/planned-work.md, docs/application-architecture.md; js/python-projects.js; prototypes/pyscript/pilot.{html,js,css}, pilot-questions.js, adapter.js, regions.js and README.md. New preview uses only starters-pyscript-pilot:v1, not application profiles/progress. Production integration must preserve frozen exact source/results, asynchronous pending failures, cancellation, profile ownership, timers, backup/sharing and responsive code visibility.

Checks: node --test tests/pyscript-pilot.test.js tests/discovery-guide.test.js; node scripts/browser-pyscript-pilot.mjs. Project check: /private/tmp/check-python-projects.mjs (isolated Chrome 9227). Logs: /private/tmp/python-projects-{pilot-unit,build,browser}.log, /private/tmp/pyscript-pilot-browser.log. Images: /private/tmp/python-projects-{320,1280}.png and /private/tmp/pyscript-pilot-{320,1280}.png. The browser is left on the projects page with disclosures closed, using Project Preview Test on port 8768. Never connect test scripts to a personal browser.

Preserve unrelated code-entry/live changes. No commit/deployment authorised. No full-suite run needed for the completed content/preview changes. Edge/Windows, cold startup, screen readers and native popup operation remain unverified. Next action: teacher review; no new approval question is pending.
