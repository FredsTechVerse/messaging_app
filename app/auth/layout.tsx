import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AlertBox } from "@/app/components/custom";

import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "DIGIOWN",
  description: "A rental management solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="relative flex-col-centered w-full h-screen bg-slate-800 py-5 ">
          <AlertBox />
          <article className="relative w-max flex flex-col px-5 laptop:px-10 overflow-auto overflow-x-hidden ">
            {children}
          </article>
        </main>
      </body>
    </html>
  );
}
