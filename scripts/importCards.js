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
    let newCardCount = 0;
    let cardDataArray = [];

    const existingCards = await prisma.card.findMany({
      select: { scryfallId: true },
    });
    const existingCardIds = new Set(existingCards.map((c) => c.scryfallId));

    for (const cardObj of cardObjects) {
      if (cardObj.image_uris?.border_crop && cardObj.image_uris?.art_crop) {
        const cardData = extractCardData(cardObj);

        if (!existingCardIds.has(cardData.scryfallId)) {
          cardDataArray.push(cardData);

          if (cardDataArray.length === 1000) {
            // batch size for batch processing
            await prisma.card.createMany({ data: cardDataArray });
            newCardCount += cardDataArray.length;
            console.log(`${newCardCount} new cards imported successfully.`);
            cardDataArray = [];
          }
        }
      }
    }

    if (cardDataArray.length > 0) {
      // insert any remaining cards
      await prisma.card.createMany({ data: cardDataArray });
      newCardCount += cardDataArray.length;
    }

    console.log(
      `Import complete: ${newCardCount} new cards imported successfully.`
    );
  } catch (error) {
    console.error("Error importing cards", error);
  } finally {
    await prisma.$disconnect();
  }
}

importCards();
