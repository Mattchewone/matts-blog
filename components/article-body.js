import BlockContent from '@sanity/block-content-to-react'
import Gist from 'react-gist'
import Highlight, { defaultProps } from 'prism-react-renderer'
import dracula from 'prism-react-renderer/themes/dracula'
import Link from 'next/link'

const calculateLinesToHighlight = (lineNumbers, index) => {
  const lineNumber = index + 1
  const inRange = lineNumbers.some(num => lineNumber === num)
  return inRange
}

const serializers = {
  types: {
    code: (props) => {
      return (
        <Highlight {...defaultProps} code={props.node.code} theme={dracula} language={props.node.language}>
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <pre className={`rounded-lg text-left mx-2 my-6 p-4 border-transparent leading-6 overflow-x-scroll bg-code-grey ${className}`}>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })
                if (calculateLinesToHighlight(props.node?.highlightedLines || [], i)) {
                  lineProps.className = `${lineProps.className} -ml-4 pl-3 bg-code-grey-light border-l-4 border-pink-100`
                }
                return (
                  <div {...lineProps}>
                    <span className={`inline-block w-8 opacity-50`}>{i + 1}</span>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                )
            })}
            </pre>
          )}
        </Highlight>
      )
    },
    gist: ({ node }) => {
      const { id, file } = node
      return (
        <Gist id={id} file={file} />
      )
    }
  },
  marks: {
    internalLink: ({mark, children}) => {
      const {slug = {}} = mark

      return <Link as={`/articles/${slug.current}`} href="/articles/[slug]">
        <a className="underline text-pink-100 hover:text-pink-100 visited:text-pink-400">{children}</a>
      </Link>
    },
    link: ({mark, children}) => {
      const { blank, href } = mark
      return blank ?
        <a className="underline text-pink-100 hover:text-pink-100 visited:text-pink-400" href={href} target="_blank" rel="noopener">{children}</a>
        : <a className="underline text-pink-100 hover:text-pink-100 visited:text-pink-400" href={href}>{children}</a>
    },
    code: ({mark, children}) => {
      return <div className="bg-slate-200/25 rounded-lg p-4"><code className="break-words">{children}</code></div>
    }
  }
}

export default function ArticleBody({ content }) {
  return (
    <div className="prose dark:prose-invert prose-xl max-w-6xl mx-auto">
      <BlockContent
        blocks={content}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
        serializers={serializers}
      />
    </div>
  )
}
