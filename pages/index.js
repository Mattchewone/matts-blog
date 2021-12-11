import Container from '../components/container'
import MoreArticles from '../components/more-articles'
import Header from '../components/header'
import Layout from '../components/layout'
import ArticleBody from '../components/article-body'
import { getHomeData } from '../lib/api'
import Head from 'next/head'

export default function Index({ content, preview }) {
  return (
    <>
      <Layout preview={preview} metaImage={content.metaImage}>
        <Head>
          <title>Matt Chaffe</title>
        </Head>
        <Container>
          <Header />
          <ArticleBody content={content.body} />

          <MoreArticles articles={content.articles} />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const [content] = await getHomeData()

  return {
    props: { content, preview },
    revalidate: 1
  }
}