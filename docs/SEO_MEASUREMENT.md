# SEO and AI Search Measurement Playbook

Domain: `https://muthukumarkoodalingam.com`

This document separates implementation success from search visibility. Metadata shipping correctly is necessary, but the outcome to track is whether the first-party domain is indexed, discovered for relevant non-branded queries, and cited or visited from answer engines.

## 1. Initial indexing checklist

After a production deployment:

1. Add or verify the domain property in Google Search Console.
2. Submit `https://muthukumarkoodalingam.com/sitemap.xml`.
3. Inspect these URLs individually and request indexing where appropriate:
   - `/`
   - `/about/`
   - `/karate-api-testing/`
   - `/projects/karate-test-management/`
   - `/projects/unifiedtest/`
   - `/projects/assertiq/`
   - `/projects/qe-mcp/`
   - `/blog/openapi-to-karate-without-maintenance-nightmare/`
   - `/blog/karate-api-coverage-openapi-gaps/`
4. Confirm that Google-selected canonical matches the declared first-party URL for the blog articles.
5. Add the site to Bing Webmaster Tools and submit the same sitemap.

The generated build already exposes `robots.txt`, `sitemap.xml`, `rss.xml`, `llms.txt`, self-canonical URLs and structured data. `npm run seo:check` guards those implementation requirements.

## 2. Search Console metrics

Record a baseline after deployment, then review at least monthly.

| Metric | Why it matters |
| --- | --- |
| Indexed pages | Confirms important first-party pages are eligible to appear |
| Impressions | Early signal of topical discovery before clicks grow |
| Organic clicks | Actual search traffic to the owned domain |
| CTR | Helps identify titles/descriptions that do not earn clicks |
| Average position | Directional signal for query/page movement; do not treat it as a standalone KPI |
| Non-branded impressions | Shows discovery beyond searches for the author's name |
| Landing-page impressions | Shows which topic/project pages are earning search visibility |

### Branded vs non-branded

Treat queries containing `Muthu`, `Muthu Kumar`, `Muthu Kumar Koodalingam` or the exact domain as branded.

The main growth target is non-branded technical discovery around topics such as:

- Karate API testing
- Karate OpenAPI test generation
- OpenAPI API test coverage
- Karate coverage gaps
- API operation coverage
- maintainable Karate tests
- static test intelligence
- test quality static analysis
- AI coding agent test guardrails
- MCP quality gates
- Java test observability

## 3. Page-level goals

### Homepage

Primary job: entity discovery and navigation into expertise, projects and writing.

Track branded impressions, homepage clicks and whether sitelinks begin to expose About, projects or engineering notes.

### About page

Primary job: first-party entity resolution.

Track branded queries that contain the full name plus terms such as QA, quality engineering, test automation or GitHub.

### Karate API testing hub

Primary job: non-branded topical discovery.

Track impressions and queries around Karate + OpenAPI + API coverage. This is the strongest initial topic cluster and should be treated as the primary SEO landing page rather than expecting every article to rank independently.

### Project pages

Primary job: own the canonical explanation of each tool and capture searches for both the project name and its problem category.

Track project-name queries separately from problem queries such as `static test quality tool`, `Karate API test management`, `Java test observability` and `MCP quality enforcement`.

### Engineering notes

Primary job: answer narrow technical questions, attract long-tail search traffic and reinforce the topic hubs through internal links.

## 4. AI-answer visibility checks

AI-answer products do not expose one universal ranking dashboard, so use a small repeatable query set instead of anecdotal one-off searches.

Run the same prompts periodically in the answer engines you care about and record whether the owned domain is cited, linked or clearly used as a source.

Suggested query set:

1. `How can I generate maintainable Karate API tests from OpenAPI?`
2. `How do I measure Karate API coverage against an OpenAPI specification?`
3. `Does a 100% Karate pass rate mean all API endpoints are covered?`
4. `What tools can find weak assertions in JavaScript or TypeScript tests without running them?`
5. `How can an MCP server enforce test quality for AI coding agents?`
6. `How can I export Java test execution as OpenTelemetry traces?`

For each query record:

| Field | Record |
| --- | --- |
| Date | Exact check date |
| Engine | ChatGPT, Google AI results, Perplexity, Copilot/Bing or another target |
| Owned domain cited | Yes / No |
| First-party URL cited | Exact URL |
| External copy cited instead | DEV, GitHub, Marketplace, Hashnode, etc. |
| Position/context | Short note; do not invent a numeric ranking where the UI has none |
| Action | Content gap, internal-link gap, no action, or investigate canonical/indexing |

The desired pattern is that the first-party topic/project/article URL is increasingly cited instead of only the syndicated copy or GitHub repository.

## 5. Referral measurement

Where analytics expose referrers, group traffic from search and answer products separately. Common referral hostnames can change, so inspect real analytics data rather than maintaining a hard-coded permanent list.

Useful dimensions:

- landing page
- referrer / source
- first-time vs returning visitor
- outbound click to GitHub or Marketplace from a project page
- article → topic hub navigation
- homepage/About → project navigation

An AI citation with no click can still be valuable, so referral traffic should complement, not replace, the repeatable citation checks above.

## 6. Canonical syndication checks

For every syndicated article:

1. First-party page exists and is self-canonical.
2. First-party page is present in `sitemap.xml`.
3. DEV `canonical_url` equals the first-party URL.
4. Hashnode `originalArticleURL` equals the first-party URL when API publishing is available.
5. The external copy includes a visible link back to the original article for new syndications.

`scripts/syndicate.mjs` now blocks new syndication until the first-party source is live and self-canonical, and repairs a mismatched DEV canonical when it can identify the existing article.

## 7. Monthly review template

Record one row per month:

| Month | Indexed pages | Organic clicks | Impressions | Non-branded impressions | Top first-party landing page | AI citation checks passed | Main action |
| --- | ---: | ---: | ---: | ---: | --- | ---: | --- |
| Baseline |  |  |  |  |  |  |  |

Then answer four questions:

1. Which owned page gained the most relevant non-branded impressions?
2. Which external property is still outranking or being cited instead of the owned page?
3. Which high-intent question has no strong first-party answer yet?
4. Which existing page needs improvement rather than another new article?

## 8. Content decision rule

Do not publish a new SEO article simply because a keyword exists.

Create or expand content when at least one of these is true:

- Search Console shows relevant impressions but the current page does not answer the query well.
- AI citation checks consistently choose an external source because the first-party explanation is incomplete.
- A project has a useful capability that is not described on the owned domain.
- A technical question repeatedly appears in real usage, issues, documentation or engineering work and can be answered with first-hand evidence.

This keeps the site focused on demonstrable expertise instead of producing high-volume generic SEO content.
