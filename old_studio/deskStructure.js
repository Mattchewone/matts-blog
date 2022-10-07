import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.document()
            .schemaType('site')
            .documentId('site')
        ),
        ...S.documentTypeListItems().filter(listItem => !['site'].includes(listItem.getId()))
    ])