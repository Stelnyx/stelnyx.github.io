"use client";

import React from "react";

type ButtonVariant = "primary" | "ghost" | "outline-indigo";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  as?: "button" | "a";
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-stel-amber text-stel-bg font-semibold px-6 py-3.5 rounded-md " +
    "hover:bg-amber-400 transition-colors duration-150 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg",
  ghost:
    "text-stel-text-primary px-6 py-3.5 rounded-md hover:bg-stel-surface transition-colors duration-150 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg",
  "outline-indigo":
    "border border-stel-indigo text-stel-indigo-bright px-5 py-2 rounded-md " +
    "hover:bg-stel-indigo/10 transition-all duration-150 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg",
};

export function Button({
  variant = "primary",
  as,
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${variantClasses[variant]} inline-flex items-center justify-center ${className}`;

  if (as === "a" && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
