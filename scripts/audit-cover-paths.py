"""Audit Cover Paths feasibility and the reviewed Stretch structural safeguards.

Main contents: independent route enumeration, degree deductions and sweep checks.
Used by: content review and maintainers; run `python3 scripts/audit-cover-paths.py`.
Uses: authored puzzle data. Libraries: Python standard library only.
These safeguards reject known weak layouts; they do not measure classroom difficulty.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANK = ROOT / 'packages/puzzles/data/cover-paths.js'


def graph(part):
    """Build orthogonal adjacency independently of the application marker."""
    width = part['size']
    cells = set(range(width * part.get('rows', width))) - set(part['blocked'])
    return {a: sorted(b for b in cells if
            abs(a // width - b // width) + abs(a % width - b % width) == 1)
            for a in cells}


def unresolved_edges(board):
    """Count edges left after repeatedly filling/excluding by vertex degree alone."""
    free = {tuple(sorted((a, b))) for a in board for b in board[a]}
    chosen = set()
    while True:
        before = len(free)
        for cell in board:
            needed = (1 if len(board[cell]) == 1 else 2) - sum(cell in edge for edge in chosen)
            options = {edge for edge in free if cell in edge}
            if needed < 0 or needed > len(options):
                return -1
            if needed == 0:
                free -= options
            elif needed == len(options):
                chosen |= options
                free -= options
        if len(free) == before:
            return len(free)


def routes(board, limit=13, budget=30000):
    """Enumerate routes from one forced endpoint, counting reversal only once.

    Connectivity and remaining-degree pruning are necessary conditions, not
    assumptions about which solution the author intended. Hitting a limit fails
    the audit rather than being reported as an exhaustive count.
    """
    endpoints = sorted(a for a in board if len(board[a]) == 1)
    assert len(endpoints) == 2
    found = []
    visits = 0

    def walk(path, unseen):
        nonlocal visits
        visits += 1
        if visits > budget or len(found) >= limit:
            return
        if not unseen:
            found.append(path)
            return
        current = path[-1]
        available = unseen | {current}
        degrees = [sum(b in available for b in board[a]) for a in unseen]
        if 0 in degrees or degrees.count(1) > 1:
            return
        reached, todo = {current}, [current]
        while todo:
            for cell in board[todo.pop()]:
                if cell in available and cell not in reached:
                    reached.add(cell)
                    todo.append(cell)
        if len(reached) != len(available):
            return
        for cell in board[current]:
            if cell in unseen:
                walk(path + [cell], unseen - {cell})

    walk([endpoints[0]], set(board) - {endpoints[0]})
    return found, visits <= budget and len(found) < limit


def sweeps(part):
    """Yield simple alternating row/column sweeps, skipping blocked cells."""
    width, height = part['size'], part.get('rows', part['size'])
    blocked = set(part['blocked'])
    for transpose in (False, True):
        outer, inner = (width, height) if transpose else (height, width)
        for reverse_outer in (False, True):
            for reverse_inner in (False, True):
                route = []
                lines = list(range(outer))[::(-1 if reverse_outer else 1)]
                for index, line in enumerate(lines):
                    positions = list(range(inner))[::(-1 if bool(index % 2) != reverse_inner else 1)]
                    route += [cell for pos in positions
                              if (cell := (pos * width + line if transpose else line * width + pos)) not in blocked]
                yield route


def valid(route, board):
    """Check coverage and adjacency, without using the application checker."""
    return (len(route) == len(board) and set(route) == set(board)
            and all(b in board[a] for a, b in zip(route, route[1:])))


def signature(part):
    """Canonicalise open cells under translation, rotation and reflection."""
    cells = [(cell % part['size'], cell // part['size']) for cell in graph(part)]
    forms = []
    for flip in (1, -1):
        for turns in range(4):
            points = []
            for x, y in cells:
                x *= flip
                for _ in range(turns):
                    x, y = -y, x
                points.append((x, y))
            low_x, low_y = min(x for x, y in points), min(y for x, y in points)
            forms.append(tuple(sorted((x - low_x, y - low_y) for x, y in points)))
    return min(forms)


def audit():
    """Check every witness, then every Stretch layout and its recorded evidence."""
    bank = json.loads(BANK.read_text().split('export default ', 1)[1].strip().removesuffix(';'))
    seen, count, hard = set(), 0, 0
    for question in bank:
        for index, variation in enumerate(question['variations']):
            part = variation['parts'][0]
            board = graph(part)
            label = f"{question['slot']}:{index}"
            witness = json.loads(part['answer'])
            assert valid(witness, board), label
            assert 'start' not in part and 'end' not in part, label
            count += 1
            if question.get('challengeLevel') != 'stretch':
                continue
            assert 20 <= len(board) <= 35 and part['blocked'], label
            assert not any(valid(route, board) for route in sweeps(part)), label
            assert sum(len(adjacent) == 1 for adjacent in board.values()) == 2, label
            pending = unresolved_edges(board)
            assert pending >= 20, label
            solutions, exhaustive = routes(board)
            assert exhaustive and 2 <= len(solutions) <= 12, label
            evidence = part['validation']
            assert evidence['routeCountIgnoringReversal'] == len(solutions), label
            assert evidence['unresolvedEdgesAfterDegreeRules'] == pending, label
            form = signature(part)
            assert form not in seen, f'{label}: repeated rotated/reflected layout'
            seen.add(form)
            hard += 1
            print(f'{label}: {len(board)} dots, {pending} unresolved edges, {len(solutions)} routes')
    assert hard >= 25
    print(f'Passed: {count} path witnesses and {hard} Stretch structural reviews. Classroom calibration remains pending.')


if __name__ == '__main__':
    audit()
