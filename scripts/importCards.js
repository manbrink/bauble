const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function readJsonFile(filePath) {
  const data = fs.readFileSync(path.resolve(filePath), "utf-8");
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

async function saveCard(cardData) {
  return await prisma.card.create({ data: cardData });
}

async function cardExists(scryfallId) {
  return (
    (await prisma.card.findUnique({ where: { scryfallId: scryfallId } })) !==
    null
  );
}

async function importCards() {
  try {
    const cardObjects = await readJsonFile(path.join(__dirname, "cards.json"));
    let newCardCount = 0;

    for (const cardObj of cardObjects) {
      if (cardObj.image_uris?.border_crop && cardObj.image_uris?.art_crop) {
        const cardData = extractCardData(cardObj);

        if (!(await cardExists(cardData.scryfallId))) {
          await saveCard(cardData);
          newCardCount++;
        }
      }
    }

    console.log(`${newCardCount} new cards imported successfully.`);
  } catch (error) {
    console.error("Error importing cards", error);
  } finally {
    await prisma.$disconnect();
  }
}

importCards();
