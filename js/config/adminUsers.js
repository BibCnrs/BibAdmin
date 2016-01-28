
export default function (nga, admin) {

    const adminUser = admin.getEntity('adminUsers').identifier(nga.field('username'));;
    adminUser.listView()
        .actions(['create'])
        .title('Administrateurs')
        .fields([
            nga.field('username'),
        ])
        .filters([
        ])
        .sortField('username')
        .sortDir('DESC')
        .listActions(['edit']);
    adminUser.editionView()
    .title('Utilisateurs')
    .fields([
        nga.field('username'),
    ]);
    adminUser.creationView()
    .title('Utilisateurs')
    .fields([
        nga.field('username'),
        nga.field('password', 'password')
    ])

    return adminUser;
}
