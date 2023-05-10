import { NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma";

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
            producedMana: true,
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

export async function POST(
  request: Request,
  {
    params,
    body,
  }: {
    params: { deckId: string };
    body: {
      cardId: string;
      quantity: number;
      isMain: boolean;
      isSide: boolean;
    };
  }
) {
  try {
    const res = await request.json();

    const deckId = params.deckId;
    const cardId = res.cardId;
    const quantity = res.quantity;
    const isMain = res.isMain;
    const isSide = res.isSide;

    const deckCard = await prisma.deckCard.create({
      data: {
        quantity: quantity,
        isMain: isMain,
        isSide: isSide,
        deck: {
          connect: {
            id: deckId,
          },
        },
        card: {
          connect: {
            id: cardId,
          },
        },
      },
    });

    return NextResponse.json(deckCard);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
