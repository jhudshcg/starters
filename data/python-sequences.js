/**
 * Purpose: Short Year 1 search, sort and list-operation practice, with five variations per task.
 * Main contents: permanent slots 63–72. Used by: python.js.
 * Uses: shared authoring helpers. Libs: none. Evidence: docs/reviews/2026-10-13-python-sequences.md.
 */
import {question as q, part, number as n, choice as c} from './helpers.js';
const token=(prompt,answer,extra={})=>part(prompt,answer,{kind:'code',...extra});
const output=values=>values.map((value,index)=>n(`Printed value ${index+1}`,value));
export default [
  q(63,'lists','Slice and combine lists','Predict the output',['lists','slicing','concatenation','combining','CA2.3.2'],i=>{
    const a=i+2;
    return {
      prompt:'A slice selects part of a list. The + operator concatenates (joins) two lists into a new list. Trace the code and enter its six printed values.',
      code:`values = [${a}, ${a+2}, ${a+4}, ${a+6}, ${a+8}]\nmiddle = values[1:4]\njoined = middle + [${a+10}]\njoined[0] = 0\nprint(middle[0], middle[-1], len(middle),\n      joined[0], joined[-1], values[0])`,
      hint:'List indices start at 0. A slice includes its start index but excludes its stop index. Slicing and + create new outer lists, so keep a separate row of values for each list.',
      parts:output([a+2,a+6,3,0,a+10,a])
    };
  }),
  q(64,'lists','Add each incoming item','Fix the code',['lists','append','extend','combining','CA2.3.4'],i=>{
    const a=i+2;
    return {
      prompt:'The result should be one flat list of four numbers, not a list containing another list. Replace the faulty method name, then answer for the corrected program.',
      code:`items = [${a}, ${a+1}]\nincoming = [${a+3}, ${a+5}]\nitems.append(incoming)\nprint(items[2], items[-1], len(items))`,
      hint:'A flat list stores each number as a separate item. Decide whether the method adds its argument as one item or adds each item from that argument.',
      parts:[token('Replacement for append','extend',{explanation:'extend adds each incoming item separately; append would add the incoming list as one nested item.'}),...output([a+3,a+5,4]),c('After the corrected call, has incoming changed?','No',['Yes','No'],{explanation:'extend changes items; it reads incoming without removing its items.'}),c('What would len(items) be after the original faulty call?','3',['2','3','4'],{explanation:'append adds one item, even when that item is itself a list.'})]
    };
  }),
  q(65,'lists','Use a list as an undo stack','Complete the code',['lists','stack','push','pop','append','LIFO','CA2.3.3'],i=>{
    const a=i+3;
    return {
      prompt:'An undo stack keeps the newest action at the end of its list. Fill the gap to add one action. Then trace the two removals. Python lists have no method named push.',
      code:`undo = [${a}, ${a+2}]\nundo.___(${a+4})\nnewest = undo.pop()\nprevious = undo.pop()\nprint(newest, previous, len(undo), undo[0])`,
      hint:'A stack uses last in, first out (LIFO): the most recently added item leaves first. pop() removes and returns the final item. Update your list after each removal.',
      parts:[token('Method name for ___','append',{explanation:'append adds one item at the end. This implements the stack operation called push.'}),...output([a+4,a+2,1,a]),c('What happens if pop() is called on an empty list?','It raises IndexError',['It raises IndexError','It returns 0','It adds an empty item'],{explanation:'An empty list has no final item to remove. Check that a stack is non-empty before popping.'})]
    };
  }),
  q(66,'lists','Insert and remove queued values','Trace the code',['lists','insert','remove','pop','count','CA2.3.2'],i=>{
    const a=i+2;
    return {
      prompt:'The queue contains a repeated value. Trace each change in order, then enter the six printed values.',
      code:`jobs = [${a}, ${a+2}, ${a}, ${a+4}]\njobs.insert(1, ${a+6})\njobs.remove(${a})\nremoved = jobs.pop(2)\nprint(jobs[0], jobs[1], jobs[-1], removed,\n      len(jobs), jobs.count(${a}))`,
      hint:'insert(index, value) adds before that index. remove(value) deletes the first matching value; pop(index) removes and returns the item at that index. Renumber indices from 0 after each change.',
      parts:output([a+6,a+2,a+4,a,3,0])
    };
  }),
  q(67,'algorithms','Complete a linear search','Complete the code',['algorithms','linear search','searching','CA2.11.1','CA2.3.3'],i=>{
    const a=i+2,values=[a+6,a,a+4,a+2];
    return {
      prompt:`Complete the comparison in this linear search. Then use items = [${values.join(', ')}] unless a different list is given. The function returns the first matching index, or -1 if absent.`,
      code:'def find(items, target):\n    for index in range(len(items)):\n        if ___:\n            return index\n    return -1',
      hint:'Linear search checks one item at a time, starting at index 0. Compare the current item with the target (the value being sought). A return ends the function immediately.',
      parts:[token('Comparison for ___','items[index] == target',{accepted:['target == items[index]']}),n(`find(items, ${values[0]})`,0),n(`find(items, ${values[3]})`,3),n(`find(items, ${a+9})`,-1),n(`find([], ${a})`,-1),n(`How many items are compared before finding ${a}?`,2)]
    };
  }),
  q(68,'algorithms','Keep the last binary-search candidate','Fix the code',['algorithms','binary search','searching','boundary','CA2.11.1'],i=>{
    const a=i+3,values=[a,a+2,a+4];
    return {
      prompt:'This binary search wrongly skips a range containing exactly one candidate. Replace the loop comparison operator. Answer the remaining parts for the corrected function and ascending lists.',
      code:'def find(items, target):\n    low = 0\n    high = len(items) - 1\n    while low < high:\n        mid = (low + high) // 2\n        if items[mid] == target:\n            return mid\n        if items[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1',
      hint:'low and high are indices bounding the remaining candidates. If they are equal, one item still needs checking. Binary search discards half of a sorted range after each unsuccessful midpoint comparison.',
      parts:[token('Replacement for < in the while condition','<='),n(`find([${a}], ${a})`,0),n(`find([], ${a})`,-1),n(`find([${values.join(', ')}], ${a+4})`,2),n(`find([${values.join(', ')}], ${a+1})`,-1),c('Why must the list be sorted?','The comparison tells which half can contain the target',['The comparison tells which half can contain the target','Python forbids indexing an unsorted list','Sorting removes the need for comparisons'])]
    };
  }),
  q(69,'algorithms','Count linear-search comparisons','Trace the code',['algorithms','linear search','comparisons','best case','worst case','CA2.11.4','CA2.11.5'],i=>{
    const a=i+2,values=[a+4,a,a+6,a+2];
    return {
      prompt:`This function counts equality comparisons, rather than returning an index. Use items = [${values.join(', ')}] unless another list is supplied.`,
      code:'def checks(items, target):\n    total = 0\n    for value in items:\n        total += 1\n        if value == target:\n            break\n    return total',
      hint:'The counter increases once before each equality test. break exits the loop at the first match. If no item matches, every item is tested; an empty list has no items to test.',
      parts:[n(`checks(items, ${values[0]})`,1),n(`checks(items, ${values[2]})`,3),n(`checks(items, ${values[3]})`,4),n(`checks(items, ${a+9})`,4),n(`checks([], ${a})`,0),n(`checks([${a}, ${a}, ${a+1}], ${a})`,1)]
    };
  }),
  q(70,'sorting','Detect a finished bubble sort','Complete the code',['sorting','bubble sort','early stopping','CA2.11.2','CA2.11.5'],i=>{
    const a=i+2,values=i%2?[a,a+2,a+1,a+3]:[a,a+1,a+2,a+3];
    return {
      prompt:'This is one complete left-to-right bubble-sort pass. Set finished to True only when the pass makes no swaps, so a surrounding sort can stop. Enter the four printed numbers and the Boolean value.',
      code:`values = [${values.join(', ')}]\nswapped = False\nfor index in range(len(values) - 1):\n    if values[index] > values[index + 1]:\n        temporary = values[index]\n        values[index] = values[index + 1]\n        values[index + 1] = temporary\n        swapped = True\nfinished = ___ swapped\nprint(values[0], values[1], values[2], values[3], finished)`,
      hint:'swapped is a Boolean flag: it records whether any exchange occurred during the pass. No exchanges means every neighbouring pair was already in ascending order.',
      parts:[token('Boolean operator for ___','not'),...output([a,a+1,a+2,a+3]),part('Printed Boolean value',i%2?'False':'True',{caseSensitive:true,explanation:'A pass that changed the list must not claim it made no swaps, even if this particular list is now sorted.'})]
    };
  }),
  q(71,'sorting','Repair the insertion-sort direction','Fix the code',['sorting','insertion sort','indices','CA2.11.2'],i=>{
    const a=i+2;
    return {
      prompt:'The first three items are sorted. This insertion-sort step should move the final item into that sorted prefix (the ordered section at the start). Repair the index update, then predict the corrected output.',
      code:`values = [${a+1}, ${a+3}, ${a+5}, ${a}]\nkey = values[3]\nindex = 2\nwhile index >= 0 and values[index] > key:\n    values[index + 1] = values[index]\n    index += 1\nvalues[index + 1] = key\nprint(values[0], values[1], values[2], values[3], index)`,
      hint:'key is the value waiting to be inserted. Larger values shift one place right; the index must then move left to inspect the previous value. Stop before using an index below 0.',
      parts:[token('Replacement for += in the index update','-='),...output([a,a+1,a+3,a+5,-1])]
    };
  }),
  q(72,'sorting','Count bubble-sort comparisons','Predict the output',['sorting','bubble sort','comparisons','execution time','CA2.11.4','CA2.11.5'],i=>{
    const length=i+3,values=Array.from({length},(_,j)=>j+1),total=length*(length-1)/2;
    return {
      prompt:'This counter models the comparisons in bubble sort without an early-stop flag. It does not sort the list. Each inner-loop iteration represents one neighbouring-pair comparison.',
      code:'def comparisons(items):\n    total = 0\n    for stop in range(len(items) - 1, 0, -1):\n        for index in range(stop):\n            total += 1\n    return total',
      hint:'range(stop) repeats stop times. Add the inner-loop lengths as stop decreases. This version always runs its passes, so the item order does not reduce the comparison count.',
      parts:[n(`comparisons([${values.join(', ')}])`,total),n(`comparisons([${values.toReversed().join(', ')}])`,total),n('comparisons([])',0),n('comparisons([8])',0),n('comparisons([2, 1])',1),c('What does the returned value measure?','Number of comparisons',['Number of comparisons','Execution time in seconds','Extra memory in bytes'],{explanation:'A comparison count measures work, but is not a direct measurement of elapsed time or memory.'})]
    };
  })
];
