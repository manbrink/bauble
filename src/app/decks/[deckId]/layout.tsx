import DeckHeader from "./DeckHeader";

import { getDeckData } from "./queries";

export default async function DeckLayout({
  children,
  params: { deckId },
}: {
  children: React.ReactNode;
  params: {
    deckId: number;
  };
}) {
  const deckData = await getDeckData(deckId);

  return (
    <>
      <DeckHeader deckData={deckData} />

      {children}
    </>
  );
}
