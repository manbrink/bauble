import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../../prisma/prisma";
import { auth } from "@clerk/nextjs";

export async function GET(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({
          error: "You must be logged in to create a deck",
        })
      );
    }

    const findManyOptions = {
      select: {
        id: true,
        name: true,
        description: true,
        format: true,
        featuredCardScryfallArtCropUrl: true,
      },
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
    };

    const data = await prisma.deck.findMany(findManyOptions);

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
