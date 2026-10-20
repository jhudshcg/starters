/**
 * Purpose: Runnable Task 2 inputs and behaviour-based repair assessment.
 * Main contents: explicit calls/input sequences, expected return values and applied repair parts.
 * Used by: esp-task2.js. Uses: existing investigation definitions. Libs: none.
 * Initial cases reuse the independently checked Task 2 reference scenarios.
 */
const cases = {
  "36-0": [
    {
      "id": "c0",
      "expression": "read_workshop()",
      "inputs": [
        "8"
      ],
      "type": "int",
      "value": 8,
      "consumed": 1
    },
    {
      "id": "c1",
      "expression": "read_workshop()",
      "inputs": [
        "abc",
        "4"
      ],
      "type": "int",
      "value": 4,
      "consumed": 2
    }
  ],
  "36-1": [
    {
      "id": "c0",
      "expression": "read_member_id()",
      "inputs": [
        "00712",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2
    },
    {
      "id": "c1",
      "expression": "read_member_id()",
      "inputs": [
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 1
    }
  ],
  "36-2": [
    {
      "id": "c0",
      "expression": "read_customer_name()",
      "inputs": [
        "   ",
        " Ada "
      ],
      "type": "str",
      "value": "Ada",
      "consumed": 2
    },
    {
      "id": "c1",
      "expression": "read_customer_name()",
      "inputs": [
        " Ada "
      ],
      "type": "str",
      "value": "Ada",
      "consumed": 1
    }
  ],
  "36-3": [
    {
      "id": "c0",
      "expression": "read_adjustment()",
      "inputs": [
        "2.5",
        "12"
      ],
      "type": "int",
      "value": 12,
      "consumed": 2
    },
    {
      "id": "c1",
      "expression": "read_adjustment()",
      "inputs": [
        "12"
      ],
      "type": "int",
      "value": 12,
      "consumed": 1
    }
  ],
  "36-4": [
    {
      "id": "c0",
      "expression": "read_booking_code()",
      "inputs": [
        "BK0A7",
        "BK007"
      ],
      "type": "str",
      "value": "BK007",
      "consumed": 2
    },
    {
      "id": "c1",
      "expression": "read_booking_code()",
      "inputs": [
        "BK007"
      ],
      "type": "str",
      "value": "BK007",
      "consumed": 1
    }
  ],
  "36-5": [
    {
      "id": "c0",
      "expression": "read_platform()",
      "inputs": [
        "2"
      ],
      "type": "str",
      "value": "In-store",
      "consumed": 1
    },
    {
      "id": "c1",
      "expression": "read_platform()",
      "inputs": [
        "02",
        "1"
      ],
      "type": "str",
      "value": "Online",
      "consumed": 2
    }
  ],
  "37-0": [
    {
      "id": "c0",
      "expression": "order_total([3, 5, 4], True)",
      "inputs": [],
      "type": "int",
      "value": 14,
      "consumed": 0
    }
  ],
  "37-1": [
    {
      "id": "c0",
      "expression": "charge(2)",
      "inputs": [],
      "type": "int",
      "value": 10,
      "consumed": 0
    }
  ],
  "37-2": [
    {
      "id": "c0",
      "expression": "points([5.75, 2.25])",
      "inputs": [],
      "type": "int",
      "value": 28,
      "consumed": 0
    },
    {
      "id": "c1",
      "expression": "points([11.50, 12.25])",
      "inputs": [],
      "type": "int",
      "value": 86,
      "consumed": 0
    }
  ],
  "37-3": [
    {
      "id": "c0",
      "expression": "discount()",
      "inputs": [
        "abc",
        "12.50"
      ],
      "type": "float",
      "value": 10.0,
      "consumed": 2
    },
    {
      "id": "c1",
      "expression": "discount()",
      "inputs": [
        "12.50"
      ],
      "type": "float",
      "value": 10.0,
      "consumed": 1
    }
  ],
  "37-4": [
    {
      "id": "c0",
      "expression": "fee(2, False)",
      "inputs": [],
      "type": "int",
      "value": 8,
      "consumed": 0
    }
  ],
  "37-5": [
    {
      "id": "c0",
      "expression": "cost(3)",
      "inputs": [],
      "type": "int",
      "value": 11,
      "consumed": 0
    }
  ],
  "38-0": [
    {
      "id": "c0",
      "expression": "read_code()",
      "inputs": [
        "ABC",
        "ABCD"
      ],
      "type": "str",
      "value": "ABCD",
      "consumed": 2
    },
    {
      "id": "c1",
      "expression": "read_code()",
      "inputs": [
        "WXYZ"
      ],
      "type": "str",
      "value": "WXYZ",
      "consumed": 1
    }
  ],
  "38-1": [
    {
      "id": "c0",
      "expression": "read_choice()",
      "inputs": [
        "x",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2
    },
    {
      "id": "c1",
      "expression": "read_choice()",
      "inputs": [
        "3"
      ],
      "type": "int",
      "value": 3,
      "consumed": 1
    }
  ],
  "38-2": [
    {
      "id": "c0",
      "expression": "read_name()",
      "inputs": [
        "   ",
        " Ada "
      ],
      "type": "str",
      "value": "Ada",
      "consumed": 2
    },
    {
      "id": "c1",
      "expression": "read_name()",
      "inputs": [
        " Jo "
      ],
      "type": "str",
      "value": "Jo",
      "consumed": 1
    }
  ],
  "38-3": [
    {
      "id": "c0",
      "expression": "read_pin()",
      "inputs": [
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 1
    },
    {
      "id": "c1",
      "expression": "read_pin()",
      "inputs": [
        "00A1",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2
    }
  ],
  "38-4": [
    {
      "id": "c0",
      "expression": "read_level()",
      "inputs": [
        "0",
        "3"
      ],
      "type": "int",
      "value": 3,
      "consumed": 2
    },
    {
      "id": "c1",
      "expression": "read_level()",
      "inputs": [
        "3"
      ],
      "type": "int",
      "value": 3,
      "consumed": 1
    }
  ],
  "38-5": [
    {
      "id": "c0",
      "expression": "read_confirm()",
      "inputs": [
        "no",
        "yes"
      ],
      "type": "str",
      "value": "yes",
      "consumed": 2
    },
    {
      "id": "c1",
      "expression": "read_confirm()",
      "inputs": [
        "yes"
      ],
      "type": "str",
      "value": "yes",
      "consumed": 1
    }
  ]
};
const repairs = {
  "36-0": [
    [
      "1 <= value <= 8",
      "1 <= value < 8",
      "1 <= value <= 8"
    ],
    [
      "Replace except TypeError: with except ValueError:",
      "except TypeError:",
      "except ValueError:"
    ]
  ],
  "36-1": [
    [
      "if len(text) == 4:",
      "len(text) >= 4",
      "len(text) == 4"
    ]
  ],
  "36-2": [
    [
      "if cleaned:",
      "if text:",
      "if cleaned:"
    ]
  ],
  "36-3": [
    [
      "text = int(text)",
      "            int(text)",
      "            text = int(text)"
    ]
  ],
  "36-4": [
    [
      "if suffix.isascii() and suffix.isdigit():",
      "if len(suffix) == 3:",
      "if suffix.isascii() and suffix.isdigit():"
    ]
  ],
  "36-5": [
    [
      "elif selection == \"2\":",
      "elif selection == 2:",
      "elif selection == \"2\":"
    ]
  ],
  "37-0": [
    [
      "final_total = subtotal + delivery_fee",
      "final_total = subtoatl + delivery_fee",
      "final_total = subtotal + delivery_fee"
    ]
  ],
  "37-1": [
    [
      "Add total = 0 inside charge(), before the for loop",
      "    for ticket in range(tickets):",
      "    total = 0\n    for ticket in range(tickets):"
    ]
  ],
  "37-2": [
    [
      "item_points = pounds * 4",
      "item_points = pounds * 2",
      "item_points = pounds * 4"
    ],
    [
      "extra_points = (pounds - 10) * 2",
      "extra_points = (pounds - 10) * 4",
      "extra_points = (pounds - 10) * 2"
    ]
  ],
  "37-3": [
    [
      "price = amount",
      "    price = text",
      "    price = amount"
    ]
  ],
  "37-4": [
    [
      "Keep the code; test the other rate and discount branches",
      null,
      null
    ]
  ],
  "37-5": [
    [
      "for day in range(1, days + 1):",
      "range(1, days)",
      "range(1, days + 1)"
    ]
  ],
  "38-0": [
    [
      "text = input(\"Code: \")",
      "            input(\"Code: \")",
      "            text = input(\"Code: \")"
    ]
  ],
  "38-1": [
    [
      "Replace except TypeError: with except ValueError:",
      "except TypeError:",
      "except ValueError:"
    ],
    [
      "1 <= value <= 3",
      "1 <= value < 3",
      "1 <= value <= 3"
    ]
  ],
  "38-2": [
    [
      "return name",
      "return nmae",
      "return name"
    ]
  ],
  "38-3": [
    [
      "Add attempts = 0 inside the function, before while",
      "def read_pin():",
      "def read_pin():\n    attempts = 0"
    ]
  ],
  "38-4": [
    [
      "level >= 1 and level <= 5",
      "level >= 1 or level <= 5",
      "level >= 1 and level <= 5"
    ]
  ],
  "38-5": [
    [
      "Set again = True before the loop",
      "    again = False\n",
      "    again = True\n"
    ]
  ]
};

// Regression cases also check boundaries, rejected inputs and repeated calls.
const regression = {
  "36-0": [
    {
      "expression": "read_workshop()",
      "inputs": [
        "8"
      ],
      "type": "int",
      "value": 8,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_workshop()",
      "inputs": [
        "abc",
        "4"
      ],
      "type": "int",
      "value": 4,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_workshop()",
      "inputs": [
        "1"
      ],
      "type": "int",
      "value": 1,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_workshop()",
      "inputs": [
        "8"
      ],
      "type": "int",
      "value": 8,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_workshop()",
      "inputs": [
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_workshop()",
      "inputs": [
        "0",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_workshop()",
      "inputs": [
        "9",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_workshop()",
      "inputs": [
        "-2",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_workshop()",
      "inputs": [
        "",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_workshop()",
      "inputs": [
        "abc",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_workshop()",
      "inputs": [
        "2.5",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    }
  ],
  "36-1": [
    {
      "expression": "read_member_id()",
      "inputs": [
        "00712",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_member_id()",
      "inputs": [
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_member_id()",
      "inputs": [
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_member_id()",
      "inputs": [
        "007",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_member_id()",
      "inputs": [
        "00712",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_member_id()",
      "inputs": [
        "0A71",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_member_id()",
      "inputs": [
        "\u0660\u0660\u0667\u0661",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_member_id()",
      "inputs": [
        "",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_member_id()",
      "inputs": [
        " 071",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    }
  ],
  "36-2": [
    {
      "expression": "read_customer_name()",
      "inputs": [
        "   ",
        " Ada "
      ],
      "type": "str",
      "value": "Ada",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_customer_name()",
      "inputs": [
        " Ada "
      ],
      "type": "str",
      "value": "Ada",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_customer_name()",
      "inputs": [
        " Jo "
      ],
      "type": "str",
      "value": "Jo",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_customer_name()",
      "inputs": [
        "",
        " Jo "
      ],
      "type": "str",
      "value": "Jo",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_customer_name()",
      "inputs": [
        "   ",
        " Jo "
      ],
      "type": "str",
      "value": "Jo",
      "consumed": 2,
      "stdoutIncludes": []
    }
  ],
  "36-3": [
    {
      "expression": "read_adjustment()",
      "inputs": [
        "2.5",
        "12"
      ],
      "type": "int",
      "value": 12,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_adjustment()",
      "inputs": [
        "12"
      ],
      "type": "int",
      "value": 12,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_adjustment()",
      "inputs": [
        "-3"
      ],
      "type": "int",
      "value": -3,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_adjustment()",
      "inputs": [
        "0"
      ],
      "type": "int",
      "value": 0,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_adjustment()",
      "inputs": [
        "12"
      ],
      "type": "int",
      "value": 12,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_adjustment()",
      "inputs": [
        "abc",
        "-3"
      ],
      "type": "int",
      "value": -3,
      "consumed": 2,
      "stdoutIncludes": []
    }
  ],
  "36-4": [
    {
      "expression": "read_booking_code()",
      "inputs": [
        "BK0A7",
        "BK007"
      ],
      "type": "str",
      "value": "BK007",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_booking_code()",
      "inputs": [
        "BK007"
      ],
      "type": "str",
      "value": "BK007",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_booking_code()",
      "inputs": [
        "BK007"
      ],
      "type": "str",
      "value": "BK007",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_booking_code()",
      "inputs": [
        "BK07",
        "BK007"
      ],
      "type": "str",
      "value": "BK007",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_booking_code()",
      "inputs": [
        "BK0007",
        "BK007"
      ],
      "type": "str",
      "value": "BK007",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_booking_code()",
      "inputs": [
        "bk007",
        "BK007"
      ],
      "type": "str",
      "value": "BK007",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_booking_code()",
      "inputs": [
        "BK0A7",
        "BK007"
      ],
      "type": "str",
      "value": "BK007",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_booking_code()",
      "inputs": [
        "BK\u0660\u0660\u0667",
        "BK007"
      ],
      "type": "str",
      "value": "BK007",
      "consumed": 2,
      "stdoutIncludes": []
    }
  ],
  "36-5": [
    {
      "expression": "read_platform()",
      "inputs": [
        "2"
      ],
      "type": "str",
      "value": "In-store",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_platform()",
      "inputs": [
        "02",
        "1"
      ],
      "type": "str",
      "value": "Online",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_platform()",
      "inputs": [
        "1"
      ],
      "type": "str",
      "value": "Online",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_platform()",
      "inputs": [
        "02",
        "1"
      ],
      "type": "str",
      "value": "Online",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_platform()",
      "inputs": [
        " 2 ",
        "1"
      ],
      "type": "str",
      "value": "Online",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_platform()",
      "inputs": [
        "3",
        "1"
      ],
      "type": "str",
      "value": "Online",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_platform()",
      "inputs": [
        "",
        "1"
      ],
      "type": "str",
      "value": "Online",
      "consumed": 2,
      "stdoutIncludes": []
    }
  ],
  "37-0": [
    {
      "expression": "order_total([3, 5, 4], True)",
      "inputs": [],
      "type": "int",
      "value": 14,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "order_total([3], True)",
      "inputs": [],
      "type": "int",
      "value": 5,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "order_total([3, 5], False)",
      "inputs": [],
      "type": "int",
      "value": 8,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "order_total([3, 5], True)",
      "inputs": [],
      "type": "int",
      "value": 10,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "order_total([3, 5], True)",
      "inputs": [],
      "type": "int",
      "value": 10,
      "consumed": 0,
      "stdoutIncludes": [
        "Subtotal: \u00a3 8\n",
        "Delivery: \u00a3 2\n",
        "Total: \u00a3 10\n"
      ]
    }
  ],
  "37-1": [
    {
      "expression": "charge(2)",
      "inputs": [],
      "type": "int",
      "value": 10,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "charge(1)",
      "inputs": [],
      "type": "int",
      "value": 5,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "charge(3)",
      "inputs": [],
      "type": "int",
      "value": 15,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "charge(4)",
      "inputs": [],
      "type": "int",
      "value": 18,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "charge(5)",
      "inputs": [],
      "type": "int",
      "value": 23,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "(charge(4), charge(1))",
      "inputs": [],
      "type": "tuple",
      "value": [
        18,
        5
      ],
      "consumed": 0,
      "stdoutIncludes": []
    }
  ],
  "37-2": [
    {
      "expression": "points([5.75, 2.25])",
      "inputs": [],
      "type": "int",
      "value": 28,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "points([11.50, 12.25])",
      "inputs": [],
      "type": "int",
      "value": 86,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "points([10])",
      "inputs": [],
      "type": "int",
      "value": 40,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "points([11])",
      "inputs": [],
      "type": "int",
      "value": 42,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "points([1.75, 1.75])",
      "inputs": [],
      "type": "int",
      "value": 8,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "points([0.75])",
      "inputs": [],
      "type": "int",
      "value": 0,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "points([11.50, 10])",
      "inputs": [],
      "type": "int",
      "value": 82,
      "consumed": 0,
      "stdoutIncludes": [
        "Item 1 : 42\n",
        "Item 2 : 40\n",
        "Total points: 82\n"
      ]
    }
  ],
  "37-3": [
    {
      "expression": "discount()",
      "inputs": [
        "abc",
        "12.50"
      ],
      "type": "float",
      "value": 10.0,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "discount()",
      "inputs": [
        "12.50"
      ],
      "type": "float",
      "value": 10.0,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "discount()",
      "inputs": [
        "2.75"
      ],
      "type": "float",
      "value": 2.2,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "discount()",
      "inputs": [
        "0",
        "2.75"
      ],
      "type": "float",
      "value": 2.2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "discount()",
      "inputs": [
        "-2",
        "12.50"
      ],
      "type": "float",
      "value": 10.0,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "discount()",
      "inputs": [
        "abc",
        "0",
        "2.75"
      ],
      "type": "float",
      "value": 2.2,
      "consumed": 3,
      "stdoutIncludes": []
    },
    {
      "expression": "discount()",
      "inputs": [
        "2.75"
      ],
      "type": "float",
      "value": 2.2,
      "consumed": 1,
      "stdoutIncludes": [
        "Original: \u00a32.75\n",
        "Saving: \u00a30.55\n",
        "Amount due: \u00a32.20\n"
      ]
    }
  ],
  "37-4": [
    {
      "expression": "fee(2, False)",
      "inputs": [],
      "type": "int",
      "value": 8,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "fee(1, False)",
      "inputs": [],
      "type": "int",
      "value": 5,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "fee(2, False)",
      "inputs": [],
      "type": "int",
      "value": 8,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "fee(3, False)",
      "inputs": [],
      "type": "int",
      "value": 10,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "fee(4, False)",
      "inputs": [],
      "type": "int",
      "value": 13,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "fee(1, True)",
      "inputs": [],
      "type": "int",
      "value": 7,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "fee(2, True)",
      "inputs": [],
      "type": "int",
      "value": 12,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "fee(3, True)",
      "inputs": [],
      "type": "int",
      "value": 16,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "fee(4, True)",
      "inputs": [],
      "type": "int",
      "value": 21,
      "consumed": 0,
      "stdoutIncludes": []
    }
  ],
  "37-5": [
    {
      "expression": "cost(3)",
      "inputs": [],
      "type": "int",
      "value": 11,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "cost(1)",
      "inputs": [],
      "type": "int",
      "value": 4,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "cost(2)",
      "inputs": [],
      "type": "int",
      "value": 8,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "cost(3)",
      "inputs": [],
      "type": "int",
      "value": 11,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "cost(5)",
      "inputs": [],
      "type": "int",
      "value": 17,
      "consumed": 0,
      "stdoutIncludes": []
    },
    {
      "expression": "cost(3)",
      "inputs": [],
      "type": "int",
      "value": 11,
      "consumed": 0,
      "stdoutIncludes": [
        "Day 1 : \u00a3 4\n",
        "Day 2 : \u00a3 4\n",
        "Day 3 : \u00a3 3\n"
      ]
    }
  ],
  "38-0": [
    {
      "expression": "read_code()",
      "inputs": [
        "ABC",
        "ABCD"
      ],
      "type": "str",
      "value": "ABCD",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_code()",
      "inputs": [
        "WXYZ"
      ],
      "type": "str",
      "value": "WXYZ",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_code()",
      "inputs": [
        "WXYZ"
      ],
      "type": "str",
      "value": "WXYZ",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_code()",
      "inputs": [
        "WX",
        "WXYZ"
      ],
      "type": "str",
      "value": "WXYZ",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_code()",
      "inputs": [
        "ABCDE",
        "ABC",
        "WXYZ"
      ],
      "type": "str",
      "value": "WXYZ",
      "consumed": 3,
      "stdoutIncludes": []
    }
  ],
  "38-1": [
    {
      "expression": "read_choice()",
      "inputs": [
        "x",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_choice()",
      "inputs": [
        "3"
      ],
      "type": "int",
      "value": 3,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_choice()",
      "inputs": [
        "1"
      ],
      "type": "int",
      "value": 1,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_choice()",
      "inputs": [
        "3"
      ],
      "type": "int",
      "value": 3,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_choice()",
      "inputs": [
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_choice()",
      "inputs": [
        "0",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_choice()",
      "inputs": [
        "4",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_choice()",
      "inputs": [
        "-2",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_choice()",
      "inputs": [
        "",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_choice()",
      "inputs": [
        "abc",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_choice()",
      "inputs": [
        "2.5",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    }
  ],
  "38-2": [
    {
      "expression": "read_name()",
      "inputs": [
        "   ",
        " Ada "
      ],
      "type": "str",
      "value": "Ada",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_name()",
      "inputs": [
        " Jo "
      ],
      "type": "str",
      "value": "Jo",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_name()",
      "inputs": [
        " Jo "
      ],
      "type": "str",
      "value": "Jo",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_name()",
      "inputs": [
        "",
        " Jo "
      ],
      "type": "str",
      "value": "Jo",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_name()",
      "inputs": [
        "   ",
        " Jo "
      ],
      "type": "str",
      "value": "Jo",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_name()",
      "inputs": [
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
      ],
      "type": "str",
      "value": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_name()",
      "inputs": [
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "Jo"
      ],
      "type": "str",
      "value": "Jo",
      "consumed": 2,
      "stdoutIncludes": []
    }
  ],
  "38-3": [
    {
      "expression": "read_pin()",
      "inputs": [
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_pin()",
      "inputs": [
        "00A1",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_pin()",
      "inputs": [
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_pin()",
      "inputs": [
        "007",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_pin()",
      "inputs": [
        "00712",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_pin()",
      "inputs": [
        "0A71",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_pin()",
      "inputs": [
        "\u0660\u0660\u0667\u0661",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_pin()",
      "inputs": [
        "",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_pin()",
      "inputs": [
        " 071",
        "0071"
      ],
      "type": "str",
      "value": "0071",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "(read_pin(), read_pin())",
      "inputs": [
        "00A1",
        "0071",
        "1234"
      ],
      "type": "tuple",
      "value": [
        "0071",
        "1234"
      ],
      "consumed": 3,
      "stdoutIncludes": [
        "PIN accepted after 2 attempts\n",
        "PIN accepted after 1 attempts\n"
      ]
    }
  ],
  "38-4": [
    {
      "expression": "read_level()",
      "inputs": [
        "0",
        "3"
      ],
      "type": "int",
      "value": 3,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_level()",
      "inputs": [
        "3"
      ],
      "type": "int",
      "value": 3,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_level()",
      "inputs": [
        "1"
      ],
      "type": "int",
      "value": 1,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_level()",
      "inputs": [
        "5"
      ],
      "type": "int",
      "value": 5,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_level()",
      "inputs": [
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_level()",
      "inputs": [
        "0",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_level()",
      "inputs": [
        "6",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_level()",
      "inputs": [
        "-2",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_level()",
      "inputs": [
        "",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_level()",
      "inputs": [
        "abc",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_level()",
      "inputs": [
        "2.5",
        "2"
      ],
      "type": "int",
      "value": 2,
      "consumed": 2,
      "stdoutIncludes": []
    }
  ],
  "38-5": [
    {
      "expression": "read_confirm()",
      "inputs": [
        "no",
        "yes"
      ],
      "type": "str",
      "value": "yes",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_confirm()",
      "inputs": [
        "yes"
      ],
      "type": "str",
      "value": "yes",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_confirm()",
      "inputs": [
        "yes"
      ],
      "type": "str",
      "value": "yes",
      "consumed": 1,
      "stdoutIncludes": []
    },
    {
      "expression": "read_confirm()",
      "inputs": [
        "no",
        "yes"
      ],
      "type": "str",
      "value": "yes",
      "consumed": 2,
      "stdoutIncludes": []
    },
    {
      "expression": "read_confirm()",
      "inputs": [
        "",
        "YES",
        "yes"
      ],
      "type": "str",
      "value": "yes",
      "consumed": 3,
      "stdoutIncludes": []
    }
  ]
};

/** Adapt one investigation without parsing display labels as executable input. */
export function liveInvestigation(slot, variation, question) {
  const key = `${slot}-${variation}`;
  const tests = cases[key];
  const q = structuredClone(question);
  let solution = q.code;
  for (const [, before, after] of repairs[key]) if (before) solution = solution.replace(before, after);
  const rename = (id) => id.replace(/-predicted$/, '-observed').replace(/-fix$/, '-repair');
  q.parts = q.parts.map((p) => {
    if (p.id.endsWith('-predicted')) return {
      ...p, id: rename(p.id), prompt: 'Recorded actual result — run the original code, then interpret its output.',
      runCase: p.id.split('-')[0],
    };
    if (!p.id.endsWith('-fix')) return p;
    const related = q.testPlan.flatMap((row) => row.cases)
      .filter((c) => c.actionParts.includes(p.id)).map((c) => c.id);
    const { options, control, ...part } = p;
    return { ...part, id: rename(p.id), kind: 'python',
      prompt: 'Apply any necessary repair in Your code, preserving the stated requirements. Working code may remain unchanged.',
      answer: solution, solutionText: solution,
      pythonTests: [...tests.filter((t) => related.includes(t.id)), ...regression[key].filter((t) => {
        if (repairs[key].length === 1) return true;
        const first = t.inputs[0], index = Number(p.id[1]);
        if (key === '36-0') return index === 0 ? /^[1-8]$/.test(first) : !/^-?\d+$/.test(first);
        if (key === '38-1') return index === 1 ? /^[1-3]$/.test(first) : !/^-?\d+$/.test(first);
        if (key === '37-2') return index === 0 ? !/[1-9]\d/.test(t.expression) : /[1-9]\d/.test(t.expression);
        return false;
      })].map((t) => ({ ...t })),
    };
  });
  for (const row of q.testPlan) {
    row.actionParts = row.actionParts.map(rename);
    for (const c of row.cases) {
      c.actualPart = rename(c.predictedPart);
      delete c.predictedPart;
      c.actionParts = c.actionParts.map(rename);
    }
  }
  q.livePython = {
    revision: 2, tabs: true, access: 'practice', actions: ['run', 'check'], modes: ['free'], regions: [],
    cases: tests.map(({ id, expression, inputs }) => ({ id, expression, inputs,
      label: `${id.toUpperCase()}: ${expression}${inputs.length ? ' · ' + inputs.map((v) => JSON.stringify(v)).join(', ') : ''}` })),
  };
  q.prompt = 'Choose suitable test data and requirement-led expected results. Run the supplied cases on Original code, record the actual results and explain them. Apply repairs in Your code and rerun the cases to check the changes.';
  q.skills = q.skills.map((s) => s === 'prediction' ? 'observation' : s);
  return ownTests(q, key, tests);
}

const argumentFields = {
  '37-0': [{ name: 'prices', type: 'list', integer: true }, { name: 'delivery', type: 'bool' }],
  '37-1': [{ name: 'tickets', type: 'number', integer: true }],
  '37-2': [{ name: 'prices', type: 'list' }],
  '37-4': [{ name: 'hours', type: 'number', integer: true, max: 4 }, { name: 'weekend', type: 'bool' }],
  '37-5': [{ name: 'days', type: 'number', integer: true }],
};
const exampleArguments = {
  '37-0': [{ prices: '3, 5', delivery: 'True' }],
  '37-1': [{ tickets: '4' }],
  '37-2': [{ prices: '5' }, { prices: '12' }],
  '37-4': [{ hours: '2', weekend: 'False' }],
  '37-5': [{ days: '3' }],
};

/** Replace supplied-case answers with student-owned test contracts and fresh part IDs. */
function ownTests(q, key, tests) {
  q.livePython.testInputs = { function: tests[0].expression.split('(')[0], parameters: argumentFields[key] ?? [] };
  delete q.livePython.cases;
  q.livePython.revision = 3;
  const replace = (id, changes) => {
    const p = q.parts.find((p) => p.id === id);
    delete p.options;
    delete p.control;
    delete p.runCase;
    Object.assign(p, changes, { kind: 'test-plan' });
    return p.id;
  };
  for (const [i, row] of q.testPlan.entries()) {
    const examples = Object.fromEntries(row.cases.map((c) => {
      const index = tests.findIndex((t) => t.id === c.id);
      return [c.id, argumentFields[key] ? { args: exampleArguments[key][index] } : { inputs: row.kind === 'valid' ? tests[index].inputs.slice(0, 1) : tests[index].inputs }];
    }));
    row.dataPart = replace(row.dataPart, { id: `${row.kind}-own-inputs`, testRole: 'data',
      prompt: `Choose your own ${row.kind} test inputs.`, answer: JSON.stringify(examples),
      solutionText: 'Many input values are suitable. Valid tests should finish without retrying. Invalid tests should reject an entry and then accept a valid recovery entry.',
      explanation: 'Input marks assess suitability for the stated validity group. For several cases, choose different values.' });
    for (const c of row.cases) {
      const section = `Test ${i + 1}${row.cases.length > 1 ? ` · ${c.label}` : ''}`;
      delete c.input;
      c.expectedPart = replace(c.expectedPart, { id: `${c.id}-own-expected`, testRole: 'expected', testCase: c.id,
        section, prompt: 'Expected result — use the requirements before running.', answer: '',
        solutionText: 'The expected result depends on your inputs and the stated requirements.',
        explanation: 'Record the intended return type and value, and how many input entries should be used.' });
      c.actualPart = replace(c.actualPart, { id: `${c.id}-own-actual`, testRole: 'actual', testCase: c.id,
        section, prompt: 'Run your test, then record the actual result from Original code.', answer: '',
        solutionText: 'Record your original-code run: return type and value, or exception name, and inputs used.',
        explanation: 'A recorded result earns credit only when it matches a saved original-code run with these exact inputs.' });
    }
  }
  for (const p of q.parts) if (p.id.endsWith('-cause')) {
    p.prompt = 'Inspect Original code against the requirements. Which statement correctly explains its behaviour?';
    p.section = 'Code review: cause and correction';
  }
  if (key === '37-4') {
    const p = q.parts.find((p) => p.id === 'd0-cause');
    const previous = p.answer;
    p.answer = 'The code implements the stated rates, discount and booking fee';
    p.options = p.options.map((value) => value === previous ? p.answer : value);
    p.explanation = 'Both rates, the discount boundary and the single booking fee match the requirements. Tests should still cover each path.';
  }
  if (key === '37-2') {
    q.parts.find((p) => p.id === 'd0-cause').prompt = 'For whole-pound amounts up to £10, which statement explains Original code?';
    q.parts.find((p) => p.id === 'd1-cause').prompt = 'For whole-pound amounts above £10, which statement explains Original code?';
  }
  q.prompt = 'Choose your own inputs and record requirement-led expected results before running. Run each test on Original code and record its actual result. Apply any repairs in Your code, then rerun your tests to compare.';
  q.hint = q.hint.replaceAll('supplied test', 'test').replaceAll('supplied number', 'chosen number');
  return q;
}
