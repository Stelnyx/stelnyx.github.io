"use client";

import { useState } from "react";
import { useContact } from "@/components/contact/ContactProvider";
import { InstallModal } from "@/components/pricing/InstallModal";
import { FEATURE_PRICING } from "@/lib/features";

interface AuditCard {
  key: "luxscope";
  name: string;
  price: string;
  tagline: string;
  description: string;
  ctaTier: string;
  emphasis?: boolean;
  badge?: string;
}

const AUDIT_CARDS: AuditCard[] = [
  {
    key: "luxscope",
    name: "LuxScope Audit",
    price: "$499",
    tagline: "Codebase · acquisition prep · CTO due diligence",
    description:
      "Full architecture map, risk-scored change impact, dependency drift, prioritized fix list, PDF report. 60-min architecture debrief with the author.",
    ctaTier: "LuxScope Audit · $499",
    emphasis: true,
  },
];

export function PricingSectionPublic() {
  const openContact = useContact();
  const [installOpen, setInstallOpen] = useState(false);

  function openAudit(card: AuditCard) {
    openContact({
      product: card.name,
      tier: card.ctaTier,
      source: `stelnyx · pricing · audit · ${card.key}`,
      title: `Request · ${card.name}`,
    });
  }

  if (!FEATURE_PRICING) return null;

  return (
    <>
      <section
        id="pricing"
        aria-labelledby="pricing-heading"
        className="bg-stel-bg border-t border-stel-border py-16 md:py-24"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20">
          <div className="max-w-[720px] mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-3">
              Pricing
            </p>
            <h2
              id="pricing-heading"
              className="text-stel-text-primary font-semibold tracking-[-0.03em] leading-[1.1] text-balance"
              style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              Free CLI, forever. Founder-led audit when you need a verdict.
            </h2>
            <p
              className="text-stel-text-muted mt-4 leading-[1.7] text-balance"
              style={{ fontSize: "16px" }}
            >
              The open-source CLI is permanent and unmetered — run LuxScope on any public repo. When you need a senior engineer&apos;s read on what the score means, book an audit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[840px]">
            <div className="bg-stel-surface border border-stel-border rounded-xl p-7 flex flex-col">
              <div className="mb-5">
                <h3 className="font-sans font-semibold text-[20px] text-stel-text-primary tracking-[-0.01em]">
                  Free
                </h3>
                <p className="text-[13px] text-stel-text-muted italic mt-1">
                  Local CLI. Public repos / URLs. Run it on anything.
                </p>
              </div>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="font-sans font-semibold text-[36px] text-stel-text-primary tracking-[-0.02em]">$0</span>
                <span className="text-[13px] text-stel-text-faint">forever</span>
              </div>
              <ul className="space-y-2.5 mb-7 flex-1">
                {[
                  "LuxScope CLI (Apache-2.0)",
                  "Unlimited local scans on public repos",
                  "Deterministic score + JSON report",
                  "GitHub Action — basic gate",
                  "Community support",
                ].map((f) => (
                  <li key={f} className="flex gap-2 text-[14px] text-stel-text-muted leading-relaxed">
                    <span className="text-stel-amber mt-0.5 select-none">→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setInstallOpen(true)}
                className="w-full px-5 py-3 rounded-md text-[14px] font-medium border border-stel-border hover:border-stel-border-bright text-stel-text-primary transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg"
              >
                Get the CLI →
              </button>
            </div>

            <div className="relative bg-stel-surface border border-stel-amber/40 rounded-xl p-7 flex flex-col shadow-[0_2px_24px_rgba(245,158,11,0.06)] before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-stel-amber before:rounded-t-xl">
              <span className="absolute -top-3 left-7 px-2.5 py-0.5 rounded-full bg-stel-amber text-stel-bg font-mono text-[10px] uppercase tracking-[0.1em] font-semibold">
                Most-asked
              </span>
              <div className="mb-5">
                <h3 className="font-sans font-semibold text-[20px] text-stel-text-primary tracking-[-0.01em]">
                  Founder-led audit
                </h3>
                <p className="text-[13px] text-stel-text-muted italic mt-1">
                  One-time. Codebase architecture debrief with the author.
                </p>
              </div>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="font-sans font-semibold text-[36px] text-stel-text-primary tracking-[-0.02em]">$499</span>
                <span className="text-[13px] text-stel-text-faint">one-time</span>
              </div>
              <ul className="space-y-2.5 mb-7 flex-1">
                {[
                  "Deep scan + manual interpretation by the author",
                  "Prioritized fix list scoped to your roadmap",
                  "PDF report you can hand to a buyer or board",
                  "60–90 min live debrief call",
                  "For founders, due-diligence teams, acquisition prep",
                ].map((f) => (
                  <li key={f} className="flex gap-2 text-[14px] text-stel-text-muted leading-relaxed">
                    <span className="text-stel-amber mt-0.5 select-none">→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#audits"
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-md text-[14px] font-semibold bg-stel-amber hover:bg-amber-400 text-stel-bg transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg"
              >
                See audit options →
              </a>
            </div>
          </div>

          <div id="audits" className="mt-16 mb-6 scroll-mt-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-2">
              One-time engineering audit
            </p>
            <h3 className="font-sans font-semibold text-stel-text-primary tracking-[-0.02em]" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
              Architecture debrief with the author.
            </h3>
            <p className="text-[14px] text-stel-text-muted mt-2 max-w-[640px]">
              For founders, due-diligence teams, and acquisition prep. Deterministic scan plus a senior engineer&apos;s read on what it means and what to fix first.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 max-w-[560px]">
            {AUDIT_CARDS.map((card) => {
              const cardClasses = card.emphasis
                ? "relative bg-stel-surface border border-stel-amber/40 rounded-xl p-6 flex flex-col shadow-[0_2px_24px_rgba(245,158,11,0.06)]"
                : "bg-stel-surface border border-stel-border rounded-xl p-6 flex flex-col";
              const buttonClasses = card.emphasis
                ? "bg-stel-amber hover:bg-amber-400 text-stel-bg font-semibold"
                : "border border-stel-border hover:border-stel-border-bright text-stel-text-primary font-medium";
              return (
                <div key={card.key} className={cardClasses}>
                  {card.badge && (
                    <span className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-stel-amber text-stel-bg font-mono text-[10px] uppercase tracking-[0.1em] font-semibold">
                      {card.badge}
                    </span>
                  )}
                  <div className="mb-4">
                    <h4 className="font-sans font-semibold text-[18px] text-stel-text-primary tracking-[-0.01em]">
                      {card.name}
                    </h4>
                    <p className="text-[12px] text-stel-text-muted italic mt-1">{card.tagline}</p>
                  </div>
                  <div className="mb-4 flex items-baseline gap-2">
                    <span className="font-sans font-semibold text-[28px] text-stel-text-primary tracking-[-0.02em]">
                      {card.price}
                    </span>
                    <span className="text-[12px] text-stel-text-faint">one-time</span>
                  </div>
                  <p className="text-[13px] text-stel-text-muted leading-relaxed mb-5 flex-1">
                    {card.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => openAudit(card)}
                    className={`w-full px-4 py-2.5 rounded-md text-[13px] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg ${buttonClasses}`}
                  >
                    Request {card.name} →
                  </button>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[12px] text-stel-text-faint mt-10">
            Local-first. Code never leaves your machine on the Free CLI. Audit scans run on a SOC-2-aligned runner and artifacts are deleted after delivery.
          </p>
        </div>
      </section>

      <InstallModal isOpen={installOpen} onClose={() => setInstallOpen(false)} />
    </>
  );
}
