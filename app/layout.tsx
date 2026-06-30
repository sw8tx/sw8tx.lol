import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Sparkle | Custom Animated Websites and Portfolios",
  description: "Sparkle is the portfolio of Tyler Osthoff, focused on custom animated websites, landing pages and portfolios with sharp design, clean code and a stronger first impression.",
  metadataBase: new URL("https://sw8tx.lol"),
  applicationName: "Sparkle",
  authors: [{ name: "Tyler Osthoff", url: "https://sw8tx.lol" }],
  creator: "Tyler Osthoff",
  publisher: "Sparkle",
  category: "portfolio",
  alternates: {
    canonical: "https://sw8tx.lol",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Sparkle | Custom Animated Websites and Portfolios",
    description: "Custom animated websites, landing pages and portfolios by Tyler Osthoff.",
    url: "https://sw8tx.lol",
    siteName: "Sparkle",
    images: [{ url: "/logo-transparent.png", width: 1024, height: 1024, alt: "Sparkle Logo" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sparkle | Custom Animated Websites and Portfolios",
    description: "Custom animated websites, landing pages and portfolios by Tyler Osthoff.",
    images: ["/logo-transparent.png"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
