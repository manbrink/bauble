"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

import { DeckCard } from "../types";

interface ManaCurveProps {
  cardData: DeckCard[];
}

interface chartData {
  name: string;
  value: number;
}

const COLORS = {
  U: "#0080ff",
  B: "#000000",
  R: "#ff0000",
  G: "#008000",
  W: "#ffffff",
  X: "#808080",
  C: "#808080",
};

const prepareDataCardCosts = (cardData: DeckCard[]): chartData[] => {
  const data: chartData[] = [];

  cardData.forEach((deckCard) => {
    const manaCostLetters = deckCard.card.manaCost.match(/[A-Z]/g);
    if (manaCostLetters) {
      manaCostLetters.forEach((letter) => {
        const existingData = data.find((item) => item.name === letter);
        if (existingData) {
          existingData.value += 1;
        } else {
          data.push({ name: letter, value: 1 });
        }
      });
    }
  });

  return data;
};

const prepareDataLandMana = (cardData: DeckCard[]): chartData[] => {
  const data: chartData[] = [];

  cardData.forEach((deckCard) => {
    const manaCostLetters = deckCard.card.producedMana;
    if (manaCostLetters) {
      manaCostLetters.forEach((letter) => {
        const existingData = data.find((item) => item.name === letter);
        if (existingData) {
          existingData.value += 1;
        } else {
          data.push({ name: letter, value: 1 });
        }
      });
    }
  });

  return data;
};

export default function ManaProduction({ cardData }: ManaCurveProps) {
  const cardCostsData = prepareDataCardCosts(cardData);
  const landManaData = prepareDataLandMana(cardData);

  return (
    <div className="mx-4 mb-8 justify-self-center text-white-normal">
      <div className="text-center text-xl">Mana Production</div>
      <div className="text-md text-center">
        Card Costs (Outer) / Land Mana (Inner)
      </div>
      {cardCostsData &&
        cardCostsData.length > 0 &&
        landManaData &&
        landManaData.length > 0 && (
          <PieChart width={300} height={300}>
            <Tooltip />

            <Pie
              data={landManaData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
            >
              {landManaData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as keyof typeof COLORS]}
                />
              ))}
            </Pie>

            <Pie
              data={cardCostsData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label
            >
              {cardCostsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as keyof typeof COLORS]}
                />
              ))}
            </Pie>
          </PieChart>
        )}
    </div>
  );
}
