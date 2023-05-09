"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import withQueryClientProvider from "../../../components/withQueryClientProvider";

import { DeckCard } from "../types";
import { updateDeckCard } from "../mutations";
import { getCardData } from "../queries";

import Button from "../../../components/Button";

interface CardTableProps {
  deckId: string;
  board: string;
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

const CardTable = ({ deckId, board }: CardTableProps) => {
  const [filter, setFilter] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["cards", deckId],
    queryFn: () => getCardData(deckId),
    enabled: deckId !== "",
  });

  const mutation = useMutation({
    mutationFn: (params: DeckCardUpdateParams) =>
      updateDeckCard(params.deckCardId, params.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });

  const filteredCardData = filterCardData(data, board, filter);

  return (
    <div className="text-white-normal">
      <h1 className="text-xl text-center mb-4">
        {board === "main" ? "Main board" : "Side board"}
      </h1>
      <input
        className="mb-4 w-2/5 bg-neutral-dark text-white-normal border-b border-white pt-2 pr-4 focus:outline-none"
        type="text"
        placeholder="filter..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="w-2/5">Card Name</th>
            <th className="w-1/5">Quantity</th>
            <th className="w-1/5">Add</th>
            <th className="w-1/5">Remove</th>
          </tr>
        </thead>
      </table>

      <div className="text-white-normal max-h-[500px] overflow-scroll">
        <table className="table-fixed w-full border-separate border-spacing-2">
          <tbody>
            {filteredCardData &&
              filteredCardData.map((deckCard: DeckCard) => (
                <tr key={deckCard.id}>
                  <td className="truncate w-2/5">{deckCard.card.name}</td>
                  <td className="text-center w-1/5">{deckCard.quantity}</td>
                  <td className="text-center w-1/5">
                    <Button
                      className="w-[30px] h-[30px]"
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
                  <td className="text-center w-1/5">
                    <Button
                      className="w-[30px] h-[30px]"
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
    </div>
  );
};

export default withQueryClientProvider(CardTable);
