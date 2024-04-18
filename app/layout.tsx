import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AlertBox } from "./components/custom";
import { Forms } from "./sections";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messaging Application",
  description: "A custom messaging solution",
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
          <article className="relative w-full flex flex-col gap-5 h-screen px-5 overflow-auto ">
            {children}
          </article>
          <Forms />
        </main>
      </body>
    </html>
  );
}
