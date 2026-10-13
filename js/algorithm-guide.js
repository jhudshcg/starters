/**
 * Purpose: Optional beginner explanations for search/sort coding practice.
 * Main contents: native disclosure, Python examples and two accessible list diagrams.
 * Used by: app.js. Uses: question tags; no answer data. Libs: none.
 */
export const algorithmExamples=[
 {code:'values = [8, 3, 9]\ntarget = 3\nfound = -1\nfor index in range(len(values)):\n    if values[index] == target:\n        found = index\n        break\nprint(found)',output:'1'},
 {code:'values = [6, 2, 4]\nfor index in range(len(values) - 1):\n    if values[index] > values[index + 1]:\n        saved = values[index]\n        values[index] = values[index + 1]\n        values[index + 1] = saved\nprint(values)',output:'[2, 4, 6]'}
];
const cells=(values,selected=-1)=>`<div class="algorithm-row">${values.map((value,index)=>`<span${index===selected?' class="algorithm-mid"':''}>${value}</span>`).join('')}</div>`;
export function algorithmGuideHTML(open=false){
 return `<details class="algorithm-guide" id="algorithm-guide" data-python-guide="algorithms" ${open?'open':''}>
  <summary>Search and sort guide</summary>
  <p class="muted">Read this introduction whenever you need it. Your challenge answers still count towards progress.</p>
  <h2>Searching: find a target value</h2>
  <p><strong>Linear search</strong> checks items one by one until it finds a match or reaches the end. It works on unsorted lists. A version that stops at its first match can finish after one comparison; a missing target requires checking every item.</p>
  <pre><code>${algorithmExamples[0].code}</code></pre><p>Output: <samp>1</samp>, the index of the first match. Here <code>-1</code> means no match was found; do not use that sentinel as a list index.</p>
  <p><strong>Binary search</strong> repeatedly checks the middle of a <strong>sorted</strong> range. For ascending order: if the target is larger, keep the right half; if smaller, keep the left half. Check a remaining single item too. An empty range means no match. An <strong>index</strong> is a position, starting at 0; it is different from the value stored there.</p>
  <figure aria-label="Binary search example: find 19 in an ascending list">
   ${cells([3,7,11,15,19,23,27],3)}
   <figcaption>The middle value is <strong>15</strong>. Target 19 is larger → keep the three values to its right.</figcaption>
   ${cells([19,23,27],1)}
   <figcaption>The middle value is <strong>23</strong>. Target 19 is smaller → check the remaining value on its left.</figcaption>
  </figure>
  <h2>Sorting: put values in order</h2>
  <p><strong>Bubble sort</strong> compares neighbouring items and swaps a pair if they are in the wrong order. One left-to-right pass places the largest remaining value at the end. Repeat over the unsorted section. A complete pass with no swaps means the list is sorted.</p>
  <pre><code>${algorithmExamples[1].code.replaceAll('>','&gt;')}</code></pre><p>Output: <samp>[2, 4, 6]</samp>. This is one pass; a longer list may need further passes.</p>
  <p><strong>Insertion sort</strong> builds a sorted prefix: an ordered section at the start. Take the next value (the <strong>key</strong>), shift larger prefix values one place right, then insert the key in the gap.</p>
  <p><strong>Merge sort</strong> splits a list into smaller lists until each has at most one item, then merges sorted lists. Compare their first remaining items, take the smaller one, and repeat. Once one list is empty, copy the remainder of the other.</p>
  <figure aria-label="Merge step: sorted lists 2, 9 and 4, 7 produce 2, 4, 7, 9">
   <div class="algorithm-merge">${cells([2,9])}<span>and</span>${cells([4,7])}</div>
   <p aria-hidden="true">↓ Compare the first remaining items</p>
   ${cells([2,4,7,9])}
   <figcaption>This is the merge step; it joins two already sorted lists.</figcaption>
  </figure>
  <p><strong>Comparisons</strong> count the tests made; they are not seconds of execution time. <strong>In-place</strong> means changing the existing list. Python’s <code>list.sort()</code> works in place and returns <code>None</code>; <code>sorted(...)</code> returns a new list. These built-ins do not demonstrate your own implementation of the algorithms above.</p>
 </details>`;
}
