"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import withQueryClientProvider from "../../../components/withQueryClientProvider";

import CardSearchInput from "@/app/components/cardSearchInput";
import Button from "../../../components/Button";
import Toast from "./Toast";

import { createDeckCard } from "../mutations";

interface AddCardProps {
  deckId: string;
}

interface DeckCardCreateParams {
  deckId: string;
  cardId: string;
  quantity: number;
  isMain: boolean;
  isSide: boolean;
}

const AddCard = ({ deckId }: AddCardProps) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [showToast, setShowToast] = useState(false);

  const formik = useFormik({
    initialValues: {
      featuredCard: "",
      featuredCardScryfallArtCropUrl: "",
      featuredCardId: "",
      board: "main",
      quantity: 1,
    },
    validationSchema: Yup.object({
      featuredCard: Yup.string().required("Required"),
      featuredCardScryfallArtCropUrl: Yup.string().required(
        "Please choose a valid card"
      ),
      quantity: Yup.number()
        .min(1, "Must be at least 1")
        .max(100, "Must be 100 or less"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        values = { ...values, ...{ deckId: deckId } };

        mutation.mutate({
          deckId: deckId,
          cardId: values.featuredCardId,
          quantity: values.quantity,
          isMain: values.board === "main",
          isSide: values.board === "side",
        });

        resetForm();

        setToastMessage("Card Added");
        setToastType("success");
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: DeckCardCreateParams) =>
      createDeckCard(
        params.deckId,
        params.cardId,
        params.quantity,
        params.isMain,
        params.isSide
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });

  return (
    <div className="mb-4 text-white-normal">
      {showToast && <Toast message={toastMessage} type={toastType} />}
      <h1 className="mb-4 text-center text-xl">Add Card</h1>
      <form className="w-full max-w-lg" onSubmit={formik.handleSubmit}>
        <div className="mb-2">
          <label
            htmlFor="featured-card"
            className="mb-2 block text-sm text-white-normal"
          >
            Card
          </label>
          <CardSearchInput formik={formik} />
        </div>

        <div className="mb-2">
          <label
            htmlFor="quantity"
            className="mb-2 block text-sm text-white-normal"
          >
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            className="border-white rounded border px-3 py-2 text-gray-dark"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="text-red">{formik.errors.quantity}</div>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="board"
            className="mb-2 block text-sm text-white-normal"
          >
            Board
          </label>
          <select
            id="board"
            name="board"
            className="border-white rounded border px-3 py-2 text-gray-dark"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.board}
          >
            <option value="main">Main</option>
            <option value="sideboard">Sideboard</option>
          </select>
        </div>

        <Button type="submit" className="" text="Add" theme="light" size="md" />
      </form>
    </div>
  );
};

export default withQueryClientProvider(AddCard);
