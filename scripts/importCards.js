const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL, // uses connection pooling
    },
  },
});

async function readJsonFile(filePath) {
  const data = await fs.promises.readFile(path.resolve(filePath), "utf-8");
  return JSON.parse(data);
}

function extractCardData(cardObj) {
  return {
    name: cardObj.name,
    setName: cardObj.set_name,
    manaCost: cardObj.mana_cost || "",
    cmc: cardObj.cmc ? Math.floor(cardObj.cmc) : 0, // cmc can be decimal for Unglued
    typeLine: cardObj.type_line || null,
    flavorText: cardObj.flavor_text || null,
    colors: cardObj.colors,
    scryfallId: cardObj.id,
    scryfallBorderCropUrl: cardObj.image_uris?.border_crop,
    scryfallArtCropUrl: cardObj.image_uris?.art_crop,
    producedMana: cardObj.produced_mana || [],
  };
}

async function importCards() {
  try {
    const cardObjects = await readJsonFile(path.join(__dirname, "cards.json"));

    const existingCardIds = new Set(
      await prisma.card.findMany({
        select: { scryfallId: true },
      })
    );

    const newCards = cardObjects.filter((cardObj) => {
      return (
        !existingCardIds.has(cardObj.scryfallId) &&
        cardObj.image_uris?.border_crop &&
        cardObj.image_uris?.art_crop
      );
    });

    let cardDataArray = [];
    for (const newCard of newCards) {
      cardDataArray.push(extractCardData(newCard));

      if (cardDataArray.length === 1000) {
        await prisma.card.createMany({ data: cardDataArray });
        cardDataArray = [];
      }
    }

    if (cardDataArray.length > 0) {
      await prisma.card.createMany({ data: cardDataArray });
    }

    console.log(
      `Import complete: ${newCards.length} new cards imported successfully.`
    );
  } catch (error) {
    console.error("Error importing cards", error);
  } finally {
    await prisma.$disconnect();
  }
}

importCards();
