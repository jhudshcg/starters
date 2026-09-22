// Editorial opt-ins, by permanent slot:part[:variation]. Omitting variation
// selects both versions. Expected answers guard against stale assignments.
// Each group permits one term phrase, up to three descriptive prefix words,
// and at most one linked suffix. The marker checks every or-alternative.
const group=(terms,qualifiers)=>({terms:terms.split('|'),prefixWords:3,...(qualifiers?{qualifiers}: {})});
const design=['design','approach','method','strategy'];
const method=['method','approach','technique'];
const type=['type','data type'];
const symbol=['symbol'];
const check=['check','validation','validation check'];
const testing=['test','testing'];
const data=['data','test data'];
const rules=[];
const link=(at,answer,...termRules)=>rules.push({at:at.split(' '),answer,termRules});

// CA1: computational thinking, representations, structures and strategies.
link('0:0','decomposition',group('decomposition',method));
link('0:1 4:1','pattern recognition',group('pattern recognition|pattern identification',method));
link('0:2 4:2','abstraction',group('abstraction',method));
link('0:3','algorithmic design',group('algorithmic design|algorithm design',method));
link('0:4','computational thinking',group('computational thinking',['approach','method','process']));
link('3:0','block diagram',group('block diagram|block diagrams'));
link('3:1','information flow diagram',group('information flow|information-flow|data flow|data-flow',['diagram']),group('DFD'));
link('3:2','flowchart',group('flowchart|flow chart',['diagram']));
link('3:3','code',group('code|program code|Python code|source code'));
link('3:4','written description',group('written description|written descriptions|written representation|written representations|written algorithm|numbered steps|natural language|plain language|plain-language description'));
link('4:3 127:3','hiding internal workings',group('hiding internal workings|hide internal workings|hide implementation details|hiding implementation details|hiding the implementation|hiding internal details|information hiding|implementation hiding'));
link('5:0','terminator',group('terminator|terminal|start/end|start or end',symbol));
link('5:1 128:0','process',group('process',symbol));
link('5:2','decision',group('decision',symbol));
link('5:3','input/output',group('input/output|input output|input-output|I/O',symbol));
link('6:0','algorithm',group('algorithm'));
link('6:1 8:3','ambiguous',group('ambiguous|unclear|imprecise|vague|not precise|not unambiguous'));
link('6:2 28:0','sequence',group('sequence',['structure','control structure']));
link('6:3','selection',group('selection',['structure','control structure']));
link('6:4','iteration',group('iteration|repetition|looping',['structure','control structure']),group('loop'));
link('7:2','off-by-one error',group('off-by-one|off by one',['error','bug']));
link('8:0','sub-process',group('sub-process|subprocess|sub process|predefined process|pre-defined process|subroutine',symbol));
link('8:4','Python syntax',group('Python syntax|syntax|language syntax|programming language syntax|Python language syntax'));
link('9:0 130:0','top-down',group('top-down|top down',design));
link('9:1 130:2','bottom-up',group('bottom-up|bottom up',design));
link('9:2 130:4','modularisation',group('modularisation|modularization',method),group('modular',design));
link('9:4','root cause analysis',group('root cause analysis|root-cause analysis|RCA',method));
link('10:0','five whys',group('five whys|5 whys|five-whys|5-whys',method));
link('10:1','failure mode and effects analysis',group('failure mode and effects analysis|failure modes and effects analysis|failure mode effects analysis|FMEA',method));
link('10:2','event tree analysis',group('event tree analysis|event-tree analysis|ETA',method));
link('10:3','close',group('close|closing',['the issue','the ticket','the incident','the support ticket']),group('closure|issue closure|ticket closure'));
link('10:4 131:3','log',group('log|logging|record|recording|document|documenting',['the finding','the findings','the evidence','the diagnosis']),group('documentation'));
link('10:5 131:4','escalate',group('escalate|escalation|escalating'),group('refer to a specialist|refer to the supplier|refer to an appropriate manager'));
link('11:0','define the problem',group('define the problem|problem definition|defining the problem|identify the problem|problem identification'));
link('11:1','gather information',group('gather information|collect information|gather evidence|collect evidence|gather data|collect data|information gathering|information collection|gathering information|collecting information|evidence gathering|data gathering|data collection'));
link('11:2','analyse information',group('analyse information|analyze information|analyse the information|analyze the information|analyse evidence|analyze evidence|analyse the evidence|analyze the evidence|analyse data|analyze data|analysis|information analysis|data analysis|analysing information|analyzing information'));
link('11:3','make a plan',group('plan|planning',['the solution']),group('make a plan|make a plan of action|plan of action|action plan|develop a plan'));
link('11:4','review the solution',group('review|evaluate',['the solution','the outcome']),group('evaluation|reviewing the solution|evaluating the solution|solution review|solution evaluation'));
link('160:3','implement the solution',group('implement',['the solution','a solution','the plan']),group('implementation|implementing the solution|solution implementation'));

// CA2: type names only. The conversion-function parts are deliberately absent.
link('12:0 13:0 14:0 132:0 134:2','integer',group('integer|int',type),group('whole number|signed integer'));
link('12:1 13:1 13:4 14:1 132:1','float',group('float|floating point|floating-point|real',[...type,'number']));
link('12:2 13:2 14:2 25:2 39:1 108:2 132:2 156:0','string',group('string|str|text',type));
link('12:3 13:3 14:4 132:3','Boolean',group('Boolean|bool',type));
link('15:0 16:0 133:2 156:1','variable',group('variable'));
link('15:1 16:1 123:1 156:2','constant',group('constant|named constant'));
link('39:2','named constant',group('constant|named constant'));
link('15:2 123:2','scope',group('scope|variable scope|name scope'));
link('15:3 17:3 123:3','local',group('local',['scope']));
link('15:4 123:4','global',group('global|module',['scope']));
link('18:0 18:3 124:3','list',group('list|Python list',type));
link('18:1 19:4','array',group('array|typed array',type));
link('37:3','typed array',group('array|typed array',type));
link('18:2 18:4 37:2 124:4','dictionary',group('dictionary|dict',type));
link('29:0','count-controlled',group('count-controlled|count controlled|counter-controlled|counter controlled',['loop','iteration']));
link('29:1 137:2','condition-controlled',group('condition-controlled|condition controlled',['loop','iteration']));
link('29:4','infinite loop',group('infinite loop|endless loop|non-terminating loop|non terminating loop|nonterminating loop'));
link('31:2','procedure',group('procedure'));
link('31:4','function',group('function'));
link('32:0 159:0','user-written',group('user-written|user written|user-defined|user defined|custom-written|custom written',['code','function','routine']));
link('32:1 159:1','built-in',group('built-in|built in|builtin',['code','function']));
link('32:2 159:2','standard library',group('standard library|standard-library|Python standard library',['code']));
link('32:3','third-party library',group('third-party|third party',['library','code','package']),group('external library|external package'));
link('159:3','third-party',group('third-party|third party',['library','code','package']),group('external library|external package'));
link('34:0','presence check',group('presence',check));
link('2:2:0 34:1 125:1','length check',group('length',check));
link('2:2:1 34:2 125:2 139:4','range check',group('range',check));
link('34:3 125:3','type check',group('type|data type',check));
link('34:4 125:4','format check',group('format|pattern',check));
link('35:0','validation',group('validation|data validation|input validation',['process']));
link('35:1','check digit',group('check digit|check-digit'));
link('139:1','check digit',group('check digit|check-digit',check));
link('38:1','camelCase',group('camelCase|camel case|camel-case|lower camel case',['naming','convention','naming convention']));
link('38:2','snake_case',group('snake_case|snake case|snake-case',['naming','convention','naming convention']));
link('40:3 113:3','locating the error',group('locating the error|locate the error|finding the error|find the error|identifying the error|identify the error|locating the fault|locate the fault|finding the fault|find the fault|identifying the fault|identify the fault|locating the bug|locate the bug|finding the bug|find the bug|identifying the bug|identify the bug|error location|fault location|error identification|fault identification'));

// Algorithm names retain the complete name before optional general qualifiers.
link('43:1','linear',group('linear',['search']),group('linear search|sequential search',['algorithm','method']));
link('153:0','linear search',group('linear|sequential',['search']),group('linear search|sequential search',['algorithm','method']));
link('43:3','binary',group('binary',['search']),group('binary search',['algorithm','method']));
link('153:1','binary search',group('binary',['search']),group('binary search',['algorithm','method']));
link('44:3','insertion',group('insertion',['sort','sorting']),group('insertion sort',['algorithm','method']));
link('154:3','insertion sort',group('insertion',['sort','sorting']),group('insertion sort',['algorithm','method']));
link('44:4','merge',group('merge',['sort','sorting']),group('merge sort',['algorithm','method']));
link('45:0 142:6 155:3','memory space',group('memory|storage',['space','usage','use','requirement','requirements']),group('space usage|space used|memory used|storage used|additional memory|memory consumption'));
link('45:1 155:2','execution time',group('execution time|run time|runtime|running time|elapsed time|time taken|time'));
link('45:2 153:4','number of comparisons',group('number of comparisons|comparison count|comparisons|comparisons performed'));

// Testing methods and test-record terminology.
link('46:0','concept testing',group('concept',testing));
link('46:1','unit testing',group('unit|component',testing));
link('46:2','integration testing',group('integration',testing));
link('46:3','system testing',group('system',testing));
link('46:4','acceptance testing',group('acceptance|user acceptance',testing),group('UAT'));
link('47:0','usability testing',group('usability',testing));
link('47:1 146:5','regression testing',group('regression',testing));
link('47:2','performance testing',group('performance',testing));
link('47:3','closed box testing',group('closed box|closed-box|black box|black-box',testing));
link('47:4','open box testing',group('open box|open-box|white box|white-box',testing));
link('48:0','boundary testing',group('boundary|boundary value|boundary-value',testing),group('boundary value analysis|boundary-value analysis|BVA'));
link('48:1:0','load testing',group('load',testing));
link('48:1:1 146:3','stress testing',group('stress',testing));
link('49:0','valid',group('valid',data));
link('49:1','invalid',group('invalid|erroneous',data));
link('49:2','boundary',group('boundary',data),group('boundary values|boundary value'));
link('143:4','erroneous',group('erroneous|invalid',data));
link('49:3','expected result',group('expected|predicted',['result','results','outcome','outcomes','output','outputs']));
link('49:4','actual result',group('actual|observed',['result','results','outcome','outcomes','output','outputs']));
link('50:0 148:2','macro',group('macro|macros|recorded macro'));
link('50:1 148:4','script',group('script|scripts|scripting|test script|test scripts'));
link('50:3','test purpose',group('test purpose|purpose|test objective|objective|aim|test aim'));
link('50:4','test data',group('test data|input data|inputs|test inputs|input values|test values'));

export function withExamTermRules(bank) {
  const bySlot=new Map(bank.map(q=>[q.slot,q]));
  const assigned=new Map();
  for(const entry of rules)for(const address of entry.at) {
    const [slot,part,variation]=address.split(':').map(Number);
    const question=bySlot.get(slot);
    if(!question)throw Error(`Unknown term-rule slot: ${address}`);
    for(const vi of variation===undefined?question.variations.map((_,i)=>i):[variation]) {
      const p=question.variations[vi]?.parts.find(p=>p.id===String(part));
      const key=`${slot}:${part}:${vi}`;
      if(!p||p.answer!==entry.answer||p.kind!=='text'||p.options||p.caseSensitive||assigned.has(key)) {
        throw Error(`Review term-rule assignment: ${key}`);
      }
      assigned.set(key,entry.termRules);
    }
  }
  return bank.map(q=>({...q,variations:q.variations.map((v,vi)=>({...v,parts:v.parts.map(p=>{
    const termRules=assigned.get(`${q.slot}:${p.id}:${vi}`);
    return termRules?{...p,termRules}:p;
  })}))}));
}
