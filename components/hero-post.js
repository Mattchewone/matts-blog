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
        <CoverImage slug={slug} imageObject={coverImage} title={title} url={coverImage} />
      </div>
      <div className="flex flex-col gap-6 md:mb-16">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/articles/${slug}`} href="/articles/[slug]">
              <a className="group-hover:underline group-hover:decoration-4 group-hover:decoration-pink-100">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg italic">
            <Date dateString={date} />
          </div>
        </div>
        {/* <div>
          <p className="text-sm leading-relaxed mb-4">{excerpt}</p>
        </div> */}
      </div>
    </section>
  )
}
