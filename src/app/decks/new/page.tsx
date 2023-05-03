import CardSearchInput from "@/app/components/cardSearchInput";

const DeckForm = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <form className="w-full max-w-lg">
        <h1 className="text-2xl mb-4">Deck Information</h1>
        <h1 className="text-1xl mb-4 opacity-80">
          Enter some basic deck information.
        </h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="format" className="block text-sm mb-2">
            Format
          </label>
          <select
            id="format"
            className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="invasion">Commander (EDH)</option>
            <option value="odyssey">Legacy</option>
            <option value="apocalypse">Modern</option>
            <option value="apocalypse">Standard</option>
            <option value="apocalypse">Casual</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="primary-sorting" className="block text-sm mb-2">
            Default Primary Sorting
          </label>
          <select
            id="primary-sorting"
            className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="type">Type</option>
            <option value="color">Color</option>
            <option value="converted-cost">Converted Cost</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="secondary-sorting" className="block text-sm mb-2">
            Default Secondary Sorting
          </label>
          <select
            id="secondary-sorting"
            className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="type">Type</option>
            <option value="color">Color</option>
            <option value="converted-cost">Converted Cost</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="featured-card" className="block text-sm mb-2">
            Featured Card
          </label>
          <CardSearchInput />
        </div>

        <button
          type="submit"
          className="text-white bg-gray-700 px-4 py-2 rounded opacity-70"
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
