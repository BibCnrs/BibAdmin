export default function (nga, admin) {

    const user = admin.getEntity('users').identifier(nga.field('id'));
    const domain = admin.getEntity('domains');
    const unit = admin.getEntity('units');
    const institute = admin.getEntity('institutes');

    user.listView()
        .actions(['create'])
        .title('Utilisateurs')
        .fields([
            nga.field('username').isDetailLink(true),
            nga.field('domains', 'choices'),
            nga.field('all_domains', 'choices'),
            nga.field('primary_institute', 'reference').targetEntity(institute).targetField(nga.field('name')),
            nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')),
            nga.field('primary_unit', 'reference').targetEntity(unit).targetField(nga.field('name')),
            nga.field('additional_units', 'reference_many').targetEntity(unit).targetField(nga.field('name'))
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
        nga.field('primary_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).editable(false),
        nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')),
        nga.field('primary_unit', 'reference').targetEntity(unit).targetField(nga.field('name')).editable(false),
        nga.field('additional_units', 'reference_many').targetEntity(unit).targetField(nga.field('name'))
    ]);
    user.creationView()
    .title('Nouvel utilisateur')
    .fields([
        nga.field('username'),
        nga.field('password', 'password'),,
        nga.field('domains', 'reference_many').targetEntity(admin.getEntity('domains')).targetField(nga.field('name')),
        nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')),
        nga.field('additional_units', 'reference_many').targetEntity(unit).targetField(nga.field('name'))
    ])

    return user;
}
