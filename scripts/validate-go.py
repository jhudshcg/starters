"""Recheck every served Go tree with sgfmill, independently of its import input."""
import json
import pathlib
from sgfmill import boards

root=pathlib.Path(__file__).resolve().parents[1]
text=(root/'data/puzzles/go.js').read_text()
bank=json.loads(text.split('export default ',1)[1].strip().removesuffix(';'))
count=0
def encoded(board):
    return ''.join({None:'.','b':'B','w':'W'}[board.get(board.side-1-y,x)] for y in range(board.side) for x in range(board.side))
def check(node,board,turn):
    global count
    count+=1
    assert encoded(board)==node['board']
    assert len({c['move'] for c in node['children']})==len(node['children'])
    for child in node['children']:
        assert child['colour']==turn
        move=child['move'];point=(board.side-1-move//board.side,move%board.side)
        assert board.get(*point) is None
        after=board.copy();after.play(*point,turn)
        assert after.get(*point)==turn
        check(child,after,'w' if turn=='b' else 'b')

for question in bank:
    for variation in question['variations']:
        part=variation['parts'][0];tree=part['tree'];board=boards.Board(part['size'])
        points=lambda colour:{(part['size']-1-i//part['size'],i%part['size']) for i,c in enumerate(tree['board']) if c==colour}
        assert board.apply_setup(points('B'),points('W'),set())
        check(tree,board,part['player'])
        node=tree
        for move in json.loads(part['answer'])['moves']:
            node=next(c for c in node['children'] if c['move']==move)
        assert node.get('success')
print(f'Validated {len(bank)} Go problems and {count} recorded positions, including captures and model lines.')
