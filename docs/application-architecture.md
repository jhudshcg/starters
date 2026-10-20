# Application ownership

Full SvelteKit/Svelte, Tailwind, daisyUI and Bits UI adoption was authorised and implemented on **14 October 2026**. The [Maths reuse review](reviews/2026-10-14-maths-framework-reuse.md) records the reference implementation; this document describes the resulting T-Level architecture.

## Responsibilities

| Owner | Responsibility |
| --- | --- |
| `src/routes/+layout.svelte`, `src/lib/components/AppShell.svelte` | One application lifetime, shared header/footer, dialogs and SvelteKit navigation hooks. |
| `src/routes/[[view]]/` | Finite prerendered entry paths. Query parameters identify a set, activity type or search; components render the application snapshot. |
| `src/lib/application/session.js` | Compose services, load route banks, reject stale requests, publish snapshots and dispose listeners/polling. |
| `src/lib/application/profile.js` | Current profile, selection, validated restoration, browser/file persistence and same-profile attempt snapshots. |
| `src/lib/application/profile-lock.js` | Exclusive editing ownership of each named profile across tabs, held through pending saves and released on switch/disposal. |
| `src/lib/application/practice.js` | Attempt commands, answers, submission, assistance, two-hour entry recall and timer deadlines. No DOM bindings. |
| `src/lib/components/pages/` | Home, exam, search, progress, projects/FAQ, About and human Go pages. Edit home card artwork, order and short text in `Home.svelte`. |
| `src/lib/components/practice/` | Entry selectors, question cards, answers, feedback, guides and puzzle hosts. Components call commands rather than owning another persisted attempt. |
| `src/lib/components/ui/` | Shared semantic controls and Bits UI dialog/popover interactions. |
| `src/lib/theme/preferences.js`, `js/theme.js` | Observable persisted preferences and palette labels respectively. |
| `src/lib/application/routes.js` | Pure conversion between legacy hash links and static route URLs, including deployment base paths. |
| `js/` domain modules | Existing codes, bank loading, marking, progress, profiles, file safety, search, recommendations and practice-time rules. |
| `packages/puzzles/` | Portable puzzle content/rules/controls, Go board and engine. |

Services read `profile.data` at command boundaries; switching/restoring a profile can replace it. Svelte receives snapshots and owns page/control DOM. Progress filters are component-local. The portable puzzle/Go wrapper owns only its assigned subtree and disposes its controls when removed. Trusted authored FAQ/project/algorithm content may use static HTML; it does not install a competing application renderer.

### Python integration boundary — implemented, 20 October 2026

The integration shares `prototypes/pyscript/adapter.js`, `regions.js` and `runner.py` with `LivePython.svelte`, through `python-practice.js` and `js/live-python.js`. It includes highlighted completion blanks, mixed code/reasoning questions and all 18 ESP Task 2 investigations. The editor owns only its mounted code subtree, region/history interactions and edit callbacks; the worker owns execution, observations and cancellation. The existing practice service owns saved source/region snapshots, effective question/set permissions and marking evidence. Do not introduce a second application draft store or duplicate the trial implementation.

For executable questions, submission locks and persists the exact source before asynchronous testing, then records completion once. Results must match the profile, attempt, question, source and authored test revision. Startup/infrastructure failure leaves checking pending; it is not a wrong answer. Editing invalidates exploratory results, and navigation/profile/disposal cancels stale work. Non-executable questions retain their existing synchronous marking flow. Commands enforce permissions as well as the UI. The adopted assessment and retention rules are documented in the Python, ESP and progress specifications; existing independent-readiness calculations remain unchanged.

**20 October extension:** the shared surface supports ordinary reasoning beside editor answers, with each part marked according to its own contract. The attempt service owns structured run evidence tied to exact source, inputs and test identity; prior observations survive edits and are distinguished from a current retest. Tabs, editor-only scrolling, resize and the padded coding workspace belong to LivePython.svelte; Question.svelte owns its placement beside the answer fields. `js/code-history.js` owns completed snapshots and six-attempt retention; `CodeHistory.svelte` presents read-only code, predictions, runs and skill summaries. Named backups validate and merge these records. Student test inputs/outcomes remain JSON strings in the existing answer store; `js/task2-tests.js` owns safe typed-call construction, reference requests and matching evidence. The Python service runs the authored corrected reference separately from student repairs so defective code cannot determine expected-result marks. `Task2Response.svelte` owns labelled test fields and per-test run actions. See the [progress specification](spec-progress.md#code-attempt-review-and-skill-progression--adopted-20-october-2026). Focused reference and production Chrome checks pass; classroom, college Edge/Windows and assistive-technology acceptance remain outstanding.

Puzzle gesture callbacks read current service answers, not a captured rendered snapshot: one pointer event can accept several moves before Svelte renders. Ordinary puzzle inputs retain their DOM nodes while answer values update, preserving focus/caret. Board redraws keep the portable control's pointer lifecycle; click/keyboard updates supply a focus selector.

The profile service obtains a [Web Lock](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API) before loading/editing a profile. Another tab stays blocked, without timers or saves, and can retry the same name. Selection/restoration obtains the destination lock and drains outgoing file writes before releasing the old lock. Repeated startup/retry calls share one initialisation. Storage keys and result formats are unchanged.

## Navigation and lifetimes

SvelteKit is the sole browser-history owner. `AppShell` uses `goto`, `beforeNavigate`, `afterNavigate` and Kit’s `snapshot` lifecycle API for leave guards and attempt snapshots. Legacy `#set=…`, `#practice=…` and other bookmarks translate through the same path, including hash-only changes. Do not add another `popstate` listener or a second DOM router.

Browser-history snapshots preserve the visible attempt for the same profile and bank generation. Per-profile two-hour focus recall is separate in `js/practice-selection.js`. Explicit breadcrumb picker navigation requests a blank selector. Persisted deadlines remain absolute: hiding/reloading the page does not pause a running countdown or duplicate its result.

The root creates one application session on mount. Page transitions retain it, but remove outgoing puzzle/Go controls. Disposal aborts owned global listeners, clears polling/toasts, rejects pending prompts, invalidates route requests, pauses/saves practice and drains serial file writes. Ordinary `pagehide` saves without disposing, because browser Back may restore the document. A replacement service instance must await disposal before taking ownership.

Bits UI owns focus trapping, Escape/outside dismissal and portal lifetimes. Required initial profile entry is nondismissible; switching and leave prompts remain cancellable. Theme tokens live on the document root so portal content inherits the selected palette.

## Styles and build

`src/lib/styles/app.css` composes Tailwind, selected daisyUI foundations and existing application styles. Semantic classes use `@apply`; markup does not repeat utility lists. `theme-mapping.css` bridges the existing eight palettes to daisyUI, with its default themes disabled. `breakpoints.css` owns the shared viewport scale; see the [style guide](style-guide.md#responsive-breakpoints) for retained intrinsic constraints.

`prepare-site.mjs` validates identities/search/hints, packs four lazy banks and prepares engines/source/licences. SvelteKit's static adapter builds `live/`. Vite supplies on-demand readable bank imports in development (`js/bank-data.dev.js`) and encoded asset fetches in production (`js/bank-loader.js`). Node tools keep the eager `js/bank-data.js` authoring interface. Version identity comes from build inputs, so repeated builds are deterministic. `BASE_PATH` sets a repository deployment prefix; the commit builder uses `/starters`. See [local development](local-development.md) for root/subpath previews.

The pre-commit hook still builds an isolated staged-source snapshot, checks the lockfile and stages only generated `live/`. GitHub Pages uploads that committed output; it does not rebuild. No deployment is implied by a local build.

## Verification

Run `npm run check` for framework diagnostics and select tests from the change. Use focused lifecycle/profile tests for service changes and build/staged-build tests for packaging changes. Reserve `npm test` for changes whose wider impact is not covered by those selections; it includes deterministic packing/static output and lifecycle cleanup. Browser scripts run serially against the dedicated Chrome profile; do not rebuild during a browser run.

- `browser-assessment.mjs`: ESP formula/written review, mobile card edges and timer expiry after reload. `--layout-only` selects toolbar spacing, selector sizing, mobile edges and submission.
- `browser-esp-task2.mjs`: all 18 revised investigations, native select change events, response-derived summaries, theme contrast, narrow layouts and retired-code navigation.
- `browser-editor-workflow.mjs`: real Python execution, completion caret geometry, prediction gating, Task 2 original/edited tabs and repair checks, resize controls and read-only completed review.
- `browser-home-cards.mjs`: real pointer hits across each card, pressed-state hit geometry, keyboard activation and Back at mobile/desktop widths.
- `browser-migration.mjs`: representative routes, eight themes, mobile shell, recall, guarded edits, submission, old links and Go.
- `browser-navigation.mjs`: detailed Back/Forward, picker/expiry/subsection recall, projects, FAQ and search history.
- `browser-profiles.mjs`: profile switching, validated backups, recommendations and practice time.
- `browser-interaction-regressions.mjs --profiles`: exclusive editing across two tabs, assisted history, retry, switching and release on close; run for profile ownership or persistence changes.
- `browser-interaction-regressions.mjs --puzzles`: real drag/backtrack, fast movement, keyboard focus and character-by-character typing; run for puzzle host/control changes.
- `browser-python-guides.mjs`: keyboard disclosure, saved state and independent evidence across every focus.
- `browser-puzzle-integration.mjs`: answers, persistence, marks/reveal and reflow for portable puzzle controls.
- `browser-onedrive-go.mjs`: real local file handles, save/conflict failures, human Go/engine/clocks/touch.
- `browser-theme-startup.mjs`: saved colours before app scripts load, invalid/unavailable storage and unchanged colours after mount.
- `browser-theme.mjs`: palettes, adjustments, contrast, persistence and marked states.

`tests/application-lifecycle.test.js` verifies repeated service disposal/remount, listener and interval cleanup, prompt cancellation and retained answers. Browser tests cover the Svelte host separately. These checks do not establish physical-device Safari or assistive-technology coverage.
