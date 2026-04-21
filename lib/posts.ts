import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type PostFrontmatter = {
  title: string
  description?: string
  date?: string
  tags?: string[]
  slug?: string
  coverImage?: string
  draft?: boolean
}

export type Post = {
  slug: string
  title: string
  description: string
  date: string | null
  tags: { title: string; slug: string }[]
  coverImage: string | null
  author: { name: string }
  body: string
  assetBase: string
}

const CONTENT_BLOG = path.join(process.cwd(), 'content/blog')

export function tagToSlug(tag: string) {
  return String(tag)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function normalizeArticleSlug(raw: unknown) {
  if (!raw) return ''
  const s = String(raw).replace(/^\/+|\/+$/g, '')
  const parts = s.split('/').filter(Boolean)
  return parts[parts.length - 1] || ''
}

function walkMdxFiles(dir: string, acc: string[] = []) {
  if (!fs.existsSync(dir)) return acc
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walkMdxFiles(p, acc)
    else if (ent.name.endsWith('.mdx') || ent.name.endsWith('.md')) acc.push(p)
  }
  return acc
}

function buildAssetBase(filePath: string) {
  // Most images are referenced from `/public` (eg. `/content-images/...`).
  // Keep this for rare relative images, but default to empty.
  const relDir = path.relative(CONTENT_BLOG, path.dirname(filePath))
  const posixRel = relDir.split(path.sep).join('/')
  if (!posixRel || posixRel === '.') return ''
  return ''
}

export function getAllPosts(): Post[] {
  const files = walkMdxFiles(CONTENT_BLOG)
  const posts: Post[] = []

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const fm = data as PostFrontmatter

    if (fm.draft) continue

    const slug =
      normalizeArticleSlug(fm.slug) || path.basename(filePath).replace(/\.(md|mdx)$/, '')
    const assetBase = buildAssetBase(filePath)

    const tags = Array.isArray(fm.tags) ? fm.tags : []
    const tagObjs = tags.map((t) => ({ title: t, slug: tagToSlug(t) }))

    let coverImage: string | null = null
    if (typeof fm.coverImage === 'string' && fm.coverImage.trim()) {
      const img = fm.coverImage.trim()
      if (/^https?:\/\//i.test(img) || img.startsWith('/')) coverImage = img
      else coverImage = `${assetBase}/${img.replace(/^\.\//, '')}`.replace(/([^:]\/)\/+/g, '$1')
    }

    const dateIso = fm.date ? new Date(fm.date).toISOString() : null

    posts.push({
      slug,
      title: fm.title || 'Untitled',
      description: fm.description ? String(fm.description).trim() : '',
      date: dateIso,
      tags: tagObjs,
      coverImage,
      author: { name: 'Matt Chaffe' },
      body: content.trim(),
      assetBase,
    })
  }

  posts.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
  return dedupeBySlug(posts)
}

function dedupeBySlug(posts: Post[]) {
  const seen = new Set<string>()
  return posts.filter((p) => {
    if (!p.slug || seen.has(p.slug)) return false
    seen.add(p.slug)
    return true
  })
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) || null
}

export function getAllTags(): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const p of getAllPosts()) {
    for (const t of p.tags) {
      if (!seen.has(t.slug)) {
        seen.add(t.slug)
        out.push(t.slug)
      }
    }
  }
  return out
}

export function tagSlugToLabel(tagSlug: string) {
  for (const p of getAllPosts()) {
    for (const t of p.tags) {
      if (t.slug === tagSlug) return t.title
    }
  }
  return tagSlug
}

