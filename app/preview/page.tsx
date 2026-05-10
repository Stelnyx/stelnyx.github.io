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
}

const PAGES: PreviewPage[] = [
  {
    href: "/preview/revenue",
    title: "Revenue model & projections",
    description:
      "Why this makes money, 3-scenario revenue model (pessimistic / balanced / optimistic), category economics, the ask.",
    badge: "Primary deck",
  },
  {
    href: "/preview/saas",
    title: "SaaS pricing preview",
    description:
      "Full hybrid pricing — Team and Org tiers. Roadmap, not yet shippable.",
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

        <section className="bg-stel-bg py-12 md:py-16">
          <div className="max-w-[820px] mx-auto px-6 md:px-12 xl:px-20 space-y-4">
            {PAGES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group block rounded-xl border border-stel-border bg-stel-surface p-6 hover:border-stel-amber/40 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber"
              >
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
              </Link>
            ))}
          </div>
        </section>

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
