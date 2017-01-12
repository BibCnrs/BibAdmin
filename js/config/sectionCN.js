export default function (nga, admin) {

    const database = admin.getEntity('section_cn')
    .identifier(nga.field('id'));
    const institute = admin.getEntity('institutes');

    database.listView()
    .actions(['create', 'batch'])
    .title('Sections du comité national')
    .perPage(20)
    .fields([
        nga.field('name').isDetailLink(true).label('Nom'),
        nga.field('code').isDetailLink(true).label('Nom'),
    ])
    .sortField('name')
    .sortDir('DESC')
    .listActions(['edit', 'delete']);

    database.editionView()
    .title('Sections du comité national {{ entry.values.username }}')
    .fields([
        nga.field('name').label('Nom'),
        nga.field('code').label('Code'),
        nga.field('comment', 'text').label('Commentaire'),
        nga.field('primary_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts principaux'),
        nga.field('secondary_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaires'),
    ]);

    database.creationView()
    .title('Nouvel Sections du comité national')
    .fields([
        nga.field('name').label('Nom'),
        nga.field('code').label('Code'),
        nga.field('comment', 'text').label('Commentaire'),
        nga.field('primary_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts principaux'),
        nga.field('secondary_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaires'),
    ]);

    return database;
}
