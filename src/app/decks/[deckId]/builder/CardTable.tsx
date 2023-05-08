import { DeckCard } from "../types";

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
        <table className="table-fixed w-full">
          <tbody>
            {cardData.map((deckCard: DeckCard) => (
              <tr key={deckCard.card.id}>
                <td className="truncate">{deckCard.card.name}</td>
                <td className="text-center">{deckCard.quantity}</td>
                <td className="text-center">
                  <button
                    onClick={() => {
                      console.log("Add");
                    }}
                  >
                    +
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => {
                      console.log("Remove");
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
