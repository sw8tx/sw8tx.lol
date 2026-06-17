import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Sparkle Web Design",
  description: "Custom websites, portfolio systems and polished frontend development by Sparkle (sw8tx).",
  metadataBase: new URL("https://sw8tx.lol"),
  openGraph: {
    title: "Sparkle Web Design",
    description: "Custom websites, portfolio systems and polished frontend development by Sparkle (sw8tx).",
    url: "https://sw8tx.lol",
    siteName: "Sparkle",
    images: [{ url: "/logo-transparent.png", width: 1024, height: 1024, alt: "Sparkle Logo" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sparkle Web Design",
    description: "Custom websites and polished frontend development by Sparkle (sw8tx).",
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
