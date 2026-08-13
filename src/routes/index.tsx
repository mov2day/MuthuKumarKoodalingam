const projects = [
  {
    no: "01",
    name: "UnifiedTest",
    title: "One test run. Every signal connected.",
    body: "A Gradle plugin that turns Java test output into traceable release evidence across HTML reports, OpenTelemetry and test management.",
    tags: ["Java / Gradle", "JUnit · TestNG · Spock", "OTLP"],
    href: "https://github.com/mov2day/UnifiedTest",
  },
  {
    no: "02",
    name: "Karate Test Generator",
    title: "From API spec to useful tests — faster.",
    body: "A VS Code extension that turns OpenAPI, Postman and documentation into maintainable Karate tests, then helps with coverage, bug hunting and CI repair.",
    tags: ["TypeScript", "OpenAPI · Postman", "Karate DSL"],
    href: "https://github.com/mov2day/KaratePlugin",
  },
  {
    no: "03",
    name: "AssertIQ",
    title: "Find brittle tests before CI does.",
    body: "Static analysis for JavaScript and TypeScript test suites, exposing risk early and giving CI a clear gate for new quality debt.",
    tags: ["TypeScript / CLI", "HTML · JSON · SARIF", "GitHub Action"],
    href: "https://github.com/mov2day/assertiq",
  },
  {
    no: "04",
    name: "QE-MCP",
    title: "Give coding agents a quality conscience.",
    body: "An MCP server that grounds agents in repository-aware test plans, layered validation and strategy-based quality gates.",
    tags: ["Python / FastMCP", "Pytest · Compose", "Quality gates"],
    href: "https://github.com/mov2day/Andriod-test-mcp",
  },
];

const principles = [
  {
    title: "Test the risk, not the checklist",
    body: "Use the cheapest test level that can expose the failure that matters. Coverage should protect decisions, not inflate a dashboard.",
  },
  {
    title: "Make every red build worth reading",
    body: "A failure should arrive with context, a likely cause and a next step. Good reporting shortens the distance from red to resolved.",
  },
  {
    title: "Build it so the team owns it",
    body: "Patterns, documentation and coaching turn a framework into a shared capability. If one person must guard it, it does not scale.",
  },
];

const roles = [
  {
    period: "2022 — Present",
    title: "Senior QA Automation Engineer",
    place: "GLS IT Services, Frankfurt",
    body: "Set the automation direction, built mobile frameworks and test metrics, and helped the QA chapter adopt them — cutting execution time by 28%.",
    current: true,
  },
  {
    period: "2022",
    title: "Test Lead",
    place: "Capgemini, Wrocław",
    body: "Strengthened the SpecFlow framework and integration coverage so new functional releases reached feedback sooner.",
    current: false,
  },
  {
    period: "2021 — 2022",
    title: "Engineer Lead",
    place: "Prenetics Innovation Labs, Chennai",
    body: "Led QA operations and took mobile automation onto real devices at scale with AWS Device Farm.",
    current: false,
  },
  {
    period: "2018 — 2021",
    title: "Automation Architect / Senior Technical Lead",
    place: "HCL Technologies, Chennai",
    body: "Led 20+ engineers building automation platforms across applications, CI/CD, machine monitoring and robotic-arm testing.",
    current: false,
  },
];

export function Portfolio() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-accent-foreground">
      <a href="#content" className="skip-link">
        Skip to content
      </a>

      <nav className="site-nav sticky top-0 z-50 flex items-center justify-between border-b border-foreground/8 bg-background/90 px-5 py-4 backdrop-blur-md sm:px-6">
        <a href="#content" className="font-mono text-sm font-bold tracking-tight">
          Muthu Kumar
        </a>
        <div className="hidden gap-8 font-mono text-xs tracking-widest uppercase md:flex">
          <a href="#projects" className="transition-colors hover:text-accent">
            Projects
          </a>
          <a href="#principles" className="transition-colors hover:text-accent">
            Principles
          </a>
          <a href="#experience" className="transition-colors hover:text-accent">
            Experience
          </a>
          <a
            href="#contact"
            className="bg-foreground px-3 py-1 text-background transition-colors hover:bg-accent"
          >
            Contact
          </a>
        </div>
        <a
          href="#contact"
          className="bg-foreground px-3 py-1.5 font-mono text-[10px] tracking-widest text-background uppercase transition-colors hover:bg-accent md:hidden"
        >
          Contact
        </a>
      </nav>

      <main id="content">
        <header className="hero-grid page-enter relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-3xl">
            <div className="mb-6 inline-block rounded-full border border-foreground/10 px-3 py-1">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                Senior QA Automation Engineer / Frankfurt, DE
              </span>
            </div>
            <h1 className="mb-8 text-5xl leading-[0.92] font-extrabold tracking-[-0.055em] text-balance sm:text-6xl md:text-8xl">
              I turn release <span className="text-accent">risk</span> into evidence.
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
              Fourteen years building automation that catches what matters, explains what broke and
              gives teams a clear reason to ship.
            </p>
            <div className="expertise-line mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              <span>Test architecture</span>
              <span>Feedback systems</span>
              <span>AI for QA</span>
            </div>
          </div>
        </header>

        <section className="perspective-band bg-foreground px-6 py-20 text-background md:py-24">
          <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-8 font-mono text-xs tracking-[0.3em] text-accent uppercase">
                Point of view
              </h2>
              <p className="text-3xl leading-snug font-light">
                The best test suite does more than pass. It makes the next release decision easier
                to defend.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:border-l md:border-background/10 md:pl-16">
              <div className="metric-cell">
                <span className="mb-2 block font-mono text-4xl">14</span>
                <span className="text-xs tracking-widest text-background/50 uppercase">
                  Years solving quality problems
                </span>
              </div>
              <div className="metric-cell">
                <span className="mb-2 block font-mono text-4xl">04</span>
                <span className="text-xs tracking-widest text-background/50 uppercase">
                  Tools shipped in public
                </span>
              </div>
              <div className="metric-cell">
                <span className="mb-2 block font-mono text-4xl">28%</span>
                <span className="text-xs tracking-widest text-background/50 uppercase">
                  Faster test execution
                </span>
              </div>
              <div className="metric-cell">
                <span className="mb-2 block font-mono text-4xl">CTFL</span>
                <span className="text-xs tracking-widest text-background/50 uppercase">
                  Certified foundation
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24 md:py-32">
          <div className="mb-16 flex items-end justify-between border-b border-foreground/10 pb-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase">
                Selected open-source work
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight">
                Tools that remove QA friction.
              </h2>
            </div>
            <span className="font-mono text-xs text-muted-foreground">/04_ENTRIES</span>
          </div>

          <div className="grid gap-px border border-foreground/10 bg-foreground/10 md:grid-cols-2">
            {projects.map((p) => (
              <a
                key={p.no}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="project-card group relative flex h-full flex-col overflow-hidden bg-background p-6 transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-secondary focus-visible:z-10 md:p-10"
              >
                <span className="mb-4 block font-mono text-xs text-accent">
                  {p.no}. {p.name}
                </span>
                <h3 className="mb-4 text-2xl font-bold">{p.title}</h3>
                <p className="mb-8 text-muted-foreground">{p.body}</p>
                <div className="mt-auto flex flex-wrap gap-3">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-foreground/10 bg-foreground/5 px-2 py-1 font-mono text-[10px] uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="project-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        <section
          id="principles"
          className="scroll-mt-20 border-y border-foreground/5 bg-secondary px-6 py-24 md:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-2xl">
              <h2 className="font-mono text-xs tracking-[0.3em] uppercase">How I build</h2>
              <p className="mt-5 text-2xl leading-snug font-medium tracking-tight">
                Three rules for automation people can run, read and trust.
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-3">
              {principles.map((pr, index) => (
                <div key={pr.title} className="principle-item">
                  <span className="mb-8 block font-mono text-xs text-accent">0{index + 1}</span>
                  <h3 className="mb-4 text-lg font-bold">{pr.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{pr.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24 md:py-32">
          <div className="flex flex-col gap-16 md:flex-row">
            <div className="md:w-1/3 md:shrink-0">
              <h2 className="sticky top-32 text-4xl font-bold tracking-tight">
                Built in the real world.
              </h2>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground md:sticky md:top-56">
                Product, consulting and enterprise teams — each with different constraints, all
                needing faster feedback.
              </p>
            </div>
            <div className="space-y-20 md:w-2/3">
              {roles.map((r) => (
                <div
                  key={r.title}
                  className={`role-item relative border-l-2 pl-8 ${
                    r.current ? "border-accent" : "border-accent/20"
                  }`}
                >
                  <div
                    className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full ${
                      r.current ? "bg-accent" : "bg-foreground"
                    }`}
                  />
                  <span className="font-mono text-xs text-muted-foreground">{r.period}</span>
                  <h3 className="mt-2 text-2xl font-bold">{r.title}</h3>
                  <p className="mb-4 font-mono text-sm text-accent">{r.place}</p>
                  <p className="text-muted-foreground">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="focus-panel relative overflow-hidden bg-foreground p-8 text-background sm:p-12 md:p-20">
            <div className="relative z-10 max-w-2xl">
              <h2 className="mb-6 font-mono text-xs tracking-widest text-accent uppercase">
                Current focus
              </h2>
              <p className="mb-8 text-3xl font-light">
                AI should sharpen QA judgment, not replace it. I’m building practical ways to carry
                test expertise into everyday engineering — with agents, reusable skills and quality
                gates that keep people accountable.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                <span className="font-mono text-xs tracking-widest uppercase">
                  Open to thoughtful collaborations
                </span>
              </div>
            </div>
            <div className="absolute right-[-10%] bottom-[-20%] opacity-10">
              <span className="text-[20rem] font-black tracking-tighter">QA</span>
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="site-footer scroll-mt-20 border-t border-foreground/5 px-6 py-20 md:py-24"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 md:flex-row">
          <div>
            <h2 className="mb-8 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Let’s make your next
              <br />
              release easier to trust.
            </h2>
            <a
              href="mailto:k.muthukumar90@yahoo.in"
              className="font-mono text-base text-accent underline-offset-8 transition-all hover:underline hover:decoration-2 sm:text-xl md:text-2xl"
            >
              k.muthukumar90@yahoo.in
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 sm:gap-x-24">
            <div className="flex flex-col">
              <span className="mb-2 font-mono text-[10px] text-muted-foreground uppercase">
                Socials
              </span>
              <a
                href="https://www.linkedin.com/in/muthukumark12/"
                target="_blank"
                rel="noreferrer"
                className="text-sm hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/mov2day"
                target="_blank"
                rel="noreferrer"
                className="text-sm hover:text-accent"
              >
                GitHub
              </a>
            </div>
            <div className="flex flex-col">
              <span className="mb-2 font-mono text-[10px] text-muted-foreground uppercase">
                Location
              </span>
              <span className="text-sm">Frankfurt am Main</span>
              <span className="text-sm">Germany</span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-24 flex max-w-7xl justify-between border-t border-foreground/5 pt-8">
          <span className="font-mono text-[10px] text-muted-foreground">
            © 2026 Muthu Kumar Koodalingam
          </span>
          <span className="font-mono text-[10px] text-muted-foreground uppercase">
            Evidence before confidence
          </span>
        </div>
      </footer>
    </div>
  );
}
