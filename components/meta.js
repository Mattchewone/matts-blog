import Head from 'next/head'
import { imageBuilder } from '../lib/sanity'

export default function Meta({ metaImage }) {
  return (
    <Head>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon.png"
      />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`A place for my thoughts, articles and anything else developer related.`}
      />
      <meta property="og:image" content={imageBuilder(metaImage).width(800).height(418).url()} />
    </Head>
  )
}
