/**
 * Purpose: Optional independent project ideas for Year 1 Coding practice.
 * Main contents: ten progressively harder briefs. Used by: app.js.
 * Uses: existing disclosure styles. Libs: none.
 */
const projects=[
 ['Quiz host','Ask questions from a list, check answers and show a score. Let the player choose a topic and try again.','Functions, lists, selection, loops, strings and input validation.','Save question records and best scores to a file.'],
 ['Pocket-money planner','Record income and spending with a category and description. Show the balance and totals by category. Store money as whole pence to keep arithmetic simple.','Numbers, dictionaries, lists, loops and validation.','Save and reload records; filter spending by category and test invalid amounts.'],
 ['Study flashcards','Let students add, edit and practise question-and-answer cards. Keep a list of cards they found difficult and offer another round.','Strings, list operations, functions, selection and records.','Save the cards and track how often each one is answered correctly.'],
 ['Task organiser','Add tasks with a priority, mark them complete and remove them. Search descriptions and display outstanding tasks in priority order.','Lists, dictionaries, search, sorting and a menu loop.','Add an undo stack: save each change so the latest action can be reversed.'],
 ['Equipment loan desk','Keep a catalogue of equipment and fictional borrowers. Issue and return items, reject duplicate loans and show what is available.','Record IDs, dictionaries, functions, validation and file handling.','Search by name and produce a sorted report of outstanding loans.'],
 ['Cinema seat booking','Display rows of seats as a text grid. Reserve or cancel a seat, reject occupied seats and calculate the booking total.','Nested lists, indexing, nested loops, selection and testing.','Find a block of adjacent free seats and save bookings between runs.'],
 ['Text adventure','Create connected rooms with descriptions, items and commands. Let the player collect objects and use them to solve a small puzzle.','Dictionaries, lists, string processing, functions and state changes.','Add save/load and test that locked routes cannot be bypassed.'],
 ['League results manager','Record teams and match scores. Calculate played, won, drawn, lost and points, then display a league table with a clear tie-break rule.','Records, accumulation, validation, decomposition and sorting.','Allow score corrections and rebuild the table from the original match records.'],
 ['Search and sort laboratory','Let a user enter or generate a list. Implement linear and binary search, then bubble and insertion sort. Show each step and count comparisons.','Algorithms, indices, loop boundaries, copies and systematic tests.','Compare sorted, reversed and duplicate-filled inputs. Sort a copy before binary search and handle empty lists.'],
 ['Support-ticket simulator','Create fictional support tickets with IDs, categories, priorities and statuses. Assign the next waiting ticket, search records and show workload summaries.','Decomposition, records, queues, stacks, search, sorting, files and robust code.','Use first in, first out within each priority; add an undo history and recover gracefully from a missing or malformed save file.']
];
export function pythonProjectsHTML(){
 return `<details class="algorithm-guide" id="python-projects">
 <summary>Build something: 10 Python project ideas</summary>
 <p>From a gentler start to a larger challenge. These are projects for several sessions, beyond a starter activity. Start with a text menu in the terminal; no website or extra packages are needed. A developed version might use roughly 100–500 readable lines, but working, clear code matters more than line count.</p>
 <p>Build the smallest working version first. Split it into functions, then add the stretch feature. Test normal inputs, boundary values and invalid inputs. Use fictional data and your own practice files. Write a short README explaining how to run it.</p>
 <ol>${projects.map(([title,brief,topics,stretch])=>`<li><h2>${title}</h2><p>${brief}</p><p><strong>Practise:</strong> ${topics}</p><p><strong>Stretch:</strong> ${stretch}</p></li>`).join('')}</ol>
 <p>Build and run these in your Python editor. This site does not run or mark project code. Ask a partner to test your program and explain one improvement you made from their feedback.</p>
 </details>`;
}
