export type BadgeType =
  | "Security"
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
}

interface ProductCardProps {
  product: Product;
  onLearnMore: (product: Product) => void;
  onRequestAudit?: (product: Product) => void;
  paidAuditsOpen?: boolean;
}

export function ProductCard({ product, onLearnMore, onRequestAudit, paidAuditsOpen = true }: ProductCardProps) {
  return (
    <article className="bg-stel-surface border border-stel-border rounded-lg p-6 transition-colors duration-150 hover:border-stel-border-bright">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] uppercase tracking-[0.08em] text-stel-text-faint">
          {product.badge}
        </span>
        {product.license && (
          <span className="text-[11px] text-stel-text-faint">{product.license}</span>
        )}
      </div>

      <h3 className="font-sans font-semibold text-[19px] text-stel-text-primary mt-3 mb-1 tracking-[-0.02em]">
        {product.name}
      </h3>

      <p className="text-[13px] text-stel-text-muted italic mb-3">{product.tagline}</p>

      <p className="text-[15px] text-stel-text-muted leading-relaxed">
        {product.description}
      </p>

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

      <div>
        <button
          onClick={() => onLearnMore(product)}
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-stel-text-primary font-medium hover:underline focus-visible:outline-none focus-visible:underline cursor-pointer"
          aria-label={`Learn more about ${product.name}`}
        >
          Learn more →
        </button>
      </div>
    </article>
  );
}
