import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FEATURE_PRICING } from "@/lib/features";
// Note: /preview/* pages share the Cloudflare Access PIN gate + noindex,nofollow (set in app/preview/layout.tsx).

export const metadata: Metadata = {
  title: "Stelnyx — revenue model & projections (preview)",
  description:
    "Internal preview: why Stelnyx makes money, the 3-scenario revenue model (pessimistic / balanced / optimistic), and the assumptions behind each. Not public.",
  robots: { index: false, follow: false },
};

interface Row {
  horizon: string;
  pessimistic: string;
  balanced: string;
  optimistic: string;
}

const PROJECTIONS: Row[] = [
  { horizon: "30 days", pessimistic: "$500 · 1 audit", balanced: "$2,200 · 4 audits", optimistic: "$4,800 · 8 audits + 3 trials" },
  { horizon: "3 months", pessimistic: "$2,700 + MRR $199", balanced: "$10,000 + MRR $1,250", optimistic: "$22,000 + MRR $3,300" },
  { horizon: "6 months", pessimistic: "$10,200 + MRR $660", balanced: "$30,000 + MRR $3,120", optimistic: "$55,000 + MRR $8,375 + 1 Org" },
  { horizon: "12 months", pessimistic: "$25,000 · ARR $13K", balanced: "$80,000 · ARR $78K", optimistic: "$200,000 · ARR $252K + 3 Org" },
  { horizon: "18 months", pessimistic: "$45K · ARR $15K · lifestyle", balanced: "$170K · ARR $125K · seed extension", optimistic: "$500K · ARR $440K · Series A target" },
  { horizon: "24 months", pessimistic: "Acqui-hire $1–3M", balanced: "Strategic acq. $5–12M", optimistic: "Series A $5–8M @ $25–40M val" },
];

interface Comp {
  name: string;
  pricing: string;
  signal: string;
}

const COMPS: Comp[] = [
  { name: "Snyk", pricing: "Team $52/dev/mo", signal: "Reached ~$7.4B private valuation (2022). Code-security adjacent." },
  { name: "Sentry", pricing: "Team $26/mo", signal: "~$3B private valuation. Open-core dev-tooling." },
  { name: "SonarQube / Sonar", pricing: "Per-LOC SaaS + on-prem", signal: "300K+ deployments worldwide. Code-quality category leader." },
  { name: "CodeClimate", pricing: "$20/dev/mo (now retired)", signal: "Indie-tier WTP died — confirms why we killed Solo $29-79." },
  { name: "Ahrefs", pricing: "Lite $99 / Std $199 / Adv $399 / mo", signal: "$100M+ ARR. Per-domain pricing, marketing-budget owner." },
  { name: "GitLab", pricing: "Public co", signal: "~$11B IPO valuation (2021). Open-core to public." },
  { name: "HashiCorp", pricing: "Public co → IBM", signal: "Acquired by IBM for $6.4B (2024). Source-available pivot survived + paid out." },
];

export default function RevenuePreviewPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <div className="bg-stel-amber/10 border-b border-stel-amber/30">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 py-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <Link
              href="/preview"
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber hover:text-amber-300 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber rounded-sm"
            >
              ← Investor home
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber">
              Preview · not public · forward-looking
            </p>
            <Link
              href="/preview/saas"
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber hover:text-amber-300 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber rounded-sm"
            >
              See full hybrid pricing →
            </Link>
          </div>
        </div>

        {/* Header */}
        <section className="bg-stel-bg border-b border-stel-border py-14 md:py-20">
          <div className="max-w-[1080px] mx-auto px-6 md:px-12 xl:px-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stel-amber mb-4">
              Stelnyx · revenue model
            </p>
            <h1
              className="text-stel-text-primary font-semibold tracking-[-0.04em] leading-[1.05] text-balance"
              style={{ fontSize: "clamp(34px, 4.6vw, 54px)" }}
            >
              Why this makes money — and how much, by when.
            </h1>

            {/* Dogfood proof — live, verifiable in 60s */}
            <div className="mt-8 rounded-xl border border-stel-amber/40 bg-stel-surface p-6 md:p-7 shadow-[0_2px_24px_rgba(245,158,11,0.06)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-3">
                Live proof — verify in 60 seconds
              </p>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  <div>
                    <div className="font-sans font-semibold text-stel-text-primary tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 3.4vw, 36px)" }}>
                      91 / 100
                    </div>
                    <p className="text-[12px] text-stel-text-muted mt-0.5">Agent-readiness (LuxFaber)</p>
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-stel-text-primary tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 3.4vw, 36px)" }}>
                      84 / 100
                    </div>
                    <p className="text-[12px] text-stel-text-muted mt-0.5">Codebase health (LuxScope)</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 md:gap-2">
                  <a
                    href="https://stelnyx.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-stel-amber text-stel-bg font-semibold px-4 py-2.5 rounded-md text-[13px] hover:bg-amber-400 transition-colors duration-150"
                  >
                    See live score →
                  </a>
                  <a
                    href="/reports/luxfaber.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-stel-text-primary border border-stel-border px-4 py-2.5 rounded-md text-[13px] font-medium hover:border-stel-border-bright transition-colors duration-150"
                  >
                    Full sample report →
                  </a>
                </div>
              </div>
              <p className="text-[12px] text-stel-text-faint mt-4">
                Stelnyx scores itself in public. Same scoring path the audits ship. Deterministic — same URL same score, every time.
              </p>
            </div>

            {/* State of product — what exists vs not */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-lg border border-stel-border bg-stel-surface p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-emerald-400 mb-1.5">Shipped</p>
                <p className="text-[13px] text-stel-text-primary leading-snug">
                  Both CLIs run locally · dogfood scores live · audit deliverable templates
                </p>
              </div>
              <div className="rounded-lg border border-stel-border bg-stel-surface p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-red-400 mb-1.5">Not shipped</p>
                <p className="text-[13px] text-stel-text-primary leading-snug">
                  No auth, no Stripe, no SaaS infra · Team / Org tiers are roadmap
                </p>
              </div>
              <div className="rounded-lg border border-stel-border bg-stel-surface p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-stel-amber mb-1.5">30-day trip-wire</p>
                <p className="text-[13px] text-stel-text-primary leading-snug">
                  ≥3 paid audits + ≥10 trial-waitlist signups · else pivot
                </p>
              </div>
              <div className="rounded-lg border border-stel-border bg-stel-surface p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-stel-text-faint mb-1.5">Updated</p>
                <p className="text-[13px] text-stel-text-primary leading-snug">
                  2026-05-10 · numbers pulled from <code className="font-mono text-[12px]">stelyx.md</code>
                </p>
              </div>
            </div>

            <p className="text-stel-text-muted mt-8 leading-[1.7] max-w-[720px]" style={{ fontSize: "17px" }}>
              Three scenarios, the assumptions behind each, and the comparable category economics that
              put a floor under the model. Pre-seed, pre-revenue, dated category claim, working
              scanners.
            </p>
          </div>
        </section>

        {/* Why this makes money */}
        <section className="bg-stel-bg py-14 md:py-20">
          <div className="max-w-[820px] mx-auto px-6 md:px-12 xl:px-20 space-y-10">

            <div>
              <h2 className="text-stel-text-primary font-semibold tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
                Two ICPs, two budget owners, one backend
              </h2>
              <p className="text-[16px] text-stel-text-muted leading-[1.75] mb-3">
                LuxScope sells to <span className="text-stel-text-primary">CTOs / VPs of Engineering</span>:
                same buyer pattern as Snyk ($52/dev/mo), Sentry ($26/mo), CodeClimate ($20/dev/mo).
                LuxFaber sells to <span className="text-stel-text-primary">CMOs / Heads of Growth</span>:
                same pattern as Ahrefs ($99–$399/mo per domain). Two ICPs means two funnels — and
                marketing budgets are structurally larger than engineering-tooling budgets, so we capture
                that arbitrage instead of pricing the whole company against eng-only comps.
              </p>
              <p className="text-[16px] text-stel-text-muted leading-[1.75]">
                The <span className="text-stel-text-primary">Stelnyx Team bundle ($299/mo)</span> anchors
                the decision — $199 + $249 = $448 standalone vs. $299 bundle = save $149/mo. The bundle
                converts single-tool intent into double-tool spend without doubling our acquisition cost.
                One auth, one DB, one scanner queue: a <code className="font-mono text-stel-text-primary text-[14px]">plan</code>{" "}
                column on the <code className="font-mono text-stel-text-primary text-[14px]">subscriptions</code>{" "}
                table gates feature access. Pre-seed infra burden = small.
              </p>
            </div>

            <div>
              <h2 className="text-stel-text-primary font-semibold tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
                Open-core: distribution is the moat, data is the revenue
              </h2>
              <p className="text-[16px] text-stel-text-muted leading-[1.75] mb-3">
                The Free CLI is the funnel. <span className="text-stel-text-primary">Snyk</span> built
                a ~$7.4B private valuation (2022) on top of a free OSS scanner.{" "}
                <span className="text-stel-text-primary">GitLab</span> IPO&apos;d at ~$11B (2021) on open core.{" "}
                <span className="text-stel-text-primary">HashiCorp</span> exited to IBM at $6.4B (2024)
                after a source-available pivot. <span className="text-stel-text-primary">Ahrefs</span>{" "}
                runs $100M+ ARR in a category Google has been adjacent to for 20 years. Distribution is
                what these companies have in common; the paid layer in every case is{" "}
                <span className="text-stel-text-primary">accumulated data + interpretation over time</span>,
                not the scanner itself.
              </p>
              <p className="text-[16px] text-stel-text-muted leading-[1.75]">
                Stelnyx&apos;s paid layer is the same pattern: <span className="text-stel-text-primary">scan
                history, drift alerts, cross-repo architecture maps, hosted private-repo scans, the GitHub
                App + CI gate, and the $499 / $699 / $799 senior-engineer audit interpretation</span>. The CLI runs
                free forever. The data layer and the interpretation are what scales.
              </p>
            </div>

            <div>
              <h2 className="text-stel-text-primary font-semibold tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
                The audit is the cash machine while the SaaS bakes
              </h2>
              <p className="text-[16px] text-stel-text-muted leading-[1.75] mb-3">
                One $499 audit grosses more in 90 minutes than 2.5 months of a $199 Team subscription.
                Six audits/mo at the balanced mix (~$659 avg) is{" "}
                <span className="text-stel-text-primary">~$4K MRR-equivalent of audit revenue</span>{" "}
                with zero infrastructure cost — and every audit ships with a{" "}
                <span className="text-stel-text-primary">30-day follow-up scan + findings diff</span>{" "}
                that shows the buyer what continuous monitoring would catch. While Team is roadmap, the
                follow-up scan is the trial-equivalent that primes the{" "}
                <span className="text-stel-text-primary">10% / 25% / 40% audit-to-Team conversion</span>{" "}
                the model assumes once Phase 3 ships. That&apos;s how the audit funds the SaaS without
                dilution: founder bandwidth ceiling ~8 audits/mo, which is exactly the runway needed to
                gate Phase 3 infra build until ≥3 paid audits + ≥10 trial-waitlist signups land.
              </p>
              <p className="text-[16px] text-stel-text-muted leading-[1.75]">
                <span className="text-stel-text-primary">Trigger to hire</span>: $20K MRR or 6+
                audits/mo three months running with turnaround &gt;7 days. Not before.
              </p>
            </div>

            <div>
              <h2 className="text-stel-text-primary font-semibold tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
                The category window is 12–18 months
              </h2>
              <p className="text-[16px] text-stel-text-muted leading-[1.75] mb-3">
                AI coding tools generate code several multiples faster than human review can absorb it.
                Two surfaces compound risk simultaneously: (1) opaque codebases nobody can fully reason
                about — including the engineers shipping into them, and (2) public web surfaces being
                operated by AI agents (ChatGPT shopping, Operator, Claude computer use) that most sites
                were never designed for. <span className="text-stel-text-primary">SonarQube has 300K+
                deployments</span> matching known rule patterns. Nobody has built the deterministic,
                LLM-free, change-impact + agent-readiness vocabulary for the AI-built era. We are.
              </p>
              <p className="text-[16px] text-stel-text-muted leading-[1.75]">
                We hold one structural line: <span className="text-stel-text-primary">no LLMs in the
                scoring path</span>. Same input, same score, every time, with the rule version stamped.
                Reproducibility is the wedge — the day we add LLMs to scoring, we lose what makes a
                report something a buyer or board can act on. SEO didn&apos;t die when Google added
                Lighthouse; Ahrefs is $100M+ ARR. Versioned-rule auditability + multi-vendor neutrality
                is the structural moat.
              </p>
            </div>

            <div>
              <h2 className="text-stel-text-primary font-semibold tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
                The honest framing
              </h2>
              <p className="text-[16px] text-stel-text-muted leading-[1.75]">
                This is venture-adjacent, not venture-mandatory. Realistic outcome at the balanced
                scenario is <span className="text-stel-text-primary">$1–2M ARR plus a strategic
                acquisition by Snyk, SonarSource, GitHub, or Vercel within 18–24 months for $5–12M</span>.
                Pre-seed ask is $300–500K because the category window is 12–18 months, not because the
                business needs $5M. If you want a 100x outcome, this isn&apos;t it. If you want a 10x
                outcome with strong category-capture defensibility, this fits.
              </p>
            </div>

          </div>
        </section>

        {/* Comps */}
        {FEATURE_PRICING && (
          <section className="bg-stel-bg border-t border-stel-border py-14 md:py-20">
            <div className="max-w-[1080px] mx-auto px-6 md:px-12 xl:px-20">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-2">Category economics</p>
              <h2 className="text-stel-text-primary font-semibold tracking-[-0.02em] mb-2" style={{ fontSize: "clamp(22px, 3vw, 30px)" }}>
                Public comps that put a floor under the model
              </h2>
              <p className="text-[14px] text-stel-text-muted mb-8 max-w-[720px]">
                Pricing comparables drive the SKU floors; valuation comparables put a floor under the exit
                math. Numbers below are public reports at the dates noted; dollar figures rounded.
              </p>
              <div className="overflow-x-auto rounded-xl border border-stel-border">
                <table className="w-full text-[14px]">
                  <thead className="bg-stel-surface text-stel-text-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">Company</th>
                      <th className="text-left px-4 py-3 font-medium">Pricing pattern we mirror</th>
                      <th className="text-left px-4 py-3 font-medium">Signal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPS.map((c, i) => (
                      <tr key={c.name} className={i % 2 === 0 ? "bg-stel-bg" : "bg-stel-surface/40"}>
                        <td className="px-4 py-3 text-stel-text-primary font-medium">{c.name}</td>
                        <td className="px-4 py-3 text-stel-text-muted">{c.pricing}</td>
                        <td className="px-4 py-3 text-stel-text-muted">{c.signal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Projections */}
        <section className="bg-stel-bg border-t border-stel-border py-14 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-2">3-scenario projections</p>
            <h2 className="text-stel-text-primary font-semibold tracking-[-0.02em] mb-2" style={{ fontSize: "clamp(22px, 3vw, 30px)" }}>
              Cumulative revenue + MRR / ARR run-rate at horizon
            </h2>
            <p className="text-[14px] text-stel-text-muted mb-6 max-w-[720px]">
              All USD. Cumulative revenue at horizon. MRR / ARR is the run-rate on the last day of the
              horizon. Assumptions and conversion math below the table.
            </p>

            {/* Unit economics — anchor what makes the table credible */}
            <div className="mb-8 rounded-xl border border-stel-border bg-stel-surface p-5 md:p-6 max-w-[1080px]">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-3">
                The unit that compounds
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                <div>
                  <div className="font-sans font-semibold text-stel-text-primary tracking-[-0.02em]" style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}>$499</div>
                  <p className="text-[12px] text-stel-text-muted mt-0.5">One audit price (LuxScope · floor)</p>
                </div>
                <div>
                  <div className="font-sans font-semibold text-stel-text-primary tracking-[-0.02em]" style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}>90 min</div>
                  <p className="text-[12px] text-stel-text-muted mt-0.5">Founder time per audit</p>
                </div>
                <div>
                  <div className="font-sans font-semibold text-stel-text-primary tracking-[-0.02em]" style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}>$0</div>
                  <p className="text-[12px] text-stel-text-muted mt-0.5">Infrastructure cost</p>
                </div>
                <div>
                  <div className="font-sans font-semibold text-stel-text-primary tracking-[-0.02em]" style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}>100%</div>
                  <p className="text-[12px] text-stel-text-muted mt-0.5">Gross margin on audit</p>
                </div>
              </div>
              <p className="text-[14px] text-stel-text-muted leading-[1.7] mt-5">
                The 30-day balanced row below is <span className="text-stel-text-primary">4 invoices and 4 calendar blocks</span> —
                not a sales pipeline to forecast. Each audit ships a follow-up scan that primes the 25%
                audit-to-Team conversion once Phase 3 infra ships. Founder ceiling is ~8 audits/mo, which is
                the runway gate before infra build starts. The table compounds from there.
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-stel-border">
              <table className="w-full text-[13.5px]">
                <thead className="bg-stel-surface text-stel-text-muted">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium w-[110px]">Horizon</th>
                    <th className="text-left px-4 py-3 font-medium">Pessimistic</th>
                    <th className="text-left px-4 py-3 font-medium">Balanced <span className="text-stel-amber">(base case)</span></th>
                    <th className="text-left px-4 py-3 font-medium">Optimistic</th>
                  </tr>
                </thead>
                <tbody>
                  {PROJECTIONS.map((r, i) => (
                    <tr key={r.horizon} className={i % 2 === 0 ? "bg-stel-bg" : "bg-stel-surface/40"}>
                      <td className="px-4 py-3 text-stel-text-primary font-mono text-[12.5px]">{r.horizon}</td>
                      <td className="px-4 py-3 text-stel-text-muted">{r.pessimistic}</td>
                      <td className="px-4 py-3 text-stel-text-muted">{r.balanced}</td>
                      <td className="px-4 py-3 text-stel-text-muted">{r.optimistic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-[14px] text-stel-text-muted leading-relaxed max-w-[1080px]">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber col-span-full mb-1">Key assumptions</p>
              <p><span className="text-stel-text-primary">Audit mix:</span> P 100% single-tool (~$599 avg, weighted LuxScope $499 + LuxFaber $699) · B 70/30 single/full (~$659 avg) · O 50/50 single/full (~$699 avg)</p>
              <p><span className="text-stel-text-primary">Team mix:</span> P 80% LuxScope ($220 avg) · B 50% bundle ($260 avg) · O 65% bundle ($275 avg)</p>
              <p><span className="text-stel-text-primary">Org pricing:</span> $1,500/mo avg first logos</p>
              <p><span className="text-stel-text-primary">Founder ceiling:</span> ~8 audits/mo solo; contractor needed above</p>
              <p><span className="text-stel-text-primary">Audit → Team conversion:</span> P 10% · B 25% · O 40%</p>
              <p><span className="text-stel-text-primary">Team churn:</span> P 8%/mo · B 4%/mo · O 2%/mo (biggest sensitivity at 18mo)</p>
              <p><span className="text-stel-text-primary">SAFE assumed:</span> $300K for return calc</p>
              <p><span className="text-stel-text-primary">Series A trigger:</span> $50–100K MRR or strategic-acq offer</p>
            </div>
          </div>
        </section>

        {/* The ask */}
        <section className="bg-stel-bg border-t border-stel-border py-14 md:py-20">
          <div className="max-w-[820px] mx-auto px-6 md:px-12 xl:px-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-2">The ask</p>
            <h2 className="text-stel-text-primary font-semibold tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
              Pre-seed SAFE: $300–500K, MFN, uncapped or reasonable floor.
            </h2>
            <p className="text-[16px] text-stel-text-muted leading-[1.75]">
              18-month runway → 10 audits booked, 3 enterprise CI logos, AEO category named in 2+
              industry publications. Series A trigger at $50–100K MRR, or strategic acquisition.
              Realistic exit: <span className="text-stel-text-primary">$5–12M strategic acquisition by
              Snyk / SonarSource / GitHub / Vercel</span> at $50–100K MRR, 18–24 months.
            </p>

            {/* CTA — book a call */}
            <div className="mt-10 rounded-xl border border-stel-amber/40 bg-stel-surface p-6 md:p-7 shadow-[0_2px_24px_rgba(245,158,11,0.06)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-2">
                Next step
              </p>
              <h3 className="text-stel-text-primary font-semibold tracking-[-0.02em] mb-2" style={{ fontSize: "clamp(18px, 2.2vw, 22px)" }}>
                Read it. Want a 20-min call?
              </h3>
              <p className="text-[14px] text-stel-text-muted leading-relaxed mb-5">
                I&apos;ll walk through the model, answer the un-asked questions, and show the scanners running live. Reply to the email I sent you, or email me directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:daniel.oceno@gmail.com?subject=Stelnyx%20%E2%80%94%2020-min%20investor%20call&body=Hi%20Daniel%2C%0A%0ARead%20the%20revenue%20preview.%20Want%20to%20book%2020%20min%20to%20walk%20through%20it.%0A%0A%5Byour%20availability%5D%0A"
                  className="inline-flex items-center justify-center bg-stel-amber text-stel-bg font-semibold px-5 py-3 rounded-md text-[14px] hover:bg-amber-400 transition-colors duration-150"
                  style={{ minHeight: "44px" }}
                >
                  Book 20-min call →
                </a>
                <a
                  href="mailto:daniel.oceno@gmail.com?subject=Stelnyx%20%E2%80%94%20question"
                  className="inline-flex items-center justify-center text-stel-text-primary border border-stel-border px-5 py-3 rounded-md text-[14px] font-medium hover:border-stel-border-bright transition-colors duration-150"
                  style={{ minHeight: "44px" }}
                >
                  Send a question →
                </a>
              </div>
              <p className="text-[12px] text-stel-text-faint mt-4">
                Daniel Oceno · daniel.oceno@gmail.com · founder, sole IC
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-stel-border bg-stel-surface p-5 text-[13.5px] text-stel-text-faint">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-amber mb-2">Source notes</p>
              <p>
                Numbers are pulled from <code className="font-mono text-stel-text-muted">stelyx.md</code>{" "}
                (the master plan, single source of truth). Comp valuations are public reports at the
                year stamped — they will move; refresh before quoting verbatim. AEO traction targets are
                30-day commitments, not back-tested. SaaS infra burden is gated to Phase 3 — see the
                phase plan in the master doc.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
