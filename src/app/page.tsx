import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import Button from "./components/Button";

export default function HomePage() {
  const imageUrl = process.env.SPLASH_IMAGE_URL;

  return (
    <>
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="to-transparent absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative">
          <main className="flex max-h-screen flex-col items-center justify-between p-24">
            <div>
              <h1 className="opacity-85 text-center text-6xl font-bold text-white-normal">
                Bauble
              </h1>
              <p className="opacity-85 mt-4 text-center text-xl text-white-normal">
                Minimalist Magic the Gathering deck builder.
              </p>
              <div className="mt-8 flex justify-center">
                <SignedIn>
                  <Link
                    href="decks/new"
                    className="transition-text rounded px-4 py-2 font-bold text-white-normal underline duration-1000 hover:text-white-bright"
                  >
                    Add a Deck
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <Button
                      type="button"
                      text="Sign In"
                      theme="light"
                      size="md"
                    />
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </main>
        </div>
        <footer className="absolute bottom-0 left-0 w-full bg-opacity-75 px-8 py-4">
          <p className="text-center text-xs text-white-normal opacity-40">
            Wizards of the Coast, Magic: The Gathering, and their logos are
            trademarks of Wizards of the Coast LLC in the United States and
            other countries. © 1993-2023 Wizards. All Rights Reserved.
            <br />
            Bauble is not affiliated with, endorsed, sponsored, or specifically
            approved by Wizards of the Coast LLC. Bauble may use the trademarks
            and other intellectual property of Wizards of the Coast LLC, which
            is permitted under Wizards&apos; Fan Content Policy. MAGIC: THE
            GATHERING® is a trademark of Wizards of the Coast. For more
            information about Wizards of the Coast or any of Wizards&apos;
            trademarks or other intellectual property, please visit their
            website at https://company.wizards.com/.
            <br />© 2023 Bauble - Terms of Service - Privacy Policy
          </p>
        </footer>
      </div>
    </>
  );
}
