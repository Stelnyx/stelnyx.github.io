"use client";

import { useState } from "react";
import { ProductCard, type Product } from "@/components/products/ProductCard";
import { Modal } from "@/components/ui/Modal";
import { useContact } from "@/components/contact/ContactProvider";
import { FEATURE_PRICING, FEATURE_PUBLIC_REPOS } from "@/lib/features";
import { Terminal, SECGATE, APIGATE } from "@/components/scores/ScoresShowcase";

const PAID_AUDITS_OPEN = FEATURE_PRICING;
const BUNDLE_OPEN = false;

const TOOLS: Product[] = [
  {
    name: "LuxScope",
    badge: "Codebase Intel",
    license: "Apache-2.0",
    tier: "lux",
    tagline: "Know what breaks before you change it.",
    description:
      "Know which files will break before you touch them. Identify the tech debt due-diligence will surface — before the investor does. Give a new hire a working mental model in one report instead of two weeks of context-gathering. Audit AI-generated code you didn't write and can't fully vouch for. LuxScope reads your codebase deterministically — no LLMs, no cloud, runs on your machine.",
    stack: ["AST", "Risk scoring", "Diagrams", "Docs", "MCP"],
    status: "Open source — early release",
    sampleStats: "Sample: 85/100 · 51 risk files · 7 findings · 10 handoff docs (express-pin)",
    sampleReportHref: "/reports/luxscope.html",
    github: "https://github.com/Stelnyx/luxscope",
    page: "/preview/luxscope",
    audit: { price: "$499", href: "/preview/audit/luxscope.html" },
    audiences: {
      dev: "LuxScope runs deterministic static analysis across your entire codebase — no LLMs, no network calls, no hallucinations. It builds accurate dependency graphs, surfaces architectural risk, and generates documentation that reflects what the code actually does. Everything runs locally; nothing leaves your machine.\n\nOutput: call graphs, module ownership maps, dead code detection, risk-scored change impact. Accurate because it's deterministic. Fast because it's local. When you're about to touch a system you don't fully understand, LuxScope tells you what you're actually touching — before you break it. Works on inherited codebases and AI-generated code alike.",
      ceo: "Your engineers spend 40–60% of their time reverse-engineering code before they can safely change it. LuxScope eliminates that. It gives teams an on-demand map of their systems: what depends on what, what's risky to touch, what's documented versus assumed.\n\nNo setup, no external service, no code leaving your environment. AI-assisted development is widening the gap between \"code that exists\" and \"code anyone understands.\" LuxScope closes it. Fewer outages. Faster reviews. Engineers who move instead of stall.",
      investor: "AI coding tools produce code 3–5× faster than teams can absorb it. The result: opaque systems, undocumented dependencies, compounding risk — at every engineering org, simultaneously.\n\nLuxScope is deterministic static analysis infrastructure, local-first, LLM-free, that turns codebases into navigable knowledge graphs. TAM: every software company with more than 5 engineers. Urgency: AI-generated code compounds complexity today, not in three years. Defensibility is technical — the architecture map gets stickier the longer teams use it. First mover in verifiable codebase intelligence.",
    },
  },
  {
    name: "SecGate",
    badge: "Security",
    license: "MIT",
    tier: "tool",
    tagline: "One command. One report. One exit code.",
    cli: "npx @stelnyx/secgate",
    description:
      "Runs Semgrep, Gitleaks, osv-scanner, Trivy, and npm audit in one command. Normalizes findings into one report and fails the pipeline on CRITICAL or HIGH. Aggregation is deterministic — same inputs produce a JSON-byte-identical report every run, locked by determinism + golden snapshot tests.",
    stack: ["Semgrep", "Gitleaks", "osv-scanner", "Trivy", "npm audit"],
    status: "v0.2.13 — MIT · published to npm",
    sampleStats: "Sample: FAIL · 43 findings · risk 365 · 5 scanners (express-pin)",
    sampleReportHref: "/reports/secgate.html",
    npm: "https://www.npmjs.com/package/@stelnyx/secgate",
    github: "https://github.com/Stelnyx/SecGate",
    audit: { price: "Free", href: "/preview/audit/secgate.html" },
  },
  {
    name: "ApiGate",
    badge: "API Surface",
    license: "MIT",
    tier: "tool",
    tagline: "Every endpoint. Scored. One command.",
    cli: "npx @stelnyx/apigate .",
    description:
      "Inventories every HTTP endpoint across Express, Fastify, NestJS, and OpenAPI specs. Classifies auth posture, diffs code vs spec, fails the pipeline on open writes. 100% static — no HTTP, no credentials, no running server. Same inputs → byte-identical report.",
    stack: ["Express", "Fastify", "NestJS", "OpenAPI 2/3"],
    status: "v0.3.0 — MIT · published to npm",
    sampleStats: "Sample: FAIL · 50/100 · 68 endpoints · 68 open · 0 auth-drift (express-pin)",
    sampleReportHref: "/reports/apigate.html",
    npm: "https://www.npmjs.com/package/@stelnyx/apigate",
    github: "https://github.com/Stelnyx/ApiGate",
    audit: { price: "Free", href: "/preview/audit/apigate.html" },
  },
  {
    name: "Intake",
    badge: "Issue Forge",
    license: "MIT",
    tier: "tool",
    tagline: "Paste anything. Get a structured issue.",
    description:
      "Paste a Slack thread, bug report, or vague complaint — Intake uses local AI via Ollama to return a structured GitHub issue in one command. No cloud, no account.",
    stack: ["Ollama", "GitHub CLI", "Bubble Tea", "Go"],
    status: "MIT license — published",
    github: "https://github.com/Stelnyx/Intake",
  },
  {
    name: "Engram",
    badge: "Memory Layer",
    license: "MIT",
    tier: "tool",
    tagline: "One ledger. One confidence model.",
    description:
      "Memory ledger for AI systems. Sessions, facts, confidence scoring, and MCP support. Local-first — one context budget, no account, no telemetry.",
    stack: ["Sessions", "Facts", "Confidence scoring", "MCP"],
    status: "MIT license — active development",
    github: "https://github.com/Stelnyx/Engram",
  },
  {
    name: "Arbiter",
    badge: "Agent Guard",
    license: "MIT",
    tier: "tool",
    tagline: "One guard. One verdict. Sub-5ms.",
    description:
      "Agent guard layer — enforces limits, validates schemas, checks tool allowlists, tracks cost, and detects loops. No LLM required. Deterministic and fast.",
    stack: ["Limits", "Schema validation", "Tool allowlist", "Cost tracking", "Loop detection"],
    status: "MIT license — open source",
    github: "https://github.com/Stelnyx/Arbiter",
  },
];

const SHOW_OSS_TOOLS = false;

type AudienceTab = "dev" | "ceo" | "investor";

const TAB_LABELS: Record<AudienceTab, string> = {
  dev: "Developer",
  ceo: "CEO",
  investor: "Investor",
};

function AudienceTabs({ audiences }: { audiences: NonNullable<Product["audiences"]> }) {
  const [tab, setTab] = useState<AudienceTab>("dev");
  return (
    <>
      <div className="flex gap-1 border-b border-stel-border mb-6">
        {(["dev", "ceo", "investor"] as AudienceTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2.5 text-[13px] border-b-2 -mb-px transition-colors duration-150 focus-visible:outline-none ${
              tab === t
                ? "border-stel-text-primary text-stel-text-primary font-medium"
                : "border-transparent text-stel-text-muted hover:text-stel-text-primary"
            }`}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>
      <div className="mb-6 space-y-4">
        {audiences[tab].split("\n\n").map((para, i) => (
          <p key={i} className="text-[15px] text-stel-text-muted leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </>
  );
}

export function ToolsSection() {
  const [selected, setSelected] = useState<Product | null>(null);
  const openContact = useContact();

  function openAuditRequest(product: Product) {
    if (!product.audit) return;
    const isFree = /free/i.test(product.audit.price);
    openContact({
      product: product.name,
      tier: "1-hr audit",
      source: `stelnyx · ${product.name}`,
      title: `Request · ${product.name} 1-hr audit`,
      free: isFree,
    });
    setSelected(null);
  }

  return (
    <>
      <section
        id="tools"
        aria-labelledby="tools-heading"
        className="bg-stel-bg py-16 border-t border-stel-border md:py-16"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20">
          <h2
            id="tools-heading"
            className="text-stel-text-primary font-semibold tracking-[-0.03em] text-center max-w-[640px] mx-auto text-balance"
            style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            Everything we build, shipped publicly.
          </h2>

          <p className="text-center text-stel-text-muted text-[16px] mt-4 max-w-[480px] mx-auto">
            Infrastructure tools built for engineers. MIT where open, proprietary where not.
          </p>

          {(() => {
            const luxRow = TOOLS.filter((t) => t.tier === "lux");
            const freeRow = TOOLS.filter((t) => t.tier === "tool" && t.audit);
            const ossOnly = TOOLS.filter((t) => !t.audit);
            return (
              <>
                <div className="mt-16 mb-8 max-w-[1280px]">
                  <h3 className="font-sans font-semibold text-[20px] text-stel-text-primary tracking-[-0.01em]">
                    Intelligence. Delivered as a session.
                  </h3>
                  <p className="text-[14px] text-stel-text-muted mt-1 max-w-[620px]">
                    LuxScope reads your codebase deterministically and ships a scored report a senior engineer walks you through — one hour, nothing leaves your machine.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {luxRow.map((tool) => (
                    <ProductCard
                      key={tool.name}
                      product={tool}
                      onLearnMore={setSelected}
                      onRequestAudit={openAuditRequest}
                      paidAuditsOpen={PAID_AUDITS_OPEN}
                      cardHeadingSize="text-[22px]"
                      className="h-full"
                    />
                  ))}

                  {/* Companion panel — what ships, fills visual void next to LuxScope card */}
                  <aside
                    aria-label="What ships in a LuxScope audit"
                    className="bg-stel-surface border border-stel-border rounded-xl p-7 flex flex-col h-full"
                  >
                    <div className="mb-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-2">
                        What ships
                      </p>
                      <h4 className="font-sans font-semibold text-[18px] text-stel-text-primary tracking-[-0.01em]">
                        One scan. One debrief. One PDF you can hand to a buyer.
                      </h4>
                    </div>

                    <ul className="space-y-2.5 mb-6 flex-1">
                      {[
                        "Deterministic score (0–100) + rule-versioned report",
                        "Risk-scored file list — what to touch first",
                        "Architecture map + dependency graph",
                        "10 handoff docs (acquirer, investor, new hire)",
                        "60-min architecture debrief with the author",
                        "Branded PDF — board-ready, diligence-ready",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-[14px] text-stel-text-muted leading-relaxed"
                        >
                          <span className="text-stel-amber mt-0.5 select-none" aria-hidden="true">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-stel-border pt-4 space-y-2">
                      <div className="flex items-center justify-between text-[12px] text-stel-text-faint">
                        <span>Turnaround</span>
                        <span className="text-stel-text-muted">Same week</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px] text-stel-text-faint">
                        <span>Data residency</span>
                        <span className="text-stel-text-muted">Stays on your machine</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px] text-stel-text-faint">
                        <span>Format</span>
                        <span className="text-stel-text-muted">HTML + PDF + JSON</span>
                      </div>
                    </div>
                  </aside>
                </div>

                <div className="mt-20 mb-6 max-w-[1280px]">
                  <h3 className="font-sans font-semibold text-[20px] text-stel-text-primary tracking-[-0.01em]">
                    Also free for engineering teams.
                  </h3>
                  <p className="text-[14px] text-stel-text-muted mt-1 max-w-[620px]">
                    Two MIT-licensed CLIs we maintain alongside LuxScope. One command, no account, same scoring discipline — built for engineers who already own the codebase, not for buyers commissioning a review.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {freeRow.map((tool) => (
                    <ProductCard
                      key={tool.name}
                      product={tool}
                      onLearnMore={setSelected}
                      onRequestAudit={openAuditRequest}
                      paidAuditsOpen={PAID_AUDITS_OPEN}
                      cliProminent
                      showFreeBadge
                    />
                  ))}
                </div>

                {/* Live score output — visual proof of deterministic scoring */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Terminal block={SECGATE} />
                  <Terminal block={APIGATE} />
                </div>

                {BUNDLE_OPEN && (
                  <div className="mt-8 max-w-[1280px] bg-stel-surface border border-stel-amber/30 rounded-xl px-6 md:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                    <div className="flex-1">
                      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-1">Bundle · save $200</p>
                      <h3 className="font-sans font-semibold text-[18px] text-stel-text-primary tracking-[-0.01em] mb-1">
                        Stelnyx Full-Surface Audit
                      </h3>
                      <p className="text-[14px] text-stel-text-muted leading-relaxed">
                        LuxScope + LuxFaber + free SecGate baseline — 90-minute walkthrough. For founders prepping a sale, raise, or full handoff. <span className="text-stel-text-primary font-semibold">$799</span> instead of $998.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        openContact({
                          product: "Stelnyx Full-Surface Audit",
                          tier: "$799 · 90-min · 3-in-1",
                          source: "stelnyx · bundle",
                          title: "Request · Stelnyx Full-Surface Audit",
                          free: false,
                        })
                      }
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-md text-[14px] font-semibold bg-stel-amber hover:bg-amber-600 text-stel-bg transition-colors duration-150 whitespace-nowrap"
                    >
                      Request bundle · $799 →
                    </button>
                  </div>
                )}

                {SHOW_OSS_TOOLS && (
                  <>
                    <div className="mt-20 mb-6 max-w-[1280px]">
                      <h3 className="font-sans font-semibold text-[20px] text-stel-text-primary tracking-[-0.01em]">
                        Open-source tools
                      </h3>
                      <p className="text-[14px] text-stel-text-muted mt-1 max-w-[560px]">
                        Drop-in libraries — install and ship. MIT-licensed building blocks for the AI / agent stack. No call needed.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {ossOnly.map((tool) => (
                        <ProductCard
                          key={tool.name}
                          product={tool}
                          onLearnMore={setSelected}
                          onRequestAudit={openAuditRequest}
                          paidAuditsOpen={PAID_AUDITS_OPEN}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            );
          })()}
        </div>
      </section>

      {selected && (
        <Modal
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          title={selected.name}
          wide={!!selected.audiences}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[11px] uppercase tracking-[0.08em] text-stel-text-faint">
              {selected.badge}
            </span>
            <p className="text-[13px] text-stel-text-muted italic">{selected.tagline}</p>
          </div>

          {selected.audiences ? (
            <AudienceTabs key={selected.name} audiences={selected.audiences} />
          ) : (
            <p className="text-[15px] text-stel-text-muted leading-relaxed mb-6">
              {selected.description}
            </p>
          )}

          {selected.stack && (
            <div className="mb-6">
              <p className="text-[12px] text-stel-text-faint mb-2">Stack</p>
              <div className="flex flex-wrap gap-2">
                {selected.stack.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded bg-stel-bg border border-stel-border text-[12px] text-stel-text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selected.status && (
            <p className="text-[12px] text-stel-text-faint mb-6">
              {selected.status}
            </p>
          )}

          {(() => {
            const isFree = selected.audit ? /free/i.test(selected.audit.price) : false;
            const auditPillVisible = !!selected.audit && (isFree || PAID_AUDITS_OPEN);
            const showGithub = FEATURE_PUBLIC_REPOS && !selected.audit && !!selected.github;
            const showNpm = FEATURE_PUBLIC_REPOS && !!selected.npm;
            if (!showGithub && !showNpm && !auditPillVisible) return null;
            return (
              <div className="flex gap-3 pt-2 border-t border-stel-border flex-wrap">
                {showGithub && selected.github && (
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-md border border-stel-border text-[14px] text-stel-text-muted hover:border-stel-border-bright hover:text-stel-text-primary transition-colors duration-150 font-medium"
                  >
                    GitHub →
                  </a>
                )}
                {showNpm && selected.npm && (
                  <a
                    href={selected.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-md text-[14px] font-semibold transition-colors duration-150 bg-stel-amber hover:bg-amber-600 text-stel-bg"
                  >
                    npm →
                  </a>
                )}
                {auditPillVisible && selected.audit && (() => {
                  const cls = isFree
                    ? "bg-emerald-500 hover:bg-emerald-600 text-stel-bg"
                    : "bg-stel-amber hover:bg-amber-600 text-stel-bg";
                  const label = isFree ? "Request free audit" : "Request 1-hr audit";
                  return (
                    <button
                      type="button"
                      onClick={() => openAuditRequest(selected)}
                      className={`px-4 py-2.5 rounded-md text-[14px] font-semibold transition-colors duration-150 ${cls}`}
                    >
                      {label} →
                    </button>
                  );
                })()}
              </div>
            );
          })()}
        </Modal>
      )}

    </>
  );
}
