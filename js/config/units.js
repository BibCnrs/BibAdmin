export default function (nga, admin) {

    const unit = admin.getEntity('units').identifier(nga.field('id'));
    const domain = admin.getEntity('domains');

    unit.listView()
        .actions(['create'])
        .title('Unités')
        .perPage(20)
        .fields([
            nga.field('name').isDetailLink(true),
            nga.field('domains', 'choices')
        ])
        .filters([
        ])
        .sortField('name')
        .sortDir('DESC')
        .listActions(['edit']);

    unit.editionView()
    .title('Unité {{ entry.values.name }}')
    .fields([
        nga.field('name'),
        nga.field('domains', 'reference_many').targetEntity(domain).targetField(nga.field('name'))
    ]);

    unit.creationView()
    .title('Nouvel Unité')
    .fields([
        nga.field('name'),
        nga.field('domains', 'reference_many').targetEntity(admin.getEntity('domains')).targetField(nga.field('name'))
    ])

    return unit;
}
