// Writes sitemap.xml, robots.txt, rss.xml and llms.txt into /public before each build.
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || 'http://localhost:3000').replace(/\/$/, '')
const root = process.cwd()
const postsDir = path.join(root, 'content/posts')
const publicDir = path.join(root, 'public')

const escapeXml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const posts = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const { data } = matter(fs.readFileSync(path.join(postsDir, f), 'utf8'))
    return { slug: f.replace(/\.md$/, ''), ...data }
  })
  .filter((p) => p.published !== false)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

const iso = (d) => (d ? new Date(d).toISOString() : new Date().toISOString())
const latest = posts[0] ? iso(posts[0].updated || posts[0].date) : iso()

// sitemap.xml
const urls = [
  { loc: '/', lastmod: latest, priority: '1.0' },
  { loc: '/blog', lastmod: latest, priority: '0.8' },
  ...posts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: iso(p.updated || p.date), priority: '0.7' })),
]
fs.writeFileSync(
  path.join(publicDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${SITE_URL}${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`)
  .join('\n')}
</urlset>
`
)

// robots.txt: welcome search engines and AI answer engines alike
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended']
fs.writeFileSync(
  path.join(publicDir, 'robots.txt'),
  `User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${SITE_URL}/sitemap.xml
`
)

// rss.xml
fs.writeFileSync(
  path.join(publicDir, 'rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Phebian Chukwurah · Writing</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes on frontend engineering, accessibility, performance and building with AI.</description>
    <language>en-gb</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${posts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid>${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.description)}</description>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`
)

// llms.txt: a plain summary for AI assistants and generative search (llmstxt.org)
fs.writeFileSync(
  path.join(publicDir, 'llms.txt'),
  `# Phebian Chukwurah

> Phebian Chukwurah is a frontend engineer with 8+ years of experience building accessible, responsive and performance-optimised web products with React, TypeScript and Next.js.

Focus areas: frontend development (React, Next.js, TypeScript, SSR/SSG), testing and quality (Jest, Testing Library, Cypress, Playwright, CI), performance and SEO (Core Web Vitals, code splitting, structured data), web accessibility (WCAG 2.1 AA), and AI-assisted software development.

## Pages

- [Home](${SITE_URL}/): About Phebian, skills and contact
- [Writing](${SITE_URL}/blog): All articles

## Articles

${posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description || ''}`).join('\n')}

## Contact

- GitHub: https://github.com/ph3bian
- X: https://x.com/ph3bian
`
)

console.log(`SEO files generated for ${SITE_URL} (${posts.length} posts)`)
