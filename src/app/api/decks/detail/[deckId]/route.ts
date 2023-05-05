import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { deckId: string };
  }
) {
  try {
    const deckId = params.deckId;

    const deckData = await prisma.deck.findMany({
      where: {
        id: Number(deckId),
      },
      select: {
        id: true,
        name: true,
        description: true,
        format: true,
        groupBy: true,
        sortBy: true,
        featuredCardScryfallArtCropUrl: true,
      },
    });

    return NextResponse.json(deckData[0]);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
