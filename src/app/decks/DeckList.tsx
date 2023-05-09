import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "../components/withQueryClientProvider";

import Image from "next/image";
import Link from "next/link";

import Button from "../components/Button";
import { deckFormatMap } from "./utils";

interface DeckListProps {
  search: string;
}

interface Deck {
  id: string;
  name: string;
  description: string;
  format: string;
  featuredCardScryfallArtCropUrl: string;
}

async function getData(searchTerm: string) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/decks`;

  if (searchTerm) {
    url += `/search/${encodeURIComponent(searchTerm)}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

const DeckList = ({ search }: DeckListProps) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["decks", search],
    queryFn: () => getData(search),
    retry: 5,
  });

  return (
    <main className="container mx-auto">
      {(data?.data?.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
          {data.data.map((deck: Deck) => (
            <div key={deck.id} className="p-4">
              <Link href={`/decks/${deck.id}/gallery`}>
                <div className="bg-white-normal rounded shadow-lg">
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
                      {deckFormatMap[deck.format as keyof typeof deckFormatMap]}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )) || (
        <div className="text-white-normal flex justify-center items-center h-64">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error loading decks</p>}
          {!isLoading && !isError && (
            <Link href={"/decks/new"}>
              <Button
                type="submit"
                text="Create a New Deck"
                theme="light"
                size="md"
              />
            </Link>
          )}
        </div>
      )}
    </main>
  );
};

export default withQueryClientProvider(DeckList);
