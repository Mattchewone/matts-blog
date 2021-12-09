import Date from '../components/date'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'

export default function PostHeader({ title, coverImage, date }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-8 -mx-5 sm:mx-0">
        <CoverImage title={title} imageObject={coverImage} url={coverImage} />
      </div>
      {/* <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg italic">
          <Date dateString={date} />
        </div>
      </div> */}
    </>
  )
}
