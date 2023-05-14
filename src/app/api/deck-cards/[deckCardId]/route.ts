import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

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

    const deckCardId = params.deckCardId;

    if (res.quantity <= 0) {
      await prisma.deckCard.delete({
        where: {
          id: deckCardId,
        },
      });
      return NextResponse.json({ message: "DeckCard deleted" });
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
