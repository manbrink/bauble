import NavBar from "../../components/navBar";

import Image from "next/image";

interface DeckDetailProps {
  params: {
    deckId: number;
  };
}

interface Card {
  quantity: number;
  card: {
    name: string;
    setName: string;
    manaCost: string;
    cmc: number;
    typeLine: string;
    flavorText: string;
    colors: string[];
    scryfallBorderCropUrl: string;
    scryfallArtCropUrl: string;
  };
}

async function getDeckData(deckId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/decks/detail/${deckId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

async function getCardData(deckId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/deck-cards/${deckId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export default async function DeckDetail({
  params: { deckId },
}: DeckDetailProps) {
  const deckData = await getDeckData(deckId);
  const cardData = await getCardData(deckId);

  return (
    <>
      <NavBar />

      <div className="relative bg-neutral-darkest h-96">
        <div className="absolute left-0 w-1/4 text-white p-4 space-y-2">
          <div className="text-white text-3xl">
            {deckData && deckData[0].name}
          </div>
          <div className="text-white text-xl opacity-80">
            {deckData && deckData[0].format}
          </div>
          <div className="text-white text-l opacity-70">
            {deckData && deckData[0].description}
          </div>
        </div>

        <div className="absolute right-0 inset-y-0 w-1/2">
          <Image
            src={deckData && deckData[0].featuredCardScryfallArtCropUrl}
            alt={"deck"}
            fill={true}
            style={{ objectFit: "cover", objectPosition: "top" }}
            className="rounded-t"
            priority={true}
          />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-r from-neutral-darkest to-transparent"></div>
        </div>
      </div>

      <main className="container mx-auto">
        {cardData ? (
          <div className="grid grid-cols-5 gap-1">
            {cardData.map((card: Card) => (
              <div key={card.card.name} className="p-4">
                <div className="relative">
                  <Image
                    src={card.card.scryfallBorderCropUrl}
                    alt={card.card.name}
                    width={225}
                    height={300}
                    className="rounded-t"
                  />
                  <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 rounded opacity-70">
                    {card.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white text-3xl">No cards found</div>
        )}
      </main>
    </>
  );
}
