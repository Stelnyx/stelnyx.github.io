import { ConstellationSVG } from "./ConstellationSVG";

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="bg-stel-surface relative"
    >
      {/* Top fade divider */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stel-border-bright to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 py-20 md:py-32">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start md:items-center">
          {/* Left — text (60%) */}
          <div className="flex-[3] min-w-0">
            <p
              id="philosophy-heading"
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-stel-text-muted mb-6"
            >
              Philosophy
            </p>

            <p
              className="text-stel-text-muted leading-[1.8]"
              style={{ fontSize: "18px" }}
            >
              The name Stelnyx comes from two directions:{" "}
              <span className="font-mono text-stel-indigo-bright bg-stel-indigo/[0.08] px-1.5 py-0.5 rounded">
                stellar light and the Greek goddess of night
              </span>
              .{" "}
              <span className="text-stel-text-primary">
                Every tool we build has to work in the dark
              </span>
              , when systems fail at 2am, and also in daylight, when you&apos;re
              making deliberate choices about architecture. We build at the
              infrastructure layer because that&apos;s where leverage is.
            </p>
          </div>

          {/* Right — constellation (40%) */}
          <div
            className="hidden md:flex flex-[2] justify-center items-center min-h-[240px]"
            aria-hidden="true"
          >
            <ConstellationSVG />
          </div>
        </div>
      </div>

      {/* Bottom fade divider */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-stel-border-bright to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
