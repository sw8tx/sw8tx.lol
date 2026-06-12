import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Sparkle's Portfolio & Shop",
  description: "Hey, my name is Sparkle (sw8tx) — Rocket League freestyler, Roblox trader & limited seller, and Discord marketplace vendor. This is my official site where you can find everything I offer.",
  openGraph: {
    title: "Sparkle's Portfolio & Shop",
    description: "Hey, my name is Sparkle (sw8tx) — Rocket League freestyler, Roblox trader & limited seller, and Discord marketplace vendor. This is my official site.",
    url: "https://sw8tx.lol",
    siteName: "Sparkle",
    images: [{ url: "https://sw8tx.lol/logo.png", width: 1024, height: 1024, alt: "Sparkle Logo" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sparkle's Portfolio & Shop",
    description: "Rocket League freestyler · Roblox trader · Discord seller. Official site.",
    images: ["https://sw8tx.lol/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
