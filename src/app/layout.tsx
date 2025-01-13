// src/app/layout.tsx
// This file contains the layout for the entire application
// It includes the Providers and the OverlayProvider
// The OverlayProvider is used to display the overlay modals
// The Providers are used to initialize the wagmi and metamask connectors
// The Providers are also used to initialize the wagmi hooks
// The Providers are also used to initialize the metamask hooks

import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import "./globals.css";

import { cookieToInitialState } from "wagmi";
import { Providers } from "@/app/providers";
import { getConfig } from "@/config/wagmi";

import { StickyBanner } from "@/components/sticky-banner";

const tribeca = localFont({
  src: "./fonts/Tribeca.ttf",
  variable: "--font-tribeca",
  // subset: ["latin"],
  weight: "400",
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ApeSafari Presale",
  description: "ApeSafari, the Meme Coin for Africa and the World.",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie"),
  );
  return (
    <html lang="en">
      <body
        className={`${tribeca.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <StickyBanner />
        <main className="relative overflow-hidden">
          <Providers initialState={initialState}>{props.children}</Providers>
        </main>
      </body>
    </html>
  );
}
