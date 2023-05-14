"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
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
    redirect("/decks");
  }

  const mainCardData = cardData?.filter((card: DeckCard) => card.isMain);
  const sideCardData = cardData?.filter((card: DeckCard) => card.isSide);

  const deckFormat =
    deckFormatMap[deckData?.format as keyof typeof deckFormatMap];
  const sideString = ["Commander (EDH)", "Duel Commander"].includes(deckFormat)
    ? "Commander"
    : "Sideboard";

  return (
    <>
      <DeckHeader deckData={deckData} />
      <main className="m-4 h-screen">
        {mainCardData.length > 0 && (
          <div className="p-2">
            <h1 className="pl-1 text-2xl text-white-normal">Mainboard</h1>
            <MasonryContainer
              cardData={mainCardData}
              groupBy={deckData.groupBy}
              sortBy={deckData.sortBy}
            />
          </div>
        )}

        {sideCardData.length > 0 && (
          <div className="p-2">
            <h1 className="pl-1 text-2xl text-white-normal">{sideString}</h1>
            <MasonryContainer
              cardData={sideCardData}
              groupBy={deckData.groupBy}
              sortBy={deckData.sortBy}
            />
          </div>
        )}

        {mainCardData.length === 0 && sideCardData.length === 0 && (
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
