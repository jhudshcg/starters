# Student experience and durable shared codes

Status: adopted teacher decisions, September 2026. This records **why** the changes were made; [common behaviour](../spec-common.md), [authoring rules](../content-authoring.md) and [style guide](../style-guide.md) define the ongoing contract. It supersedes earlier instructions to reject any changed question fingerprint.

## Review access and one-click answers

Hide Check answer and Show answer until the active attempt has been submitted. Retain access for four hours, including across refreshes, and show answers with one click. Keep hints available before submission.

Previously, students encountered an answer disclosure containing disabled controls before they could use them, then had to open it before revealing an answer. The extra interaction offered no educational benefit. Requiring a submission still encourages an initial attempt; the four-hour window uses the same familiar duration as repeat-attempt tracking and avoids requiring another submission merely because the page refreshed. The two rules have different purposes: review access is for the active attempt; tracking eligibility prevents rapid repeated practice from distorting progress. Renewing review never rewrites the submitted score or creates a duplicate record. A fresh retry requires submission again.

## Selectable theme

Provide a dark-theme toggle and save the choice in browser storage. Students work in different lighting conditions and have different visual preferences; a selectable theme gives them control without imposing one appearance on everyone. The control, question feedback, puzzle controls and progress views must remain readable in both themes. The preference is local to that browser, not a synced account setting.

## Content reports

Offer Bug and Content issue from every page. Previously, `context.questions.length` determined whether Content issue existed, so it disappeared on Home and My progress. This was a context-dependent UI restriction, not removal of the report implementation. Question selection is useful when a set is visible, but it should not prevent a student reporting content from elsewhere. Include exact item codes when available; otherwise accept a description. Opening or copying a report does not send it automatically.

## Go rules link

Use the British Go Association's illustrated introduction at <https://www.britgo.org/intro/intro2.html>. The previous online-go.com link was reported as unavailable or blocked at college. The replacement has a suitable introductory explanation and no `game` in the URL. This reduces reliance on a potentially blocked host; it does not establish that the college firewall permits the new host. Classroom access remains a local check.

## Puzzle selection cards

Use labelled, clickable visual cards instead of a subtype dropdown. Puzzle families are easier to discover and compare when their names and visual cues are visible. Use native buttons, a clear selected state, keyboard access and wrapping at narrow widths/high zoom. Keep challenge selection separate and preserve existing leave-with-unsubmitted-answers behaviour.

## Shared codes identify questions, not frozen wording

Teachers put codes in lesson materials; students share and revisit them. A hint improvement, spelling correction or marking refinement should not break those links. Earlier fingerprint equality checks were intended to guarantee identical content, but applied too broadly and made routine maintenance disrupt classroom resources.

Adopted rules:

- Corrections/refinements keep permanent question and variation IDs. Old codes open current content and show the discreet notice: “This set has been updated since this code was created.”
- Substantive changes to the task, assessed concept or required solution create a new question ID. Do not repurpose an existing identity simply to avoid adding a question.
- Prefer retirement for superseded content: exclude it from new random selections while preserving deliberate access by code.
- Removal is for content that should no longer be accessible. Affected sets explain the unavailable item and offer an explicit replacement-set action. Never silently substitute questions.
- Never recycle removed slots or variation positions. The code-history tooling checks this.
- Keep fingerprints and revision metadata: they identify updates, preserve historical marks/focus metadata and detect stale active work. They no longer generally reject surviving questions.

The trade-off is deliberate: a code preserves the question/variation identity, not an immutable copy of every word. No historical answer archive is promised. Revision 1, the original demonstration bank previously withdrawn by the teacher, remains unsupported.

## Protect progress when content changes

Historical scores are evidence of the attempt actually made and must not be recalculated. New results record the revision actually marked, even if entered using an older shared code. Old/current aliases of the same question identities share the four-hour repeat window, so using another code version does not bypass tracking rules.

An active attempt records its content revision. If those questions change before it is resumed, start a fresh attempt instead of marking old inputs against changed questions. Existing history remains untouched. This favours trustworthy scores over attempting an unreliable automatic migration of saved answers.

## Verification recorded for these decisions

The implementation was checked with 104 automated tests, bank validation and production builds, plus browser checks of old links, notices, progress, theme persistence, keyboard puzzle selection and narrow layouts. These checks establish application behaviour, not classroom calibration or college-network availability. No ESP content was part of this implementation.
