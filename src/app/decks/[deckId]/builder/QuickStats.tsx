import { DeckCard } from "../types";

interface QuickStatsProps {
  cardData: DeckCard[];
}

interface typeCount {
  [key: string]: number;
}

const typeCounts = (cardData: DeckCard[]) => {
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

    key =
      typeLineCategories.find((category) =>
        curr.card.typeLine.includes(category)
      ) || "Other";

    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;

    return acc;
  }, {});

  return groupedCardData;
};

export default function QuickStats({ cardData }: QuickStatsProps) {
  let typeCount = {} as typeCount;
  if (cardData != null) {
    typeCount = typeCounts(cardData);
  }

  return (
    <div className="text-white-normal mb-4">
      <h1 className="text-xl text-center mb-4">Main board Quick Stats</h1>
      <div className="mb-4">
        <h2>Card Count</h2>
        <ul>
          <li>Total: {cardData?.length}</li>
        </ul>
      </div>
      {cardData && (
        <div className="mb-4">
          <h2>Card Types</h2>
          <ul>
            <li>Land: {typeCount["Land"]}</li>
            <li>Creature: {typeCount["Creature"]}</li>
            <li>Planeswalker: {typeCount["Planeswalker"]}</li>
            <li>Instant: {typeCount["Instant"]}</li>
            <li>Sorcery: {typeCount["Sorcery"]}</li>
            <li>Enchantment: {typeCount["Enchantment"]}</li>
            <li>Artifact: {typeCount["Artifact"]}</li>
            <li>Other: {typeCount["Other"]}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
