import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sparkle - Web Designer",
  description:
    "Portfolio of Sparkle, a web designer and frontend developer building animated, sky-toned websites. Contact info@sw8tx.lol or info@tylerosthoff.xyz.",
  openGraph: {
    title: "Sparkle - Web Designer",
    description:
      "Animated web design, frontend development, brand systems and portfolio builds by Sparkle.",
    url: "https://sw8tx.lol",
    siteName: "Sparkle",
    images: [
      {
        url: "https://sw8tx.lol/logo-transparent.png",
        width: 1024,
        height: 1024,
        alt: "Sparkle Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sparkle - Web Designer",
    description:
      "Animated web design and frontend development. Contact info@sw8tx.lol or info@tylerosthoff.xyz.",
    images: ["https://sw8tx.lol/logo-transparent.png"],
  },
  icons: {
    icon: "/logo-transparent.png",
    apple: "/logo-transparent.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="global-background" aria-hidden="true">
          <span className="bubble bubble-one" />
          <span className="bubble bubble-two" />
          <span className="bubble bubble-three" />
          <span className="bubble bubble-four" />
        </div>
        {children}
      </body>
    </html>
  );
}
