import ArticlePreview from './article-preview'

export default function MoreArticles({ title = "Popular Stories", articles }) {
  return (
    <section className="max-w-6xl mx-auto pt-8">
      <h2 className="mb-8 text-6xl md:text-7xl font-bold capitalize tracking-tighter leading-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
        {articles.map((article) => (
          <ArticlePreview
            key={article.slug}
            title={article.title}
            coverImage={article.coverImage}
            date={article.date}
            author={article.author}
            slug={article.slug}
          />
        ))}
      </div>
    </section>
  )
}
