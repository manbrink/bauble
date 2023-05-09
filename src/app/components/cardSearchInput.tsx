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

    formik.setFieldValue("featuredCardId", card.id);

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
        className="border-white w-full rounded border px-3 py-2 text-gray-dark"
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
        <div className="absolute z-10 max-h-[500px] w-full overflow-y-auto bg-white-normal">
          {data.data.map((card: Card) => (
            <div
              key={card.id}
              className="duration-800 flex cursor-pointer items-center p-2 transition-colors hover:bg-gray-medium"
              onClick={() => handleCardClick(card)}
            >
              <div className="relative h-[140px] w-[105px] overflow-hidden">
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
