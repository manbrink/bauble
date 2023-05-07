import DeckForm from "../../components/DeckForm";

export default function NewDeck() {
  const initialValues = {
    name: "",
    featuredCard: "",
    featuredCardScryfallArtCropUrl: "",
    description: "",
    format: "",
    groupBy: "typeLine",
    sortBy: "cmc",
  };

  return (
    <>
      <DeckForm initialValues={initialValues} editing={false} />
    </>
  );
}
