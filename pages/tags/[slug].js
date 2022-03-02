import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import MoreArticles from '../../components/more-articles'
import Header from '../../components/header'
import Layout from '../../components/layout'
import { getAllTags, getAllPostsForTag } from '../../lib/api'
import PostTitle from '../../components/article-title'
import Head from 'next/head'

export default function ArticleSlug({ allArticles, tag, preview }) {
  const router = useRouter()
  if (!router.isFallback && !allArticles.length) {
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
            <Head>
              <title>
                Tags | {tag}
              </title>
            </Head>
            <MoreArticles title={tag} articles={allArticles} />
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getAllPostsForTag(params.slug, preview)

  return {
    props: {
      preview,
      allArticles: data?.allArticles || null,
      tag: params.slug
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const allTags = await getAllTags()

  return {
    paths:
      allTags?.map((tag) => ({
        params: {
          slug: tag || 'default',
        },
      })) || [],
    fallback: true,
  }
}