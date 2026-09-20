// Distinct authored tasks with five checked variations each.
export default [
  {
    "slot": 12,
    "focus": "operators",
    "title": "Divide a batch",
    "format": "Predict the output",
    "tags": [
      "operators",
      "CA2.4",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 3 * 7 + 3\nsize = 7\nprint(count // size, count % size, count / size, 2 ** 3, -7 // 3, -7 % 3)",
        "hint": "Floor division rounds down; remainder and quotient reconstruct the dividend.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (count // size) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count // size evaluates to 3. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (count % size) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count % size evaluates to 3. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (count / size) \u2014 no quotes",
            "answer": "3.4285714285714284",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count / size evaluates to 3.4285714285714284. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (2 ** 3) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "2 ** 3 evaluates to 8. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (-7 // 3) \u2014 no quotes",
            "answer": "-3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "-7 // 3 evaluates to -3. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (-7 % 3) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "-7 % 3 evaluates to 2. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 4 * 7 + 3\nsize = 7\nprint(count // size, count % size, count / size, 2 ** 4, -7 // 3, -7 % 3)",
        "hint": "Floor division rounds down; remainder and quotient reconstruct the dividend.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (count // size) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count // size evaluates to 4. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (count % size) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count % size evaluates to 3. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (count / size) \u2014 no quotes",
            "answer": "4.428571428571429",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count / size evaluates to 4.428571428571429. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (2 ** 4) \u2014 no quotes",
            "answer": "16",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "2 ** 4 evaluates to 16. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (-7 // 3) \u2014 no quotes",
            "answer": "-3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "-7 // 3 evaluates to -3. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (-7 % 3) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "-7 % 3 evaluates to 2. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 5 * 7 + 3\nsize = 7\nprint(count // size, count % size, count / size, 2 ** 5, -7 // 3, -7 % 3)",
        "hint": "Floor division rounds down; remainder and quotient reconstruct the dividend.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (count // size) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count // size evaluates to 5. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (count % size) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count % size evaluates to 3. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (count / size) \u2014 no quotes",
            "answer": "5.428571428571429",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count / size evaluates to 5.428571428571429. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (2 ** 5) \u2014 no quotes",
            "answer": "32",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "2 ** 5 evaluates to 32. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (-7 // 3) \u2014 no quotes",
            "answer": "-3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "-7 // 3 evaluates to -3. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (-7 % 3) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "-7 % 3 evaluates to 2. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 6 * 7 + 3\nsize = 7\nprint(count // size, count % size, count / size, 2 ** 6, -7 // 3, -7 % 3)",
        "hint": "Floor division rounds down; remainder and quotient reconstruct the dividend.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (count // size) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count // size evaluates to 6. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (count % size) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count % size evaluates to 3. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (count / size) \u2014 no quotes",
            "answer": "6.428571428571429",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count / size evaluates to 6.428571428571429. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (2 ** 6) \u2014 no quotes",
            "answer": "64",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "2 ** 6 evaluates to 64. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (-7 // 3) \u2014 no quotes",
            "answer": "-3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "-7 // 3 evaluates to -3. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (-7 % 3) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "-7 % 3 evaluates to 2. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 7 * 7 + 3\nsize = 7\nprint(count // size, count % size, count / size, 2 ** 7, -7 // 3, -7 % 3)",
        "hint": "Floor division rounds down; remainder and quotient reconstruct the dividend.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (count // size) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count // size evaluates to 7. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (count % size) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count % size evaluates to 3. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (count / size) \u2014 no quotes",
            "answer": "7.428571428571429",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count / size evaluates to 7.428571428571429. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (2 ** 7) \u2014 no quotes",
            "answer": "128",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "2 ** 7 evaluates to 128. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (-7 // 3) \u2014 no quotes",
            "answer": "-3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "-7 // 3 evaluates to -3. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (-7 % 3) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "-7 % 3 evaluates to 2. Floor division rounds down; remainder and quotient reconstruct the dividend.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 13,
    "focus": "operators",
    "title": "Evaluate precedence",
    "format": "Complete the code",
    "tags": [
      "operators",
      "CA2.4",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "a = 3\nb = 3\nprint(___, (a + b) * 2, a ** 2 + b, a - b - 1, a * b % 4)",
        "hint": "Apply parentheses, powers, multiplication/division, then addition/subtraction.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The first output must add a to twice b. Repair its expression.",
            "answer": "a + b * 2",
            "marks": 1,
            "explanation": "Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (a + b * 2) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a + b * 2 evaluates to 9. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 ((a + b) * 2) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "(a + b) * 2 evaluates to 12. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (a ** 2 + b) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a ** 2 + b evaluates to 12. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (a - b - 1) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a - b - 1 evaluates to -1. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (a * b % 4) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a * b % 4 evaluates to 1. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "a = 4\nb = 3\nprint(___, (a + b) * 2, a ** 2 + b, a - b - 1, a * b % 4)",
        "hint": "Apply parentheses, powers, multiplication/division, then addition/subtraction.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The first output must add a to twice b. Repair its expression.",
            "answer": "a + b * 2",
            "marks": 1,
            "explanation": "Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (a + b * 2) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a + b * 2 evaluates to 10. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 ((a + b) * 2) \u2014 no quotes",
            "answer": "14",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "(a + b) * 2 evaluates to 14. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (a ** 2 + b) \u2014 no quotes",
            "answer": "19",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a ** 2 + b evaluates to 19. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (a - b - 1) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a - b - 1 evaluates to 0. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (a * b % 4) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a * b % 4 evaluates to 0. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "a = 5\nb = 3\nprint(___, (a + b) * 2, a ** 2 + b, a - b - 1, a * b % 4)",
        "hint": "Apply parentheses, powers, multiplication/division, then addition/subtraction.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The first output must add a to twice b. Repair its expression.",
            "answer": "a + b * 2",
            "marks": 1,
            "explanation": "Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (a + b * 2) \u2014 no quotes",
            "answer": "11",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a + b * 2 evaluates to 11. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 ((a + b) * 2) \u2014 no quotes",
            "answer": "16",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "(a + b) * 2 evaluates to 16. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (a ** 2 + b) \u2014 no quotes",
            "answer": "28",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a ** 2 + b evaluates to 28. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (a - b - 1) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a - b - 1 evaluates to 1. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (a * b % 4) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a * b % 4 evaluates to 3. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "a = 6\nb = 3\nprint(___, (a + b) * 2, a ** 2 + b, a - b - 1, a * b % 4)",
        "hint": "Apply parentheses, powers, multiplication/division, then addition/subtraction.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The first output must add a to twice b. Repair its expression.",
            "answer": "a + b * 2",
            "marks": 1,
            "explanation": "Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (a + b * 2) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a + b * 2 evaluates to 12. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 ((a + b) * 2) \u2014 no quotes",
            "answer": "18",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "(a + b) * 2 evaluates to 18. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (a ** 2 + b) \u2014 no quotes",
            "answer": "39",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a ** 2 + b evaluates to 39. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (a - b - 1) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a - b - 1 evaluates to 2. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (a * b % 4) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a * b % 4 evaluates to 2. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "a = 7\nb = 3\nprint(___, (a + b) * 2, a ** 2 + b, a - b - 1, a * b % 4)",
        "hint": "Apply parentheses, powers, multiplication/division, then addition/subtraction.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The first output must add a to twice b. Repair its expression.",
            "answer": "a + b * 2",
            "marks": 1,
            "explanation": "Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (a + b * 2) \u2014 no quotes",
            "answer": "13",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a + b * 2 evaluates to 13. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 ((a + b) * 2) \u2014 no quotes",
            "answer": "20",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "(a + b) * 2 evaluates to 20. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (a ** 2 + b) \u2014 no quotes",
            "answer": "52",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a ** 2 + b evaluates to 52. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (a - b - 1) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a - b - 1 evaluates to 3. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (a * b % 4) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a * b % 4 evaluates to 1. Apply parentheses, powers, multiplication/division, then addition/subtraction.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 14,
    "focus": "operators",
    "title": "Track augmented assignments",
    "format": "Fix the code",
    "tags": [
      "operators",
      "CA2.4",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 3\nvalue += 5\nfirst = value\nvalue *= 3\nsecond = value\nvalue /= 2\nprint(first, second, value, value == second, value != first)",
        "hint": "Each augmented assignment uses the current value.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The final update must use integer floor division. Replace the faulty update line.",
            "answer": "value //= 2",
            "marks": 1,
            "explanation": "Each augmented assignment uses the current value.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 8. Each augmented assignment uses the current value.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (second) \u2014 no quotes",
            "answer": "24",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "second evaluates to 24. Each augmented assignment uses the current value.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (value) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value evaluates to 12. Each augmented assignment uses the current value.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (value == second) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value == second evaluates to False. Each augmented assignment uses the current value.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (value != first) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value != first evaluates to True. Each augmented assignment uses the current value.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 4\nvalue += 5\nfirst = value\nvalue *= 3\nsecond = value\nvalue /= 2\nprint(first, second, value, value == second, value != first)",
        "hint": "Each augmented assignment uses the current value.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The final update must use integer floor division. Replace the faulty update line.",
            "answer": "value //= 2",
            "marks": 1,
            "explanation": "Each augmented assignment uses the current value.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 9. Each augmented assignment uses the current value.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (second) \u2014 no quotes",
            "answer": "27",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "second evaluates to 27. Each augmented assignment uses the current value.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (value) \u2014 no quotes",
            "answer": "13",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value evaluates to 13. Each augmented assignment uses the current value.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (value == second) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value == second evaluates to False. Each augmented assignment uses the current value.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (value != first) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value != first evaluates to True. Each augmented assignment uses the current value.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 5\nvalue += 5\nfirst = value\nvalue *= 3\nsecond = value\nvalue /= 2\nprint(first, second, value, value == second, value != first)",
        "hint": "Each augmented assignment uses the current value.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The final update must use integer floor division. Replace the faulty update line.",
            "answer": "value //= 2",
            "marks": 1,
            "explanation": "Each augmented assignment uses the current value.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 10. Each augmented assignment uses the current value.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (second) \u2014 no quotes",
            "answer": "30",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "second evaluates to 30. Each augmented assignment uses the current value.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (value) \u2014 no quotes",
            "answer": "15",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value evaluates to 15. Each augmented assignment uses the current value.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (value == second) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value == second evaluates to False. Each augmented assignment uses the current value.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (value != first) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value != first evaluates to True. Each augmented assignment uses the current value.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 6\nvalue += 5\nfirst = value\nvalue *= 3\nsecond = value\nvalue /= 2\nprint(first, second, value, value == second, value != first)",
        "hint": "Each augmented assignment uses the current value.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The final update must use integer floor division. Replace the faulty update line.",
            "answer": "value //= 2",
            "marks": 1,
            "explanation": "Each augmented assignment uses the current value.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "11",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 11. Each augmented assignment uses the current value.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (second) \u2014 no quotes",
            "answer": "33",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "second evaluates to 33. Each augmented assignment uses the current value.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (value) \u2014 no quotes",
            "answer": "16",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value evaluates to 16. Each augmented assignment uses the current value.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (value == second) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value == second evaluates to False. Each augmented assignment uses the current value.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (value != first) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value != first evaluates to True. Each augmented assignment uses the current value.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 7\nvalue += 5\nfirst = value\nvalue *= 3\nsecond = value\nvalue /= 2\nprint(first, second, value, value == second, value != first)",
        "hint": "Each augmented assignment uses the current value.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The final update must use integer floor division. Replace the faulty update line.",
            "answer": "value //= 2",
            "marks": 1,
            "explanation": "Each augmented assignment uses the current value.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 12. Each augmented assignment uses the current value.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (second) \u2014 no quotes",
            "answer": "36",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "second evaluates to 36. Each augmented assignment uses the current value.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (value) \u2014 no quotes",
            "answer": "18",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value evaluates to 18. Each augmented assignment uses the current value.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (value == second) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value == second evaluates to False. Each augmented assignment uses the current value.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (value != first) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value != first evaluates to True. Each augmented assignment uses the current value.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 15,
    "focus": "data types",
    "title": "Convert input values",
    "format": "Predict the output",
    "tags": [
      "data types",
      "CA2.1",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "raw = \"3\"\namount = int(raw)\nprice = float(raw)\nprint(amount + 2, raw + \"2\", price + 0.5, str(amount) == raw, bool(0), bool(raw))",
        "hint": "input-style text must be converted before numeric arithmetic.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (amount + 2) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "amount + 2 evaluates to 5. input-style text must be converted before numeric arithmetic.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (raw + \"2\") \u2014 no quotes",
            "answer": "32",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "raw + \"2\" evaluates to 32. input-style text must be converted before numeric arithmetic.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (price + 0.5) \u2014 no quotes",
            "answer": "3.5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "price + 0.5 evaluates to 3.5. input-style text must be converted before numeric arithmetic.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (str(amount) == raw) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "str(amount) == raw evaluates to True. input-style text must be converted before numeric arithmetic.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (bool(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "bool(0) evaluates to False. input-style text must be converted before numeric arithmetic.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (bool(raw)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "bool(raw) evaluates to True. input-style text must be converted before numeric arithmetic.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "raw = \"4\"\namount = int(raw)\nprice = float(raw)\nprint(amount + 2, raw + \"2\", price + 0.5, str(amount) == raw, bool(0), bool(raw))",
        "hint": "input-style text must be converted before numeric arithmetic.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (amount + 2) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "amount + 2 evaluates to 6. input-style text must be converted before numeric arithmetic.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (raw + \"2\") \u2014 no quotes",
            "answer": "42",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "raw + \"2\" evaluates to 42. input-style text must be converted before numeric arithmetic.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (price + 0.5) \u2014 no quotes",
            "answer": "4.5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "price + 0.5 evaluates to 4.5. input-style text must be converted before numeric arithmetic.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (str(amount) == raw) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "str(amount) == raw evaluates to True. input-style text must be converted before numeric arithmetic.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (bool(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "bool(0) evaluates to False. input-style text must be converted before numeric arithmetic.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (bool(raw)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "bool(raw) evaluates to True. input-style text must be converted before numeric arithmetic.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "raw = \"5\"\namount = int(raw)\nprice = float(raw)\nprint(amount + 2, raw + \"2\", price + 0.5, str(amount) == raw, bool(0), bool(raw))",
        "hint": "input-style text must be converted before numeric arithmetic.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (amount + 2) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "amount + 2 evaluates to 7. input-style text must be converted before numeric arithmetic.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (raw + \"2\") \u2014 no quotes",
            "answer": "52",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "raw + \"2\" evaluates to 52. input-style text must be converted before numeric arithmetic.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (price + 0.5) \u2014 no quotes",
            "answer": "5.5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "price + 0.5 evaluates to 5.5. input-style text must be converted before numeric arithmetic.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (str(amount) == raw) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "str(amount) == raw evaluates to True. input-style text must be converted before numeric arithmetic.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (bool(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "bool(0) evaluates to False. input-style text must be converted before numeric arithmetic.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (bool(raw)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "bool(raw) evaluates to True. input-style text must be converted before numeric arithmetic.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "raw = \"6\"\namount = int(raw)\nprice = float(raw)\nprint(amount + 2, raw + \"2\", price + 0.5, str(amount) == raw, bool(0), bool(raw))",
        "hint": "input-style text must be converted before numeric arithmetic.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (amount + 2) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "amount + 2 evaluates to 8. input-style text must be converted before numeric arithmetic.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (raw + \"2\") \u2014 no quotes",
            "answer": "62",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "raw + \"2\" evaluates to 62. input-style text must be converted before numeric arithmetic.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (price + 0.5) \u2014 no quotes",
            "answer": "6.5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "price + 0.5 evaluates to 6.5. input-style text must be converted before numeric arithmetic.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (str(amount) == raw) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "str(amount) == raw evaluates to True. input-style text must be converted before numeric arithmetic.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (bool(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "bool(0) evaluates to False. input-style text must be converted before numeric arithmetic.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (bool(raw)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "bool(raw) evaluates to True. input-style text must be converted before numeric arithmetic.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "raw = \"7\"\namount = int(raw)\nprice = float(raw)\nprint(amount + 2, raw + \"2\", price + 0.5, str(amount) == raw, bool(0), bool(raw))",
        "hint": "input-style text must be converted before numeric arithmetic.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (amount + 2) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "amount + 2 evaluates to 9. input-style text must be converted before numeric arithmetic.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (raw + \"2\") \u2014 no quotes",
            "answer": "72",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "raw + \"2\" evaluates to 72. input-style text must be converted before numeric arithmetic.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (price + 0.5) \u2014 no quotes",
            "answer": "7.5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "price + 0.5 evaluates to 7.5. input-style text must be converted before numeric arithmetic.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (str(amount) == raw) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "str(amount) == raw evaluates to True. input-style text must be converted before numeric arithmetic.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (bool(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "bool(0) evaluates to False. input-style text must be converted before numeric arithmetic.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (bool(raw)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "bool(raw) evaluates to True. input-style text must be converted before numeric arithmetic.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 16,
    "focus": "data types",
    "title": "Inspect type relationships",
    "format": "Complete the code",
    "tags": [
      "data types",
      "CA2.1",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 3\nratio = value / 2\nprint(type(value).__name__, type(ratio).__name__, type(___).__name__, type(value > 0).__name__, type([value]).__name__)",
        "hint": "A one-item tuple needs a comma; / produces a float.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The third output must report the type after conversion to text. Complete its conversion expression.",
            "answer": "str(value)",
            "marks": 1,
            "explanation": "A one-item tuple needs a comma; / produces a float.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (type(value).__name__) \u2014 no quotes",
            "answer": "int",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(value).__name__ evaluates to int. A one-item tuple needs a comma; / produces a float.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (type(ratio).__name__) \u2014 no quotes",
            "answer": "float",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(ratio).__name__ evaluates to float. A one-item tuple needs a comma; / produces a float.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (type(str(value)).__name__) \u2014 no quotes",
            "answer": "str",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(str(value)).__name__ evaluates to str. A one-item tuple needs a comma; / produces a float.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (type(value > 0).__name__) \u2014 no quotes",
            "answer": "bool",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(value > 0).__name__ evaluates to bool. A one-item tuple needs a comma; / produces a float.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (type([value]).__name__) \u2014 no quotes",
            "answer": "list",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type([value]).__name__ evaluates to list. A one-item tuple needs a comma; / produces a float.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 4\nratio = value / 2\nprint(type(value).__name__, type(ratio).__name__, type(___).__name__, type(value > 0).__name__, type([value]).__name__)",
        "hint": "A one-item tuple needs a comma; / produces a float.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The third output must report the type after conversion to text. Complete its conversion expression.",
            "answer": "str(value)",
            "marks": 1,
            "explanation": "A one-item tuple needs a comma; / produces a float.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (type(value).__name__) \u2014 no quotes",
            "answer": "int",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(value).__name__ evaluates to int. A one-item tuple needs a comma; / produces a float.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (type(ratio).__name__) \u2014 no quotes",
            "answer": "float",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(ratio).__name__ evaluates to float. A one-item tuple needs a comma; / produces a float.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (type(str(value)).__name__) \u2014 no quotes",
            "answer": "str",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(str(value)).__name__ evaluates to str. A one-item tuple needs a comma; / produces a float.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (type(value > 0).__name__) \u2014 no quotes",
            "answer": "bool",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(value > 0).__name__ evaluates to bool. A one-item tuple needs a comma; / produces a float.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (type([value]).__name__) \u2014 no quotes",
            "answer": "list",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type([value]).__name__ evaluates to list. A one-item tuple needs a comma; / produces a float.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 5\nratio = value / 2\nprint(type(value).__name__, type(ratio).__name__, type(___).__name__, type(value > 0).__name__, type([value]).__name__)",
        "hint": "A one-item tuple needs a comma; / produces a float.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The third output must report the type after conversion to text. Complete its conversion expression.",
            "answer": "str(value)",
            "marks": 1,
            "explanation": "A one-item tuple needs a comma; / produces a float.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (type(value).__name__) \u2014 no quotes",
            "answer": "int",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(value).__name__ evaluates to int. A one-item tuple needs a comma; / produces a float.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (type(ratio).__name__) \u2014 no quotes",
            "answer": "float",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(ratio).__name__ evaluates to float. A one-item tuple needs a comma; / produces a float.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (type(str(value)).__name__) \u2014 no quotes",
            "answer": "str",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(str(value)).__name__ evaluates to str. A one-item tuple needs a comma; / produces a float.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (type(value > 0).__name__) \u2014 no quotes",
            "answer": "bool",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(value > 0).__name__ evaluates to bool. A one-item tuple needs a comma; / produces a float.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (type([value]).__name__) \u2014 no quotes",
            "answer": "list",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type([value]).__name__ evaluates to list. A one-item tuple needs a comma; / produces a float.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 6\nratio = value / 2\nprint(type(value).__name__, type(ratio).__name__, type(___).__name__, type(value > 0).__name__, type([value]).__name__)",
        "hint": "A one-item tuple needs a comma; / produces a float.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The third output must report the type after conversion to text. Complete its conversion expression.",
            "answer": "str(value)",
            "marks": 1,
            "explanation": "A one-item tuple needs a comma; / produces a float.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (type(value).__name__) \u2014 no quotes",
            "answer": "int",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(value).__name__ evaluates to int. A one-item tuple needs a comma; / produces a float.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (type(ratio).__name__) \u2014 no quotes",
            "answer": "float",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(ratio).__name__ evaluates to float. A one-item tuple needs a comma; / produces a float.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (type(str(value)).__name__) \u2014 no quotes",
            "answer": "str",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(str(value)).__name__ evaluates to str. A one-item tuple needs a comma; / produces a float.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (type(value > 0).__name__) \u2014 no quotes",
            "answer": "bool",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(value > 0).__name__ evaluates to bool. A one-item tuple needs a comma; / produces a float.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (type([value]).__name__) \u2014 no quotes",
            "answer": "list",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type([value]).__name__ evaluates to list. A one-item tuple needs a comma; / produces a float.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 7\nratio = value / 2\nprint(type(value).__name__, type(ratio).__name__, type(___).__name__, type(value > 0).__name__, type([value]).__name__)",
        "hint": "A one-item tuple needs a comma; / produces a float.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The third output must report the type after conversion to text. Complete its conversion expression.",
            "answer": "str(value)",
            "marks": 1,
            "explanation": "A one-item tuple needs a comma; / produces a float.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (type(value).__name__) \u2014 no quotes",
            "answer": "int",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(value).__name__ evaluates to int. A one-item tuple needs a comma; / produces a float.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (type(ratio).__name__) \u2014 no quotes",
            "answer": "float",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(ratio).__name__ evaluates to float. A one-item tuple needs a comma; / produces a float.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (type(str(value)).__name__) \u2014 no quotes",
            "answer": "str",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(str(value)).__name__ evaluates to str. A one-item tuple needs a comma; / produces a float.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (type(value > 0).__name__) \u2014 no quotes",
            "answer": "bool",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(value > 0).__name__ evaluates to bool. A one-item tuple needs a comma; / produces a float.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (type([value]).__name__) \u2014 no quotes",
            "answer": "list",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type([value]).__name__ evaluates to list. A one-item tuple needs a comma; / produces a float.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 17,
    "focus": "data types",
    "title": "Round and truncate",
    "format": "Fix the code",
    "tags": [
      "data types",
      "CA2.1",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 3 + 0.75\nprint(int(value), round(value), round(-value), abs(-value), min(value, 3))",
        "hint": "int truncates towards zero; round selects the nearest integer here.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The third output must truncate the negative value towards zero. Repair its expression.",
            "answer": "int(-value)",
            "marks": 1,
            "explanation": "int truncates towards zero; round selects the nearest integer here.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (int(value)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(value) evaluates to 3. int truncates towards zero; round selects the nearest integer here.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (round(value)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "round(value) evaluates to 4. int truncates towards zero; round selects the nearest integer here.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (int(-value)) \u2014 no quotes",
            "answer": "-3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(-value) evaluates to -3. int truncates towards zero; round selects the nearest integer here.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (abs(-value)) \u2014 no quotes",
            "answer": "3.75",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "abs(-value) evaluates to 3.75. int truncates towards zero; round selects the nearest integer here.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (min(value, 3)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "min(value, 3) evaluates to 3. int truncates towards zero; round selects the nearest integer here.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 4 + 0.75\nprint(int(value), round(value), round(-value), abs(-value), min(value, 4))",
        "hint": "int truncates towards zero; round selects the nearest integer here.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The third output must truncate the negative value towards zero. Repair its expression.",
            "answer": "int(-value)",
            "marks": 1,
            "explanation": "int truncates towards zero; round selects the nearest integer here.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (int(value)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(value) evaluates to 4. int truncates towards zero; round selects the nearest integer here.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (round(value)) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "round(value) evaluates to 5. int truncates towards zero; round selects the nearest integer here.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (int(-value)) \u2014 no quotes",
            "answer": "-4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(-value) evaluates to -4. int truncates towards zero; round selects the nearest integer here.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (abs(-value)) \u2014 no quotes",
            "answer": "4.75",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "abs(-value) evaluates to 4.75. int truncates towards zero; round selects the nearest integer here.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (min(value, 4)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "min(value, 4) evaluates to 4. int truncates towards zero; round selects the nearest integer here.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 5 + 0.75\nprint(int(value), round(value), round(-value), abs(-value), min(value, 5))",
        "hint": "int truncates towards zero; round selects the nearest integer here.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The third output must truncate the negative value towards zero. Repair its expression.",
            "answer": "int(-value)",
            "marks": 1,
            "explanation": "int truncates towards zero; round selects the nearest integer here.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (int(value)) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(value) evaluates to 5. int truncates towards zero; round selects the nearest integer here.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (round(value)) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "round(value) evaluates to 6. int truncates towards zero; round selects the nearest integer here.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (int(-value)) \u2014 no quotes",
            "answer": "-5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(-value) evaluates to -5. int truncates towards zero; round selects the nearest integer here.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (abs(-value)) \u2014 no quotes",
            "answer": "5.75",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "abs(-value) evaluates to 5.75. int truncates towards zero; round selects the nearest integer here.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (min(value, 5)) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "min(value, 5) evaluates to 5. int truncates towards zero; round selects the nearest integer here.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 6 + 0.75\nprint(int(value), round(value), round(-value), abs(-value), min(value, 6))",
        "hint": "int truncates towards zero; round selects the nearest integer here.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The third output must truncate the negative value towards zero. Repair its expression.",
            "answer": "int(-value)",
            "marks": 1,
            "explanation": "int truncates towards zero; round selects the nearest integer here.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (int(value)) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(value) evaluates to 6. int truncates towards zero; round selects the nearest integer here.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (round(value)) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "round(value) evaluates to 7. int truncates towards zero; round selects the nearest integer here.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (int(-value)) \u2014 no quotes",
            "answer": "-6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(-value) evaluates to -6. int truncates towards zero; round selects the nearest integer here.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (abs(-value)) \u2014 no quotes",
            "answer": "6.75",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "abs(-value) evaluates to 6.75. int truncates towards zero; round selects the nearest integer here.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (min(value, 6)) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "min(value, 6) evaluates to 6. int truncates towards zero; round selects the nearest integer here.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "value = 7 + 0.75\nprint(int(value), round(value), round(-value), abs(-value), min(value, 7))",
        "hint": "int truncates towards zero; round selects the nearest integer here.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The third output must truncate the negative value towards zero. Repair its expression.",
            "answer": "int(-value)",
            "marks": 1,
            "explanation": "int truncates towards zero; round selects the nearest integer here.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (int(value)) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(value) evaluates to 7. int truncates towards zero; round selects the nearest integer here.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (round(value)) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "round(value) evaluates to 8. int truncates towards zero; round selects the nearest integer here.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (int(-value)) \u2014 no quotes",
            "answer": "-7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(-value) evaluates to -7. int truncates towards zero; round selects the nearest integer here.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (abs(-value)) \u2014 no quotes",
            "answer": "7.75",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "abs(-value) evaluates to 7.75. int truncates towards zero; round selects the nearest integer here.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (min(value, 7)) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "min(value, 7) evaluates to 7. int truncates towards zero; round selects the nearest integer here.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 18,
    "focus": "strings",
    "title": "Slice an identifier",
    "format": "Predict the output",
    "tags": [
      "strings",
      "CA2.3",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "label = \"AB3xyz\"\nprint(label[0], label[-1], label[2], label[3:5], label[::-1], len(label))",
        "hint": "Slices exclude the stop; a negative step walks backwards.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (label[0]) \u2014 no quotes",
            "answer": "A",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[0] evaluates to A. Slices exclude the stop; a negative step walks backwards.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (label[-1]) \u2014 no quotes",
            "answer": "z",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[-1] evaluates to z. Slices exclude the stop; a negative step walks backwards.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (label[2]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[2] evaluates to 3. Slices exclude the stop; a negative step walks backwards.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (label[3:5]) \u2014 no quotes",
            "answer": "xy",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[3:5] evaluates to xy. Slices exclude the stop; a negative step walks backwards.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (label[::-1]) \u2014 no quotes",
            "answer": "zyx3BA",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[::-1] evaluates to zyx3BA. Slices exclude the stop; a negative step walks backwards.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (len(label)) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(label) evaluates to 6. Slices exclude the stop; a negative step walks backwards.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "label = \"AB4xyz\"\nprint(label[0], label[-1], label[2], label[3:5], label[::-1], len(label))",
        "hint": "Slices exclude the stop; a negative step walks backwards.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (label[0]) \u2014 no quotes",
            "answer": "A",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[0] evaluates to A. Slices exclude the stop; a negative step walks backwards.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (label[-1]) \u2014 no quotes",
            "answer": "z",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[-1] evaluates to z. Slices exclude the stop; a negative step walks backwards.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (label[2]) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[2] evaluates to 4. Slices exclude the stop; a negative step walks backwards.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (label[3:5]) \u2014 no quotes",
            "answer": "xy",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[3:5] evaluates to xy. Slices exclude the stop; a negative step walks backwards.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (label[::-1]) \u2014 no quotes",
            "answer": "zyx4BA",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[::-1] evaluates to zyx4BA. Slices exclude the stop; a negative step walks backwards.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (len(label)) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(label) evaluates to 6. Slices exclude the stop; a negative step walks backwards.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "label = \"AB5xyz\"\nprint(label[0], label[-1], label[2], label[3:5], label[::-1], len(label))",
        "hint": "Slices exclude the stop; a negative step walks backwards.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (label[0]) \u2014 no quotes",
            "answer": "A",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[0] evaluates to A. Slices exclude the stop; a negative step walks backwards.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (label[-1]) \u2014 no quotes",
            "answer": "z",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[-1] evaluates to z. Slices exclude the stop; a negative step walks backwards.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (label[2]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[2] evaluates to 5. Slices exclude the stop; a negative step walks backwards.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (label[3:5]) \u2014 no quotes",
            "answer": "xy",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[3:5] evaluates to xy. Slices exclude the stop; a negative step walks backwards.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (label[::-1]) \u2014 no quotes",
            "answer": "zyx5BA",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[::-1] evaluates to zyx5BA. Slices exclude the stop; a negative step walks backwards.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (len(label)) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(label) evaluates to 6. Slices exclude the stop; a negative step walks backwards.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "label = \"AB6xyz\"\nprint(label[0], label[-1], label[2], label[3:5], label[::-1], len(label))",
        "hint": "Slices exclude the stop; a negative step walks backwards.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (label[0]) \u2014 no quotes",
            "answer": "A",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[0] evaluates to A. Slices exclude the stop; a negative step walks backwards.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (label[-1]) \u2014 no quotes",
            "answer": "z",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[-1] evaluates to z. Slices exclude the stop; a negative step walks backwards.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (label[2]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[2] evaluates to 6. Slices exclude the stop; a negative step walks backwards.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (label[3:5]) \u2014 no quotes",
            "answer": "xy",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[3:5] evaluates to xy. Slices exclude the stop; a negative step walks backwards.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (label[::-1]) \u2014 no quotes",
            "answer": "zyx6BA",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[::-1] evaluates to zyx6BA. Slices exclude the stop; a negative step walks backwards.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (len(label)) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(label) evaluates to 6. Slices exclude the stop; a negative step walks backwards.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "label = \"AB7xyz\"\nprint(label[0], label[-1], label[2], label[3:5], label[::-1], len(label))",
        "hint": "Slices exclude the stop; a negative step walks backwards.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (label[0]) \u2014 no quotes",
            "answer": "A",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[0] evaluates to A. Slices exclude the stop; a negative step walks backwards.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (label[-1]) \u2014 no quotes",
            "answer": "z",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[-1] evaluates to z. Slices exclude the stop; a negative step walks backwards.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (label[2]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[2] evaluates to 7. Slices exclude the stop; a negative step walks backwards.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (label[3:5]) \u2014 no quotes",
            "answer": "xy",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[3:5] evaluates to xy. Slices exclude the stop; a negative step walks backwards.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (label[::-1]) \u2014 no quotes",
            "answer": "zyx7BA",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "label[::-1] evaluates to zyx7BA. Slices exclude the stop; a negative step walks backwards.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (len(label)) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(label) evaluates to 6. Slices exclude the stop; a negative step walks backwards.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 19,
    "focus": "strings",
    "title": "Clean a submitted name",
    "format": "Complete the code",
    "tags": [
      "strings",
      "CA2.5",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "name = \"  Team3  \"\nclean = ___\nprint(len(name), clean, clean.lower(), clean.upper(), clean.startswith(\"Team\"))",
        "hint": "strip returns a new string with whitespace removed at both ends.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Remove outer spaces while preserving letter case. Complete the clean expression.",
            "answer": "name.strip()",
            "marks": 1,
            "explanation": "strip returns a new string with whitespace removed at both ends.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(name)) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(name) evaluates to 9. strip returns a new string with whitespace removed at both ends.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (clean) \u2014 no quotes",
            "answer": "Team3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean evaluates to Team3. strip returns a new string with whitespace removed at both ends.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (clean.lower()) \u2014 no quotes",
            "answer": "team3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.lower() evaluates to team3. strip returns a new string with whitespace removed at both ends.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (clean.upper()) \u2014 no quotes",
            "answer": "TEAM3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.upper() evaluates to TEAM3. strip returns a new string with whitespace removed at both ends.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (clean.startswith(\"Team\")) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.startswith(\"Team\") evaluates to True. strip returns a new string with whitespace removed at both ends.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "name = \"  Team4  \"\nclean = ___\nprint(len(name), clean, clean.lower(), clean.upper(), clean.startswith(\"Team\"))",
        "hint": "strip returns a new string with whitespace removed at both ends.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Remove outer spaces while preserving letter case. Complete the clean expression.",
            "answer": "name.strip()",
            "marks": 1,
            "explanation": "strip returns a new string with whitespace removed at both ends.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(name)) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(name) evaluates to 9. strip returns a new string with whitespace removed at both ends.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (clean) \u2014 no quotes",
            "answer": "Team4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean evaluates to Team4. strip returns a new string with whitespace removed at both ends.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (clean.lower()) \u2014 no quotes",
            "answer": "team4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.lower() evaluates to team4. strip returns a new string with whitespace removed at both ends.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (clean.upper()) \u2014 no quotes",
            "answer": "TEAM4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.upper() evaluates to TEAM4. strip returns a new string with whitespace removed at both ends.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (clean.startswith(\"Team\")) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.startswith(\"Team\") evaluates to True. strip returns a new string with whitespace removed at both ends.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "name = \"  Team5  \"\nclean = ___\nprint(len(name), clean, clean.lower(), clean.upper(), clean.startswith(\"Team\"))",
        "hint": "strip returns a new string with whitespace removed at both ends.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Remove outer spaces while preserving letter case. Complete the clean expression.",
            "answer": "name.strip()",
            "marks": 1,
            "explanation": "strip returns a new string with whitespace removed at both ends.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(name)) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(name) evaluates to 9. strip returns a new string with whitespace removed at both ends.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (clean) \u2014 no quotes",
            "answer": "Team5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean evaluates to Team5. strip returns a new string with whitespace removed at both ends.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (clean.lower()) \u2014 no quotes",
            "answer": "team5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.lower() evaluates to team5. strip returns a new string with whitespace removed at both ends.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (clean.upper()) \u2014 no quotes",
            "answer": "TEAM5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.upper() evaluates to TEAM5. strip returns a new string with whitespace removed at both ends.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (clean.startswith(\"Team\")) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.startswith(\"Team\") evaluates to True. strip returns a new string with whitespace removed at both ends.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "name = \"  Team6  \"\nclean = ___\nprint(len(name), clean, clean.lower(), clean.upper(), clean.startswith(\"Team\"))",
        "hint": "strip returns a new string with whitespace removed at both ends.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Remove outer spaces while preserving letter case. Complete the clean expression.",
            "answer": "name.strip()",
            "marks": 1,
            "explanation": "strip returns a new string with whitespace removed at both ends.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(name)) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(name) evaluates to 9. strip returns a new string with whitespace removed at both ends.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (clean) \u2014 no quotes",
            "answer": "Team6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean evaluates to Team6. strip returns a new string with whitespace removed at both ends.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (clean.lower()) \u2014 no quotes",
            "answer": "team6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.lower() evaluates to team6. strip returns a new string with whitespace removed at both ends.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (clean.upper()) \u2014 no quotes",
            "answer": "TEAM6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.upper() evaluates to TEAM6. strip returns a new string with whitespace removed at both ends.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (clean.startswith(\"Team\")) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.startswith(\"Team\") evaluates to True. strip returns a new string with whitespace removed at both ends.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "name = \"  Team7  \"\nclean = ___\nprint(len(name), clean, clean.lower(), clean.upper(), clean.startswith(\"Team\"))",
        "hint": "strip returns a new string with whitespace removed at both ends.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Remove outer spaces while preserving letter case. Complete the clean expression.",
            "answer": "name.strip()",
            "marks": 1,
            "explanation": "strip returns a new string with whitespace removed at both ends.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(name)) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(name) evaluates to 9. strip returns a new string with whitespace removed at both ends.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (clean) \u2014 no quotes",
            "answer": "Team7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean evaluates to Team7. strip returns a new string with whitespace removed at both ends.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (clean.lower()) \u2014 no quotes",
            "answer": "team7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.lower() evaluates to team7. strip returns a new string with whitespace removed at both ends.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (clean.upper()) \u2014 no quotes",
            "answer": "TEAM7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.upper() evaluates to TEAM7. strip returns a new string with whitespace removed at both ends.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (clean.startswith(\"Team\")) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "clean.startswith(\"Team\") evaluates to True. strip returns a new string with whitespace removed at both ends.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 20,
    "focus": "strings",
    "title": "Split and replace records",
    "format": "Fix the code",
    "tags": [
      "strings",
      "CA2.3",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "row = \"a,3,b\"\nfields = row.split(\":\")\nprint(len(fields), fields[1], \"-\".join(fields), row.replace(\",\", \":\"), row.count(\",\"))",
        "hint": "split produces a list; join inserts its separator between items.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Split the comma-separated row into fields. Repair the split expression.",
            "answer": "row.split(\",\")",
            "marks": 1,
            "explanation": "split produces a list; join inserts its separator between items.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(fields)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(fields) evaluates to 3. split produces a list; join inserts its separator between items.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (fields[1]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "fields[1] evaluates to 3. split produces a list; join inserts its separator between items.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (\"-\".join(fields)) \u2014 no quotes",
            "answer": "a-3-b",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"-\".join(fields) evaluates to a-3-b. split produces a list; join inserts its separator between items.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (row.replace(\",\", \":\")) \u2014 no quotes",
            "answer": "a:3:b",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row.replace(\",\", \":\") evaluates to a:3:b. split produces a list; join inserts its separator between items.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (row.count(\",\")) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row.count(\",\") evaluates to 2. split produces a list; join inserts its separator between items.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "row = \"a,4,b\"\nfields = row.split(\":\")\nprint(len(fields), fields[1], \"-\".join(fields), row.replace(\",\", \":\"), row.count(\",\"))",
        "hint": "split produces a list; join inserts its separator between items.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Split the comma-separated row into fields. Repair the split expression.",
            "answer": "row.split(\",\")",
            "marks": 1,
            "explanation": "split produces a list; join inserts its separator between items.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(fields)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(fields) evaluates to 3. split produces a list; join inserts its separator between items.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (fields[1]) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "fields[1] evaluates to 4. split produces a list; join inserts its separator between items.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (\"-\".join(fields)) \u2014 no quotes",
            "answer": "a-4-b",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"-\".join(fields) evaluates to a-4-b. split produces a list; join inserts its separator between items.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (row.replace(\",\", \":\")) \u2014 no quotes",
            "answer": "a:4:b",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row.replace(\",\", \":\") evaluates to a:4:b. split produces a list; join inserts its separator between items.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (row.count(\",\")) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row.count(\",\") evaluates to 2. split produces a list; join inserts its separator between items.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "row = \"a,5,b\"\nfields = row.split(\":\")\nprint(len(fields), fields[1], \"-\".join(fields), row.replace(\",\", \":\"), row.count(\",\"))",
        "hint": "split produces a list; join inserts its separator between items.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Split the comma-separated row into fields. Repair the split expression.",
            "answer": "row.split(\",\")",
            "marks": 1,
            "explanation": "split produces a list; join inserts its separator between items.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(fields)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(fields) evaluates to 3. split produces a list; join inserts its separator between items.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (fields[1]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "fields[1] evaluates to 5. split produces a list; join inserts its separator between items.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (\"-\".join(fields)) \u2014 no quotes",
            "answer": "a-5-b",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"-\".join(fields) evaluates to a-5-b. split produces a list; join inserts its separator between items.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (row.replace(\",\", \":\")) \u2014 no quotes",
            "answer": "a:5:b",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row.replace(\",\", \":\") evaluates to a:5:b. split produces a list; join inserts its separator between items.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (row.count(\",\")) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row.count(\",\") evaluates to 2. split produces a list; join inserts its separator between items.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "row = \"a,6,b\"\nfields = row.split(\":\")\nprint(len(fields), fields[1], \"-\".join(fields), row.replace(\",\", \":\"), row.count(\",\"))",
        "hint": "split produces a list; join inserts its separator between items.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Split the comma-separated row into fields. Repair the split expression.",
            "answer": "row.split(\",\")",
            "marks": 1,
            "explanation": "split produces a list; join inserts its separator between items.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(fields)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(fields) evaluates to 3. split produces a list; join inserts its separator between items.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (fields[1]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "fields[1] evaluates to 6. split produces a list; join inserts its separator between items.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (\"-\".join(fields)) \u2014 no quotes",
            "answer": "a-6-b",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"-\".join(fields) evaluates to a-6-b. split produces a list; join inserts its separator between items.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (row.replace(\",\", \":\")) \u2014 no quotes",
            "answer": "a:6:b",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row.replace(\",\", \":\") evaluates to a:6:b. split produces a list; join inserts its separator between items.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (row.count(\",\")) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row.count(\",\") evaluates to 2. split produces a list; join inserts its separator between items.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "row = \"a,7,b\"\nfields = row.split(\":\")\nprint(len(fields), fields[1], \"-\".join(fields), row.replace(\",\", \":\"), row.count(\",\"))",
        "hint": "split produces a list; join inserts its separator between items.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Split the comma-separated row into fields. Repair the split expression.",
            "answer": "row.split(\",\")",
            "marks": 1,
            "explanation": "split produces a list; join inserts its separator between items.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(fields)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(fields) evaluates to 3. split produces a list; join inserts its separator between items.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (fields[1]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "fields[1] evaluates to 7. split produces a list; join inserts its separator between items.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (\"-\".join(fields)) \u2014 no quotes",
            "answer": "a-7-b",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"-\".join(fields) evaluates to a-7-b. split produces a list; join inserts its separator between items.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (row.replace(\",\", \":\")) \u2014 no quotes",
            "answer": "a:7:b",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row.replace(\",\", \":\") evaluates to a:7:b. split produces a list; join inserts its separator between items.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (row.count(\",\")) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row.count(\",\") evaluates to 2. split produces a list; join inserts its separator between items.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 21,
    "focus": "lists",
    "title": "Update a queue",
    "format": "Predict the output",
    "tags": [
      "lists",
      "CA2.3",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "queue = [3, 8, 9]\nqueue.append(10)\nfirst = queue.pop(0)\nprint(first, queue[0], queue[-1], len(queue), sum(queue), 10 in queue)",
        "hint": "pop removes and returns an item; remaining indices shift.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 3. pop removes and returns an item; remaining indices shift.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (queue[0]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "queue[0] evaluates to 8. pop removes and returns an item; remaining indices shift.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (queue[-1]) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "queue[-1] evaluates to 10. pop removes and returns an item; remaining indices shift.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(queue)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(queue) evaluates to 3. pop removes and returns an item; remaining indices shift.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (sum(queue)) \u2014 no quotes",
            "answer": "27",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(queue) evaluates to 27. pop removes and returns an item; remaining indices shift.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (10 in queue) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "10 in queue evaluates to True. pop removes and returns an item; remaining indices shift.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "queue = [4, 8, 9]\nqueue.append(10)\nfirst = queue.pop(0)\nprint(first, queue[0], queue[-1], len(queue), sum(queue), 10 in queue)",
        "hint": "pop removes and returns an item; remaining indices shift.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 4. pop removes and returns an item; remaining indices shift.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (queue[0]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "queue[0] evaluates to 8. pop removes and returns an item; remaining indices shift.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (queue[-1]) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "queue[-1] evaluates to 10. pop removes and returns an item; remaining indices shift.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(queue)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(queue) evaluates to 3. pop removes and returns an item; remaining indices shift.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (sum(queue)) \u2014 no quotes",
            "answer": "27",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(queue) evaluates to 27. pop removes and returns an item; remaining indices shift.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (10 in queue) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "10 in queue evaluates to True. pop removes and returns an item; remaining indices shift.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "queue = [5, 8, 9]\nqueue.append(10)\nfirst = queue.pop(0)\nprint(first, queue[0], queue[-1], len(queue), sum(queue), 10 in queue)",
        "hint": "pop removes and returns an item; remaining indices shift.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 5. pop removes and returns an item; remaining indices shift.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (queue[0]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "queue[0] evaluates to 8. pop removes and returns an item; remaining indices shift.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (queue[-1]) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "queue[-1] evaluates to 10. pop removes and returns an item; remaining indices shift.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(queue)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(queue) evaluates to 3. pop removes and returns an item; remaining indices shift.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (sum(queue)) \u2014 no quotes",
            "answer": "27",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(queue) evaluates to 27. pop removes and returns an item; remaining indices shift.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (10 in queue) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "10 in queue evaluates to True. pop removes and returns an item; remaining indices shift.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "queue = [6, 8, 9]\nqueue.append(10)\nfirst = queue.pop(0)\nprint(first, queue[0], queue[-1], len(queue), sum(queue), 10 in queue)",
        "hint": "pop removes and returns an item; remaining indices shift.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 6. pop removes and returns an item; remaining indices shift.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (queue[0]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "queue[0] evaluates to 8. pop removes and returns an item; remaining indices shift.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (queue[-1]) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "queue[-1] evaluates to 10. pop removes and returns an item; remaining indices shift.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(queue)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(queue) evaluates to 3. pop removes and returns an item; remaining indices shift.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (sum(queue)) \u2014 no quotes",
            "answer": "27",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(queue) evaluates to 27. pop removes and returns an item; remaining indices shift.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (10 in queue) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "10 in queue evaluates to True. pop removes and returns an item; remaining indices shift.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "queue = [7, 8, 9]\nqueue.append(10)\nfirst = queue.pop(0)\nprint(first, queue[0], queue[-1], len(queue), sum(queue), 10 in queue)",
        "hint": "pop removes and returns an item; remaining indices shift.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 7. pop removes and returns an item; remaining indices shift.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (queue[0]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "queue[0] evaluates to 8. pop removes and returns an item; remaining indices shift.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (queue[-1]) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "queue[-1] evaluates to 10. pop removes and returns an item; remaining indices shift.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(queue)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(queue) evaluates to 3. pop removes and returns an item; remaining indices shift.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (sum(queue)) \u2014 no quotes",
            "answer": "27",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(queue) evaluates to 27. pop removes and returns an item; remaining indices shift.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (10 in queue) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "10 in queue evaluates to True. pop removes and returns an item; remaining indices shift.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 22,
    "focus": "lists",
    "title": "Distinguish aliases and copies",
    "format": "Complete the code",
    "tags": [
      "lists",
      "CA2.3",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "items = [3, 7]\nalias = items\ncopy = ___\nalias[0] += 2\nprint(items[0], alias[0], copy[0], items is alias, items is copy)",
        "hint": "An alias refers to the same list; slicing creates a shallow copy.",
        "parts": [
          {
            "kind": "code",
            "prompt": "copy must be a separate shallow copy. Complete its expression.",
            "answer": "items[:]",
            "marks": 1,
            "explanation": "An alias refers to the same list; slicing creates a shallow copy.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (items[0]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items[0] evaluates to 5. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (alias[0]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "alias[0] evaluates to 5. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (copy[0]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[0] evaluates to 3. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (items is alias) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items is alias evaluates to True. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (items is copy) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items is copy evaluates to False. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "items = [4, 7]\nalias = items\ncopy = ___\nalias[0] += 2\nprint(items[0], alias[0], copy[0], items is alias, items is copy)",
        "hint": "An alias refers to the same list; slicing creates a shallow copy.",
        "parts": [
          {
            "kind": "code",
            "prompt": "copy must be a separate shallow copy. Complete its expression.",
            "answer": "items[:]",
            "marks": 1,
            "explanation": "An alias refers to the same list; slicing creates a shallow copy.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (items[0]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items[0] evaluates to 6. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (alias[0]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "alias[0] evaluates to 6. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (copy[0]) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[0] evaluates to 4. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (items is alias) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items is alias evaluates to True. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (items is copy) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items is copy evaluates to False. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "items = [5, 7]\nalias = items\ncopy = ___\nalias[0] += 2\nprint(items[0], alias[0], copy[0], items is alias, items is copy)",
        "hint": "An alias refers to the same list; slicing creates a shallow copy.",
        "parts": [
          {
            "kind": "code",
            "prompt": "copy must be a separate shallow copy. Complete its expression.",
            "answer": "items[:]",
            "marks": 1,
            "explanation": "An alias refers to the same list; slicing creates a shallow copy.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (items[0]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items[0] evaluates to 7. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (alias[0]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "alias[0] evaluates to 7. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (copy[0]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[0] evaluates to 5. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (items is alias) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items is alias evaluates to True. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (items is copy) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items is copy evaluates to False. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "items = [6, 7]\nalias = items\ncopy = ___\nalias[0] += 2\nprint(items[0], alias[0], copy[0], items is alias, items is copy)",
        "hint": "An alias refers to the same list; slicing creates a shallow copy.",
        "parts": [
          {
            "kind": "code",
            "prompt": "copy must be a separate shallow copy. Complete its expression.",
            "answer": "items[:]",
            "marks": 1,
            "explanation": "An alias refers to the same list; slicing creates a shallow copy.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (items[0]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items[0] evaluates to 8. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (alias[0]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "alias[0] evaluates to 8. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (copy[0]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[0] evaluates to 6. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (items is alias) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items is alias evaluates to True. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (items is copy) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items is copy evaluates to False. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "items = [7, 7]\nalias = items\ncopy = ___\nalias[0] += 2\nprint(items[0], alias[0], copy[0], items is alias, items is copy)",
        "hint": "An alias refers to the same list; slicing creates a shallow copy.",
        "parts": [
          {
            "kind": "code",
            "prompt": "copy must be a separate shallow copy. Complete its expression.",
            "answer": "items[:]",
            "marks": 1,
            "explanation": "An alias refers to the same list; slicing creates a shallow copy.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (items[0]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items[0] evaluates to 9. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (alias[0]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "alias[0] evaluates to 9. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (copy[0]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[0] evaluates to 7. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (items is alias) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items is alias evaluates to True. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (items is copy) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "items is copy evaluates to False. An alias refers to the same list; slicing creates a shallow copy.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 23,
    "focus": "lists",
    "title": "Read a two-dimensional grid",
    "format": "Fix the code",
    "tags": [
      "lists",
      "CA2.3",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "grid = [[3, 2, 3], [4, 5, 6]]\ngrid[0][1] += grid[0][0]\nprint(grid[0][0], grid[1][0], grid[1][2], len(grid), len(grid[0]))",
        "hint": "The first index selects a row and the second a column.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Increase the first value of the second row by the top-left value. Replace the faulty update line.",
            "answer": "grid[1][0] += grid[0][0]",
            "marks": 1,
            "explanation": "The first index selects a row and the second a column.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (grid[0][0]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[0][0] evaluates to 3. The first index selects a row and the second a column.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (grid[1][0]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[1][0] evaluates to 7. The first index selects a row and the second a column.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (grid[1][2]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[1][2] evaluates to 6. The first index selects a row and the second a column.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(grid)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(grid) evaluates to 2. The first index selects a row and the second a column.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(grid[0])) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(grid[0]) evaluates to 3. The first index selects a row and the second a column.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "grid = [[4, 2, 3], [4, 5, 6]]\ngrid[0][1] += grid[0][0]\nprint(grid[0][0], grid[1][0], grid[1][2], len(grid), len(grid[0]))",
        "hint": "The first index selects a row and the second a column.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Increase the first value of the second row by the top-left value. Replace the faulty update line.",
            "answer": "grid[1][0] += grid[0][0]",
            "marks": 1,
            "explanation": "The first index selects a row and the second a column.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (grid[0][0]) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[0][0] evaluates to 4. The first index selects a row and the second a column.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (grid[1][0]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[1][0] evaluates to 8. The first index selects a row and the second a column.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (grid[1][2]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[1][2] evaluates to 6. The first index selects a row and the second a column.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(grid)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(grid) evaluates to 2. The first index selects a row and the second a column.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(grid[0])) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(grid[0]) evaluates to 3. The first index selects a row and the second a column.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "grid = [[5, 2, 3], [4, 5, 6]]\ngrid[0][1] += grid[0][0]\nprint(grid[0][0], grid[1][0], grid[1][2], len(grid), len(grid[0]))",
        "hint": "The first index selects a row and the second a column.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Increase the first value of the second row by the top-left value. Replace the faulty update line.",
            "answer": "grid[1][0] += grid[0][0]",
            "marks": 1,
            "explanation": "The first index selects a row and the second a column.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (grid[0][0]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[0][0] evaluates to 5. The first index selects a row and the second a column.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (grid[1][0]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[1][0] evaluates to 9. The first index selects a row and the second a column.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (grid[1][2]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[1][2] evaluates to 6. The first index selects a row and the second a column.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(grid)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(grid) evaluates to 2. The first index selects a row and the second a column.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(grid[0])) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(grid[0]) evaluates to 3. The first index selects a row and the second a column.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "grid = [[6, 2, 3], [4, 5, 6]]\ngrid[0][1] += grid[0][0]\nprint(grid[0][0], grid[1][0], grid[1][2], len(grid), len(grid[0]))",
        "hint": "The first index selects a row and the second a column.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Increase the first value of the second row by the top-left value. Replace the faulty update line.",
            "answer": "grid[1][0] += grid[0][0]",
            "marks": 1,
            "explanation": "The first index selects a row and the second a column.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (grid[0][0]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[0][0] evaluates to 6. The first index selects a row and the second a column.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (grid[1][0]) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[1][0] evaluates to 10. The first index selects a row and the second a column.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (grid[1][2]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[1][2] evaluates to 6. The first index selects a row and the second a column.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(grid)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(grid) evaluates to 2. The first index selects a row and the second a column.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(grid[0])) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(grid[0]) evaluates to 3. The first index selects a row and the second a column.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "grid = [[7, 2, 3], [4, 5, 6]]\ngrid[0][1] += grid[0][0]\nprint(grid[0][0], grid[1][0], grid[1][2], len(grid), len(grid[0]))",
        "hint": "The first index selects a row and the second a column.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Increase the first value of the second row by the top-left value. Replace the faulty update line.",
            "answer": "grid[1][0] += grid[0][0]",
            "marks": 1,
            "explanation": "The first index selects a row and the second a column.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (grid[0][0]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[0][0] evaluates to 7. The first index selects a row and the second a column.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (grid[1][0]) \u2014 no quotes",
            "answer": "11",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[1][0] evaluates to 11. The first index selects a row and the second a column.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (grid[1][2]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "grid[1][2] evaluates to 6. The first index selects a row and the second a column.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(grid)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(grid) evaluates to 2. The first index selects a row and the second a column.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(grid[0])) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(grid[0]) evaluates to 3. The first index selects a row and the second a column.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 24,
    "focus": "records",
    "title": "Look up stock",
    "format": "Predict the output",
    "tags": [
      "records",
      "CA2.3",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "stock = {\"pen\": 3, \"pad\": 8}\nstock[\"pen\"] += 3\nprint(stock[\"pen\"], stock[\"pad\"], stock.get(\"bag\", 0), len(stock), \"pen\" in stock, \"bag\" in stock)",
        "hint": "Dictionary membership checks keys; get can supply a default.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (stock[\"pen\"]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock[\"pen\"] evaluates to 6. Dictionary membership checks keys; get can supply a default.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (stock[\"pad\"]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock[\"pad\"] evaluates to 8. Dictionary membership checks keys; get can supply a default.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (stock.get(\"bag\", 0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock.get(\"bag\", 0) evaluates to 0. Dictionary membership checks keys; get can supply a default.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(stock)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(stock) evaluates to 2. Dictionary membership checks keys; get can supply a default.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (\"pen\" in stock) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"pen\" in stock evaluates to True. Dictionary membership checks keys; get can supply a default.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (\"bag\" in stock) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"bag\" in stock evaluates to False. Dictionary membership checks keys; get can supply a default.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "stock = {\"pen\": 4, \"pad\": 8}\nstock[\"pen\"] += 3\nprint(stock[\"pen\"], stock[\"pad\"], stock.get(\"bag\", 0), len(stock), \"pen\" in stock, \"bag\" in stock)",
        "hint": "Dictionary membership checks keys; get can supply a default.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (stock[\"pen\"]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock[\"pen\"] evaluates to 7. Dictionary membership checks keys; get can supply a default.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (stock[\"pad\"]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock[\"pad\"] evaluates to 8. Dictionary membership checks keys; get can supply a default.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (stock.get(\"bag\", 0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock.get(\"bag\", 0) evaluates to 0. Dictionary membership checks keys; get can supply a default.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(stock)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(stock) evaluates to 2. Dictionary membership checks keys; get can supply a default.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (\"pen\" in stock) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"pen\" in stock evaluates to True. Dictionary membership checks keys; get can supply a default.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (\"bag\" in stock) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"bag\" in stock evaluates to False. Dictionary membership checks keys; get can supply a default.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "stock = {\"pen\": 5, \"pad\": 8}\nstock[\"pen\"] += 3\nprint(stock[\"pen\"], stock[\"pad\"], stock.get(\"bag\", 0), len(stock), \"pen\" in stock, \"bag\" in stock)",
        "hint": "Dictionary membership checks keys; get can supply a default.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (stock[\"pen\"]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock[\"pen\"] evaluates to 8. Dictionary membership checks keys; get can supply a default.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (stock[\"pad\"]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock[\"pad\"] evaluates to 8. Dictionary membership checks keys; get can supply a default.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (stock.get(\"bag\", 0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock.get(\"bag\", 0) evaluates to 0. Dictionary membership checks keys; get can supply a default.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(stock)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(stock) evaluates to 2. Dictionary membership checks keys; get can supply a default.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (\"pen\" in stock) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"pen\" in stock evaluates to True. Dictionary membership checks keys; get can supply a default.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (\"bag\" in stock) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"bag\" in stock evaluates to False. Dictionary membership checks keys; get can supply a default.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "stock = {\"pen\": 6, \"pad\": 8}\nstock[\"pen\"] += 3\nprint(stock[\"pen\"], stock[\"pad\"], stock.get(\"bag\", 0), len(stock), \"pen\" in stock, \"bag\" in stock)",
        "hint": "Dictionary membership checks keys; get can supply a default.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (stock[\"pen\"]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock[\"pen\"] evaluates to 9. Dictionary membership checks keys; get can supply a default.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (stock[\"pad\"]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock[\"pad\"] evaluates to 8. Dictionary membership checks keys; get can supply a default.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (stock.get(\"bag\", 0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock.get(\"bag\", 0) evaluates to 0. Dictionary membership checks keys; get can supply a default.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(stock)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(stock) evaluates to 2. Dictionary membership checks keys; get can supply a default.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (\"pen\" in stock) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"pen\" in stock evaluates to True. Dictionary membership checks keys; get can supply a default.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (\"bag\" in stock) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"bag\" in stock evaluates to False. Dictionary membership checks keys; get can supply a default.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "stock = {\"pen\": 7, \"pad\": 8}\nstock[\"pen\"] += 3\nprint(stock[\"pen\"], stock[\"pad\"], stock.get(\"bag\", 0), len(stock), \"pen\" in stock, \"bag\" in stock)",
        "hint": "Dictionary membership checks keys; get can supply a default.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (stock[\"pen\"]) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock[\"pen\"] evaluates to 10. Dictionary membership checks keys; get can supply a default.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (stock[\"pad\"]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock[\"pad\"] evaluates to 8. Dictionary membership checks keys; get can supply a default.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (stock.get(\"bag\", 0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "stock.get(\"bag\", 0) evaluates to 0. Dictionary membership checks keys; get can supply a default.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(stock)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(stock) evaluates to 2. Dictionary membership checks keys; get can supply a default.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (\"pen\" in stock) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"pen\" in stock evaluates to True. Dictionary membership checks keys; get can supply a default.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (\"bag\" in stock) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "\"bag\" in stock evaluates to False. Dictionary membership checks keys; get can supply a default.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 25,
    "focus": "records",
    "title": "Count repeated events",
    "format": "Complete the code",
    "tags": [
      "records",
      "CA2.3",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "counts = {}\nfor event in [\"ok\", \"bad\", \"ok\", \"ok\", \"bad\"]:\n    counts[event] = ___ + 1\nprint(counts[\"ok\"], counts[\"bad\"], len(counts), sum(counts.values()), counts.get(\"new\", 0))",
        "hint": "In this example each new event starts at the stated baseline, not zero.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Use the stated baseline 3 for a previously unseen event. Complete the lookup expression.",
            "answer": "counts.get(event, 3)",
            "marks": 1,
            "explanation": "In this example each new event starts at the stated baseline, not zero.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (counts[\"ok\"]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts[\"ok\"] evaluates to 6. In this example each new event starts at the stated baseline, not zero.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (counts[\"bad\"]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts[\"bad\"] evaluates to 5. In this example each new event starts at the stated baseline, not zero.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (len(counts)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(counts) evaluates to 2. In this example each new event starts at the stated baseline, not zero.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (sum(counts.values())) \u2014 no quotes",
            "answer": "11",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(counts.values()) evaluates to 11. In this example each new event starts at the stated baseline, not zero.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (counts.get(\"new\", 0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts.get(\"new\", 0) evaluates to 0. In this example each new event starts at the stated baseline, not zero.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "counts = {}\nfor event in [\"ok\", \"bad\", \"ok\", \"ok\", \"bad\"]:\n    counts[event] = ___ + 1\nprint(counts[\"ok\"], counts[\"bad\"], len(counts), sum(counts.values()), counts.get(\"new\", 0))",
        "hint": "In this example each new event starts at the stated baseline, not zero.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Use the stated baseline 4 for a previously unseen event. Complete the lookup expression.",
            "answer": "counts.get(event, 4)",
            "marks": 1,
            "explanation": "In this example each new event starts at the stated baseline, not zero.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (counts[\"ok\"]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts[\"ok\"] evaluates to 7. In this example each new event starts at the stated baseline, not zero.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (counts[\"bad\"]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts[\"bad\"] evaluates to 6. In this example each new event starts at the stated baseline, not zero.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (len(counts)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(counts) evaluates to 2. In this example each new event starts at the stated baseline, not zero.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (sum(counts.values())) \u2014 no quotes",
            "answer": "13",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(counts.values()) evaluates to 13. In this example each new event starts at the stated baseline, not zero.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (counts.get(\"new\", 0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts.get(\"new\", 0) evaluates to 0. In this example each new event starts at the stated baseline, not zero.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "counts = {}\nfor event in [\"ok\", \"bad\", \"ok\", \"ok\", \"bad\"]:\n    counts[event] = ___ + 1\nprint(counts[\"ok\"], counts[\"bad\"], len(counts), sum(counts.values()), counts.get(\"new\", 0))",
        "hint": "In this example each new event starts at the stated baseline, not zero.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Use the stated baseline 5 for a previously unseen event. Complete the lookup expression.",
            "answer": "counts.get(event, 5)",
            "marks": 1,
            "explanation": "In this example each new event starts at the stated baseline, not zero.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (counts[\"ok\"]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts[\"ok\"] evaluates to 8. In this example each new event starts at the stated baseline, not zero.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (counts[\"bad\"]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts[\"bad\"] evaluates to 7. In this example each new event starts at the stated baseline, not zero.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (len(counts)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(counts) evaluates to 2. In this example each new event starts at the stated baseline, not zero.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (sum(counts.values())) \u2014 no quotes",
            "answer": "15",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(counts.values()) evaluates to 15. In this example each new event starts at the stated baseline, not zero.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (counts.get(\"new\", 0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts.get(\"new\", 0) evaluates to 0. In this example each new event starts at the stated baseline, not zero.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "counts = {}\nfor event in [\"ok\", \"bad\", \"ok\", \"ok\", \"bad\"]:\n    counts[event] = ___ + 1\nprint(counts[\"ok\"], counts[\"bad\"], len(counts), sum(counts.values()), counts.get(\"new\", 0))",
        "hint": "In this example each new event starts at the stated baseline, not zero.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Use the stated baseline 6 for a previously unseen event. Complete the lookup expression.",
            "answer": "counts.get(event, 6)",
            "marks": 1,
            "explanation": "In this example each new event starts at the stated baseline, not zero.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (counts[\"ok\"]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts[\"ok\"] evaluates to 9. In this example each new event starts at the stated baseline, not zero.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (counts[\"bad\"]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts[\"bad\"] evaluates to 8. In this example each new event starts at the stated baseline, not zero.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (len(counts)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(counts) evaluates to 2. In this example each new event starts at the stated baseline, not zero.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (sum(counts.values())) \u2014 no quotes",
            "answer": "17",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(counts.values()) evaluates to 17. In this example each new event starts at the stated baseline, not zero.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (counts.get(\"new\", 0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts.get(\"new\", 0) evaluates to 0. In this example each new event starts at the stated baseline, not zero.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "counts = {}\nfor event in [\"ok\", \"bad\", \"ok\", \"ok\", \"bad\"]:\n    counts[event] = ___ + 1\nprint(counts[\"ok\"], counts[\"bad\"], len(counts), sum(counts.values()), counts.get(\"new\", 0))",
        "hint": "In this example each new event starts at the stated baseline, not zero.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Use the stated baseline 7 for a previously unseen event. Complete the lookup expression.",
            "answer": "counts.get(event, 7)",
            "marks": 1,
            "explanation": "In this example each new event starts at the stated baseline, not zero.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (counts[\"ok\"]) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts[\"ok\"] evaluates to 10. In this example each new event starts at the stated baseline, not zero.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (counts[\"bad\"]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts[\"bad\"] evaluates to 9. In this example each new event starts at the stated baseline, not zero.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (len(counts)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(counts) evaluates to 2. In this example each new event starts at the stated baseline, not zero.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (sum(counts.values())) \u2014 no quotes",
            "answer": "19",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(counts.values()) evaluates to 19. In this example each new event starts at the stated baseline, not zero.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (counts.get(\"new\", 0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "counts.get(\"new\", 0) evaluates to 0. In this example each new event starts at the stated baseline, not zero.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 26,
    "focus": "records",
    "title": "Unpack a record",
    "format": "Fix the code",
    "tags": [
      "records",
      "CA2.3",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "record = (\"item3\", 3, True)\ncount, name, active = record\nprint(name, count, active, len(record), type(record).__name__)",
        "hint": "Unpacking assigns tuple items in order.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Unpack the record into matching names. Replace the faulty unpacking line.",
            "answer": "name, count, active = record",
            "marks": 1,
            "explanation": "Unpacking assigns tuple items in order.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (name) \u2014 no quotes",
            "answer": "item3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "name evaluates to item3. Unpacking assigns tuple items in order.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (count) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 3. Unpacking assigns tuple items in order.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (active) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "active evaluates to True. Unpacking assigns tuple items in order.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(record)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(record) evaluates to 3. Unpacking assigns tuple items in order.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (type(record).__name__) \u2014 no quotes",
            "answer": "tuple",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(record).__name__ evaluates to tuple. Unpacking assigns tuple items in order.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "record = (\"item4\", 4, True)\ncount, name, active = record\nprint(name, count, active, len(record), type(record).__name__)",
        "hint": "Unpacking assigns tuple items in order.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Unpack the record into matching names. Replace the faulty unpacking line.",
            "answer": "name, count, active = record",
            "marks": 1,
            "explanation": "Unpacking assigns tuple items in order.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (name) \u2014 no quotes",
            "answer": "item4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "name evaluates to item4. Unpacking assigns tuple items in order.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (count) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 4. Unpacking assigns tuple items in order.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (active) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "active evaluates to True. Unpacking assigns tuple items in order.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(record)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(record) evaluates to 3. Unpacking assigns tuple items in order.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (type(record).__name__) \u2014 no quotes",
            "answer": "tuple",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(record).__name__ evaluates to tuple. Unpacking assigns tuple items in order.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "record = (\"item5\", 5, True)\ncount, name, active = record\nprint(name, count, active, len(record), type(record).__name__)",
        "hint": "Unpacking assigns tuple items in order.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Unpack the record into matching names. Replace the faulty unpacking line.",
            "answer": "name, count, active = record",
            "marks": 1,
            "explanation": "Unpacking assigns tuple items in order.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (name) \u2014 no quotes",
            "answer": "item5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "name evaluates to item5. Unpacking assigns tuple items in order.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (count) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 5. Unpacking assigns tuple items in order.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (active) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "active evaluates to True. Unpacking assigns tuple items in order.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(record)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(record) evaluates to 3. Unpacking assigns tuple items in order.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (type(record).__name__) \u2014 no quotes",
            "answer": "tuple",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(record).__name__ evaluates to tuple. Unpacking assigns tuple items in order.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "record = (\"item6\", 6, True)\ncount, name, active = record\nprint(name, count, active, len(record), type(record).__name__)",
        "hint": "Unpacking assigns tuple items in order.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Unpack the record into matching names. Replace the faulty unpacking line.",
            "answer": "name, count, active = record",
            "marks": 1,
            "explanation": "Unpacking assigns tuple items in order.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (name) \u2014 no quotes",
            "answer": "item6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "name evaluates to item6. Unpacking assigns tuple items in order.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (count) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 6. Unpacking assigns tuple items in order.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (active) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "active evaluates to True. Unpacking assigns tuple items in order.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(record)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(record) evaluates to 3. Unpacking assigns tuple items in order.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (type(record).__name__) \u2014 no quotes",
            "answer": "tuple",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(record).__name__ evaluates to tuple. Unpacking assigns tuple items in order.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "record = (\"item7\", 7, True)\ncount, name, active = record\nprint(name, count, active, len(record), type(record).__name__)",
        "hint": "Unpacking assigns tuple items in order.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Unpack the record into matching names. Replace the faulty unpacking line.",
            "answer": "name, count, active = record",
            "marks": 1,
            "explanation": "Unpacking assigns tuple items in order.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (name) \u2014 no quotes",
            "answer": "item7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "name evaluates to item7. Unpacking assigns tuple items in order.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (count) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 7. Unpacking assigns tuple items in order.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (active) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "active evaluates to True. Unpacking assigns tuple items in order.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(record)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(record) evaluates to 3. Unpacking assigns tuple items in order.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (type(record).__name__) \u2014 no quotes",
            "answer": "tuple",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "type(record).__name__ evaluates to tuple. Unpacking assigns tuple items in order.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 27,
    "focus": "boolean logic",
    "title": "Apply a permission rule",
    "format": "Predict the output",
    "tags": [
      "boolean logic",
      "CA2.4",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "age = 3\nmember = True\nblocked = False\nprint(member and not blocked, age >= 5 and member, age < 5 or blocked, not (member or blocked), member != blocked, age == 5)",
        "hint": "Evaluate comparisons first, then not, and, or.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (member and not blocked) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "member and not blocked evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (age >= 5 and member) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age >= 5 and member evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (age < 5 or blocked) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age < 5 or blocked evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (not (member or blocked)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "not (member or blocked) evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (member != blocked) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "member != blocked evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (age == 5) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age == 5 evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "age = 4\nmember = True\nblocked = False\nprint(member and not blocked, age >= 5 and member, age < 5 or blocked, not (member or blocked), member != blocked, age == 5)",
        "hint": "Evaluate comparisons first, then not, and, or.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (member and not blocked) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "member and not blocked evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (age >= 5 and member) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age >= 5 and member evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (age < 5 or blocked) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age < 5 or blocked evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (not (member or blocked)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "not (member or blocked) evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (member != blocked) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "member != blocked evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (age == 5) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age == 5 evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "age = 5\nmember = True\nblocked = False\nprint(member and not blocked, age >= 5 and member, age < 5 or blocked, not (member or blocked), member != blocked, age == 5)",
        "hint": "Evaluate comparisons first, then not, and, or.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (member and not blocked) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "member and not blocked evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (age >= 5 and member) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age >= 5 and member evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (age < 5 or blocked) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age < 5 or blocked evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (not (member or blocked)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "not (member or blocked) evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (member != blocked) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "member != blocked evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (age == 5) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age == 5 evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "age = 6\nmember = True\nblocked = False\nprint(member and not blocked, age >= 5 and member, age < 5 or blocked, not (member or blocked), member != blocked, age == 5)",
        "hint": "Evaluate comparisons first, then not, and, or.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (member and not blocked) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "member and not blocked evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (age >= 5 and member) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age >= 5 and member evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (age < 5 or blocked) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age < 5 or blocked evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (not (member or blocked)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "not (member or blocked) evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (member != blocked) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "member != blocked evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (age == 5) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age == 5 evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "age = 7\nmember = True\nblocked = False\nprint(member and not blocked, age >= 5 and member, age < 5 or blocked, not (member or blocked), member != blocked, age == 5)",
        "hint": "Evaluate comparisons first, then not, and, or.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (member and not blocked) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "member and not blocked evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (age >= 5 and member) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age >= 5 and member evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (age < 5 or blocked) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age < 5 or blocked evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (not (member or blocked)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "not (member or blocked) evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (member != blocked) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "member != blocked evaluates to True. Evaluate comparisons first, then not, and, or.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (age == 5) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "age == 5 evaluates to False. Evaluate comparisons first, then not, and, or.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 28,
    "focus": "boolean logic",
    "title": "Avoid a division error",
    "format": "Complete the code",
    "tags": [
      "boolean logic",
      "CA2.10",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def safe(value):\n    return ___\nx = 3\nprint(safe(0), safe(x), safe(2), safe(6), safe(-1))",
        "hint": "and skips its right operand when the left operand is false.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Check for nonzero value AND a quotient greater than two without dividing by zero. Complete the return expression.",
            "answer": "value != 0 and 12 / value > 2",
            "marks": 1,
            "explanation": "and skips its right operand when the left operand is false.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (safe(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(0) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (safe(x)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(x) evaluates to True. and skips its right operand when the left operand is false.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (safe(2)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(2) evaluates to True. and skips its right operand when the left operand is false.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (safe(6)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(6) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (safe(-1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(-1) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def safe(value):\n    return ___\nx = 4\nprint(safe(0), safe(x), safe(2), safe(6), safe(-1))",
        "hint": "and skips its right operand when the left operand is false.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Check for nonzero value AND a quotient greater than two without dividing by zero. Complete the return expression.",
            "answer": "value != 0 and 12 / value > 2",
            "marks": 1,
            "explanation": "and skips its right operand when the left operand is false.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (safe(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(0) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (safe(x)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(x) evaluates to True. and skips its right operand when the left operand is false.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (safe(2)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(2) evaluates to True. and skips its right operand when the left operand is false.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (safe(6)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(6) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (safe(-1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(-1) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def safe(value):\n    return ___\nx = 5\nprint(safe(0), safe(x), safe(2), safe(6), safe(-1))",
        "hint": "and skips its right operand when the left operand is false.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Check for nonzero value AND a quotient greater than two without dividing by zero. Complete the return expression.",
            "answer": "value != 0 and 12 / value > 2",
            "marks": 1,
            "explanation": "and skips its right operand when the left operand is false.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (safe(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(0) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (safe(x)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(x) evaluates to True. and skips its right operand when the left operand is false.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (safe(2)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(2) evaluates to True. and skips its right operand when the left operand is false.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (safe(6)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(6) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (safe(-1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(-1) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def safe(value):\n    return ___\nx = 6\nprint(safe(0), safe(x), safe(2), safe(6), safe(-1))",
        "hint": "and skips its right operand when the left operand is false.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Check for nonzero value AND a quotient greater than two without dividing by zero. Complete the return expression.",
            "answer": "value != 0 and 12 / value > 2",
            "marks": 1,
            "explanation": "and skips its right operand when the left operand is false.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (safe(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(0) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (safe(x)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(x) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (safe(2)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(2) evaluates to True. and skips its right operand when the left operand is false.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (safe(6)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(6) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (safe(-1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(-1) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def safe(value):\n    return ___\nx = 7\nprint(safe(0), safe(x), safe(2), safe(6), safe(-1))",
        "hint": "and skips its right operand when the left operand is false.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Check for nonzero value AND a quotient greater than two without dividing by zero. Complete the return expression.",
            "answer": "value != 0 and 12 / value > 2",
            "marks": 1,
            "explanation": "and skips its right operand when the left operand is false.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (safe(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(0) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (safe(x)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(x) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (safe(2)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(2) evaluates to True. and skips its right operand when the left operand is false.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (safe(6)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(6) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (safe(-1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "safe(-1) evaluates to False. and skips its right operand when the left operand is false.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 29,
    "focus": "boolean logic",
    "title": "Compare membership and identity",
    "format": "Fix the code",
    "tags": [
      "boolean logic",
      "CA2.4",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "a = [3]\nb = [3]\nc = a\nprint(a == b, a == b, a is c, 3 in a, 0 not in a)",
        "hint": "Equality compares values; identity compares object references.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The second output must test object identity. Repair its expression.",
            "answer": "a is b",
            "marks": 1,
            "explanation": "Equality compares values; identity compares object references.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (a == b) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a == b evaluates to True. Equality compares values; identity compares object references.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (a is b) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a is b evaluates to False. Equality compares values; identity compares object references.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (a is c) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a is c evaluates to True. Equality compares values; identity compares object references.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (3 in a) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "3 in a evaluates to True. Equality compares values; identity compares object references.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (0 not in a) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "0 not in a evaluates to True. Equality compares values; identity compares object references.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "a = [4]\nb = [4]\nc = a\nprint(a == b, a == b, a is c, 4 in a, 0 not in a)",
        "hint": "Equality compares values; identity compares object references.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The second output must test object identity. Repair its expression.",
            "answer": "a is b",
            "marks": 1,
            "explanation": "Equality compares values; identity compares object references.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (a == b) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a == b evaluates to True. Equality compares values; identity compares object references.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (a is b) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a is b evaluates to False. Equality compares values; identity compares object references.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (a is c) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a is c evaluates to True. Equality compares values; identity compares object references.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (4 in a) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "4 in a evaluates to True. Equality compares values; identity compares object references.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (0 not in a) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "0 not in a evaluates to True. Equality compares values; identity compares object references.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "a = [5]\nb = [5]\nc = a\nprint(a == b, a == b, a is c, 5 in a, 0 not in a)",
        "hint": "Equality compares values; identity compares object references.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The second output must test object identity. Repair its expression.",
            "answer": "a is b",
            "marks": 1,
            "explanation": "Equality compares values; identity compares object references.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (a == b) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a == b evaluates to True. Equality compares values; identity compares object references.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (a is b) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a is b evaluates to False. Equality compares values; identity compares object references.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (a is c) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a is c evaluates to True. Equality compares values; identity compares object references.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (5 in a) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "5 in a evaluates to True. Equality compares values; identity compares object references.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (0 not in a) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "0 not in a evaluates to True. Equality compares values; identity compares object references.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "a = [6]\nb = [6]\nc = a\nprint(a == b, a == b, a is c, 6 in a, 0 not in a)",
        "hint": "Equality compares values; identity compares object references.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The second output must test object identity. Repair its expression.",
            "answer": "a is b",
            "marks": 1,
            "explanation": "Equality compares values; identity compares object references.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (a == b) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a == b evaluates to True. Equality compares values; identity compares object references.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (a is b) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a is b evaluates to False. Equality compares values; identity compares object references.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (a is c) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a is c evaluates to True. Equality compares values; identity compares object references.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (6 in a) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "6 in a evaluates to True. Equality compares values; identity compares object references.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (0 not in a) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "0 not in a evaluates to True. Equality compares values; identity compares object references.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "a = [7]\nb = [7]\nc = a\nprint(a == b, a == b, a is c, 7 in a, 0 not in a)",
        "hint": "Equality compares values; identity compares object references.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The second output must test object identity. Repair its expression.",
            "answer": "a is b",
            "marks": 1,
            "explanation": "Equality compares values; identity compares object references.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (a == b) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a == b evaluates to True. Equality compares values; identity compares object references.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (a is b) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a is b evaluates to False. Equality compares values; identity compares object references.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (a is c) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "a is c evaluates to True. Equality compares values; identity compares object references.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (7 in a) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "7 in a evaluates to True. Equality compares values; identity compares object references.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (0 not in a) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "0 not in a evaluates to True. Equality compares values; identity compares object references.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 30,
    "focus": "nested iteration",
    "title": "Trace a nested count",
    "format": "Predict the output",
    "tags": [
      "nested iteration",
      "CA2.6",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 0\nfor row in range(3):\n    for col in range(3):\n        count += 1\nprint(count, row, col, count // 3, count % 3, row + col)",
        "hint": "The inner loop completes for every outer-loop iteration.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (count) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 9. The inner loop completes for every outer-loop iteration.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (row) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row evaluates to 2. The inner loop completes for every outer-loop iteration.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (col) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "col evaluates to 2. The inner loop completes for every outer-loop iteration.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (count // 3) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count // 3 evaluates to 3. The inner loop completes for every outer-loop iteration.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (count % 3) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count % 3 evaluates to 0. The inner loop completes for every outer-loop iteration.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (row + col) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row + col evaluates to 4. The inner loop completes for every outer-loop iteration.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 0\nfor row in range(4):\n    for col in range(3):\n        count += 1\nprint(count, row, col, count // 3, count % 3, row + col)",
        "hint": "The inner loop completes for every outer-loop iteration.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (count) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 12. The inner loop completes for every outer-loop iteration.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (row) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row evaluates to 3. The inner loop completes for every outer-loop iteration.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (col) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "col evaluates to 2. The inner loop completes for every outer-loop iteration.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (count // 3) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count // 3 evaluates to 4. The inner loop completes for every outer-loop iteration.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (count % 3) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count % 3 evaluates to 0. The inner loop completes for every outer-loop iteration.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (row + col) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row + col evaluates to 5. The inner loop completes for every outer-loop iteration.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 0\nfor row in range(5):\n    for col in range(3):\n        count += 1\nprint(count, row, col, count // 3, count % 3, row + col)",
        "hint": "The inner loop completes for every outer-loop iteration.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (count) \u2014 no quotes",
            "answer": "15",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 15. The inner loop completes for every outer-loop iteration.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (row) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row evaluates to 4. The inner loop completes for every outer-loop iteration.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (col) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "col evaluates to 2. The inner loop completes for every outer-loop iteration.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (count // 3) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count // 3 evaluates to 5. The inner loop completes for every outer-loop iteration.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (count % 3) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count % 3 evaluates to 0. The inner loop completes for every outer-loop iteration.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (row + col) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row + col evaluates to 6. The inner loop completes for every outer-loop iteration.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 0\nfor row in range(6):\n    for col in range(3):\n        count += 1\nprint(count, row, col, count // 3, count % 3, row + col)",
        "hint": "The inner loop completes for every outer-loop iteration.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (count) \u2014 no quotes",
            "answer": "18",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 18. The inner loop completes for every outer-loop iteration.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (row) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row evaluates to 5. The inner loop completes for every outer-loop iteration.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (col) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "col evaluates to 2. The inner loop completes for every outer-loop iteration.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (count // 3) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count // 3 evaluates to 6. The inner loop completes for every outer-loop iteration.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (count % 3) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count % 3 evaluates to 0. The inner loop completes for every outer-loop iteration.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (row + col) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row + col evaluates to 7. The inner loop completes for every outer-loop iteration.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 0\nfor row in range(7):\n    for col in range(3):\n        count += 1\nprint(count, row, col, count // 3, count % 3, row + col)",
        "hint": "The inner loop completes for every outer-loop iteration.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (count) \u2014 no quotes",
            "answer": "21",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 21. The inner loop completes for every outer-loop iteration.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (row) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row evaluates to 6. The inner loop completes for every outer-loop iteration.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (col) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "col evaluates to 2. The inner loop completes for every outer-loop iteration.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (count // 3) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count // 3 evaluates to 7. The inner loop completes for every outer-loop iteration.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (count % 3) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count % 3 evaluates to 0. The inner loop completes for every outer-loop iteration.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (row + col) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "row + col evaluates to 8. The inner loop completes for every outer-loop iteration.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 31,
    "focus": "nested iteration",
    "title": "Skip and stop",
    "format": "Complete the code",
    "tags": [
      "nested iteration",
      "CA2.6",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "total = 0\nfor value in range(3, 3 + 6):\n    if value == 3 + 1:\n        ___\n    if value == 3 + 4:\n        break\n    total += value\nprint(total, value, value == 3 + 4, total > 0, total % 2)",
        "hint": "continue skips this iteration; break exits the loop.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Skip only the value one above the start. Complete the first loop-control keyword.",
            "answer": "continue",
            "marks": 1,
            "explanation": "continue skips this iteration; break exits the loop.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (total) \u2014 no quotes",
            "answer": "14",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 14. continue skips this iteration; break exits the loop.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (value) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value evaluates to 7. continue skips this iteration; break exits the loop.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (value == 3 + 4) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value == 3 + 4 evaluates to True. continue skips this iteration; break exits the loop.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (total > 0) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total > 0 evaluates to True. continue skips this iteration; break exits the loop.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (total % 2) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total % 2 evaluates to 0. continue skips this iteration; break exits the loop.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "total = 0\nfor value in range(4, 4 + 6):\n    if value == 4 + 1:\n        ___\n    if value == 4 + 4:\n        break\n    total += value\nprint(total, value, value == 4 + 4, total > 0, total % 2)",
        "hint": "continue skips this iteration; break exits the loop.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Skip only the value one above the start. Complete the first loop-control keyword.",
            "answer": "continue",
            "marks": 1,
            "explanation": "continue skips this iteration; break exits the loop.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (total) \u2014 no quotes",
            "answer": "17",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 17. continue skips this iteration; break exits the loop.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (value) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value evaluates to 8. continue skips this iteration; break exits the loop.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (value == 4 + 4) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value == 4 + 4 evaluates to True. continue skips this iteration; break exits the loop.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (total > 0) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total > 0 evaluates to True. continue skips this iteration; break exits the loop.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (total % 2) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total % 2 evaluates to 1. continue skips this iteration; break exits the loop.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "total = 0\nfor value in range(5, 5 + 6):\n    if value == 5 + 1:\n        ___\n    if value == 5 + 4:\n        break\n    total += value\nprint(total, value, value == 5 + 4, total > 0, total % 2)",
        "hint": "continue skips this iteration; break exits the loop.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Skip only the value one above the start. Complete the first loop-control keyword.",
            "answer": "continue",
            "marks": 1,
            "explanation": "continue skips this iteration; break exits the loop.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (total) \u2014 no quotes",
            "answer": "20",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 20. continue skips this iteration; break exits the loop.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (value) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value evaluates to 9. continue skips this iteration; break exits the loop.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (value == 5 + 4) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value == 5 + 4 evaluates to True. continue skips this iteration; break exits the loop.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (total > 0) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total > 0 evaluates to True. continue skips this iteration; break exits the loop.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (total % 2) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total % 2 evaluates to 0. continue skips this iteration; break exits the loop.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "total = 0\nfor value in range(6, 6 + 6):\n    if value == 6 + 1:\n        ___\n    if value == 6 + 4:\n        break\n    total += value\nprint(total, value, value == 6 + 4, total > 0, total % 2)",
        "hint": "continue skips this iteration; break exits the loop.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Skip only the value one above the start. Complete the first loop-control keyword.",
            "answer": "continue",
            "marks": 1,
            "explanation": "continue skips this iteration; break exits the loop.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (total) \u2014 no quotes",
            "answer": "23",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 23. continue skips this iteration; break exits the loop.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (value) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value evaluates to 10. continue skips this iteration; break exits the loop.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (value == 6 + 4) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value == 6 + 4 evaluates to True. continue skips this iteration; break exits the loop.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (total > 0) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total > 0 evaluates to True. continue skips this iteration; break exits the loop.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (total % 2) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total % 2 evaluates to 1. continue skips this iteration; break exits the loop.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "total = 0\nfor value in range(7, 7 + 6):\n    if value == 7 + 1:\n        ___\n    if value == 7 + 4:\n        break\n    total += value\nprint(total, value, value == 7 + 4, total > 0, total % 2)",
        "hint": "continue skips this iteration; break exits the loop.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Skip only the value one above the start. Complete the first loop-control keyword.",
            "answer": "continue",
            "marks": 1,
            "explanation": "continue skips this iteration; break exits the loop.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (total) \u2014 no quotes",
            "answer": "26",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 26. continue skips this iteration; break exits the loop.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (value) \u2014 no quotes",
            "answer": "11",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value evaluates to 11. continue skips this iteration; break exits the loop.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (value == 7 + 4) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "value == 7 + 4 evaluates to True. continue skips this iteration; break exits the loop.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (total > 0) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total > 0 evaluates to True. continue skips this iteration; break exits the loop.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (total % 2) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total % 2 evaluates to 0. continue skips this iteration; break exits the loop.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 32,
    "focus": "nested iteration",
    "title": "Trace a sentinel",
    "format": "Fix the code",
    "tags": [
      "nested iteration",
      "CA2.6",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [3, 3, -1, 9]\nindex = 0\ntotal = 0\nwhile values[index] == -1:\n    total += values[index]\n    index += 1\nprint(total, index, values[index], values[-1], len(values))",
        "hint": "The sentinel is tested before it can be added.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Keep adding values until reaching the sentinel -1. Repair the while condition.",
            "answer": "values[index] != -1",
            "marks": 1,
            "explanation": "The sentinel is tested before it can be added.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (total) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 6. The sentinel is tested before it can be added.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (index) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "index evaluates to 2. The sentinel is tested before it can be added.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[index]) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[index] evaluates to -1. The sentinel is tested before it can be added.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[-1]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 9. The sentinel is tested before it can be added.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(values)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 4. The sentinel is tested before it can be added.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [4, 3, -1, 9]\nindex = 0\ntotal = 0\nwhile values[index] == -1:\n    total += values[index]\n    index += 1\nprint(total, index, values[index], values[-1], len(values))",
        "hint": "The sentinel is tested before it can be added.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Keep adding values until reaching the sentinel -1. Repair the while condition.",
            "answer": "values[index] != -1",
            "marks": 1,
            "explanation": "The sentinel is tested before it can be added.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (total) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 7. The sentinel is tested before it can be added.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (index) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "index evaluates to 2. The sentinel is tested before it can be added.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[index]) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[index] evaluates to -1. The sentinel is tested before it can be added.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[-1]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 9. The sentinel is tested before it can be added.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(values)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 4. The sentinel is tested before it can be added.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [5, 3, -1, 9]\nindex = 0\ntotal = 0\nwhile values[index] == -1:\n    total += values[index]\n    index += 1\nprint(total, index, values[index], values[-1], len(values))",
        "hint": "The sentinel is tested before it can be added.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Keep adding values until reaching the sentinel -1. Repair the while condition.",
            "answer": "values[index] != -1",
            "marks": 1,
            "explanation": "The sentinel is tested before it can be added.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (total) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 8. The sentinel is tested before it can be added.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (index) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "index evaluates to 2. The sentinel is tested before it can be added.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[index]) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[index] evaluates to -1. The sentinel is tested before it can be added.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[-1]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 9. The sentinel is tested before it can be added.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(values)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 4. The sentinel is tested before it can be added.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [6, 3, -1, 9]\nindex = 0\ntotal = 0\nwhile values[index] == -1:\n    total += values[index]\n    index += 1\nprint(total, index, values[index], values[-1], len(values))",
        "hint": "The sentinel is tested before it can be added.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Keep adding values until reaching the sentinel -1. Repair the while condition.",
            "answer": "values[index] != -1",
            "marks": 1,
            "explanation": "The sentinel is tested before it can be added.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (total) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 9. The sentinel is tested before it can be added.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (index) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "index evaluates to 2. The sentinel is tested before it can be added.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[index]) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[index] evaluates to -1. The sentinel is tested before it can be added.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[-1]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 9. The sentinel is tested before it can be added.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(values)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 4. The sentinel is tested before it can be added.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [7, 3, -1, 9]\nindex = 0\ntotal = 0\nwhile values[index] == -1:\n    total += values[index]\n    index += 1\nprint(total, index, values[index], values[-1], len(values))",
        "hint": "The sentinel is tested before it can be added.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Keep adding values until reaching the sentinel -1. Repair the while condition.",
            "answer": "values[index] != -1",
            "marks": 1,
            "explanation": "The sentinel is tested before it can be added.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (total) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 10. The sentinel is tested before it can be added.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (index) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "index evaluates to 2. The sentinel is tested before it can be added.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[index]) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[index] evaluates to -1. The sentinel is tested before it can be added.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[-1]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 9. The sentinel is tested before it can be added.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(values)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 4. The sentinel is tested before it can be added.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 33,
    "focus": "input output",
    "title": "Format a receipt",
    "format": "Predict the output",
    "tags": [
      "input output",
      "CA2.5",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 3\nprice = 2\ntotal = count * price\nprint(f\"Q{count}\", f\"{total:.2f}\", str(total), len(str(total)), total, count)",
        "hint": "A format specifier controls display, without changing the original number.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (f\"Q{count}\") \u2014 no quotes",
            "answer": "Q3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "f\"Q{count}\" evaluates to Q3. A format specifier controls display, without changing the original number.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (f\"{total:.2f}\") \u2014 no quotes",
            "answer": "6.00",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "f\"{total:.2f}\" evaluates to 6.00. A format specifier controls display, without changing the original number.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (str(total)) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "str(total) evaluates to 6. A format specifier controls display, without changing the original number.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(str(total))) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(str(total)) evaluates to 1. A format specifier controls display, without changing the original number.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (total) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 6. A format specifier controls display, without changing the original number.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (count) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 3. A format specifier controls display, without changing the original number.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 4\nprice = 2\ntotal = count * price\nprint(f\"Q{count}\", f\"{total:.2f}\", str(total), len(str(total)), total, count)",
        "hint": "A format specifier controls display, without changing the original number.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (f\"Q{count}\") \u2014 no quotes",
            "answer": "Q4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "f\"Q{count}\" evaluates to Q4. A format specifier controls display, without changing the original number.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (f\"{total:.2f}\") \u2014 no quotes",
            "answer": "8.00",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "f\"{total:.2f}\" evaluates to 8.00. A format specifier controls display, without changing the original number.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (str(total)) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "str(total) evaluates to 8. A format specifier controls display, without changing the original number.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(str(total))) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(str(total)) evaluates to 1. A format specifier controls display, without changing the original number.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (total) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 8. A format specifier controls display, without changing the original number.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (count) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 4. A format specifier controls display, without changing the original number.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 5\nprice = 2\ntotal = count * price\nprint(f\"Q{count}\", f\"{total:.2f}\", str(total), len(str(total)), total, count)",
        "hint": "A format specifier controls display, without changing the original number.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (f\"Q{count}\") \u2014 no quotes",
            "answer": "Q5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "f\"Q{count}\" evaluates to Q5. A format specifier controls display, without changing the original number.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (f\"{total:.2f}\") \u2014 no quotes",
            "answer": "10.00",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "f\"{total:.2f}\" evaluates to 10.00. A format specifier controls display, without changing the original number.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (str(total)) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "str(total) evaluates to 10. A format specifier controls display, without changing the original number.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(str(total))) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(str(total)) evaluates to 2. A format specifier controls display, without changing the original number.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (total) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 10. A format specifier controls display, without changing the original number.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (count) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 5. A format specifier controls display, without changing the original number.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 6\nprice = 2\ntotal = count * price\nprint(f\"Q{count}\", f\"{total:.2f}\", str(total), len(str(total)), total, count)",
        "hint": "A format specifier controls display, without changing the original number.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (f\"Q{count}\") \u2014 no quotes",
            "answer": "Q6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "f\"Q{count}\" evaluates to Q6. A format specifier controls display, without changing the original number.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (f\"{total:.2f}\") \u2014 no quotes",
            "answer": "12.00",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "f\"{total:.2f}\" evaluates to 12.00. A format specifier controls display, without changing the original number.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (str(total)) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "str(total) evaluates to 12. A format specifier controls display, without changing the original number.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(str(total))) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(str(total)) evaluates to 2. A format specifier controls display, without changing the original number.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (total) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 12. A format specifier controls display, without changing the original number.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (count) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 6. A format specifier controls display, without changing the original number.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "count = 7\nprice = 2\ntotal = count * price\nprint(f\"Q{count}\", f\"{total:.2f}\", str(total), len(str(total)), total, count)",
        "hint": "A format specifier controls display, without changing the original number.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (f\"Q{count}\") \u2014 no quotes",
            "answer": "Q7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "f\"Q{count}\" evaluates to Q7. A format specifier controls display, without changing the original number.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (f\"{total:.2f}\") \u2014 no quotes",
            "answer": "14.00",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "f\"{total:.2f}\" evaluates to 14.00. A format specifier controls display, without changing the original number.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (str(total)) \u2014 no quotes",
            "answer": "14",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "str(total) evaluates to 14. A format specifier controls display, without changing the original number.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(str(total))) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(str(total)) evaluates to 2. A format specifier controls display, without changing the original number.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (total) \u2014 no quotes",
            "answer": "14",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total evaluates to 14. A format specifier controls display, without changing the original number.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (count) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "count evaluates to 7. A format specifier controls display, without changing the original number.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 34,
    "focus": "input output",
    "title": "Read a file as lines",
    "format": "Complete the code",
    "tags": [
      "input output",
      "CA2.5",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "from io import StringIO\nfile = StringIO(\"3\\n8\\n\")\nfirst = ___\nrest = file.read().strip()\nprint(first, rest, int(first) + int(rest), file.read() == \"\", file.tell())",
        "hint": "readline reads one line; read consumes the remaining contents.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Read just the first line and remove its newline. Complete the first expression.",
            "answer": "file.readline().strip()",
            "marks": 1,
            "explanation": "readline reads one line; read consumes the remaining contents.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 3. readline reads one line; read consumes the remaining contents.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (rest) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "rest evaluates to 8. readline reads one line; read consumes the remaining contents.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (int(first) + int(rest)) \u2014 no quotes",
            "answer": "11",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(first) + int(rest) evaluates to 11. readline reads one line; read consumes the remaining contents.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (file.read() == \"\") \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.read() == \"\" evaluates to True. readline reads one line; read consumes the remaining contents.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (file.tell()) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.tell() evaluates to 4. readline reads one line; read consumes the remaining contents.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "from io import StringIO\nfile = StringIO(\"4\\n8\\n\")\nfirst = ___\nrest = file.read().strip()\nprint(first, rest, int(first) + int(rest), file.read() == \"\", file.tell())",
        "hint": "readline reads one line; read consumes the remaining contents.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Read just the first line and remove its newline. Complete the first expression.",
            "answer": "file.readline().strip()",
            "marks": 1,
            "explanation": "readline reads one line; read consumes the remaining contents.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 4. readline reads one line; read consumes the remaining contents.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (rest) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "rest evaluates to 8. readline reads one line; read consumes the remaining contents.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (int(first) + int(rest)) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(first) + int(rest) evaluates to 12. readline reads one line; read consumes the remaining contents.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (file.read() == \"\") \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.read() == \"\" evaluates to True. readline reads one line; read consumes the remaining contents.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (file.tell()) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.tell() evaluates to 4. readline reads one line; read consumes the remaining contents.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "from io import StringIO\nfile = StringIO(\"5\\n8\\n\")\nfirst = ___\nrest = file.read().strip()\nprint(first, rest, int(first) + int(rest), file.read() == \"\", file.tell())",
        "hint": "readline reads one line; read consumes the remaining contents.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Read just the first line and remove its newline. Complete the first expression.",
            "answer": "file.readline().strip()",
            "marks": 1,
            "explanation": "readline reads one line; read consumes the remaining contents.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 5. readline reads one line; read consumes the remaining contents.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (rest) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "rest evaluates to 8. readline reads one line; read consumes the remaining contents.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (int(first) + int(rest)) \u2014 no quotes",
            "answer": "13",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(first) + int(rest) evaluates to 13. readline reads one line; read consumes the remaining contents.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (file.read() == \"\") \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.read() == \"\" evaluates to True. readline reads one line; read consumes the remaining contents.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (file.tell()) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.tell() evaluates to 4. readline reads one line; read consumes the remaining contents.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "from io import StringIO\nfile = StringIO(\"6\\n8\\n\")\nfirst = ___\nrest = file.read().strip()\nprint(first, rest, int(first) + int(rest), file.read() == \"\", file.tell())",
        "hint": "readline reads one line; read consumes the remaining contents.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Read just the first line and remove its newline. Complete the first expression.",
            "answer": "file.readline().strip()",
            "marks": 1,
            "explanation": "readline reads one line; read consumes the remaining contents.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 6. readline reads one line; read consumes the remaining contents.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (rest) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "rest evaluates to 8. readline reads one line; read consumes the remaining contents.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (int(first) + int(rest)) \u2014 no quotes",
            "answer": "14",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(first) + int(rest) evaluates to 14. readline reads one line; read consumes the remaining contents.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (file.read() == \"\") \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.read() == \"\" evaluates to True. readline reads one line; read consumes the remaining contents.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (file.tell()) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.tell() evaluates to 4. readline reads one line; read consumes the remaining contents.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "from io import StringIO\nfile = StringIO(\"7\\n8\\n\")\nfirst = ___\nrest = file.read().strip()\nprint(first, rest, int(first) + int(rest), file.read() == \"\", file.tell())",
        "hint": "readline reads one line; read consumes the remaining contents.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Read just the first line and remove its newline. Complete the first expression.",
            "answer": "file.readline().strip()",
            "marks": 1,
            "explanation": "readline reads one line; read consumes the remaining contents.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (first) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 7. readline reads one line; read consumes the remaining contents.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (rest) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "rest evaluates to 8. readline reads one line; read consumes the remaining contents.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (int(first) + int(rest)) \u2014 no quotes",
            "answer": "15",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "int(first) + int(rest) evaluates to 15. readline reads one line; read consumes the remaining contents.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (file.read() == \"\") \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.read() == \"\" evaluates to True. readline reads one line; read consumes the remaining contents.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (file.tell()) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.tell() evaluates to 4. readline reads one line; read consumes the remaining contents.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 35,
    "focus": "input output",
    "title": "Write and rewind",
    "format": "Fix the code",
    "tags": [
      "input output",
      "CA2.5",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "from io import StringIO\nfile = StringIO()\nwritten = file.write(\"ID3\")\nposition = file.tell()\nfile.seek(1)\ntext = file.read()\nprint(written, position, text, len(text), file.read() == \"\")",
        "hint": "The cursor stays at the end after writing; seek(0) rewinds it.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Read back the entire written ID. Repair the cursor-positioning call.",
            "answer": "file.seek(0)",
            "marks": 1,
            "explanation": "The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (written) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "written evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (position) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "position evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (text) \u2014 no quotes",
            "answer": "ID3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "text evaluates to ID3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(text)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(text) evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (file.read() == \"\") \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.read() == \"\" evaluates to True. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "from io import StringIO\nfile = StringIO()\nwritten = file.write(\"ID4\")\nposition = file.tell()\nfile.seek(1)\ntext = file.read()\nprint(written, position, text, len(text), file.read() == \"\")",
        "hint": "The cursor stays at the end after writing; seek(0) rewinds it.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Read back the entire written ID. Repair the cursor-positioning call.",
            "answer": "file.seek(0)",
            "marks": 1,
            "explanation": "The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (written) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "written evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (position) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "position evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (text) \u2014 no quotes",
            "answer": "ID4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "text evaluates to ID4. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(text)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(text) evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (file.read() == \"\") \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.read() == \"\" evaluates to True. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "from io import StringIO\nfile = StringIO()\nwritten = file.write(\"ID5\")\nposition = file.tell()\nfile.seek(1)\ntext = file.read()\nprint(written, position, text, len(text), file.read() == \"\")",
        "hint": "The cursor stays at the end after writing; seek(0) rewinds it.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Read back the entire written ID. Repair the cursor-positioning call.",
            "answer": "file.seek(0)",
            "marks": 1,
            "explanation": "The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (written) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "written evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (position) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "position evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (text) \u2014 no quotes",
            "answer": "ID5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "text evaluates to ID5. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(text)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(text) evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (file.read() == \"\") \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.read() == \"\" evaluates to True. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "from io import StringIO\nfile = StringIO()\nwritten = file.write(\"ID6\")\nposition = file.tell()\nfile.seek(1)\ntext = file.read()\nprint(written, position, text, len(text), file.read() == \"\")",
        "hint": "The cursor stays at the end after writing; seek(0) rewinds it.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Read back the entire written ID. Repair the cursor-positioning call.",
            "answer": "file.seek(0)",
            "marks": 1,
            "explanation": "The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (written) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "written evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (position) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "position evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (text) \u2014 no quotes",
            "answer": "ID6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "text evaluates to ID6. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(text)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(text) evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (file.read() == \"\") \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.read() == \"\" evaluates to True. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "from io import StringIO\nfile = StringIO()\nwritten = file.write(\"ID7\")\nposition = file.tell()\nfile.seek(1)\ntext = file.read()\nprint(written, position, text, len(text), file.read() == \"\")",
        "hint": "The cursor stays at the end after writing; seek(0) rewinds it.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Read back the entire written ID. Repair the cursor-positioning call.",
            "answer": "file.seek(0)",
            "marks": 1,
            "explanation": "The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (written) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "written evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (position) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "position evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (text) \u2014 no quotes",
            "answer": "ID7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "text evaluates to ID7. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (len(text)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(text) evaluates to 3. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (file.read() == \"\") \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "file.read() == \"\" evaluates to True. The cursor stays at the end after writing; seek(0) rewinds it.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 36,
    "focus": "robust code",
    "title": "Handle invalid integers",
    "format": "Predict the output",
    "tags": [
      "robust code",
      "CA2.10",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def parse(text):\n    try:\n        return int(text)\n    except ValueError:\n        return -1\nprint(parse(\"3\"), parse(\"bad\"), parse(\"2.5\"), parse(\"-3\"), parse(\" 7 \"), parse(\"\"))",
        "hint": "Catch the error raised by int for non-integer text.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (parse(\"3\")) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"3\") evaluates to 3. Catch the error raised by int for non-integer text.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (parse(\"bad\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"bad\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (parse(\"2.5\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"2.5\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (parse(\"-3\")) \u2014 no quotes",
            "answer": "-3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"-3\") evaluates to -3. Catch the error raised by int for non-integer text.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (parse(\" 7 \")) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\" 7 \") evaluates to 7. Catch the error raised by int for non-integer text.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (parse(\"\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def parse(text):\n    try:\n        return int(text)\n    except ValueError:\n        return -1\nprint(parse(\"4\"), parse(\"bad\"), parse(\"2.5\"), parse(\"-3\"), parse(\" 7 \"), parse(\"\"))",
        "hint": "Catch the error raised by int for non-integer text.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (parse(\"4\")) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"4\") evaluates to 4. Catch the error raised by int for non-integer text.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (parse(\"bad\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"bad\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (parse(\"2.5\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"2.5\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (parse(\"-3\")) \u2014 no quotes",
            "answer": "-3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"-3\") evaluates to -3. Catch the error raised by int for non-integer text.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (parse(\" 7 \")) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\" 7 \") evaluates to 7. Catch the error raised by int for non-integer text.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (parse(\"\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def parse(text):\n    try:\n        return int(text)\n    except ValueError:\n        return -1\nprint(parse(\"5\"), parse(\"bad\"), parse(\"2.5\"), parse(\"-3\"), parse(\" 7 \"), parse(\"\"))",
        "hint": "Catch the error raised by int for non-integer text.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (parse(\"5\")) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"5\") evaluates to 5. Catch the error raised by int for non-integer text.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (parse(\"bad\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"bad\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (parse(\"2.5\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"2.5\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (parse(\"-3\")) \u2014 no quotes",
            "answer": "-3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"-3\") evaluates to -3. Catch the error raised by int for non-integer text.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (parse(\" 7 \")) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\" 7 \") evaluates to 7. Catch the error raised by int for non-integer text.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (parse(\"\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def parse(text):\n    try:\n        return int(text)\n    except ValueError:\n        return -1\nprint(parse(\"6\"), parse(\"bad\"), parse(\"2.5\"), parse(\"-3\"), parse(\" 7 \"), parse(\"\"))",
        "hint": "Catch the error raised by int for non-integer text.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (parse(\"6\")) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"6\") evaluates to 6. Catch the error raised by int for non-integer text.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (parse(\"bad\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"bad\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (parse(\"2.5\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"2.5\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (parse(\"-3\")) \u2014 no quotes",
            "answer": "-3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"-3\") evaluates to -3. Catch the error raised by int for non-integer text.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (parse(\" 7 \")) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\" 7 \") evaluates to 7. Catch the error raised by int for non-integer text.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (parse(\"\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def parse(text):\n    try:\n        return int(text)\n    except ValueError:\n        return -1\nprint(parse(\"7\"), parse(\"bad\"), parse(\"2.5\"), parse(\"-3\"), parse(\" 7 \"), parse(\"\"))",
        "hint": "Catch the error raised by int for non-integer text.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (parse(\"7\")) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"7\") evaluates to 7. Catch the error raised by int for non-integer text.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (parse(\"bad\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"bad\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (parse(\"2.5\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"2.5\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (parse(\"-3\")) \u2014 no quotes",
            "answer": "-3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"-3\") evaluates to -3. Catch the error raised by int for non-integer text.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (parse(\" 7 \")) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\" 7 \") evaluates to 7. Catch the error raised by int for non-integer text.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (parse(\"\")) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "parse(\"\") evaluates to -1. Catch the error raised by int for non-integer text.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 37,
    "focus": "robust code",
    "title": "Check a range before use",
    "format": "Complete the code",
    "tags": [
      "robust code",
      "CA2.8",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def valid(value):\n    return ___\nprint(valid(3 - 1), valid(3), valid(3 + 4), valid(3 + 5), valid(0))",
        "hint": "Test just below, on, and just above each inclusive boundary.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Accept both endpoints of the shown interval. Complete the return expression.",
            "answer": "3 <= value <= 3 + 4",
            "marks": 1,
            "explanation": "Test just below, on, and just above each inclusive boundary.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (valid(3 - 1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(3 - 1) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (valid(3)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(3) evaluates to True. Test just below, on, and just above each inclusive boundary.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (valid(3 + 4)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(3 + 4) evaluates to True. Test just below, on, and just above each inclusive boundary.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (valid(3 + 5)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(3 + 5) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (valid(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(0) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def valid(value):\n    return ___\nprint(valid(4 - 1), valid(4), valid(4 + 4), valid(4 + 5), valid(0))",
        "hint": "Test just below, on, and just above each inclusive boundary.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Accept both endpoints of the shown interval. Complete the return expression.",
            "answer": "4 <= value <= 4 + 4",
            "marks": 1,
            "explanation": "Test just below, on, and just above each inclusive boundary.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (valid(4 - 1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(4 - 1) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (valid(4)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(4) evaluates to True. Test just below, on, and just above each inclusive boundary.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (valid(4 + 4)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(4 + 4) evaluates to True. Test just below, on, and just above each inclusive boundary.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (valid(4 + 5)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(4 + 5) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (valid(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(0) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def valid(value):\n    return ___\nprint(valid(5 - 1), valid(5), valid(5 + 4), valid(5 + 5), valid(0))",
        "hint": "Test just below, on, and just above each inclusive boundary.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Accept both endpoints of the shown interval. Complete the return expression.",
            "answer": "5 <= value <= 5 + 4",
            "marks": 1,
            "explanation": "Test just below, on, and just above each inclusive boundary.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (valid(5 - 1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(5 - 1) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (valid(5)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(5) evaluates to True. Test just below, on, and just above each inclusive boundary.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (valid(5 + 4)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(5 + 4) evaluates to True. Test just below, on, and just above each inclusive boundary.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (valid(5 + 5)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(5 + 5) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (valid(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(0) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def valid(value):\n    return ___\nprint(valid(6 - 1), valid(6), valid(6 + 4), valid(6 + 5), valid(0))",
        "hint": "Test just below, on, and just above each inclusive boundary.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Accept both endpoints of the shown interval. Complete the return expression.",
            "answer": "6 <= value <= 6 + 4",
            "marks": 1,
            "explanation": "Test just below, on, and just above each inclusive boundary.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (valid(6 - 1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(6 - 1) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (valid(6)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(6) evaluates to True. Test just below, on, and just above each inclusive boundary.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (valid(6 + 4)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(6 + 4) evaluates to True. Test just below, on, and just above each inclusive boundary.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (valid(6 + 5)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(6 + 5) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (valid(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(0) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def valid(value):\n    return ___\nprint(valid(7 - 1), valid(7), valid(7 + 4), valid(7 + 5), valid(0))",
        "hint": "Test just below, on, and just above each inclusive boundary.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Accept both endpoints of the shown interval. Complete the return expression.",
            "answer": "7 <= value <= 7 + 4",
            "marks": 1,
            "explanation": "Test just below, on, and just above each inclusive boundary.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (valid(7 - 1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(7 - 1) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (valid(7)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(7) evaluates to True. Test just below, on, and just above each inclusive boundary.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (valid(7 + 4)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(7 + 4) evaluates to True. Test just below, on, and just above each inclusive boundary.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (valid(7 + 5)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(7 + 5) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (valid(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(0) evaluates to False. Test just below, on, and just above each inclusive boundary.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 38,
    "focus": "robust code",
    "title": "Validate a short code",
    "format": "Fix the code",
    "tags": [
      "robust code",
      "CA2.8",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def valid(text):\n    return len(text) == 3 or text.isdigit()\ncode = \"323\"\nprint(valid(code), valid(\"12\"), valid(\"abc\"), valid(\"1234\"), valid(\"007\"))",
        "hint": "Length and character checks must both succeed.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Accept exactly three digit characters. Repair the return expression.",
            "answer": "len(text) == 3 and text.isdigit()",
            "marks": 1,
            "explanation": "Length and character checks must both succeed.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (valid(code)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(code) evaluates to True. Length and character checks must both succeed.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (valid(\"12\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"12\") evaluates to False. Length and character checks must both succeed.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (valid(\"abc\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"abc\") evaluates to False. Length and character checks must both succeed.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (valid(\"1234\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"1234\") evaluates to False. Length and character checks must both succeed.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (valid(\"007\")) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"007\") evaluates to True. Length and character checks must both succeed.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def valid(text):\n    return len(text) == 3 or text.isdigit()\ncode = \"423\"\nprint(valid(code), valid(\"12\"), valid(\"abc\"), valid(\"1234\"), valid(\"007\"))",
        "hint": "Length and character checks must both succeed.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Accept exactly three digit characters. Repair the return expression.",
            "answer": "len(text) == 3 and text.isdigit()",
            "marks": 1,
            "explanation": "Length and character checks must both succeed.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (valid(code)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(code) evaluates to True. Length and character checks must both succeed.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (valid(\"12\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"12\") evaluates to False. Length and character checks must both succeed.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (valid(\"abc\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"abc\") evaluates to False. Length and character checks must both succeed.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (valid(\"1234\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"1234\") evaluates to False. Length and character checks must both succeed.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (valid(\"007\")) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"007\") evaluates to True. Length and character checks must both succeed.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def valid(text):\n    return len(text) == 3 or text.isdigit()\ncode = \"523\"\nprint(valid(code), valid(\"12\"), valid(\"abc\"), valid(\"1234\"), valid(\"007\"))",
        "hint": "Length and character checks must both succeed.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Accept exactly three digit characters. Repair the return expression.",
            "answer": "len(text) == 3 and text.isdigit()",
            "marks": 1,
            "explanation": "Length and character checks must both succeed.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (valid(code)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(code) evaluates to True. Length and character checks must both succeed.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (valid(\"12\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"12\") evaluates to False. Length and character checks must both succeed.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (valid(\"abc\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"abc\") evaluates to False. Length and character checks must both succeed.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (valid(\"1234\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"1234\") evaluates to False. Length and character checks must both succeed.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (valid(\"007\")) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"007\") evaluates to True. Length and character checks must both succeed.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def valid(text):\n    return len(text) == 3 or text.isdigit()\ncode = \"623\"\nprint(valid(code), valid(\"12\"), valid(\"abc\"), valid(\"1234\"), valid(\"007\"))",
        "hint": "Length and character checks must both succeed.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Accept exactly three digit characters. Repair the return expression.",
            "answer": "len(text) == 3 and text.isdigit()",
            "marks": 1,
            "explanation": "Length and character checks must both succeed.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (valid(code)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(code) evaluates to True. Length and character checks must both succeed.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (valid(\"12\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"12\") evaluates to False. Length and character checks must both succeed.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (valid(\"abc\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"abc\") evaluates to False. Length and character checks must both succeed.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (valid(\"1234\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"1234\") evaluates to False. Length and character checks must both succeed.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (valid(\"007\")) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"007\") evaluates to True. Length and character checks must both succeed.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def valid(text):\n    return len(text) == 3 or text.isdigit()\ncode = \"723\"\nprint(valid(code), valid(\"12\"), valid(\"abc\"), valid(\"1234\"), valid(\"007\"))",
        "hint": "Length and character checks must both succeed.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Accept exactly three digit characters. Repair the return expression.",
            "answer": "len(text) == 3 and text.isdigit()",
            "marks": 1,
            "explanation": "Length and character checks must both succeed.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (valid(code)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(code) evaluates to True. Length and character checks must both succeed.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (valid(\"12\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"12\") evaluates to False. Length and character checks must both succeed.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (valid(\"abc\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"abc\") evaluates to False. Length and character checks must both succeed.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (valid(\"1234\")) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"1234\") evaluates to False. Length and character checks must both succeed.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (valid(\"007\")) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "valid(\"007\") evaluates to True. Length and character checks must both succeed.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 39,
    "focus": "testing",
    "title": "Expose an off-by-one bug",
    "format": "Predict the output",
    "tags": [
      "testing",
      "CA2.12",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def admitted(age):\n    return age > 3\n# Requirement: accept ages at least 3.\nprint(admitted(3 - 1), admitted(3), admitted(3 + 1), admitted(0), admitted(3 + 2), admitted(3) == True)",
        "hint": "Trace the actual implementation, including its boundary error.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (admitted(3 - 1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(3 - 1) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (admitted(3)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(3) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (admitted(3 + 1)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(3 + 1) evaluates to True. Trace the actual implementation, including its boundary error.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (admitted(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(0) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (admitted(3 + 2)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(3 + 2) evaluates to True. Trace the actual implementation, including its boundary error.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (admitted(3) == True) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(3) == True evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def admitted(age):\n    return age > 4\n# Requirement: accept ages at least 4.\nprint(admitted(4 - 1), admitted(4), admitted(4 + 1), admitted(0), admitted(4 + 2), admitted(4) == True)",
        "hint": "Trace the actual implementation, including its boundary error.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (admitted(4 - 1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(4 - 1) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (admitted(4)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(4) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (admitted(4 + 1)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(4 + 1) evaluates to True. Trace the actual implementation, including its boundary error.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (admitted(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(0) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (admitted(4 + 2)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(4 + 2) evaluates to True. Trace the actual implementation, including its boundary error.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (admitted(4) == True) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(4) == True evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def admitted(age):\n    return age > 5\n# Requirement: accept ages at least 5.\nprint(admitted(5 - 1), admitted(5), admitted(5 + 1), admitted(0), admitted(5 + 2), admitted(5) == True)",
        "hint": "Trace the actual implementation, including its boundary error.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (admitted(5 - 1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(5 - 1) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (admitted(5)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(5) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (admitted(5 + 1)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(5 + 1) evaluates to True. Trace the actual implementation, including its boundary error.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (admitted(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(0) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (admitted(5 + 2)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(5 + 2) evaluates to True. Trace the actual implementation, including its boundary error.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (admitted(5) == True) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(5) == True evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def admitted(age):\n    return age > 6\n# Requirement: accept ages at least 6.\nprint(admitted(6 - 1), admitted(6), admitted(6 + 1), admitted(0), admitted(6 + 2), admitted(6) == True)",
        "hint": "Trace the actual implementation, including its boundary error.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (admitted(6 - 1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(6 - 1) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (admitted(6)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(6) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (admitted(6 + 1)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(6 + 1) evaluates to True. Trace the actual implementation, including its boundary error.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (admitted(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(0) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (admitted(6 + 2)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(6 + 2) evaluates to True. Trace the actual implementation, including its boundary error.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (admitted(6) == True) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(6) == True evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def admitted(age):\n    return age > 7\n# Requirement: accept ages at least 7.\nprint(admitted(7 - 1), admitted(7), admitted(7 + 1), admitted(0), admitted(7 + 2), admitted(7) == True)",
        "hint": "Trace the actual implementation, including its boundary error.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (admitted(7 - 1)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(7 - 1) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (admitted(7)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(7) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (admitted(7 + 1)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(7 + 1) evaluates to True. Trace the actual implementation, including its boundary error.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (admitted(0)) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(0) evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (admitted(7 + 2)) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(7 + 2) evaluates to True. Trace the actual implementation, including its boundary error.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (admitted(7) == True) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "admitted(7) == True evaluates to False. Trace the actual implementation, including its boundary error.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 40,
    "focus": "testing",
    "title": "Trace assertions",
    "format": "Complete the code",
    "tags": [
      "testing",
      "CA2.12",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def double(value):\n    return ___\nx = 3\nprint(double(x) == 2 * x, double(0) == 0, double(-x) == -2 * x, double(x) == x, double(x + 1) - double(x))",
        "hint": "An assertion would pass when its tested expression is true.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The function must double every input, including zero and negative values. Complete the return expression.",
            "answer": "value * 2",
            "marks": 1,
            "explanation": "An assertion would pass when its tested expression is true.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (double(x) == 2 * x) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x) == 2 * x evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (double(0) == 0) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(0) == 0 evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (double(-x) == -2 * x) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(-x) == -2 * x evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (double(x) == x) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x) == x evaluates to False. An assertion would pass when its tested expression is true.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (double(x + 1) - double(x)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x + 1) - double(x) evaluates to 2. An assertion would pass when its tested expression is true.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def double(value):\n    return ___\nx = 4\nprint(double(x) == 2 * x, double(0) == 0, double(-x) == -2 * x, double(x) == x, double(x + 1) - double(x))",
        "hint": "An assertion would pass when its tested expression is true.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The function must double every input, including zero and negative values. Complete the return expression.",
            "answer": "value * 2",
            "marks": 1,
            "explanation": "An assertion would pass when its tested expression is true.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (double(x) == 2 * x) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x) == 2 * x evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (double(0) == 0) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(0) == 0 evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (double(-x) == -2 * x) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(-x) == -2 * x evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (double(x) == x) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x) == x evaluates to False. An assertion would pass when its tested expression is true.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (double(x + 1) - double(x)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x + 1) - double(x) evaluates to 2. An assertion would pass when its tested expression is true.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def double(value):\n    return ___\nx = 5\nprint(double(x) == 2 * x, double(0) == 0, double(-x) == -2 * x, double(x) == x, double(x + 1) - double(x))",
        "hint": "An assertion would pass when its tested expression is true.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The function must double every input, including zero and negative values. Complete the return expression.",
            "answer": "value * 2",
            "marks": 1,
            "explanation": "An assertion would pass when its tested expression is true.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (double(x) == 2 * x) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x) == 2 * x evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (double(0) == 0) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(0) == 0 evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (double(-x) == -2 * x) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(-x) == -2 * x evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (double(x) == x) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x) == x evaluates to False. An assertion would pass when its tested expression is true.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (double(x + 1) - double(x)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x + 1) - double(x) evaluates to 2. An assertion would pass when its tested expression is true.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def double(value):\n    return ___\nx = 6\nprint(double(x) == 2 * x, double(0) == 0, double(-x) == -2 * x, double(x) == x, double(x + 1) - double(x))",
        "hint": "An assertion would pass when its tested expression is true.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The function must double every input, including zero and negative values. Complete the return expression.",
            "answer": "value * 2",
            "marks": 1,
            "explanation": "An assertion would pass when its tested expression is true.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (double(x) == 2 * x) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x) == 2 * x evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (double(0) == 0) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(0) == 0 evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (double(-x) == -2 * x) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(-x) == -2 * x evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (double(x) == x) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x) == x evaluates to False. An assertion would pass when its tested expression is true.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (double(x + 1) - double(x)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x + 1) - double(x) evaluates to 2. An assertion would pass when its tested expression is true.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def double(value):\n    return ___\nx = 7\nprint(double(x) == 2 * x, double(0) == 0, double(-x) == -2 * x, double(x) == x, double(x + 1) - double(x))",
        "hint": "An assertion would pass when its tested expression is true.",
        "parts": [
          {
            "kind": "code",
            "prompt": "The function must double every input, including zero and negative values. Complete the return expression.",
            "answer": "value * 2",
            "marks": 1,
            "explanation": "An assertion would pass when its tested expression is true.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (double(x) == 2 * x) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x) == 2 * x evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (double(0) == 0) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(0) == 0 evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (double(-x) == -2 * x) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(-x) == -2 * x evaluates to True. An assertion would pass when its tested expression is true.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (double(x) == x) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x) == x evaluates to False. An assertion would pass when its tested expression is true.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (double(x + 1) - double(x)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "double(x + 1) - double(x) evaluates to 2. An assertion would pass when its tested expression is true.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 41,
    "focus": "testing",
    "title": "Distinguish empty input",
    "format": "Fix the code",
    "tags": [
      "testing",
      "CA2.12",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def mean(values):\n    if values:\n        return None\n    return sum(values) / len(values)\nprint(mean([]) is None, mean([3]), mean([3, 3 + 2]), mean([0]), mean([-2, 2]))",
        "hint": "The empty case returns before division by the list length.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Return None only for an empty list. Repair the if header, including the colon.",
            "answer": "if not values:",
            "marks": 1,
            "explanation": "The empty case returns before division by the list length.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (mean([]) is None) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([]) is None evaluates to True. The empty case returns before division by the list length.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (mean([3])) \u2014 no quotes",
            "answer": "3.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([3]) evaluates to 3.0. The empty case returns before division by the list length.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (mean([3, 3 + 2])) \u2014 no quotes",
            "answer": "4.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([3, 3 + 2]) evaluates to 4.0. The empty case returns before division by the list length.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (mean([0])) \u2014 no quotes",
            "answer": "0.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([0]) evaluates to 0.0. The empty case returns before division by the list length.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (mean([-2, 2])) \u2014 no quotes",
            "answer": "0.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([-2, 2]) evaluates to 0.0. The empty case returns before division by the list length.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def mean(values):\n    if values:\n        return None\n    return sum(values) / len(values)\nprint(mean([]) is None, mean([4]), mean([4, 4 + 2]), mean([0]), mean([-2, 2]))",
        "hint": "The empty case returns before division by the list length.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Return None only for an empty list. Repair the if header, including the colon.",
            "answer": "if not values:",
            "marks": 1,
            "explanation": "The empty case returns before division by the list length.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (mean([]) is None) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([]) is None evaluates to True. The empty case returns before division by the list length.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (mean([4])) \u2014 no quotes",
            "answer": "4.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([4]) evaluates to 4.0. The empty case returns before division by the list length.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (mean([4, 4 + 2])) \u2014 no quotes",
            "answer": "5.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([4, 4 + 2]) evaluates to 5.0. The empty case returns before division by the list length.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (mean([0])) \u2014 no quotes",
            "answer": "0.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([0]) evaluates to 0.0. The empty case returns before division by the list length.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (mean([-2, 2])) \u2014 no quotes",
            "answer": "0.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([-2, 2]) evaluates to 0.0. The empty case returns before division by the list length.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def mean(values):\n    if values:\n        return None\n    return sum(values) / len(values)\nprint(mean([]) is None, mean([5]), mean([5, 5 + 2]), mean([0]), mean([-2, 2]))",
        "hint": "The empty case returns before division by the list length.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Return None only for an empty list. Repair the if header, including the colon.",
            "answer": "if not values:",
            "marks": 1,
            "explanation": "The empty case returns before division by the list length.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (mean([]) is None) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([]) is None evaluates to True. The empty case returns before division by the list length.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (mean([5])) \u2014 no quotes",
            "answer": "5.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([5]) evaluates to 5.0. The empty case returns before division by the list length.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (mean([5, 5 + 2])) \u2014 no quotes",
            "answer": "6.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([5, 5 + 2]) evaluates to 6.0. The empty case returns before division by the list length.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (mean([0])) \u2014 no quotes",
            "answer": "0.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([0]) evaluates to 0.0. The empty case returns before division by the list length.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (mean([-2, 2])) \u2014 no quotes",
            "answer": "0.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([-2, 2]) evaluates to 0.0. The empty case returns before division by the list length.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def mean(values):\n    if values:\n        return None\n    return sum(values) / len(values)\nprint(mean([]) is None, mean([6]), mean([6, 6 + 2]), mean([0]), mean([-2, 2]))",
        "hint": "The empty case returns before division by the list length.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Return None only for an empty list. Repair the if header, including the colon.",
            "answer": "if not values:",
            "marks": 1,
            "explanation": "The empty case returns before division by the list length.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (mean([]) is None) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([]) is None evaluates to True. The empty case returns before division by the list length.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (mean([6])) \u2014 no quotes",
            "answer": "6.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([6]) evaluates to 6.0. The empty case returns before division by the list length.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (mean([6, 6 + 2])) \u2014 no quotes",
            "answer": "7.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([6, 6 + 2]) evaluates to 7.0. The empty case returns before division by the list length.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (mean([0])) \u2014 no quotes",
            "answer": "0.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([0]) evaluates to 0.0. The empty case returns before division by the list length.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (mean([-2, 2])) \u2014 no quotes",
            "answer": "0.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([-2, 2]) evaluates to 0.0. The empty case returns before division by the list length.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def mean(values):\n    if values:\n        return None\n    return sum(values) / len(values)\nprint(mean([]) is None, mean([7]), mean([7, 7 + 2]), mean([0]), mean([-2, 2]))",
        "hint": "The empty case returns before division by the list length.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Return None only for an empty list. Repair the if header, including the colon.",
            "answer": "if not values:",
            "marks": 1,
            "explanation": "The empty case returns before division by the list length.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (mean([]) is None) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([]) is None evaluates to True. The empty case returns before division by the list length.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (mean([7])) \u2014 no quotes",
            "answer": "7.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([7]) evaluates to 7.0. The empty case returns before division by the list length.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (mean([7, 7 + 2])) \u2014 no quotes",
            "answer": "8.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([7, 7 + 2]) evaluates to 8.0. The empty case returns before division by the list length.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (mean([0])) \u2014 no quotes",
            "answer": "0.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([0]) evaluates to 0.0. The empty case returns before division by the list length.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (mean([-2, 2])) \u2014 no quotes",
            "answer": "0.0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "mean([-2, 2]) evaluates to 0.0. The empty case returns before division by the list length.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 42,
    "focus": "sorting",
    "title": "Trace insertion into a prefix",
    "format": "Predict the output",
    "tags": [
      "sorting",
      "CA2.11",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [2, 5, 3 + 6, 1]\nkey = values[3]\nindex = 2\nwhile index >= 0 and values[index] > key:\n    values[index + 1] = values[index]\n    index -= 1\nvalues[index + 1] = key\nprint(values[0], values[1], values[2], values[3], index, key)",
        "hint": "Shift larger items right, then insert the key into the gap.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (values[0]) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 1. Shift larger items right, then insert the key into the gap.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (values[1]) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[1] evaluates to 2. Shift larger items right, then insert the key into the gap.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[2]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[2] evaluates to 5. Shift larger items right, then insert the key into the gap.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[3]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[3] evaluates to 9. Shift larger items right, then insert the key into the gap.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (index) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "index evaluates to -1. Shift larger items right, then insert the key into the gap.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (key) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "key evaluates to 1. Shift larger items right, then insert the key into the gap.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [2, 5, 4 + 6, 1]\nkey = values[3]\nindex = 2\nwhile index >= 0 and values[index] > key:\n    values[index + 1] = values[index]\n    index -= 1\nvalues[index + 1] = key\nprint(values[0], values[1], values[2], values[3], index, key)",
        "hint": "Shift larger items right, then insert the key into the gap.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (values[0]) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 1. Shift larger items right, then insert the key into the gap.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (values[1]) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[1] evaluates to 2. Shift larger items right, then insert the key into the gap.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[2]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[2] evaluates to 5. Shift larger items right, then insert the key into the gap.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[3]) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[3] evaluates to 10. Shift larger items right, then insert the key into the gap.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (index) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "index evaluates to -1. Shift larger items right, then insert the key into the gap.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (key) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "key evaluates to 1. Shift larger items right, then insert the key into the gap.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [2, 5, 5 + 6, 1]\nkey = values[3]\nindex = 2\nwhile index >= 0 and values[index] > key:\n    values[index + 1] = values[index]\n    index -= 1\nvalues[index + 1] = key\nprint(values[0], values[1], values[2], values[3], index, key)",
        "hint": "Shift larger items right, then insert the key into the gap.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (values[0]) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 1. Shift larger items right, then insert the key into the gap.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (values[1]) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[1] evaluates to 2. Shift larger items right, then insert the key into the gap.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[2]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[2] evaluates to 5. Shift larger items right, then insert the key into the gap.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[3]) \u2014 no quotes",
            "answer": "11",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[3] evaluates to 11. Shift larger items right, then insert the key into the gap.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (index) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "index evaluates to -1. Shift larger items right, then insert the key into the gap.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (key) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "key evaluates to 1. Shift larger items right, then insert the key into the gap.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [2, 5, 6 + 6, 1]\nkey = values[3]\nindex = 2\nwhile index >= 0 and values[index] > key:\n    values[index + 1] = values[index]\n    index -= 1\nvalues[index + 1] = key\nprint(values[0], values[1], values[2], values[3], index, key)",
        "hint": "Shift larger items right, then insert the key into the gap.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (values[0]) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 1. Shift larger items right, then insert the key into the gap.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (values[1]) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[1] evaluates to 2. Shift larger items right, then insert the key into the gap.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[2]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[2] evaluates to 5. Shift larger items right, then insert the key into the gap.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[3]) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[3] evaluates to 12. Shift larger items right, then insert the key into the gap.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (index) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "index evaluates to -1. Shift larger items right, then insert the key into the gap.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (key) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "key evaluates to 1. Shift larger items right, then insert the key into the gap.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [2, 5, 7 + 6, 1]\nkey = values[3]\nindex = 2\nwhile index >= 0 and values[index] > key:\n    values[index + 1] = values[index]\n    index -= 1\nvalues[index + 1] = key\nprint(values[0], values[1], values[2], values[3], index, key)",
        "hint": "Shift larger items right, then insert the key into the gap.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (values[0]) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 1. Shift larger items right, then insert the key into the gap.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (values[1]) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[1] evaluates to 2. Shift larger items right, then insert the key into the gap.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[2]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[2] evaluates to 5. Shift larger items right, then insert the key into the gap.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[3]) \u2014 no quotes",
            "answer": "13",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[3] evaluates to 13. Shift larger items right, then insert the key into the gap.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (index) \u2014 no quotes",
            "answer": "-1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "index evaluates to -1. Shift larger items right, then insert the key into the gap.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (key) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "key evaluates to 1. Shift larger items right, then insert the key into the gap.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 43,
    "focus": "sorting",
    "title": "Merge two ordered pairs",
    "format": "Complete the code",
    "tags": [
      "sorting",
      "CA2.11",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "left = [3, 3 + 4]\nright = [3 + 1, 3 + 3]\nmerged = []\nwhile left and right:\n    source = left if ___ else right\n    merged.append(source.pop(0))\nmerged.extend(left or right)\nprint(merged[0], merged[1], merged[2], merged[3], len(left))",
        "hint": "Always take the smaller first item; append the remaining tail.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Take the smaller available leading value while merging ascending lists. Complete the comparison.",
            "answer": "left[0] <= right[0]",
            "marks": 1,
            "explanation": "Always take the smaller first item; append the remaining tail.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (merged[0]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[0] evaluates to 3. Always take the smaller first item; append the remaining tail.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (merged[1]) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[1] evaluates to 4. Always take the smaller first item; append the remaining tail.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (merged[2]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[2] evaluates to 6. Always take the smaller first item; append the remaining tail.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (merged[3]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[3] evaluates to 7. Always take the smaller first item; append the remaining tail.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(left)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(left) evaluates to 1. Always take the smaller first item; append the remaining tail.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "left = [4, 4 + 4]\nright = [4 + 1, 4 + 3]\nmerged = []\nwhile left and right:\n    source = left if ___ else right\n    merged.append(source.pop(0))\nmerged.extend(left or right)\nprint(merged[0], merged[1], merged[2], merged[3], len(left))",
        "hint": "Always take the smaller first item; append the remaining tail.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Take the smaller available leading value while merging ascending lists. Complete the comparison.",
            "answer": "left[0] <= right[0]",
            "marks": 1,
            "explanation": "Always take the smaller first item; append the remaining tail.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (merged[0]) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[0] evaluates to 4. Always take the smaller first item; append the remaining tail.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (merged[1]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[1] evaluates to 5. Always take the smaller first item; append the remaining tail.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (merged[2]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[2] evaluates to 7. Always take the smaller first item; append the remaining tail.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (merged[3]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[3] evaluates to 8. Always take the smaller first item; append the remaining tail.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(left)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(left) evaluates to 1. Always take the smaller first item; append the remaining tail.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "left = [5, 5 + 4]\nright = [5 + 1, 5 + 3]\nmerged = []\nwhile left and right:\n    source = left if ___ else right\n    merged.append(source.pop(0))\nmerged.extend(left or right)\nprint(merged[0], merged[1], merged[2], merged[3], len(left))",
        "hint": "Always take the smaller first item; append the remaining tail.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Take the smaller available leading value while merging ascending lists. Complete the comparison.",
            "answer": "left[0] <= right[0]",
            "marks": 1,
            "explanation": "Always take the smaller first item; append the remaining tail.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (merged[0]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[0] evaluates to 5. Always take the smaller first item; append the remaining tail.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (merged[1]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[1] evaluates to 6. Always take the smaller first item; append the remaining tail.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (merged[2]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[2] evaluates to 8. Always take the smaller first item; append the remaining tail.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (merged[3]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[3] evaluates to 9. Always take the smaller first item; append the remaining tail.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(left)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(left) evaluates to 1. Always take the smaller first item; append the remaining tail.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "left = [6, 6 + 4]\nright = [6 + 1, 6 + 3]\nmerged = []\nwhile left and right:\n    source = left if ___ else right\n    merged.append(source.pop(0))\nmerged.extend(left or right)\nprint(merged[0], merged[1], merged[2], merged[3], len(left))",
        "hint": "Always take the smaller first item; append the remaining tail.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Take the smaller available leading value while merging ascending lists. Complete the comparison.",
            "answer": "left[0] <= right[0]",
            "marks": 1,
            "explanation": "Always take the smaller first item; append the remaining tail.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (merged[0]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[0] evaluates to 6. Always take the smaller first item; append the remaining tail.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (merged[1]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[1] evaluates to 7. Always take the smaller first item; append the remaining tail.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (merged[2]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[2] evaluates to 9. Always take the smaller first item; append the remaining tail.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (merged[3]) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[3] evaluates to 10. Always take the smaller first item; append the remaining tail.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(left)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(left) evaluates to 1. Always take the smaller first item; append the remaining tail.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "left = [7, 7 + 4]\nright = [7 + 1, 7 + 3]\nmerged = []\nwhile left and right:\n    source = left if ___ else right\n    merged.append(source.pop(0))\nmerged.extend(left or right)\nprint(merged[0], merged[1], merged[2], merged[3], len(left))",
        "hint": "Always take the smaller first item; append the remaining tail.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Take the smaller available leading value while merging ascending lists. Complete the comparison.",
            "answer": "left[0] <= right[0]",
            "marks": 1,
            "explanation": "Always take the smaller first item; append the remaining tail.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (merged[0]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[0] evaluates to 7. Always take the smaller first item; append the remaining tail.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (merged[1]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[1] evaluates to 8. Always take the smaller first item; append the remaining tail.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (merged[2]) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[2] evaluates to 10. Always take the smaller first item; append the remaining tail.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (merged[3]) \u2014 no quotes",
            "answer": "11",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "merged[3] evaluates to 11. Always take the smaller first item; append the remaining tail.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(left)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(left) evaluates to 1. Always take the smaller first item; append the remaining tail.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 44,
    "focus": "sorting",
    "title": "Separate sorted from sort",
    "format": "Fix the code",
    "tags": [
      "sorting",
      "CA2.11",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [3 + 2, 3, 3 + 1]\ncopy = values.sort()\nresult = values.sort(reverse=True)\nprint(copy[0], copy[-1], values[0], values[-1], result is None)",
        "hint": "sorted creates a new list; list.sort changes the list and returns None.",
        "parts": [
          {
            "kind": "code",
            "prompt": "copy must receive a new ascending list without altering values at this step. Repair its expression.",
            "answer": "sorted(values)",
            "marks": 1,
            "explanation": "sorted creates a new list; list.sort changes the list and returns None.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (copy[0]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[0] evaluates to 3. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (copy[-1]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[-1] evaluates to 5. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[0]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 5. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[-1]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 3. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (result is None) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "result is None evaluates to True. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [4 + 2, 4, 4 + 1]\ncopy = values.sort()\nresult = values.sort(reverse=True)\nprint(copy[0], copy[-1], values[0], values[-1], result is None)",
        "hint": "sorted creates a new list; list.sort changes the list and returns None.",
        "parts": [
          {
            "kind": "code",
            "prompt": "copy must receive a new ascending list without altering values at this step. Repair its expression.",
            "answer": "sorted(values)",
            "marks": 1,
            "explanation": "sorted creates a new list; list.sort changes the list and returns None.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (copy[0]) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[0] evaluates to 4. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (copy[-1]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[-1] evaluates to 6. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[0]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 6. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[-1]) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 4. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (result is None) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "result is None evaluates to True. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [5 + 2, 5, 5 + 1]\ncopy = values.sort()\nresult = values.sort(reverse=True)\nprint(copy[0], copy[-1], values[0], values[-1], result is None)",
        "hint": "sorted creates a new list; list.sort changes the list and returns None.",
        "parts": [
          {
            "kind": "code",
            "prompt": "copy must receive a new ascending list without altering values at this step. Repair its expression.",
            "answer": "sorted(values)",
            "marks": 1,
            "explanation": "sorted creates a new list; list.sort changes the list and returns None.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (copy[0]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[0] evaluates to 5. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (copy[-1]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[-1] evaluates to 7. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[0]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 7. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[-1]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 5. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (result is None) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "result is None evaluates to True. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [6 + 2, 6, 6 + 1]\ncopy = values.sort()\nresult = values.sort(reverse=True)\nprint(copy[0], copy[-1], values[0], values[-1], result is None)",
        "hint": "sorted creates a new list; list.sort changes the list and returns None.",
        "parts": [
          {
            "kind": "code",
            "prompt": "copy must receive a new ascending list without altering values at this step. Repair its expression.",
            "answer": "sorted(values)",
            "marks": 1,
            "explanation": "sorted creates a new list; list.sort changes the list and returns None.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (copy[0]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[0] evaluates to 6. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (copy[-1]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[-1] evaluates to 8. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[0]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 8. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[-1]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 6. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (result is None) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "result is None evaluates to True. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [7 + 2, 7, 7 + 1]\ncopy = values.sort()\nresult = values.sort(reverse=True)\nprint(copy[0], copy[-1], values[0], values[-1], result is None)",
        "hint": "sorted creates a new list; list.sort changes the list and returns None.",
        "parts": [
          {
            "kind": "code",
            "prompt": "copy must receive a new ascending list without altering values at this step. Repair its expression.",
            "answer": "sorted(values)",
            "marks": 1,
            "explanation": "sorted creates a new list; list.sort changes the list and returns None.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (copy[0]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[0] evaluates to 7. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (copy[-1]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "copy[-1] evaluates to 9. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[0]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 9. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (values[-1]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 7. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (result is None) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "result is None evaluates to True. sorted creates a new list; list.sort changes the list and returns None.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 45,
    "focus": "design",
    "title": "Compose small functions",
    "format": "Predict the output",
    "tags": [
      "design",
      "CA1.1",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def area(width, height):\n    return width * height\ndef cost(width, height):\n    return area(width, height) * 2\nprint(area(3, 3), cost(3, 3), area(0, 3), cost(1, 3), area(3, 3), cost(2, 2))",
        "hint": "Use each function as a small named step; pass the returned value onwards.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (area(3, 3)) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(3, 3) evaluates to 9. Use each function as a small named step; pass the returned value onwards.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (cost(3, 3)) \u2014 no quotes",
            "answer": "18",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(3, 3) evaluates to 18. Use each function as a small named step; pass the returned value onwards.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (area(0, 3)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(0, 3) evaluates to 0. Use each function as a small named step; pass the returned value onwards.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (cost(1, 3)) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(1, 3) evaluates to 6. Use each function as a small named step; pass the returned value onwards.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (area(3, 3)) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(3, 3) evaluates to 9. Use each function as a small named step; pass the returned value onwards.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (cost(2, 2)) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(2, 2) evaluates to 8. Use each function as a small named step; pass the returned value onwards.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def area(width, height):\n    return width * height\ndef cost(width, height):\n    return area(width, height) * 2\nprint(area(4, 3), cost(4, 3), area(0, 4), cost(1, 4), area(4, 4), cost(2, 2))",
        "hint": "Use each function as a small named step; pass the returned value onwards.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (area(4, 3)) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(4, 3) evaluates to 12. Use each function as a small named step; pass the returned value onwards.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (cost(4, 3)) \u2014 no quotes",
            "answer": "24",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(4, 3) evaluates to 24. Use each function as a small named step; pass the returned value onwards.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (area(0, 4)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(0, 4) evaluates to 0. Use each function as a small named step; pass the returned value onwards.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (cost(1, 4)) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(1, 4) evaluates to 8. Use each function as a small named step; pass the returned value onwards.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (area(4, 4)) \u2014 no quotes",
            "answer": "16",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(4, 4) evaluates to 16. Use each function as a small named step; pass the returned value onwards.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (cost(2, 2)) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(2, 2) evaluates to 8. Use each function as a small named step; pass the returned value onwards.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def area(width, height):\n    return width * height\ndef cost(width, height):\n    return area(width, height) * 2\nprint(area(5, 3), cost(5, 3), area(0, 5), cost(1, 5), area(5, 5), cost(2, 2))",
        "hint": "Use each function as a small named step; pass the returned value onwards.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (area(5, 3)) \u2014 no quotes",
            "answer": "15",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(5, 3) evaluates to 15. Use each function as a small named step; pass the returned value onwards.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (cost(5, 3)) \u2014 no quotes",
            "answer": "30",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(5, 3) evaluates to 30. Use each function as a small named step; pass the returned value onwards.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (area(0, 5)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(0, 5) evaluates to 0. Use each function as a small named step; pass the returned value onwards.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (cost(1, 5)) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(1, 5) evaluates to 10. Use each function as a small named step; pass the returned value onwards.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (area(5, 5)) \u2014 no quotes",
            "answer": "25",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(5, 5) evaluates to 25. Use each function as a small named step; pass the returned value onwards.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (cost(2, 2)) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(2, 2) evaluates to 8. Use each function as a small named step; pass the returned value onwards.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def area(width, height):\n    return width * height\ndef cost(width, height):\n    return area(width, height) * 2\nprint(area(6, 3), cost(6, 3), area(0, 6), cost(1, 6), area(6, 6), cost(2, 2))",
        "hint": "Use each function as a small named step; pass the returned value onwards.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (area(6, 3)) \u2014 no quotes",
            "answer": "18",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(6, 3) evaluates to 18. Use each function as a small named step; pass the returned value onwards.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (cost(6, 3)) \u2014 no quotes",
            "answer": "36",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(6, 3) evaluates to 36. Use each function as a small named step; pass the returned value onwards.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (area(0, 6)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(0, 6) evaluates to 0. Use each function as a small named step; pass the returned value onwards.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (cost(1, 6)) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(1, 6) evaluates to 12. Use each function as a small named step; pass the returned value onwards.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (area(6, 6)) \u2014 no quotes",
            "answer": "36",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(6, 6) evaluates to 36. Use each function as a small named step; pass the returned value onwards.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (cost(2, 2)) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(2, 2) evaluates to 8. Use each function as a small named step; pass the returned value onwards.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def area(width, height):\n    return width * height\ndef cost(width, height):\n    return area(width, height) * 2\nprint(area(7, 3), cost(7, 3), area(0, 7), cost(1, 7), area(7, 7), cost(2, 2))",
        "hint": "Use each function as a small named step; pass the returned value onwards.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (area(7, 3)) \u2014 no quotes",
            "answer": "21",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(7, 3) evaluates to 21. Use each function as a small named step; pass the returned value onwards.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (cost(7, 3)) \u2014 no quotes",
            "answer": "42",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(7, 3) evaluates to 42. Use each function as a small named step; pass the returned value onwards.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (area(0, 7)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(0, 7) evaluates to 0. Use each function as a small named step; pass the returned value onwards.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (cost(1, 7)) \u2014 no quotes",
            "answer": "14",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(1, 7) evaluates to 14. Use each function as a small named step; pass the returned value onwards.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (area(7, 7)) \u2014 no quotes",
            "answer": "49",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "area(7, 7) evaluates to 49. Use each function as a small named step; pass the returned value onwards.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (cost(2, 2)) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "cost(2, 2) evaluates to 8. Use each function as a small named step; pass the returned value onwards.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 46,
    "focus": "design",
    "title": "Keep a constant separate",
    "format": "Complete the code",
    "tags": [
      "design",
      "CA2.2",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "RATE = 3\ndef charge(hours):\n    return ___\nfirst = charge(2)\nprint(RATE, first, charge(3), charge(0), charge(1))",
        "hint": "Uppercase signals a constant by convention; this program never reassigns it.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Charge RATE for each hour. Complete the return expression.",
            "answer": "hours * RATE",
            "marks": 1,
            "explanation": "Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (RATE) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "RATE evaluates to 3. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (first) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 6. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (charge(3)) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(3) evaluates to 9. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (charge(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(0) evaluates to 0. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (charge(1)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(1) evaluates to 3. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "RATE = 4\ndef charge(hours):\n    return ___\nfirst = charge(2)\nprint(RATE, first, charge(3), charge(0), charge(1))",
        "hint": "Uppercase signals a constant by convention; this program never reassigns it.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Charge RATE for each hour. Complete the return expression.",
            "answer": "hours * RATE",
            "marks": 1,
            "explanation": "Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (RATE) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "RATE evaluates to 4. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (first) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 8. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (charge(3)) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(3) evaluates to 12. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (charge(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(0) evaluates to 0. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (charge(1)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(1) evaluates to 4. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "RATE = 5\ndef charge(hours):\n    return ___\nfirst = charge(2)\nprint(RATE, first, charge(3), charge(0), charge(1))",
        "hint": "Uppercase signals a constant by convention; this program never reassigns it.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Charge RATE for each hour. Complete the return expression.",
            "answer": "hours * RATE",
            "marks": 1,
            "explanation": "Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (RATE) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "RATE evaluates to 5. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (first) \u2014 no quotes",
            "answer": "10",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 10. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (charge(3)) \u2014 no quotes",
            "answer": "15",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(3) evaluates to 15. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (charge(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(0) evaluates to 0. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (charge(1)) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(1) evaluates to 5. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "RATE = 6\ndef charge(hours):\n    return ___\nfirst = charge(2)\nprint(RATE, first, charge(3), charge(0), charge(1))",
        "hint": "Uppercase signals a constant by convention; this program never reassigns it.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Charge RATE for each hour. Complete the return expression.",
            "answer": "hours * RATE",
            "marks": 1,
            "explanation": "Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (RATE) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "RATE evaluates to 6. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (first) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 12. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (charge(3)) \u2014 no quotes",
            "answer": "18",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(3) evaluates to 18. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (charge(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(0) evaluates to 0. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (charge(1)) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(1) evaluates to 6. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "RATE = 7\ndef charge(hours):\n    return ___\nfirst = charge(2)\nprint(RATE, first, charge(3), charge(0), charge(1))",
        "hint": "Uppercase signals a constant by convention; this program never reassigns it.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Charge RATE for each hour. Complete the return expression.",
            "answer": "hours * RATE",
            "marks": 1,
            "explanation": "Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (RATE) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "RATE evaluates to 7. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (first) \u2014 no quotes",
            "answer": "14",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "first evaluates to 14. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (charge(3)) \u2014 no quotes",
            "answer": "21",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(3) evaluates to 21. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (charge(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(0) evaluates to 0. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (charge(1)) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "charge(1) evaluates to 7. Uppercase signals a constant by convention; this program never reassigns it.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 47,
    "focus": "design",
    "title": "Trace a recursive base case",
    "format": "Fix the code",
    "tags": [
      "design",
      "extension",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def steps(value):\n    if value <= 0:\n        return 0\n    return 1 + steps(value + 2)\nprint(steps(3), steps(0), steps(1), steps(2), steps(3))",
        "hint": "Each call reduces value by two until the base case returns zero.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Each recursive call must move two units towards the base case. Repair the recursive argument.",
            "answer": "value - 2",
            "marks": 1,
            "explanation": "Each call reduces value by two until the base case returns zero.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (steps(3)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(3) evaluates to 2. Each call reduces value by two until the base case returns zero.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (steps(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(0) evaluates to 0. Each call reduces value by two until the base case returns zero.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (steps(1)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(1) evaluates to 1. Each call reduces value by two until the base case returns zero.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (steps(2)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(2) evaluates to 1. Each call reduces value by two until the base case returns zero.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (steps(3)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(3) evaluates to 2. Each call reduces value by two until the base case returns zero.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def steps(value):\n    if value <= 0:\n        return 0\n    return 1 + steps(value + 2)\nprint(steps(4), steps(0), steps(1), steps(2), steps(3))",
        "hint": "Each call reduces value by two until the base case returns zero.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Each recursive call must move two units towards the base case. Repair the recursive argument.",
            "answer": "value - 2",
            "marks": 1,
            "explanation": "Each call reduces value by two until the base case returns zero.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (steps(4)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(4) evaluates to 2. Each call reduces value by two until the base case returns zero.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (steps(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(0) evaluates to 0. Each call reduces value by two until the base case returns zero.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (steps(1)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(1) evaluates to 1. Each call reduces value by two until the base case returns zero.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (steps(2)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(2) evaluates to 1. Each call reduces value by two until the base case returns zero.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (steps(3)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(3) evaluates to 2. Each call reduces value by two until the base case returns zero.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def steps(value):\n    if value <= 0:\n        return 0\n    return 1 + steps(value + 2)\nprint(steps(5), steps(0), steps(1), steps(2), steps(3))",
        "hint": "Each call reduces value by two until the base case returns zero.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Each recursive call must move two units towards the base case. Repair the recursive argument.",
            "answer": "value - 2",
            "marks": 1,
            "explanation": "Each call reduces value by two until the base case returns zero.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (steps(5)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(5) evaluates to 3. Each call reduces value by two until the base case returns zero.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (steps(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(0) evaluates to 0. Each call reduces value by two until the base case returns zero.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (steps(1)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(1) evaluates to 1. Each call reduces value by two until the base case returns zero.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (steps(2)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(2) evaluates to 1. Each call reduces value by two until the base case returns zero.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (steps(3)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(3) evaluates to 2. Each call reduces value by two until the base case returns zero.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def steps(value):\n    if value <= 0:\n        return 0\n    return 1 + steps(value + 2)\nprint(steps(6), steps(0), steps(1), steps(2), steps(3))",
        "hint": "Each call reduces value by two until the base case returns zero.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Each recursive call must move two units towards the base case. Repair the recursive argument.",
            "answer": "value - 2",
            "marks": 1,
            "explanation": "Each call reduces value by two until the base case returns zero.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (steps(6)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(6) evaluates to 3. Each call reduces value by two until the base case returns zero.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (steps(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(0) evaluates to 0. Each call reduces value by two until the base case returns zero.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (steps(1)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(1) evaluates to 1. Each call reduces value by two until the base case returns zero.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (steps(2)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(2) evaluates to 1. Each call reduces value by two until the base case returns zero.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (steps(3)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(3) evaluates to 2. Each call reduces value by two until the base case returns zero.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "def steps(value):\n    if value <= 0:\n        return 0\n    return 1 + steps(value + 2)\nprint(steps(7), steps(0), steps(1), steps(2), steps(3))",
        "hint": "Each call reduces value by two until the base case returns zero.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Each recursive call must move two units towards the base case. Repair the recursive argument.",
            "answer": "value - 2",
            "marks": 1,
            "explanation": "Each call reduces value by two until the base case returns zero.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (steps(7)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(7) evaluates to 4. Each call reduces value by two until the base case returns zero.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (steps(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(0) evaluates to 0. Each call reduces value by two until the base case returns zero.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (steps(1)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(1) evaluates to 1. Each call reduces value by two until the base case returns zero.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (steps(2)) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(2) evaluates to 1. Each call reduces value by two until the base case returns zero.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (steps(3)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "steps(3) evaluates to 2. Each call reduces value by two until the base case returns zero.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 48,
    "focus": "collections",
    "title": "Remove duplicate readings",
    "format": "Predict the output",
    "tags": [
      "collections",
      "extension",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [3, 3, 8, 8, 9]\nunique = set(values)\nprint(len(values), len(unique), sum(unique), 3 in unique, 0 in unique, len(set()))",
        "hint": "Sets contain distinct values and have no positional order.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(values)) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 5. Sets contain distinct values and have no positional order.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (len(unique)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(unique) evaluates to 3. Sets contain distinct values and have no positional order.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (sum(unique)) \u2014 no quotes",
            "answer": "20",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(unique) evaluates to 20. Sets contain distinct values and have no positional order.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (3 in unique) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "3 in unique evaluates to True. Sets contain distinct values and have no positional order.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (0 in unique) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "0 in unique evaluates to False. Sets contain distinct values and have no positional order.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (len(set())) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(set()) evaluates to 0. Sets contain distinct values and have no positional order.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [4, 4, 8, 8, 9]\nunique = set(values)\nprint(len(values), len(unique), sum(unique), 4 in unique, 0 in unique, len(set()))",
        "hint": "Sets contain distinct values and have no positional order.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(values)) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 5. Sets contain distinct values and have no positional order.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (len(unique)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(unique) evaluates to 3. Sets contain distinct values and have no positional order.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (sum(unique)) \u2014 no quotes",
            "answer": "21",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(unique) evaluates to 21. Sets contain distinct values and have no positional order.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (4 in unique) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "4 in unique evaluates to True. Sets contain distinct values and have no positional order.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (0 in unique) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "0 in unique evaluates to False. Sets contain distinct values and have no positional order.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (len(set())) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(set()) evaluates to 0. Sets contain distinct values and have no positional order.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [5, 5, 8, 8, 9]\nunique = set(values)\nprint(len(values), len(unique), sum(unique), 5 in unique, 0 in unique, len(set()))",
        "hint": "Sets contain distinct values and have no positional order.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(values)) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 5. Sets contain distinct values and have no positional order.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (len(unique)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(unique) evaluates to 3. Sets contain distinct values and have no positional order.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (sum(unique)) \u2014 no quotes",
            "answer": "22",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(unique) evaluates to 22. Sets contain distinct values and have no positional order.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (5 in unique) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "5 in unique evaluates to True. Sets contain distinct values and have no positional order.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (0 in unique) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "0 in unique evaluates to False. Sets contain distinct values and have no positional order.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (len(set())) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(set()) evaluates to 0. Sets contain distinct values and have no positional order.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [6, 6, 8, 8, 9]\nunique = set(values)\nprint(len(values), len(unique), sum(unique), 6 in unique, 0 in unique, len(set()))",
        "hint": "Sets contain distinct values and have no positional order.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(values)) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 5. Sets contain distinct values and have no positional order.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (len(unique)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(unique) evaluates to 3. Sets contain distinct values and have no positional order.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (sum(unique)) \u2014 no quotes",
            "answer": "23",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(unique) evaluates to 23. Sets contain distinct values and have no positional order.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (6 in unique) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "6 in unique evaluates to True. Sets contain distinct values and have no positional order.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (0 in unique) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "0 in unique evaluates to False. Sets contain distinct values and have no positional order.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (len(set())) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(set()) evaluates to 0. Sets contain distinct values and have no positional order.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Predict the six printed values. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [7, 7, 8, 8, 9]\nunique = set(values)\nprint(len(values), len(unique), sum(unique), 7 in unique, 0 in unique, len(set()))",
        "hint": "Sets contain distinct values and have no positional order.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(values)) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 5. Sets contain distinct values and have no positional order.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (len(unique)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(unique) evaluates to 3. Sets contain distinct values and have no positional order.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (sum(unique)) \u2014 no quotes",
            "answer": "24",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(unique) evaluates to 24. Sets contain distinct values and have no positional order.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (7 in unique) \u2014 no quotes",
            "answer": "True",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "7 in unique evaluates to True. Sets contain distinct values and have no positional order.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (0 in unique) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "0 in unique evaluates to False. Sets contain distinct values and have no positional order.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 6 (len(set())) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(set()) evaluates to 0. Sets contain distinct values and have no positional order.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 49,
    "focus": "collections",
    "title": "Build a filtered list",
    "format": "Complete the code",
    "tags": [
      "collections",
      "extension",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [value * 2 for value in range(3) if ___]\nprint(len(values), values[0], values[-1], sum(values), 2 in values)",
        "hint": "Apply the filter to the original loop value before multiplying.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Double only even original values. Complete the comprehension filter.",
            "answer": "value % 2 == 0",
            "marks": 1,
            "explanation": "Apply the filter to the original loop value before multiplying.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(values)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 2. Apply the filter to the original loop value before multiplying.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (values[0]) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 0. Apply the filter to the original loop value before multiplying.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[-1]) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 4. Apply the filter to the original loop value before multiplying.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (sum(values)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(values) evaluates to 4. Apply the filter to the original loop value before multiplying.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (2 in values) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "2 in values evaluates to False. Apply the filter to the original loop value before multiplying.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [value * 2 for value in range(4) if ___]\nprint(len(values), values[0], values[-1], sum(values), 2 in values)",
        "hint": "Apply the filter to the original loop value before multiplying.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Double only even original values. Complete the comprehension filter.",
            "answer": "value % 2 == 0",
            "marks": 1,
            "explanation": "Apply the filter to the original loop value before multiplying.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(values)) \u2014 no quotes",
            "answer": "2",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 2. Apply the filter to the original loop value before multiplying.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (values[0]) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 0. Apply the filter to the original loop value before multiplying.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[-1]) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 4. Apply the filter to the original loop value before multiplying.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (sum(values)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(values) evaluates to 4. Apply the filter to the original loop value before multiplying.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (2 in values) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "2 in values evaluates to False. Apply the filter to the original loop value before multiplying.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [value * 2 for value in range(5) if ___]\nprint(len(values), values[0], values[-1], sum(values), 2 in values)",
        "hint": "Apply the filter to the original loop value before multiplying.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Double only even original values. Complete the comprehension filter.",
            "answer": "value % 2 == 0",
            "marks": 1,
            "explanation": "Apply the filter to the original loop value before multiplying.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(values)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 3. Apply the filter to the original loop value before multiplying.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (values[0]) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 0. Apply the filter to the original loop value before multiplying.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[-1]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 8. Apply the filter to the original loop value before multiplying.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (sum(values)) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(values) evaluates to 12. Apply the filter to the original loop value before multiplying.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (2 in values) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "2 in values evaluates to False. Apply the filter to the original loop value before multiplying.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [value * 2 for value in range(6) if ___]\nprint(len(values), values[0], values[-1], sum(values), 2 in values)",
        "hint": "Apply the filter to the original loop value before multiplying.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Double only even original values. Complete the comprehension filter.",
            "answer": "value % 2 == 0",
            "marks": 1,
            "explanation": "Apply the filter to the original loop value before multiplying.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(values)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 3. Apply the filter to the original loop value before multiplying.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (values[0]) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 0. Apply the filter to the original loop value before multiplying.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[-1]) \u2014 no quotes",
            "answer": "8",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 8. Apply the filter to the original loop value before multiplying.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (sum(values)) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(values) evaluates to 12. Apply the filter to the original loop value before multiplying.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (2 in values) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "2 in values evaluates to False. Apply the filter to the original loop value before multiplying.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [value * 2 for value in range(7) if ___]\nprint(len(values), values[0], values[-1], sum(values), 2 in values)",
        "hint": "Apply the filter to the original loop value before multiplying.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Double only even original values. Complete the comprehension filter.",
            "answer": "value % 2 == 0",
            "marks": 1,
            "explanation": "Apply the filter to the original loop value before multiplying.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (len(values)) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(values) evaluates to 4. Apply the filter to the original loop value before multiplying.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (values[0]) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[0] evaluates to 0. Apply the filter to the original loop value before multiplying.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (values[-1]) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "values[-1] evaluates to 12. Apply the filter to the original loop value before multiplying.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (sum(values)) \u2014 no quotes",
            "answer": "24",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "sum(values) evaluates to 24. Apply the filter to the original loop value before multiplying.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (2 in values) \u2014 no quotes",
            "answer": "False",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "2 in values evaluates to False. Apply the filter to the original loop value before multiplying.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 50,
    "focus": "collections",
    "title": "Pair positions and values",
    "format": "Fix the code",
    "tags": [
      "collections",
      "extension",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [3, 8, 9]\npairs = list(enumerate(values, start=0))\nprint(pairs[0][0], pairs[0][1], pairs[2][0], pairs[2][1], len(pairs))",
        "hint": "enumerate pairs each item with a counter; start changes that counter.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Pair items with positions numbered from one. Repair the enumerate keyword argument.",
            "answer": "start=1",
            "marks": 1,
            "explanation": "enumerate pairs each item with a counter; start changes that counter.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (pairs[0][0]) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[0][0] evaluates to 1. enumerate pairs each item with a counter; start changes that counter.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (pairs[0][1]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[0][1] evaluates to 3. enumerate pairs each item with a counter; start changes that counter.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (pairs[2][0]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[2][0] evaluates to 3. enumerate pairs each item with a counter; start changes that counter.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (pairs[2][1]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[2][1] evaluates to 9. enumerate pairs each item with a counter; start changes that counter.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(pairs)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(pairs) evaluates to 3. enumerate pairs each item with a counter; start changes that counter.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [4, 8, 9]\npairs = list(enumerate(values, start=0))\nprint(pairs[0][0], pairs[0][1], pairs[2][0], pairs[2][1], len(pairs))",
        "hint": "enumerate pairs each item with a counter; start changes that counter.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Pair items with positions numbered from one. Repair the enumerate keyword argument.",
            "answer": "start=1",
            "marks": 1,
            "explanation": "enumerate pairs each item with a counter; start changes that counter.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (pairs[0][0]) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[0][0] evaluates to 1. enumerate pairs each item with a counter; start changes that counter.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (pairs[0][1]) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[0][1] evaluates to 4. enumerate pairs each item with a counter; start changes that counter.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (pairs[2][0]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[2][0] evaluates to 3. enumerate pairs each item with a counter; start changes that counter.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (pairs[2][1]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[2][1] evaluates to 9. enumerate pairs each item with a counter; start changes that counter.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(pairs)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(pairs) evaluates to 3. enumerate pairs each item with a counter; start changes that counter.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [5, 8, 9]\npairs = list(enumerate(values, start=0))\nprint(pairs[0][0], pairs[0][1], pairs[2][0], pairs[2][1], len(pairs))",
        "hint": "enumerate pairs each item with a counter; start changes that counter.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Pair items with positions numbered from one. Repair the enumerate keyword argument.",
            "answer": "start=1",
            "marks": 1,
            "explanation": "enumerate pairs each item with a counter; start changes that counter.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (pairs[0][0]) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[0][0] evaluates to 1. enumerate pairs each item with a counter; start changes that counter.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (pairs[0][1]) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[0][1] evaluates to 5. enumerate pairs each item with a counter; start changes that counter.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (pairs[2][0]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[2][0] evaluates to 3. enumerate pairs each item with a counter; start changes that counter.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (pairs[2][1]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[2][1] evaluates to 9. enumerate pairs each item with a counter; start changes that counter.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(pairs)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(pairs) evaluates to 3. enumerate pairs each item with a counter; start changes that counter.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [6, 8, 9]\npairs = list(enumerate(values, start=0))\nprint(pairs[0][0], pairs[0][1], pairs[2][0], pairs[2][1], len(pairs))",
        "hint": "enumerate pairs each item with a counter; start changes that counter.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Pair items with positions numbered from one. Repair the enumerate keyword argument.",
            "answer": "start=1",
            "marks": 1,
            "explanation": "enumerate pairs each item with a counter; start changes that counter.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (pairs[0][0]) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[0][0] evaluates to 1. enumerate pairs each item with a counter; start changes that counter.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (pairs[0][1]) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[0][1] evaluates to 6. enumerate pairs each item with a counter; start changes that counter.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (pairs[2][0]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[2][0] evaluates to 3. enumerate pairs each item with a counter; start changes that counter.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (pairs[2][1]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[2][1] evaluates to 9. enumerate pairs each item with a counter; start changes that counter.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(pairs)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(pairs) evaluates to 3. enumerate pairs each item with a counter; start changes that counter.",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Complete or repair the code as requested, then predict the five printed values of the corrected code. Read each value separately; Boolean spelling is case-sensitive.",
        "code": "values = [7, 8, 9]\npairs = list(enumerate(values, start=0))\nprint(pairs[0][0], pairs[0][1], pairs[2][0], pairs[2][1], len(pairs))",
        "hint": "enumerate pairs each item with a counter; start changes that counter.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Pair items with positions numbered from one. Repair the enumerate keyword argument.",
            "answer": "start=1",
            "marks": 1,
            "explanation": "enumerate pairs each item with a counter; start changes that counter.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (pairs[0][0]) \u2014 no quotes",
            "answer": "1",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[0][0] evaluates to 1. enumerate pairs each item with a counter; start changes that counter.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (pairs[0][1]) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[0][1] evaluates to 7. enumerate pairs each item with a counter; start changes that counter.",
            "id": "2"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (pairs[2][0]) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[2][0] evaluates to 3. enumerate pairs each item with a counter; start changes that counter.",
            "id": "3"
          },
          {
            "kind": "text",
            "prompt": "Printed value 4 (pairs[2][1]) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "pairs[2][1] evaluates to 9. enumerate pairs each item with a counter; start changes that counter.",
            "id": "4"
          },
          {
            "kind": "text",
            "prompt": "Printed value 5 (len(pairs)) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "len(pairs) evaluates to 3. enumerate pairs each item with a counter; start changes that counter.",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 51,
    "focus": "code style",
    "title": "Name a calculated value",
    "format": "Predict the output",
    "tags": [
      "code style",
      "CA2.9",
      "prediction"
    ],
    "variations": [
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "unit_price = 3\nitem_count = 3\ntotal_price = unit_price * item_count\nprint(unit_price, item_count, total_price, total_price // item_count, total_price - unit_price, type(total_price).__name__)",
        "hint": "Descriptive snake_case names make each quantity clear.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (unit_price) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "unit_price evaluates to 3. Descriptive snake_case names make each quantity clear.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (item_count) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "item_count evaluates to 3. Descriptive snake_case names make each quantity clear.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (total_price) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total_price evaluates to 9. Descriptive snake_case names make each quantity clear.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      },
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "unit_price = 4\nitem_count = 3\ntotal_price = unit_price * item_count\nprint(unit_price, item_count, total_price, total_price // item_count, total_price - unit_price, type(total_price).__name__)",
        "hint": "Descriptive snake_case names make each quantity clear.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (unit_price) \u2014 no quotes",
            "answer": "4",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "unit_price evaluates to 4. Descriptive snake_case names make each quantity clear.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (item_count) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "item_count evaluates to 3. Descriptive snake_case names make each quantity clear.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (total_price) \u2014 no quotes",
            "answer": "12",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total_price evaluates to 12. Descriptive snake_case names make each quantity clear.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      },
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "unit_price = 5\nitem_count = 3\ntotal_price = unit_price * item_count\nprint(unit_price, item_count, total_price, total_price // item_count, total_price - unit_price, type(total_price).__name__)",
        "hint": "Descriptive snake_case names make each quantity clear.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (unit_price) \u2014 no quotes",
            "answer": "5",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "unit_price evaluates to 5. Descriptive snake_case names make each quantity clear.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (item_count) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "item_count evaluates to 3. Descriptive snake_case names make each quantity clear.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (total_price) \u2014 no quotes",
            "answer": "15",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total_price evaluates to 15. Descriptive snake_case names make each quantity clear.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      },
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "unit_price = 6\nitem_count = 3\ntotal_price = unit_price * item_count\nprint(unit_price, item_count, total_price, total_price // item_count, total_price - unit_price, type(total_price).__name__)",
        "hint": "Descriptive snake_case names make each quantity clear.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (unit_price) \u2014 no quotes",
            "answer": "6",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "unit_price evaluates to 6. Descriptive snake_case names make each quantity clear.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (item_count) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "item_count evaluates to 3. Descriptive snake_case names make each quantity clear.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (total_price) \u2014 no quotes",
            "answer": "18",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total_price evaluates to 18. Descriptive snake_case names make each quantity clear.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      },
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "unit_price = 7\nitem_count = 3\ntotal_price = unit_price * item_count\nprint(unit_price, item_count, total_price, total_price // item_count, total_price - unit_price, type(total_price).__name__)",
        "hint": "Descriptive snake_case names make each quantity clear.",
        "parts": [
          {
            "kind": "text",
            "prompt": "Printed value 1 (unit_price) \u2014 no quotes",
            "answer": "7",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "unit_price evaluates to 7. Descriptive snake_case names make each quantity clear.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (item_count) \u2014 no quotes",
            "answer": "3",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "item_count evaluates to 3. Descriptive snake_case names make each quantity clear.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 3 (total_price) \u2014 no quotes",
            "answer": "21",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "total_price evaluates to 21. Descriptive snake_case names make each quantity clear.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      }
    ]
  },
  {
    "slot": 52,
    "focus": "code style",
    "title": "Document a function",
    "format": "Complete the code",
    "tags": [
      "code style",
      "CA2.9",
      "completion"
    ],
    "variations": [
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "def square(value):\n    \"\"\"Return value multiplied by itself.\"\"\"\n    ___\nnumber = 3\nprint(square(number), square(0), square(-2), square(1), square(3))",
        "hint": "A docstring describes the function; return supplies its result.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Send the square back to the caller. Complete the function body after its docstring.",
            "answer": "return value * value",
            "marks": 1,
            "explanation": "A docstring describes the function; return supplies its result.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (square(number)) \u2014 no quotes",
            "answer": "9",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "square(number) evaluates to 9. A docstring describes the function; return supplies its result.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (square(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "square(0) evaluates to 0. A docstring describes the function; return supplies its result.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      },
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "def square(value):\n    \"\"\"Return value multiplied by itself.\"\"\"\n    ___\nnumber = 4\nprint(square(number), square(0), square(-2), square(1), square(3))",
        "hint": "A docstring describes the function; return supplies its result.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Send the square back to the caller. Complete the function body after its docstring.",
            "answer": "return value * value",
            "marks": 1,
            "explanation": "A docstring describes the function; return supplies its result.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (square(number)) \u2014 no quotes",
            "answer": "16",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "square(number) evaluates to 16. A docstring describes the function; return supplies its result.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (square(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "square(0) evaluates to 0. A docstring describes the function; return supplies its result.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      },
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "def square(value):\n    \"\"\"Return value multiplied by itself.\"\"\"\n    ___\nnumber = 5\nprint(square(number), square(0), square(-2), square(1), square(3))",
        "hint": "A docstring describes the function; return supplies its result.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Send the square back to the caller. Complete the function body after its docstring.",
            "answer": "return value * value",
            "marks": 1,
            "explanation": "A docstring describes the function; return supplies its result.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (square(number)) \u2014 no quotes",
            "answer": "25",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "square(number) evaluates to 25. A docstring describes the function; return supplies its result.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (square(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "square(0) evaluates to 0. A docstring describes the function; return supplies its result.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      },
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "def square(value):\n    \"\"\"Return value multiplied by itself.\"\"\"\n    ___\nnumber = 6\nprint(square(number), square(0), square(-2), square(1), square(3))",
        "hint": "A docstring describes the function; return supplies its result.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Send the square back to the caller. Complete the function body after its docstring.",
            "answer": "return value * value",
            "marks": 1,
            "explanation": "A docstring describes the function; return supplies its result.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (square(number)) \u2014 no quotes",
            "answer": "36",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "square(number) evaluates to 36. A docstring describes the function; return supplies its result.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (square(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "square(0) evaluates to 0. A docstring describes the function; return supplies its result.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      },
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "def square(value):\n    \"\"\"Return value multiplied by itself.\"\"\"\n    ___\nnumber = 7\nprint(square(number), square(0), square(-2), square(1), square(3))",
        "hint": "A docstring describes the function; return supplies its result.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Send the square back to the caller. Complete the function body after its docstring.",
            "answer": "return value * value",
            "marks": 1,
            "explanation": "A docstring describes the function; return supplies its result.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (square(number)) \u2014 no quotes",
            "answer": "49",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "square(number) evaluates to 49. A docstring describes the function; return supplies its result.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (square(0)) \u2014 no quotes",
            "answer": "0",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "square(0) evaluates to 0. A docstring describes the function; return supplies its result.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      }
    ]
  },
  {
    "slot": 53,
    "focus": "code style",
    "title": "Avoid a magic number",
    "format": "Fix the code",
    "tags": [
      "code style",
      "CA2.9",
      "debugging"
    ],
    "variations": [
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "SECONDS_PER_MINUTE = 60\nminutes = 3\nseconds = minutes + SECONDS_PER_MINUTE\nprint(seconds, SECONDS_PER_MINUTE, minutes, seconds // 60, seconds % 60)",
        "hint": "Name fixed conversion factors so their purpose is visible.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Convert minutes to seconds using the named constant. Repair the seconds expression.",
            "answer": "minutes * SECONDS_PER_MINUTE",
            "marks": 1,
            "explanation": "Name fixed conversion factors so their purpose is visible.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (seconds) \u2014 no quotes",
            "answer": "180",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "seconds evaluates to 180. Name fixed conversion factors so their purpose is visible.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (SECONDS_PER_MINUTE) \u2014 no quotes",
            "answer": "60",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "SECONDS_PER_MINUTE evaluates to 60. Name fixed conversion factors so their purpose is visible.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      },
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "SECONDS_PER_MINUTE = 60\nminutes = 4\nseconds = minutes + SECONDS_PER_MINUTE\nprint(seconds, SECONDS_PER_MINUTE, minutes, seconds // 60, seconds % 60)",
        "hint": "Name fixed conversion factors so their purpose is visible.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Convert minutes to seconds using the named constant. Repair the seconds expression.",
            "answer": "minutes * SECONDS_PER_MINUTE",
            "marks": 1,
            "explanation": "Name fixed conversion factors so their purpose is visible.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (seconds) \u2014 no quotes",
            "answer": "240",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "seconds evaluates to 240. Name fixed conversion factors so their purpose is visible.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (SECONDS_PER_MINUTE) \u2014 no quotes",
            "answer": "60",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "SECONDS_PER_MINUTE evaluates to 60. Name fixed conversion factors so their purpose is visible.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      },
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "SECONDS_PER_MINUTE = 60\nminutes = 5\nseconds = minutes + SECONDS_PER_MINUTE\nprint(seconds, SECONDS_PER_MINUTE, minutes, seconds // 60, seconds % 60)",
        "hint": "Name fixed conversion factors so their purpose is visible.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Convert minutes to seconds using the named constant. Repair the seconds expression.",
            "answer": "minutes * SECONDS_PER_MINUTE",
            "marks": 1,
            "explanation": "Name fixed conversion factors so their purpose is visible.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (seconds) \u2014 no quotes",
            "answer": "300",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "seconds evaluates to 300. Name fixed conversion factors so their purpose is visible.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (SECONDS_PER_MINUTE) \u2014 no quotes",
            "answer": "60",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "SECONDS_PER_MINUTE evaluates to 60. Name fixed conversion factors so their purpose is visible.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      },
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "SECONDS_PER_MINUTE = 60\nminutes = 6\nseconds = minutes + SECONDS_PER_MINUTE\nprint(seconds, SECONDS_PER_MINUTE, minutes, seconds // 60, seconds % 60)",
        "hint": "Name fixed conversion factors so their purpose is visible.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Convert minutes to seconds using the named constant. Repair the seconds expression.",
            "answer": "minutes * SECONDS_PER_MINUTE",
            "marks": 1,
            "explanation": "Name fixed conversion factors so their purpose is visible.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (seconds) \u2014 no quotes",
            "answer": "360",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "seconds evaluates to 360. Name fixed conversion factors so their purpose is visible.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (SECONDS_PER_MINUTE) \u2014 no quotes",
            "answer": "60",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "SECONDS_PER_MINUTE evaluates to 60. Name fixed conversion factors so their purpose is visible.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      },
      {
        "prompt": "Trace the requested values, then identify readable Python naming and layout choices.",
        "code": "SECONDS_PER_MINUTE = 60\nminutes = 7\nseconds = minutes + SECONDS_PER_MINUTE\nprint(seconds, SECONDS_PER_MINUTE, minutes, seconds // 60, seconds % 60)",
        "hint": "Name fixed conversion factors so their purpose is visible.",
        "parts": [
          {
            "kind": "code",
            "prompt": "Convert minutes to seconds using the named constant. Repair the seconds expression.",
            "answer": "minutes * SECONDS_PER_MINUTE",
            "marks": 1,
            "explanation": "Name fixed conversion factors so their purpose is visible.",
            "id": "0"
          },
          {
            "kind": "text",
            "prompt": "Printed value 1 (seconds) \u2014 no quotes",
            "answer": "420",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "seconds evaluates to 420. Name fixed conversion factors so their purpose is visible.",
            "id": "1"
          },
          {
            "kind": "text",
            "prompt": "Printed value 2 (SECONDS_PER_MINUTE) \u2014 no quotes",
            "answer": "60",
            "caseSensitive": true,
            "marks": 1,
            "explanation": "SECONDS_PER_MINUTE evaluates to 60. Name fixed conversion factors so their purpose is visible.",
            "id": "2"
          },
          {
            "id": "3",
            "kind": "choice",
            "prompt": "Which variable clearly names a calculated sale total?",
            "answer": "total_price",
            "options": [
              "total_price",
              "x",
              "temp"
            ],
            "marks": 1,
            "explanation": "Meaningful names make the purpose of stored values clear."
          },
          {
            "id": "4",
            "kind": "choice",
            "prompt": "Which identifier follows snake_case?",
            "answer": "item_count",
            "options": [
              "item_count",
              "itemCount",
              "ItemCount"
            ],
            "marks": 1,
            "explanation": "Use lowercase words separated by underscores for snake_case."
          },
          {
            "id": "5",
            "kind": "choice",
            "prompt": "How should a long calculation be laid out for readability?",
            "answer": "Split it across grouped lines",
            "options": [
              "Remove every space",
              "Split it across grouped lines",
              "Put every calculation on one line"
            ],
            "marks": 1,
            "explanation": "Grouping allows a long expression to be laid out readably without changing its meaning."
          }
        ]
      }
    ]
  }
];
