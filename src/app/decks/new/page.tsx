"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import CardSearchInput from "@/app/components/cardSearchInput";

const DeckForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      featuredCard: "",
      featuredCardScryfallArtCropUrl: "",
      description: "",
      format: "",
      primarySorting: "type",
      secondarySorting: "converted-cost",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      featuredCard: Yup.string().required("Required"),
      featuredCardScryfallArtCropUrl: Yup.string().required(
        "Please choose a valid card"
      ),
      description: Yup.string().length(1000, "Must be 1000 characters or less"),
      format: Yup.string().required("Required"),
      primarySorting: Yup.string().required("Required"),
      secondarySorting: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/decks/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form data");
        }

        const responseData = await response.json();

        router.push("/decks");

        console.log("Form submitted successfully:", responseData);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <form className="w-full max-w-lg" onSubmit={formik.handleSubmit}>
        <h1 className="text-white text-2xl mb-4">Deck Information</h1>
        <h1 className="text-white text-1xl mb-4 opacity-80">
          Enter some general deck information.
        </h1>
        <div className="mb-4">
          <label htmlFor="name" className="text-white block text-sm mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="text-gray-dark bg-white w-full px-3 py-2 border border-white rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="featured-card"
            className="text-white block text-sm mb-2"
          >
            Featured Card
          </label>
          <CardSearchInput formik={formik} />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="text-white block text-sm mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="text-gray-dark bg-white w-full px-3 py-2 border border-white rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red">{formik.errors.description}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="format" className="text-white block text-sm mb-2">
            Format
          </label>
          <select
            id="format"
            className="text-gray-dark bg-white w-full px-3 py-2 border border-white rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.format}
          >
            <option value="" disabled>
              -- select a format --
            </option>
            <option value="commander">Commander (EDH)</option>
            <option value="duel">Duel Commander</option>
            <option value="vintage">Vintage</option>
            <option value="legacy">Legacy</option>
            <option value="modern">Modern</option>
            <option value="pre-modern">Pre-Modern</option>
            <option value="pioneer">Pioneer</option>
            <option value="standard">Standard</option>
            <option value="pauper">Pauper</option>
            <option value="casual">Casual</option>
          </select>
          {formik.touched.format && formik.errors.format ? (
            <div className="text-red">{formik.errors.format}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="primary-sorting"
            className="text-white block text-sm mb-2"
          >
            Default Primary Sorting
          </label>
          <select
            id="primary-sorting"
            className="text-gray-dark bg-white w-full px-3 py-2 border border-white rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.primarySorting}
          >
            <option value="type">Type</option>
            <option value="color">Color</option>
            <option value="converted-cost">Converted Cost</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="secondary-sorting"
            className="text-white block text-sm mb-2"
          >
            Default Secondary Sorting
          </label>
          <select
            id="secondary-sorting"
            className="text-gray-dark bg-white w-full px-3 py-2 border border-white rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.secondarySorting}
          >
            <option value="type">Type</option>
            <option value="color">Color</option>
            <option value="converted-cost">Converted Cost</option>
          </select>
        </div>

        <button
          type="submit"
          className="text-white bg-gray-600 px-4 py-2 rounded opacity-80"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default function DeckBuilder() {
  return (
    <>
      <DeckForm />
    </>
  );
}
