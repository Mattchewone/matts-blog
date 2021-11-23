import markdownStyles from './markdown-styles.module.css'
import BlockContent from '@sanity/block-content-to-react'
import Highlight, { defaultProps } from 'prism-react-renderer'

const serializers = {
  types: {
    code: (props) => {
      return (
        <Highlight {...defaultProps} code={props.node.code} language={props.node.language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`rounded-lg text-left m-2 p-4 leading-6 overflow-x-scroll bg-code-grey ${className}`}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  <span className={`inline-block w-8 opacity-50`}>{i + 1}</span>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      )
    },
  },
}

export default function PostBody({ content }) {
  return (
    <div className="max-w-6xl mx-auto">
      <BlockContent
        blocks={content}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
        className={markdownStyles.markdown}
        serializers={serializers}
      />
    </div>
  )
}
