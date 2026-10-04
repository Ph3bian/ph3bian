import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Posts with `published: false` are drafts: visible in development, hidden in production
const showDrafts = process.env.NODE_ENV !== 'production'

function wordCount(markdown) {
  return markdown.trim().split(/\s+/).length
}

function readingTime(markdown) {
  return Math.max(1, Math.round(wordCount(markdown) / 220))
}

export function getSortedPostsData() {
  // Get only markdown file names under /content/posts
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))

  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Normalise date to ISO string so it's JSON-serialisable
    const isoDate = matterResult.data?.date
      ? new Date(matterResult.data.date).toISOString()
      : null

    // Combine the data with the id
    return {
      id,
      slug: id,
      ...matterResult.data,
      date: isoDate,
      readingTime: readingTime(matterResult.content),
    }
  })
  .filter((post) => showDrafts || post.published !== false)

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0
    const bTime = b.date ? new Date(b.date).getTime() : 0
    return bTime - aTime
  })
}

export function getAllPostIds() {
  return getSortedPostsData().map((post) => ({
    params: { slug: post.slug },
  }))
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(prism)
    .use(html, { sanitize: false })
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Normalise date to ISO string
  const isoDate = matterResult.data?.date
    ? new Date(matterResult.data.date).toISOString()
    : null

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
    date: isoDate,
    updated: matterResult.data?.updated ? new Date(matterResult.data.updated).toISOString() : null,
    readingTime: readingTime(matterResult.content),
    wordCount: wordCount(matterResult.content),
  }
}

export function getAllTags() {
  const posts = getSortedPostsData()
  const tags = new Set()
  
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tags.add(tag))
    }
  })
  
  return Array.from(tags).map(tag => ({
    id: tag,
    title: tag,
    path: `/tag/${tag}`
  }))
}

export function getPostsByTag(tag) {
  const posts = getSortedPostsData()
  return posts.filter(post => post.tags && post.tags.includes(tag))
} 