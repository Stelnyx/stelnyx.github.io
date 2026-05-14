interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  product?: string;
  tier?: string;
  source?: string;
}

const MAX_BODY_BYTES = 8 * 1024;
const DEFAULT_TO = "daniel.oceno@gmail.com";
const DEFAULT_FROM = "Stelnyx Contact <onboarding@resend.dev>";

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string),
  );
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const len = parseInt(request.headers.get("content-length") || "0", 10);
  if (Number.isFinite(len) && len > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Payload too large" }, 413);
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const company = String(body.company ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 4000);
  const product = String(body.product ?? "").trim().slice(0, 80);
  const tier = String(body.tier ?? "").trim().slice(0, 80);
  const source = String(body.source ?? "stelnyx").trim().slice(0, 80);

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: "Valid email required" }, 400);
  }
  if (!message) {
    return json({ ok: false, error: "Message required" }, 400);
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

  const key = env.RESEND_API_KEY;
  if (!key) {
    console.warn("[contact] RESEND_API_KEY not set; payload accepted in dev mode.");
    return json({ ok: true, dev: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: env.CONTACT_TO_EMAIL || DEFAULT_TO,
        reply_to: email,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[contact] resend error", res.status, errText);
      return json({ ok: false, error: "Send failed" }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return json({ ok: false, error: "Unexpected error" }, 500);
  }
};
