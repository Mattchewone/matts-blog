export default {
  name: 'site',
  title: 'Site',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
    {
      name: 'metaImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'articles',
      title: 'Artilces',
      type: 'array',
      of: [{
        type: 'reference',
        to: [
          {type: 'article'}
        ]
      }]
    }
  ]
}
