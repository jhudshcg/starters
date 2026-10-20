"""Check Task 2 functions against independently specified behaviour.

Used by esp-task2.test.js with authored cases on stdin. Captures prompts/output,
limits execution steps and uses no student code. Python standard library only.
"""
import ast
import json
import sys

questions = {row['id']: row for row in json.load(sys.stdin)}
sources = {key: row['code'] for key, row in questions.items()}
checks = 0


class MoreInput(Exception):
    """The function requests an entry beyond the supplied test sequence."""


class StepLimit(Exception):
    """An authored loop exceeded the bounded tracing budget."""


def run(source, call, entries=()):
    """Run a fresh function call, capturing its result, prompts and printed lines."""
    replies = iter(entries)
    prompts = []
    output = []
    steps = 0

    def read(prompt):
        prompts.append(prompt)
        try:
            return next(replies)
        except StopIteration:
            raise MoreInput() from None

    def printed(*values, sep=' ', end='\n'):
        output.append(sep.join(str(value) for value in values) + end)

    def trace(frame, event, arg):
        nonlocal steps
        if event == 'line':
            steps += 1
            if steps > 10000:
                raise StepLimit()
        return trace

    ns = {'input': read, 'print': printed}
    compiled = compile(source, '<authored Task 2>', 'exec')
    previous_trace = sys.gettrace()
    try:
        sys.settrace(trace)
        exec(compiled, ns)
        value = eval(call, ns)
        result = (type(value).__name__, value, len(prompts))
    except Exception as exc:
        result = (type(exc).__name__, None, len(prompts))
    finally:
        sys.settrace(previous_trace)
    return result, ''.join(output)


def check(key, call, expected, entries=(), source=None, output=None):
    """Compare execution with an explicit expected tuple and optional output evidence."""
    global checks
    actual, printed = run(sources[key] if source is None else source, call, entries)
    assert actual == expected, (key, call, entries, actual, expected)
    for line in output or []:
        assert line in printed, (key, line, printed)
    checks += 1
    return actual


# Each independently specified case names the exact public test and expected outcomes.
# The final Boolean selects the option wording for interactive functions.
observations = [
 ('36-0', 'read_workshop()', ('8',), ('MoreInput', None, 2), ('int', 8, 1), True,
  'read_workshop(); first entry "8"'),
 ('36-0', 'read_workshop()', ('abc', '4'), ('ValueError', None, 1), ('int', 4, 2), True,
  'read_workshop(); entries "abc", then "4"'),
 ('36-1', 'read_member_id()', ('00712', '0071'), ('str', '00712', 1), ('str', '0071', 2), True,
  'read_member_id(); entries "00712", then "0071"'),
 ('36-2', 'read_customer_name()', ('   ', ' Ada '), ('str', '', 1), ('str', 'Ada', 2), True,
  'read_customer_name(); entries "   ", then " Ada "'),
 ('36-3', 'read_adjustment()', ('2.5', '12'), ('str', '12', 2), ('int', 12, 2), True,
  'read_adjustment(); entries "2.5", then "12"'),
 ('36-4', 'read_booking_code()', ('BK0A7', 'BK007'), ('str', 'BK0A7', 1), ('str', 'BK007', 2), True,
  'read_booking_code(); entries "BK0A7", then "BK007"'),
 ('36-5', 'read_platform()', ('2',), ('MoreInput', None, 2), ('str', 'In-store', 1), True,
  'read_platform(); first entry "2"'),
 ('37-0', 'order_total([3, 5, 4], True)', (), ('NameError', None, 0), ('int', 14, 0), False,
  'order_total([3, 5, 4], True)'),
 ('37-1', 'charge(2)', (), ('UnboundLocalError', None, 0), ('int', 10, 0), False,
  'charge(2)'),
 ('37-2', 'points([5.75, 2.25])', (), ('int', 14, 0), ('int', 28, 0), False,
  'points([5.75, 2.25])'),
 ('37-2', 'points([11.50, 12.25])', (), ('int', 92, 0), ('int', 86, 0), False,
  'points([11.50, 12.25])'),
 ('37-3', 'discount()', ('abc', '12.50'), ('TypeError', None, 2), ('float', 10.0, 2), True,
  'discount(); entries "abc", then "12.50"'),
 ('37-4', 'fee(2, False)', (), ('int', 8, 0), ('int', 8, 0), False,
  'fee(2, False)'),
 ('37-5', 'cost(3)', (), ('int', 8, 0), ('int', 11, 0), False,
  'cost(3)'),
 ('38-0', 'read_code()', ('ABC', 'ABCD'), ('MoreInput', None, 3), ('str', 'ABCD', 2), True,
  'read_code(); entries "ABC", then "ABCD"'),
 ('38-1', 'read_choice()', ('x', '2'), ('ValueError', None, 1), ('int', 2, 2), True,
  'read_choice(); entries "x", then "2"'),
 ('38-1', 'read_choice()', ('3',), ('MoreInput', None, 2), ('int', 3, 1), True,
  'read_choice(); first entry "3"'),
 ('38-2', 'read_name()', ('   ', ' Ada '), ('NameError', None, 2), ('str', 'Ada', 2), True,
  'read_name(); entries "   ", then " Ada "'),
 ('38-3', 'read_pin()', ('0071',), ('UnboundLocalError', None, 1), ('str', '0071', 1), True,
  'read_pin(); first entry "0071"'),
 ('38-4', 'read_level()', ('0', '3'), ('int', 0, 1), ('int', 3, 2), True,
  'read_level(); entries "0", then "3"'),
 ('38-5', 'read_confirm()', ('no', 'yes'), ('str', '', 0), ('str', 'yes', 2), True,
  'read_confirm(); planned entries "no", then "yes"'),
]


observations.extend([
 ('36-1', 'read_member_id()', ('0071',), ('str', '0071', 1), ('str', '0071', 1), True, 'read_member_id(); first entry "0071"'),
 ('36-2', 'read_customer_name()', (' Ada ',), ('str', 'Ada', 1), ('str', 'Ada', 1), True, 'read_customer_name(); first entry " Ada "'),
 ('36-3', 'read_adjustment()', ('12',), ('str', '12', 1), ('int', 12, 1), True, 'read_adjustment(); first entry "12"'),
 ('36-4', 'read_booking_code()', ('BK007',), ('str', 'BK007', 1), ('str', 'BK007', 1), True, 'read_booking_code(); first entry "BK007"'),
 ('36-5', 'read_platform()', ('02','1'), ('str', 'Online', 2), ('str', 'Online', 2), True, 'read_platform(); entries "02", then "1"'),
 ('37-3', 'discount()', ('12.50',), ('TypeError', None, 1), ('float', 10.0, 1), True, 'discount(); first entry "12.50"'),
 ('38-0', 'read_code()', ('WXYZ',), ('str', 'WXYZ', 1), ('str', 'WXYZ', 1), True, 'read_code(); first entry "WXYZ"'),
 ('38-2', 'read_name()', (' Jo ',), ('NameError', None, 1), ('str', 'Jo', 1), True, 'read_name(); first entry " Jo "'),
 ('38-3', 'read_pin()', ('00A1','0071'), ('UnboundLocalError', None, 1), ('str', '0071', 2), True, 'read_pin(); entries "00A1", then "0071"'),
 ('38-4', 'read_level()', ('3',), ('int', 3, 1), ('int', 3, 1), True, 'read_level(); first entry "3"'),
 ('38-5', 'read_confirm()', ('yes',), ('str', '', 0), ('str', 'yes', 1), True, 'read_confirm(); first entry "yes"'),
])

# Apply precisely the authored correction. Each tuple also states the independent
# option text, binding execution of the repair to the selection the student makes.
repairs = {
 '36-0': [
  ('1 <= value <= 8', '1 <= value < 8', '1 <= value <= 8'),
  ('Replace except TypeError: with except ValueError:', 'except TypeError:', 'except ValueError:')],
 '36-1': [('if len(text) == 4:', 'len(text) >= 4', 'len(text) == 4')],
 '36-2': [('if cleaned:', 'if text:', 'if cleaned:')],
 '36-3': [('text = int(text)', '            int(text)', '            text = int(text)')],
 '36-4': [('if suffix.isascii() and suffix.isdigit():', 'if len(suffix) == 3:', 'if suffix.isascii() and suffix.isdigit():')],
 '36-5': [('elif selection == "2":', 'elif selection == 2:', 'elif selection == "2":')],
 '37-0': [('final_total = subtotal + delivery_fee', 'final_total = subtoatl + delivery_fee', 'final_total = subtotal + delivery_fee')],
 '37-1': [('Add total = 0 inside charge(), before the for loop', '    for ticket in range(tickets):', '    total = 0\n    for ticket in range(tickets):')],
 '37-2': [
  ('item_points = pounds * 4', 'item_points = pounds * 2', 'item_points = pounds * 4'),
  ('extra_points = (pounds - 10) * 2', 'extra_points = (pounds - 10) * 4', 'extra_points = (pounds - 10) * 2')],
 '37-3': [('price = amount', '    price = text', '    price = amount')],
 '37-4': [('Keep the code; test the other rate and discount branches', None, None)],
 '37-5': [('for day in range(1, days + 1):', 'range(1, days)', 'range(1, days + 1)')],
 '38-0': [('text = input("Code: ")', '            input("Code: ")', '            text = input("Code: ")')],
 '38-1': [
  ('Replace except TypeError: with except ValueError:', 'except TypeError:', 'except ValueError:'),
  ('1 <= value <= 3', '1 <= value < 3', '1 <= value <= 3')],
 '38-2': [('return name', 'return nmae', 'return name')],
 '38-3': [('Add attempts = 0 inside the function, before while', 'def read_pin():', 'def read_pin():\n    attempts = 0')],
 '38-4': [('level >= 1 and level <= 5', 'level >= 1 or level <= 5', 'level >= 1 and level <= 5')],
 '38-5': [('Set again = True before the loop', '    again = False\n', '    again = True\n')],
}
fixed = dict(sources)
for key, changes in repairs.items():
    for label, before, after in changes:
        if before is not None:
            # Restrict replacements to one occurrence: the confirmation flag also
            # changes inside a branch, where its False value must be preserved.
            assert before in fixed[key], (key, before)
            fixed[key] = fixed[key].replace(before, after, 1)
    parts = {p['id']: p for p in questions[key]['parts']}
    selected = [parts[f'd{index}-repair']['answer'] for index in range(len(changes))]
    assert selected == [fixed[key]] * len(changes), (key, selected)


def describe(result, interactive):
    """Translate observed Python values into the bounded result option vocabulary."""
    kind, value, prompts = result
    ordinal = {1: 'first', 2: 'second', 3: 'third'}
    if kind == 'MoreInput':
        return f'Requests a {ordinal[prompts]} entry'
    if kind.endswith('Error'):
        suffix = f' after the {ordinal[prompts]} entry' if interactive else ''
        return 'Raises ' + kind + suffix
    if interactive and kind == 'str' and value == '' and prompts == 0:
        return 'Returns empty string without prompting'
    if kind == 'str':
        label = 'Returns ' + ('empty string ' if value == '' else 'string ') + json.dumps(value)
    else:
        label = 'Returns ' + {'int': 'integer', 'float': 'float', 'bool': 'Boolean'}[kind] + ' ' + str(value)
    if interactive:
        label += ' after ' + {1: 'one prompt', 2: 'two prompts', 3: 'three prompts'}[prompts]
    return label


seen = {}
for key, call, entries, original, corrected, interactive, public_input in observations:
    index = seen.get(key, 0)
    seen[key] = index + 1
    row = next(case for group in questions[key]['testPlan'] for case in group['cases'] if case['id'] == f'c{index}')
    actual = check(key, call, original, entries)
    repaired = check(key, call, corrected, entries, source=fixed[key])
assert set(seen) == set(questions)
assert all(seen[key] == sum(len(group['cases']) for group in q['testPlan']) for key, q in questions.items())

# Check both bounds, rejected classes, recovery and retained representations.
for key, call, limit in [('36-0', 'read_workshop()', 8), ('38-1', 'read_choice()', 3), ('38-4', 'read_level()', 5)]:
    for value in (1, limit, 2):
        check(key, call, ('int', value, 1), (str(value),), source=fixed[key])
    for invalid in ('0', str(limit + 1), '-2', '', 'abc', '2.5'):
        check(key, call, ('int', 2, 2), (invalid, '2'), source=fixed[key])
for key, call in [('36-1', 'read_member_id()'), ('38-3', 'read_pin()')]:
    check(key, call, ('str', '0071', 1), ('0071',), source=fixed[key])
    for invalid in ('007', '00712', '0A71', '٠٠٧١', '', ' 071'):
        check(key, call, ('str', '0071', 2), (invalid, '0071'), source=fixed[key])
for key, call in [('36-2', 'read_customer_name()'), ('38-2', 'read_name()')]:
    for entries in [(' Jo ',), ('', ' Jo '), ('   ', ' Jo ')]:
        check(key, call, ('str', 'Jo', len(entries)), entries, source=fixed[key])
check('38-2', 'read_name()', ('str', 'A' * 30, 1), ('A' * 30,), source=fixed['38-2'])
check('38-2', 'read_name()', ('str', 'Jo', 2), ('A' * 31, 'Jo'), source=fixed['38-2'])
for value in ('-3', '0', '12'):
    check('36-3', 'read_adjustment()', ('int', int(value), 1), (value,), source=fixed['36-3'])
check('36-3', 'read_adjustment()', ('int', -3, 2), ('abc', '-3'), source=fixed['36-3'])
for entries in [('BK007',), ('BK07', 'BK007'), ('BK0007', 'BK007'), ('bk007', 'BK007'), ('BK0A7', 'BK007'), ('BK٠٠٧', 'BK007')]:
    check('36-4', 'read_booking_code()', ('str', 'BK007', len(entries)), entries, source=fixed['36-4'])
check('36-5', 'read_platform()', ('str', 'Online', 1), ('1',), source=fixed['36-5'])
for invalid in ('02', ' 2 ', '3', ''):
    check('36-5', 'read_platform()', ('str', 'Online', 2), (invalid, '1'), source=fixed['36-5'])

# Manual calculation oracles also check accumulation, branching and caller independence.
for prices, delivery, expected in [([3], True, 5), ([3, 5], False, 8), ([3, 5], True, 10)]:
    check('37-0', f'order_total({prices}, {delivery})', ('int', expected, 0), source=fixed['37-0'])
check('37-0', 'order_total([3, 5], True)', ('int', 10, 0), source=fixed['37-0'], output=['Subtotal: £ 8\n', 'Delivery: £ 2\n', 'Total: £ 10\n'])
for tickets, expected in [(1, 5), (3, 15), (4, 18), (5, 23)]:
    check('37-1', f'charge({tickets})', ('int', expected, 0), source=fixed['37-1'])
check('37-1', '(charge(4), charge(1))', ('tuple', (18, 5), 0), source=fixed['37-1'])
for prices, expected in [([10], 40), ([11], 42), ([1.75, 1.75], 8), ([0.75], 0)]:
    check('37-2', f'points({prices})', ('int', expected, 0), source=fixed['37-2'])
check('37-2', 'points([11.50, 10])', ('int', 82, 0), source=fixed['37-2'], output=['Item 1 : 42\n', 'Item 2 : 40\n', 'Total points: 82\n'])
for entries, expected in [(('2.75',), 2.2), (('0', '2.75'), 2.2), (('-2', '12.50'), 10.0), (('abc', '0', '2.75'), 2.2)]:
    check('37-3', 'discount()', ('float', expected, len(entries)), entries, source=fixed['37-3'])
check('37-3', 'discount()', ('float', 2.2, 1), ('2.75',), source=fixed['37-3'], output=['Original: £2.75\n', 'Saving: £0.55\n', 'Amount due: £2.20\n'])
for weekend, amounts in [(False, [5, 8, 10, 13]), (True, [7, 12, 16, 21])]:
    for hours, expected in enumerate(amounts, 1):
        check('37-4', f'fee({hours}, {weekend})', ('int', expected, 0), source=fixed['37-4'])
for days, expected in [(1, 4), (2, 8), (3, 11), (5, 17)]:
    check('37-5', f'cost({days})', ('int', expected, 0), source=fixed['37-5'])
check('37-5', 'cost(3)', ('int', 11, 0), source=fixed['37-5'], output=['Day 1 : £ 4\n', 'Day 2 : £ 4\n', 'Day 3 : £ 3\n'])

for entries in [('WXYZ',), ('WX', 'WXYZ'), ('ABCDE', 'ABC', 'WXYZ')]:
    check('38-0', 'read_code()', ('str', 'WXYZ', len(entries)), entries, source=fixed['38-0'])
check('38-3', '(read_pin(), read_pin())', ('tuple', ('0071', '1234'), 3), ('00A1', '0071', '1234'), source=fixed['38-3'], output=['PIN accepted after 2 attempts\n', 'PIN accepted after 1 attempts\n'])
for entries in [('yes',), ('no', 'yes'), ('', 'YES', 'yes')]:
    check('38-5', 'read_confirm()', ('str', 'yes', len(entries)), entries, source=fixed['38-5'])
assert 'Booking confirmed' not in run(sources['38-5'], 'read_confirm()', ('yes',))[1]
assert 'Booking confirmed' in run(fixed['38-5'], 'read_confirm()', ('yes',))[1]

# A partial repair must not conceal the other fault in the two-fault investigations.
for key, call, entries, expected in [
 ('36-0', 'read_workshop()', ('abc', '4'), ('ValueError', None, 1)),
 ('38-1', 'read_choice()', ('3',), ('MoreInput', None, 2)),
 ('37-2', 'points([11])', (), ('int', 44, 0)),
]:
    _, before, after = repairs[key][0]
    partial = sources[key].replace(before, after, 1)
    check(key, call, expected, entries, source=partial)


# Student-selected example inputs are checked against independently repaired Python.
for key, question in questions.items():
    parts = {p['id']: p for p in question['parts']}
    function = question['testPlan'][0]['description'].split(':')[0]
    for group in question['testPlan']:
        for data in json.loads(parts[group['dataPart']]['answer']).values():
            if 'inputs' in data:
                result, _ = run(fixed[key], function + '()', data['inputs'])
                assert result[2] == len(data['inputs']) and not result[0].endswith('Error') and result[0] != 'MoreInput', (key, data, result)
                assert (result[2] == 1) == (group['kind'] == 'valid'), (key, group, result)
            checks += 1
print(f'{checks} independent execution checks; all 18 prediction/expectation/repair keys match.')
