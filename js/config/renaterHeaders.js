export default function (nga, admin) {

    const renaterHeader = admin.getEntity('renaterHeaders').identifier(nga.field('_id'));

    renaterHeader.listView()
        .actions([])
        .title('Attributs Renater')
        .fields([
            nga.field('_id').isDetailLink(true),
            nga.field('displayname'),
            nga.field('mail'),
        ])
        .listActions(['show']);
    renaterHeader.showView()
    .title('Attribut Renater #{{ entry.values._id }}')
    .fields([
        nga.field('_id'),
        nga.field('displayname'),
        nga.field('mail'),
        nga.field('Attributs', 'json').map((v, e) => {
            return e.plain();
        })
    ]);

    return renaterHeader;
}
