/**
 * Purpose: Optional topic introductions with small, runnable Python examples.
 *
 * Main contents: focus guides, relevant-guide selection and native disclosures.
 * Used by: app.js and guide checks. Uses: algorithm-guide.js. Libs: none.
 */
import {algorithmGuideHTML} from './algorithm-guide.js';

// Examples are independent programs; their expected stdout is checked offline.
export const pythonGuides={
  iteration:{title:'Iteration: repeat steps',intro:'An iteration is one trip through a loop. Use for to visit items or a range; use while to repeat while a condition is true.',examples:[
    {text:'range(start, stop) includes the start but excludes the stop.',code:'for ticket in range(4, 7):\n    print(ticket)',output:'4\n5\n6'},
    {text:'An accumulator keeps a running total. Update the loop variable so this while loop ends.',code:'total = 0\nremaining = 3\nwhile remaining > 0:\n    total += remaining\n    remaining -= 1\nprint(total)',output:'6'}]},
  selection:{title:'Selection: choose a path',intro:'A condition is an expression that gives True or False. if, elif and else choose which indented block runs. In one chain, only the first matching branch runs.',examples:[
    {text:'Use == to compare values; = assigns a value.',code:'attempts = 2\nif attempts == 0:\n    print("Start")\nelif attempts < 3:\n    print("Try again")\nelse:\n    print("Review")',output:'Try again'},
    {text:'match compares a subject with patterns. The wildcard _ handles any remaining value.',code:'command = "save"\nmatch command:\n    case "save":\n        print("Saved")\n    case _:\n        print("Unknown command")',output:'Saved'}]},
  functions:{title:'Functions: name a reusable task',intro:'def defines a function. A parameter is a name in its definition; an argument is a value supplied in a call. return sends a result back to the caller.',examples:[
    {text:'The caller can store and use the returned value. print displays a value; it does not return that value.',code:'def add_fee(price):\n    return price + 2\n\ncharge = add_fee(8)\nprint(charge)',output:'10'},
    {text:'A local variable belongs to its function call. It does not replace a same-named variable outside the function.',code:'total = 20\n\ndef double(value):\n    total = value * 2\n    return total\n\nprint(double(3))\nprint(total)',output:'6\n20'}]},
  operators:{title:'Operators: calculate and compare',intro:'Operators act on values. Arithmetic produces numbers; relational operators such as >= compare values and produce a Boolean. Parentheses make the intended calculation order clear.',examples:[
    {text:'For positive integers, // gives the number of complete groups and % gives the remainder. / gives ordinary division.',code:'print(17 // 5)\nprint(17 % 5)\nprint(17 / 5)',output:'3\n2\n3.4'},
    {text:'Multiplication happens before addition. += adds to the existing value.',code:'print(2 + 3 * 4)\nprint((2 + 3) * 4)\nstock = 6\nstock += 2\nprint(stock >= 8)',output:'14\n20\nTrue'}]},
  'data types':{title:'Data types and conversion',intro:'A type describes a kind of value: int for whole numbers, float for floating-point numbers, str for text and bool for True/False. Conversion creates a value of another type.',examples:[
    {text:'Quoted digits are text. Convert valid numeric text before arithmetic.',code:'text = "12"\nprint(text + "3")\nprint(int(text) + 3)\nprint(float("2.5") * 2)',output:'123\n15\n5.0'},
    {text:'A non-empty string converts to True, even if it says "False". Compare text explicitly when interpreting a response.',code:'reply = "no"\nprint(bool(reply))\nprint(reply == "yes")',output:'True\nFalse'}]},
  strings:{title:'Strings: work with text',intro:'A string is a sequence of characters. Indices start at 0; -1 selects the last character. Strings are immutable: operations produce new strings rather than changing individual characters.',examples:[
    {text:'A slice includes its start index and excludes its stop index.',code:'label = "Python"\nprint(label[0])\nprint(label[-1])\nprint(label[1:4])',output:'P\nn\nyth'},
    {text:'strip removes surrounding whitespace; lower changes letter case. An f-string inserts values inside braces.',code:'name = "  AMINA  "\nclean = name.strip().lower()\nprint(f"Hello, {clean}")\nprint(len(clean))',output:'Hello, amina\n5'}]},
  lists:{title:'Lists: select, combine and change items',intro:'A list is an ordered, mutable collection: you can change its items. Indices start at 0. A slice and + make new outer lists; nested objects may still be shared.',examples:[
    {text:'A slice excludes its stop index. + concatenates lists (joins their items).',code:'values = [10, 20, 30, 40]\nprint(values[1:3])\nprint(values[:2] + [50])',output:'[20, 30]\n[10, 20, 50]'},
    {text:'append adds one item; extend adds each item from a collection. pop removes and returns an item. Using append and pop at the end gives a last in, first out (LIFO) stack: append performs the push operation.',code:'items = [10]\nitems.append(20)\nitems.extend([30, 40])\nlast = items.pop()\nprint(last)\nprint(items)',output:'40\n[10, 20, 30]'},
    {text:'insert adds before an index; remove deletes the first matching value. pop(index) removes by position. A missing remove value raises ValueError; an invalid pop index raises IndexError.',code:'items = [10, 20, 10]\nitems.insert(1, 30)\nitems.remove(10)\nprint(items.pop(1))\nprint(items)',output:'20\n[30, 10]'}]},
  records:{title:'Records: keep related fields together',intro:'A record groups named fields about one item, such as a learner. Here a Python dictionary represents a record: keys name the fields and values hold their data.',examples:[
    {text:'Read or update a field using its key, rather than a numeric position.',code:'learner = {"name": "Amina", "score": 7}\nlearner["score"] += 2\nprint(learner["name"])\nprint(learner["score"])',output:'Amina\n9'},
    {text:'A list can hold several records. The loop variable refers to one record at a time.',code:'jobs = [{"id": 4, "done": True},\n        {"id": 5, "done": False}]\nfor job in jobs:\n    if not job["done"]:\n        print(job["id"])',output:'5'}]},
  'boolean logic':{title:'Boolean logic: combine conditions',intro:'Boolean expressions evaluate to True or False. and requires both conditions; or requires at least one; not reverses a truth value.',examples:[
    {text:'Combine lower and upper bounds to check a range, including both endpoints.',code:'age = 17\nhas_pass = False\nprint(age >= 16 and age <= 18)\nprint(age < 16 or has_pass)\nprint(not has_pass)',output:'True\nFalse\nTrue'},
    {text:'Short circuit evaluation skips the right-hand side of and when the left is false. This prevents division by zero here.',code:'count = 0\ntotal = 12\nif count > 0 and total / count >= 5:\n    print("Target met")\nelse:\n    print("Not met")',output:'Not met'}]},
  'nested iteration':{title:'Nested iteration: a loop inside a loop',intro:'For each outer-loop iteration, the inner loop runs through its items. Trace the outer value first, then each inner value before moving on.',examples:[
    {text:'Two outer iterations and three inner iterations produce six pairs.',code:'for row in range(2):\n    for column in range(3):\n        print(row, column)',output:'0 0\n0 1\n0 2\n1 0\n1 1\n1 2'},
    {text:'Visit every value in a grid by visiting each row, then each item in that row.',code:'grid = [[2, 4], [1, 3]]\ntotal = 0\nfor row in grid:\n    for value in row:\n        total += value\nprint(total)',output:'10'}]},
  'input output':{title:'Input and output: receive and display data',intro:'Input brings data into a program; output sends it out. input() returns text, so convert valid numeric input before calculating. The first example supplies that text directly so you can trace it.',examples:[
    {text:'This supplied string stands in for a response from input("Quantity: "). An f-string formats the output.',code:'response = "4"\nquantity = int(response)\nprint(f"Total: £{quantity * 3}")',output:'Total: £12'},
    {text:'w writes a text file and replaces its old contents; r reads it. The with block closes the file automatically. Run this example only in a practice folder.',code:'with open("practice-note.txt", "w") as file:\n    file.write("Ready\\n")\nwith open("practice-note.txt", "r") as file:\n    message = file.read()\nprint(message.strip())',output:'Ready'}]},
  'robust code':{title:'Robust code: handle expected problems',intro:'Robust code handles invalid data and boundary cases without unexpected failure. Check assumptions before an operation and catch the specific exception you expect.',examples:[
    {text:'Check for an empty list before taking its last item. An empty list is false in a condition.',code:'pending = []\nif pending:\n    print(pending.pop())\nelse:\n    print("Nothing to remove")',output:'Nothing to remove'},
    {text:'int raises ValueError when text is not a valid integer. The except block handles that error.',code:'text = "four"\ntry:\n    quantity = int(text)\n    print(quantity)\nexcept ValueError:\n    print("Enter a whole number")',output:'Enter a whole number'}]},
  testing:{title:'Testing: check expected behaviour',intro:'A test pairs input with an expected outcome. Include normal data, boundary values at or near a limit, and erroneous data the program should reject. Passing examples cannot prove a program has no defects.',examples:[
    {text:'This function accepts 1 to 4 inclusive. Test both boundaries and a value just outside each one. assert raises AssertionError when its condition is false.',code:'def valid_size(size):\n    return 1 <= size <= 4\n\nassert valid_size(1)\nassert valid_size(4)\nassert not valid_size(0)\nassert not valid_size(5)\nprint("Checks passed")',output:'Checks passed'},
    {text:'Test an empty input as well as an ordinary one; empty input often exposes an unchecked assumption.',code:'def total(values):\n    result = 0\n    for value in values:\n        result += value\n    return result\n\nprint(total([2, 5]))\nprint(total([]))',output:'7\n0'}]},
  design:{title:'Design: break a problem into steps',intro:'Decomposition splits a problem into smaller tasks. Give each function a clear responsibility, with defined inputs and a returned result. Trace the steps in the order they run.',examples:[
    {text:'Separate one calculation from the code that displays it. This makes the calculation easier to reuse and test.',code:'def line_cost(price, quantity):\n    return price * quantity\n\ncost = line_cost(4, 3)\nprint(f"Cost: £{cost}")',output:'Cost: £12'},
    {text:'Pass the result of one function into the next step. The call order matters.',code:'def add_fee(amount):\n    return amount + 2\n\ndef discount(amount):\n    return amount * 0.5\n\nprint(discount(add_fee(10)))',output:'6.0'}]},
  collections:{title:'Collections: choose how to group values',intro:'Lists are ordered and mutable. Tuples are ordered and immutable. Sets keep distinct values and do not provide positional indexing. Choose a structure that fits the task.',examples:[
    {text:'A tuple can group fixed values. Unpacking gives each value a name.',code:'point = (4, 7)\nx, y = point\nprint(x)\nprint(y)',output:'4\n7'},
    {text:'Extension: a set removes duplicates and supports membership tests. Do not rely on its display order.',code:'tags = {"web", "data", "web"}\nprint(len(tags))\nprint("data" in tags)',output:'2\nTrue'}]},
  'code style':{title:'Code style: make intent clear',intro:'PEP 8 is Python’s style guide. Use descriptive snake_case names, four spaces per indentation level and spaces around most operators. Readability helps people review and maintain code.',examples:[
    {text:'A clear name describes the value. Indentation groups statements within a function.',code:'def remaining_stock(stock, sold):\n    return stock - sold\n\nprint(remaining_stock(12, 5))',output:'7'},
    {text:'Constants use UPPER_CASE by convention; Python does not prevent reassignment. Comments should explain a useful reason.',code:'MAX_ATTEMPTS = 3\nattempts = 2\n# Leave one attempt for checking the correction.\ncan_retry = attempts < MAX_ATTEMPTS\nprint(can_retry)',output:'True'}]},
  arrays:{title:'Arrays: index one or more dimensions',intro:'An array stores values at indexed positions, commonly with one element type. These exercises use Python lists to practise indexing; Python lists can hold mixed types and are not identical to arrays in every language.',examples:[
    {text:'The first index is 0. len gives the number of items; the final non-negative index is len(values) - 1.',code:'values = [6, 8, 10]\nvalues[1] = 9\nprint(values[0])\nprint(values[len(values) - 1])\nprint(values)',output:'6\n10\n[6, 9, 10]'},
    {text:'For a list of rows, grid[row][column] selects one item. Both indices start at 0.',code:'grid = [[2, 4], [6, 8]]\ngrid[1][0] = 7\nprint(grid[0][1])\nprint(grid[1][0])',output:'4\n7'}]},
  validation:{title:'Validation: check whether input is acceptable',intro:'Validation checks data against rules such as presence, type, length, range or format. It does not prove the data is true. State the rule, including whether endpoints are allowed.',examples:[
    {text:'strip removes surrounding whitespace for a presence check. Here a valid name must contain 1 to 12 characters after stripping.',code:'name = "  Amina  "\nclean = name.strip()\nprint(1 <= len(clean) <= 12)',output:'True'},
    {text:'Conversion and range are separate checks. Handle non-integer text as well as integers outside the allowed range.',code:'text = "7"\ntry:\n    rating = int(text)\n    print(1 <= rating <= 5)\nexcept ValueError:\n    print("Enter a whole number")',output:'False'}]}
};

export const pythonGuideKey=question=>['algorithms','sorting'].includes(question.focus)?'algorithms':question.focus;
export const guidesForQuestions=questions=>[...new Set(questions.map(pythonGuideKey))].filter(key=>key==='algorithms'||Object.hasOwn(pythonGuides,key));
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/** Render each relevant guide once. Saved disclosure state belongs to the active set. */
export function pythonGuidesHTML(questions,opened={}){
  return guidesForQuestions(questions).map(key=>{
    if(key==='algorithms')return algorithmGuideHTML(Boolean(opened[key]));
    const guide=pythonGuides[key];
    return `<details class="algorithm-guide" data-python-guide="${esc(key)}" ${opened[key]?'open':''}>
      <summary>${esc(guide.title)}</summary>
      <p class="muted">Before submission, opening this guide marks matching questions in this set as assisted practice.</p>
      <p>${esc(guide.intro)}</p>
      ${guide.examples.map(example=>`<p>${esc(example.text)}</p><pre><code>${esc(example.code)}</code></pre><p class="guide-output-label">Output:</p><pre class="guide-output"><samp>${esc(example.output)}</samp></pre>`).join('')}
    </details>`;
  }).join('');
}
