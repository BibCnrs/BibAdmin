
export default function (nga, admin) {

    const domain = admin.getEntity('domains').identifier(nga.field('name'));
    domain.listView()
        .actions(['create'])
        .title('Domaines')
        .fields([
            nga.field('name').isDetailLink(true),
            nga.field('gate'),
            nga.field('userId'),
            nga.field('profile')
        ])
        .filters([
        ])
        .sortField('username')
        .sortDir('DESC')
        .listActions(['edit']);
    domain.editionView()
    .title('Domaine {{ entry.values.name }}')
    .fields([
        nga.field('name'),
        nga.field('gate'),
        nga.field('userId'),
        nga.field('password', 'password'),
        nga.field('profile')
    ]);
    domain.creationView()
    .title('Nouveau domaine')
    .fields([
        nga.field('name'),
        nga.field('gate'),
        nga.field('userId'),
        nga.field('password', 'password'),
        nga.field('profile')
    ])

    return domain;
}
