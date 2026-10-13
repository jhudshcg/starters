# Application ownership

Current plain-JavaScript structure, adopted **14 October 2026**. The teacher approved separation of concerns before the framework migration, superseding the earlier deferral. This is an implementation map, not approval to introduce Svelte/Tailwind or replace the production build.

## Responsibilities

| Owner | Responsibility |
| --- | --- |
| `js/app.js` | Mount the application once. Export its disposer and mount function for an explicit handover. |
| `js/application.js` | Compose services/controllers, load route banks, reject stale render requests, connect history and dispose the application. |
| `js/profile-session.js` | Own the current profile object. Load, select and restore profiles; save through the existing profile and OneDrive modules. Restore history snapshots only for the same profile and generation. |
| `js/practice-controller.js` | Start/resume attempts, recall entry choices, bind answer controls, submit, manage hints/review and update deadlines. Use existing marking/progress rules. |
| `js/activity-view.js`, `js/question-view.js` | Produce markup from explicit set/attempt/profile inputs. They do not save data, install listeners or own an attempt. |
| `js/entry-pages.js` | Home cards, exam entry, search results and information pages. Home card artwork, order and short text are edited in `home()`. |
| `js/progress-page.js` | Progress presentation, temporary filters and transfer controls. Delegate restoration to the profile session. |
| `js/navigation.js` | History indices, guarded transitions and snapshots. Two-hour fresh-entry recall remains separate in `practice-selection.js`. |
| `js/app-lifecycle.js` | Global link handling, visibility/page events and the two practice polling intervals. Return their cleanup. |
| `js/theme.js`, `js/app-feedback.js` | Header theme controls and transient feedback respectively, with explicit cleanup. |
| `js/practice-heading.js`, `js/search-sets.js`, `js/view-utils.js` | Shared breadcrumbs, constrained search-set selection, escaping and duration display. |

Controllers receive the services/actions they need. They read `session.data` at an action boundary instead of retaining a second profile object; profile selection or restoration can replace that object. The practice controller mutates the current attempt and calls session persistence. Progress-page filters remain local display state. There is no new global store, event bus or framework dependency.

## Lifetimes

`mountApplication({scriptURL})` resolves to an async disposer after profile setup and initial rendering. The script URL is supplied by the entry module so diagnostics identify the actual build after bundling. Await disposal before mounting a replacement.

Application disposal removes global subscriptions, stops polling, invalidates pending route renders, removes theme controls, disposes mounted puzzle/Go controls and closes owned dialogs. It pauses and saves the current attempt, cancels the OneDrive debounce and waits for queued file saves before a replacement takes ownership. Native file operations already underway are allowed to finish; this is not a general cancellation API for every pending user action.

Page changes dispose the outgoing puzzle/Go controls but retain the application services. Ordinary `pagehide` pauses/saves practice; it does **not** destroy the application because browser Back may restore the page from its cache. Browser-history attempt snapshots and per-profile two-hour selection recall retain their separate purposes.

## Migration boundaries

Replace a page's renderer and event bindings together; legacy code and a framework component must not both control the same DOM. Keep session persistence, code identities, marking, first-response assistance, repeat eligibility, timer deadlines and serial OneDrive writes outside component-local defaults. Reuse the portable puzzle player and its disposal contract.

The templates remain plain JavaScript pending migration. This extraction does not settle framework state APIs, component granularity, the replacement production build, or the remaining specialised CSS breakpoints. Preserve the current eight-theme tokens, opaque gradient borders, narrow layout rules and adopted header subtitle contract.

The production builder still validates identities/search/hints, packs and lazy-loads banks, hashes assets, uses relative paths and ships engine/source/licence files. Vite remains the source preview. The staged-build hook and Pages deployment retain their existing roles. The [migration brief](../T_LEVEL_REFACTOR_AGENT_GUIDE.md) records the confirmed full-stack target; the [Maths reuse review](reviews/2026-10-14-maths-framework-reuse.md) supplies implementation evidence and proposed adaptations. The earlier [readiness review](reviews/2026-10-07-refactor-readiness.md) remains historical evidence; current requirements take precedence.

## Verification

For shared orchestration changes, run `npm test` (including the production-build test), then the affected browser scripts serially against the isolated Chrome profile. Do not rebuild `live/` during a browser run. See [local development](local-development.md) for setup.

- `browser-navigation.mjs`: header/home layout, entry/recall, history/cancellation, search, projects and FAQ.
- `browser-app-lifecycle.mjs`: repeated disposal/remount, listener/interval counts, retained answers, Back cancellation and theme controls.
- `browser-profiles.mjs`: profile switching, backup validation/merge, progress and practice time.
- `browser-python-guides.mjs`: guide disclosure, persistence and independent progress.
- `browser-puzzle-integration.mjs`: parent-owned puzzle answers, submission/reveal and reflow.
- `browser-onedrive-go.mjs`: linked-file handling and the human Go board.
- `browser-theme.mjs`: palettes, adjustments, persistence and marked states.

The focused navigation lifecycle unit checks cover removed listeners and a leave decision resolving after disposal. Browser scripts clear only the dedicated test profile. These checks are an acceptance starting point, not proof that every future migration slice or browser is covered.
