import type { Metadata } from "next";
import { ToolLanding, type ToolLandingData } from "@/components/landing/ToolLanding";

export const metadata: Metadata = {
  title: "LuxFaber — agent-readiness scanner (AEO) | Stelnyx",
  description:
    "LuxFaber scores any URL for AI-agent readiness: crawl access, structured data, semantic HTML, content clarity, and UA-cloaking determinism — with a prioritized fix list. Lighthouse for the agent web. Open source (Apache-2.0). Founder-led audit $699.",
  alternates: { canonical: "/luxfaber" },
  openGraph: {
    title: "LuxFaber — score your site for the agents already using it",
    description:
      "Agent-readiness scanner. Crawl access, structured data, semantic HTML, content clarity, UA-cloaking determinism — prioritized fixes. Open source. Audit $699.",
    type: "website",
    url: "https://stelnyx.com/luxfaber",
    siteName: "Stelnyx",
  },
};

const DATA: ToolLandingData = {
  slug: "luxfaber",
  name: "LuxFaber",
  eyebrow: "Agent readiness · Local-first · Deterministic",
  headline: "Score your site for the agents already using it.",
  intro:
    "ChatGPT shopping, Operator-style task completion, and Claude computer use already buy and act on sites that weren't built for them — and most quietly fail when they try. LuxFaber scores any URL across crawl access, structured data, semantic HTML, content clarity, and UA-cloaking determinism, and hands back a prioritized fix list. Think Lighthouse, but for AI-agent compatibility.",
  github: "https://github.com/tinydarkforge/luxfaber",
  auditName: "LuxFaber Audit",
  auditPrice: "$699",
  auditBlurb:
    "A senior engineer runs LuxFaber against your site and walks you through every finding on a call — then ships a PDF: agent-readiness score across every axis, the determinism diff (what GPTBot sees vs. a browser), prioritized fixes, and conversion-recovery framing. For CMOs, heads of growth, and ecommerce ops watching agent traffic leak.",
  body: [
    {
      heading: "Beyond citation — operability",
      paras: [
        "Most AEO tooling stops at citation readiness: whether your content gets quoted inside an answer. LuxFaber goes one rubric deeper — whether an agent that follows the open standards can actually operate on your site: traverse it, parse it, act on it.",
        "It analyzes any URL and scores agent-readability across a structured rubric, returning specific, actionable fixes — not vague recommendations. Runs as a CLI, a GitHub Action, or a hosted API. Wire it into your deploy pipeline to catch regressions before they cost you agent traffic.",
      ],
    },
    {
      heading: "Why it matters now",
      paras: [
        "Search engines sent you traffic because they could crawl you. AI agents work the same way — except the rules changed and most companies haven't noticed. The web is largely invisible to them: unstructured markup, JavaScript-rendered content, missing semantic signals, content cloaked from AI user agents.",
        "AEO (Answer Engine Optimization) is the term the market has settled on. Companies that optimize now will capture agent-driven traffic before competitors realize the channel exists — the same dynamic as early SEO, 2003–2006: the channel is real, best practices don't exist yet, and the first usable tooling captures the category.",
      ],
    },
    {
      heading: "Deterministic by design",
      paras: [
        "No LLMs in the scoring path. Same URL, same score, every time, with the rule version stamped on the result. That's what makes the report something you can act on and re-verify — and why \"rerun it yourself\" is the whole point.",
        "Stelnyx dogfoods it in public: stelnyx.com scores 91/100. Run it on your own site, or on a competitor's — most score 30–55.",
      ],
    },
  ],
  checks: [
    { label: "Crawl accessibility", detail: "robots.txt, sitemap, llms.txt, AI-bot allow rules, canonical — can an agent legitimately reach and index your pages at all?" },
    { label: "Structured data", detail: "JSON-LD, OpenGraph, schema.org coverage — the machine-readable scaffolding an agent leans on to understand what a page is." },
    { label: "Semantic HTML", detail: "Landmarks, heading hierarchy, alt coverage — whether the DOM actually conveys structure or just looks structured." },
    { label: "Content clarity", detail: "Signal-to-noise and boilerplate density — how much of the page is the answer versus chrome an agent has to wade through." },
    { label: "Determinism (UA-cloaking)", detail: "The diff between what a browser, LuxFaber, and GPTBot each receive — sites that hide content from AI agents score low here, on purpose." },
  ],
  scoreLabel: "Score: 91 / 100   AEO · rule v1",
  scoreValue: "91/100 agent-readiness",
};

export default function LuxFaberPage() {
  return <ToolLanding data={DATA} />;
}
