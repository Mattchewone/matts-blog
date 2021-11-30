import Meta from '../components/meta'

export default function Layout({ preview, children, metaImage }) {
  return (
    <>
      <Meta metaImage={metaImage} />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </>
  )
}
