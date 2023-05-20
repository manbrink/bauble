"use client";

import { redirect } from "next/navigation";

import { getCardData, getDeckData } from "../queries";
import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "../../../components/withQueryClientProvider";

import { useMediaQuery } from "react-responsive";

import Loading from "../../../components/Loading";
import DeckHeader from "../DeckHeader";
import ManaCurve from "./ManaCurve";
import ManaProduction from "./ManaProduction";

interface DeckBuilderProps {
  params: {
    deckId: string;
  };
}

const DeckBuilder = ({ params: { deckId } }: DeckBuilderProps) => {
  const isMediumScreen = useMediaQuery({ minWidth: 769 });
  const isSmallScreen = useMediaQuery({ minWidth: 376, maxWidth: 768 });
  const isVerySmallScreen = useMediaQuery({ maxWidth: 375 });

  let width = 600;
  let height = 300;

  if (isVerySmallScreen) {
    width = 300;
    height = 200;
  } else if (isSmallScreen) {
    width = 400;
    height = 200;
  } else if (isMediumScreen) {
    width = 600;
    height = 300;
  }

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

  if (isLoadingCardData || isLoadingDeckData) {
    return <Loading />;
  }

  if (isErrorCardData || isErrorDeckData) {
    redirect("/decks");
  }

  return (
    <>
      <DeckHeader deckData={deckData} />
      <main className="mx-2 my-4 lg:mx-4">
        <div className="grid grid-cols-1">
          {cardData && cardData.length === 0 && (
            <div className="text-center text-xl">No cards in deck</div>
          )}

          {cardData && cardData.length > 0 && (
            <>
              <ManaCurve cardData={cardData} width={width} height={height} />
              <ManaProduction cardData={cardData} />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default withQueryClientProvider(DeckBuilder);
