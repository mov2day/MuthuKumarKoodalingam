import { useEffect, useState } from "react";

const projects = [
  {
    no: "01",
    name: "UnifiedTest",
    title: "One test run. Every signal connected.",
    body: "A Gradle plugin that turns Java test output into structured reports, OpenTelemetry signals and test-management evidence.",
    tags: ["Java / Gradle", "JUnit · TestNG", "OpenTelemetry"],
    href: "/projects/unifiedtest/",
    visual: "telemetry",
  },
  {
    no: "02",
    name: "Karate Test Management",
    title: "From API spec to managed test evidence.",
    body: "A VS Code workspace for creating, running, analysing and maintaining Karate API tests with OpenAPI coverage and project-aware execution.",
    tags: ["TypeScript", "OpenAPI · Postman", "Karate DSL"],
    href: "/projects/karate-test-management/",
    visual: "api",
  },
  {
    no: "03",
    name: "AssertIQ",
    title: "Find brittle tests before CI does.",
    body: "Static test intelligence for JavaScript, TypeScript and pytest suites, with actionable findings and CI gates for new quality debt.",
    tags: ["JS · TS · pytest", "HTML · JSON · SARIF", "GitHub Action"],
    href: "/projects/assertiq/",
    visual: "analysis",
  },
  {
    no: "04",
    name: "QE-MCP",
    title: "Give coding agents a quality conscience.",
    body: "An MCP server that grounds coding agents in repository-aware test plans, layered validation and strategy-based quality gates.",
    tags: ["Python / FastMCP", "pytest · Compose", "Quality gates"],
    href: "/projects/qe-mcp/",
    visual: "agents",
  },
];

const principles = [
  {
    no: "01",
    title: "Test the risk, not the checklist",
    body: "Use the cheapest test level that can expose the failure that matters. Coverage should protect decisions, not inflate a dashboard.",
  },
  {
    no: "02",
    title: "Make every red build worth reading",
    body: "A failure should arrive with context, a likely cause and a next step. Good reporting shortens the distance from red to resolved.",
  },
  {
    no: "03",
    title: "Build it so the team owns it",
    body: "Patterns, documentation and coaching turn a framework into a shared capability. If one person must guard it, it does not scale.",
  },
];

const roles = [
  {
    period: "2022 — Present",
    title: "Principal QA Engineer",
    place: "GLS IT Services, Frankfurt",
    body: "Shape quality architecture across mobile, backend and CI/CD — moving feedback toward component, API and contract layers while making release evidence easier to read and act on.",
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

const notes = [
  {
    date: "15 SEP 2026",
    tag: "OPENAPI · COVERAGE",
    title: "Your Karate Tests Are Green. But Is Your API Actually Covered?",
    body: "Why execution health and contract coverage are different signals — and how to map Karate evidence back to the API surface.",
    href: "/blog/karate-api-coverage-openapi-gaps/",
  },
  {
    date: "11 SEP 2026",
    tag: "KARATE · GENERATION",
    title: "Generate Karate Tests from OpenAPI Without Creating a Maintenance Nightmare",
    body: "A deterministic-first approach to generating useful tests that fit the project instead of creating another maintenance burden.",
    href: "/blog/openapi-to-karate-without-maintenance-nightmare/",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <i />
      <i />
    </span>
  );
}

function ProjectVisual({ visual }: { visual: string }) {
  if (visual === "telemetry") {
    return (
      <div className="project-visual telemetry-visual" aria-hidden="true">
        <div className="visual-toolbar"><span /><span /><span /><small>run #4821</small></div>
        <div className="telemetry-grid">
          <div className="telemetry-chart">
            <span style={{ height: "42%" }} /><span style={{ height: "68%" }} /><span style={{ height: "52%" }} />
            <span style={{ height: "84%" }} /><span style={{ height: "72%" }} /><span style={{ height: "92%" }} />
          </div>
          <div className="signal-list"><span><i /> JUnit</span><span><i /> TestNG</span><span><i /> Karate</span></div>
        </div>
      </div>
    );
  }

  if (visual === "api") {
    return (
      <div className="project-visual api-visual" aria-hidden="true">
        <div className="visual-toolbar"><span /><span /><span /><small>coverage.map</small></div>
        <div className="endpoint-list">
          <div><b>GET</b><span>/customers</span><em>covered</em></div>
          <div><b>POST</b><span>/orders</span><em>covered</em></div>
          <div className="endpoint-gap"><b>PATCH</b><span>/customers/:id</span><em>gap</em></div>
          <div><b>DELETE</b><span>/orders/:id</span><em>covered</em></div>
        </div>
      </div>
    );
  }

  if (visual === "analysis") {
    return (
      <div className="project-visual analysis-visual" aria-hidden="true">
        <div className="visual-toolbar"><span /><span /><span /><small>assertiq scan</small></div>
        <div className="code-lines">
          <span className="code-line long" /><span className="code-line medium" /><span className="code-line short alert"><i>!</i></span>
          <span className="code-line long" /><span className="code-line medium warning"><i>2</i></span><span className="code-line short" />
        </div>
        <div className="analysis-chip">2 actionable findings</div>
      </div>
    );
  }

  return (
    <div className="project-visual agent-visual" aria-hidden="true">
      <div className="visual-toolbar"><span /><span /><span /><small>quality graph</small></div>
      <div className="agent-network">
        <div className="network-line line-a" /><div className="network-line line-b" /><div className="network-line line-c" />
        <div className="network-node node-core">QE</div><div className="network-node node-a">Plan</div>
        <div className="network-node node-b">Test</div><div className="network-node node-c">Gate</div>
      </div>
    </div>
  );
}

function QualityOrb() {
  return (
    <div className="quality-orb" aria-hidden="true">
      <div className="orb-ring orb-ring-one" /><div className="orb-ring orb-ring-two" /><div className="orb-ring orb-ring-three" />
      <div className="orb-axis orb-axis-x" /><div className="orb-axis orb-axis-y" /><div className="orb-sweep" />
      <div className="orb-node orb-node-a" /><div className="orb-node orb-node-b" /><div className="orb-node orb-node-c" />
      <div className="orb-core"><span>QA</span><small>signal</small></div>
    </div>
  );
}

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell">
      <a href="#content" className="skip-link">Skip to content</a>

      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <a href="#content" className="brand" aria-label="Muthu Kumar — home" onClick={closeMenu}>
            <span className="brand-mark">MK</span><span className="brand-copy">Muthu Kumar</span>
          </a>
          <div className="nav-links">
            <a href="#projects">Work</a><a href="#principles">Principles</a><a href="#experience">Experience</a><a href="#notes">Notes</a>
          </div>
          <a href="#contact" className="nav-cta">Contact <ArrowIcon /></a>
          <button type="button" className="mobile-menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <MenuIcon open={menuOpen} />
          </button>
          <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${scrollProgress})` }} /></div>
        </div>
        <div id="mobile-navigation" className={`mobile-menu-panel ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
          <div className="mobile-menu-inner">
            <span className="mobile-menu-kicker">Navigate</span>
            <a href="#projects" onClick={closeMenu}><span>01</span> Selected work <ArrowIcon /></a>
            <a href="#principles" onClick={closeMenu}><span>02</span> Principles <ArrowIcon /></a>
            <a href="#experience" onClick={closeMenu}><span>03</span> Experience <ArrowIcon /></a>
            <a href="#notes" onClick={closeMenu}><span>04</span> Engineering notes <ArrowIcon /></a>
            <a href="/about/" onClick={closeMenu}><span>05</span> About <ArrowIcon /></a>
            <a href="#contact" className="mobile-contact" onClick={closeMenu}>Start a conversation <ArrowIcon /></a>
          </div>
        </div>
      </nav>

      <main id="content">
        <header className="hero-section">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-grid page-enter">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" />Principal QA Engineer · Frankfurt, DE</div>
              <h1 className="hero-title">Release confidence,<span> engineered.</span></h1>
              <p className="hero-lede">I architect quality systems that turn complex delivery risk into fast, inspectable evidence — across mobile, APIs, CI/CD and AI-assisted engineering.</p>
              <div className="hero-actions">
                <a href="#projects" className="button button-primary">Explore selected work <ArrowIcon /></a>
                <a href="/blog/" className="button button-ghost">Read engineering notes</a>
              </div>
              <div className="hero-signals" aria-label="Areas of expertise"><span>Quality architecture</span><span>Automation platforms</span><span>AI for QA</span></div>
            </div>

            <div className="hero-console" aria-label="Quality signal visualization">
              <div className="console-topline"><span className="console-label">QUALITY / SIGNAL MAP</span><span className="live-status"><i /> LIVE</span></div>
              <div className="orb-stage"><QualityOrb /></div>
              <div className="console-metrics"><div><small>Feedback</small><strong>&lt; PR</strong></div><div><small>Evidence</small><strong>Layered</strong></div><div><small>Signal</small><strong>Actionable</strong></div></div>
            </div>
          </div>
        </header>

        <div className="marquee-band" aria-hidden="true">
          <div className="marquee-track">
            <span>QUALITY ARCHITECTURE</span><i>✦</i><span>MOBILE AUTOMATION</span><i>✦</i><span>API QUALITY</span><i>✦</i><span>CONTRACT TESTING</span><i>✦</i>
            <span>OBSERVABILITY</span><i>✦</i><span>AI-ASSISTED QA</span><i>✦</i><span>RELEASE CONFIDENCE</span><i>✦</i>
            <span>QUALITY ARCHITECTURE</span><i>✦</i><span>MOBILE AUTOMATION</span><i>✦</i><span>API QUALITY</span><i>✦</i><span>CONTRACT TESTING</span><i>✦</i>
            <span>OBSERVABILITY</span><i>✦</i><span>AI-ASSISTED QA</span><i>✦</i><span>RELEASE CONFIDENCE</span><i>✦</i>
          </div>
        </div>

        <section className="section-shell proof-section reveal-section" aria-label="Engineering impact">
          <div className="bento-grid">
            <article className="bento-card bento-intro">
              <span className="section-kicker">What I optimize for</span><h2>Evidence before confidence.</h2>
              <p>The best automation does not just produce green builds. It shortens the path from change to an informed release decision.</p>
              <div className="signal-wave" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
            </article>
            <article className="bento-card metric-card metric-years"><span className="metric-number">14+</span><span className="metric-label">years solving quality problems</span><div className="metric-orbit" aria-hidden="true"><i /><i /><i /></div></article>
            <article className="bento-card metric-card metric-speed"><span className="metric-number">28%</span><span className="metric-label">faster test execution</span><div className="speed-bars" aria-hidden="true"><span /><span /><span /><span /><span /></div></article>
            <article className="bento-card metric-card metric-tools"><span className="metric-number">04</span><span className="metric-label">public tools highlighted</span><div className="tool-stack" aria-hidden="true"><span>UT</span><span>KT</span><span>AI</span><span>QE</span></div></article>
          </div>
        </section>

        <section id="projects" className="section-shell projects-section reveal-section">
          <div className="section-heading"><div><span className="section-kicker">Selected open-source work</span><h2>Tools that make quality visible.</h2></div><p>Built around a recurring idea: better engineering decisions need better evidence, not more test noise.</p></div>
          <div className="project-grid">
            {projects.map((project) => (
              <a key={project.no} href={project.href} className={`project-card project-${project.visual}`}>
                <div className="project-topline"><span>{project.no}</span><span>{project.name}</span><span className="project-open"><ArrowIcon /></span></div>
                <ProjectVisual visual={project.visual} />
                <div className="project-copy"><h3>{project.title}</h3><p>{project.body}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
              </a>
            ))}
          </div>
        </section>

        <section id="principles" className="principles-wrap reveal-section">
          <div className="principles-panel">
            <div className="principles-intro"><span className="section-kicker">How I build</span><h2>Automation people can run, read and trust.</h2><p>Quality engineering scales when the system itself makes the right behavior easier for the whole team.</p></div>
            <div className="principle-list">{principles.map((principle) => <article key={principle.no} className="principle-row"><span className="principle-no">{principle.no}</span><h3>{principle.title}</h3><p>{principle.body}</p></article>)}</div>
          </div>
        </section>

        <section id="experience" className="section-shell experience-section reveal-section">
          <div className="experience-layout">
            <div className="experience-intro"><span className="section-kicker">Experience</span><h2>Built in the real world.</h2><p>Product, consulting and enterprise teams — different constraints, same need for faster, clearer feedback.</p><a href="/about/" className="text-link">More about my work <ArrowIcon /></a></div>
            <div className="timeline">
              {roles.map((role) => (
                <article key={`${role.period}-${role.title}`} className={`timeline-item ${role.current ? "is-current" : ""}`}>
                  <div className="timeline-marker" aria-hidden="true"><span /></div><div className="timeline-period">{role.period}</div>
                  <div className="timeline-copy"><div className="timeline-title-row"><h3>{role.title}</h3>{role.current && <span className="current-pill">Current</span>}</div><span className="timeline-place">{role.place}</span><p>{role.body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="notes" className="section-shell notes-section reveal-section">
          <div className="section-heading notes-heading">
            <div><span className="section-kicker">Latest engineering notes</span><h2>Writing from the workbench.</h2></div>
            <div className="notes-intro"><p>Practical notes on API quality, automation architecture and trustworthy AI-assisted testing.</p><a href="/blog/" className="text-link">View all notes <ArrowIcon /></a></div>
          </div>
          <div className="notes-grid">
            {notes.map((note, index) => (
              <a key={note.href} href={note.href} className="note-card">
                <div className="note-card-top"><span>{note.date}</span><span>{note.tag}</span></div><div className="note-index">0{index + 1}</div>
                <h3>{note.title}</h3><p>{note.body}</p><span className="note-read">Read note <ArrowIcon /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="section-shell focus-section reveal-section">
          <div className="focus-card"><div className="focus-noise" aria-hidden="true" />
            <div className="focus-copy"><span className="section-kicker">Current focus</span><h2>AI should sharpen QA judgment, not replace it.</h2><p>I’m building practical ways to carry test expertise into everyday engineering — with agents, reusable skills and quality gates that keep evidence inspectable and people accountable.</p><div className="availability"><i /> Open to thoughtful collaborations</div></div>
            <div className="focus-visual" aria-hidden="true"><div className="focus-ring ring-one" /><div className="focus-ring ring-two" /><div className="focus-ring ring-three" /><div className="focus-core">QA</div></div>
          </div>
        </section>
      </main>

      <footer id="contact" className="site-footer">
        <div className="footer-pixels" aria-hidden="true" /><div className="footer-inner"><span className="section-kicker">Start a conversation</span>
          <div className="footer-main"><h2>Make the next release easier to trust.</h2><a href="mailto:k.muthukumar90@yahoo.in" className="footer-email">k.muthukumar90@yahoo.in <ArrowIcon /></a></div>
          <div className="footer-bottom"><div className="footer-links"><a href="/about/">About</a><a href="https://www.linkedin.com/in/muthukumark12/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/mov2day" target="_blank" rel="noreferrer">GitHub</a><a href="/blog/">Engineering notes</a></div><div className="footer-meta"><span>Frankfurt am Main · Germany</span><span>© 2026 Muthu Kumar Koodalingam</span></div></div>
        </div>
      </footer>
    </div>
  );
}
