export type Project = {
  no: string;
  name: string;
  title: string;
  body: string;
  tags: string[];
  href: string;
};

export const owner = {
  name: "Muthu Kumar Koodalingam",
  role: "Senior QA Automation Engineer",
  location: "Frankfurt am Main, Germany",
  years: 14,
  email: "k.muthukumar90@yahoo.in",
  linkedin: "https://www.linkedin.com/in/muthukumark12/",
  github: "https://github.com/mov2day",
  certifications: ["ISTQB CTFL"],
  focus:
    "AI use cases that make existing QA expertise easier to apply: agents for test design and analysis, reusable skills for common practices, and quality gates that retain human accountability.",
  availability: "Open to a conversation",
};

export const projects: Project[] = [
  {
    no: "01",
    name: "UnifiedTest",
    title: "Test execution made observable across frameworks.",
    body: "A Gradle plugin that carries results from console output and HTML reports through to OpenTelemetry traces and test-management integration.",
    tags: ["Java / Gradle", "JUnit · TestNG · Spock", "OTLP"],
    href: "https://github.com/mov2day/UnifiedTest",
  },
  {
    no: "02",
    name: "Karate Test Generator",
    title: "API tests generated from the specs you already have.",
    body: "A VS Code extension for creating and maintaining Karate API tests from OpenAPI, Postman and documentation — with bug hunting, coverage and CI repair.",
    tags: ["TypeScript", "OpenAPI · Postman", "Karate DSL"],
    href: "https://github.com/mov2day/KaratePlugin",
  },
  {
    no: "03",
    name: "AssertIQ",
    title: "Static test intelligence for JavaScript and TypeScript.",
    body: "Assesses test-suite risk without running tests and gives CI a clear way to gate new quality debt.",
    tags: ["TypeScript / CLI", "HTML · JSON · SARIF", "GitHub Action"],
    href: "https://github.com/mov2day/assertiq",
  },
  {
    no: "04",
    name: "QE-MCP",
    title: "Quality enforcement for coding agents.",
    body: "An MCP server that gives agents repository-aware test plans, validation layers and strategy-based quality gates.",
    tags: ["Python / FastMCP", "Pytest · Compose", "Quality gates"],
    href: "https://github.com/mov2day/Andriod-test-mcp",
  },
];

export const principles = [
  {
    title: "Build the right level of coverage",
    body: "Unit, integration, end-to-end — proportioned to real risk rather than to habit, so the suite stays affordable to run and to trust.",
  },
  {
    title: "Make failure useful, not noisy",
    body: "A red run should carry a signal, a diagnosis and an action. Reports exist to shorten the distance between failure and fix.",
  },
  {
    title: "Give the team a system it can own",
    body: "Patterns, coaching and adoption. Automation that only one person can maintain is a liability disguised as coverage.",
  },
];

export const roles = [
  {
    period: "2022 — Present",
    title: "Senior QA Automation Engineer",
    place: "GLS IT Services, Frankfurt",
    body: "Defined automation strategy, built mobile frameworks and test metrics, and supported QA upskilling across the chapter. Improved test execution time by 28%.",
    current: true,
  },
  {
    period: "2022",
    title: "Test Lead",
    place: "Capgemini, Wrocław",
    body: "Improved the SpecFlow framework and integrated testing for new functional releases.",
  },
  {
    period: "2021 — 2022",
    title: "Engineer Lead",
    place: "Prenetics Innovation Labs, Chennai",
    body: "Led QA operations and implemented a scalable real-device mobile automation pipeline using AWS Device Farm.",
  },
  {
    period: "2018 — 2021",
    title: "Automation Architect / Senior Technical Lead",
    place: "HCL Technologies, Chennai",
    body: "Led 20+ engineers and built multi-application automation platforms, CI/CD workflows, machine monitoring and robotic-arm automation.",
  },
];
