import type { Metadata } from "next";
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
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber">
              Preview · not public · Team &amp; Org tiers are roadmap, not yet shippable
            </p>
          </div>
        </div>
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
