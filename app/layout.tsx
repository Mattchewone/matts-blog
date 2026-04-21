import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import '../styles/index.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Matt Chaffe',
  description:
    'A place for my thoughts, articles and anything else developer related.',
  icons: [{ rel: 'icon', url: '/static/favicon.png' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const themeInit = `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInit}
        </Script>
      </head>
      <body
        className={`bg-primary dark:bg-primary-dark dark:text-white text-black ${inter.className}`}
      >
        <div className="min-h-screen md:leading-9 text-base md:text-xl">
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}

