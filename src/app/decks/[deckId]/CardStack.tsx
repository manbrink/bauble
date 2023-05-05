"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Card {
  quantity: number;
  card: {
    name: string;
    setName: string;
    manaCost: string;
    cmc: number;
    typeLine: string;
    flavorText: string;
    colors: string[];
    scryfallBorderCropUrl: string;
    scryfallArtCropUrl: string;
  };
}

export default function CardStack({ cardData }: { cardData: Card[] }) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <main className="container p-4 mx-auto">
      {cardData ? (
        <div className="relative">
          {cardData.map((card: Card, index: number) => (
            <div
              key={card.card.name}
              className={`absolute transition-all duration-1000 ${
                hoveredCard !== null && index > hoveredCard
                  ? "translate-y-full"
                  : ""
              }`}
              style={{ marginTop: index * 30, zIndex: cardData.length + index }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Image
                src={card.card.scryfallBorderCropUrl}
                alt={card.card.name}
                width={225}
                height={300}
                className="rounded-t"
              />
              <div className="absolute top-0 left-0 bg-black text-white-normal px-2 py-1 rounded opacity-70">
                {card.quantity}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white-normal text-3xl">No cards found</div>
      )}
    </main>
  );
}
