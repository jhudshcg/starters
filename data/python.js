import {question as q, part, number as n, choice as c} from './helpers.js';
import more from './python-more.js';
import expanded from './python-expanded.js';
import coreMore from './python-core-more.js';
import validation from './python-validation.js';
const traces = [[0,[2,4,1,3]],[1,[3,2,5,1]],[0,[5,1,2,4]],[2,[1,3,2,5]],[0,[4,2,3,2]]];
export default [
  q(0, 'iteration', 'Follow the readings', 'Trace the code', ['iteration','program tracing','CA2.6.6'], i => {
    const [initial, values] = traces[i]; let total = initial;
    const parts = values.map((value,j) => n(`Total after reading ${j+1}`, total += value, {explanation: 'Add this reading to the previous total, not to the initial total.'}));
    return {prompt: 'A sensor monitor adds four readings. Trace the running total, then predict the output.', code: `total = ${initial}\nfor reading in [${values.join(', ')}]:\n    total += reading\nprint(total)`, hint: 'Carry the previous total into the next iteration.', parts: [...parts, n('Number of loop iterations',4), n('Printed value',total)]};
  }),
  q(1, 'iteration', 'Stop the countdown', 'Fix the code', ['iteration','logic','CA2.6.8'], i => {
    const [start,stop,step,end] = [[3,0,1,'Go'],[6,0,2,'Ready'],[9,0,3,'Start'],[4,1,1,'Done'],[8,2,2,'Run']][i];
    return {prompt: 'The display should count down three times, then print its final message. Fix the update and predict the corrected output.', code: `remaining = ${start}\nwhile remaining > ${stop}:\n    print(remaining)\n    remaining += ${step}\nprint("${end}")`, hint: 'The value must move towards making the condition false.', parts: [c('Replace += with…','-=', ['-=','*=','=='], {explanation: 'Subtracting the step moves remaining towards the stopping value.'}), ...[0,1,2].map(j => n(`Corrected output: number ${j+1}`,start-j*step)), part('Final message (without quotes)',end,{caseSensitive: true}), c('Why does the original loop not stop?', 'The value keeps increasing', ['The value keeps increasing','print stops the loop','The value is text'])]};
  }),
  q(2, 'iteration', 'Print the tickets', 'Complete the code', ['iteration','syntax','CA2.6.7'], i => {
    const start = [1,5,10,20,30][i], stop=start+4;
    return {prompt: `Print four consecutive ticket numbers, starting at ${start}. Fill each gap and check your reasoning.`, code: 'for ticket in ___(START, STOP):\n    print(ticket)', hint:'range includes the start but excludes the stop.', parts:[part('Function name','range',{caseSensitive:true}),n('START value',start),n('STOP value',stop),n('Last printed ticket',stop-1),n('Number of iterations',4),c('Why is STOP one above the final ticket?', 'The stop value is excluded', ['The stop value is excluded','The start value is excluded','range skips odd numbers'])]};
  }),
  q(3, 'selection', 'Choose the delivery charge', 'Predict the output', ['selection','boolean expressions','CA2.6.6'], i => {
    const threshold=[20,25,30,40,50][i], fee=i+3;
    return {prompt:'A shop gives free delivery at or above its spending threshold. Predict the return value for each order.', code:`def delivery(total):\n    if total >= ${threshold}:\n        return 0\n    return ${fee}`, hint:'At the threshold, >= is true.', parts:[n(`delivery(${threshold-1})`,fee),n(`delivery(${threshold})`,0),n(`delivery(${threshold+1})`,0),n('How many parameters does delivery take?',1),c('Which operator includes equality?','>=',['>','>=','!=']),c('Which branch runs when the condition is false?','The final return',['The final return','return 0','Both returns'])]};
  }),
  q(4, 'selection', 'Repair the access rule', 'Fix the code', ['selection','operators','CA2.4.7'], i => {
    const limit=[12,14,16,18,21][i];
    return {prompt:`Access requires an age of at least ${limit} AND a valid pass. Fix the Boolean operator. Answer the remaining parts for the corrected function.`, code:`def allowed(age, has_pass):\n    return age >= ${limit} or has_pass`, hint:'Both conditions must be true.', parts:[part('Replace or with','and',{caseSensitive:true}),c(`allowed(${limit-1}, True)`,'False',['True','False']),c(`allowed(${limit}, True)`,'True',['True','False']),c(`allowed(${limit+1}, False)`,'False',['True','False']),c('Returned data type','Boolean',['string','integer','Boolean']),n('Number of parameters',2)]};
  }),
  q(5, 'selection', 'Route the support ticket', 'Complete the code', ['selection','syntax','CA2.6.7'], i => {
    const limit=[2,3,4,5,6][i];
    return {prompt:'Complete the keywords, then predict how this support desk routes tickets.', code:`def route(priority):\n    ___ priority > ${limit}:\n        return "urgent"\n    ___ priority == ${limit}:\n        return "review"\n    ___:\n        return "normal"`, hint:'Test the first condition, then the next condition, then the fallback.', parts:[part('First keyword','if',{caseSensitive:true}),part('Second keyword','elif',{caseSensitive:true}),part('Third keyword','else',{caseSensitive:true}),part(`route(${limit+1}) — without quotes`,'urgent',{caseSensitive:true}),part(`route(${limit}) — without quotes`,'review',{caseSensitive:true}),part(`route(${limit-1}) — without quotes`,'normal',{caseSensitive:true})]};
  }),
  ...more, ...expanded, ...coreMore, ...validation
];
