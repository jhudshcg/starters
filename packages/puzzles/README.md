# Shared puzzle library

This directory is the authoritative source for puzzle content, rendering, interactions and evaluation. It currently lives in the T-Level starters repository as ordinary source files. It is not yet a Git submodule and requires no separate website hosting.

The library contains 1,120 question templates across nine puzzle types. Source files retain existing questions, variations, hints, answers, explanations, attribution and validation evidence. Teacher difficulty review and classroom timing remain outstanding.

## Consuming the library

The [adopted boundary and rationale](ARCHITECTURE.md) separates puzzle expertise from parent activity policy. Use the [integration API](API.md) for a mountable control or composable rendering and headless marking. No consumer needs its own Sudoku, Go, tangram or maths checker.

```js
import puzzles from './packages/puzzles/catalogue.js';
import {mountPuzzle} from './packages/puzzles/player.js';

const question = puzzles.find(question => question.id === 'puzzle-110');
const variation = question.variations[0];
const control = mountPuzzle(document.querySelector('#puzzle'), variation, {
  state: savedAnswers,
  onChange: answers => saveAnswers(answers),
  onAssist: event => recordAssistance(event)
});

// Parent-owned submission handler:
const result = control.evaluate();
control.setResult(result); // Optional: show the returned per-part feedback.
recordResult(result);      // Parent policy, not a package side effect.
```

`saveAnswers`, `recordAssistance`, `recordResult` and `savedAnswers` are supplied by the parent. The parent also supplies the container, question heading/prompt, source attribution, question codes and submission controls. The control renders answer parts and their instructions; it does not duplicate the parent question card. Call `destroy()` before removing it. CSS is optional and imported separately.

Headless consumers can call `evaluatePuzzle(variation, answers)` and `maximumMark(variation)` from `evaluation.js`. The result contains `earned`, `maximum`, `complete` (full credit) and `parts` feedback. Low-level rule helpers remain available for specialised integrations. Merely reading state or the last displayed result never evaluates answers or reveals a solution.

Catalogue, metadata and evaluation have no DOM requirement. The optional player/renderers use browser APIs. Algebra uses the declared `mathjs` dependency, supplied by the parent app here; use a bundler that resolves npm imports. No runtime module imports files outside this library, storage, app codes or theme names. No CSS or network request is initiated automatically.

Do not bundle the catalogue into every page merely to use a renderer or evaluator. Entry points are separate. Content includes solutions: consuming apps may split display, checking and reveal payloads. Client-side packing prevents accidental display; it is not answer secrecy. This app's adapters decode only the payload needed at the time.

## SvelteKit, daisyUI and Bits UI

Use a small Svelte wrapper around `mountPuzzle`; no framework-specific adapter is supplied. This exact stack has not yet been integration-tested.

- Mount into an empty, bound container inside Svelte's `onMount`, and return a cleanup function calling `control.destroy()`. Let the package own that container's children. Mounting is browser-only; catalogue and evaluation can also run on the server.
- Pass plain state/results. For Svelte 5 reactive proxies, use `$state.snapshot(...)` before passing them to the control, which clones its inputs. Receive edits through `onChange`; avoid feeding every callback straight back into `setState`, which redraws the control.
- Import optional package CSS globally. Use global selectors or Svelte's `:global(...)` for generated elements. Map daisyUI semantic colours onto `--puzzle-*` properties on the container, for example `--puzzle-surface: var(--color-base-100)` and `--puzzle-text: var(--color-base-content)`. Check CSS layer precedence when overriding defaults; package controls do not automatically acquire daisyUI component styles.
- Bits UI can own surrounding dialogs and menus. For portalled puzzles, ensure theme variables reach the portal destination and check keyboard focus, dragging and scrolling within the dialog.

The parent still owns submission, persistence, codes and results. See the [API](API.md) and [style contract](styles/README.md) for the available controls and overrides.

## Content contract — schema 1

- `id` is a permanent library question identity, initially `puzzle-<original slot>`. Do not rename it when changing titles, tags or challenge labels.
- `variations[].id` is permanent within that question. Existing variation order is preserved. Never reuse removed IDs or reorder existing variations.
- `legacySlot` records the original T-Level slot for its compatibility adapter. New consumers should map library IDs to their own codes rather than adopt this field as their codec.
- `type` matches a `puzzleTypes[].id`. Type metadata includes a default name, instructions, guidance and links. Question-specific instructions and source links remain authoritative for that instance.
- `challenge` is an ordinal integer from 1 to 4. `challengeBands` supplies default labels, descriptions and legacy keys. Apps may replace labels without changing the value. Reclassification for another audience requires an explicit local override.
- Go additionally retains `rank: {value, unit: 'kyu'}` and the original numeric `sourceRank`. Broad bands are 25k+, 18–24k, 12–17k and 11k or stronger. They never replace individual source ranks. The current catalogue contains kyu ranks; future dan ratings need an explicit schema/mapping extension.
- `tags`, `estimatedMinutes`, source attribution and authored variation/part fields are preserved. Solutions can be witnesses rather than unique accepted answers: tangrams and dot paths must use their rule checker.

Difficulty is not a measured cross-family scale. Source Go ranks, authored bands and suggested durations do not establish classroom calibration. Empty type link lists mean no general link is supplied; question-level attribution is retained separately.

The initial raw authoring files still use historical slot/focus/challenge fields. `catalogue.js` converts these to the public contract. Stable IDs currently derive from permanent slots; never recycle those slots in these files. Migration to a different authoring format must preserve all public identities.

## Ownership and maintenance

Edit content under `data/`, rule helpers under `rules/`, and family guidance in `metadata.js`. The parent app's `data/puzzles.js` adapter restores its existing fields and three-question set policy. Its `js/*-rules.js` adapters decode packed Go trees before calling portable rules. Puzzle controls and all supplied answer-kind evaluation now live in this package. App modules are adapters for packed data and parent-owned state. Question cards, grouping, submission, progress and code schemes remain in the parent app.

The existing authoring scripts, independent Python validators, cached source references and detailed authoring requirements still live in the parent repository. Their paths have been updated to target this library. Consult `docs/spec-puzzles.md`, `docs/content-authoring.md`, `docs/content-refinement.md` and `references/go/README.md` there before editing content. Before splitting repositories, transfer the applicable tools, cached evidence and authoring instructions with the library, preserving attribution. Do not regenerate the existing bank merely to move it.

From the parent repository:

```sh
node --test packages/puzzles/tests/*.test.js
npm run codes:check
```

The library's own `npm test` runs its portable catalogue/rules checks. Parent tests cover app adapters, sharing, packed delivery, selection and more detailed puzzle validity. Content changes require the existing identity update and review workflow; structural extraction alone must pass `codes:check` without a new revision.

## Future separate repository

There is currently no `.gitmodules` entry or pinned child-repository commit. Keeping the package in the T-Level starters repository deferred the separate repository and Git submodule setup.

Once needed, move this directory and its maintenance dependencies into a separate repository, then use that repository as a submodule at the same path. Keep app imports and code mappings unchanged. Consumers pin a commit and update deliberately. No Pages deployment is required for the library; each app hosts its own compiled assets.

Before adopting a real submodule, update the parent's staged-source build hook: `git checkout-index` does not materialise submodule contents. The hook must build the exact staged gitlink commit, not the submodule working tree. Developer checkout instructions and any build CI must initialise submodules. This work is deferred while the directory remains ordinary tracked files.

## Optional presentation

Import `styles/index.css` for scoped layout and default appearance, or `styles/layout.css` for geometry with your own theme. Use `graphics.js` for default type icons/artwork and tangram piece colours. Neither is loaded automatically. The [style and markup contract](styles/README.md) documents imports, overrides, accessible state and a standalone example. The T-Level app now consumes these defaults through its own theme adapter; the package now supplies framework-independent embeddable controls and separate render/bind APIs.
