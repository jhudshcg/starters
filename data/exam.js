import {question as q, part, number as n, choice as c} from './helpers.js';
export default [
 q(0,'CA2.4','Pack the devices','Name and calculate',['CA2.4.1','CA2.4.5'],i=>{
   const total=[17,23,29,31,38][i], size=[5,4,6,7,8][i];
   return {prompt:`A technician packs ${total} devices into boxes holding ${size} devices each.`,hint:'Separate complete boxes from devices left over.',parts:[part('Name the operator that gives a remainder','modulus',{accepted:['modulo','mod','%'],typos:['modulous','moduls'],explanation:'Modulus (%) returns the remainder after division.'}),n('Number of full boxes',Math.floor(total/size)),n('Devices left unpacked',total%size),c('Choose the expression for full boxes',`${total} // ${size}`,[`${total} / ${size}`,`${total} % ${size}`,`${total} // ${size}`]),c('Choose the reason linked to your expression','Counts complete groups',['Returns the remainder','Counts complete groups','Rounds to the nearest integer'],{dependsOn:'3',explanation:'Integer division counts complete groups for these positive values. The expression and reason must agree.'})]};
 }),
 q(1,'CA2.4','Check capacity','Identify operators',['CA2.4.2','CA2.4.5'],i=>{
   const count=[12,8,15,10,20][i],limit=[12,10,12,10,22][i];
   return {prompt:`A storage system has count = ${count}. Evaluate each check and identify the operators.`,hint:'Check whether equality is included.',parts:[c(`count < ${limit}`,String(count<limit),['true','false']),c(`count <= ${limit}`,String(count<=limit),['true','false']),c('Python equality operator','==',['=','==','!='],{explanation:'= assigns; == compares values.'}),c(`count != ${limit}`,String(count!==limit),['true','false']),c('Operator meaning at least','>=',['>','>=','<='])]};
 }),
 q(2,'CA2.4','Combine access conditions','Choose and justify',['CA2.4.3','CA2.4.5'],i=>{
   const pass=[true,false,true,false,true][i],staff=[false,true,true,false,false][i];
   return {prompt:`has_pass = ${pass?'True':'False'}; is_staff = ${staff?'True':'False'}. Evaluate these Boolean expressions.`,hint:'and requires both conditions; or requires at least one.',parts:[c('has_pass and is_staff',String(pass&&staff),['true','false']),c('has_pass or is_staff',String(pass||staff),['true','false']),c('not has_pass',String(!pass),['true','false']),c('Operator requiring both conditions','and',['and','or','not']),c('Choose the linked reason','Both conditions must be true',['One true condition is enough','Both conditions must be true','Reverses a condition'],{dependsOn:'3'})]};
 }),
 q(3,'CA2.8','Validate an age','Choose checks and tests',['CA2.8.1'],i=>{
   const low=12+i,high=low+6;
   return {prompt:`A club accepts whole-number ages from ${low} to ${high}, inclusive.`,hint:'A range check tests limits; a type check tests the kind of value.',parts:[c('Check that enforces the age limits','Range check',['Range check','Presence check','Length check']),c('Why use that check?','Compares the age with both limits',['Counts characters','Compares the age with both limits','Guarantees the age is truthful'],{dependsOn:'0'}),n('Lowest accepted age',low),n('First whole-number age above the accepted range',high+1),c('Check that rejects non-numeric text','Type check',['Type check','Presence check','Check digit'])]};
 }),
 q(4,'CA2.8','Check a support form','Identify validation',['CA2.8.1'],i=>{
   const length=[6,7,8,9,10][i];
   return {prompt:`A support form requires a name and a reference of exactly ${length} characters.`,hint:'Presence checks for an entry; length counts characters.',parts:[c('Check that a name was entered','Presence check',['Presence check','Range check','Check digit']),c('Check the reference character count','Length check',['Type check','Length check','Range check']),n('Required reference length',length),c('Does a presence check prove a name is genuine?','No',['Yes','No']),c('Why reject an empty required field?','Required information is missing',['Required information is missing','Every blank contains a virus','It proves the user is underage'])]};
 }),
 q(5,'CA2.8','Test a stock code','Apply a format rule',['CA2.8.1'],i=>{
   const prefix=['AB','CD','EF','GH','JK'][i], digits=String(12+i);
   return {prompt:'A stock code must contain two uppercase letters followed by two digits. Use this rule to check the examples.',hint:'Check the character types and their positions.',parts:[c('Most suitable check','Format check',['Format check','Presence check','Range check']),c(`Is ${prefix}${digits} valid?`,'Yes',['Yes','No']),c(`Is ${digits}${prefix} valid?`,'No',['Yes','No']),c('Does a valid format prove the item exists?','No',['Yes','No']),part('Complete: a format check tests whether data follows a required …','pattern',{accepted:['format','structure'],explanation:'It checks the pattern, not whether the item really exists.'})]};
 })
];
