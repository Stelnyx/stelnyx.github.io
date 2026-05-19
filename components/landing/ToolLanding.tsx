"use client";

import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { useContact } from "@/components/contact/ContactProvider";
import { FEATURE_PRICING } from "@/lib/features";

export interface ToolLandingData {
  slug: "luxscope" | "luxfaber";
  name: string;
  eyebrow: string;
  headline: string;
  intro: string;
  github: string;
  auditName: string;
  auditPrice: string;
  auditBlurb: string;
  body: { heading: string; paras: string[] }[];
  checks: { label: string; detail: string }[];
  scoreLabel: string;
  scoreValue: string;
}

export function ToolLanding({ data }: { data: ToolLandingData }) {
  const openContact = useContact();

  function openAudit() {
    openContact({
      product: data.auditName,
      tier: `${data.auditName} · ${data.auditPrice}`,
      source: `stelnyx · ${data.slug} · landing · audit`,
      title: `Request · ${data.auditName}`,
    });
  }

  function openFounderContact() {
    openContact({
      source: `stelnyx · ${data.slug} · landing`,
      title: "Talk to founder",
      intro:
        "15-minute call with Daniel. Tell us about your stack, what you're shipping, and what you'd want scored. We reply within a day.",
    });
  }

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="relative bg-stel-bg border-b border-stel-border">
          <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 py-14 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="animate-fade-up">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stel-amber mb-5">
                  {data.eyebrow}
                </p>
                <h1
                  className="text-stel-text-primary font-semibold tracking-[-0.04em] leading-[1.05] text-balance"
                  style={{ fontSize: "clamp(34px, 4.6vw, 54px)" }}
                >
                  {data.headline}
                </h1>
                <p
                  className="text-stel-text-muted mt-5 leading-[1.7] max-w-[520px] text-balance"
                  style={{ fontSize: "18px" }}
                >
                  {data.intro}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-9">
                  <button
                    type="button"
                    onClick={openAudit}
                    className="inline-flex items-center justify-center bg-stel-amber text-stel-bg font-semibold px-6 py-3.5 rounded-md hover:bg-amber-400 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg"
                    style={{ minHeight: "44px" }}
                  >
                    Request {data.auditName} · {data.auditPrice}
                  </button>
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-stel-text-primary border border-stel-border px-6 py-3.5 rounded-md hover:border-stel-border-bright transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg"
                    style={{ minHeight: "44px" }}
                  >
                    View source on GitHub →
                  </a>
                </div>
                <p className="text-[12px] text-stel-text-faint mt-4">
                  Open source, Apache-2.0. CLI install coming to npm. Today: clone, build, run locally — or book the founder-led audit above.
                </p>
              </div>

              {/* Score block */}
              <div
                className="animate-fade-up-delay-2"
                role="img"
                aria-label={`${data.name} dogfood score on stelnyx.com: ${data.scoreValue}`}
              >
                <div className="rounded-lg border border-stel-border bg-stel-surface overflow-hidden" aria-hidden="true">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-stel-border">
                    <span className="font-mono text-stel-text-faint" style={{ fontSize: "11px" }}>
                      terminal
                    </span>
                    <span className="ml-auto font-mono text-stel-text-faint" style={{ fontSize: "11px" }}>
                      {data.slug}
                    </span>
                  </div>
                  <div className="px-5 py-5 space-y-1.5" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "13px", lineHeight: "1.7" }}>
                    <div className="text-stel-text-muted">
                      $ {data.slug === "luxfaber" ? "luxfaber https://stelnyx.com" : "luxscope analyze ."}
                    </div>
                    <div className="h-1" />
                    <div className="text-stel-text-primary font-semibold">{data.scoreLabel}</div>
                    <div className="text-stel-text-muted">{data.checks.length} scored axes · deterministic · rule-versioned</div>
                    <div className="h-1" />
                    <div className="text-stel-text-faint">→ full findings + fix order + ETAs in the report</div>
                  </div>
                </div>
                <p className="mt-3 text-[12px] text-stel-text-faint">
                  Stelnyx scores itself in public — {data.scoreValue}. Score is the headline; the report ships findings, fix order, and ETAs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Body — what it does */}
        <section className="bg-stel-bg py-14 md:py-20">
          <div className="max-w-[760px] mx-auto px-6 md:px-12 xl:px-20 space-y-12">
            {data.body.map((block) => (
              <div key={block.heading}>
                <h2 className="text-stel-text-primary font-semibold tracking-[-0.02em] mb-3" style={{ fontSize: "clamp(20px, 2.6vw, 26px)" }}>
                  {block.heading}
                </h2>
                <div className="space-y-4">
                  {block.paras.map((p, i) => (
                    <p key={i} className="text-[16px] text-stel-text-muted leading-[1.75]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What it checks */}
        <section className="bg-stel-bg border-t border-stel-border py-14 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-2">What it checks</p>
            <h2 className="text-stel-text-primary font-semibold tracking-[-0.02em] mb-8" style={{ fontSize: "clamp(22px, 3vw, 30px)" }}>
              Deterministic, versioned, reproducible.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.checks.map((c) => (
                <div key={c.label} className="rounded-xl border border-stel-border bg-stel-surface p-5">
                  <h3 className="font-sans font-semibold text-[15px] text-stel-text-primary tracking-[-0.01em] mb-1.5">{c.label}</h3>
                  <p className="text-[13.5px] text-stel-text-muted leading-relaxed">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audit CTA */}
        <section className="bg-stel-bg border-t border-stel-border py-14 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20">
            <div className="relative bg-stel-surface border border-stel-amber/40 rounded-xl p-7 md:p-9 shadow-[0_2px_24px_rgba(245,158,11,0.06)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-[640px]">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-2">{data.auditName} · {data.auditPrice} · one-time</p>
                <h2 className="text-stel-text-primary font-semibold tracking-[-0.02em] mb-2" style={{ fontSize: "clamp(20px, 2.6vw, 26px)" }}>
                  Want a senior engineer&apos;s read on the result?
                </h2>
                <p className="text-[15px] text-stel-text-muted leading-relaxed">{data.auditBlurb}</p>
              </div>
              <button
                type="button"
                onClick={openAudit}
                className="shrink-0 inline-flex items-center justify-center bg-stel-amber text-stel-bg font-semibold px-6 py-3.5 rounded-md hover:bg-amber-400 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg whitespace-nowrap"
                style={{ minHeight: "44px" }}
              >
                Request {data.auditName} →
              </button>
            </div>
            <p className="text-center text-[13px] text-stel-text-faint mt-8">
              {FEATURE_PRICING && (
                <>
                  See all pricing on the{" "}
                  <Link href="/#pricing" className="text-stel-text-muted hover:text-stel-text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber rounded-sm">
                    main page
                  </Link>
                  {" · "}
                </>
              )}
              <button type="button" onClick={openFounderContact} className="text-stel-text-muted hover:text-stel-text-primary underline-offset-2 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber rounded-sm">
                talk to the founder
              </button>
            </p>
          </div>
        </section>
      </main>
      <Footer />

    </>
  );
}
