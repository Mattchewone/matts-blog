import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {
  getAllPosts,
  getPostBySlug,
  getAllTags as getAllTagSlugs,
  tagSlugToLabel,
} from './posts'

const HOME_MD = path.join(process.cwd(), 'content/home.mdx')

export function getHomeData() {
  let intro = ''
  let featured = []
  if (fs.existsSync(HOME_MD)) {
    const { content, data } = matter(fs.readFileSync(HOME_MD, 'utf8'))
    intro = content.trim()
    if (Array.isArray(data?.featured)) {
      featured = data.featured.map((s) => String(s)).filter(Boolean)
    }
  }
  const allPosts = getAllPosts().map(toLegacyArticle)
  const bySlug = new Map(allPosts.map((p) => [p.slug, p]))
  const featuredPosts = featured.map((s) => bySlug.get(s)).filter(Boolean)
  const featuredSet = new Set(featuredPosts.map((p) => p.slug))
  const articles = [
    ...featuredPosts,
    ...allPosts.filter((p) => !featuredSet.has(p.slug)),
  ].slice(0, 12)
  return [
    {
      metaImage: null,
      body: intro,
      featured: featuredPosts,
      articles,
    },
  ]
}

export function getAllArticlesWithSlug() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export function getAllTags() {
  return getAllTagSlugs()
}

export function getAllPostsForHome() {
  return {
    allArticles: getAllPosts().map(toLegacyArticle),
    metaImage: null,
  }
}

export function getAllPostsForTag(tagSlug) {
  return {
    allArticles: getAllPosts()
      .filter((p) => p.tags.some((t) => t.slug === tagSlug))
      .map(toLegacyArticle),
    metaImage: null,
  }
}

export function getArticleAndMoreArticles(slug) {
  const article = getPostBySlug(slug)
  const all = getAllPosts()
  const moreArticles = all.filter((p) => p.slug !== slug).slice(0, 2).map(toLegacyArticle)
  return { article: article ? toLegacyArticle(article) : null, moreArticles }
}

function toLegacyArticle(post) {
  return {
    title: post.title,
    excerpt: post.description,
    date: post.date,
    slug: post.slug,
    coverImage: post.coverImage,
    categories: post.tags,
    author: post.author,
    body: post.body,
    assetBase: post.assetBase,
  }
}

export { tagSlugToLabel }
