import { FEATURE_PUBLIC_REPOS } from "@/lib/features";

type RuleLine = { type: "rule"; label: string; score: string };
type CmdLine = { type: "cmd"; text: string };
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

const LUXSCOPE: ScoreBlock = {
  title: "luxscope v0.1",
  version: "rule v0.1.0",
  ariaLabel: "LuxScope Score for example codebase: 84 out of 100",
  caption: "LuxScope — codebase intelligence scanner. Sample run.",
  reportHref: "/reports/luxscope-sample.html",
  lines: [
    { type: "score", text: "LuxScope Score: 84 / 100   rule v0.1.0" },
    { type: "blank" },
    { type: "rule", label: "  Security          ", score: "92 / 100" },
    { type: "rule", label: "  Dead Code         ", score: "78 / 100" },
    { type: "rule", label: "  Dependency Health ", score: "88 / 100" },
    { type: "rule", label: "  Type Safety       ", score: "81 / 100" },
    { type: "rule", label: "  Documentation     ", score: "70 / 100" },
  ],
};

const SECGATE: ScoreBlock = {
  title: "secgate v0.2",
  version: "rule v1",
  ariaLabel: "Security Score for example repo: 62 out of 100",
  caption: "SecGate — security gate scanner. Sample run.",
  lines: [
    { type: "cmd", text: "$ npx @tinydarkforge/secgate" },
    { type: "score", text: "Security Score: 62 / 100   rule v1" },
    { type: "blank" },
    { type: "rule", label: "  Semgrep     ", score: "97 / 100" },
    { type: "rule", label: "  Gitleaks    ", score: "75 / 100" },
    { type: "rule", label: "  npm audit   ", score: "90 / 100" },
    { type: "rule", label: "  osv-scanner ", score: "100 / 100" },
    { type: "rule", label: "  Trivy       ", score: "62 / 100" },
  ],
};

function Terminal({ block }: { block: ScoreBlock }) {
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
            const scoreColor =
              numericScore >= 90
                ? "text-emerald-400"
                : numericScore >= 70
                ? "text-stel-amber"
                : "text-red-400";
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
    {block.reportHref && FEATURE_PUBLIC_REPOS && (
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
      aria-labelledby="scores-heading"
      className="relative bg-stel-bg border-t border-stel-border"
    >
      <div className="relative w-full max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 py-16 md:py-24">
        <div className="max-w-[680px] mb-10 md:mb-14">
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
            LuxFaber scores your web surface for AI agents. LuxScope scores your codebase. SecGate scores your security posture. Same scoring discipline, three different angles on the same buyer. Run any of them in 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <Terminal block={LUXSCOPE} />
          <Terminal block={SECGATE} />
        </div>
      </div>
    </section>
  );
}
