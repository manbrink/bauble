import { getCardData } from "../queries";

import ManaCurve from "./ManaCurve";
import ManaProduction from "./ManaProduction";

import Spinner from "../../../components/Spinner";

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
        {!cardData && <Spinner />}

        {cardData && cardData.length === 0 && (
          <div className="text-center text-xl">No cards in deck</div>
        )}

        {cardData && cardData.length > 0 && (
          <>
            <ManaCurve cardData={cardData} />
            <ManaProduction cardData={cardData} />
          </>
        )}
      </div>
    </main>
  );
}
