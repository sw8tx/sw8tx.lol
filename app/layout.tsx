import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Sparkle | Web Designer and Frontend Developer",
  description: "Sparkle is the portfolio of Tyler Osthoff, focused on custom websites, frontend builds and concept-led redesigns with a sharper, more human presentation.",
  metadataBase: new URL("https://sw8tx.lol"),
  openGraph: {
    title: "Sparkle | Web Designer and Frontend Developer",
    description: "Custom websites, frontend builds and concept-led redesigns by Tyler Osthoff.",
    url: "https://sw8tx.lol",
    siteName: "Sparkle",
    images: [{ url: "/logo-transparent.png", width: 1024, height: 1024, alt: "Sparkle Logo" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sparkle | Web Designer and Frontend Developer",
    description: "Custom websites and frontend builds by Tyler Osthoff.",
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
