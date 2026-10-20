/**
 * Purpose: Practical Python repairs where editing and testing support learning.
 * Main contents: eight six-mark templates with five variations and behavioural tests.
 * Used by: python.js. Uses: shared question helper. Libs: none.
 */
import { question } from './helpers.js';
const test = (args, value) => ({args, value, type: typeof value === 'boolean' ? 'bool' : typeof value === 'number' ? 'int' : typeof value === 'string' ? 'str' : Array.isArray(value) ? 'list' : 'dict'});
const region = (id, original, choices) => ({id, label: id, text: original, choices});
function task(slot, focus, title, tags, make) {
  const q = question(slot, focus, title, 'Edit and test Python', tags, (i) => {
    const v = make(i);
    let solution = v.code;
    for (const [from, to] of v.repairs) solution = solution.replace(from, to);
    return {
      prompt: v.prompt, code: v.code, hint: v.hint,
      livePython: {revision: 1, function: v.fn, access: 'practice', actions: ['run','check'], modes: ['regions','choices','free'], regions: v.regions},
      parts: v.criteria.map(([prompt, tests], j) => ({id: String(j), prompt, marks: 2, kind: 'python', answer: solution, solutionText: solution, explanation: v.explanation, pythonTests: tests})),
    };
  });
  q.liveCoding = true;
  return q;
}
export default [
  task(73, 'iteration', 'Count the qualifying readings', ['iteration','CA2.6.7','CA2.12'], (i) => {
    const low = [1,10,-5,0,3][i], high = [8,20,5,100,12][i];
    return {fn:'count_readings', prompt:`Repair count_readings(readings). Return how many integers are between ${low} and ${high}, including both limits. Count duplicates separately; an empty list gives 0.`,
      code:`def count_readings(readings):\n    count = 0\n    for reading in readings:\n        if ${low} < reading < ${high}:\n            count = 1\n    return count`,
      repairs:[[`${low} < reading < ${high}`,`${low} <= reading <= ${high}`],['count = 1','count += 1']],
      regions:[region('condition',`${low} < reading < ${high}`,[`${low} < reading < ${high}`,`${low} <= reading <= ${high}`,`reading <= ${low} or reading >= ${high}`]),region('count','count = 1',['count = 1','count += 1','count -= 1'])],
      hint:'Trace a repeated qualifying value. Separately consider a value exactly on each limit.', explanation:'The inclusive comparisons accept both limits; incrementing retains earlier matches.',
      criteria:[['Count qualifying values, including duplicates',[test([[low+1,low+1,high-1]],3),test([[low+2]],1)]],['Include both limits',[test([[low,high]],2),test([[high]],1)]],['Ignore outside values and handle an empty list',[test([[low-1,high+1]],0),test([[]],0)]]]};
  }),
  task(74, 'selection', 'Repair the entry decision', ['selection','boolean logic','CA2.4.7'], (i) => {
    const age=[12,14,16,18,21][i];
    return {fn:'allowed',prompt:`Repair allowed(age, has_pass). Return True only when age is at least ${age} and has_pass is True. Inputs are a non-negative integer and a Boolean.`,
      code:`def allowed(age, has_pass):\n    return age > ${age} or has_pass`, repairs:[[' > ',' >= '],[' or ',' and ']],
      regions:[region('age',`age > ${age}`,[`age > ${age}`,`age >= ${age}`,`age <= ${age}`]),region('join','or',['or','and'])],
      hint:'Make a truth table with one row for each combination of meeting the age requirement and having a pass.', explanation:'Both requirements must hold, and the minimum age itself is accepted.',
      criteria:[['Accept eligible pass holders, including the minimum age',[test([age,true],true),test([age+1,true],true)]],['Reject younger visitors even with a pass',[test([age-1,true],false),test([0,true],false)]],['Reject visitors without a pass',[test([age,false],false),test([age+5,false],false),test([0,false],false)]]]};
  }),
  task(75, 'functions', 'Repair the delivery calculation', ['functions','selection','CA2.7','CA2.4'], (i) => {
    const limit=[30,25,40,50,20][i], fee=[4,5,3,6,4][i], extra=[3,2,4,3,5][i];
    return {fn:'delivery_cost',prompt:`Repair delivery_cost(order_total, express). Ordinary delivery costs £${fee}, or £0 for an order of £${limit} or more. Express adds £${extra} to either charge. Return the charge in whole pounds. Inputs are a non-negative integer and a Boolean.`,
      code:`def delivery_cost(order_total, express):\n    if order_total > ${limit}:\n        charge = 0\n    else:\n        charge = ${fee}\n    if express:\n        charge = ${extra}\n    return order_total`,
      repairs:[[`order_total > ${limit}`,`order_total >= ${limit}`],[`charge = ${extra}\n    return`,`charge += ${extra}\n    return`],['return order_total','return charge']],
      regions:[region('limit',`order_total > ${limit}`,[`order_total > ${limit}`,`order_total >= ${limit}`,`order_total <= ${limit}`]),region('extra',`charge = ${extra}`,[`charge = ${extra}`,`charge += ${extra}`,`charge -= ${extra}`]),region('return','return order_total',['return order_total','return charge','return express'])],
      hint:'Track what charge contains after each branch, then check which value the caller receives.', explanation:'The threshold is inclusive. Express adds to the ordinary charge, and the function returns that charge.',
      criteria:[['Return the ordinary fee below the threshold',[test([0,false],fee),test([limit-1,false],fee)]],['Waive the ordinary fee at and above the threshold',[test([limit,false],0),test([limit+1,false],0)]],['Add express to both ordinary and free delivery',[test([limit-1,true],fee+extra),test([limit,true],extra),test([limit+1,true],extra)]]]};
  }),
  task(76, 'strings', 'Normalise a submitted name', ['strings','functions','CA2.3'], (i) => {
    const name=['Ada','Grace','Linus','Mary','Alan'][i];
    return {fn:'clean_name',prompt:'Repair clean_name(text). Return a lowercase copy with whitespace removed from both ends. Preserve spaces between words. Empty or whitespace-only input must return an empty string.',
      code:'def clean_name(text):\n    cleaned = text.lstrip()\n    cleaned.lower()\n    return text',
      repairs:[['text.lstrip()','text.strip()'],['    cleaned.lower()','    cleaned = cleaned.lower()'],['return text','return cleaned']],
      regions:[region('trim','text.lstrip()',['text.lstrip()','text.strip()','text.replace(" ", "")']),region('lower','cleaned.lower()',['cleaned.lower()','cleaned = cleaned.lower()','cleaned = cleaned.upper()']),region('return','return text',['return text','return cleaned'])],
      hint:'String methods return new strings. Trace which value is saved and which is returned.', explanation:'Save both string-method results; strip changes only the ends and lower changes the letter case.',
      criteria:[['Remove whitespace from both ends',[test([`  ${name.toLowerCase()}  `],name.toLowerCase()),test([`\t${name.toLowerCase()}\n`],name.toLowerCase())]],['Lowercase letters while preserving spaces between words',[test([`${name.toUpperCase()} LOVELACE`],`${name.toLowerCase()} lovelace`),test([`${name}  Lee`],`${name.toLowerCase()}  lee`)]],['Handle empty and combined cases',[test([''],''),test(['   '],''),test([`  ${name} Lee  `],`${name.toLowerCase()} lee`)]]]};
  }),
  task(77, 'lists', 'Combine the incoming items', ['lists','CA2.3.4'], (i) => {
    const x=i+2;
    return {fn:'combine',prompt:'Repair combine(items, incoming). Return one flat list containing the original items followed by every incoming item, preserving order and duplicates. Either list may be empty. Inputs contain integers.',
      code:'def combine(items, incoming):\n    result = items.copy()\n    result.append(incoming)\n    return incoming', repairs:[['result.append(incoming)','result.extend(incoming)'],['return incoming','return result']],
      regions:[region('combine','result.append(incoming)',['result.append(incoming)','result.extend(incoming)','result.insert(0, incoming)']),region('return','return incoming',['return incoming','return result','return items'])],
      hint:'Sketch the list structure after the method call. Is the incoming list one element or several elements?', explanation:'extend adds each incoming element to the copy in order; returning the copy provides the combined list.',
      criteria:[['Combine ordinary lists in order',[test([[x,x+1],[x+2,x+3]],[x,x+1,x+2,x+3])]],['Preserve duplicates without nesting',[test([[x],[x,x]],[x,x,x]),test([[],[x,x+1]],[x,x+1])]],['Handle empty incoming and original lists',[test([[x],[]],[x]),test([[],[]],[])]]]};
  }),
  task(78, 'records', 'Count repeated events', ['records','iteration','CA2.3.5'], (i) => {
    const a=['login','sale','visit','click','loan'][i], b=['logout','return','leave','view','renew'][i];
    return {fn:'event_counts',prompt:'Repair event_counts(events). Return a dictionary mapping each event name to its number of occurrences. Include every distinct name once. An empty list gives an empty dictionary. Event names are strings.',
      code:'def event_counts(events):\n    counts = {}\n    for event in events:\n        counts[event] = 1\n    return counts', repairs:[['counts[event] = 1','counts[event] = counts.get(event, 0) + 1']],
      regions:[region('count','counts[event] = 1',['counts[event] = 1','counts[event] = counts.get(event, 0) + 1','counts[event] = len(events)'])],
      hint:'Work through a name that appears a second time. Decide how a new name differs from one already in the dictionary.', explanation:'get supplies zero for a new name; adding one updates that name’s existing count.',
      criteria:[['Record distinct event names',[test([[a,b]],{[a]:1,[b]:1})]],['Accumulate repeated names independently',[test([[a,b,a]],{[a]:2,[b]:1}),test([[b,b,b]],{[b]:3})]],['Handle an empty list and a single event',[test([[]],{}),test([[a]],{[a]:1})]]]};
  }),
  task(79, 'validation', 'Validate the identifier', ['validation','CA2.8.1','CA2.8.3'], (i) => {
    const prefix=['AB','CD','EF','GH','JK'][i];
    return {fn:'valid_id',prompt:`Repair valid_id(text). Accept exactly the uppercase prefix ${prefix} followed by three ASCII digits (0–9), with no spaces or extra characters. Return a Boolean. Input is a string.`,
      code:`def valid_id(text):\n    return (\n        len(text) >= 5\n        and text.startswith("${prefix}")\n        and text[2:].isascii()\n        and text[2:].isdigit()\n    )`, repairs:[['len(text) >= 5','len(text) == 5']],
      regions:[region('length','len(text) >= 5',['len(text) >= 5','len(text) == 5','len(text) <= 5'])],
      hint:'Separate length, prefix and digit checks. Try one input that fails only one rule at a time.', explanation:'Exact length prevents extra or missing digits; the other checks enforce the prefix and ASCII digit suffix.',
      criteria:[['Accept correctly formed identifiers',[test([`${prefix}000`],true),test([`${prefix}999`],true)]],['Reject missing or extra characters',[test([`${prefix}12`],false),test([`${prefix}1234`],false),test([''],false)]],['Reject incorrect prefix, non-digits and spaces',[test(['ZZ123'],false),test([`${prefix}1A3`],false),test([`${prefix}１２３`],false),test([` ${prefix}123`],false)]]]};
  }),
  task(80, 'algorithms', 'Search every candidate', ['algorithms','CA2.11.1'], (i) => {
    const x=10+i;
    return {fn:'find_first',prompt:'Repair find_first(values, target). Return the index of the first matching integer, or -1 if absent. Check the whole list when necessary; an empty list gives -1.',
      code:'def find_first(values, target):\n    for index in range(len(values) - 1):\n        if values[index] == target:\n            return index\n    return 0', repairs:[['range(len(values) - 1)','range(len(values))'],['return 0','return -1']],
      regions:[region('range','range(len(values) - 1)',['range(len(values) - 1)','range(len(values))','range(1, len(values))']),region('missing','return 0',['return 0','return -1','return target'])],
      hint:'Trace a match at the final index and a search that finds no match. Check where each return can run.', explanation:'range(len(values)) covers every valid index; the final -1 is reached only if no element matched.',
      criteria:[['Find the first occurrence',[test([[x,x+1,x],x],0),test([[x,x+1,x+2],x+1],1)]],['Include the final and single-item positions',[test([[x,x+1,x+2],x+2],2),test([[x],x],0)]],['Report absence, including an empty list',[test([[x,x+1],x+3],-1),test([[],x],-1)]]]};
  }),
];
