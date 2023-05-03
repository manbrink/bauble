"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "./withQueryClientProvider";

import Image from "next/image";

interface Card {
  id: string;
  name: string;
  scryfallBorderCropUrl: string;
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

  // if (data) console.log(data);

  return (
    <div className="card-search-input">
      <input
        type="text"
        id="featured-card"
        className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for cards"
      />
      {data && (
        <div className="card-search-results">
          {data.data.map((card: Card) => (
            <div key={card.id} className="card-search-result flex items-center">
              <div className="image-container">
                <Image
                  src={card.scryfallBorderCropUrl}
                  alt={card.name}
                  height={70}
                  width={50}
                />
              </div>
              <div className="card-name ml-2">{card.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withQueryClientProvider(CardSearchInput);
