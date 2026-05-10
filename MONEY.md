# Why Stelnyx makes money

> Reusable narrative for partner decks, GitHub READMEs, founder DMs, investor follow-ups. Mirrors the gated `/preview/revenue` page on stelnyx.com. Pull what you need, leave the rest. All numbers grounded in the master plan (`stelyx.md`); comp valuations are public reports at the year stamped — refresh before quoting verbatim.

## Two ICPs, two budget owners, one backend

LuxScope sells to **CTOs / VPs of Engineering** — same buyer pattern as Snyk ($52/dev/mo), Sentry ($26/mo), CodeClimate ($20/dev/mo, retired). LuxFaber sells to **CMOs / Heads of Growth** — same pattern as Ahrefs ($99–$399/mo per domain). Two ICPs means two funnels, and marketing budgets are structurally larger than engineering-tooling budgets, so we capture that arbitrage instead of pricing the whole company against eng-only comps.

The **Stelnyx Team bundle ($299/mo)** anchors the decision: $199 + $249 = $448 standalone vs. $299 bundle = save $149/mo. Bundle converts single-tool intent into double-tool spend without doubling acquisition cost. One auth, one DB, one scanner queue: a `plan` column on the `subscriptions` table gates feature access. Pre-seed infra burden = small.

## Open-core: distribution is the moat, data is the revenue

The Free CLI is the funnel. Compare:

- **Snyk** — ~$7.4B private valuation (2022), built on a free OSS scanner.
- **GitLab** — IPO'd at ~$11B (2021), open core to public.
- **HashiCorp** — acquired by IBM at $6.4B (2024), source-available pivot survived and paid out.
- **Sentry** — ~$3B private valuation, open-core dev tooling.
- **Ahrefs** — $100M+ ARR in a category Google has been adjacent to for 20 years.

Distribution is what these companies have in common. The paid layer in every case is **accumulated data + interpretation over time**, not the scanner itself.

Stelnyx's paid layer is the same pattern: scan history, drift alerts, cross-repo architecture maps, hosted private-repo scans, the GitHub App + CI gate, and the **$499 / $799 senior-engineer audit interpretation**. The CLI runs free forever. The data layer and the interpretation are what scales.

## The audit is the cash machine while the SaaS bakes

One $499 audit grosses more in 90 minutes than 2.5 months of a $199 Team subscription. Six audits/mo at the bundle mix (~$549 avg) is **~$3.3K MRR-equivalent of audit revenue with zero infrastructure cost** — and every audit ships with a 30-day Team trial that converts at **10% / 25% / 40%** across our three scenarios. That's how the audit funds the SaaS without dilution: the founder bandwidth ceiling is ~8 audits/mo, which is exactly the runway needed to gate Phase 3 SaaS infra build until ≥3 paid audits + ≥10 trial-waitlist signups land.

**Trigger to hire**: $20K MRR, or 6+ audits/mo three months running with turnaround >7 days. Not before.

## The category window is 12–18 months

AI coding tools generate code several multiples faster than human review can absorb it. Two surfaces compound risk simultaneously:

1. **Opaque codebases nobody can fully reason about** — including the engineers shipping into them.
2. **Public web surfaces operated by AI agents** (ChatGPT shopping, Operator, Claude computer use) that most sites were never designed for.

SonarQube has 300K+ deployments matching known rule patterns. Nobody has built the deterministic, LLM-free, change-impact + agent-readiness vocabulary for the AI-built era. We are.

We hold one structural line: **no LLMs in the scoring path.** Same input, same score, every time, with the rule version stamped. Reproducibility is the wedge — the day we add LLMs to scoring, we lose what makes a report something a buyer or board can act on. SEO didn't die when Google added Lighthouse; Ahrefs is $100M+ ARR. Versioned-rule auditability + multi-vendor neutrality is the structural moat.

## Comparable economics

| Company | Pricing pattern we mirror | Signal |
|---|---|---|
| Snyk | Team $52/dev/mo | ~$7.4B private valuation (2022). Code-security adjacent. |
| Sentry | Team $26/mo | ~$3B private valuation. Open-core dev tooling. |
| SonarQube / Sonar | Per-LOC SaaS + on-prem | 300K+ deployments worldwide. Code-quality category leader. |
| CodeClimate | $20/dev/mo (retired) | Indie-tier WTP died — confirms why we killed Solo $29-79. |
| Ahrefs | Lite $99 / Std $199 / Adv $399 / mo | $100M+ ARR. Per-domain pricing, marketing-budget owner. |
| GitLab | Public co | ~$11B IPO valuation (2021). Open core to public. |
| HashiCorp | Public co → IBM | Acquired by IBM for $6.4B (2024). Source-available pivot survived + paid out. |

## 3-scenario revenue projections

All USD. Cumulative revenue at horizon. MRR / ARR is the run-rate on the last day of the horizon.

| Horizon | Pessimistic | Balanced (base case) | Optimistic |
|---|---|---|---|
| 30 days | $500 · 1 audit | $2,200 · 4 audits | $4,800 · 8 audits + 3 trials |
| 3 months | $2,700 + MRR $199 | $10,000 + MRR $1,250 | $22,000 + MRR $3,300 |
| 6 months | $10,200 + MRR $660 | $30,000 + MRR $3,120 | $55,000 + MRR $8,375 + 1 Org |
| 12 months | $25,000 · ARR $13K | $80,000 · ARR $78K | $200,000 · ARR $252K + 3 Org |
| 18 months | $45K · ARR $15K · lifestyle | $170K · ARR $125K · seed extension | $500K · ARR $440K · Series A target |
| 24 months | Acqui-hire $1–3M | Strategic acq. $5–12M | Series A $5–8M @ $25–40M val |

### Key assumptions

- **Audit mix**: P 100% single-tool ($499 avg) · B 70/30 single/full ($549 avg) · O 50/50 ($599 avg)
- **Team mix**: P 80% LuxScope ($220 avg) · B 50% bundle ($260 avg) · O 65% bundle ($275 avg)
- **Org pricing**: $1,500/mo avg first logos
- **Founder ceiling**: ~8 audits/mo solo; contractor needed above
- **Audit → Team conversion**: P 10% · B 25% · O 40%
- **Team churn**: P 8%/mo · B 4%/mo · O 2%/mo (biggest sensitivity at 18mo)
- **SAFE assumed**: $300K for return calc
- **Series A trigger**: $50–100K MRR or strategic-acq offer

## The honest framing

This is venture-adjacent, not venture-mandatory. Realistic outcome at the balanced scenario is **$1–2M ARR plus a strategic acquisition by Snyk, SonarSource, GitHub, or Vercel within 18–24 months for $5–12M**. Pre-seed ask is $300–500K because the category window is 12–18 months, not because the business needs $5M. If you want a 100x outcome, this isn't it. If you want a 10x outcome with strong category-capture defensibility, this fits.

## The ask

**Pre-seed SAFE: $300–500K, MFN, uncapped or reasonable floor.** 18-month runway → 10 audits booked, 3 enterprise CI logos, AEO category named in 2+ industry publications. Series A trigger at $50–100K MRR, or strategic acquisition. Realistic exit: $5–12M strategic acquisition by Snyk / SonarSource / GitHub / Vercel at $50–100K MRR, 18–24 months.

---

*Source: `stelyx.md` (master plan). Comp valuations are public reports at the year stamped; refresh before quoting verbatim. Projections are forward-looking — the 30-day / 3-month numbers are commitments, the 18 / 24-month numbers are scenarios.*
