"use client";

import { useState } from "react";

import DeckFilter from "./DeckFilter";
import DeckList from "./DeckList";

export default function DecksPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="relative mt-[60px]">
      <DeckFilter search={search} setSearch={setSearch} />
      <DeckList search={search} />
    </div>
  );
}
