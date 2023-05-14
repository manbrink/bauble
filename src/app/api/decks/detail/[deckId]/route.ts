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

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const deckId = params.deckId;

    const deckData = await prisma.deck.findMany({
      where: {
        id: deckId,
        // userId: userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        format: true,
        groupBy: true,
        sortBy: true,
        featuredCard: true,
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
