import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
import { auth } from "@clerk/nextjs";

export async function PATCH(
  request: Request,
  {
    params,
    body,
  }: {
    params: { deckCardId: string };
    body: { quantity: number };
  }
) {
  try {
    const res = await request.json();

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const deckCardId = params.deckCardId;

    // Retrieve the existing deckCard with its associated deck
    const existingDeckCard = await prisma.deckCard.findUnique({
      where: {
        id: deckCardId,
      },
      include: {
        deck: true, // include the associated deck
      },
    });

    // If the deckCard does not exist or the deck's userId does not match the authenticated userId
    if (
      !existingDeckCard ||
      !existingDeckCard.deck ||
      existingDeckCard.deck.userId !== userId
    ) {
      return NextResponse.json(
        { error: "Not authorized to make this update" },
        { status: 401 }
      );
    }

    if (res.quantity <= 0) {
      await prisma.deckCard.delete({
        where: {
          id: deckCardId,
        },
      });
      return NextResponse.json({ message: "Deck card deleted" });
    } else {
      const updatedDeckCard = await prisma.deckCard.update({
        where: {
          id: deckCardId,
        },
        data: {
          quantity: res.quantity,
        },
        select: {
          quantity: true,
        },
      });

      return NextResponse.json(updatedDeckCard);
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
