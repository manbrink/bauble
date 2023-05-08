"use client";

import React from "react";
import Link from "next/link";

import { IconContext } from "react-icons";
import { TbCards } from "react-icons/tb";
import { BsVectorPen } from "react-icons/bs";
import { AiOutlinePieChart } from "react-icons/ai";
import { TiInfoLargeOutline } from "react-icons/ti";

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
          <div className="absolute left-0 bottom-0 grid grid-cols-4 mx-4 p-2">
            <div className="mr-2 pt-2 pr-2 pb-2">
              <Link href={`/decks/${deckId}/gallery`} title="View cards">
                <TbCards />
              </Link>
            </div>
            <div className="mr-2 pt-2 pr-2 pb-2">
              <Link href={`/decks/${deckId}/builder`} title="Deck builder">
                <BsVectorPen />
              </Link>
            </div>
            <div className="mr-2 pt-2 pr-2 pb-2">
              <Link href={`/decks/${deckId}/stats`} title="Deck statistics">
                <AiOutlinePieChart />
              </Link>
            </div>
            <div className="mr-2 pt-2 pr-2 pb-2">
              <Link
                href={`/decks/${deckId}/edit`}
                title="Edit general information"
              >
                <TiInfoLargeOutline />
              </Link>
            </div>
          </div>
        </IconContext.Provider>
      )}
    </>
  );
}
