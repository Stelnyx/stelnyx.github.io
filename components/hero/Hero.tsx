"use client";

import { useState } from "react";
import { ContactModal } from "@/components/contact/ContactModal";

const TERMINAL_LINES = [
  { type: "cmd", text: "$ npx luxfaber https://stelnyx.com" },
  { type: "score", text: "Score: 91 / 100   AEO · rule v1" },
  { type: "blank", text: "" },
  { type: "rule", label: "  Crawl Accessibility", score: "96 / 100" },
  { type: "rule", label: "  Structured Data    ", score: "86 / 100" },
  { type: "rule", label: "  Semantic HTML      ", score: "100 / 100" },
  { type: "rule", label: "  Content Clarity    ", score: "72 / 100" },
  { type: "rule", label: "  Determinism        ", score: "100 / 100" },
];

export function Hero() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section
      aria-labelledby="hero-headline"
      className="relative bg-stel-bg"
    >
      <div className="relative w-full max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left column — headline + CTAs */}
          <div className="animate-fade-up">
            <h1
              id="hero-headline"
              className="text-stel-text-primary font-semibold tracking-[-0.04em] leading-[1.05] text-balance"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              Infrastructure for engineers who ship.
            </h1>

            <p
              className="text-stel-text-muted mt-5 leading-[1.7] max-w-[480px] text-balance"
              style={{ fontSize: "18px" }}
            >
              Six open-source tools — security scanning, agent memory, AEO scoring, and more. Drop them in without slowing the team down.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href="#tools"
                className="inline-flex items-center justify-center bg-stel-amber text-stel-bg font-semibold px-6 py-3.5 rounded-md hover:bg-amber-400 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg"
                style={{ minHeight: "44px" }}
              >
                See the tools
              </a>
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center justify-center text-stel-text-primary border border-stel-border px-6 py-3.5 rounded-md hover:border-stel-border-bright hover:text-stel-text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg cursor-pointer"
                style={{ minHeight: "44px" }}
              >
                Get early access
              </button>
            </div>
          </div>

          {/* Right column — LuxFaber terminal block */}
          <div
            className="animate-fade-up-delay-2"
            role="img"
            aria-label="LuxFaber AEO scanner output for stelnyx.com: score 91 out of 100"
          >
            <figure className="m-0">
              <figcaption className="sr-only">
                LuxFaber — Answer Engine Optimization scanner. Dogfood run against stelnyx.com.
              </figcaption>
              <div
                className="rounded-lg border border-stel-border bg-stel-surface overflow-hidden"
                aria-hidden="true"
              >
                {/* Terminal title bar — plain, no traffic lights */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-stel-border">
                  <span className="font-mono text-stel-text-faint" style={{ fontSize: "11px" }}>
                    terminal
                  </span>
                  <span className="ml-auto font-mono text-stel-text-faint" style={{ fontSize: "11px" }}>
                    luxfaber v0.2
                  </span>
                </div>

                {/* Terminal body */}
                <div className="px-5 py-5 space-y-1" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", lineHeight: "1.7" }}>
                  {TERMINAL_LINES.map((line, i) => {
                    if (line.type === "blank") {
                      return <div key={i} className="h-1" />;
                    }
                    if (line.type === "cmd") {
                      return (
                        <div key={i} className="text-stel-text-muted">
                          {line.text}
                        </div>
                      );
                    }
                    if (line.type === "score") {
                      return (
                        <div key={i} className="text-stel-text-primary font-semibold">
                          {line.text}
                        </div>
                      );
                    }
                    if (line.type === "rule") {
                      const numericScore = parseInt(line.score ?? "0", 10);
                      const scoreColor =
                        numericScore >= 90
                          ? "text-emerald-400"
                          : numericScore >= 70
                          ? "text-stel-amber"
                          : "text-red-400";
                      return (
                        <div key={i} className="flex items-center justify-between gap-8">
                          <span className="text-stel-text-muted whitespace-pre">{line.label}</span>
                          <span className={scoreColor}>{line.score}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </figure>
          </div>

        </div>
      </div>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        context={{
          source: "stelnyx · hero",
          title: "Request early access",
          intro: "Tell us a bit about your site or stack and we'll get back to you within a day.",
        }}
      />
    </section>
  );
}
