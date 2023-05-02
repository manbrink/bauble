export default function Home() {
  const imageUrl =
    "https://cards.scryfall.io/art_crop/front/4/5/45bbbf9b-8fee-4c32-a513-02dac6ac8a39.jpg?1669300401";

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
                  className="font-bold py-2 px-4 rounded opacity-80 hover:opacity-100 transition-opacity duration-1000"
                >
                  Register
                </a>
                <a
                  href="#"
                  className="font-bold py-2 px-4 rounded opacity-80 hover:opacity-100 transition-opacity duration-1000"
                >
                  Log in
                </a>
              </div>
            </div>
          </nav>
          <main className="flex flex-col items-center justify-between max-h-screen p-24">
            <div>
              <h1 className="text-6xl font-bold text-center opacity-85">
                Bauble
              </h1>
              <p className="mt-4 text-center text-xl opacity-85">
                Magic the Gathering deck builder.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="#"
                  className="font-bold py-2 px-4 rounded underline opacity-80 hover:opacity-100 transition-opacity duration-1000"
                >
                  Try it
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
