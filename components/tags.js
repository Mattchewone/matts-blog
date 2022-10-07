import Link from 'next/link'

export default function Tags({ tags }) {
  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h2 className="mb-8 text-xl md:text-3xl font-bold capitalize tracking-tighter leading-tight">
        Tags:
      </h2>

      <div className="flex gap-3">
        {tags.map(tag => (
          <Link as={`/tags/${tag.title}`} href="/tags/[slug]">
            <a className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-2 font-bold leading-loose cursor-pointer dark:text-gray-300">{tag.title}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}
