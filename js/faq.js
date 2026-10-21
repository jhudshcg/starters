/**
 * Purpose: Friendly help for students using the practice site.
 * Main contents: FAQ page markup. Used by: app.js. Uses: shared styles. Libs: none.
 */
export function faqHTML(){
  const questions=[
    ['Where do I start?','Choose Exam practice, Coding practice or Puzzles to open a question set. Change the focus or puzzle type using the controls. Your last choice is remembered for your profile on this browser.'],
    ['How long should I spend?','Most starters take about 5–15 minutes. Work at your own pace, or switch on a timer. When it runs out, your saved answers are submitted automatically.'],
    ['Can I get some help?','Yes. Python introductions explain the topic and do not reduce your progress credit. A question’s Show hint button counts that question as assisted practice. Submit your answers to see feedback and unlock the answers.'],
    ['When does practice count towards progress?','Submit a set to record your result. Leave at least four hours after completing the same set before starting another tracked attempt. You can still practise sooner. Hinted answers appear in final results, but do not count as independent evidence for revision priorities.'],
    ['Where is my progress saved?','On this browser, under the name you chose. Open My progress to link a synced OneDrive folder or download and restore a backup. A file saved in your OneDrive folder still needs the OneDrive app to upload it.'],
    ['Can I share a question set?','Use Copy code or Copy link on the activity. Paste a code into the code box to open the same questions. Keep its capital letters exactly as shown. You can also enter a topic to search.'],
    ['Are these official exam marks?','No. These are practice questions and automatic practice scores. Some written ESP reasoning needs separate review. Use your teacher’s feedback alongside the site.'],
    ['Can I run Python here?','The challenges check short answers; they do not run your Python. The project ideas are for your own Python editor. Start small, test often and add features when the basics work.'],
    ['Something looks wrong. What should I do?','Use Report an issue in the footer. Include the question code and what you expected to happen. For a different colour or light/dark mode, use the controls at the top right.']
  ];
  return `<article class="information-page">
    <nav class="breadcrumbs eyebrow" aria-label="Breadcrumb"><a href="#home">Home</a><span aria-hidden="true">/</span><span aria-current="page">FAQ</span></nav>
    <h1>A little help.</h1><p>Quick answers so you can get back to practising.</p>
    ${questions.map(([question,answer])=>`<details><summary>${question}</summary><p>${answer}</p></details>`).join('')}
  </article>`;
}
