# DSD T-Level year 1 starters

The aim is to create a set of permutable starter activities (5 - 15 minutes) for Digital Software Development T-Level students in year 1, studying the Core component of the spec.

They are generally 16-18 year olds, mixed ability and varying experience and subject skill levels (none to moderate/high).

The starter will be accessed through an HTML page. The starter activities should offer:

- puzzles
- short series of spec related multi-choice or short text answer questions
- Python programming challenges (complete the code, fix the code, write a function, etc.)

## puzzzles and puzzle types

All interactive with click, drag and drop, text or number entry

Self-marking

Varieties should include numerical/maths, spatial, sequence and logic puzzles and combinations there of, along with other types as found in the provided examples and links.

Shapes, number grids, sequences and other forms should be grouped into similar selectable types.

Perhaps also some basic Go tsumigo problems (10k to 20k difficulty). Students will have already had the rules explained, but a link to a short online tutorial (e.g. at online-go.com) could be provided with the puzzle if students want a reminder.

Where possible all questions should link to aspects of spec content areas, with industry related examples and scenarios (won't be possible for all puzzles).

These can be allocated points based on challenge level and time to complete. They are more here for variety and fun, and to wake the brain up.

See the `example_puzzles` dir content for examples of puzzle types, and links to good puzzle collections online which you can use for inspiration, or copying in case of good ones.

It may be good to have puzzle subtype selection/filtering for the user.

## spec related questions

Questions should focus on A) for programming related CA, lower point value logic and programming related knowledge questions, including questions involving applying the python operators listed in the spec and B) for all parts of the Core spec, name, state, list and describe lower point value questions, and on questions that link reasons/justications that students must pick to previous answers, to aid slightly deeper understanding of spec content areas. The aim is more towards coverage than question depth.

For text entry questions, the HTML JS should be able to check for key words and phrases, match close spellings or synonyms, and provide informative feedback on the answer. Any text entry should be either single work or short sentence.

Questions should be presented in groups of 3, where each question could have multiple parts, each with a 1-3 mark value. The total mark value for all question parts from all 3 questions should be in the range 15-22.

For spec reference, see: `../agents/spec.md`. For past exam questions and mark schemes for Core paper 1 and paper 2 (covering CA1-CA8), see: `../agents/SAM/` folder. Again the focus is on lower point value, simple command word questions (1-4 points).

The band of spec related questions should completely cover the Core CA spec (each assessible element in the spec should be covered by at least one question (each with at least 2 permutations for question phrasing, values and correct answers where appropriate), and each question should be tagged with the relevant spec content area and subsection, e.g. CA1.3.2).

For spec related questions the question focus is the CA reference.

For CA 2 (programming) related questions, some questions can be more probing, e.g. for a given function description, choose appropriate test types and input values and expected output values.

## Python programming challenges

These should focus on reinforcing understanding of basic syntax, data types, control structures, and functions. Challenges should include:

- Completing partially written code snippets
- Debugging code with intentional errors, both syntax and logic errors
- Writing small functions to solve specific problems
- Predicting the output of given code snippets, either per loop (multiple inputs for students to fill in) and/or final value(s).
- Tracing the value of variables through a code snippet, with students filling in the values at each step.
- Testing code style knowledge (e.g. 'find 3 reasons why this code is not PEP8')

Code length should generally not exceed 12 lines (not including comments or blank lines). Each challenge should have a clear, concise problem statement.

Code complexity should extend up to basic sorting and searching algorithms. Code style should be PEP8 (unless the question is to test student knowledge by identifying style issues)

Automatic feedback should include hints and explanations for common mistakes, as well as the correct answer if student opts to view it, otherwise giving the student a chance to try again.

Code challenge questions should be presented in sets of 2, each testing a different aspect of basic python programming knowledge, with a total mark value for both questions in the range 10-15.

For Python programming challenges, question focus would be tags such as 'iteration', 'selection', 'boolean expressions', 'operators', 'syntax', 'logic', 'program tracing', 'typos', 'functions', 'data types', 'input/output', 'algorithms' etc. For each question focus, there should be at least 3 completely different questions, each with their own permutations.

If puzzle questions do not contribute to revision priority calculations.

## presentation and navigation

SPA, colourful, responsive and accessible (layout should remain clear and functional even when zoomed in a lot for partially sighted students).

Language should be clear and concise, using technical terms from the spec where appropriate, but avoiding additional jargon.

Navigation should allow selection of question types and entry of a specific question set code directly from main page.

## Question permutations and questions sets

Each question should have multiple (at least 5 for code challenges) variations, with different values, scenarios, code snippets, and answer values, but essentially being quite similar questions. This is to give more variety but also help students identify the underlying concept or principle rather than simply memorize an arbitrary set of questions. Each unique question permutation must have a unique code, which can be used to access that specific question directly from the main page. The code should include a prefix to identify the question type (puzzle, spec question, or python challenge) and a unique identifier for the specific question. It should be extendable to allow for future additions of new question types and variations.

Questions should support tags to record spec content area and subsections, e.g. CA1.3.2

Questions sets (the 2-3 questions presented to students for a starter activity) should also have unique codes (which also specify the specific permutation of each question), which can be a short hash of the individual question codes, to allow for easy sharing and access to specific sets of questions.

There should be a button for randomizing the question set ('get new question set') within a given question type and another button for randomizing within the question focus.

Selecting 'get new question set' should keep the same question type (puzzles, exam practice, programming) but alter the focus of the questions, e.g. don't pick permutations of the same question, but an entirely different set of questions of the same type and also randomize the chosen permutations of those questions.

Selecting 'get new permutation' should keep the same question type and focus, but alter the specific question permutations presented to the student.

For viewing a new question (sets) a simple rule such as: random (with selected type or focus constraint) + not just seen, could be a good starting point.

The idea is students can enter a code for a question set given by the teacher into the SPA and immediately access the exact intended question set.

Whenever a question set is shown, its unique code should be displayed prominently, so students can share it with peers or teachers.

A question can potentially cover more than one focus area (e.g. logic errors and boolean expressions, or functions and syntax).

A 6 character hash should be sufficient for question set codes.

## question data and codes

Each question type should have it's own JSON/js file which the main script imports.
The data file should include tags for each question as well as question permutations (or rules for generating them, per question).

A separate questions_codes.js file could be maintained for caching question codes, and containing a function to make question set codes to individual question codes.

The question code generation could be a function of the question text and tags, which has the benefit of making it independent of question order. Having these cached in a separate compiled js file would save the client computing each question code for the whole set of each client code.

Using the question code cache file and a deterministic function for deriving question codes (same question always produces same question code), the same code for questions and question sets should produce the same outcome for all clients.

question and cache files could be versioned to allow for updates and older client versions remaining usable.

It might be helpful if the question code derivation function maps similar codes to similar functions, so that nearest match could be found, after minor updates. Then previous codes could be stored in the question code cache, to help old codes find the updated versions of questions.

For question set codes, a shared seed may be required used to produce the 6 character hash from the individual question codes. Additionally, to map the other way, it would be helpful to also have a question_set_codes.js to cache those codes as well. An exhaustive list would be too large though.
Alternatively, a scheme that relies of question and permutation order could be much more compact and reversible. e.g. [type][offset1][perm1][offset2][perm2][offset3][perm3] could work.  using a binary scheme where 2 bits are used for type, 10 for offset, 3 for permutation, would require 41 bits, which can be encoded in 6 ascii characters and decoded back into the type and offset data to match questions. There would even be upto 7 bits spare for a version number, to allow codes to match with versions of the question data files.

## Timing

There should be a timed mode option that displays a countdown timer for the entire question set, with a configurable time limit (e.g., 5-15 minutes). When the timer runs out, the student's answers should be automatically submitted and scored.

Adding a 7th character to the question set code should indicate that the student has selected timed mode, and the SPA should display the countdown timer accordingly, according to the value of the 7th character, e.g. 6 for 6 minutes A for 10 minutes, F for 15 minutes, etc.

Students should also be able to enable a timer on question sets whenever they want for their own practice.

If a timer is enabled, then this can reset the hidden timer already running, so they are synced. A page refresh should not reset the timer, unless it's been > 45 minutes.

## Record keeping and progress tracking

The SPA should use local storage to keep track of student progress, including: date, % score on each question set, time taken to complete each set (whether timer visible or not), and the number of attempts made. Students should be able to view their progress over time, with visual representations such as graphs or charts. Data should be sortable and filterable by question type, focus, and date range. It should be easy for students to identify weaker and stronger areas. There should be a revision priorities box and/or 'sort by revision priority' feature.

There should be an export feature than allows students to save their progress data as CSV. Similarly it should be possible to import data from csv.

Students should be encouraged to save their data to their student account OneDrives regularly, so swapping computers and or computer rebuilds can be handled.

## Hosting

static Github pages site.

## Implementation direction

Make full use of reliable libraries, tools and common browser api features. Don't re-invent the wheel.

This may include importing Pyscript (although a v1 could keep programming questions to fill in the blank/change the word/symbol/operator and multiple choice).

For further project spec files, for specific question types and features and style, content much remain high signal, accurate and concise. Avoid all synonym rotation in text, call a spade a spade.
