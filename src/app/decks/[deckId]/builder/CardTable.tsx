"use client";

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

const CardTable = ({ deckId, board }: CardTableProps) => {
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

  let filteredCardData = [];
  if (data && data.length > 0) {
    if (board === "main") {
      filteredCardData = data.filter((card: DeckCard) => card.isMain);
    } else {
      filteredCardData = data.filter((card: DeckCard) => card.isSide);
    }
  }

  return (
    <div className="text-white-normal">
      <table className="table-fixed w-full">
        <caption className="caption-top mb-4">Cards</caption>
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
