export default function (nga, admin) {

    const user = admin.getEntity('users').identifier(nga.field('id'));
    const domain = admin.getEntity('domains');
    const unit = admin.getEntity('units');
    const institute = admin.getEntity('institutes');

    user.listView()
        .actions(['create'])
        .title('Utilisateurs')
        .perPage(20)
        .fields([
            nga.field('username').isDetailLink(true).label('Username'),
            nga.field('domains', 'choices').label('Domaines'),
            nga.field('all_domains', 'choices').label('Tous les domaines'),
            nga.field('primary_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).label('Institut principal'),
            nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
            nga.field('primary_unit', 'reference').targetEntity(unit).targetField(nga.field('name')).label('Unité principale'),
            nga.field('additional_units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités secondaires')
        ])
        .filters([
        ])
        .sortField('username')
        .sortDir('DESC')
        .listActions(['edit']);
    user.editionView()
    .title('Utilisateur {{ entry.values.username }}')
    .fields([
        nga.field('username').label('Username'),
        nga.field('password', 'password'),
        nga.field('domains', 'reference_many').targetEntity(domain).targetField(nga.field('name')).label('Domaines'),
        nga.field('primary_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).editable(false).label('Institut principal'),
        nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
        nga.field('primary_unit', 'reference').targetEntity(unit).targetField(nga.field('name')).editable(false).label('Unité principale'),
        nga.field('additional_units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités secondaires')
    ]);
    user.creationView()
    .title('Nouvel utilisateur')
    .fields([
        nga.field('username').label('Username'),
        nga.field('password', 'password'),,
        nga.field('domains', 'reference_many').targetEntity(admin.getEntity('domains')).targetField(nga.field('name')).label('Domaines'),
        nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
        nga.field('additional_units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités secondaires')
    ])

    return user;
}
