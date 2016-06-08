
export default function (nga, admin) {

    const adminUser = admin.getEntity('adminUsers')
    .identifier(nga.field('id'));

    adminUser.listView()
        .actions(['create'])
        .title('Administrateurs')
        .perPage(20)
        .fields([
            nga.field('username').isDetailLink(true).label('Login'),
        ])
        .sortField('username')
        .sortDir('DESC')
        .listActions(['edit']);
    adminUser.editionView()
    .title('Administrateur {{ entry.values.username }}')
    .fields([
        nga.field('username').label('Login'),
        nga.field('password', 'password').label('Mot de passe')
    ]);
    adminUser.creationView()
    .title('Nouvel Administrateur')
    .fields([
        nga.field('username').label('Login'),
        nga.field('password', 'password').label('Mot de passe')
    ])

    return adminUser;
}
