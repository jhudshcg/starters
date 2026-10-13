/** App discovery policy; hidden content remains available to existing question codes. */
export const mathsPracticeURL='https://joe312213.github.io/practice-gcse-maths/';
export const discoverableQuestion=(question,type)=>type!==0||question.focus!=='classic maths';
export const discoverableFocuses=(values,type)=>type===0?values.filter(value=>value!=='classic maths'):values;
