"use client";

import { useState } from "react";
import { ProductCard, type Product } from "@/components/products/ProductCard";
import { Modal } from "@/components/ui/Modal";

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
    tagline: "Codebase intelligence for engineers.",
    description:
      "AST analysis, risk scoring, architecture diagrams, docs generation, and MCP support. Local-first — deterministic static analysis, no LLM in the loop. Your code never leaves your machine.",
    stack: ["AST", "Risk scoring", "Diagrams", "Docs", "MCP"],
    status: "Open source — early release",
    github: "https://github.com/tinydarkforge/lucen",
    audit: { price: "$499", href: "/audit/lucen.html" },
  },
  {
    name: "LuxFaber",
    badge: "Agent Readiness",
    mit: true,
    tagline: "Lighthouse for the agent web.",
    description:
      "Scans any URL and returns a scored report on how readable and usable the page is for LLM-driven agents. Static HTTP fetch — no JS rendering, no telemetry, no account.",
    stack: ["CLI", "HTTP", "LLM scoring"],
    status: "Open source — coming soon",
    github: "https://github.com/tinydarkforge/LuxFaber",
    audit: { price: "$499", href: "/audit/luxfaber.html" },
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

const badgeColorForModal: Record<string, string> = {
  Security: "bg-stel-indigo-bright/10 text-stel-indigo-bright border border-stel-indigo-bright/20",
  Intelligence: "bg-stel-indigo-bright/10 text-stel-indigo-bright border border-stel-indigo-bright/20",
  "AI Tooling": "bg-stel-amber/10 text-stel-amber border border-stel-amber/20",
  "Open Source": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

const npmButtonColor: Record<string, string> = {
  "Open Source": "bg-emerald-500 hover:bg-emerald-600 text-stel-bg",
};

export function ToolsSection() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      <section
        id="products"
        aria-labelledby="tools-heading"
        className="bg-stel-bg py-16 md:py-24"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-text-muted mb-4 text-center">
            Tools
          </p>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {TOOLS.map((tool) => (
              <ProductCard
                key={tool.name}
                product={tool}
                onLearnMore={setSelected}
              />
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <Modal
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          title={selected.name}
        >
          <span className={`inline-flex px-2.5 py-1 rounded-full font-mono text-[11px] uppercase tracking-widest mb-4 ${badgeColorForModal[selected.badge] ?? "bg-stel-indigo-bright/10 text-stel-indigo-bright border border-stel-indigo-bright/20"}`}>
            {selected.badge}
          </span>

          <p className="text-[13px] font-mono text-stel-text-muted mb-4">
            {selected.tagline}
          </p>

          <p className="text-[15px] text-stel-text-muted leading-relaxed mb-6">
            {selected.description}
          </p>

          {selected.stack && (
            <div className="mb-6">
              <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-stel-text-faint mb-2">Stack</p>
              <div className="flex flex-wrap gap-2">
                {selected.stack.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded bg-stel-bg border border-stel-border text-[12px] font-mono text-stel-text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selected.status && (
            <p className="text-[12px] font-mono text-stel-text-faint mb-6">
              {selected.status}
            </p>
          )}

          {(selected.npm || selected.audit || (!selected.audit && selected.github)) && (
            <div className="flex gap-3 pt-2 border-t border-stel-border flex-wrap">
              {!selected.audit && selected.github && (
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-md border border-stel-border text-[14px] text-stel-text-muted hover:border-stel-border-bright hover:text-stel-text-primary transition-colors duration-150 font-medium"
                >
                  GitHub →
                </a>
              )}
              {selected.npm && (
                <a
                  href={selected.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2.5 rounded-md text-[14px] font-semibold transition-colors duration-150 ${npmButtonColor[selected.badge] ?? "bg-stel-amber hover:bg-amber-600 text-stel-bg"}`}
                >
                  npm →
                </a>
              )}
              {selected.audit && (() => {
                const isFree = /free/i.test(selected.audit.price);
                const cls = isFree
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-stel-amber/10 border-stel-amber/30 text-stel-amber";
                const suffix = isFree ? "first 10 teams" : "launching soon";
                return (
                  <span className={`px-4 py-2.5 rounded-md text-[14px] font-semibold border ${cls}`}>
                    1-hr audit · {selected.audit.price} · {suffix}
                  </span>
                );
              })()}
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
