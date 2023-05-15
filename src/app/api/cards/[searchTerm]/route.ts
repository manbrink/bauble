import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
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
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
