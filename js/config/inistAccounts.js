export default function (nga, admin) {

    const inistAccount = admin.getEntity('inistAccounts').identifier(nga.field('id'));
    const domain = admin.getEntity('domains');
    const unit = admin.getEntity('units');
    const institute = admin.getEntity('institutes');

    inistAccount.listView()
        .actions(['create'])
        .title('Compte INIST')
        .perPage(20)
        .fields([
            nga.field('username').isDetailLink(true).label('Login'),
            nga.field('domains', 'choices').label('Domaines'),
            nga.field('all_domains', 'choices').label('Tous les domaines'),
            nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
            nga.field('units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités')
        ])
        .filters([
        ])
        .sortField('username')
        .sortDir('DESC')
        .listActions(['edit']);

    inistAccount.editionView()
    .title('Compte INIST {{ entry.values.username }}')
    .fields([
        nga.field('username').label('Login'),
        nga.field('password', 'password'),
        nga.field('name'),
        nga.field('firstname'),
        nga.field('mail'),
        nga.field('phone'),
        nga.field('dr'),
        nga.field('subscription_date', 'date').label('Date d\'inscription'),
        nga.field('expiration_date', 'date').label('Date d\'expiration'),
        nga.field('domains', 'reference_many').targetEntity(domain).targetField(nga.field('name')).label('Domaines'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts'),
        nga.field('units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités')
    ]);

    inistAccount.creationView()
    .title('Nouveau compte INIST')
    .fields([
        nga.field('username').label('Login'),
        nga.field('password', 'password'),,
        nga.field('domains', 'reference_many').targetEntity(admin.getEntity('domains')).targetField(nga.field('name')).label('Domaines'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts'),
        nga.field('units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités')
    ])

    return inistAccount;
}
