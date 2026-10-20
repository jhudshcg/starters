# PyScript question trial

Local prototype authorised on 19 October 2026. It demonstrates editable Python and question-owned interactions without changing the live question framework or student progress.

## Run

From the repository root:

```sh
python3 -m http.server 8767 --bind 127.0.0.1
```

Open <http://127.0.0.1:8767/prototypes/pyscript/>. Python downloads on first run. Choose the data example to load pandas and matplotlib. The trial saves drafts under its own `starters-pyscript-trial:v1` localStorage key; results do not enter application profiles.

Three examples exercise different requirements:

- The actual workshop function from Task 2, with three valid and five invalid-input cases. Repair the upper boundary and exception handler to pass all eight.
- An original die function using `random`, with twenty seeded bounds checks.
- An original pandas calculation with a matplotlib bar chart, returned as a PNG.

The preview exposes three editing modes:

| Mode | Interaction |
| --- | --- |
| Choose replacements | Use the small dropdown beside each outlined region. All other code is fixed. Repeated substitutions preserve the region and its control. |
| Edit marked regions | Type or paste within outlined regions. Changes extending outside them are rejected as a whole. Empty regions retain an insertion control. |
| Edit all code | Edit anywhere. Changes elsewhere move suggested regions; edits within or at either edge of a region remove its special outline and selection behaviour. |

Click an outlined region to select it; click again to position the cursor. Selection transfers emphasis automatically. The shading checkbox adds an optional background. Manual edits block returning to Choose replacements while the source differs from the original. Returning to the exact original text, by typing or Undo, restores the original regions and mode eligibility. Reset code explicitly restores the original code and clears undo history. Mode changes preserve source and separate undo groups. Compact inline dropdowns join the code flush, with one outer border, a straight divider and rounded outer corners. Choice regions and their controls stay together on each source line; long choices can scroll within the editor on narrow screens. Keyboard focus emphasises the code region without changing the editor selection. The mode selector is 20ch wide, capped to fit its container. Future questions can expose only appropriate modes; all three are available for comparison in this trial.

Run code uses the editable function call and supplied input lines; Run question tests uses question-owned calls and cases. These are interaction demonstrations, not final assessment prompts. Earlier source-only drafts recover their regions when the complete source matches fixed question text plus authored replacement choices. Other drafts keep their edits in Edit all code with an explanation. A draft with no surviving regions cannot enter a restricted mode; Reset code restores the original regions. Free-edit invalidation persists unless the entire source returns to the exact original.

## Integration boundary

### Programming pair for teacher review — 20 October 2026

Open [the interactive draft](http://127.0.0.1:8767/prototypes/pyscript/pilot.html?config=mixed&variation=1). `pilot.html`/`pilot.js` reuse this editor/runner for two six-mark questions, with five variations in `pilot-questions.js`. The delivery repair offers replacement choices and marked-region editing, plus Run and Check. The range-count function uses full editing and Check. Preview settings support practice-then-assessment, all practice and all assessed; the URL preserves configuration and variation. Assessment permissions apply to keyboard execution and commands as well as buttons.

Drafts, run/check counts and submitted results use the separate `starters-pyscript-pilot:v1` key. Submission saves and locks both sources before testing; interrupted checking can be retried against that source. Model solutions appear only after both submitted checks complete. Scores are for review only: no application profile, readiness or progress records are written, and the final production evidence policy is still undecided. Changing configuration opens a separate draft; these are review controls, not proposed student assessment switches.

New attempts leave the function-call field blank; running with no call prompts for one without starting Python or counting a run. Previously saved calls are retained. Unavailable execution controls are hidden, Stop appears during execution, and submitted questions omit Reset. The proposed challenge-level defaults and hint-driven mode switching are recorded in the Python specification but are not yet implemented here.

`node --test tests/pyscript-pilot.test.js` checks all variations against real Python, alternate valid code and boundary/duplicate/return faults. `node scripts/browser-pyscript-pilot.mjs` checks the three configurations, keyboard restrictions, Run output, actual marking, submission locking, reload and narrow/desktop layouts in the isolated browser. Screenshots use `/private/tmp/pyscript-pilot-{320,1280}.png`. This is an explicitly requested review preview; production integration and its remaining requirements/test gates are not complete.

### Application integration still pending

`regions.js` owns stable IDs and current positions in CodeMirror StateFields, renders decorations/widgets, filters changes and integrates region restoration with CodeMirror undo/redo. Initial author definitions use unique original fragments, resolved once and rejected if ambiguous or overlapping. Subsequent actions use IDs and positions, never searches for old text or saved DOM nodes. In-code native selects have region-specific alternatives and accessible labels. Keyboard selection uses ordinary editor navigation; Tab reaches inline choices after escaping editor Tab handling.

Drafts persist source, mode, shading, manual-edit status and surviving region positions together. The original source is recorded to avoid restoring metadata against a changed authored example. Recovery of older metadata uses an anchored whole-source match, not loose searches for fragments. Undo history is session-only. `adapter.js` exposes source, selection, region operations, snapshots and disposal around PyScript's CodeMirror editor. It uses the exported CodeMirror modules and public view APIs; one isolated shadow-root lookup depends on the pinned editor structure. Recheck that lookup when upgrading PyScript. The question toolbar owns execution; the redundant PyScript hover play button is removed, while its retained handler still supports Ctrl/Cmd+Enter. Escape, then Tab leaves the editor.

Execution uses PyScript's `PyWorker` with `sync_main_only: true`, calling the exported Python `run_cases` function. No SharedArrayBuffer or special response headers were needed in the local browser check. Each case receives a fresh namespace and queued input; observations include stdout/stderr, return value/type, exception/source line, input consumption and optional charts. Source/input edits invalidate results and cancel an active run. Question changes discard late results. Stop and the five-second execution timeout terminate the worker; the next run creates another. Startup has a separate ninety-second deadline. Cancellation during asynchronous worker creation disposes the worker when the factory resolves.

This is not yet the application's attempt or marking adapter. The next production slice should connect one programming question and one Task 2 question to saved source, exact-source execution results and existing attempt ownership. Navigation, profile changes, timers and submission need explicit lifecycle checks. Task 4 additionally needs authored activities and data/file fixtures.

## Theme integration

The preview imports `css/tokens.css` and the existing `createTheme` controller through an import map, including palette names, saved preferences and adjustments. Its Theme selector exposes the same eight presets. The editor background/gutter/text use the paired code tokens. Shared syntax tokens retain distinct lavender keywords, green strings, amber numbers/constants and blue functions, with a 12% code-text tint and the shared saturation adjustment. Quiet region shading derives from the code and accent colours. Active regions use shared amber selection colours, including nested syntax text. `editor-theme.js` isolates the one release-specific Lezer tag import needed because PyScript does not expose tags through its language API. Recheck it when upgrading the pinned runtime.

The browser theme check covers exact legacy replacement recovery, preservation/reset of unknown edits, empty-region mode rejection, outlines/shading, removal of the play button under hover, theme persistence, distinct syntax hues, all eight default palettes and 320/1280px layout. It measures dropdown alignment against the final code character. Sampled syntax text (including shaded regions) measures at least 6.36:1; normal code text at least 12.71:1, and outlines against the code background at least 9.39:1. These are default-palette measurements, not guarantees for arbitrary user-adjusted colours or a full accessibility audit.

## Evidence and limitations

Chrome/macOS checks passed actual Python execution, both Task 2 repairs, random bounds, input exhaustion, Stop/timeout recovery, saved edits, selections/substitutions/highlights, keyboard editing/Run/focus escape, pandas calculations and a rendered matplotlib chart. Layout checks cover 320px and 1280px, including line-number alignment after wrapping changes. Independent Python tests cover typed observations, errors/line numbers, namespace reset and output limits. Region tests use the actual pinned CodeMirror state/history engine to check controlled substitutions, mixed transactions, empty regions, boundary insertion, invalidation and joined undo/redo. The region browser suite checks actual typing, boundary deletion, pointer selection, keyboard focus access/escape, repeated choices, persistence and mode/reset rules. Choice changes are dispatched through native select change events; CDP did not establish operation of the operating-system popup itself.

```sh
node --test tests/pyscript-trial.test.js tests/pyscript-regions.test.js
node scripts/browser-pyscript-regions.mjs
node scripts/browser-pyscript-theme.mjs
node scripts/browser-pyscript-trial.mjs
```

The browser script needs the dedicated Chrome debugging profile on port 9227, as described in [local development](../../docs/local-development.md#browser-checks). It changes only trial drafts. `--layout` runs the responsive check alone; `--probe` runs one manual case. `PYSCRIPT_TRIAL_URL` overrides the default URL. Screenshots go to `/private/tmp/pyscript-trial-{320,1280}.png`.

Still unverified: native dropdown menu selection through the operating-system popup, Edge/Windows on the college network, cold-cache download/startup costs, real browser zoom, screen readers and application lifecycle integration. Runtime/package files come from jsDelivr; this is not offline-ready. Supplied input sequences work; an interactive terminal is not included. Charts are static images. Return observations use JSON or a bounded representation for unsupported values.

These checks do not prove arbitrary program correctness. The random checks test bounds, not use of the required construct or quality of randomness. The data check verifies the total; the browser additionally checks an image exists, not its labels or plotted values. Production marking needs independent question-specific oracles and separate construct/style checks where required. Output streams are capped at 12,000 characters each, but there is no hard memory limit. Interpreter modules persist between cases; fresh namespaces are not complete state isolation or a security sandbox. The trial is not ready to execute arbitrary code alongside real student profile data.

## Pinned sources and cache

PyScript **2026.7.3**, using Pyodide **314.0.3**. `vendor/manifest.json` records exact PyScript release URLs and SHA-256 hashes for 27 cached JS/CSS files (about 1.2 MB). `node scripts/prepare-pyscript-trial.mjs` reuses cached files before downloading missing dependencies. Python and optional packages load separately from `https://cdn.jsdelivr.net/pyodide/v314.0.3/full/`.

Primary API references reviewed for the trial: [editor](https://docs.pyscript.net/2026.7.3/user-guide/editor/), [JavaScript](https://docs.pyscript.net/2026.7.3/user-guide/from_javascript/), [workers](https://docs.pyscript.net/2026.7.3/user-guide/workers/), [sync_main_only](https://docs.pyscript.net/2026.7.3/user-guide/configuration/#sync_main_only) and [terminal](https://docs.pyscript.net/2026.7.3/user-guide/terminal/).

The cached editor source map in `references/` comes from [the pinned distribution](https://pyscript.net/releases/2026.7.3/py-editor-CkR6M58-.js.map). Licence texts in `vendor/` were retrieved on 19 October 2026 from [PyScript](https://raw.githubusercontent.com/pyscript/pyscript/2026.7.3/LICENSE), [CodeMirror](https://raw.githubusercontent.com/codemirror/view/main/LICENSE) and [Polyscript](https://raw.githubusercontent.com/pyscript/polyscript/main/LICENSE). CodeMirror and Polyscript licence URLs use upstream main; full bundled third-party licence inventory remains a production packaging task.

Region extension API references checked on 20 October 2026: CodeMirror's [history effects](https://raw.githubusercontent.com/codemirror/commands/main/src/history.ts) and [transactions](https://raw.githubusercontent.com/codemirror/state/main/src/transaction.ts). The direct documentation host returned HTTP 403; the upstream source and the locally pinned runtime supplied verification. No new dependency was downloaded for this refinement.
