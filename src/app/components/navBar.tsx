import Link from "next/link";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

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
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
