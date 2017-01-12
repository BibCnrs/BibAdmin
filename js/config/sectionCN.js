export default function (nga, admin) {

    const database = admin.getEntity('section_cn')
    .identifier(nga.field('id'));
    const institute = admin.getEntity('institutes');

    database.listView()
    .actions(['filter', 'create', 'batch'])
    .title('Sections du comité national')
    .perPage(20)
    .fields([
        nga.field('section_cn.name').map((_, entry) => entry.name).isDetailLink(true).label('Nom'),
        nga.field('section_cn.code').map((_, entry) => entry.code).isDetailLink(true).label('Code'),
    ])
    .filters([
        nga.field('match').label('Recherche globale').pinned(true),
        nga.field('like_section_cn.name').label('Nom'),
        nga.field('like_section_cn.code').label('Code'),
        nga.field('primary_institute.institute_id', 'reference')
        .targetEntity(institute)
        .targetField(nga.field('name'))
        .remoteComplete(true)
        .label('Instituts principaux'),
        nga.field('secondary_institute.institute_id', 'reference')
        .targetEntity(institute)
        .targetField(nga.field('name'))
        .remoteComplete(true)
        .label('Instituts secondaires'),
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
    .title('Nouvelle Sections du comité national')
    .fields([
        nga.field('name').label('Nom'),
        nga.field('code').label('Code'),
        nga.field('comment', 'text').label('Commentaire'),
        nga.field('primary_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts principaux'),
        nga.field('secondary_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaires'),
    ]);

    return database;
}
