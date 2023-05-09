export async function getDeckData(deckId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/decks/detail/${deckId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export async function getCardData(deckId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/deck-cards/deck/${deckId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
