export default function (nga, admin) {

    const institute = admin.getEntity('institutes').identifier(nga.field('id'));
    const domain = admin.getEntity('domains');

    institute.listView()
        .actions(['filter', 'create'])
        .title('Intituts')
        .perPage(20)
        .fields([
            nga.field('code').isDetailLink(true),
            nga.field('name').label('Nom'),
            nga.field('domains', 'choices').label('Domaines')
        ])
        .filters([
            nga.field('match').label('Recherche global').pinned(true),
            nga.field('like_name').label('Nom'),
            nga.field('like_code').label('Code')
        ])
        .sortField('name')
        .sortDir('DESC')
        .listActions(['edit']);

    institute.editionView()
    .title('Institut {{ entry.values.name }}')
    .fields([
        nga.field('code'),
        nga.field('name').label('Nom'),
        nga.field('domains', 'reference_many').targetEntity(domain).targetField(nga.field('name')).label('Domaines')
    ]);

    institute.creationView()
    .title('Nouvel institut')
    .fields([
        nga.field('code'),
        nga.field('name').label('Nom'),
        nga.field('domains', 'reference_many').targetEntity(admin.getEntity('domains')).targetField(nga.field('name')).label('Domaines')
    ])

    return institute;
}
