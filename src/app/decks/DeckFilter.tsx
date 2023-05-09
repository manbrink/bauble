interface DeckFilterProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function DeckFilter({ search, setSearch }: DeckFilterProps) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-1">
        <div className="col-span-1 p-4"></div>
        <div className="relative col-span-2 p-4">
          <input
            type="text"
            className="border-white w-full border-b bg-neutral-dark py-2 pl-10 pr-4 text-white-normal focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white-normal"
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
