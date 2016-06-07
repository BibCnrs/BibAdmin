
export default function (nga, admin) {

    const domain = admin.getEntity('domains').identifier(nga.field('name'));
    domain.listView()
        .actions(['create'])
        .title('Domaines')
        .perPage(20)
        .fields([
            nga.field('name').isDetailLink(true).label('Nom'),
            nga.field('gate').label('Portail ezproxy'),
            nga.field('user_id'),
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
        nga.field('name').label('Nom'),
        nga.field('gate').label('Portail ezproxy'),
        nga.field('user_id'),
        nga.field('password', 'password'),
        nga.field('profile')
    ]);
    domain.creationView()
    .title('Nouveau domaine')
    .fields([
        nga.field('name').label('Nom'),
        nga.field('gate').label('Portail ezproxy'),
        nga.field('user_id'),
        nga.field('password', 'password'),
        nga.field('profile')
    ])

    return domain;
}
