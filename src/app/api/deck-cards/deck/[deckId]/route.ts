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

    const cardData = await prisma.deckCard.findMany({
      where: {
        deckId: deckId,
      },
      select: {
        id: true,
        quantity: true,
        isMain: true,
        isSide: true,
        card: {
          select: {
            id: true,
            name: true,
            setName: true,
            manaCost: true,
            cmc: true,
            typeLine: true,
            flavorText: true,
            colors: true,
            scryfallBorderCropUrl: true,
            scryfallArtCropUrl: true,
          },
        },
      },
      orderBy: {
        card: {
          name: "asc",
        },
      },
    });

    return NextResponse.json(cardData);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
