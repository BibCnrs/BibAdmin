export default function (nga, admin) {

    const community = admin.getEntity('communities').identifier(nga.field('id'));
    community.listView()
    .actions(['filter', 'create', 'batch'])
    .title('Communautés de droit')
    .perPage(20)
    .fields([
        nga.field('name').isDetailLink(true).label('Nom'),
        nga.field('gate').label('Portail ezproxy'),
        nga.field('user_id'),
        nga.field('profile'),
        nga.field('ebsco', 'boolean')
    ])
    .filters([
        nga.field('match').label('Recherche globale').pinned(true)
    ])
    .sortField('username')
    .sortDir('DESC')
    .listActions(['edit', 'delete']);

    community.editionView()
    .title('Communauté de droit {{ entry.values.name }}')
    .fields([
        nga.field('name').label('Nom'),
        nga.field('gate').label('Portail ezproxy'),
        nga.field('user_id'),
        nga.field('password', 'password'),
        nga.field('profile'),
        nga.field('ebsco', 'boolean').validation({
            required: true,
        })
    ]);

    community.creationView()
    .title('Nouvelle communauté de droit')
    .fields([
        nga.field('name').label('Nom'),
        nga.field('gate').label('Portail ezproxy'),
        nga.field('user_id'),
        nga.field('password', 'password'),
        nga.field('profile'),
        nga.field('ebsco', 'boolean').validation({
            required: true,
        })
    ]);

    return community;
}
