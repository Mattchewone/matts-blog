import BlockContent from '@sanity/block-content-to-react'
import Gist from 'react-gist'
import Highlight, { defaultProps } from 'prism-react-renderer'
import dracula from 'prism-react-renderer/themes/dracula'

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
                  lineProps.className = `${lineProps.className} -ml-4 pl-3 bg-code-grey-light border-l-4 border-pink`
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
}

export default function PostBody({ content }) {
  return (
    <div className="max-w-6xl mx-auto">
      <BlockContent
        blocks={content}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
        serializers={serializers}
      />
    </div>
  )
}
