"use client";

import DeckForm from "../../../components/DeckForm";

import { getDeckData } from "../queries";
import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "../../../components/withQueryClientProvider";

interface EditDeckProps {
  params: {
    deckId: string;
  };
}

const EditDeck = ({ params: { deckId } }: EditDeckProps) => {
  const {
    isLoading: isLoadingDeckData,
    isError: isErrorDeckData,
    data: deckData,
  } = useQuery({
    queryKey: ["deckData", deckId],
    queryFn: () => getDeckData(deckId),
    enabled: deckId !== "",
  });

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
};

export default withQueryClientProvider(EditDeck);
