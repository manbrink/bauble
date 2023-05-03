"use client";

import { useState } from "react";

import NavBar from "../components/navBar";
import DeckFilter from "./DeckFilter";
import DeckList from "./DeckList";

export default function DecksPage() {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-48"></div>
      <div className="relative">
        <NavBar />
        <DeckFilter search={search} setSearch={setSearch} />
        <DeckList search={search} />
      </div>
    </>
  );
}
