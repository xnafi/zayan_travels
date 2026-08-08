import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "Zayan Travels — Expert Visa Consulting",
    template: "%s | Zayan Travels",
  },
  description:
    "Zayan Travels — Expert visa consulting for 50+ countries. Tourist, business, student, and work visas with fast processing and high success rates.",
  keywords: [
    "visa agency",
    "visa consulting",
    "tourist visa",
    "business visa",
    "student visa",
    "work visa",
    "Zayan Travels",
  ],
  openGraph: {
    title: "Zayan Travels — Expert Visa Consulting",
    description:
      "Your Journey to the World Starts Here. Expert visa consulting for 50+ countries.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable}`}>
        {children}
      </body>
    </html>
  );
}