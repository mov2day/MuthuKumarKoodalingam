import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const site = 'https://muthukumarkoodalingam.com';
const contentDir = path.join(root, 'content', 'karate');
const publicDir = path.join(root, 'public');
const blogDir = path.join(publicDir, 'blog');

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function parseFrontmatter(source) {
  if (!source.startsWith('---\n')) return { meta: {}, body: source };
  const end = source.indexOf('\n---\n', 4);
  if (end === -1) return { meta: {}, body: source };
  const meta = {};
  for (const line of source.slice(4, end).split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    value = value.replace(/^['\"]|['\"]$/g, '');
    meta[key] = value;
  }
  return { meta, body: source.slice(end + 5) };
}

const posts = fs.existsSync(contentDir)
  ? fs.readdirSync(contentDir)
      .filter((name) => name.endsWith('.md'))
      .map((name) => {
        const source = fs.readFileSync(path.join(contentDir, name), 'utf8');
        return parseFrontmatter(source).meta;
      })
      .filter((meta) => meta.published !== 'false' && meta.slug)
  : [];

posts.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

const person = {
  '@type': 'Person',
  '@id': `${site}/#person`,
  name: 'Muthu Kumar Koodalingam',
  url: `${site}/`,
  sameAs: ['https://github.com/mov2day', 'https://www.linkedin.com/in/muthukumark12/'],
};

function injectIntoHead(filePath, markup) {
  if (!fs.existsSync(filePath)) return;
  const html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('</head>')) return;
  fs.writeFileSync(filePath, html.replace('</head>', `${markup}</head>`));
}

for (const post of posts) {
  const canonical = `${site}/blog/${post.slug}/`;
  const tags = String(post.tags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonical}#article`,
    headline: post.title,
    description: post.description || '',
    datePublished: post.date || undefined,
    dateModified: post.updated || post.date || undefined,
    mainEntityOfPage: canonical,
    url: canonical,
    inLanguage: 'en',
    keywords: tags,
    author: person,
    publisher: person,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${site}/#website`,
      name: 'Muthu Kumar Koodalingam',
      url: `${site}/`,
    },
  };

  const markup = [
    '<meta name="author" content="Muthu Kumar Koodalingam">',
    '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">',
    '<meta name="twitter:card" content="summary">',
    `<meta name="twitter:title" content="${escapeHtml(post.title || '')}">`,
    `<meta name="twitter:description" content="${escapeHtml(post.description || '')}">`,
    `<link rel="alternate" type="application/rss+xml" title="Muthu Kumar Koodalingam — Engineering Notes" href="${site}/rss.xml">`,
    `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`,
  ].join('');

  injectIntoHead(path.join(blogDir, post.slug, 'index.html'), markup);
}

const blogIndexStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${site}/blog/#collection`,
  name: 'Engineering Notes — Muthu Kumar Koodalingam',
  description: 'Practical notes on Karate, API testing, QA architecture and trustworthy AI-assisted test engineering.',
  url: `${site}/blog/`,
  inLanguage: 'en',
  author: person,
  hasPart: posts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    url: `${site}/blog/${post.slug}/`,
    datePublished: post.date || undefined,
  })),
};

injectIntoHead(
  path.join(blogDir, 'index.html'),
  [
    '<meta name="author" content="Muthu Kumar Koodalingam">',
    '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">',
    '<meta name="twitter:card" content="summary">',
    '<meta name="twitter:title" content="Engineering Notes — Muthu Kumar Koodalingam">',
    '<meta name="twitter:description" content="Practical notes on Karate, API testing, QA architecture and trustworthy AI-assisted test engineering.">',
    `<link rel="alternate" type="application/rss+xml" title="Muthu Kumar Koodalingam — Engineering Notes" href="${site}/rss.xml">`,
    `<script type="application/ld+json">${JSON.stringify(blogIndexStructuredData)}</script>`,
  ].join(''),
);

const sitemapEntries = [
  `  <url><loc>${site}/</loc></url>`,
  `  <url><loc>${site}/blog/</loc></url>`,
  ...posts.map((post) => {
    const lastmod = post.updated || post.date;
    return `  <url><loc>${site}/blog/${post.slug}/</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
  }),
];

fs.writeFileSync(
  path.join(publicDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`,
);

const llmsPosts = posts
  .map((post) => `- [${post.title}](${site}/blog/${post.slug}/): ${post.description || ''}`)
  .join('\n');

fs.writeFileSync(
  path.join(publicDir, 'llms.txt'),
  `# Muthu Kumar Koodalingam\n\n> Engineering portfolio and technical writing focused on quality engineering, test automation, API testing, test architecture, developer tooling and trustworthy AI-assisted software testing.\n\n## Primary topics\n\n- Quality engineering and test automation architecture\n- API testing with Karate DSL and OpenAPI\n- Mobile test automation\n- CI/CD quality gates, observability and release evidence\n- AI-assisted testing, agent guardrails and engineering workflows\n- Open-source QA and developer tooling\n\n## Engineering notes\n\n${llmsPosts || '- [Engineering Notes](' + site + '/blog/)'}\n\n## Open-source projects\n\n- [Karate Test Generator](https://github.com/mov2day/KaratePlugin): OpenAPI and Postman to maintainable Karate API tests, coverage analysis and maintenance workflows.\n- [UnifiedTest](https://github.com/mov2day/UnifiedTest): Unified Java test reporting and release evidence.\n- [AssertIQ](https://github.com/mov2day/assertiq): Static analysis for JavaScript and TypeScript test suites.\n- [QE-MCP](https://github.com/mov2day/Andriod-test-mcp): Repository-aware quality engineering support for coding agents.\n\n## Identity\n\n- [Portfolio](${site}/)\n- [GitHub](https://github.com/mov2day)\n- [LinkedIn](https://www.linkedin.com/in/muthukumark12/)\n\n## Feeds and discovery\n\n- [RSS](${site}/rss.xml)\n- [Sitemap](${site}/sitemap.xml)\n`,
);

console.log(`Generated SEO metadata for ${posts.length} post(s), sitemap.xml and llms.txt.`);
