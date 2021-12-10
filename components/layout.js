import Meta from '../components/meta'

export default function Layout({ preview, children, metaImage }) {
  return (
    <>
      <Meta metaImage={metaImage} />
      <div className="min-h-screen leading-9 text-xl">
        <main>{children}</main>
      </div>
    </>
  )
}
