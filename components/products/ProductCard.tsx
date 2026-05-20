import Link from "next/link";
import { FEATURE_PUBLIC_REPOS } from "@/lib/features";

export type BadgeType =
  | "Security"
  | "API Surface"
  | "Codebase Intel"
  | "Agent Readiness"
  | "Issue Forge"
  | "Memory Layer"
  | "Agent Guard";

export interface AudienceContent {
  dev: string;
  ceo: string;
  investor: string;
}

export interface Product {
  name: string;
  tagline: string;
  description: string;
  badge: BadgeType;
  license?: "MIT" | "Apache-2.0";
  stack?: string[];
  status?: string;
  npm?: string;
  github?: string;
  audit?: { price: string; href: string };
  audiences?: AudienceContent;
  tier?: "lux" | "tool";
  cli?: string;
  /** Internal landing page route, e.g. "/luxscope". When set, card renders a "Full page →" link. */
  page?: string;
  /** Format-anchored sample stats line, e.g. "Sample: 82/100 · 149 files · 399 findings". */
  sampleStats?: string;
  /** Path to a public dogfood report HTML, e.g. "/reports/luxscope.html". Rendered as a sibling action to "Learn more". */
  sampleReportHref?: string;
}

interface ProductCardProps {
  product: Product;
  onLearnMore: (product: Product) => void;
  onRequestAudit?: (product: Product) => void;
  paidAuditsOpen?: boolean;
  cardPadding?: string;
  cardHeadingSize?: string;
  cliProminent?: boolean;
  showFreeBadge?: boolean;
}

export function ProductCard({
  product,
  onLearnMore,
  onRequestAudit,
  paidAuditsOpen = true,
  cardPadding,
  cardHeadingSize,
  cliProminent = false,
  showFreeBadge = false,
}: ProductCardProps) {
  const isLux = product.tier === "lux";
  const padding = cardPadding ?? "p-6";
  const headingSize = cardHeadingSize ?? "text-[19px]";
  const cardClasses = isLux
    ? `relative bg-stel-surface border border-stel-amber/30 rounded-lg ${padding} transition-colors duration-150 hover:border-stel-amber/70 before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-stel-amber before:to-transparent before:rounded-t-lg`
    : `bg-stel-surface border border-stel-border rounded-lg ${padding} transition-colors duration-150 hover:border-stel-border-bright`;
  return (
    <article className={cardClasses}>
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] uppercase tracking-[0.08em] text-stel-text-faint">
          {product.badge}
        </span>
        {showFreeBadge ? (
          <span className="text-[11px] text-stel-text-faint">
            {product.license ?? "MIT"} · free · zero config
          </span>
        ) : (
          product.license && (
            <span className="text-[11px] text-stel-text-faint">{product.license}</span>
          )
        )}
      </div>

      <h3 className={`font-sans font-semibold ${headingSize} text-stel-text-primary mt-3 mb-1 tracking-[-0.02em]`}>
        {product.name}
      </h3>

      <p className="text-[13px] text-stel-text-muted italic mb-3">{product.tagline}</p>

      {product.cli && (cliProminent || FEATURE_PUBLIC_REPOS) && (
        <pre
          className={`font-mono text-stel-text-primary bg-stel-bg border border-stel-border rounded overflow-x-auto ${
            cliProminent
              ? "text-[13px] px-3 py-3 mb-4"
              : "text-[12px] px-3 py-2 mb-3"
          }`}
        >
          <span className="text-stel-text-faint select-none">$ </span>{product.cli}
        </pre>
      )}

      <p className="text-[15px] text-stel-text-muted leading-relaxed">
        {product.description}
      </p>

      {product.sampleStats && (
        <p className="mt-3 text-[12px] font-mono text-stel-text-faint">
          {product.sampleStats}
        </p>
      )}

      {product.audit && (() => {
        const isFree = /free/i.test(product.audit.price);
        if (!isFree && !paidAuditsOpen) return null;
        const tone = isFree
          ? "text-emerald-400 hover:text-emerald-300"
          : "text-stel-amber hover:text-amber-300";
        const label = isFree ? "Request free audit" : "Request 1-hr audit";
        return (
          <button
            type="button"
            onClick={() => onRequestAudit?.(product)}
            className={`mt-4 inline-flex items-center text-[13px] font-medium cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:underline ${tone}`}
            aria-label={`Request ${product.name} audit`}
          >
            {label} →
          </button>
        );
      })()}

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <button
          onClick={() => onLearnMore(product)}
          className="inline-flex items-center gap-1.5 text-[13px] text-stel-text-primary font-medium hover:underline focus-visible:outline-none focus-visible:underline cursor-pointer"
          aria-label={`Learn more about ${product.name}`}
        >
          Learn more →
        </button>
        {product.sampleReportHref && (
          <a
            href={product.sampleReportHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-stel-text-muted hover:text-stel-text-primary hover:underline focus-visible:outline-none focus-visible:underline"
            aria-label={`View sample report for ${product.name}`}
          >
            View sample report →
          </a>
        )}
        {FEATURE_PUBLIC_REPOS && product.page && (
          <Link
            href={product.page}
            className="inline-flex items-center gap-1.5 text-[13px] text-stel-amber font-medium hover:underline focus-visible:outline-none focus-visible:underline"
            aria-label={`Full page for ${product.name}`}
          >
            Full page →
          </Link>
        )}
      </div>
    </article>
  );
}
