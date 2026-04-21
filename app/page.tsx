import Container from '../components/container'
import Header from '../components/header'
import MoreArticles from '../components/more-articles'
import { getHomeData } from '../lib/api'
import { renderMdx } from '../lib/renderMdx'

export default async function HomePage() {
  const [content] = getHomeData()
  return (
    <Container>
      <Header />
      {content.body ? (
        <div className="prose dark:prose-invert prose-xl md:prose-2xl max-w-6xl mx-auto">
          {await renderMdx(content.body, '')}
        </div>
      ) : null}
      <MoreArticles articles={content.articles} />
    </Container>
  )
}

