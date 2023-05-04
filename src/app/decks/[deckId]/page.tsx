import NavBar from "../../components/navBar";

import Image from "next/image";

interface DeckDetailProps {
  params: {
    deckId: number;
  };
}

async function getData(deckId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/decks/detail/${deckId}`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export default async function DeckDetail({
  params: { deckId },
}: DeckDetailProps) {
  const data = await getData(deckId);

  console.log(data);

  return (
    <>
      <div className="relative" style={{ height: "400px" }}>
        <div className="absolute inset-0">
          <Image
            src={data && data[0].featuredCardScryfallArtCropUrl}
            alt={"deck"}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 105px) 100vw, (max-width: 105px) 50vw, 33vw"
            className="rounded-t"
          />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <NavBar />
        <div className="absolute bottom-0 left-0 grid grid-cols-1 gap-2 p-4 text-white">
          <div className="text-3xl">{data && data[0].name}</div>
          <div className="text-2xl opacity-80">{data && data[0].format}</div>
          <div className="text-1xl opacity-70">
            {data && data[0].description}
          </div>
        </div>
      </div>
    </>
  );
}
