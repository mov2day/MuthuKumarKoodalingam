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
    let value = line.slice(i + 1).trim().replace(/^['\"]|['\"]$/g, '');
    meta[key] = value;
  }
  return { meta, body: text.slice(end + 5).trim() };
}

const { meta, body } = parseFrontmatter(source);
if (meta.published === 'false') {
  console.log(`Skipping unpublished article ${file}`);
  process.exit(0);
}

const canonical = `${site}/blog/${meta.slug}/`;
const tags = (meta.tags || 'testing,api').split(',').map((tag) => tag.trim()).filter(Boolean).slice(0, 4);

async function publishDev() {
  const token = process.env.DEVTO_API_KEY;
  if (!token) {
    console.log('DEVTO_API_KEY not configured; skipping DEV syndication.');
    return;
  }

  const response = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: {
      'api-key': token,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.forem.api-v1+json',
    },
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

async function publishHashnode() {
  const token = process.env.HASHNODE_PAT;
  const publicationId = process.env.HASHNODE_PUBLICATION_ID;
  if (!token || !publicationId) {
    console.log('HASHNODE_PAT/HASHNODE_PUBLICATION_ID not configured; skipping Hashnode syndication.');
    return;
  }

  const query = `mutation PublishPost($input: PublishPostInput!) {
    publishPost(input: $input) { post { id slug url title } }
  }`;

  const response = await fetch('https://gql.hashnode.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: {
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
      },
    }),
  });

  const data = await response.json();
  if (!response.ok || data.errors?.length) {
    throw new Error(`Hashnode publish failed (${response.status}): ${JSON.stringify(data.errors || data)}`);
  }
  console.log(`Hashnode: ${data.data.publishPost.post.url}`);
}

await Promise.all([publishDev(), publishHashnode()]);
