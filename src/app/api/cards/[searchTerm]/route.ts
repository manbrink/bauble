import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { searchTerm: string };
  }
) {
  try {
    const searchTerm = params.searchTerm;

    const data = await prisma.card.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        setName: true,
        scryfallBorderCropUrl: true,
        scryfallArtCropUrl: true,
      },
      take: 10,
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
