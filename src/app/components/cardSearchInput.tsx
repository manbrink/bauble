"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "./withQueryClientProvider";

interface Card {
  id: string;
  name: string;
}

async function getData(searchTerm: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cards/${encodeURIComponent(
      searchTerm
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

const CardSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["cards", searchTerm],
    queryFn: () => getData(searchTerm),
    enabled: searchTerm !== "",
  });

  return (
    <div className="card-search-input">
      <input
        type="text"
        id="featured-card"
        className="w-full px-3 py-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for cards"
      />
      {/* {isLoading && <div>Loading...</div>} */}
      {data && (
        <div className="card-search-results">
          {data.map((card: Card) => (
            <div key={card.id} className="card-search-result">
              {card.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withQueryClientProvider(CardSearchInput);
