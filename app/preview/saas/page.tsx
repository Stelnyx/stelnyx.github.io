import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { PricingSection } from "@/components/pricing/PricingSection";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Stelnyx — SaaS pricing preview",
  description: "Internal preview of the full Stelnyx hybrid pricing (Team + Org). Not public.",
  robots: { index: false, follow: false },
};

export default function SaasPreviewPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <div className="bg-stel-amber/10 border-b border-stel-amber/30">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 py-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <Link
              href="/preview"
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber hover:text-amber-300 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber rounded-sm"
            >
              ← Investor home
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber">
              Preview · Team &amp; Org tiers are roadmap, not yet shippable
            </p>
            <Link
              href="/preview/revenue"
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber hover:text-amber-300 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber rounded-sm"
            >
              See revenue projections →
            </Link>
          </div>
        </div>
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
