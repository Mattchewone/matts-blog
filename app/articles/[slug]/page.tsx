import type { Metadata } from 'next'
import Container from '../../../components/container'
import Header from '../../../components/header'
import PostHeader from '../../../components/article-header'
import MoreArticles from '../../../components/more-articles'
import SectionSeparator from '../../../components/section-separator'
import Date from '../../../components/date'
import Tags from '../../../components/tags'
import { getAllArticlesWithSlug, getArticleAndMoreArticles } from '../../../lib/api'
import { renderMdx } from '../../../lib/renderMdx'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return getAllArticlesWithSlug().map((a: { slug: string }) => ({
    slug: a.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { article } = getArticleAndMoreArticles(slug)
  if (!article) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mattchaffe.uk'
  const url = `${siteUrl}/articles/${slug}/`
  const images = article.coverImage ? [{ url: article.coverImage }] : []

  return {
    title: article.title,
    description: article.excerpt || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      url,
      type: 'article',
      publishedTime: article.date || undefined,
      authors: ['Matt Chaffe'],
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || undefined,
      images: article.coverImage ? [article.coverImage] : [],
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { article, moreArticles } = getArticleAndMoreArticles(slug)
  if (!article) return null

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mattchaffe.uk'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt || undefined,
    datePublished: article.date || undefined,
    author: { '@type': 'Person', name: article.author.name, url: siteUrl },
    url: `${siteUrl}/articles/${slug}/`,
    ...(article.coverImage ? { image: article.coverImage } : {}),
  }

  return (
    <Container>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <PostHeader title={article.title} coverImage={article.coverImage} />
        <div className="prose dark:prose-invert prose-xl md:prose-2xl max-w-6xl mx-auto">
          {await renderMdx(article.body, article.assetBase)}
        </div>
        {article.categories?.length ? <Tags tags={article.categories} /> : null}
        <SectionSeparator />

        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-lg italic">
            Published <Date dateString={article.date} /> by {article.author.name}
          </div>
        </div>
      </article>

      {moreArticles?.length ? <MoreArticles articles={moreArticles} /> : null}
    </Container>
  )
}

