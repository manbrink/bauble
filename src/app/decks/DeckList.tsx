import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "../components/withQueryClientProvider";

import Image from "next/image";

interface DeckListProps {
  search: string;
}

interface Deck {
  id: number;
  name: string;
  description: string;
  format: string;
  featuredCard: {
    card: {
      scryfallArtCropUrl: string;
    };
  };
}

let formatMap = {
  standard: "Standard",
  historic: "Historic",
  pioneer: "Pioneer",
  modern: "Modern",
  legacy: "Legacy",
  vintage: "Vintage",
  pauper: "Pauper",
  commander: "Commander (EDH)",
  brawl: "Brawl",
  penny: "Penny Dreadful",
  duel: "Duel Commander",
  oldschool: "Old School",
  premodern: "Premodern",
  frontier: "Frontier",
  future: "Future",
  casual: "Casual",
};

async function getData(searchTerm: string) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/decks`;

  if (searchTerm) {
    url += `/${encodeURIComponent(searchTerm)}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
      {data && (
        <div className="grid grid-cols-4 gap-1">
          {data.data.map((deck: Deck) => (
            <div key={deck.id} className="p-4">
              <div className="bg-white rounded shadow-lg">
                <div className="relative" style={{ height: "250px" }}>
                  <div className="absolute inset-0">
                    <Image
                      src={deck.featuredCard.card.scryfallArtCropUrl}
                      alt={deck.name}
                      fill={true}
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 105px) 100vw, (max-width: 105px) 50vw, 33vw"
                      className="rounded"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold">{deck.name}</h2>
                  <p className="text-sm text-gray-500">
                    {formatMap[deck.format as keyof typeof formatMap]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default withQueryClientProvider(DeckList);