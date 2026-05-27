"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

export type ContactContext = {
  product?: string;
  tier?: string;
  source?: string;
  title?: string;
  intro?: string;
  free?: boolean;
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: ContactContext;
}

type Status = "idle" | "sending" | "sent" | "error";

export function ContactModal({ isOpen, onClose, context }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState<string>("");

  function handleClose() {
    setStatus("idle");
    setErrorText("");
    onClose();
  }

  const title = context?.title ?? (context?.product ? `Request · ${context.product}${context.tier ? ` · ${context.tier}` : ""}` : "Contact us");
  const intro =
    context?.intro ??
    (context?.product
      ? context.free
        ? `Tell us about your repo and stack. We'll reply within a day to schedule the free 1-hour audit.`
        : `Tell us about your project. We'll reply within a day with availability and next steps.`
      : "Drop us a line — we read everything and reply within a day.");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const product = context?.product ?? "";
    const tier = context?.tier ?? "";
    const source = context?.source ?? "stelnyx";
    const subject = product
      ? `[Stelnyx · ${product}${tier ? ` · ${tier}` : ""}] ${name || email}`
      : `[Stelnyx · contact] ${name || email}`;
    const lines = [
      `From: ${name || "(no name)"} <${email}>`,
      company ? `Company: ${company}` : null,
      product ? `Product: ${product}` : null,
      tier ? `Tier: ${tier}` : null,
      `Source: ${source}`,
      "",
      message,
    ].filter(Boolean) as string[];
    const href = `mailto:hello@stelnyx.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setStatus("sent");
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      {status === "sent" ? (
        <div className="space-y-3">
          <p className="text-[15px] text-stel-text-primary">Opening your mail app…</p>
          <p className="text-[14px] text-stel-text-muted">If nothing opened, email <a className="underline" href="mailto:hello@stelnyx.com">hello@stelnyx.com</a> directly.</p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-4 inline-flex items-center px-4 py-2.5 rounded-md text-[14px] font-semibold bg-stel-indigo hover:bg-stel-indigo-bright text-white transition-colors duration-150"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-[14px] text-stel-text-muted">{intro}</p>

          {context?.product && (
            <div className="text-[13px] text-stel-text-faint">
              Subject: <span className="text-stel-text-muted">{context.product}{context.tier ? ` · ${context.tier}` : ""}</span>
            </div>
          )}

          <div>
            <label htmlFor="contact-name" className="block text-[13px] text-stel-text-muted mb-1">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md bg-stel-bg border border-stel-border px-3 py-2.5 text-[14px] text-stel-text-primary placeholder:text-stel-text-faint focus:outline-none focus:ring-2 focus:ring-stel-indigo-bright"
              placeholder="Jane Doe"
              maxLength={200}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-[13px] text-stel-text-muted mb-1">
              Email <span className="text-stel-amber">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-stel-bg border border-stel-border px-3 py-2.5 text-[14px] text-stel-text-primary placeholder:text-stel-text-faint focus:outline-none focus:ring-2 focus:ring-stel-indigo-bright"
              placeholder="you@company.com"
              maxLength={200}
            />
          </div>

          <div>
            <label htmlFor="contact-company" className="block text-[13px] text-stel-text-muted mb-1">
              Company / Repo
            </label>
            <input
              id="contact-company"
              type="text"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-md bg-stel-bg border border-stel-border px-3 py-2.5 text-[14px] text-stel-text-primary placeholder:text-stel-text-faint focus:outline-none focus:ring-2 focus:ring-stel-indigo-bright"
              placeholder="Optional"
              maxLength={200}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-[13px] text-stel-text-muted mb-1">
              Message <span className="text-stel-amber">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              maxLength={4000}
              className="w-full rounded-md bg-stel-bg border border-stel-border px-3 py-2.5 text-[14px] text-stel-text-primary placeholder:text-stel-text-faint focus:outline-none focus:ring-2 focus:ring-stel-indigo-bright resize-y"
              placeholder={
                context?.product
                  ? "Stack, repo size, what you'd like covered, available time slots…"
                  : "What can we help with?"
              }
            />
          </div>

          {status === "error" && (
            <p className="text-[13px] text-stel-amber" role="alert">{errorText}</p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center px-5 py-2.5 rounded-md text-[14px] font-semibold bg-stel-indigo hover:bg-stel-indigo-bright text-white transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="text-[14px] text-stel-text-muted hover:text-stel-text-primary transition-colors duration-150"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
