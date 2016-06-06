
export default function (nga, admin) {

    const adminUser = admin.getEntity('adminUsers')
    .identifier(nga.field('username'));

    adminUser.listView()
        .actions(['create'])
        .title('Administrateurs')
        .perPage(20)
        .fields([
            nga.field('username').isDetailLink(true),
        ])
        .sortField('username')
        .sortDir('DESC')
        .listActions(['edit']);
    adminUser.editionView()
    .title('Administrateur {{ entry.values.username }}')
    .fields([
        nga.field('username'),
        nga.field('password', 'password')
    ]);
    adminUser.creationView()
    .title('Nouvel Administrateur')
    .fields([
        nga.field('username'),
        nga.field('password', 'password')
    ])

    return adminUser;
}
