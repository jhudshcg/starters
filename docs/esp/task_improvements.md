# ESP activity design approaches and content ideas

In all cases, create scenarios and code snippets based on or inspired by (especially for level of complexity) actual examples from the past exams or SAM material for the ESP.

## Task 1

review deferred

## Task 2

The task objectice is to have students demonstrate methodical testing and debugging skills, including selection of appropriate test data (informed by reading a set of requirements) for functions and blocks of code implementing key logic or maths detailed in the requirements.

Students must produce a test plan using the templated provided (columns: test description, test data, expected result, actual result, conclusion/actions taken).

So the key activities in the starters for Task 2 would be as in the list below.

These activities could be different sections in a single multi-part question representing a single test case in a test plan:

1. reading a set of requirements/functional descriptions and selecting appropriate test inputs. For functions, there would generally be 2 tests, one for valid inputs, the other for invalid inputs. A question for testing a function that validates user input (very common test case for ESP 2) and finding suitable test inputs, could then include 2 sections here, one for valid inputs, the other for invalid inputs. Each section would ask for 3 - 5 test input values, depending on the type of validation of input the function is supposed to do. i.e. 3-5 valid inputs, and 3-5 invalid inputs in separate tests. For example, a function that asks for an int option choice from 1 to 8, would call for valid test inputs of 1, (any 2 - 7) and 8, i.e. 2 extreme/boundary valid and 1 normal value. The invalid tests would similarly be 0, 9, (any beyond 9 or below 0). Students should provide the values and also a label for them (e.g. normal, boundary, invalid, invalid boundary)

2. selecting appropriate expected outcomes from chosen inputs, for the same set of requirements/functional descriptions. This should be from a dropdown, and include overly value or short descriptions (e.g. function works, function returns expected values), wrong descriptions (e.g. function returns an error - if testing valid input) and appropriately detailed descriptions (e.g. function returns the [requirement specified] value as a [expected datatype])

3. to prepare for the 'actual result' column (in the exam they'll run the code) in the test plan, for the starter for now students can read and predict the what code provided in code snippet (function or block) will actually do with the inputs they selected. Selectable options should include a range of errors (e.g. 'crash with error for input [valid/invalid input], mismatched types', or 'crash due to undefined variable'). Again there should be at least as many incorrect options as correct ones. If ther are multiple errors, then these should be paired with inputs that would expose them in multiple question sections. If this is too complex/not possible to do with indeterminate student selected input data, then appropriate test data should be provided in the question, for this type of question.

4. to prepare for fixing the code, students would make 2 selections. The first to identify the cause/issue in the code, the second to identify a suitable fix/correction. (later on when in browser python runtime is used, students will be able to directly edit and run the code to test fixes, but for now a drop down selector will provide some practice value).

## Task 3

Contruct flowcharts for modules of the solution for a given set of requirements (use actual Task 3 SAM or past paper examples to base requirements on).

## Task 4a

Questions requiring students to implement a simple feature, using some of the existing code provided and perhaps writing a new function.
