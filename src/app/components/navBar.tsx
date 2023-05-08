import Link from "next/link";
import BaubleIcon from "./BaubleIcon";

export default function NavBar() {
  return (
    <nav className="absolute top-0 right-0 px-5 py-1 z-50 w-screen bg-neutral-dark opacity-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/decks">
            <BaubleIcon />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-white-normal font-bold py-2 px-4 rounded hover:text-white-bright transition-text duration-1000"
          >
            Register
          </a>
          <a
            href="#"
            className="text-white-normal font-bold py-2 px-4 rounded hover:text-white-bright transition-text duration-1000"
          >
            Log in
          </a>
        </div>
      </div>
    </nav>
  );
}
