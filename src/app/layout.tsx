import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { GameProvider } from "@/providers/game-provider";
import { QueryProvider } from "@/providers/query-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Poemdle",
    template: "%s · Poemdle",
  },
  description:
    "A daily poetry game. Read the prompt, write a short poem, and upvote your favourites.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col font-sans text-ink">
        <QueryProvider>
          <GameProvider>
            <SiteHeader />
            <div className="flex flex-1 flex-col">{children}</div>
          </GameProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
