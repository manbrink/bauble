import MasonryContainer from "./MasonryContainer";

import { getDeckData, getCardData } from "../queries";

interface DeckDetailProps {
  params: {
    deckId: number;
  };
}

export default async function Gallery({ params: { deckId } }: DeckDetailProps) {
  const deckData = await getDeckData(deckId);
  const cardData = await getCardData(deckId);

  return (
    <>
      {cardData && (
        <MasonryContainer
          cardData={cardData}
          groupBy={deckData.groupBy}
          sortBy={deckData.sortBy}
        />
      )}
    </>
  );
}
