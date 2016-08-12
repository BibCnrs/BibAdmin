
export default function (nga, admin) {

    const domain = admin.getEntity('domains').identifier(nga.field('name'));
    domain.listView()
        .actions(['filter', 'create', 'batch'])
        .title('Communautés de droit')
        .perPage(20)
        .fields([
            nga.field('name').isDetailLink(true).label('Nom'),
            nga.field('gate').label('Portail ezproxy'),
            nga.field('user_id'),
            nga.field('profile')
        ])
        .filters([
            nga.field('match').label('Recherche global').pinned(true)
        ])
        .sortField('username')
        .sortDir('DESC')
        .listActions(['edit']);
    domain.editionView()
    .title('Communauté de droit {{ entry.values.name }}')
    .fields([
        nga.field('name').label('Nom'),
        nga.field('gate').label('Portail ezproxy'),
        nga.field('user_id'),
        nga.field('password', 'password'),
        nga.field('profile')
    ]);
    domain.creationView()
    .title('Nouvelle communauté de droit')
    .fields([
        nga.field('name').label('Nom'),
        nga.field('gate').label('Portail ezproxy'),
        nga.field('user_id'),
        nga.field('password', 'password'),
        nga.field('profile')
    ])

    return domain;
}
