import NavBar from "../../components/navBar";
import CardStack from "./CardStack";
import DeckActions from "./DeckActions";

import Image from "next/image";

interface DeckDetailProps {
  params: {
    deckId: number;
  };
}

interface DeckCard {
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

const cardTypeMap = {
  typeLine: "Type",
  cmc: "Converted Cost",
  color: "Color",
};

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

const sortCardData = (cardData: DeckCard[], sortBy: string) => {
  return cardData.sort((a: DeckCard, b: DeckCard) => {
    if (sortBy === "name") {
      return a.card.name.localeCompare(b.card.name);
    } else if (sortBy === "cmc") {
      return a.card.cmc - b.card.cmc;
    } else if (sortBy === "type") {
      return a.card.typeLine.localeCompare(b.card.typeLine);
    } else if (sortBy === "color") {
      return a.card.colors.length - b.card.colors.length;
    } else {
      return 0;
    }
  });
};

const renderCardStacks = (
  cardData: DeckCard[],
  groupBy: string,
  sortBy: string
) => {
  const typeLineCategories = [
    "Land",
    "Creature",
    "Planeswalker",
    "Instant",
    "Sorcery",
    "Enchantment",
    "Artifact",
  ];

  const groupedCardData = cardData.reduce((acc: any, curr: any) => {
    let key = "";

    if (groupBy === "typeLine") {
      key =
        typeLineCategories.find((category) =>
          curr.card[groupBy].includes(category)
        ) || "Other";
    } else {
      key = curr.card[groupBy];
    }

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});

  for (const key in groupedCardData) {
    groupedCardData[key] = sortCardData(groupedCardData[key], sortBy);
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {Object.keys(groupedCardData).map((key) => {
        return (
          <CardStack key={key} cardData={groupedCardData[key]} name={key} />
        );
      })}
    </div>
  );
};

export default async function DeckDetail({
  params: { deckId },
}: DeckDetailProps) {
  const deckData = await getDeckData(deckId);
  const cardData = await getCardData(deckId);

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

        <DeckActions deckId={deckId} />

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

      {renderCardStacks(cardData, deckData.groupBy, deckData.sortBy)}
    </>
  );
}
