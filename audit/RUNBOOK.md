# Audit Runbook — founder

How to deliver a Stelnyx audit end-to-end. Internal. Update on every audit you ship.

## SKUs

| SKU | Price | Time budget (founder) | Live debrief | Template |
|---|---|---|---|---|
| LuxScope Audit | $499 | 90 min | 60 min | `audit/templates/luxscope-audit.md` |
| LuxFaber Audit | $699 | 60 min | 60 min | `audit/templates/luxfaber-audit.md` |
| Stelnyx Full Audit | $799 | 2.5 hr | 90 min | `audit/templates/stelnyx-full-audit.md` |

If a single audit takes more than 1.5× its budget two times in a row, raise the price or narrow the scope. Don't normalize losing money.

## Pipeline

```
intake → NDA → scope confirm → scan → write → debrief → deliver → 30-day follow-up → archive
```

### 1. Intake (lead lands)
- Source: ContactModal → Resend email (today) / Stripe checkout → webhook (Phase 2).
- Reply within 1 business day. Always. No exceptions.
- First reply asks for: (1) the repo/site, (2) preferred Cal.com slot, (3) whether they need an NDA before sharing access.

### 2. NDA (private repos always; public sites if they ask)
- Default NDA template: `audit/legal/MUTUAL-NDA.md` (TODO: write).
- Mutual, 2-year term, standard carveouts (publicly available info, independently developed).
- Sent via DocuSign (free tier) or signed PDF email.
- **Do not pull a private repo onto your machine before the NDA is countersigned.** No exceptions.

### 3. Scope confirm (5 min, in writing)
- "I'll scan {{repo or site}} on commit/URL {{X}} as of {{date}}. Audit covers §{{template sections}}. Out of scope: runtime behavior, security scanning, attribution. Live debrief on {{Cal.com slot}}."
- Get a one-line ack. This is your refund anchor (§ "Refund / scope dispute" below).

### 4. Scan
- Build LuxScope / LuxFaber from source (npm publish on hold). See each template's Appendix B for commands.
- Always run with `--format json` and keep the raw report — that's the deterministic anchor.
- For private repos: clone to a `~/audits/{{client}}-{{YYYY-MM-DD}}/` dir on disk. **Encrypt-at-rest** (FileVault on macOS is fine). No cloud sync of that dir.
- If the scan crashes / can't complete on the client's repo: see "Failure modes" below — do NOT silently work around it.

### 5. Write (the actual audit time)
- Copy the template, fill in each `{{}}`. Don't ship a deliverable with `{{}}` left in it. (Search for `{{` in the final doc; should find none.)
- The score is the machine's. The fix order, effort estimates, and revenue framing are yours — that's what the client paid $499/$699/$799 for. Don't just paste the JSON.
- Common findings I always look for — see "Findings checklist" below.

### 6. Debrief (live call)
- 60 min for single audits, 90 min for Full. Record only with explicit consent.
- Walk Exec Summary → Architecture Map / Determinism Diff → Top 3 fixes. The rest is reference.
- End with: "Want me to re-scan in 30 days and send the diff?" If yes, calendar it.

### 7. Deliver
- PDF export from the markdown:
  ```bash
  # Pandoc + a CSS:
  pandoc luxscope-{{client}}.md -o luxscope-{{client}}.pdf \
    --pdf-engine=weasyprint --css=audit/style.css
  # Or simply: open in Typora / Marked → File → Export → PDF.
  ```
- Attach: PDF + raw JSON(s) + diagrams + one-liner email.
- Email subject: `Stelnyx audit — {{CLIENT}} — {{SCORE}}/100`. Body: 3 lines + the attachments.

### 8. 30-day follow-up
- Auto-add a Cal.com / calendar reminder for {{date+30}}: "Re-run scan, send diff, check if Team waitlist signup."
- This is the Team-tier hook. Track conversions in your leads sheet.

### 9. Archive
- Move client repo / scan artifacts to encrypted archive (`~/audits/_archive/`).
- Per the data-handling commitment: **delete the cloned repo and any intermediate scan artifacts on the artifact-delete date stated in the cover page** (default: deliver date + 14 days). Keep only the final PDF + raw JSON in the archive.
- Update `audit/log.md` (TODO: create) — one row: `{{date}} | {{client}} | {{sku}} | {{score}} | {{fixes shipped Y/N}} | {{30-day diff Y/N}}`.

---

## Findings checklist — what to always look for

### LuxScope
- [ ] One module that "everything imports" (>30% fan-in) — the de-facto god module
- [ ] A `utils/` or `helpers/` directory that's actually a graveyard
- [ ] Dependencies on packages that haven't published in >18 months
- [ ] Two versions of the same dependency in the lockfile
- [ ] A test directory smaller than 10% of source by LOC (with the caveat that tests aren't this audit's scope)
- [ ] Generated code committed alongside source without `.gitattributes` marking
- [ ] A README that hasn't been touched in >6 months on a code base that has
- [ ] Unreferenced exports in modules that have other live exports (subtle dead code)

### LuxFaber
- [ ] `robots.txt` blocks GPTBot / ClaudeBot / PerplexityBot (intentionally? often not)
- [ ] No `llms.txt` at all
- [ ] No JSON-LD on the homepage
- [ ] `<h1>` missing or duplicated; heading hierarchy skips levels
- [ ] Critical content rendered client-side only (agent without JS sees an empty page)
- [ ] **Determinism diff: GPTBot gets less / different content than a browser.** Check this every time. Cloudflare bot-management defaults are the usual culprit.
- [ ] Boilerplate density >50% on the answer page (mega-nav, mega-footer)

---

## Failure modes

### Scan crashes on the client's repo / site
- Reproduce on a minimal subtree. File an issue on the LuxScope/LuxFaber repo with the exact failing input (with NDA permission — sanitize first).
- Tell the client immediately. Offer: full refund, OR scope reduction with a partial credit, OR delivery on a known-working subtree with a written caveat.
- **Never** ship an audit with a silently-skipped section. Better to say "I couldn't scan X, here's what I'd look for if I could" than to fake completeness.

### Client provides a credential / access you didn't ask for
- Don't use it. Email back: "We only need read-only repo / public URL access. Please revoke {{credential}} — confirming when done."

### Client wants a result they didn't get (e.g. higher score)
- The score is deterministic. You can't move it; the fixes can. Walk them through what would, with effort/impact estimates. That's the audit.

---

## Refund / scope dispute

- If the client claims the audit didn't cover what was promised: pull the §3 "Scope confirm" message. If you're at fault → full refund, no argument, log it. If they expanded scope mid-stream → offer scope-extension at the relevant audit's price ($499 / $699) incremental, or refund the difference.
- Refund threshold: I refund if (a) the deliverable has unfilled `{{}}` placeholders, (b) the scan didn't actually run on the agreed input, or (c) the live debrief didn't happen within 14 days of payment. No discretionary refunds beyond that — this isn't a free consultation.

---

## Data handling commitment (state this on the cover of every audit)

- Scans run on my workstation, encrypted at rest (FileVault).
- No cloud sync, no third-party services touch the client's source code or any private URL output.
- Cloned repos and intermediate scan artifacts are deleted on the cover-page artifact-delete date (default: deliver date + 14 days).
- Final PDF + raw JSON are kept in encrypted archive for {{retention}} months, then deleted unless the client requests otherwise in writing.
- I never publish, share, or reference a client engagement without explicit written consent.

---

## Capacity ceilings

- ~8 audits / month solo while freelancing for Cirrus is the realistic ceiling. Above that, two things break first: turnaround time and the quality of the manual layer.
- Trigger to hire / contract: $20K MRR, or three months in a row of >6 audits/mo with turnaround slipping past 7 calendar days.
- Until then: if the queue is full, quote a real start date in the intake reply. Don't promise next-week and deliver in three.

---

## Non-goals of this runbook

This is the operational SOP. It is **not**:
- The marketing copy (that lives on the public landing pages and the audit cards).
- The legal contract / NDA (separate doc).
- The Phase 3 SaaS replacement — that's `app.stelnyx.com` (roadmap, gated).
