import type { Metadata } from "next";
import { ToolLanding, type ToolLandingData } from "@/components/landing/ToolLanding";

export const metadata: Metadata = {
  title: "LuxScope — deterministic codebase intelligence | Stelnyx",
  description:
    "LuxScope reads your codebase deterministically — no LLMs, no cloud, runs locally. Dependency graphs, risk-scored change impact, module ownership, generated docs. Open source (Apache-2.0). Founder-led audit $499.",
  alternates: { canonical: "/preview/luxscope" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "LuxScope — know what breaks before you change it",
    description:
      "Deterministic, LLM-free codebase intelligence. Dependency graphs, change-impact risk, module ownership, docs that match the code. Open source. Audit $499.",
    type: "website",
    url: "https://stelnyx.com/preview/luxscope",
    siteName: "Stelnyx",
  },
};

const DATA: ToolLandingData = {
  slug: "luxscope",
  name: "LuxScope",
  eyebrow: "Codebase intelligence · Local-first · Deterministic",
  headline: "Know what breaks before you change it.",
  intro:
    "LuxScope reads your codebase deterministically — no LLMs, no cloud, runs on your machine. It builds accurate dependency graphs, surfaces architectural risk, scores change impact, and generates documentation that reflects what the code actually does. Built for inherited codebases, AI-generated code you didn't write, and acquisition diligence.",
  github: "https://github.com/tinydarkforge/luxscope",
  auditName: "LuxScope Audit",
  auditPrice: "$499",
  auditBlurb:
    "A senior engineer runs LuxScope against your repo and walks you through every finding on a call — then ships a PDF: full architecture map, risk-scored change impact, dependency drift, prioritized fix list. For founders prepping a sale or raise, acquirers doing diligence, and CTOs onboarding into an unfamiliar system.",
  body: [
    {
      heading: "Deterministic, not generative",
      paras: [
        "LuxScope runs static analysis across your entire codebase — no LLMs, no network calls, no hallucinations. It builds accurate call graphs, module ownership maps, dead-code detection, and risk-scored change impact. Accurate because it's deterministic. Fast because it's local. Everything runs on your machine; nothing leaves it.",
        "When you're about to touch a system you don't fully understand, LuxScope tells you what you're actually touching — before you break it. Works the same on a codebase you inherited and on code an agent wrote last week.",
      ],
    },
    {
      heading: "Why teams run it",
      paras: [
        "Engineers spend 40–60% of their time reverse-engineering code before they can safely change it. LuxScope gives the team an on-demand map of their systems: what depends on what, what's risky to touch, what's documented versus assumed. No setup, no external service, no code leaving the environment.",
        "AI-assisted development widens the gap between \"code that exists\" and \"code anyone understands.\" LuxScope closes it — fewer outages, faster reviews, engineers who move instead of stall.",
      ],
    },
    {
      heading: "The category",
      paras: [
        "AI coding tools produce code 3–5× faster than teams can absorb it: opaque systems, undocumented dependencies, compounding risk — at every engineering org, simultaneously. LuxScope is deterministic static-analysis infrastructure, local-first and LLM-free, that turns codebases into navigable knowledge graphs.",
        "We hold one line: no LLMs in the scoring path. Same input, same score, every time. That reproducibility is the wedge — it's why a report is something you can hand to a buyer or a board.",
      ],
    },
  ],
  checks: [
    { label: "Dependency graph", detail: "Accurate, code-derived call and import graphs across a polyglot repo — what reaches what, and what reaches it." },
    { label: "Change-impact risk", detail: "Each module scored for blast radius: touch this, and here's what's downstream and how risky it is." },
    { label: "Module ownership map", detail: "Who and what owns each part of the system — the mental model a new hire would otherwise spend two weeks building." },
    { label: "Dead-code detection", detail: "Unreferenced code, orphaned modules, and the cruft that diligence will surface if you don't." },
    { label: "Documentation suite", detail: "Generated docs and diagrams that reflect what the code actually does — not what a stale README claims." },
    { label: "MCP server", detail: "Expose the analysis to your agents over MCP, so the tools writing code can see the same map you do." },
  ],
  scoreLabel: "Codebase health: 84 / 100   rule v1",
  scoreValue: "84/100 codebase health",
};

export default function LuxScopePage() {
  return <ToolLanding data={DATA} />;
}
