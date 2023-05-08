"use client";

import { useState } from "react";

import { getDeckData, getCardData } from "../queries";
import { DeckCard } from "../types";

import AddCard from "./AddCard";
import QuickStats from "./QuickStats";
import CardTable from "./CardTable";

interface DeckBuilderProps {
  params: {
    deckId: string;
  };
}

export default async function DeckBuilder({
  params: { deckId },
}: DeckBuilderProps) {
  const [board, setBoard] = useState("main");

  const deckData = await getDeckData(deckId);
  const cardData = await getCardData(deckId);

  const mainCardData = cardData.filter((card: DeckCard) => card.isMain);
  const sideCardData = cardData.filter((card: DeckCard) => card.isSide);

  return (
    <main className="m-4 h-screen">
      <div className="grid md:grid-cols-1 lg:grid-cols-2">
        <div>
          <AddCard />
          <QuickStats />
        </div>
        {board === "main" ? (
          <CardTable cardData={mainCardData} setBoard={setBoard} />
        ) : (
          <CardTable cardData={sideCardData} setBoard={setBoard} />
        )}
      </div>
    </main>
  );
}
