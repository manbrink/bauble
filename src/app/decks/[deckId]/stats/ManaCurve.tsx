"use client";

import { DeckCard } from "../types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface ManaCurveProps {
  cardData: DeckCard[];
}

interface chartData {
  cmc: number;
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

type ChartDataKey = keyof chartData;

const incrementTypeLineCount = (dataItem: chartData, typeLine: string) => {
  const key = typeLine.toLowerCase() as ChartDataKey;
  dataItem[key] = (dataItem[key] || 0) + 1;
};

const findChartDataByCmc = (data: chartData[], cmc: number) => {
  return data.find((item) => item.cmc === cmc);
};

const createNewChartData = (cmc: number, typeLine: string): chartData => {
  const newChartData: chartData = { cmc };
  incrementTypeLineCount(newChartData, typeLine);
  return newChartData;
};

const prepareData = (cardData: DeckCard[]): chartData[] => {
  const data: chartData[] = [];

  cardData.forEach((deckCard) => {
    const { cmc } = deckCard.card;
    const typeLine =
      typeLineCategories.find((category) =>
        deckCard.card.typeLine.includes(category)
      ) || "Other";

    let existingData = findChartDataByCmc(data, cmc);

    if (existingData) {
      incrementTypeLineCount(existingData, typeLine);
    } else {
      existingData = createNewChartData(cmc, typeLine);
      data.push(existingData);
    }
  });

  data.sort((a, b) => a.cmc - b.cmc);

  return data;
};

export default function ManaCurve({ cardData }: ManaCurveProps) {
  const data = prepareData(cardData);

  return (
    <div className="mx-4 mb-10 justify-self-center text-white-normal">
      <div className="text-center text-xl">Mana Curve</div>
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
