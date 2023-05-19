import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";

import NavBar from "./components/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bauble | Minimalist Magic the Gathering Deck Builder",
  description:
    "The zen garden of deck builders. Our platform prioritizes speed, simplicity, and aesthetics, enabling quick card search, efficient deck creation, and an immersive brewing experience. Dive into the art of deck building today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-neutral-dark`}>
          <NavBar />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
