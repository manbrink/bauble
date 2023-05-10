export interface DeckCard {
  id: string;
  quantity: number;
  isMain: boolean;
  isSide: boolean;
  card: {
    id: string;
    name: string;
    setName: string;
    manaCost: string;
    producedMana: string[];
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

export const typeLineCategories = [
  "Land",
  "Creature",
  "Planeswalker",
  "Instant",
  "Sorcery",
  "Enchantment",
  "Artifact",
];
