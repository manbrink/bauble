import { NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma";
import { auth } from "@clerk/nextjs";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { searchTerm: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const searchTerm = params.searchTerm;

    const data = await prisma.deck.findMany({
      where: {
        userId: userId,
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            format: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        format: true,
        featuredCardScryfallArtCropUrl: true,
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
