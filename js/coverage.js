// Counts are derived from explicit links on parts, never from question titles/tags.
export function coverageReport(inventory, bank) {
  const errors = [], rows = new Map();
  for (const group of inventory.focuses) {
    if (!/^CA\d+(?:\.\d+){2,3}$/.test(group.focus)) errors.push(`Invalid focus: ${group.focus}`);
    for (const element of group.elements) {
      const id = `${group.focus}[${element.key}]`;
      if (rows.has(id) || !/^[a-z]+$/.test(element.key)) errors.push(`Duplicate or invalid element: ${id}`);
      rows.set(id, {...element, live: new Map(), practice: new Set(), drafts: new Set()});
    }
  }
  const slots = new Set();
  for (const question of bank) {
    if (slots.has(question.slot)) errors.push(`Duplicate slot: ${question.slot}`);
    slots.add(question.slot);
    for (const [variation, content] of question.variations.entries()) {
      for (const part of content.parts) {
        if (!part.coverage?.length) errors.push(`${question.slot}/${variation}/${part.id}: missing coverage`);
        if (part.coverageMode && part.coverageMode !== 'practice') errors.push(`${question.slot}: invalid coverage mode`);
        const linked = new Set();
        for (const link of part.coverage ?? []) {
          if (!Array.isArray(link.elements) || !link.elements.length) {
            errors.push(`${question.slot}: coverage needs subelements`); continue;
          }
          for (const key of link.elements) {
            const id = `${link.focus}[${key}]`, row = rows.get(id);
            if (linked.has(id)) errors.push(`${question.slot}/${variation}/${part.id}: duplicate link ${id}`);
            linked.add(id);
            if (!row || row.status !== 'active') {errors.push(`${question.slot}: unknown or retired element ${id}`); continue;}
            if (question.retired) continue;
            if (question.status === 'draft') {row.drafts.add(question.slot); continue;}
            if (part.coverageMode === 'practice') {row.practice.add(question.slot); continue;}
            if (!row.live.has(question.slot)) row.live.set(question.slot, {variations:new Set(), reviewed:question.reviewStatus === 'approved'});
            row.live.get(question.slot).variations.add(variation);
          }
        }
      }
    }
  }
  const focuses = inventory.focuses.map(group => ({focus:group.focus, elements:group.elements.map(element => {
    const row = rows.get(`${group.focus}[${element.key}]`);
    const qualified = [...row.live.values()].filter(q => q.variations.size >= inventory.required_variations_per_question);
    const live = qualified.length, reviewed = qualified.filter(q => q.reviewed).length;
    return {key:element.key, requirement:element.requirement, status:element.status,
      live_question_count:live, question_count:reviewed, practice_question_count:row.practice.size,
      draft_question_count:row.drafts.size, insufficient_variations_count:row.live.size-live,
      coverage_status:element.status !== 'active' ? 'retired' : reviewed >= inventory.required_question_count ? 'complete' :
        live >= inventory.required_question_count ? 'awaiting_review' : live ? 'needs_more_questions' : row.practice.size ? 'practice_only' : 'uncovered'};
  })}));
  const elements = focuses.flatMap(f=>f.elements).filter(e=>e.status==='active');
  return {schema_version:2, source_version:inventory.source_version,
    required_question_count:inventory.required_question_count, required_variations_per_question:inventory.required_variations_per_question,
    summary:{focus_count:focuses.length, element_count:elements.length,
      live_question_count:bank.filter(q=>!q.retired&&q.status!=='draft').length,
      elements_with_live_questions:elements.filter(e=>e.live_question_count>0).length,
      elements_with_two_live_questions:elements.filter(e=>e.live_question_count>=inventory.required_question_count).length,
      practice_only_elements:elements.filter(e=>e.coverage_status==='practice_only').length,
      uncovered_elements:elements.filter(e=>e.coverage_status==='uncovered').length,
      complete_elements:elements.filter(e=>e.coverage_status==='complete').length},
    errors, focuses};
}
export function formatCoverage(links = []) {
  return links.map(link => `${link.focus}[${link.elements.join(',')}]`).join(' · ');
}
