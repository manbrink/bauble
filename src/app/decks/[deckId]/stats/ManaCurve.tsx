"use client";

import Spinner from "../../../components/Spinner";
import { DeckCard } from "../types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface ManaCurveProps {
  cardData: DeckCard[];
}

interface chartData {
  cmc: number;
  creature: number;
  instant: number;
  sorcery: number;
  enchantment: number;
  artifact: number;
  planeswalker: number;
  land: number;
}

const typeLineCategories = [
  "Land",
  "Creature",
  "Planeswalker",
  "Instant",
  "Sorcery",
  "Enchantment",
  "Artifact",
];

const prepareData = (cardData: DeckCard[]) => {
  const data: chartData[] = [];

  cardData.forEach((deckCard) => {
    let { cmc } = deckCard.card;

    const typeLine =
      typeLineCategories.find((category) =>
        deckCard.card.typeLine.includes(category)
      ) || "Other";

    const existingData = data.find((data) => data.cmc === cmc);

    if (existingData) {
      existingData[typeLine.toLowerCase() as keyof typeof existingData]++;
    }

    if (!existingData) {
      const newChartData: chartData = {
        cmc: cmc,
        creature: 0,
        instant: 0,
        sorcery: 0,
        enchantment: 0,
        artifact: 0,
        planeswalker: 0,
        land: 0,
      };

      newChartData[typeLine.toLowerCase() as keyof typeof newChartData]++;

      data.push(newChartData);
    }
  });

  data.sort((a, b) => a.cmc - b.cmc);

  return data;
};

export default function ManaCurve({ cardData }: ManaCurveProps) {
  const data = prepareData(cardData);

  return (
    <div className="mx-4 mb-4 w-1/2 justify-self-center text-white-normal">
      <div className="text-center text-xl">Mana Curve</div>

      {!cardData && <Spinner />}

      {data && data.length > 0 && (
        <BarChart
          className=""
          width={600}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="cmc" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="artifact" stackId="a" fill="#78350F" />
          <Bar dataKey="creature" stackId="a" fill="#881337" />
          <Bar dataKey="enchantment" stackId="a" fill="#d1d5db" />
          <Bar dataKey="instant" stackId="a" fill="#1D4ED8" />
          <Bar dataKey="land" stackId="a" fill="#14B8A6" />
          <Bar dataKey="planeswalker" stackId="a" fill="#82139d" />
          <Bar dataKey="sorcery" stackId="a" fill="#06B6D4" />
        </BarChart>
      )}
    </div>
  );
}
