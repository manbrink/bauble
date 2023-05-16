import Image from "next/image";
import Link from "next/link";

import Button from "../components/Button";

import { deckFormatMap } from "./utils";
import { Deck } from "./types";

interface DeckListProps {
  data: Deck[];
}

const DeckList = ({ data }: DeckListProps) => {
  return (
    <main className="container mx-auto">
      {data.length >= 25 && (
        <div className="p-1 text-center text-yellow-light">
          <div>You&apos;ve reached the maximum number of decks.</div>
          <div>Please delete a deck from its information page to add more.</div>
        </div>
      )}

      {(data.length > 0 && (
        <div className="grid gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((deck: Deck) => (
            <div key={deck.id} className="p-4">
              <Link href={`/decks/${deck.id}/gallery`}>
                <div className="rounded bg-white-normal shadow-lg">
                  <div className="relative" style={{ height: "250px" }}>
                    <div className="absolute inset-0">
                      <Image
                        src={deck.featuredCardScryfallArtCropUrl}
                        alt={deck.name}
                        sizes="(max-width: 1000px) 100vw, (max-width: 1000px) 50vw, 33vw"
                        fill={true}
                        style={{ objectFit: "cover" }}
                        className="rounded-t"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-l text-gray-dark">{deck.name}</h2>
                    <p className="text-sm text-gray-dark opacity-70">
                      {deckFormatMap[
                        deck.format as keyof typeof deckFormatMap
                      ] || "Unknown Format"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )) || (
        <div className="flex h-64 items-center justify-center text-white-normal">
          <Link href={"/decks/new"}>
            <Button
              type="submit"
              text="Create a New Deck"
              theme="light"
              size="md"
            />
          </Link>
        </div>
      )}
    </main>
  );
};

export default DeckList;
