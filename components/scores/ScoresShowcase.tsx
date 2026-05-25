import { FEATURE_PUBLIC_REPOS } from "@/lib/features";
import { PkgName } from "@/components/ui/PkgName";

type RuleLine = { type: "rule"; label: string; score: string };
type CmdLine = { type: "cmd"; text: string; pkg?: string };
type HeadLine = { type: "score"; text: string };
type BlankLine = { type: "blank" };
type Line = RuleLine | CmdLine | HeadLine | BlankLine;

interface ScoreBlock {
  title: string;
  version: string;
  ariaLabel: string;
  caption: string;
  lines: Line[];
  reportHref?: string;
}

export const SECGATE: ScoreBlock = {
  title: "secgate v0.2.13",
  version: "rule v1",
  ariaLabel: "SecGate status for express-pin: FAIL, risk 365 across 5 scanners",
  caption: "SecGate — deterministic security gate. Same inputs → same score, every run. Run against express-pin.",
  reportHref: "/reports/secgate.html",
  lines: [
    { type: "cmd", text: "$ npx @stelnyx/secgate express-pin", pkg: "@stelnyx/secgate" },
    { type: "score", text: "Status: FAIL · Risk 365 · rule v1" },
    { type: "blank" },
    { type: "rule", label: "  Semgrep     ", score: "43 findings" },
    { type: "rule", label: "  Gitleaks    ", score: "0 findings" },
    { type: "rule", label: "  npm audit   ", score: "0 findings" },
    { type: "rule", label: "  osv-scanner ", score: "0 findings" },
    { type: "rule", label: "  Trivy       ", score: "0 findings" },
  ],
};

export const APIGATE: ScoreBlock = {
  title: "apigate v0.3.0",
  version: "rubric v1",
  ariaLabel: "ApiGate API auth posture score for express-pin: 50 out of 100, FAIL",
  caption: "ApiGate — static API surface auditor. Run against express-pin.",
  reportHref: "/reports/apigate.html",
  lines: [
    { type: "cmd", text: "$ npx @stelnyx/apigate express-pin", pkg: "@stelnyx/apigate" },
    { type: "score", text: "Headline: 50 / 100   FAIL   rubric v1" },
    { type: "blank" },
    { type: "rule", label: "  Inventory       ", score: "100 / 100" },
    { type: "rule", label: "  Auth Coverage   ", score: "0 / 100" },
    { type: "rule", label: "  Open Risk       ", score: "0 / 100" },
    { type: "rule", label: "  Spec Drift      ", score: "n/a" },
    { type: "rule", label: "  Determinism     ", score: "100 / 100" },
  ],
};

export function Terminal({ block }: { block: ScoreBlock }) {
  return (
    <div>
    <figure
      className="m-0"
      role="img"
      aria-label={block.ariaLabel}
    >
      <figcaption className="sr-only">{block.caption}</figcaption>
      <div
        className="rounded-lg border border-stel-border bg-stel-surface overflow-hidden"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-stel-border">
          <span className="font-mono text-stel-text-faint" style={{ fontSize: "11px" }}>
            terminal
          </span>
          <span className="ml-auto font-mono text-stel-text-faint" style={{ fontSize: "11px" }}>
            {block.title}
          </span>
        </div>
        <div
          className="px-5 py-5 space-y-1"
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "13px",
            lineHeight: "1.7",
          }}
        >
          {block.lines.map((line, i) => {
            if (line.type === "blank") {
              return <div key={i} className="h-1" />;
            }
            if (line.type === "cmd") {
              if (!FEATURE_PUBLIC_REPOS) return null;
              if (line.pkg && line.text.includes(line.pkg)) {
                const [before, after] = line.text.split(line.pkg);
                return (
                  <div key={i} className="text-stel-text-muted">
                    {before}
                    <PkgName text={line.pkg} />
                    {after}
                  </div>
                );
              }
              return (
                <div key={i} className="text-stel-text-muted">
                  {line.text}
                </div>
              );
            }
            if (line.type === "score") {
              return (
                <div key={i} className="text-stel-text-primary font-semibold">
                  {line.text}
                </div>
              );
            }
            const numericScore = parseInt(line.score, 10);
            const isNumeric = !Number.isNaN(numericScore);
            const isFindings = /finding/i.test(line.score);
            const cleanLike = /^(clean|pass|ok)$/i.test(line.score);
            const scoreColor = isFindings
              ? numericScore === 0
                ? "text-emerald-400"
                : "text-stel-amber"
              : isNumeric
              ? numericScore >= 90
                ? "text-emerald-400"
                : numericScore >= 70
                ? "text-stel-amber"
                : "text-red-400"
              : cleanLike
              ? "text-emerald-400"
              : "text-stel-amber";
            return (
              <div key={i} className="flex items-center justify-between gap-8">
                <span className="text-stel-text-muted whitespace-pre">{line.label}</span>
                <span className={scoreColor}>{line.score}</span>
              </div>
            );
          })}
        </div>
      </div>
    </figure>
    {block.reportHref && (
      <div className="mt-3 flex items-center justify-between gap-3 text-[12px] text-stel-text-faint">
        <span>Score is the headline. Report ships findings, fix order, ETAs.</span>
        <a
          href={block.reportHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stel-text-muted hover:text-stel-text-primary underline-offset-2 hover:underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm"
        >
          View sample report →
        </a>
      </div>
    )}
    </div>
  );
}

export function ScoresShowcase() {
  return (
    <section
      id="reports"
      aria-labelledby="scores-heading"
      className="relative bg-stel-bg border-t border-stel-border scroll-mt-20"
    >
      <div className="relative w-full max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 py-16 md:py-24">
        <div className="max-w-[720px] mb-10 md:mb-14">
          <h2
            id="scores-heading"
            className="text-stel-text-primary font-semibold tracking-[-0.03em] leading-[1.1] text-balance"
            style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
          >
            One pattern. Three surfaces. Three deterministic scores.
          </h2>
          <p
            className="text-stel-text-muted mt-4 leading-[1.7] text-balance"
            style={{ fontSize: "16px" }}
          >
            LuxScope is in the hero above — same pattern, applied to your codebase. SecGate scores your security posture. ApiGate scores your API auth surface. Same scoring discipline. Run any of them in 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <Terminal block={SECGATE} />
          <Terminal block={APIGATE} />
        </div>
      </div>
    </section>
  );
}
