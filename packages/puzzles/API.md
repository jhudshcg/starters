# Puzzle integration API

Use a resolved variation (`question.variations[index]`), not the catalogue template. Render the question's title, variation prompt and any source attribution in the parent-owned question card. The package renders all answer parts, board-specific guidance and interactions. The parent chooses order/grouping and owns codes, submit/check/reveal buttons, persistence and tracked results.

## Ready-made control

```js
import {mountPuzzle} from './packages/puzzles/player.js';

const control = mountPuzzle(container, variation, {
  instanceId: 'question-one', // Optional; defaults to a unique ID for this module instance.
  state: savedAnswers,       // Optional; map from part IDs to answer strings.
  locked: false,
  tools: true,              // Show internal Undo/Reset controls.
  assistance: true,         // Offer puzzle-specific assistance, currently Go next-move hints.
  liveFeedback: true,       // Show recorded Go success immediately; never submits.
  onChange: (answers, event) => persist(answers),
  onAssist: event => recordAssistance(event),
  onStatus: event => showLiveStatus(event),
  onMessage: message => announce(message)
});
```

`instanceId` must contain only letters, digits, hyphens or underscores and must be unique on the page. Use explicit IDs when multiple copies/versions of the library are loaded. Mount each control into its own container; destroy the previous control before mounting a replacement. The initial state is cloned. All answer snapshots are JSON-serialisable and detached from internal state. Store puzzle/variation identity alongside the answer map; do not resume it against different content.

Callbacks do not access storage or record progress. `onChange` supplies an answer snapshot and either a `partId` or `kind: 'reset'`. `onAssist` reports `kind: 'next-move-hint'` when the puzzle's own hint is requested. `onStatus` reports `instanceId`, `partId` and `recordedWin` for a played Go move; it does not award tracked marks or submit. The default renderer can show that win immediately; set `liveFeedback: false` to leave that presentation to the parent. User-facing action errors are passed to `onMessage`.

| Method | Behaviour |
| --- | --- |
| `getState()` | Return a detached answer snapshot; no checking. |
| `setState(answers)` | Restore caller-supplied state, clear displayed results, redraw; no change callback. |
| `setLocked(boolean)` | Lock/unlock edits while retaining state. Locked Go solution replay remains usable. |
| `reset()` | Clear answers and displayed results and notify the parent, unless locked. |
| `getMaximumMark()` | Return available marks without evaluating an answer. |
| `evaluate()` | Explicitly evaluate current answers; return a result without storing/displaying/submitting it. |
| `getResult()` | Read the last result supplied by the parent, or null. No evaluation occurs. |
| `setResult(resultOrNull)` | Display/clear per-part feedback, without recording or submitting anything. Edits invalidate it. |
| `showHint(boolean = true)` | Display/hide the authored hint at the parent's request. The parent records assistance. |
| `showSolution(boolean = true)` | Display/hide a separate model-answer view. Never overwrite student state. The parent records assistance. |
| `destroy()` | Remove controls, listeners and active pointer handlers. Idempotent. |

The parent may evaluate locked answers during submission/review. It may also restore state while locked; locking controls student edits, not parent authority. There is no automatic submit, timer, result history or attempt policy.

## Headless checking

```js
import {evaluatePuzzle, maximumMark} from './packages/puzzles/evaluation.js';

const maximum = maximumMark(variation);
const result = evaluatePuzzle(variation, savedAnswers);
// { earned, maximum, complete, parts: [{ id, earned, max, blank, message }] }
```

`complete` means full credit, not that the parent has submitted the activity. Blank, wrong and partial answers receive the appropriate marks and feedback. Dependencies between parts are evaluated in authored order. Neither function mutates the puzzle or answers; checking does not reveal explanations. Board answers are JSON strings; ordinary answers are strings. Consumers using the ready-made control need not interpret either.

Use readable parts with checking data for evaluation and solution data for reveal. The package knows nothing about app-specific compressed payloads. The existing app hydrates these in its adapters, preserving separate checking/reveal paths.

## Custom composition

`renderPart(part, answer, options)` from `ui/render.js` produces a complete answer-part fragment. Options include `instanceId`, `index`, `locked`, optional per-part `result`, and the three control options above. `labelHTML` is an optional trusted parent-authored label; never pass untrusted user HTML. `renderHint(variation)`, `renderSolution(variation, instanceId, options)` and `renderSolutionPart(...)` support parent-positioned assistance views.

For imperative board fragments, `bindChallenges(root, callbacks)` from `ui/boards.js` accepts `getPart(instanceId, partId)`, `getAnswer(instanceId, partId)`, `isLocked()`, `onChange(instanceId, partId, answer, focusSelector)`, `notify`, `onAssist` and `onStatus`. Re-render the changed fragment when notified and restore focus with the supplied selector. The returned disposal function removes listeners; `{preserveDrag: true}` is only for immediate redraw into the same root during a pointer gesture. Always fully dispose on unmount. The ready-made control handles this lifecycle for ordinary consumers.

Simple input/radio fragments expose `data-slot` (the opaque instance ID) and `data-part`; a custom renderer's parent can handle their normal input/change events. These attribute names preserve the original app integration and do not impose its code scheme. `state.js` supplies `hasAnswer(part, answer)` to distinguish meaningful work from selection/history metadata when the parent needs a navigation warning.

Use [optional CSS and graphics](styles/README.md), map semantic theme tokens and override element/container styles in the parent. The package never reads the current app's theme IDs.

## Verification

From the repository root, `node --test packages/puzzles/tests/*.test.js` checks content, all answer kinds and headless rendering. With the dedicated Chrome profile on port 9227, `node scripts/browser-puzzle-player.mjs` builds a temporary package-only fixture and checks all nine types, isolation, state, explicit marking, lock/restore/reset, disposal, hints, Go completion/replay and continuous path dragging. It does not require the parent app or a running development server.
