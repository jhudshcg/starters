import { liveInvestigation } from './esp-task2-live.js';
/**
 * Purpose: Original Task 2 investigations linking requirements, Python and test evidence.
 * Main contents: validity-grouped input suites, supplied predictions and bounded repairs.
 * Used by: data/esp.js and authoring checks. Uses: no application state or code execution.
 * Libs: none. Evidence: docs/esp/task-2-designs.md and the teacher's improvement brief.
 */

/** Build an automatically marked choice without normalising Python literals. */
function select(id, section, prompt, answer, wrong, explanation) {
  return {
    id,
    section,
    prompt,
    answer,
    options: [answer, ...wrong],
    explanation,
    kind: 'text',
    caseSensitive: true,
    control: 'select',
    marks: 1,
  };
}

/** Keep test-plan rows by validity; supplied cases and scored parts remain references.
 * Called by template(). New descriptive part IDs avoid reusing older numeric answers.
 */
function investigation(c, variation) {
  const parts = [];
  const groups = c.inputGroups.map((group, index) => {
    const description = `${c.functionName}: ${group.kind} inputs`;
    const section = `Test ${index + 1}: ${description}`;
    const dataPart = `${group.kind}-data`;
    const d = group.data;
    parts.push(select(dataPart, section, d.prompt, d.answer, d.wrong, d.why));
    const cases = c.tests
      .filter((t) => t.group === group.kind)
      .map((t, caseIndex) => {
        const label = `Case ${String.fromCharCode(65 + caseIndex)}`;
        const heading = `Test ${index + 1} · ${label}: ${t.input}`;
        const expectedPart = `${t.id}-expected`,
          predictedPart = `${t.id}-predicted`;
        parts.push(
          select(
            expectedPart,
            heading,
            'Expected result — what do the requirements say?',
            t.expected,
            t.expectedWrong,
            t.why,
          ),
        );
        parts.push(
          select(
            predictedPart,
            heading,
            'Predicted result — what will this code do?',
            t.predicted,
            t.predictedWrong,
            t.trace,
          ),
        );
        return {
          id: t.id,
          label,
          input: t.input,
          expectedPart,
          predictedPart,
          actionParts: t.diagnosis === null ? [] : [`d${t.diagnosis}-cause`, `d${t.diagnosis}-fix`],
        };
      });
    return {
      kind: group.kind,
      description,
      dataPart,
      cases,
      actionParts: [...new Set(cases.flatMap((t) => t.actionParts)), 'next-test'],
    };
  });
  for (const [index, d] of c.diagnoses.entries()) {
    const references = groups.flatMap((group, g) =>
      group.cases
        .filter((t) => t.actionParts.includes(`d${index}-cause`))
        .map((t) => `Test ${g + 1}, ${t.label}`),
    );
    const section = `${references.join('; ')}: cause and correction`;
    parts.push(
      select(
        `d${index}-cause`,
        section,
        'What explains the code’s behaviour in the supplied case(s)?',
        d.cause,
        d.wrongCauses,
        d.why,
      ),
    );
    parts.push(
      select(
        `d${index}-fix`,
        section,
        'Choose the appropriate correction or next action.',
        d.fix,
        d.wrongFixes,
        d.why,
      ),
    );
  }
  parts.push(
    select(
      'next-test',
      'Plan the next test',
      c.next.prompt,
      c.next.answer,
      c.next.wrong,
      c.next.why,
    ),
  );
  return {
    title: c.title,
    prompt:
      'Choose test data for each group. Use the supplied cases for expected results and code predictions, then identify any faults and plan the next test.',
    requirements: c.requirements,
    code: c.code,
    hint: c.hint,
    skills: ['testing', 'expected', 'prediction', 'repair', ...c.skills],
    testPlan: groups,
    parts: parts.map((part, index) => {
      const shift = (variation + index) % part.options.length;
      return { ...part, options: [...part.options.slice(shift), ...part.options.slice(0, shift)] };
    }),
  };
}

const validation = [
  {
    title: 'Test a workshop selection',
    requirements: [
      'A workshop booking system calls read_workshop() to collect a workshop number.',
      'Accept whole-number text from 1 to 8 inclusive. Return the chosen number as an integer.',
      'For non-numeric text or a number outside the range, display an error and ask again. Do not stop with an exception.',
    ],
    code: `def read_workshop():
    valid = False
    print("Workshop booking")
    print("Enter a workshop number from 1 to 8")
    while valid == False:
        text = input("Workshop number: ")
        try:
            value = int(text)
        except TypeError:
            print("Please enter a whole number")
        else:
            if 1 <= value < 8:
                valid = True
            else:
                print("Workshop must be from 1 to 8")
    print("Workshop selected:", value)
    return value`,
    skills: ['validation', 'type check', 'range check', 'ValueError', 'test-data'],
    hint: 'Trace which exception conversion raises and which handler can catch it. For a numeric entry, follow the flag through the range check.',
    tests: [
      {
        expected: 'Returns integer 8 after one prompt',
        expectedWrong: ['Requests a second entry', 'The function works'],
        predicted: 'Requests a second entry',
        predictedWrong: [
          'Returns integer 8 after one prompt',
          'Raises ValueError after the first entry',
        ],
        why: '8 is a permitted workshop number.',
        trace:
          '8 < 8 is false. valid stays False, the error is printed and input is reached again.',
        id: 'c0',
        group: 'valid',
        input: '"8"',
        diagnosis: 0,
      },
      {
        expected: 'Returns integer 4 after two prompts',
        expectedWrong: ['Raises ValueError after the first entry', 'The function works'],
        predicted: 'Raises ValueError after the first entry',
        predictedWrong: ['Returns integer 4 after two prompts', 'Requests a third entry'],
        why: 'Reject abc, then accept workshop 4.',
        trace:
          'int("abc") raises ValueError. The TypeError handler does not catch it, so 4 is never requested.',
        id: 'c1',
        group: 'invalid',
        input: '"abc", then "4"',
        diagnosis: 1,
      },
    ],
    diagnoses: [
      {
        cause: 'The upper comparison excludes 8',
        wrongCauses: ['int() converts "8" to a string', 'The lower comparison excludes 8'],
        fix: '1 <= value <= 8',
        wrongFixes: ['1 < value <= 8', '1 <= value or value <= 8'],
        why: 'Both inclusive bounds must hold; or would admit out-of-range values.',
      },
      {
        cause: 'The handler catches TypeError, but int("abc") raises ValueError',
        wrongCauses: [
          'The range check converts abc to zero',
          'The valid flag is True before input',
        ],
        fix: 'Replace except TypeError: with except ValueError:',
        wrongFixes: ['Replace int(text) with str(text)', 'Return text from the exception handler'],
        why: 'Catch failed integer conversion and let the loop ask again.',
      },
    ],
    next: {
      prompt: 'After both corrections, which sequence checks decimal text and recovery?',
      answer: 'Entries "2.5", "2" → integer 2 after two prompts',
      wrong: [
        'Entries "2.5", "2" → float 2.5 after one prompt',
        'Entries "2.5", "2" → integer 2 after one prompt',
      ],
      why: 'Decimal text cannot be converted with int(); the next entry can.',
    },
    functionName: 'read_workshop',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer: '"1" — valid boundary; "4" — normal valid; "8" — valid boundary',
          wrong: [
            '"1" — invalid input; "4" — normal valid; "8" — valid boundary',
            '"0" — valid boundary; "4" — normal valid; "8" — valid boundary',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"0" — invalid boundary; "9" — invalid boundary; "20" — other invalid, correct type; "abc" — invalid type/format; "2.5" — invalid type/format',
          wrong: [
            '"0" — valid input; "9" — invalid boundary; "20" — other invalid, correct type; "abc" — invalid type/format; "2.5" — invalid type/format',
            '"1" — invalid boundary; "9" — invalid boundary; "20" — other invalid, correct type; "abc" — invalid type/format; "2.5" — invalid type/format',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test member ID entry',
    requirements: [
      'read_member_id() collects an ID for a customer record. Return it as a string, retaining leading zeros.',
      'An ID has exactly four ASCII digits 0–9. Do not strip spaces or convert it to a number.',
      'Explain invalid entries and keep asking until an entry meets both the length and character rules.',
    ],
    code: `def read_member_id():
    valid = False
    print("Customer identification")
    while valid == False:
        text = input("Four-digit member ID: ")
        if text.isascii() and text.isdigit():
            if len(text) >= 4:
                valid = True
            else:
                print("ID must have exactly four characters")
        else:
            print("ID must contain only digits 0 to 9")
            print("Spaces and letters are not allowed")
    print("Member ID accepted")
    return text`,
    skills: ['validation', 'length check', 'format check', 'test-data'],
    hint: 'Check the length and character conditions separately. Passing the character check does not establish the required length.',
    tests: [
      {
        expected: 'Returns string "0071" after two prompts',
        expectedWrong: ['Returns string "00712" after one prompt', 'The function works'],
        predicted: 'Returns string "00712" after one prompt',
        predictedWrong: [
          'Returns string "0071" after two prompts',
          'Returns integer 712 after one prompt',
        ],
        why: 'The five-character entry is invalid; the four-digit entry retains its leading zeros.',
        trace:
          'The first entry passes the character checks and len(text) >= 4, so the loop stops too early.',
        id: 'c0',
        group: 'invalid',
        input: '"00712", then "0071"',
        diagnosis: 0,
      },
      {
        id: 'c1',
        group: 'valid',
        input: '"0071"',
        expected: 'Returns string "0071" after one prompt',
        expectedWrong: ['Requests a second entry', 'The function works'],
        predicted: 'Returns string "0071" after one prompt',
        predictedWrong: ['Requests a second entry', 'Raises TypeError'],
        why: 'Four ASCII digits meet the length and character requirements.',
        trace: 'All checks pass and the original string is returned.',
        diagnosis: null,
      },
    ],
    diagnoses: [
      {
        cause: 'The length check also accepts longer IDs',
        wrongCauses: [
          'isdigit() removes leading zeros',
          'The ASCII check rejects all digit strings',
        ],
        fix: 'if len(text) == 4:',
        wrongFixes: ['if len(text) <= 4:', 'if len(text) == 4 or text.isdigit():'],
        why: 'Require exact length and retain both character checks.',
      },
    ],
    next: {
      prompt: 'Which regression test checks the character rule after repair?',
      answer: 'Entries "0A71", "0071" → string "0071" after two prompts',
      wrong: [
        'Entries "0A71", "0071" → string "0A71" after one prompt',
        'Entry "0071" → integer 71 after one prompt',
      ],
      why: 'The letter must be rejected while the valid ID must keep its leading zeros.',
    },
    functionName: 'read_member_id',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer:
            '"0071" — valid exact length; "1234" — valid exact length; "9000" — valid exact length',
          wrong: [
            '"0071" — invalid input; "1234" — valid exact length; "9000" — valid exact length',
            '"007" — valid exact length; "1234" — valid exact length; "9000" — valid exact length',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"007" — invalid boundary; "00712" — invalid boundary; "12" — other invalid length; "0A71" — invalid type/format; " 071" — invalid type/format',
          wrong: [
            '"007" — valid input; "00712" — invalid boundary; "12" — other invalid length; "0A71" — invalid type/format; " 071" — invalid type/format',
            '"0071" — invalid boundary; "00712" — invalid boundary; "12" — other invalid length; "0A71" — invalid type/format; " 071" — invalid type/format',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test a customer name',
    requirements: [
      'read_customer_name() collects the name for a booking and strips surrounding whitespace.',
      'A name must contain at least one character after stripping. Return the stripped string.',
      'An empty or all-whitespace entry must produce an error message and another prompt.',
    ],
    code: `def read_customer_name():
    valid = False
    print("Customer details")
    while valid == False:
        text = input("Customer name: ")
        cleaned = text.strip()
        if text:
            valid = True
        else:
            print("A customer name is required")
            print("Please enter the name again")
    print("Name accepted:", cleaned)
    return cleaned`,
    skills: ['validation', 'presence check', 'whitespace', 'test-data'],
    hint: 'Trace both text and cleaned for an all-space input; they need not have the same truth value.',
    tests: [
      {
        expected: 'Returns string "Ada" after two prompts',
        expectedWrong: ['Returns empty string "" after one prompt', 'The function works'],
        predicted: 'Returns empty string "" after one prompt',
        predictedWrong: [
          'Returns string "Ada" after two prompts',
          'Raises NameError after the first entry',
        ],
        why: 'Spaces alone fail the presence rule; Ada is returned without surrounding spaces.',
        trace:
          'The original spaces form a non-empty string, so valid becomes True even though cleaned is empty.',
        id: 'c0',
        group: 'invalid',
        input: '"   ", then " Ada "',
        diagnosis: 0,
      },
      {
        id: 'c1',
        group: 'valid',
        input: '" Ada "',
        expected: 'Returns string "Ada" after one prompt',
        expectedWrong: ['Requests a second entry', 'The function works'],
        predicted: 'Returns string "Ada" after one prompt',
        predictedWrong: ['Requests a second entry', 'Raises TypeError'],
        why: 'Strip surrounding spaces and return the non-empty name.',
        trace: 'The original text is non-empty; cleaned contains Ada.',
        diagnosis: null,
      },
    ],
    diagnoses: [
      {
        cause: 'It tests the original text rather than cleaned',
        wrongCauses: [
          'strip() changes the original string in place',
          'An empty string and None have the same type',
        ],
        fix: 'if cleaned:',
        wrongFixes: ['if text is not None:', 'if len(text) >= 0:'],
        why: 'Check the value after stripping; the original input can contain only whitespace.',
      },
    ],
    next: {
      prompt: 'Which sequence checks an empty entry after repair?',
      answer: 'Entries "", "Jo" → string "Jo" after two prompts',
      wrong: [
        'Entries "", "Jo" → empty string after one prompt',
        'Entries "", "Jo" → NameError after the first entry',
      ],
      why: 'Reject an empty first entry and return the later name.',
    },
    functionName: 'read_customer_name',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer:
            '"A" — valid presence boundary; "Ada" — normal valid; " Jo " — valid after trimming',
          wrong: [
            '"A" — invalid input; "Ada" — normal valid; " Jo " — valid after trimming',
            '"" — valid presence boundary; "Ada" — normal valid; " Jo " — valid after trimming',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"" — invalid presence; "   " — invalid presence after trimming; "\\t" — invalid presence after trimming',
          wrong: [
            '"" — valid input; "   " — invalid presence after trimming; "\\t" — invalid presence after trimming',
            '"A" — invalid presence; "   " — invalid presence after trimming; "\\t" — invalid presence after trimming',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test a stock adjustment',
    requirements: [
      'read_adjustment() collects an adjustment to a stock count. Positive, zero and negative integers are allowed.',
      'Return the adjustment as an integer. Use int() to validate whole-number text.',
      'If conversion fails, display an error and ask again. There is no range restriction.',
    ],
    code: `def read_adjustment():
    valid = False
    print("Stock adjustment")
    print("Use a negative number to remove stock")
    while valid == False:
        text = input("Adjustment: ")
        try:
            int(text)
        except ValueError:
            print("Enter a whole number")
            print("The stock count has not been changed")
        else:
            valid = True
    print("Adjustment accepted:", text)
    return text`,
    skills: ['validation', 'type check', 'conversion', 'test-data'],
    hint: 'A conversion returns a new value. Check which value the final return actually uses.',
    tests: [
      {
        expected: 'Returns integer 12 after two prompts',
        expectedWrong: ['Returns string "12" after two prompts', 'The function works'],
        predicted: 'Returns string "12" after two prompts',
        predictedWrong: [
          'Returns integer 12 after two prompts',
          'Raises ValueError after the first entry',
        ],
        why: '2.5 is invalid integer text; the later 12 must be returned as an integer.',
        trace:
          'Conversion fails and retries for 2.5. The successful conversion of 12 is discarded and the original text is returned.',
        id: 'c0',
        group: 'invalid',
        input: '"2.5", then "12"',
        diagnosis: 0,
      },
      {
        id: 'c1',
        group: 'valid',
        input: '"12"',
        expected: 'Returns integer 12 after one prompt',
        expectedWrong: ['Returns string "12" after one prompt', 'The function works'],
        predicted: 'Returns string "12" after one prompt',
        predictedWrong: ['Returns integer 12 after one prompt', 'Requests a second entry'],
        why: 'Return the integer represented by the entry.',
        trace: 'The conversion succeeds but its value is discarded; the original text is returned.',
        diagnosis: 0,
      },
    ],
    diagnoses: [
      {
        cause: 'The conversion result is discarded',
        wrongCauses: [
          'int() edits text in place',
          'The exception handler converts integers to strings',
        ],
        fix: 'text = int(text)',
        wrongFixes: ['text = str(text)', 'text = float(text)'],
        why: 'Store the converted value. The existing return then returns an integer and the handler still retries invalid text.',
      },
    ],
    next: {
      prompt: 'Which test confirms invalid-text recovery and signed integers?',
      answer: 'Entries "abc", "-3" → integer -3 after two prompts',
      wrong: [
        'Entries "abc", "-3" → string "abc" after one prompt',
        'Entries "abc", "-3" → request a third entry',
      ],
      why: 'The invalid-text path must still retry; negative integer adjustments are permitted.',
    },
    functionName: 'read_adjustment',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer: '"-3" — valid negative integer; "0" — valid zero; "12" — valid positive integer',
          wrong: [
            '"-3" — invalid input; "0" — valid zero; "12" — valid positive integer',
            '"abc" — valid negative integer; "0" — valid zero; "12" — valid positive integer',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"abc" — invalid type/format; "2.5" — invalid type/format; "" — invalid type/format; "12x" — invalid type/format',
          wrong: [
            '"abc" — valid input; "2.5" — invalid type/format; "" — invalid type/format; "12x" — invalid type/format',
            '"-3" — invalid type/format; "2.5" — invalid type/format; "" — invalid type/format; "12x" — invalid type/format',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test booking-code entry',
    requirements: [
      'read_booking_code() collects and returns a booking code as a string.',
      'The code must be exactly five characters: uppercase BK followed by three ASCII digits 0–9. Leading zeros are allowed.',
      'Reject a wrong length, prefix or suffix with an error message and ask again. Do not change the entry’s case.',
    ],
    code: `def read_booking_code():
    valid = False
    print("Find a booking")
    while valid == False:
        text = input("Booking code: ")
        if len(text) != 5:
            print("The code must have five characters")
        elif text[:2] != "BK":
            print("The code must start with BK")
        else:
            suffix = text[2:]
            if len(suffix) == 3:
                valid = True
            else:
                print("The suffix must be three digits")
    print("Booking code accepted:", text)
    return text`,
    skills: ['validation', 'format check', 'length check', 'test-data'],
    hint: 'Follow the branches for a code of the correct length and prefix. Consider what the final condition establishes about the suffix.',
    tests: [
      {
        expected: 'Returns string "BK007" after two prompts',
        expectedWrong: ['Returns string "BK0A7" after one prompt', 'The function works'],
        predicted: 'Returns string "BK0A7" after one prompt',
        predictedWrong: [
          'Returns string "BK007" after two prompts',
          'Raises ValueError after the first entry',
        ],
        why: 'The first suffix contains A; the second has three ASCII digits.',
        trace:
          'The first entry reaches the last branch. Its three-character suffix passes the length test, without any character check.',
        id: 'c0',
        group: 'invalid',
        input: '"BK0A7", then "BK007"',
        diagnosis: 0,
      },
      {
        id: 'c1',
        group: 'valid',
        input: '"BK007"',
        expected: 'Returns string "BK007" after one prompt',
        expectedWrong: ['Requests a second entry', 'The function works'],
        predicted: 'Returns string "BK007" after one prompt',
        predictedWrong: ['Requests a second entry', 'Raises TypeError'],
        why: 'The length, prefix and suffix all meet the requirements.',
        trace: 'The valid entry passes every condition that is present.',
        diagnosis: null,
      },
    ],
    diagnoses: [
      {
        cause: 'Every suffix character must be an ASCII digit',
        wrongCauses: ['The prefix must be lowercase', 'All five characters must be digits'],
        fix: 'if suffix.isascii() and suffix.isdigit():',
        wrongFixes: ['if text.isdigit():', 'if suffix.isascii() or suffix.isdigit():'],
        why: 'Earlier checks establish the length and prefix. Both ASCII and digit checks are needed for the suffix.',
      },
    ],
    next: {
      prompt: 'Which regression test checks prefix case and leading zeros?',
      answer: 'Entries "bk007", "BK007" → string "BK007" after two prompts',
      wrong: [
        'Entries "bk007", "BK007" → string "bk007" after one prompt',
        'Entry "BK007" → integer 7 after one prompt',
      ],
      why: 'Lowercase bk must be rejected and the valid string must retain both leading zeros.',
    },
    functionName: 'read_booking_code',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer: '"BK007" — valid format; "BK100" — valid format; "BK999" — valid format',
          wrong: [
            '"BK007" — invalid input; "BK100" — valid format; "BK999" — valid format',
            '"BK07" — valid format; "BK100" — valid format; "BK999" — valid format',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"BK07" — invalid boundary; "BK0007" — invalid boundary; "bk007" — invalid type/format; "BK0A7" — invalid type/format; "XX007" — invalid type/format',
          wrong: [
            '"BK07" — valid input; "BK0007" — invalid boundary; "bk007" — invalid type/format; "BK0A7" — invalid type/format; "XX007" — invalid type/format',
            '"BK007" — invalid boundary; "BK0007" — invalid boundary; "bk007" — invalid type/format; "BK0A7" — invalid type/format; "XX007" — invalid type/format',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test a purchase menu',
    requirements: [
      'read_platform() collects the platform used for a purchase.',
      'Exact text "1" selects "Online"; exact text "2" selects "In-store". Return the selected platform as a string.',
      'Reject every other entry with a message and ask again. Do not strip whitespace or convert the entry to a number.',
    ],
    code: `def read_platform():
    valid = False
    while valid == False:
        print("Purchase platform")
        print("1. Online")
        print("2. In-store")
        selection = input("Enter 1 or 2: ")
        if selection == "1":
            platform = "Online"
            valid = True
        elif selection == 2:
            platform = "In-store"
            valid = True
        else:
            print("That option is not available")
    print("Platform selected:", platform)
    return platform`,
    skills: ['validation', 'type check', 'menu input', 'test-data'],
    hint: 'Compare the type returned by input() with the type of the literal on the right of ==.',
    tests: [
      {
        expected: 'Returns string "In-store" after one prompt',
        expectedWrong: ['Requests a second entry', 'The function works'],
        predicted: 'Requests a second entry',
        predictedWrong: [
          'Returns string "In-store" after one prompt',
          'Raises TypeError after the first entry',
        ],
        why: 'Exact text 2 selects In-store.',
        trace:
          'The string "2" is unequal to integer 2, so the invalid-option branch runs and valid stays False.',
        id: 'c0',
        group: 'valid',
        input: '"2"',
        diagnosis: 0,
      },
      {
        id: 'c1',
        group: 'invalid',
        input: '"02", then "1"',
        expected: 'Returns string "Online" after two prompts',
        expectedWrong: ['Returns None', 'The function works'],
        predicted: 'Returns string "Online" after two prompts',
        predictedWrong: ['Returns None', 'Raises TypeError'],
        why: '02 is not an exact permitted option; the later 1 selects Online.',
        trace: '02 matches neither branch. The next entry matches the Online branch.',
        diagnosis: null,
      },
    ],
    diagnoses: [
      {
        cause: 'The comparison uses integer 2 instead of string "2"',
        wrongCauses: [
          'input text is automatically converted to an integer',
          'Comparing a string and an integer always raises TypeError',
        ],
        fix: 'elif selection == "2":',
        wrongFixes: ['elif int(selection) == 2:', 'elif selection.strip() == "2":'],
        why: 'Compare strings directly; conversion or stripping would also admit forbidden entries.',
      },
    ],
    next: {
      prompt: 'Which regression test rejects a leading zero and checks the other branch?',
      answer: 'Entries "02", "1" → string "Online" after two prompts',
      wrong: [
        'Entries "02", "1" → string "In-store" after one prompt',
        'Entry "1" → request a second entry',
      ],
      why: 'Do not admit 02 through numeric conversion; the Online branch must still work.',
    },
    functionName: 'read_platform',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer: '"1" — valid menu option; "2" — valid menu option',
          wrong: [
            '"1" — invalid input; "2" — valid menu option',
            '"0" — valid menu option; "2" — valid menu option',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"0" — invalid menu option; "3" — invalid menu option; "02" — invalid type/format; " 2 " — invalid type/format; "abc" — invalid type/format',
          wrong: [
            '"0" — valid input; "3" — invalid menu option; "02" — invalid type/format; " 2 " — invalid type/format; "abc" — invalid type/format',
            '"1" — invalid menu option; "3" — invalid menu option; "02" — invalid type/format; " 2 " — invalid type/format; "abc" — invalid type/format',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
];

const calculation = [
  {
    title: 'Test an order total',
    requirements: [
      'order_total(prices, delivery) receives a non-empty list of positive whole-pound integer prices and a Boolean delivery flag. Inputs are already validated.',
      'Add all item prices. Add one £2 delivery fee when delivery is True; collection has no fee.',
      'Print the subtotal, delivery fee and final total. Return the final total as an integer number of pounds.',
      'Test valid arguments here; rejecting invalid arguments is the caller’s responsibility.',
    ],
    code: `def order_total(prices, delivery):
    subtotal = 0
    for price in prices:
        subtotal = subtotal + price

    if delivery:
        delivery_fee = 2
    else:
        delivery_fee = 0

    final_total = subtoatl + delivery_fee
    print("Order summary")
    print("Items:", len(prices))
    print("Subtotal: £", subtotal)
    print("Delivery: £", delivery_fee)
    print("Total: £", final_total)
    return final_total`,
    skills: ['calculation', 'NameError', 'variable names', 'test-data'],
    hint: 'Check that every name being read has been assigned, then independently calculate the required total.',
    tests: [
      {
        expected: 'Returns integer 14',
        expectedWrong: ['Raises NameError', 'The function works'],
        predicted: 'Raises NameError',
        predictedWrong: ['Returns integer 14', 'Returns integer 18'],
        why: '3 + 5 + 4 = 12; add one £2 delivery fee.',
        trace: 'The loop calculates subtotal, but final_total reads the undefined name subtoatl.',
        id: 'c0',
        group: 'valid',
        input: '[3, 5, 4], True',
        diagnosis: 0,
      },
    ],
    diagnoses: [
      {
        cause: 'subtoatl is an undefined name',
        wrongCauses: [
          'prices is outside the function scope',
          'Adding integer prices produces a string',
        ],
        fix: 'final_total = subtotal + delivery_fee',
        wrongFixes: ['final_total = subtotal * delivery_fee', 'final_total = price + delivery_fee'],
        why: 'Use the accumulated subtotal and add the delivery fee once.',
      },
    ],
    next: {
      prompt: 'Which regression test checks collection after repair?',
      answer: 'order_total([3, 5], False) → integer 8',
      wrong: ['order_total([3, 5], False) → integer 10', 'order_total([3, 5], True) → integer 8'],
      why: 'Collection uses the zero-fee branch; both prices still contribute.',
    },
    functionName: 'order_total',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer:
            '[3], True — valid single item; [3, 5, 4], True — valid delivery; [3, 5], False — valid collection',
          wrong: [
            '[3], True — invalid input; [3, 5, 4], True — valid delivery; [3, 5], False — valid collection',
            '[], True — valid single item; [3, 5, 4], True — valid delivery; [3, 5], False — valid collection',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test a ticket charge',
    requirements: [
      'charge(tickets) receives a positive integer. Every call calculates a fresh booking charge.',
      'Charge £5 per ticket. For four or more tickets, subtract one £2 group discount from the total.',
      'Print and return the charge as integer pounds. Calls must not share an accumulated total.',
      'Test valid arguments here; rejecting invalid arguments is the caller’s responsibility.',
    ],
    code: `total = 0

def charge(tickets):
    ticket_price = 5
    group_discount = 0
    for ticket in range(tickets):
        total = total + ticket_price

    if tickets >= 4:
        group_discount = 2
    total = total - group_discount
    print("Ticket booking")
    print("Tickets:", tickets)
    print("Discount: £", group_discount)
    print("Amount due: £", total)
    return total`,
    skills: ['calculation', 'scope', 'UnboundLocalError', 'test-data'],
    hint: 'Assignment inside a function makes that name local unless declared otherwise. Check whether its first read has a local value.',
    tests: [
      {
        expected: 'Returns integer 10',
        expectedWrong: ['Returns integer 0', 'The function works'],
        predicted: 'Raises UnboundLocalError',
        predictedWrong: ['Returns integer 10', 'Returns integer 0'],
        why: 'Two tickets at £5 cost £10.',
        trace:
          'The assignment in the loop makes total local. Its first right-hand-side read has no local value, despite total = 0 outside the function.',
        id: 'c0',
        group: 'valid',
        input: '2',
        diagnosis: 0,
      },
    ],
    diagnoses: [
      {
        cause: 'Assigning total makes it local, but it is read before assignment',
        wrongCauses: [
          'Function parameters cannot be used in multiplication',
          'Python cannot store the same name in different scopes',
        ],
        fix: 'Add total = 0 inside charge(), before the for loop',
        wrongFixes: [
          'Add global total inside charge()',
          'Set total = 0 at the start of every loop iteration',
        ],
        why: 'Initialise the accumulator once per call. A global shares totals; resetting for every ticket loses earlier charges.',
      },
    ],
    next: {
      prompt: 'Which pair checks the group discount and independence of calls?',
      answer: 'charge(4), then charge(1) → integers 18, then 5',
      wrong: [
        'charge(4), then charge(1) → integers 20, then 5',
        'charge(4), then charge(1) → integers 18, then 23',
      ],
      why: 'Four tickets cost 20 minus 2; the next booking starts from zero.',
    },
    functionName: 'charge',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer:
            '1 — valid boundary; 3 — valid below discount threshold; 4 — valid discount threshold; 5 — normal valid',
          wrong: [
            '1 — invalid input; 3 — valid below discount threshold; 4 — valid discount threshold; 5 — normal valid',
            '0 — valid boundary; 3 — valid below discount threshold; 4 — valid discount threshold; 5 — normal valid',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test reward points',
    requirements: [
      'points(prices) receives a non-empty list of positive numeric prices. The caller validates the list.',
      'For each item separately, use int(price) to discard pence. Award 4 points per pound for the first £10 and 2 per pound above £10.',
      'Print the points for each item and return their sum as an integer. Start a fresh total for each call.',
      'Test valid arguments here; rejecting invalid arguments is the caller’s responsibility.',
    ],
    code: `def points(prices):
    points_earned = []
    for price in prices:
        pounds = int(price)
        if pounds > 10:
            initial_points = 40
            extra_points = (pounds - 10) * 4
            item_points = initial_points + extra_points
        else:
            item_points = pounds * 2
        points_earned.append(item_points)

    total_points = sum(points_earned)
    print("Reward points summary")
    for index in range(len(points_earned)):
        print("Item", index + 1, ":", points_earned[index])
    print("Total points:", total_points)
    return total_points`,
    skills: ['calculation', 'branches', 'multiple faults', 'test-data'],
    hint: 'Trace one input in each branch. A correct boundary comparison does not establish that either multiplier is correct.',
    tests: [
      {
        expected: 'Returns integer 28',
        expectedWrong: ['Returns integer 14', 'The function works'],
        predicted: 'Returns integer 14',
        predictedWrong: ['Returns integer 28', 'Returns integer 16'],
        why: 'Truncate each price: 5 × 4 + 2 × 4 = 28.',
        trace: 'The lower branch awards 5 × 2 + 2 × 2 = 14.',
        id: 'c0',
        group: 'valid',
        input: '[5.75, 2.25]',
        diagnosis: 0,
      },
      {
        expected: 'Returns integer 86',
        expectedWrong: ['Returns integer 92', 'The function works'],
        predicted: 'Returns integer 92',
        predictedWrong: ['Returns integer 86', 'Returns integer 90'],
        why: 'The items earn 40 + 1 × 2 = 42 and 40 + 2 × 2 = 44, giving 86.',
        trace: 'Both items take the upper branch: 40 + 1 × 4 = 44 and 40 + 2 × 4 = 48, giving 92.',
        id: 'c1',
        group: 'valid',
        input: '[11.50, 12.25]',
        diagnosis: 1,
      },
    ],
    diagnoses: [
      {
        cause: 'It awards 2 points per pound instead of 4',
        wrongCauses: [
          'The branch should never return a value',
          'The comparison excludes 5 from both branches',
        ],
        fix: 'item_points = pounds * 4',
        wrongFixes: ['item_points = pounds + 4', 'item_points = pounds * 2 + 4'],
        why: 'The lower tier requires four points for every whole pound.',
      },
      {
        cause: 'The extra pounds use the lower-tier rate',
        wrongCauses: [
          'The first ten pounds should earn no points',
          'The upper branch must multiply the entire amount by 2',
        ],
        fix: 'extra_points = (pounds - 10) * 2',
        wrongFixes: ['extra_points = pounds * 2', 'extra_points = (pounds - 10) + 2'],
        why: 'Keep 40 points for the first ten pounds and apply two only to the remainder.',
      },
    ],
    next: {
      prompt: 'After both repairs, which test checks that pence are discarded per item?',
      answer: 'points([1.75, 1.75]) → integer 8',
      wrong: ['points([1.75, 1.75]) → integer 12', 'points([1.75, 1.75]) → integer 14'],
      why: 'Each price contributes one whole pound, giving 4 + 4 points. Combining prices before truncating changes the rule.',
    },
    functionName: 'points',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer:
            '[5.75, 2.25] — valid lower tier; [10.00] — valid rate boundary; [11.50, 12.25] — valid upper tier',
          wrong: [
            '[5.75, 2.25] — invalid input; [10.00] — valid rate boundary; [11.50, 12.25] — valid upper tier',
            '[-1] — valid lower tier; [10.00] — valid rate boundary; [11.50, 12.25] — valid upper tier',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test a discounted price',
    requirements: [
      'discount() asks for the price of an item. Accept positive numeric text; reject failed conversion and values of zero or less with a message and another prompt.',
      'Apply a 20% discount. Print the original price, saving and amount due, formatted to two decimal places.',
      'Return the amount due as a float rounded to two decimal places.',
    ],
    code: `def discount():
    valid = False
    while valid == False:
        text = input("Item price: £")
        try:
            amount = float(text)
        except ValueError:
            print("Enter a numeric price")
        else:
            if amount > 0:
                valid = True
            else:
                print("Price must be greater than zero")

    price = text
    saving = price * 0.20
    amount_due = round(price - saving, 2)
    print("Original: £{:.2f}".format(price))
    print("Saving: £{:.2f}".format(saving))
    print("Amount due: £{:.2f}".format(amount_due))
    return amount_due`,
    skills: ['calculation', 'conversion', 'TypeError', 'test-data'],
    hint: 'input text remains a string until a conversion is stored or returned. Check the operand types before doing the arithmetic.',
    tests: [
      {
        expected: 'Returns float 10.0 after two prompts',
        expectedWrong: ['Raises TypeError after the second entry', 'The function works'],
        predicted: 'Raises TypeError after the second entry',
        predictedWrong: [
          'Returns float 10.0 after two prompts',
          'Raises ValueError after the first entry',
        ],
        why: 'Reject abc; the customer then pays 80% of £12.50, which is £10.00.',
        trace:
          'Validation succeeds for the second entry, but price is assigned the string text. Multiplying it by 0.20 raises TypeError.',
        id: 'c0',
        group: 'invalid',
        input: '"abc", then "12.50"',
        diagnosis: 0,
      },
      {
        id: 'c1',
        group: 'valid',
        input: '"12.50"',
        expected: 'Returns float 10.0 after one prompt',
        expectedWrong: ['Raises TypeError after the first entry', 'The function works'],
        predicted: 'Raises TypeError after the first entry',
        predictedWrong: ['Returns float 10.0 after one prompt', 'Requests a second entry'],
        why: 'The customer pays 80% of 12.50.',
        trace:
          'Validation succeeds, but the calculation multiplies the original string by a float.',
        diagnosis: 0,
      },
    ],
    diagnoses: [
      {
        cause: 'price is assigned the original string after successful numeric validation',
        wrongCauses: [
          'The exception handler converts amount into a string',
          'round() cannot return a float',
        ],
        fix: 'price = amount',
        wrongFixes: ['price = int(amount)', 'price = str(amount)'],
        why: 'Use the float already produced by validation, preserving the pence.',
      },
    ],
    next: {
      prompt: 'Which test checks range rejection and a different decimal price?',
      answer: 'Entries "0", "2.75" → float 2.2 after two prompts',
      wrong: [
        'Entries "0", "2.75" → float 0.0 after one prompt',
        'Entries "0", "2.75" → float 0.55 after two prompts',
      ],
      why: 'Reject zero, then calculate 2.75 minus the 0.55 saving.',
    },
    functionName: 'discount',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer:
            '"0.01" — valid small positive price; "2.75" — normal valid; "12.50" — normal valid',
          wrong: [
            '"0.01" — invalid input; "2.75" — normal valid; "12.50" — normal valid',
            '"0" — valid small positive price; "2.75" — normal valid; "12.50" — normal valid',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"0" — invalid boundary; "-2" — other invalid, correct type; "abc" — invalid type/format; "" — invalid type/format; "12x" — invalid type/format',
          wrong: [
            '"0" — valid input; "-2" — other invalid, correct type; "abc" — invalid type/format; "" — invalid type/format; "12x" — invalid type/format',
            '"0.01" — invalid boundary; "-2" — other invalid, correct type; "abc" — invalid type/format; "" — invalid type/format; "12x" — invalid type/format',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test a room-booking fee',
    requirements: [
      'fee(hours, weekend) receives an integer from 1 to 4 and a Boolean flag. The caller validates both inputs.',
      'Charge £3 per hour on weekdays or £5 per hour at weekends. Subtract one £1 discount for bookings of at least three hours.',
      'Then add one £2 booking fee. Print a breakdown and return the total as integer pounds.',
      'Test valid arguments here; rejecting invalid arguments is the caller’s responsibility.',
    ],
    code: `def fee(hours, weekend):
    if weekend:
        hourly_rate = 5
    else:
        hourly_rate = 3
    hire_charge = hours * hourly_rate
    discount = 0
    if hours >= 3:
        discount = 1
    booking_fee = 2
    total = hire_charge - discount + booking_fee
    print("Room booking summary")
    print("Hire charge: £", hire_charge)
    print("Discount: £", discount)
    print("Booking fee: £", booking_fee)
    print("Total: £", total)
    return total`,
    skills: ['calculation', 'passing-test', 'regression', 'test-data'],
    hint: 'A debugging question can include working code. Compare the expression with the requirement before proposing a change.',
    tests: [
      {
        expected: 'Returns integer 8',
        expectedWrong: ['Returns integer 10', 'The function works'],
        predicted: 'Returns integer 8',
        predictedWrong: ['Returns integer 10', 'Raises UnboundLocalError'],
        why: 'Two weekday hours cost 6, no discount applies, and the £2 booking fee makes 8.',
        trace:
          'The weekday rate is 3. hours is below 3, so discount remains zero; total is 2 × 3 - 0 + 2.',
        id: 'c0',
        group: 'valid',
        input: '2, False',
        diagnosis: 0,
      },
    ],
    diagnoses: [
      {
        cause: 'The predicted result matches the requirement for this input',
        wrongCauses: [
          'The booking fee is charged twice',
          'The result proves every possible input is correct',
        ],
        fix: 'Keep the code; test the other rate and discount branches',
        wrongFixes: ['Multiply hours by hourly_rate + booking_fee', 'Remove the booking fee'],
        why: 'The supplied test matches its requirement. It does not exercise weekend pricing or the discount.',
      },
    ],
    next: {
      prompt: 'Which tests cover the weekend rate and both sides of the discount boundary?',
      answer: 'fee(2, True) → 12; fee(3, True) → 16',
      wrong: ['fee(2, True) → 12; fee(3, True) → 17', 'fee(2, False) → 8; fee(2, False) → 8'],
      why: 'Two weekend hours cost 10 + 2; three cost 15 - 1 + 2.',
    },
    functionName: 'fee',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer: '1, False — valid boundary; 2, False — normal valid; 4, True — valid boundary',
          wrong: [
            '1, False — invalid input; 2, False — normal valid; 4, True — valid boundary',
            '0, False — valid boundary; 2, False — normal valid; 4, True — valid boundary',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test equipment-hire charges',
    requirements: [
      'cost(days) receives a positive integer number of hire days. The caller validates it.',
      'Charge £4 for each of days 1 and 2, then £3 for each later day. There are no other fees.',
      'Print the charge for each day and a summary. Return the total as integer pounds.',
      'Test valid arguments here; rejecting invalid arguments is the caller’s responsibility.',
    ],
    code: `def cost(days):
    total = 0
    standard_rate = 4
    reduced_rate = 3
    print("Equipment hire charges")
    for day in range(1, days):
        if day <= 2:
            daily_charge = standard_rate
        else:
            daily_charge = reduced_rate
        total = total + daily_charge
        print("Day", day, ": £", daily_charge)

    print("Hire summary")
    print("Days booked:", days)
    print("Amount due: £", total)
    return total`,
    skills: ['calculation', 'iteration', 'off-by-one', 'test-data'],
    hint: 'List the values produced by range() for the supplied number of days; its stop value is excluded.',
    tests: [
      {
        expected: 'Returns integer 11',
        expectedWrong: ['Returns integer 8', 'The function works'],
        predicted: 'Returns integer 8',
        predictedWrong: ['Returns integer 11', 'Returns integer 12'],
        why: 'Days 1 and 2 cost 4 each, and day 3 costs 3: total 11.',
        trace:
          'range(1, 3) visits only days 1 and 2. Both charge 4; the reduced-rate day is omitted.',
        id: 'c0',
        group: 'valid',
        input: '3',
        diagnosis: 0,
      },
    ],
    diagnoses: [
      {
        cause: 'The loop executes one fewer time than the number of days',
        wrongCauses: ['The loop charges four times for each day', 'total is reset inside the loop'],
        fix: 'for day in range(1, days + 1):',
        wrongFixes: ['for day in range(days):', 'for day in range(1, days + 2):'],
        why: 'Visit day numbers 1 through days. Starting at zero would change which days receive the reduced rate.',
      },
    ],
    next: {
      prompt: 'Which test checks the smallest allowed booking?',
      answer: 'cost(1) should return integer 4',
      wrong: ['cost(1) should return integer 0', 'cost(0) should return integer 4'],
      why: 'A one-day booking must execute the body once. Zero days is outside the stated caller contract.',
    },
    functionName: 'cost',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer:
            '1 — valid boundary; 2 — valid last standard-rate day; 3 — valid first reduced-rate day; 5 — normal valid',
          wrong: [
            '1 — invalid input; 2 — valid last standard-rate day; 3 — valid first reduced-rate day; 5 — normal valid',
            '0 — valid boundary; 2 — valid last standard-rate day; 3 — valid first reduced-rate day; 5 — normal valid',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
    ],
  },
];

const retry = [
  {
    title: 'Test access-code entry',
    requirements: [
      'read_code() asks for strings until one has exactly four characters. Any characters are allowed.',
      'Reject a wrong-length entry by asking again. Return the first valid string.',
      'Display a length error before each retry and an acceptance message when valid.',
    ],
    code: `def read_code():
    print("Register an access code")
    text = input("Code: ")
    valid = False
    while valid == False:
        if len(text) == 4:
            valid = True
        else:
            if len(text) < 4:
                print("The code is too short")
            else:
                print("The code is too long")
            print("Please enter exactly four characters")
            input("Code: ")
    print("Access code accepted:", text)
    return text`,
    skills: ['validation', 'length check', 'retry', 'test-data'],
    hint: 'Keep a trace of text and valid. Check which statements update them when a retry is requested.',
    tests: [
      {
        expected: 'Returns string "ABCD" after two prompts',
        expectedWrong: ['Requests a third entry', 'The function works'],
        predicted: 'Requests a third entry',
        predictedWrong: ['Returns string "ABCD" after two prompts', 'Raises NameError'],
        why: 'The second entry has the required four characters.',
        trace: 'The second reply is discarded. text remains "ABC", so the loop asks again.',
        id: 'c0',
        group: 'invalid',
        input: '"ABC", then "ABCD"',
        diagnosis: 0,
      },
      {
        id: 'c1',
        group: 'valid',
        input: '"WXYZ"',
        expected: 'Returns string "WXYZ" after one prompt',
        expectedWrong: ['Requests a second entry', 'The function works'],
        predicted: 'Returns string "WXYZ" after one prompt',
        predictedWrong: ['Requests a second entry', 'Raises TypeError'],
        why: 'A four-character entry needs no retry.',
        trace: 'The first length check succeeds and the loop finishes.',
        diagnosis: null,
      },
    ],
    diagnoses: [
      {
        cause: 'The retry does not update text',
        wrongCauses: [
          'len() counts the quote marks',
          'The loop condition checks a global variable',
        ],
        fix: 'text = input("Code: ")',
        wrongFixes: ['text == input("Code: ")', 'return input("Code: ")'],
        why: 'Store every reply and recheck its length; returning immediately would accept an invalid retry.',
      },
    ],
    next: {
      prompt: 'Which test checks that no retry is required for a valid first entry?',
      answer: 'Entry "WXYZ" → return "WXYZ" after one prompt',
      wrong: ['Entry "WXYZ" → request a second entry', 'Entry "WX" → return "WX" after one prompt'],
      why: 'A repair must preserve the already-valid first-entry path.',
    },
    functionName: 'read_code',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer:
            '"ABCD" — valid exact length; "WXYZ" — valid exact length; "12!?" — valid exact length',
          wrong: [
            '"ABCD" — invalid input; "WXYZ" — valid exact length; "12!?" — valid exact length',
            '"ABC" — valid exact length; "WXYZ" — valid exact length; "12!?" — valid exact length',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"ABC" — invalid boundary; "ABCDE" — invalid boundary; "A" — other invalid length; "" — other invalid length',
          wrong: [
            '"ABC" — valid input; "ABCDE" — invalid boundary; "A" — other invalid length; "" — other invalid length',
            '"ABCD" — invalid boundary; "ABCDE" — invalid boundary; "A" — other invalid length; "" — other invalid length',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test a delivery menu',
    requirements: [
      'read_choice() asks for whole-number text from 1 to 3 inclusive and returns an integer.',
      'For failed conversion or an out-of-range number, ask again. Do not terminate with an exception.',
    ],
    code: `def read_choice():
    valid = False
    while valid == False:
        print("Delivery service")
        print("1. Standard  2. Express  3. Collection")
        text = input("Choice: ")
        try:
            value = int(text)
        except TypeError:
            print("Enter a whole number")
        else:
            if 1 <= value < 3:
                valid = True
            else:
                print("Choose a number from 1 to 3")
    print("Service selected:", value)
    return value`,
    skills: ['validation', 'type check', 'range check', 'retry', 'ValueError', 'test-data'],
    hint: 'Each supplied test starts a new call. One test can stop at conversion while another reaches the range condition.',
    tests: [
      {
        expected: 'Returns integer 2 after two prompts',
        expectedWrong: ['Raises ValueError after the first entry', 'The function works'],
        predicted: 'Raises ValueError after the first entry',
        predictedWrong: ['Returns integer 2 after two prompts', 'Requests a third entry'],
        why: 'The invalid first entry must be rejected and the valid second returned.',
        trace:
          'int("x") raises ValueError, but the handler catches TypeError. The call stops before asking for the second entry.',
        id: 'c0',
        group: 'invalid',
        input: '"x", then "2"',
        diagnosis: 0,
      },
      {
        expected: 'Returns integer 3 after one prompt',
        expectedWrong: ['Requests a second entry', 'The function works'],
        predicted: 'Requests a second entry',
        predictedWrong: ['Returns integer 3 after one prompt', 'Raises ValueError'],
        why: '3 is a permitted choice.',
        trace: 'Conversion succeeds, but 3 < 3 is false; the next loop iteration asks again.',
        id: 'c1',
        group: 'valid',
        input: '"3"',
        diagnosis: 1,
      },
    ],
    diagnoses: [
      {
        cause: 'The handler catches TypeError instead of ValueError',
        wrongCauses: ['input() returns an integer', 'The range check raises ValueError'],
        fix: 'Replace except TypeError: with except ValueError:',
        wrongFixes: [
          'Catch ValueError; return text',
          'Remove the conversion and compare text to 3',
        ],
        why: 'Handle failed integer conversion, leaving valid False so the next loop iteration asks again.',
      },
      {
        cause: 'The upper comparison excludes 3',
        wrongCauses: ['int("3") raises ValueError', 'The lower comparison excludes 3'],
        fix: '1 <= value <= 3',
        wrongFixes: ['1 < value <= 3', '1 <= value or value <= 3'],
        why: 'Include both limits without admitting out-of-range values.',
      },
    ],
    next: {
      prompt: 'After both repairs, which sequence checks range rejection and recovery?',
      answer: 'Entries "4", "1" → integer 1 after two prompts',
      wrong: [
        'Entries "4", "1" → integer 4 after one prompt',
        'Entries "4", "1" → None after one prompt',
      ],
      why: 'An integer can parse successfully and still require rejection by the range check.',
    },
    functionName: 'read_choice',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer: '"1" — valid boundary; "2" — normal valid; "3" — valid boundary',
          wrong: [
            '"1" — invalid input; "2" — normal valid; "3" — valid boundary',
            '"0" — valid boundary; "2" — normal valid; "3" — valid boundary',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"0" — invalid boundary; "4" — invalid boundary; "10" — other invalid, correct type; "x" — invalid type/format; "2.5" — invalid type/format',
          wrong: [
            '"0" — valid input; "4" — invalid boundary; "10" — other invalid, correct type; "x" — invalid type/format; "2.5" — invalid type/format',
            '"1" — invalid boundary; "4" — invalid boundary; "10" — other invalid, correct type; "x" — invalid type/format; "2.5" — invalid type/format',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test registration-name entry',
    requirements: [
      'read_name() collects a registration name and strips surrounding whitespace.',
      'Accept between 1 and 30 characters after stripping; otherwise display an error and ask again. Return the stripped string.',
    ],
    code: `def read_name():
    valid = False
    print("Customer registration")
    while valid == False:
        text = input("Name: ")
        name = text.strip()
        if len(name) == 0:
            print("A name is required")
        elif len(name) > 30:
            print("Use no more than 30 characters")
        else:
            valid = True
    print("Registration name:", name)
    return nmae`,
    skills: ['validation', 'presence check', 'retry', 'NameError', 'length check', 'test-data'],
    hint: 'Trace the invalid entry first, then check every name read on the valid return path.',
    tests: [
      {
        expected: 'Returns string "Ada" after two prompts',
        expectedWrong: ['Returns string " Ada " after two prompts', 'The function works'],
        predicted: 'Raises NameError after the second entry',
        predictedWrong: [
          'Returns string "Ada" after two prompts',
          'Raises NameError after the first entry',
        ],
        why: 'Reject the stripped blank input, then return the stripped valid name.',
        trace:
          'The spaces fail the presence check. Ada passes both checks, but after printing the name the function reads undefined nmae.',
        id: 'c0',
        group: 'invalid',
        input: '"   ", then " Ada "',
        diagnosis: 0,
      },
      {
        id: 'c1',
        group: 'valid',
        input: '" Jo "',
        expected: 'Returns string "Jo" after one prompt',
        expectedWrong: ['Raises NameError after the first entry', 'The function works'],
        predicted: 'Raises NameError after the first entry',
        predictedWrong: ['Returns string "Jo" after one prompt', 'Requests a second entry'],
        why: 'Strip the spaces and return the valid name.',
        trace: 'The valid entry reaches a return that reads undefined nmae.',
        diagnosis: 0,
      },
    ],
    diagnoses: [
      {
        cause: 'The return line reads nmae instead of name',
        wrongCauses: [
          'The presence check accepts an empty string',
          'strip() cannot be called on input()',
        ],
        fix: 'return name',
        wrongFixes: ['return "name"', 'return input("Name: ")'],
        why: 'Return the validated local variable; do not return a literal or ask for a new unvalidated entry.',
      },
    ],
    next: {
      prompt: 'Which test checks the return without a retry?',
      answer: 'Entry " Jo " → string "Jo" after one prompt',
      wrong: [
        'Entry " Jo " → string "name" after one prompt',
        'Entry "" → empty string after one prompt',
      ],
      why: 'The same corrected return path must also work on the first entry.',
    },
    functionName: 'read_name',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer:
            '"A" — valid boundary; " Ada " — normal valid; "ABCDEFGHIJKLMNOPQRSTUVWXYZABCD" — valid boundary',
          wrong: [
            '"A" — invalid input; " Ada " — normal valid; "ABCDEFGHIJKLMNOPQRSTUVWXYZABCD" — valid boundary',
            '"" — valid boundary; " Ada " — normal valid; "ABCDEFGHIJKLMNOPQRSTUVWXYZABCD" — valid boundary',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"" — invalid boundary; "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDE" — invalid boundary; "   " — invalid presence after trimming',
          wrong: [
            '"" — valid input; "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDE" — invalid boundary; "   " — invalid presence after trimming',
            '"A" — invalid boundary; "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDE" — invalid boundary; "   " — invalid presence after trimming',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test PIN entry',
    requirements: [
      'read_pin() asks until the entry has exactly four ASCII digits 0–9.',
      'Return the first valid PIN as a string. Count prompts locally and print the count when accepted; each call starts at zero.',
    ],
    code: `attempts = 0

def read_pin():
    valid = False
    print("Set a four-digit PIN")
    while valid == False:
        pin = input("PIN: ")
        attempts += 1
        if len(pin) == 4:
            if pin.isascii() and pin.isdigit():
                valid = True
            else:
                print("Use only digits 0 to 9")
        else:
            print("The PIN must have four characters")
    print("PIN accepted after", attempts, "attempts")
    return pin`,
    skills: [
      'validation',
      'length check',
      'format check',
      'scope',
      'UnboundLocalError',
      'test-data',
    ],
    hint: 'A compound assignment reads the old value before storing the new one. Check where that local value is first assigned.',
    tests: [
      {
        expected: 'Returns string "0071" after one prompt',
        expectedWrong: ['Returns integer 71 after one prompt', 'The function works'],
        predicted: 'Raises UnboundLocalError after the first entry',
        predictedWrong: ['Returns string "0071" after one prompt', 'Requests a second entry'],
        why: 'The PIN meets both checks and must retain its leading zeros.',
        trace:
          'attempts += 1 reads an uninitialised local variable before reaching either validation check.',
        id: 'c0',
        group: 'valid',
        input: '"0071"',
        diagnosis: 0,
      },
      {
        id: 'c1',
        group: 'invalid',
        input: '"00A1", then "0071"',
        expected: 'Returns string "0071" after two prompts',
        expectedWrong: ['Raises UnboundLocalError after the first entry', 'The function works'],
        predicted: 'Raises UnboundLocalError after the first entry',
        predictedWrong: ['Returns string "0071" after two prompts', 'Returns None'],
        why: 'Reject the letter and then return the valid PIN unchanged.',
        trace:
          'The counter reads an uninitialised local variable before validation, so no retry is requested.',
        diagnosis: 0,
      },
    ],
    diagnoses: [
      {
        cause: 'attempts is local but has no initial value in the function',
        wrongCauses: [
          'pin is outside the loop scope',
          'Leading zeros make the string invalid Python',
        ],
        fix: 'Add attempts = 0 inside the function, before while',
        wrongFixes: [
          'Add global attempts inside the function',
          'Add attempts = 0 immediately before attempts += 1',
        ],
        why: 'Initialise once per call. A global shares state; resetting inside the loop prevents counting multiple attempts.',
      },
    ],
    next: {
      prompt: 'After repair, which test checks format rejection and recovery?',
      answer: 'Entries "00A1", "0071" → string "0071" after two prompts',
      wrong: [
        'Entries "00A1", "0071" → string "00A1" after one prompt',
        'Entries "00A1", "0071" → integer 71 after two prompts',
      ],
      why: 'The first entry has the right length but an invalid character; the second satisfies both checks.',
    },
    functionName: 'read_pin',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer:
            '"0071" — valid exact length; "1234" — valid exact length; "9000" — valid exact length',
          wrong: [
            '"0071" — invalid input; "1234" — valid exact length; "9000" — valid exact length',
            '"007" — valid exact length; "1234" — valid exact length; "9000" — valid exact length',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"007" — invalid boundary; "00712" — invalid boundary; "12" — other invalid length; "00A1" — invalid type/format; " 071" — invalid type/format',
          wrong: [
            '"007" — valid input; "00712" — invalid boundary; "12" — other invalid length; "00A1" — invalid type/format; " 071" — invalid type/format',
            '"0071" — invalid boundary; "00712" — invalid boundary; "12" — other invalid length; "00A1" — invalid type/format; " 071" — invalid type/format',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test training-level entry',
    requirements: [
      'read_level() asks for whole-number text and returns an integer from 1 to 5 inclusive.',
      'Failed integer conversion and numbers outside that range must cause another prompt.',
    ],
    code: `def read_level():
    valid = False
    print("Choose a training level from 1 to 5")
    while valid == False:
        text = input("Level: ")
        try:
            level = int(text)
        except ValueError:
            print("Enter a whole number")
        else:
            if level >= 1 or level <= 5:
                valid = True
            else:
                print("Level must be from 1 to 5")
    print("Training level selected:", level)
    return level`,
    skills: ['validation', 'type check', 'range check', 'boolean logic', 'retry', 'test-data'],
    hint: 'Evaluate each side of the condition for an out-of-range number. With or, only one side needs to be true.',
    tests: [
      {
        expected: 'Returns integer 3 after two prompts',
        expectedWrong: ['Returns integer 0 after one prompt', 'The function works'],
        predicted: 'Returns integer 0 after one prompt',
        predictedWrong: ['Returns integer 3 after two prompts', 'Raises ValueError'],
        why: '0 must be rejected, then 3 accepted.',
        trace: '0 <= 5 is true, so or accepts 0 immediately; the second entry is not requested.',
        id: 'c0',
        group: 'invalid',
        input: '"0", then "3"',
        diagnosis: 0,
      },
      {
        id: 'c1',
        group: 'valid',
        input: '"3"',
        expected: 'Returns integer 3 after one prompt',
        expectedWrong: ['Requests a second entry', 'The function works'],
        predicted: 'Returns integer 3 after one prompt',
        predictedWrong: ['Requests a second entry', 'Raises TypeError'],
        why: '3 lies within the permitted range.',
        trace: 'The condition is true for 3, and the loop returns it.',
        diagnosis: null,
      },
    ],
    diagnoses: [
      {
        cause: 'or accepts a number when only one bound holds',
        wrongCauses: ['The ValueError handler returns zero', 'input() changes 0 to 3'],
        fix: 'level >= 1 and level <= 5',
        wrongFixes: ['level > 1 and level < 5', 'level >= 1 or level >= 5'],
        why: 'Both inclusive bounds must hold for the value to be valid.',
      },
    ],
    next: {
      prompt: 'Which test checks the conversion handler still works after repair?',
      answer: 'Entries "x", "5" → integer 5 after two prompts',
      wrong: [
        'Entries "x", "5" → ValueError after the first entry',
        'Entries "x", "5" → request a third entry',
      ],
      why: 'The type check already handles ValueError; the repaired bounds must also accept 5.',
    },
    functionName: 'read_level',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer: '"1" — valid boundary; "3" — normal valid; "5" — valid boundary',
          wrong: [
            '"1" — invalid input; "3" — normal valid; "5" — valid boundary',
            '"0" — valid boundary; "3" — normal valid; "5" — valid boundary',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"0" — invalid boundary; "6" — invalid boundary; "20" — other invalid, correct type; "x" — invalid type/format; "2.5" — invalid type/format',
          wrong: [
            '"0" — valid input; "6" — invalid boundary; "20" — other invalid, correct type; "x" — invalid type/format; "2.5" — invalid type/format',
            '"1" — invalid boundary; "6" — invalid boundary; "20" — other invalid, correct type; "x" — invalid type/format; "2.5" — invalid type/format',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
  {
    title: 'Test booking confirmation',
    requirements: [
      'read_confirm() must ask at least once and keep asking until the exact text "yes" is entered.',
      'Return string "yes". Do not return an empty string or accept any other entry.',
      'Display confirmation only after a valid entry. Other entries must produce a message before retrying.',
    ],
    code: `def read_confirm():
    again = False
    answer = ""
    print("Confirm the booking details")
    while again:
        answer = input("Type yes to confirm: ")
        if answer == "yes":
            print("Booking confirmed")
            again = False
        elif answer == "no":
            print("Confirmation is required to continue")
            again = True
        else:
            print("Enter the exact word yes")
            again = True
    return answer`,
    skills: ['validation', 'format check', 'retry', 'initialisation', 'test-data'],
    hint: 'Check the flag before tracing any planned input. A false loop condition can skip the prompt completely.',
    tests: [
      {
        expected: 'Returns string "yes" after two prompts',
        expectedWrong: ['Returns empty string without prompting', 'The function works'],
        predicted: 'Returns empty string without prompting',
        predictedWrong: ['Returns string "yes" after two prompts', 'Requests a third entry'],
        why: 'The function must ask, reject no, then accept yes.',
        trace:
          'again starts False, so the loop body never runs and answer remains empty. Neither planned entry is requested.',
        id: 'c0',
        group: 'invalid',
        input: '"no", then "yes"',
        diagnosis: 0,
      },
      {
        id: 'c1',
        group: 'valid',
        input: '"yes"',
        expected: 'Returns string "yes" after one prompt',
        expectedWrong: ['Returns empty string without prompting', 'The function works'],
        predicted: 'Returns empty string without prompting',
        predictedWrong: ['Returns string "yes" after one prompt', 'Requests a second entry'],
        why: 'The exact confirmation text should be read and returned.',
        trace: 'The initial flag skips the loop before any entry is requested.',
        diagnosis: 0,
      },
    ],
    diagnoses: [
      {
        cause: 'again is False before the first condition check',
        wrongCauses: ['The comparison rejects "yes"', 'The return statement is inside the loop'],
        fix: 'Set again = True before the loop',
        wrongFixes: [
          'Set answer = "yes" before the loop',
          'Set again = True at the start of the loop body',
        ],
        why: 'The first condition must pass. Changing a line inside a skipped body cannot make the body start.',
      },
    ],
    next: {
      prompt: 'Which test checks immediate acceptance after repair?',
      answer: 'First entry "yes" → return "yes" after one prompt',
      wrong: [
        'First entry "yes" → request a second entry',
        'No entries → return "yes" without prompting',
      ],
      why: 'After asking once, a valid first entry makes the updated flag False.',
    },
    functionName: 'read_confirm',
    inputGroups: [
      {
        kind: 'valid',
        data: {
          prompt: 'Choose a set of valid inputs with appropriate labels.',
          answer: '"yes" — valid exact text',
          wrong: ['"yes" — invalid input', '"no" — valid exact text'],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only valid inputs with accurate labels.',
        },
      },
      {
        kind: 'invalid',
        data: {
          prompt: 'Choose a set of invalid inputs with appropriate labels.',
          answer:
            '"no" — invalid confirmation; "YES" — invalid type/format; " yes " — invalid type/format; "" — invalid type/format',
          wrong: [
            '"no" — valid input; "YES" — invalid type/format; " yes " — invalid type/format; "" — invalid type/format',
            '"yes" — invalid confirmation; "YES" — invalid type/format; " yes " — invalid type/format; "" — invalid type/format',
          ],
          why: 'Classify inputs against the requirements, including applicable boundaries. The set must contain only invalid inputs with accurate labels.',
        },
      },
    ],
  },
];

/** Allocate explicit unused slots; called once when data/esp.js imports this module. */
function template(slot, title, cases) {
  return {
    slot,
    focus: 'task2',
    recipe: 'T2.6',
    title,
    format: 'Python test investigation',
    estimatedMinutes: 5,
    tags: ['ESP.Task2'],
    reviewStatus: 'pending',
    variations: cases.map((c, i) => liveInvestigation(slot, i, investigation(c, i))),
  };
}

export default [
  template(36, 'Test validation against requirements', validation),
  template(37, 'Test calculations against requirements', calculation),
  template(38, 'Test input and retry behaviour', retry),
];
