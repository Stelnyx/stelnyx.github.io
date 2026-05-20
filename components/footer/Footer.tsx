"use client";

import Link from "next/link";
import { useContact } from "@/components/contact/ContactProvider";
import { FEATURE_PRICING, FEATURE_PUBLIC_REPOS } from "@/lib/features";

const FOOTER_LINKS: { label: string; href: string; external?: boolean }[] = [
  ...(FEATURE_PUBLIC_REPOS
    ? [
        { label: "LuxScope", href: "/preview/luxscope" },
        { label: "LuxFaber", href: "/preview/luxfaber" },
      ]
    : []),
  ...(FEATURE_PRICING ? [{ label: "Pricing", href: "/#pricing" }] : []),
  ...(FEATURE_PUBLIC_REPOS
    ? [
        { label: "GitHub", href: "https://github.com/Stelnyx", external: true },
        { label: "Discussions", href: "https://github.com/orgs/Stelnyx/discussions", external: true },
      ]
    : []),
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const FOOTER_LINK_CLASS =
  "text-[14px] text-stel-text-faint hover:text-stel-text-muted transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm";

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

export function Footer() {
  const year = new Date().getFullYear();
  const openContact = useContact();

  return (
    <footer className="bg-stel-bg border-t border-stel-border py-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 flex flex-col items-center gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm"
          aria-label="Stelnyx home"
        >
          <StelMark />
          <span className="font-sans font-medium text-[18px] text-stel-text-primary">
            Stelnyx
          </span>
        </Link>

        {/* Tagline */}
        <p className="text-[13px] text-stel-text-faint text-center">
          Built in the dark. Works in the light.
        </p>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={FOOTER_LINK_CLASS}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className={FOOTER_LINK_CLASS}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => openContact({ source: "stelnyx · footer" })}
                className="text-[14px] text-stel-text-faint hover:text-stel-text-muted transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright rounded-sm"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Copyright */}
        <p className="text-[13px] text-stel-text-faint">
          &copy; {year} Stelnyx. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
