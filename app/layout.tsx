import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { withBasePath } from '../lib/basePath'
import '../styles/index.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mattchaffe.uk'

export const metadata: Metadata = {
  title: {
    default: 'Matt Chaffe',
    template: '%s | Matt Chaffe',
  },
  description:
    'A place for my thoughts, articles and anything else developer related.',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  icons: [{ rel: 'icon', url: withBasePath('/static/favicon.png') }],
  openGraph: {
    siteName: 'Matt Chaffe',
    type: 'website',
    url: siteUrl,
    title: 'Matt Chaffe',
    description: 'A place for my thoughts, articles and anything else developer related.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matt Chaffe',
    description: 'A place for my thoughts, articles and anything else developer related.',
  },
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
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="d8b6b77c-abe2-4391-a067-fbd4103214bf"
          strategy="afterInteractive"
        />
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

