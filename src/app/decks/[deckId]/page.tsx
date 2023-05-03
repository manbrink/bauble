import NavBar from "../../components/navBar";

interface DeckDetailProps {
  params: {
    deckId: number;
  };
}

async function getData(deckId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/decks/${deckId}`
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
      <NavBar />
      <h1>Deck Detail</h1>
    </>
  );
}
