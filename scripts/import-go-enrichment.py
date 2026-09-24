"""Import selected cached SGFs offline. No network requests.

Each selected position has an authored objective/hint, source rank and source
winning tree. sgfmill checks captures; validate-go.py independently replays the
saved boards. Source winning markers are not an independent strategic proof.
"""
import json
import pathlib
from sgfmill import sgf,boards

ROOT=pathlib.Path(__file__).resolve().parents[1]
CACHE=ROOT/'references/go'
# Exact source IDs, objectives and useful starting directions. Preserve ko and
# seki outcomes instead of silently treating them as unconditional life/death.
selected=[
 (8,'capture','Capture the three white stones.','Count the liberties of the connected white stones before choosing your first atari.'),
 (157,'live','Keep the enclosed black group alive.','Compare the empty points inside the group: which spaces can remain separate eyes?'),
 (169,'kill','Prevent the enclosed white group from making two eyes.','Look for an inside point that joins the possible eye spaces into one.'),
 (171,'kill','Prevent the enclosed black group from making two eyes.','Compare the empty points inside the black group and count the independent eye spaces.'),
 (174,'kill','Prevent the white group from living.','Consider the eye shape left after White captures a stone played inside it.'),
 (176,'capture','Capture the vulnerable white stones.','A stone can be sacrificed if the recapture removes a larger group. Recount liberties after each capture.'),
 (177,'live','Keep the enclosed white group alive.','Check whether an inside move protects two separate eye spaces against Black’s reply.'),
 (178,'kill','Prevent the enclosed white group from living.','Look for a forcing move that reduces the available eye space.'),
 (180,'kill','Prevent the white group from making two eyes.','Identify which empty point is shared by the possible eye spaces.'),
 (186,'kill','Prevent the black group from making two eyes.','An apparent eye may disappear after a forcing exchange. Read the opponent’s capture first.'),
 (191,'cut','Keep the two black groups separated.','Check the connection points between the black groups and whether Black can occupy them safely.'),
 (195,'live','Keep the enclosed white group alive.','Two eyes need two independent empty spaces; occupying the wrong internal point can join them.'),
 (201,'live','Keep the enclosed white group alive.','Compare the inside moves by the eye space remaining after Black replies.'),
 (233,'kill','Prevent the black-surrounded white group from living.','Look at whether an apparent eye remains an eye after an opponent plays inside it.'),
 (235,'kill','Prevent the enclosed white group from living.','Count outside liberties as well as inside empty points before starting a capture.'),
 (255,'connect','Connect the separated white stones so Black cannot cut them.','Compare the possible connection points and read a cut at the other point.'),
 (313,'kill','Prevent the black corner group from living.','The board edge reduces the available liberties. Read both ways Black might try to divide the corner.'),
 (323,'kill','Prevent the enclosed white group from living.','Check whether White can safely approach each side of the remaining eye space.'),
 (379,'kill','Prevent the enclosed black group from living.','Compare Black’s replies before choosing which part of the eye space to occupy.'),
 (405,'capture','Capture the vulnerable black stones in the local fight.','Follow the liberties of the surrounded stones; an atari can force the direction of escape.'),
 (539,'live','Save the enclosed white group.','Look for an escape or capture outside the eye space as well as an inside eye-making move.'),
 (559,'kill','Prevent the enclosed white group from living.','Examine the central point of the eye space, then test White’s most forcing reply.'),
 (1120,'kill','Prevent the enclosed white group from living.','Look for a move that reduces two possible eye spaces at once.'),
 (1164,'capture','Capture the two white stones that divide the black group.','Compare chasing directly with enclosing the stones; count liberties after each reply.'),
 (1180,'capture','Save the three black stones by capturing the surrounding white stones.','Compare the liberties of both groups. A capture may be more effective than simply extending.'),
 (9,'live','Keep the enclosed black group alive.','Plan for two independent eyes and test the opponent’s strongest inside reply.'),
 (37,'live','Keep the black group alive.','Compare the eye space left by each forcing exchange, rather than counting only current empty points.'),
 (107,'capture','Capture the two vulnerable white stones.','Read the forcing ataris in both orders and check whether either permits an escape.'),
 (185,'kill','Prevent the enclosed white group from living.','Read the opponent’s capture before judging whether your inside move removes an eye.'),
 (188,'connect','Connect the separated white stones.','Consider the cutting points together: a forcing move can protect a later connection.'),
 (472,'live','Keep the enclosed black group alive.','Test each candidate eye-making move against White’s most restrictive reply.'),
 (451,'kill','Prevent the enclosed black group from living.','Count the liberties involved in the inside capture sequence before choosing a move.'),
 (13,'live','Keep the enclosed black group alive.','Compare the eye shapes after the forcing replies, including any sacrifice inside the group.'),
 (25,'ko','Obtain a ko fight for the black group. The source accepts ko; unconditional life is not required.','Check which capture would allow recapture after a ko threat rather than immediate recapture.'),
 (32,'live','Keep the black group on the right side alive.','Read the edge liberties and the opponent’s forcing responses before dividing the eye space.'),
 (41,'seki','Save Black by reaching seki: neither side can safely capture the other.','Distinguish shared liberties from private ones. Test what happens if either side fills a shared liberty.'),
 (51,'live','Keep the black corner group alive without relying on ko.','Reject lines that leave only a ko fight; look for two secure eyes after the replies.'),
 (53,'live','Keep the enclosed black group alive.','Look for forcing moves outside the eye space before deciding where the eyes must form.'),
 (68,'kill','Capture the enclosed white group. Seki is not a successful outcome here.','Read the full liberty race; a position where neither side can capture does not meet the objective.'),
 (70,'kill','Prevent the enclosed white group from living.','Compare the order of the forcing moves and the eye shape left by each capture.'),
 (74,'kill','Prevent the enclosed white group from living.','Look for a move that changes White’s available replies before occupying the eye space.'),
 (78,'kill','Prevent the black group from living.','Test the apparent eye-making points against White’s forcing exchanges.'),
 (80,'live','Keep the black corner group alive without ko.','Count the secure eyes at the end of the line; a single eye plus a ko is insufficient.'),
 (93,'live','Save the vulnerable white stones.','A forcing move against neighbouring stones may create liberties for your own group.'),
 (184,'kill','Prevent the enclosed black group from living.','Trace the captures inside the eye space and check the shape after the captured stones disappear.'),
 (199,'capture','Save Black by winning the local capturing race.','Compare both groups’ liberties, including liberties gained by a capture.'),
 (497,'kill','Prevent the enclosed black group from living.','Read the final eye shape after the forcing exchanges, rather than the initial outline alone.'),
 (534,'connect','Connect the white groups and keep them alive.','Look for forcing moves that protect both the connection and the resulting eye space.'),
 (577,'live','Keep the enclosed black group alive.','Consider sacrificing a stone if the resulting capture improves the group’s eye shape.'),
 (579,'kill','Prevent the enclosed black group from living.','Compare moves that occupy eye space with moves that force Black to fill it.'),
 (656,'capture','Capture the black group using the local capturing sequence.','Recount liberties after every capture; more than one sacrificial exchange may be needed.')
]

def encode(board):
    return ''.join({None:'.','b':'B','w':'W'}[board.get(board.side-1-y,x)] for y in range(board.side) for x in range(board.side))
def tree_of(node,board):
    colour,point=node.get_move()
    if colour:
        if point is None or board.get(*point) is not None:raise ValueError('Pass or occupied source move')
        board=board.copy();board.play(*point,colour)
        if board.get(*point)!=colour:raise ValueError('Suicide')
    result={'board':encode(board),'children':[tree_of(child,board) for child in node]}
    if colour:result.update(move=(board.side-1-point[0])*board.side+point[1],colour=colour)
    if node.has_property('C') and any(b'RIGHT' in text for text in node.get_raw_list('C')):result['success']=True
    if not result['children'] and not result.get('success'):result['failure']=True
    return result
def winning(node):
    if node.get('success'):return []
    for child in node['children']:
        line=winning(child)
        if line is not None:return [child['move']]+line
    return None
def nodes(tree):
    yield tree
    for child in tree['children']:yield from nodes(child)
def merge_branches(node):
    children={}
    for child in node['children']:
        move=child['move']
        if move not in children:children[move]=child
        else:
            previous=children[move]
            if previous['board']!=child['board'] or previous['colour']!=child['colour']:raise ValueError('Conflicting source position')
            previous['children'].extend(child['children'])
            if child.get('success'):previous['success']=True
            if previous.get('success') or previous['children']:previous.pop('failure',None)
    node['children']=list(children.values())
    for child in node['children']:merge_branches(child)
    return node

bank_path=ROOT/'data/puzzles/go.js'
bank=json.loads(bank_path.read_text().split('export default ',1)[1].strip().removesuffix(';'))
slots=list(range(50,100))+[165]
bank=[q for q in bank if q['slot'] not in slots]
inventory=[]
for slot,(source_id,theme,objective,hint) in zip(slots,selected,strict=True):
    source=json.loads((CACHE/f'goproblems-{source_id}.json').read_text())
    game=sgf.Sgf_game.from_bytes(source['sgf'].encode());board=boards.Board(game.get_size())
    if not board.apply_setup(*game.get_root().get_setup_stones()):raise ValueError('Illegal setup')
    tree=merge_branches(tree_of(game.get_root(),board));line=winning(tree)
    if not line:raise ValueError(f'No winning line for {source_id}')
    size=game.get_size();positions={i for node in nodes(tree) for i,c in enumerate(node['board']) if c!='.'}
    xs=[i%size for i in positions];ys=[i//size for i in positions]
    view=[max(0,min(xs)-1),max(0,min(ys)-1),min(size-1,max(xs)+1),min(size-1,max(ys)+1)]
    rank=source['rank']['value'];level='beginner' if rank>=25 else 'foundation' if rank>=18 else 'standard' if rank>=12 else 'stretch'
    player=source['playerColor'][0]
    explanation='The source marks the recorded continuation as successful. Replay the moves to inspect the liberties, captures and final shape.'
    if theme=='ko':explanation='The accepted outcome is ko. Winning the eventual fight depends on ko threats elsewhere on the board.'
    if theme=='seki':explanation='The accepted outcome is seki. Filling a shared liberty lets the other side capture first.'
    bank.append(dict(slot=slot,title=f"{source['playerColor'].title()} to {theme} · {source_id}",focus='go',format='Go reading problem',tags=[f'go:{theme}',f'challenge:{level}'],challengeLevel=level,sourceRank=rank,rankBasis='GoProblems source rank',fixed=True,setSize=3,estimatedMinutes=5,reviewStatus='pending',
        source={'url':source['url'],'note':f"GoProblems #{source_id} · {rank} kyu · contributed by {source['author']}"+(f" · source: {source['source']}" if source.get('source') else '')},
        variations=[dict(prompt=f"{source['playerColor'].title()} to play. {objective}",hint=hint,parts=[dict(id='0',kind='go',prompt='Play out your solution',marks=3,size=size,player=player,view=view,tree=tree,answer=json.dumps({'moves':line}),explanation=explanation,solutionText='Use the board replay to inspect the recorded winning line.')])]))
    inventory.append(dict(id=source_id,slot=slot,rank=rank,level=level,theme=theme,cache=f'references/go/goproblems-{source_id}.json',review='Objective and source comments reviewed; move legality checked. Strategic outcomes follow source winning markers.'))
bank_path.write_text('// Cached source positions; see scripts/import-go-enrichment.py.\nexport default '+json.dumps(bank,ensure_ascii=False,separators=(',',':'))+';\n')
(ROOT/'data/coverage/go-enrichment-inventory.json').write_text(json.dumps(inventory,indent=2)+'\n')
print(f'Imported {len(selected)} cached source problems; {len(bank)} Go problems total.')
