---
name: project-refactor-checks
description: Methodical, routine checks for maintaining repo code quality, maintainability, docs alignment and conformance to style, framework, feature and testing requirements. For the purpose of reducing: development friction, sources of regression, dilution of requirements or instruction clarity and loss of maintainability. 
---

This skill should be run at least once per development session.

This is a nested multi-step, human-in-the-loop process, where for each main step there are the following mandatory sub-steps:
- Pure evaluation with identification and prioritization of issues, fully covering each required aspect of the current main step. High signal, structured, concise presentation. Pause for discussion and agreement. Provide file and code references where they could aid insight into issue for the human-in-the-loop. No code or docs changes until after human review. This gate must not be skipped.
- Take agreed actions and plan implementation of improvements so that:
  - Wider impacts are carefully considered and accounted for. Don't fix one problem by creating another.
  - With a sound and agreed plan, make changes surgical. If part of the plan is not to refactor large parts of a source file or architectural approach, do not do that. Just alter the planned and agreed parts, to the minimum extend required to faithfully and responsibly carry out the agreed plan. Must have confirmed agreement before actioning.
- Review changes, including a concise summary of changes for each file, architectural element or doc source altered.

All steps, findings and decisions, for each run of this process, must be documented in the dev log (using the established and documented format in that file).

The full check process should follow these main steps, one at a time, in the order listed:
1. Docs alignment. Docs (documentation) cover everything from the main AGENTS.md file, handoff and dev log, style and policy md files and everything in the [docs](../../../docs) folder. Compare stated requirements and guidance for features, behaviour, style and content with the current code base and implementation details. Look for:
  1. Stale requirements, guidannce and content. Use careful judgement to evaluate if the implementation is behind, or if the docs were not updated in keeping with implementation decisions. Generally there be at least some documentation in checkpoints, handoffs or dev logs where implementation decisions are ahead of other related docs. One cause of this is disconnected docs, where there is no, or only a weak path to discover from the top level instructions doc. 
  2. Dilution of purpose, ambiguous instructions or requirements. This often occurs after successive rounds of AI summarization of human instructions, or content that should be in one place being scattered across many places. Look for opportunities to clarify and make more actionable, while simplifying language (where it can be without losing useful precision or information). Strong signs of issues include: 
    - Increasing word counts and dropping 'signal strength'. Concision and clarity in docs are key.
    - Rotating terms for the same concept, object or requirement. Not calling a spade a spade and rotating synonyms is a strong sign that slop rot has taken hold.
  3. Doc file proliferation. It's right for distinct areas of development and requirements should be separated into their own files. However, splitting doc files must be justified, and all docs must be clearly named and well organized.
  4. Duplicated doc content or content for one area of documentation being split across multiple files without good cause. Sometimes there is good cause for this split. E.g. A feature UI requirements vs that same feature logic, data or content requirements. There can also be good cause for a limited amount of repetition accross files, e.g. easily forgotten directives such as documentation style requirements. But in almost all cases docs related to the same area or concern should be in the same doc file. Identify strong candidate files for consolidation or retirement. During consolidation favour human written text over AI written text, unless stale, in which case agree updated drafts first.
  5. Disorganization within the same doc file. Like areas or subjects of documentation belonging to the same doc file, should be organized into logical and clearly named sections and not scattered across the file without good cause. When moving/reorginazing file content, preserve text that can reasonably be preserved - do not rewrite for the sake of rewriting (as this can lead dilution or divergence of meaning over generations of re-writing). For any uncertainty about meaning, always pause to discuss. 
  6. Instructions, requirements or examples which could cause confusion, be difficult to follow or lead to recurrent corrections to work required by human review or bug, feature or UI regression issues.
  7. When reviewing or refactoring docs, remember: Docs should be concise and clear. Use simple language where possible. Genuine technical terms are fine, but avoid jargon which doesn't add real value for clarity. Use consistent terms for the same thing.
  8. Docs review should extend to code comments. At this step, a check for their presence and having the right shape is sufficient. More detailed comments checks will be done following later code review step.
  9. During docs review if it becomes clear that code has diverged from or ommitted clearly stated requirements, this should be noted, and then left for a later check stage. Focus on docs issues here. 
2. Code quality. See [Code Style](../../../docs/CODE_STYLE.md) for code quality and style requirements. These requirements should be closely and consistently followed. Search carefully for any cases in the code base where they are not followed, or only loosely followed. Adopt a critical, adversarial stance for this review.
3. Implemented requirements alignment. With docs aligned, check the code base and implemented features, behaviour and UI with the documented requirements and guidance. Then:
  1. Identify divergance, gaps and bugs. In this review distinquish between features/requirements that:
    - should already have been implemented or are reported as implemented
    - are in the process of being implemented
    - are planned for the future with only stubs currently in place (this category only needs checking for starting in a sound direction, but can otherwise be left for another time)
  2. Where issues are identified:
    - Investigate and report: how and why they might have occured
    - Suggest ways of avoiding recurrance, so that time isn't wasted on dealing with the same issues in future. 
    - Present options for fixing the identified issues.
4. Test quality and coverage. Review unit, integration and end-to-end tests for quality, maintainability, coverage, fitness for purpose, and organization into logical sets, which can be run efficiently and independently (although some sets may naturally include other sets). 

A direct run of this skill should initiate the full check process. Specific numbered main steps may be run independently, on request.

Approval at any step applies only to the current step and agreed changes. “Continue”, “proceed” or “action all steps” does not waive later discussion gates. Waiving a gate requires an explicit instruction naming it. Do not implement later-step findings early.

This is a high value process. When following steps and substeps, do not cut corners. Do a proper job, apply full effort. 