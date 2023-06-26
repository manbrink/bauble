import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";

import Image from "next/image";

import BaubleIcon from "./BaubleIcon";

export default function NavBar() {
  return (
    <nav className="absolute right-0 top-0 z-50 w-screen bg-neutral-dark px-5 py-1 opacity-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link data-cy="navbar-decks-link" href="/decks">
            <BaubleIcon />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            id="patreon-link"
            href={`${process.env.PATREON_URL}`}
            target="_blank"
            title="Support us on Patreon"
            rel="noopener noreferrer"
          >
            <div className="h-[25px] w-[25px]">
              <Image
                src="/patreon-logo-white.png"
                alt="Patreon"
                width={25}
                height={25}
              />
            </div>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
