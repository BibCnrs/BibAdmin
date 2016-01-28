
export default function (nga, admin) {

    const domain = admin.getEntity('domains').identifier(nga.field('name'));;
    domain.listView()
        .actions(['create'])
        .title('Domaines')
        .fields([
            nga.field('name'),
            nga.field('userId'),
            nga.field('profile')
        ])
        .filters([
        ])
        .sortField('username')
        .sortDir('DESC')
        .listActions(['edit']);
    domain.editionView()
    .title('Domaines')
    .fields([
        nga.field('name'),
        nga.field('userId'),
        nga.field('password', 'password'),
        nga.field('profile')
    ]);
    domain.creationView()
    .title('Domaines')
    .fields([
        nga.field('name'),
        nga.field('userId'),
        nga.field('password', 'password'),
        nga.field('profile')
    ])

    return domain;
}
