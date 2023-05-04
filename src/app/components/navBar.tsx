export default function NavBar() {
  return (
    <nav className="absolute top-0 right-0 p-4 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-end items-center space-x-4">
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
  );
}
