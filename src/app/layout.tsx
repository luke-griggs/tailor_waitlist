import "./globals.css";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tailor - Your AI Fashion Assistant",
  description:
    "Discover your perfect style with AI-powered fashion recommendations.",
  keywords: [
    "fashion",
    "AI",
    "style",
    "clothing",
    "recommendations",
    "personal stylist",
  ],
  authors: [{ name: "Tailor" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-[#f8f9fa] antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
