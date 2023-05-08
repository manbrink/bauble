export async function updateDeckCard(deckCardId: string, quantity: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/deck-cards/${deckCardId}`,
    {
      method: "UPDATE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deckCardId, quantity }),
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
