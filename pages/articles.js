import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Header from '../components/header'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import Head from 'next/head'

export default function Index({ allPosts, preview, metaImage }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout preview={preview} metaImage={metaImage}>
        <Head>
          <title>Articles | Matt Chaffe</title>
        </Head>
        <Container>
          <Header />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories title="More Stories" posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const { allPosts, metaImage } = await getAllPostsForHome(preview)

  return {
    props: { allPosts, preview, metaImage },
    revalidate: 1
  }
}
