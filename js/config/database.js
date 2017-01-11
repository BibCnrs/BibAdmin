export default function (nga, admin) {

    const database = admin.getEntity('databases')
    .identifier(nga.field('id'));
    const community = admin.getEntity('communities');

    database.listView()
    .actions(['create', 'batch'])
    .title('Databases')
    .perPage(20)
    .fields([
        nga.field('name').isDetailLink(true).label('Nom')
    ])
    .sortField('name')
    .sortDir('DESC')
    .listActions(['edit', 'delete']);

    database.editionView()
    .title('Base de données {{ entry.values.username }}')
    .fields([
        nga.field('name').label('Nom'),
        nga.field('url_fr', 'string').label('URL FR'),
        nga.field('url_en', 'string').label('URL EN'),
        nga.field('text_fr', 'text').label('Description FR'),
        nga.field('text_en', 'text').label('Description EN'),
        nga.field('image', 'template').template('<bib-image/>').label('Image'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés')
    ]);

    database.creationView()
    .title('Nouvel Base de données')
    .fields([
        nga.field('name').label('Nom'),
        nga.field('url_fr', 'string').label('URL FR'),
        nga.field('url_en', 'string').label('URL EN'),
        nga.field('text_fr', 'text').label('Description FR'),
        nga.field('text_en', 'text').label('Description EN'),
        nga.field('image', 'template').template('<bib-image/>').label('Image'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés')
    ]);

    return database;
}
