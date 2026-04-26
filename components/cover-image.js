import cn from 'classnames'
import Link from 'next/link'
import { withBasePath } from '../lib/basePath'

export default function CoverImage({ title, slug, coverImage }) {
  if (!coverImage) return null

  const src = withBasePath(coverImage)

  const image = (
    <img
      width={1240}
      height={540}
      alt={`Cover Image for ${title}`}
      loading="lazy"
      className={cn('shadow-small w-full h-full', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
      src={src}
    />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/articles/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
