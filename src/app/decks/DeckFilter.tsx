interface DeckFilterProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function DeckFilter({ search, setSearch }: DeckFilterProps) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-1">
        <div className="col-span-1 p-4"></div>
        <div className="col-span-2 p-4 relative">
          <input
            type="text"
            className="w-full bg-neutral-dark text-white border-b border-white pl-10 py-2 pr-4 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute top-1/2 left-3 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div className="col-span-1 p-4"></div>
      </div>
    </div>
  );
}
