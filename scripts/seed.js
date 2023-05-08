const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const commanders = [
  [
    "Gorion, Wise Mentor",
    "https://cards.scryfall.io/art_crop/front/0/0/001c648a-db66-47f3-8fee-3658b9e76ac2.jpg?1674137521",
  ],
  [
    "Farid, Enterprising Salvager",
    "https://cards.scryfall.io/art_crop/front/0/0/003367c7-6cb8-4451-8349-76ce5d21e367.jpg?1673300073",
  ],
  [
    "Izoni, Thousand-Eyed",
    "https://cards.scryfall.io/art_crop/front/0/0/003c6e4d-16f4-4ce8-9df2-a59e736b52cd.jpg?1541005763",
  ],
  [
    "Celestial Kirin",
    "https://cards.scryfall.io/art_crop/front/0/0/003e99a0-2caa-407b-be40-92ec17836eb3.jpg?1562492050",
  ],
  [
    "Hogaak, Arisen Necropolis",
    "https://cards.scryfall.io/art_crop/front/0/0/0049e68d-0caf-474f-9523-dad343f1250a.jpg?1570653053",
  ],
  [
    "Titania, Nature's Force",
    "https://cards.scryfall.io/art_crop/front/0/0/0073096e-cc3b-499a-87d6-d1692fffe7a9.jpg?1674344223",
  ],
  [
    "Gutmorn, Pactbound Servant",
    "https://cards.scryfall.io/art_crop/front/0/0/0083a99d-92a1-4a31-b4d4-0dbb06057b48.jpg?1680465446",
  ],
  [
    "Lady Zhurong, Warrior Queen",
    "https://cards.scryfall.io/art_crop/front/0/0/009661e7-c704-43a1-82e3-7da0b609844e.jpg?1562255446",
  ],
  [
    "Nikara, Lair Scavenger",
    "https://cards.scryfall.io/art_crop/front/0/0/00b9ac91-51e4-4653-ac2a-da166a894f2a.jpg?1591234210",
  ],
  [
    "Ghalta, Primal Hunger",
    "https://cards.scryfall.io/art_crop/front/0/1/0104b5b3-9376-4ad7-9a77-3e564e9c42e6.jpg?1555040636",
  ],
  [
    "Malfegor",
    "https://cards.scryfall.io/art_crop/front/0/1/010a4b07-c2d5-433e-9898-6e148104e9e0.jpg?1562845263",
  ],
  [
    "Rosnakht, Heir of Rohgahh",
    "https://cards.scryfall.io/art_crop/front/0/1/013e33d4-7d08-4773-a570-469ae3cf92f2.jpg?1673304869",
  ],
  [
    "Grand Arbiter Augustin IV",
    "https://cards.scryfall.io/art_crop/front/0/1/0143eb00-b054-4741-8423-66eed0362a30.jpg?1674097437",
  ],
  [
    "Jor Kadeen, First Goldwarden",
    "https://cards.scryfall.io/art_crop/front/0/1/01502e03-4cd6-40ef-b8fe-93e76e7ed54b.jpg?1682536826",
  ],
  [
    "Satsuki, the Living Lore",
    "https://cards.scryfall.io/art_crop/front/0/1/0152575b-31b0-4142-9cc2-b87a81bd51a8.jpg?1654568597",
  ],
];

async function main() {
  const allCardIds = await prisma.card.findMany({
    select: {
      id: true,
    },
  });

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  for (let i = 0; i < 15; i++) {
    const deck = await prisma.deck.create({
      data: {
        name: commanders[i][0],
        description: "This is a deck description.",
        format: "Commander",
        groupBy: "typeLine",
        sortBy: "cmc",
        featuredCard: commanders[i][0],
        featuredCardScryfallArtCropUrl: commanders[i][1],
      },
    });

    const shuffledCardIds = shuffle([...allCardIds]);

    const deckCards = shuffledCardIds.slice(0, 100).map((card) => ({
      deckId: deck.id,
      cardId: card.id,
      quantity: 1,
      isMain: true,
      isSide: false,
    }));

    await prisma.deckCard.createMany({
      data: deckCards,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
