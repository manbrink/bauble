"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "./CardModal";

interface Props {
  cardData: Card[];
  name: string;
}

interface Card {
  quantity: number;
  card: {
    name: string;
    setName: string;
    manaCost: string;
    cmc: number;
    typeLine: string;
    flavorText: string;
    colors: string[];
    scryfallBorderCropUrl: string;
    scryfallArtCropUrl: string;
  };
}

export default function CardStack({
  cardData,
  name,
}: {
  cardData: Card[];
  name: string;
}) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>("");

  const openModal = (src: string) => {
    setModalImageSrc(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="card-stack w-[225px] p-4 mx-1">
      {modalOpen && (
        <Modal onClose={closeModal}>
          <Image
            src={modalImageSrc}
            alt="Zoomed card"
            width={450}
            height={600}
          />
        </Modal>
      )}

      <h1 className="text-white-normal text-xl mb-1">{name}</h1>
      {cardData ? (
        <div className="relative">
          {cardData.map((card: Card, index: number) => (
            <div
              key={card.card.name}
              className={`absolute hover:cursor-pointer transition-all duration-1000 ${
                hoveredCard !== null && index > hoveredCard
                  ? "translate-y-full"
                  : ""
              }`}
              style={{ marginTop: index * 30, zIndex: cardData.length + index }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Image
                src={card.card.scryfallBorderCropUrl}
                alt={card.card.name}
                width={225}
                height={300}
                className="rounded-t"
                onClick={() => openModal(card.card.scryfallBorderCropUrl)}
              />
              <div className="absolute top-0 left-0 bg-black text-white-normal px-2 py-1 rounded opacity-70">
                {card.quantity}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white-normal text-3xl">No cards found</div>
      )}
    </div>
  );
}
