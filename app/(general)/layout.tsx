import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AlertBox, MenuBtn, Navbar } from "../components/custom";
import { Forms } from "./sections";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INUA COMRADE",
  description: "An accounting solution for the inua comrade initiative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="relative flex w-full h-screen  bg-white">
          <AlertBox />
          <MenuBtn />
          <Navbar />
          <article className="relative w-full flex flex-col gap-5 h-screen px-5 overflow-auto ">
            {children}
          </article>
          <Forms />
        </main>
      </body>
    </html>
  );
}
