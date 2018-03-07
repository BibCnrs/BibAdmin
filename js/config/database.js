export default function (nga, admin) {

    const database = admin.getEntity('databases')
    .identifier(nga.field('id'));
    const community = admin.getEntity('communities');

    database.listView()
    .actions(['create', 'batch'])
    .title('Databases')
    .perPage(20)
    .fields([
        nga.field('database.name_fr').map((_, entry) => entry.name_fr).isDetailLink(true).label('Nom (fr)'),
        nga.field('database.name_en').map((_, entry) => entry.name_en).isDetailLink(true).label('Nom (en)'),
        nga.field('active', 'boolean').label('Active'),
    ])
    .sortField('database.name_fr')
    .sortDir('ASC')
    .listActions(['edit', 'delete']);

    database.editionView()
    .title('Base de données {{ entry.values.username }}')
    .fields([
        nga.field('name_fr').label('Nom (fr)'),
        nga.field('name_en').label('Nom (en)'),
        nga.field('url_fr', 'string').label('URL FR'),
        nga.field('url_en', 'string').label('URL EN'),
        nga.field('text_fr', 'text').label('Description FR'),
        nga.field('text_en', 'text').label('Description EN'),
        nga.field('image', 'template').template('<bib-image/>').label('Image'),
        nga.field('active', 'boolean').label('Active').validation({
            required: true,
        }),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés')
    ]);

    database.creationView()
    .title('Nouvel Base de données')
    .fields([
        nga.field('name_fr').label('Nom (fr)'),
        nga.field('name_en').label('Nom (en)'),
        nga.field('url_fr', 'string').label('URL FR'),
        nga.field('url_en', 'string').label('URL EN'),
        nga.field('text_fr', 'text').label('Description FR'),
        nga.field('text_en', 'text').label('Description EN'),
        nga.field('image', 'template').template('<bib-image/>').label('Image'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés')
    ]);

    return database;
}
