"use client";

import { useState } from "react";
import { ProductCard, type Product } from "@/components/products/ProductCard";
import { Modal } from "@/components/ui/Modal";
import { ContactModal, type ContactContext } from "@/components/contact/ContactModal";

const PAID_AUDITS_OPEN = false;
const BUNDLE_OPEN = false;

const TOOLS: Product[] = [
  {
    name: "SecGate",
    badge: "Security",
    mit: true,
    tagline: "One command. One report. One exit code.",
    description:
      "Runs Semgrep, Gitleaks, osv-scanner, Trivy, and npm audit in one command. Normalizes findings into one report and fails the pipeline on CRITICAL or HIGH.",
    stack: ["Semgrep", "Gitleaks", "osv-scanner", "Trivy", "npm audit"],
    status: "v0.2.4 — MIT · published to npm",
    npm: "https://www.npmjs.com/package/@tinydarkforge/secgate",
    github: "https://github.com/tinydarkforge/SecGate",
    audit: { price: "Free", href: "/audit/secgate.html" },
  },
  {
    name: "Lucen",
    badge: "Codebase Intel",
    mit: true,
    tagline: "Know your code before you change it.",
    description:
      "Your codebase grows faster than anyone can track — AI tools make it worse. Lucen performs deterministic static analysis, locally, without LLMs, to produce accurate architecture maps, dependency graphs, and risk scores. Before you change a system you don't fully understand, Lucen tells you what you're actually touching.",
    stack: ["AST", "Risk scoring", "Diagrams", "Docs", "MCP"],
    status: "Open source — early release",
    github: "https://github.com/tinydarkforge/lucen",
    audit: { price: "$499", href: "/audit/lucen.html" },
    audiences: {
      dev: "Lucen runs deterministic static analysis across your entire codebase — no LLMs, no network calls, no hallucinations. It builds accurate dependency graphs, surfaces architectural risk, and generates documentation that reflects what the code actually does. Everything runs locally; nothing leaves your machine.\n\nOutput: call graphs, module ownership maps, dead code detection, risk-scored change impact. Accurate because it's deterministic. Fast because it's local. When you're about to touch a system you don't fully understand, Lucen tells you what you're actually touching — before you break it. Works on inherited codebases and AI-generated code alike.",
      ceo: "Your engineers spend 40–60% of their time reverse-engineering code before they can safely change it. Lucen eliminates that. It gives teams an on-demand map of their systems: what depends on what, what's risky to touch, what's documented versus assumed.\n\nNo setup, no external service, no code leaving your environment. AI-assisted development is widening the gap between \"code that exists\" and \"code anyone understands.\" Lucen closes it. Fewer outages. Faster reviews. Engineers who move instead of stall.",
      investor: "AI coding tools produce code 3–5× faster than teams can absorb it. The result: opaque systems, undocumented dependencies, compounding risk — at every engineering org, simultaneously.\n\nLucen is deterministic static analysis infrastructure, local-first, LLM-free, that turns codebases into navigable knowledge graphs. TAM: every software company with more than 5 engineers. Urgency: AI-generated code compounds complexity today, not in three years. Defensibility is technical — the architecture map gets stickier the longer teams use it. First mover in verifiable codebase intelligence.",
    },
  },
  {
    name: "LuxFaber",
    badge: "Agent Readiness",
    mit: true,
    tagline: "Agent-readability is the new SEO.",
    description:
      "AI agents are replacing traditional browsers and search — most of the web is invisible to them. LuxFaber scores any URL for agent compatibility — semantic structure, schemas, action affordances — and gives you a prioritized fix list. Be readable. Be usable. Be found.",
    stack: ["CLI", "HTTP", "Agent scoring"],
    status: "Open source — coming soon",
    github: "https://github.com/tinydarkforge/LuxFaber",
    audit: { price: "$499", href: "/audit/luxfaber.html" },
    audiences: {
      dev: "LuxFaber analyzes any URL and scores agent-readability across a structured rubric: semantic HTML quality, structured data completeness, link graph navigability, content extractability, and action affordances. Output is a scored report with specific, actionable fixes — not vague recommendations.\n\nThink Lighthouse, but for AI agent compatibility. Runs on-demand or via API. Integrate into your deploy pipeline to catch regressions before they cost you agent traffic. As LLM-based agents replace traditional crawlers and search interfaces, the markup choices you make today determine whether you exist in that layer.",
      ceo: "Search engines sent you traffic because they could crawl you. AI agents work the same way — except the rules changed and most companies haven't noticed.\n\nLuxFaber audits your web presence for AI agent compatibility: whether agents can find your content, parse your offers, and take action on your site. Companies that optimize now will capture agent-driven traffic before competitors realize the channel exists. LuxFaber gives you a score, a prioritized fix list, and a clear path to becoming the default result when an agent acts on a user's behalf.",
      investor: "Search is being disintermediated. AI agents — ChatGPT shopping, Operator-style task completion, Google's agentic layer — are becoming the primary interface between users and web services. Most of the web is invisible to them: unstructured markup, JavaScript-rendered content, missing semantic signals.\n\nLuxFaber is the first tool purpose-built to score and fix agent-readability. The market is every business that depends on web-driven distribution. The timing mirrors early SEO (2003–2006): the channel exists, best practices don't, and first-mover tooling vendors capture the category.",
    },
  },
  {
    name: "Intake",
    badge: "Issue Forge",
    mit: true,
    tagline: "Paste anything. Get a structured issue.",
    description:
      "Paste a Slack thread, bug report, or vague complaint — Intake uses local AI via Ollama to return a structured GitHub issue in one command. No cloud, no account.",
    stack: ["Ollama", "GitHub CLI", "Bubble Tea", "Go"],
    status: "MIT license — published",
    github: "https://github.com/tinydarkforge/Intake",
  },
  {
    name: "Engram",
    badge: "Memory Layer",
    mit: true,
    tagline: "One ledger. One confidence model.",
    description:
      "Memory ledger for AI systems. Sessions, facts, confidence scoring, and MCP support. Local-first — one context budget, no account, no telemetry.",
    stack: ["Sessions", "Facts", "Confidence scoring", "MCP"],
    status: "MIT license — active development",
    github: "https://github.com/tinydarkforge/Engram",
  },
  {
    name: "Arbiter",
    badge: "Agent Guard",
    mit: true,
    tagline: "One guard. One verdict. Sub-5ms.",
    description:
      "Agent guard layer — enforces limits, validates schemas, checks tool allowlists, tracks cost, and detects loops. No LLM required. Deterministic and fast.",
    stack: ["Limits", "Schema validation", "Tool allowlist", "Cost tracking", "Loop detection"],
    status: "MIT license — published to npm",
    npm: "https://www.npmjs.com/package/@tinydarkforge/arbiter",
    github: "https://github.com/tinydarkforge/Arbiter",
  },
];

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
  const [contactCtx, setContactCtx] = useState<ContactContext | null>(null);

  function openAuditRequest(product: Product) {
    if (!product.audit) return;
    const isFree = /free/i.test(product.audit.price);
    setContactCtx({
      product: product.name,
      // tier: `1-hr audit · ${product.audit.price}`,
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
        id="products"
        aria-labelledby="tools-heading"
        className="bg-stel-bg py-16 md:py-24"
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
            const audits = TOOLS.filter((t) => t.audit);
            const tools = TOOLS.filter((t) => !t.audit);
            return (
              <>
                <div className="mt-16 mb-6 max-w-[1280px]">
                  <h3 className="font-sans font-semibold text-[20px] text-stel-text-primary tracking-[-0.01em]">
                    Audited services
                  </h3>
                  <p className="text-[14px] text-stel-text-muted mt-1 max-w-[560px]">
                    A senior engineer runs the tool against your repo or site and walks you through every finding. One hour. Code never leaves your machine.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {audits.map((tool) => (
                    <ProductCard
                      key={tool.name}
                      product={tool}
                      onLearnMore={setSelected}
                      onRequestAudit={openAuditRequest}
                      paidAuditsOpen={PAID_AUDITS_OPEN}
                    />
                  ))}
                </div>

                <div className="mt-16 mb-6 max-w-[1280px]">
                  <h3 className="font-sans font-semibold text-[20px] text-stel-text-primary tracking-[-0.01em]">
                    Open-source tools
                  </h3>
                  <p className="text-[14px] text-stel-text-muted mt-1 max-w-[560px]">
                    Drop-in libraries — install and ship. MIT-licensed building blocks for the AI / agent stack. No call needed.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map((tool) => (
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
            );
          })()}

          {BUNDLE_OPEN && (
            <div className="mt-12 max-w-[720px] mx-auto bg-stel-surface border border-stel-border rounded-xl px-6 md:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
              <div className="flex-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-1">Bundle · save $200</p>
                <h3 className="font-sans font-semibold text-[18px] text-stel-text-primary tracking-[-0.01em] mb-1">
                  Stelnyx Full-Surface Audit
                </h3>
                <p className="text-[14px] text-stel-text-muted leading-relaxed">
                  All three — Lucen + LuxFaber + SecGate — in a 90-minute walkthrough. For founders prepping a sale, raise, or full handoff. <span className="text-stel-text-primary font-semibold">$799</span> instead of $998.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setContactCtx({
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
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-stel-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
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
            const showGithub = !auditPillVisible && !!selected.github;
            const showNpm = !!selected.npm;
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

      <ContactModal
        isOpen={!!contactCtx}
        onClose={() => setContactCtx(null)}
        context={contactCtx ?? undefined}
      />
    </>
  );
}
