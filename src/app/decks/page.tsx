"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "../components/withQueryClientProvider";

import DeckFilter from "./DeckFilter";
import DeckList from "./DeckList";
import Loading from "../components/Loading";

import { getDecks } from "./queries";

const DecksPage = () => {
  const [search, setSearch] = useState("");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["decks", search],
    queryFn: () => getDecks(search),
    retry: 5,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="relative mt-[60px]">
      <DeckFilter data={data.data} search={search} setSearch={setSearch} />
      <DeckList data={data.data} />
    </div>
  );
};

export default withQueryClientProvider(DecksPage);
