import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contentDir = path.join(root, 'content', 'karate');
const publicDir = path.join(root, 'public');
const blogDir = path.join(publicDir, 'blog');
const site = 'https://muthukumarkoodalingam.com';

fs.mkdirSync(blogDir, { recursive: true });

const escapeHtml = (value = '') => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function parseFrontmatter(source) {
  if (!source.startsWith('---\n')) return { meta: {}, body: source };
  const end = source.indexOf('\n---\n', 4);
  if (end === -1) return { meta: {}, body: source };
  const raw = source.slice(4, end).split('\n');
  const meta = {};
  for (const line of raw) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    value = value.replace(/^['\"]|['\"]$/g, '');
    meta[key] = value;
  }
  return { meta, body: source.slice(end + 5) };
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" rel="noreferrer">$1</a>')
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" rel="noreferrer">$1</a>');
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const out = [];
  let inCode = false;
  let codeLang = '';
  let code = [];
  let list = [];
  let paragraph = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    out.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`);
    list = [];
  };
  const flushCode = () => {
    out.push(`<pre><code${codeLang ? ` class="language-${escapeHtml(codeLang)}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`);
    code = [];
    codeLang = '';
  };

  for (const line of lines) {
    if (line.startsWith('```')) {
      flushParagraph();
      flushList();
      if (!inCode) {
        inCode = true;
        codeLang = line.slice(3).trim();
      } else {
        inCode = false;
        flushCode();
      }
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = Math.min(heading[1].length + 1, 5);
      const text = heading[2];
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      out.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
      continue;
    }
    if (line.startsWith('> ')) {
      flushParagraph();
      flushList();
      out.push(`<blockquote>${inlineMarkdown(line.slice(2))}</blockquote>`);
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
      continue;
    }
    paragraph.push(line.trim());
  }
  flushParagraph();
  flushList();
  if (inCode) flushCode();
  return out.join('\n');
}

const styles = `
:root{color-scheme:dark;--bg:#101215;--panel:#171a1f;--text:#f5f5f0;--muted:#a7adb6;--line:#2b3038;--accent:#5ed49a}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:17px/1.72 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:var(--accent)}nav{position:sticky;top:0;z-index:2;border-bottom:1px solid var(--line);background:rgba(16,18,21,.92);backdrop-filter:blur(14px)}.nav{max-width:1040px;margin:auto;padding:18px 24px;display:flex;justify-content:space-between;gap:24px;font-size:14px}.nav a{text-decoration:none;color:var(--text)}main{max-width:820px;margin:auto;padding:72px 24px 96px}.eyebrow{font:12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}h1{font-size:clamp(42px,7vw,76px);line-height:.98;letter-spacing:-.055em;margin:18px 0 24px}h2{font-size:32px;line-height:1.15;letter-spacing:-.03em;margin-top:54px}h3{font-size:24px;line-height:1.25;margin-top:38px}.lede{font-size:21px;color:var(--muted)}.meta{color:var(--muted);font-size:14px;margin-bottom:52px}.article p,.article li{color:#d9dde3}.article ul{padding-left:24px}.article pre{overflow:auto;padding:20px;border:1px solid var(--line);background:#0a0c0f;border-radius:10px;font-size:14px;line-height:1.6}.article code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.article p code,.article li code{background:var(--panel);padding:2px 6px;border-radius:5px}.article blockquote{margin:28px 0;padding:4px 20px;border-left:3px solid var(--accent);font-size:21px;color:#e8ebe7}.cta{margin-top:64px;padding:26px;border:1px solid var(--line);background:var(--panel);border-radius:12px}.grid{display:grid;gap:16px}.card{display:block;padding:24px;border:1px solid var(--line);background:var(--panel);border-radius:12px;text-decoration:none;color:var(--text)}.card:hover{border-color:var(--accent)}.card p{margin-bottom:0;color:var(--muted)}footer{border-top:1px solid var(--line);padding:26px 24px;text-align:center;color:var(--muted);font-size:13px}@media(max-width:640px){main{padding-top:48px}h1{font-size:44px}}
`;

const wrap = ({ title, description = '', canonical, body, type = 'article' }) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><link rel="canonical" href="${canonical}"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:type" content="${type}"><meta property="og:url" content="${canonical}"><style>${styles}</style></head><body><nav><div class="nav"><a href="/">Muthu Kumar</a><a href="/blog/">Engineering Notes</a></div></nav>${body}<footer>QA architecture · API testing · AI-assisted engineering</footer></body></html>`;

const posts = fs.existsSync(contentDir)
  ? fs.readdirSync(contentDir).filter((name) => name.endsWith('.md')).map((name) => {
      const source = fs.readFileSync(path.join(contentDir, name), 'utf8');
      const { meta, body } = parseFrontmatter(source);
      return { meta, body, source };
    }).filter(({ meta }) => meta.published !== 'false' && meta.slug)
  : [];

posts.sort((a, b) => String(b.meta.date).localeCompare(String(a.meta.date)));

for (const post of posts) {
  const canonical = `${site}/blog/${post.meta.slug}/`;
  const dir = path.join(blogDir, post.meta.slug);
  fs.mkdirSync(dir, { recursive: true });
  const body = `<main><div class="eyebrow">Karate · API testing · Test engineering</div><h1>${escapeHtml(post.meta.title)}</h1><p class="lede">${escapeHtml(post.meta.description || '')}</p><div class="meta">${escapeHtml(post.meta.date || '')} · Muthu Kumar Koodalingam</div><article class="article">${markdownToHtml(post.body)}</article><div class="cta"><strong>Karate Test Management</strong><p>Open-source VS Code workspace for generating, running, analysing and maintaining Karate API tests.</p><p><a href="https://github.com/mov2day/KaratePlugin">GitHub</a> · <a href="https://marketplace.visualstudio.com/items?itemName=MuthuKumarKoodalingam.karate-test-generator">VS Code Marketplace</a></p></div></main>`;
  fs.writeFileSync(path.join(dir, 'index.html'), wrap({ title: post.meta.title, description: post.meta.description, canonical, body }));
}

const cards = posts.map((post) => `<a class="card" href="/blog/${post.meta.slug}/"><div class="eyebrow">${escapeHtml(post.meta.date || '')}</div><h2>${escapeHtml(post.meta.title)}</h2><p>${escapeHtml(post.meta.description || '')}</p></a>`).join('');
fs.writeFileSync(path.join(blogDir, 'index.html'), wrap({
  title: 'Engineering Notes — Muthu Kumar Koodalingam',
  description: 'Practical notes on Karate, API testing, QA architecture and trustworthy AI-assisted test engineering.',
  canonical: `${site}/blog/`,
  type: 'website',
  body: `<main><div class="eyebrow">Engineering Notes</div><h1>Testing ideas that survive contact with real systems.</h1><p class="lede">Practical writing on Karate, API automation, quality architecture and AI-assisted engineering.</p><div class="grid">${cards}</div></main>`
}));

const rssItems = posts.map((post) => `<item><title><![CDATA[${post.meta.title}]]></title><link>${site}/blog/${post.meta.slug}/</link><guid>${site}/blog/${post.meta.slug}/</guid><pubDate>${new Date(`${post.meta.date}T12:00:00Z`).toUTCString()}</pubDate><description><![CDATA[${post.meta.description || ''}]]></description></item>`).join('');
fs.writeFileSync(path.join(publicDir, 'rss.xml'), `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Muthu Kumar — Engineering Notes</title><link>${site}/blog/</link><description>Karate, API testing, QA architecture and AI-assisted engineering.</description>${rssItems}</channel></rss>`);

console.log(`Generated ${posts.length} blog post(s).`);
