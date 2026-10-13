/**
 * Purpose: Optional independent project ideas for Year 1 Coding practice.
 * Main contents: eighteen briefs, grouped by tools. Used by: app.js.
 * Uses: existing disclosure styles. Libs: none.
 */
const projects=[
 ['Victorian insult generator','Combine lists of grand adjectives and unlikely nouns to produce harmless nonsense: “You spectacularly soggy crumpet!” Use a dictionary to organise words by category and let the user choose a style.','Lists, dictionaries, random choice, strings, functions and validation.','Avoid repeats, save favourites and add a compliment mode.'],
 ['The mildly dramatic chatbot','Write a rule-based terminal bot that thinks it is a retired spaceship. Match keywords to lists of replies, remember the user’s name and offer a clear exit command.','Dictionaries, lists, string methods, selection and a conversation loop.','Track a simple mood and respond differently to repeated questions. Give unknown input a useful fallback; no AI service is needed.'],
 ['Quiz host','Ask questions from a list, check answers and show a score. Let the player choose a topic and try again.','Functions, lists, selection, loops, strings and input validation.','Save question records and best scores to a file.'],
 ['Pocket-money planner','Record income and spending with a category and description. Show the balance and totals by category. Store money as whole pence to keep arithmetic simple.','Numbers, dictionaries, lists, loops and validation.','Save and reload records; filter spending by category and test invalid amounts.'],
 ['Study flashcards','Let students add, edit and practise question-and-answer cards. Keep a list of cards they found difficult and offer another round.','Strings, list operations, functions, selection and dictionaries.','Save the cards and track how often each one is answered correctly.'],
 ['Task organiser','Add tasks with a priority, mark them complete and remove them. Search descriptions and display outstanding tasks in priority order.','Lists, dictionaries, search, sorting and a menu loop.','Add an undo stack: save each change so the latest action can be reversed.'],
 ['Equipment loan desk','Keep a catalogue of equipment and fictional borrowers. Issue and return items, reject duplicate loans and show what is available.','Record IDs, dictionaries, functions, validation and file handling.','Search by name and produce a sorted report of outstanding loans.'],
 ['Cinema seat booking','Display rows of seats as a text grid. Reserve or cancel a seat, reject occupied seats and calculate the booking total.','Nested lists, indexing, nested loops, selection and testing.','Find a block of adjacent free seats and save bookings between runs.'],
 ['Text adventure','Create connected rooms with descriptions, items and commands. Let the player collect objects and use them to solve a small puzzle.','Dictionaries, lists, string processing, functions and state changes.','Add save/load and test that locked routes cannot be bypassed.'],
 ['League results manager','Record teams and match scores. Calculate played, won, drawn, lost and points, then display a league table with a clear tie-break rule.','Dictionaries, accumulation, validation, decomposition and sorting.','Allow score corrections and rebuild the table from the original match records.'],
 ['Search and sort laboratory','Let a user enter or generate a list. Implement linear and binary search, then bubble and insertion sort. Show each step and count comparisons.','Algorithms, indices, loop boundaries, copies and systematic tests.','Compare sorted, reversed and duplicate-filled inputs. Sort a copy before binary search and handle empty lists.'],
 ['Support-ticket simulator','Create fictional support tickets with IDs, categories, priorities and statuses. Assign the next waiting ticket, search records and show workload summaries.','Decomposition, dictionaries, queues, stacks, search, sorting, files and robust code.','Use first in, first out within each priority; add an undo history and recover gracefully from a missing or malformed save file.'],
 ['Turtle pattern studio','Use Turtle to draw stars, spirals and tiled patterns. Let the user choose colours and a repeat count; keep each shape in its own function.','Turtle, loops, parameters, angles and input validation.','Add a keyboard command to clear the canvas and generate a new design.','turtle'],
 ['Turtle snack chase','Move a turtle with the arrow keys to collect randomly placed snacks. Update the score on contact and keep the turtle inside the window.','Turtle, keyboard events, coordinates, random positions, functions and state.','Add a countdown using scheduled updates, then a restart key. Make sure snacks stay on the board.','turtle'],
 ['Arcade: dodge the laundry','Move a basket left and right to catch falling socks while dodging suspiciously heavy boots. Begin with one falling object, a score and a restart button.','Arcade, sprites, keyboard events, update callbacks, collisions and lists.','Add lives and gradually increase the falling speed. Test that each collision changes the score only once.','arcade'],
 ['Arcade: the floor is mildly inconvenient','Build a single-screen platform game. Jump between a few platforms, collect three biscuits and reach the kettle. Start with simple shapes or supplied assets.','Arcade, sprites, gravity, collisions, game states and decomposition.','Add a second level and a checkpoint. Keep the level small enough to test every jump.','arcade'],
 ['The great biscuit investigation','Use pandas to read a small fictional CSV of biscuit ratings, prices and categories. Check missing values, calculate category averages and plot them with matplotlib.','pandas, CSV files, filtering, group summaries, matplotlib and labelled charts.','Compare rating with price using a scatter plot. State the limits of your tiny dataset; decide how missing values should be handled.','data'],
 ['Bus delay detective','Create a fictional CSV of routes, dates and delay minutes. Use pandas to validate and filter it, summarise delay by route and draw a clear matplotlib chart.','pandas, numeric conversion, missing data, grouping, sorting and matplotlib.','Add a date filter and a trend chart. Export a cleaned CSV and a chart image, then explain which route you would investigate.','data']
];
/** Render independent briefs with official tool guides, outside assessed practice. */
export function pythonProjectsHTML(){
 const groups=[['terminal','Start in the terminal'],['turtle','Draw and play with Turtle'],['arcade','Build a small Arcade game'],['data','Explore data with pandas and matplotlib']];
 return `<article class="information-page" id="python-projects">
   <nav class="breadcrumbs eyebrow" aria-label="Breadcrumb"><a href="#home">Home</a><span aria-hidden="true">/</span><a href="#practice=2">Programming</a><span aria-hidden="true">/</span><span aria-current="page">Project ideas</span></nav>
   <h1>Build something.</h1>
   <p>18 Python project ideas for a few sessions of making, testing and improving. Pick one that makes you curious.</p>
   <p>Build the smallest working version first, then add the stretch feature. Split the work into functions and test normal, boundary and invalid inputs. A developed project might use 100–500 readable lines; clear, working code matters more than the count.</p>
   <p>Use your Python editor and fictional data. Terminal projects need no extra packages. Turtle needs a desktop Python setup with Tk support. Arcade, pandas and matplotlib need installing in your Python environment; your teacher can help you get set up.</p>
   <div class="project-links" aria-label="Tool guides">
     <a href="https://docs.python.org/3/library/turtle.html" target="_blank" rel="noopener">Turtle guide ↗</a>
     <a href="https://api.arcade.academy/en/stable/" target="_blank" rel="noopener">Arcade guide ↗</a>
     <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html" target="_blank" rel="noopener">pandas tutorials ↗</a>
     <a href="https://matplotlib.org/stable/users/explain/quick_start.html" target="_blank" rel="noopener">matplotlib guide ↗</a>
   </div>
   ${groups.map(([key,label])=>`<section><h2>${label}</h2>${projects.filter(project=>(project[4]??'terminal')===key).map(([title,brief,topics,stretch])=>`<details><summary>${title}</summary><p>${brief}</p><p><strong>Practise:</strong> ${topics}</p><p><strong>Stretch:</strong> ${stretch}</p></details>`).join('')}</section>`).join('')}
   <p class="project-link">These projects are not run or marked by this site. Write a short README explaining how to run yours, then ask a partner to test it.</p>
 </article>`;
}
