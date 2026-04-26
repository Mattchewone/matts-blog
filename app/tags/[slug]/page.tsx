import Container from '../../../components/container'
import Header from '../../../components/header'
import MoreArticles from '../../../components/more-articles'
import { getAllTags, getAllPostsForTag, tagSlugToLabel } from '../../../lib/api'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return getAllTags().map((slug) => ({ slug }))
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { allArticles } = getAllPostsForTag(slug)
  const label = tagSlugToLabel(slug)

  return (
    <Container>
      <Header />
      <MoreArticles title={label} articles={allArticles} />
    </Container>
  )
}

