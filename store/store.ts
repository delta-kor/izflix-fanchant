interface ChantItem {
  id: string;
  title: string;
  album: string;
  artist: string;
  image: string;
}

const chantItems: ChantItem[] = [
  {
    id: '30cef8',
    title: 'Door',
    album: 'OPEN',
    artist: '권은비',
    image: 'chant/eunbi-open.png',
  },
  {
    id: '09725c',
    title: 'Glitch',
    album: 'Color',
    artist: '권은비',
    image: 'chant/eunbi-color.png',
  },
];

class Store {
  public static getChantItems(): ChantItem[] {
    return chantItems;
  }
}

export type { ChantItem };
export default Store;
