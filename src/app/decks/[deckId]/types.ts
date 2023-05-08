export interface DeckCard {
  quantity: number;
  isMain: boolean;
  isSide: boolean;
  card: {
    id: number;
    name: string;
    setName: string;
    manaCost: string;
    cmc: number;
    typeLine: string;
    flavorText: string;
    colors: string[];
    isMain: boolean;
    isSide: boolean;
    scryfallBorderCropUrl: string;
    scryfallArtCropUrl: string;
  };
}
