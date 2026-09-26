#!/usr/bin/env python3
"""Check original ESP design examples; never execute supplied/student code."""
from decimal import Decimal as D
from itertools import combinations


def feasible(design, ui, integration, absent=()):
    """Inclusive working-day slots; Sam owns design and integration, Lee UI."""
    return (len(design) == len(ui) == 2 and len(integration) == 1
            and set(design).isdisjoint(integration)
            and set(ui).isdisjoint(absent)
            and min(integration) > max(design + ui)
            and min(design + ui + integration) >= 1
            and max(design + ui + integration) <= 4)


assert feasible([1, 2], [1, 2], [3])
assert feasible([1, 2], [2, 3], [4])
assert not feasible([1, 2], [1, 2], [2])
assert feasible([1, 2], [1, 3], [4], absent=[2])
assert not any(feasible([1, 2], list(ui), [end], absent=[2])
               for ui in combinations(range(1, 5), 2)
               if ui[1] == ui[0] + 1 for end in range(1, 5))
assert (2 + 2 + 1) * 7 == 35
assert 4 * 200 - 3 * 200 == 200

staff = 18 * D('25') + 12 * D('40') + 5 * D('160')
one_off = staff + 300
recurring = 12 * D('25')
assert (staff, one_off, one_off + recurring) == (1730, 2030, 2330)
income = [D('10000') * D('1.1') ** year for year in range(1, 4)]
profits = [value - 6000 - recurring - (one_off if i == 0 else 0)
           for i, value in enumerate(income)]
assert income == [11000, 12100, 13310]
assert profits == [2670, 5800, 7010]
assert sum(profits) == 15480


def reference_points(price):
    whole = int(D(str(price)))
    return min(whole, 500) * 4 + max(whole - 500, 0) * 2


def original_fault(price):
    value = int(D(str(price)))
    if value > 500:
        return 2000 + (value - 500) * 4
    return value * 2


def repaired(price):
    value = int(D(str(price)))
    if value > 500:
        return 2000 + (value - 500) * 2
    return value * 4


for price, correct, faulty in [(499, 1996, 998), (500, 2000, 1000),
                               (501, 2002, 2004), ('501.75', 2002, 2004),
                               (510, 2020, 2040)]:
    assert reference_points(price) == repaired(price) == correct
    assert original_fault(price) == faulty
assert reference_points('500.75') == 2000
items = [D('1.75'), D('1.75')]
assert sum(reference_points(p) for p in items) + int(sum(items)) * 2 == 14
assert sum(reference_points(p) + int(p) * 2 for p in items) == 12
for code, expected in [('00001234', True), ('123456789', False),
                       ('1234567', False), ('1234abcd', False)]:
    assert (len(code) == 8 and code.isdigit()) == expected
assert len('1234abcd') == 8 or '1234abcd'.isdigit()  # Harmful OR accepts it.
assert [n for n in [499, 500, 501] if 1 <= n <= 500] == [499, 500]
assert [n for n in [499, 500, 501] if 1 <= n < 500] == [499]

rows = [(1, 'A', 2), (2, 'A', 3), (2, 'B', 7), (3, 'A', 4)]
selected = [value for day, category, value in rows if 1 <= day <= 2 and category == 'A']
assert (sum(selected), len(selected)) == (5, 2)
assert sum(value for _, category, value in rows if category == 'A') == 9
sales = [(2, 15, 9), (3, 8, 5)]
revenue = sum(qty * price for qty, price, _ in sales)
cost = sum(qty * unit_cost for qty, _, unit_cost in sales)
assert (revenue, cost, revenue - cost) == (54, 33, 21)
assert sum(price - unit_cost for _, price, unit_cost in sales) == 9
print('PASS: schedules, capacity, costs, forecasts, boundaries, IDs, repairs, rounding, data and profit examples')
