
export default function (nga, admin) {

    const user = admin.getEntity('users').identifier(nga.field('username'));
    const domain = admin.getEntity('domains');

    user.listView()
        .actions(['create'])
        .title('Utilisateurs')
        .fields([
            nga.field('username').isDetailLink(true),
            nga.field('domains', 'choices')
        ])
        .filters([
        ])
        .sortField('username')
        .sortDir('DESC')
        .listActions(['edit']);
    user.editionView()
    .title('Utilisateur {{ entry.values.username }}')
    .fields([
        nga.field('username'),
        nga.field('password', 'password'),
        nga.field('domains', 'reference_many').targetEntity(domain).targetField(nga.field('name'))
    ]);
    user.creationView()
    .title('Nouvel utilisateur')
    .fields([
        nga.field('username'),
        nga.field('password', 'password'),,
        nga.field('domains', 'reference_many').targetEntity(admin.getEntity('domains')).targetField(nga.field('name'))
    ])

    return user;
}
