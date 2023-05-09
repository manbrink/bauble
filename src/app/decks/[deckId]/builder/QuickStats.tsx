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

const avgCmc = (cardData: DeckCard[]) => {
  const totalCmc = cardData.reduce((acc, curr) => {
    return acc + curr.card.cmc;
  }, 0);

  return (totalCmc / cardData.length).toFixed(2);
};

export default function QuickStats({ cardData }: QuickStatsProps) {
  let typeCount = {} as typeCount;
  let averageCmc = "";
  if (cardData != null) {
    typeCount = typeCounts(cardData);
    averageCmc = avgCmc(cardData);
  }

  return (
    <div className="text-white-normal mb-4">
      <h1 className="text-xl text-center mb-4">Main board Quick Stats</h1>

      <table className="table-fixed border-separate mb-2">
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

      <table className="table-fixed border-separate mb-2">
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

      <div className="text-white-normal max-h-[550px] overflow-scroll">
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
    </div>
  );
}
