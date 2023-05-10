import { DeckCard } from "../types";

interface QuickStatsProps {
  cardData: DeckCard[];
  isLoading: boolean;
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

const avgCmc = (cardData: DeckCard[]) => {
  const totalCmc = cardData.reduce((acc, curr) => {
    return acc + curr.card.cmc;
  }, 0);

  return (totalCmc / cardData.length).toFixed(2);
};

export default function QuickStats({ cardData, isLoading }: QuickStatsProps) {
  let typeCount = {} as typeCount;
  let averageCmc = "";
  if (cardData != null) {
    typeCount = typeCounts(cardData);
    averageCmc = avgCmc(cardData);
  }

  return (
    <div className="mb-4 text-white-normal">
      <h1 className="mb-4 text-center text-xl">Main board Quick Stats</h1>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="border-white h-32 w-32 animate-spin rounded-full border-b-2"></div>
        </div>
      ) : null}

      {cardData?.length === 0 && !isLoading ? (
        <div className="flex justify-center">
          <div className="text-center">
            <p className="text-2xl">No cards in deck</p>
            <p className="text-xl">Add cards to see stats</p>
          </div>
        </div>
      ) : null}

      {cardData?.length > 0 && !isLoading ? (
        <>
          <table className="mb-2 table-fixed border-separate">
            <thead>
              <tr>
                <th className="text-left">Card Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="truncate">{cardData?.length}</td>
              </tr>
            </tbody>
          </table>

          <table className="mb-2 table-fixed border-separate">
            <thead>
              <tr>
                <th>Average CMC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{averageCmc}</td>
              </tr>
            </tbody>
          </table>

          <div className="max-h-[550px] overflow-scroll text-white-normal">
            <table className="table-fixed border-separate">
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
                    <tr key={key}>
                      <td className="truncate">{key}</td>
                      <td className="w-1/6">{typeCount[key]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}
