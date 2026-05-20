"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useContact } from "@/components/contact/ContactProvider";
import { FEATURE_PRICING } from "@/lib/features";

function StelMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 480 480"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(51.9 21.07)" fillRule="evenodd">
        <g transform="translate(-178.720890 483.000000) scale(0.100000 -0.100000)">
          <path d="M3602 4808 c-33 -36 -41 -68 -47 -205 -16 -343 -77 -654 -166 -850 -135 -296 -394 -400 -754 -302 -110 31 -239 73 -300 99 -11 5 -31 12 -45 16 -14 4 -58 22 -98 40 -41 19 -75 34 -77 34 -2 0 -39 16 -82 36 -123 57 -202 53 -232 -12 -35 -77 -12 -110 149 -219 629 -426 826 -743 663 -1070 -51 -104 -196 -268 -333 -377 -41 -33 -84 -67 -95 -76 -36 -29 -126 -96 -250 -185 -66 -47 -126 -95 -132 -106 -22 -36 -16 -84 15 -121 42 -49 97 -47 215 9 49 22 94 41 101 41 6 0 16 4 22 9 11 11 272 113 334 130 25 8 56 17 70 21 27 9 142 33 234 50 210 37 391 -40 543 -232 15 -20 93 -184 93 -198 0 -5 4 -18 9 -28 8 -15 26 -77 51 -172 26 -104 42 -226 60 -455 11 -153 14 -165 37 -191 47 -50 91 -56 139 -19 42 32 51 66 64 241 10 150 26 271 41 320 5 17 9 39 9 50 0 52 63 260 106 353 113 243 356 378 596 330 151 -30 205 -41 228 -49 14 -4 52 -16 85 -25 33 -9 69 -20 80 -25 11 -4 36 -14 55 -21 19 -6 63 -25 98 -41 35 -15 68 -28 73 -28 5 0 17 -4 27 -10 204 -117 338 -122 358 -15 11 60 -14 94 -125 170 -352 242 -593 466 -688 640 -97 180 -73 390 67 569 110 141 294 304 528 468 18 13 39 28 45 33 7 6 44 31 84 57 89 59 111 105 77 166 -39 73 -99 78 -229 18 -44 -20 -89 -41 -100 -46 -11 -5 -51 -23 -88 -39 -38 -17 -74 -31 -81 -31 -6 0 -16 -4 -21 -8 -10 -9 -244 -84 -315 -102 -148 -37 -319 -46 -395 -21 -333 109 -460 398 -525 1196 -14 174 -30 205 -109 205 -36 0 -52 -5 -69 -22z m109 -1409 c28 -20 50 -58 79 -139 7 -19 19 -48 25 -65 7 -16 23 -55 35 -85 54 -134 178 -389 227 -467 18 -29 33 -54 33 -57 0 -7 125 -191 157 -231 13 -16 27 -35 31 -40 4 -6 25 -33 48 -60 75 -92 97 -132 89 -162 -20 -83 -63 -88 -300 -32 -244 57 -559 63 -845 14 -79 -13 -104 -18 -220 -44 -84 -19 -119 -14 -151 20 -36 39 -36 82 1 119 35 35 202 260 274 368 80 122 171 286 206 373 8 19 29 68 48 109 19 41 43 97 53 125 11 27 23 59 28 70 5 11 15 36 22 55 50 140 94 176 160 129z" />
        </g>
      </g>
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