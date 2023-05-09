import DeckForm from "../../components/DeckForm";

export default function NewDeck() {
  const initialValues = {
    deckId: null,
    name: "",
    featuredCard: "",
    featuredCardScryfallArtCropUrl: "",
    description: "",
    format: "",
    groupBy: "typeLine",
    sortBy: "cmc",
  };

  return (
    <main className="mx-4 mt-[60px]">
      <DeckForm initialValues={initialValues} editing={false} />
    </main>
  );
}
