export default function (nga, admin) {

    const user = admin.getEntity('users').identifier(nga.field('username'));
    const domain = admin.getEntity('domains');
    const institute = admin.getEntity('institutes');

    user.listView()
        .actions(['create'])
        .title('Utilisateurs')
        .fields([
            nga.field('username').isDetailLink(true),
            nga.field('domains', 'choices'),
            nga.field('institute')
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
        nga.field('domains', 'reference_many').targetEntity(domain).targetField(nga.field('name')),
        nga.field('institute', 'reference').targetEntity(institute).targetField(nga.field('name'))
    ]);
    user.creationView()
    .title('Nouvel utilisateur')
    .fields([
        nga.field('username'),
        nga.field('password', 'password'),,
        nga.field('domains', 'reference_many').targetEntity(admin.getEntity('domains')).targetField(nga.field('name')),
        nga.field('institute', 'reference').targetEntity(institute).targetField(nga.field('name'))
    ])

    return user;
}
