"use client";

import { useState } from "react";
import { useContact } from "@/components/contact/ContactProvider";

type ToolVariant = "bundle" | "luxscope" | "luxfaber";

interface TeamVariant {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  ctaTier: string;
  badge: string;
  bundleSavings?: string;
}

const TEAM_VARIANTS: Record<ToolVariant, TeamVariant> = {
  bundle: {
    name: "Stelnyx Team",
    price: "$299",
    tagline: "Both scanners. Engineering + growth teams. Best value.",
    badge: "Most teams start here",
    bundleSavings: "Save $149/mo vs standalone",
    features: [
      "Everything in Free — both CLIs",
      "Private repo scans (LuxScope)",
      "Hosted agent-readiness scans (LuxFaber)",
      "GitHub App + PR comments + CI gate",
      "Scan history, trend dashboards, drift alerts",
      "Pre-commit hook + IDE integration",
      "Policy enforcement (custom thresholds)",
      "Email support — < 24h",
    ],
    ctaTier: "Stelnyx Team · $299/mo",
  },
  luxscope: {
    name: "LuxScope Team",
    price: "$199",
    tagline: "Codebase intelligence for engineering. Snyk/Sentry-tier pricing.",
    badge: "For engineering teams",
    features: [
      "Everything in Free — LuxScope CLI",
      "Private repo scans — hosted",
      "GitHub App + PR comments + CI gate",
      "Codebase scan history + drift alerts",
      "Change-risk scoring + dependency drift",
      "Pre-commit hook + policy enforcement",
      "Email support — < 24h",
    ],
    ctaTier: "LuxScope Team · $199/mo",
  },
  luxfaber: {
    name: "LuxFaber Team",
    price: "$249",
    tagline: "Agent-readiness for growth + ecommerce. Per-domain monitoring.",
    badge: "For growth + marketing",
    features: [
      "Everything in Free — LuxFaber CLI",
      "Up to 5 monitored domains",
      "Continuous agent-readiness monitoring",
      "Determinism axis (UA-cloaking detection)",
      "ARO score history + drift alerts",
      "Slack / email weekly digest",
      "Email support — < 24h",
    ],
    ctaTier: "LuxFaber Team · $249/mo",
  },
};

interface AuditCard {
  key: "luxscope" | "luxfaber" | "combined";
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
      "Full architecture map, risk-scored change impact, dependency drift, prioritized fix list, PDF report. 60-min architecture debrief with the author. Includes 30-day follow-up scan + findings diff.",
    ctaTier: "LuxScope Audit · $499",
  },
  {
    key: "luxfaber",
    name: "LuxFaber Audit",
    price: "$699",
    tagline: "Agent traffic · growth recovery · CMO/Head of Growth",
    description:
      "Agent-readiness score across crawl, structured data, semantic HTML, content clarity, and UA-cloaking determinism. Prioritized fix list, conversion-recovery framing. 60-min debrief with the author. Includes 30-day follow-up scan + findings diff.",
    ctaTier: "LuxFaber Audit · $699",
  },
  {
    key: "combined",
    name: "Stelnyx Full Audit",
    price: "$799",
    tagline: "Both scanners · founders prepping a sale, raise, or full handoff",
    description:
      "LuxScope + LuxFaber together. 90-min architecture + agent-readiness debrief. Save $399 vs separate audits. Includes 30-day follow-up scan + findings diff.",
    ctaTier: "Stelnyx Full Audit · $799",
    emphasis: true,
    badge: "Save $399",
  },
];

const TOOL_TOGGLE: { key: ToolVariant; label: string }[] = [
  { key: "bundle", label: "Both tools" },
  { key: "luxscope", label: "LuxScope only" },
  { key: "luxfaber", label: "LuxFaber only" },
];

export function PricingSection() {
  const openContact = useContact();
  const [variant, setVariant] = useState<ToolVariant>("bundle");

  const team = TEAM_VARIANTS[variant];

  function openFree() {
    openContact({
      product: "Stelnyx CLI",
      tier: "Free · CLI",
      source: "stelnyx · pricing · free",
      title: "Get the CLI",
    });
  }

  function openTeam() {
    openContact({
      product: team.name,
      tier: team.ctaTier,
      source: `stelnyx · pricing · team · ${variant}`,
      title: `Request · ${team.name}`,
    });
  }

  function openOrg() {
    openContact({
      product: "Stelnyx Org",
      tier: "Org · custom",
      source: "stelnyx · pricing · org",
      title: "Talk to founder · Org tier",
    });
  }

  function openAudit(card: AuditCard) {
    openContact({
      product: card.name,
      tier: card.ctaTier,
      source: `stelnyx · pricing · audit · ${card.key}`,
      title: `Request · ${card.name}`,
    });
  }

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
              Free for solo work. Priced for the team that ships production code.
            </h2>
            <p
              className="text-stel-text-muted mt-4 leading-[1.7] text-balance"
              style={{ fontSize: "16px" }}
            >
              Open-source CLI is permanent and unmetered. Buy both scanners as <span className="text-stel-text-primary font-medium">Stelnyx Team</span> (best value) or just the one that fits your buyer — engineering for LuxScope, growth/marketing for LuxFaber.
            </p>
          </div>

          <div className="mb-10 inline-flex flex-wrap gap-1 p-1 rounded-lg bg-stel-surface border border-stel-border">
            {TOOL_TOGGLE.map((opt) => {
              const active = variant === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setVariant(opt.key)}
                  className={`px-4 py-2 rounded-md text-[13px] font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber ${
                    active
                      ? "bg-stel-amber text-stel-bg"
                      : "text-stel-text-muted hover:text-stel-text-primary"
                  }`}
                  aria-pressed={active}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  "LuxScope + LuxFaber CLI (Apache-2.0)",
                  "Unlimited local scans on public repos / URLs",
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
                onClick={openFree}
                className="w-full px-5 py-3 rounded-md text-[14px] font-medium border border-stel-border hover:border-stel-border-bright text-stel-text-primary transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg"
              >
                Get the CLI →
              </button>
            </div>

            <div className="relative bg-stel-surface border border-stel-amber/40 rounded-xl p-7 flex flex-col shadow-[0_2px_24px_rgba(245,158,11,0.06)] before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-stel-amber before:rounded-t-xl">
              <span className="absolute -top-3 left-7 px-2.5 py-0.5 rounded-full bg-stel-amber text-stel-bg font-mono text-[10px] uppercase tracking-[0.1em] font-semibold">
                {team.badge}
              </span>
              <div className="mb-5">
                <h3 className="font-sans font-semibold text-[20px] text-stel-text-primary tracking-[-0.01em]">
                  {team.name}
                </h3>
                <p className="text-[13px] text-stel-text-muted italic mt-1">{team.tagline}</p>
              </div>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="font-sans font-semibold text-[36px] text-stel-text-primary tracking-[-0.02em]">
                  {team.price}
                </span>
                <span className="text-[13px] text-stel-text-faint">per month</span>
              </div>
              {team.bundleSavings && (
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-stel-amber mb-4 -mt-3">
                  {team.bundleSavings}
                </p>
              )}
              <ul className="space-y-2.5 mb-7 flex-1">
                {team.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[14px] text-stel-text-muted leading-relaxed">
                    <span className="text-stel-amber mt-0.5 select-none">→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={openTeam}
                className="w-full px-5 py-3 rounded-md text-[14px] font-semibold bg-stel-amber hover:bg-amber-400 text-stel-bg transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg"
              >
                Start trial →
              </button>
              <p className="text-[12px] text-stel-text-faint mt-3 text-center">
                30-day trial. No card up front. Includes onboarding scan.
              </p>
            </div>

            <div className="bg-stel-surface border border-stel-border rounded-xl p-7 flex flex-col">
              <div className="mb-5">
                <h3 className="font-sans font-semibold text-[20px] text-stel-text-primary tracking-[-0.01em]">
                  Org
                </h3>
                <p className="text-[13px] text-stel-text-muted italic mt-1">
                  Multi-repo. Multi-domain. SLA. Roadmap influence.
                </p>
              </div>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="font-sans font-semibold text-[36px] text-stel-text-primary tracking-[-0.02em]">$1k+</span>
                <span className="text-[13px] text-stel-text-faint">per month</span>
              </div>
              <ul className="space-y-2.5 mb-7 flex-1">
                {[
                  "Both scanners, unlimited repos + domains",
                  "Unlimited users",
                  "SSO / SAML, audit log, RBAC",
                  "Cross-repo architecture map",
                  "Dedicated Slack channel + named contact",
                  "99.9% SLA, custom contract",
                  "Quarterly review with founding engineer",
                ].map((f) => (
                  <li key={f} className="flex gap-2 text-[14px] text-stel-text-muted leading-relaxed">
                    <span className="text-stel-amber mt-0.5 select-none">→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={openOrg}
                className="w-full px-5 py-3 rounded-md text-[14px] font-medium border border-stel-border hover:border-stel-border-bright text-stel-text-primary transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg"
              >
                Talk to founder →
              </button>
            </div>
          </div>

          <div className="mt-16 mb-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-2">
              One-time engineering audits
            </p>
            <h3 className="font-sans font-semibold text-stel-text-primary tracking-[-0.02em]" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
              Architecture debrief with the author. Pick your surface.
            </h3>
            <p className="text-[14px] text-stel-text-muted mt-2 max-w-[640px]">
              For founders, due-diligence teams, and acquisition prep. Each audit includes a 30-day follow-up scan with a findings diff — see what continuous monitoring would catch next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            Local-first. Code never leaves your machine on Free. Private-repo scans on Team / Org
            run in your VPC or our SOC-2-aligned hosted runner.
          </p>
        </div>
      </section>

    </>
  );
}
