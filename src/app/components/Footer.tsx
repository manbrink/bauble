import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 right-0 z-50 w-screen px-5 py-1 opacity-50">
      <div className="flex justify-end">
        <Link href="https://patreon.com/Bauble470">
          <Image
            src="/patreon-logo-white.png"
            alt="Patreon"
            width={25}
            height={25}
          />
        </Link>
      </div>
    </nav>
  );
}
