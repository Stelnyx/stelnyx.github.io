# LuxFaber Audit — {{CLIENT_NAME}}

**Site:** {{SITE_URL}}  (scanned pages: {{PAGES}})
**Prepared by:** Daniel Oceno · Stelnyx
**Date:** {{DATE}}
**Engagement:** LuxFaber Audit ($699) — agent-readiness (AEO), one-time, with a live debrief
**Confidential.** Prepared for {{CLIENT_NAME}}. No credentials or private data accessed — public-URL scan only. Scan artifacts deleted on {{ARTIFACT_DELETE_DATE}}.

---

## 1. Executive summary

> 3–5 sentences for a CMO / head of growth / founder. State the agent-readiness score, what it's costing in plain terms (which agents can't use the site and why), and the top fix. Frame as revenue, not markup.

- **Agent-readiness score:** {{SCORE}} / 100  (LuxFaber rule {{RULE_VERSION}})
- **Bottom line:** {{ONE_LINE_VERDICT}}
- **What's leaking:** {{WHAT_AGENTS_CANT_DO}}
- **First thing I'd fix:** {{TOP_RECOMMENDATION}}

| Score band | Meaning |
|---|---|
| 85–100 | Agent-ready. ChatGPT shopping, Operator-style agents, and crawlers can traverse and act. (Stripe/Linear tier.) |
| 70–84 | Mostly readable, some operability gaps. Fixable in days. |
| 50–69 | Agents struggle — content is there but hard to parse or partially hidden. |
| < 50 | Largely invisible to agents. The channel exists; you're not in it. |

## 2. Scope & methodology

- Tool: LuxFaber CLI, deterministic — no LLMs in the scoring path. Same URL, same score, with the rule version stamped on it.
- Command run: `luxfaber {{SITE_URL}}` (+ key sub-pages: {{PAGES}}).
- Five scored axes: crawl accessibility · structured data · semantic HTML · content clarity · determinism (UA-cloaking).
- Manual layer: I review every axis's findings, the determinism diff myself, and prioritize. The score is the machine's; the fix order and the revenue framing are mine.
- Not covered: server performance, Core Web Vitals (run PageSpeed for that), conversion-rate optimization for human users, paid-channel attribution.

## 3. Scorecard

| Axis | Score | One-line finding |
|---|---|---|
| Crawl accessibility | {{}} / 100 | {{}} |
| Structured data | {{}} / 100 | {{}} |
| Semantic HTML | {{}} / 100 | {{}} |
| Content clarity | {{}} / 100 | {{}} |
| Determinism (UA-cloaking) | {{}} / 100 | {{}} |
| **Overall** | **{{SCORE}} / 100** | |

## 4. Findings by axis

### 4.1 Crawl accessibility — {{SCORE}}/100
- `robots.txt`: {{present? blocks AI bots? which?}}
- `sitemap.xml`: {{}}
- `llms.txt`: {{present? accurate?}}
- AI-bot allow rules (GPTBot, ClaudeBot, PerplexityBot, etc.): {{}}
- Canonical tags / duplicate-URL hygiene: {{}}
- **Fix:** {{}}

### 4.2 Structured data — {{SCORE}}/100
- JSON-LD coverage (and which schema types): {{}}
- OpenGraph / Twitter cards: {{}}
- schema.org correctness (Product, Article, Organization, FAQ, Breadcrumb…): {{}}
- Missing structured data that an agent would expect for this kind of site: {{}}
- **Fix:** {{}}

### 4.3 Semantic HTML — {{SCORE}}/100
- Landmark regions (`header`, `nav`, `main`, `footer`): {{}}
- Heading hierarchy (one `h1`, no skipped levels): {{}}
- `alt` coverage on meaningful images: {{}}
- Content rendered client-side that an agent without JS won't see: {{}}
- **Fix:** {{}}

### 4.4 Content clarity — {{SCORE}}/100
- Signal-to-noise (answer vs. chrome/boilerplate): {{}}
- Boilerplate density / repeated nav cruft on every page: {{}}
- Is the page's primary claim in the first screenful of text, in plain prose? {{}}
- **Fix:** {{}}

### 4.5 Determinism (UA-cloaking) — {{SCORE}}/100

The diff between what each client receives for the same URL:

| Client | Status | Bytes / words delivered | Notable differences |
|---|---|---|---|
| Browser (Chromium UA) | {{}} | {{}} | baseline |
| LuxFaber (neutral UA) | {{}} | {{}} | {{}} |
| GPTBot UA | {{}} | {{}} | {{}} |

- Content hidden from AI user agents (intentionally or via CDN/WAF rules): {{}}
- **This is the one most sites fail without knowing.** **Fix:** {{}}

## 5. Prioritized fix list

| # | Fix | Axis | Why it matters (revenue framing) | Effort | Impact |
|---|---|---|---|---|---|
| 1 | {{}} | {{}} | {{}} | S | High |
| 2 | {{}} | {{}} | {{}} | S | High |
| 3 | {{}} | {{}} | {{}} | M | High |
| 4 | {{}} | {{}} | {{}} | M | Med |
| 5 | {{}} | {{}} | {{}} | L | Med |

**If you do only three things:** {{1}}, {{2}}, {{3}}.

## 6. Conversion-recovery framing

> Translate the score into the channel. Not "your JSON-LD is incomplete" — "when ChatGPT shopping tries to surface your product, it can't read the price, so it surfaces a competitor's." Estimate the exposure in the client's own terms (catalog size, traffic mix, category).

- Agent-driven discovery you're currently missing: {{}}
- Quick wins (score points per day of effort): {{}}
- The 90-day target: {{TARGET_SCORE}} — what it takes: {{}}

## 7. What continuous monitoring would catch

This is a snapshot; the score drifts every deploy (a CDN rule change can tank determinism overnight). Continuous monitoring across your domains, drift alerts, ARO score history, and a CI gate that fails the build on a regression — that's the LuxFaber Team tier (roadmap). For the next 30 days I'll re-scan {{SITE_URL}} once on request and send the diff at no extra cost: {{RESCAN_BY_DATE}}.

## 8. Live debrief

- Scheduled: {{CAL_LINK_OR_TIME}} ({{DURATION}} min)
- Bring: whoever owns the site/CMS and whoever owns growth.
- We'll walk §1, §4.5 (determinism), and §5. The rest is reference.

## Appendix A — raw scan output
- `luxfaber-{{CLIENT}}-{{DATE}}.json` (full deterministic report, per-axis breakdown, every finding)
- Determinism diff captures: {{}}

## Appendix B — how to reproduce this
```bash
# build LuxFaber from source (npm package shipping shortly):
git clone https://github.com/tinydarkforge/luxfaber && (cd luxfaber && pnpm i && pnpm build)
node luxfaber/packages/cli/dist/index.js {{SITE_URL}}
```
Deterministic — same URL, same score. Re-run it after you ship the fixes and watch the number move.
