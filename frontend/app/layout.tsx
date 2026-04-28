import type { Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import SectionNav from "@/components/utils/SectionNav";

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
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <SectionNav />
      </body>
     
    </html>
  );
}