// Compare the small, single-line Python fragments used in this bank by tokens.
// Never execute student input. Preserve identifier case and string contents.
export function codeTokens(input) {
  const source = String(input).trim();
  if (!source || /[\r\n]/.test(source)) return null;
  const token = /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[A-Za-z_]\w*|\d+(?:\.\d+)?|\*\*=|\/\/=|\*\*|\/\/|==|!=|<=|>=|\+=|-=|\*=|\/=|[.+\-*\/%<>=()[\]{},:])/y;
  const result=[];
  let position=0;
  while (position<source.length) {
    if (/\s/.test(source[position])) {position++;continue;}
    token.lastIndex=position;
    const match=token.exec(source);
    if (!match) return null;
    let value=match[0];
    if (/^["']/.test(value)) {
      const body=value.slice(1,-1);
      if (/\\[^\\'"nrt]/.test(body)) return null;
      value='string:'+body.replace(/\\([\\'"nrt])/g,(_,c)=>({n:'\n',r:'\r',t:'\t'}[c]??c));
    }
    result.push(value);position=token.lastIndex;
  }
  return result;
}
export function sameCode(a,b) {
  const left=codeTokens(a),right=codeTokens(b);
  return Boolean(left&&right&&JSON.stringify(left)===JSON.stringify(right));
}
