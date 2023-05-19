import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 right-0 z-50 w-screen px-5 py-1 opacity-50">
      <div className="flex h-[25px] w-[25px] justify-end">
        <Link href={`${process.env.PATREON_URL}`}>
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
