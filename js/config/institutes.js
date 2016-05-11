export default function (nga, admin) {

    const institute = admin.getEntity('institutes').identifier(nga.field('code'));
    const domain = admin.getEntity('domains');

    institute.listView()
        .actions(['create'])
        .title('Intituts')
        .fields([
            nga.field('code').isDetailLink(true),
            nga.field('name'),
            nga.field('domains', 'choices')
        ])
        .filters([
        ])
        .sortField('name')
        .sortDir('DESC')
        .listActions(['edit']);

    institute.editionView()
    .title('Institut {{ entry.values.name }}')
    .fields([
        nga.field('code'),
        nga.field('name'),
        nga.field('domains', 'reference_many').targetEntity(domain).targetField(nga.field('name'))
    ]);

    institute.creationView()
    .title('Nouvel institut')
    .fields([
        nga.field('code'),
        nga.field('name'),
        nga.field('domains', 'reference_many').targetEntity(admin.getEntity('domains')).targetField(nga.field('name'))
    ])

    return institute;
}
