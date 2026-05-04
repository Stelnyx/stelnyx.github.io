"use client";

import dynamic from "next/dynamic";

const StarField = dynamic(() => import("./StarField"), { ssr: false });

export function Hero() {
  return (
    <section
      aria-labelledby="hero-headline"
      className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-stel-bg"
    >
      {/* Background orbs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px] opacity-[0.28] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, #6C63FF 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.13] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, #F59E0B 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Starfield canvas */}
      <StarField />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 xl:px-20 max-w-[1280px] mx-auto w-full">
        <h1
          id="hero-headline"
          className="animate-fade-up text-stel-text-primary font-semibold tracking-[-0.04em] leading-[1.05] text-balance"
          style={{ fontSize: "clamp(40px, 6vw, 64px)" }}
        >
          Security infrastructure built for
          <br />
          engineers who ship.
        </h1>

        <p
          className="animate-fade-up-delay-1 text-stel-text-muted max-w-[560px] mx-auto mt-5 leading-[1.7] text-balance"
          style={{ fontSize: "18px" }}
        >
          Stelnyx gives you scanning, memory, and agent tooling that doesn&apos;t
          slow your team down.
        </p>

        <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <a
            href="#early-access"
            id="early-access"
            className="bg-stel-amber text-stel-bg font-semibold px-6 py-3.5 rounded-md hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg"
          >
            Get early access
          </a>
          <a
            href="#docs"
            id="docs"
            className="group text-stel-text-primary px-6 py-3.5 rounded-md hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg inline-flex items-center gap-1.5 transition-all duration-150"
          >
            Read the docs
            <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer bg-transparent border-none p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-full"
        aria-label="Scroll to products"
        onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </section>
  );
}
