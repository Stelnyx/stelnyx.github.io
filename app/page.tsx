import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ScoresShowcase } from "@/components/scores/ScoresShowcase";
import { ToolsSection } from "@/components/tools/ToolsSection";
import { PricingSectionPublic } from "@/components/pricing/PricingSectionPublic";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ScoresShowcase />
        <ToolsSection />
        <PricingSectionPublic />
      </main>
      <Footer />
    </>
  );
}
