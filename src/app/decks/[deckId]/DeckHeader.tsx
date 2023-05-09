import Image from "next/image";

import DeckActions from "./DeckActions";
import { deckFormatMap } from "../utils";

interface Deck {
  id: string;
  name: string;
  description: string;
  format: string;
  featuredCardScryfallArtCropUrl: string;
}

export default function DeckHeader({ deckData }: { deckData: Deck }) {
  return (
    <>
      <div className="relative h-96 bg-neutral-darkest">
        <div className="absolute left-0 mx-4 mt-20 w-1/4 space-y-2 px-2 py-4 text-white-normal">
          <div className="text-3xl text-white-normal">
            {deckData && deckData.name}
          </div>
          <div className="text-xl text-white-normal opacity-80">
            {deckData &&
              deckFormatMap[deckData.format as keyof typeof deckFormatMap]}
          </div>
          <div className="text-l text-white-normal opacity-70">
            {deckData && deckData.description}
          </div>
        </div>

        <DeckActions deckId={deckData.id} />

        <div className="absolute inset-y-0 right-0 w-1/2">
          <Image
            src={deckData && deckData.featuredCardScryfallArtCropUrl}
            alt={"deck"}
            fill={true}
            style={{ objectFit: "cover", objectPosition: "top" }}
            className="rounded-t"
            priority={true}
          />
          <div className="to-transparent absolute inset-x-0 bottom-0 h-96 bg-gradient-to-r from-neutral-darkest"></div>
        </div>
      </div>
    </>
  );
}
