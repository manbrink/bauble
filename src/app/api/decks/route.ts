import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const findManyOptions = {
      select: {
        id: true,
        name: true,
        description: true,
        format: true,
        featuredCard: {
          select: {
            card: {
              select: {
                scryfallArtCropUrl: true,
              },
            },
          },
        },
      },
    };

    const data = await prisma.deck.findMany(findManyOptions);

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
