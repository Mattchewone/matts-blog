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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { article, moreArticles } = getArticleAndMoreArticles(slug)
  if (!article) return null

  return (
    <Container>
      <Header />
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

