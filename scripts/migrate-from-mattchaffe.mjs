import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.join(__dirname, '..')

const SITE = 'https://mattchaffe.uk'
const OUT_DIR = path.join(root, 'content', 'blog')
const ASSET_DIR = path.join(root, 'public', 'content-images')

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function decodeHtmlEntities(str) {
  return str.replace(/&amp;/g, '&')
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`)
  return await res.text()
}

function extractNextData(html) {
  const m = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
  )
  if (!m) throw new Error('Could not find __NEXT_DATA__')
  return JSON.parse(m[1])
}

function extractOgImage(html) {
  const m = html.match(
    /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/
  )
  if (!m) return null
  return decodeHtmlEntities(m[1])
}

function portableTextToMarkdown(blocks) {
  const lines = []

  const renderSpan = (span, markDefs) => {
    let text = span.text || ''
    const marks = Array.isArray(span.marks) ? span.marks : []

    // Inline code
    if (marks.includes('code')) {
      text = '`' + text.replace(/`/g, '\\`') + '`'
    }

    // Links (Sanity uses mark keys referencing markDefs)
    for (const markKey of marks) {
      const def = Array.isArray(markDefs)
        ? markDefs.find((d) => d._key === markKey)
        : null
      if (def && def._type === 'link' && def.href) {
        text = `[${text}](${def.href})`
      }
    }

    if (marks.includes('strong')) text = `**${text}**`
    if (marks.includes('em')) text = `_${text}_`

    return text
  }

  const renderBlockText = (block) => {
    const children = Array.isArray(block.children) ? block.children : []
    const markDefs = Array.isArray(block.markDefs) ? block.markDefs : []
    return children
      .map((c) => {
        if (c._type === 'span') return renderSpan(c, markDefs)
        return ''
      })
      .join('')
      .replace(/\s+$/, '')
  }

  let i = 0
  while (i < blocks.length) {
    const b = blocks[i]

    if (b._type === 'code') {
      const lang = b.language || ''
      const code = String(b.code || '').replace(/\n$/, '')
      lines.push('', '```' + lang, code, '```', '')
      i += 1
      continue
    }

    if (b._type === 'gist') {
      const id = b.id
      const file = b.file
      const href = id ? `https://gist.github.com/${id}` : null
      lines.push('', href ? `[Gist${file ? `: ${file}` : ''}](${href})` : '', '')
      i += 1
      continue
    }

    if (b._type === 'block') {
      const style = b.style || 'normal'
      const text = renderBlockText(b)

      // Lists: group consecutive items of same type/level.
      if (b.listItem) {
        const listItem = b.listItem
        const level = Number(b.level || 1)
        const indent = '  '.repeat(Math.max(0, level - 1))
        const bullet = listItem === 'number' ? '1.' : '-'

        lines.push(`${indent}${bullet} ${text}`.trimEnd())
        i += 1
        continue
      }

      if (style === 'blockquote') {
        lines.push('', `> ${text}`, '')
        i += 1
        continue
      }

      if (/^h[1-6]$/.test(style)) {
        const depth = Number(style.slice(1))
        lines.push('', `${'#'.repeat(depth)} ${text}`, '')
        i += 1
        continue
      }

      // Normal paragraph
      if (text) lines.push('', text, '')
      i += 1
      continue
    }

    i += 1
  }

  return lines.join('\n').trim() + '\n'
}

function frontmatter({
  title,
  description,
  date,
  tags,
  coverImage,
}) {
  const safe = (v) => String(v || '').replace(/"/g, '\\"')
  const tagList = Array.isArray(tags) ? tags : []
  const tagsYaml =
    tagList.length ? `[${tagList.map((t) => `"${safe(t)}"`).join(', ')}]` : '[]'

  const fm = [
    '---',
    `title: "${safe(title)}"`,
    `description: "${safe(description)}"`,
    `date: "${safe(date)}"`,
    `tags: ${tagsYaml}`,
    coverImage ? `coverImage: "${safe(coverImage)}"` : null,
    '---',
  ]
    .filter(Boolean)
    .join('\n')
  return fm + '\n\n'
}

async function downloadImage(url, destPath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Image fetch failed ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  ensureDir(path.dirname(destPath))
  fs.writeFileSync(destPath, buf)
}

function extFromUrl(url) {
  try {
    const u = new URL(url)
    const p = u.pathname
    const ext = path.extname(p)
    return ext || '.jpg'
  } catch {
    return '.jpg'
  }
}

async function localizeImages(slug, mdx, coverImageUrl) {
  const map = new Map()
  const urls = new Set()

  const re = /!\[[^\]]*?\]\((https?:\/\/[^)]+)\)/g
  let m
  while ((m = re.exec(mdx))) {
    urls.add(m[1])
  }
  if (coverImageUrl) urls.add(coverImageUrl)

  let idx = 1
  for (const url of urls) {
    const ext = extFromUrl(url)
    const filename = idx === 1 ? `cover${ext}` : `img-${idx}${ext}`
    const rel = `/content-images/${slug}/${filename}`
    const dest = path.join(ASSET_DIR, slug, filename)
    await downloadImage(url, dest)
    map.set(url, rel)
    idx += 1
  }

  let out = mdx
  for (const [remote, local] of map.entries()) {
    out = out.split(remote).join(local)
  }

  const localizedCover = coverImageUrl ? map.get(coverImageUrl) : null
  return { mdx: out, coverImage: localizedCover }
}

async function main() {
  ensureDir(OUT_DIR)
  ensureDir(ASSET_DIR)

  const listingHtml = await fetchText(`${SITE}/articles`)
  const listing = extractNextData(listingHtml)
  const allArticles = listing?.props?.pageProps?.allArticles || []
  const slugs = allArticles.map((a) => a.slug).filter(Boolean)

  console.log(`Found ${slugs.length} article slugs`)

  for (const slug of slugs) {
    const url = `${SITE}/articles/${slug}`
    console.log(`Migrating ${url}`)

    const html = await fetchText(url)
    const nextData = extractNextData(html)
    const article = nextData?.props?.pageProps?.article
    if (!article) throw new Error(`No article in __NEXT_DATA__ for ${slug}`)

    const title = article.title || slug
    const description = article.excerpt || ''
    const date = article.date || ''
    const tags = (article.categories || []).map((t) => t.title).filter(Boolean)

    const ogImage = extractOgImage(html)
    const md = portableTextToMarkdown(article.body || [])

    const localized = await localizeImages(slug, md, ogImage)

    const fm = frontmatter({
      title,
      description,
      date,
      tags,
      coverImage: localized.coverImage,
    })

    const outPath = path.join(OUT_DIR, `${slug}.mdx`)
    fs.writeFileSync(outPath, `${fm}${localized.mdx}`, 'utf8')
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

