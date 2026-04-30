import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import SectionNav from "@/components/utils/SectionNav";
import HamburgerNav from "@/components/utils/HamburgerNav";
import JsonLd from "@/components/utils/JsonLd";

export const metadata: Metadata = {
  title: "Cosmic Flow — Discover the Solar System",
  description:
    "An interactive journey through the Solar System — from the Sun to Mars and humanity's next frontier.",
  icons: {
    icon: "/cosmic-flow-favicon.png",
  },
  openGraph: {
    title: "Cosmic Flow — Discover the Solar System",
    description: "An interactive journey through the Solar System.",
    siteName: "Cosmic Flow",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400","700","900"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} h-full antialiased overflow-x-hidden`}>
      <head>
        <link rel="preload" as="image" href="/header-bg.webp" />
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <SectionNav />
        <HamburgerNav />
      </body>
    </html>
  );
}
