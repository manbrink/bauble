"use client";

import { useState } from "react";

import { getDeckData } from "../queries";

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

  return (
    <main className="m-4">
      <div className="grid md:grid-cols-1 lg:grid-cols-2">
        <div>
          <AddCard deckId={deckId} />
          <QuickStats />
        </div>
        <CardTable deckId={deckId} board={board} />
      </div>
    </main>
  );
}
