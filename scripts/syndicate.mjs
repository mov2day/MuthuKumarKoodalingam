import fs from 'node:fs';
import path from 'node:path';

const file = process.argv[2];
if (!file) throw new Error('Usage: node scripts/syndicate.mjs <markdown-file>');

const site = 'https://muthukumarkoodalingam.com';
const source = fs.readFileSync(path.resolve(file), 'utf8');

function parseFrontmatter(text) {
  const end = text.indexOf('\n---\n', 4);
  if (!text.startsWith('---\n') || end === -1) throw new Error(`Missing frontmatter in ${file}`);
  const meta = {};
  for (const line of text.slice(4, end).split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim().replace(/^['\"]|['\"]$/g, '');
    meta[key] = value;
  }
  return { meta, body: text.slice(end + 5).trim() };
}

function sameUrl(a, b) {
  if (!a || !b) return false;
  return a.replace(/\/$/, '') === b.replace(/\/$/, '');
}

const { meta, body } = parseFrontmatter(source);
if (meta.published === 'false') {
  console.log(`Skipping unpublished article ${file}`);
  process.exit(0);
}

const canonical = `${site}/blog/${meta.slug}/`;
const tags = (meta.tags || 'testing,api')
  .split(',')
  .map((tag) => tag.trim())
  .filter(Boolean)
  .slice(0, 4);

async function publishDev() {
  const token = process.env.DEVTO_API_KEY;
  if (!token) {
    console.log('DEVTO_API_KEY not configured; skipping DEV syndication.');
    return;
  }

  const headers = {
    'api-key': token,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.forem.api-v1+json',
  };

  const existingResponse = await fetch('https://dev.to/api/articles/me/all?per_page=1000', {
    headers,
  });
  const existing = await existingResponse.json();
  if (!existingResponse.ok) {
    throw new Error(`DEV lookup failed (${existingResponse.status}): ${JSON.stringify(existing)}`);
  }

  const match = existing.find(
    (article) => sameUrl(article.canonical_url, canonical) || article.title === meta.title,
  );
  if (match) {
    console.log(`DEV: already published at ${match.url}`);
    return;
  }

  const response = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      article: {
        title: meta.title,
        description: meta.description,
        published: true,
        body_markdown: body,
        tags,
        canonical_url: canonical,
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(`DEV publish failed (${response.status}): ${JSON.stringify(data)}`);
  console.log(`DEV: ${data.url || 'published'}`);
}

async function hashnodeRequest(token, query, variables) {
  const response = await fetch('https://gql-beta.hashnode.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const raw = await response.text();
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(`Hashnode returned non-JSON (${response.status}): ${raw.slice(0, 180)}`);
  }
  if (!response.ok || data.errors?.length) {
    throw new Error(`Hashnode request failed (${response.status}): ${JSON.stringify(data.errors || data)}`);
  }
  return data;
}

async function publishHashnode() {
  const token = process.env.HASHNODE_PAT;
  const publicationId = process.env.HASHNODE_PUBLICATION_ID;
  if (!token || !publicationId) {
    console.log('HASHNODE_PAT/HASHNODE_PUBLICATION_ID not configured; skipping Hashnode syndication.');
    return;
  }

  const searchQuery = `query Search($filter: SearchPostsOfPublicationFilter!) {
    searchPostsOfPublication(first: 10, sortBy: DATE_PUBLISHED_DESC, filter: $filter) {
      edges { node { id title url canonicalUrl } }
    }
  }`;

  const searchData = await hashnodeRequest(token, searchQuery, {
    filter: { publicationId, query: meta.title },
  });
  const existing = searchData.data.searchPostsOfPublication.edges
    .map((edge) => edge.node)
    .find((post) => sameUrl(post.canonicalUrl, canonical) || post.title === meta.title);

  if (existing) {
    console.log(`Hashnode: already published at ${existing.url}`);
    return;
  }

  const publishQuery = `mutation PublishPost($input: PublishPostInput!) {
    publishPost(input: $input) { post { id slug url title } }
  }`;

  const data = await hashnodeRequest(token, publishQuery, {
    input: {
      publicationId,
      title: meta.title,
      subtitle: meta.description || undefined,
      contentMarkdown: body,
      originalArticleURL: canonical,
      tags: tags.map((slug) => ({ slug })),
      metaTitle: meta.title,
      metaDescription: meta.description || undefined,
      enableToc: true,
    },
  });

  console.log(`Hashnode: ${data.data.publishPost.post.url}`);
}

const results = await Promise.allSettled([publishDev(), publishHashnode()]);
const failures = results.filter((result) => result.status === 'rejected');
if (failures.length) {
  for (const failure of failures) console.error(failure.reason?.stack || failure.reason);
  process.exitCode = 1;
}
