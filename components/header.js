import Link from 'next/link'

export default function Header() {
  return (
    <nav
      className="flex justify-between text-sm sm:text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-8 mt-8"
    >
      <div>
        <Link href="/">
          <a className="hover:text-decoration hover:text-decoration-underline hover:text-decoration-4 hover:text-decoration-pink">Matt Chaffe</a>
        </Link>
      </div>
      <div className="flex gap-6">
        {/* <Link href="/dev-garden">
          <a className="hover:text-decoration hover:text-decoration-underline hover:text-decoration-4 hover:text-decoration-pink">Dev Garden</a>
        </Link> */}
        <Link href="/articles">
          <a className="hover:text-decoration hover:text-decoration-underline hover:text-decoration-4 hover:text-decoration-pink">Latest Articles</a>
        </Link>
      </div>
    </nav>
  )
}
