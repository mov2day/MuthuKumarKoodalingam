const projects = [
  {
    no: "01",
    name: "UnifiedTest",
    summary: "One test trail across Java frameworks, observability, and test management.",
    detail:
      "A Gradle plugin that turns framework output into structured release evidence through OpenTelemetry traces and test-management integrations.",
    stack: "JAVA / GRADLE / OTLP",
    href: "https://github.com/mov2day/UnifiedTest",
  },
  {
    no: "02",
    name: "Karate Test Generator",
    summary: "API test generation from the specifications teams already maintain.",
    detail:
      "A VS Code extension that creates and maintains Karate tests from OpenAPI, Postman, and documentation, with coverage and CI repair workflows.",
    stack: "TYPESCRIPT / OPENAPI / KARATE",
    href: "https://github.com/mov2day/KaratePlugin",
  },
  {
    no: "03",
    name: "AssertIQ",
    summary: "Static test intelligence before the suite reaches CI.",
    detail:
      "A CLI for JavaScript and TypeScript that detects brittle test patterns and gives teams a practical gate for new quality debt.",
    stack: "TYPESCRIPT / SARIF / GITHUB ACTIONS",
    href: "https://github.com/mov2day/assertiq",
  },
  {
    no: "04",
    name: "QE-MCP",
    summary: "Repository-aware quality guidance for coding agents.",
    detail:
      "An MCP server that gives agents test plans, layered validation, and strategy-based quality gates grounded in the code they are changing.",
    stack: "PYTHON / FASTMCP / PYTEST",
    href: "https://github.com/mov2day/Andriod-test-mcp",
  },
];

const principles = [
  {
    title: "Coverage follows risk.",
    body: "Choose the cheapest test level that can expose the failure that matters. More tests are not the same as better evidence.",
  },
  {
    title: "Failure should explain itself.",
    body: "A red run needs context, ownership, and a useful next step. Diagnosis belongs in the feedback loop, not in a separate investigation.",
  },
  {
    title: "Teams must own the system.",
    body: "Patterns, documentation, and coaching matter as much as framework code. Automation that needs a permanent gatekeeper does not scale.",
  },
];

const roles = [
  {
    period: "2022 - NOW",
    title: "Senior QA Automation Engineer",
    company: "GLS IT Services",
    location: "Frankfurt",
    evidence: "Mobile frameworks, test metrics, QA chapter enablement, 28% faster execution.",
  },
  {
    period: "2022",
    title: "Test Lead",
    company: "Capgemini",
    location: "Wroclaw",
    evidence: "SpecFlow framework improvement and integration testing for functional releases.",
  },
  {
    period: "2021 - 2022",
    title: "Engineer Lead",
    company: "Prenetics Innovation Labs",
    location: "Chennai",
    evidence: "QA operations and scalable real-device mobile automation on AWS Device Farm.",
  },
  {
    period: "2018 - 2021",
    title: "Automation Architect / Senior Technical Lead",
    company: "HCL Technologies",
    location: "Chennai",
    evidence: "Led 20+ engineers across automation platforms, CI/CD, monitoring, and robotics.",
  },
];

export function Portfolio() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        <a className="nav-name" href="#main">
          Muthu Kumar Koodalingam
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main id="main">
        <header className="hero">
          <div className="hero-kicker reveal reveal-1">
            <span>QA AUTOMATION ENGINEER</span>
            <span>FRANKFURT, DE</span>
          </div>

          <h1 className="reveal reveal-2">
            Quality systems
            <br />
            built for the <em>real</em>
            <br />
            release cycle.
          </h1>

          <div className="hero-bottom reveal reveal-3">
            <p>
              I design test architecture, tooling, and feedback loops that help engineering teams
              release with evidence instead of instinct.
            </p>
            <a className="text-link" href="#work">
              Selected work <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </header>

        <section className="evidence" aria-label="Career highlights">
          <div className="evidence-intro">
            <span className="section-label">THE SHORT VERSION</span>
            <p>
              Fourteen years across product, consulting, and enterprise teams. The common thread:
              making complex quality work easier to operate and easier to trust.
            </p>
          </div>
          <dl className="metrics">
            <div>
              <dt>Years in quality</dt>
              <dd>14</dd>
            </div>
            <div>
              <dt>Open-source tools</dt>
              <dd>04</dd>
            </div>
            <div>
              <dt>Execution gain</dt>
              <dd>28%</dd>
            </div>
            <div>
              <dt>Engineers led</dt>
              <dd>20+</dd>
            </div>
          </dl>
        </section>

        <section id="work" className="work section-wrap">
          <div className="section-heading">
            <span className="section-label">01 / SELECTED WORK</span>
            <h2>Tools made from recurring problems.</h2>
            <p>
              Public projects focused on test visibility, API automation, static analysis, and
              quality controls for AI-assisted development.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <a
                className="project-row"
                href={project.href}
                key={project.no}
                rel="noreferrer"
                target="_blank"
              >
                <span className="project-no">{project.no}</span>
                <div className="project-main">
                  <h3>{project.name}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <p className="project-detail">{project.detail}</p>
                </div>
                <div className="project-meta">
                  <span>{project.stack}</span>
                  <span className="project-arrow" aria-hidden="true">
                    -&gt;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="principles" className="principles section-wrap">
          <div className="section-heading compact">
            <span className="section-label">02 / OPERATING PRINCIPLES</span>
            <h2>Automation is only useful when it improves a decision.</h2>
          </div>
          <div className="principle-list">
            {principles.map((principle, index) => (
              <article key={principle.title}>
                <span>0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="experience section-wrap">
          <div className="section-heading compact">
            <span className="section-label">03 / EXPERIENCE</span>
            <h2>Built under real delivery pressure.</h2>
          </div>
          <div className="role-list">
            {roles.map((role) => (
              <article className="role-row" key={`${role.period}-${role.company}`}>
                <span className="role-period">{role.period}</span>
                <div className="role-title">
                  <h3>{role.title}</h3>
                  <p>
                    {role.company} / {role.location}
                  </p>
                </div>
                <p className="role-evidence">{role.evidence}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="focus section-wrap">
          <span className="section-label">CURRENTLY EXPLORING</span>
          <p>
            Practical AI for quality engineering: agent-assisted test design, reusable QA skills,
            and automated gates that preserve human accountability.
          </p>
          <span className="focus-note">Open to thoughtful collaborations.</span>
        </section>
      </main>

      <footer id="contact" className="footer section-wrap">
        <div className="footer-lead">
          <span className="section-label">04 / CONTACT</span>
          <h2>Have a difficult quality problem?</h2>
          <a href="mailto:k.muthukumar90@yahoo.in">k.muthukumar90@yahoo.in</a>
        </div>
        <div className="footer-meta">
          <div>
            <span>ELSEWHERE</span>
            <a href="https://www.linkedin.com/in/muthukumark12/" rel="noreferrer" target="_blank">
              LinkedIn
            </a>
            <a href="https://github.com/mov2day" rel="noreferrer" target="_blank">
              GitHub
            </a>
          </div>
          <div>
            <span>BASED IN</span>
            <p>Frankfurt am Main</p>
            <p>Germany</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Muthu Kumar Koodalingam</span>
          <a href="#main">Back to top ^</a>
        </div>
      </footer>
    </div>
  );
}
