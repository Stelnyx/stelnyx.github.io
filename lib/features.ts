// Feature flags. Read at build time (NEXT_PUBLIC_* inlined for static export).
// Toggle requires rebuild + redeploy.
//
// FEATURE_PRICING       — public pricing surfaces (Pricing section, nav/footer Pricing link,
//                         Hero "See pricing" CTA, ToolsSection audit CTAs/prices, ToolLanding
//                         "See all pricing", InstallModal #pricing reference, revenue Comps).
// FEATURE_PUBLIC_REPOS  — public GitHub/Discussions surfaces (Footer GitHub/Discussions,
//                         Footer LuxScope/LuxFaber tool links, Hero terminal luxfaber cmd line,
//                         ToolsSection modal GitHub buttons, InstallModal git-clone snippets,
//                         layout JSON-LD sameAs).
export const FEATURE_PRICING = process.env.NEXT_PUBLIC_FEATURE_PRICING === "true";
export const FEATURE_PUBLIC_REPOS = process.env.NEXT_PUBLIC_FEATURE_PUBLIC_REPOS === "true";
