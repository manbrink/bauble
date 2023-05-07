"use client";

import React from "react";
import Link from "next/link";

import { IconContext } from "react-icons";
import { TbCards } from "react-icons/tb";
import { BsVectorPen } from "react-icons/bs";
import { AiOutlinePieChart } from "react-icons/ai";

interface Props {
  deckId: number;
}

export default function DeckActions({ deckId }: Props) {
  return (
    <>
      {deckId && (
        <IconContext.Provider
          value={{ size: "1.5em", className: "text-white-normal" }}
        >
          <div className="absolute left-0 bottom-0 grid grid-cols-3 p-4">
            <div className="mr-2 pt-2 pr-2 pb-2">
              <Link href={`/decks/${deckId}/builder`} title="Deck builder">
                <TbCards />
              </Link>
            </div>
            <div className="mr-2 pt-2 pr-2 pb-2">
              <Link
                href={`/decks/${deckId}/edit`}
                title="Edit general information"
              >
                <BsVectorPen />
              </Link>
            </div>
            <div className="mr-2 pt-2 pr-2 pb-2">
              <Link
                href={`/decks/${deckId}/stats`}
                title="View deck statistics"
              >
                <AiOutlinePieChart />
              </Link>
            </div>
          </div>
        </IconContext.Provider>
      )}
    </>
  );
}
