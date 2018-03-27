export default function (nga, admin) {
    const revue = admin.getEntity('revues')
        .identifier(nga.field('id'));
    const community = admin.getEntity('communities');

    revue.listView()
    .actions(['filter', 'export', 'create', 'batch'])
    .title('Ressources favorites')
    .perPage(20)
    .fields([
        nga.field('revue.title')
            .map((_, entry) => entry.title)
            .isDetailLink(true)
            .label('Title'),
        nga.field('communities', 'reference_many')
            .targetEntity(community)
            .targetField(nga.field('name'))
            .label('Communautés')
    ])
    .filters([
        nga.field('match').label('Recherche globale').pinned(true),
        nga.field('like_revue.title').label('Titre'),
        nga.field('community_id', 'reference')
            .label('Communautés')
            .targetEntity(community)
            .targetField(nga.field('name'))
            .remoteComplete(true),
    ])
    .sortField('revue.title')
    .sortDir('ASC')
    .exportOptions({
        quotes: true,
        delimiter: ';',
        newline: /\r?\n/
    })
    .exportFields([
        nga.field('title').label('Title'),
        nga.field('url', 'string').label('URL'),
        nga.field('domains')
            .label('Communautés')
    ])
    .listActions(['edit', 'delete']);

    revue.editionView()
    .title('Ressource favorite : {{ entry.values.title }}')
    .fields([
        nga.field('title').label('Title'),
        nga.field('url', 'string').label('URL'),
        nga.field('communities', 'reference_many')
            .template('<bib-revue-links></bib-revue-links>')
            .targetEntity(community)
            .targetField(nga.field('name'))
            .validation({
                required: true,
            })
            .label('Communautés'),
    ]);

    revue.creationView()
    .title('Nouvelle Ressource favorite')
    .fields([
        nga.field('title').label('Title'),
        nga.field('url', 'string').label('URL'),
        nga.field('communities', 'reference_many')
            .targetEntity(community)
            .targetField(nga.field('name'))
            .validation({
                required: true,
            })
            .label('Communautés')
    ]);

    return revue;
}
