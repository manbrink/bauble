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
    manaCost: cardObj.mana_cost || null,
    cmc: Math.floor(cardObj.cmc) || null, // Unglued can have cmc decimals...
    typeLine: cardObj.type_line || null,
    flavorText: cardObj.flavor_text || null,
    colors: cardObj.colors,
    scryfallId: cardObj.id,
    scryfallBorderCropUrl: cardObj.image_uris?.border_crop || null,
    scryfallArtCropUrl: cardObj.image_uris?.art_crop || null,
  };
}

async function saveCard(cardData) {
  return await prisma.card.create({ data: cardData });
}

async function importCards() {
  try {
    await prisma.card.deleteMany(); // Delete all existing cards

    const cardObjects = await readJsonFile(path.join(__dirname, "cards.json"));
    let counter = 0;

    for (const cardObj of cardObjects) {
      const cardData = extractCardData(cardObj);

      await saveCard(cardData);
      counter++;

      if (counter % 1000 === 0) {
        console.log(`Imported ${counter} of ${cardObjects.length} cards.`);
      }
    }

    console.log("Cards imported successfully");
  } catch (error) {
    console.error("Error importing cards", error);
  } finally {
    await prisma.$disconnect();
  }
}

importCards();
