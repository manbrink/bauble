"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

import { useQueries } from "@tanstack/react-query";
import withQueryClientProvider from "../../../components/withQueryClientProvider";
import Loading from "../../../components/Loading";

import DeckHeader from "../DeckHeader";
import MasonryContainer from "./MasonryContainer";

import { getDeckData, getCardData } from "../queries";

import { deckFormatMap } from "../../utils";
import { DeckCard } from "../types";

interface DeckDetailProps {
  params: {
    deckId: string;
  };
}

const Gallery = ({ params: { deckId } }: DeckDetailProps) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["deckData", deckId],
        queryFn: () => getDeckData(deckId),
      },
      {
        queryKey: ["cardData", deckId],
        queryFn: () => getCardData(deckId),
      },
    ],
  });

  if (deckId === "") {
    return null; // or some fallback UI
  }

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    redirect("/decks");
  }

  const deckData = results[0].data;
  const cardData = results[1].data;

  const mainCardData = cardData?.filter((card: DeckCard) => card.isMain) || [];
  const sideCardData = cardData?.filter((card: DeckCard) => card.isSide) || [];

  const { groupBy, sortBy } = deckData;

  const deckFormat =
    deckFormatMap[deckData?.format as keyof typeof deckFormatMap];
  const sideString = ["Commander (EDH)", "Duel Commander"].includes(deckFormat)
    ? "Commander"
    : "Sideboard";

  const hasMainCards = mainCardData.length > 0;
  const hasSideCards = sideCardData.length > 0;

  return (
    <>
      <DeckHeader deckData={deckData} />
      <main className="m-4 h-screen">
        {hasMainCards && (
          <div className="p-2">
            <h1 className="pl-1 text-center text-2xl text-white-normal">
              Mainboard
            </h1>
            <MasonryContainer
              cardData={mainCardData}
              groupBy={groupBy}
              sortBy={sortBy}
            />
          </div>
        )}

        {hasSideCards && (
          <div className="p-2">
            <h1 className="pl-1 text-center text-2xl text-white-normal">
              {sideString}
            </h1>
            <MasonryContainer
              cardData={sideCardData}
              groupBy={groupBy}
              sortBy={sortBy}
            />
          </div>
        )}

        {!hasMainCards && !hasSideCards && (
          <div className="flex h-64 items-center justify-center text-white-normal underline">
            <div className="mr-2 pb-2 pr-2 pt-2">
              <Link href={`/decks/${deckId}/builder`} title="Add cards">
                Add Cards
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default withQueryClientProvider(Gallery);
