"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "./CardModal";

interface Props {
  cardData: Card[];
  name: string;
}

interface Card {
  quantity: number;
  card: {
    id: string;
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

const calculateCardStackHeight = (cardData: Card[]) => {
  const cardHeight = 275;
  const cardTopMargin = 30;

  return cardData.length * cardTopMargin + cardHeight;
};

export default function CardStack({ cardData, name }: Props) {
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
    <div className="card-stack m-auto w-[225px] p-4">
      {modalOpen && (
        <Modal onClose={closeModal}>
          <Image
            src={modalImageSrc}
            alt="Zoomed card"
            width={450}
            height={600}
            className="rounded"
          />
        </Modal>
      )}

      <h1 className="mb-1 text-center text-xl text-white-normal">{name}</h1>
      {cardData ? (
        <div
          className="relative"
          style={{ height: `${calculateCardStackHeight(cardData)}px` }}
        >
          {cardData.map((card: Card, index: number) => (
            <div
              key={card.card.id}
              className={`absolute transition-all duration-1000 hover:cursor-pointer ${
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
                placeholder="blur"
                blurDataURL={`${process.env.NEXT_PUBLIC_API_URL}/blur-placeholder.jpeg`}
                onClick={() => openModal(card.card.scryfallBorderCropUrl)}
                priority={false}
              />
              <div className="absolute left-0 top-0 -z-10 h-[273px] w-[193px] rounded bg-black bg-black"></div>
              <div className="absolute left-0 top-0 z-10 rounded bg-black px-2 py-1 text-white-normal opacity-70">
                {card.quantity}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-3xl text-white-normal">No cards found</div>
      )}
    </div>
  );
}
