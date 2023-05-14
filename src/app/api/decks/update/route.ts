import { NextResponse } from "next/server";
import { unstable_revalidateTag, unstable_revalidatePath } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const updatedDeck = await prisma.deck.update({
      where: {
        id: res.deckId,
      },
      data: {
        name: res.name,
        description: res.description,
        format: res.format,
        groupBy: res.groupBy,
        sortBy: res.sortBy,
        featuredCard: res.featuredCard,
        featuredCardScryfallArtCropUrl: res.featuredCardScryfallArtCropUrl,
      },
    });

    // unstable_revalidateTag("cards");
    // unstable_revalidateTag("deck");
    unstable_revalidatePath(`/decks/${res.deckId}`);

    return NextResponse.json({ updatedDeck });
  } catch (error: any) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({
        error: "An error occurred",
        details: error ? error.message : "",
      })
    );
  } finally {
    await prisma.$disconnect();
  }
}
