import { useMemo } from "react";
import { DeckCard } from "../types";

interface QuickStatsProps {
  cardData: DeckCard[];
}

interface TypeCount {
  [key: string]: number;
}

const cardCount = (cardData: DeckCard[]) => {
  return cardData.reduce((acc, curr) => {
    acc += curr.quantity;
    return acc;
  }, 0);
};

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

  return cardData.reduce<TypeCount>((acc, curr) => {
    const key =
      typeLineCategories.find((category) =>
        curr.card.typeLine.includes(category)
      ) || "Other";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};

const avgCmc = (cardData: DeckCard[]) => {
  let totalCmc = 0;
  let count = 0;

  cardData.forEach((card) => {
    if (!card.card.typeLine.includes("Land")) {
      totalCmc += card.card.cmc;
      count++;
    }
  });

  return (totalCmc / count).toFixed(2);
};

export default function QuickStats({ cardData }: QuickStatsProps) {
  const mainBoardData = useMemo(
    () => cardData?.filter((deckCard) => deckCard.isMain),
    [cardData]
  );

  const typeCount = typeCounts(mainBoardData);
  const averageCmc = avgCmc(mainBoardData);
  const numCards = cardCount(mainBoardData);

  return (
    <div className="mb-4 text-white-normal">
      <h1 className="mb-4 text-center text-xl">Main board Quick Stats</h1>

      {mainBoardData?.length === 0 && (
        <div className="flex justify-center">
          <div className="text-center">
            <p className="opacity-70">Add cards to see stats</p>
          </div>
        </div>
      )}

      {mainBoardData?.length > 0 && (
        <>
          <table className="mb-2 table-fixed">
            <thead>
              <tr>
                <th className="text-left">Card Count</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-neutral-darkest">
                <td className="truncate">{numCards}</td>
              </tr>
            </tbody>
          </table>

          <table className="mb-2 table-fixed">
            <thead>
              <tr>
                <th>Average CMC</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-neutral-darkest">
                <td>{averageCmc}</td>
              </tr>
            </tbody>
          </table>

          <div className="max-h-[550px] overflow-scroll text-white-normal">
            <table className="table-fixed">
              <thead>
                <tr>
                  <th className="text-left">Card Type</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {typeCount &&
                  averageCmc &&
                  Object.keys(typeCount).map((key) => (
                    <tr className="hover:bg-neutral-darkest" key={key}>
                      <td className="truncate">{key}</td>
                      <td className="w-1/6">{typeCount[key]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
