import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sw8tx / Tyler Osthoff - Web Designer",
  description:
    "Portfolio of sw8tx / Tyler Osthoff, a web designer and frontend developer building animated blue-toned websites. Contact info@sw8tx.lol or info@tylerosthoff.xyz.",
  openGraph: {
    title: "sw8tx / Tyler Osthoff - Web Designer",
    description:
      "Animated web design, frontend development, brand systems and portfolio builds by sw8tx / Tyler Osthoff.",
    url: "https://sw8tx.lol",
    siteName: "sw8tx",
    images: [
      {
        url: "https://sw8tx.lol/logo.png",
        width: 1024,
        height: 1024,
        alt: "sw8tx Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "sw8tx / Tyler Osthoff - Web Designer",
    description:
      "Animated web design and frontend development. Contact info@sw8tx.lol or info@tylerosthoff.xyz.",
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
