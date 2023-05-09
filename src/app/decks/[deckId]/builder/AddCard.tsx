import { useFormik } from "formik";
import * as Yup from "yup";

import CardSearchInput from "@/app/components/cardSearchInput";
import Button from "../../../components/Button";

interface AddCardProps {
  deckId: string;
}

export default function AddCard({ deckId }: AddCardProps) {
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
    onSubmit: async (values) => {
      values = { ...values, ...{ deckId: deckId } };

      console.log(values);
    },
  });

  return (
    <div className="text-white-normal mb-4">
      <h1 className="text-xl text-center mb-4">Add Card</h1>
      <form className="w-full max-w-lg" onSubmit={formik.handleSubmit}>
        <div className="mb-2">
          <label
            htmlFor="featured-card"
            className="text-white-normal block text-sm mb-2"
          >
            Card
          </label>
          <CardSearchInput formik={formik} />
        </div>

        <div className="mb-2">
          <label
            htmlFor="quantity"
            className="text-white-normal block text-sm mb-2"
          >
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            className="text-gray-dark px-3 py-2 border border-white rounded"
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
            className="text-white-normal block text-sm mb-2"
          >
            Board
          </label>
          <select
            id="board"
            name="board"
            className="text-gray-dark px-3 py-2 border border-white rounded"
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
}
