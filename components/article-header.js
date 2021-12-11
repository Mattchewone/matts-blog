import CoverImage from './cover-image'
import ArticleTitle from './article-title'

export default function ArticleHeader({ title, coverImage, date }) {
  return (
    <>
      <ArticleTitle>{title}</ArticleTitle>
      <div className="mb-8 md:mb-8 -mx-5 sm:mx-0">
        <CoverImage title={title} imageObject={coverImage} url={coverImage} />
      </div>
    </>
  )
}
