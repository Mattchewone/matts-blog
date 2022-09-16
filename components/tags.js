import Link from 'next/link'

export default function Tags({ tags }) {
  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h2 className="mb-8 text-3xl md:text-5xl font-bold capitalize tracking-tighter leading-tight">
        Tags
      </h2>

      <div className="flex gap-3">
        {tags.map(tag => (
          <Link as={`/tags/${tag.title}`} href="/tags/[slug]">
            <a className="hover:underline hover:decoration-4 hover:decoration-pink-100">{tag.title}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}
