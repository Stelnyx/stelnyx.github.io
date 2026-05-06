export function Hero() {
  return (
    <section
      aria-labelledby="hero-headline"
      className="relative min-h-[calc(100vh-64px)] flex items-center justify-center bg-stel-bg"
    >
      <div className="relative text-center px-6 md:px-12 xl:px-20 max-w-[1280px] mx-auto w-full">
        <h1
          id="hero-headline"
          className="text-stel-text-primary font-semibold tracking-[-0.04em] leading-[1.05] text-balance"
          style={{ fontSize: "clamp(40px, 6vw, 64px)" }}
        >
          Security infrastructure built for
          <br />
          engineers who ship.
        </h1>

        <p
          className="text-stel-text-muted max-w-[560px] mx-auto mt-5 leading-[1.7] text-balance"
          style={{ fontSize: "18px" }}
        >
          Stelnyx gives you scanning, memory, and agent tooling that doesn&apos;t
          slow your team down.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <a
            href="#early-access"
            id="early-access"
            className="bg-stel-amber text-stel-bg font-semibold px-6 py-3.5 rounded-md hover:bg-amber-400 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-amber focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg"
          >
            Get early access
          </a>
          <a
            href="#docs"
            id="docs"
            className="text-stel-text-primary px-6 py-3.5 rounded-md hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stel-indigo-bright focus-visible:ring-offset-2 focus-visible:ring-offset-stel-bg"
          >
            Read the docs
          </a>
        </div>
      </div>
    </section>
  );
}
