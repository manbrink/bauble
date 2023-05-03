import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { deckId: number };
  }
) {
  try {
    const deckId = params.deckId;

    const data = await prisma.deck.findMany({
      where: {
        id: deckId,
      },
      select: {
        name: true,
        description: true,
        format: true,
        primarySorting: true,
        secondarySorting: true,
        featuredCard: {
          select: {
            card: {
              select: {
                scryfallArtCropUrl: true,
              },
            },
          },
        },
        deckCards: {
          select: {
            quantity: true,
            card: {
              select: {
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
        },
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
