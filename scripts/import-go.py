"""Import reviewed public examples. Usage: python scripts/import-go.py SOURCE_DIRECTORY.

Expected inputs: go-ID.json from the GoProblems public problem API and
go-ogs2625-trailing.json from the OGS API. Only board data and solution branches
are retained; contributor profiles and source comments are not published.
sgfmill parses SGF and applies captures to precompute each recorded position.
"""
import json
import pathlib
import sys
from sgfmill import sgf, boards

root=pathlib.Path(__file__).resolve().parents[1]
source=pathlib.Path(sys.argv[1])

def encode(board):
    return ''.join({None:'.','b':'B','w':'W'}[board.get(board.side-1-y,x)] for y in range(board.side) for x in range(board.side))

def move_on(board, colour, point):
    if point is None or board.get(*point) is not None:
        raise ValueError('Unexpected pass or occupied move')
    board=board.copy()
    board.play(*point,colour)
    if board.get(*point)!=colour:
        raise ValueError('Suicide in source line')
    return board

def sgf_node(node,board):
    colour,point=node.get_move()
    if colour:
        board=move_on(board,colour,point)
    result={'board':encode(board),'children':[sgf_node(child,board) for child in node]}
    if colour: result.update(move=(board.side-1-point[0])*board.side+point[1],colour=colour)
    if node.has_property('C') and 'RIGHT' in node.get('C'):result['success']=True
    if not result['children'] and not result.get('success'):result['failure']=True
    return result

def winning_line(node):
    if node.get('success'):return []
    for child in node['children']:
        tail=winning_line(child)
        if tail is not None:return [child['move']]+tail
    return None

def all_positions(node):
    yield node
    for child in node['children']:yield from all_positions(child)

descriptions={
16441:('Keep the corner alive','Black to play. Find a sequence that lets the corner group survive.','Read the forcing moves before deciding where the eyes will be.','The recorded line preserves a living corner shape through the capturing exchanges.'),
6423:('Read the capturing chase','Black to play. Capture the connected white pair near the upper-right corner; account for the nearby white stone during the chase.','Follow the liberties after each atari; the nearby stones change the chase.','The recorded continuation keeps the white stones contained. Several final enclosing moves are accepted.'),
13359:('Capture on the right edge','Black to play. Find a sequence that captures the three connected white stones along the right edge.','Check the edge liberties and the order of forcing moves.','Both recorded winning first moves are accepted, including their different continuations.'),
5130:('Remove the second eye','White to play. Prevent the black group near the lower edge from making two eyes.','Look for the vital point inside the eye space, then read Black’s replies.','The recorded replies leave Black unable to form two independent eyes.'),
1091:('Break the corner shape','Black to play. Find the forcing sequence that prevents the white corner group from living.','Read the outside forcing moves before filling the inside liberties.','The recorded winning sequences reduce White’s eye space; the shorter winning continuation is also accepted.')
}
bank=[]
extra=json.loads((root/'data/coverage/go-source-inventory.json').read_text())['additional']
for item in extra:
    descriptions[item['id']]=(item['title'],item['prompt'],item['hint'],item['explanation'])

for index,problem_id in enumerate(descriptions):
    data=json.loads((source/f'go-{problem_id}.json').read_text())
    game=sgf.Sgf_game.from_bytes(data['sgf'].encode())
    setup=game.get_root().get_setup_stones()
    board=boards.Board(game.get_size())
    if not board.apply_setup(*setup):raise ValueError('Illegal setup')
    tree=sgf_node(game.get_root(),board)
    title,prompt,hint,explanation=descriptions[problem_id]
    bank.append((170+index if index<5 else 171+index,title,prompt,hint,explanation,data['playerColor'],tree,{
      'url':f'https://goproblems.com/problems/{problem_id}',
      'note':f"GoProblems #{problem_id} · {data['rank']['value']} kyu · contributed by {data['author']['name']}"+(f" · source: {data['source']}" if data.get('source') else '')
    },game.get_size()))

data=json.loads((source/'go-ogs2625-trailing.json').read_text())['puzzle']
board=boards.Board(19)
points=lambda text:{(18-(ord(text[i+1])-97),ord(text[i])-97) for i in range(0,len(text),2)}
assert board.apply_setup(points(data['initial_state']['black']),points(data['initial_state']['white']),set())
def ogs_node(node,board,colour=None):
    result={}
    if colour:
        point=(18-node['y'],node['x']);board=move_on(board,colour,point)
        result.update(move=node['y']*19+node['x'],colour=colour)
    result.update(board=encode(board),children=[ogs_node(child,board,'w' if colour=='b' else 'b') for child in node.get('branches',[])])
    if node.get('correct_answer'):result['success']=True
    if node.get('wrong_answer'):result['failure']=True
    return result
bank.append((175,'Find the vital point','Black to play. Stop the white group at the lower-left edge from making two eyes. Read White’s possible responses before playing.','Which point divides the available eye space?',
 'Playing C1 occupies the vital point. White cannot divide the remaining space into two eyes. This example checks the first move.',
 'black',ogs_node(data['move_tree'],board),{'url':'https://online-go.com/puzzle/2625','note':'OGS Exercise 001 · Exercises for Beginners · mark5000'},19))

rows=[]
for slot,title,prompt,hint,explanation,player,tree,attribution,size in bank:
    line=winning_line(tree)
    assert line
    occupied={i for i,cell in enumerate(tree['board']) if cell!='.'}
    occupied.update(n['move'] for n in all_positions(tree) if 'move' in n)
    xs=[i%size for i in occupied];ys=[i//size for i in occupied]
    view=[max(0,min(xs)-1),max(0,min(ys)-1),min(size-1,max(xs)+1),min(size-1,max(ys)+1)]
    rows.append({'slot':slot,'title':title,'focus':'go','format':'Go reading problem','tags':[],'setSize':1,'estimatedMinutes':5,'fixed':True,'source':attribution,
      'variations':[{'prompt':prompt,'hint':hint,'parts':[{'id':'0','kind':'go','prompt':'Play out your solution','marks':3,'size':size,'player':player[0],'view':view,'tree':tree,'answer':json.dumps({'moves':line},separators=(',',':')),'explanation':explanation,'solutionText':'Use the board replay below to inspect the recorded winning line.'}]}]})
(root/'data/puzzles/go.js').write_text('// Reviewed source positions; generated by scripts/import-go.py using sgfmill.\nexport default '+json.dumps(rows,separators=(',',':'),ensure_ascii=False)+';\n')
print(f'Imported {len(rows)} Go examples with {sum(sum(1 for _ in all_positions(q[6])) for q in bank)} recorded positions.')
