import "./globals.css";
import { Poppins } from "next/font/google";
import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Tailor - Try On Clothes Instantly",
    template: "%s | Tailor",
  },
  description:
    "Try on clothes instantly before you order. Join 2,400+ people waiting for exclusive early access to Tailor's AI-powered virtual try-on technology.",
  keywords: [
    "virtual try on",
    "AI fashion",
    "try on clothes",
    "fashion technology",
    "clothing preview",
    "online shopping",
    "fashion AI",
    "virtual fitting",
    "digital try on",
    "tailor",
  ],
  authors: [{ name: "Tailor Team" }],
  creator: "Tailor",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tailor.com",
    siteName: "Tailor",
    title: "Tailor - Try On Clothes Instantly",
    description:
      "Try on clothes instantly before you order. Join thousands waiting for exclusive early access.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tailor - Virtual Try-On Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tailor - Try On Clothes Instantly",
    description:
      "Try on clothes instantly before you order. Join thousands waiting for exclusive early access.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
