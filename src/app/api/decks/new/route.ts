import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const createdDeck = await prisma.deck.create({
      data: {
        name: res.name,
        description: res.description,
        format: res.format,
        primarySorting: res.primarySorting,
        secondarySorting: res.secondarySorting,
      },
    });

    const featuredCard = await prisma.featuredCard.create({
      data: {
        deckId: createdDeck.id,
        cardId: res.featuredCardId,
      },
    });

    return NextResponse.json({ createdDeck, featuredCard });
  } catch (error: any) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({
        error: "An error occurred",
        details: error ? error.message : "",
      })
    );
  }
}
