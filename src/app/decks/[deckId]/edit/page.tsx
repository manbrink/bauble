import DeckForm from "../../../components/DeckForm";

import { getDeckData } from "../queries";

interface EditDeckProps {
  params: {
    deckId: number;
  };
}

export default async function EditDeck({ params: { deckId } }: EditDeckProps) {
  const deckData = await getDeckData(deckId);

  const initialValues = {
    deckId: deckData.id,
    name: deckData.name,
    featuredCard: deckData.featuredCard,
    featuredCardScryfallArtCropUrl: deckData.featuredCardScryfallArtCropUrl,
    description: deckData.description,
    format: deckData.format,
    groupBy: deckData.groupBy,
    sortBy: deckData.sortBy,
  };

  return (
    <>
      <DeckForm initialValues={initialValues} editing={true} />
    </>
  );
}
