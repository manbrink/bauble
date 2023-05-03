"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "../components/withQueryClientProvider";

interface Deck {
  id: number;
  name: string;
  description: string;
  format: string;
  featuredCard: string;
}

async function getData(searchTerm: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/decks/${encodeURIComponent(
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

const Decks = () => {
  const [search, setSearch] = useState("");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["decks", search],
    queryFn: () => getData(search),
    enabled: search !== "",
  });

  if (data) {
    console.log(data);
  }

  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-48"></div>
      <div className="relative">
        <nav className="p-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-md mx-auto">
                <input
                  type="text"
                  className="w-full bg-neutral-dark text-white border-b border-white pl-10 py-2 pr-4 focus:outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="absolute top-1/2 left-3 transform -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white font-bold py-2 px-4 rounded opacity-80 hover:opacity-100 transition-opacity duration-1000"
                >
                  Register
                </a>
                <a
                  href="#"
                  className="text-white font-bold py-2 px-4 rounded opacity-80 hover:opacity-100 transition-opacity duration-1000"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex flex-col items-center justify-between max-h-screen p-24"></main>
      </div>
    </>
  );
};

export default withQueryClientProvider(Decks);
