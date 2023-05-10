import { getCardData } from "../queries";

import ManaCurve from "./ManaCurve";
import ManaProduction from "./ManaProduction";
import PriceDistribution from "./PriceDistribution";

interface DeckBuilderProps {
  params: {
    deckId: string;
  };
}

export default async function DeckBuilder({
  params: { deckId },
}: DeckBuilderProps) {
  const cardData = await getCardData(deckId);

  return (
    <main className="mx-2 my-4 lg:mx-4">
      <div className="grid grid-cols-1">
        <ManaCurve cardData={cardData} />
        <ManaProduction />
        <PriceDistribution />
      </div>
    </main>
  );
}
