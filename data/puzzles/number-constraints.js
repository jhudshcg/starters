// Generated deterministic, solver-checked instances. See scripts/expand-puzzles.py.
export default [
  {
    "slot": 125,
    "focus": "number constraints",
    "title": "Arithmetic cages 1",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 3, 5, 2, 1, 3, 5, 1, 4, 2, 5, 1, 2, 3, 4, 2, 4, 3, 1, 5, 1, 2, 4, 5, 3]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  2,
                  3,
                  7
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  4,
                  9
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  5,
                  6,
                  10
                ],
                "op": "+",
                "target": 13
              },
              {
                "cells": [
                  8,
                  13,
                  12
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  11,
                  16
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  14,
                  19
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  15,
                  20
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  17,
                  22,
                  21
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  18,
                  23
                ],
                "op": "×",
                "target": 5
              },
              {
                "cells": [
                  24
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 2, 3, 1, 5, 3, 1, 5, 4, 2, 5, 4, 2, 3, 1, 2, 3, 1, 5, 4, 1, 5, 4, 2, 3]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5,
                  1
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "×",
                "target": 3
              },
              {
                "cells": [
                  4,
                  9,
                  8
                ],
                "op": "×",
                "target": 40
              },
              {
                "cells": [
                  6,
                  7
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  10,
                  11
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  12,
                  17
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  13,
                  18
                ],
                "op": "×",
                "target": 15
              },
              {
                "cells": [
                  14,
                  19
                ],
                "op": "÷",
                "target": 4
              },
              {
                "cells": [
                  15,
                  16
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  22,
                  23
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  24
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 3, 5, 2, 4, 2, 1, 4, 5, 3, 5, 2, 3, 4, 1, 4, 5, 1, 3, 2, 3, 4, 2, 1, 5]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  5
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  2,
                  7,
                  12
                ],
                "op": "+",
                "target": 12
              },
              {
                "cells": [
                  3,
                  4
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  6,
                  11,
                  10
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  8,
                  13
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  9,
                  14
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  15,
                  20
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  16,
                  17
                ],
                "op": "×",
                "target": 5
              },
              {
                "cells": [
                  18,
                  23
                ],
                "op": "×",
                "target": 3
              },
              {
                "cells": [
                  19,
                  24
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  21,
                  22
                ],
                "op": "÷",
                "target": 2
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 1, 3, 2, 5, 1, 2, 4, 5, 3, 5, 3, 2, 4, 1, 2, 5, 1, 3, 4, 3, 4, 5, 1, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  5
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  4,
                  9
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  6,
                  11
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  7,
                  12
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  8,
                  13
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  14,
                  19,
                  18
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  16,
                  17
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  22,
                  23,
                  24
                ],
                "op": "×",
                "target": 10
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[5, 3, 2, 4, 1, 1, 5, 3, 2, 4, 4, 1, 5, 3, 2, 2, 4, 1, 5, 3, 3, 2, 4, 1, 5]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  1,
                  6
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  4,
                  9,
                  8
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  7,
                  12,
                  17
                ],
                "op": "×",
                "target": 15
              },
              {
                "cells": [
                  10,
                  11
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  13,
                  18,
                  14
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  15,
                  16
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  19,
                  24
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  20,
                  21,
                  22
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  23
                ],
                "op": "=",
                "target": 1
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 126,
    "focus": "number constraints",
    "title": "Arithmetic cages 2",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[2, 5, 4, 1, 3, 5, 4, 3, 2, 1, 4, 3, 1, 5, 2, 1, 2, 5, 3, 4, 3, 1, 2, 4, 5]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  2,
                  7
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  3,
                  8,
                  9
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  4
                ],
                "op": "=",
                "target": 3
              },
              {
                "cells": [
                  5,
                  10
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  6,
                  11,
                  16
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  12,
                  17
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  13,
                  18
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  14,
                  19,
                  24
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  15,
                  20
                ],
                "op": "+",
                "target": 4
              },
              {
                "cells": [
                  21,
                  22
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  23
                ],
                "op": "=",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 4, 5, 1, 2, 1, 3, 4, 2, 5, 2, 1, 3, 5, 4, 4, 5, 2, 3, 1, 5, 2, 1, 4, 3]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5,
                  10
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  1,
                  6
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  4,
                  9
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  7,
                  12
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  8,
                  13
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  11,
                  16,
                  15
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  14,
                  19
                ],
                "op": "÷",
                "target": 4
              },
              {
                "cells": [
                  17,
                  18
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  20,
                  21,
                  22
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  23,
                  24
                ],
                "op": "×",
                "target": 12
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 2, 1, 3, 5, 5, 4, 2, 1, 3, 2, 1, 3, 5, 4, 3, 5, 4, 2, 1, 1, 3, 5, 4, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  4,
                  9
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  5,
                  10
                ],
                "op": "−",
                "target": 3
              },
              {
                "cells": [
                  6,
                  7,
                  11
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  8,
                  13,
                  12
                ],
                "op": "×",
                "target": 15
              },
              {
                "cells": [
                  14,
                  19,
                  24
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  15,
                  20,
                  16
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  17,
                  22,
                  18
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  21
                ],
                "op": "=",
                "target": 3
              },
              {
                "cells": [
                  23
                ],
                "op": "=",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 1, 3, 5, 2, 3, 2, 5, 1, 4, 5, 4, 1, 2, 3, 1, 3, 2, 4, 5, 2, 5, 4, 3, 1]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  1,
                  6
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  2,
                  7
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  3,
                  8,
                  9
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  4
                ],
                "op": "=",
                "target": 2
              },
              {
                "cells": [
                  10,
                  15,
                  20
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  11,
                  12
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  13,
                  18
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  14,
                  19,
                  24
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  16,
                  17
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  21,
                  22
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  23
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[5, 1, 4, 2, 3, 1, 4, 2, 3, 5, 3, 5, 1, 4, 2, 4, 2, 3, 5, 1, 2, 3, 5, 1, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  1,
                  6
                ],
                "op": "÷",
                "target": 4
              },
              {
                "cells": [
                  2,
                  3,
                  4
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  7,
                  8,
                  13
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  9,
                  14,
                  19
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  10,
                  15,
                  20
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  11,
                  16,
                  12
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  17,
                  22
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  18,
                  23,
                  24
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  21
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 127,
    "focus": "number constraints",
    "title": "Arithmetic cages 3",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[5, 4, 3, 2, 1, 2, 1, 5, 4, 3, 1, 5, 4, 3, 2, 4, 3, 2, 1, 5, 3, 2, 1, 5, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  5
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  2,
                  7
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  3,
                  4
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  6,
                  11
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  8,
                  13
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  9,
                  14,
                  19
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "÷",
                "target": 4
              },
              {
                "cells": [
                  12,
                  17,
                  18
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  16,
                  21,
                  22
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  20
                ],
                "op": "=",
                "target": 3
              },
              {
                "cells": [
                  23,
                  24
                ],
                "op": "−",
                "target": 1
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[2, 4, 3, 1, 5, 4, 1, 2, 5, 3, 5, 3, 1, 2, 4, 3, 2, 5, 4, 1, 1, 5, 4, 3, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  2,
                  7,
                  3
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  4,
                  9,
                  8
                ],
                "op": "×",
                "target": 75
              },
              {
                "cells": [
                  5,
                  10,
                  11
                ],
                "op": "×",
                "target": 60
              },
              {
                "cells": [
                  6
                ],
                "op": "=",
                "target": 1
              },
              {
                "cells": [
                  12,
                  13,
                  17
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  14,
                  19,
                  18
                ],
                "op": "×",
                "target": 16
              },
              {
                "cells": [
                  15,
                  20,
                  16
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  21,
                  22
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  23,
                  24
                ],
                "op": "+",
                "target": 5
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 2, 4, 1, 5, 5, 4, 1, 3, 2, 4, 3, 5, 2, 1, 2, 1, 3, 5, 4, 1, 5, 2, 4, 3]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "×",
                "target": 15
              },
              {
                "cells": [
                  1,
                  6,
                  7
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  2,
                  3,
                  4
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  8,
                  13
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  9,
                  14
                ],
                "op": "+",
                "target": 3
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  11,
                  16
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  12,
                  17
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  18,
                  19
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  22,
                  23
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  24
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 4, 2, 3, 5, 4, 2, 5, 1, 3, 2, 5, 3, 4, 1, 3, 1, 4, 5, 2, 5, 3, 1, 2, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  1,
                  6
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  2,
                  7,
                  8
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  3,
                  4
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  9,
                  14,
                  19
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  10,
                  15,
                  16
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  11,
                  12,
                  17
                ],
                "op": "+",
                "target": 12
              },
              {
                "cells": [
                  13,
                  18,
                  23
                ],
                "op": "×",
                "target": 40
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  22
                ],
                "op": "=",
                "target": 1
              },
              {
                "cells": [
                  24
                ],
                "op": "=",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[5, 4, 3, 1, 2, 3, 2, 1, 4, 5, 2, 1, 5, 3, 4, 4, 3, 2, 5, 1, 1, 5, 4, 2, 3]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  2,
                  3,
                  7
                ],
                "op": "×",
                "target": 3
              },
              {
                "cells": [
                  4,
                  9,
                  14
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  5,
                  6,
                  10
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  8,
                  13
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  11,
                  12
                ],
                "op": "×",
                "target": 5
              },
              {
                "cells": [
                  15,
                  16,
                  20
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  17,
                  18
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  19,
                  24
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  21,
                  22,
                  23
                ],
                "op": "+",
                "target": 11
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 128,
    "focus": "number constraints",
    "title": "Arithmetic cages 4",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 1, 4, 2, 5, 5, 2, 1, 3, 4, 1, 5, 3, 4, 2, 2, 4, 5, 1, 3, 4, 3, 2, 5, 1]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  2,
                  7
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  3,
                  8
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  4,
                  9,
                  14
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  5,
                  6,
                  10
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  11,
                  16,
                  15
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  12,
                  13
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  17,
                  22
                ],
                "op": "−",
                "target": 3
              },
              {
                "cells": [
                  18,
                  23
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  19,
                  24
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "−",
                "target": 1
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 1, 2, 5, 4, 2, 5, 1, 4, 3, 1, 4, 5, 3, 2, 5, 3, 4, 2, 1, 4, 2, 3, 1, 5]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  1,
                  2,
                  7
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  3,
                  8
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  4,
                  9
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  6,
                  11
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  12,
                  13
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  14,
                  19,
                  18
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  16,
                  17
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  22,
                  23
                ],
                "op": "×",
                "target": 3
              },
              {
                "cells": [
                  24
                ],
                "op": "=",
                "target": 5
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 5, 1, 2, 3, 1, 2, 5, 3, 4, 5, 3, 2, 4, 1, 2, 4, 3, 1, 5, 3, 1, 4, 5, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  2,
                  7
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  3,
                  4
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  5,
                  6
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  8,
                  9
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  11,
                  12
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  13,
                  18
                ],
                "op": "÷",
                "target": 4
              },
              {
                "cells": [
                  14,
                  19,
                  24
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  16,
                  21,
                  20
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  17,
                  22
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  23
                ],
                "op": "=",
                "target": 5
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 2, 5, 3, 1, 3, 4, 1, 5, 2, 1, 5, 4, 2, 3, 5, 3, 2, 1, 4, 2, 1, 3, 4, 5]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5,
                  1
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  2,
                  7
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  3,
                  4
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  6,
                  11
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  8,
                  13
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  9,
                  14
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  12,
                  17,
                  18
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  16,
                  21
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  19,
                  24,
                  23
                ],
                "op": "+",
                "target": 13
              },
              {
                "cells": [
                  20
                ],
                "op": "=",
                "target": 2
              },
              {
                "cells": [
                  22
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 2, 5, 4, 1, 2, 4, 1, 5, 3, 5, 1, 2, 3, 4, 1, 3, 4, 2, 5, 4, 5, 3, 1, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  1,
                  2,
                  7
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  3,
                  4,
                  8
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  6,
                  11
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  9,
                  14,
                  13
                ],
                "op": "×",
                "target": 36
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  12,
                  17
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  16,
                  21,
                  22
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  18,
                  23
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  19,
                  24
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  20
                ],
                "op": "=",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 129,
    "focus": "number constraints",
    "title": "Arithmetic cages 5",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 3, 1, 5, 2, 5, 4, 2, 1, 3, 1, 5, 3, 2, 4, 2, 1, 4, 3, 5, 3, 2, 5, 4, 1]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  1,
                  6
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  4,
                  9
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  7,
                  8,
                  13
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  11,
                  12
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  14,
                  19,
                  24
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  16,
                  21,
                  22
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  17,
                  18
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  20
                ],
                "op": "=",
                "target": 3
              },
              {
                "cells": [
                  23
                ],
                "op": "=",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 1, 3, 5, 2, 1, 2, 5, 4, 3, 2, 3, 4, 1, 5, 5, 4, 2, 3, 1, 3, 5, 1, 2, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5,
                  6
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  1,
                  2,
                  7
                ],
                "op": "×",
                "target": 15
              },
              {
                "cells": [
                  3,
                  4
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  8,
                  9
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  10,
                  11,
                  16
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  12,
                  17
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  13,
                  14
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  15,
                  20
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  18,
                  23
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  19,
                  24
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  21,
                  22
                ],
                "op": "÷",
                "target": 5
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 2, 4, 1, 5, 1, 4, 5, 2, 3, 5, 1, 2, 3, 4, 2, 5, 3, 4, 1, 4, 3, 1, 5, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "×",
                "target": 3
              },
              {
                "cells": [
                  1,
                  6
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  4,
                  9
                ],
                "op": "×",
                "target": 15
              },
              {
                "cells": [
                  7,
                  12,
                  8
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  10,
                  11
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  13,
                  14,
                  18
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  15,
                  20,
                  16
                ],
                "op": "×",
                "target": 40
              },
              {
                "cells": [
                  17,
                  22
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  19,
                  24,
                  23
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  21
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 3, 2, 1, 5, 5, 2, 1, 4, 3, 1, 5, 3, 2, 4, 2, 4, 5, 3, 1, 3, 1, 4, 5, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  1,
                  6,
                  2
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  3,
                  8,
                  4
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  7,
                  12
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  9,
                  14
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  11,
                  16,
                  17
                ],
                "op": "×",
                "target": 100
              },
              {
                "cells": [
                  13,
                  18,
                  23
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  19,
                  24
                ],
                "op": "+",
                "target": 3
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "×",
                "target": 3
              },
              {
                "cells": [
                  22
                ],
                "op": "=",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      },
      {
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[2, 5, 4, 3, 1, 3, 2, 1, 4, 5, 1, 4, 2, 5, 3, 4, 3, 5, 1, 2, 5, 1, 3, 2, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5,
                  10
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  1,
                  6,
                  7
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  2,
                  3,
                  8
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  4,
                  9
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  11,
                  16,
                  12
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  13,
                  14,
                  18
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  15,
                  20,
                  21
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  17,
                  22
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  19,
                  24
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  23
                ],
                "op": "=",
                "target": 2
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 525,
    "focus": "number constraints",
    "title": "Number Constraints 6",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 4, 2, 3, 3, 2, 4, 1, 4, 3, 1, 2, 2, 1, 3, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  2,
                  6,
                  10
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  3,
                  7
                ],
                "op": "×",
                "target": 3
              },
              {
                "cells": [
                  4,
                  5,
                  8
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  9,
                  13
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  11,
                  15
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  12
                ],
                "op": "=",
                "target": 2
              },
              {
                "cells": [
                  14
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 526,
    "focus": "number constraints",
    "title": "Number Constraints 7",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[2, 4, 1, 3, 4, 3, 2, 1, 1, 2, 3, 4, 3, 1, 4, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  4
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  1,
                  5,
                  9
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  2,
                  6,
                  7
                ],
                "op": "+",
                "target": 4
              },
              {
                "cells": [
                  3
                ],
                "op": "=",
                "target": 3
              },
              {
                "cells": [
                  8,
                  12,
                  13
                ],
                "op": "×",
                "target": 3
              },
              {
                "cells": [
                  10,
                  11
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  14,
                  15
                ],
                "op": "÷",
                "target": 2
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 527,
    "focus": "number constraints",
    "title": "Number Constraints 8",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[2, 4, 1, 3, 4, 2, 3, 1, 3, 1, 2, 4, 1, 3, 4, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  4,
                  8
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  1,
                  2
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  3,
                  7
                ],
                "op": "×",
                "target": 3
              },
              {
                "cells": [
                  5,
                  9
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  6,
                  10
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  11,
                  15
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  12,
                  13
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  14
                ],
                "op": "=",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 528,
    "focus": "number constraints",
    "title": "Number Constraints 9",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 2, 3, 4, 4, 1, 2, 3, 2, 3, 4, 1, 3, 4, 1, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  4
                ],
                "op": "÷",
                "target": 4
              },
              {
                "cells": [
                  1,
                  5,
                  2
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  3,
                  7
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  6,
                  10,
                  14
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  8,
                  9
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  11,
                  15
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  12,
                  13
                ],
                "op": "+",
                "target": 7
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 529,
    "focus": "number constraints",
    "title": "Number Constraints 10",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 4, 1, 2, 2, 1, 3, 4, 1, 2, 4, 3, 4, 3, 2, 1]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  4
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  2,
                  6
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  3,
                  7,
                  11
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  5,
                  9
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  8,
                  12
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  10,
                  14
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  13
                ],
                "op": "=",
                "target": 3
              },
              {
                "cells": [
                  15
                ],
                "op": "=",
                "target": 1
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 530,
    "focus": "number constraints",
    "title": "Number Constraints 11",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[2, 1, 3, 4, 1, 4, 2, 3, 4, 3, 1, 2, 3, 2, 4, 1]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  2,
                  3,
                  7
                ],
                "op": "×",
                "target": 36
              },
              {
                "cells": [
                  4,
                  8
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  5,
                  9
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  6,
                  10
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  11,
                  15
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  12,
                  13,
                  14
                ],
                "op": "×",
                "target": 24
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 531,
    "focus": "number constraints",
    "title": "Number Constraints 12",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 3, 1, 2, 1, 4, 2, 3, 2, 1, 3, 4, 3, 2, 4, 1]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  4,
                  8
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  5,
                  9,
                  6
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  7,
                  11
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  10,
                  14
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  12,
                  13
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  15
                ],
                "op": "=",
                "target": 1
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 532,
    "focus": "number constraints",
    "title": "Number Constraints 13",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 3, 4, 2, 3, 4, 2, 1, 4, 2, 1, 3, 2, 1, 3, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  4
                ],
                "op": "×",
                "target": 3
              },
              {
                "cells": [
                  1,
                  2,
                  6
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  3,
                  7,
                  11
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  5,
                  9
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  8,
                  12,
                  13
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  10,
                  14
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  15
                ],
                "op": "=",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 533,
    "focus": "number constraints",
    "title": "Number Constraints 14",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[2, 3, 4, 1, 4, 1, 2, 3, 1, 2, 3, 4, 3, 4, 1, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  4,
                  8
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  1,
                  2
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  3,
                  7,
                  6
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  5,
                  9,
                  10
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  11,
                  15
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  12,
                  13
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  14
                ],
                "op": "=",
                "target": 1
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 534,
    "focus": "number constraints",
    "title": "Number Constraints 15",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 1, 4, 2, 1, 2, 3, 4, 2, 4, 1, 3, 4, 3, 2, 1]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  4
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  1,
                  2,
                  6
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  3,
                  7,
                  11
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  5,
                  9,
                  13
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  8,
                  12
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  10,
                  14
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  15
                ],
                "op": "=",
                "target": 1
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 535,
    "focus": "number constraints",
    "title": "Number Constraints 16",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 4, 1, 2, 2, 1, 4, 3, 1, 3, 2, 4, 4, 2, 3, 1]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  4,
                  8
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  5,
                  6
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  7,
                  11
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  9,
                  10
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  12,
                  13
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  14,
                  15
                ],
                "op": "×",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 536,
    "focus": "number constraints",
    "title": "Number Constraints 17",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[2, 1, 3, 4, 4, 2, 1, 3, 1, 3, 4, 2, 3, 4, 2, 1]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  4,
                  8,
                  9
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  5,
                  6
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  7,
                  11
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  10,
                  14
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  12,
                  13
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  15
                ],
                "op": "=",
                "target": 1
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 537,
    "focus": "number constraints",
    "title": "Number Constraints 18",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 2, 3, 4, 4, 1, 2, 3, 2, 3, 4, 1, 3, 4, 1, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  4
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  1,
                  5
                ],
                "op": "+",
                "target": 3
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  6,
                  7,
                  10
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  8,
                  12,
                  13
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  9
                ],
                "op": "=",
                "target": 3
              },
              {
                "cells": [
                  11,
                  15
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  14
                ],
                "op": "=",
                "target": 1
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 538,
    "focus": "number constraints",
    "title": "Number Constraints 19",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 4, 2, 1, 4, 1, 3, 2, 1, 2, 4, 3, 2, 3, 1, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  5
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  2,
                  6
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  3,
                  7
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  4,
                  8,
                  12
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  9,
                  10
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  11,
                  15
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  13,
                  14
                ],
                "op": "÷",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 539,
    "focus": "number constraints",
    "title": "Number Constraints 20",
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
        "prompt": "Enter 1–4 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 4, 1, 2, 4, 3, 2, 1, 2, 1, 3, 4, 1, 2, 4, 3]",
            "explanation": "The completed grid meets every cage target and uses 1–4 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  4
                ],
                "op": "×",
                "target": 48
              },
              {
                "cells": [
                  2,
                  6,
                  3
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  5,
                  9
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  7,
                  11
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  8,
                  12,
                  13
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  10,
                  14,
                  15
                ],
                "op": "+",
                "target": 10
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 540,
    "focus": "number constraints",
    "title": "Number Constraints 21",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 3, 4, 5, 2, 2, 1, 3, 4, 5, 3, 4, 5, 2, 1, 5, 2, 1, 3, 4, 4, 5, 2, 1, 3]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  2,
                  7
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  3,
                  4,
                  9
                ],
                "op": "+",
                "target": 12
              },
              {
                "cells": [
                  5,
                  10
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  6,
                  11
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  8,
                  13,
                  14
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  12,
                  17
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  15,
                  20
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  16,
                  21
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  18,
                  23,
                  19
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  22
                ],
                "op": "=",
                "target": 2
              },
              {
                "cells": [
                  24
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 541,
    "focus": "number constraints",
    "title": "Number Constraints 22",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[5, 1, 4, 2, 3, 2, 4, 3, 1, 5, 3, 2, 1, 5, 4, 4, 5, 2, 3, 1, 1, 3, 5, 4, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "×",
                "target": 5
              },
              {
                "cells": [
                  2,
                  7
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  3,
                  4
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  5,
                  6
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  8,
                  9
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  11,
                  16
                ],
                "op": "−",
                "target": 3
              },
              {
                "cells": [
                  12,
                  17
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  13,
                  14
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  18,
                  19
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  22,
                  23
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  24
                ],
                "op": "=",
                "target": 2
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 542,
    "focus": "number constraints",
    "title": "Number Constraints 23",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 5, 4, 2, 3, 2, 4, 3, 5, 1, 3, 2, 5, 1, 4, 5, 3, 1, 4, 2, 4, 1, 2, 3, 5]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  1,
                  2,
                  6
                ],
                "op": "×",
                "target": 80
              },
              {
                "cells": [
                  3,
                  4,
                  8
                ],
                "op": "×",
                "target": 30
              },
              {
                "cells": [
                  7,
                  12
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  9,
                  14
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  10,
                  15,
                  16
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  11
                ],
                "op": "=",
                "target": 2
              },
              {
                "cells": [
                  13,
                  18
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  17,
                  22
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  19,
                  24,
                  23
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "÷",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 543,
    "focus": "number constraints",
    "title": "Number Constraints 24",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[5, 3, 1, 2, 4, 4, 5, 2, 3, 1, 2, 1, 5, 4, 3, 3, 2, 4, 1, 5, 1, 4, 3, 5, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5,
                  6
                ],
                "op": "+",
                "target": 14
              },
              {
                "cells": [
                  1,
                  2,
                  7
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  3,
                  8
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  4,
                  9
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  10,
                  11,
                  15
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  12,
                  17
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  13,
                  14
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  16,
                  21
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  18,
                  23
                ],
                "op": "×",
                "target": 5
              },
              {
                "cells": [
                  19,
                  24
                ],
                "op": "−",
                "target": 3
              },
              {
                "cells": [
                  20
                ],
                "op": "=",
                "target": 1
              },
              {
                "cells": [
                  22
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 544,
    "focus": "number constraints",
    "title": "Number Constraints 25",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 2, 3, 1, 5, 1, 3, 5, 2, 4, 2, 5, 4, 3, 1, 3, 4, 1, 5, 2, 5, 1, 2, 4, 3]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "÷",
                "target": 4
              },
              {
                "cells": [
                  1,
                  6
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  2,
                  7
                ],
                "op": "×",
                "target": 15
              },
              {
                "cells": [
                  3,
                  8,
                  9
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  4
                ],
                "op": "=",
                "target": 5
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  11,
                  12
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  13,
                  18
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  14,
                  19
                ],
                "op": "+",
                "target": 3
              },
              {
                "cells": [
                  16,
                  17
                ],
                "op": "÷",
                "target": 4
              },
              {
                "cells": [
                  20,
                  21,
                  22
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  23,
                  24
                ],
                "op": "×",
                "target": 12
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 545,
    "focus": "number constraints",
    "title": "Number Constraints 26",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 2, 1, 3, 5, 1, 4, 3, 5, 2, 3, 1, 5, 2, 4, 5, 3, 2, 4, 1, 2, 5, 4, 1, 3]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  2
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  3,
                  4
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  5,
                  6
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  7,
                  12
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  8,
                  13
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  9,
                  14
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  10,
                  15,
                  20
                ],
                "op": "×",
                "target": 30
              },
              {
                "cells": [
                  11,
                  16
                ],
                "op": "+",
                "target": 4
              },
              {
                "cells": [
                  17,
                  22
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  18,
                  19,
                  24
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  21
                ],
                "op": "=",
                "target": 5
              },
              {
                "cells": [
                  23
                ],
                "op": "=",
                "target": 1
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 546,
    "focus": "number constraints",
    "title": "Number Constraints 27",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[2, 1, 3, 5, 4, 4, 2, 1, 3, 5, 1, 3, 5, 4, 2, 5, 4, 2, 1, 3, 3, 5, 4, 2, 1]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5,
                  1
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  2,
                  7,
                  8
                ],
                "op": "×",
                "target": 9
              },
              {
                "cells": [
                  3,
                  4
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  6,
                  11
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  9,
                  14,
                  13
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  10,
                  15,
                  16
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  12,
                  17
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  18,
                  23
                ],
                "op": "+",
                "target": 3
              },
              {
                "cells": [
                  19,
                  24
                ],
                "op": "+",
                "target": 4
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "×",
                "target": 15
              },
              {
                "cells": [
                  22
                ],
                "op": "=",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 547,
    "focus": "number constraints",
    "title": "Number Constraints 28",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[5, 4, 2, 1, 3, 1, 2, 5, 3, 4, 4, 1, 3, 2, 5, 2, 3, 4, 5, 1, 3, 5, 1, 4, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "×",
                "target": 5
              },
              {
                "cells": [
                  1,
                  2
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  3,
                  4
                ],
                "op": "+",
                "target": 4
              },
              {
                "cells": [
                  6,
                  7
                ],
                "op": "−",
                "target": 3
              },
              {
                "cells": [
                  8,
                  9,
                  13
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  10,
                  11,
                  15
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  12,
                  17
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  14,
                  19,
                  24
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  16,
                  21,
                  22
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  18,
                  23
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  20
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 548,
    "focus": "number constraints",
    "title": "Number Constraints 29",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 5, 2, 3, 1, 3, 4, 1, 2, 5, 1, 2, 4, 5, 3, 5, 1, 3, 4, 2, 2, 3, 5, 1, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  1,
                  2
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  3,
                  8,
                  13
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  4,
                  9,
                  14
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  6,
                  7
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  10,
                  11,
                  12
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  15,
                  16
                ],
                "op": "×",
                "target": 5
              },
              {
                "cells": [
                  17,
                  18
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  19,
                  24
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  22,
                  23
                ],
                "op": "+",
                "target": 6
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 549,
    "focus": "number constraints",
    "title": "Number Constraints 30",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 2, 4, 3, 5, 4, 1, 5, 2, 3, 5, 4, 3, 1, 2, 3, 5, 2, 4, 1, 2, 3, 1, 5, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "+",
                "target": 3
              },
              {
                "cells": [
                  2,
                  7,
                  3
                ],
                "op": "+",
                "target": 12
              },
              {
                "cells": [
                  4,
                  9
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  5,
                  6,
                  10
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  8,
                  13
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  11,
                  12,
                  17
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  14,
                  19
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  15,
                  16,
                  20
                ],
                "op": "×",
                "target": 30
              },
              {
                "cells": [
                  18,
                  23,
                  22
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  21
                ],
                "op": "=",
                "target": 3
              },
              {
                "cells": [
                  24
                ],
                "op": "=",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 550,
    "focus": "number constraints",
    "title": "Number Constraints 31",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[5, 4, 3, 1, 2, 2, 1, 4, 5, 3, 3, 5, 1, 2, 4, 1, 3, 2, 4, 5, 4, 2, 5, 3, 1]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  2
                ],
                "op": "×",
                "target": 60
              },
              {
                "cells": [
                  3,
                  8
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  4,
                  9
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  5,
                  10,
                  11
                ],
                "op": "×",
                "target": 30
              },
              {
                "cells": [
                  6,
                  7,
                  12
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  13,
                  18
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  14,
                  19,
                  24
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  15,
                  20
                ],
                "op": "÷",
                "target": 4
              },
              {
                "cells": [
                  16,
                  21
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  17,
                  22
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  23
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 551,
    "focus": "number constraints",
    "title": "Number Constraints 32",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[5, 1, 3, 2, 4, 2, 3, 5, 4, 1, 1, 2, 4, 3, 5, 4, 5, 2, 1, 3, 3, 4, 1, 5, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "−",
                "target": 3
              },
              {
                "cells": [
                  1,
                  6
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  4,
                  9,
                  14
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  7,
                  8,
                  12
                ],
                "op": "+",
                "target": 13
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "÷",
                "target": 4
              },
              {
                "cells": [
                  11,
                  16,
                  21
                ],
                "op": "×",
                "target": 40
              },
              {
                "cells": [
                  13,
                  18
                ],
                "op": "÷",
                "target": 3
              },
              {
                "cells": [
                  17,
                  22
                ],
                "op": "+",
                "target": 3
              },
              {
                "cells": [
                  19,
                  24
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  20
                ],
                "op": "=",
                "target": 3
              },
              {
                "cells": [
                  23
                ],
                "op": "=",
                "target": 5
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 552,
    "focus": "number constraints",
    "title": "Number Constraints 33",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[5, 2, 3, 4, 1, 3, 1, 4, 2, 5, 4, 5, 2, 1, 3, 1, 4, 5, 3, 2, 2, 3, 1, 5, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  5
                ],
                "op": "×",
                "target": 15
              },
              {
                "cells": [
                  1,
                  2
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  3,
                  4
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  6,
                  7
                ],
                "op": "÷",
                "target": 4
              },
              {
                "cells": [
                  8,
                  13,
                  14
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  9
                ],
                "op": "=",
                "target": 5
              },
              {
                "cells": [
                  10,
                  11,
                  12
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  15,
                  16
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  17,
                  18,
                  22
                ],
                "op": "×",
                "target": 15
              },
              {
                "cells": [
                  19,
                  24,
                  23
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "×",
                "target": 6
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 553,
    "focus": "number constraints",
    "title": "Number Constraints 34",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 4, 2, 5, 1, 4, 5, 3, 1, 2, 2, 3, 1, 4, 5, 1, 2, 5, 3, 4, 5, 1, 4, 2, 3]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  2,
                  7
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  3,
                  8,
                  13
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  4,
                  9,
                  14
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  5,
                  6,
                  11
                ],
                "op": "×",
                "target": 60
              },
              {
                "cells": [
                  10,
                  15,
                  16
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  12,
                  17,
                  22
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  18,
                  19,
                  23
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  20,
                  21
                ],
                "op": "×",
                "target": 5
              },
              {
                "cells": [
                  24
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 554,
    "focus": "number constraints",
    "title": "Number Constraints 35",
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
        "prompt": "Enter 1–5 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[2, 3, 4, 5, 1, 4, 1, 5, 3, 2, 1, 5, 2, 4, 3, 5, 2, 3, 1, 4, 3, 4, 1, 2, 5]",
            "explanation": "The completed grid meets every cage target and uses 1–5 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  5
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  2,
                  3
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  4,
                  9
                ],
                "op": "×",
                "target": 2
              },
              {
                "cells": [
                  6,
                  7,
                  11
                ],
                "op": "×",
                "target": 25
              },
              {
                "cells": [
                  8,
                  13
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  10,
                  15
                ],
                "op": "×",
                "target": 5
              },
              {
                "cells": [
                  12,
                  17
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  14,
                  19,
                  18
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  16,
                  21
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  20
                ],
                "op": "=",
                "target": 3
              },
              {
                "cells": [
                  22,
                  23,
                  24
                ],
                "op": "×",
                "target": 10
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 555,
    "focus": "number constraints",
    "title": "Number Constraints 36",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[6, 4, 2, 3, 5, 1, 4, 1, 3, 6, 2, 5, 2, 3, 1, 5, 4, 6, 5, 2, 4, 1, 6, 3, 1, 5, 6, 4, 3, 2, 3, 6, 5, 2, 1, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  6
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  1,
                  2,
                  8
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  3,
                  4
                ],
                "op": "×",
                "target": 15
              },
              {
                "cells": [
                  5,
                  11
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  7,
                  13,
                  19,
                  25
                ],
                "op": "×",
                "target": 30
              },
              {
                "cells": [
                  9,
                  10,
                  15,
                  21
                ],
                "op": "×",
                "target": 60
              },
              {
                "cells": [
                  12,
                  18,
                  24,
                  30
                ],
                "op": "×",
                "target": 30
              },
              {
                "cells": [
                  14,
                  20,
                  26
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  16,
                  22,
                  23
                ],
                "op": "×",
                "target": 72
              },
              {
                "cells": [
                  17
                ],
                "op": "=",
                "target": 6
              },
              {
                "cells": [
                  27,
                  33,
                  28,
                  29
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  31,
                  32
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  34,
                  35
                ],
                "op": "×",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 556,
    "focus": "number constraints",
    "title": "Number Constraints 37",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 2, 5, 4, 6, 3, 2, 4, 1, 6, 3, 5, 4, 6, 2, 3, 5, 1, 6, 3, 4, 5, 1, 2, 3, 5, 6, 1, 2, 4, 5, 1, 3, 2, 4, 6]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  2
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  3,
                  9,
                  10
                ],
                "op": "×",
                "target": 72
              },
              {
                "cells": [
                  4,
                  5,
                  11
                ],
                "op": "×",
                "target": 90
              },
              {
                "cells": [
                  6,
                  7,
                  13,
                  12
                ],
                "op": "+",
                "target": 16
              },
              {
                "cells": [
                  8,
                  14,
                  15,
                  16
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  17,
                  23,
                  22,
                  28
                ],
                "op": "×",
                "target": 4
              },
              {
                "cells": [
                  18,
                  24,
                  19,
                  30
                ],
                "op": "+",
                "target": 17
              },
              {
                "cells": [
                  20,
                  26,
                  27,
                  25
                ],
                "op": "+",
                "target": 16
              },
              {
                "cells": [
                  21
                ],
                "op": "=",
                "target": 5
              },
              {
                "cells": [
                  29,
                  35,
                  34,
                  33
                ],
                "op": "×",
                "target": 192
              },
              {
                "cells": [
                  31,
                  32
                ],
                "op": "÷",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 557,
    "focus": "number constraints",
    "title": "Number Constraints 38",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 4, 2, 3, 6, 5, 5, 1, 6, 4, 3, 2, 2, 5, 3, 1, 4, 6, 6, 2, 4, 5, 1, 3, 3, 6, 1, 2, 5, 4, 4, 3, 5, 6, 2, 1]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  6,
                  1
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  2,
                  3,
                  8
                ],
                "op": "×",
                "target": 36
              },
              {
                "cells": [
                  4,
                  5,
                  10,
                  16
                ],
                "op": "×",
                "target": 360
              },
              {
                "cells": [
                  7,
                  13,
                  12
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  9,
                  15,
                  21
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  11,
                  17,
                  23,
                  22
                ],
                "op": "+",
                "target": 12
              },
              {
                "cells": [
                  14,
                  20,
                  26
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  18,
                  24,
                  19
                ],
                "op": "×",
                "target": 36
              },
              {
                "cells": [
                  25,
                  31
                ],
                "op": "×",
                "target": 18
              },
              {
                "cells": [
                  27,
                  33
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  28,
                  29,
                  35,
                  34
                ],
                "op": "×",
                "target": 40
              },
              {
                "cells": [
                  30
                ],
                "op": "=",
                "target": 4
              },
              {
                "cells": [
                  32
                ],
                "op": "=",
                "target": 5
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 558,
    "focus": "number constraints",
    "title": "Number Constraints 39",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[6, 1, 2, 3, 5, 4, 4, 2, 3, 6, 1, 5, 5, 3, 6, 4, 2, 1, 2, 4, 5, 1, 6, 3, 1, 6, 4, 5, 3, 2, 3, 5, 1, 2, 4, 6]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  6,
                  7
                ],
                "op": "×",
                "target": 48
              },
              {
                "cells": [
                  1,
                  2,
                  8
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  3,
                  9,
                  4,
                  10
                ],
                "op": "×",
                "target": 90
              },
              {
                "cells": [
                  5,
                  11,
                  17
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  12,
                  18
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  13,
                  14
                ],
                "op": "×",
                "target": 18
              },
              {
                "cells": [
                  15,
                  16,
                  21
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  19,
                  20
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  22,
                  23,
                  28
                ],
                "op": "+",
                "target": 12
              },
              {
                "cells": [
                  24,
                  25
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  26,
                  27
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  29,
                  35
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  30,
                  31,
                  32,
                  33
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  34
                ],
                "op": "=",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 559,
    "focus": "number constraints",
    "title": "Number Constraints 40",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 5, 2, 1, 4, 6, 5, 4, 1, 6, 2, 3, 6, 3, 4, 2, 5, 1, 4, 2, 6, 3, 1, 5, 1, 6, 5, 4, 3, 2, 2, 1, 3, 5, 6, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  6,
                  7
                ],
                "op": "+",
                "target": 12
              },
              {
                "cells": [
                  1,
                  2,
                  3,
                  4
                ],
                "op": "×",
                "target": 40
              },
              {
                "cells": [
                  5,
                  11
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  8,
                  14,
                  20,
                  21
                ],
                "op": "+",
                "target": 14
              },
              {
                "cells": [
                  9,
                  15,
                  10,
                  16
                ],
                "op": "+",
                "target": 15
              },
              {
                "cells": [
                  12,
                  13,
                  19,
                  25
                ],
                "op": "×",
                "target": 216
              },
              {
                "cells": [
                  17,
                  23,
                  29
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  18,
                  24,
                  30
                ],
                "op": "×",
                "target": 8
              },
              {
                "cells": [
                  22,
                  28,
                  34
                ],
                "op": "×",
                "target": 18
              },
              {
                "cells": [
                  26,
                  27
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  31,
                  32
                ],
                "op": "×",
                "target": 3
              },
              {
                "cells": [
                  33
                ],
                "op": "=",
                "target": 5
              },
              {
                "cells": [
                  35
                ],
                "op": "=",
                "target": 4
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 560,
    "focus": "number constraints",
    "title": "Number Constraints 41",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 5, 4, 6, 2, 3, 2, 4, 6, 3, 5, 1, 3, 2, 5, 4, 1, 6, 6, 1, 2, 5, 3, 4, 4, 3, 1, 2, 6, 5, 5, 6, 3, 1, 4, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  6,
                  7
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  1,
                  2,
                  3
                ],
                "op": "+",
                "target": 15
              },
              {
                "cells": [
                  4,
                  10,
                  11,
                  16
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  5
                ],
                "op": "=",
                "target": 3
              },
              {
                "cells": [
                  8,
                  9,
                  14
                ],
                "op": "+",
                "target": 14
              },
              {
                "cells": [
                  12,
                  18,
                  24,
                  30
                ],
                "op": "+",
                "target": 18
              },
              {
                "cells": [
                  13,
                  19,
                  25,
                  20
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  15,
                  21,
                  22
                ],
                "op": "+",
                "target": 12
              },
              {
                "cells": [
                  17,
                  23,
                  29,
                  28
                ],
                "op": "+",
                "target": 21
              },
              {
                "cells": [
                  26,
                  32,
                  27,
                  33
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  31
                ],
                "op": "=",
                "target": 6
              },
              {
                "cells": [
                  34,
                  35
                ],
                "op": "÷",
                "target": 2
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 561,
    "focus": "number constraints",
    "title": "Number Constraints 42",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[3, 6, 4, 2, 5, 1, 4, 1, 2, 5, 6, 3, 6, 2, 1, 3, 4, 5, 2, 3, 5, 6, 1, 4, 1, 5, 3, 4, 2, 6, 5, 4, 6, 1, 3, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  6
                ],
                "op": "×",
                "target": 72
              },
              {
                "cells": [
                  2,
                  8,
                  3
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  4,
                  10,
                  11
                ],
                "op": "×",
                "target": 90
              },
              {
                "cells": [
                  5
                ],
                "op": "=",
                "target": 1
              },
              {
                "cells": [
                  7,
                  13,
                  14,
                  15
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  9
                ],
                "op": "=",
                "target": 5
              },
              {
                "cells": [
                  12,
                  18,
                  19,
                  24
                ],
                "op": "×",
                "target": 36
              },
              {
                "cells": [
                  16,
                  17,
                  22
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  20,
                  21,
                  26
                ],
                "op": "×",
                "target": 90
              },
              {
                "cells": [
                  23,
                  29
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  25,
                  31
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  27,
                  33,
                  32
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  28,
                  34,
                  35
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  30
                ],
                "op": "=",
                "target": 5
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 562,
    "focus": "number constraints",
    "title": "Number Constraints 43",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 3, 6, 5, 2, 4, 2, 5, 1, 6, 4, 3, 6, 4, 5, 3, 1, 2, 4, 6, 2, 1, 3, 5, 5, 2, 3, 4, 6, 1, 3, 1, 4, 2, 5, 6]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  6
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  1,
                  2
                ],
                "op": "÷",
                "target": 2
              },
              {
                "cells": [
                  3,
                  4,
                  10
                ],
                "op": "×",
                "target": 40
              },
              {
                "cells": [
                  5,
                  11,
                  17,
                  23
                ],
                "op": "+",
                "target": 14
              },
              {
                "cells": [
                  7,
                  8,
                  14
                ],
                "op": "×",
                "target": 25
              },
              {
                "cells": [
                  9,
                  15,
                  16
                ],
                "op": "×",
                "target": 18
              },
              {
                "cells": [
                  12,
                  18,
                  13
                ],
                "op": "+",
                "target": 14
              },
              {
                "cells": [
                  19,
                  20,
                  21
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  22,
                  28,
                  29,
                  35
                ],
                "op": "+",
                "target": 16
              },
              {
                "cells": [
                  24,
                  30
                ],
                "op": "×",
                "target": 15
              },
              {
                "cells": [
                  25,
                  31,
                  32,
                  33
                ],
                "op": "+",
                "target": 9
              },
              {
                "cells": [
                  26,
                  27
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  34
                ],
                "op": "=",
                "target": 5
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 563,
    "focus": "number constraints",
    "title": "Number Constraints 44",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[1, 4, 5, 2, 3, 6, 2, 6, 4, 3, 1, 5, 3, 5, 6, 1, 2, 4, 5, 3, 2, 4, 6, 1, 6, 2, 1, 5, 4, 3, 4, 1, 3, 6, 5, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  6
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  2,
                  3,
                  8
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  4,
                  5,
                  11,
                  17
                ],
                "op": "×",
                "target": 360
              },
              {
                "cells": [
                  7,
                  13,
                  14
                ],
                "op": "+",
                "target": 17
              },
              {
                "cells": [
                  9,
                  15,
                  21
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  10,
                  16
                ],
                "op": "+",
                "target": 3
              },
              {
                "cells": [
                  12,
                  18,
                  19
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  20,
                  26,
                  27
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  22,
                  28,
                  23
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  24,
                  30,
                  25
                ],
                "op": "×",
                "target": 48
              },
              {
                "cells": [
                  29,
                  35,
                  34
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  31,
                  32,
                  33
                ],
                "op": "×",
                "target": 18
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 564,
    "focus": "number constraints",
    "title": "Number Constraints 45",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 2, 5, 6, 1, 3, 1, 5, 4, 3, 6, 2, 2, 6, 3, 4, 5, 1, 5, 3, 2, 1, 4, 6, 6, 4, 1, 2, 3, 5, 3, 1, 6, 5, 2, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  6,
                  7
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  1,
                  2,
                  3
                ],
                "op": "×",
                "target": 60
              },
              {
                "cells": [
                  4,
                  5
                ],
                "op": "+",
                "target": 4
              },
              {
                "cells": [
                  8,
                  9,
                  15
                ],
                "op": "×",
                "target": 48
              },
              {
                "cells": [
                  10,
                  11
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  12,
                  18
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  13,
                  19,
                  20
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  14
                ],
                "op": "=",
                "target": 3
              },
              {
                "cells": [
                  16,
                  17,
                  23
                ],
                "op": "×",
                "target": 30
              },
              {
                "cells": [
                  21,
                  27,
                  33,
                  28
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  22
                ],
                "op": "=",
                "target": 4
              },
              {
                "cells": [
                  24,
                  25
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  26,
                  32,
                  31
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  29,
                  35,
                  34
                ],
                "op": "×",
                "target": 40
              },
              {
                "cells": [
                  30
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 565,
    "focus": "number constraints",
    "title": "Number Constraints 46",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[6, 1, 3, 5, 4, 2, 3, 6, 5, 2, 1, 4, 4, 2, 1, 6, 5, 3, 5, 3, 2, 4, 6, 1, 2, 5, 4, 1, 3, 6, 1, 4, 6, 3, 2, 5]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  6
                ],
                "op": "×",
                "target": 18
              },
              {
                "cells": [
                  2,
                  8
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  3,
                  9
                ],
                "op": "−",
                "target": 3
              },
              {
                "cells": [
                  4,
                  10,
                  5
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  7,
                  13,
                  19
                ],
                "op": "×",
                "target": 36
              },
              {
                "cells": [
                  11,
                  17,
                  16
                ],
                "op": "×",
                "target": 60
              },
              {
                "cells": [
                  12,
                  18
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  14,
                  15,
                  20
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  21,
                  27,
                  26
                ],
                "op": "×",
                "target": 16
              },
              {
                "cells": [
                  22,
                  23,
                  29
                ],
                "op": "+",
                "target": 13
              },
              {
                "cells": [
                  24,
                  30,
                  25
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  28,
                  34
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  31,
                  32,
                  33
                ],
                "op": "×",
                "target": 72
              },
              {
                "cells": [
                  35
                ],
                "op": "=",
                "target": 5
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 566,
    "focus": "number constraints",
    "title": "Number Constraints 47",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[4, 1, 2, 5, 6, 3, 5, 2, 1, 4, 3, 6, 1, 6, 3, 2, 4, 5, 3, 5, 4, 6, 2, 1, 2, 3, 6, 1, 5, 4, 6, 4, 5, 3, 1, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  6,
                  1
                ],
                "op": "×",
                "target": 20
              },
              {
                "cells": [
                  2,
                  3,
                  8
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  4,
                  5,
                  10
                ],
                "op": "×",
                "target": 54
              },
              {
                "cells": [
                  7,
                  13,
                  19,
                  20
                ],
                "op": "+",
                "target": 17
              },
              {
                "cells": [
                  9,
                  15,
                  14
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  11,
                  17,
                  23
                ],
                "op": "×",
                "target": 30
              },
              {
                "cells": [
                  12,
                  18,
                  24
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  16,
                  22,
                  21
                ],
                "op": "×",
                "target": 48
              },
              {
                "cells": [
                  25,
                  26,
                  31
                ],
                "op": "+",
                "target": 13
              },
              {
                "cells": [
                  27,
                  28
                ],
                "op": "÷",
                "target": 5
              },
              {
                "cells": [
                  29,
                  35,
                  34,
                  33
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  30
                ],
                "op": "=",
                "target": 6
              },
              {
                "cells": [
                  32
                ],
                "op": "=",
                "target": 5
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 567,
    "focus": "number constraints",
    "title": "Number Constraints 48",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[5, 4, 2, 1, 6, 3, 6, 3, 5, 2, 4, 1, 1, 5, 3, 4, 2, 6, 4, 1, 6, 5, 3, 2, 3, 2, 4, 6, 1, 5, 2, 6, 1, 3, 5, 4]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  2
                ],
                "op": "×",
                "target": 40
              },
              {
                "cells": [
                  3,
                  9,
                  8
                ],
                "op": "+",
                "target": 8
              },
              {
                "cells": [
                  4,
                  10,
                  5
                ],
                "op": "+",
                "target": 13
              },
              {
                "cells": [
                  6,
                  7,
                  13
                ],
                "op": "+",
                "target": 14
              },
              {
                "cells": [
                  11,
                  17,
                  23
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  12,
                  18,
                  19
                ],
                "op": "+",
                "target": 6
              },
              {
                "cells": [
                  14,
                  15,
                  21
                ],
                "op": "+",
                "target": 12
              },
              {
                "cells": [
                  16,
                  22
                ],
                "op": "×",
                "target": 6
              },
              {
                "cells": [
                  20,
                  26
                ],
                "op": "−",
                "target": 2
              },
              {
                "cells": [
                  24,
                  30,
                  25
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  27,
                  33,
                  32
                ],
                "op": "×",
                "target": 18
              },
              {
                "cells": [
                  28,
                  29,
                  34,
                  35
                ],
                "op": "+",
                "target": 15
              },
              {
                "cells": [
                  31
                ],
                "op": "=",
                "target": 6
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 568,
    "focus": "number constraints",
    "title": "Number Constraints 49",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[2, 5, 1, 6, 4, 3, 4, 3, 6, 1, 2, 5, 3, 6, 4, 2, 5, 1, 1, 2, 5, 3, 6, 4, 5, 1, 2, 4, 3, 6, 6, 4, 3, 5, 1, 2]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  1,
                  2,
                  3
                ],
                "op": "+",
                "target": 14
              },
              {
                "cells": [
                  4,
                  5,
                  11
                ],
                "op": "+",
                "target": 12
              },
              {
                "cells": [
                  6,
                  12,
                  18
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  7,
                  8,
                  14
                ],
                "op": "+",
                "target": 13
              },
              {
                "cells": [
                  9,
                  10,
                  16
                ],
                "op": "×",
                "target": 10
              },
              {
                "cells": [
                  13,
                  19,
                  25
                ],
                "op": "×",
                "target": 12
              },
              {
                "cells": [
                  15,
                  21
                ],
                "op": "+",
                "target": 5
              },
              {
                "cells": [
                  17,
                  23
                ],
                "op": "÷",
                "target": 4
              },
              {
                "cells": [
                  20,
                  26,
                  32,
                  27
                ],
                "op": "+",
                "target": 14
              },
              {
                "cells": [
                  22,
                  28,
                  29
                ],
                "op": "×",
                "target": 108
              },
              {
                "cells": [
                  24,
                  30,
                  31
                ],
                "op": "×",
                "target": 120
              },
              {
                "cells": [
                  33,
                  34,
                  35
                ],
                "op": "×",
                "target": 10
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 569,
    "focus": "number constraints",
    "title": "Number Constraints 50",
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
        "prompt": "Enter 1–6 once in each row and column. Each labelled cage must meet its target using the shown operation. For subtraction and division, use the larger value first.",
        "hint": "List possible cage values, then use row and column exclusions to narrow them.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cage-grid",
            "marks": 3,
            "answer": "[5, 6, 4, 3, 1, 2, 2, 5, 3, 1, 6, 4, 4, 2, 1, 6, 5, 3, 3, 4, 6, 5, 2, 1, 6, 1, 2, 4, 3, 5, 1, 3, 5, 2, 4, 6]",
            "explanation": "The completed grid meets every cage target and uses 1–6 exactly once in each row and column. Combine arithmetic possibilities with row and column exclusions.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "givens": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "cages": [
              {
                "cells": [
                  0,
                  6,
                  12
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  1,
                  7
                ],
                "op": "−",
                "target": 1
              },
              {
                "cells": [
                  2,
                  8
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  3,
                  9,
                  4
                ],
                "op": "×",
                "target": 3
              },
              {
                "cells": [
                  5,
                  11,
                  17
                ],
                "op": "×",
                "target": 24
              },
              {
                "cells": [
                  10,
                  16,
                  22,
                  21
                ],
                "op": "+",
                "target": 18
              },
              {
                "cells": [
                  13,
                  14,
                  19
                ],
                "op": "+",
                "target": 7
              },
              {
                "cells": [
                  15
                ],
                "op": "=",
                "target": 6
              },
              {
                "cells": [
                  18,
                  24,
                  30,
                  25
                ],
                "op": "+",
                "target": 11
              },
              {
                "cells": [
                  20,
                  26,
                  32
                ],
                "op": "×",
                "target": 60
              },
              {
                "cells": [
                  23,
                  29,
                  28,
                  35
                ],
                "op": "×",
                "target": 90
              },
              {
                "cells": [
                  27,
                  33,
                  34
                ],
                "op": "+",
                "target": 10
              },
              {
                "cells": [
                  31
                ],
                "op": "=",
                "target": 3
              }
            ],
            "validation": {
              "solutionCount": 1,
              "method": "Latin-square constraint solver"
            }
          }
        ]
      }
    ]
  }
];
