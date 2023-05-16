export async function getDecks(searchTerm: string) {
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
