import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../../prisma/prisma";
import { auth } from "@clerk/nextjs";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { deckId: string };
  }
) {
  try {
    const { userId } = auth();
    const deckId = params.deckId;

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const existingDeck = await prisma.deck.findUnique({
      where: {
        id: deckId,
      },
    });

    if (!existingDeck || existingDeck.userId !== userId) {
      return NextResponse.json(
        { error: "Not authorized to delete this deck" },
        { status: 401 }
      );
    }

    const deletedDeck = await prisma.deck.delete({
      where: {
        id: deckId,
      },
    });

    revalidatePath(`/decks`);

    return NextResponse.json({ deletedDeck });
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
