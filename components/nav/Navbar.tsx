"use client";

import { useState, useEffect } from "react";
import { ContactModal } from "@/components/contact/ContactModal";

function StarMark() {
return (
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 1L11.8 7.5H18.5L13 11.5L14.8 18L10 14L5.2 18L7 11.5L1.5 7.5H8.2L10 1Z" fill="#6C63FF" stroke="#7B73FF"
    strokeWidth="0.5" />
  <path d="M10 4.5L10 15.5M4.5 10L15.5 10" stroke="#7B73FF" strokeWidth="0.8" strokeOpacity="0.5" />
</svg>
);
}

export function Navbar() {
const [drawerOpen, setDrawerOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [contactOpen, setContactOpen] = useState(false);

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
    <a href="/"
      className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm"
      aria-label="Stelnyx home">
      <StarMark />
      <span className="font-sans font-semibold text-[18px] text-stel-text-primary tracking-tight">
        Stelnyx
      </span>
    </a>

    {/* Desktop CTA */}
    <div className="hidden md:flex items-center gap-8">
      <a href="#products"
        className="text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm">
        Products
      </a>
      <button type="button" onClick={()=> setContactOpen(true)}
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
        <a href="#products"
          className="text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150 text-[18px] py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm"
          onClick={()=> setDrawerOpen(false)}
          >
          Products
        </a>
        <button type="button" onClick={()=> { setDrawerOpen(false); setContactOpen(true); }}
          className="text-left text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150
          text-[18px] py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright
          rounded-sm"
          >
          Contact
        </button>
      </nav>
    </div>
    <ContactModal isOpen={contactOpen} onClose={()=> setContactOpen(false)}
      context={{ source: "stelnyx · navbar" }}
      />
</header>
);
}