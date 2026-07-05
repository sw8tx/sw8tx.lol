import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "sw8tx | Sparkle Custom Animated Websites and Portfolios",
  description: "sw8tx.lol is the Sparkle portfolio by Tyler: custom animated websites, landing pages, portfolios, UI/UX design, responsive frontend and performance-focused web design.",
  metadataBase: new URL("https://sw8tx.lol"),
  applicationName: "Sparkle",
  authors: [{ name: "Tyler", url: "https://sw8tx.lol" }],
  creator: "Tyler",
  publisher: "Sparkle",
  category: "portfolio",
  keywords: [
    "sw8tx",
    "sw8tx.lol",
    "Sparkle",
    "Tyler",
    "custom animated websites",
    "animated portfolio",
    "landing page design",
    "UI UX design",
    "responsive frontend",
    "web design",
    "frontend developer",
  ],
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
    title: "sw8tx | Sparkle Custom Animated Websites and Portfolios",
    description: "Custom animated websites, landing pages, portfolios and responsive frontend by Tyler.",
    url: "https://sw8tx.lol",
    siteName: "Sparkle",
    images: [{ url: "/logo-transparent.png", width: 1024, height: 1024, alt: "Sparkle Logo" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "sw8tx | Sparkle Custom Animated Websites and Portfolios",
    description: "Custom animated websites, landing pages, portfolios and responsive frontend by Tyler.",
    images: ["/logo-transparent.png"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "sw8tx | Sparkle",
    alternateName: ["Sparkle", "sw8tx", "sw8tx.lol"],
    url: "https://sw8tx.lol",
    creator: {
      "@type": "Person",
      name: "Tyler",
      url: "https://sw8tx.lol",
    },
    description:
      "Custom animated websites, landing pages, portfolios, UI/UX design and responsive frontend by Tyler.",
    inLanguage: ["en", "de"],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
