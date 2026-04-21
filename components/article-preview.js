import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function ArticlePreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}) {
  return (
    <div className="mb-6 group">
      <div className="mb-5">
        <CoverImage slug={slug} title={title} coverImage={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          href={`/articles/${slug}`}
          className="group-hover:underline group-hover:decoration-4 group-hover:decoration-pink-100"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg italic mb-4">
        <Date dateString={date} />
      </div>
      {excerpt ? (
        <p className="text-sm leading-relaxed mb-4">{excerpt}</p>
      ) : null}
    </div>
  )
}
