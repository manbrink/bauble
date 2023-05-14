"use client";

import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "../../../components/withQueryClientProvider";
import Loading from "../../../components/Loading";

import { getCardData, getDeckData } from "../queries";

import DeckHeader from "../DeckHeader";
import AddCard from "./AddCard";
import QuickStats from "./QuickStats";
import CardTable from "./CardTable";

interface DeckBuilderProps {
  params: {
    deckId: string;
  };
}

const DeckBuilder = ({ params: { deckId } }: DeckBuilderProps) => {
  const {
    isLoading: isLoadingDeckData,
    isError: isErrorDeckData,
    data: deckData,
  } = useQuery({
    queryKey: ["deckData", deckId],
    queryFn: () => getDeckData(deckId),
    enabled: deckId !== "",
  });

  const {
    isLoading: isLoadingCardData,
    isError: isErrorCardData,
    data: cardData,
  } = useQuery({
    queryKey: ["cardData", deckId],
    queryFn: () => getCardData(deckId),
    enabled: deckId !== "",
  });

  if (isLoadingDeckData || isLoadingCardData) {
    return <Loading />;
  }

  if (isErrorDeckData || isErrorCardData) {
    return <div>Error</div>;
  }

  return (
    <>
      <DeckHeader deckData={deckData} />
      <main className="m-4">
        <div className="grid md:grid-cols-1 lg:grid-cols-2">
          <div>
            <AddCard deckId={deckId} />
            <QuickStats cardData={cardData} />
          </div>
          <CardTable cardData={cardData} />
        </div>
      </main>
    </>
  );
};

export default withQueryClientProvider(DeckBuilder);
