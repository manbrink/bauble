import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const createdDeck = await prisma.deck.create({
      data: {
        name: res.name,
        description: res.description,
        format: res.format,
        groupBy: res.groupBy,
        sortBy: res.sortBy,
        featuredCard: res.featuredCard,
        featuredCardScryfallArtCropUrl: res.featuredCardScryfallArtCropUrl,
      },
    });

    return NextResponse.json({ createdDeck });
  } catch (error: any) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({
        error: "An error occurred",
        details: error ? error.message : "",
      })
    );
  } finally {
    await prisma.$disconnect();
  }
}
