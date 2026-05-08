import type { Metadata } from "next";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Stelnyx",
  description: "Terms governing use of Stelnyx products and this website.",
};

const EFFECTIVE_DATE = "May 4, 2026";
const CONTACT_EMAIL = "hello@stelnyx.com";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-stel-bg min-h-screen">
        <div className="max-w-[720px] mx-auto px-6 md:px-12 py-24">
          <p className="text-[13px] text-stel-text-muted mb-4">
            Legal
          </p>
          <h1 className="text-stel-text-primary font-semibold tracking-[-0.03em] mb-2" style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>
            Terms of Service
          </h1>
          <p className="font-mono text-[13px] text-stel-text-faint mb-16">
            Effective {EFFECTIVE_DATE}
          </p>

          <div className="space-y-12">
            <Section title="Acceptance">
              <p>
                By accessing this website or using any Stelnyx tools, you agree to these terms. If you do not agree, do not use our products or services.
              </p>
            </Section>

            <Section title="Open source tools">
              <p>
                SecGate, Intake, Engram, and Arbiter are open source software released under the MIT License. Your use of these tools is governed by the MIT License, not these terms. The MIT License is permissive — you can use, modify, and distribute these tools freely, with attribution.
              </p>
              <p>
                LuxScope and LuxFaber are proprietary software currently in development. Access is restricted. Do not redistribute, reverse engineer, or use these tools without explicit written permission from Stelnyx.
              </p>
            </Section>

            <Section title="This website">
              <p>
                This website is provided for informational purposes. We reserve the right to modify or discontinue any part of it at any time without notice. We are not liable for any loss resulting from such changes.
              </p>
            </Section>

            <Section title="Acceptable use">
              <p>You agree not to:</p>
              <ul>
                <li>Use our tools or services to violate any law or regulation.</li>
                <li>Attempt to gain unauthorized access to any system or network.</li>
                <li>Use our infrastructure to conduct denial-of-service attacks.</li>
                <li>Scrape, crawl, or index our site without permission.</li>
                <li>Misrepresent your identity or affiliation with Stelnyx.</li>
              </ul>
            </Section>

            <Section title="Intellectual property">
              <p>
                The Stelnyx name, logo, and brand are proprietary. Open source code is licensed under the terms stated in each repository. All other content on this site — copy, design, and assets — is owned by Stelnyx and may not be reproduced without permission.
              </p>
            </Section>

            <Section title="Disclaimer of warranties">
              <p>
                Our tools and this website are provided <strong>&ldquo;as is&rdquo;</strong> without warranty of any kind, express or implied. We do not warrant that tools will be error-free, uninterrupted, or suitable for your particular use case. Security tools in particular should be used as one layer of a defense-in-depth strategy, not as a sole control.
              </p>
            </Section>

            <Section title="Limitation of liability">
              <p>
                To the maximum extent permitted by law, Stelnyx shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or services, even if advised of the possibility of such damages. Our total liability for any claim shall not exceed $100 USD.
              </p>
            </Section>

            <Section title="Governing law">
              <p>
                These terms are governed by the laws of the State of New York, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts of New York County, New York.
              </p>
            </Section>

            <Section title="Changes">
              <p>
                We may update these terms at any time. Material changes will be communicated via the effective date above. Continued use after changes constitutes acceptance.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions?{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-stel-indigo-bright hover:underline">
                  {CONTACT_EMAIL}
                </a>
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
