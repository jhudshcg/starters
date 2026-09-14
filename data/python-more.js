import {question as q, part as p, number as n, choice as c} from './helpers.js';
const code = (prompt, answer, extra={}) => p(prompt, answer, {kind:'code', ...extra});

export default [
  q(6, 'functions', 'Return the converted value', 'Fix the code', ['functions','return values','data types'], i => {
    const factor=[10,60,100,1000,24][i], value=i+2;
    return {prompt:'The caller needs a number it can use in a calculation. Repair the function, then trace the corrected program.',
      code:`def convert(amount):\n    print(amount * ${factor})\n\nresult = convert(${value})\nprint(result + 1)`,
      hint:'Printing displays a value; returning passes it back to the caller.',
      parts:[code('Replace the complete line inside convert',`return amount * ${factor}`,{marks:2,explanation:'Return the product so the caller receives a number.'}),
        c('What does the original function return?','None',['None','0','The printed product']),
        n('Corrected value of result',value*factor),n('Corrected final output',value*factor+1),
        c('Why does the original final line fail?','It tries to add 1 to None',['It tries to add 1 to None','The parameter is global','print always returns text'])]};
  }),
  q(7, 'functions', 'Local and returned values', 'Trace the code', ['functions','scope','program tracing'], i => {
    const initial=[4,7,10,12,15][i], increment=i+2;
    return {prompt:'Trace the calls carefully. The parameter inside the function is a local name; assigning it does not reassign the outer variable.',
      code:`def advance(value):\n    value += ${increment}\n    return value\n\nvalue = ${initial}\nfirst = advance(value)\nsecond = advance(first)\nprint(value, first, second)`,
      hint:'Keep a separate record for each local value and for the outer value.',
      parts:[n('First printed number',initial),n('Second printed number',initial+increment),n('Third printed number',initial+2*increment),
        n(`Return value of advance(advance(${initial+1}))`,initial+1+2*increment),
        c('Which assignment would update the outer value?','value = advance(value)',['advance(value)','value = advance(value)','print(advance(value))']),
        c('When is the return expression evaluated?','During each call',['Once when def runs','During each call','Only when printed'])]};
  }),
  q(8, 'functions', 'Validate a bounded value', 'Complete the code', ['functions','validation','boundary testing'], i => {
    const low=[1,3,5,10,20][i], high=low+10+i;
    return {prompt:`Complete the function so it accepts integer values from ${low} to ${high}, inclusive. All inputs in this question are integers.`,
      code:`def in_range(value):\n    return ___`,hint:'Use two comparisons joined by and, or a chained comparison.',
      parts:[code('Expression for the gap',`${low} <= value <= ${high}`,{marks:2,accepted:[`value >= ${low} and value <= ${high}`,`${low} <= value and value <= ${high}`],explanation:'Both inclusive bounds must hold.'}),
        c(`in_range(${low-1})`,'False',['True','False']),c(`in_range(${low})`,'True',['True','False']),
        c(`in_range(${high})`,'True',['True','False']),c(`in_range(${high+1})`,'False',['True','False'])]};
  }),
  q(9, 'algorithms', 'Trace a binary search', 'Trace the code', ['algorithms','searching','program tracing'], i => {
    const a=Array.from({length:7},(_,j)=>(j+1)*(i+2)),target=a[5];
    return {prompt:'Trace this search of a sorted list. Indices start at zero. Record the midpoint indices as well as the result.',
      code:`def locate(items, target):\n    low, high = 0, len(items) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if items[mid] == target:\n            return mid\n        if items[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`,hint:'Track low and high after comparing the middle value with the target.',
      parts:[n(`For items = [${a.join(', ')}], target = ${target}: first mid`,3),n('Second mid',5),n('Returned index',5),
        n(`Returned value if target is ${a.at(-1)+1}`,-1),
        c('Required property of items','Sorted in ascending order',['Sorted in ascending order','All values are strings','An odd number of items']),
        c('Why use mid + 1 when updating low?','The midpoint has already been ruled out',['The midpoint has already been ruled out','Indices start at one','The target must be at the next index'])]};
  }),
  q(10, 'algorithms', 'Finish a sorting pass', 'Complete the code', ['algorithms','sorting','iteration'], i => {
    const a=[6+i,2+i,5+i,1+i],after=[a[1],a[2],a[3],a[0]];
    return {prompt:'Complete one left-to-right bubble-sort pass that moves larger values towards the end. This is one pass, not the complete sort.',
      code:`values = [${a.join(', ')}]\nfor index in range(len(values) - 1):\n    if values[index] ___ values[index + 1]:\n        values[index], values[index + 1] = (\n            values[index + 1], values[index]\n        )`,hint:'Swap a neighbouring pair when its left value is larger.',
      parts:[code('Comparison operator','>'),...after.map((v,j)=>n(`Value at index ${j} after the pass`,v)),
        c('What is guaranteed after this pass?','The largest value is at the end',['The largest value is at the end','The entire list is sorted','The smallest value is at the start'])]};
  }),
  q(11, 'algorithms', 'Repair the early return', 'Fix the code', ['algorithms','searching','logic'], i => {
    const a=[10+i,20+i,30+i,40+i];
    return {prompt:`The function should return the first matching index, or -1 if absent. Diagnose the bug using items = [${a.join(', ')}]. Answer the output questions for the repaired function.`,
      code:'def find(items, target):\n    for index in range(len(items)):\n        if items[index] == target:\n            return index\n        return -1',hint:'When can the function conclude that none of the items matches?',
      parts:[c('Where should return -1 be?','After the loop, inside the function',['After the loop, inside the function','Inside the if block','Before the loop']),
        c('Why is the current location wrong?','It stops after the first non-match',['It stops after the first non-match','It skips index zero','It changes the list']),
        n(`find(items, ${a[0]})`,0),n(`find(items, ${a[2]})`,2),n(`find(items, ${a[3]+1})`,-1),n('find([], 99)',-1)]};
  })
];
