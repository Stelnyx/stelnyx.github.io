import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ContactProvider } from "@/components/contact/ContactProvider";
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

const SITE_URL = "https://stelnyx.github.io";

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
    "Security infrastructure for engineers who ship. Stelnyx builds LuxScope, SecGate, ApiGate, Intake, Engram, and Arbiter.",
  sameAs: FEATURE_PUBLIC_REPOS
    ? ["https://github.com/Stelnyx"]
    : [],
};

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Stelnyx",
  url: SITE_URL,
  publisher: { "@type": "Organization", name: "Stelnyx" },
};

const PRODUCT_JSONLDS = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LuxScope",
    description:
      "Codebase intelligence scanner. Deterministic — no LLMs, no cloud, runs on your machine. Sample run against express-pin: score 85/100, 7 findings across 51 risk files, plus 10 deterministic handoff docs.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    url: `${SITE_URL}/preview/luxscope`,
    publisher: { "@type": "Organization", name: "Stelnyx", url: SITE_URL },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    license: "https://www.apache.org/licenses/LICENSE-2.0",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SecGate",
    description:
      "Deterministic security gate. One command runs Semgrep, Gitleaks, osv-scanner, Trivy, and npm audit; normalizes findings; fails the pipeline on CRITICAL or HIGH. Aggregation is byte-identical across runs, locked by determinism + golden snapshot tests. v0.2.13 — published to npm as @stelnyx/secgate. Sample run against express-pin: FAIL · risk 365 · 43 findings.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    url: "https://www.npmjs.com/package/@stelnyx/secgate",
    publisher: { "@type": "Organization", name: "Stelnyx", url: SITE_URL },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    license: "https://opensource.org/licenses/MIT",
    softwareVersion: "0.2.13",
  },
];

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
        {PRODUCT_JSONLDS.map((ld) => (
          <script
            key={ld.name}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
        ))}
        {PLAUSIBLE_DOMAIN && (
          <script defer data-domain={PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
        )}
      </head>
      <body className="min-h-full antialiased">
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <ContactProvider>{children}</ContactProvider>
      </body>
    </html>
  );
}
