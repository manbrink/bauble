export async function deleteDeck(deckId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/decks/${deckId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

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

export async function createDeckCard(
  deckId: string,
  cardId: string,
  quantity: number,
  isMain: boolean,
  isSide: boolean
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/deck-cards/deck/${deckId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardId: cardId,
        quantity: quantity,
        isMain: isMain,
        isSide: isSide,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
