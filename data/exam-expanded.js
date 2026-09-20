// Scenario-based gap coverage. Broad construction skills remain practice-only.
export default [
  {
    "slot": 100,
    "focus": "CA1.1",
    "title": "CA1.1 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA1.1.1",
      "CA1.1.2",
      "CA1.1.3",
      "CA1.1.5"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "A clinic wants repeatable appointment allocation. What is the purpose of computational thinking here?",
            "answer": "Turn the problem into precise, manageable steps",
            "options": [
              "Turn the problem into precise, manageable steps",
              "Replace all human judgement with a computer",
              "Guarantee the first proposed solution is optimal"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Computational thinking structures a problem so a solution can be developed and checked.",
            "coverage": [
              {
                "focus": "CA1.1.1",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Which task particularly suits computational thinking?",
            "answer": "Allocating rooms using capacity and timetable rules",
            "options": [
              "Choosing a painting solely by personal taste",
              "Deciding whether a friend feels appreciated without speaking to them",
              "Allocating rooms using capacity and timetable rules"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Explicit constraints and repeatable operations are suitable for systematic analysis.",
            "coverage": [
              {
                "focus": "CA1.1.2",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "A team divides a booking problem into inputs, rules and outputs. What benefit follows?",
            "answer": "Individual steps can be checked systematically",
            "options": [
              "Every possible input has automatically been tested",
              "Individual steps can be checked systematically",
              "The team no longer needs user requirements"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "A structured model makes reasoning and checking easier.",
            "coverage": [
              {
                "focus": "CA1.1.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "A tiny one-off task takes longer to model than to do manually. What drawback is illustrated?",
            "answer": "Analysis has a time cost",
            "options": [
              "Analysis has a time cost",
              "Computational thinking requires a specific programming language",
              "Computational thinking prevents reuse"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "The effort and suitability of formal analysis depend on the problem.",
            "coverage": [
              {
                "focus": "CA1.1.3",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Two decomposed booking modules use different date formats. What drawback has appeared?",
            "answer": "Interfaces between parts need coordination",
            "options": [
              "Decomposition prevents teams working in parallel",
              "Decomposition guarantees a single correct design",
              "Interfaces between parts need coordination"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Separate parts must still fit together.",
            "coverage": [
              {
                "focus": "CA1.1.5",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Several report tools all filter then total records. What benefit comes from recognising this pattern?",
            "answer": "A shared solution can be reused",
            "options": [
              "New examples no longer need checking",
              "A shared solution can be reused",
              "Every similar-looking problem has identical requirements"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Recognising relevant common structure can support reuse and generalisation.",
            "coverage": [
              {
                "focus": "CA1.1.5",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "A warehouse wants repeatable picking routes. What does computational thinking provide?",
            "answer": "A structured way to analyse and solve the problem",
            "options": [
              "Replace all human judgement with a computer",
              "Guarantee the first proposed solution is optimal",
              "A structured way to analyse and solve the problem"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Computational thinking structures a problem so a solution can be developed and checked.",
            "coverage": [
              {
                "focus": "CA1.1.1",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Which task particularly suits computational thinking?",
            "answer": "Checking thousands of orders against explicit validation rules",
            "options": [
              "Deciding whether a friend feels appreciated without speaking to them",
              "Checking thousands of orders against explicit validation rules",
              "Choosing a painting solely by personal taste"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Explicit constraints and repeatable operations are suitable for systematic analysis.",
            "coverage": [
              {
                "focus": "CA1.1.2",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "A team models a stock process before coding. What benefit follows?",
            "answer": "Missing steps can be spotted before implementation",
            "options": [
              "Missing steps can be spotted before implementation",
              "The team no longer needs user requirements",
              "Every possible input has automatically been tested"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "A structured model makes reasoning and checking easier.",
            "coverage": [
              {
                "focus": "CA1.1.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "A team cannot express a subjective preference as precise rules. What limitation applies?",
            "answer": "Some judgement is difficult to formalise",
            "options": [
              "Computational thinking requires a specific programming language",
              "Computational thinking prevents reuse",
              "Some judgement is difficult to formalise"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "The effort and suitability of formal analysis depend on the problem.",
            "coverage": [
              {
                "focus": "CA1.1.3",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Two teams separately implement the same decomposed validation step. What risk has appeared?",
            "answer": "Parts may duplicate work without coordination",
            "options": [
              "Decomposition guarantees a single correct design",
              "Parts may duplicate work without coordination",
              "Decomposition prevents teams working in parallel"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Separate parts must still fit together.",
            "coverage": [
              {
                "focus": "CA1.1.5",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Several validation failures share the same cause. What benefit comes from recognising it?",
            "answer": "One general fix may address multiple cases",
            "options": [
              "One general fix may address multiple cases",
              "Every similar-looking problem has identical requirements",
              "New examples no longer need checking"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Recognising relevant common structure can support reuse and generalisation.",
            "coverage": [
              {
                "focus": "CA1.1.5",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 101,
    "focus": "CA1.1",
    "title": "CA1.1 \u00b7 Applying ideas 2",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA1.1.5",
      "CA1.1.7"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "A route model keeps roads and distances but omits shop colours. What benefit follows?",
            "answer": "Less irrelevant detail makes the route easier to reason about",
            "options": [
              "Less irrelevant detail makes the route easier to reason about",
              "The omitted details can never matter in another task",
              "Abstraction guarantees faster program execution"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Abstraction retains information relevant to the current purpose.",
            "coverage": [
              {
                "focus": "CA1.1.5",
                "elements": [
                  "e"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "A developer writes precise dispatch steps before coding. What benefit follows?",
            "answer": "The logic can be reviewed before implementation",
            "options": [
              "An algorithm removes the need for testing",
              "An algorithm guarantees the best possible performance",
              "The logic can be reviewed before implementation"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Explicit ordered instructions can be checked and followed consistently.",
            "coverage": [
              {
                "focus": "CA1.1.5",
                "elements": [
                  "g"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "A policy changes after its algorithm has been written. What cost follows?",
            "answer": "The algorithm must be revised and checked",
            "options": [
              "Algorithms cannot be represented without code",
              "The algorithm must be revised and checked",
              "Algorithms cannot contain selection"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Algorithm quality depends on correct assumptions and maintenance.",
            "coverage": [
              {
                "focus": "CA1.1.5",
                "elements": [
                  "h"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "A parking charge depends on duration and vehicle class. Which is a main problem feature?",
            "answer": "Duration of the stay",
            "options": [
              "Duration of the stay",
              "The colour of the developer's keyboard",
              "The developer's favourite music"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Main features affect the required behaviour.",
            "coverage": [
              {
                "focus": "CA1.1.7",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Characterise a booking's capacity rule: occupied seats must not exceed available seats.",
            "answer": "A constraint",
            "options": [
              "A programming language",
              "A file extension",
              "A constraint"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Characterising a feature means identifying its role, such as input, output or constraint.",
            "coverage": [
              {
                "focus": "CA1.1.7",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Which is a manageable subproblem of an online checkout?",
            "answer": "Validate the delivery address",
            "options": [
              "Ignore exceptional cases",
              "Validate the delivery address",
              "Rebuild every service at once"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "A useful subproblem has a bounded purpose within the larger problem.",
            "coverage": [
              {
                "focus": "CA1.1.7",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "A login model omits the page background image. Why is this useful?",
            "answer": "Attention stays on the authentication rules",
            "options": [
              "The omitted details can never matter in another task",
              "Abstraction guarantees faster program execution",
              "Attention stays on the authentication rules"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Abstraction retains information relevant to the current purpose.",
            "coverage": [
              {
                "focus": "CA1.1.5",
                "elements": [
                  "e"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "A colleague follows an explicit refund algorithm. What benefit follows?",
            "answer": "The process can be repeated consistently",
            "options": [
              "An algorithm guarantees the best possible performance",
              "The process can be repeated consistently",
              "An algorithm removes the need for testing"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Explicit ordered instructions can be checked and followed consistently.",
            "coverage": [
              {
                "focus": "CA1.1.5",
                "elements": [
                  "g"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "A complex exception was overlooked during algorithm design. What limitation follows?",
            "answer": "The algorithm can consistently produce the wrong result",
            "options": [
              "The algorithm can consistently produce the wrong result",
              "Algorithms cannot contain selection",
              "Algorithms cannot be represented without code"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Algorithm quality depends on correct assumptions and maintenance.",
            "coverage": [
              {
                "focus": "CA1.1.5",
                "elements": [
                  "h"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "A parcel fee depends on weight and destination. Which is a main problem feature?",
            "answer": "Parcel weight",
            "options": [
              "The colour of the developer's keyboard",
              "The developer's favourite music",
              "Parcel weight"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Main features affect the required behaviour.",
            "coverage": [
              {
                "focus": "CA1.1.7",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Characterise a receipt produced after payment.",
            "answer": "An output",
            "options": [
              "A file extension",
              "An output",
              "A programming language"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Characterising a feature means identifying its role, such as input, output or constraint.",
            "coverage": [
              {
                "focus": "CA1.1.7",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Which is a manageable subproblem of a library loan system?",
            "answer": "Check whether a borrower may take another loan",
            "options": [
              "Check whether a borrower may take another loan",
              "Rebuild every service at once",
              "Ignore exceptional cases"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "A useful subproblem has a bounded purpose within the larger problem.",
            "coverage": [
              {
                "focus": "CA1.1.7",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 102,
    "focus": "CA1.1",
    "title": "CA1.1 \u00b7 Applying ideas 3",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA1.1.7",
      "CA1.1.12",
      "CA1.1.14",
      "CA1.1.15",
      "CA1.1.17",
      "CA1.1.8"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Which solution breakdown separates distinct checkout responsibilities?",
            "answer": "Validate basket, calculate charge, take payment",
            "options": [
              "Validate basket, calculate charge, take payment",
              "Put every action into one unnamed block",
              "Repeat the entire solution in every module"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Separate solution parts should have clear responsibilities and interfaces.",
            "coverage": [
              {
                "focus": "CA1.1.7",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Failures occur only for orders with zero items in two different services. What shared trend should be investigated?",
            "answer": "Handling of empty collections",
            "options": [
              "All network requests are necessarily failing",
              "All failures must have unrelated causes",
              "Handling of empty collections"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Use the conditions shared by failing examples to form a testable explanation.",
            "coverage": [
              {
                "focus": "CA1.1.12",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Which information is needed to calculate an electricity bill?",
            "answer": "Energy used and price per unit",
            "options": [
              "The developer's surname",
              "Energy used and price per unit",
              "The colour of the application icon"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Keep information needed to calculate the requested output.",
            "coverage": [
              {
                "focus": "CA1.1.14",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Which is a key action in an abstraction of paying an invoice?",
            "answer": "Confirm whether the payment succeeded",
            "options": [
              "Confirm whether the payment succeeded",
              "Choose a decorative font",
              "Animate the background"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "A key action affects the process outcome.",
            "coverage": [
              {
                "focus": "CA1.1.15",
                "elements": [
                  "e"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "A team faces a large service with independent payment, stock and delivery work. Which component is most useful first?",
            "answer": "Decomposition",
            "options": [
              "Selecting a new text colour",
              "Guessing the output without examining the inputs",
              "Decomposition"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Choose the computational-thinking component that addresses the stated problem.",
            "coverage": [
              {
                "focus": "CA1.1.17",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "An online order includes payment and shipping. Choose an appropriate separate subproblem.",
            "answer": "Validate payment",
            "options": [
              "Choose a decorative border",
              "Validate payment",
              "Do every operation in one indivisible step"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.8",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Which solution breakdown separates distinct reporting responsibilities?",
            "answer": "Read data, calculate statistics, format report",
            "options": [
              "Put every action into one unnamed block",
              "Repeat the entire solution in every module",
              "Read data, calculate statistics, format report"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Separate solution parts should have clear responsibilities and interfaces.",
            "coverage": [
              {
                "focus": "CA1.1.7",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Two imports fail only when names contain accented characters. What shared issue should be investigated?",
            "answer": "Text encoding",
            "options": [
              "All failures must have unrelated causes",
              "Text encoding",
              "All network requests are necessarily failing"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Use the conditions shared by failing examples to form a testable explanation.",
            "coverage": [
              {
                "focus": "CA1.1.12",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Which information is needed to calculate download duration?",
            "answer": "File size and transfer rate",
            "options": [
              "File size and transfer rate",
              "The colour of the application icon",
              "The developer's surname"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Keep information needed to calculate the requested output.",
            "coverage": [
              {
                "focus": "CA1.1.14",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Which is a key action in an abstraction of reserving a seat?",
            "answer": "Check whether the seat is available",
            "options": [
              "Choose a decorative font",
              "Animate the background",
              "Check whether the seat is available"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "A key action affects the process outcome.",
            "coverage": [
              {
                "focus": "CA1.1.15",
                "elements": [
                  "e"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Several services repeat the same validation logic. Which component is most useful for finding shared code?",
            "answer": "Pattern recognition",
            "options": [
              "Guessing the output without examining the inputs",
              "Pattern recognition",
              "Selecting a new text colour"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Choose the computational-thinking component that addresses the stated problem.",
            "coverage": [
              {
                "focus": "CA1.1.17",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "A report tool imports and summarises data. Choose a separate subproblem.",
            "answer": "Parse the input file",
            "options": [
              "Parse the input file",
              "Do every operation in one indivisible step",
              "Choose a decorative border"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.8",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 103,
    "focus": "CA1.1",
    "title": "CA1.1 \u00b7 Applying ideas 4",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA1.1.10",
      "CA1.1.16"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Which block breakdown separates a checkout into responsibilities?",
            "answer": "Input \u2192 pricing \u2192 payment",
            "options": [
              "Input \u2192 pricing \u2192 payment",
              "One block labelled everything",
              "A list of unrelated colours"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.10",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "0"
          },
          {
            "prompt": "A payment module needs a total from pricing. Which information-flow link belongs in the model?",
            "answer": "Pricing \u2192 total \u2192 payment",
            "options": [
              "Payment \u2192 keyboard colour \u2192 pricing",
              "Chart \u2192 staff birthdays \u2192 analysis",
              "Pricing \u2192 total \u2192 payment"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.10",
                "elements": [
                  "b"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "1"
          },
          {
            "prompt": "A flowchart has a payment-success decision. Which branch should lead to dispatch?",
            "answer": "Yes branch",
            "options": [
              "Delete the decision",
              "Yes branch",
              "Both branches must end in dispatch"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.10",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "2"
          },
          {
            "prompt": "Which function name represents a separate price-calculation responsibility?",
            "answer": "calculate_total",
            "options": [
              "calculate_total",
              "do_everything",
              "misc"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.10",
                "elements": [
                  "d"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "3"
          },
          {
            "prompt": "Which written decomposition gives clear reporting stages?",
            "answer": "Read records, calculate totals, display report",
            "options": [
              "Handle everything somehow",
              "Make it look good",
              "Read records, calculate totals, display report"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.10",
                "elements": [
                  "e"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "4"
          },
          {
            "prompt": "For shortest-route calculation, which detail should an abstraction omit?",
            "answer": "Shop-window colours",
            "options": [
              "The maximum loan allowance",
              "Shop-window colours",
              "Road distances"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.16",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Which block breakdown separates a reporting pipeline?",
            "answer": "Import \u2192 analyse \u2192 present",
            "options": [
              "One block labelled everything",
              "A list of unrelated colours",
              "Import \u2192 analyse \u2192 present"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.10",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "0"
          },
          {
            "prompt": "A chart module needs summary values from analysis. Which link belongs in the model?",
            "answer": "Analysis \u2192 summary \u2192 chart",
            "options": [
              "Chart \u2192 staff birthdays \u2192 analysis",
              "Analysis \u2192 summary \u2192 chart",
              "Payment \u2192 keyboard colour \u2192 pricing"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.10",
                "elements": [
                  "b"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "1"
          },
          {
            "prompt": "A stock-available decision precedes a rejection action. Which branch leads to rejection?",
            "answer": "No branch",
            "options": [
              "No branch",
              "Both branches must end in dispatch",
              "Delete the decision"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.10",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "2"
          },
          {
            "prompt": "Which function name represents a separate user-validation responsibility?",
            "answer": "validate_user",
            "options": [
              "do_everything",
              "misc",
              "validate_user"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.10",
                "elements": [
                  "d"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "3"
          },
          {
            "prompt": "Which written decomposition gives clear booking stages?",
            "answer": "Collect details, check availability, confirm booking",
            "options": [
              "Make it look good",
              "Collect details, check availability, confirm booking",
              "Handle everything somehow"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.10",
                "elements": [
                  "e"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "4"
          },
          {
            "prompt": "For loan eligibility, which detail should an abstraction omit?",
            "answer": "The catalogue page background",
            "options": [
              "The catalogue page background",
              "Road distances",
              "The maximum loan allowance"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.1.16",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 104,
    "focus": "CA1.2",
    "title": "CA1.2 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA1.2.1",
      "CA1.2.2",
      "CA1.2.3",
      "CA1.2.4",
      "CA1.2.5"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "What is the purpose of an algorithm for password checks?",
            "answer": "Specify a finite sequence of checks that produces a decision",
            "options": [
              "Specify a finite sequence of checks that produces a decision",
              "Describe only the visual appearance of the program",
              "Guarantee that no memory is needed"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "An algorithm specifies a process for solving a defined problem.",
            "coverage": [
              {
                "focus": "CA1.2.1",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "In a flowchart, what does an arrow from input to validation show?",
            "answer": "The direction of control flow",
            "options": [
              "The amount of memory used",
              "The data type of every variable",
              "The direction of control flow"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Arrows connect the sequence of actions and decisions.",
            "coverage": [
              {
                "focus": "CA1.2.2",
                "elements": [
                  "f"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "In code notation, what does if count > 0: represent?",
            "answer": "A conditional branch",
            "options": [
              "A comment ignored during execution",
              "A conditional branch",
              "A flowchart connector symbol"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Code uses executable language syntax to represent algorithm steps.",
            "coverage": [
              {
                "focus": "CA1.2.2",
                "elements": [
                  "i"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "A flowchart for many nested cases becomes crowded. What drawback is shown?",
            "answer": "Large algorithms can be awkward to draw and update",
            "options": [
              "Large algorithms can be awkward to draw and update",
              "Flowcharts cannot show decisions",
              "Flowcharts can only represent Python"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Complex diagrams can become difficult to maintain and read.",
            "coverage": [
              {
                "focus": "CA1.2.3",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Why use a short written description when discussing a process with a non-programmer?",
            "answer": "It can explain the process in familiar language",
            "options": [
              "Natural language can never be ambiguous",
              "Written descriptions automatically execute",
              "It can explain the process in familiar language"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Accessible prose can aid discussion, although precision still matters.",
            "coverage": [
              {
                "focus": "CA1.2.4",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "What advantage does executable code have when checking an algorithm?",
            "answer": "It can be run with test inputs",
            "options": [
              "Correct syntax proves the requirements are met",
              "It can be run with test inputs",
              "Code is always understandable without training"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "An implementation can be executed and measured.",
            "coverage": [
              {
                "focus": "CA1.2.5",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "What is the purpose of a sorting algorithm?",
            "answer": "Specify steps that put data into the required order",
            "options": [
              "Describe only the visual appearance of the program",
              "Guarantee that no memory is needed",
              "Specify steps that put data into the required order"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "An algorithm specifies a process for solving a defined problem.",
            "coverage": [
              {
                "focus": "CA1.2.1",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "What does an arrow returning to a loop condition show?",
            "answer": "Where execution continues after the loop body",
            "options": [
              "The data type of every variable",
              "Where execution continues after the loop body",
              "The amount of memory used"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Arrows connect the sequence of actions and decisions.",
            "coverage": [
              {
                "focus": "CA1.2.2",
                "elements": [
                  "f"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "In code notation, what does for item in items: represent?",
            "answer": "Iteration over items",
            "options": [
              "Iteration over items",
              "A flowchart connector symbol",
              "A comment ignored during execution"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Code uses executable language syntax to represent algorithm steps.",
            "coverage": [
              {
                "focus": "CA1.2.2",
                "elements": [
                  "i"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "A change requires moving many flowchart branches. What drawback is shown?",
            "answer": "Diagram maintenance can take considerable effort",
            "options": [
              "Flowcharts cannot show decisions",
              "Flowcharts can only represent Python",
              "Diagram maintenance can take considerable effort"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Complex diagrams can become difficult to maintain and read.",
            "coverage": [
              {
                "focus": "CA1.2.3",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Why use a written description during an early requirements meeting?",
            "answer": "It is quick to draft without learning notation symbols",
            "options": [
              "Written descriptions automatically execute",
              "It is quick to draft without learning notation symbols",
              "Natural language can never be ambiguous"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Accessible prose can aid discussion, although precision still matters.",
            "coverage": [
              {
                "focus": "CA1.2.4",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "What advantage does code give when measuring an implemented algorithm?",
            "answer": "Its actual execution can be timed",
            "options": [
              "Its actual execution can be timed",
              "Code is always understandable without training",
              "Correct syntax proves the requirements are met"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "An implementation can be executed and measured.",
            "coverage": [
              {
                "focus": "CA1.2.5",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 105,
    "focus": "CA1.2",
    "title": "CA1.2 \u00b7 Applying ideas 2",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA1.2.7",
      "CA1.2.8",
      "CA1.2.11",
      "CA1.2.12"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "An algorithm repeatedly divides a positive integer by ten using floor division until zero. What does its iteration count represent?",
            "answer": "The number of decimal digits",
            "options": [
              "The number of decimal digits",
              "Always reverses the original input",
              "Calculates the arithmetic mean"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Trace the repeated transformation to establish the overall purpose.",
            "coverage": [
              {
                "focus": "CA1.2.7",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Set total to 3, add 4, then double it. What is the output?",
            "answer": "14",
            "options": [
              "11",
              "6",
              "14"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Execute operations in their stated order.",
            "coverage": [
              {
                "focus": "CA1.2.8",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Translate \u201cincrease count by one\u201d into Python.",
            "answer": "count += 1",
            "options": [
              "total = price + quantity",
              "count += 1",
              "count == 1"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.2.11",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "2"
          },
          {
            "prompt": "Choose a valid sequence for calculating a mean.",
            "answer": "Read values, calculate sum and count, divide, display",
            "options": [
              "Read values, calculate sum and count, divide, display",
              "Display the result before calculating it",
              "Divide before reading any values"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.2.12",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "3"
          },
          {
            "prompt": "A discount applies at totals of at least 50. Which condition belongs in the design?",
            "answer": "total >= 50",
            "options": [
              "total < 50",
              "age > 5",
              "total >= 50"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.2.12",
                "elements": [
                  "b"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "4"
          },
          {
            "prompt": "Which design counts every successful record?",
            "answer": "Loop over records and increment only on success",
            "options": [
              "Never repeat input",
              "Loop over records and increment only on success",
              "Increment once regardless of input"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.2.12",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "An algorithm repeatedly removes the smallest remaining item into a result list. What does it do?",
            "answer": "Sorts into ascending order",
            "options": [
              "Always reverses the original input",
              "Calculates the arithmetic mean",
              "Sorts into ascending order"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Trace the repeated transformation to establish the overall purpose.",
            "coverage": [
              {
                "focus": "CA1.2.7",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Set total to 5, subtract 2, then triple it. What is the output?",
            "answer": "9",
            "options": [
              "6",
              "9",
              "11"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Execute operations in their stated order.",
            "coverage": [
              {
                "focus": "CA1.2.8",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Translate \u201cset total to price times quantity\u201d into Python.",
            "answer": "total = price * quantity",
            "options": [
              "total = price * quantity",
              "count == 1",
              "total = price + quantity"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.2.11",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "2"
          },
          {
            "prompt": "Choose a valid sequence for calculating a sale price.",
            "answer": "Read original price, calculate discount, subtract, display",
            "options": [
              "Display the result before calculating it",
              "Divide before reading any values",
              "Read original price, calculate discount, subtract, display"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.2.12",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "3"
          },
          {
            "prompt": "Free entry applies below age 5. Which condition belongs in the design?",
            "answer": "age < 5",
            "options": [
              "age > 5",
              "age < 5",
              "total < 50"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.2.12",
                "elements": [
                  "b"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "4"
          },
          {
            "prompt": "Which design keeps requesting a nonempty name?",
            "answer": "Repeat input while the name is empty",
            "options": [
              "Repeat input while the name is empty",
              "Increment once regardless of input",
              "Never repeat input"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA1.2.12",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 106,
    "focus": "CA1.3",
    "title": "CA1.3 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA1.3.2",
      "CA1.3.5",
      "CA1.3.6"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Why use top-down design for a new booking service with clear overall requirements?",
            "answer": "It breaks the overall goal into manageable subproblems",
            "options": [
              "It breaks the overall goal into manageable subproblems",
              "It requires every low-level component to exist already",
              "It removes the need to define interfaces"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Top-down design starts from the overall problem and refines it.",
            "coverage": [
              {
                "focus": "CA1.3.2",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "A top-down design assumes a device library supports a feature it lacks. What drawback is shown?",
            "answer": "Low-level feasibility may be discovered late",
            "options": [
              "Top-down design cannot use modules",
              "Top-down design never needs refinement",
              "Low-level feasibility may be discovered late"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "High-level design must still be checked against implementation constraints.",
            "coverage": [
              {
                "focus": "CA1.3.2",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Why use bottom-up design when tested payment and stock components already exist?",
            "answer": "It can reuse proven components",
            "options": [
              "It removes the need for integration",
              "It can reuse proven components",
              "It guarantees all overall requirements will emerge automatically"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Bottom-up design combines available or developed components into a larger solution.",
            "coverage": [
              {
                "focus": "CA1.3.2",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "A team combines existing components but misses a required refund process. What drawback is shown?",
            "answer": "Available components may not meet the overall requirements",
            "options": [
              "Available components may not meet the overall requirements",
              "Bottom-up design prevents testing components",
              "Bottom-up design requires no overall plan"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Working parts do not guarantee a suitable complete system.",
            "coverage": [
              {
                "focus": "CA1.3.2",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "A program has hundreds of tiny modules and complicated interfaces. What drawback is shown?",
            "answer": "Coordination and integration overhead",
            "options": [
              "Modules cannot be reused",
              "Modules must all be written in the same file",
              "Coordination and integration overhead"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Modularisation requires deliberate interface and dependency management.",
            "coverage": [
              {
                "focus": "CA1.3.2",
                "elements": [
                  "f"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "After approving a fix plan, the team changes the code and deploys it to a test environment. Which strategy step is this?",
            "answer": "Implement the solution",
            "options": [
              "Gather initial information",
              "Implement the solution",
              "Define the original problem"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Implementation puts the planned solution into effect.",
            "coverage": [
              {
                "focus": "CA1.3.5",
                "elements": [
                  "e"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "A fault involves unfamiliar payment security and exceeds the technician's authority. Which strategy is suitable?",
            "answer": "Escalate to an appropriate specialist",
            "options": [
              "Escalate to an appropriate specialist",
              "Close the issue without checking it",
              "Replace all hardware immediately"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Match the response to evidence, risk, expertise and authority.",
            "coverage": [
              {
                "focus": "CA1.3.6",
                "elements": [
                  "a",
                  "b"
                ]
              }
            ],
            "id": "6"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Why use top-down design to plan a new stock system?",
            "answer": "It keeps module responsibilities tied to the overall requirements",
            "options": [
              "It requires every low-level component to exist already",
              "It removes the need to define interfaces",
              "It keeps module responsibilities tied to the overall requirements"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Top-down design starts from the overall problem and refines it.",
            "coverage": [
              {
                "focus": "CA1.3.2",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "An overall design does not fit an existing reusable component. What drawback is shown?",
            "answer": "The design may overlook available component constraints",
            "options": [
              "Top-down design never needs refinement",
              "The design may overlook available component constraints",
              "Top-down design cannot use modules"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "High-level design must still be checked against implementation constraints.",
            "coverage": [
              {
                "focus": "CA1.3.2",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Why prototype device routines before combining a sensor system?",
            "answer": "It establishes working low-level building blocks",
            "options": [
              "It establishes working low-level building blocks",
              "It guarantees all overall requirements will emerge automatically",
              "It removes the need for integration"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Bottom-up design combines available or developed components into a larger solution.",
            "coverage": [
              {
                "focus": "CA1.3.2",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Components work separately but use incompatible interfaces. What drawback is shown?",
            "answer": "Integration may require significant adaptation",
            "options": [
              "Bottom-up design prevents testing components",
              "Bottom-up design requires no overall plan",
              "Integration may require significant adaptation"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Working parts do not guarantee a suitable complete system.",
            "coverage": [
              {
                "focus": "CA1.3.2",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Changing one shared module breaks several callers. What risk is shown?",
            "answer": "Dependencies can spread the impact of changes",
            "options": [
              "Modules must all be written in the same file",
              "Dependencies can spread the impact of changes",
              "Modules cannot be reused"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Modularisation requires deliberate interface and dependency management.",
            "coverage": [
              {
                "focus": "CA1.3.2",
                "elements": [
                  "f"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "After planning a replacement workflow, staff configure it and begin a trial. Which step is this?",
            "answer": "Implement the solution",
            "options": [
              "Implement the solution",
              "Define the original problem",
              "Gather initial information"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Implementation puts the planned solution into effect.",
            "coverage": [
              {
                "focus": "CA1.3.5",
                "elements": [
                  "e"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "A minor configuration fault has a tested documented fix and is within the technician's authority. Which strategy is suitable?",
            "answer": "Apply the documented fix and verify the result",
            "options": [
              "Close the issue without checking it",
              "Replace all hardware immediately",
              "Apply the documented fix and verify the result"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Match the response to evidence, risk, expertise and authority.",
            "coverage": [
              {
                "focus": "CA1.3.6",
                "elements": [
                  "a",
                  "b"
                ]
              }
            ],
            "id": "6"
          }
        ]
      }
    ]
  },
  {
    "slot": 107,
    "focus": "CA2.4",
    "title": "CA2.4 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.4.4",
      "CA2.4.7",
      "CA2.4.6"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "For x = 5 and y = 7, evaluate x <= y.",
            "answer": "True",
            "options": [
              "True",
              "False",
              "None"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Compare the two numeric values with the stated relational operator.",
            "coverage": [
              {
                "focus": "CA2.4.4",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "A mean is incorrectly calculated as total // count, losing fractional parts. Which replacement fixes it?",
            "answer": "total / count",
            "options": [
              "total % count",
              "value + 2",
              "total / count"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the arithmetic operation required by the intended calculation.",
            "coverage": [
              {
                "focus": "CA2.4.7",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Access needs BOTH a pass and an appointment. Replace pass_ok or booked.",
            "answer": "pass_ok and booked",
            "options": [
              "failed_a == failed_b",
              "pass_ok and booked",
              "not pass_ok"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "and requires both conditions; or requires at least one.",
            "coverage": [
              {
                "focus": "CA2.4.7",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Complete an expression for seconds in minutes.",
            "answer": "minutes * 60",
            "options": [
              "minutes * 60",
              "minutes + 60",
              "count / 4"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.4.6",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "3"
          },
          {
            "prompt": "Choose an expression testing whether balance is nonnegative.",
            "answer": "balance >= 0",
            "options": [
              "balance = 0",
              "guess = target",
              "balance >= 0"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.4.6",
                "elements": [
                  "b"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "4"
          },
          {
            "prompt": "Choose an expression requiring both flags.",
            "answer": "ready and valid",
            "options": [
              "cached == online",
              "ready and valid",
              "ready + valid"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.4.6",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "For x = 9 and y = 4, evaluate x != y.",
            "answer": "True",
            "options": [
              "False",
              "None",
              "True"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Compare the two numeric values with the stated relational operator.",
            "coverage": [
              {
                "focus": "CA2.4.4",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "A square is incorrectly calculated as value * 2. Which replacement fixes it?",
            "answer": "value ** 2",
            "options": [
              "value + 2",
              "value ** 2",
              "total % count"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the arithmetic operation required by the intended calculation.",
            "coverage": [
              {
                "focus": "CA2.4.7",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "An alert is needed if EITHER sensor fails. Replace failed_a and failed_b.",
            "answer": "failed_a or failed_b",
            "options": [
              "failed_a or failed_b",
              "not pass_ok",
              "failed_a == failed_b"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "and requires both conditions; or requires at least one.",
            "coverage": [
              {
                "focus": "CA2.4.7",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Complete an expression for the remainder when count is grouped in fours.",
            "answer": "count % 4",
            "options": [
              "minutes + 60",
              "count / 4",
              "count % 4"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.4.6",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "3"
          },
          {
            "prompt": "Choose an expression testing whether the guess differs from target.",
            "answer": "guess != target",
            "options": [
              "guess = target",
              "guess != target",
              "balance = 0"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.4.6",
                "elements": [
                  "b"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "4"
          },
          {
            "prompt": "Choose an expression requiring at least one flag.",
            "answer": "cached or online",
            "options": [
              "cached or online",
              "ready + valid",
              "cached == online"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.4.6",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 108,
    "focus": "CA2.5",
    "title": "CA2.5 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.5.1",
      "CA2.5.4",
      "CA2.5.3"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Which mode reads an existing text file without changing it?",
            "answer": "r",
            "options": [
              "r",
              "w",
              "x"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "r reads; a appends; w truncates an existing file; x creates a new file exclusively.",
            "coverage": [
              {
                "focus": "CA2.5.1",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Which code opens a text file for writing with automatic closing?",
            "answer": "with open(\"out.txt\", \"w\") as file:",
            "options": [
              "open = \"out.txt\"",
              "with \"in.txt\" as file:",
              "with open(\"out.txt\", \"w\") as file:"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.5.4",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "1"
          },
          {
            "id": "2",
            "prompt": "A user types 7 into input(). State the returned data type.",
            "answer": "string",
            "accepted": [
              "str"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.5.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "explanation": "input returns text, including when the characters look numeric.",
            "allowSentence": true
          },
          {
            "id": "3",
            "prompt": "State the displayed output of print(3 + 4).",
            "answer": "7",
            "accepted": [],
            "marks": 1,
            "kind": "number",
            "coverage": [
              {
                "focus": "CA2.5.3",
                "elements": [
                  "b"
                ]
              }
            ],
            "explanation": "The expression is evaluated before print displays its value.",
            "allowSentence": true
          },
          {
            "id": "4",
            "prompt": "Write one statement that displays the value of total.",
            "answer": "print(total)",
            "accepted": [],
            "marks": 1,
            "kind": "code",
            "coverage": [
              {
                "focus": "CA2.5.4",
                "elements": [
                  "b"
                ]
              }
            ],
            "explanation": "Pass the variable to print.",
            "allowSentence": true
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Which mode appends new records while retaining existing text?",
            "answer": "a",
            "options": [
              "w",
              "x",
              "a"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "r reads; a appends; w truncates an existing file; x creates a new file exclusively.",
            "coverage": [
              {
                "focus": "CA2.5.1",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Which code opens a text file for reading with automatic closing?",
            "answer": "with open(\"in.txt\", \"r\") as file:",
            "options": [
              "with \"in.txt\" as file:",
              "with open(\"in.txt\", \"r\") as file:",
              "open = \"out.txt\""
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.5.4",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "1"
          },
          {
            "id": "2",
            "prompt": "A user types 3.5 into input(). State the returned data type.",
            "answer": "string",
            "accepted": [
              "str"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.5.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "explanation": "input returns text, including when the characters look numeric.",
            "allowSentence": true
          },
          {
            "id": "3",
            "prompt": "State the displayed output of print(8 - 3).",
            "answer": "5",
            "accepted": [],
            "marks": 1,
            "kind": "number",
            "coverage": [
              {
                "focus": "CA2.5.3",
                "elements": [
                  "b"
                ]
              }
            ],
            "explanation": "The expression is evaluated before print displays its value.",
            "allowSentence": true
          },
          {
            "id": "4",
            "prompt": "Write one statement that displays the value of count.",
            "answer": "print(count)",
            "accepted": [],
            "marks": 1,
            "kind": "code",
            "coverage": [
              {
                "focus": "CA2.5.4",
                "elements": [
                  "b"
                ]
              }
            ],
            "explanation": "Pass the variable to print.",
            "allowSentence": true
          }
        ]
      }
    ]
  },
  {
    "slot": 109,
    "focus": "CA2.6",
    "title": "CA2.6 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.6.8",
      "CA2.6.7",
      "CA2.6.2"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Code prints total before assigning total = price * count. Which fix addresses the sequence error?",
            "answer": "Calculate total before printing it",
            "options": [
              "Calculate total before printing it",
              "Repeat the print statement twice",
              "Change every integer to a string"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "A value must be available before an action uses it.",
            "coverage": [
              {
                "focus": "CA2.6.8",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Choose the line that must precede print(total).",
            "answer": "total = price * count",
            "options": [
              "del total",
              "print(age)",
              "total = price * count"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.6.7",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "1"
          },
          {
            "prompt": "Choose the header for the fallback branch after if and elif.",
            "answer": "else:",
            "options": [
              "else if score >= 50:",
              "else:",
              "otherwise:"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.6.7",
                "elements": [
                  "b"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "2"
          },
          {
            "prompt": "Choose a loop header that processes every item.",
            "answer": "for item in items:",
            "options": [
              "for item in items:",
              "for item = items:",
              "repeat attempts > 0:"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.6.7",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "3"
          },
          {
            "id": "4",
            "prompt": "Name the Python construct that compares a subject against successive case patterns.",
            "answer": "match/case",
            "accepted": [
              "match case",
              "match"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.6.2",
                "elements": [
                  "d"
                ]
              }
            ],
            "explanation": "match selects a matching case pattern.",
            "allowSentence": true
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Code validates age before reading the user's age. Which fix addresses the sequence error?",
            "answer": "Read age before validating it",
            "options": [
              "Repeat the print statement twice",
              "Change every integer to a string",
              "Read age before validating it"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "A value must be available before an action uses it.",
            "coverage": [
              {
                "focus": "CA2.6.8",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Choose the line that must precede age = int(raw).",
            "answer": "raw = input(\"Age: \")",
            "options": [
              "print(age)",
              "raw = input(\"Age: \")",
              "del total"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.6.7",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "1"
          },
          {
            "prompt": "Choose the header for a second conditional test of score.",
            "answer": "elif score >= 50:",
            "options": [
              "elif score >= 50:",
              "otherwise:",
              "else if score >= 50:"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.6.7",
                "elements": [
                  "b"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "2"
          },
          {
            "prompt": "Choose a loop header that repeats while attempts remain.",
            "answer": "while attempts > 0:",
            "options": [
              "for item = items:",
              "repeat attempts > 0:",
              "while attempts > 0:"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.6.7",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "3"
          },
          {
            "id": "4",
            "prompt": "A Python 3.10 program handles menu values using case patterns. Name the construct that starts this selection.",
            "answer": "match",
            "accepted": [
              "match/case",
              "match case"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.6.2",
                "elements": [
                  "d"
                ]
              }
            ],
            "explanation": "match selects a matching case pattern.",
            "allowSentence": true
          }
        ]
      }
    ]
  },
  {
    "slot": 110,
    "focus": "CA2.7",
    "title": "CA2.7 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.7.2",
      "CA2.7.4",
      "CA2.7.5",
      "CA2.7.7"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Which task suits a procedure with no explicit returned result?",
            "answer": "Display a status message",
            "options": [
              "Display a status message",
              "Calculate a value that the caller must receive",
              "Return the index of a matching item"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "A procedure performs an action; Python implicitly returns None if no value is returned.",
            "coverage": [
              {
                "focus": "CA2.7.2",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "A library stops supporting the application's Python version. What drawback of pre-written code is shown?",
            "answer": "Dependency compatibility must be managed",
            "options": [
              "Pre-written code can never be tested",
              "All library code is necessarily insecure",
              "Dependency compatibility must be managed"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "External components bring dependencies and may not fit every requirement.",
            "coverage": [
              {
                "focus": "CA2.7.4",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "values = [3, 1, 2]; values.sort(). What is values[0] afterwards?",
            "answer": "1",
            "options": [
              "0",
              "1",
              "None"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "These list methods change the list in place.",
            "coverage": [
              {
                "focus": "CA2.7.5",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "len[items] raises an error. Which correction calls the built-in function?",
            "answer": "len(items)",
            "options": [
              "len(items)",
              "len = items",
              "round = price"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Functions are called using parentheses around arguments.",
            "coverage": [
              {
                "focus": "CA2.7.7",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "def greet(name): prints name. The caller writes greet with no parentheses. Which call displays Jo?",
            "answer": "greet(\"Jo\")",
            "options": [
              "print = \"Jo\"",
              "log = \"Ready\"",
              "greet(\"Jo\")"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "A user-written procedure must be called with parentheses and its required arguments.",
            "coverage": [
              {
                "focus": "CA2.7.7",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "4"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Which task suits a procedure with no explicit returned result?",
            "answer": "Write a log entry to a file",
            "options": [
              "Calculate a value that the caller must receive",
              "Return the index of a matching item",
              "Write a log entry to a file"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "A procedure performs an action; Python implicitly returns None if no value is returned.",
            "coverage": [
              {
                "focus": "CA2.7.2",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "A package's behaviour does not meet a special requirement. What drawback is shown?",
            "answer": "Adapting external code may be difficult",
            "options": [
              "All library code is necessarily insecure",
              "Adapting external code may be difficult",
              "Pre-written code can never be tested"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "External components bring dependencies and may not fit every requirement.",
            "coverage": [
              {
                "focus": "CA2.7.4",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "values = [4, 7]; values.append(9). What is len(values) afterwards?",
            "answer": "3",
            "options": [
              "3",
              "None",
              "0"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "These list methods change the list in place.",
            "coverage": [
              {
                "focus": "CA2.7.5",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "round[price, 2] is incorrect. Which correction calls the function?",
            "answer": "round(price, 2)",
            "options": [
              "len = items",
              "round = price",
              "round(price, 2)"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Functions are called using parentheses around arguments.",
            "coverage": [
              {
                "focus": "CA2.7.7",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "def log(message): prints message. The caller writes log[\"Ready\"]. Which correction calls it?",
            "answer": "log(\"Ready\")",
            "options": [
              "log = \"Ready\"",
              "log(\"Ready\")",
              "print = \"Jo\""
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "A user-written procedure must be called with parentheses and its required arguments.",
            "coverage": [
              {
                "focus": "CA2.7.7",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "4"
          }
        ]
      }
    ]
  },
  {
    "slot": 111,
    "focus": "CA2.7",
    "title": "CA2.7 \u00b7 Applying ideas 2",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.7.7",
      "CA2.7.6"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "items.append[3] fails. Which correction appends the number?",
            "answer": "items.append(3)",
            "options": [
              "items.append(3)",
              "items = 3",
              "items.reverse = True"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Use call syntax and argument types expected by the procedure.",
            "coverage": [
              {
                "focus": "CA2.7.7",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Complete the header for a function receiving a price.",
            "answer": "def discount(price):",
            "options": [
              "function discount(price)",
              "def distance = start, end",
              "def discount(price):"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.7.6",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "1"
          },
          {
            "prompt": "Call a built-in to find the number of records.",
            "answer": "len(records)",
            "options": [
              "readings.sum",
              "len(records)",
              "records.len"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.7.6",
                "elements": [
                  "b"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "2"
          },
          {
            "prompt": "Complete a body that displays message without an explicit return value.",
            "answer": "print(message)",
            "options": [
              "print(message)",
              "return message",
              "return item"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.7.6",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "3"
          },
          {
            "prompt": "Call the list method that reverses items in place.",
            "answer": "items.reverse()",
            "options": [
              "items = reversed",
              "items = clear",
              "items.reverse()"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.7.6",
                "elements": [
                  "d"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "4"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "items.sort(reverse = \"True\") uses text for a Boolean flag. Which call uses a Boolean?",
            "answer": "items.sort(reverse=True)",
            "options": [
              "items = 3",
              "items.reverse = True",
              "items.sort(reverse=True)"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Use call syntax and argument types expected by the procedure.",
            "coverage": [
              {
                "focus": "CA2.7.7",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Complete the header for a function receiving two endpoints.",
            "answer": "def distance(start, end):",
            "options": [
              "def distance = start, end",
              "def distance(start, end):",
              "function discount(price)"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.7.6",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "1"
          },
          {
            "prompt": "Call a built-in to total numeric readings.",
            "answer": "sum(readings)",
            "options": [
              "sum(readings)",
              "records.len",
              "readings.sum"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.7.6",
                "elements": [
                  "b"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "2"
          },
          {
            "prompt": "Complete a body that appends item to the supplied list.",
            "answer": "items.append(item)",
            "options": [
              "return message",
              "return item",
              "items.append(item)"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.7.6",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "3"
          },
          {
            "prompt": "Call the list method that clears items in place.",
            "answer": "items.clear()",
            "options": [
              "items = clear",
              "items.clear()",
              "items = reversed"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.7.6",
                "elements": [
                  "d"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "4"
          }
        ]
      }
    ]
  },
  {
    "slot": 112,
    "focus": "CA2.9",
    "title": "CA2.9 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.9.7",
      "CA2.9.4"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "A huge input file exceeds memory if read at once. Which approach best meets the storage constraint?",
            "answer": "Process one line at a time",
            "options": [
              "Process one line at a time",
              "Copy the entire input twice",
              "Save every intermediate result in an additional list"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Retain only the data required by the task.",
            "coverage": [
              {
                "focus": "CA2.9.7",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Millions of records must be found repeatedly by unique ID. Which structure best supports direct key lookup?",
            "answer": "Dictionary keyed by ID",
            "options": [
              "One unstructured text string containing all records",
              "A single Boolean variable",
              "Dictionary keyed by ID"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Choose data structures that support the required access patterns.",
            "coverage": [
              {
                "focus": "CA2.9.7",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "A total changes for each processed sale. What should store it?",
            "answer": "A variable updated during processing",
            "options": [
              "A comment containing the last value",
              "A variable updated during processing",
              "A different hard-coded constant for every possible result"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Changing state belongs in a variable with a clear purpose and suitable scope.",
            "coverage": [
              {
                "focus": "CA2.9.7",
                "elements": [
                  "f"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Which presentation change makes nested logic easier to inspect?",
            "answer": "Consistent indentation and meaningful names",
            "options": [
              "Consistent indentation and meaningful names",
              "Remove all whitespace",
              "Replace every name with one letter"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Presentation should make the structure and intent visible.",
            "coverage": [
              {
                "focus": "CA2.9.7",
                "elements": [
                  "h"
                ]
              }
            ],
            "id": "3"
          },
          {
            "id": "4",
            "prompt": "A loop recalculates the same fixed conversion factor for every reading. The calculation has no side effects. Why calculate it once before the loop?",
            "answer": "It avoids repeating an unchanged calculation",
            "accepted": [],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.9.4",
                "elements": [
                  "a"
                ]
              }
            ],
            "explanation": "Moving a safe, invariant calculation outside a loop avoids repeated work.",
            "allowSentence": true,
            "options": [
              "It changes the order of the readings",
              "It avoids repeating an unchanged calculation",
              "It removes the need to process each reading"
            ]
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "A calculation only needs a running total. Which approach avoids unnecessary storage?",
            "answer": "Update the total without retaining every intermediate value",
            "options": [
              "Copy the entire input twice",
              "Save every intermediate result in an additional list",
              "Update the total without retaining every intermediate value"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Retain only the data required by the task.",
            "coverage": [
              {
                "focus": "CA2.9.7",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "A grid requires row-and-column access in Python. Which structure is appropriate?",
            "answer": "A nested list",
            "options": [
              "A single Boolean variable",
              "A nested list",
              "One unstructured text string containing all records"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Choose data structures that support the required access patterns.",
            "coverage": [
              {
                "focus": "CA2.9.7",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "A counter increases for each successful login. What should store it?",
            "answer": "A variable initialised before counting",
            "options": [
              "A variable initialised before counting",
              "A different hard-coded constant for every possible result",
              "A comment containing the last value"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Changing state belongs in a variable with a clear purpose and suitable scope.",
            "coverage": [
              {
                "focus": "CA2.9.7",
                "elements": [
                  "f"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Which presentation change makes a complex expression easier to review?",
            "answer": "Break it across readable lines with suitable grouping",
            "options": [
              "Remove all whitespace",
              "Replace every name with one letter",
              "Break it across readable lines with suitable grouping"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Presentation should make the structure and intent visible.",
            "coverage": [
              {
                "focus": "CA2.9.7",
                "elements": [
                  "h"
                ]
              }
            ],
            "id": "3"
          },
          {
            "id": "4",
            "prompt": "A loop recalculates a fixed fee from constants for every invoice. The calculation has no side effects. Why calculate it once before the loop?",
            "answer": "Each iteration can reuse the calculated fee",
            "accepted": [],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.9.4",
                "elements": [
                  "a"
                ]
              }
            ],
            "explanation": "Moving a safe, invariant calculation outside a loop avoids repeated work.",
            "allowSentence": true,
            "options": [
              "Each iteration can reuse the calculated fee",
              "The fee will then change for every invoice",
              "The loop can skip reading invoice data"
            ]
          }
        ]
      }
    ]
  },
  {
    "slot": 113,
    "focus": "CA2.10",
    "title": "CA2.10 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.10.2",
      "CA2.10.3",
      "CA2.10.1"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "A failing boundary comparison has been located. What is the next debugging action?",
            "answer": "Correct the comparison and rerun relevant tests",
            "options": [
              "Correct the comparison and rerun relevant tests",
              "Delete the failing test to get a pass",
              "Change unrelated code at random"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Correct the identified cause and check both the fix and its effects.",
            "coverage": [
              {
                "focus": "CA2.10.2",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Why does fixing a crash on empty input improve robustness?",
            "answer": "The program can handle a previously failing input",
            "options": [
              "It proves no further defects exist",
              "It guarantees all user inputs are valid",
              "The program can handle a previously failing input"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Debugging improves robustness when it removes failures in normal and exceptional conditions.",
            "coverage": [
              {
                "focus": "CA2.10.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "1"
          },
          {
            "id": "2",
            "prompt": "A form reports only \u201cError\u201d when an age is outside 16\u201319. State the missing information that would help the user correct it.",
            "answer": "allowed age range",
            "accepted": [
              "permitted range",
              "valid range",
              "16 to 19",
              "the allowed range",
              "age must be 16 to 19"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.10.1",
                "elements": [
                  "c"
                ]
              }
            ],
            "explanation": "An error message should identify the failed input or resource and give enough information to correct it.",
            "allowSentence": true
          },
          {
            "id": "3",
            "prompt": "A traceback identifies line 8 as causing a crash. State the debugging task this supports.",
            "answer": "locating the error",
            "accepted": [
              "locating errors",
              "locate errors",
              "locate the error",
              "finding the error",
              "finding errors"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.10.2",
                "elements": [
                  "a"
                ]
              }
            ],
            "explanation": "Tracebacks and inspection help locate the fault before changing the code.",
            "allowSentence": true
          },
          {
            "id": "4",
            "prompt": "The specification requires age >= 16, but the code uses age > 16. State the replacement comparison operator.",
            "answer": ">=",
            "accepted": [],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.10.2",
                "elements": [
                  "b"
                ]
              }
            ],
            "explanation": "Correct the operator to include the required boundary, then retest it.",
            "allowSentence": true,
            "caseSensitive": true,
            "coverageMode": "practice"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "An incorrect loop update has been located. What should the developer do?",
            "answer": "Repair the update and verify the affected behaviour",
            "options": [
              "Delete the failing test to get a pass",
              "Change unrelated code at random",
              "Repair the update and verify the affected behaviour"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Correct the identified cause and check both the fix and its effects.",
            "coverage": [
              {
                "focus": "CA2.10.2",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Why does fixing cleanup after a file error improve robustness?",
            "answer": "The program can recover from an unexpected failure",
            "options": [
              "It guarantees all user inputs are valid",
              "The program can recover from an unexpected failure",
              "It proves no further defects exist"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Debugging improves robustness when it removes failures in normal and exceptional conditions.",
            "coverage": [
              {
                "focus": "CA2.10.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "1"
          },
          {
            "id": "2",
            "prompt": "A file-opening error reports only \u201cFailed\u201d. State one detail that would help the user identify the missing file.",
            "answer": "file name",
            "accepted": [
              "filename",
              "file path",
              "path",
              "name of the file"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.10.1",
                "elements": [
                  "c"
                ]
              }
            ],
            "explanation": "An error message should identify the failed input or resource and give enough information to correct it.",
            "allowSentence": true
          },
          {
            "id": "3",
            "prompt": "A breakpoint and variable inspection identify the first wrong calculation. State the debugging task this supports.",
            "answer": "locating the error",
            "accepted": [
              "locating errors",
              "locate errors",
              "locate the error",
              "finding the error",
              "finding errors"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.10.2",
                "elements": [
                  "a"
                ]
              }
            ],
            "explanation": "Tracebacks and inspection help locate the fault before changing the code.",
            "allowSentence": true
          },
          {
            "id": "4",
            "prompt": "The specification requires count <= 10, but the code uses count < 10. State the replacement comparison operator.",
            "answer": "<=",
            "accepted": [],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.10.2",
                "elements": [
                  "b"
                ]
              }
            ],
            "explanation": "Correct the operator to include the required boundary, then retest it.",
            "allowSentence": true,
            "caseSensitive": true,
            "coverageMode": "practice"
          }
        ]
      }
    ]
  },
  {
    "slot": 114,
    "focus": "CA2.11",
    "title": "CA2.11 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.11.2",
      "CA2.11.3"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "What does a left-to-right ascending bubble-sort pass do?",
            "answer": "Compare adjacent items and swap out-of-order pairs",
            "options": [
              "Compare adjacent items and swap out-of-order pairs",
              "The whole list must be sorted",
              "The first item must be the smallest"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Each adjacent comparison moves a larger value towards the end.",
            "coverage": [
              {
                "focus": "CA2.11.2",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "When can bubble sort be a reasonable simple choice?",
            "answer": "A very small list where simplicity matters more than speed",
            "options": [
              "A huge randomly ordered dataset needing fast sorting",
              "A dataset too large to fit in the available memory",
              "A very small list where simplicity matters more than speed"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Bubble sort is simple but usually unsuitable for large inputs.",
            "coverage": [
              {
                "focus": "CA2.11.2",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "How does insertion sort grow a sorted prefix?",
            "answer": "Insert the next item in its correct place, shifting larger items",
            "options": [
              "Split into two halves and recursively merge them",
              "Insert the next item in its correct place, shifting larger items",
              "Always swap only the first and last items"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Insertion sort shifts larger prefix items to make space for the next item.",
            "coverage": [
              {
                "focus": "CA2.11.2",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Why use linear search on a small unsorted list?",
            "answer": "It does not require sorting first",
            "options": [
              "It does not require sorting first",
              "It always takes one comparison",
              "It requires random access to the midpoint"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Linear search works by checking items one at a time.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "What drawback appears when a missing item is sought in a large list using linear search?",
            "answer": "Every item may need checking",
            "options": [
              "The input must first be sorted",
              "The search can only handle integers",
              "Every item may need checking"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Linear-search work can grow with the full list length.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Why use binary search for repeated lookups in a large sorted array?",
            "answer": "Each comparison can discard about half the remaining range",
            "options": [
              "It must compare every item",
              "Each comparison can discard about half the remaining range",
              "It works on every unsorted list without preparation"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Binary search repeatedly halves an ordered search range.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Which benefit applies to an in-place bubble sort?",
            "answer": "It needs little additional storage",
            "options": [
              "It needs little additional storage",
              "It is always the fastest sorting method",
              "It requires a second full-size result array"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Bubble sort can use constant extra storage and an early-exit check.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "e"
                ]
              }
            ],
            "id": "6"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "After one ascending bubble-sort pass through the whole list, what is guaranteed?",
            "answer": "A largest item is at the end",
            "options": [
              "The whole list must be sorted",
              "The first item must be the smallest",
              "A largest item is at the end"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Each adjacent comparison moves a larger value towards the end.",
            "coverage": [
              {
                "focus": "CA2.11.2",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "An optimised bubble sort stops after a no-swap pass. Which input benefits most?",
            "answer": "An already sorted small list",
            "options": [
              "A dataset too large to fit in the available memory",
              "An already sorted small list",
              "A huge randomly ordered dataset needing fast sorting"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Bubble sort is simple but usually unsuitable for large inputs.",
            "coverage": [
              {
                "focus": "CA2.11.2",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "In [2, 6, 8, 4], inserting 4 into the sorted prefix shifts which items?",
            "answer": "6 and 8",
            "options": [
              "6 and 8",
              "Always swap only the first and last items",
              "Split into two halves and recursively merge them"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Insertion sort shifts larger prefix items to make space for the next item.",
            "coverage": [
              {
                "focus": "CA2.11.2",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Why can linear search be useful on a sequential stream?",
            "answer": "It examines items in their available order",
            "options": [
              "It always takes one comparison",
              "It requires random access to the midpoint",
              "It examines items in their available order"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Linear search works by checking items one at a time.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "What happens when the target is at the end of a large linear-search list?",
            "answer": "Many comparisons are required",
            "options": [
              "The search can only handle integers",
              "Many comparisons are required",
              "The input must first be sorted"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Linear-search work can grow with the full list length.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Why does binary search scale better than a full scan on a sorted random-access list?",
            "answer": "Few midpoint comparisons are needed as the list grows",
            "options": [
              "Few midpoint comparisons are needed as the list grows",
              "It works on every unsorted list without preparation",
              "It must compare every item"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Binary search repeatedly halves an ordered search range.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Which benefit can a no-swap flag give bubble sort?",
            "answer": "It can finish early when the list is already sorted",
            "options": [
              "It is always the fastest sorting method",
              "It requires a second full-size result array",
              "It can finish early when the list is already sorted"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Bubble sort can use constant extra storage and an early-exit check.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "e"
                ]
              }
            ],
            "id": "6"
          }
        ]
      }
    ]
  },
  {
    "slot": 115,
    "focus": "CA2.11",
    "title": "CA2.11 \u00b7 Applying ideas 2",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.11.3",
      "CA2.11.5"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Why avoid bubble sort for a large reverse-sorted list?",
            "answer": "It needs many passes and adjacent swaps",
            "options": [
              "It needs many passes and adjacent swaps",
              "It cannot sort negative numbers",
              "It necessarily loses duplicate values"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Storage efficiency does not imply execution-time efficiency.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "f"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Why use insertion sort on a nearly sorted small list?",
            "answer": "Few items need shifting",
            "options": [
              "It never performs comparisons",
              "It requires a full-size copy of the list",
              "Few items need shifting"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Insertion sort benefits from an already ordered prefix and limited disorder.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "g"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "What makes insertion sort slow on a large reverse-sorted list?",
            "answer": "Each new item may shift most of the sorted prefix",
            "options": [
              "It cannot handle already sorted data",
              "Each new item may shift most of the sorted prefix",
              "It requires all items to be distinct"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Moving many earlier items creates substantial work.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "h"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Why choose merge sort for a large randomly ordered list?",
            "answer": "It has predictable efficient splitting and merging",
            "options": [
              "It has predictable efficient splitting and merging",
              "It never needs temporary storage",
              "It avoids all comparisons"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Merge sort combines ordered runs efficiently, including sequentially accessed runs.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "i"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "What storage drawback applies to a typical array merge sort?",
            "answer": "It uses additional arrays or a merge buffer",
            "options": [
              "It cannot sort duplicate values",
              "It only works on reverse-sorted input",
              "It uses additional arrays or a merge buffer"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Typical array implementations trade additional storage for efficient merging.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "j"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "A successful linear search is equally likely to find its target at any position in a list of 9 distinct items. What is the average comparison count?",
            "answer": "5",
            "options": [
              "19",
              "5",
              "1"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Average the position counts 1 through n: (n + 1) / 2.",
            "coverage": [
              {
                "focus": "CA2.11.5",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "What drawback remains even if bubble sort uses little extra memory?",
            "answer": "It can still take a long time on large inputs",
            "options": [
              "It cannot sort negative numbers",
              "It necessarily loses duplicate values",
              "It can still take a long time on large inputs"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Storage efficiency does not imply execution-time efficiency.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "f"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Why use insertion sort when items arrive one at a time into a small sorted list?",
            "answer": "Each new item can be inserted into the existing order",
            "options": [
              "It requires a full-size copy of the list",
              "Each new item can be inserted into the existing order",
              "It never performs comparisons"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Insertion sort benefits from an already ordered prefix and limited disorder.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "g"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "What drawback occurs when inserting a new smallest item into a long array?",
            "answer": "Many items need moving one position",
            "options": [
              "Many items need moving one position",
              "It requires all items to be distinct",
              "It cannot handle already sorted data"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Moving many earlier items creates substantial work.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "h"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Why is merge sort suitable for large externally stored sorted runs?",
            "answer": "The runs can be merged sequentially",
            "options": [
              "It never needs temporary storage",
              "It avoids all comparisons",
              "The runs can be merged sequentially"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Merge sort combines ordered runs efficiently, including sequentially accessed runs.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "i"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Why might merge sort be unsuitable when spare memory is very limited?",
            "answer": "Its temporary merge storage can be substantial",
            "options": [
              "It only works on reverse-sorted input",
              "Its temporary merge storage can be substantial",
              "It cannot sort duplicate values"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Typical array implementations trade additional storage for efficient merging.",
            "coverage": [
              {
                "focus": "CA2.11.3",
                "elements": [
                  "j"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "The same assumptions apply to 19 items. What is the average comparison count?",
            "answer": "10",
            "options": [
              "10",
              "1",
              "19"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Average the position counts 1 through n: (n + 1) / 2.",
            "coverage": [
              {
                "focus": "CA2.11.5",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 116,
    "focus": "CA2.12",
    "title": "CA2.12 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.12.4.1",
      "CA2.12.4.3",
      "CA2.12.2.1"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "An integer quantity field receives the text \"many\". Which test-data description applies?",
            "answer": "Erroneous data of the wrong type",
            "options": [
              "Erroneous data of the wrong type",
              "Valid normal numeric data",
              "A valid boundary value"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Erroneous data is unsuitable for the intended input; here the type is wrong.",
            "coverage": [
              {
                "focus": "CA2.12.4.1",
                "elements": [
                  "g"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Before writing expected results, a tester lists behaviours and requirements to check. Which planning step is this?",
            "answer": "Identify tests",
            "options": [
              "Record actual outputs from completed tests",
              "Declare every test passed",
              "Identify tests"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Identify what needs testing before specifying and running individual cases.",
            "coverage": [
              {
                "focus": "CA2.12.4.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Using concept testing, a team sketches an unbuilt booking idea. Why is this method appropriate?",
            "answer": "Check whether the idea is feasible before full development",
            "options": [
              "It replaces the need to define expected results",
              "Check whether the idea is feasible before full development",
              "It proves the entire program contains no defects"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Concept testing: check whether the idea is feasible before full development. Avoid investing heavily in an unsuitable idea. Limitation: an early prototype may not reflect the finished system.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Using concept testing, a team sketches an unbuilt booking idea. What is a benefit of this method?",
            "answer": "Avoid investing heavily in an unsuitable idea",
            "options": [
              "Avoid investing heavily in an unsuitable idea",
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Concept testing: check whether the idea is feasible before full development. Avoid investing heavily in an unsuitable idea. Limitation: an early prototype may not reflect the finished system.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Using concept testing, a team sketches an unbuilt booking idea. What is a limitation of this method?",
            "answer": "An early prototype may not reflect the finished system",
            "options": [
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect",
              "An early prototype may not reflect the finished system"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Concept testing: check whether the idea is feasible before full development. Avoid investing heavily in an unsuitable idea. Limitation: an early prototype may not reflect the finished system.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Using unit testing, a developer checks a price function in isolation. Why is this method appropriate?",
            "answer": "Check a small component independently",
            "options": [
              "It replaces the need to define expected results",
              "Check a small component independently",
              "It proves the entire program contains no defects"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Unit testing: check a small component independently. Faults can be localised to a small component. Limitation: passing isolated checks does not prove components work together.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "f"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Using unit testing, a developer checks a price function in isolation. What is a benefit of this method?",
            "answer": "Faults can be localised to a small component",
            "options": [
              "Faults can be localised to a small component",
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Unit testing: check a small component independently. Faults can be localised to a small component. Limitation: passing isolated checks does not prove components work together.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "g"
                ]
              }
            ],
            "id": "6"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "A numeric temperature field receives \"warm\". Which test-data description applies?",
            "answer": "Erroneous data of the wrong type",
            "options": [
              "Valid normal numeric data",
              "A valid boundary value",
              "Erroneous data of the wrong type"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Erroneous data is unsuitable for the intended input; here the type is wrong.",
            "coverage": [
              {
                "focus": "CA2.12.4.1",
                "elements": [
                  "g"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "A tester maps each acceptance criterion to a check. Which planning step is this?",
            "answer": "Identify tests",
            "options": [
              "Declare every test passed",
              "Identify tests",
              "Record actual outputs from completed tests"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Identify what needs testing before specifying and running individual cases.",
            "coverage": [
              {
                "focus": "CA2.12.4.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Using concept testing, a team prototypes a proposed stock workflow. Why is this method appropriate?",
            "answer": "Check whether the idea is feasible before full development",
            "options": [
              "Check whether the idea is feasible before full development",
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Concept testing: check whether the idea is feasible before full development. Avoid investing heavily in an unsuitable idea. Limitation: an early prototype may not reflect the finished system.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Using concept testing, a team prototypes a proposed stock workflow. What is a benefit of this method?",
            "answer": "Avoid investing heavily in an unsuitable idea",
            "options": [
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method",
              "Avoid investing heavily in an unsuitable idea"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Concept testing: check whether the idea is feasible before full development. Avoid investing heavily in an unsuitable idea. Limitation: an early prototype may not reflect the finished system.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Using concept testing, a team prototypes a proposed stock workflow. What is a limitation of this method?",
            "answer": "An early prototype may not reflect the finished system",
            "options": [
              "It cannot reveal any software defect",
              "An early prototype may not reflect the finished system",
              "It makes it impossible to record actual results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Concept testing: check whether the idea is feasible before full development. Avoid investing heavily in an unsuitable idea. Limitation: an early prototype may not reflect the finished system.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Using unit testing, a developer checks a date parser in isolation. Why is this method appropriate?",
            "answer": "Check a small component independently",
            "options": [
              "Check a small component independently",
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Unit testing: check a small component independently. Faults can be localised to a small component. Limitation: passing isolated checks does not prove components work together.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "f"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Using unit testing, a developer checks a date parser in isolation. What is a benefit of this method?",
            "answer": "Faults can be localised to a small component",
            "options": [
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method",
              "Faults can be localised to a small component"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Unit testing: check a small component independently. Faults can be localised to a small component. Limitation: passing isolated checks does not prove components work together.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "g"
                ]
              }
            ],
            "id": "6"
          }
        ]
      }
    ]
  },
  {
    "slot": 117,
    "focus": "CA2.12",
    "title": "CA2.12 \u00b7 Applying ideas 2",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.12.2.1"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Using unit testing, a developer checks a price function in isolation. What is a limitation of this method?",
            "answer": "Passing isolated checks does not prove components work together",
            "options": [
              "Passing isolated checks does not prove components work together",
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Unit testing: check a small component independently. Faults can be localised to a small component. Limitation: passing isolated checks does not prove components work together.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "h"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Using boundary testing, an age rule accepts 16 through 65. Why is this method appropriate?",
            "answer": "Check values at and immediately around limits",
            "options": [
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results",
              "Check values at and immediately around limits"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Boundary testing: check values at and immediately around limits. Off-by-one comparison errors can be exposed. Limitation: boundary cases do not cover every interior input.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "j"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Using boundary testing, an age rule accepts 16 through 65. What is a benefit of this method?",
            "answer": "Off-by-one comparison errors can be exposed",
            "options": [
              "It removes the need for every other test method",
              "Off-by-one comparison errors can be exposed",
              "It guarantees all possible inputs have been checked"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Boundary testing: check values at and immediately around limits. Off-by-one comparison errors can be exposed. Limitation: boundary cases do not cover every interior input.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "k"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Using boundary testing, an age rule accepts 16 through 65. What is a limitation of this method?",
            "answer": "Boundary cases do not cover every interior input",
            "options": [
              "Boundary cases do not cover every interior input",
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Boundary testing: check values at and immediately around limits. Off-by-one comparison errors can be exposed. Limitation: boundary cases do not cover every interior input.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "l"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Using integration testing, a checkout calls a payment service. Why is this method appropriate?",
            "answer": "Check interactions between connected components",
            "options": [
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results",
              "Check interactions between connected components"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Integration testing: check interactions between connected components. Interface and data-transfer faults can be exposed. Limitation: diagnosing a failure can involve several components.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "n"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Using integration testing, a checkout calls a payment service. What is a benefit of this method?",
            "answer": "Interface and data-transfer faults can be exposed",
            "options": [
              "It removes the need for every other test method",
              "Interface and data-transfer faults can be exposed",
              "It guarantees all possible inputs have been checked"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Integration testing: check interactions between connected components. Interface and data-transfer faults can be exposed. Limitation: diagnosing a failure can involve several components.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "o"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Using integration testing, a checkout calls a payment service. What is a limitation of this method?",
            "answer": "Diagnosing a failure can involve several components",
            "options": [
              "Diagnosing a failure can involve several components",
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Integration testing: check interactions between connected components. Interface and data-transfer faults can be exposed. Limitation: diagnosing a failure can involve several components.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "p"
                ]
              }
            ],
            "id": "6"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Using unit testing, a developer checks a date parser in isolation. What is a limitation of this method?",
            "answer": "Passing isolated checks does not prove components work together",
            "options": [
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect",
              "Passing isolated checks does not prove components work together"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Unit testing: check a small component independently. Faults can be localised to a small component. Limitation: passing isolated checks does not prove components work together.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "h"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Using boundary testing, a quantity rule accepts 1 through 99. Why is this method appropriate?",
            "answer": "Check values at and immediately around limits",
            "options": [
              "It replaces the need to define expected results",
              "Check values at and immediately around limits",
              "It proves the entire program contains no defects"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Boundary testing: check values at and immediately around limits. Off-by-one comparison errors can be exposed. Limitation: boundary cases do not cover every interior input.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "j"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Using boundary testing, a quantity rule accepts 1 through 99. What is a benefit of this method?",
            "answer": "Off-by-one comparison errors can be exposed",
            "options": [
              "Off-by-one comparison errors can be exposed",
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Boundary testing: check values at and immediately around limits. Off-by-one comparison errors can be exposed. Limitation: boundary cases do not cover every interior input.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "k"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Using boundary testing, a quantity rule accepts 1 through 99. What is a limitation of this method?",
            "answer": "Boundary cases do not cover every interior input",
            "options": [
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect",
              "Boundary cases do not cover every interior input"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Boundary testing: check values at and immediately around limits. Off-by-one comparison errors can be exposed. Limitation: boundary cases do not cover every interior input.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "l"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Using integration testing, a report module consumes an import module output. Why is this method appropriate?",
            "answer": "Check interactions between connected components",
            "options": [
              "It replaces the need to define expected results",
              "Check interactions between connected components",
              "It proves the entire program contains no defects"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Integration testing: check interactions between connected components. Interface and data-transfer faults can be exposed. Limitation: diagnosing a failure can involve several components.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "n"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Using integration testing, a report module consumes an import module output. What is a benefit of this method?",
            "answer": "Interface and data-transfer faults can be exposed",
            "options": [
              "Interface and data-transfer faults can be exposed",
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Integration testing: check interactions between connected components. Interface and data-transfer faults can be exposed. Limitation: diagnosing a failure can involve several components.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "o"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Using integration testing, a report module consumes an import module output. What is a limitation of this method?",
            "answer": "Diagnosing a failure can involve several components",
            "options": [
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect",
              "Diagnosing a failure can involve several components"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Integration testing: check interactions between connected components. Interface and data-transfer faults can be exposed. Limitation: diagnosing a failure can involve several components.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "p"
                ]
              }
            ],
            "id": "6"
          }
        ]
      }
    ]
  },
  {
    "slot": 118,
    "focus": "CA2.12",
    "title": "CA2.12 \u00b7 Applying ideas 3",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.12.2.1"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Using performance testing, a search must respond within one second. Why is this method appropriate?",
            "answer": "Measure speed and resource use against targets",
            "options": [
              "Measure speed and resource use against targets",
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Performance testing: measure speed and resource use against targets. Slow operations and bottlenecks can be identified. Limitation: unrealistic test conditions can misrepresent production performance.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "r"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Using performance testing, a search must respond within one second. What is a benefit of this method?",
            "answer": "Slow operations and bottlenecks can be identified",
            "options": [
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method",
              "Slow operations and bottlenecks can be identified"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Performance testing: measure speed and resource use against targets. Slow operations and bottlenecks can be identified. Limitation: unrealistic test conditions can misrepresent production performance.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "s"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Using performance testing, a search must respond within one second. What is a limitation of this method?",
            "answer": "Unrealistic test conditions can misrepresent production performance",
            "options": [
              "It cannot reveal any software defect",
              "Unrealistic test conditions can misrepresent production performance",
              "It makes it impossible to record actual results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Performance testing: measure speed and resource use against targets. Slow operations and bottlenecks can be identified. Limitation: unrealistic test conditions can misrepresent production performance.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "t"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Using system testing, a complete booking application is ready. Why is this method appropriate?",
            "answer": "Check the complete system against its specification",
            "options": [
              "Check the complete system against its specification",
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "System testing: check the complete system against its specification. End-to-end behaviour can be checked. Limitation: a full realistic environment can be expensive to maintain.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "v"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Using system testing, a complete booking application is ready. What is a benefit of this method?",
            "answer": "End-to-end behaviour can be checked",
            "options": [
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method",
              "End-to-end behaviour can be checked"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "System testing: check the complete system against its specification. End-to-end behaviour can be checked. Limitation: a full realistic environment can be expensive to maintain.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "w"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Using system testing, a complete booking application is ready. What is a limitation of this method?",
            "answer": "A full realistic environment can be expensive to maintain",
            "options": [
              "It cannot reveal any software defect",
              "A full realistic environment can be expensive to maintain",
              "It makes it impossible to record actual results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "System testing: check the complete system against its specification. End-to-end behaviour can be checked. Limitation: a full realistic environment can be expensive to maintain.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "x"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Using acceptance testing, a client checks an application before signing it off. Why is this method appropriate?",
            "answer": "Check whether the delivered system meets agreed user needs",
            "options": [
              "Check whether the delivered system meets agreed user needs",
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Acceptance testing: check whether the delivered system meets agreed user needs. The customer can confirm business suitability. Limitation: limited user scenarios may miss technical defects.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "z"
                ]
              }
            ],
            "id": "6"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Using performance testing, a report must finish within thirty seconds. Why is this method appropriate?",
            "answer": "Measure speed and resource use against targets",
            "options": [
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results",
              "Measure speed and resource use against targets"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Performance testing: measure speed and resource use against targets. Slow operations and bottlenecks can be identified. Limitation: unrealistic test conditions can misrepresent production performance.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "r"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Using performance testing, a report must finish within thirty seconds. What is a benefit of this method?",
            "answer": "Slow operations and bottlenecks can be identified",
            "options": [
              "It removes the need for every other test method",
              "Slow operations and bottlenecks can be identified",
              "It guarantees all possible inputs have been checked"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Performance testing: measure speed and resource use against targets. Slow operations and bottlenecks can be identified. Limitation: unrealistic test conditions can misrepresent production performance.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "s"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Using performance testing, a report must finish within thirty seconds. What is a limitation of this method?",
            "answer": "Unrealistic test conditions can misrepresent production performance",
            "options": [
              "Unrealistic test conditions can misrepresent production performance",
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Performance testing: measure speed and resource use against targets. Slow operations and bottlenecks can be identified. Limitation: unrealistic test conditions can misrepresent production performance.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "t"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Using system testing, a complete inventory application is ready. Why is this method appropriate?",
            "answer": "Check the complete system against its specification",
            "options": [
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results",
              "Check the complete system against its specification"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "System testing: check the complete system against its specification. End-to-end behaviour can be checked. Limitation: a full realistic environment can be expensive to maintain.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "v"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Using system testing, a complete inventory application is ready. What is a benefit of this method?",
            "answer": "End-to-end behaviour can be checked",
            "options": [
              "It removes the need for every other test method",
              "End-to-end behaviour can be checked",
              "It guarantees all possible inputs have been checked"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "System testing: check the complete system against its specification. End-to-end behaviour can be checked. Limitation: a full realistic environment can be expensive to maintain.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "w"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Using system testing, a complete inventory application is ready. What is a limitation of this method?",
            "answer": "A full realistic environment can be expensive to maintain",
            "options": [
              "A full realistic environment can be expensive to maintain",
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "System testing: check the complete system against its specification. End-to-end behaviour can be checked. Limitation: a full realistic environment can be expensive to maintain.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "x"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Using acceptance testing, staff check a replacement system against agreed business criteria. Why is this method appropriate?",
            "answer": "Check whether the delivered system meets agreed user needs",
            "options": [
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results",
              "Check whether the delivered system meets agreed user needs"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Acceptance testing: check whether the delivered system meets agreed user needs. The customer can confirm business suitability. Limitation: limited user scenarios may miss technical defects.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "z"
                ]
              }
            ],
            "id": "6"
          }
        ]
      }
    ]
  },
  {
    "slot": 119,
    "focus": "CA2.12",
    "title": "CA2.12 \u00b7 Applying ideas 4",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.12.2.1"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Using acceptance testing, a client checks an application before signing it off. What is a benefit of this method?",
            "answer": "The customer can confirm business suitability",
            "options": [
              "The customer can confirm business suitability",
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Acceptance testing: check whether the delivered system meets agreed user needs. The customer can confirm business suitability. Limitation: limited user scenarios may miss technical defects.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "aa"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Using acceptance testing, a client checks an application before signing it off. What is a limitation of this method?",
            "answer": "Limited user scenarios may miss technical defects",
            "options": [
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect",
              "Limited user scenarios may miss technical defects"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Acceptance testing: check whether the delivered system meets agreed user needs. The customer can confirm business suitability. Limitation: limited user scenarios may miss technical defects.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ab"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Using usability testing, new users try completing an unfamiliar checkout. Why is this method appropriate?",
            "answer": "Observe how easily intended users complete tasks",
            "options": [
              "It replaces the need to define expected results",
              "Observe how easily intended users complete tasks",
              "It proves the entire program contains no defects"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Usability testing: observe how easily intended users complete tasks. Confusing interaction and navigation can be identified. Limitation: a small or unrepresentative user sample can mislead.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ad"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Using usability testing, new users try completing an unfamiliar checkout. What is a benefit of this method?",
            "answer": "Confusing interaction and navigation can be identified",
            "options": [
              "Confusing interaction and navigation can be identified",
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Usability testing: observe how easily intended users complete tasks. Confusing interaction and navigation can be identified. Limitation: a small or unrepresentative user sample can mislead.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ae"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Using usability testing, new users try completing an unfamiliar checkout. What is a limitation of this method?",
            "answer": "A small or unrepresentative user sample can mislead",
            "options": [
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect",
              "A small or unrepresentative user sample can mislead"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Usability testing: observe how easily intended users complete tasks. Confusing interaction and navigation can be identified. Limitation: a small or unrepresentative user sample can mislead.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "af"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Using regression testing, a tax-rule change is made to a working checkout. Why is this method appropriate?",
            "answer": "Rerun checks for previously working behaviour after a change",
            "options": [
              "It replaces the need to define expected results",
              "Rerun checks for previously working behaviour after a change",
              "It proves the entire program contains no defects"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Regression testing: rerun checks for previously working behaviour after a change. Unintended effects of changes can be detected. Limitation: large test suites take effort to maintain.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ah"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Using regression testing, a tax-rule change is made to a working checkout. What is a benefit of this method?",
            "answer": "Unintended effects of changes can be detected",
            "options": [
              "Unintended effects of changes can be detected",
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Regression testing: rerun checks for previously working behaviour after a change. Unintended effects of changes can be detected. Limitation: large test suites take effort to maintain.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ai"
                ]
              }
            ],
            "id": "6"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Using acceptance testing, staff check a replacement system against agreed business criteria. What is a benefit of this method?",
            "answer": "The customer can confirm business suitability",
            "options": [
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method",
              "The customer can confirm business suitability"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Acceptance testing: check whether the delivered system meets agreed user needs. The customer can confirm business suitability. Limitation: limited user scenarios may miss technical defects.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "aa"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Using acceptance testing, staff check a replacement system against agreed business criteria. What is a limitation of this method?",
            "answer": "Limited user scenarios may miss technical defects",
            "options": [
              "It cannot reveal any software defect",
              "Limited user scenarios may miss technical defects",
              "It makes it impossible to record actual results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Acceptance testing: check whether the delivered system meets agreed user needs. The customer can confirm business suitability. Limitation: limited user scenarios may miss technical defects.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ab"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Using usability testing, staff try finding overdue loans in a new interface. Why is this method appropriate?",
            "answer": "Observe how easily intended users complete tasks",
            "options": [
              "Observe how easily intended users complete tasks",
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Usability testing: observe how easily intended users complete tasks. Confusing interaction and navigation can be identified. Limitation: a small or unrepresentative user sample can mislead.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ad"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Using usability testing, staff try finding overdue loans in a new interface. What is a benefit of this method?",
            "answer": "Confusing interaction and navigation can be identified",
            "options": [
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method",
              "Confusing interaction and navigation can be identified"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Usability testing: observe how easily intended users complete tasks. Confusing interaction and navigation can be identified. Limitation: a small or unrepresentative user sample can mislead.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ae"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Using usability testing, staff try finding overdue loans in a new interface. What is a limitation of this method?",
            "answer": "A small or unrepresentative user sample can mislead",
            "options": [
              "It cannot reveal any software defect",
              "A small or unrepresentative user sample can mislead",
              "It makes it impossible to record actual results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Usability testing: observe how easily intended users complete tasks. Confusing interaction and navigation can be identified. Limitation: a small or unrepresentative user sample can mislead.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "af"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Using regression testing, a library upgrade changes a working report tool. Why is this method appropriate?",
            "answer": "Rerun checks for previously working behaviour after a change",
            "options": [
              "Rerun checks for previously working behaviour after a change",
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Regression testing: rerun checks for previously working behaviour after a change. Unintended effects of changes can be detected. Limitation: large test suites take effort to maintain.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ah"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Using regression testing, a library upgrade changes a working report tool. What is a benefit of this method?",
            "answer": "Unintended effects of changes can be detected",
            "options": [
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method",
              "Unintended effects of changes can be detected"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Regression testing: rerun checks for previously working behaviour after a change. Unintended effects of changes can be detected. Limitation: large test suites take effort to maintain.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ai"
                ]
              }
            ],
            "id": "6"
          }
        ]
      }
    ]
  },
  {
    "slot": 120,
    "focus": "CA2.12",
    "title": "CA2.12 \u00b7 Applying ideas 5",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.12.2.1"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Using regression testing, a tax-rule change is made to a working checkout. What is a limitation of this method?",
            "answer": "Large test suites take effort to maintain",
            "options": [
              "Large test suites take effort to maintain",
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Regression testing: rerun checks for previously working behaviour after a change. Unintended effects of changes can be detected. Limitation: large test suites take effort to maintain.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "aj"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Using load/stress testing, a portal is tested with expected and then excessive simultaneous users. Why is this method appropriate?",
            "answer": "Check behaviour under expected demand and beyond normal limits",
            "options": [
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results",
              "Check behaviour under expected demand and beyond normal limits"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Load/Stress testing: check behaviour under expected demand and beyond normal limits. Capacity limits and recovery behaviour can be examined. Limitation: realistic high-demand simulation needs resources.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "al"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Using load/stress testing, a portal is tested with expected and then excessive simultaneous users. What is a benefit of this method?",
            "answer": "Capacity limits and recovery behaviour can be examined",
            "options": [
              "It removes the need for every other test method",
              "Capacity limits and recovery behaviour can be examined",
              "It guarantees all possible inputs have been checked"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Load/Stress testing: check behaviour under expected demand and beyond normal limits. Capacity limits and recovery behaviour can be examined. Limitation: realistic high-demand simulation needs resources.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "am"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Using load/stress testing, a portal is tested with expected and then excessive simultaneous users. What is a limitation of this method?",
            "answer": "Realistic high-demand simulation needs resources",
            "options": [
              "Realistic high-demand simulation needs resources",
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Load/Stress testing: check behaviour under expected demand and beyond normal limits. Capacity limits and recovery behaviour can be examined. Limitation: realistic high-demand simulation needs resources.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "an"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Using closed box testing, a tester checks a service using only inputs and specified outputs. Why is this method appropriate?",
            "answer": "Check externally visible behaviour without relying on internal code",
            "options": [
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results",
              "Check externally visible behaviour without relying on internal code"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Closed Box testing: check externally visible behaviour without relying on internal code. Checks can reflect user-facing requirements independently of implementation. Limitation: untested internal branches may remain hidden.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ap"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Using closed box testing, a tester checks a service using only inputs and specified outputs. What is a benefit of this method?",
            "answer": "Checks can reflect user-facing requirements independently of implementation",
            "options": [
              "It removes the need for every other test method",
              "Checks can reflect user-facing requirements independently of implementation",
              "It guarantees all possible inputs have been checked"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Closed Box testing: check externally visible behaviour without relying on internal code. Checks can reflect user-facing requirements independently of implementation. Limitation: untested internal branches may remain hidden.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "aq"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Using closed box testing, a tester checks a service using only inputs and specified outputs. What is a limitation of this method?",
            "answer": "Untested internal branches may remain hidden",
            "options": [
              "Untested internal branches may remain hidden",
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Closed Box testing: check externally visible behaviour without relying on internal code. Checks can reflect user-facing requirements independently of implementation. Limitation: untested internal branches may remain hidden.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ar"
                ]
              }
            ],
            "id": "6"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Using regression testing, a library upgrade changes a working report tool. What is a limitation of this method?",
            "answer": "Large test suites take effort to maintain",
            "options": [
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect",
              "Large test suites take effort to maintain"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Regression testing: rerun checks for previously working behaviour after a change. Unintended effects of changes can be detected. Limitation: large test suites take effort to maintain.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "aj"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Using load/stress testing, a queue is tested at expected volume and beyond capacity. Why is this method appropriate?",
            "answer": "Check behaviour under expected demand and beyond normal limits",
            "options": [
              "It replaces the need to define expected results",
              "Check behaviour under expected demand and beyond normal limits",
              "It proves the entire program contains no defects"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Load/Stress testing: check behaviour under expected demand and beyond normal limits. Capacity limits and recovery behaviour can be examined. Limitation: realistic high-demand simulation needs resources.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "al"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Using load/stress testing, a queue is tested at expected volume and beyond capacity. What is a benefit of this method?",
            "answer": "Capacity limits and recovery behaviour can be examined",
            "options": [
              "Capacity limits and recovery behaviour can be examined",
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Load/Stress testing: check behaviour under expected demand and beyond normal limits. Capacity limits and recovery behaviour can be examined. Limitation: realistic high-demand simulation needs resources.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "am"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Using load/stress testing, a queue is tested at expected volume and beyond capacity. What is a limitation of this method?",
            "answer": "Realistic high-demand simulation needs resources",
            "options": [
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect",
              "Realistic high-demand simulation needs resources"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Load/Stress testing: check behaviour under expected demand and beyond normal limits. Capacity limits and recovery behaviour can be examined. Limitation: realistic high-demand simulation needs resources.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "an"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Using closed box testing, a tester checks a vendor tool without access to source code. Why is this method appropriate?",
            "answer": "Check externally visible behaviour without relying on internal code",
            "options": [
              "It replaces the need to define expected results",
              "Check externally visible behaviour without relying on internal code",
              "It proves the entire program contains no defects"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Closed Box testing: check externally visible behaviour without relying on internal code. Checks can reflect user-facing requirements independently of implementation. Limitation: untested internal branches may remain hidden.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ap"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Using closed box testing, a tester checks a vendor tool without access to source code. What is a benefit of this method?",
            "answer": "Checks can reflect user-facing requirements independently of implementation",
            "options": [
              "Checks can reflect user-facing requirements independently of implementation",
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Closed Box testing: check externally visible behaviour without relying on internal code. Checks can reflect user-facing requirements independently of implementation. Limitation: untested internal branches may remain hidden.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "aq"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Using closed box testing, a tester checks a vendor tool without access to source code. What is a limitation of this method?",
            "answer": "Untested internal branches may remain hidden",
            "options": [
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect",
              "Untested internal branches may remain hidden"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Closed Box testing: check externally visible behaviour without relying on internal code. Checks can reflect user-facing requirements independently of implementation. Limitation: untested internal branches may remain hidden.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "ar"
                ]
              }
            ],
            "id": "6"
          }
        ]
      }
    ]
  },
  {
    "slot": 121,
    "focus": "CA2.12",
    "title": "CA2.12 \u00b7 Applying ideas 6",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.12.2.1",
      "CA2.12.1.1"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Using open box testing, a developer uses source code to target each decision branch. Why is this method appropriate?",
            "answer": "Use internal structure to guide test cases",
            "options": [
              "Use internal structure to guide test cases",
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Open Box testing: use internal structure to guide test cases. Unvisited branches and internal paths can be identified. Limitation: the tester needs implementation knowledge.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "at"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Using open box testing, a developer uses source code to target each decision branch. What is a benefit of this method?",
            "answer": "Unvisited branches and internal paths can be identified",
            "options": [
              "It guarantees all possible inputs have been checked",
              "It removes the need for every other test method",
              "Unvisited branches and internal paths can be identified"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Open Box testing: use internal structure to guide test cases. Unvisited branches and internal paths can be identified. Limitation: the tester needs implementation knowledge.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "au"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Using open box testing, a developer uses source code to target each decision branch. What is a limitation of this method?",
            "answer": "The tester needs implementation knowledge",
            "options": [
              "It cannot reveal any software defect",
              "The tester needs implementation knowledge",
              "It makes it impossible to record actual results"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Open Box testing: use internal structure to guide test cases. Unvisited branches and internal paths can be identified. Limitation: the tester needs implementation knowledge.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "av"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Why test a tax calculation module separately first?",
            "answer": "Find component logic faults before they are obscured by integration",
            "options": [
              "Find component logic faults before they are obscured by integration",
              "Make all later integration checks unnecessary",
              "Guarantee that requirements cannot change"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Testing software early helps isolate failures and reduce downstream risk.",
            "coverage": [
              {
                "focus": "CA2.12.1.1",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Why test a barcode scanner separately first?",
            "answer": "Confirm the device works before diagnosing the complete solution",
            "options": [
              "Make all later integration checks unnecessary",
              "Guarantee that requirements cannot change",
              "Confirm the device works before diagnosing the complete solution"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Testing hardware early helps isolate failures and reduce downstream risk.",
            "coverage": [
              {
                "focus": "CA2.12.1.1",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Why test imported customer records separately first?",
            "answer": "Find missing or malformed records before other components rely on them",
            "options": [
              "Guarantee that requirements cannot change",
              "Find missing or malformed records before other components rely on them",
              "Make all later integration checks unnecessary"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Testing data early helps isolate failures and reduce downstream risk.",
            "coverage": [
              {
                "focus": "CA2.12.1.1",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Why test a payment API connection separately first?",
            "answer": "Check formats and communication contracts before full integration",
            "options": [
              "Check formats and communication contracts before full integration",
              "Make all later integration checks unnecessary",
              "Guarantee that requirements cannot change"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Testing interfaces early helps isolate failures and reduce downstream risk.",
            "coverage": [
              {
                "focus": "CA2.12.1.1",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "6"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Using open box testing, a tester examines loop paths to choose cases. Why is this method appropriate?",
            "answer": "Use internal structure to guide test cases",
            "options": [
              "It proves the entire program contains no defects",
              "It replaces the need to define expected results",
              "Use internal structure to guide test cases"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Open Box testing: use internal structure to guide test cases. Unvisited branches and internal paths can be identified. Limitation: the tester needs implementation knowledge.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "at"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "Using open box testing, a tester examines loop paths to choose cases. What is a benefit of this method?",
            "answer": "Unvisited branches and internal paths can be identified",
            "options": [
              "It removes the need for every other test method",
              "Unvisited branches and internal paths can be identified",
              "It guarantees all possible inputs have been checked"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Open Box testing: use internal structure to guide test cases. Unvisited branches and internal paths can be identified. Limitation: the tester needs implementation knowledge.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "au"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "Using open box testing, a tester examines loop paths to choose cases. What is a limitation of this method?",
            "answer": "The tester needs implementation knowledge",
            "options": [
              "The tester needs implementation knowledge",
              "It makes it impossible to record actual results",
              "It cannot reveal any software defect"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Open Box testing: use internal structure to guide test cases. Unvisited branches and internal paths can be identified. Limitation: the tester needs implementation knowledge.",
            "coverage": [
              {
                "focus": "CA2.12.2.1",
                "elements": [
                  "av"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "Why test a login validation module before final release?",
            "answer": "Find component logic faults before they are obscured by integration",
            "options": [
              "Make all later integration checks unnecessary",
              "Guarantee that requirements cannot change",
              "Find component logic faults before they are obscured by integration"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Testing software early helps isolate failures and reduce downstream risk.",
            "coverage": [
              {
                "focus": "CA2.12.1.1",
                "elements": [
                  "a"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "Why test a temperature sensor before final release?",
            "answer": "Confirm the device works before diagnosing the complete solution",
            "options": [
              "Guarantee that requirements cannot change",
              "Confirm the device works before diagnosing the complete solution",
              "Make all later integration checks unnecessary"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Testing hardware early helps isolate failures and reduce downstream risk.",
            "coverage": [
              {
                "focus": "CA2.12.1.1",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "Why test migrated stock records before final release?",
            "answer": "Find missing or malformed records before other components rely on them",
            "options": [
              "Find missing or malformed records before other components rely on them",
              "Make all later integration checks unnecessary",
              "Guarantee that requirements cannot change"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Testing data early helps isolate failures and reduce downstream risk.",
            "coverage": [
              {
                "focus": "CA2.12.1.1",
                "elements": [
                  "c"
                ]
              }
            ],
            "id": "5"
          },
          {
            "prompt": "Why test a file-import interface before final release?",
            "answer": "Check formats and communication contracts before full integration",
            "options": [
              "Make all later integration checks unnecessary",
              "Guarantee that requirements cannot change",
              "Check formats and communication contracts before full integration"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Testing interfaces early helps isolate failures and reduce downstream risk.",
            "coverage": [
              {
                "focus": "CA2.12.1.1",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "6"
          }
        ]
      }
    ]
  },
  {
    "slot": 122,
    "focus": "CA2.12",
    "title": "CA2.12 \u00b7 Applying ideas 7",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.12.1.1",
      "CA2.12.4.1",
      "CA2.12.2.2"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Why test a booking service before public launch separately first?",
            "answer": "Check the resulting service meets requirements before users depend on it",
            "options": [
              "Check the resulting service meets requirements before users depend on it",
              "Make all later integration checks unnecessary",
              "Guarantee that requirements cannot change"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Testing resulting service early helps isolate failures and reduce downstream risk.",
            "coverage": [
              {
                "focus": "CA2.12.1.1",
                "elements": [
                  "e"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "The quantity must be an integer from 1 to 20. Choose valid test data.",
            "answer": "10",
            "options": [
              "8.5",
              "3.5",
              "10"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Choose data that tests the specified valid case; compare its type and value with the rule.",
            "coverage": [
              {
                "focus": "CA2.12.4.1",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "The quantity must be an integer from 1 to 20. Choose invalid test data.",
            "answer": "25",
            "options": [
              "19",
              "25",
              "18"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Choose data that tests the specified invalid case; compare its type and value with the rule.",
            "coverage": [
              {
                "focus": "CA2.12.4.1",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "The quantity must be an integer from 1 to 20. Choose boundary test data.",
            "answer": "20",
            "options": [
              "20",
              "8.5",
              "3.5"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Choose data that tests the specified boundary case; compare its type and value with the rule.",
            "coverage": [
              {
                "focus": "CA2.12.4.1",
                "elements": [
                  "f"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "The quantity must be an integer from 1 to 20. Choose erroneous test data.",
            "answer": "many",
            "options": [
              "18",
              "19",
              "many"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Choose data that tests the specified erroneous case; compare its type and value with the rule.",
            "coverage": [
              {
                "focus": "CA2.12.4.1",
                "elements": [
                  "h"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "For an inclusive 1\u201310 rule, choose boundary tests.",
            "answer": "0, 1, 2, 9, 10, 11",
            "options": [
              "Only unrelated words",
              "0, 1, 2, 9, 10, 11",
              "Only the middle value"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.12.2.2",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "5"
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Why test an ordering service before live use before final release?",
            "answer": "Check the resulting service meets requirements before users depend on it",
            "options": [
              "Make all later integration checks unnecessary",
              "Guarantee that requirements cannot change",
              "Check the resulting service meets requirements before users depend on it"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Testing resulting service early helps isolate failures and reduce downstream risk.",
            "coverage": [
              {
                "focus": "CA2.12.1.1",
                "elements": [
                  "e"
                ]
              }
            ],
            "id": "0"
          },
          {
            "prompt": "The age must be an integer from 16 to 65. Choose valid test data.",
            "answer": "30",
            "options": [
              "3.5",
              "30",
              "8.5"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Choose data that tests the specified valid case; compare its type and value with the rule.",
            "coverage": [
              {
                "focus": "CA2.12.4.1",
                "elements": [
                  "b"
                ]
              }
            ],
            "id": "1"
          },
          {
            "prompt": "The age must be an integer from 16 to 65. Choose invalid test data.",
            "answer": "70",
            "options": [
              "70",
              "18",
              "19"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Choose data that tests the specified invalid case; compare its type and value with the rule.",
            "coverage": [
              {
                "focus": "CA2.12.4.1",
                "elements": [
                  "d"
                ]
              }
            ],
            "id": "2"
          },
          {
            "prompt": "The age must be an integer from 16 to 65. Choose boundary test data.",
            "answer": "16",
            "options": [
              "8.5",
              "3.5",
              "16"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Choose data that tests the specified boundary case; compare its type and value with the rule.",
            "coverage": [
              {
                "focus": "CA2.12.4.1",
                "elements": [
                  "f"
                ]
              }
            ],
            "id": "3"
          },
          {
            "prompt": "The age must be an integer from 16 to 65. Choose erroneous test data.",
            "answer": "young",
            "options": [
              "19",
              "young",
              "18"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Choose data that tests the specified erroneous case; compare its type and value with the rule.",
            "coverage": [
              {
                "focus": "CA2.12.4.1",
                "elements": [
                  "h"
                ]
              }
            ],
            "id": "4"
          },
          {
            "prompt": "For an inclusive 5\u20138 rule, choose boundary tests.",
            "answer": "4, 5, 6, 7, 8, 9",
            "options": [
              "4, 5, 6, 7, 8, 9",
              "Only the middle value",
              "Only unrelated words"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.12.2.2",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "5"
          }
        ]
      }
    ]
  },
  {
    "slot": 123,
    "focus": "CA2.2",
    "title": "CA2.2 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.2.6",
      "CA2.2.2",
      "CA2.2.4",
      "CA2.2.5"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Which header allows assigning the module-level total inside a function?",
            "answer": "global total",
            "options": [
              "global total",
              "local total",
              "public count"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.2.6",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "0"
          },
          {
            "id": "1",
            "prompt": "Name a value intended to remain unchanged during execution.",
            "answer": "constant",
            "accepted": [],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.2.2",
                "elements": [
                  "a"
                ]
              }
            ],
            "explanation": "Constants represent values that are intended to stay fixed.",
            "allowSentence": true
          },
          {
            "id": "2",
            "prompt": "Name the term for the region of a program in which a name can be accessed.",
            "answer": "scope",
            "accepted": [],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.2.4",
                "elements": [
                  "a"
                ]
              }
            ],
            "explanation": "Scope controls the region in which a name can be used.",
            "allowSentence": true
          },
          {
            "id": "3",
            "prompt": "A variable is assigned inside a function without a global or nonlocal declaration. Name its scope.",
            "answer": "local",
            "accepted": [
              "local scope"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.2.5",
                "elements": [
                  "b"
                ]
              }
            ],
            "explanation": "Function parameters and ordinary function assignments are local.",
            "allowSentence": true
          },
          {
            "id": "4",
            "prompt": "A variable is assigned at module level. Name its scope.",
            "answer": "global",
            "accepted": [
              "global scope",
              "module scope"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.2.5",
                "elements": [
                  "a"
                ]
              }
            ],
            "explanation": "Module-level names are global within that module.",
            "allowSentence": true
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Which header allows assigning the enclosing function variable count in a nested function?",
            "answer": "nonlocal count",
            "options": [
              "local total",
              "public count",
              "nonlocal count"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.2.6",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "0"
          },
          {
            "id": "1",
            "prompt": "A configured maximum is intended to stay fixed throughout a run. Name this concept.",
            "answer": "constant",
            "accepted": [],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.2.2",
                "elements": [
                  "a"
                ]
              }
            ],
            "explanation": "Constants represent values that are intended to stay fixed.",
            "allowSentence": true
          },
          {
            "id": "2",
            "prompt": "Name the property that determines where a variable name is available.",
            "answer": "scope",
            "accepted": [],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.2.4",
                "elements": [
                  "a"
                ]
              }
            ],
            "explanation": "Scope controls the region in which a name can be used.",
            "allowSentence": true
          },
          {
            "id": "3",
            "prompt": "A function parameter can be used within that function. Name its scope.",
            "answer": "local",
            "accepted": [
              "local scope"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.2.5",
                "elements": [
                  "b"
                ]
              }
            ],
            "explanation": "Function parameters and ordinary function assignments are local.",
            "allowSentence": true
          },
          {
            "id": "4",
            "prompt": "A name is defined outside all functions in a Python module. Name its scope.",
            "answer": "global",
            "accepted": [
              "global scope",
              "module scope"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.2.5",
                "elements": [
                  "a"
                ]
              }
            ],
            "explanation": "Module-level names are global within that module.",
            "allowSentence": true
          }
        ]
      }
    ]
  },
  {
    "slot": 124,
    "focus": "CA2.3",
    "title": "CA2.3 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.3.3",
      "CA2.3.1"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Which statement creates an empty list for incoming orders?",
            "answer": "orders = []",
            "options": [
              "orders = []",
              "orders = 0",
              "readings = 7"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.3.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "0"
          },
          {
            "prompt": "After from array import array, create a signed-integer array with 2 and 4.",
            "answer": "array(\"i\", [2, 4])",
            "options": [
              "array = 2, 4",
              "array(\"i\", [\"red\"])",
              "array(\"i\", [2, 4])"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.3.3",
                "elements": [
                  "b"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "1"
          },
          {
            "prompt": "Which statement stores an ID-to-name mapping?",
            "answer": "names = {7: \"Jo\"}",
            "options": [
              "stock = \"pen12\"",
              "names = {7: \"Jo\"}",
              "names = [7, \"Jo\"]"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.3.3",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "2"
          },
          {
            "id": "3",
            "prompt": "Choose list or dictionary for a simple ordered collection of names accessed by position.",
            "answer": "list",
            "accepted": [],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.3.1",
                "elements": [
                  "b"
                ]
              }
            ],
            "explanation": "A list supports access by position.",
            "allowSentence": true
          },
          {
            "id": "4",
            "prompt": "Choose list or dictionary for finding a customer record by unique customer code.",
            "answer": "dictionary",
            "accepted": [
              "dict"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.3.1",
                "elements": [
                  "f"
                ]
              }
            ],
            "explanation": "A dictionary supports lookup by a unique key.",
            "allowSentence": true
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Which statement adds 7 to the end of readings?",
            "answer": "readings.append(7)",
            "options": [
              "orders = 0",
              "readings = 7",
              "readings.append(7)"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.3.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "0"
          },
          {
            "prompt": "After from array import array, create a float array with 1.5 and 2.5.",
            "answer": "array(\"f\", [1.5, 2.5])",
            "options": [
              "array(\"i\", [\"red\"])",
              "array(\"f\", [1.5, 2.5])",
              "array = 2, 4"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.3.3",
                "elements": [
                  "b"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "1"
          },
          {
            "prompt": "Which statement stores an item-to-stock mapping?",
            "answer": "stock = {\"pen\": 12}",
            "options": [
              "stock = {\"pen\": 12}",
              "names = [7, \"Jo\"]",
              "stock = \"pen12\""
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.3.3",
                "elements": [
                  "c"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "2"
          },
          {
            "id": "3",
            "prompt": "Choose list or dictionary for a simple ordered collection of scores accessed by index.",
            "answer": "list",
            "accepted": [],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.3.1",
                "elements": [
                  "b"
                ]
              }
            ],
            "explanation": "A list supports access by position.",
            "allowSentence": true
          },
          {
            "id": "4",
            "prompt": "Choose list or dictionary for finding a price by unique product code.",
            "answer": "dictionary",
            "accepted": [
              "dict"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.3.1",
                "elements": [
                  "f"
                ]
              }
            ],
            "explanation": "A dictionary supports lookup by a unique key.",
            "allowSentence": true
          }
        ]
      }
    ]
  },
  {
    "slot": 125,
    "focus": "CA2.8",
    "title": "CA2.8 \u00b7 Applying ideas 1",
    "format": "Scenario questions",
    "reviewStatus": "teacher-review-pending",
    "tags": [
      "CA2.8.3",
      "CA2.8.1"
    ],
    "variations": [
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Choose a presence check rejecting an empty or whitespace-only name.",
            "answer": "bool(name.strip())",
            "options": [
              "bool(name.strip())",
              "name == \" \"",
              "len(code) > 6"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.8.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "0"
          },
          {
            "id": "1",
            "prompt": "Name the check requiring a code to contain exactly six characters.",
            "answer": "length check",
            "accepted": [
              "length"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.8.1",
                "elements": [
                  "c"
                ]
              }
            ],
            "explanation": "A length check counts characters.",
            "allowSentence": true
          },
          {
            "id": "2",
            "prompt": "Name the check requiring age to be between 16 and 19 inclusive.",
            "answer": "range check",
            "accepted": [
              "range"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.8.1",
                "elements": [
                  "d"
                ]
              }
            ],
            "explanation": "A range check compares a value with permitted limits.",
            "allowSentence": true
          },
          {
            "id": "3",
            "prompt": "Name the check requiring a count to be an integer.",
            "answer": "type check",
            "accepted": [
              "type"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.8.1",
                "elements": [
                  "e"
                ]
              }
            ],
            "explanation": "A type check tests whether the data has the required kind of value.",
            "allowSentence": true
          },
          {
            "id": "4",
            "prompt": "Name the check requiring two uppercase letters followed by four digits.",
            "answer": "format check",
            "accepted": [
              "format"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.8.1",
                "elements": [
                  "f"
                ]
              }
            ],
            "explanation": "A format check tests the character pattern.",
            "allowSentence": true
          }
        ]
      },
      {
        "prompt": "Choose the best answer for each situation.",
        "hint": "Use the stated requirement and consider why the alternatives do not meet it.",
        "parts": [
          {
            "prompt": "Choose a length check requiring exactly six characters.",
            "answer": "len(code) == 6",
            "options": [
              "name == \" \"",
              "len(code) > 6",
              "len(code) == 6"
            ],
            "kind": "choice",
            "marks": 1,
            "explanation": "Select the step that implements the stated requirement. This bounded task supports practice; it does not assess development of a complete independent solution.",
            "coverage": [
              {
                "focus": "CA2.8.3",
                "elements": [
                  "a"
                ]
              }
            ],
            "coverageMode": "practice",
            "id": "0"
          },
          {
            "id": "1",
            "prompt": "Name the check limiting a username to twenty characters.",
            "answer": "length check",
            "accepted": [
              "length"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.8.1",
                "elements": [
                  "c"
                ]
              }
            ],
            "explanation": "A length check counts characters.",
            "allowSentence": true
          },
          {
            "id": "2",
            "prompt": "Name the check requiring quantity to be between 1 and 50 inclusive.",
            "answer": "range check",
            "accepted": [
              "range"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.8.1",
                "elements": [
                  "d"
                ]
              }
            ],
            "explanation": "A range check compares a value with permitted limits.",
            "allowSentence": true
          },
          {
            "id": "3",
            "prompt": "Name the check requiring a measurement to have a numeric data type.",
            "answer": "type check",
            "accepted": [
              "type"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.8.1",
                "elements": [
                  "e"
                ]
              }
            ],
            "explanation": "A type check tests whether the data has the required kind of value.",
            "allowSentence": true
          },
          {
            "id": "4",
            "prompt": "Name the check requiring three digits followed by one uppercase letter.",
            "answer": "format check",
            "accepted": [
              "format"
            ],
            "marks": 1,
            "kind": "text",
            "coverage": [
              {
                "focus": "CA2.8.1",
                "elements": [
                  "f"
                ]
              }
            ],
            "explanation": "A format check tests the character pattern.",
            "allowSentence": true
          }
        ]
      }
    ]
  }
];
