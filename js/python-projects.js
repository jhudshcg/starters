/**
 * Purpose: Optional independent project ideas for Year 1 Coding practice.
 * Main contents: eighteen briefs, challenge ratings and getting-started guidance, grouped by tools.
 * Used by: Information.svelte. Uses: shared disclosure styles. Libs: none.
 */
const projects = [
  {
    title: 'Victorian insult generator',
    brief:
      'Combine lists of grand adjectives and unlikely nouns to produce harmless nonsense: “You spectacularly soggy crumpet!” Use a dictionary to organise words by category and let the user choose a style.',
    topics: 'Lists, dictionaries, random choice, strings, functions and validation.',
    stretch: 'Avoid repeats, save favourites and add a compliment mode.',
    group: 'terminal',
    rating: 'Easy',
    reason: 'Short lists, selection and a small repeat loop.',
    plan: [
      'Choose two word categories and write a few harmless words for each. Decide how a style changes the available words.',
      'Make one sentence work before adding a menu or repeat option. What should happen if the style is unknown?',
      'Separate choosing words from displaying the sentence so you can test each step.',
    ],
    modules:
      '<code>random</code> for choosing words. Ordinary text-file operations are enough for the favourites stretch.',
  },
  {
    title: 'The mildly dramatic chatbot',
    brief:
      'Write a rule-based terminal bot that thinks it is a retired spaceship. Match keywords to lists of replies, remember the user’s name and offer a clear exit command.',
    topics: 'Dictionaries, lists, string methods, selection and a conversation loop.',
    stretch:
      'Track a simple mood and respond differently to repeated questions. Give unknown input a useful fallback; no AI service is needed.',
    group: 'terminal',
    rating: 'Easy',
    reason: 'A small set of rules using strings, dictionaries and a loop.',
    plan: [
      'Plan three topics, an unknown-input reply and an exit command. Keep the conversation rules small at first.',
      'Decide how to handle capital letters and punctuation, and which rule wins when a message contains two keywords.',
      'Get one exchange working, then add repetition and remembering the name. Test blank and unfamiliar messages.',
    ],
    modules: '<code>random</code> can vary replies within a topic. No AI package is needed.',
  },
  {
    title: 'Quiz host',
    brief:
      'Ask questions from a list, check answers and show a score. Let the player choose a topic and try again.',
    topics: 'Functions, lists, selection, loops, strings and input validation.',
    stretch: 'Save question records and best scores to a file.',
    group: 'terminal',
    rating: 'Easy',
    reason: 'Basic input, selection, iteration and a running score.',
    plan: [
      'Write three questions and their answers. Decide which answer differences, such as capital letters, should be accepted.',
      'Plan how to keep each question with its answer and topic. Make one question work before running through a list.',
      'Trace how the score changes for correct and incorrect answers. Check that a new game starts from zero.',
    ],
    modules:
      'None required. Optional <code>random</code> for question order and <code>json</code> for saving question records.',
  },
  {
    title: 'Pocket-money planner',
    brief:
      'Record income and spending with a category and description. Show the balance and totals by category. Store money as whole pence to keep arithmetic simple.',
    topics: 'Numbers, dictionaries, lists, loops and validation.',
    stretch: 'Save and reload records; filter spending by category and test invalid amounts.',
    group: 'terminal',
    rating: 'Medium',
    reason: 'Related records, numeric validation and several totals.',
    plan: [
      'Sketch one transaction with its amount, category, description and whether it is income or spending.',
      'Decide how users enter amounts and how you will convert them to whole pence. Plan checks for blank, negative and non-numeric entries.',
      'Work out the expected balance for a small example on paper, then build entry and summary functions separately.',
    ],
    modules:
      'None required for the first version. <code>json</code> can save the transaction records later.',
  },
  {
    title: 'Study flashcards',
    brief:
      'Let students add, edit and practise question-and-answer cards. Keep a list of cards they found difficult and offer another round.',
    topics: 'Strings, list operations, functions, selection and dictionaries.',
    stretch: 'Save the cards and track how often each one is answered correctly.',
    group: 'terminal',
    rating: 'Medium',
    reason: 'Editing records and maintaining a separate practice selection.',
    plan: [
      'Decide what belongs in one card and how the user selects a card to edit.',
      'Build add and view actions before a practice round. Decide whether students type an answer or judge their own recall.',
      'Plan how difficult cards are remembered without duplicating or losing the original cards. Test a round with no cards.',
    ],
    modules:
      'Optional <code>random</code> for practice order and <code>json</code> for saving cards.',
  },
  {
    title: 'Task organiser',
    brief:
      'Add tasks with a priority, mark them complete and remove them. Search descriptions and display outstanding tasks in priority order.',
    topics: 'Lists, dictionaries, search, sorting and a menu loop.',
    stretch: 'Add an undo stack: save each change so the latest action can be reversed.',
    group: 'terminal',
    rating: 'Medium',
    reason: 'Several record operations with search and ordered output.',
    plan: [
      'Sketch the task record, including priority and completion status. Decide how to identify tasks when two descriptions match.',
      'Build add and list actions, then completion, removal and search. Keep input handling separate from record changes.',
      'Decide how equal priorities are ordered. Test an empty list and removal of a task that does not exist.',
    ],
    modules:
      'None required. Built-in sorting is sufficient; <code>json</code> is useful if you later add saving.',
  },
  {
    title: 'Equipment loan desk',
    brief:
      'Keep a catalogue of equipment and fictional borrowers. Issue and return items, reject duplicate loans and show what is available.',
    topics: 'Record IDs, dictionaries, functions, validation and file handling.',
    stretch: 'Search by name and produce a sorted report of outstanding loans.',
    group: 'terminal',
    rating: 'Medium',
    reason: 'Linked identifiers and rules that keep loan records consistent.',
    plan: [
      'List the fields for an item, a borrower and a loan. Decide which IDs connect them.',
      'Trace issuing and returning one item on paper. Plan what happens for an unknown ID or an item already on loan.',
      'Get the in-memory catalogue working before adding saving. Check that availability and loan records still agree after reloading.',
    ],
    modules:
      '<code>json</code> for saving related records; normal file operations for reading and writing.',
  },
  {
    title: 'Cinema seat booking',
    brief:
      'Display rows of seats as a text grid. Reserve or cancel a seat, reject occupied seats and calculate the booking total.',
    topics: 'Nested lists, indexing, nested loops, selection and testing.',
    stretch: 'Find a block of adjacent free seats and save bookings between runs.',
    group: 'terminal',
    rating: 'Medium',
    reason: 'A two-dimensional structure with indexing and booking rules.',
    plan: [
      'Draw a small seating grid and choose how to represent free and booked seats.',
      'Decide how displayed row and seat numbers relate to list indices. Try the first and last seat by hand.',
      'Build display and reservation first, then cancellation and totals. Plan checks for occupied seats and out-of-range selections.',
    ],
    modules: 'None required. Optional <code>json</code> for the saved-bookings stretch.',
  },
  {
    title: 'Text adventure',
    brief:
      'Create connected rooms with descriptions, items and commands. Let the player collect objects and use them to solve a small puzzle.',
    topics: 'Dictionaries, lists, string processing, functions and state changes.',
    stretch: 'Add save/load and test that locked routes cannot be bypassed.',
    group: 'terminal',
    rating: 'Harder',
    reason: 'Connected data and state changes that must remain consistent.',
    plan: [
      'Draw a map of three rooms and one puzzle. List the commands and the conditions for winning.',
      'Plan room links, item locations and the player inventory. Decide what must change when an item is collected or used.',
      'Build movement before the puzzle. Test unknown commands and repeated actions; consider separate files for room data and game logic as it grows.',
    ],
    modules:
      'No package required. <code>json</code> can support save/load once the game state is clearly defined.',
  },
  {
    title: 'League results manager',
    brief:
      'Record teams and match scores. Calculate played, won, drawn, lost and points, then display a league table with a clear tie-break rule.',
    topics: 'Dictionaries, accumulation, validation, decomposition and sorting.',
    stretch: 'Allow score corrections and rebuild the table from the original match records.',
    group: 'terminal',
    rating: 'Harder',
    reason: 'Derived statistics, several rules and consistent ordering.',
    plan: [
      'Specify points for wins and draws and an exact tie-break rule. Calculate a tiny league by hand.',
      'Decide how to store teams and match records, and which table values can be calculated from those records.',
      'Separate recording a match from calculating and displaying the table. Test draws, tied teams and a team with no matches.',
    ],
    modules:
      'None required. Built-in sorting can order the table; <code>json</code> can save matches if you extend the project.',
  },
  {
    title: 'Search and sort laboratory',
    brief:
      'Let a user enter or generate a list. Implement linear and binary search, then bubble and insertion sort. Show each step and count comparisons.',
    topics: 'Algorithms, indices, loop boundaries, copies and systematic tests.',
    stretch:
      'Compare sorted, reversed and duplicate-filled inputs. Sort a copy before binary search and handle empty lists.',
    group: 'terminal',
    rating: 'Harder',
    reason: 'Several algorithms with careful boundaries and step tracking.',
    plan: [
      'Choose one small list and trace each algorithm on paper. Decide exactly what counts as a comparison.',
      'Implement and test one algorithm at a time. Keep its logic separate from showing steps and reading menu choices.',
      'Plan how to preserve the original list and meet binary search’s sorted-input requirement. Test empty, one-item and duplicate-filled lists.',
    ],
    modules:
      'Optional <code>random</code> for generating lists. Implement the search and sort algorithms yourself.',
  },
  {
    title: 'Support-ticket simulator',
    brief:
      'Create fictional support tickets with IDs, categories, priorities and statuses. Assign the next waiting ticket, search records and show workload summaries.',
    topics: 'Decomposition, dictionaries, queues, stacks, search, sorting, files and robust code.',
    stretch:
      'Use first in, first out within each priority; add an undo history and recover gracefully from a missing or malformed save file.',
    group: 'terminal',
    rating: 'Harder',
    reason: 'Linked records, queue rules, persistence and wider program design.',
    plan: [
      'Define ticket fields and permitted status changes. Decide how priority and arrival order determine the next assignment.',
      'Build create, assign and close actions using a few fictional tickets. Check that a closed ticket cannot be assigned again.',
      'Plan saving and workload summaries after the core actions work. Separate record operations, storage and the menu into functions; consider separate files as they grow.',
    ],
    modules:
      '<code>json</code> for saved records. <code>collections.deque</code> is an option for queues; a list is enough for a simple undo stack.',
  },
  {
    title: 'Turtle pattern studio',
    brief:
      'Use Turtle to draw stars, spirals and tiled patterns. Let the user choose colours and a repeat count; keep each shape in its own function.',
    topics: 'Turtle, loops, parameters, angles and input validation.',
    stretch: 'Add a keyboard command to clear the canvas and generate a new design.',
    group: 'turtle',
    rating: 'Easy',
    reason: 'Basic loops and functions, plus a few drawing commands.',
    plan: [
      'Sketch one shape and work out its turns and repeated steps before writing code.',
      'Make one drawing function, then experiment with size, colour and repetition. Keep input prompts outside the drawing function.',
      'Choose sensible limits for repeat counts and sizes. Test the smallest pattern before filling the canvas.',
    ],
    modules:
      '<code>turtle</code> for drawing; it needs a desktop Python installation with Tk support.',
  },
  {
    title: 'Turtle snack chase',
    brief:
      'Move a turtle with the arrow keys to collect randomly placed snacks. Update the score on contact and keep the turtle inside the window.',
    topics: 'Turtle, keyboard events, coordinates, random positions, functions and state.',
    stretch:
      'Add a countdown using scheduled updates, then a restart key. Make sure snacks stay on the board.',
    group: 'turtle',
    rating: 'Medium',
    reason: 'Event-driven movement with coordinates and shared game state.',
    plan: [
      'Sketch the board limits and decide how far the turtle moves for each key press.',
      'Get movement working before adding one snack. Decide how close the turtle must be to collect it.',
      'Plan which state changes on collection: score and snack position. Test corners and ensure one snack cannot score repeatedly.',
    ],
    modules:
      '<code>turtle</code> for drawing and key events, and <code>random</code> for snack positions.',
  },
  {
    title: 'Arcade: dodge the laundry',
    brief:
      'Move a basket left and right to catch falling socks while dodging suspiciously heavy boots. Begin with one falling object, a score and a restart button.',
    topics: 'Arcade, sprites, keyboard events, update callbacks, collisions and lists.',
    stretch:
      'Add lives and gradually increase the falling speed. Test that each collision changes the score only once.',
    group: 'arcade',
    rating: 'Harder',
    reason: 'Learning a game framework and coordinating events, collisions and state.',
    plan: [
      'Sketch the screen and define what catching a sock or hitting a boot does. Start with a basket and one falling object.',
      'Separate drawing, keyboard handling and timed updates. Decide when an object leaves play and how to prevent repeat scoring.',
      'Plan the state needed for play, game over and restart. Get a small working game before adding more objects or files.',
    ],
    modules:
      '<code>arcade</code> for the game window, sprites and collisions; <code>random</code> for varied falling positions. Install Arcade first.',
  },
  {
    title: 'Arcade: the floor is mildly inconvenient',
    brief:
      'Build a single-screen platform game. Jump between a few platforms, collect three biscuits and reach the kettle. Start with simple shapes or supplied assets.',
    topics: 'Arcade, sprites, gravity, collisions, game states and decomposition.',
    stretch: 'Add a second level and a checkpoint. Keep the level small enough to test every jump.',
    group: 'arcade',
    rating: 'Harder',
    reason: 'Physics, level data and several interacting game states.',
    plan: [
      'Draw one small level with reachable platforms, three collectibles and the finish. Use simple shapes while testing.',
      'Learn movement, jumping and platform collisions before adding scoring. Decide when the finish should count as a win.',
      'List everything that must reset after a fall or restart. Keep level data apart from game rules; separate files may help once the first level works.',
    ],
    modules:
      '<code>arcade</code> for sprites, platform physics and keyboard events. Install it and work through its platform-game tutorial in small steps.',
  },
  {
    title: 'The great biscuit investigation',
    brief:
      'Use pandas to read a small fictional CSV of biscuit ratings, prices and categories. Check missing values, calculate category averages and plot them with matplotlib.',
    topics: 'pandas, CSV files, filtering, group summaries, matplotlib and labelled charts.',
    stretch:
      'Compare rating with price using a scatter plot. State the limits of your tiny dataset; decide how missing values should be handled.',
    group: 'data',
    rating: 'Medium',
    reason: 'Confident basics plus learning a small data-analysis workflow.',
    plan: [
      'Write one question the data should answer and design a tiny CSV with clear column names and units.',
      'Decide how to handle missing ratings and prices before calculating averages. Work out one category average by hand.',
      'Read and inspect the data before plotting. Choose a chart that answers your question and label both axes with units where relevant.',
    ],
    modules:
      '<code>pandas</code> for CSV reading and summaries, and <code>matplotlib.pyplot</code> for charts. Both packages need installing.',
  },
  {
    title: 'Bus delay detective',
    brief:
      'Create a fictional CSV of routes, dates and delay minutes. Use pandas to validate and filter it, summarise delay by route and draw a clear matplotlib chart.',
    topics: 'pandas, numeric conversion, missing data, grouping, sorting and matplotlib.',
    stretch:
      'Add a date filter and a trend chart. Export a cleaned CSV and a chart image, then explain which route you would investigate.',
    group: 'data',
    rating: 'Harder',
    reason: 'Cleaning mixed data and designing a repeatable investigation.',
    plan: [
      'Define delay minutes and decide whether negative values mean early arrivals. Include missing values and malformed entries in a small fictional CSV.',
      'Plan the order of validation, cleaning, filtering and grouping. Decide how to report rejected rows rather than silently losing them.',
      'Compare routes with a clearly defined measure and check a small example by hand. Keep cleaning, analysis and plotting in separate functions before adding date trends.',
    ],
    modules:
      '<code>pandas</code> for conversion, dates and grouping, and <code>matplotlib.pyplot</code> for charts. Both packages need installing.',
  },
];
/** Render independent briefs with official tool guides, outside assessed practice. */
export function pythonProjectsHTML() {
  const groups = [
    ['terminal', 'Start in the terminal'],
    ['turtle', 'Draw and play with Turtle'],
    ['arcade', 'Build a small Arcade game'],
    ['data', 'Explore data with pandas and matplotlib'],
  ];
  return `<article class="information-page" id="python-projects">
   <nav class="breadcrumbs eyebrow" aria-label="Breadcrumb"><a href="#home">Home</a><span aria-hidden="true">/</span><a href="#practice=2">Programming</a><span aria-hidden="true">/</span><span aria-current="page">Project ideas</span></nav>
   <h1>Build something.</h1>
   <p>18 Python project ideas for a few sessions of making, testing and improving. Pick one that makes you curious.</p>
   <p>Build the smallest working version first, then add the stretch feature. Split the work into functions and test normal, boundary and invalid inputs. A developed project might use 100–500 readable lines; clear, working code matters more than the count.</p>
   <p>Use your Python editor and fictional data. Terminal projects need no extra packages. Turtle needs a desktop Python setup with Tk support. Arcade, pandas and matplotlib need installing in your Python environment; your teacher can help you get set up.</p>
   <details>
     <summary>About the challenge ratings</summary>
     <p>Ratings describe the core project, before stretch features. They are a guide to coding complexity, not an exam grade.</p>
     <ul>
       <li><strong>Easy:</strong> uses the basic Python knowledge expected for a T-Level pass: variables, input/output, selection, loops, simple lists and functions.</li>
       <li><strong>Medium:</strong> needs confidence with those basics, combining several functions and data structures, and possibly learning a small module or library.</li>
       <li><strong>Harder:</strong> needs more learning and design thought, more complex data or interacting parts, and possibly several Python files.</li>
     </ul>
   </details>
   <div class="project-links" aria-label="Tool guides">
     <a href="https://docs.python.org/3/library/turtle.html" target="_blank" rel="noopener">Turtle guide ↗</a>
     <a href="https://api.arcade.academy/en/stable/" target="_blank" rel="noopener">Arcade guide ↗</a>
     <a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html" target="_blank" rel="noopener">pandas tutorials ↗</a>
     <a href="https://matplotlib.org/stable/users/explain/quick_start.html" target="_blank" rel="noopener">matplotlib guide ↗</a>
   </div>
   ${groups
     .map(
       ([key, label]) => `<section>
     <h2>${label}</h2>
     ${projects
       .filter((project) => project.group === key)
       .map(
         (project) => `<details>
       <summary>${project.title} · ${project.rating}</summary>
       <p>${project.brief}</p>
       <p><strong>Practise:</strong> ${project.topics}</p>
       <details>
         <summary>Getting started</summary>
         <p><strong>Challenge: ${project.rating}.</strong> ${project.reason}</p>
         <ul>${project.plan.map((step) => `<li>${step}</li>`).join('')}</ul>
         <p><strong>Modules:</strong> ${project.modules}</p>
       </details>
       <p><strong>Stretch:</strong> ${project.stretch}</p>
     </details>`,
       )
       .join('')}
   </section>`,
     )
     .join('')}
   <p class="project-link">These projects are not run or marked by this site. Write a short README explaining how to run yours, then ask a partner to test it.</p>
 </article>`;
}
