import {readFile, writeFile} from 'node:fs/promises';
import exam from '../data/exam.js';
import {coverageReport} from '../js/coverage.js';
const root = new URL('../', import.meta.url);
const inventory = JSON.parse(await readFile(new URL('data/coverage/core-inventory.json', root), 'utf8'));
const report = coverageReport(inventory, exam);
if (report.errors.length) throw Error(report.errors.join('\n'));
const markdown = [
  '# CA1–CA2 coverage', '',
  'Generated from the live exam bank. Run `npm run coverage` after editing questions or the inventory. Do not edit counts manually.', '',
  `${report.summary.live_question_count} live questions; ${report.summary.element_count} assessable subelements. ${report.summary.elements_with_live_questions} elements have at least one question with two applicable variations; ${report.summary.elements_with_two_live_questions} have at least two. ${report.summary.complete_elements} meet the reviewed coverage target.`, '',
  '**Live** counts distinct question templates with at least two variations assessing the element. **Reviewed** additionally requires explicit subject approval. **Practice** covers constrained exercises that do not demonstrate the complete specified skill; it does not count towards the target. Zero-count rows remain visible. Letters are internal, permanent identifiers beneath the official reference.', '',
  'Teacher review of the inventory and content is pending. A count verifies links and variation availability, not the educational validity of a question. No question is marked approved merely because automated checks pass.', ''
];
for (const focus of report.focuses) {
  markdown.push(`## ${focus.focus}`, '', '| Element | Requirement | Live | Reviewed | Practice | Status |', '| --- | --- | ---: | ---: | ---: | --- |');
  for (const e of focus.elements) markdown.push(`| ${e.key} | ${e.requirement.replaceAll('|','\\|')} | ${e.live_question_count} | ${e.question_count} | ${e.practice_question_count} | ${e.coverage_status.replaceAll('_',' ')} |`);
  markdown.push('');
}
const outputs = [['data/coverage/report.json', JSON.stringify(report,null,2)+'\n'], ['docs/coverage-ca1-ca2.md',markdown.join('\n')]];
for (const [path, content] of outputs) {
  const url = new URL(path, root);
  if (process.argv.includes('--check')) {
    if (await readFile(url,'utf8') !== content) throw Error(`${path} is stale. Run npm run coverage.`);
  } else await writeFile(url,content);
}
console.log(JSON.stringify(report.summary,null,2));
