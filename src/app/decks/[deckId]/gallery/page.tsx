import Link from "next/link";

import MasonryContainer from "./MasonryContainer";

import { getDeckData, getCardData } from "../queries";
import { deckFormatMap } from "../../utils";
import { DeckCard } from "../types";

interface DeckDetailProps {
  params: {
    deckId: number;
  };
}

export default async function Gallery({ params: { deckId } }: DeckDetailProps) {
  const deckData = await getDeckData(deckId);
  const cardData = await getCardData(deckId);

  const mainCardData = cardData.filter((card: DeckCard) => card.isMain);
  const sideCardData = cardData.filter((card: DeckCard) => card.isSide);

  const deckFormat =
    deckFormatMap[deckData.format as keyof typeof deckFormatMap];
  const sideString = ["Commander (EDH)", "Duel Commander"].includes(deckFormat)
    ? "Commander"
    : "Sideboard";

  return (
    <main className="m-4 h-screen">
      {mainCardData && mainCardData.length > 0 && (
        <div className="p-2">
          <h1 className="text-2xl text-white-normal pl-1">Mainboard</h1>
          <MasonryContainer
            cardData={mainCardData}
            groupBy={deckData.groupBy}
            sortBy={deckData.sortBy}
          />
        </div>
      )}

      {sideCardData && sideCardData.length > 0 && (
        <div className="p-2">
          <h1 className="text-2xl text-white-normal pl-1">{sideString}</h1>
          <MasonryContainer
            cardData={sideCardData}
            groupBy={deckData.groupBy}
            sortBy={deckData.sortBy}
          />
        </div>
      )}

      {mainCardData.length === 0 && sideCardData.length === 0 && (
        <div className="text-white-normal flex justify-center items-center h-64 underline">
          <div className="mr-2 pt-2 pr-2 pb-2">
            <Link href={`/decks/${deckId}/builder`} title="Add cards">
              Add Cards
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
