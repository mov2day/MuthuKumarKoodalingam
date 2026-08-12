import { createFileRoute } from "@tanstack/react-router";
import { projects, principles, roles } from "@/lib/mcp/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muthu Kumar Koodalingam — QA Automation Engineer" },
      {
        name: "description",
        content:
          "Senior QA automation engineer in Frankfurt. Test architecture, mobile and API automation, and open-source quality tooling.",
      },
      {
        property: "og:title",
        content: "Muthu Kumar Koodalingam — QA Automation Engineer",
      },
      {
        property: "og:description",
        content:
          "Senior QA automation engineer in Frankfurt. Test architecture, mobile and API automation, and open-source quality tooling.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

export function Portfolio() {
  return (
    <div className="bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-foreground/5 bg-background/80 px-6 py-4 backdrop-blur-md">
        <span className="font-mono text-lg font-bold tracking-tighter underline decoration-accent decoration-2 underline-offset-4">
          MKK.LOG
        </span>
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
      </nav>

      <header className="relative mx-auto max-w-7xl px-6 pt-24 pb-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-block rounded-full border border-foreground/10 px-3 py-1">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              Status: Senior QA Automation Engineer / Frankfurt, DE
            </span>
          </div>
          <h1 className="mb-8 text-6xl leading-[0.9] font-extrabold tracking-tight md:text-8xl">
            I make software <span className="text-accent">quality</span> visible.
          </h1>
          <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Fourteen years building test automation that helps teams understand what changed, what
            matters, and when a release is ready.
          </p>
        </div>
      </header>

      <section className="bg-foreground px-6 py-24 text-background">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
          <div>
            <h2 className="mb-8 font-mono text-xs tracking-[0.3em] text-accent uppercase">
              Perspective
            </h2>
            <p className="text-3xl leading-snug font-light">
              Quality engineering is a way of making better decisions — turning tests from a
              pass/fail event into useful evidence for the people building the software.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 border-l border-background/10 pl-16">
            <div>
              <span className="mb-2 block font-mono text-4xl">14</span>
              <span className="text-xs tracking-widest text-background/50 uppercase">
                Years in quality
              </span>
            </div>
            <div>
              <span className="mb-2 block font-mono text-4xl">04</span>
              <span className="text-xs tracking-widest text-background/50 uppercase">
                Open-source tools
              </span>
            </div>
            <div>
              <span className="mb-2 block font-mono text-4xl">28%</span>
              <span className="text-xs tracking-widest text-background/50 uppercase">
                Faster execution
              </span>
            </div>
            <div>
              <span className="mb-2 block font-mono text-4xl">CTFL</span>
              <span className="text-xs tracking-widest text-background/50 uppercase">
                ISTQB certified
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-16 flex items-end justify-between border-b border-foreground/10 pb-8">
          <h2 className="text-4xl font-bold tracking-tight">OSS / Tooling</h2>
          <span className="font-mono text-xs text-muted-foreground">/04_ENTRIES</span>
        </div>

        <div className="grid gap-px border border-foreground/10 bg-foreground/10 md:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.no}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group bg-background p-10 transition-colors hover:bg-secondary"
            >
              <span className="mb-4 block font-mono text-xs text-accent">
                {p.no}. {p.name}
              </span>
              <h3 className="mb-4 text-2xl font-bold">{p.title}</h3>
              <p className="mb-8 text-muted-foreground">{p.body}</p>
              <div className="flex flex-wrap gap-3">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-foreground/10 bg-foreground/5 px-2 py-1 font-mono text-[10px] uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="principles" className="border-y border-foreground/5 bg-secondary px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 font-mono text-xs tracking-[0.3em] uppercase">
            Practice Principles
          </h2>
          <div className="grid gap-12 md:grid-cols-3">
            {principles.map((pr) => (
              <div key={pr.title}>
                <h3 className="mb-4 text-lg font-bold">{pr.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{pr.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-6 py-32">
        <div className="flex flex-col gap-16 md:flex-row">
          <div className="md:w-1/3">
            <h2 className="sticky top-32 text-4xl font-bold tracking-tight">Engineering Path</h2>
          </div>
          <div className="space-y-20 md:w-2/3">
            {roles.map((r) => (
              <div key={r.title} className="relative border-l-2 border-accent/20 pl-8">
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

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden bg-foreground p-12 text-background md:p-20">
          <div className="relative z-10 max-w-2xl">
            <h2 className="mb-6 font-mono text-xs tracking-widest text-accent uppercase">
              Currently Focusing On
            </h2>
            <p className="mb-8 text-3xl font-light">
              AI use cases that make existing QA expertise easier to apply: agents for test design
              and analysis, reusable skills for common practices, and quality gates that retain
              human accountability.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              <span className="font-mono text-xs tracking-widest uppercase">
                Open to a conversation
              </span>
            </div>
          </div>
          <div className="absolute right-[-10%] bottom-[-20%] opacity-10">
            <span className="text-[20rem] font-black tracking-tighter">QA</span>
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-foreground/5 px-6 py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 md:flex-row">
          <div>
            <h2 className="mb-8 text-6xl font-bold tracking-tighter">
              Working through a<br />
              quality problem?
            </h2>
            <a
              href="mailto:k.muthukumar90@yahoo.in"
              className="font-mono text-2xl text-accent underline-offset-8 transition-all hover:underline hover:decoration-2"
            >
              k.muthukumar90@yahoo.in
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-24 gap-y-4">
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
            Crafted for Reliability
          </span>
        </div>
      </footer>
    </div>
  );
}
