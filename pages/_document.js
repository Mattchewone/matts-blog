import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-primary dark:bg-primary-dark dark:text-white text-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
