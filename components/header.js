import Link from 'next/link'
import ThemeToggle from './theme-toggle'

export default function Header() {
  return (
    <nav
      className="flex justify-between text-md sm:text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-8 mt-8"
    >
      <div>
        <Link
          href="/"
          className="hover:underline hover:decoration-4 hover:decoration-pink-100"
        >
          Matt Chaffe
        </Link>
      </div>
      <div className="flex gap-6 items-center">
        {/* <Link href="/dev-garden">
          <a className="hover:text-decoration hover:text-decoration-underline hover:text-decoration-4 hover:text-decoration-pink-100">Dev Garden</a>
        </Link> */}
        <Link
          href="/articles"
          className="hover:underline hover:decoration-4 hover:decoration-pink-100"
        >
          Latest Articles
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}
