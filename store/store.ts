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
    video_gap: 50 / 1000,
    point: [
      { time: 15, name: 'Verse' },
      { time: 57, name: 'Chorus' },
      { time: 86, name: 'Verse' },
      { time: 130, name: 'Chorus' },
      { time: 158, name: 'Bridge' },
      { time: 187, name: 'Outro' },
    ],
    cheer: {
      '1405': [
        [1405, '글리치'],
        [3883, '권은비'],
      ],
      '6218': ['I come and go', [8254, 'come'], [8620, 'and'], [9082, 'go']],
      '9997': [
        'Like a glitch',
        [11763, 'Like'],
        [12123, 'a'],
        [12547, 'glitch'],
      ],
      '13338': ['Yeah I’m that'],
      '14758': ['고장 난 듯이 보여도'],
      '16822': ['It’s Alright', [18999, 'Alright']],
      '21325': ['어디로 튈지 몰라'],
      '23501': ['Don’t ask me how'],
      '25937': ['잘 모르니까'],
      '27797': ['Because I don’t know'],
      '29097': ['Where it goes'],
      '30172': ['맘대로 결정할게'],
      '32002': [
        [32002, 'Up'],
        [32180, '&'],
        [32412, 'Down'],
      ],
      '32811': [
        [32811, 'Left'],
        [32991, '&'],
        [33253, 'Right'],
      ],
      '33665': ['그 어떤 방향에서든지 나타났지'],
      '37475': ['긴장을 놓치지 마'],
      '39854': ['I’m everywhere now'],
      '42463': ['**날 따라 움직이게 돼'],
      '46740': ['Follow me 널 기다리지 않아'],
      '49512': ['맞춰질 기준 위에 난'],
      '52811': ['확실하게 불확실해'],
      '54634': ['그게 바로', [55215, '너인걸!']],
      '56942': [
        'I come and go',
        [58686, 'come'],
        [59104, 'and'],
        [59561, 'go'],
      ],
      '60440': [
        'Like a glitch',
        [62151, 'Like'],
        [62569, 'a'],
        [63001, 'glitch'],
      ],
      '63935': ['전부 훔치고서 미치게 한 Snitch', [66896, 'Snitch']],
      '67326': ['And move it like a glitch'],
      '69137': [
        [69137, 'move'],
        [69339, 'it'],
        [69574, 'like'],
        [69786, 'a'],
        [70022, 'glitch'],
      ],
      '70773': ['Yeah I’m that glitch'],
      '74312': ['Perfect pitch'],
      '78181': ['애매한 위치 상관없이 또 반듯이'],
      '80900': ['And move it like a glitch'],
      '84277': ['Yeah I’m that'],
      '85567': [
        [85567, 'Perfect'],
        [86009, '권은비'],
      ],
      '86882': ['내 눈빛이 조금 날카롭지'],
      '89280': ['오해하지는 마'],
      '90495': ['넌 마치 내게 끌린 듯이'],
      '92731': ['쳐다보면'],
      '93485': ['I make a touch'],
      '94654': ['T-t-touch the limit'],
      '96175': ['가파른 벽에 또 부딪히고 난 뒤'],
      '98871': ['떨림이 신경 쓰여'],
      '100611': [
        [100611, 'Wait'],
        [100750, 'a'],
        [100898, 'minute'],
      ],
      '101275': ['Woo 아직까지 한 번도 본 적 없는듯한'],
      '104704': ['움직임 깜짝 놀래켜'],
      '106747': ['Imma wake you up in the morning'],
      '108833': ['or middle of the night'],
      '111638': ['여기저기 내 맘대로 나타났다 사라져'],
      '115500': ['**날 따라 움직이게 돼'],
      '119638': ['Follow me 널 기다리지 않아'],
      '122465': ['맞춰질 기준 위에 난'],
      '125796': ['올라타 더 위태롭게'],
      '127898': ['I make a ride'],
      '129961': [
        'I come and go',
        [131667, 'come'],
        [132093, 'and'],
        [132513, 'go'],
      ],
      '133406': [
        'Like a glitch',
        [135188, 'Like'],
        [135612, 'a'],
        [136044, 'glitch'],
      ],
      '136917': ['전부 훔치고서 미치게 한 Snitch', [139954, 'Snitch']],
      '140396': ['And move it like a glitch'],
      '142174': [
        [142174, 'move'],
        [142392, 'it'],
        [142614, 'like'],
        [142815, 'a'],
        [143039, 'glitch'],
      ],
      '143938': ['Yeah I’m that glitch'],
      '147365': ['Perfect pitch'],
      '150653': ['애매한 위치 상관없이 또 반듯이'],
      '154077': ['And move it like a glitch'],
      '157485': ['Yeah I’m that (Glitch)'],
      '158720': ['I move around'],
      '160661': ['It feels alright'],
      '162477': ['예상 못 했던'],
      '164372': ['순간에 Disappear (Appear)'],
      '168725': ['Appear (Disappear)'],
      '172892': ['Keep move around'],
      '174473': ['And I feel alive'],
      '176259': ['예상 못 했던'],
      '178370': ['순간에 Disappear (Appear)'],
      '182916': ['Appear (Disappear)'],
      '184991': ['사라져'],
      '186514': [
        [186514, '반짝반짝'],
        [187339, '빛나는'],
        [188055, '은비의'],
        [188641, 'color'],
      ],
      '189286': ['(Oh) So catch me if you can'],
      '196528': ['I go', [196887, 'up'], [197223, '&'], [197565, 'down']],
      '198097': [
        [198097, 'Left'],
        [198515, '&'],
        [198901, 'Right'],
      ],
      '199992': ['여기저기서 나타날 거야'],
      '203263': ['또 잔뜩 날이 선 레이더 속에서'],
      '206742': ['난 흔적도 없이 사라질 거야 다'],
      '210757': [
        [210757, '루비와'],
        [211845, '함께가자'],
        [212720, '권은비'],
        [213863, '함성'],
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
