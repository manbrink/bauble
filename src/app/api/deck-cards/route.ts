import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function UPDATE(
  request: Request,
  {
    body,
  }: {
    body: { deckCardId: string; quantity: number };
  }
) {
  try {
    const deckCardId = body.deckCardId;

    const updatedDeckCard = await prisma.deckCard.update({
      where: {
        id: deckCardId,
      },
      data: {
        quantity: body.quantity,
      },
      select: {
        quantity: true,
      },
    });

    return NextResponse.json(updatedDeckCard);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
