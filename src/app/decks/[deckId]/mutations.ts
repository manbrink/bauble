export async function updateDeckCard(deckCardId: string, quantity: number) {
  console.log("client quantity", quantity);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/deck-cards/${deckCardId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: quantity }),
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
