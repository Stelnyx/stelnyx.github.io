import type { Metadata } from "next";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Stelnyx",
  description: "How Stelnyx collects and uses your data.",
};

const EFFECTIVE_DATE = "May 4, 2026";
const CONTACT_EMAIL = "hello@stelnyx.com";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-stel-bg min-h-screen">
        <div className="max-w-[720px] mx-auto px-6 md:px-12 py-24">
          <p className="text-[13px] text-stel-text-muted mb-4">
            Legal
          </p>
          <h1 className="text-stel-text-primary font-semibold tracking-[-0.03em] mb-2" style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>
            Privacy Policy
          </h1>
          <p className="font-mono text-[13px] text-stel-text-faint mb-16">
            Effective {EFFECTIVE_DATE}
          </p>

          <div className="prose-stel space-y-12">
            <Section title="Overview">
              <p>
                Stelnyx builds developer infrastructure tools. Most of our tools are open source, run locally, and collect no data whatsoever. This policy covers the limited cases where we do collect information — specifically, this website and any waitlist or contact forms.
              </p>
            </Section>

            <Section title="What we collect">
              <p>When you interact with this site, we may collect:</p>
              <ul>
                <li><strong>Email address</strong> — if you join our early access waitlist or contact us directly.</li>
                <li><strong>Basic analytics</strong> — page views and referrer data, if analytics are enabled. We do not use Google Analytics. If we add analytics, we will update this policy.</li>
                <li><strong>Server logs</strong> — standard HTTP logs (IP address, browser, timestamp) retained for up to 30 days for security purposes.</li>
              </ul>
              <p>Our open source tools (SecGate, Intake, Engram, Arbiter) run entirely on your machine. They collect nothing. No telemetry. No phone-home. You can verify this in the source code.</p>
            </Section>

            <Section title="How we use it">
              <ul>
                <li>Email addresses are used only to send updates about products you signed up for. No marketing from third parties. No selling your data. Ever.</li>
                <li>Server logs are used for security monitoring and deleted on a rolling 30-day window.</li>
              </ul>
            </Section>

            <Section title="Third parties">
              <p>
                We do not sell, rent, or share your personal data with third parties for marketing purposes. We may use infrastructure providers (hosting, email delivery) that process data on our behalf under appropriate agreements.
              </p>
            </Section>

            <Section title="Data retention">
              <p>
                Waitlist emails are retained until you unsubscribe or request deletion. Server logs are deleted after 30 days. You can request deletion of any data we hold about you at any time.
              </p>
            </Section>

            <Section title="Your rights">
              <p>
                You have the right to access, correct, or delete any personal data we hold about you. To exercise these rights, email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-stel-indigo-bright hover:underline">
                  {CONTACT_EMAIL}
                </a>
                . We will respond within 30 days.
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                This site does not use tracking cookies. We may use a single session cookie for functional purposes (e.g., remembering a modal state). No third-party cookies.
              </p>
            </Section>

            <Section title="Changes">
              <p>
                If we make material changes to this policy, we will update the effective date above and, where appropriate, notify users via email. Continued use of the site after changes constitutes acceptance.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions? Email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-stel-indigo-bright hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-sans font-semibold text-[20px] text-stel-text-primary tracking-[-0.01em] mb-4 pb-3 border-b border-stel-border">
        {title}
      </h2>
      <div className="text-[16px] text-stel-text-muted leading-[1.75] space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-stel-text-primary [&_strong]:font-medium">
        {children}
      </div>
    </section>
  );
}
