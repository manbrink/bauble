import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "../../../../prisma/prisma";

export async function GET(request: Request) {
  try {
    const findManyOptions = {
      select: {
        id: true,
        name: true,
        description: true,
        format: true,
        featuredCardScryfallArtCropUrl: true,
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
