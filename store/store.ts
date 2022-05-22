type CheerItem =
  | [string]
  | [string, ...[number, string][]]
  | [number, string][]
  | [true, string];
type Cheer = { [key: number]: CheerItem };

interface ChantItem {
  id: string;
  title: string;
  album: string;
  artist: string;
  image: string;
  video_gap: number;
  point: { time: number; name: string }[];
  cheer: Cheer;
}

const chantItems: ChantItem[] = [
  {
    id: '30cef8',
    title: 'Door',
    album: 'OPEN',
    artist: '권은비',
    image: 'chant/eunbi-open.png',
    video_gap: 0,
    point: [],
    cheer: {},
  },
  {
    id: '09725c',
    title: 'Glitch',
    album: 'Color',
    artist: '권은비',
    image: 'chant/eunbi-color.png',
    video_gap: 100 / 1000,
    point: [
      { time: 15, name: 'Verse' },
      { time: 57, name: 'Chorus' },
      { time: 86, name: 'Verse' },
      { time: 130, name: 'Chorus' },
      { time: 158, name: 'Bridge' },
      { time: 187, name: 'Outro' },
    ],
    cheer: {
      '731': [
        [731, '글'],
        [961, '리'],
        [1182, '치'],
        [3958, ' 권'],
        [4134, '은'],
        [4330, '비'],
      ],
      '6228': ['I come and go ', [8273, 'come'], [8471, ' and '], [8689, 'go']],
      '9912': [
        'Like a glitch ',
        [11707, 'Like'],
        [11889, ' a '],
        [12100, 'glitch'],
      ],
      '13211': ['Yeah I’m that'],
      '14681': ['고장 난 듯이 보여도'],
      '16748': ['It’s Alright ', [19121, 'Al'], [19362, 'right']],
      '21625': ['어디로 튈지 몰라'],
      '23605': ['Don’t ask me how'],
      '25950': ['잘 모르니까'],
      '27674': ['Because I don’t know'],
      '29198': ['Where it goes'],
      '30069': ['맘대로 결정할게'],
      '31973': [
        [31973, 'Up'],
        [32163, ' & '],
        [32365, 'Down'],
      ],
      '32808': [
        [32808, 'Left'],
        [33018, ' & '],
        [33234, 'Right'],
      ],
      '33643': ['그 어떤 방향에서든지 나타났지'],
      '37636': ['긴장을 놓치지 마'],
      '39804': ['I’m everywhere now'],
      '42537': ['**날 따라 움직이게 돼'],
      '46697': ['Follow me'],
      '47402': ['널 기다리지 않아'],
      '49482': ['맞춰질 기준 위에 난'],
      '52809': ['확실하게 불확실해'],
      '54581': ['그게 바로 ', [55231, '너'], [55523, '인'], [55777, '걸!']],
      '56878': [
        'I come and go ',
        [58685, 'come'],
        [58874, ' and '],
        [59090, 'go'],
      ],
      '60393': [
        'Like a glitch ',
        [62140, 'Like'],
        [62348, ' a '],
        [62577, 'glitch'],
      ],
      '63865': ['전부 훔치고서 미치게 한 Snitch ', [66890, 'Snitch']],
      '67301': ['And move it like a glitch '],
      '69112': [
        [69112, 'move'],
        [69311, ' it'],
        [69517, ' like'],
        [69718, ' a'],
        [69934, ' glitch'],
      ],
      '70628': ['Yeah I’m that glitch'],
      '74341': ['Perfect pitch'],
      '78072': ['애매한 위치 상관없이'],
      '80104': ['또 반듯이'],
      '81008': ['And move it like a glitch'],
      '84367': ['Yeah I’m that'],
      '85670': [
        [85670, 'Per'],
        [85895, 'fect'],
        [86116, ' 권은비'],
      ],
      '86931': ['내 눈빛이 조금 날카롭지'],
      '89277': ['오해하지는 마'],
      '90416': ['넌 마치 내게 끌린 듯이'],
      '92656': ['쳐다보면'],
      '93540': ['I make a touch'],
      '94714': ['T-t-touch the limit'],
      '96188': ['가파른 벽에 또 부딪히고 난 뒤'],
      '98803': ['떨림이 신경 쓰여'],
      '100604': [
        [100604, 'Wait'],
        [100729, ' a '],
        [100863, 'minute'],
      ],
      '101282': ['Woo 아직까지'],
      '102844': ['한 번도 본 적 없는듯한'],
      '104671': ['움직임 깜짝 놀래켜'],
      '106691': ['Imma wake you up'],
      '108177': ['in the morning'],
      '108933': ['or middle of the night'],
      '111441': ['여기저기 내 맘대로'],
      '113054': ['나타났다 사라져'],
      '115520': ['**날 따라 움직이게 돼'],
      '119720': ['Follow me'],
      '120391': ['널 기다리지 않아'],
      '122521': ['맞춰질 기준 위에 난'],
      '125790': ['올라타 더 위태롭게'],
      '127865': ['I make a ride'],
      '129960': [
        'I come and go ',
        [131715, 'come'],
        [131895, ' and '],
        [132103, 'go'],
      ],
      '133451': [
        'Like a glitch ',
        [135246, 'Like'],
        [135418, ' a '],
        [135625, 'glitch'],
      ],
      '136914': ['전부 훔치고서 미치게 한 Snitch ', [139965, 'Snitch']],
      '140314': ['And move it like a glitch '],
      '142166': [
        [142166, 'move'],
        [142348, ' it'],
        [142539, ' like'],
        [142758, ' a'],
        [142969, ' glitch'],
      ],
      '143683': ['Yeah I’m that glitch'],
      '147362': ['Perfect pitch'],
      '151016': ['애매한 위치 상관없이'],
      '153064': ['또 반듯이'],
      '154074': ['And move it like a glitch'],
      '157465': ['Yeah I’m that (Glitch)'],
      '158978': ['I move around'],
      '160691': ['It feels alright'],
      '162361': ['예상 못 했던'],
      '164372': ['순간에 Disappear (Appear)'],
      '168955': ['Appear (Disappear)'],
      '172977': ['Keep move around'],
      '174468': ['And I feel alive'],
      '176226': ['예상 못 했던'],
      '178378': ['순간에 Disappear (Appear)'],
      '182727': ['Appear (Disappear)'],
      '184942': ['사라져'],
      '186572': [
        [186572, '반'],
        [186764, '짝'],
        [186985, '반'],
        [187206, '짝'],
        [187447, ' 빛'],
        [187654, '나'],
        [187884, '는'],
        [188113, ' 은'],
        [188339, '비'],
        [188541, '의'],
        [188758, ' co'],
        [188978, 'lor'],
      ],
      '189642': ['(Oh) So catch me if you can'],
      '196448': ['I go ', [196904, 'up'], [197225, ' & '], [197534, 'down']],
      '198132': [
        [198132, 'Left'],
        [198492, ' & '],
        [198853, 'Right'],
      ],
      '199978': ['여기저기서 나타날 거야'],
      '203255': ['또 잔뜩 날이 선 레이더 속에서'],
      '206710': ['난 흔적도 없이 사라질 거야 다'],
      '210850': [
        [210850, '루'],
        [211065, '비'],
        [211287, '와'],
        [211751, ' 함'],
        [211977, '께'],
        [212193, '가'],
        [212406, '자'],
        [212641, ' 권'],
        [213053, '은'],
        [213488, '비'],
        [213932, ' 함성'],
      ],
    },
  },
];

class Store {
  public static getChantItems(): ChantItem[] {
    return chantItems;
  }

  public static get(id: string): ChantItem | null {
    for (const item of chantItems) if (item.id === id) return item;
    return null;
  }
}

export type { ChantItem, Cheer, CheerItem };
export default Store;
