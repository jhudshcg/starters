// Deterministic instances; see scripts/enrich-puzzles.py.
export default [
  {
    "slot": 100,
    "focus": "logic grids",
    "title": "Deployment rota",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 2 to list possible start-time pairs for Alex and Blair. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 1, 3, 2], [2, 1, 0, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Alex is not assigned Backup.",
              "Alex starts 1 hour before Blair.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Audit.",
              "Exactly one is true: Drew works on Support; Drew starts at 12:00.",
              "Exactly one is true: Blair starts at 10:00; Blair works on Audit.",
              "Drew is not assigned Audit.",
              "Exactly one is true: Blair starts at 10:00; Blair works on Backup."
            ],
            "rules": [
              [
                "ne",
                1,
                0,
                0,
                0
              ],
              [
                "diff",
                0,
                0,
                1,
                -1
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                1,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "ne",
                1,
                3,
                2,
                0
              ],
              [
                "either",
                0,
                1,
                1,
                [
                  1,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 3 to list possible start-time pairs for Drew and Casey. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 0, 3, 1], [1, 2, 3, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex starts at 11:00; Alex works on Backup.",
              "Exactly one is true: Drew works on Backup; Drew starts at 09:00.",
              "Drew starts earlier than Casey.",
              "Exactly one is true: Alex works on Audit; Alex starts at 11:00.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Support.",
              "Blair starts earlier than Drew."
            ],
            "rules": [
              [
                "either",
                0,
                0,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "before",
                0,
                3,
                2,
                0
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  3
                ]
              ],
              [
                "before",
                0,
                1,
                3,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 4 to list possible start-time pairs for Casey and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 3, 1, 2], [2, 3, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair works on Support; Blair starts at 09:00.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Deploy.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 11:00.",
              "Casey starts earlier than Drew.",
              "Alex is not assigned 10:00.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Audit.",
              "Alex is not assigned 12:00."
            ],
            "rules": [
              [
                "either",
                1,
                1,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "before",
                0,
                2,
                3,
                0
              ],
              [
                "ne",
                0,
                0,
                1,
                0
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "ne",
                0,
                0,
                3,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 2 to list possible start-time pairs for Drew and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 2, 1, 0], [1, 3, 2, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex works on Deploy; Alex starts at 11:00.",
              "Drew starts earlier than Alex.",
              "Alex starts 2 hours after Casey.",
              "Blair starts 1 hour before Alex.",
              "Exactly one is true: Casey starts at 11:00; Casey works on Audit.",
              "Exactly one is true: Blair works on Support; Blair starts at 10:00."
            ],
            "rules": [
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "before",
                0,
                3,
                0,
                0
              ],
              [
                "diff",
                0,
                0,
                2,
                2
              ],
              [
                "diff",
                0,
                1,
                0,
                -1
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  0,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 2 to list possible start-time pairs for Drew and Blair. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 0, 1, 2], [2, 0, 1, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew works on Deploy; Drew starts at 11:00.",
              "Drew starts 2 hours after Blair.",
              "Alex is not assigned 10:00.",
              "Exactly one is true: Alex starts at 10:00; Alex works on Audit.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Backup.",
              "Exactly one is true: Blair starts at 11:00; Blair works on Backup."
            ],
            "rules": [
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "diff",
                0,
                3,
                1,
                2
              ],
              [
                "ne",
                0,
                0,
                1,
                0
              ],
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 101,
    "focus": "logic grids",
    "title": "Support desk",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 5 to list possible start-time pairs for Blair and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 0, 3, 1], [3, 1, 2, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair starts at 12:00; Blair works on Deploy.",
              "Exactly one is true: Casey works on Backup; Casey starts at 12:00.",
              "Exactly one is true: Alex starts at 09:00; Alex works on Support.",
              "Exactly one is true: Casey starts at 11:00; Casey works on Audit.",
              "Blair starts 1 hour before Drew.",
              "Alex starts 1 hour after Drew."
            ],
            "rules": [
              [
                "either",
                0,
                1,
                3,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "diff",
                0,
                1,
                3,
                -1
              ],
              [
                "diff",
                0,
                0,
                3,
                1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 2 to list possible start-time pairs for Casey and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 3, 2, 0], [3, 1, 0, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey starts at 12:00; Casey works on Backup.",
              "Casey starts 2 hours after Drew.",
              "Exactly one is true: Casey starts at 09:00; Casey works on Backup.",
              "Alex starts 1 hour after Drew.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Audit.",
              "Exactly one is true: Alex starts at 10:00; Alex works on Deploy."
            ],
            "rules": [
              [
                "either",
                0,
                2,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "diff",
                0,
                2,
                3,
                2
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "diff",
                0,
                0,
                3,
                1
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 2 to list possible start-time pairs for Casey and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 3, 1, 0], [2, 3, 0, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey starts at 11:00; Casey works on Backup.",
              "Casey starts 1 hour after Drew.",
              "Exactly one is true: Alex starts at 11:00; Alex works on Support.",
              "Exactly one is true: Alex starts at 11:00; Alex works on Backup.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 12:00."
            ],
            "rules": [
              [
                "either",
                0,
                2,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "diff",
                0,
                2,
                3,
                1
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 3 to list possible start-time pairs for Casey and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 3, 2, 0], [1, 2, 0, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex starts at 10:00; Alex works on Support.",
              "Exactly one is true: Blair works on Backup; Blair starts at 12:00.",
              "Casey starts 1 hour after Alex.",
              "Exactly one is true: Casey works on Backup; Casey starts at 10:00.",
              "Exactly one is true: Alex works on Deploy; Alex starts at 11:00.",
              "Exactly one is true: Blair starts at 09:00; Blair works on Audit."
            ],
            "rules": [
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "diff",
                0,
                2,
                0,
                1
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                0,
                [
                  1,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 5 to list possible start-time pairs for Blair and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 3, 2, 0], [1, 3, 2, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Casey is not assigned 09:00.",
              "Exactly one is true: Drew works on Backup; Drew starts at 12:00.",
              "Exactly one is true: Alex starts at 09:00; Alex works on Deploy.",
              "Exactly one is true: Alex starts at 12:00; Alex works on Deploy.",
              "Blair starts 2 hours after Alex.",
              "Exactly one is true: Casey starts at 09:00; Casey works on Audit."
            ],
            "rules": [
              [
                "ne",
                0,
                2,
                0,
                0
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                0,
                3,
                [
                  1,
                  1
                ]
              ],
              [
                "diff",
                0,
                1,
                0,
                2
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  1,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 102,
    "focus": "logic grids",
    "title": "Device allocation",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Alex's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 2, 1, 3], [0, 1, 2, 3], [3, 1, 0, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex works on Support; Alex uses the desktop.",
              "Exactly one is true: Drew starts at 11:00; Drew uses the tablet.",
              "Exactly one is true: Casey uses the desktop; Casey starts at 10:00.",
              "Exactly one is true: Blair works on Audit; Blair uses the server.",
              "Casey is not assigned Deploy.",
              "Exactly one is true: Alex uses the server; Alex works on Backup.",
              "Exactly one is true: Alex starts at 09:00; Alex uses the laptop.",
              "Exactly one is true: Casey uses the laptop; Casey starts at 09:00.",
              "Exactly one is true: Drew uses the tablet; Drew works on Audit.",
              "Exactly one is true: Drew starts at 12:00; Drew works on Deploy."
            ],
            "rules": [
              [
                "either",
                1,
                0,
                3,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "ne",
                1,
                2,
                1,
                0
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                2,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                3,
                3,
                [
                  1,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 1 to list possible start-time pairs for Drew and Casey. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 0, 2, 1], [0, 3, 1, 2], [2, 1, 3, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Drew starts 1 hour before Casey.",
              "Exactly one is true: Alex uses the server; Alex works on Backup.",
              "Exactly one is true: Alex works on Audit; Alex uses the tablet.",
              "Exactly one is true: Drew works on Audit; Drew starts at 11:00.",
              "Exactly one is true: Drew uses the desktop; Drew starts at 10:00.",
              "Exactly one is true: Alex works on Deploy; Alex starts at 12:00.",
              "Exactly one is true: Blair uses the tablet; Blair works on Support.",
              "Exactly one is true: Blair starts at 11:00; Blair uses the server.",
              "Exactly one is true: Drew works on Audit; Drew uses the desktop."
            ],
            "rules": [
              [
                "diff",
                0,
                3,
                2,
                -1
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                3,
                2,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                2,
                3,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                2,
                [
                  2,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 8 to list possible start-time pairs for Blair and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 1, 3, 0], [2, 1, 3, 0], [3, 1, 2, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew uses the tablet; Drew starts at 09:00.",
              "Exactly one is true: Alex starts at 09:00; Alex uses the desktop.",
              "Exactly one is true: Casey works on Support; Casey uses the laptop.",
              "Exactly one is true: Drew uses the desktop; Drew starts at 09:00.",
              "Exactly one is true: Blair uses the laptop; Blair works on Deploy.",
              "Exactly one is true: Casey starts at 12:00; Casey works on Backup.",
              "Exactly one is true: Blair works on Support; Blair uses the server.",
              "Blair starts 1 hour after Drew.",
              "Exactly one is true: Alex works on Audit; Alex uses the server."
            ],
            "rules": [
              [
                "either",
                2,
                3,
                2,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  2,
                  1
                ]
              ],
              [
                "diff",
                0,
                1,
                3,
                1
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  2,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 4 to list possible start-time pairs for Alex and Blair. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 2, 3, 1], [2, 0, 3, 1], [1, 0, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair starts at 11:00; Blair works on Deploy.",
              "Exactly one is true: Casey works on Audit; Casey uses the tablet.",
              "Exactly one is true: Casey starts at 09:00; Casey uses the tablet.",
              "Alex starts earlier than Blair.",
              "Exactly one is true: Drew uses the server; Drew works on Deploy.",
              "Exactly one is true: Drew starts at 12:00; Drew uses the desktop.",
              "Exactly one is true: Blair works on Backup; Blair uses the desktop.",
              "Exactly one is true: Blair uses the laptop; Blair works on Support.",
              "Drew starts 1 hour before Blair."
            ],
            "rules": [
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  2,
                  2
                ]
              ],
              [
                "before",
                0,
                0,
                1,
                0
              ],
              [
                "either",
                2,
                3,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                3,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "diff",
                0,
                3,
                1,
                -1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 5 to list possible start-time pairs for Casey and Blair. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 1, 3, 0], [0, 3, 2, 1], [2, 3, 0, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex starts at 10:00; Alex works on Backup.",
              "Exactly one is true: Casey starts at 11:00; Casey uses the laptop.",
              "Exactly one is true: Drew uses the desktop; Drew starts at 09:00.",
              "Exactly one is true: Drew starts at 09:00; Drew works on Backup.",
              "Casey starts 2 hours after Blair.",
              "Exactly one is true: Alex uses the tablet; Alex works on Audit.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Deploy.",
              "Exactly one is true: Casey starts at 11:00; Casey works on Audit."
            ],
            "rules": [
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "diff",
                0,
                2,
                1,
                2
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  1,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 103,
    "focus": "logic grids",
    "title": "Release team",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 9 to list possible start-time pairs for Blair and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 1, 0, 3], [1, 3, 0, 2], [0, 2, 1, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair works on Deploy; Blair uses the tablet.",
              "Exactly one is true: Drew uses the laptop; Drew works on Audit.",
              "Exactly one is true: Alex uses the laptop; Alex starts at 12:00.",
              "Exactly one is true: Drew starts at 11:00; Drew uses the desktop.",
              "Blair is not assigned 09:00.",
              "Exactly one is true: Casey works on Support; Casey starts at 09:00.",
              "Exactly one is true: Casey starts at 12:00; Casey works on Backup.",
              "Exactly one is true: Blair works on Audit; Blair uses the tablet.",
              "Blair starts 2 hours before Drew."
            ],
            "rules": [
              [
                "either",
                1,
                1,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                2,
                3,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                2,
                0,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "ne",
                0,
                1,
                0,
                0
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "diff",
                0,
                1,
                3,
                -2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 2 to list possible start-time pairs for Blair and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 2, 1, 0], [2, 0, 3, 1], [1, 3, 0, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex uses the server; Alex starts at 09:00.",
              "Blair starts 1 hour before Alex.",
              "Exactly one is true: Blair uses the laptop; Blair works on Backup.",
              "Drew starts 3 hours before Alex.",
              "Exactly one is true: Drew starts at 10:00; Drew works on Deploy.",
              "Exactly one is true: Casey uses the server; Casey works on Support.",
              "Exactly one is true: Casey uses the laptop; Casey starts at 09:00.",
              "Exactly one is true: Drew uses the tablet; Drew works on Support."
            ],
            "rules": [
              [
                "either",
                2,
                0,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "diff",
                0,
                1,
                0,
                -1
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "diff",
                0,
                3,
                0,
                -3
              ],
              [
                "either",
                0,
                3,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                2,
                2,
                1,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                2,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  1,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Drew's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 0, 3, 2], [0, 3, 2, 1], [2, 0, 3, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew works on Deploy; Drew uses the laptop.",
              "Exactly one is true: Casey uses the desktop; Casey starts at 10:00.",
              "Exactly one is true: Drew works on Backup; Drew uses the server.",
              "Exactly one is true: Casey works on Audit; Casey uses the tablet.",
              "Exactly one is true: Alex starts at 09:00; Alex works on Backup.",
              "Exactly one is true: Alex works on Deploy; Alex uses the tablet.",
              "Exactly one is true: Blair starts at 09:00; Blair uses the desktop.",
              "Exactly one is true: Alex starts at 10:00; Alex works on Audit.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Audit."
            ],
            "rules": [
              [
                "either",
                1,
                3,
                1,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Blair's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 0, 1, 3], [0, 2, 1, 3], [1, 0, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair works on Support; Blair uses the laptop.",
              "Exactly one is true: Drew works on Support; Drew starts at 09:00.",
              "Exactly one is true: Blair works on Support; Blair starts at 09:00.",
              "Exactly one is true: Drew starts at 09:00; Drew uses the desktop.",
              "Exactly one is true: Casey uses the desktop; Casey starts at 10:00.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 11:00.",
              "Exactly one is true: Casey starts at 09:00; Casey uses the tablet.",
              "Exactly one is true: Alex uses the server; Alex works on Audit.",
              "Exactly one is true: Drew starts at 12:00; Drew works on Deploy."
            ],
            "rules": [
              [
                "either",
                1,
                1,
                3,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                3,
                3,
                [
                  1,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 6 to list possible start-time pairs for Alex and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 0, 2, 1], [0, 1, 3, 2], [0, 1, 3, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey uses the desktop; Casey starts at 12:00.",
              "Exactly one is true: Drew uses the tablet; Drew works on Deploy.",
              "Exactly one is true: Blair starts at 11:00; Blair uses the server.",
              "Exactly one is true: Casey starts at 09:00; Casey works on Support.",
              "Exactly one is true: Alex works on Deploy; Alex starts at 12:00.",
              "Alex starts 2 hours after Drew.",
              "Blair starts 1 hour before Drew.",
              "Exactly one is true: Drew starts at 09:00; Drew works on Audit."
            ],
            "rules": [
              [
                "either",
                2,
                2,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  3
                ]
              ],
              [
                "diff",
                0,
                0,
                3,
                2
              ],
              [
                "diff",
                0,
                1,
                3,
                -1
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  1,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 104,
    "focus": "logic grids",
    "title": "Incident response",
    "format": "Reasoning puzzle",
    "tags": [],
    "setSize": 1,
    "estimatedMinutes": 10,
    "variations": [
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 2 separately. When one is true, the other must be false; follow the effect on Alex's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 0, 3, 1], [1, 0, 3, 2], [0, 3, 2, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Blair is not assigned 10:00.",
              "Exactly one is true: Alex uses the tablet; Alex starts at 11:00.",
              "Exactly one is true: Casey starts at 12:00; Casey works on Deploy.",
              "Exactly one is true: Blair works on Backup; Blair starts at 11:00.",
              "Exactly one is true: Casey uses the laptop; Casey works on Support.",
              "Exactly one is true: Drew works on Audit; Drew starts at 09:00.",
              "Exactly one is true: Alex works on Backup; Alex uses the laptop.",
              "Exactly one is true: Blair works on Backup; Blair uses the tablet.",
              "Exactly one is true: Drew uses the server; Drew starts at 11:00."
            ],
            "rules": [
              [
                "ne",
                0,
                1,
                1,
                0
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                2,
                2,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                2,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                2,
                3,
                1,
                [
                  0,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Blair's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 3, 2, 1], [3, 0, 2, 1], [2, 3, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair starts at 09:00; Blair uses the desktop.",
              "Exactly one is true: Blair works on Support; Blair starts at 12:00.",
              "Exactly one is true: Casey works on Backup; Casey starts at 11:00.",
              "Exactly one is true: Blair works on Backup; Blair starts at 09:00.",
              "Exactly one is true: Alex uses the server; Alex works on Support.",
              "Exactly one is true: Alex starts at 09:00; Alex uses the desktop.",
              "Exactly one is true: Alex works on Deploy; Alex uses the tablet.",
              "Exactly one is true: Casey works on Audit; Casey starts at 10:00.",
              "Exactly one is true: Casey works on Deploy; Casey uses the server."
            ],
            "rules": [
              [
                "either",
                0,
                1,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  2,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 1 to list possible start-time pairs for Drew and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 0, 1, 3], [0, 3, 2, 1], [1, 2, 0, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Drew starts 1 hour after Alex.",
              "Exactly one is true: Drew uses the tablet; Drew starts at 12:00.",
              "Exactly one is true: Drew uses the desktop; Drew works on Backup.",
              "Alex is not assigned Laptop.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Support.",
              "Exactly one is true: Blair works on Support; Blair uses the desktop.",
              "Exactly one is true: Drew uses the tablet; Drew works on Deploy.",
              "Exactly one is true: Blair works on Deploy; Blair uses the tablet.",
              "Exactly one is true: Casey uses the server; Casey works on Audit."
            ],
            "rules": [
              [
                "diff",
                0,
                3,
                0,
                1
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                2,
                3,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "ne",
                2,
                0,
                0,
                0
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                2,
                2,
                1,
                [
                  1,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Casey's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 2, 1, 3], [1, 0, 2, 3], [2, 0, 1, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey works on Support; Casey starts at 10:00.",
              "Exactly one is true: Alex starts at 11:00; Alex uses the tablet.",
              "Exactly one is true: Casey works on Audit; Casey uses the laptop.",
              "Exactly one is true: Alex uses the tablet; Alex starts at 12:00.",
              "Exactly one is true: Drew works on Support; Drew uses the laptop.",
              "Exactly one is true: Casey starts at 09:00; Casey uses the server.",
              "Exactly one is true: Alex works on Deploy; Alex starts at 11:00.",
              "Exactly one is true: Blair uses the laptop; Blair starts at 12:00.",
              "Exactly one is true: Drew starts at 09:00; Drew uses the desktop."
            ],
            "rules": [
              [
                "either",
                1,
                2,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  2,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      },
      {
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 3 to list possible start-time pairs for Drew and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 1, 0, 2], [1, 0, 2, 3], [0, 2, 1, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex works on Backup; Alex uses the laptop.",
              "Exactly one is true: Alex works on Deploy; Alex starts at 11:00.",
              "Drew starts 1 hour before Alex.",
              "Exactly one is true: Alex works on Audit; Alex starts at 12:00.",
              "Exactly one is true: Drew uses the server; Drew works on Support.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Audit.",
              "Exactly one is true: Blair uses the laptop; Blair works on Backup.",
              "Blair is not assigned Server.",
              "Exactly one is true: Drew uses the tablet; Drew works on Support."
            ],
            "rules": [
              [
                "either",
                1,
                0,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "diff",
                0,
                3,
                0,
                -1
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                2,
                3,
                1,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "ne",
                2,
                1,
                1,
                0
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  1,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 300,
    "focus": "logic grids",
    "title": "Logic Grids 6",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 1 to list possible start-time pairs for Drew and Casey. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 3, 1, 2], [2, 1, 0, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Drew starts 1 hour after Casey.",
              "Drew starts earlier than Blair.",
              "Exactly one is true: Drew starts at 09:00; Drew works on Support.",
              "Exactly one is true: Alex works on Audit; Alex starts at 10:00.",
              "Exactly one is true: Alex works on Deploy; Alex starts at 09:00.",
              "Casey is not assigned Deploy."
            ],
            "rules": [
              [
                "diff",
                0,
                3,
                2,
                1
              ],
              [
                "before",
                0,
                3,
                1,
                0
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "ne",
                1,
                2,
                1,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 301,
    "focus": "logic grids",
    "title": "Logic Grids 7",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 2 to list possible start-time pairs for Blair and Casey. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 0, 2, 3], [2, 1, 0, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair starts at 09:00; Blair works on Support.",
              "Blair starts 2 hours before Casey.",
              "Exactly one is true: Alex works on Backup; Alex starts at 10:00.",
              "Exactly one is true: Alex starts at 09:00; Alex works on Audit.",
              "Exactly one is true: Casey works on Backup; Casey starts at 09:00."
            ],
            "rules": [
              [
                "either",
                0,
                1,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "diff",
                0,
                1,
                2,
                -2
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  0,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 302,
    "focus": "logic grids",
    "title": "Logic Grids 8",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 2 to list possible start-time pairs for Drew and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 2, 1, 0], [2, 1, 3, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex starts at 10:00; Alex works on Audit.",
              "Drew starts 3 hours before Alex.",
              "Alex starts 1 hour after Blair.",
              "Exactly one is true: Blair starts at 12:00; Blair works on Deploy.",
              "Exactly one is true: Drew starts at 09:00; Drew works on Support."
            ],
            "rules": [
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "diff",
                0,
                3,
                0,
                -3
              ],
              [
                "diff",
                0,
                0,
                1,
                1
              ],
              [
                "either",
                0,
                1,
                3,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  1,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 303,
    "focus": "logic grids",
    "title": "Logic Grids 9",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 1 to list possible start-time pairs for Drew and Blair. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 3, 1, 0], [2, 0, 3, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Drew starts earlier than Blair.",
              "Exactly one is true: Blair works on Backup; Blair starts at 11:00.",
              "Exactly one is true: Alex works on Backup; Alex starts at 11:00.",
              "Blair starts 2 hours after Casey.",
              "Exactly one is true: Casey works on Support; Casey starts at 09:00.",
              "Exactly one is true: Alex works on Audit; Alex starts at 10:00."
            ],
            "rules": [
              [
                "before",
                0,
                3,
                1,
                0
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "diff",
                0,
                1,
                2,
                2
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  0,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 304,
    "focus": "logic grids",
    "title": "Logic Grids 10",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 5 to list possible start-time pairs for Alex and Casey. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 2, 1, 0], [0, 3, 1, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey starts at 12:00; Casey works on Deploy.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Audit.",
              "Exactly one is true: Blair starts at 11:00; Blair works on Deploy.",
              "Exactly one is true: Alex starts at 09:00; Alex works on Backup.",
              "Alex starts 2 hours after Casey."
            ],
            "rules": [
              [
                "either",
                0,
                2,
                3,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "diff",
                0,
                0,
                2,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 305,
    "focus": "logic grids",
    "title": "Logic Grids 11",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 5 to list possible start-time pairs for Casey and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 1, 3, 0], [2, 1, 0, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex works on Audit; Alex starts at 10:00.",
              "Exactly one is true: Blair works on Deploy; Blair starts at 12:00.",
              "Exactly one is true: Blair starts at 10:00; Blair works on Backup.",
              "Exactly one is true: Casey works on Support; Casey starts at 12:00.",
              "Casey starts 3 hours after Drew."
            ],
            "rules": [
              [
                "either",
                1,
                0,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                1,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "diff",
                0,
                2,
                3,
                3
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 306,
    "focus": "logic grids",
    "title": "Logic Grids 12",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Blair's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 1, 0, 3], [0, 3, 1, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair works on Deploy; Blair starts at 10:00.",
              "Exactly one is true: Casey starts at 09:00; Casey works on Audit.",
              "Exactly one is true: Alex starts at 11:00; Alex works on Audit.",
              "Drew is not assigned 11:00.",
              "Exactly one is true: Blair works on Support; Blair starts at 12:00.",
              "Exactly one is true: Blair works on Audit; Blair starts at 10:00.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Deploy."
            ],
            "rules": [
              [
                "either",
                1,
                1,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "ne",
                0,
                3,
                2,
                0
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 307,
    "focus": "logic grids",
    "title": "Logic Grids 13",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 1 to list possible start-time pairs for Casey and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 2, 1, 3], [1, 2, 0, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Casey starts 1 hour after Alex.",
              "Exactly one is true: Drew works on Support; Drew starts at 09:00.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 10:00.",
              "Exactly one is true: Casey works on Audit; Casey starts at 10:00.",
              "Exactly one is true: Blair starts at 11:00; Blair works on Support.",
              "Blair is not assigned Deploy."
            ],
            "rules": [
              [
                "diff",
                0,
                2,
                0,
                1
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "ne",
                1,
                1,
                1,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 308,
    "focus": "logic grids",
    "title": "Logic Grids 14",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 1 to list possible start-time pairs for Casey and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 2, 3, 0], [0, 1, 3, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Casey starts 3 hours after Drew.",
              "Exactly one is true: Alex starts at 10:00; Alex works on Support.",
              "Exactly one is true: Alex starts at 12:00; Alex works on Backup.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Support.",
              "Exactly one is true: Blair works on Deploy; Blair starts at 12:00."
            ],
            "rules": [
              [
                "diff",
                0,
                2,
                3,
                3
              ],
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  0,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 309,
    "focus": "logic grids",
    "title": "Logic Grids 15",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 2 to list possible start-time pairs for Alex and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 2, 1, 3], [0, 3, 1, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Blair is not assigned 10:00.",
              "Alex starts 3 hours before Drew.",
              "Exactly one is true: Drew starts at 09:00; Drew works on Audit.",
              "Blair is not assigned Deploy.",
              "Exactly one is true: Alex works on Backup; Alex starts at 11:00."
            ],
            "rules": [
              [
                "ne",
                0,
                1,
                1,
                0
              ],
              [
                "diff",
                0,
                0,
                3,
                -3
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "ne",
                1,
                1,
                1,
                0
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 310,
    "focus": "logic grids",
    "title": "Logic Grids 16",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 6 to list possible start-time pairs for Blair and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 1, 2, 0], [0, 3, 1, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey works on Deploy; Casey starts at 09:00.",
              "Exactly one is true: Casey starts at 11:00; Casey works on Audit.",
              "Exactly one is true: Alex works on Backup; Alex starts at 09:00.",
              "Exactly one is true: Drew starts at 12:00; Drew works on Audit.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 10:00.",
              "Blair starts earlier than Alex.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 09:00."
            ],
            "rules": [
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                3,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "before",
                0,
                1,
                0,
                0
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 311,
    "focus": "logic grids",
    "title": "Logic Grids 17",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 1 to list possible start-time pairs for Alex and Casey. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 1, 0, 2], [3, 0, 2, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Alex starts 3 hours after Casey.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Audit.",
              "Alex is not assigned Deploy.",
              "Exactly one is true: Casey works on Audit; Casey starts at 12:00.",
              "Exactly one is true: Blair works on Backup; Blair starts at 12:00."
            ],
            "rules": [
              [
                "diff",
                0,
                0,
                2,
                3
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "ne",
                1,
                0,
                1,
                0
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 312,
    "focus": "logic grids",
    "title": "Logic Grids 18",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 5 to list possible start-time pairs for Casey and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 0, 2, 1], [2, 0, 1, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex works on Backup; Alex starts at 12:00.",
              "Casey is not assigned 10:00.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Deploy.",
              "Alex is not assigned Backup.",
              "Casey starts 1 hour after Drew.",
              "Exactly one is true: Drew works on Support; Drew starts at 12:00."
            ],
            "rules": [
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "ne",
                0,
                2,
                1,
                0
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "ne",
                1,
                0,
                0,
                0
              ],
              [
                "diff",
                0,
                2,
                3,
                1
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  0,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 313,
    "focus": "logic grids",
    "title": "Logic Grids 19",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 1 to list possible start-time pairs for Casey and Blair. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 3, 2, 1], [2, 1, 3, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Casey starts 1 hour before Blair.",
              "Exactly one is true: Drew works on Support; Drew starts at 10:00.",
              "Exactly one is true: Casey works on Support; Casey starts at 12:00.",
              "Exactly one is true: Alex starts at 10:00; Alex works on Audit.",
              "Exactly one is true: Blair starts at 12:00; Blair works on Backup."
            ],
            "rules": [
              [
                "diff",
                0,
                2,
                1,
                -1
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                3,
                [
                  1,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 314,
    "focus": "logic grids",
    "title": "Logic Grids 20",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 1 to list possible start-time pairs for Drew and Casey. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 1, 2, 3], [0, 1, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Drew starts 1 hour after Casey.",
              "Casey is not assigned 10:00.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 12:00.",
              "Exactly one is true: Alex starts at 09:00; Alex works on Deploy.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Support.",
              "Exactly one is true: Blair starts at 10:00; Blair works on Audit.",
              "Exactly one is true: Alex works on Backup; Alex starts at 12:00."
            ],
            "rules": [
              [
                "diff",
                0,
                3,
                2,
                1
              ],
              [
                "ne",
                0,
                2,
                1,
                0
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                1,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 315,
    "focus": "logic grids",
    "title": "Logic Grids 21",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 2 separately. When one is true, the other must be false; follow the effect on Alex's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 0, 3, 2], [0, 3, 2, 1], [0, 2, 1, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Casey is not assigned Support.",
              "Exactly one is true: Alex starts at 10:00; Alex uses the server.",
              "Exactly one is true: Alex uses the server; Alex works on Backup.",
              "Exactly one is true: Casey uses the server; Casey starts at 10:00.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 10:00.",
              "Exactly one is true: Casey starts at 12:00; Casey works on Support.",
              "Exactly one is true: Blair uses the tablet; Blair starts at 11:00.",
              "Exactly one is true: Drew works on Backup; Drew uses the desktop.",
              "Exactly one is true: Blair works on Deploy; Blair starts at 09:00.",
              "Alex is assigned Backup."
            ],
            "rules": [
              [
                "ne",
                1,
                2,
                3,
                0
              ],
              [
                "either",
                0,
                0,
                1,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                2,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                2,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "eq",
                1,
                0,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 316,
    "focus": "logic grids",
    "title": "Logic Grids 22",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 4 to list possible start-time pairs for Casey and Blair. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 3, 0, 1], [2, 0, 3, 1], [0, 1, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex works on Audit; Alex uses the server.",
              "Exactly one is true: Casey works on Support; Casey starts at 12:00.",
              "Exactly one is true: Casey uses the desktop; Casey works on Support.",
              "Casey starts 3 hours before Blair.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 09:00.",
              "Exactly one is true: Blair uses the server; Blair works on Support.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 11:00.",
              "Exactly one is true: Alex uses the laptop; Alex starts at 12:00.",
              "Alex is assigned Audit."
            ],
            "rules": [
              [
                "either",
                1,
                0,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  1,
                  3
                ]
              ],
              [
                "diff",
                0,
                2,
                1,
                -3
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                1,
                1,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                2,
                0,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "eq",
                1,
                0,
                2,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 317,
    "focus": "logic grids",
    "title": "Logic Grids 23",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 8 to list possible start-time pairs for Alex and Blair. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 1, 0, 3], [0, 3, 2, 1], [1, 3, 2, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey works on Audit; Casey uses the laptop.",
              "Exactly one is true: Casey starts at 09:00; Casey works on Support.",
              "Exactly one is true: Casey uses the tablet; Casey starts at 10:00.",
              "Exactly one is true: Blair starts at 11:00; Blair uses the desktop.",
              "Exactly one is true: Alex starts at 11:00; Alex uses the laptop.",
              "Alex is not assigned Deploy.",
              "Exactly one is true: Alex works on Backup; Alex uses the laptop.",
              "Alex starts 1 hour after Blair.",
              "Exactly one is true: Drew works on Support; Drew uses the laptop.",
              "Alex is assigned Backup."
            ],
            "rules": [
              [
                "either",
                1,
                2,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                2,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "ne",
                1,
                0,
                1,
                0
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "diff",
                0,
                0,
                1,
                1
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  2,
                  0
                ]
              ],
              [
                "eq",
                1,
                0,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 318,
    "focus": "logic grids",
    "title": "Logic Grids 24",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 9 to list possible start-time pairs for Alex and Casey. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 2, 1, 0], [0, 2, 1, 3], [1, 0, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew uses the tablet; Drew works on Support.",
              "Exactly one is true: Alex uses the server; Alex starts at 11:00.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 09:00.",
              "Exactly one is true: Drew starts at 09:00; Drew uses the laptop.",
              "Exactly one is true: Drew starts at 09:00; Drew uses the server.",
              "Exactly one is true: Alex works on Backup; Alex starts at 11:00.",
              "Exactly one is true: Casey uses the desktop; Casey starts at 10:00.",
              "Exactly one is true: Blair starts at 12:00; Blair uses the laptop.",
              "Alex starts 2 hours after Casey.",
              "Alex is assigned Backup."
            ],
            "rules": [
              [
                "either",
                2,
                3,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                1,
                3,
                [
                  2,
                  0
                ]
              ],
              [
                "diff",
                0,
                0,
                2,
                2
              ],
              [
                "eq",
                1,
                0,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 319,
    "focus": "logic grids",
    "title": "Logic Grids 25",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Drew's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 1, 0, 2], [0, 1, 3, 2], [1, 0, 3, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew starts at 11:00; Drew works on Deploy.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Support.",
              "Exactly one is true: Blair uses the desktop; Blair starts at 10:00.",
              "Exactly one is true: Alex uses the server; Alex works on Deploy.",
              "Exactly one is true: Drew uses the tablet; Drew works on Backup.",
              "Exactly one is true: Blair works on Backup; Blair uses the laptop.",
              "Exactly one is true: Blair starts at 11:00; Blair works on Deploy.",
              "Exactly one is true: Alex works on Support; Alex starts at 12:00.",
              "Exactly one is true: Alex starts at 12:00; Alex works on Audit.",
              "Alex is assigned Backup."
            ],
            "rules": [
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                3,
                [
                  1,
                  2
                ]
              ],
              [
                "eq",
                1,
                0,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 320,
    "focus": "logic grids",
    "title": "Logic Grids 26",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Drew's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 2, 1, 3], [0, 1, 2, 3], [3, 2, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew starts at 12:00; Drew works on Deploy.",
              "Exactly one is true: Drew starts at 09:00; Drew works on Support.",
              "Exactly one is true: Blair starts at 11:00; Blair uses the server.",
              "Exactly one is true: Drew starts at 12:00; Drew uses the server.",
              "Exactly one is true: Casey works on Audit; Casey starts at 11:00.",
              "Exactly one is true: Alex works on Support; Alex uses the desktop.",
              "Exactly one is true: Casey works on Backup; Casey starts at 10:00.",
              "Exactly one is true: Blair uses the server; Blair works on Deploy.",
              "Blair is not assigned 09:00.",
              "Casey is not assigned 11:00.",
              "Blair is not assigned Laptop.",
              "Alex is assigned Backup."
            ],
            "rules": [
              [
                "either",
                0,
                3,
                3,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                3,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                0,
                3,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                1,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "ne",
                0,
                1,
                0,
                0
              ],
              [
                "ne",
                0,
                2,
                2,
                0
              ],
              [
                "ne",
                2,
                1,
                0,
                0
              ],
              [
                "eq",
                1,
                0,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 321,
    "focus": "logic grids",
    "title": "Logic Grids 27",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Drew's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 0, 2, 3], [3, 0, 1, 2], [0, 1, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew starts at 09:00; Drew works on Audit.",
              "Exactly one is true: Alex uses the laptop; Alex works on Audit.",
              "Exactly one is true: Drew uses the desktop; Drew starts at 09:00.",
              "Exactly one is true: Blair starts at 09:00; Blair uses the desktop.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 09:00.",
              "Exactly one is true: Alex works on Support; Alex starts at 12:00.",
              "Exactly one is true: Drew works on Audit; Drew starts at 10:00.",
              "Exactly one is true: Casey starts at 11:00; Casey works on Audit.",
              "Exactly one is true: Casey uses the tablet; Casey works on Audit.",
              "Alex is assigned Support."
            ],
            "rules": [
              [
                "either",
                0,
                3,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                2,
                0,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                2,
                3,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                1,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                2,
                2,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "eq",
                1,
                0,
                3,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 322,
    "focus": "logic grids",
    "title": "Logic Grids 28",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 1 to list possible start-time pairs for Drew and Blair. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 0, 3, 2], [0, 2, 3, 1], [3, 2, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Drew starts 2 hours after Blair.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 10:00.",
              "Exactly one is true: Alex works on Backup; Alex uses the laptop.",
              "Exactly one is true: Alex works on Support; Alex starts at 10:00.",
              "Exactly one is true: Drew uses the laptop; Drew starts at 09:00.",
              "Exactly one is true: Casey starts at 12:00; Casey uses the desktop.",
              "Exactly one is true: Blair uses the tablet; Blair starts at 10:00.",
              "Exactly one is true: Blair uses the desktop; Blair works on Audit.",
              "Alex is assigned Backup."
            ],
            "rules": [
              [
                "diff",
                0,
                3,
                1,
                2
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                3,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                1,
                3,
                [
                  1,
                  2
                ]
              ],
              [
                "eq",
                1,
                0,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 323,
    "focus": "logic grids",
    "title": "Logic Grids 29",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Drew's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 0, 1, 2], [0, 1, 3, 2], [0, 1, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew works on Backup; Drew starts at 11:00.",
              "Exactly one is true: Casey starts at 10:00; Casey uses the server.",
              "Exactly one is true: Blair uses the laptop; Blair starts at 09:00.",
              "Exactly one is true: Drew uses the server; Drew works on Audit.",
              "Exactly one is true: Alex uses the tablet; Alex starts at 12:00.",
              "Exactly one is true: Casey works on Support; Casey uses the laptop.",
              "Exactly one is true: Casey uses the tablet; Casey works on Deploy.",
              "Exactly one is true: Drew works on Support; Drew uses the desktop.",
              "Exactly one is true: Blair works on Deploy; Blair uses the desktop.",
              "Alex is assigned Backup."
            ],
            "rules": [
              [
                "either",
                1,
                3,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                2,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  2,
                  3
                ]
              ],
              [
                "eq",
                1,
                0,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 324,
    "focus": "logic grids",
    "title": "Logic Grids 30",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 1 to list possible start-time pairs for Casey and Blair. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 3, 2, 1], [3, 1, 2, 0], [0, 1, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Casey starts 1 hour before Blair.",
              "Exactly one is true: Casey works on Audit; Casey starts at 09:00.",
              "Exactly one is true: Blair uses the server; Blair starts at 10:00.",
              "Casey starts 2 hours after Alex.",
              "Exactly one is true: Alex starts at 11:00; Alex works on Support.",
              "Exactly one is true: Drew starts at 09:00; Drew works on Backup.",
              "Exactly one is true: Drew starts at 11:00; Drew uses the desktop.",
              "Exactly one is true: Casey uses the tablet; Casey starts at 12:00.",
              "Alex is assigned Support."
            ],
            "rules": [
              [
                "diff",
                0,
                2,
                1,
                -1
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                1,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "diff",
                0,
                2,
                0,
                2
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                2,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "eq",
                1,
                0,
                3,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 325,
    "focus": "logic grids",
    "title": "Logic Grids 31",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Casey's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 0, 1, 3], [3, 2, 1, 0], [1, 2, 0, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey works on Deploy; Casey starts at 12:00.",
              "Exactly one is true: Alex works on Support; Alex starts at 09:00.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 12:00.",
              "Exactly one is true: Blair starts at 09:00; Blair works on Backup.",
              "Exactly one is true: Alex uses the server; Alex starts at 10:00.",
              "Exactly one is true: Drew works on Support; Drew uses the desktop.",
              "Exactly one is true: Casey works on Backup; Casey uses the laptop.",
              "Exactly one is true: Drew works on Deploy; Drew uses the desktop.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Backup.",
              "Alex is assigned Support."
            ],
            "rules": [
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                0,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                1,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "eq",
                1,
                0,
                3,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 326,
    "focus": "logic grids",
    "title": "Logic Grids 32",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 4 to list possible start-time pairs for Alex and Blair. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 3, 1, 2], [3, 1, 0, 2], [1, 2, 3, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey starts at 11:00; Casey works on Backup.",
              "Exactly one is true: Casey uses the desktop; Casey starts at 12:00.",
              "Exactly one is true: Blair starts at 10:00; Blair works on Deploy.",
              "Alex starts 3 hours before Blair.",
              "Exactly one is true: Casey starts at 09:00; Casey works on Backup.",
              "Exactly one is true: Alex works on Support; Alex uses the tablet.",
              "Exactly one is true: Alex works on Audit; Alex uses the server.",
              "Exactly one is true: Blair starts at 11:00; Blair uses the tablet.",
              "Alex is assigned Support."
            ],
            "rules": [
              [
                "either",
                0,
                2,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                1,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "diff",
                0,
                0,
                1,
                -3
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                3,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "eq",
                1,
                0,
                3,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 327,
    "focus": "logic grids",
    "title": "Logic Grids 33",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 6 to list possible start-time pairs for Blair and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 0, 3, 1], [1, 0, 3, 2], [0, 2, 1, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair starts at 11:00; Blair works on Backup.",
              "Exactly one is true: Drew uses the laptop; Drew works on Audit.",
              "Exactly one is true: Alex starts at 10:00; Alex works on Deploy.",
              "Exactly one is true: Drew works on Backup; Drew starts at 10:00.",
              "Exactly one is true: Alex uses the server; Alex works on Deploy.",
              "Blair starts 1 hour before Drew.",
              "Exactly one is true: Drew starts at 11:00; Drew uses the desktop.",
              "Exactly one is true: Alex starts at 12:00; Alex uses the laptop.",
              "Exactly one is true: Blair uses the tablet; Blair starts at 10:00.",
              "Alex is assigned Deploy."
            ],
            "rules": [
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "diff",
                0,
                1,
                3,
                -1
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                3,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                1,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "eq",
                1,
                0,
                1,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 328,
    "focus": "logic grids",
    "title": "Logic Grids 34",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 9 to list possible start-time pairs for Casey and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 0, 1, 2], [2, 1, 3, 0], [0, 3, 2, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew works on Backup; Drew uses the desktop.",
              "Exactly one is true: Blair works on Deploy; Blair uses the server.",
              "Exactly one is true: Casey starts at 12:00; Casey uses the tablet.",
              "Exactly one is true: Casey works on Support; Casey uses the desktop.",
              "Exactly one is true: Blair uses the laptop; Blair starts at 09:00.",
              "Blair is not assigned Laptop.",
              "Exactly one is true: Drew works on Backup; Drew uses the laptop.",
              "Exactly one is true: Drew starts at 11:00; Drew uses the laptop.",
              "Casey starts 1 hour before Drew.",
              "Alex is assigned Audit."
            ],
            "rules": [
              [
                "either",
                1,
                3,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "ne",
                2,
                1,
                0,
                0
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "diff",
                0,
                2,
                3,
                -1
              ],
              [
                "eq",
                1,
                0,
                2,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 329,
    "focus": "logic grids",
    "title": "Logic Grids 35",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 4 to list possible start-time pairs for Casey and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 3, 0, 2], [0, 3, 2, 1], [3, 1, 0, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex starts at 11:00; Alex works on Backup.",
              "Exactly one is true: Drew starts at 12:00; Drew uses the tablet.",
              "Exactly one is true: Blair starts at 12:00; Blair works on Audit.",
              "Casey starts 2 hours before Drew.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Support.",
              "Exactly one is true: Blair starts at 12:00; Blair works on Backup.",
              "Exactly one is true: Casey uses the laptop; Casey works on Support.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Audit.",
              "Exactly one is true: Blair uses the desktop; Blair works on Support.",
              "Alex is assigned Backup."
            ],
            "rules": [
              [
                "either",
                0,
                0,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                3,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                3,
                [
                  1,
                  2
                ]
              ],
              [
                "diff",
                0,
                2,
                3,
                -2
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                1,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                2,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                2,
                1,
                3,
                [
                  1,
                  3
                ]
              ],
              [
                "eq",
                1,
                0,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 330,
    "focus": "logic grids",
    "title": "Logic Grids 36",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Alex's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 0, 1, 2], [3, 1, 0, 2], [0, 3, 2, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex works on Support; Alex starts at 09:00.",
              "Exactly one is true: Blair starts at 09:00; Blair works on Backup.",
              "Exactly one is true: Casey uses the tablet; Casey works on Support.",
              "Exactly one is true: Alex uses the laptop; Alex starts at 11:00.",
              "Exactly one is true: Drew works on Support; Drew uses the server.",
              "Exactly one is true: Drew works on Audit; Drew starts at 10:00.",
              "Exactly one is true: Alex starts at 12:00; Alex uses the server.",
              "Exactly one is true: Casey works on Support; Casey starts at 10:00.",
              "Exactly one is true: Drew uses the desktop; Drew starts at 11:00."
            ],
            "rules": [
              [
                "either",
                1,
                0,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                1,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                2,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                0,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                0,
                3,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                3,
                3,
                [
                  0,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 331,
    "focus": "logic grids",
    "title": "Logic Grids 37",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Alex's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 0, 1, 3], [0, 1, 2, 3], [2, 1, 0, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex starts at 11:00; Alex uses the desktop.",
              "Exactly one is true: Drew works on Backup; Drew starts at 12:00.",
              "Exactly one is true: Drew works on Support; Drew uses the tablet.",
              "Exactly one is true: Casey uses the desktop; Casey starts at 10:00.",
              "Casey is not assigned 09:00.",
              "Exactly one is true: Alex starts at 10:00; Alex works on Backup.",
              "Exactly one is true: Alex uses the tablet; Alex works on Support.",
              "Exactly one is true: Blair works on Support; Blair uses the server.",
              "Exactly one is true: Blair works on Deploy; Blair uses the laptop."
            ],
            "rules": [
              [
                "either",
                0,
                0,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "ne",
                0,
                2,
                0,
                0
              ],
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  2,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 332,
    "focus": "logic grids",
    "title": "Logic Grids 38",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 2 to list possible start-time pairs for Casey and Blair. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 3, 1, 0], [0, 1, 3, 2], [2, 0, 3, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex works on Backup; Alex starts at 09:00.",
              "Casey starts earlier than Blair.",
              "Casey is not assigned Audit.",
              "Exactly one is true: Blair works on Support; Blair starts at 12:00.",
              "Alex starts 1 hour before Blair.",
              "Exactly one is true: Blair uses the laptop; Blair works on Audit.",
              "Drew starts 1 hour before Casey.",
              "Exactly one is true: Casey starts at 09:00; Casey uses the desktop.",
              "Exactly one is true: Blair uses the laptop; Blair starts at 09:00.",
              "Exactly one is true: Drew uses the tablet; Drew works on Audit."
            ],
            "rules": [
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "before",
                0,
                2,
                1,
                0
              ],
              [
                "ne",
                1,
                2,
                2,
                0
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "diff",
                0,
                0,
                1,
                -1
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "diff",
                0,
                3,
                2,
                -1
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  1,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 333,
    "focus": "logic grids",
    "title": "Logic Grids 39",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 1 to list possible start-time pairs for Drew and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 1, 3, 2], [2, 1, 0, 3], [0, 1, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Drew starts 2 hours after Alex.",
              "Exactly one is true: Alex works on Audit; Alex starts at 11:00.",
              "Exactly one is true: Blair uses the desktop; Blair starts at 10:00.",
              "Exactly one is true: Casey works on Deploy; Casey uses the tablet.",
              "Exactly one is true: Blair uses the server; Blair works on Backup.",
              "Exactly one is true: Drew uses the laptop; Drew starts at 11:00.",
              "Casey is not assigned Laptop.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Backup.",
              "Exactly one is true: Drew uses the tablet; Drew works on Support."
            ],
            "rules": [
              [
                "diff",
                0,
                3,
                0,
                2
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                2,
                1,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                2,
                1,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "ne",
                2,
                2,
                0,
                0
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  1,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 334,
    "focus": "logic grids",
    "title": "Logic Grids 40",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 4 to list possible start-time pairs for Casey and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 2, 3, 1], [2, 1, 3, 0], [0, 1, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey works on Audit; Casey uses the tablet.",
              "Casey is not assigned Deploy.",
              "Exactly one is true: Drew works on Support; Drew starts at 10:00.",
              "Casey starts 2 hours after Drew.",
              "Exactly one is true: Alex starts at 09:00; Alex uses the tablet.",
              "Exactly one is true: Alex starts at 12:00; Alex works on Audit.",
              "Exactly one is true: Blair works on Support; Blair uses the server.",
              "Drew is not assigned Deploy.",
              "Exactly one is true: Alex starts at 09:00; Alex uses the desktop."
            ],
            "rules": [
              [
                "either",
                1,
                2,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "ne",
                1,
                2,
                1,
                0
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "diff",
                0,
                2,
                3,
                2
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                0,
                3,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  2,
                  1
                ]
              ],
              [
                "ne",
                1,
                3,
                1,
                0
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  2,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 335,
    "focus": "logic grids",
    "title": "Logic Grids 41",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 9 to list possible start-time pairs for Alex and Casey. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 3, 1, 2], [3, 1, 2, 0], [1, 0, 3, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair starts at 12:00; Blair works on Backup.",
              "Exactly one is true: Drew works on Support; Drew uses the tablet.",
              "Exactly one is true: Drew uses the laptop; Drew works on Backup.",
              "Drew is not assigned 09:00.",
              "Exactly one is true: Blair starts at 09:00; Blair works on Deploy.",
              "Alex is not assigned Audit.",
              "Exactly one is true: Blair uses the laptop; Blair starts at 10:00.",
              "Exactly one is true: Alex uses the server; Alex starts at 11:00.",
              "Alex starts 1 hour before Casey."
            ],
            "rules": [
              [
                "either",
                0,
                1,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                2,
                3,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "ne",
                0,
                3,
                0,
                0
              ],
              [
                "either",
                0,
                1,
                0,
                [
                  1,
                  1
                ]
              ],
              [
                "ne",
                1,
                0,
                2,
                0
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "diff",
                0,
                0,
                2,
                -1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 336,
    "focus": "logic grids",
    "title": "Logic Grids 42",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 4 to list possible start-time pairs for Casey and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 3, 0, 2], [1, 0, 2, 3], [2, 3, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Drew is not assigned Server.",
              "Alex is not assigned 12:00.",
              "Drew is not assigned 12:00.",
              "Casey starts 2 hours before Drew.",
              "Exactly one is true: Alex uses the desktop; Alex works on Deploy.",
              "Exactly one is true: Blair uses the desktop; Blair starts at 09:00.",
              "Exactly one is true: Drew uses the desktop; Drew works on Support.",
              "Exactly one is true: Alex uses the tablet; Alex starts at 12:00.",
              "Exactly one is true: Blair works on Backup; Blair starts at 09:00."
            ],
            "rules": [
              [
                "ne",
                2,
                3,
                1,
                0
              ],
              [
                "ne",
                0,
                0,
                3,
                0
              ],
              [
                "ne",
                0,
                3,
                3,
                0
              ],
              [
                "diff",
                0,
                2,
                3,
                -2
              ],
              [
                "either",
                2,
                0,
                3,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                2,
                1,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                3,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 337,
    "focus": "logic grids",
    "title": "Logic Grids 43",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 5 to list possible start-time pairs for Drew and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[0, 1, 2, 3], [2, 1, 0, 3], [2, 3, 0, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew uses the server; Drew works on Deploy.",
              "Exactly one is true: Blair uses the desktop; Blair works on Audit.",
              "Exactly one is true: Blair works on Support; Blair starts at 10:00.",
              "Exactly one is true: Blair uses the desktop; Blair starts at 09:00.",
              "Drew starts 3 hours after Alex.",
              "Exactly one is true: Drew uses the desktop; Drew works on Support.",
              "Exactly one is true: Alex uses the tablet; Alex works on Backup.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Backup."
            ],
            "rules": [
              [
                "either",
                2,
                3,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                2,
                1,
                3,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                1,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "diff",
                0,
                3,
                0,
                3
              ],
              [
                "either",
                2,
                3,
                3,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 338,
    "focus": "logic grids",
    "title": "Logic Grids 44",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 4 to list possible start-time pairs for Blair and Drew. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 0, 3, 2], [2, 3, 0, 1], [1, 0, 3, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey uses the desktop; Casey starts at 10:00.",
              "Exactly one is true: Alex starts at 10:00; Alex uses the tablet.",
              "Exactly one is true: Blair works on Backup; Blair uses the laptop.",
              "Blair starts 2 hours before Drew.",
              "Exactly one is true: Drew starts at 12:00; Drew works on Deploy.",
              "Exactly one is true: Alex uses the server; Alex works on Deploy.",
              "Exactly one is true: Casey works on Backup; Casey starts at 10:00.",
              "Exactly one is true: Alex works on Audit; Alex starts at 12:00."
            ],
            "rules": [
              [
                "either",
                2,
                2,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                0,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "diff",
                0,
                1,
                3,
                -2
              ],
              [
                "either",
                0,
                3,
                3,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  0,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 339,
    "focus": "logic grids",
    "title": "Logic Grids 45",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 4 to list possible start-time pairs for Blair and Casey. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 0, 2, 3], [3, 2, 1, 0], [3, 2, 0, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair uses the tablet; Blair starts at 10:00.",
              "Exactly one is true: Alex works on Support; Alex uses the server.",
              "Exactly one is true: Blair uses the tablet; Blair works on Backup.",
              "Blair starts 2 hours before Casey.",
              "Alex starts 1 hour before Casey.",
              "Drew starts 2 hours after Alex.",
              "Exactly one is true: Alex uses the desktop; Alex starts at 11:00.",
              "Exactly one is true: Casey uses the laptop; Casey starts at 12:00.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Deploy."
            ],
            "rules": [
              [
                "either",
                2,
                1,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                3,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                2,
                1,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "diff",
                0,
                1,
                2,
                -2
              ],
              [
                "diff",
                0,
                0,
                2,
                -1
              ],
              [
                "diff",
                0,
                3,
                0,
                2
              ],
              [
                "either",
                2,
                0,
                3,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                2,
                2,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 340,
    "focus": "logic grids",
    "title": "Logic Grids 46",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Drew's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 3, 0, 1], [2, 0, 3, 1], [1, 3, 0, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew uses the tablet; Drew works on Backup.",
              "Exactly one is true: Alex uses the server; Alex works on Backup.",
              "Exactly one is true: Blair uses the desktop; Blair works on Support.",
              "Exactly one is true: Alex uses the tablet; Alex starts at 11:00.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Support.",
              "Exactly one is true: Drew works on Deploy; Drew uses the desktop.",
              "Exactly one is true: Blair works on Audit; Blair uses the desktop.",
              "Exactly one is true: Casey works on Audit; Casey starts at 09:00.",
              "Exactly one is true: Drew starts at 10:00; Drew uses the server."
            ],
            "rules": [
              [
                "either",
                2,
                3,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                1,
                3,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                1,
                [
                  2,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 341,
    "focus": "logic grids",
    "title": "Logic Grids 47",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 4 to list possible start-time pairs for Drew and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 2, 3, 0], [0, 2, 1, 3], [1, 2, 3, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex uses the laptop; Alex starts at 10:00.",
              "Exactly one is true: Alex works on Support; Alex uses the server.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 09:00.",
              "Drew starts earlier than Alex.",
              "Exactly one is true: Blair works on Backup; Blair starts at 11:00.",
              "Exactly one is true: Alex uses the desktop; Alex works on Backup.",
              "Exactly one is true: Blair works on Audit; Blair starts at 12:00.",
              "Exactly one is true: Casey uses the desktop; Casey starts at 10:00.",
              "Exactly one is true: Blair starts at 11:00; Blair uses the laptop."
            ],
            "rules": [
              [
                "either",
                2,
                0,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                3,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "before",
                0,
                3,
                0,
                0
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                2,
                0,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  2,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 342,
    "focus": "logic grids",
    "title": "Logic Grids 48",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Use clue 7 to list possible start-time pairs for Drew and Alex. Eliminate pairs that conflict with another clue before assigning either time.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[2, 1, 3, 0], [1, 0, 2, 3], [1, 3, 0, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew uses the laptop; Drew works on Support.",
              "Exactly one is true: Casey uses the tablet; Casey works on Audit.",
              "Exactly one is true: Casey starts at 12:00; Casey works on Backup.",
              "Blair is not assigned Deploy.",
              "Exactly one is true: Drew works on Deploy; Drew uses the tablet.",
              "Exactly one is true: Blair starts at 10:00; Blair works on Deploy.",
              "Drew starts earlier than Alex.",
              "Drew is not assigned Deploy.",
              "Casey is not assigned Desktop.",
              "Exactly one is true: Alex uses the server; Alex starts at 10:00."
            ],
            "rules": [
              [
                "either",
                2,
                3,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                2,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "ne",
                1,
                1,
                1,
                0
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "before",
                0,
                3,
                0,
                0
              ],
              [
                "ne",
                1,
                3,
                1,
                0
              ],
              [
                "ne",
                2,
                2,
                3,
                0
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  0,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 343,
    "focus": "logic grids",
    "title": "Logic Grids 49",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 2 separately. When one is true, the other must be false; follow the effect on Drew's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[1, 2, 3, 0], [1, 0, 3, 2], [3, 0, 2, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Blair is not assigned Deploy.",
              "Exactly one is true: Drew uses the server; Drew starts at 10:00.",
              "Exactly one is true: Drew works on Support; Drew starts at 09:00.",
              "Exactly one is true: Casey uses the desktop; Casey starts at 12:00.",
              "Exactly one is true: Casey uses the laptop; Casey works on Support.",
              "Exactly one is true: Drew works on Audit; Drew uses the tablet.",
              "Exactly one is true: Blair starts at 11:00; Blair uses the tablet.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 12:00.",
              "Exactly one is true: Blair uses the laptop; Blair starts at 12:00."
            ],
            "rules": [
              [
                "ne",
                1,
                1,
                1,
                0
              ],
              [
                "either",
                2,
                3,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                2,
                2,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  0,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 344,
    "focus": "logic grids",
    "title": "Logic Grids 50",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Test the two possibilities in clue 1 separately. When one is true, the other must be false; follow the effect on Drew's other assignments.",
        "parts": [
          {
            "id": "0",
            "prompt": "Solve the puzzle.",
            "kind": "logic-grid",
            "marks": 3,
            "answer": "[[3, 1, 0, 2], [1, 0, 2, 3], [3, 2, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew starts at 12:00; Drew works on Support.",
              "Exactly one is true: Drew starts at 11:00; Drew uses the tablet.",
              "Exactly one is true: Casey starts at 12:00; Casey works on Audit.",
              "Exactly one is true: Drew uses the desktop; Drew starts at 11:00.",
              "Exactly one is true: Blair works on Audit; Blair starts at 10:00.",
              "Exactly one is true: Alex starts at 12:00; Alex works on Backup.",
              "Exactly one is true: Alex uses the laptop; Alex starts at 12:00.",
              "Exactly one is true: Casey starts at 11:00; Casey uses the server.",
              "Exactly one is true: Alex uses the desktop; Alex starts at 11:00."
            ],
            "rules": [
              [
                "either",
                0,
                3,
                3,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                2,
                3,
                3,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                0,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                0,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                2,
                0,
                3,
                [
                  0,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 685,
    "title": "Logic Grids · 51",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 2, 0], [2, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              }
            ],
            "clues": [
              "Alex is not assigned Backup.",
              "Exactly one is true: Blair works on Deploy; Blair starts at 10:00.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 09:00.",
              "Exactly one is true: Alex works on Backup; Alex starts at 10:00."
            ],
            "rules": [
              [
                "ne",
                1,
                0,
                0,
                0
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 686,
    "title": "Logic Grids · 52",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 1, 2], [0, 2, 1], [0, 2, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair works on Deploy; Blair uses the tablet.",
              "Exactly one is true: Blair works on Audit; Blair starts at 09:00.",
              "Exactly one is true: Alex works on Deploy; Alex uses the laptop.",
              "Exactly one is true: Alex uses the tablet; Alex starts at 09:00.",
              "Exactly one is true: Alex starts at 11:00; Alex uses the laptop.",
              "Exactly one is true: Blair uses the laptop; Blair starts at 10:00."
            ],
            "rules": [
              [
                "either",
                1,
                1,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  0,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 687,
    "title": "Logic Grids · 53",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 1, 2], [0, 1, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              }
            ],
            "clues": [
              "Casey starts 1 hour after Blair.",
              "Exactly one is true: Alex works on Deploy; Alex starts at 09:00.",
              "Exactly one is true: Casey starts at 09:00; Casey works on Audit.",
              "Blair is not assigned Backup."
            ],
            "rules": [
              [
                "diff",
                0,
                2,
                1,
                1
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "ne",
                1,
                1,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 688,
    "title": "Logic Grids · 54",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 0, 2], [0, 2, 1], [2, 0, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair starts at 10:00; Blair uses the laptop.",
              "Exactly one is true: Casey works on Audit; Casey starts at 11:00.",
              "Exactly one is true: Casey works on Deploy; Casey uses the tablet.",
              "Exactly one is true: Blair works on Deploy; Blair uses the laptop.",
              "Exactly one is true: Alex works on Backup; Alex starts at 11:00.",
              "Exactly one is true: Alex works on Audit; Alex starts at 10:00."
            ],
            "rules": [
              [
                "either",
                0,
                1,
                1,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  0,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 689,
    "title": "Logic Grids · 55",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 1, 0], [0, 1, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair works on Deploy; Blair starts at 09:00.",
              "Exactly one is true: Alex starts at 11:00; Alex works on Audit.",
              "Alex starts 2 hours after Casey."
            ],
            "rules": [
              [
                "either",
                1,
                1,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "diff",
                0,
                0,
                2,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 690,
    "title": "Logic Grids · 56",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 1, 2], [2, 1, 0], [2, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair works on Backup; Blair uses the server.",
              "Exactly one is true: Casey works on Backup; Casey uses the tablet.",
              "Blair is not assigned 09:00.",
              "Exactly one is true: Blair works on Deploy; Blair starts at 09:00.",
              "Alex is not assigned Backup.",
              "Blair starts 1 hour before Casey."
            ],
            "rules": [
              [
                "either",
                1,
                1,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  2,
                  2
                ]
              ],
              [
                "ne",
                0,
                1,
                0,
                0
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "ne",
                1,
                0,
                0,
                0
              ],
              [
                "diff",
                0,
                1,
                2,
                -1
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 691,
    "title": "Logic Grids · 57",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 2, 0], [1, 0, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey works on Deploy; Casey starts at 09:00.",
              "Exactly one is true: Blair starts at 11:00; Blair works on Audit.",
              "Exactly one is true: Blair works on Deploy; Blair starts at 11:00.",
              "Exactly one is true: Alex works on Backup; Alex starts at 10:00."
            ],
            "rules": [
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 692,
    "title": "Logic Grids · 58",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 2, 0], [2, 1, 0], [0, 1, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey works on Backup; Casey uses the server.",
              "Exactly one is true: Blair works on Backup; Blair uses the server.",
              "Exactly one is true: Blair works on Deploy; Blair starts at 09:00.",
              "Exactly one is true: Casey uses the tablet; Casey works on Audit.",
              "Alex starts 1 hour after Casey.",
              "Casey is not assigned Audit.",
              "Exactly one is true: Alex uses the tablet; Alex works on Audit."
            ],
            "rules": [
              [
                "either",
                1,
                2,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                2,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "diff",
                0,
                0,
                2,
                1
              ],
              [
                "ne",
                1,
                2,
                2,
                0
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  1,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 693,
    "title": "Logic Grids · 59",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 2, 0], [2, 0, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey works on Deploy; Casey starts at 10:00.",
              "Exactly one is true: Blair works on Backup; Blair starts at 09:00.",
              "Exactly one is true: Blair starts at 10:00; Blair works on Backup.",
              "Exactly one is true: Casey works on Backup; Casey starts at 09:00."
            ],
            "rules": [
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                1,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  0,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 694,
    "title": "Logic Grids · 60",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 2, 0], [1, 0, 2], [1, 2, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey starts at 09:00; Casey works on Backup.",
              "Exactly one is true: Alex works on Audit; Alex uses the server.",
              "Exactly one is true: Alex uses the server; Alex starts at 11:00.",
              "Exactly one is true: Alex works on Backup; Alex uses the server.",
              "Exactly one is true: Blair uses the laptop; Blair starts at 11:00.",
              "Exactly one is true: Casey uses the server; Casey starts at 09:00."
            ],
            "rules": [
              [
                "either",
                0,
                2,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                2,
                2,
                1,
                [
                  0,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 695,
    "title": "Logic Grids · 61",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 0, 2], [1, 0, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair starts at 11:00; Blair works on Backup.",
              "Alex starts 1 hour after Blair.",
              "Exactly one is true: Alex works on Backup; Alex starts at 10:00.",
              "Exactly one is true: Alex starts at 09:00; Alex works on Deploy."
            ],
            "rules": [
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "diff",
                0,
                0,
                1,
                1
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  1,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 696,
    "title": "Logic Grids · 62",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 1, 2], [2, 0, 1], [0, 2, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey uses the server; Casey works on Backup.",
              "Casey starts 2 hours after Alex.",
              "Exactly one is true: Blair uses the tablet; Blair starts at 11:00.",
              "Exactly one is true: Blair starts at 11:00; Blair works on Backup.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 10:00."
            ],
            "rules": [
              [
                "either",
                2,
                2,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "diff",
                0,
                2,
                0,
                2
              ],
              [
                "either",
                2,
                1,
                2,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 697,
    "title": "Logic Grids · 63",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 1, 2], [2, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex starts at 10:00; Alex works on Audit.",
              "Casey starts 1 hour after Blair.",
              "Alex is not assigned 11:00.",
              "Exactly one is true: Blair works on Backup; Blair starts at 10:00."
            ],
            "rules": [
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "diff",
                0,
                2,
                1,
                1
              ],
              [
                "ne",
                0,
                0,
                2,
                0
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 698,
    "title": "Logic Grids · 64",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 1, 2], [2, 1, 0], [2, 0, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair uses the laptop; Blair starts at 11:00.",
              "Exactly one is true: Alex starts at 09:00; Alex uses the laptop.",
              "Exactly one is true: Blair uses the tablet; Blair starts at 10:00.",
              "Exactly one is true: Alex uses the laptop; Alex works on Audit.",
              "Exactly one is true: Blair works on Backup; Blair starts at 10:00.",
              "Exactly one is true: Casey uses the tablet; Casey starts at 11:00."
            ],
            "rules": [
              [
                "either",
                2,
                1,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                1,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                0,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                2,
                2,
                [
                  0,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 699,
    "title": "Logic Grids · 65",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 2, 1], [1, 2, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex works on Backup; Alex starts at 09:00.",
              "Exactly one is true: Alex works on Deploy; Alex starts at 11:00.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 10:00.",
              "Exactly one is true: Blair starts at 11:00; Blair works on Backup."
            ],
            "rules": [
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 700,
    "title": "Logic Grids · 66",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 1, 3, 0], [2, 1, 3, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey works on Support; Casey starts at 10:00.",
              "Exactly one is true: Alex works on Deploy; Alex starts at 11:00.",
              "Blair starts earlier than Casey.",
              "Exactly one is true: Blair works on Backup; Blair starts at 10:00.",
              "Alex starts 2 hours after Drew.",
              "Alex is not assigned Backup.",
              "Blair starts 1 hour before Alex.",
              "Drew is assigned Backup."
            ],
            "rules": [
              [
                "either",
                1,
                2,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "before",
                0,
                1,
                2,
                0
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "diff",
                0,
                0,
                3,
                2
              ],
              [
                "ne",
                1,
                0,
                0,
                0
              ],
              [
                "diff",
                0,
                1,
                0,
                -1
              ],
              [
                "eq",
                1,
                3,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 701,
    "title": "Logic Grids · 67",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 0, 1, 2], [1, 3, 2, 0], [2, 0, 3, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew works on Backup; Drew starts at 12:00.",
              "Exactly one is true: Casey starts at 10:00; Casey uses the server.",
              "Exactly one is true: Blair uses the laptop; Blair works on Deploy.",
              "Exactly one is true: Drew starts at 12:00; Drew uses the server.",
              "Alex starts 3 hours after Blair.",
              "Exactly one is true: Casey uses the desktop; Casey works on Support.",
              "Exactly one is true: Alex uses the tablet; Alex works on Audit.",
              "Exactly one is true: Casey works on Audit; Casey starts at 12:00.",
              "Alex is assigned Deploy."
            ],
            "rules": [
              [
                "either",
                1,
                3,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                3,
                [
                  2,
                  1
                ]
              ],
              [
                "diff",
                0,
                0,
                1,
                3
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "eq",
                1,
                0,
                1,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 702,
    "title": "Logic Grids · 68",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 2, 1, 3], [0, 3, 2, 1], [0, 2, 1, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex starts at 09:00; Alex uses the server.",
              "Exactly one is true: Blair works on Support; Blair starts at 12:00.",
              "Exactly one is true: Blair uses the tablet; Blair starts at 10:00.",
              "Exactly one is true: Alex starts at 12:00; Alex works on Backup.",
              "Exactly one is true: Casey works on Audit; Casey uses the laptop.",
              "Exactly one is true: Drew uses the laptop; Drew starts at 12:00.",
              "Exactly one is true: Drew works on Audit; Drew starts at 12:00.",
              "Exactly one is true: Casey starts at 10:00; Casey uses the laptop.",
              "Exactly one is true: Drew starts at 10:00; Drew uses the desktop.",
              "Blair is assigned Support."
            ],
            "rules": [
              [
                "either",
                0,
                0,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                0,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                1,
                [
                  2,
                  3
                ]
              ],
              [
                "eq",
                1,
                1,
                3,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 703,
    "title": "Logic Grids · 69",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 0, 1, 3], [3, 0, 2, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew starts at 11:00; Drew works on Deploy.",
              "Drew starts 1 hour after Alex.",
              "Exactly one is true: Blair works on Deploy; Blair starts at 09:00.",
              "Casey is not assigned 12:00.",
              "Exactly one is true: Blair starts at 11:00; Blair works on Backup.",
              "Exactly one is true: Alex starts at 11:00; Alex works on Audit.",
              "Casey is assigned Audit."
            ],
            "rules": [
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "diff",
                0,
                3,
                0,
                1
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "ne",
                0,
                2,
                3,
                0
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "eq",
                1,
                2,
                2,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 704,
    "title": "Logic Grids · 70",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 2, 0, 1], [2, 3, 0, 1], [3, 2, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Alex starts 2 hours after Drew.",
              "Exactly one is true: Alex starts at 11:00; Alex works on Audit.",
              "Exactly one is true: Drew works on Deploy; Drew uses the tablet.",
              "Exactly one is true: Blair starts at 12:00; Blair works on Support.",
              "Exactly one is true: Casey uses the desktop; Casey works on Backup.",
              "Exactly one is true: Alex works on Audit; Alex uses the laptop.",
              "Exactly one is true: Alex starts at 11:00; Alex uses the desktop.",
              "Exactly one is true: Casey uses the server; Casey works on Deploy.",
              "Exactly one is true: Blair starts at 11:00; Blair uses the laptop.",
              "Drew is assigned Deploy."
            ],
            "rules": [
              [
                "diff",
                0,
                0,
                3,
                2
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                3,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                2,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "eq",
                1,
                3,
                1,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 705,
    "title": "Logic Grids · 71",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 3, 1, 0], [0, 2, 3, 1], [3, 1, 0, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey uses the server; Casey starts at 10:00.",
              "Exactly one is true: Drew uses the tablet; Drew starts at 12:00.",
              "Exactly one is true: Casey starts at 09:00; Casey uses the laptop.",
              "Exactly one is true: Casey works on Support; Casey uses the server.",
              "Exactly one is true: Drew works on Deploy; Drew uses the desktop.",
              "Drew starts earlier than Casey.",
              "Alex starts 1 hour after Casey.",
              "Exactly one is true: Alex works on Deploy; Alex uses the desktop.",
              "Exactly one is true: Alex works on Backup; Alex starts at 12:00.",
              "Alex is assigned Backup."
            ],
            "rules": [
              [
                "either",
                2,
                2,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  2,
                  3
                ]
              ],
              [
                "before",
                0,
                3,
                2,
                0
              ],
              [
                "diff",
                0,
                0,
                2,
                1
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "eq",
                1,
                0,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 706,
    "title": "Logic Grids · 72",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 1, 3, 2], [3, 2, 0, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Drew starts 1 hour before Casey.",
              "Alex starts 1 hour before Blair.",
              "Drew is not assigned Support.",
              "Exactly one is true: Casey works on Backup; Casey starts at 09:00.",
              "Exactly one is true: Casey works on Backup; Casey starts at 10:00.",
              "Exactly one is true: Blair starts at 12:00; Blair works on Audit.",
              "Blair is assigned Audit."
            ],
            "rules": [
              [
                "diff",
                0,
                3,
                2,
                -1
              ],
              [
                "diff",
                0,
                0,
                1,
                -1
              ],
              [
                "ne",
                1,
                3,
                3,
                0
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                1,
                3,
                [
                  1,
                  2
                ]
              ],
              [
                "eq",
                1,
                1,
                2,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 707,
    "title": "Logic Grids · 73",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 1, 3, 2], [2, 0, 3, 1], [2, 3, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair uses the desktop; Blair starts at 09:00.",
              "Exactly one is true: Blair starts at 12:00; Blair works on Backup.",
              "Exactly one is true: Blair starts at 11:00; Blair uses the desktop.",
              "Exactly one is true: Alex starts at 12:00; Alex works on Audit.",
              "Exactly one is true: Alex starts at 10:00; Alex works on Audit.",
              "Exactly one is true: Casey works on Support; Casey uses the tablet.",
              "Exactly one is true: Blair starts at 10:00; Blair uses the laptop.",
              "Exactly one is true: Drew starts at 11:00; Drew uses the desktop.",
              "Exactly one is true: Alex uses the tablet; Alex works on Support.",
              "Exactly one is true: Drew uses the laptop; Drew starts at 12:00.",
              "Casey is assigned Support."
            ],
            "rules": [
              [
                "either",
                2,
                1,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                1,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                3,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                1,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                3,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "eq",
                1,
                2,
                3,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 708,
    "title": "Logic Grids · 74",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 0, 1, 2], [1, 3, 2, 0], [0, 2, 3, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew starts at 11:00; Drew uses the tablet.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 10:00.",
              "Blair starts earlier than Casey.",
              "Exactly one is true: Drew uses the server; Drew works on Audit.",
              "Exactly one is true: Blair works on Support; Blair starts at 10:00.",
              "Exactly one is true: Drew works on Backup; Drew starts at 09:00.",
              "Exactly one is true: Casey starts at 11:00; Casey uses the desktop.",
              "Casey is not assigned Deploy.",
              "Exactly one is true: Blair starts at 12:00; Blair uses the tablet.",
              "Drew is assigned Backup."
            ],
            "rules": [
              [
                "either",
                0,
                3,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "before",
                0,
                1,
                2,
                0
              ],
              [
                "either",
                2,
                3,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "ne",
                1,
                2,
                1,
                0
              ],
              [
                "either",
                0,
                1,
                3,
                [
                  2,
                  2
                ]
              ],
              [
                "eq",
                1,
                3,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 709,
    "title": "Logic Grids · 75",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 2, 0, 3], [3, 2, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey works on Deploy; Casey starts at 10:00.",
              "Exactly one is true: Blair works on Audit; Blair starts at 09:00.",
              "Exactly one is true: Blair works on Audit; Blair starts at 10:00.",
              "Exactly one is true: Drew works on Backup; Drew starts at 10:00.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Backup.",
              "Exactly one is true: Casey works on Backup; Casey starts at 09:00.",
              "Alex is assigned Support."
            ],
            "rules": [
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "eq",
                1,
                0,
                3,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 710,
    "title": "Logic Grids · 76",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 1, 0, 2], [1, 3, 2, 0], [0, 2, 3, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex starts at 11:00; Alex uses the laptop.",
              "Exactly one is true: Alex starts at 11:00; Alex works on Deploy.",
              "Exactly one is true: Blair works on Support; Blair starts at 11:00.",
              "Exactly one is true: Casey uses the server; Casey works on Audit.",
              "Exactly one is true: Alex starts at 12:00; Alex uses the desktop.",
              "Exactly one is true: Alex uses the server; Alex works on Deploy.",
              "Exactly one is true: Blair starts at 09:00; Blair works on Support.",
              "Drew is not assigned Audit.",
              "Exactly one is true: Drew starts at 09:00; Drew uses the server.",
              "Exactly one is true: Blair uses the tablet; Blair works on Audit.",
              "Blair is assigned Support."
            ],
            "rules": [
              [
                "either",
                0,
                0,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                2,
                2,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                0,
                3,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                0,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                1,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "ne",
                1,
                3,
                2,
                0
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                2,
                1,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "eq",
                1,
                1,
                3,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 711,
    "title": "Logic Grids · 77",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 2, 1, 0], [2, 0, 1, 3], [2, 0, 3, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex works on Deploy; Alex uses the tablet.",
              "Exactly one is true: Drew works on Support; Drew uses the desktop.",
              "Blair starts 2 hours after Drew.",
              "Exactly one is true: Casey starts at 09:00; Casey uses the desktop.",
              "Exactly one is true: Blair starts at 11:00; Blair works on Audit.",
              "Exactly one is true: Blair works on Support; Blair uses the laptop.",
              "Exactly one is true: Casey starts at 11:00; Casey works on Deploy.",
              "Exactly one is true: Alex starts at 11:00; Alex uses the tablet.",
              "Exactly one is true: Casey starts at 12:00; Casey works on Deploy.",
              "Casey is assigned Deploy."
            ],
            "rules": [
              [
                "either",
                1,
                0,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  2,
                  3
                ]
              ],
              [
                "diff",
                0,
                1,
                3,
                2
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  1,
                  1
                ]
              ],
              [
                "eq",
                1,
                2,
                1,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 712,
    "title": "Logic Grids · 78",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 0, 2, 3], [3, 2, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew works on Backup; Drew starts at 11:00.",
              "Exactly one is true: Alex starts at 10:00; Alex works on Deploy.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 12:00.",
              "Exactly one is true: Alex starts at 11:00; Alex works on Support.",
              "Casey starts 1 hour before Drew.",
              "Exactly one is true: Casey works on Audit; Casey starts at 11:00.",
              "Drew is assigned Backup."
            ],
            "rules": [
              [
                "either",
                1,
                3,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                0,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "diff",
                0,
                2,
                3,
                -1
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  0,
                  2
                ]
              ],
              [
                "eq",
                1,
                3,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 713,
    "title": "Logic Grids · 79",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 3, 0, 2], [1, 2, 3, 0], [1, 3, 2, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey works on Backup; Casey uses the tablet.",
              "Exactly one is true: Blair uses the server; Blair works on Audit.",
              "Exactly one is true: Drew works on Support; Drew starts at 11:00.",
              "Exactly one is true: Casey starts at 09:00; Casey uses the desktop.",
              "Exactly one is true: Alex starts at 11:00; Alex uses the server.",
              "Exactly one is true: Alex uses the tablet; Alex starts at 10:00.",
              "Exactly one is true: Drew uses the laptop; Drew starts at 10:00.",
              "Exactly one is true: Casey works on Deploy; Casey uses the tablet.",
              "Exactly one is true: Drew starts at 09:00; Drew works on Backup.",
              "Alex is assigned Deploy."
            ],
            "rules": [
              [
                "either",
                1,
                2,
                0,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                2,
                1,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                3,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "eq",
                1,
                0,
                1,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 714,
    "title": "Logic Grids · 80",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 0, 3, 1], [3, 1, 0, 2], [2, 0, 1, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair works on Backup; Blair uses the laptop.",
              "Exactly one is true: Drew works on Audit; Drew uses the server.",
              "Alex starts earlier than Casey.",
              "Exactly one is true: Alex starts at 11:00; Alex uses the laptop.",
              "Exactly one is true: Alex works on Support; Alex starts at 10:00.",
              "Exactly one is true: Blair starts at 12:00; Blair uses the laptop.",
              "Blair starts earlier than Drew.",
              "Exactly one is true: Alex uses the tablet; Alex works on Deploy.",
              "Exactly one is true: Drew works on Audit; Drew starts at 09:00.",
              "Blair is assigned Deploy."
            ],
            "rules": [
              [
                "either",
                1,
                1,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                3,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "before",
                0,
                0,
                2,
                0
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                1,
                3,
                [
                  2,
                  0
                ]
              ],
              [
                "before",
                0,
                1,
                3,
                0
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                3,
                2,
                [
                  0,
                  0
                ]
              ],
              [
                "eq",
                1,
                1,
                1,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 715,
    "title": "Logic Grids · 81",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 0, 1, 3], [1, 0, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Drew starts 3 hours after Blair.",
              "Alex starts 1 hour after Casey.",
              "Exactly one is true: Alex works on Deploy; Alex starts at 12:00.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Support.",
              "Exactly one is true: Casey starts at 12:00; Casey works on Audit.",
              "Casey is assigned Audit."
            ],
            "rules": [
              [
                "diff",
                0,
                3,
                1,
                3
              ],
              [
                "diff",
                0,
                0,
                2,
                1
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  1,
                  2
                ]
              ],
              [
                "eq",
                1,
                2,
                2,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 716,
    "title": "Logic Grids · 82",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 3, 2, 1], [0, 3, 1, 2], [2, 0, 3, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew uses the laptop; Drew works on Audit.",
              "Exactly one is true: Drew uses the server; Drew starts at 09:00.",
              "Alex starts earlier than Casey.",
              "Exactly one is true: Casey starts at 11:00; Casey uses the tablet.",
              "Blair starts 2 hours after Drew.",
              "Exactly one is true: Casey uses the desktop; Casey starts at 10:00.",
              "Exactly one is true: Blair uses the laptop; Blair works on Audit.",
              "Exactly one is true: Blair starts at 11:00; Blair works on Support.",
              "Exactly one is true: Alex uses the tablet; Alex works on Deploy.",
              "Drew is assigned Audit."
            ],
            "rules": [
              [
                "either",
                2,
                3,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                2,
                3,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "before",
                0,
                0,
                2,
                0
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "diff",
                0,
                1,
                3,
                2
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "eq",
                1,
                3,
                2,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 717,
    "title": "Logic Grids · 83",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 3, 0, 2], [1, 3, 2, 0], [1, 0, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew uses the desktop; Drew starts at 09:00.",
              "Casey starts earlier than Alex.",
              "Exactly one is true: Casey uses the tablet; Casey starts at 12:00.",
              "Drew starts 1 hour after Alex.",
              "Exactly one is true: Alex works on Backup; Alex starts at 10:00.",
              "Exactly one is true: Alex works on Deploy; Alex starts at 09:00.",
              "Exactly one is true: Blair uses the server; Blair starts at 12:00.",
              "Exactly one is true: Blair uses the tablet; Blair works on Support.",
              "Exactly one is true: Drew works on Backup; Drew starts at 10:00.",
              "Alex is assigned Deploy."
            ],
            "rules": [
              [
                "either",
                2,
                3,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "before",
                0,
                2,
                0,
                0
              ],
              [
                "either",
                2,
                2,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "diff",
                0,
                3,
                0,
                1
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                1,
                1,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "eq",
                1,
                0,
                1,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 718,
    "title": "Logic Grids · 84",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[0, 3, 1, 2], [2, 3, 0, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Blair starts 2 hours after Casey.",
              "Exactly one is true: Drew works on Support; Drew starts at 11:00.",
              "Exactly one is true: Blair starts at 10:00; Blair works on Support.",
              "Exactly one is true: Casey starts at 09:00; Casey works on Backup.",
              "Exactly one is true: Alex works on Audit; Alex starts at 11:00.",
              "Blair is assigned Support."
            ],
            "rules": [
              [
                "diff",
                0,
                1,
                2,
                2
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                1,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  0,
                  2
                ]
              ],
              [
                "eq",
                1,
                1,
                3,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 719,
    "title": "Logic Grids · 85",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 3, 1, 0], [2, 3, 0, 1], [3, 1, 2, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Blair is not assigned Backup.",
              "Casey starts 1 hour before Alex.",
              "Exactly one is true: Drew uses the desktop; Drew works on Deploy.",
              "Exactly one is true: Alex works on Audit; Alex uses the laptop.",
              "Exactly one is true: Casey works on Audit; Casey uses the tablet.",
              "Exactly one is true: Alex works on Audit; Alex uses the server.",
              "Exactly one is true: Blair starts at 09:00; Blair uses the server.",
              "Exactly one is true: Blair works on Backup; Blair starts at 12:00.",
              "Exactly one is true: Casey works on Backup; Casey starts at 09:00.",
              "Casey is assigned Backup."
            ],
            "rules": [
              [
                "ne",
                1,
                1,
                0,
                0
              ],
              [
                "diff",
                0,
                2,
                0,
                -1
              ],
              [
                "either",
                2,
                3,
                3,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                0,
                1,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                2,
                0,
                [
                  0,
                  0
                ]
              ],
              [
                "eq",
                1,
                2,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 720,
    "title": "Logic Grids · 86",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 0, 3, 2], [2, 1, 0, 3], [2, 0, 3, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew uses the server; Drew works on Deploy.",
              "Exactly one is true: Casey starts at 12:00; Casey uses the tablet.",
              "Exactly one is true: Drew works on Backup; Drew starts at 11:00.",
              "Exactly one is true: Blair works on Backup; Blair uses the laptop.",
              "Exactly one is true: Blair works on Audit; Blair starts at 09:00.",
              "Exactly one is true: Blair works on Audit; Blair uses the laptop.",
              "Exactly one is true: Casey uses the desktop; Casey works on Deploy.",
              "Exactly one is true: Casey uses the desktop; Casey works on Audit.",
              "Exactly one is true: Drew works on Support; Drew uses the laptop."
            ],
            "rules": [
              [
                "either",
                2,
                3,
                1,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  2,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 721,
    "title": "Logic Grids · 87",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 2, 0, 1], [3, 2, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Blair starts earlier than Alex.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 10:00.",
              "Blair is not assigned 09:00.",
              "Exactly one is true: Alex works on Support; Alex starts at 09:00.",
              "Drew is not assigned Audit.",
              "Casey starts 1 hour before Drew.",
              "Casey is not assigned Audit."
            ],
            "rules": [
              [
                "before",
                0,
                1,
                0,
                0
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "ne",
                0,
                1,
                0,
                0
              ],
              [
                "either",
                1,
                0,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "ne",
                1,
                3,
                2,
                0
              ],
              [
                "diff",
                0,
                2,
                3,
                -1
              ],
              [
                "ne",
                1,
                2,
                2,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 722,
    "title": "Logic Grids · 88",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 0, 3, 1], [3, 0, 2, 1], [1, 2, 0, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey starts at 10:00; Casey uses the laptop.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Audit.",
              "Exactly one is true: Drew works on Deploy; Drew uses the server.",
              "Exactly one is true: Drew starts at 10:00; Drew uses the server.",
              "Exactly one is true: Blair works on Backup; Blair starts at 12:00.",
              "Blair starts 2 hours before Alex.",
              "Exactly one is true: Drew works on Deploy; Drew uses the tablet.",
              "Exactly one is true: Blair starts at 10:00; Blair uses the tablet."
            ],
            "rules": [
              [
                "either",
                0,
                2,
                1,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                1,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "diff",
                0,
                1,
                0,
                -2
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                0,
                1,
                1,
                [
                  2,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 723,
    "title": "Logic Grids · 89",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 2, 1, 0], [0, 2, 3, 1], [3, 0, 1, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey starts at 12:00; Casey uses the server.",
              "Alex is not assigned Support.",
              "Exactly one is true: Drew works on Deploy; Drew uses the server.",
              "Exactly one is true: Casey works on Audit; Casey uses the server.",
              "Exactly one is true: Blair works on Audit; Blair uses the desktop.",
              "Exactly one is true: Alex uses the tablet; Alex starts at 12:00.",
              "Exactly one is true: Blair uses the laptop; Blair starts at 10:00.",
              "Exactly one is true: Drew starts at 10:00; Drew uses the tablet.",
              "Exactly one is true: Blair works on Deploy; Blair starts at 11:00."
            ],
            "rules": [
              [
                "either",
                0,
                2,
                3,
                [
                  2,
                  1
                ]
              ],
              [
                "ne",
                1,
                0,
                3,
                0
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                1,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  0,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 724,
    "title": "Logic Grids · 90",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 1, 0, 2], [0, 1, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Drew starts 1 hour before Alex.",
              "Casey starts 2 hours before Drew.",
              "Exactly one is true: Drew works on Support; Drew starts at 09:00.",
              "Exactly one is true: Blair works on Deploy; Blair starts at 12:00.",
              "Exactly one is true: Alex starts at 09:00; Alex works on Backup."
            ],
            "rules": [
              [
                "diff",
                0,
                3,
                0,
                -1
              ],
              [
                "diff",
                0,
                2,
                3,
                -2
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                1,
                1,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                0,
                [
                  1,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 725,
    "title": "Logic Grids · 91",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 1, 0, 3], [3, 2, 1, 0], [3, 0, 1, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex works on Audit; Alex uses the desktop.",
              "Exactly one is true: Casey uses the server; Casey works on Backup.",
              "Exactly one is true: Drew works on Backup; Drew uses the server.",
              "Exactly one is true: Alex starts at 11:00; Alex uses the laptop.",
              "Exactly one is true: Drew starts at 12:00; Drew uses the desktop.",
              "Exactly one is true: Blair uses the laptop; Blair works on Backup.",
              "Exactly one is true: Casey starts at 09:00; Casey uses the tablet.",
              "Exactly one is true: Casey works on Support; Casey starts at 09:00.",
              "Exactly one is true: Blair works on Audit; Blair uses the server."
            ],
            "rules": [
              [
                "either",
                1,
                0,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                2,
                1,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                0,
                3,
                3,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  2,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 726,
    "title": "Logic Grids · 92",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 0, 2, 1], [0, 2, 3, 1], [0, 1, 2, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey uses the tablet; Casey starts at 10:00.",
              "Exactly one is true: Alex works on Backup; Alex starts at 11:00.",
              "Exactly one is true: Casey starts at 12:00; Casey uses the tablet.",
              "Exactly one is true: Alex works on Backup; Alex uses the desktop.",
              "Exactly one is true: Blair uses the server; Blair starts at 11:00.",
              "Blair starts 3 hours before Alex.",
              "Exactly one is true: Casey works on Support; Casey uses the desktop.",
              "Exactly one is true: Drew uses the laptop; Drew works on Deploy."
            ],
            "rules": [
              [
                "either",
                2,
                2,
                2,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  2,
                  2
                ]
              ],
              [
                "either",
                1,
                0,
                0,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "diff",
                0,
                1,
                0,
                -3
              ],
              [
                "either",
                1,
                2,
                3,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                3,
                0,
                [
                  1,
                  1
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 727,
    "title": "Logic Grids · 93",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 3, 1, 0], [3, 2, 1, 0]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Alex is not assigned Deploy.",
              "Exactly one is true: Blair starts at 12:00; Blair works on Support.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 11:00.",
              "Exactly one is true: Drew starts at 09:00; Drew works on Deploy.",
              "Alex starts earlier than Blair.",
              "Exactly one is true: Drew works on Backup; Drew starts at 11:00.",
              "Casey starts earlier than Blair.",
              "Blair is not assigned Deploy."
            ],
            "rules": [
              [
                "ne",
                1,
                0,
                1,
                0
              ],
              [
                "either",
                0,
                1,
                3,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  2
                ]
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  1,
                  1
                ]
              ],
              [
                "before",
                0,
                0,
                1,
                0
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "before",
                0,
                2,
                1,
                0
              ],
              [
                "ne",
                1,
                1,
                1,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 728,
    "title": "Logic Grids · 94",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[3, 2, 1, 0], [1, 3, 2, 0], [0, 2, 1, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Casey starts at 09:00; Casey uses the server.",
              "Exactly one is true: Drew starts at 10:00; Drew uses the desktop.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 09:00.",
              "Exactly one is true: Drew uses the tablet; Drew starts at 09:00.",
              "Exactly one is true: Casey uses the laptop; Casey starts at 10:00.",
              "Exactly one is true: Blair works on Support; Blair starts at 12:00.",
              "Exactly one is true: Blair works on Support; Blair uses the laptop.",
              "Exactly one is true: Casey works on Audit; Casey uses the desktop.",
              "Exactly one is true: Drew works on Backup; Drew uses the server.",
              "Exactly one is true: Blair uses the server; Blair starts at 11:00."
            ],
            "rules": [
              [
                "either",
                0,
                2,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                1,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                2,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                3,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                2,
                1,
                1,
                [
                  0,
                  2
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 729,
    "title": "Logic Grids · 95",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 1, 3, 0], [1, 0, 3, 2], [0, 2, 1, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair uses the tablet; Blair works on Support.",
              "Exactly one is true: Drew works on Support; Drew starts at 09:00.",
              "Exactly one is true: Alex uses the laptop; Alex starts at 10:00.",
              "Exactly one is true: Alex uses the laptop; Alex works on Audit.",
              "Exactly one is true: Casey starts at 09:00; Casey works on Support.",
              "Exactly one is true: Casey works on Deploy; Casey uses the server.",
              "Exactly one is true: Casey starts at 12:00; Casey works on Backup.",
              "Exactly one is true: Casey starts at 11:00; Casey works on Support.",
              "Exactly one is true: Alex works on Deploy; Alex starts at 12:00.",
              "Drew is not assigned Backup."
            ],
            "rules": [
              [
                "either",
                2,
                1,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                3,
                3,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                2,
                0,
                0,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                0,
                0,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                0,
                2,
                0,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                0,
                2,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                0,
                1,
                [
                  0,
                  3
                ]
              ],
              [
                "ne",
                1,
                3,
                0,
                0
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 730,
    "title": "Logic Grids · 96",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[1, 2, 0, 3], [0, 3, 2, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Drew starts at 12:00; Drew works on Support.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 09:00.",
              "Exactly one is true: Alex starts at 11:00; Alex works on Backup.",
              "Casey starts 2 hours before Blair.",
              "Exactly one is true: Casey starts at 11:00; Casey works on Audit.",
              "Exactly one is true: Drew works on Deploy; Drew starts at 09:00."
            ],
            "rules": [
              [
                "either",
                0,
                3,
                3,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  0
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  1,
                  0
                ]
              ],
              [
                "diff",
                0,
                2,
                1,
                -2
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  1,
                  2
                ]
              ],
              [
                "either",
                1,
                3,
                1,
                [
                  0,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 731,
    "title": "Logic Grids · 97",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 1, 0, 3], [0, 2, 3, 1], [2, 0, 3, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex uses the desktop; Alex works on Backup.",
              "Exactly one is true: Casey starts at 10:00; Casey works on Support.",
              "Exactly one is true: Blair works on Audit; Blair starts at 12:00.",
              "Exactly one is true: Blair uses the laptop; Blair works on Backup.",
              "Exactly one is true: Drew uses the tablet; Drew works on Deploy.",
              "Exactly one is true: Casey starts at 10:00; Casey uses the desktop.",
              "Exactly one is true: Alex uses the tablet; Alex works on Deploy.",
              "Exactly one is true: Alex starts at 11:00; Alex uses the laptop.",
              "Alex starts 2 hours after Casey."
            ],
            "rules": [
              [
                "either",
                2,
                0,
                3,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                2,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                2,
                1,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                2,
                0,
                2,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                0,
                2,
                [
                  2,
                  0
                ]
              ],
              [
                "diff",
                0,
                0,
                2,
                2
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 732,
    "title": "Logic Grids · 98",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 1, 0, 3], [3, 0, 2, 1], [0, 2, 3, 1]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Blair starts earlier than Alex.",
              "Exactly one is true: Casey starts at 10:00; Casey uses the desktop.",
              "Exactly one is true: Alex starts at 12:00; Alex uses the laptop.",
              "Exactly one is true: Alex uses the laptop; Alex works on Backup.",
              "Exactly one is true: Casey starts at 11:00; Casey uses the desktop.",
              "Casey starts earlier than Drew.",
              "Exactly one is true: Alex works on Support; Alex starts at 10:00.",
              "Exactly one is true: Drew starts at 09:00; Drew uses the server.",
              "Exactly one is true: Drew uses the laptop; Drew works on Deploy.",
              "Exactly one is true: Blair works on Backup; Blair starts at 09:00."
            ],
            "rules": [
              [
                "before",
                0,
                1,
                0,
                0
              ],
              [
                "either",
                0,
                2,
                1,
                [
                  2,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                3,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                0,
                0,
                [
                  1,
                  0
                ]
              ],
              [
                "either",
                0,
                2,
                2,
                [
                  2,
                  3
                ]
              ],
              [
                "before",
                0,
                2,
                3,
                0
              ],
              [
                "either",
                1,
                0,
                3,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                0,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                2,
                3,
                0,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 733,
    "title": "Logic Grids · 99",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 3, 0, 1], [1, 2, 0, 3]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Alex works on Backup; Alex starts at 11:00.",
              "Alex starts 1 hour after Drew.",
              "Exactly one is true: Blair starts at 12:00; Blair works on Deploy.",
              "Exactly one is true: Drew starts at 11:00; Drew works on Support.",
              "Exactly one is true: Blair works on Backup; Blair starts at 12:00.",
              "Exactly one is true: Casey works on Audit; Casey starts at 09:00."
            ],
            "rules": [
              [
                "either",
                1,
                0,
                0,
                [
                  0,
                  2
                ]
              ],
              [
                "diff",
                0,
                0,
                3,
                1
              ],
              [
                "either",
                0,
                1,
                3,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                0,
                3,
                2,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                1,
                1,
                0,
                [
                  0,
                  3
                ]
              ],
              [
                "either",
                1,
                2,
                2,
                [
                  0,
                  0
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  },
  {
    "slot": 734,
    "title": "Logic Grids · 100",
    "focus": "logic grids",
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
        "prompt": "Match each person with one value in every category. Each value is used once per category. Combine the clues; exactly-one statements exclude both being true.",
        "hint": "Combine the one-to-one rule with the most restrictive time or exactly-one clue. Mark exclusions before choosing a match.",
        "parts": [
          {
            "id": "0",
            "kind": "logic-grid",
            "prompt": "Solve the puzzle.",
            "marks": 3,
            "answer": "[[2, 0, 1, 3], [2, 1, 3, 0], [0, 3, 1, 2]]",
            "explanation": "Combine exclusions, time differences and exactly-one clues with the one-to-one rule. The complete assignment satisfies every clue.",
            "solutionText": "See the completed board below.",
            "names": [
              "Alex",
              "Blair",
              "Casey",
              "Drew"
            ],
            "categories": [
              {
                "name": "Start time",
                "values": [
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00"
                ]
              },
              {
                "name": "Task",
                "values": [
                  "Backup",
                  "Deploy",
                  "Audit",
                  "Support"
                ]
              },
              {
                "name": "Device",
                "values": [
                  "Laptop",
                  "Server",
                  "Tablet",
                  "Desktop"
                ]
              }
            ],
            "clues": [
              "Exactly one is true: Blair uses the laptop; Blair works on Deploy.",
              "Exactly one is true: Casey works on Deploy; Casey starts at 10:00.",
              "Exactly one is true: Casey uses the server; Casey works on Audit.",
              "Alex starts 2 hours after Blair.",
              "Exactly one is true: Alex works on Audit; Alex uses the server.",
              "Exactly one is true: Casey uses the desktop; Casey works on Support.",
              "Exactly one is true: Alex starts at 12:00; Alex uses the laptop.",
              "Exactly one is true: Drew uses the tablet; Drew works on Support."
            ],
            "rules": [
              [
                "either",
                2,
                1,
                0,
                [
                  1,
                  1
                ]
              ],
              [
                "either",
                1,
                2,
                1,
                [
                  0,
                  1
                ]
              ],
              [
                "either",
                2,
                2,
                1,
                [
                  1,
                  2
                ]
              ],
              [
                "diff",
                0,
                0,
                1,
                2
              ],
              [
                "either",
                1,
                0,
                2,
                [
                  2,
                  1
                ]
              ],
              [
                "either",
                2,
                2,
                3,
                [
                  1,
                  3
                ]
              ],
              [
                "either",
                0,
                0,
                3,
                [
                  2,
                  0
                ]
              ],
              [
                "either",
                2,
                3,
                2,
                [
                  1,
                  3
                ]
              ]
            ],
            "validation": {
              "solutionCount": 1,
              "method": "enumeration"
            }
          }
        ]
      }
    ]
  }
];
