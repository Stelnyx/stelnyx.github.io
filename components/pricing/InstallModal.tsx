"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ToolBlock {
  name: string;
  blurb: string;
  command: string;
  repo: string;
  discussions: string;
}

const TOOLS: ToolBlock[] = [
  {
    name: "LuxScope",
    blurb: "Codebase intelligence — change-impact risk, dependency drift, architecture map. Run it on any repo.",
    command: "npx @tinydarkforge/luxscope analyze . --format json",
    repo: "https://github.com/tinydarkforge/luxscope",
    discussions: "https://github.com/tinydarkforge/luxscope/discussions",
  },
  {
    name: "LuxFaber",
    blurb: "Agent-readiness score — crawl, structured data, semantic HTML, UA-cloaking determinism. Run it on any URL.",
    command: "npx @tinydarkforge/luxfaber https://stelnyx.com",
    repo: "https://github.com/tinydarkforge/luxfaber",
    discussions: "https://github.com/tinydarkforge/luxfaber/discussions",
  },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-[0.08em] border border-stel-border hover:border-stel-border-bright text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber"
      aria-label={copied ? "Copied" : "Copy command"}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function InstallModal({ isOpen, onClose }: InstallModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Get the CLI" wide>
      <p className="text-[14px] text-stel-text-muted leading-relaxed mb-6">
        Apache-2.0, no account, no telemetry. Needs Node 20+. Code never leaves your machine — the
        CLI runs entirely locally.
      </p>

      <div className="space-y-6">
        {TOOLS.map((t) => (
          <div key={t.name} className="rounded-lg border border-stel-border p-5">
            <h3 className="font-sans font-semibold text-[16px] text-stel-text-primary tracking-[-0.01em]">
              {t.name}
            </h3>
            <p className="text-[13px] text-stel-text-muted leading-relaxed mt-1 mb-3">{t.blurb}</p>
            <div className="flex items-center gap-2 rounded-md bg-stel-bg border border-stel-border px-3 py-2.5">
              <code className="flex-1 font-mono text-[12.5px] text-stel-text-primary overflow-x-auto whitespace-nowrap">
                {t.command}
              </code>
              <CopyButton value={t.command} />
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
              <a
                href={t.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber rounded-sm"
              >
                GitHub repo →
              </a>
              <a
                href={t.discussions}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber rounded-sm"
              >
                Ask a question →
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[12px] text-stel-text-faint mt-6">
        Want continuous monitoring, private-repo scans, or a senior-engineer read on the result? See
        the audit options under{" "}
        <a
          href="#pricing"
          onClick={onClose}
          className="text-stel-amber hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber rounded-sm"
        >
          Pricing
        </a>
        .
      </p>
    </Modal>
  );
}
