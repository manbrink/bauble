"use client";

import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "../../../components/withQueryClientProvider";

import { getCardData } from "../queries";

import AddCard from "./AddCard";
import QuickStats from "./QuickStats";
import CardTable from "./CardTable";

interface DeckBuilderProps {
  params: {
    deckId: string;
  };
}

const DeckBuilder = ({ params: { deckId } }: DeckBuilderProps) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["cards", deckId],
    queryFn: () => getCardData(deckId),
    enabled: deckId !== "",
  });

  return (
    <main className="m-4">
      <div className="grid md:grid-cols-1 lg:grid-cols-2">
        <div>
          <AddCard deckId={deckId} />
          <QuickStats />
        </div>
        <CardTable deckId={deckId} cardData={data} />
      </div>
    </main>
  );
};

export default withQueryClientProvider(DeckBuilder);
