import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "Zayan Travels — Expert Visa Consulting", template: "%s | Zayan Travels" },
  description: "Zayan Travels — Expert visa consulting for 50+ countries. Your journey to the world starts here.",
  keywords: ["visa agency", "visa consulting", "tourist visa", "business visa", "student visa", "work visa", "Zayan Travels"],
  openGraph: { title: "Zayan Travels — Expert Visa Consulting", description: "Your journey to the world starts here.", type: "website", locale: "en_US" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-brand-dark"><body className={`${inter.variable} ${cormorant.variable}`}>{children}</body></html>;
}
