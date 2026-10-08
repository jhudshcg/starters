// Deterministic instances; see build/expand/enrich/add-beginner-puzzles.py.
export default [
  {
    "slot": 115,
    "focus": "cover paths",
    "title": "Narrow passages",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[20, 14, 15, 9, 8, 2, 3, 4, 10, 11, 17, 23, 22, 28, 29, 35, 34, 33, 27, 26, 32, 31, 25, 19, 13, 7, 1, 0, 6]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              5,
              12,
              16,
              18,
              21,
              24,
              30
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[31, 30, 24, 18, 12, 6, 0, 1, 2, 3, 9, 10, 11, 17, 23, 22, 16, 15, 21, 27, 33, 32, 26, 20, 19, 13, 14, 8, 7]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              4,
              5,
              25,
              28,
              29,
              34,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[9, 8, 7, 6, 0, 1, 2, 3, 4, 10, 16, 15, 21, 22, 23, 29, 28, 34, 33, 27, 26, 25, 31, 30, 24, 18, 19, 20, 14]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              5,
              11,
              12,
              13,
              17,
              32,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[21, 15, 16, 10, 4, 5, 11, 17, 23, 22, 28, 29, 35, 34, 33, 32, 31, 25, 24, 18, 12, 13, 7, 1, 2, 8, 14, 20, 26]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              3,
              6,
              9,
              19,
              27,
              30
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[2, 8, 7, 13, 12, 18, 19, 25, 26, 27, 28, 22, 21, 20, 14, 15, 16, 10, 9, 3, 4, 5, 11, 17, 23, 29, 35, 34, 33]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              1,
              6,
              24,
              30,
              31,
              32
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 116,
    "focus": "cover paths",
    "title": "Avoid isolation",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[32, 33, 34, 28, 29, 23, 17, 11, 10, 9, 3, 2, 8, 14, 15, 16, 22, 21, 27, 26, 25, 24, 18, 12, 6, 7, 13, 19, 20]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              1,
              4,
              5,
              30,
              31,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[8, 7, 6, 12, 18, 19, 13, 14, 15, 16, 10, 9, 3, 4, 5, 11, 17, 23, 29, 35, 34, 28, 22, 21, 27, 26, 25, 31, 32]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              1,
              2,
              20,
              24,
              30,
              33
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[6, 12, 18, 24, 30, 31, 25, 19, 13, 14, 15, 21, 20, 26, 32, 33, 27, 28, 22, 16, 17, 11, 5, 4, 10, 9, 8, 2, 1]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              3,
              7,
              23,
              29,
              34,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[20, 14, 13, 7, 8, 2, 1, 0, 6, 12, 18, 24, 30, 31, 32, 26, 27, 21, 15, 16, 10, 9, 3, 4, 5, 11, 17, 23, 22]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              19,
              25,
              28,
              29,
              33,
              34,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[12, 13, 19, 20, 14, 15, 9, 8, 2, 3, 4, 5, 11, 17, 16, 22, 28, 27, 26, 25, 24, 30, 31, 32, 33, 34, 35, 29, 23]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              1,
              6,
              7,
              10,
              18,
              21
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 117,
    "focus": "cover paths",
    "title": "Across the board",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[27, 28, 22, 16, 10, 4, 3, 9, 8, 2, 1, 0, 6, 7, 13, 12, 18, 24, 30, 31, 32, 33, 34, 35, 29, 23, 17, 11, 5]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              14,
              15,
              19,
              20,
              21,
              25,
              26
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[12, 13, 7, 1, 2, 3, 9, 15, 16, 10, 4, 5, 11, 17, 23, 29, 35, 34, 33, 27, 26, 32, 31, 30, 24, 18, 19, 20, 21]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              6,
              8,
              14,
              22,
              25,
              28
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[27, 28, 22, 23, 29, 35, 34, 33, 32, 31, 30, 24, 18, 19, 20, 21, 15, 14, 13, 12, 6, 0, 1, 7, 8, 2, 3, 4, 5]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              9,
              10,
              11,
              16,
              17,
              25,
              26
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[16, 10, 4, 3, 9, 15, 21, 22, 28, 27, 26, 20, 14, 13, 7, 1, 0, 6, 12, 18, 24, 25, 31, 32, 33, 34, 35, 29, 23]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              2,
              5,
              8,
              11,
              17,
              19,
              30
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[14, 20, 21, 27, 26, 32, 33, 34, 28, 22, 23, 17, 16, 15, 9, 10, 11, 5, 4, 3, 2, 8, 7, 1, 0, 6, 12, 18, 19]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              13,
              24,
              25,
              29,
              30,
              31,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 118,
    "focus": "cover paths",
    "title": "Plan the exit",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[6, 0, 1, 7, 8, 14, 13, 12, 18, 19, 20, 21, 15, 16, 10, 4, 5, 11, 17, 23, 29, 28, 34, 33, 32, 31, 25, 24, 30]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              2,
              3,
              9,
              22,
              26,
              27,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[15, 9, 3, 4, 10, 11, 17, 16, 22, 28, 27, 21, 20, 14, 13, 7, 8, 2, 1, 0, 6, 12, 18, 24, 30, 31, 32, 33, 34]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              5,
              19,
              23,
              25,
              26,
              29,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[0, 6, 7, 1, 2, 3, 9, 10, 11, 17, 23, 29, 35, 34, 28, 22, 21, 20, 19, 25, 26, 27, 33, 32, 31, 30, 24, 18, 12]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              4,
              5,
              8,
              13,
              14,
              15,
              16
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[13, 14, 15, 16, 10, 9, 8, 7, 1, 0, 6, 12, 18, 24, 30, 31, 32, 26, 25, 19, 20, 21, 27, 33, 34, 35, 29, 23, 17]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              2,
              3,
              4,
              5,
              11,
              22,
              28
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[10, 9, 8, 7, 13, 19, 18, 12, 6, 0, 1, 2, 3, 4, 5, 11, 17, 16, 15, 14, 20, 26, 27, 33, 34, 28, 22, 23, 29]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              21,
              24,
              25,
              30,
              31,
              32,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 119,
    "focus": "cover paths",
    "title": "Connected regions",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[18, 24, 25, 31, 32, 33, 34, 35, 29, 28, 22, 16, 15, 21, 27, 26, 20, 14, 13, 12, 6, 0, 1, 2, 3, 4, 5, 11, 17]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              7,
              8,
              9,
              10,
              19,
              23,
              30
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[22, 28, 27, 26, 20, 19, 13, 7, 1, 0, 6, 12, 18, 24, 30, 31, 32, 33, 34, 35, 29, 23, 17, 11, 10, 4, 3, 9, 15]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              2,
              5,
              8,
              14,
              16,
              21,
              25
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[6, 12, 18, 24, 30, 31, 25, 26, 32, 33, 34, 28, 27, 21, 15, 14, 20, 19, 13, 7, 1, 2, 8, 9, 10, 4, 5, 11, 17]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              3,
              16,
              22,
              23,
              29,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[28, 34, 35, 29, 23, 22, 16, 15, 21, 27, 26, 25, 31, 30, 24, 18, 19, 20, 14, 13, 12, 6, 0, 1, 7, 8, 2, 3, 9]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              4,
              5,
              10,
              11,
              17,
              32,
              33
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      },
      {
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; avoid blocked positions.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[9, 15, 21, 22, 28, 34, 35, 29, 23, 17, 16, 10, 11, 5, 4, 3, 2, 1, 0, 6, 12, 18, 19, 20, 26, 27, 33, 32, 31]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              7,
              8,
              13,
              14,
              24,
              25,
              30
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 435,
    "focus": "cover paths",
    "title": "Cover Paths 6",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[14, 9, 4, 3, 2, 7, 8, 13, 18, 23, 22, 21, 16, 15, 10, 11, 12, 17]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              0,
              1,
              5,
              6,
              19,
              20,
              24
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 436,
    "focus": "cover paths",
    "title": "Cover Paths 7",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[9, 14, 13, 18, 19, 24, 23, 22, 21, 16, 11, 6, 1, 2, 7, 8, 3, 4]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              0,
              5,
              10,
              12,
              15,
              17,
              20
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 437,
    "focus": "cover paths",
    "title": "Cover Paths 8",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[13, 8, 7, 2, 3, 4, 9, 14, 19, 18, 23, 22, 21, 16, 11, 6, 1, 0]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              5,
              10,
              12,
              15,
              17,
              20,
              24
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 438,
    "focus": "cover paths",
    "title": "Cover Paths 9",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[20, 15, 10, 11, 6, 7, 8, 9, 14, 19, 18, 23, 22, 21, 16, 17, 12, 13]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              0,
              1,
              2,
              3,
              4,
              5,
              24
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 439,
    "focus": "cover paths",
    "title": "Cover Paths 10",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[12, 13, 8, 3, 2, 7, 6, 1, 0, 5, 10, 11, 16, 21, 22, 17, 18, 19]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              4,
              9,
              14,
              15,
              20,
              23,
              24
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 440,
    "focus": "cover paths",
    "title": "Cover Paths 11",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[12, 11, 10, 15, 16, 17, 18, 19, 14, 9, 4, 3, 2, 1, 6, 7, 8, 13]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              0,
              5,
              20,
              21,
              22,
              23,
              24
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 441,
    "focus": "cover paths",
    "title": "Cover Paths 12",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[16, 21, 22, 17, 18, 23, 24, 19, 14, 9, 4, 3, 2, 7, 8, 13, 12, 11]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              0,
              1,
              5,
              6,
              10,
              15,
              20
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 442,
    "focus": "cover paths",
    "title": "Cover Paths 13",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[0, 1, 2, 3, 8, 13, 12, 17, 18, 23, 22, 21, 20, 15, 10, 5, 6, 11]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              4,
              7,
              9,
              14,
              16,
              19,
              24
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 443,
    "focus": "cover paths",
    "title": "Cover Paths 14",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[24, 23, 22, 21, 20, 15, 10, 5, 6, 11, 12, 17, 18, 13, 8, 7, 2, 3]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              0,
              1,
              4,
              9,
              14,
              16,
              19
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 444,
    "focus": "cover paths",
    "title": "Cover Paths 15",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[13, 8, 3, 4, 9, 14, 19, 24, 23, 22, 17, 12, 7, 2, 1, 0, 5, 6]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              10,
              11,
              15,
              16,
              18,
              20,
              21
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 445,
    "focus": "cover paths",
    "title": "Cover Paths 16",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[23, 22, 21, 20, 15, 16, 17, 18, 13, 12, 11, 6, 7, 2, 3, 4, 9, 8]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              0,
              1,
              5,
              10,
              14,
              19,
              24
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 446,
    "focus": "cover paths",
    "title": "Cover Paths 17",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[9, 4, 3, 2, 1, 0, 5, 10, 15, 16, 21, 22, 23, 24, 19, 18, 13, 14]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              6,
              7,
              8,
              11,
              12,
              17,
              20
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 447,
    "focus": "cover paths",
    "title": "Cover Paths 18",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[19, 24, 23, 18, 17, 16, 15, 10, 11, 12, 13, 14, 9, 4, 3, 2, 1, 0]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              5,
              6,
              7,
              8,
              20,
              21,
              22
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 448,
    "focus": "cover paths",
    "title": "Cover Paths 19",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[23, 24, 19, 14, 13, 8, 9, 4, 3, 2, 7, 6, 1, 0, 5, 10, 15, 20]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              11,
              12,
              16,
              17,
              18,
              21,
              22
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 449,
    "focus": "cover paths",
    "title": "Cover Paths 20",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[11, 16, 17, 22, 21, 20, 15, 10, 5, 0, 1, 2, 3, 8, 9, 14, 13, 12]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "blocked": [
              4,
              6,
              7,
              18,
              19,
              23,
              24
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 18
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 450,
    "focus": "cover paths",
    "title": "Cover Paths 21",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[27, 21, 20, 14, 13, 7, 1, 2, 8, 9, 3, 4, 5, 11, 10, 16, 17, 23, 22, 28, 34, 33, 32, 31, 25, 19, 18, 24, 30]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              6,
              12,
              15,
              26,
              29,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 451,
    "focus": "cover paths",
    "title": "Cover Paths 22",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[6, 12, 13, 14, 15, 16, 10, 9, 8, 7, 1, 2, 3, 4, 5, 11, 17, 23, 29, 35, 34, 33, 27, 21, 20, 26, 25, 19, 18]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              22,
              24,
              28,
              30,
              31,
              32
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 452,
    "focus": "cover paths",
    "title": "Cover Paths 23",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[5, 4, 3, 9, 8, 7, 6, 12, 13, 19, 18, 24, 30, 31, 32, 26, 20, 21, 27, 28, 34, 35, 29, 23, 22, 16, 17, 11, 10]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              1,
              2,
              14,
              15,
              25,
              33
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 453,
    "focus": "cover paths",
    "title": "Cover Paths 24",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[5, 4, 10, 11, 17, 23, 29, 35, 34, 28, 22, 21, 15, 9, 3, 2, 8, 14, 13, 12, 18, 19, 20, 26, 32, 31, 25, 24, 30]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              1,
              6,
              7,
              16,
              27,
              33
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 454,
    "focus": "cover paths",
    "title": "Cover Paths 25",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[28, 27, 21, 22, 16, 10, 11, 5, 4, 3, 9, 15, 14, 13, 19, 25, 26, 32, 31, 30, 24, 18, 12, 6, 0, 1, 7, 8, 2]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              17,
              20,
              23,
              29,
              33,
              34,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 455,
    "focus": "cover paths",
    "title": "Cover Paths 26",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[35, 29, 28, 27, 21, 20, 19, 25, 24, 18, 12, 13, 7, 6, 0, 1, 2, 8, 9, 10, 4, 5, 11, 17, 23, 22, 16, 15, 14]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              3,
              26,
              30,
              31,
              32,
              33,
              34
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 456,
    "focus": "cover paths",
    "title": "Cover Paths 27",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[13, 12, 6, 0, 1, 7, 8, 2, 3, 9, 10, 16, 22, 21, 20, 19, 25, 31, 32, 26, 27, 28, 34, 35, 29, 23, 17, 11, 5]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              4,
              14,
              15,
              18,
              24,
              30,
              33
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 457,
    "focus": "cover paths",
    "title": "Cover Paths 28",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[17, 16, 10, 11, 5, 4, 3, 2, 8, 7, 1, 0, 6, 12, 18, 24, 30, 31, 32, 26, 25, 19, 13, 14, 15, 21, 27, 33, 34]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              9,
              20,
              22,
              23,
              28,
              29,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 458,
    "focus": "cover paths",
    "title": "Cover Paths 29",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[23, 17, 16, 10, 4, 3, 2, 8, 9, 15, 14, 13, 7, 1, 0, 6, 12, 18, 24, 30, 31, 25, 26, 32, 33, 27, 28, 22, 21]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              5,
              11,
              19,
              20,
              29,
              34,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 459,
    "focus": "cover paths",
    "title": "Cover Paths 30",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[18, 12, 13, 7, 6, 0, 1, 2, 8, 14, 15, 21, 20, 19, 25, 24, 30, 31, 32, 26, 27, 33, 34, 28, 29, 23, 17, 16, 10]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              3,
              4,
              5,
              9,
              11,
              22,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 460,
    "focus": "cover paths",
    "title": "Cover Paths 31",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[6, 0, 1, 2, 3, 4, 5, 11, 10, 9, 15, 16, 17, 23, 29, 28, 34, 33, 27, 26, 25, 31, 30, 24, 18, 19, 20, 14, 8]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              7,
              12,
              13,
              21,
              22,
              32,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 461,
    "focus": "cover paths",
    "title": "Cover Paths 32",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[1, 7, 8, 2, 3, 4, 10, 11, 17, 23, 29, 28, 22, 16, 15, 21, 20, 14, 13, 19, 18, 24, 25, 31, 32, 26, 27, 33, 34]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              5,
              6,
              9,
              12,
              30,
              35
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 462,
    "focus": "cover paths",
    "title": "Cover Paths 33",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[0, 6, 7, 13, 14, 8, 9, 3, 4, 5, 11, 10, 16, 17, 23, 29, 35, 34, 28, 27, 33, 32, 31, 30, 24, 25, 26, 20, 19]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              1,
              2,
              12,
              15,
              18,
              21,
              22
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 463,
    "focus": "cover paths",
    "title": "Cover Paths 34",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[4, 3, 2, 1, 7, 6, 12, 18, 19, 20, 26, 25, 31, 32, 33, 27, 21, 15, 9, 10, 16, 22, 28, 34, 35, 29, 23, 17, 11]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              0,
              5,
              8,
              13,
              14,
              24,
              30
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 464,
    "focus": "cover paths",
    "title": "Cover Paths 35",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Avoid sealing off unvisited dots. Consider which dots have only one possible entrance or exit.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[24, 25, 26, 20, 21, 22, 28, 34, 35, 29, 23, 17, 11, 5, 4, 10, 9, 3, 2, 8, 14, 13, 7, 1, 0, 6, 12, 18, 19]",
            "explanation": "This is one complete route. Other routes earn full credit if they visit every available dot exactly once and obey the adjacency rules.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "blocked": [
              15,
              16,
              27,
              30,
              31,
              32,
              33
            ],
            "validation": {
              "method": "complete witness route",
              "requiredCells": 29
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 465,
    "focus": "cover paths",
    "title": "Cover Paths 36",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[6, 13, 12, 11, 10, 3, 2, 1, 0, 7, 8, 9, 16, 15, 22, 23, 24, 17, 18, 25, 26, 19, 20, 27, 34, 41, 48, 47, 40, 39, 32, 31, 38, 37, 36]",
            "explanation": "The dots at row 1, column 7 and row 6, column 2 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              4,
              5,
              14,
              21,
              28,
              29,
              30,
              33,
              35,
              42,
              43,
              44,
              45,
              46
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 12,
              "unresolvedEdgesAfterDegreeRules": 34,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 466,
    "focus": "cover paths",
    "title": "Cover Paths 37",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[7, 0, 1, 2, 3, 4, 5, 12, 11, 10, 9, 16, 15, 22, 21, 28, 29, 30, 31, 24, 25, 18, 19, 26, 27, 34, 41, 48, 47, 40, 33, 32, 39, 38, 45]",
            "explanation": "The dots at row 2, column 1 and row 7, column 4 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              6,
              8,
              13,
              14,
              17,
              20,
              23,
              35,
              36,
              37,
              42,
              43,
              44,
              46
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 5,
              "unresolvedEdgesAfterDegreeRules": 23,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 467,
    "focus": "cover paths",
    "title": "Cover Paths 38",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[28, 29, 22, 23, 16, 15, 8, 1, 2, 3, 4, 5, 6, 13, 12, 11, 10, 17, 18, 25, 26, 19, 20, 27, 34, 33, 40, 47, 46, 39, 38, 31, 30, 37, 44]",
            "explanation": "The dots at row 5, column 1 and row 7, column 3 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              0,
              7,
              9,
              14,
              21,
              24,
              32,
              35,
              36,
              41,
              42,
              43,
              45,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 4,
              "unresolvedEdgesAfterDegreeRules": 32,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 468,
    "focus": "cover paths",
    "title": "Cover Paths 39",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[6, 5, 12, 11, 10, 17, 18, 19, 26, 27, 34, 41, 48, 47, 40, 33, 32, 25, 24, 31, 30, 23, 22, 15, 8, 7, 14, 21, 28, 29, 36, 35, 42, 43, 44]",
            "explanation": "The dots at row 1, column 7 and row 7, column 3 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              0,
              1,
              2,
              3,
              4,
              9,
              13,
              16,
              20,
              37,
              38,
              39,
              45,
              46
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 4,
              "unresolvedEdgesAfterDegreeRules": 25,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 469,
    "focus": "cover paths",
    "title": "Cover Paths 40",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[0, 1, 8, 9, 10, 3, 4, 5, 6, 13, 12, 19, 18, 17, 16, 23, 24, 25, 32, 31, 30, 29, 28, 35, 42, 43, 44, 45, 38, 39, 46, 47, 40, 41, 34]",
            "explanation": "The dots at row 1, column 1 and row 5, column 7 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              2,
              7,
              11,
              14,
              15,
              20,
              21,
              22,
              26,
              27,
              33,
              36,
              37,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 12,
              "unresolvedEdgesAfterDegreeRules": 21,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 470,
    "focus": "cover paths",
    "title": "Cover Paths 41",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[11, 10, 3, 2, 1, 0, 7, 14, 15, 8, 9, 16, 23, 30, 29, 28, 35, 42, 43, 36, 37, 44, 45, 38, 31, 32, 39, 46, 47, 40, 41, 34, 27, 26, 19]",
            "explanation": "The dots at row 2, column 5 and row 3, column 6 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              4,
              5,
              6,
              12,
              13,
              17,
              18,
              20,
              21,
              22,
              24,
              25,
              33,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 6,
              "unresolvedEdgesAfterDegreeRules": 22,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 471,
    "focus": "cover paths",
    "title": "Cover Paths 42",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[21, 14, 15, 8, 1, 2, 9, 10, 11, 12, 5, 6, 13, 20, 19, 18, 17, 16, 23, 30, 31, 32, 25, 26, 27, 34, 33, 40, 47, 46, 45, 44, 43, 42, 35]",
            "explanation": "The dots at row 4, column 1 and row 6, column 1 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              0,
              3,
              4,
              7,
              22,
              24,
              28,
              29,
              36,
              37,
              38,
              39,
              41,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 6,
              "unresolvedEdgesAfterDegreeRules": 21,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 472,
    "focus": "cover paths",
    "title": "Cover Paths 43",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[42, 35, 28, 29, 36, 37, 38, 31, 30, 23, 22, 21, 14, 15, 8, 9, 10, 11, 4, 5, 12, 13, 20, 19, 18, 17, 24, 25, 26, 27, 34, 41, 40, 47, 46]",
            "explanation": "The dots at row 7, column 1 and row 7, column 5 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              0,
              1,
              2,
              3,
              6,
              7,
              16,
              32,
              33,
              39,
              43,
              44,
              45,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 6,
              "unresolvedEdgesAfterDegreeRules": 28,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 473,
    "focus": "cover paths",
    "title": "Cover Paths 44",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[5, 12, 11, 10, 9, 2, 1, 0, 7, 14, 21, 28, 29, 22, 15, 16, 17, 18, 19, 20, 27, 26, 25, 24, 31, 32, 33, 40, 39, 46, 45, 38, 37, 36, 43]",
            "explanation": "The dots at row 1, column 6 and row 7, column 2 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              3,
              4,
              6,
              8,
              13,
              23,
              30,
              34,
              35,
              41,
              42,
              44,
              47,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 3,
              "unresolvedEdgesAfterDegreeRules": 23,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 474,
    "focus": "cover paths",
    "title": "Cover Paths 45",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[0, 1, 2, 3, 4, 11, 10, 17, 16, 9, 8, 15, 14, 21, 22, 23, 30, 29, 28, 35, 42, 43, 36, 37, 38, 39, 40, 33, 26, 27, 20, 19, 12, 13, 6]",
            "explanation": "The dots at row 1, column 1 and row 1, column 7 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              5,
              7,
              18,
              24,
              25,
              31,
              32,
              34,
              41,
              44,
              45,
              46,
              47,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 6,
              "unresolvedEdgesAfterDegreeRules": 21,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 475,
    "focus": "cover paths",
    "title": "Cover Paths 46",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[6, 5, 4, 3, 2, 1, 0, 7, 14, 15, 16, 9, 10, 17, 18, 11, 12, 19, 26, 33, 34, 41, 48, 47, 46, 39, 38, 37, 30, 23, 22, 29, 28, 35, 42]",
            "explanation": "The dots at row 1, column 7 and row 7, column 1 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              8,
              13,
              20,
              21,
              24,
              25,
              27,
              31,
              32,
              36,
              40,
              43,
              44,
              45
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 12,
              "unresolvedEdgesAfterDegreeRules": 24,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 476,
    "focus": "cover paths",
    "title": "Cover Paths 47",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[0, 1, 2, 9, 16, 17, 24, 23, 22, 21, 28, 35, 42, 43, 36, 37, 44, 45, 38, 31, 32, 39, 40, 41, 34, 33, 26, 25, 18, 11, 4, 5, 12, 19, 20]",
            "explanation": "The dots at row 1, column 1 and row 3, column 7 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              3,
              6,
              7,
              8,
              10,
              13,
              14,
              15,
              27,
              29,
              30,
              46,
              47,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 3,
              "unresolvedEdgesAfterDegreeRules": 23,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 477,
    "focus": "cover paths",
    "title": "Cover Paths 48",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[6, 13, 12, 11, 18, 17, 16, 23, 22, 15, 8, 9, 2, 1, 0, 7, 14, 21, 28, 35, 36, 37, 44, 45, 38, 31, 24, 25, 32, 39, 46, 47, 48, 41, 34]",
            "explanation": "The dots at row 1, column 7 and row 5, column 7 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              3,
              4,
              5,
              10,
              19,
              20,
              26,
              27,
              29,
              30,
              33,
              40,
              42,
              43
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 4,
              "unresolvedEdgesAfterDegreeRules": 27,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 478,
    "focus": "cover paths",
    "title": "Cover Paths 49",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[20, 19, 26, 25, 32, 31, 24, 17, 10, 11, 4, 3, 2, 1, 0, 7, 8, 9, 16, 15, 14, 21, 22, 23, 30, 29, 36, 35, 42, 43, 44, 45, 46, 39, 40]",
            "explanation": "The dots at row 3, column 7 and row 6, column 6 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              5,
              6,
              12,
              13,
              18,
              27,
              28,
              33,
              34,
              37,
              38,
              41,
              47,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 10,
              "unresolvedEdgesAfterDegreeRules": 25,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 479,
    "focus": "cover paths",
    "title": "Cover Paths 50",
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
        "prompt": "Choose any open dot to start. Draw one continuous route visiting every dot exactly once. Move horizontally or vertically; blocked positions cannot be visited. Do not retrace or cross the route.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[42, 35, 28, 21, 22, 15, 16, 9, 10, 17, 24, 25, 26, 19, 12, 11, 4, 5, 6, 13, 20, 27, 34, 41, 40, 33, 32, 39, 38, 31, 30, 29, 36, 37, 44]",
            "explanation": "The dots at row 7, column 1 and row 7, column 3 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "blocked": [
              0,
              1,
              2,
              3,
              7,
              8,
              14,
              18,
              23,
              43,
              45,
              46,
              47,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 4,
              "unresolvedEdgesAfterDegreeRules": 30,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            },
            "rows": 7
          }
        ]
      }
    ]
  },
  {
    "slot": 835,
    "title": "Cover Paths · 51",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[2, 3, 7, 6, 10, 11, 15, 19, 18, 14, 13, 17, 16, 12, 8, 9, 5, 1, 0, 4]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 5,
            "blocked": [],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "rectangle"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 836,
    "title": "Cover Paths · 52",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[18, 19, 14, 13, 12, 17, 16, 11, 10, 5, 0, 1, 6, 7, 2, 3, 4, 9, 8]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "rows": 4,
            "blocked": [
              15
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "stepped"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 837,
    "title": "Cover Paths · 53",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[14, 15, 19, 23, 22, 18, 17, 21, 20, 16, 12, 13, 9, 8, 4, 0, 1, 5]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 6,
            "blocked": [
              2,
              3,
              6,
              7,
              10,
              11
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "L shape"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 838,
    "title": "Cover Paths · 54",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[11, 15, 19, 18, 14, 13, 17, 16, 12, 8, 9, 5, 4, 0, 1, 2, 6, 7, 3]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 5,
            "blocked": [
              10
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "central gap"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 839,
    "title": "Cover Paths · 55",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[18, 19, 14, 9, 4, 3, 8, 13, 12, 11, 16, 15, 10, 5, 0, 1, 6]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "rows": 4,
            "blocked": [
              2,
              7,
              17
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "two regions"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 840,
    "title": "Cover Paths · 56",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[13, 12, 8, 9, 10, 14, 18, 17, 16, 20, 21, 22, 23, 19, 15, 11, 7, 3, 2, 6, 5, 4, 0, 1]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 6,
            "blocked": [],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "rectangle"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 841,
    "title": "Cover Paths · 57",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[15, 19, 18, 17, 13, 14, 10, 11, 7, 3, 2, 6, 5, 1, 0, 4, 8, 9]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 5,
            "blocked": [
              12,
              16
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "stepped"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 842,
    "title": "Cover Paths · 58",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[16, 15, 10, 5, 0, 1, 6, 11, 12, 17, 18, 19, 14, 13]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "rows": 4,
            "blocked": [
              2,
              3,
              4,
              7,
              8,
              9
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "L shape"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 843,
    "title": "Cover Paths · 59",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[13, 12, 8, 9, 10, 6, 5, 4, 0, 1, 2, 3, 7, 11, 15, 19, 23, 22, 18, 17, 16, 20, 21]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 6,
            "blocked": [
              14
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "central gap"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 844,
    "title": "Cover Paths · 60",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[18, 17, 16, 15, 10, 11, 12, 13, 8, 9, 4, 3, 2, 7, 6, 1, 0, 5]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "rows": 4,
            "blocked": [
              14,
              19
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "rectangle"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 845,
    "title": "Cover Paths · 61",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[6, 5, 0, 1, 2, 3, 4, 9, 8, 7, 12, 13, 14, 19, 18, 17, 16, 15, 10, 11]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "rows": 4,
            "blocked": [],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "rectangle"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 846,
    "title": "Cover Paths · 62",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[7, 3, 2, 6, 10, 11, 15, 19, 23, 22, 21, 17, 18, 14, 13, 9, 8, 4, 5, 1, 0]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 6,
            "blocked": [
              12,
              16,
              20
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "stepped"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 847,
    "title": "Cover Paths · 63",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[19, 18, 17, 16, 12, 8, 4, 0, 1, 5, 9, 13, 14, 15, 11, 10]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 5,
            "blocked": [
              2,
              3,
              6,
              7
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "L shape"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 848,
    "title": "Cover Paths · 64",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[7, 2, 3, 4, 9, 8, 13, 14, 19, 18, 17, 16, 15, 10, 11, 6, 1, 0, 5]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "rows": 4,
            "blocked": [
              12
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "central gap"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 849,
    "title": "Cover Paths · 65",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[4, 8, 12, 16, 17, 18, 19, 15, 14, 13, 9, 5, 6, 2, 3, 7, 11, 10]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 5,
            "blocked": [
              0,
              1
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "rectangle"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 850,
    "title": "Cover Paths · 66",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[32, 31, 30, 25, 26, 27, 22, 21, 20, 15, 10, 5, 0, 1, 6, 11, 16, 17, 12, 7, 2, 3, 4, 9, 8, 13, 14, 19, 18, 23, 24, 29, 28, 33, 34]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "rows": 7,
            "blocked": [],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "rectangle"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 851,
    "title": "Cover Paths · 67",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[34, 33, 32, 31, 30, 29, 22, 23, 24, 25, 26, 27, 20, 13, 6, 5, 4, 3, 2, 1, 0, 7, 14, 15, 8, 9, 16, 17, 10, 11, 12, 19, 18]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 5,
            "blocked": [
              21,
              28
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "stepped"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 852,
    "title": "Cover Paths · 68",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[7, 1, 0, 6, 12, 13, 19, 18, 24, 30, 31, 25, 26, 32, 33, 34, 35, 29, 23, 22, 28, 27, 21, 20, 14, 8, 2]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "rows": 6,
            "blocked": [
              3,
              4,
              5,
              9,
              10,
              11,
              15,
              16,
              17
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "L shape"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 853,
    "title": "Cover Paths · 69",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[4, 5, 6, 13, 20, 19, 26, 27, 34, 33, 32, 25, 18, 17, 16, 9, 2, 1, 0, 7, 8, 15, 14, 21, 28, 29, 22, 23, 30]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 5,
            "blocked": [
              3,
              10,
              11,
              12,
              24,
              31
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "two regions"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 854,
    "title": "Cover Paths · 70",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[2, 1, 0, 7, 14, 21, 28, 29, 30, 23, 22, 15, 8, 9, 16, 17, 18, 11, 4, 5, 6, 13, 12, 19, 20, 27, 34, 33, 32, 25, 26]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 5,
            "blocked": [
              3,
              10,
              24,
              31
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "two regions"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 855,
    "title": "Cover Paths · 71",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[8, 2, 3, 4, 5, 11, 17, 23, 29, 35, 34, 33, 32, 31, 30, 24, 18, 12, 6, 0, 1, 7, 13, 14, 20, 19, 25, 26, 27, 28, 22, 21, 15, 9, 10, 16]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "rows": 6,
            "blocked": [],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "rectangle"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 856,
    "title": "Cover Paths · 72",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[2, 1, 0, 7, 8, 15, 14, 21, 28, 29, 22, 23, 30, 31, 24, 17, 18, 19, 20, 27, 34, 33, 26, 25, 32]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 5,
            "blocked": [
              3,
              4,
              5,
              6,
              9,
              10,
              11,
              12,
              13,
              16
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "L shape"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 857,
    "title": "Cover Paths · 73",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[20, 19, 18, 17, 24, 25, 26, 27, 34, 33, 32, 31, 30, 23, 16, 9, 2, 1, 0, 7, 8, 15, 14, 21, 28, 29, 22]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 5,
            "blocked": [
              3,
              4,
              5,
              6,
              10,
              11,
              12,
              13
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "L shape"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 858,
    "title": "Cover Paths · 74",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[27, 33, 32, 26, 20, 14, 15, 16, 22, 28, 34, 35, 29, 23, 17, 11, 5, 4, 10, 9, 3, 2, 8, 7, 1, 0, 6, 12, 13, 19, 18, 24, 30, 31, 25]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "rows": 6,
            "blocked": [
              21
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "central gap"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 859,
    "title": "Cover Paths · 75",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[1, 0, 5, 6, 11, 10, 15, 20, 25, 30, 31, 26, 21, 16, 17, 18, 23, 28, 33, 34, 29, 24, 19, 14, 13, 8, 9, 4, 3]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "rows": 7,
            "blocked": [
              2,
              7,
              12,
              22,
              27,
              32
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "two regions"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 860,
    "title": "Cover Paths · 76",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[6, 5, 4, 3, 2, 1, 0, 7, 8, 9, 10, 11, 12, 13, 20, 27, 34, 33, 32, 31, 30, 29, 28, 21, 14, 15, 22, 23, 16, 17, 24, 25, 26, 19, 18]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 5,
            "blocked": [],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "rectangle"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 861,
    "title": "Cover Paths · 77",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[4, 5, 11, 10, 9, 3, 2, 1, 0, 6, 12, 13, 7, 8, 14, 15, 16, 17, 23, 22, 21, 20, 19, 25, 31, 32, 26, 27, 33, 34, 28, 29, 35]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "rows": 6,
            "blocked": [
              18,
              24,
              30
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "stepped"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 862,
    "title": "Cover Paths · 78",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[22, 17, 18, 19, 24, 23, 28, 29, 34, 33, 32, 27, 26, 31, 30, 25, 20, 21, 16, 15, 10, 11, 6, 5, 0, 1]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 5,
            "rows": 7,
            "blocked": [
              2,
              3,
              4,
              7,
              8,
              9,
              12,
              13,
              14
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "L shape"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 863,
    "title": "Cover Paths · 79",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[31, 32, 26, 25, 19, 18, 12, 13, 7, 6, 0, 1, 2, 8, 14, 20, 21, 22, 16, 10, 4, 5, 11, 17, 23, 29, 28, 34, 35]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "rows": 6,
            "blocked": [
              3,
              9,
              15,
              24,
              27,
              30,
              33
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "two regions"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 864,
    "title": "Cover Paths · 80",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[26, 32, 31, 30, 24, 25, 19, 18, 12, 13, 7, 6, 0, 1, 2, 8, 14, 20, 21, 22, 28, 34, 35, 29, 23, 17, 16, 10, 11, 5, 4]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "rows": 6,
            "blocked": [
              3,
              9,
              15,
              27,
              33
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "two regions"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 865,
    "title": "Cover Paths · 81",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[32, 31, 30, 29, 22, 23, 24, 25, 26, 27, 20, 13, 6, 5, 12, 19, 18, 17, 16, 15, 14, 7, 0, 1, 8, 9, 2, 3, 10, 11, 4]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 5,
            "blocked": [
              21,
              28,
              33,
              34
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "stepped"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 866,
    "title": "Cover Paths · 82",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[31, 30, 24, 18, 12, 6, 0, 1, 2, 8, 7, 13, 14, 20, 19, 25, 26, 27, 21, 22, 23, 29, 28, 34, 35]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "rows": 6,
            "blocked": [
              3,
              4,
              5,
              9,
              10,
              11,
              15,
              16,
              17,
              32,
              33
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "L shape"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 867,
    "title": "Cover Paths · 83",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[5, 6, 13, 20, 27, 34, 33, 32, 25, 26, 19, 18, 17, 16, 9, 2, 1, 0, 7, 8, 15, 14, 21, 28, 29, 22, 23, 30]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 5,
            "blocked": [
              3,
              4,
              10,
              11,
              12,
              24,
              31
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "two regions"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 868,
    "title": "Cover Paths · 84",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[30, 29, 28, 21, 14, 15, 8, 7, 0, 1, 2, 9, 16, 17, 18, 25, 32, 33, 34, 27, 26, 19, 20, 13, 6, 5, 12, 11, 4]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 5,
            "blocked": [
              3,
              10,
              22,
              23,
              24,
              31
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "two regions"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 869,
    "title": "Cover Paths · 85",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Look for dots with very few neighbours and narrow links between regions. Plan how to reach them without cutting off the rest.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[0, 6, 12, 13, 14, 8, 2, 3, 9, 15, 21, 20, 19, 18, 24, 30, 31, 25, 26, 32, 33, 27, 28, 34, 35, 29, 23, 22, 16, 17, 11, 5, 4, 10]",
            "explanation": "The route visits every open dot exactly once. Its reverse and any other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 6,
            "rows": 6,
            "blocked": [
              1,
              7
            ],
            "validation": {
              "method": "Hamiltonian witness with adjacency and coverage checks",
              "shape": "rectangle"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 870,
    "title": "Cover Paths · 86",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[1, 2, 3, 4, 11, 10, 9, 16, 15, 14, 21, 22, 23, 24, 17, 18, 19, 12, 13, 20, 27, 34, 41, 48, 47, 46, 39, 32, 31, 38, 45, 44, 43, 42, 35]",
            "explanation": "The dots at row 1, column 2 and row 6, column 1 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              0,
              5,
              6,
              7,
              8,
              25,
              26,
              28,
              29,
              30,
              33,
              36,
              37,
              40
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 2,
              "unresolvedEdgesAfterDegreeRules": 22,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 871,
    "title": "Cover Paths · 87",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[20, 19, 12, 5, 4, 3, 2, 1, 0, 7, 14, 15, 22, 21, 28, 35, 36, 43, 44, 45, 38, 31, 24, 17, 16, 9, 10, 11, 18, 25, 32, 39, 40, 41, 34]",
            "explanation": "The dots at row 3, column 7 and row 5, column 7 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              6,
              8,
              13,
              23,
              26,
              27,
              29,
              30,
              33,
              37,
              42,
              46,
              47,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 11,
              "unresolvedEdgesAfterDegreeRules": 22,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 872,
    "title": "Cover Paths · 88",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[8, 15, 16, 23, 24, 25, 18, 11, 10, 3, 4, 5, 6, 13, 20, 19, 26, 27, 34, 33, 32, 31, 30, 29, 28, 35, 42, 43, 44, 45, 46, 39, 40, 47, 48]",
            "explanation": "The dots at row 2, column 2 and row 7, column 7 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              0,
              1,
              2,
              7,
              9,
              12,
              14,
              17,
              21,
              22,
              36,
              37,
              38,
              41
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 8,
              "unresolvedEdgesAfterDegreeRules": 22,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 873,
    "title": "Cover Paths · 89",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[20, 27, 26, 33, 32, 31, 24, 23, 16, 17, 18, 11, 10, 9, 2, 1, 0, 7, 14, 21, 22, 29, 36, 37, 38, 39, 40, 41, 48, 47, 46, 45, 44, 43, 42]",
            "explanation": "The dots at row 3, column 7 and row 7, column 1 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              3,
              4,
              5,
              6,
              8,
              12,
              13,
              15,
              19,
              25,
              28,
              30,
              34,
              35
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 6,
              "unresolvedEdgesAfterDegreeRules": 24,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 874,
    "title": "Cover Paths · 90",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[3, 4, 5, 6, 13, 12, 11, 18, 17, 24, 25, 26, 19, 20, 27, 34, 41, 40, 33, 32, 39, 46, 45, 44, 37, 30, 29, 22, 21, 14, 7, 0, 1, 8, 9]",
            "explanation": "The dots at row 1, column 4 and row 2, column 3 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              2,
              10,
              15,
              16,
              23,
              28,
              31,
              35,
              36,
              38,
              42,
              43,
              47,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 12,
              "unresolvedEdgesAfterDegreeRules": 23,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 875,
    "title": "Cover Paths · 91",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[1, 2, 3, 4, 11, 10, 9, 16, 17, 18, 25, 24, 23, 22, 29, 28, 35, 42, 43, 36, 37, 30, 31, 38, 45, 46, 39, 40, 41, 34, 33, 26, 19, 12, 13]",
            "explanation": "The dots at row 1, column 2 and row 2, column 7 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              0,
              5,
              6,
              7,
              8,
              14,
              15,
              20,
              21,
              27,
              32,
              44,
              47,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 11,
              "unresolvedEdgesAfterDegreeRules": 30,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 876,
    "title": "Cover Paths · 92",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[22, 23, 16, 17, 10, 3, 4, 5, 6, 13, 12, 11, 18, 19, 20, 27, 34, 41, 48, 47, 40, 33, 32, 25, 24, 31, 30, 37, 38, 45, 44, 43, 42, 35, 28]",
            "explanation": "The dots at row 4, column 2 and row 5, column 1 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              0,
              1,
              2,
              7,
              8,
              9,
              14,
              15,
              21,
              26,
              29,
              36,
              39,
              46
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 6,
              "unresolvedEdgesAfterDegreeRules": 24,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 877,
    "title": "Cover Paths · 93",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[1, 0, 7, 14, 15, 16, 17, 18, 25, 24, 23, 22, 29, 30, 37, 36, 43, 44, 45, 38, 31, 32, 39, 40, 47, 48, 41, 34, 27, 20, 19, 12, 5, 4, 3]",
            "explanation": "The dots at row 1, column 2 and row 1, column 4 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              2,
              6,
              8,
              9,
              10,
              11,
              13,
              21,
              26,
              28,
              33,
              35,
              42,
              46
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 8,
              "unresolvedEdgesAfterDegreeRules": 22,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 878,
    "title": "Cover Paths · 94",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[35, 28, 21, 14, 7, 0, 1, 2, 3, 4, 11, 10, 9, 16, 15, 22, 23, 24, 17, 18, 25, 26, 19, 20, 27, 34, 33, 40, 41, 48, 47, 46, 39, 38, 37]",
            "explanation": "The dots at row 6, column 1 and row 6, column 3 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              5,
              6,
              8,
              12,
              13,
              29,
              30,
              31,
              32,
              36,
              42,
              43,
              44,
              45
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 11,
              "unresolvedEdgesAfterDegreeRules": 21,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 879,
    "title": "Cover Paths · 95",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[6, 13, 20, 19, 12, 11, 10, 9, 8, 1, 0, 7, 14, 21, 22, 15, 16, 17, 18, 25, 24, 23, 30, 31, 32, 33, 40, 41, 48, 47, 46, 45, 44, 43, 36]",
            "explanation": "The dots at row 1, column 7 and row 6, column 2 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              2,
              3,
              4,
              5,
              26,
              27,
              28,
              29,
              34,
              35,
              37,
              38,
              39,
              42
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 7,
              "unresolvedEdgesAfterDegreeRules": 23,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 880,
    "title": "Cover Paths · 96",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[6, 5, 4, 11, 10, 9, 2, 1, 8, 7, 14, 21, 22, 23, 30, 29, 28, 35, 36, 37, 38, 45, 46, 39, 32, 31, 24, 17, 18, 25, 26, 33, 34, 41, 48]",
            "explanation": "The dots at row 1, column 7 and row 7, column 7 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              0,
              3,
              12,
              13,
              15,
              16,
              19,
              20,
              27,
              40,
              42,
              43,
              44,
              47
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 12,
              "unresolvedEdgesAfterDegreeRules": 26,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 881,
    "title": "Cover Paths · 97",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[0, 1, 2, 9, 8, 15, 16, 17, 18, 25, 24, 23, 22, 29, 28, 35, 42, 43, 36, 37, 30, 31, 32, 39, 40, 47, 48, 41, 34, 27, 26, 19, 12, 5, 4]",
            "explanation": "The dots at row 1, column 1 and row 1, column 5 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              3,
              6,
              7,
              10,
              11,
              13,
              14,
              20,
              21,
              33,
              38,
              44,
              45,
              46
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 8,
              "unresolvedEdgesAfterDegreeRules": 20,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 882,
    "title": "Cover Paths · 98",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[6, 13, 12, 19, 20, 27, 34, 33, 32, 39, 40, 41, 48, 47, 46, 45, 38, 31, 24, 17, 18, 11, 4, 3, 2, 9, 16, 15, 14, 21, 22, 29, 36, 43, 42]",
            "explanation": "The dots at row 1, column 7 and row 7, column 1 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              0,
              1,
              5,
              7,
              8,
              10,
              23,
              25,
              26,
              28,
              30,
              35,
              37,
              44
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 8,
              "unresolvedEdgesAfterDegreeRules": 20,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 883,
    "title": "Cover Paths · 99",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[41, 48, 47, 46, 39, 32, 25, 18, 19, 26, 27, 20, 13, 12, 11, 4, 3, 2, 1, 8, 7, 14, 15, 16, 9, 10, 17, 24, 23, 22, 29, 28, 35, 42, 43]",
            "explanation": "The dots at row 6, column 7 and row 7, column 2 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              0,
              5,
              6,
              21,
              30,
              31,
              33,
              34,
              36,
              37,
              38,
              40,
              44,
              45
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 10,
              "unresolvedEdgesAfterDegreeRules": 23,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 884,
    "title": "Cover Paths · 100",
    "focus": "cover paths",
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
        "prompt": "Choose any open dot to start. Join every dot once using horizontal or vertical moves. Dark squares are blocked.",
        "hint": "Dots with only one neighbour must be the two ends. Work out the connections forced by dots with two neighbours, then avoid closing a loop before all dots are joined.",
        "parts": [
          {
            "id": "0",
            "kind": "cover-path",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[6, 5, 12, 11, 18, 19, 20, 27, 26, 25, 32, 33, 34, 41, 40, 47, 46, 39, 38, 31, 24, 17, 16, 23, 22, 15, 8, 7, 14, 21, 28, 29, 36, 35, 42]",
            "explanation": "The dots at row 1, column 7 and row 7, column 1 each have only one neighbour, so they must be the endpoints. Every other dot needs two route connections. Use these forced connections while keeping the remaining dots connected; closing a loop early leaves dots unreachable. The shown route covers all 35 open dots. Its reverse and every other valid complete route also work.",
            "solutionText": "See the completed board below.",
            "size": 7,
            "rows": 7,
            "blocked": [
              0,
              1,
              2,
              3,
              4,
              9,
              10,
              13,
              30,
              37,
              43,
              44,
              45,
              48
            ],
            "validation": {
              "method": "Exhaustive endpoint route enumeration; independent adjacency and coverage checks",
              "routeCountIgnoringReversal": 4,
              "unresolvedEdgesAfterDegreeRules": 24,
              "difficultyReview": "2026-10-08: forced endpoints, interacting connections, no row/column sweep; classroom calibration pending"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1099,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 1",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[9, 6, 7, 8, 5, 2, 1, 4]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 3,
            "rows": 4,
            "blocked": [
              0,
              3,
              10,
              11
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 8
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1100,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 2",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[5, 1, 0, 4, 8, 9, 10, 6, 2]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 3,
            "blocked": [
              3,
              7,
              11
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 9
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1101,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 3",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[12, 8, 9, 13, 14, 10, 6, 5, 4, 0]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 4,
            "blocked": [
              1,
              2,
              3,
              7,
              11,
              15
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 10
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1102,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 4",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[6, 7, 4, 3, 0, 1, 2, 5, 8, 11]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 3,
            "rows": 4,
            "blocked": [
              9,
              10
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 10
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1103,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 5",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[6, 7, 11, 10, 9, 8, 4, 0, 1, 5]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 3,
            "blocked": [
              2,
              3
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 10
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1104,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 6",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[11, 10, 9, 5, 1, 2, 3, 7]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 4,
            "blocked": [
              0,
              4,
              6,
              8,
              12,
              13,
              14,
              15
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 8
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1105,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 7",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[10, 7, 4, 5, 2, 1, 0, 3, 6]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 3,
            "rows": 4,
            "blocked": [
              8,
              9,
              11
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 9
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1106,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 8",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[11, 7, 6, 5, 9, 8, 4, 0, 1, 2]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 3,
            "blocked": [
              3,
              10
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 10
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1107,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 9",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[12, 8, 9, 10, 6, 2, 3, 7, 11, 15, 14]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 4,
            "blocked": [
              0,
              1,
              4,
              5,
              13
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 11
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1108,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 10",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[11, 10, 9, 6, 7, 8, 5, 2, 1, 0]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 3,
            "rows": 4,
            "blocked": [
              3,
              4
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 10
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1109,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 11",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[3, 7, 6, 5, 1, 0, 4, 8]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 3,
            "blocked": [
              2,
              9,
              10,
              11
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 8
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1110,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 12",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[9, 5, 6, 2, 3, 7, 11, 10, 14]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 4,
            "blocked": [
              0,
              1,
              4,
              8,
              12,
              13,
              15
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 9
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1111,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 13",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[1, 2, 5, 8, 7, 4, 3, 6, 9, 10]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 3,
            "rows": 4,
            "blocked": [
              0,
              11
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 10
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1112,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 14",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[3, 7, 6, 2, 1, 0, 4, 8, 9, 5]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 3,
            "blocked": [
              10,
              11
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 10
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1113,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 15",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[8, 4, 5, 9, 13, 14, 15, 11, 7, 6, 2, 1]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 4,
            "blocked": [
              0,
              3,
              10,
              12
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 12
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1114,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 16",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[11, 10, 9, 6, 3, 4, 1, 2]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 3,
            "rows": 4,
            "blocked": [
              0,
              5,
              7,
              8
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 8
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1115,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 17",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[7, 6, 10, 9, 8, 4, 0, 1, 5]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 3,
            "blocked": [
              2,
              3,
              11
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 9
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1116,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 18",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[7, 6, 5, 1, 0, 4, 8, 9, 10, 14]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 4,
            "blocked": [
              2,
              3,
              11,
              12,
              13,
              15
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 10
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1117,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 19",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[10, 11, 8, 7, 4, 1, 0, 3, 6, 9]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 3,
            "rows": 4,
            "blocked": [
              2,
              5
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 10
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1118,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 20",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[3, 7, 11, 10, 9, 8, 4, 5, 1, 2]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 3,
            "blocked": [
              0,
              6
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 10
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1119,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 21",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[10, 11, 15, 14, 13, 12, 8, 4]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 4,
            "blocked": [
              0,
              1,
              2,
              3,
              5,
              6,
              7,
              9
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 8
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1120,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 22",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[2, 1, 0, 3, 6, 7, 4, 5, 8]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 3,
            "rows": 4,
            "blocked": [
              9,
              10,
              11
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 9
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1121,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 23",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[11, 10, 9, 5, 6, 7, 3, 2, 1, 0]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 3,
            "blocked": [
              4,
              8
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 10
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1122,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 24",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[9, 5, 1, 0, 4, 8, 12, 13, 14, 15, 11]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 4,
            "rows": 4,
            "blocked": [
              2,
              3,
              6,
              7,
              10
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 11
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 1123,
    "focus": "cover paths",
    "title": "Cover Paths · Beginner 25",
    "format": "Reasoning puzzle",
    "tags": [
      "challenge:beginner"
    ],
    "challengeLevel": "beginner",
    "fixed": true,
    "estimatedMinutes": 5,
    "reviewStatus": "pending",
    "setSize": 3,
    "variations": [
      {
        "prompt": "Visit each open dot once with horizontal or vertical moves. Choose your own start and finish. Dark squares are blocked.",
        "hint": "A dot with only one neighbour must be an endpoint. Check these before choosing where to start.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "cover-path",
            "marks": 3,
            "answer": "[9, 6, 7, 8, 5, 2, 1, 4, 3, 0]",
            "explanation": "Start by examining dots with only one neighbour. Choose a route that leaves all remaining dots reachable; any complete valid route is accepted.",
            "solutionText": "See the completed board below.",
            "size": 3,
            "rows": 4,
            "blocked": [
              10,
              11
            ],
            "validation": {
              "method": "checked path witness",
              "openDots": 10
            }
          }
        ]
      }
    ]
  }
];
