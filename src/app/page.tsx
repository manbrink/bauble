import Link from "next/link";

export default function Home() {
  const imageUrl = process.env.SPLASH_IMAGE_URL;

  return (
    <>
      <div
        className="bg-cover bg-center h-screen relative"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative">
          <nav className="p-4">
            <div className="container mx-auto">
              <div className="flex justify-end space-x-4">
                <a
                  href="#"
                  className="text-white font-bold py-2 px-4 rounded opacity-80 hover:opacity-100 transition-opacity duration-1000"
                >
                  Register
                </a>
                <a
                  href="#"
                  className="text-white font-bold py-2 px-4 rounded opacity-80 hover:opacity-100 transition-opacity duration-1000"
                >
                  Log in
                </a>
              </div>
            </div>
          </nav>
          <main className="flex flex-col items-center justify-between max-h-screen p-24">
            <div>
              <h1 className="text-white text-6xl font-bold text-center opacity-85">
                Bauble
              </h1>
              <p className="text-white mt-4 text-center text-xl opacity-85">
                Minimalist Magic the Gathering deck builder.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="decks/new"
                  className="text-white font-bold py-2 px-4 rounded underline opacity-80 hover:opacity-100 transition-opacity duration-1000"
                >
                  Try it
                </Link>
              </div>
            </div>
          </main>
        </div>
        <footer className="absolute bottom-0 left-0 w-full px-8 py-4 bg-opacity-75">
          <p className="text-xs text-white text-center opacity-40">
            Wizards of the Coast, Magic: The Gathering, and their logos are
            trademarks of Wizards of the Coast LLC in the United States and
            other countries. © 1993-2023 Wizards. All Rights Reserved.
            <br />
            Bauble LLC is not affiliated with, endorsed, sponsored, or
            specifically approved by Wizards of the Coast LLC. Bauble LLC may
            use the trademarks and other intellectual property of Wizards of the
            Coast LLC, which is permitted under Wizards&apos; Fan Content
            Policy. MAGIC: THE GATHERING® is a trademark of Wizards of the
            Coast. For more information about Wizards of the Coast or any of
            Wizards&apos; trademarks or other intellectual property, please
            visit their website at https://company.wizards.com/.
            <br />© 2023 Bauble LLC - Terms of Service - Privacy Policy
          </p>
        </footer>
      </div>
    </>
  );
}
