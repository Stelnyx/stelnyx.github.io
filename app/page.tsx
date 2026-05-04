import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ToolsSection } from "@/components/tools/ToolsSection";
import { PhilosophySection } from "@/components/philosophy/PhilosophySection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ToolsSection />
        <PhilosophySection />
      </main>
      <Footer />
    </>
  );
}
