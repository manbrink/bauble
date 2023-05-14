"use client";

import { getCardData, getDeckData } from "../queries";
import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "../../../components/withQueryClientProvider";

import DeckHeader from "../DeckHeader";
import ManaCurve from "./ManaCurve";
import ManaProduction from "./ManaProduction";

import Spinner from "../../../components/Spinner";

interface DeckBuilderProps {
  params: {
    deckId: string;
  };
}

const DeckBuilder = ({ params: { deckId } }: DeckBuilderProps) => {
  const {
    isLoading: isLoadingCardData,
    isError: isErrorCardData,
    data: cardData,
  } = useQuery({
    queryKey: ["cardData", deckId],
    queryFn: () => getCardData(deckId),
    enabled: deckId !== "",
  });

  const {
    isLoading: isLoadingDeckData,
    isError: isErrorDeckData,
    data: deckData,
  } = useQuery({
    queryKey: ["deckData", deckId],
    queryFn: () => getDeckData(deckId),
    enabled: deckId !== "",
  });

  return (
    <>
      <DeckHeader deckData={deckData} />
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
    </>
  );
};

export default withQueryClientProvider(DeckBuilder);
