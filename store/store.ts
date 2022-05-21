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
      '1003': [
        [1003, '글리치'],
        [3880, '권은비'],
      ],
      '6293': ['I come and go', [8319, 'come'], [8488, 'and'], [8708, 'go']],
      '10044': [
        'Like a glitch',
        [11734, 'Like'],
        [11942, 'a'],
        [12162, 'glitch'],
      ],
      '13263': ['Yeah I’m that'],
      '14554': ['고장 난 듯이 보여도'],
      '16789': ['It’s Alright', [19017, 'Alright']],
      '21373': ['어디로 튈지 몰라'],
      '23552': ['Don’t ask me how'],
      '25907': ['잘 모르니까'],
      '27848': ['Because I don’t know'],
      '29233': ['Where it goes'],
      '30115': ['맘대로 결정할게'],
      '32004': [
        [32004, 'Up'],
        [32181, '&'],
        [32383, 'Down'],
      ],
      '32831': [
        [32831, 'Left'],
        [33052, '&'],
        [33248, 'Right'],
      ],
      '33712': ['그 어떤 방향에서든지 나타났지'],
      '37485': ['긴장을 놓치지 마'],
      '39762': ['I’m everywhere now'],
      '42183': ['**날 따라 움직이게 돼'],
      '46651': ['Follow me 널 기다리지 않아'],
      '49446': ['맞춰질 기준 위에 난'],
      '52823': ['확실하게 불확실해'],
      '54633': ['그게 바로', [55162, '너인걸!']],
      '56844': [
        'I come and go',
        [58708, 'come'],
        [58924, 'and'],
        [59131, 'go'],
      ],
      '60409': [
        'Like a glitch',
        [62167, 'Like'],
        [62383, 'a'],
        [62584, 'glitch'],
      ],
      '63901': ['전부 훔치고서 미치게 한 Snitch', [66897, 'Snitch']],
      '67326': ['And move it like a glitch'],
      '69122': [
        [69122, 'move'],
        [69332, 'it'],
        [69540, 'like'],
        [69743, 'a'],
        [69969, 'glitch'],
      ],
      '70711': ['Yeah I’m that glitch'],
      '74317': ['Perfect pitch'],
      '78133': ['애매한 위치 상관없이 또 반듯이'],
      '80881': ['And move it like a glitch'],
      '84560': ['Yeah I’m that'],
      '85603': [
        [85603, 'Perfect'],
        [86021, '권은비'],
      ],
      '86951': ['내 눈빛이 조금 날카롭지'],
      '89195': ['오해하지는 마'],
      '90513': ['넌 마치 내게 끌린 듯이'],
      '92644': ['쳐다보면'],
      '93683': ['I make a touch'],
      '94655': ['T-t-touch the limit'],
      '96242': ['가파른 벽에 또 부딪히고 난 뒤'],
      '98854': ['떨림이 신경 쓰여'],
      '100587': [
        [100587, 'Wait'],
        [100740, 'a'],
        [100897, 'minute'],
      ],
      '101331': ['Woo 아직까지 한 번도 본 적 없는듯한'],
      '104753': ['움직임 깜짝 놀래켜'],
      '106796': ['Imma wake you up in the morning'],
      '108767': ['or middle of the night'],
      '111067': ['여기저기 내 맘대로 나타났다 사라져'],
      '115544': ['**날 따라 움직이게 돼'],
      '119293': ['Follow me 널 기다리지 않아'],
      '122504': ['맞춰질 기준 위에 난'],
      '125743': ['올라타 더 위태롭게'],
      '127909': ['I make a ride'],
      '129966': [
        'I come and go',
        [131718, 'come'],
        [131881, 'and'],
        [132089, 'go'],
      ],
      '133404': [
        'Like a glitch',
        [135207, 'Like'],
        [135403, 'a'],
        [135630, 'glitch'],
      ],
      '136912': ['전부 훔치고서 미치게 한 Snitch', [139943, 'Snitch']],
      '140374': ['And move it like a glitch'],
      '142175': [
        [142175, 'move'],
        [142375, 'it'],
        [142586, 'like'],
        [142777, 'a'],
        [142997, 'glitch'],
      ],
      '143744': ['Yeah I’m that glitch'],
      '147341': ['Perfect pitch'],
      '150666': ['애매한 위치 상관없이 또 반듯이'],
      '153972': ['And move it like a glitch'],
      '157357': ['Yeah I’m that (Glitch)'],
      '158973': ['I move around'],
      '160707': ['It feels alright'],
      '162357': ['예상 못 했던'],
      '164247': ['순간에 Disappear (Appear)'],
      '168826': ['Appear (Disappear)'],
      '172872': ['Keep move around'],
      '174474': ['And I feel alive'],
      '176277': ['예상 못 했던'],
      '178349': ['순간에 Disappear (Appear)'],
      '182751': ['Appear (Disappear)'],
      '184940': ['사라져'],
      '186510': [
        [186510, '반짝반짝'],
        [187290, '빛나는'],
        [188044, '은비의'],
        [188689, 'color'],
      ],
      '189535': ['(Oh) So catch me if you can'],
      '196498': ['I go', [196921, 'up'], [197225, '&'], [197533, 'down']],
      '198172': [
        [198172, 'Left'],
        [198522, '&'],
        [198876, 'Right'],
      ],
      '199854': ['여기저기서 나타날 거야'],
      '203268': ['또 잔뜩 날이 선 레이더 속에서'],
      '206632': ['난 흔적도 없이 사라질 거야 다'],
      '210814': [
        [210814, '루비와'],
        [211762, '함께가자'],
        [212680, '권은비'],
        [213938, '함성'],
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
