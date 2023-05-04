"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "./withQueryClientProvider";

import Image from "next/image";

interface Card {
  id: string;
  name: string;
  setName: string;
  scryfallBorderCropUrl: string;
  scryfallArtCropUrl: string;
}

interface Props {
  handleCardChange: (card: Card) => void;
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
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

const CardSearchInput = ({ handleCardChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInternalSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["cards", internalSearchTerm],
    queryFn: () => getData(internalSearchTerm),
    enabled: internalSearchTerm !== "",
  });

  const handleCardClick = (card: Card) => {
    setSearchTerm(`${card.name} (${card.setName})`);
    setShowResults(false);
    handleCardChange(card);
  };

  return (
    <div className="relative">
      <input
        type="text"
        id="featured-card"
        className="text-gray-dark w-full px-3 py-2 border border-white rounded"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowResults(true);
        }}
        placeholder="Search for cards"
      />
      {data && showResults && (
        <div className="absolute z-10 bg-white w-full max-h-[500px] overflow-y-auto">
          {data.data.map((card: Card) => (
            <div
              key={card.id}
              className="p-2 cursor-pointer flex items-center hover:bg-gray-medium transition-colors duration-800"
              onClick={() => handleCardClick(card)}
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
