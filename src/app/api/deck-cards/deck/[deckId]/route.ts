import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";
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

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const deckId = params.deckId;

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
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const res = await request.json();

    const deckId = params.deckId;
    const cardId = res.cardId;
    const quantity = res.quantity;
    const isMain = res.isMain;
    const isSide = res.isSide;

    // Find deck and ensure it belongs to the authenticated user
    const existingDeck = await prisma.deck.findUnique({
      where: {
        id: deckId,
      },
    });

    if (!existingDeck || existingDeck.userId !== userId) {
      return NextResponse.json(
        { error: "Not authorized to add card to this deck" },
        { status: 401 }
      );
    }

    // check that deck does not have 250 deck cards
    const deckCardCount = await prisma.deckCard.count({
      where: {
        deckId: deckId,
      },
    });

    if (deckCardCount >= 250) {
      return NextResponse.json(
        { error: "Deck cannot have more than 250 cards" },
        { status: 400 }
      );
    }

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
