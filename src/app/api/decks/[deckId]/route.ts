import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../../prisma/prisma";
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
    const deckId = params.deckId;

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

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

    return NextResponse.json(existingDeck);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const res = await request.json();

    const existingDeck = await prisma.deck.findUnique({
      where: {
        id: res.deckId,
      },
    });

    if (!existingDeck || existingDeck.userId !== userId) {
      return NextResponse.json(
        { error: "Not authorized to update this deck" },
        { status: 401 }
      );
    }

    const updatedDeck = await prisma.deck.update({
      where: {
        id: res.deckId,
      },
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

    revalidatePath(`/decks/${res.deckId}`);

    return NextResponse.json({ updatedDeck });
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

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { deckId: string };
  }
) {
  try {
    const { userId } = auth();
    const deckId = params.deckId;

    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const existingDeck = await prisma.deck.findUnique({
      where: {
        id: deckId,
      },
    });

    if (!existingDeck || existingDeck.userId !== userId) {
      return NextResponse.json(
        { error: "Not authorized to delete this deck" },
        { status: 401 }
      );
    }

    const deletedDeck = await prisma.deck.delete({
      where: {
        id: deckId,
      },
    });

    revalidatePath(`/decks`);

    return NextResponse.json({ deletedDeck });
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
