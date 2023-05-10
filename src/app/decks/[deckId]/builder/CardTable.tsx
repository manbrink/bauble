"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import withQueryClientProvider from "../../../components/withQueryClientProvider";

import { DeckCard } from "../types";
import { updateDeckCard } from "../mutations";

import Button from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import { HiSwitchHorizontal } from "react-icons/hi";

interface CardTableProps {
  cardData: DeckCard[];
  isLoading: boolean;
}

interface DeckCardUpdateParams {
  deckCardId: string;
  quantity: number;
}

const filterCardData = (data: DeckCard[], board: string, filter: string) => {
  let filteredCardData = data;

  if (data && data.length > 0) {
    if (board === "main") {
      filteredCardData = data.filter((card: DeckCard) => card.isMain);
    } else {
      filteredCardData = data.filter((card: DeckCard) => card.isSide);
    }
  }

  if (filter !== "") {
    filteredCardData = filteredCardData.filter((card: DeckCard) =>
      card.card.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  return filteredCardData;
};

const CardTable = ({ cardData, isLoading }: CardTableProps) => {
  const [filter, setFilter] = useState("");
  const [board, setBoard] = useState("main");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: DeckCardUpdateParams) =>
      updateDeckCard(params.deckCardId, params.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });

  const filteredCardData = filterCardData(cardData, board, filter);

  return (
    <div className="text-white-normal">
      <div className="mb-4 flex items-center justify-center">
        <h1 className="cursor-pointer text-center text-xl">
          {board === "main" ? "Main board" : "Side board"}
        </h1>
        <HiSwitchHorizontal
          className="ml-2 cursor-pointer text-lg text-white-normal hover:text-white-bright"
          onClick={() => setBoard(board === "main" ? "side" : "main")}
        />
      </div>

      <input
        className="border-white mb-4 w-2/5 border-b bg-neutral-dark pr-4 pt-2 text-white-normal focus:outline-none"
        type="text"
        placeholder="filter..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {isLoading ? <Spinner /> : null}

      {!isLoading && filteredCardData.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-white-normal">No cards in {board} board</p>
        </div>
      ) : null}

      {!isLoading && filteredCardData.length > 0 ? (
        <>
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th className="w-2/5">Card Name</th>
                <th className="w-1/5">Quantity</th>
                <th className="w-1/5">Add</th>
                <th className="w-1/5">Remove</th>
              </tr>
            </thead>
          </table>

          <div className="max-h-[575px] overflow-scroll text-white-normal">
            <table className="w-full table-fixed">
              <tbody>
                {filteredCardData &&
                  filteredCardData.map((deckCard: DeckCard) => (
                    <tr className="hover:bg-neutral-darkest" key={deckCard.id}>
                      <td className="w-2/5 truncate">{deckCard.card.name}</td>
                      <td className="w-1/5 text-center">{deckCard.quantity}</td>
                      <td className="w-1/5 text-center">
                        <Button
                          type="submit"
                          className="h-[30px] w-[30px]"
                          text="+"
                          theme="light"
                          size="sm"
                          onClick={() =>
                            mutation.mutate({
                              deckCardId: deckCard.id,
                              quantity: deckCard.quantity + 1,
                            })
                          }
                        />
                      </td>
                      <td className="w-1/5 text-center">
                        <Button
                          type="submit"
                          className="h-[30px] w-[30px]"
                          text="-"
                          theme="light"
                          size="sm"
                          onClick={() =>
                            mutation.mutate({
                              deckCardId: deckCard.id,
                              quantity: deckCard.quantity - 1,
                            })
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default withQueryClientProvider(CardTable);