interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

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

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const TO_EMAIL = env.CONTACT_TO_EMAIL ?? "daniel.oceno@gmail.com";
  const FROM_EMAIL = env.CONTACT_FROM_EMAIL ?? "Stelnyx Contact <onboarding@resend.dev>";
  const RESEND_KEY = env.RESEND_API_KEY;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }
  if (!isPayload(body)) return json({ ok: false, error: "Invalid payload" }, 400);

  const name = (body.name ?? "").toString().trim().slice(0, 200);
  const email = (body.email ?? "").toString().trim().slice(0, 200);
  const company = (body.company ?? "").toString().trim().slice(0, 200);
  const message = (body.message ?? "").toString().trim().slice(0, 4000);
  const product = (body.product ?? "").toString().trim().slice(0, 80);
  const tier = (body.tier ?? "").toString().trim().slice(0, 80);
  const source = (body.source ?? "stelnyx").toString().trim().slice(0, 80);

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: "Valid email required" }, 400);
  }
  if (!message) return json({ ok: false, error: "Message required" }, 400);

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
    return json({ ok: true, dev: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
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

export const onRequest: PagesFunction<Env> = async () => {
  return json({ ok: false, error: "Method not allowed" }, 405);
};
