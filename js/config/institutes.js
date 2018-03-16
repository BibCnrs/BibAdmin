export default function (nga, admin) {

    const institute = admin.getEntity('institutes').identifier(nga.field('id'));
    const community = admin.getEntity('communities');

    institute.listView()
    .actions(['filter', 'export', 'create', 'batch'])
    .title('Instituts')
    .perPage(20)
    .fields([
        nga.field('institute.id'),
        nga.field('institute.code').map((_, entry) => entry.code).isDetailLink(true).label('Code'),
        nga.field('institute.name').map((_, entry) => entry.name).label('Nom'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés')
    ])
    .filters([
        nga.field('match').label('Recherche globale').pinned(true),
        nga.field('like_institute.name').label('Nom'),
        nga.field('like_institute.code').label('Code'),
        nga.field('community.id', 'reference')
        .targetEntity(community)
        .targetField(nga.field('name'))
        .remoteComplete(true)
        .label('Communautés')
    ])
    .sortField('name')
    .sortDir('DESC')
    .exportOptions({
        quotes: true,
        delimiter: ';',
        newline: /\r?\n/
    })
    .exportFields([
        institute.listView().fields()
    ])
    .listActions(['edit', 'delete']);

    institute.editionView()
    .title('Institut {{ entry.values.name }}')
    .fields([
        nga.field('code'),
        nga.field('name').label('Nom'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés')
    ]);

    institute.creationView()
    .title('Nouvel institut')
    .fields([
        nga.field('code'),
        nga.field('name').label('Nom'),
        nga.field('communities', 'reference_many').targetEntity(admin.getEntity('communities')).targetField(nga.field('name')).label('Communautés')
    ]);

    return institute;
}
