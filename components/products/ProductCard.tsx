export type BadgeType =
  | "Security"
  | "Codebase Intel"
  | "Agent Readiness"
  | "Issue Forge"
  | "Memory Layer"
  | "Agent Guard";

export interface Product {
  name: string;
  tagline: string;
  description: string;
  badge: BadgeType;
  mit?: boolean;
  stack?: string[];
  status?: string;
  npm?: string;
  github?: string;
  audit?: { price: string; href: string };
}

const badgeClasses: Record<BadgeType, string> = {
  Security:          "bg-stel-indigo-bright/10 text-stel-indigo-bright border border-stel-indigo-bright/20",
  "Codebase Intel":  "bg-stel-indigo-bright/10 text-stel-indigo-bright border border-stel-indigo-bright/20",
  "Memory Layer":    "bg-stel-indigo-bright/10 text-stel-indigo-bright border border-stel-indigo-bright/20",
  "Agent Readiness": "bg-stel-amber/10 text-stel-amber border border-stel-amber/20",
  "Issue Forge":     "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  "Agent Guard":     "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

interface ProductCardProps {
  product: Product;
  onLearnMore: (product: Product) => void;
}

export function ProductCard({ product, onLearnMore }: ProductCardProps) {
  return (
    <article className="group relative bg-stel-surface border border-stel-border rounded-xl p-6 overflow-hidden transition-all duration-200 ease-out shadow-[0_1px_3px_rgba(0,0,0,0.4)] hover:border-stel-border-bright hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(108,99,255,0.09)]">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stel-indigo/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between">
        <span className={`inline-flex px-2.5 py-1 rounded-full font-mono text-[11px] uppercase tracking-widest ${badgeClasses[product.badge]}`}>
          {product.badge}
        </span>
        {product.mit && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-stel-text-faint">
            MIT
          </span>
        )}
      </div>

      <h3 className="font-sans font-semibold text-[19px] text-stel-text-primary mt-4 mb-1 tracking-[-0.02em]">
        {product.name}
      </h3>

      <p className="text-[13px] text-stel-text-muted font-mono mb-3">{product.tagline}</p>

      <p className="text-[15px] text-stel-text-muted leading-relaxed">
        {product.description}
      </p>

      {product.audit && (() => {
        const isFree = /free/i.test(product.audit.price);
        const tone = isFree
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
          : "bg-stel-amber/10 border-stel-amber/20 text-stel-amber";
        const dot = isFree ? "bg-emerald-400" : "bg-stel-amber";
        const suffix = isFree ? "first 10 teams" : "soon";
        return (
          <div className={`mt-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-full border font-mono text-[11px] uppercase tracking-widest ${tone}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dot}`} aria-hidden="true" />
            1-hr audit · {product.audit.price} · {suffix}
          </div>
        );
      })()}

      <button
        onClick={() => onLearnMore(product)}
        className="group/btn mt-5 inline-flex items-center gap-1.5 text-[14px] text-stel-indigo-bright font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm transition-colors duration-150 hover:text-stel-indigo cursor-pointer"
        aria-label={`Learn more about ${product.name}`}
      >
        Learn more
        <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1.5">
          →
        </span>
      </button>
    </article>
  );
}
