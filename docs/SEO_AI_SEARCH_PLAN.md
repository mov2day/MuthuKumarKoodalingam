# SEO and AI Search Roadmap

Domain: `https://muthukumarkoodalingam.com`

Goal: make the personal domain the canonical source for Muthu Kumar Koodalingam's work in quality engineering, test automation, API testing, Karate, developer tooling and trustworthy AI-assisted testing.

## Guiding principles

- The personal domain is the canonical source; DEV, Hashnode, GitHub, marketplaces and social profiles amplify it.
- Prefer crawlable static HTML and durable metadata over client-only SEO techniques.
- Optimize for useful technical answers and first-hand expertise, not keyword repetition.
- Keep structured data consistent with visible page content.
- Treat `llms.txt` as a discovery experiment, not a ranking mechanism.
- Generate and validate SEO assets automatically so future changes cannot silently remove required metadata.

## Implementation status

| Phase | Status | Result |
| --- | --- | --- |
| 1. Technical search foundation | Complete | Canonicals, metadata, structured data, sitemap, crawler rules, RSS and `llms.txt` are generated in the normal build |
| 2. Entity and expertise architecture | Complete | `/about/` is the first-party ProfilePage/Person source and articles link back to it |
| 3. Karate / API testing topic hub | Complete | `/karate-api-testing/` organizes the strongest first-party topic cluster and links bidirectionally with supporting articles |
| 4. First-class project pages | Complete | Four project pages now sit between the portfolio and GitHub/Marketplace, with project structured data and sitemap coverage |
| 5. Canonical publishing and syndication | Complete for automated channels | DEV/Hashnode syndication is canonical-first; DEV canonicals can be repaired automatically |
| 6. Measurement and regression protection | Complete in code | Production SEO checks run in CI/deployment; ongoing visibility tracking is documented in `docs/SEO_MEASUREMENT.md` |

## Phase 1 — Technical search foundation

Implemented:

- Homepage canonical, robots directives, Open Graph and Twitter metadata.
- `Person` and `WebSite` JSON-LD on the homepage.
- `BlogPosting` JSON-LD on every generated article.
- `CollectionPage` JSON-LD on the engineering notes index.
- Generated `sitemap.xml` covering the homepage, entity page, topic hub, project pages, blog index and published posts.
- RSS discovery links.
- Search and AI crawler access through `robots.txt`.
- Generated `llms.txt` with concise site, topic, article and project discovery information.
- Build-time generation so SEO assets stay synchronized with Markdown content.

## Phase 2 — Entity and expertise architecture

Implemented:

- Dedicated `/about/` static page.
- `ProfilePage` + `Person` structured data.
- Clear expertise areas and first-party links to selected projects and writing.
- Consistent `rel=author` and structured author references from articles and key pages.

Primary entity topics:

- Quality engineering
- Test automation architecture
- API testing and Karate DSL
- Mobile automation
- CI/CD quality gates and observability
- AI-assisted testing and agent guardrails
- Open-source developer tooling

## Phase 3 — Karate / API testing topic hub

Implemented `/karate-api-testing/` as the primary first-party topic hub for:

- OpenAPI-driven Karate test generation
- repository-aware maintainability
- API operation coverage
- execution health vs contract coverage
- deterministic generation before AI enhancement

Supporting articles link back to the hub, and the hub links to the detailed articles and Karate Test Management project page/source ecosystem.

## Phase 4 — First-class project pages

Implemented:

- `/projects/karate-test-management/`
- `/projects/unifiedtest/`
- `/projects/assertiq/`
- `/projects/qe-mcp/`

Homepage and About page project links now route through the owned domain first. The pages are included in the sitemap and `llms.txt`, and each links onward to the source repository or marketplace where relevant.

## Phase 5 — Canonical publishing and syndication

Current automated publishing contract:

1. Publish the Markdown article into the repository.
2. Build the first-party static page with a self-canonical URL.
3. Before syndication, verify the public first-party page is live and declares the expected canonical.
4. Only then publish to configured external channels.
5. DEV receives `canonical_url`; an existing title match with a missing/wrong canonical is repaired through the article update API.
6. Hashnode receives `originalArticleURL` when API publishing is available.
7. New syndicated copies include a visible original-source link.

Future external-channel work should preserve the same rule: the owned URL is the original source and the external property amplifies it.

## Phase 6 — Measurement and regression protection

Implemented in code:

- `npm run seo:check` validates the production build.
- Pull-request validation runs the SEO check after the production build.
- GitHub Pages deployment is blocked if the SEO check fails.
- The check validates required discovery files, sitemap-to-file consistency, titles, descriptions, indexable robots directives, one matching self-canonical, JSON-LD, AI crawler rules, RSS and `llms.txt` links.

Ongoing measurement is defined in `docs/SEO_MEASUREMENT.md`:

- Google Search Console indexing, impressions, clicks, CTR and queries.
- branded vs non-branded discovery.
- landing-page performance for topic hubs and project pages.
- referral traffic from search/answer products where available.
- repeatable AI citation checks for representative technical questions.
- checks for external properties being cited instead of the first-party page.

## Content backlog

Prioritize high-intent questions where first-hand engineering experience provides differentiated answers:

- How to structure Karate test suites for large APIs.
- Deterministic generation vs LLM-only test generation.
- Contract testing alongside Karate API tests.
- Failure triage and observability for automated test pipelines.
- Where AI agents need deterministic QA guardrails.
- Component-first mobile test architecture and selective end-to-end testing.

The first two original backlog items—maintainable OpenAPI-to-Karate generation and API operation coverage—are already covered by first-party articles and the Karate topic hub.

## Definition of success

The domain should become the clearest machine-readable and human-readable source for Muthu Kumar Koodalingam's technical work, while external platforms reinforce rather than replace that source.

Success is measured by owned-page indexing, relevant non-branded search discovery, first-party citations in answer engines, and an increasing share of traffic/citations landing on the owned domain rather than only on GitHub, DEV or marketplaces.
