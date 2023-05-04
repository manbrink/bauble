"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "./withQueryClientProvider";

import Image from "next/image";

interface Card {
  id: string;
  name: string;
  setName: string;
  scryfallBorderCropUrl: string;
  scryfallArtCropUrl: string;
}

interface Props {
  formik: any;
}

async function getData(searchTerm: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cards/${encodeURIComponent(
      searchTerm
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

const CardSearchInput = ({ formik }: Props) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInternalSearchTerm(formik.values.featuredCard);
    }, 300);

    return () => clearTimeout(timer);
  }, [formik.values.featuredCard]);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["cards", internalSearchTerm],
    queryFn: () => getData(internalSearchTerm),
    enabled: internalSearchTerm !== "",
  });

  const handleCardClick = (card: Card) => {
    formik.setFieldValue("featuredCard", `${card.name} (${card.setName})`);

    formik.setFieldValue(
      "featuredCardScryfallArtCropUrl",
      card.scryfallArtCropUrl
    );

    setShowResults(false);
  };

  const handleFeaturedCardChange = (e: any) => {
    formik.setFieldValue("featuredCardScryfallArtCropUrl", null); // Reset featuredCardScryfallArtCropUrl when featuredCard changes
    setShowResults(true);
    formik.handleChange(e);
  };

  return (
    <div className="relative">
      <input
        type="text"
        id="featuredCard"
        name="featuredCard"
        className="text-gray-dark w-full px-3 py-2 border border-white rounded"
        value={formik.values.featuredCard}
        onChange={handleFeaturedCardChange}
        onBlur={formik.handleBlur}
        placeholder="Search for cards"
      />
      {formik.touched.featuredCard && formik.errors.featuredCard ? (
        <div className="text-red">{formik.errors.featuredCard}</div>
      ) : null}
      {formik.touched.featuredCard &&
      formik.errors.featuredCardScryfallArtCropUrl ? (
        <div className="text-red">
          {formik.errors.featuredCardScryfallArtCropUrl}
        </div>
      ) : null}

      {data && showResults && (
        <div className="absolute z-10 bg-white w-full max-h-[500px] overflow-y-auto">
          {data.data.map((card: Card) => (
            <div
              key={card.id}
              className="p-2 cursor-pointer flex items-center hover:bg-gray-medium transition-colors duration-800"
              onClick={() => handleCardClick(card)}
            >
              <div className="relative w-[105px] h-[140px] overflow-hidden">
                <Image
                  src={card.scryfallBorderCropUrl}
                  alt={card.name}
                  fill={true}
                  sizes="(max-width: 105px) 100vw, (max-width: 105px) 50vw, 33vw"
                />
              </div>
              <div className="ml-2">
                <div>{card.name}</div>
                <div className="text-sm opacity-70">{card.setName}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withQueryClientProvider(CardSearchInput);
