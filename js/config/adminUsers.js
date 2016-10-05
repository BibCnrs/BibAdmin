export default function (nga, admin) {

    const adminUser = admin.getEntity('adminUsers')
    .identifier(nga.field('id'));

    adminUser.listView()
    .actions(['create', 'batch'])
    .title('Administrateurs')
    .perPage(20)
    .fields([
        nga.field('username').isDetailLink(true).label('Login'),
    ])
    .sortField('username')
    .sortDir('DESC')
    .listActions(['edit', 'delete']);

    adminUser.editionView()
    .title('Administrateur {{ entry.values.username }}')
    .fields([
        nga.field('username').label('Login'),
        nga.field('password', 'password').label('Mot de passe'),
        nga.field('comment', 'text').label('Commentaire')
    ]);

    adminUser.creationView()
    .title('Nouvel Administrateur')
    .fields([
        nga.field('username').label('Login'),
        nga.field('password', 'password').label('Mot de passe'),
        nga.field('comment', 'text').label('Commentaire')
    ]);

    return adminUser;
}
