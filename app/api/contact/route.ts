import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "daniel@hellocirrus.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Stelnyx Contact <onboarding@resend.dev>";
const RESEND_KEY = process.env.RESEND_API_KEY;

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  product?: string;
  tier?: string;
  source?: string;
};

function isPayload(v: unknown): v is ContactPayload {
  return typeof v === "object" && v !== null;
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}

const MAX_BODY_BYTES = 8 * 1024;

export async function POST(req: Request) {
  const lenHeader = req.headers.get("content-length");
  const len = lenHeader ? parseInt(lenHeader, 10) : NaN;
  if (Number.isFinite(len) && len > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  if (!isPayload(body)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
  const name = (body.name ?? "").toString().trim().slice(0, 200);
  const email = (body.email ?? "").toString().trim().slice(0, 200);
  const company = (body.company ?? "").toString().trim().slice(0, 200);
  const message = (body.message ?? "").toString().trim().slice(0, 4000);
  const product = (body.product ?? "").toString().trim().slice(0, 80);
  const tier = (body.tier ?? "").toString().trim().slice(0, 80);
  const source = (body.source ?? "stelnyx").toString().trim().slice(0, 80);

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ ok: false, error: "Message required" }, { status: 400 });
  }

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
    "Message:",
    message,
  ].filter(Boolean);
  const textBody = lines.join("\n");
  const htmlBody = `<pre style="font-family:ui-monospace,monospace;font-size:13px;line-height:1.55;color:#0a0a0f;white-space:pre-wrap;word-break:break-word">${escape(textBody)}</pre>`;

  if (!RESEND_KEY) {
    console.warn("[contact] RESEND_API_KEY not set; logging payload only.");
    console.log("[contact]", { subject, textBody });
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const resend = new Resend(RESEND_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });
    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json({ ok: false, error: "Send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}
