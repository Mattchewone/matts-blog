import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import ArticleBody from '../../components/article-body'
import MoreArticles from '../../components/more-articles'
import Header from '../../components/header'
import PostHeader from '../../components/article-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllArticlesWithSlug, getArticleAndMoreArticles } from '../../lib/api'
import PostTitle from '../../components/article-title'
import Head from 'next/head'
import Date from '../../components/date'
import Tags from '../../components/tags'

export default function ArticleSlug({ article, moreArticles, preview }) {
  const router = useRouter()
  if (!router.isFallback && !article?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {article.title}
                </title>
              </Head>
              <PostHeader
                title={article.title}
                coverImage={article.coverImage}
                author={article.author}
              />
              <ArticleBody content={article.body} />

              <SectionSeparator />

              <div className="max-w-6xl mx-auto">
                <div className="mb-6 text-lg italic">
                  Published <Date dateString={article.date} /> by {article.author.name}
                </div>
              </div>
            </article>

            <Tags tags={article.categories} />

            {moreArticles.length > 0 && <MoreArticles articles={moreArticles} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getArticleAndMoreArticles(params.slug, preview)
  return {
    props: {
      preview,
      article: data?.article || null,
      moreArticles: data?.moreArticles || null,
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const allArticles = await getAllArticlesWithSlug()

  return {
    paths:
      allArticles?.map((article) => ({
        params: {
          slug: article?.slug || 'tet',
        },
      })) || [],
    fallback: true,
  }
}