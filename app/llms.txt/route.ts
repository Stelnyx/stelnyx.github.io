// Flag-gated /llms.txt. Static export pre-renders to out/llms.txt at build.
// Toggle via NEXT_PUBLIC_FEATURE_PUBLIC_REPOS = rebuild + redeploy.
// Original full content backed up at public/llms.full.txt.bak — keep in sync.
import { FEATURE_PUBLIC_REPOS } from "@/lib/features";

export const dynamic = "force-static";

const FULL = `# Stelnyx

> Stelnyx ships deterministic engineering intelligence for AI-built systems. Two open-source scanners: LuxScope reads your codebase (change-impact risk, dependency drift, architecture maps, generated docs); LuxFaber reads your agent surface (crawl access, structured data, semantic HTML, content clarity, UA-cloaking determinism). Both local-first, both LLM-free in the scoring path, both versioned. Free CLI forever; founder-led audits for teams who need a senior engineer's read on the result. Part of the Stelnyx open-source umbrella.

The Stelnyx tools are local-first, deterministic, and designed to be run by humans or by AI agents on a developer's behalf. Same input, same score, every time.

## Core scanners

- [LuxScope](https://github.com/Stelnyx/LuxScope): Deterministic codebase intelligence. Polyglot AST static analysis across an entire repo — dependency graphs, module ownership, dead-code detection, risk-scored change impact, code-derived diagrams, documentation that reflects what the code actually does. No LLM in the analysis loop, no network calls, runs locally. For the buyer who must change a system they don't fully understand — inherited code, AI-generated code, acquisition diligence. Apache-2.0.
- [LuxFaber](https://github.com/Stelnyx/LuxFaber): Agent-readiness scanner — "Lighthouse for the agent web." Scores any URL across crawl accessibility (robots.txt, sitemap, llms.txt, AI-bot allow rules, canonical), structured data (JSON-LD, OpenGraph, schema.org), semantic HTML (landmarks, heading hierarchy, alt coverage), content clarity (signal:noise), and determinism (UA-cloaking diff between a browser, LuxFaber, and GPTBot). Prioritized, actionable fix list. Apache-2.0.

## Founder-led audits

A senior engineer runs the scanner against your repo or site and walks you through every finding on a video call, then delivers a PDF report you can hand to a buyer, board, or due-diligence team. LuxScope Audit $499 · LuxFaber Audit $499 · Stelnyx Full Audit (both) $799. For founders, acquisition prep, and VC technical diligence. (Subscription Team and Org tiers are on the roadmap, not yet shippable.)

## Other Stelnyx open-source tools

- [SecGate](https://github.com/Stelnyx/SecGate): One command runs Semgrep, Gitleaks, osv-scanner, Trivy, and npm audit, normalizes findings, fails the pipeline on CRITICAL or HIGH. MIT. Published to npm as \`@tinydarkforge/secgate\`.
- [Arbiter](https://github.com/Stelnyx/Arbiter): Sub-5ms agent guard layer — limits, schema validation, tool allowlists, cost tracking, loop detection. No LLM. MIT. Published to npm as \`@tinydarkforge/arbiter\`.
- [Engram](https://github.com/Stelnyx/Engram): Memory ledger for AI systems with confidence scoring and MCP support. MIT.
- [Intake](https://github.com/Stelnyx/Intake): Paste anything (Slack thread, bug report) and get a structured GitHub issue via local Ollama. MIT.

## Concepts

- Deterministic, not generative: Stelnyx does not put LLMs in the scoring path. Same input, same score, reproducible. That is the wedge.
- AEO beyond citation: AEO (Answer Engine Optimization) is the consensus term for getting cited inside AI answers. LuxFaber goes one rubric deeper — agent operability: whether an agent that follows the open standards can actually act on a site, not just quote it.
- Dogfooded in public: stelnyx.com scores 91/100 agent-readiness (LuxFaber) and 84/100 codebase health (LuxScope).

## Status

Pre-seed, pre-revenue as of 2026-05. Working scanners, dated category claim, dogfood scores. Forward-looking subscription pricing (Team, Org) is roadmap, not current product.

## Contact

- Site: https://stelnyx.com
- Pricing & audit requests: https://stelnyx.com/#pricing
- GitHub (Stelnyx org): https://github.com/Stelnyx
- Built by Daniel Oceno.

## License

The Stelnyx open-source tools are MIT or Apache-2.0 (see each repo). The Stelnyx marketing site and this llms.txt are released for fair use with attribution.
`;

const STUB = `# Stelnyx

Site is under construction. Public product pages and pricing are not yet available.

Contact: hello@stelnyx.com
`;

export function GET() {
  return new Response(FEATURE_PUBLIC_REPOS ? FULL : STUB, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
