// Deterministic instances; see scripts/enrich-puzzles.py.
export default [
  {
    "slot": 105,
    "focus": "logic equations",
    "title": "Products and bounds",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: B × E = 4. List distinct allowed value pairs, then use another clue involving B or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[2, 3, 4, 1, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "B × E = 4",
              "D − E = 1",
              "A < C",
              "A − D = 1"
            ],
            "rules": [
              [
                "product",
                1,
                4,
                4
              ],
              [
                "difference",
                3,
                4,
                1
              ],
              [
                "less",
                0,
                2,
                0
              ],
              [
                "difference",
                0,
                3,
                1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 3: A × E = 10. List distinct allowed value pairs, then use another clue involving A or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[1, 2, 3, 0, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "C < E",
              "B < E",
              "A × E = 10",
              "B × E = 15",
              "B < C"
            ],
            "rules": [
              [
                "less",
                2,
                4,
                0
              ],
              [
                "less",
                1,
                4,
                0
              ],
              [
                "product",
                0,
                4,
                10
              ],
              [
                "product",
                1,
                4,
                15
              ],
              [
                "less",
                1,
                2,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 4: B × C = 20. List distinct allowed value pairs, then use another clue involving B or C to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[1, 3, 4, 0, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "B − E = 1",
              "B − C = -1",
              "A + B = 6",
              "B × C = 20"
            ],
            "rules": [
              [
                "difference",
                1,
                4,
                1
              ],
              [
                "difference",
                1,
                2,
                -1
              ],
              [
                "sum",
                0,
                1,
                6
              ],
              [
                "product",
                1,
                2,
                20
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: A × C = 2. List distinct allowed value pairs, then use another clue involving A or C to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 4, 1, 3, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A × C = 2",
              "C − D = -2",
              "C × D = 8",
              "B × C = 10"
            ],
            "rules": [
              [
                "product",
                0,
                2,
                2
              ],
              [
                "difference",
                2,
                3,
                -2
              ],
              [
                "product",
                2,
                3,
                8
              ],
              [
                "product",
                1,
                2,
                10
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: B + E = 3. List distinct allowed value pairs, then use another clue involving B or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[2, 0, 3, 4, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A − D = -2",
              "B + E = 3",
              "A − B = 2"
            ],
            "rules": [
              [
                "difference",
                0,
                3,
                -2
              ],
              [
                "sum",
                1,
                4,
                3
              ],
              [
                "difference",
                0,
                1,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 106,
    "focus": "logic equations",
    "title": "Differences and totals",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 3: C × E = 6. List distinct allowed value pairs, then use another clue involving C or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 4, 2, 3, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "C < D",
              "A + D = 5",
              "C × E = 6",
              "A × C = 3"
            ],
            "rules": [
              [
                "less",
                2,
                3,
                0
              ],
              [
                "sum",
                0,
                3,
                5
              ],
              [
                "product",
                2,
                4,
                6
              ],
              [
                "product",
                0,
                2,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: A × E = 3. List distinct allowed value pairs, then use another clue involving A or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 3, 4, 1, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A × E = 3",
              "D × E = 6",
              "B + E = 7"
            ],
            "rules": [
              [
                "product",
                0,
                4,
                3
              ],
              [
                "product",
                3,
                4,
                6
              ],
              [
                "sum",
                1,
                4,
                7
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: B × D = 5. List distinct allowed value pairs, then use another clue involving B or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[3, 4, 1, 0, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "B × D = 5",
              "A × E = 12",
              "D < E",
              "A − E = 1"
            ],
            "rules": [
              [
                "product",
                1,
                3,
                5
              ],
              [
                "product",
                0,
                4,
                12
              ],
              [
                "less",
                3,
                4,
                0
              ],
              [
                "difference",
                0,
                4,
                1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: C − E = 4. List distinct allowed value pairs, then use another clue involving C or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[1, 2, 4, 3, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "C + E = 6",
              "C − E = 4",
              "B × E = 3",
              "A − C = -3"
            ],
            "rules": [
              [
                "sum",
                2,
                4,
                6
              ],
              [
                "difference",
                2,
                4,
                4
              ],
              [
                "product",
                1,
                4,
                3
              ],
              [
                "difference",
                0,
                2,
                -3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: A × D = 2. List distinct allowed value pairs, then use another clue involving A or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 4, 2, 1, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A × D = 2",
              "D × E = 8",
              "B + E = 9"
            ],
            "rules": [
              [
                "product",
                0,
                3,
                2
              ],
              [
                "product",
                3,
                4,
                8
              ],
              [
                "sum",
                1,
                4,
                9
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 107,
    "focus": "logic equations",
    "title": "Integer assignment",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 6: B − E = 3. List distinct allowed value pairs, then use another clue involving B or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[2, 4, 0, 3, 1, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "C < E",
              "D < F",
              "C < D",
              "A < D",
              "B − F = -1",
              "B − E = 3"
            ],
            "rules": [
              [
                "less",
                2,
                4,
                0
              ],
              [
                "less",
                3,
                5,
                0
              ],
              [
                "less",
                2,
                3,
                0
              ],
              [
                "less",
                0,
                3,
                0
              ],
              [
                "difference",
                1,
                5,
                -1
              ],
              [
                "difference",
                1,
                4,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: A × B = 15. List distinct allowed value pairs, then use another clue involving A or B to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[2, 4, 1, 5, 3, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "A − F = 2",
              "A × B = 15",
              "E × F = 4",
              "A + C = 5"
            ],
            "rules": [
              [
                "difference",
                0,
                5,
                2
              ],
              [
                "product",
                0,
                1,
                15
              ],
              [
                "product",
                4,
                5,
                4
              ],
              [
                "sum",
                0,
                2,
                5
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 5: C − D = 4. List distinct allowed value pairs, then use another clue involving C or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[5, 3, 4, 0, 1, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "C + D = 6",
              "E × F = 6",
              "D < F",
              "A + F = 9",
              "C − D = 4"
            ],
            "rules": [
              [
                "sum",
                2,
                3,
                6
              ],
              [
                "product",
                4,
                5,
                6
              ],
              [
                "less",
                3,
                5,
                0
              ],
              [
                "sum",
                0,
                5,
                9
              ],
              [
                "difference",
                2,
                3,
                4
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: C × F = 18. List distinct allowed value pairs, then use another clue involving C or F to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[4, 1, 2, 0, 3, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "B < F",
              "C × F = 18",
              "D + E = 5",
              "E < F",
              "A − C = 2",
              "C × E = 12"
            ],
            "rules": [
              [
                "less",
                1,
                5,
                0
              ],
              [
                "product",
                2,
                5,
                18
              ],
              [
                "sum",
                3,
                4,
                5
              ],
              [
                "less",
                4,
                5,
                0
              ],
              [
                "difference",
                0,
                2,
                2
              ],
              [
                "product",
                2,
                4,
                12
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 4: A − C = 2. List distinct allowed value pairs, then use another clue involving A or C to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[3, 2, 1, 4, 0, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "D − F = -1",
              "C − E = 1",
              "E + F = 7",
              "A − C = 2"
            ],
            "rules": [
              [
                "difference",
                3,
                5,
                -1
              ],
              [
                "difference",
                2,
                4,
                1
              ],
              [
                "sum",
                4,
                5,
                7
              ],
              [
                "difference",
                0,
                2,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 108,
    "focus": "logic equations",
    "title": "Mixed constraints",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 3: A − E = -5. List distinct allowed value pairs, then use another clue involving A or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 3, 4, 1, 5, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "C × F = 15",
              "C − E = -1",
              "A − E = -5",
              "A − D = -1"
            ],
            "rules": [
              [
                "product",
                2,
                5,
                15
              ],
              [
                "difference",
                2,
                4,
                -1
              ],
              [
                "difference",
                0,
                4,
                -5
              ],
              [
                "difference",
                0,
                3,
                -1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: B + C = 11. List distinct allowed value pairs, then use another clue involving B or C to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 5, 4, 2, 1, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "B + C = 11",
              "B + D = 9",
              "A × F = 4",
              "D × F = 12"
            ],
            "rules": [
              [
                "sum",
                1,
                2,
                11
              ],
              [
                "sum",
                1,
                3,
                9
              ],
              [
                "product",
                0,
                5,
                4
              ],
              [
                "product",
                3,
                5,
                12
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: B × E = 5. List distinct allowed value pairs, then use another clue involving B or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[3, 0, 2, 1, 4, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "B × E = 5",
              "D − E = -3",
              "A + D = 6",
              "C − E = -2"
            ],
            "rules": [
              [
                "product",
                1,
                4,
                5
              ],
              [
                "difference",
                3,
                4,
                -3
              ],
              [
                "sum",
                0,
                3,
                6
              ],
              [
                "difference",
                2,
                4,
                -2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: D − E = -4. List distinct allowed value pairs, then use another clue involving D or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[2, 4, 0, 1, 5, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "D − E = -4",
              "C < F",
              "A + E = 9",
              "A + B = 8"
            ],
            "rules": [
              [
                "difference",
                3,
                4,
                -4
              ],
              [
                "less",
                2,
                5,
                0
              ],
              [
                "sum",
                0,
                4,
                9
              ],
              [
                "sum",
                0,
                1,
                8
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 4: D × F = 18. List distinct allowed value pairs, then use another clue involving D or F to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[4, 0, 1, 2, 3, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "D < E",
              "B < C",
              "D − F = -3",
              "D × F = 18",
              "A × F = 30"
            ],
            "rules": [
              [
                "less",
                3,
                4,
                0
              ],
              [
                "less",
                1,
                2,
                0
              ],
              [
                "difference",
                3,
                5,
                -3
              ],
              [
                "product",
                3,
                5,
                18
              ],
              [
                "product",
                0,
                5,
                30
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 109,
    "focus": "logic equations",
    "title": "Seven-variable deduction",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 4: D + G = 12. List distinct allowed value pairs, then use another clue involving D or G to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[3, 2, 0, 4, 5, 1, 6]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "A − B = 1",
              "A + E = 10",
              "E + F = 8",
              "D + G = 12",
              "B − D = -2"
            ],
            "rules": [
              [
                "difference",
                0,
                1,
                1
              ],
              [
                "sum",
                0,
                4,
                10
              ],
              [
                "sum",
                4,
                5,
                8
              ],
              [
                "sum",
                3,
                6,
                12
              ],
              [
                "difference",
                1,
                3,
                -2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: D − F = -5. List distinct allowed value pairs, then use another clue involving D or F to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[2, 3, 5, 1, 4, 6, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "D − F = -5",
              "E + G = 6",
              "B × E = 20",
              "A < C",
              "B × C = 24"
            ],
            "rules": [
              [
                "difference",
                3,
                5,
                -5
              ],
              [
                "sum",
                4,
                6,
                6
              ],
              [
                "product",
                1,
                4,
                20
              ],
              [
                "less",
                0,
                2,
                0
              ],
              [
                "product",
                1,
                2,
                24
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 4: B × C = 10. List distinct allowed value pairs, then use another clue involving B or C to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[5, 4, 1, 6, 3, 2, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "B + F = 8",
              "B − G = 4",
              "F − G = 2",
              "B × C = 10",
              "B < D",
              "B − D = -2",
              "E − G = 3"
            ],
            "rules": [
              [
                "sum",
                1,
                5,
                8
              ],
              [
                "difference",
                1,
                6,
                4
              ],
              [
                "difference",
                5,
                6,
                2
              ],
              [
                "product",
                1,
                2,
                10
              ],
              [
                "less",
                1,
                3,
                0
              ],
              [
                "difference",
                1,
                3,
                -2
              ],
              [
                "difference",
                4,
                6,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 3: C × E = 15. List distinct allowed value pairs, then use another clue involving C or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[3, 1, 2, 6, 4, 0, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "A + C = 7",
              "E − F = 4",
              "C × E = 15",
              "B × D = 14",
              "B + C = 5"
            ],
            "rules": [
              [
                "sum",
                0,
                2,
                7
              ],
              [
                "difference",
                4,
                5,
                4
              ],
              [
                "product",
                2,
                4,
                15
              ],
              [
                "product",
                1,
                3,
                14
              ],
              [
                "sum",
                1,
                2,
                5
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 5: B − G = -6. List distinct allowed value pairs, then use another clue involving B or G to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[2, 0, 1, 3, 4, 5, 6]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "C − E = -3",
              "B + C = 3",
              "D × F = 24",
              "E × F = 30",
              "B − G = -6"
            ],
            "rules": [
              [
                "difference",
                2,
                4,
                -3
              ],
              [
                "sum",
                1,
                2,
                3
              ],
              [
                "product",
                3,
                5,
                24
              ],
              [
                "product",
                4,
                5,
                30
              ],
              [
                "difference",
                1,
                6,
                -6
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 345,
    "focus": "logic equations",
    "title": "Logic Equations 6",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: B × E = 5. List distinct allowed value pairs, then use another clue involving B or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[3, 4, 1, 2, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "B + C = 7",
              "B × E = 5",
              "A + C = 6"
            ],
            "rules": [
              [
                "sum",
                1,
                2,
                7
              ],
              [
                "product",
                1,
                4,
                5
              ],
              [
                "sum",
                0,
                2,
                6
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 346,
    "focus": "logic equations",
    "title": "Logic Equations 7",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: A − C = 2. List distinct allowed value pairs, then use another clue involving A or C to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[3, 0, 1, 2, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A − C = 2",
              "A + B = 5",
              "A + D = 7",
              "D − E = -2"
            ],
            "rules": [
              [
                "difference",
                0,
                2,
                2
              ],
              [
                "sum",
                0,
                1,
                5
              ],
              [
                "sum",
                0,
                3,
                7
              ],
              [
                "difference",
                3,
                4,
                -2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 347,
    "focus": "logic equations",
    "title": "Logic Equations 8",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 4: A + C = 9. List distinct allowed value pairs, then use another clue involving A or C to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[4, 0, 3, 2, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A + E = 7",
              "C − D = 1",
              "A − D = 2",
              "A + C = 9"
            ],
            "rules": [
              [
                "sum",
                0,
                4,
                7
              ],
              [
                "difference",
                2,
                3,
                1
              ],
              [
                "difference",
                0,
                3,
                2
              ],
              [
                "sum",
                0,
                2,
                9
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 348,
    "focus": "logic equations",
    "title": "Logic Equations 9",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: B × C = 6. List distinct allowed value pairs, then use another clue involving B or C to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[3, 1, 2, 4, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A + B = 6",
              "B × C = 6",
              "B − E = 1"
            ],
            "rules": [
              [
                "sum",
                0,
                1,
                6
              ],
              [
                "product",
                1,
                2,
                6
              ],
              [
                "difference",
                1,
                4,
                1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 349,
    "focus": "logic equations",
    "title": "Logic Equations 10",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: A − E = -4. List distinct allowed value pairs, then use another clue involving A or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 2, 3, 1, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "C + E = 9",
              "A − E = -4",
              "A + B = 4"
            ],
            "rules": [
              [
                "sum",
                2,
                4,
                9
              ],
              [
                "difference",
                0,
                4,
                -4
              ],
              [
                "sum",
                0,
                1,
                4
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 350,
    "focus": "logic equations",
    "title": "Logic Equations 11",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 3: B × D = 15. List distinct allowed value pairs, then use another clue involving B or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[1, 4, 0, 2, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "C + E = 5",
              "A < B",
              "B × D = 15",
              "C < E",
              "A + D = 5"
            ],
            "rules": [
              [
                "sum",
                2,
                4,
                5
              ],
              [
                "less",
                0,
                1,
                0
              ],
              [
                "product",
                1,
                3,
                15
              ],
              [
                "less",
                2,
                4,
                0
              ],
              [
                "sum",
                0,
                3,
                5
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 351,
    "focus": "logic equations",
    "title": "Logic Equations 12",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: A × E = 8. List distinct allowed value pairs, then use another clue involving A or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[3, 0, 2, 4, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A × E = 8",
              "C − D = -2",
              "A − D = -1",
              "B − E = -1"
            ],
            "rules": [
              [
                "product",
                0,
                4,
                8
              ],
              [
                "difference",
                2,
                3,
                -2
              ],
              [
                "difference",
                0,
                3,
                -1
              ],
              [
                "difference",
                1,
                4,
                -1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 352,
    "focus": "logic equations",
    "title": "Logic Equations 13",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: C × E = 10. List distinct allowed value pairs, then use another clue involving C or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[2, 0, 4, 3, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "C × E = 10",
              "B + D = 5",
              "B + C = 6",
              "A + C = 8"
            ],
            "rules": [
              [
                "product",
                2,
                4,
                10
              ],
              [
                "sum",
                1,
                3,
                5
              ],
              [
                "sum",
                1,
                2,
                6
              ],
              [
                "sum",
                0,
                2,
                8
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 353,
    "focus": "logic equations",
    "title": "Logic Equations 14",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 4: A × C = 2. List distinct allowed value pairs, then use another clue involving A or C to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 3, 1, 4, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A − E = -2",
              "A < C",
              "D − E = 2",
              "A × C = 2"
            ],
            "rules": [
              [
                "difference",
                0,
                4,
                -2
              ],
              [
                "less",
                0,
                2,
                0
              ],
              [
                "difference",
                3,
                4,
                2
              ],
              [
                "product",
                0,
                2,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 354,
    "focus": "logic equations",
    "title": "Logic Equations 15",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: B − E = -2. List distinct allowed value pairs, then use another clue involving B or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[1, 2, 3, 0, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "B < E",
              "B − E = -2",
              "A − D = 1",
              "A < C"
            ],
            "rules": [
              [
                "less",
                1,
                4,
                0
              ],
              [
                "difference",
                1,
                4,
                -2
              ],
              [
                "difference",
                0,
                3,
                1
              ],
              [
                "less",
                0,
                2,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 355,
    "focus": "logic equations",
    "title": "Logic Equations 16",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 4: A × E = 4. List distinct allowed value pairs, then use another clue involving A or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[3, 1, 4, 2, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "B + D = 5",
              "A + B = 6",
              "B − E = 1",
              "A × E = 4"
            ],
            "rules": [
              [
                "sum",
                1,
                3,
                5
              ],
              [
                "sum",
                0,
                1,
                6
              ],
              [
                "difference",
                1,
                4,
                1
              ],
              [
                "product",
                0,
                4,
                4
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 356,
    "focus": "logic equations",
    "title": "Logic Equations 17",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: A + C = 8. List distinct allowed value pairs, then use another clue involving A or C to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[2, 3, 4, 1, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "B − D = 2",
              "A + C = 8",
              "C + E = 6"
            ],
            "rules": [
              [
                "difference",
                1,
                3,
                2
              ],
              [
                "sum",
                0,
                2,
                8
              ],
              [
                "sum",
                2,
                4,
                6
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 357,
    "focus": "logic equations",
    "title": "Logic Equations 18",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: D × E = 2. List distinct allowed value pairs, then use another clue involving D or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[2, 3, 4, 1, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A − B = -1",
              "D × E = 2",
              "A < C",
              "A × E = 3"
            ],
            "rules": [
              [
                "difference",
                0,
                1,
                -1
              ],
              [
                "product",
                3,
                4,
                2
              ],
              [
                "less",
                0,
                2,
                0
              ],
              [
                "product",
                0,
                4,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 358,
    "focus": "logic equations",
    "title": "Logic Equations 19",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 5: A × D = 5. List distinct allowed value pairs, then use another clue involving A or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 3, 2, 4, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A < D",
              "B − E = 2",
              "A + B = 5",
              "A − E = -1",
              "A × D = 5"
            ],
            "rules": [
              [
                "less",
                0,
                3,
                0
              ],
              [
                "difference",
                1,
                4,
                2
              ],
              [
                "sum",
                0,
                1,
                5
              ],
              [
                "difference",
                0,
                4,
                -1
              ],
              [
                "product",
                0,
                3,
                5
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 359,
    "focus": "logic equations",
    "title": "Logic Equations 20",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: A − E = -4. List distinct allowed value pairs, then use another clue involving A or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 2, 3, 1, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A − E = -4",
              "D − E = -3",
              "A × C = 4"
            ],
            "rules": [
              [
                "difference",
                0,
                4,
                -4
              ],
              [
                "difference",
                3,
                4,
                -3
              ],
              [
                "product",
                0,
                2,
                4
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 360,
    "focus": "logic equations",
    "title": "Logic Equations 21",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: C × D = 8. List distinct allowed value pairs, then use another clue involving C or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 4, 1, 3, 6, 5, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "E + G = 10",
              "C × D = 8",
              "A < F",
              "D × F = 24",
              "A + D = 5",
              "F + G = 9"
            ],
            "rules": [
              [
                "sum",
                4,
                6,
                10
              ],
              [
                "product",
                2,
                3,
                8
              ],
              [
                "less",
                0,
                5,
                0
              ],
              [
                "product",
                3,
                5,
                24
              ],
              [
                "sum",
                0,
                3,
                5
              ],
              [
                "sum",
                5,
                6,
                9
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 361,
    "focus": "logic equations",
    "title": "Logic Equations 22",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 5: B + D = 3. List distinct allowed value pairs, then use another clue involving B or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[4, 1, 3, 0, 6, 5, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "C + G = 7",
              "C + D = 5",
              "A − G = 2",
              "F + G = 9",
              "B + D = 3",
              "C × F = 24"
            ],
            "rules": [
              [
                "sum",
                2,
                6,
                7
              ],
              [
                "sum",
                2,
                3,
                5
              ],
              [
                "difference",
                0,
                6,
                2
              ],
              [
                "sum",
                5,
                6,
                9
              ],
              [
                "sum",
                1,
                3,
                3
              ],
              [
                "product",
                2,
                5,
                24
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 362,
    "focus": "logic equations",
    "title": "Logic Equations 23",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: C × D = 42. List distinct allowed value pairs, then use another clue involving C or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 2, 6, 5, 4, 3, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "B × F = 12",
              "C × D = 42",
              "A + G = 3",
              "C − D = 1",
              "A − F = -3"
            ],
            "rules": [
              [
                "product",
                1,
                5,
                12
              ],
              [
                "product",
                2,
                3,
                42
              ],
              [
                "sum",
                0,
                6,
                3
              ],
              [
                "difference",
                2,
                3,
                1
              ],
              [
                "difference",
                0,
                5,
                -3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 363,
    "focus": "logic equations",
    "title": "Logic Equations 24",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: A − E = -3. List distinct allowed value pairs, then use another clue involving A or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[2, 6, 1, 4, 5, 0, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "A − E = -3",
              "A × G = 12",
              "A + C = 5",
              "B − D = 2"
            ],
            "rules": [
              [
                "difference",
                0,
                4,
                -3
              ],
              [
                "product",
                0,
                6,
                12
              ],
              [
                "sum",
                0,
                2,
                5
              ],
              [
                "difference",
                1,
                3,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 364,
    "focus": "logic equations",
    "title": "Logic Equations 25",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: A × D = 20. List distinct allowed value pairs, then use another clue involving A or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[4, 0, 1, 3, 6, 2, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "C − G = -4",
              "A × D = 20",
              "A − D = 1",
              "C + D = 6",
              "E + G = 13",
              "B < C"
            ],
            "rules": [
              [
                "difference",
                2,
                6,
                -4
              ],
              [
                "product",
                0,
                3,
                20
              ],
              [
                "difference",
                0,
                3,
                1
              ],
              [
                "sum",
                2,
                3,
                6
              ],
              [
                "sum",
                4,
                6,
                13
              ],
              [
                "less",
                1,
                2,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 365,
    "focus": "logic equations",
    "title": "Logic Equations 26",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: A − D = 5. List distinct allowed value pairs, then use another clue involving A or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[6, 5, 3, 1, 0, 2, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "A − D = 5",
              "A − F = 4",
              "B − E = 5",
              "C + F = 7"
            ],
            "rules": [
              [
                "difference",
                0,
                3,
                5
              ],
              [
                "difference",
                0,
                5,
                4
              ],
              [
                "difference",
                1,
                4,
                5
              ],
              [
                "sum",
                2,
                5,
                7
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 366,
    "focus": "logic equations",
    "title": "Logic Equations 27",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 4: F × G = 42. List distinct allowed value pairs, then use another clue involving F or G to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 2, 3, 1, 4, 5, 6]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "B + G = 10",
              "A + E = 6",
              "B < C",
              "F × G = 42",
              "D × E = 10"
            ],
            "rules": [
              [
                "sum",
                1,
                6,
                10
              ],
              [
                "sum",
                0,
                4,
                6
              ],
              [
                "less",
                1,
                2,
                0
              ],
              [
                "product",
                5,
                6,
                42
              ],
              [
                "product",
                3,
                4,
                10
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 367,
    "focus": "logic equations",
    "title": "Logic Equations 28",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: D − F = 6. List distinct allowed value pairs, then use another clue involving D or F to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[5, 4, 1, 6, 3, 0, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "D − F = 6",
              "D + E = 11",
              "F − G = -2",
              "A + C = 8",
              "B − C = 3"
            ],
            "rules": [
              [
                "difference",
                3,
                5,
                6
              ],
              [
                "sum",
                3,
                4,
                11
              ],
              [
                "difference",
                5,
                6,
                -2
              ],
              [
                "sum",
                0,
                2,
                8
              ],
              [
                "difference",
                1,
                2,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 368,
    "focus": "logic equations",
    "title": "Logic Equations 29",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: D × G = 28. List distinct allowed value pairs, then use another clue involving D or G to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[4, 5, 2, 3, 0, 1, 6]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "D × G = 28",
              "B − C = 3",
              "D − G = -3",
              "C + D = 7",
              "A − F = 3"
            ],
            "rules": [
              [
                "product",
                3,
                6,
                28
              ],
              [
                "difference",
                1,
                2,
                3
              ],
              [
                "difference",
                3,
                6,
                -3
              ],
              [
                "sum",
                2,
                3,
                7
              ],
              [
                "difference",
                0,
                5,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 369,
    "focus": "logic equations",
    "title": "Logic Equations 30",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 3: A − C = 4. List distinct allowed value pairs, then use another clue involving A or C to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[5, 2, 1, 3, 0, 6, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "B + D = 7",
              "C + F = 9",
              "A − C = 4",
              "B + F = 10",
              "C − E = 1"
            ],
            "rules": [
              [
                "sum",
                1,
                3,
                7
              ],
              [
                "sum",
                2,
                5,
                9
              ],
              [
                "difference",
                0,
                2,
                4
              ],
              [
                "sum",
                1,
                5,
                10
              ],
              [
                "difference",
                2,
                4,
                1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 370,
    "focus": "logic equations",
    "title": "Logic Equations 31",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 4: C × G = 18. List distinct allowed value pairs, then use another clue involving C or G to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[6, 3, 5, 4, 1, 0, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "B − F = 3",
              "B + D = 9",
              "D − G = 2",
              "C × G = 18",
              "C × E = 12"
            ],
            "rules": [
              [
                "difference",
                1,
                5,
                3
              ],
              [
                "sum",
                1,
                3,
                9
              ],
              [
                "difference",
                3,
                6,
                2
              ],
              [
                "product",
                2,
                6,
                18
              ],
              [
                "product",
                2,
                4,
                12
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 371,
    "focus": "logic equations",
    "title": "Logic Equations 32",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 4: A × D = 4. List distinct allowed value pairs, then use another clue involving A or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 5, 4, 3, 1, 6, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "A − C = -4",
              "B − C = 1",
              "F − G = 4",
              "A × D = 4"
            ],
            "rules": [
              [
                "difference",
                0,
                2,
                -4
              ],
              [
                "difference",
                1,
                2,
                1
              ],
              [
                "difference",
                5,
                6,
                4
              ],
              [
                "product",
                0,
                3,
                4
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 372,
    "focus": "logic equations",
    "title": "Logic Equations 33",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 5: E × G = 35. List distinct allowed value pairs, then use another clue involving E or G to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 5, 3, 2, 6, 1, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "A + G = 6",
              "B − G = 1",
              "F − G = -3",
              "D × F = 6",
              "E × G = 35"
            ],
            "rules": [
              [
                "sum",
                0,
                6,
                6
              ],
              [
                "difference",
                1,
                6,
                1
              ],
              [
                "difference",
                5,
                6,
                -3
              ],
              [
                "product",
                3,
                5,
                6
              ],
              [
                "product",
                4,
                6,
                35
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 373,
    "focus": "logic equations",
    "title": "Logic Equations 34",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 3: C × F = 20. List distinct allowed value pairs, then use another clue involving C or F to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[6, 1, 3, 2, 0, 4, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "D + F = 8",
              "D − F = -2",
              "C × F = 20",
              "A − F = 2",
              "E × F = 5",
              "C × G = 24"
            ],
            "rules": [
              [
                "sum",
                3,
                5,
                8
              ],
              [
                "difference",
                3,
                5,
                -2
              ],
              [
                "product",
                2,
                5,
                20
              ],
              [
                "difference",
                0,
                5,
                2
              ],
              [
                "product",
                4,
                5,
                5
              ],
              [
                "product",
                2,
                6,
                24
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 374,
    "focus": "logic equations",
    "title": "Logic Equations 35",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: C + E = 12. List distinct allowed value pairs, then use another clue involving C or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[3, 1, 6, 5, 4, 0, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "B < G",
              "C + E = 12",
              "A < E",
              "A + F = 5",
              "B + E = 7",
              "A − B = 2",
              "B + D = 8"
            ],
            "rules": [
              [
                "less",
                1,
                6,
                0
              ],
              [
                "sum",
                2,
                4,
                12
              ],
              [
                "less",
                0,
                4,
                0
              ],
              [
                "sum",
                0,
                5,
                5
              ],
              [
                "sum",
                1,
                4,
                7
              ],
              [
                "difference",
                0,
                1,
                2
              ],
              [
                "sum",
                1,
                3,
                8
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 375,
    "focus": "logic equations",
    "title": "Logic Equations 36",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 4: A × E = 16. List distinct allowed value pairs, then use another clue involving A or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[7, 6, 5, 0, 1, 3, 4, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "E < F",
              "D − G = -4",
              "D − F = -3",
              "A × E = 16",
              "D − E = -1",
              "A − H = 5",
              "B − G = 2"
            ],
            "rules": [
              [
                "less",
                4,
                5,
                0
              ],
              [
                "difference",
                3,
                6,
                -4
              ],
              [
                "difference",
                3,
                5,
                -3
              ],
              [
                "product",
                0,
                4,
                16
              ],
              [
                "difference",
                3,
                4,
                -1
              ],
              [
                "difference",
                0,
                7,
                5
              ],
              [
                "difference",
                1,
                6,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 376,
    "focus": "logic equations",
    "title": "Logic Equations 37",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 3: F + G = 6. List distinct allowed value pairs, then use another clue involving F or G to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[1, 7, 6, 5, 3, 0, 4, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "E − F = 3",
              "A < G",
              "F + G = 6",
              "C − D = 1",
              "A − H = -1",
              "B − G = 3"
            ],
            "rules": [
              [
                "difference",
                4,
                5,
                3
              ],
              [
                "less",
                0,
                6,
                0
              ],
              [
                "sum",
                5,
                6,
                6
              ],
              [
                "difference",
                2,
                3,
                1
              ],
              [
                "difference",
                0,
                7,
                -1
              ],
              [
                "difference",
                1,
                6,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 377,
    "focus": "logic equations",
    "title": "Logic Equations 38",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: C × F = 56. List distinct allowed value pairs, then use another clue involving C or F to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[4, 1, 7, 2, 0, 6, 5, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "C × F = 56",
              "C + G = 14",
              "B − H = -2",
              "A + F = 12",
              "F × H = 28",
              "C − D = 5"
            ],
            "rules": [
              [
                "product",
                2,
                5,
                56
              ],
              [
                "sum",
                2,
                6,
                14
              ],
              [
                "difference",
                1,
                7,
                -2
              ],
              [
                "sum",
                0,
                5,
                12
              ],
              [
                "product",
                5,
                7,
                28
              ],
              [
                "difference",
                2,
                3,
                5
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 378,
    "focus": "logic equations",
    "title": "Logic Equations 39",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 6: A × D = 20. List distinct allowed value pairs, then use another clue involving A or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[3, 5, 0, 4, 2, 6, 1, 7]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "G < H",
              "C < D",
              "E − F = -4",
              "A + F = 11",
              "F < H",
              "A × D = 20",
              "C − E = -2",
              "B × D = 30"
            ],
            "rules": [
              [
                "less",
                6,
                7,
                0
              ],
              [
                "less",
                2,
                3,
                0
              ],
              [
                "difference",
                4,
                5,
                -4
              ],
              [
                "sum",
                0,
                5,
                11
              ],
              [
                "less",
                5,
                7,
                0
              ],
              [
                "product",
                0,
                3,
                20
              ],
              [
                "difference",
                2,
                4,
                -2
              ],
              [
                "product",
                1,
                3,
                30
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 379,
    "focus": "logic equations",
    "title": "Logic Equations 40",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 5: A × E = 30. List distinct allowed value pairs, then use another clue involving A or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[5, 6, 3, 7, 4, 1, 2, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "B − E = 2",
              "F − H = 1",
              "D × G = 24",
              "D × H = 8",
              "A × E = 30"
            ],
            "rules": [
              [
                "difference",
                1,
                4,
                2
              ],
              [
                "difference",
                5,
                7,
                1
              ],
              [
                "product",
                3,
                6,
                24
              ],
              [
                "product",
                3,
                7,
                8
              ],
              [
                "product",
                0,
                4,
                30
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 380,
    "focus": "logic equations",
    "title": "Logic Equations 41",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: D × H = 40. List distinct allowed value pairs, then use another clue involving D or H to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[1, 5, 0, 7, 2, 6, 3, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "D × H = 40",
              "B − D = -2",
              "G − H = -1",
              "A < E",
              "E < F",
              "E × F = 21",
              "A − H = -3"
            ],
            "rules": [
              [
                "product",
                3,
                7,
                40
              ],
              [
                "difference",
                1,
                3,
                -2
              ],
              [
                "difference",
                6,
                7,
                -1
              ],
              [
                "less",
                0,
                4,
                0
              ],
              [
                "less",
                4,
                5,
                0
              ],
              [
                "product",
                4,
                5,
                21
              ],
              [
                "difference",
                0,
                7,
                -3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 381,
    "focus": "logic equations",
    "title": "Logic Equations 42",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: D × H = 14. List distinct allowed value pairs, then use another clue involving D or H to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[4, 7, 2, 6, 3, 0, 5, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "G × H = 12",
              "D × H = 14",
              "D × F = 7",
              "A × D = 35",
              "A × B = 40",
              "B × C = 24"
            ],
            "rules": [
              [
                "product",
                6,
                7,
                12
              ],
              [
                "product",
                3,
                7,
                14
              ],
              [
                "product",
                3,
                5,
                7
              ],
              [
                "product",
                0,
                3,
                35
              ],
              [
                "product",
                0,
                1,
                40
              ],
              [
                "product",
                1,
                2,
                24
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 382,
    "focus": "logic equations",
    "title": "Logic Equations 43",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 5: A − H = 4. List distinct allowed value pairs, then use another clue involving A or H to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[4, 5, 2, 1, 3, 7, 6, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "E < G",
              "D < G",
              "F + H = 9",
              "A + D = 7",
              "A − H = 4",
              "A + C = 8",
              "B × D = 12"
            ],
            "rules": [
              [
                "less",
                4,
                6,
                0
              ],
              [
                "less",
                3,
                6,
                0
              ],
              [
                "sum",
                5,
                7,
                9
              ],
              [
                "sum",
                0,
                3,
                7
              ],
              [
                "difference",
                0,
                7,
                4
              ],
              [
                "sum",
                0,
                2,
                8
              ],
              [
                "product",
                1,
                3,
                12
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 383,
    "focus": "logic equations",
    "title": "Logic Equations 44",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: A × E = 18. List distinct allowed value pairs, then use another clue involving A or E to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[2, 6, 4, 1, 5, 0, 3, 7]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "A × E = 18",
              "C × G = 20",
              "C − F = 4",
              "A < E",
              "C − H = -3",
              "A × B = 21"
            ],
            "rules": [
              [
                "product",
                0,
                4,
                18
              ],
              [
                "product",
                2,
                6,
                20
              ],
              [
                "difference",
                2,
                5,
                4
              ],
              [
                "less",
                0,
                4,
                0
              ],
              [
                "difference",
                2,
                7,
                -3
              ],
              [
                "product",
                0,
                1,
                21
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 384,
    "focus": "logic equations",
    "title": "Logic Equations 45",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 2: D + H = 4. List distinct allowed value pairs, then use another clue involving D or H to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[5, 4, 3, 0, 7, 1, 6, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "B < G",
              "D + H = 4",
              "A + C = 10",
              "C × G = 28",
              "C + F = 6",
              "D − H = -2"
            ],
            "rules": [
              [
                "less",
                1,
                6,
                0
              ],
              [
                "sum",
                3,
                7,
                4
              ],
              [
                "sum",
                0,
                2,
                10
              ],
              [
                "product",
                2,
                6,
                28
              ],
              [
                "sum",
                2,
                5,
                6
              ],
              [
                "difference",
                3,
                7,
                -2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 385,
    "focus": "logic equations",
    "title": "Logic Equations 46",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 3: A − H = 5. List distinct allowed value pairs, then use another clue involving A or H to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[5, 7, 4, 3, 6, 1, 2, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "E − G = 4",
              "A × F = 12",
              "A − H = 5",
              "C − D = 1"
            ],
            "rules": [
              [
                "difference",
                4,
                6,
                4
              ],
              [
                "product",
                0,
                5,
                12
              ],
              [
                "difference",
                0,
                7,
                5
              ],
              [
                "difference",
                2,
                3,
                1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 386,
    "focus": "logic equations",
    "title": "Logic Equations 47",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: B + D = 15. List distinct allowed value pairs, then use another clue involving B or D to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 7, 4, 6, 2, 5, 1, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "B + D = 15",
              "A − D = -6",
              "A − E = -2",
              "D + G = 9",
              "E < H",
              "E × H = 12",
              "A + F = 7"
            ],
            "rules": [
              [
                "sum",
                1,
                3,
                15
              ],
              [
                "difference",
                0,
                3,
                -6
              ],
              [
                "difference",
                0,
                4,
                -2
              ],
              [
                "sum",
                3,
                6,
                9
              ],
              [
                "less",
                4,
                7,
                0
              ],
              [
                "product",
                4,
                7,
                12
              ],
              [
                "sum",
                0,
                5,
                7
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 387,
    "focus": "logic equations",
    "title": "Logic Equations 48",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 5: F × H = 32. List distinct allowed value pairs, then use another clue involving F or H to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[1, 5, 4, 2, 0, 3, 6, 7]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "E < H",
              "D × H = 24",
              "A − C = -3",
              "A + D = 5",
              "F × H = 32",
              "C − E = 4",
              "D + G = 10"
            ],
            "rules": [
              [
                "less",
                4,
                7,
                0
              ],
              [
                "product",
                3,
                7,
                24
              ],
              [
                "difference",
                0,
                2,
                -3
              ],
              [
                "sum",
                0,
                3,
                5
              ],
              [
                "product",
                5,
                7,
                32
              ],
              [
                "difference",
                2,
                4,
                4
              ],
              [
                "sum",
                3,
                6,
                10
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 388,
    "focus": "logic equations",
    "title": "Logic Equations 49",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 1: C × G = 48. List distinct allowed value pairs, then use another clue involving C or G to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[0, 1, 7, 6, 4, 3, 5, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "C × G = 48",
              "D × H = 21",
              "A − H = -2",
              "C − D = 1",
              "D − E = 2",
              "A × B = 2"
            ],
            "rules": [
              [
                "product",
                2,
                6,
                48
              ],
              [
                "product",
                3,
                7,
                21
              ],
              [
                "difference",
                0,
                7,
                -2
              ],
              [
                "difference",
                2,
                3,
                1
              ],
              [
                "difference",
                3,
                4,
                2
              ],
              [
                "product",
                0,
                1,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 389,
    "focus": "logic equations",
    "title": "Logic Equations 50",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with clue 3: F + H = 15. List distinct allowed value pairs, then use another clue involving F or H to narrow the assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "equation-grid",
            "marks": 3,
            "answer": "[[5, 2, 0, 4, 3, 7, 1, 6]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "B − F = -5",
              "C − E = -3",
              "F + H = 15",
              "B − D = -2",
              "C + D = 6",
              "A + B = 9"
            ],
            "rules": [
              [
                "difference",
                1,
                5,
                -5
              ],
              [
                "difference",
                2,
                4,
                -3
              ],
              [
                "sum",
                5,
                7,
                15
              ],
              [
                "difference",
                1,
                3,
                -2
              ],
              [
                "sum",
                2,
                3,
                6
              ],
              [
                "sum",
                0,
                1,
                9
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 735,
    "title": "Logic Equations · 51",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 4 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 2, 3, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              }
            ],
            "clues": [
              "A < C",
              "B − C = -1",
              "B + C = 7",
              "C − D = 3"
            ],
            "rules": [
              [
                "less",
                0,
                2,
                0
              ],
              [
                "difference",
                1,
                2,
                -1
              ],
              [
                "sum",
                1,
                2,
                7
              ],
              [
                "difference",
                2,
                3,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 736,
    "title": "Logic Equations · 52",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 2, 0, 3, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A + C = 3",
              "B × C = 3",
              "A + E = 7"
            ],
            "rules": [
              [
                "sum",
                0,
                2,
                3
              ],
              [
                "product",
                1,
                2,
                3
              ],
              [
                "sum",
                0,
                4,
                7
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 737,
    "title": "Logic Equations · 53",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 4 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 2, 1, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              }
            ],
            "clues": [
              "B − C = 1",
              "A + C = 3"
            ],
            "rules": [
              [
                "difference",
                1,
                2,
                1
              ],
              [
                "sum",
                0,
                2,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 738,
    "title": "Logic Equations · 54",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 1, 2, 0, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "B − D = 1",
              "B − E = -3",
              "C + D = 4"
            ],
            "rules": [
              [
                "difference",
                1,
                3,
                1
              ],
              [
                "difference",
                1,
                4,
                -3
              ],
              [
                "sum",
                2,
                3,
                4
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 739,
    "title": "Logic Equations · 55",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 4 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 0, 2, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              }
            ],
            "clues": [
              "A < C",
              "B × D = 4",
              "B − D = -3"
            ],
            "rules": [
              [
                "less",
                0,
                2,
                0
              ],
              [
                "product",
                1,
                3,
                4
              ],
              [
                "difference",
                1,
                3,
                -3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 740,
    "title": "Logic Equations · 56",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 2, 3, 4, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "D + E = 6",
              "D − E = 4",
              "A < C",
              "C − E = 3",
              "B − C = -1"
            ],
            "rules": [
              [
                "sum",
                3,
                4,
                6
              ],
              [
                "difference",
                3,
                4,
                4
              ],
              [
                "less",
                0,
                2,
                0
              ],
              [
                "difference",
                2,
                4,
                3
              ],
              [
                "difference",
                1,
                2,
                -1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 741,
    "title": "Logic Equations · 57",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 4 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 0, 1, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              }
            ],
            "clues": [
              "B < C",
              "C + D = 5",
              "C − D = -1"
            ],
            "rules": [
              [
                "less",
                1,
                2,
                0
              ],
              [
                "sum",
                2,
                3,
                5
              ],
              [
                "difference",
                2,
                3,
                -1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 742,
    "title": "Logic Equations · 58",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 4, 0, 3, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "D + E = 7",
              "A < D",
              "A × B = 10",
              "B − E = 2"
            ],
            "rules": [
              [
                "sum",
                3,
                4,
                7
              ],
              [
                "less",
                0,
                3,
                0
              ],
              [
                "product",
                0,
                1,
                10
              ],
              [
                "difference",
                1,
                4,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 743,
    "title": "Logic Equations · 59",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 4 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 0, 3, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              }
            ],
            "clues": [
              "A − B = 2",
              "C + D = 6",
              "A × C = 12"
            ],
            "rules": [
              [
                "difference",
                0,
                1,
                2
              ],
              [
                "sum",
                2,
                3,
                6
              ],
              [
                "product",
                0,
                2,
                12
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 744,
    "title": "Logic Equations · 60",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 2, 4, 0, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "C − E = 3",
              "A − E = 2",
              "B − C = -2",
              "A + B = 7"
            ],
            "rules": [
              [
                "difference",
                2,
                4,
                3
              ],
              [
                "difference",
                0,
                4,
                2
              ],
              [
                "difference",
                1,
                2,
                -2
              ],
              [
                "sum",
                0,
                1,
                7
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 745,
    "title": "Logic Equations · 61",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 4 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 2, 3, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              }
            ],
            "clues": [
              "C × D = 4",
              "A < C",
              "B × D = 3"
            ],
            "rules": [
              [
                "product",
                2,
                3,
                4
              ],
              [
                "less",
                0,
                2,
                0
              ],
              [
                "product",
                1,
                3,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 746,
    "title": "Logic Equations · 62",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 2, 3, 4, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "A + E = 3",
              "D − E = 3",
              "B < D",
              "C − E = 2"
            ],
            "rules": [
              [
                "sum",
                0,
                4,
                3
              ],
              [
                "difference",
                3,
                4,
                3
              ],
              [
                "less",
                1,
                3,
                0
              ],
              [
                "difference",
                2,
                4,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 747,
    "title": "Logic Equations · 63",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 4 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 1, 2, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              }
            ],
            "clues": [
              "C + D = 4",
              "B + D = 3"
            ],
            "rules": [
              [
                "sum",
                2,
                3,
                4
              ],
              [
                "sum",
                1,
                3,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 748,
    "title": "Logic Equations · 64",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 5 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 4, 1, 2, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5"
                ]
              }
            ],
            "clues": [
              "B × C = 10",
              "A − B = -4",
              "C − D = -1"
            ],
            "rules": [
              [
                "product",
                1,
                2,
                10
              ],
              [
                "difference",
                0,
                1,
                -4
              ],
              [
                "difference",
                2,
                3,
                -1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 749,
    "title": "Logic Equations · 65",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:foundation"
    ],
    "challengeLevel": "foundation",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 4 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 1, 3, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4"
                ]
              }
            ],
            "clues": [
              "A < B",
              "B < C",
              "A − B = -1",
              "B < D",
              "A × D = 3"
            ],
            "rules": [
              [
                "less",
                0,
                1,
                0
              ],
              [
                "less",
                1,
                2,
                0
              ],
              [
                "difference",
                0,
                1,
                -1
              ],
              [
                "less",
                1,
                3,
                0
              ],
              [
                "product",
                0,
                3,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 750,
    "title": "Logic Equations · 66",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 2, 4, 5, 1, 6, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "D − G = 5",
              "C + F = 12",
              "D − F = -1",
              "B − F = -4",
              "A + C = 9"
            ],
            "rules": [
              [
                "difference",
                3,
                6,
                5
              ],
              [
                "sum",
                2,
                5,
                12
              ],
              [
                "difference",
                3,
                5,
                -1
              ],
              [
                "difference",
                1,
                5,
                -4
              ],
              [
                "sum",
                0,
                2,
                9
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 751,
    "title": "Logic Equations · 67",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 0, 2, 5, 3, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "C × D = 18",
              "D − F = 1",
              "A + B = 3",
              "A × C = 6"
            ],
            "rules": [
              [
                "product",
                2,
                3,
                18
              ],
              [
                "difference",
                3,
                5,
                1
              ],
              [
                "sum",
                0,
                1,
                3
              ],
              [
                "product",
                0,
                2,
                6
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 752,
    "title": "Logic Equations · 68",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[4, 2, 5, 0, 1, 3, 6]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "A + G = 12",
              "A − C = -1",
              "D − G = -6",
              "D × E = 2",
              "B − E = 1"
            ],
            "rules": [
              [
                "sum",
                0,
                6,
                12
              ],
              [
                "difference",
                0,
                2,
                -1
              ],
              [
                "difference",
                3,
                6,
                -6
              ],
              [
                "product",
                3,
                4,
                2
              ],
              [
                "difference",
                1,
                4,
                1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 753,
    "title": "Logic Equations · 69",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 4, 0, 1, 2, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "C − E = -2",
              "A < B",
              "D + F = 8",
              "B − C = 4",
              "C + D = 3"
            ],
            "rules": [
              [
                "difference",
                2,
                4,
                -2
              ],
              [
                "less",
                0,
                1,
                0
              ],
              [
                "sum",
                3,
                5,
                8
              ],
              [
                "difference",
                1,
                2,
                4
              ],
              [
                "sum",
                2,
                3,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 754,
    "title": "Logic Equations · 70",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 4, 6, 1, 3, 5, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "C × D = 14",
              "B × G = 15",
              "C × G = 21",
              "D + E = 6",
              "A − B = -4"
            ],
            "rules": [
              [
                "product",
                2,
                3,
                14
              ],
              [
                "product",
                1,
                6,
                15
              ],
              [
                "product",
                2,
                6,
                21
              ],
              [
                "sum",
                3,
                4,
                6
              ],
              [
                "difference",
                0,
                1,
                -4
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 755,
    "title": "Logic Equations · 71",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 4, 2, 3, 5, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "A × E = 6",
              "A < B",
              "B − D = 1",
              "D × F = 8",
              "B − F = 3"
            ],
            "rules": [
              [
                "product",
                0,
                4,
                6
              ],
              [
                "less",
                0,
                1,
                0
              ],
              [
                "difference",
                1,
                3,
                1
              ],
              [
                "product",
                3,
                5,
                8
              ],
              [
                "difference",
                1,
                5,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 756,
    "title": "Logic Equations · 72",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[6, 0, 1, 2, 3, 4, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "E < G",
              "C − F = -3",
              "C < G",
              "A − B = 6",
              "D − G = -3",
              "C + F = 7"
            ],
            "rules": [
              [
                "less",
                4,
                6,
                0
              ],
              [
                "difference",
                2,
                5,
                -3
              ],
              [
                "less",
                2,
                6,
                0
              ],
              [
                "difference",
                0,
                1,
                6
              ],
              [
                "difference",
                3,
                6,
                -3
              ],
              [
                "sum",
                2,
                5,
                7
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 757,
    "title": "Logic Equations · 73",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[5, 2, 0, 1, 4, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "C + F = 5",
              "A − C = 5",
              "B < E",
              "B + E = 8"
            ],
            "rules": [
              [
                "sum",
                2,
                5,
                5
              ],
              [
                "difference",
                0,
                2,
                5
              ],
              [
                "less",
                1,
                4,
                0
              ],
              [
                "sum",
                1,
                4,
                8
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 758,
    "title": "Logic Equations · 74",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 0, 2, 4, 3, 6, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "C < E",
              "B − C = -2",
              "C + E = 7",
              "B × F = 7",
              "D − E = 1",
              "C < G"
            ],
            "rules": [
              [
                "less",
                2,
                4,
                0
              ],
              [
                "difference",
                1,
                2,
                -2
              ],
              [
                "sum",
                2,
                4,
                7
              ],
              [
                "product",
                1,
                5,
                7
              ],
              [
                "difference",
                3,
                4,
                1
              ],
              [
                "less",
                2,
                6,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 759,
    "title": "Logic Equations · 75",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 3, 4, 2, 1, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "D − F = -3",
              "B < C",
              "B − F = -2",
              "A − C = -4"
            ],
            "rules": [
              [
                "difference",
                3,
                5,
                -3
              ],
              [
                "less",
                1,
                2,
                0
              ],
              [
                "difference",
                1,
                5,
                -2
              ],
              [
                "difference",
                0,
                2,
                -4
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 760,
    "title": "Logic Equations · 76",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[5, 3, 0, 2, 1, 6, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "F − G = 2",
              "A × E = 12",
              "C − D = -2",
              "E − G = -3"
            ],
            "rules": [
              [
                "difference",
                5,
                6,
                2
              ],
              [
                "product",
                0,
                4,
                12
              ],
              [
                "difference",
                2,
                3,
                -2
              ],
              [
                "difference",
                4,
                6,
                -3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 761,
    "title": "Logic Equations · 77",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 4, 0, 1, 3, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "B < F",
              "B − F = -1",
              "C × E = 4",
              "B + D = 7",
              "A − C = 2",
              "D − F = -4"
            ],
            "rules": [
              [
                "less",
                1,
                5,
                0
              ],
              [
                "difference",
                1,
                5,
                -1
              ],
              [
                "product",
                2,
                4,
                4
              ],
              [
                "sum",
                1,
                3,
                7
              ],
              [
                "difference",
                0,
                2,
                2
              ],
              [
                "difference",
                3,
                5,
                -4
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 762,
    "title": "Logic Equations · 78",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 2, 5, 6, 1, 3, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "B − F = -1",
              "A − F = -3",
              "B + C = 9",
              "D − E = 5",
              "B + G = 8"
            ],
            "rules": [
              [
                "difference",
                1,
                5,
                -1
              ],
              [
                "difference",
                0,
                5,
                -3
              ],
              [
                "sum",
                1,
                2,
                9
              ],
              [
                "difference",
                3,
                4,
                5
              ],
              [
                "sum",
                1,
                6,
                8
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 763,
    "title": "Logic Equations · 79",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[4, 0, 5, 1, 3, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "B < F",
              "A − E = 1",
              "A × D = 10",
              "B + E = 5",
              "B < C",
              "C − D = 4"
            ],
            "rules": [
              [
                "less",
                1,
                5,
                0
              ],
              [
                "difference",
                0,
                4,
                1
              ],
              [
                "product",
                0,
                3,
                10
              ],
              [
                "sum",
                1,
                4,
                5
              ],
              [
                "less",
                1,
                2,
                0
              ],
              [
                "difference",
                2,
                3,
                4
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 764,
    "title": "Logic Equations · 80",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[6, 3, 0, 1, 4, 5, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "B + G = 7",
              "D × E = 10",
              "B < F",
              "A × C = 7",
              "C × G = 3",
              "B × D = 8"
            ],
            "rules": [
              [
                "sum",
                1,
                6,
                7
              ],
              [
                "product",
                3,
                4,
                10
              ],
              [
                "less",
                1,
                5,
                0
              ],
              [
                "product",
                0,
                2,
                7
              ],
              [
                "product",
                2,
                6,
                3
              ],
              [
                "product",
                1,
                3,
                8
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 765,
    "title": "Logic Equations · 81",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 2, 4, 0, 5, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "A < B",
              "A − F = -2",
              "B < F",
              "B − C = -2",
              "E − F = 2",
              "D − E = -5"
            ],
            "rules": [
              [
                "less",
                0,
                1,
                0
              ],
              [
                "difference",
                0,
                5,
                -2
              ],
              [
                "less",
                1,
                5,
                0
              ],
              [
                "difference",
                1,
                2,
                -2
              ],
              [
                "difference",
                4,
                5,
                2
              ],
              [
                "difference",
                3,
                4,
                -5
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 766,
    "title": "Logic Equations · 82",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 0, 4, 5, 2, 1, 6]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "E × F = 6",
              "D + E = 9",
              "B × G = 7",
              "C × E = 15",
              "E < G"
            ],
            "rules": [
              [
                "product",
                4,
                5,
                6
              ],
              [
                "sum",
                3,
                4,
                9
              ],
              [
                "product",
                1,
                6,
                7
              ],
              [
                "product",
                2,
                4,
                15
              ],
              [
                "less",
                4,
                6,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 767,
    "title": "Logic Equations · 83",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[5, 0, 2, 4, 1, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "E + F = 6",
              "A × F = 24",
              "C < D",
              "B < F",
              "A × B = 6"
            ],
            "rules": [
              [
                "sum",
                4,
                5,
                6
              ],
              [
                "product",
                0,
                5,
                24
              ],
              [
                "less",
                2,
                3,
                0
              ],
              [
                "less",
                1,
                5,
                0
              ],
              [
                "product",
                0,
                1,
                6
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 768,
    "title": "Logic Equations · 84",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 1, 4, 0, 2, 6, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "C + D = 6",
              "A + E = 7",
              "A + B = 6",
              "C + G = 11",
              "B + D = 3"
            ],
            "rules": [
              [
                "sum",
                2,
                3,
                6
              ],
              [
                "sum",
                0,
                4,
                7
              ],
              [
                "sum",
                0,
                1,
                6
              ],
              [
                "sum",
                2,
                6,
                11
              ],
              [
                "sum",
                1,
                3,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 769,
    "title": "Logic Equations · 85",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:standard"
    ],
    "challengeLevel": "standard",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 6 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[4, 0, 2, 5, 1, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6"
                ]
              }
            ],
            "clues": [
              "B < D",
              "D + E = 8",
              "D × E = 12",
              "C < D",
              "B × F = 4",
              "B < E",
              "A − D = -1"
            ],
            "rules": [
              [
                "less",
                1,
                3,
                0
              ],
              [
                "sum",
                3,
                4,
                8
              ],
              [
                "product",
                3,
                4,
                12
              ],
              [
                "less",
                2,
                3,
                0
              ],
              [
                "product",
                1,
                5,
                4
              ],
              [
                "less",
                1,
                4,
                0
              ],
              [
                "difference",
                0,
                3,
                -1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 770,
    "title": "Logic Equations · 86",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 7, 2, 5, 0, 4, 1, 6]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "B − G = 6",
              "B − H = 1",
              "A < B",
              "A < D",
              "E + H = 8",
              "B × C = 24",
              "F + H = 12"
            ],
            "rules": [
              [
                "difference",
                1,
                6,
                6
              ],
              [
                "difference",
                1,
                7,
                1
              ],
              [
                "less",
                0,
                1,
                0
              ],
              [
                "less",
                0,
                3,
                0
              ],
              [
                "sum",
                4,
                7,
                8
              ],
              [
                "product",
                1,
                2,
                24
              ],
              [
                "sum",
                5,
                7,
                12
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 771,
    "title": "Logic Equations · 87",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[6, 4, 5, 2, 0, 3, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "C + E = 7",
              "B − C = -1",
              "A + F = 11",
              "C − G = 4",
              "B + F = 9"
            ],
            "rules": [
              [
                "sum",
                2,
                4,
                7
              ],
              [
                "difference",
                1,
                2,
                -1
              ],
              [
                "sum",
                0,
                5,
                11
              ],
              [
                "difference",
                2,
                6,
                4
              ],
              [
                "sum",
                1,
                5,
                9
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 772,
    "title": "Logic Equations · 88",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 3, 1, 0, 6, 5, 7, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "A × E = 21",
              "G − H = 3",
              "F − G = -2",
              "D + E = 8",
              "A + D = 4",
              "C × D = 2"
            ],
            "rules": [
              [
                "product",
                0,
                4,
                21
              ],
              [
                "difference",
                6,
                7,
                3
              ],
              [
                "difference",
                5,
                6,
                -2
              ],
              [
                "sum",
                3,
                4,
                8
              ],
              [
                "sum",
                0,
                3,
                4
              ],
              [
                "product",
                2,
                3,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 773,
    "title": "Logic Equations · 89",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[6, 4, 0, 3, 5, 2, 1]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "B − C = 4",
              "C × G = 2",
              "C + F = 4",
              "A + F = 10",
              "C + D = 5"
            ],
            "rules": [
              [
                "difference",
                1,
                2,
                4
              ],
              [
                "product",
                2,
                6,
                2
              ],
              [
                "sum",
                2,
                5,
                4
              ],
              [
                "sum",
                0,
                5,
                10
              ],
              [
                "sum",
                2,
                3,
                5
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 774,
    "title": "Logic Equations · 90",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 1, 6, 4, 0, 2, 5, 7]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "B < D",
              "G + H = 14",
              "A + H = 12",
              "B − H = -6",
              "A < C",
              "C − G = 1",
              "C + F = 10"
            ],
            "rules": [
              [
                "less",
                1,
                3,
                0
              ],
              [
                "sum",
                6,
                7,
                14
              ],
              [
                "sum",
                0,
                7,
                12
              ],
              [
                "difference",
                1,
                7,
                -6
              ],
              [
                "less",
                0,
                2,
                0
              ],
              [
                "difference",
                2,
                6,
                1
              ],
              [
                "sum",
                2,
                5,
                10
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 775,
    "title": "Logic Equations · 91",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 4, 2, 5, 0, 1, 6]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "E < F",
              "C + F = 5",
              "B − C = 2",
              "B < D",
              "A × D = 24"
            ],
            "rules": [
              [
                "less",
                4,
                5,
                0
              ],
              [
                "sum",
                2,
                5,
                5
              ],
              [
                "difference",
                1,
                2,
                2
              ],
              [
                "less",
                1,
                3,
                0
              ],
              [
                "product",
                0,
                3,
                24
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 776,
    "title": "Logic Equations · 92",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[5, 1, 6, 0, 3, 4, 2, 7]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "D − H = -7",
              "A + H = 14",
              "A + B = 8",
              "C × E = 28",
              "C × F = 35"
            ],
            "rules": [
              [
                "difference",
                3,
                7,
                -7
              ],
              [
                "sum",
                0,
                7,
                14
              ],
              [
                "sum",
                0,
                1,
                8
              ],
              [
                "product",
                2,
                4,
                28
              ],
              [
                "product",
                2,
                5,
                35
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 777,
    "title": "Logic Equations · 93",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 3, 2, 4, 0, 6, 5]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "B + D = 9",
              "D − E = 4",
              "B + G = 10",
              "D + F = 12",
              "C − E = 2"
            ],
            "rules": [
              [
                "sum",
                1,
                3,
                9
              ],
              [
                "difference",
                3,
                4,
                4
              ],
              [
                "sum",
                1,
                6,
                10
              ],
              [
                "sum",
                3,
                5,
                12
              ],
              [
                "difference",
                2,
                4,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 778,
    "title": "Logic Equations · 94",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 0, 2, 5, 6, 7, 4, 3]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "C + H = 7",
              "G × H = 20",
              "F + G = 13",
              "C < E",
              "D − G = 1",
              "A − D = -4"
            ],
            "rules": [
              [
                "sum",
                2,
                7,
                7
              ],
              [
                "product",
                6,
                7,
                20
              ],
              [
                "sum",
                5,
                6,
                13
              ],
              [
                "less",
                2,
                4,
                0
              ],
              [
                "difference",
                3,
                6,
                1
              ],
              [
                "difference",
                0,
                3,
                -4
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 779,
    "title": "Logic Equations · 95",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[4, 1, 3, 2, 5, 6, 0]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "C − F = -3",
              "A × B = 10",
              "B < E",
              "A + D = 8",
              "A × C = 20"
            ],
            "rules": [
              [
                "difference",
                2,
                5,
                -3
              ],
              [
                "product",
                0,
                1,
                10
              ],
              [
                "less",
                1,
                4,
                0
              ],
              [
                "sum",
                0,
                3,
                8
              ],
              [
                "product",
                0,
                2,
                20
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 780,
    "title": "Logic Equations · 96",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[5, 0, 7, 1, 2, 3, 6, 4]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "B + E = 4",
              "F + G = 11",
              "B − F = -3",
              "A + C = 14",
              "G − H = 2",
              "A + F = 10"
            ],
            "rules": [
              [
                "sum",
                1,
                4,
                4
              ],
              [
                "sum",
                5,
                6,
                11
              ],
              [
                "difference",
                1,
                5,
                -3
              ],
              [
                "sum",
                0,
                2,
                14
              ],
              [
                "difference",
                6,
                7,
                2
              ],
              [
                "sum",
                0,
                5,
                10
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 781,
    "title": "Logic Equations · 97",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 2, 5, 4, 0, 1, 6]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "B < C",
              "E − G = -6",
              "A + F = 6",
              "C + D = 11",
              "A × B = 12",
              "C + F = 8"
            ],
            "rules": [
              [
                "less",
                1,
                2,
                0
              ],
              [
                "difference",
                4,
                6,
                -6
              ],
              [
                "sum",
                0,
                5,
                6
              ],
              [
                "sum",
                2,
                3,
                11
              ],
              [
                "product",
                0,
                1,
                12
              ],
              [
                "sum",
                2,
                5,
                8
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 782,
    "title": "Logic Equations · 98",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 4, 2, 5, 1, 6, 0, 7]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "B − G = 4",
              "E − G = 1",
              "D − H = -2",
              "B × D = 30",
              "D × G = 6",
              "C < D",
              "A × C = 12",
              "C − D = -3"
            ],
            "rules": [
              [
                "difference",
                1,
                6,
                4
              ],
              [
                "difference",
                4,
                6,
                1
              ],
              [
                "difference",
                3,
                7,
                -2
              ],
              [
                "product",
                1,
                3,
                30
              ],
              [
                "product",
                3,
                6,
                6
              ],
              [
                "less",
                2,
                3,
                0
              ],
              [
                "product",
                0,
                2,
                12
              ],
              [
                "difference",
                2,
                3,
                -3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 783,
    "title": "Logic Equations · 99",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 7 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a sum or difference that has few possible pairs. Use the all-different rule to narrow the remaining values.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 0, 4, 5, 6, 1, 2]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7"
                ]
              }
            ],
            "clues": [
              "E + G = 10",
              "B + C = 6",
              "D − F = 4",
              "B + E = 8",
              "E + F = 9"
            ],
            "rules": [
              [
                "sum",
                4,
                6,
                10
              ],
              [
                "sum",
                1,
                2,
                6
              ],
              [
                "difference",
                3,
                5,
                4
              ],
              [
                "sum",
                1,
                4,
                8
              ],
              [
                "sum",
                4,
                5,
                9
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 784,
    "title": "Logic Equations · 100",
    "focus": "logic equations",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:stretch"
    ],
    "challengeLevel": "stretch",
    "fixed": true,
    "setSize": 3,
    "estimatedMinutes": 8,
    "variations": [
      {
        "prompt": "Assign the integers 1 to 8 to the variables, using each once. All equations and inequalities must hold. × means multiplication.",
        "hint": "Start with a product with few factor pairs, or a sum near the smallest or largest possible total. Use each integer once.",
        "parts": [
          {
            "id": "0",
            "kind": "equation-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 5, 1, 4, 2, 6, 3, 7]]",
            "explanation": "Use products and differences to narrow candidates, then combine the remaining constraints and the all-different rule.",
            "solutionText": "See the completed board below.",
            "names": [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H"
            ],
            "categories": [
              {
                "name": "Value",
                "values": [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8"
                ]
              }
            ],
            "clues": [
              "G + H = 12",
              "B + G = 10",
              "C × G = 8",
              "B × E = 18",
              "A + F = 8",
              "B + F = 13"
            ],
            "rules": [
              [
                "sum",
                6,
                7,
                12
              ],
              [
                "sum",
                1,
                6,
                10
              ],
              [
                "product",
                2,
                6,
                8
              ],
              [
                "product",
                1,
                4,
                18
              ],
              [
                "sum",
                0,
                5,
                8
              ],
              [
                "sum",
                1,
                5,
                13
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "permutation enumeration"
            }
          }
        ]
      }
    ]
  }
];
