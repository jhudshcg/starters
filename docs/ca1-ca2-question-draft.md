# CA1–CA2 initial question draft

Historical first pass, superseded by the live exam bank and [subelement coverage report](coverage-ca1-ca2.md). Do not use its objective-level counts for coverage.

106 original one-mark question parts across 106 numbered objectives. These sample the objectives; they do **not** establish full coverage of every bullet, command verb or practical skill. No reviewed coverage is claimed.

The current delivery is an authoring draft, separate from the live application. The accepted-answer lists are deliberately narrow. They are not yet a tested marking implementation.

## Remaining work

- Split compound objectives into assessable subelements and map individual parts to those subelements. Retained source text includes the bullet lists so missing content remains visible.
- Expand under-covered lists, benefits/drawbacks and practical skills; a naming question does not demonstrate ability to design, develop or debug a whole solution.
- Add a second distinct question per element and at least two meaningful variations per question.
- Review ambiguity, acceptable alternatives, technical correctness and marking examples, including negation and contradictions.
- Group parts into three-question sets totalling 15–22 marks, then integrate with the live bank and test.

## Questions

### CA1.1.1

Name the approach that uses decomposition, pattern recognition, abstraction and algorithm design to solve problems.

**Answer (1 mark):** computational thinking

Computational thinking structures problems so that solutions can be developed systematically.

### CA1.1.2

A booking system has several interacting requirements. Name the problem-solving approach that helps break them down and design a solution.

**Answer (1 mark):** computational thinking

The problem can be analysed as smaller tasks and expressed as algorithms.

### CA1.1.3

Complete this benefit: splitting a complex problem into smaller tasks makes each task easier to ___.

**Answer (1 mark):** manage

Smaller tasks reduce the complexity considered at one time.

### CA1.1.4

Name the computational-thinking component that removes irrelevant detail.

**Answer (1 mark):** abstraction

Abstraction retains information relevant to the problem.

### CA1.1.5

Which component can lose important information if the developer removes too much detail?

**Answer (1 mark):** abstraction

The retained details must still be sufficient to solve the problem.

### CA1.1.6

Name the technique used to split a large problem into smaller manageable problems.

**Answer (1 mark):** decomposition

Decomposition makes the separate parts easier to analyse and solve.

### CA1.1.7

After identifying the main features of a problem, a developer records what each feature does. Name this decomposition task.

**Answer (1 mark):** characterise each identified feature

Characterising a feature describes its relevant properties or behaviour.

### CA1.1.8

A shop system has checkout, stock control and refunds. Name the smaller task responsible for increasing the recorded quantity when a delivery arrives.

**Answer (1 mark):** stock control

Receiving stock belongs in the stock-management part of the system.

### CA1.1.9

Name the diagram that represents smaller parts of a system as labelled blocks.

**Answer (1 mark):** block diagram

A block diagram can show how a system is decomposed into parts.

### CA1.1.10

Complete this written decomposition of checkout: 1 calculate total; 2 take payment; 3 produce a ___.

**Answer (1 mark):** receipt

A written description can represent the smaller tasks within checkout.

### CA1.1.11

Name the technique that identifies similarities between problems so an existing solution may be reused.

**Answer (1 mark):** pattern recognition

Recognising common features helps a developer adapt existing approaches.

### CA1.1.12

A monitoring system records failures at 09:00, 10:00 and 11:00. Assuming the pattern continues, state the next predicted failure time.

**Answer (1 mark):** 12:00

The observations suggest an hourly pattern; the prediction still needs verification.

### CA1.1.13

A route planner retains road connections but omits building colours. Name the technique used.

**Answer (1 mark):** abstraction

Building colours do not affect the route calculation.

### CA1.1.14

A developer exposes a simple function call while concealing the calculation inside it. Which abstraction task is this?

**Answer (1 mark):** hide details of internal workings

The caller can use the operation without needing its internal implementation.

### CA1.1.15

A parking calculator multiplies hours parked by a fixed hourly rate. State the input that varies between customers.

**Answer (1 mark):** hours parked

The duration varies; the stated hourly rate is constant.

### CA1.1.16

A program checks whether a person meets a minimum age. Which is relevant: date of birth or favourite colour?

**Answer (1 mark):** date of birth

Date of birth allows age to be calculated; favourite colour is irrelevant.

### CA1.1.17

A developer first separates checkout into tasks, then removes irrelevant details from each task. Name the second computational-thinking component.

**Answer (1 mark):** abstraction

Decomposition identifies the smaller tasks; abstraction isolates their relevant information.

### CA1.2.1

Name a finite sequence of unambiguous instructions for solving a problem.

**Answer (1 mark):** algorithm

An algorithm specifies ordered steps that lead to a result.

### CA1.2.2

Name the flowchart symbol used for a decision.

**Answer (1 mark):** diamond

A decision branches according to a condition.

### CA1.2.3

Complete this flowchart drawback: a large algorithm can make the diagram difficult to ___.

**Answer (1 mark):** read

Large flowcharts can become cluttered and difficult to change.

### CA1.2.4

Complete this drawback of an informal written algorithm: imprecise wording can make instructions ___.

**Answer (1 mark):** ambiguous

Different readers may interpret the same instruction differently.

### CA1.2.5

To understand an algorithm written in Python, a reader needs knowledge of Python ___.

**Answer (1 mark):** syntax

Code is precise but requires knowledge of its programming language.

### CA1.2.6

Name the control structure that repeats an action.

**Answer (1 mark):** iteration

Iteration executes a block repeatedly.

### CA1.2.7

An algorithm starts total at zero, adds each sale amount to total, then outputs total. State what it calculates.

**Answer (1 mark):** total sales

Every sale contributes once to the running total.

### CA1.2.8

An algorithm doubles its input and adds 3. State the output for input 4.

**Answer (1 mark):** 11

4 multiplied by 2 is 8; adding 3 gives 11.

### CA1.2.9

A loop must process positions 0 to 4 but processes only 0 to 3. Name this common boundary error.

**Answer (1 mark):** off-by-one error

The loop executes one fewer iteration than required.

### CA1.2.10

Complete the loop so it processes five items: for i in range(___):

**Answer (1 mark):** 5

range(5) produces 0, 1, 2, 3 and 4.

### CA1.2.11

Translate 'set total to price multiplied by quantity' into one Python assignment.

**Answer (1 mark):** total = price * quantity

The multiplication is evaluated before its result is assigned to total.

### CA1.2.12

A delivery algorithm must choose between a free and a paid delivery charge. Name the control structure needed for that choice.

**Answer (1 mark):** selection

Selection chooses a path based on a condition.

### CA1.3.1

Name the strategy that starts with the overall system and breaks it into smaller components.

**Answer (1 mark):** top-down

Top-down design progressively decomposes the whole system.

### CA1.3.2

Complete this benefit of modularisation: a tested module can be ___ in another system.

**Answer (1 mark):** reused

Reuse can reduce repeated development and testing work.

### CA1.3.3

Name the approach that investigates the underlying reason for a fault rather than only its symptoms.

**Answer (1 mark):** root cause analysis

Addressing the underlying cause helps prevent recurrence.

### CA1.3.4

Name the root-cause technique that repeatedly asks why a problem occurred.

**Answer (1 mark):** five whys

Repeated why questions trace symptoms towards underlying causes.

### CA1.3.5

In a high-level problem-solving strategy, which step follows implementing the solution?

**Answer (1 mark):** review

Review checks whether the implemented solution resolves the problem.

### CA1.3.6

An intermittent fault returns after several temporary fixes. Name a suitable strategy for investigating its underlying cause.

**Answer (1 mark):** root cause analysis

Recurring symptoms justify investigating the cause before choosing another fix.

### CA2.1.1

Name the Python data type for a value that is either True or False.

**Answer (1 mark):** bool

Boolean values represent two truth states.

### CA2.2.1

Name a named storage location whose value can change during program execution.

**Answer (1 mark):** variable

A variable allows a program to refer to a changing value by name.

### CA2.2.2

Name a value intended to remain unchanged during execution.

**Answer (1 mark):** constant

A constant represents a fixed value, such as a configured rate.

### CA2.2.3

Name the Python function that converts the string '42' into an integer.

**Answer (1 mark):** int

int('42') returns the integer 42.

### CA2.2.4

Name the term for the region of a program in which a name can be accessed.

**Answer (1 mark):** scope

Scope determines where a name is available.

### CA2.2.5

A variable is assigned inside a function and is not declared global. Name its scope.

**Answer (1 mark):** local

The variable is local to that function.

### CA2.2.6

Inside a function, which Python keyword allows assignment to an existing module-level variable?

**Answer (1 mark):** global

The global declaration makes that assignment target the module-level name.

### CA2.2.7

Write a Python assignment setting attempts to the integer zero.

**Answer (1 mark):** attempts = 0

The unquoted literal 0 is an integer.

### CA2.2.8

Given RATE = 3 and hours = 4, state the value of RATE * hours.

**Answer (1 mark):** 12

The fixed rate is multiplied by the variable duration.

### CA2.2.9

State the value of int('12') + 3.

**Answer (1 mark):** 15

The string is converted to an integer before addition.

### CA2.3.1

Name the Python data structure that associates keys with values.

**Answer (1 mark):** dictionary

A dictionary retrieves a value using its key.

### CA2.3.2

Given scores = [8, 5, 9], state the value of scores[1].

**Answer (1 mark):** 5

Python list indexing starts at zero.

### CA2.3.3

Write a Python list literal containing the integers 8, 5 and 9 in that order.

**Answer (1 mark):** [8, 5, 9]

For this item, use the three integers 8, 5 and 9 in that order.

### CA2.3.4

Given names = ['Ali', 'Bo'], replace the index in names[2] to access 'Bo'.

**Answer (1 mark):** 1

The two valid indices are 0 and 1.

### CA2.4.1

State the value of 17 % 5.

**Answer (1 mark):** 2

The modulus operator returns the remainder after division.

### CA2.4.2

Write the Python relational operator meaning 'greater than or equal to'.

**Answer (1 mark):** >=

This comparison includes equality.

### CA2.4.3

Name the Boolean operator that is true only when both operands are true.

**Answer (1 mark):** and

Both conditions must be true for and to return true.

### CA2.4.4

A box holds 6 devices. Write the expression using count that calculates the number of complete boxes.

**Answer (1 mark):** count // 6

Integer division gives the number of complete groups for a non-negative count.

### CA2.4.5

State the value of 3 + 2 * 4.

**Answer (1 mark):** 11

Multiplication is performed before addition.

### CA2.4.6

Write an expression that is true when age is at least 16.

**Answer (1 mark):** age >= 16

The boundary value 16 must be included.

### CA2.4.7

Replace the incorrect operator in 'if score = 10:' with the equality-comparison operator.

**Answer (1 mark):** ==

A single equals sign assigns; a double equals sign compares.

### CA2.5.1

Name the Python built-in function used to read text entered at the keyboard.

**Answer (1 mark):** input

input returns the entered text as a string.

### CA2.5.2

State the file mode used to open an existing text file for reading.

**Answer (1 mark):** r

Read mode reads the file without requesting write access.

### CA2.5.3

If the user types 7, state the data type returned by input().

**Answer (1 mark):** string

input returns text even when the characters are digits.

### CA2.5.4

Write one Python statement to display the value of total.

**Answer (1 mark):** print(total)

print sends the value to standard output.

### CA2.5.5

A file is opened with open('log.txt', 'r') before writing text. Which mode should replace r to append without discarding existing content?

**Answer (1 mark):** a

'a' appends at the end of the file.

### CA2.6.1

Name the control structure in which statements execute one after another in their written order.

**Answer (1 mark):** sequence

Sequence preserves the stated order of execution.

### CA2.6.2

Which Python keyword introduces another condition after an if condition is false?

**Answer (1 mark):** elif

elif tests an additional condition in the selection chain.

### CA2.6.3

Name the loop category most suitable when the required number of repetitions is known beforehand.

**Answer (1 mark):** count-controlled

A count-controlled loop repeats a specified number of times.

### CA2.6.4

Which Python loop keyword repeats while a condition remains true?

**Answer (1 mark):** while

The condition is checked before each iteration.

### CA2.6.5

A while loop's condition never becomes false. Name the resulting problem.

**Answer (1 mark):** infinite loop

A missing or incorrect update can prevent termination.

### CA2.6.6

How many times does 'for i in range(2, 5):' execute its body?

**Answer (1 mark):** 3

The values are 2, 3 and 4; the upper bound is excluded.

### CA2.6.7

Complete the header to repeat exactly four times: for i in ___:

**Answer (1 mark):** range(4)

range(4) supplies four values.

### CA2.6.8

A loop starts count = 0 and runs while count < 3. Write the update that increases count by one each iteration.

**Answer (1 mark):** count += 1

Updating count allows it to reach the terminating boundary.

### CA2.7.1

Which Python keyword sends a result back from a function to its caller?

**Answer (1 mark):** return

An explicit return can provide the caller with a calculated value.

### CA2.7.2

Using the specification's terminology, name a subprogram that performs a task without returning a result.

**Answer (1 mark):** procedure

Python uses def for both styles; a function without an explicit result returns None.

### CA2.7.3

Is Python's len function user-written, built-in or from a third-party library?

**Answer (1 mark):** built-in

len is available without importing a library.

### CA2.7.4

Complete this benefit of using a suitable pre-written function: it saves development ___.

**Answer (1 mark):** time

Existing functionality reduces the amount of new code to write.

### CA2.7.5

A function is defined as 'def double(n): return n * 2'. State double(6).

**Answer (1 mark):** 12

The argument 6 is bound to n and multiplied by 2.

### CA2.7.6

Complete the body of def square(n): with one statement returning n squared.

**Answer (1 mark):** return n * n

The function must return the calculated square.

### CA2.7.7

A function prints a total, but its caller needs to store that total as the function result. Which keyword should replace print in the function's final operation?

**Answer (1 mark):** return

Printing displays a value; returning supplies it to the caller.

### CA2.8.1

Name the validation check that rejects an empty required field.

**Answer (1 mark):** presence check

A presence check verifies that a value was supplied.

### CA2.8.2

For the check 1 <= quantity <= 10, is quantity = 10 accepted or rejected?

**Answer (1 mark):** accepted

Both boundary values are included by <=.

### CA2.8.3

Complete a length check for an eight-character code: len(code) ___ 8.

**Answer (1 mark):** ==

Equality checks that the length is exactly eight.

### CA2.8.4

A valid age is 16 to 19 inclusive. Replace and in 'age < 16 and age > 19' so the expression identifies invalid ages.

**Answer (1 mark):** or

An age is invalid if it is below 16 or above 19.

### CA2.9.1

Which must happen first: calculate an average or check that the divisor is not zero?

**Answer (1 mark):** check that the divisor is not zero

Check before division to avoid a division-by-zero error.

### CA2.9.2

State the value of (3 + 2) * 4.

**Answer (1 mark):** 20

Parentheses make the addition happen before multiplication.

### CA2.9.3

For frequent retrieval of a record by a unique key, choose a dictionary or an unsorted list.

**Answer (1 mark):** dictionary

A dictionary supports direct key lookup rather than requiring a scan through the list.

### CA2.9.4

A loop repeatedly calculates a fixed value that never changes. Where should that calculation move: before the loop or after the loop?

**Answer (1 mark):** before the loop

Calculate it once before the loop so the result is available during each iteration.

### CA2.9.5

Name the naming convention used by total_cost.

**Answer (1 mark):** snake_case

Words are separated with underscores.

### CA2.9.6

Choose the clearer variable name for a count of failed logins: x or failed_login_count.

**Answer (1 mark):** failed_login_count

The name describes the value's purpose.

### CA2.9.7

An algorithm returns correct answers but exceeds the maximum permitted run time. Does it meet all the stated requirements? Answer yes or no.

**Answer (1 mark):** no

Correct output alone does not satisfy a run-time requirement.

### CA2.10.1

Name the Python statement pair used to handle an exception such as invalid numeric input.

**Answer (1 mark):** try and except

try contains the operation and except handles a matching exception.

### CA2.10.2

Name the process of locating and correcting program errors.

**Answer (1 mark):** debugging

Debugging investigates the cause and corrects the code.

### CA2.10.3

Complete this statement: correcting the cause of a crash makes software more ___.

**Answer (1 mark):** robust

Removing the fault helps the software handle that situation successfully.

### CA2.10.4

State the exception raised by 10 / 0.

**Answer (1 mark):** ZeroDivisionError

Division by zero raises ZeroDivisionError in Python.

### CA2.10.5

Replace the function in int('3.5') with one that converts the text to a decimal numeric value.

**Answer (1 mark):** float

float accepts the decimal representation '3.5'.

### CA2.11.1

Name the search algorithm that repeatedly halves the remaining search interval in sorted data.

**Answer (1 mark):** binary search

Binary search compares with the middle value and discards half of the interval.

### CA2.11.2

Name the sorting algorithm that compares adjacent values and swaps those in the wrong order over repeated passes.

**Answer (1 mark):** bubble sort

Bubble sort repeats passes until the list is ordered.

### CA2.11.3

Which requires sorted input: linear search or binary search?

**Answer (1 mark):** binary search

The halving decision relies on the input being ordered.

### CA2.11.4

Name the efficiency measure concerned with how much storage an algorithm needs.

**Answer (1 mark):** memory space

Memory use is distinct from execution time or the number of comparisons.

### CA2.11.5

For linear search, where is a matching target in the best case?

**Answer (1 mark):** first position

The first comparison finds the target.

### CA2.11.6

Choose a suitable search for a large sorted list with efficient access by index: linear or binary.

**Answer (1 mark):** binary

Repeated halving usually needs far fewer comparisons than scanning the list.

### CA2.11.7

Choose a suitable simple sort for a small, nearly sorted list: insertion sort or bubble sort.

**Answer (1 mark):** insertion sort

Insertion sort can place each item with little shifting when the list is nearly ordered.

### CA2.12.1.1

Should individual software components be tested before or only after integration?

**Answer (1 mark):** before

Testing components first helps isolate faults before components interact.

### CA2.12.2.1

Name the testing method that checks whether a change has broken previously working functionality.

**Answer (1 mark):** regression testing

Regression tests repeat relevant earlier checks after a change.

### CA2.12.2.2

A team checks that its payment module exchanges data correctly with its order module. Name the test type.

**Answer (1 mark):** integration testing

Integration testing checks interactions between components.

### CA2.12.3.1

Name a sequence of recorded application actions that can be replayed to automate a repeated task.

**Answer (1 mark):** macro

A macro can automate repeated actions in a supporting application.

### CA2.12.4.1

An integer field accepts 1 to 10 inclusive. Which category describes the value 1: boundary or erroneous?

**Answer (1 mark):** boundary

1 lies exactly on an accepted boundary.

### CA2.12.4.2

An integer field accepts 1 to 10 inclusive. Give the invalid integer immediately above the upper boundary.

**Answer (1 mark):** 11

11 tests rejection just outside the accepted range.

### CA2.12.4.3

Which test-plan column records what the system should do before the test is run?

**Answer (1 mark):** expected result

Actual results are recorded after executing the test.
