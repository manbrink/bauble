"use client";

import Masonry from "react-masonry-css";

import CardStack from "./CardStack";

interface Props {
  cardData: DeckCard[];
  groupBy: string;
  sortBy: string;
}

interface DeckCard {
  quantity: number;
  card: {
    name: string;
    setName: string;
    manaCost: string;
    cmc: number;
    typeLine: string;
    flavorText: string;
    colors: string[];
    scryfallBorderCropUrl: string;
    scryfallArtCropUrl: string;
  };
}

interface CardStack {
  name: string;
  cardData: DeckCard[];
}

const sortCardData = (cardData: DeckCard[], sortBy: string) => {
  return cardData.sort((a: DeckCard, b: DeckCard) => {
    if (sortBy === "name") {
      return a.card.name.localeCompare(b.card.name);
    } else if (sortBy === "cmc") {
      return a.card.cmc - b.card.cmc;
    } else if (sortBy === "type") {
      return a.card.typeLine.localeCompare(b.card.typeLine);
    } else if (sortBy === "color") {
      return a.card.colors.length - b.card.colors.length;
    } else {
      return 0;
    }
  });
};

const renderCardStacks = (
  cardData: DeckCard[],
  groupBy: string,
  sortBy: string
) => {
  const typeLineCategories = [
    "Land",
    "Creature",
    "Planeswalker",
    "Instant",
    "Sorcery",
    "Enchantment",
    "Artifact",
  ];

  const groupedCardData = cardData.reduce((acc: any, curr: any) => {
    let key = "";

    if (groupBy === "typeLine") {
      key =
        typeLineCategories.find((category) =>
          curr.card[groupBy].includes(category)
        ) || "Other";
    } else {
      key = curr.card[groupBy];
    }

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});

  for (const key in groupedCardData) {
    groupedCardData[key] = sortCardData(groupedCardData[key], sortBy);
  }

  let cardStacks: JSX.Element[] = [];

  Object.keys(groupedCardData).forEach((key) => {
    cardStacks.push(
      <CardStack key={key} cardData={groupedCardData[key]} name={key} />
    );
  });

  return cardStacks;
};

export default function MasonryContainer({ cardData, groupBy, sortBy }: Props) {
  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <main className="container mx-4 h-screen">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {renderCardStacks(cardData, groupBy, sortBy)}
      </Masonry>
    </main>
  );
}