"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useContact } from "@/components/contact/ContactProvider";
import { FEATURE_PRICING } from "@/lib/features";

function StelMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 3 L7 3 C4.8 3 3.5 4.3 3.5 6.5 L3.5 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M2.5 10 L17.5 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M16.5 11.5 L16.5 13.5 C16.5 15.7 15.2 17 13 17 L3 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function Navbar() {
const [drawerOpen, setDrawerOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const openContact = useContact();

useEffect(() => {
const handler = () => setScrolled(window.scrollY > 8);
window.addEventListener("scroll", handler, { passive: true });
return () => window.removeEventListener("scroll", handler);
}, []);

useEffect(() => {
if (drawerOpen) {
document.body.style.overflow = "hidden";
} else {
document.body.style.overflow = "";
}
return () => { document.body.style.overflow = ""; };
}, [drawerOpen]);

return (
<header className={`sticky top-0 z-50 h-16 flex items-center border-b transition-all duration-200 ${ scrolled
  ? "bg-stel-bg/95 border-stel-border-bright backdrop-blur-md" : "bg-stel-bg/80 border-stel-border/50 backdrop-blur-md"
  }`}>
  <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 flex items-center justify-between">
    {/* Logo */}
    <Link href="/"
      className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm"
      aria-label="Stelnyx home">
      <StelMark />
      <span className="font-sans font-semibold text-[18px] text-stel-text-primary tracking-tight">
        Stelnyx
      </span>
    </Link>

    {/* Desktop CTA */}
    <div className="hidden md:flex items-center gap-8">
      <Link href="/#reports"
        className="text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm">
        Sample reports
      </Link>
      <Link href="/#tools"
        className="text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm">
        Tools
      </Link>
      {FEATURE_PRICING && (
        <Link href="/#pricing"
          className="text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm">
          Pricing
        </Link>
      )}
      <button type="button" onClick={()=> openContact({ source: "stelnyx · navbar" })}
        className="text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150 text-[15px]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm"
        >
        Contact
      </button>
    </div>

    {/* Mobile hamburger */}
    <button
      className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright"
      aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu" } aria-expanded={drawerOpen}
      aria-controls="mobile-nav-drawer" onClick={()=> setDrawerOpen((o) => !o)}
      >
      <span className={`block w-5 h-0.5 bg-stel-text-primary transition-all duration-200 ${ drawerOpen
        ? "rotate-45 translate-y-2" : "" }`} />
      <span className={`block w-5 h-0.5 bg-stel-text-primary transition-all duration-200 ${ drawerOpen ? "opacity-0"
        : "" }`} />
      <span className={`block w-5 h-0.5 bg-stel-text-primary transition-all duration-200 ${ drawerOpen
        ? "-rotate-45 -translate-y-2" : "" }`} />
    </button>
  </div>

  {/* Mobile drawer */}
  {drawerOpen && (
  <div className="fixed inset-0 z-40 md:hidden" onClick={()=> setDrawerOpen(false)}
    aria-hidden="true"
    />
    )}
    <div id="mobile-nav-drawer" role="dialog" aria-label="Navigation" aria-modal="true" className={`fixed top-16 right-0
      bottom-0 z-50 w-72 bg-stel-surface border-l border-stel-border md:hidden flex flex-col px-6 py-8 gap-6
      transition-transform duration-200 ${ drawerOpen ? "translate-x-0" : "translate-x-full" }`}>
      <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
        <Link href="/#reports"
          className="text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150 text-[18px] py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm"
          onClick={()=> setDrawerOpen(false)}
          >
          Sample reports
        </Link>
        <Link href="/#tools"
          className="text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150 text-[18px] py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm"
          onClick={()=> setDrawerOpen(false)}
          >
          Tools
        </Link>
        {FEATURE_PRICING && (
          <Link href="/#pricing"
            className="text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150 text-[18px] py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm"
            onClick={()=> setDrawerOpen(false)}
            >
            Pricing
          </Link>
        )}
        <button type="button" onClick={()=> { setDrawerOpen(false); openContact({ source: "stelnyx · navbar" }); }}
          className="text-left text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150
          text-[18px] py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright
          rounded-sm"
          >
          Contact
        </button>
      </nav>
    </div>
</header>
);
}