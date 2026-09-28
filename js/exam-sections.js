// Navigation groups independent question banks; it does not partition their slots.
// Add OS as its own bank here after extending the sharing-code bank ID field.
export const examSections = [
  {id:'core', bankType:1, title:'Core papers', description:'Short questions across the Core content areas.', action:'Start Core questions'},
  {id:'esp', bankType:3, title:'ESP practice', description:'Planning, spreadsheet formulas, testing and code repair.', action:'Start ESP practice'}
];
export const isExamBank = type => examSections.some(section=>section.bankType===type);
