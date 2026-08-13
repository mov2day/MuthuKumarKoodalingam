const projects = [
  {
    no: "01",
    name: "UnifiedTest",
    title: "Trace a test run from framework output to release evidence.",
    body: "Built for teams juggling multiple Java stacks who still need one place to read failures, compare results, and feed observability or test-management workflows.",
    tags: ["Java / Gradle", "JUnit · TestNG · Spock", "OTLP"],
    href: "https://github.com/mov2day/UnifiedTest",
  },
  {
    no: "02",
    name: "Karate Test Generator",
    title: "Generate API checks from the specifications teams already maintain.",
    body: "Turns OpenAPI files, Postman collections, and written documentation into Karate tests, then helps keep those suites aligned as the product changes.",
    tags: ["TypeScript", "OpenAPI · Postman", "Karate DSL"],
    href: "https://github.com/mov2day/KaratePlugin",
  },
  {
    no: "03",
    name: "AssertIQ",
    title: "Spot risky tests before CI spends time running them.",
    body: "Static analysis for JavaScript and TypeScript suites that highlights brittle patterns, ownership gaps, and new quality debt before it lands in the pipeline.",
    tags: ["TypeScript / CLI", "HTML · JSON · SARIF", "GitHub Action"],
    href: "https://github.com/mov2day/assertiq",
  },
  {
    no: "04",
    name: "QE-MCP",
    title: "Give coding agents a QA teammate they can actually consult.",
    body: "An MCP server that helps agents ask better testing questions, assemble repo-aware plans, and apply quality gates without guessing their way through a codebase.",
    tags: ["Python / FastMCP", "Pytest · Compose", "Quality gates"],
    href: "https://github.com/mov2day/Andriod-test-mcp",
  },
];

const principles = [
  {
    title: "Choose coverage by risk, not habit",
    body: "A healthy suite matches the product's exposure. The point is not to automate everything. The point is to protect the decisions that would be expensive to get wrong.",
  },
  {
    title: "Make every failure explain itself",
    body: "A red build should carry evidence, context, and a likely next step. Teams move faster when a failure shortens the path to a fix instead of starting an investigation from scratch.",
  },
  {
    title: "Leave behind a system the team can run",
    body: "Good automation survives handoffs. I bias toward patterns, coaching, and operating models that stay useful after the initial build phase is over.",
  },
];

const roles = [
  {
    period: "2022 - Present",
    title: "Senior QA Automation Engineer",
    place: "GLS IT Services, Frankfurt",
    body: "Set the automation direction for mobile and platform teams, built frameworks that cut execution time by 28%, and helped engineers across the QA chapter adopt them with confidence.",
    current: true,
  },
  {
    period: "2022",
    title: "Test Lead",
    place: "Capgemini, Wroclaw",
    body: "Improved the SpecFlow framework, strengthened integration coverage, and supported delivery teams through new functional releases without letting feedback loops drift.",
    current: false,
  },
  {
    period: "2021 - 2022",
    title: "Engineer Lead",
    place: "Prenetics Innovation Labs, Chennai",
    body: "Led QA operations and built a scalable real-device mobile automation pipeline on AWS Device Farm for a health-tech environment with fast release pressure.",
    current: false,
  },
  {
    period: "2018 - 2021",
    title: "Automation Architect / Senior Technical Lead",
    place: "HCL Technologies, Chennai",
    body: "Led more than 20 engineers while building multi-application automation platforms, CI/CD workflows, machine monitoring, and robotic-arm automation systems.",
    current: false,
  },
];

const focusAreas = [
  {
    label: "Architecture",
    body: "Web, mobile, and API automation systems that teams can extend without a rewrite every quarter.",
  },
  {
    label: "Feedback loops",
    body: "CI signals, observability, and reporting layers that make release risk visible before it becomes a production surprise.",
  },
  {
    label: "AI for QA",
    body: "Agent-assisted workflows with guardrails, so quality work gets faster without becoming guesswork.",
  },
];

const metrics = [
  { value: "14", label: "years building automation" },
  { value: "04", label: "public tooling projects" },
  { value: "28%", label: "faster execution at GLS" },
  { value: "20+", label: "engineers led and coached" },
];

const contactLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muthukumark12/",
  },
  {
    label: "GitHub",
    href: "https://github.com/mov2day",
  },
];

export function Portfolio() {
  return (
    <>
      <a href="#content" className="skip-link">
        Skip to content
      </a>

      <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-accent-foreground">
        <nav className="sticky top-0 z-50 border-b border-foreground/8 bg-background/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-6 py-4">
            <a href="#content" className="min-w-0">
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Muthu Kumar Koodalingam
              </p>
              <p className="mt-2 max-w-md font-display text-xl leading-none tracking-[-0.04em] md:text-2xl">
                QA automation, release confidence, and quality systems.
              </p>
            </a>

            <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
                <a href="#projects" className="hover:text-foreground">
                  Work
                </a>
                <a href="#principles" className="hover:text-foreground">
                  Approach
                </a>
                <a href="#experience" className="hover:text-foreground">
                  Experience
                </a>
              </div>

              <a
                href="#contact"
                className="rounded-full border border-foreground/12 bg-card px-4 py-2 text-sm text-foreground shadow-[0_16px_36px_-28px_rgba(58,42,31,0.45)] hover:-translate-y-0.5 hover:border-accent/35 hover:text-accent"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>

        <main id="content">
          <header className="mx-auto max-w-[88rem] px-6 pb-20 pt-16 md:pb-28 md:pt-24">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(21rem,0.85fr)] lg:items-end">
              <div className="max-w-5xl">
                <div className="inline-flex items-center gap-3 rounded-full border border-foreground/10 bg-card/80 px-4 py-2 text-[11px] tracking-[0.24em] text-muted-foreground uppercase shadow-[0_16px_40px_-32px_rgba(58,42,31,0.35)]">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  Senior QA automation engineer based in Frankfurt
                </div>

                <h1 className="mt-8 max-w-4xl font-display text-[clamp(4rem,10vw,7.8rem)] leading-[0.9] tracking-[-0.06em] [text-wrap:balance]">
                  I help teams trust what they are about to release.
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                  Fourteen years in test automation, quality strategy, and delivery feedback
                  systems. I build the frameworks, signals, and habits that make release decisions
                  calmer and more defensible.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#projects"
                    className="rounded-full bg-foreground px-6 py-3 text-sm text-background shadow-[0_20px_50px_-32px_rgba(58,42,31,0.55)] hover:-translate-y-0.5 hover:bg-accent"
                  >
                    See selected work
                  </a>
                  <a
                    href="#contact"
                    className="rounded-full border border-foreground/12 px-6 py-3 text-sm text-foreground hover:-translate-y-0.5 hover:border-accent/35 hover:text-accent"
                  >
                    Start a conversation
                  </a>
                </div>
              </div>

              <aside className="relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-card/90 p-8 shadow-[0_28px_80px_-52px_rgba(58,42,31,0.35)]">
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  Where I usually help
                </p>

                <div className="mt-6 space-y-6">
                  {focusAreas.map((item, index) => (
                    <div
                      key={item.label}
                      className="border-t border-foreground/8 pt-6 first:border-t-0 first:pt-0"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h2 className="font-display text-2xl tracking-[-0.03em]">{item.label}</h2>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </header>

          <section className="border-y border-foreground/8 bg-secondary/75">
            <div className="mx-auto grid max-w-[88rem] gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(24rem,0.9fr)] lg:items-start">
              <div className="max-w-3xl">
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  How I work
                </p>
                <p className="mt-5 max-w-3xl font-display text-4xl leading-tight tracking-[-0.04em] md:text-5xl [text-wrap:balance]">
                  Most teams do not need more tests. They need sharper evidence and clearer
                  ownership.
                </p>
                <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
                  I usually step in when releases are slowing down, signals are noisy, or a team has
                  outgrown the framework it started with. The work is part systems design, part
                  coaching, and part cleanup of the feedback loops people rely on every day.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.5rem] border border-foreground/8 bg-background/90 p-6 shadow-[0_18px_50px_-40px_rgba(58,42,31,0.3)]"
                  >
                    <span className="font-display text-4xl tracking-[-0.05em]">{metric.value}</span>
                    <p className="mt-2 max-w-[14rem] text-sm leading-6 text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="mx-auto max-w-[88rem] px-6 py-24 md:py-32">
            <div className="grid gap-8 border-b border-foreground/10 pb-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-end">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  Selected work
                </p>
                <h2 className="mt-4 font-display text-5xl tracking-[-0.05em] md:text-6xl">
                  Tools built around real QA friction.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                These projects come from recurring problems: hard-to-read failures, repetitive API
                test setup, weak signals in CI, and the need to make AI-assisted work more reliable.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <a
                  key={project.no}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative overflow-hidden rounded-[1.9rem] border border-foreground/10 bg-card/95 p-8 shadow-[0_24px_70px_-52px_rgba(58,42,31,0.35)] transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_30px_90px_-56px_rgba(145,90,54,0.35)] ${
                    index === 0
                      ? "md:col-span-2 md:grid md:grid-cols-[minmax(11rem,0.5fr)_minmax(0,1fr)] md:gap-8 md:p-10"
                      : ""
                  }`}
                >
                  <div>
                    <span className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
                      {project.no} / {project.name}
                    </span>
                  </div>

                  <div className={index === 0 ? "mt-8 md:mt-0" : "mt-8"}>
                    <h3 className="max-w-xl font-display text-3xl leading-tight tracking-[-0.04em] [text-wrap:balance]">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                      {project.body}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-foreground/10 bg-background/80 px-3 py-1 font-mono text-[10px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="mt-8 inline-flex items-center gap-2 text-sm text-foreground">
                      Open project
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {"->"}
                      </span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="principles" className="border-y border-foreground/8 bg-secondary/55">
            <div className="mx-auto grid max-w-[88rem] gap-12 px-6 py-24 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] md:py-28">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  Practice principles
                </p>
                <h2 className="mt-4 max-w-md font-display text-5xl tracking-[-0.05em] [text-wrap:balance]">
                  Quality work should make delivery easier to reason about.
                </h2>
              </div>

              <div className="space-y-8">
                {principles.map((principle, index) => (
                  <article
                    key={principle.title}
                    className="grid gap-4 rounded-[1.6rem] border border-foreground/8 bg-background/85 p-6 shadow-[0_18px_50px_-42px_rgba(58,42,31,0.28)] md:grid-cols-[5rem_minmax(0,1fr)] md:items-start"
                  >
                    <span className="font-display text-4xl tracking-[-0.05em] text-accent">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.02em]">
                        {principle.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                        {principle.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="experience" className="mx-auto max-w-[88rem] px-6 py-24 md:py-32">
            <div className="grid gap-14 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
              <div className="md:pr-8">
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  Experience
                </p>
                <h2 className="mt-4 max-w-md font-display text-5xl tracking-[-0.05em] [text-wrap:balance]">
                  A path shaped by delivery pressure, scale, and adoption work.
                </h2>
                <p className="mt-6 max-w-md text-base leading-8 text-muted-foreground">
                  I have worked across consulting, product, and enterprise settings. The common
                  thread is helping teams get better evidence out of their testing without creating
                  a system only specialists can operate.
                </p>
              </div>

              <div className="space-y-10">
                {roles.map((role) => (
                  <article
                    key={role.title}
                    className="relative rounded-[1.7rem] border border-foreground/10 bg-card/90 p-7 pl-10 shadow-[0_22px_60px_-48px_rgba(58,42,31,0.3)]"
                  >
                    <div className="absolute bottom-7 left-0 top-7 w-px bg-foreground/10" />
                    <div
                      className={`absolute left-[-5px] top-8 h-3 w-3 rounded-full ${
                        role.current ? "bg-accent" : "bg-foreground/35"
                      }`}
                    />
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {role.period}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{role.title}</h3>
                    <p className="mt-2 text-sm text-accent">{role.place}</p>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                      {role.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[88rem] px-6 pb-10">
            <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground px-8 py-10 text-background shadow-[0_30px_90px_-54px_rgba(58,42,31,0.45)] md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)] md:px-10 md:py-12">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-background/60 uppercase">
                  Current focus
                </p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-[-0.05em] [text-wrap:balance]">
                  Building practical ways to use AI in QA without removing human judgment.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-background/72">
                  Right now I am most interested in agent-assisted test design, reusable skills for
                  recurring QA work, and quality gates that keep accountability with the people
                  shipping the product.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-background/12 bg-background/8 p-6">
                <p className="font-mono text-[10px] tracking-[0.28em] text-background/60 uppercase">
                  Best fit conversations
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-background/80">
                  <li>
                    Automation architecture resets for teams that have outgrown their current stack.
                  </li>
                  <li>
                    Release feedback systems that need clearer evidence and fewer false alarms.
                  </li>
                  <li>
                    Internal QA tooling or AI workflows that need structure before wider adoption.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="px-6 py-24">
          <div className="mx-auto grid max-w-[88rem] gap-12 border-t border-foreground/10 pt-12 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)]">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Contact
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-5xl tracking-[-0.05em] [text-wrap:balance]">
                Working through a quality problem that needs a steadier system?
              </h2>
              <a
                href="mailto:k.muthukumar90@yahoo.in"
                className="mt-8 inline-flex text-lg text-accent underline decoration-accent/35 underline-offset-8 hover:decoration-accent"
              >
                k.muthukumar90@yahoo.in
              </a>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  Profiles
                </p>
                <div className="mt-4 space-y-3">
                  {contactLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-sm text-foreground hover:text-accent"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  Base
                </p>
                <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                  <p>Frankfurt am Main</p>
                  <p>Germany</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 flex max-w-[88rem] flex-col gap-3 border-t border-foreground/10 pt-6 font-mono text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Muthu Kumar Koodalingam</span>
            <span>Built to make quality work easier to trust.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
