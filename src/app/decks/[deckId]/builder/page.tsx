"use client";

import { redirect } from "next/navigation";

import { useQueries } from "@tanstack/react-query";
import withQueryClientProvider from "../../../components/withQueryClientProvider";
import Loading from "../../../components/Loading";

import { getCardData, getDeckData } from "../queries";
import { Deck, DeckCard } from "../types";

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
  const queryResults = useQueries({
    queries: [
      { queryKey: ["deckData", deckId], queryFn: () => getDeckData(deckId) },
      { queryKey: ["cardData", deckId], queryFn: () => getCardData(deckId) },
    ],
  });

  if (deckId === "") {
    return null; // or some fallback UI
  }

  const isLoading = queryResults.some((result) => result.isLoading);
  const isError = queryResults.some((result) => result.isError);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    redirect("/decks");
  }

  const [deckDataResult, cardDataResult] = queryResults;
  const deckData = deckDataResult.data as Deck;
  const cardData = cardDataResult.data as DeckCard[];

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
