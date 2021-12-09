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
      <div className="flex flex-col gap-6 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="group-hover:text-decoration group-hover:text-decoration-underline group-hover:text-decoration-4 group-hover:text-decoration-pink">{title}</a>
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
