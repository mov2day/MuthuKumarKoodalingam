import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const site = 'https://muthukumarkoodalingam.com';

const requiredCorePaths = [
  '/',
  '/about/',
  '/karate-api-testing/',
  '/projects/karate-test-management/',
  '/projects/unifiedtest/',
  '/projects/assertiq/',
  '/projects/qe-mcp/',
  '/blog/',
];

const failures = [];
const pass = (message) => console.log(`✓ ${message}`);
const fail = (message) => failures.push(message);

function read(relativePath) {
  const filePath = path.join(dist, relativePath);
  if (!fs.existsSync(filePath)) {
    fail(`Missing dist/${relativePath}`);
    return '';
  }
  return fs.readFileSync(filePath, 'utf8');
}

function routeToFile(pathname) {
  if (pathname === '/') return 'index.html';
  return `${pathname.replace(/^\//, '')}index.html`;
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'));
  return match?.[1];
}

function findMeta(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find((candidate) => attribute(candidate, 'name')?.toLowerCase() === name.toLowerCase());
  return tag ? attribute(tag, 'content') : undefined;
}

function findCanonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const canonicalTags = tags.filter((candidate) =>
    (attribute(candidate, 'rel') || '')
      .toLowerCase()
      .split(/\s+/)
      .includes('canonical'),
  );
  return {
    count: canonicalTags.length,
    href: canonicalTags.length ? attribute(canonicalTags[0], 'href') : undefined,
  };
}

function validateJsonLd(html, pathname) {
  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!scripts.length) {
    fail(`${pathname}: missing JSON-LD`);
    return;
  }

  for (const script of scripts) {
    try {
      JSON.parse(script[1]);
    } catch (error) {
      fail(`${pathname}: invalid JSON-LD (${error.message})`);
    }
  }
}

function validatePage(pathname) {
  const html = read(routeToFile(pathname));
  if (!html) return;

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  if (!title) fail(`${pathname}: missing <title>`);

  const description = findMeta(html, 'description');
  if (!description) fail(`${pathname}: missing meta description`);

  const robots = findMeta(html, 'robots');
  if (!robots || !/index/i.test(robots) || /noindex/i.test(robots)) {
    fail(`${pathname}: missing or non-indexable robots directive`);
  }

  if (/noindex/i.test(html)) fail(`${pathname}: contains noindex`);

  const canonical = findCanonical(html);
  const expectedCanonical = `${site}${pathname === '/' ? '/' : pathname}`;
  if (canonical.count !== 1) {
    fail(`${pathname}: expected exactly one canonical link, found ${canonical.count}`);
  } else if (canonical.href?.replace(/\/$/, '') !== expectedCanonical.replace(/\/$/, '')) {
    fail(`${pathname}: canonical ${canonical.href || 'missing'} does not match ${expectedCanonical}`);
  }

  validateJsonLd(html, pathname);
}

if (!fs.existsSync(dist)) {
  console.error('SEO check requires a production build. Run npm run build first.');
  process.exit(1);
}

const sitemap = read('sitemap.xml');
const robots = read('robots.txt');
const llms = read('llms.txt');
const rss = read('rss.xml');

if (sitemap) {
  for (const pathname of requiredCorePaths) {
    const url = `${site}${pathname === '/' ? '/' : pathname}`;
    if (!sitemap.includes(`<loc>${url}</loc>`)) fail(`sitemap.xml missing ${url}`);
  }

  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (!urls.length) fail('sitemap.xml contains no URLs');

  for (const url of urls) {
    if (!url.startsWith(site)) {
      fail(`sitemap.xml contains off-domain URL ${url}`);
      continue;
    }
    const pathname = new URL(url).pathname;
    validatePage(pathname);
  }
}

if (robots) {
  if (!robots.includes(`Sitemap: ${site}/sitemap.xml`)) fail('robots.txt does not advertise sitemap.xml');
  if (!/User-agent:\s*OAI-SearchBot[\s\S]*?Allow:\s*\//i.test(robots)) fail('robots.txt does not allow OAI-SearchBot');
  if (!/User-agent:\s*PerplexityBot[\s\S]*?Allow:\s*\//i.test(robots)) fail('robots.txt does not allow PerplexityBot');
}

if (llms) {
  for (const pathname of requiredCorePaths.filter((pathname) => pathname !== '/blog/')) {
    const url = `${site}${pathname === '/' ? '/' : pathname}`;
    if (!llms.includes(url)) fail(`llms.txt missing ${url}`);
  }
}

if (rss) {
  if (!rss.includes(`<link>${site}/blog/</link>`)) fail('rss.xml does not point to the first-party blog');
  if (!rss.includes(`${site}/blog/`)) fail('rss.xml contains no first-party article links');
}

if (failures.length) {
  console.error('\nSEO validation failed:');
  for (const problem of failures) console.error(`✗ ${problem}`);
  process.exit(1);
}

pass('required discovery files exist');
pass('sitemap URLs resolve to built HTML files');
pass('public pages have title, description, indexable robots, self-canonical and valid JSON-LD');
pass('AI search crawlers remain allowed');
pass('llms.txt and RSS point to first-party resources');
console.log('\nSEO validation passed.');
