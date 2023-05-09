"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import CardSearchInput from "@/app/components/cardSearchInput";

interface Props {
  initialValues: {
    deckId: string | null;
    name: string;
    featuredCard: string;
    featuredCardScryfallArtCropUrl: string;
    description: string;
    format: string;
    groupBy: string;
    sortBy: string;
  };
  editing: boolean;
}

export default function DeckForm({ initialValues, editing }: Props) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      featuredCard: Yup.string().required("Required"),
      featuredCardScryfallArtCropUrl: Yup.string().required(
        "Please choose a valid card"
      ),
      description: Yup.string().max(999, "Must be 1000 characters or less"),
      format: Yup.string().required("Required"),
      groupBy: Yup.string().required("Required"),
      sortBy: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      let postRoute = editing ? "/api/decks/update" : "/api/decks/new";
      let redirectRoute = editing
        ? `/decks/${initialValues.deckId}/gallery`
        : "/decks";

      if (editing) {
        values = { ...values, ...{ deckId: initialValues.deckId } };
      }

      try {
        const response = await fetch(postRoute, {
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

        router.push(redirectRoute);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <div className="container mx-auto flex justify-center px-4 py-8">
      <form className="w-full max-w-lg" onSubmit={formik.handleSubmit}>
        <h1 className="mb-4 text-2xl text-white-normal">Deck Information</h1>
        <h1 className="text-1xl mb-4 text-white-normal opacity-80">
          {editing
            ? "Deck general information."
            : "Enter some general deck information."}
        </h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-sm text-white-normal"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border-white w-full rounded border bg-white-normal px-3 py-2 text-gray-dark"
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
            className="mb-2 block text-sm text-white-normal"
          >
            Featured Card
          </label>
          <CardSearchInput formik={formik} />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm text-white-normal"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="border-white w-full rounded border bg-white-normal px-3 py-2 text-gray-dark"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red">{formik.errors.description}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="format"
            className="mb-2 block text-sm text-white-normal"
          >
            Format
          </label>
          <select
            id="format"
            className="border-white w-full rounded border bg-white-normal px-3 py-2 text-gray-dark"
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
            <option value="premodern">Pre-Modern</option>
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
            htmlFor="groupBy"
            className="mb-2 block text-sm text-white-normal"
          >
            Grouping
          </label>
          <select
            id="groupBy"
            className="border-white w-full rounded border bg-white-normal px-3 py-2 text-gray-dark"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.groupBy}
          >
            <option value="typeLine">Type</option>
            <option value="colors">Color</option>
            <option value="cmc">Converted Cost</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="sortBy"
            className="mb-2 block text-sm text-white-normal"
          >
            Sorting
          </label>
          <select
            id="sortBy"
            className="border-white w-full rounded border bg-white-normal px-3 py-2 text-gray-dark"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sortBy}
          >
            <option value="typeLine">Type</option>
            <option value="colors">Color</option>
            <option value="cmc">Converted Cost</option>
          </select>
        </div>

        <button
          type="submit"
          className="rounded bg-neutral-darkest px-4 py-2 text-white-normal transition-colors duration-1000 hover:bg-black hover:text-white-bright"
        >
          {editing ? "Update Deck" : "Create Deck"}
        </button>
      </form>
    </div>
  );
}
