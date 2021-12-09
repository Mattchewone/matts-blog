import client, { previewClient } from './sanity'

const getUniquePosts = (posts) => {
  const slugs = new Set()
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false
    } else {
      slugs.add(post.slug)
      return true
    }
  })
}

const postFields = `
  _id,
  name,
  title,
  'date': publishedAt,
  excerpt,
  'slug': slug.current,
  'coverImage': mainImage,
`

const getClient = (preview) => (preview ? previewClient : client)

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      body
    }`,
    { slug }
  )
  return data[0]
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post" && slug != null]{ 'slug': slug.current }`)
  return data
}

export async function getHomeData() {
  const data = await client.fetch(`*[_type == "site" && title == "Site"] {
    posts[]->{${postFields}},
    body,
    metaImage
  }`)
  return data
}

export async function getAllPostsForHome(preview) {
  const { allPosts, metaImage } = await getClient(preview)
    .fetch(`{
      "allPosts": *[_type == "post"] | order(publishedAt desc){
        ${postFields}
      },
      "metaImage": *[_type == "site" && title == "Site"] {
        metaImage
      }
    }`)

  return {
    allPosts: getUniquePosts(allPosts),
    metaImage: metaImage[0].metaImage
  }
}

export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview)
  const [post, morePosts] = await Promise.all([
    curClient.fetch(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        'author': author->{name, 'picture': image.asset->url},
        body,
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${postFields}
        body,
      }[0...2]`,
      { slug }
    ),
  ])
  return { post, morePosts: getUniquePosts(morePosts) }
}
