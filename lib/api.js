import client, { previewClient } from './sanity'

const getUniqueArticles = (articles) => {
  const slugs = new Set()
  return articles.filter((article) => {
    if (slugs.has(article.slug)) {
      return false
    } else {
      slugs.add(article.slug)
      return true
    }
  })
}

const getUniqueTags = (articles) => {
  return articles.reduce((acc, cur) => {
    if (cur?.categories?.length) {
      acc = cur.categories.reduce((a, c) => {
        if (a.findIndex((t => t === c.title)) !== -1) {
          a.push(c.title)
        }

        return a
      }, acc)
    }

    return acc
  }, [])
}

const articleFields = `
  _id,
  name,
  title,
  'date': publishedAt,
  excerpt,
  'slug': slug.current,
  'coverImage': mainImage,
  categories[]->{title},
`

const getClient = (preview) => (preview ? previewClient : client)

export async function getPreviewArticleBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "article" && slug.current == $slug] | order(publishedAt desc){
      ${articleFields}
      body
    }`,
    { slug }
  )
  return data[0]
}

export async function getAllArticlesWithSlug() {
  const data = await client.fetch(`*[_type == "article" && slug != null]{ 'slug': slug.current }`)
  return data
}

export async function getAllTags() {
  const data = await client.fetch(`*[_type == "article" && slug != null]{
    'slug': slug.current,
    categories[]->{title}
  }`)
  return getUniqueTags(data)
}

export async function getHomeData() {
  const data = await client.fetch(`*[_type == "site" && title == "Site"] {
    ...,
    articles[]->{${articleFields}},
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": @.reference->slug
        }
      }
    },
    metaImage
  }`)
  console.log(data)
  return data
}

export async function getAllPostsForHome(preview) {
  const { allArticles, metaImage } = await getClient(preview)
    .fetch(`{
      "allArticles": *[_type == "article"] | order(publishedAt desc){
        ${articleFields}
      },
      "metaImage": *[_type == "site" && title == "Site"] {
        metaImage
      }
    }`)

  return {
    allArticles: getUniqueArticles(allArticles),
    metaImage: metaImage[0].metaImage
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export async function getAllPostsForTag(tag, preview) {
  const { allArticles, metaImage } = await getClient(preview)
    .fetch(`{
      "allArticles": *[_type == "article" && slug != null && references(*[_type=="category" && title == "${capitalizeFirstLetter(tag)}"]._id)] | order(publishedAt desc){
        ${articleFields}
      },
      "metaImage": *[_type == "site" && title == "Site"] {
        metaImage
      }
    }`)

  return {
    allArticles: getUniqueArticles(allArticles),
    metaImage: metaImage[0].metaImage
  }
}

export async function getArticleAndMoreArticles(slug, preview) {
  const curClient = getClient(preview)
  const [article, moreArticles] = await Promise.all([
    curClient.fetch(
        `*[_type == "article" && slug.current == $slug] | order(_updatedAt desc) {
        ${articleFields}
        'author': author->{name, 'picture': image.asset->url},
        body[]{
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              "slug": @.reference->slug
            }
          }
        },
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "article" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${articleFields}
        body,
      }[0...2]`,
      { slug }
    ),
  ])
  return { article, moreArticles: getUniqueArticles(moreArticles) }
}
