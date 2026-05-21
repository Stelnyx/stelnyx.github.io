"use client";

import { useContact } from "@/components/contact/ContactProvider";
import { PkgName } from "@/components/ui/PkgName";
import { FEATURE_PUBLIC_REPOS } from "@/lib/features";

const TERMINAL_LINES = [
  { type: "cmd", text: "$ luxscope open express-pin --level recon", pkg: "express-pin" },
  { type: "blank", text: "" },
  { type: "score", text: "LuxScope Score: 85 / 100   rule v0.1.0" },
  { type: "blank", text: "" },
  { type: "rule", label: "  Security        ", score: "69 / 100" },
  { type: "rule", label: "  Complexity      ", score: "67 / 100" },
  { type: "rule", label: "  Documentation   ", score: "99 / 100" },
  { type: "rule", label: "  Dependencies    ", score: "100 / 100" },
  { type: "rule", label: "  Dead Code       ", score: "100 / 100" },
];

export function Hero() {
  const openContact = useContact();

  return (
    <section
      aria-labelledby="hero-headline"
      className="relative bg-stel-bg"
    >
      <div className="relative w-full max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left column — headline + CTAs */}
          <div className="animate-fade-up">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stel-amber mb-5">
              Engineering intelligence · Local-first · Deterministic
            </p>
            <h1
              id="hero-headline"
              className="text-stel-text-primary font-semibold tracking-[-0.04em] leading-[1.05] text-balance"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              The Carfax for code.
            </h1>

            <p
              className="text-stel-text-muted mt-5 leading-[1.7] max-w-[520px] text-balance"
              style={{ fontSize: "18px" }}
            >
              AI shipped your codebase. We tell you what&apos;s actually inside — before your acquirer, investor, or new hire finds out. We ran LuxScope against <PkgName text="express-pin" className="text-stel-text-primary font-semibold" /> — score <span className="text-stel-text-primary font-semibold">85/100</span>, <span className="text-stel-text-primary font-semibold">7 findings</span> across <span className="text-stel-text-primary font-semibold">51 risk files</span>, plus <span className="text-stel-text-primary font-semibold">10 deterministic handoff docs</span>.{" "}
              <a
                href="/reports/luxscope.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stel-text-primary font-semibold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm"
              >
                View the report →
              </a>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href="/reports/luxscope.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-stel-amber text-stel-bg font-semibold px-6 py-3.5 rounded-md hover:bg-amber-400 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg"
                style={{ minHeight: "44px" }}
              >
                View sample report
              </a>
              <button
                type="button"
                onClick={() =>
                  openContact({
                    source: "stelnyx · hero",
                    title: "Talk to founder",
                    intro:
                      "15-minute call with Daniel. Tell us about your stack, what you're shipping, and what you'd want scored. We reply within a day.",
                  })
                }
                className="inline-flex items-center justify-center text-stel-text-primary border border-stel-border px-6 py-3.5 rounded-md hover:border-stel-border-bright hover:text-stel-text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg cursor-pointer"
                style={{ minHeight: "44px" }}
              >
                Talk to founder
              </button>
            </div>
          </div>

          {/* Right column — LuxFaber terminal block */}
          <div
            className="animate-fade-up-delay-2"
            role="img"
            aria-label="LuxScope codebase scanner output for express-pin: score 85 out of 100"
          >
            <figure className="m-0">
              <figcaption className="sr-only">
                LuxScope — codebase intelligence scanner. Recon run against express-pin.
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
                    luxscope v0.1
                  </span>
                </div>

                {/* Terminal body */}
                <div className="px-5 py-5 space-y-1" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", lineHeight: "1.7" }}>
                  {TERMINAL_LINES.map((line, i) => {
                    if (line.type === "blank") {
                      return <div key={i} className="h-1" />;
                    }
                    if (line.type === "cmd") {
                      if (!FEATURE_PUBLIC_REPOS) return null;
                      const pkg = line.pkg;
                      if (pkg && line.text.includes(pkg)) {
                        const [before, after] = line.text.split(pkg);
                        return (
                          <div key={i} className="text-stel-text-muted">
                            {before}
                            <PkgName text={pkg} />
                            {after}
                          </div>
                        );
                      }
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
            <div className="mt-3 flex items-center justify-between gap-3 text-[12px] text-stel-text-faint">
              <span>Score is the headline. Report ships findings, fix order, ETAs.</span>
              <a
                href="/reports/luxscope.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stel-text-muted hover:text-stel-text-primary underline-offset-2 hover:underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm"
              >
                View sample report →
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
