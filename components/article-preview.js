import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'
import {imageBuilder} from '../lib/sanity'

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
        <CoverImage slug={slug} title={title} imageObject={coverImage} url={imageBuilder(coverImage).url()} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/articles/${slug}`} href="/articles/[slug]">
          <a className="group-hover:underline group-hover:decoration-4 group-hover:decoration-pink-100">{title}</a>
        </Link>
      </h3>
      <div className="text-lg italic mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-sm leading-relaxed mb-4">{excerpt}</p>
    </div>
  )
}
