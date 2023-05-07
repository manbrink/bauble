import Image from "next/image";

import NavBar from "../../components/navBar";
import DeckActions from "./DeckActions";

interface Deck {
  id: number;
  name: string;
  description: string;
  format: string;
  featuredCardScryfallArtCropUrl: string;
}

export default function DeckHeader({ deckData }: { deckData: Deck }) {
  return (
    <>
      <NavBar />
      <div className="relative bg-neutral-darkest h-96">
        <div className="absolute left-0 w-1/4 text-white-normal p-4 space-y-2">
          <div className="text-white-normal text-3xl">
            {deckData && deckData.name}
          </div>
          <div className="text-white-normal text-xl opacity-80">
            {deckData && deckData.format}
          </div>
          <div className="text-white-normal text-l opacity-70">
            {deckData && deckData.description}
          </div>
        </div>

        <DeckActions deckId={deckData.id} />

        <div className="absolute right-0 inset-y-0 w-1/2">
          <Image
            src={deckData && deckData.featuredCardScryfallArtCropUrl}
            alt={"deck"}
            fill={true}
            style={{ objectFit: "cover", objectPosition: "top" }}
            className="rounded-t"
            priority={true}
          />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-r from-neutral-darkest to-transparent"></div>
        </div>
      </div>
    </>
  );
}
