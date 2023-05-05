"use client";

import React from "react";
import Button from "../../components/Button";
import Link from "next/link";

import { IconContext } from "react-icons";
import { TbCards } from "react-icons/tb";
import { BsVectorPen } from "react-icons/bs";

interface Props {
  deckId: number;
}

const DeckActions = ({ deckId }: Props) => {
  return (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <div className="absolute left-0 bottom-0 grid grid-cols-2 p-4">
        <Link href={`/decks/${deckId}/builder`} title="Deck builder">
          <div className="p-2">
            <Button text={<TbCards />} theme="none" />
          </div>
        </Link>
        <Link href={`/decks/${deckId}/edit`} title="Edit general information">
          <div className="p-2">
            <Button text={<BsVectorPen />} theme="none" />
          </div>
        </Link>
      </div>
    </IconContext.Provider>
  );
};

export default DeckActions;
