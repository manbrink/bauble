"use client";

import React from "react";
import Link from "next/link";

import { IconContext } from "react-icons";
import { TbCards } from "react-icons/tb";
import { BsVectorPen } from "react-icons/bs";
import { AiOutlinePieChart } from "react-icons/ai";
import { TiInfoLargeOutline } from "react-icons/ti";

interface Props {
  deckId: string;
}

export default function DeckActions({ deckId }: Props) {
  return (
    <>
      {deckId && (
        <IconContext.Provider
          value={{ size: "1.5em", className: "text-white-normal" }}
        >
          <div className="absolute bottom-0 left-0 mx-4 grid grid-cols-4 p-2">
            <div className="mr-2 pb-2 pr-2 pt-2">
              <Link
                data-cy="galleryLink"
                href={`/decks/${deckId}/gallery`}
                title="View cards"
              >
                <TbCards />
              </Link>
            </div>
            <div className="mr-2 pb-2 pr-2 pt-2">
              <Link
                data-cy="deckBuilderLink"
                href={`/decks/${deckId}/builder`}
                title="Deck builder"
              >
                <BsVectorPen />
              </Link>
            </div>
            <div className="mr-2 pb-2 pr-2 pt-2">
              <Link
                data-cy="deckStatsLink"
                href={`/decks/${deckId}/stats`}
                title="Deck statistics"
              >
                <AiOutlinePieChart />
              </Link>
            </div>
            <div className="mr-2 pb-2 pr-2 pt-2">
              <Link
                data-cy="deckInfoLink"
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
