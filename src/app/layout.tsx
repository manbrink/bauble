import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";

import NavBar from "./components/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bauble",
  description: "Minimalist Magic the Gathering deck builder.",
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
