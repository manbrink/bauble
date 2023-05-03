"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "./withQueryClientProvider";

import Image from "next/image";

interface Card {
  id: string;
  name: string;
  setName: string;
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

  return (
    <div className="relative">
      <input
        type="text"
        id="featured-card"
        className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for cards"
      />
      {data && (
        <div className="absolute z-10 bg-gray-600 w-full max-h-[500px] overflow-y-auto">
          {data.data.map((card: Card) => (
            <div
              key={card.id}
              className="p-2 cursor-pointer flex items-center hover:bg-gray-700 transition-colors duration-800"
            >
              <div className="relative w-[105px] h-[140px] overflow-hidden">
                <Image
                  src={card.scryfallBorderCropUrl}
                  alt={card.name}
                  fill={true}
                  sizes="(max-width: 105px) 100vw, (max-width: 105px) 50vw, 33vw"
                />
              </div>
              <div className="ml-2">
                <div>{card.name}</div>
                <div className="text-sm opacity-70">{card.setName}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withQueryClientProvider(CardSearchInput);
