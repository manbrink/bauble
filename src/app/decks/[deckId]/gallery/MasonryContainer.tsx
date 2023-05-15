"use client";

import React from "react";
import Masonry from "react-masonry-css";

import CardStack from "./CardStack";
import { DeckCard } from "../types";

interface Props {
  cardData: DeckCard[];
  groupBy: string;
  sortBy: string;
}

const typeLineCategories = [
  "Land",
  "Creature",
  "Planeswalker",
  "Instant",
  "Sorcery",
  "Enchantment",
  "Artifact",
];

const groupKeySelection = (groupBy: string, card: DeckCard): string => {
  if (groupBy === "typeLine") {
    return (
      typeLineCategories.find((category) =>
        card.card[groupBy].includes(category)
      ) || "Other"
    );
  } else if (groupBy === "colors" && card.card.colors.length === 0) {
    return "Colorless";
  } else {
    return card.card[groupBy];
  }
};

const groupCardData = (cardData: DeckCard[], groupBy: string) => {
  return cardData.reduce((acc: Record<string, DeckCard[]>, curr: DeckCard) => {
    const key = groupKeySelection(groupBy, curr);
    acc[key] = acc[key] || [];
    acc[key].push(curr);
    return acc;
  }, {});
};

const sortCardData = (cardData: DeckCard[], sortBy: string) => {
  return [...cardData].sort((a: DeckCard, b: DeckCard) => {
    if (sortBy === "name") return a.card.name.localeCompare(b.card.name);
    if (sortBy === "cmc") return a.card.cmc - b.card.cmc;
    if (sortBy === "type")
      return a.card.typeLine.localeCompare(b.card.typeLine);
    if (sortBy === "color") return a.card.colors.length - b.card.colors.length;
    return 0;
  });
};

const MasonryContainer = ({ cardData, groupBy, sortBy }: Props) => {
  const groupedCardData = groupCardData(cardData, groupBy);
  Object.keys(groupedCardData).forEach(
    (key) => (groupedCardData[key] = sortCardData(groupedCardData[key], sortBy))
  );

  const breakpointColumnsObj = {
    default: 5,
    2000: 7,
    1500: 6,
    1300: 5,
    1050: 4,
    850: 3,
    700: 2,
    450: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName=""
    >
      {Object.keys(groupedCardData).map((key) => (
        <CardStack key={key} cardData={groupedCardData[key]} name={key} />
      ))}
    </Masonry>
  );
};

export default MasonryContainer;
