import Container from '../../components/container'
import MoreArticles from '../../components/more-articles'
import HeroPost from '../../components/hero-post'
import Header from '../../components/header'
import Layout from '../../components/layout'
import { getAllPostsForHome } from '../../lib/api'
import Head from 'next/head'

export default function Article({ allArticles, preview, metaImage }) {
  const heroPost = allArticles[0]
  const moreArticles = allArticles.slice(1)
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
          {moreArticles.length > 0 && <MoreArticles title="More Stories" articles={moreArticles} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const { allArticles, metaImage } = await getAllPostsForHome(preview)

  return {
    props: { allArticles, preview, metaImage },
    revalidate: 1
  }
}
