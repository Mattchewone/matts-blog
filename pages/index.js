import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Header from '../components/header'
import Layout from '../components/layout'
import PostBody from '../components/post-body'
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
          <PostBody content={content.body} />

          <MoreStories posts={content.posts} />
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