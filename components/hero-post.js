import Date from '../components/date'
import CoverImage from '../components/cover-image'
import Link from 'next/link'

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}) {
  return (
    <section className="max-w-6xl mx-auto group">
      <div className="mb-8 md:mb-8">
        <CoverImage slug={slug} coverImage={coverImage} title={title} />
      </div>
      <div className="flex flex-col gap-6 md:mb-16">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/articles/${slug}`}>
              <a className="group-hover:underline group-hover:decoration-4 group-hover:decoration-pink-100">
                {title}
              </a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg italic">
            <Date dateString={date} />
          </div>
        </div>
      </div>
    </section>
  )
}
