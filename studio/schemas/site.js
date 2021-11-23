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
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{
        type: 'reference',
        to: [
          {type: 'post'}
        ]
      }]
    }
  ]
}
