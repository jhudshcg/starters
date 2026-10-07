# Code Style Requirements

- The cleaner and more minimal the code the better, while faithfully implementing required behaviour and features.
- Minimizing code, while maintaining feature and functionality requirements is the goal, but not at the expense of code readability.
- Favour solutions that result in modular, reusable code - without over-generalizing solutions. If a modular, reusable approach would result in less code, use it. If a modular, reusable approach would result in more readable and maintainable code, use it.
- Extra time and effort put into sound and maintainable implementation decisions now, is multiples of that time saved later by avoiding rewrites and sifting through hastily made slop ('more haste, less speed').
- Comment code according to the [comments policy](CODE_COMMENTS.md).
- For key architectural decisions, stop and discuss first, presenting your top options and some pros and cons of each.

When fixing bugs, adding or changing features, or refactoring, ask: "How can I simplify the code? How can I make it more maintainable? Are there opportunities to reduce the number of lines of code here?"

## Implementation direction

Make full use of reliable libraries, tools and common browser api features. Don't re-invent the wheel.

## Testing

- Apply the same discernment, attention to detail and clarity to the test plan and test cases as you should to feature implementation and architecture.
- Respect the value of velocity. Expensive tests should only be run when needed. Separate test sets by the types of files that have been updated and their roles.
- Test run decisions should be rule based and deterministic where possible.
- Visual testing, or other high token burn testing should be run on a batch of code edits where possible and during rapid iteration allow the human to review visually as this is most often quicker than an agent check - saving time and tokens.

## HTML and styling

Format authored HTML and component markup for human reading, with sensible line breaks and indentation. Production output may be minified.

Use semantic native HTML and avoid unnecessary wrapper elements. Prefer purposeful class names over long lists of framework utilities.

Combine framework components for reusable markup and behaviour with semantic CSS classes for reusable appearance. Use utility composition features (such as Tailwind's @apply) where they make styling clearer. Coordinate these abstractions with any component styling libraries (such as daisyUI) and interaction/accessibility libraries (such as Bits UI). Preserve their required attributes, structure and state handling.

A small number of utility classes alongside a semantic class is fine for occasional adjustments. Give meaningful, recurring component variants a shared semantic class or component prop. Keep each styling decision in one authoritative place, without introducing abstractions that add more complexity than they remove.

Use plain CSS and shared theme variables when clearer than utility composition. Weigh that choice against the consistency and maintenance benefits of the frameworks in use, and avoid recreating behaviour they already provide.

Keep class names statically discoverable where possible. Prefer built-in unused-code elimination and CSS generation before adding separate purging tools. Any optimisation must preserve dynamic states, themes and library-generated markup. Exclude generated output from source scanning.

## Documentation

Use DEV_LOG.md to record concise dated work entries in chronological order (oldest first; append new entries), using the format: area of focus, files edited/created/deleted, challenges, key decisions and rationale, bug finds and fixes. Language style in dev_log needs to be concise, but clear, complete sentences. Avoid jargon, or overly condensed/load baring terms. Should be easy to understand at first read. Avoid using different terms for the same thing/concept/component. Call a spade a spade.

Use a checkpoint.md file to persist current work and plans in more detail, to assist handoff between dev sessions and to break larger bits of work into pieces, incase work is interrupted and needs piecing back together or continuing without retreading a lot of ground. Keep it focused on the current handover; move completed work records into DEV_LOG.md rather than accumulating old sessions here.

Use feature_ideas.md as a persistent record of original feature ideas. Link developed plans and implementation tasks without replacing the original idea text.

Use content of docs/ for specific reference to different features, requirements and resources.

Use README.md for general project developer and repo docs.
