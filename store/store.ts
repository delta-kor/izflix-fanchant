interface ChantItem {
  title: string;
  album: string;
  artist: string;
  image: string;
}

const ChantItems: ChantItem[] = [
  {
    title: 'Door',
    album: 'OPEN',
    artist: '권은비',
    image: 'chant/eunbi-open.png',
  },
  {
    title: 'Glitch',
    album: 'Color',
    artist: '권은비',
    image: 'chant/eunbi-color.png',
  },
];

export type { ChantItem };
export default ChantItems;
