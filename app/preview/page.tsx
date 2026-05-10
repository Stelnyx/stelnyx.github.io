import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Stelnyx — Investor preview",
  description: "Investor materials index. Cloudflare-gated, allowlisted access.",
  robots: { index: false, follow: false },
};

interface PreviewPage {
  href: string;
  title: string;
  description: string;
  badge?: string;
  external?: boolean;
}

interface PreviewSection {
  label: string;
  blurb: string;
  pages: PreviewPage[];
}

const SECTIONS: PreviewSection[] = [
  {
    label: "Investor deck",
    blurb: "Primary read. Open these two to follow the thesis end-to-end.",
    pages: [
      {
        href: "/preview/revenue",
        title: "Revenue model & projections",
        description:
          "Why this makes money, 3-scenario revenue model (pessimistic / balanced / optimistic), category economics, the ask.",
        badge: "Start here",
      },
      {
        href: "/preview/saas",
        title: "SaaS pricing preview",
        description:
          "Full hybrid pricing — Team and Org tiers. Roadmap, not yet shippable.",
      },
    ],
  },
  {
    label: "Audit deliverable templates",
    blurb: "What buyers receive after a paid audit. Same template ships PDF.",
    pages: [
      {
        href: "/preview/audit/secgate.html",
        title: "SecGate · Free 1-hour security scan + walkthrough",
        description:
          "Five security scanners, one report, one hour. Funnel-top deliverable — free.",
        badge: "Free",
        external: true,
      },
      {
        href: "/preview/audit/luxscope.html",
        title: "LuxScope · 1-hour technical due diligence · $499",
        description:
          "Codebase risk map, dependency drift, change-impact, architecture debrief. For founders prepping a sale, acquirers in diligence.",
        external: true,
      },
      {
        href: "/preview/audit/luxfaber.html",
        title: "LuxFaber · 1-hour agent-readiness audit · $699",
        description:
          "Agent-readiness score across crawl, structured data, semantic HTML, content clarity, UA-cloaking determinism. Conversion-recovery framing for CMOs.",
        external: true,
      },
    ],
  },
];

export default function InvestorPreviewIndex() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <div className="bg-stel-amber/10 border-b border-stel-amber/30">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber">
              Preview · allowlisted access via Cloudflare · forward-looking · not public
            </p>
          </div>
        </div>

        <section className="bg-stel-bg border-b border-stel-border py-14 md:py-20">
          <div className="max-w-[820px] mx-auto px-6 md:px-12 xl:px-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stel-amber mb-4">
              Stelnyx · investor materials
            </p>
            <h1
              className="text-stel-text-primary font-semibold tracking-[-0.04em] leading-[1.05] text-balance"
              style={{ fontSize: "clamp(34px, 4.6vw, 54px)" }}
            >
              Investor preview index.
            </h1>
            <p
              className="text-stel-text-muted mt-5 leading-[1.7] max-w-[640px]"
              style={{ fontSize: "17px" }}
            >
              Pre-seed materials for allowlisted reviewers. Numbers refresh from{" "}
              <code className="font-mono text-stel-text-primary text-[15px]">stelyx.md</code> — verify
              dates before quoting verbatim.
            </p>
          </div>
        </section>

        {SECTIONS.map((section) => (
          <section key={section.label} className="bg-stel-bg py-10 md:py-14 border-b border-stel-border last:border-b-0">
            <div className="max-w-[820px] mx-auto px-6 md:px-12 xl:px-20">
              <div className="mb-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stel-amber mb-2">
                  {section.label}
                </p>
                <p className="text-[14px] text-stel-text-muted leading-relaxed">{section.blurb}</p>
              </div>
              <div className="space-y-4">
                {section.pages.map((p) => {
                  const cardClasses =
                    "group block rounded-xl border border-stel-border bg-stel-surface p-6 hover:border-stel-amber/40 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber";
                  const inner = (
                    <>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h2 className="font-sans font-semibold text-[20px] text-stel-text-primary tracking-[-0.01em] group-hover:text-stel-amber transition-colors duration-150">
                          {p.title} →
                        </h2>
                        {p.badge && (
                          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-stel-amber border border-stel-amber/40 rounded-full px-2 py-0.5">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[14px] text-stel-text-muted leading-relaxed">{p.description}</p>
                      <p className="font-mono text-[11px] text-stel-text-faint mt-3">{p.href}</p>
                    </>
                  );
                  return p.external ? (
                    <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className={cardClasses}>
                      {inner}
                    </a>
                  ) : (
                    <Link key={p.href} href={p.href} className={cardClasses}>
                      {inner}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        <section className="bg-stel-bg border-t border-stel-border py-10">
          <div className="max-w-[820px] mx-auto px-6 md:px-12 xl:px-20">
            <p className="text-[13px] text-stel-text-faint">
              Session expires per Cloudflare Access policy. Re-auth via email/PIN to extend. Questions:{" "}
              <a
                href="mailto:hello@stelnyx.com"
                className="text-stel-text-muted hover:text-stel-text-primary underline-offset-2 hover:underline"
              >
                hello@stelnyx.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
