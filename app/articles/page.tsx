import Container from '../../components/container'
import Header from '../../components/header'
import HeroPost from '../../components/hero-post'
import MoreArticles from '../../components/more-articles'
import { getAllPostsForHome } from '../../lib/api'

export const dynamic = 'force-static'

export default function ArticlesPage() {
  const { allArticles } = getAllPostsForHome()
  const heroPost = allArticles[0]
  const moreArticles = allArticles.slice(1)

  return (
    <Container>
      <Header />
      {heroPost ? (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          excerpt={heroPost.excerpt}
          slug={heroPost.slug}
        />
      ) : null}
      {moreArticles.length ? (
        <MoreArticles title="More Stories" articles={moreArticles} />
      ) : null}
    </Container>
  )
}

