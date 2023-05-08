import { DeckCard } from "../types";
import { updateDeckCard } from "../mutations";

import Button from "../../../components/Button";

interface CardTableProps {
  cardData: DeckCard[];
  setBoard: (board: string) => void;
}

export default function CardTable({ cardData, setBoard }: CardTableProps) {
  return (
    <div className="text-white-normal">
      <table className="table-fixed w-full">
        <caption className="caption-top">Cards</caption>
        <thead>
          <tr>
            <th>Card Name</th>
            <th>Quantity</th>
            <th>Add</th>
            <th>Remove</th>
          </tr>
        </thead>
      </table>

      <div className="text-white-normal max-h-[500px] overflow-scroll">
        <table className="table-fixed w-full border-separate border-spacing-2">
          <tbody>
            {cardData.map((deckCard: DeckCard) => (
              <tr key={deckCard.id}>
                <td className="truncate">{deckCard.card.name}</td>
                <td className="text-center">{deckCard.quantity}</td>
                <td className="text-center">
                  <Button
                    className="w-[30px] h-[30px]"
                    text="+"
                    theme="light"
                    size="sm"
                    onClick={() =>
                      updateDeckCard(deckCard.id, deckCard.quantity + 1)
                    }
                  />
                </td>
                <td className="text-center">
                  <Button
                    className="w-[30px] h-[30px]"
                    text="-"
                    theme="light"
                    size="sm"
                    onClick={() =>
                      updateDeckCard(deckCard.id, deckCard.quantity - 1)
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
}
