import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeClarity",
  description:
    "Practice explaining code out loud and get instant feedback on clarity, structure, and speaking pace to improve your technical interview skills.",
  verification: {
    google: "N_RRRw2MotI1UYegfbmG6DZUaJX8gHchMS-tr9v0sZ0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg font-inter">
        {children}
        <Footer />
      </body>
    </html>
  );
}
