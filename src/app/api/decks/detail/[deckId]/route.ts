import { NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma";
import { auth } from "@clerk/nextjs";

export async function GET(
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
        { error: "Not authorized to view this deck" },
        { status: 401 }
      );
    }

    return NextResponse.json(existingDeck);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
