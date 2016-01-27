
export default function (nga, admin) {

    const user = admin.getEntity('users').identifier(nga.field('username'));;
    user.listView()
        .actions(['create'])
        .title('Utilisateurs')
        .fields([
            nga.field('username'),
            nga.field('domains', 'choices')
        ])
        .filters([
        ])
        .sortField('username')
        .sortDir('DESC')
        .listActions(['edit']);
    user.editionView()
    .title('Utilisateurs')
    .fields([
        nga.field('username'),
        nga.field('domains', 'choices').choices(['vie', 'shs'].map(d => ({ label: d, value: d })))
    ]);
    user.creationView()
    .title('Utilisateurs')
    .fields([
        nga.field('username'),
        nga.field('password', 'password'),
        nga.field('domains', 'choices').choices(['vie', 'shs'].map(d => ({ label: d, value: d })))
    ])

    return user;
}
