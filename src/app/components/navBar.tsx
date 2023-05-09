import Link from "next/link";
import BaubleIcon from "./BaubleIcon";

export default function NavBar() {
  return (
    <nav className="absolute right-0 top-0 z-50 w-screen bg-neutral-dark px-5 py-1 opacity-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/decks">
            <BaubleIcon />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="transition-text rounded px-4 py-2 font-bold text-white-normal duration-1000 hover:text-white-bright"
          >
            Register
          </a>
          <a
            href="#"
            className="transition-text rounded px-4 py-2 font-bold text-white-normal duration-1000 hover:text-white-bright"
          >
            Log in
          </a>
        </div>
      </div>
    </nav>
  );
}
