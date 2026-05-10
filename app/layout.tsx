import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { FEATURE_PUBLIC_REPOS } from "@/lib/features";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://stelnyx.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Stelnyx — Infrastructure for engineers who ship",
  description:
    "Stelnyx ships open-source security and agent-readiness infrastructure: scanning, memory, and agent tooling that doesn't slow your team down.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stelnyx — Infrastructure for engineers who ship",
    description:
      "Stelnyx ships open-source security and agent-readiness infrastructure: scanning, memory, and agent tooling that doesn't slow your team down.",
    type: "website",
    url: SITE_URL,
    siteName: "Stelnyx",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stelnyx — Infrastructure for engineers who ship",
    description:
      "Stelnyx ships open-source security and agent-readiness infrastructure: scanning, memory, and agent tooling that doesn't slow your team down.",
  },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Stelnyx",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "Security infrastructure for engineers who ship. Stelnyx builds SecGate, LuxScope, LuxFaber, Intake, Engram, and Arbiter.",
  sameAs: FEATURE_PUBLIC_REPOS
    ? ["https://github.com/tinydarkforge", "https://github.com/Stelnyx"]
    : [],
};

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Stelnyx",
  url: SITE_URL,
  publisher: { "@type": "Organization", name: "Stelnyx" },
};

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSONLD) }}
        />
        {PLAUSIBLE_DOMAIN && (
          <script defer data-domain={PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
        )}
      </head>
      <body className="min-h-full antialiased">
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
