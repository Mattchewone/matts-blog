import * as React from 'react'
import Link from 'next/link'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Highlight, themes } from 'prism-react-renderer'
import GistEmbed from '../components/gist-embed'
import { withBasePath } from './basePath'

function linkClass() {
  return 'underline text-pink-100 hover:text-pink-100 visited:text-pink-400'
}

function normalizeImgSrc(src: string, assetBase: string) {
  if (!src) return src
  if (/^https?:\/\//i.test(src) || src.startsWith('/')) return src
  return `${assetBase}/${src.replace(/^\.\//, '')}`.replace(/([^:]\/)\/+/g, '$1')
}

function extractText(node: any): string {
  if (node == null) return ''
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (typeof node === 'object' && 'props' in node) return extractText((node as any).props?.children)
  return ''
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <Highlight
      code={code}
      theme={themes.dracula}
      language={language as any}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`rounded-lg text-left mx-2 my-6 p-4 border-transparent leading-6 overflow-x-scroll bg-code-grey prism-code language-${language} ${className}`}
        >
          {tokens.map((line, i) => (
            <div
              key={i}
              {...(() => {
                const lp = getLineProps({ line })
                return {
                  ...lp,
                  className: `token-line ${lp.className || ''}`.trim(),
                }
              })()}
            >
              <span className="inline-block w-8 opacity-50 mr-3">{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

function Pre({
  children,
}: {
  children: React.ReactNode
}) {
  const child = React.Children.toArray(children)[0] as any
  const className: string = child?.props?.className || ''
  const match = /language-(\w+)/.exec(className)
  const language = match?.[1] || 'text'
  const code = String(child?.props?.children ?? '').replace(/\n$/, '')
  return <CodeBlock code={code} language={language} />
}

export async function renderMdx(source: string, assetBase: string) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm as any],
      },
    },
    components: {
      a: (props: any) => {
        const href: string | undefined = props.href
        const external = href && /^https?:\/\//i.test(href)
        if (href && /^https?:\/\/gist\.github\.com\//i.test(href)) {
          const id = href.split('gist.github.com/')[1]?.split(/[/?#]/)[0]
          const label = extractText(props.children)
          const file =
            label && /^Gist:\s*/i.test(label) ? label.replace(/^Gist:\s*/i, '').trim() : null
          return id ? <GistEmbed id={id} file={file || null} /> : null
        }
        if (href && href.startsWith('/articles/')) {
          const slug = href.split('/articles/')[1]
          return (
            <Link href={`/articles/${slug}`} className={linkClass()}>
              {props.children}
            </Link>
          )
        }
        return (
          <a
            href={href}
            className={linkClass()}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {props.children}
          </a>
        )
      },
      img: (props: any) => {
        const src = withBasePath(
          normalizeImgSrc(String(props.src || ''), assetBase)
        )
        return (
          <img
            src={src}
            alt={props.alt || ''}
            className="rounded-lg"
            loading="lazy"
          />
        )
      },
      pre: (props: any) => <Pre {...props} />,
    },
  })

  return content
}

