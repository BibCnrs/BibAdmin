export default function (nga, admin) {

    const inistAccount = admin.getEntity('inistAccounts').identifier(nga.field('id'));
    const domain = admin.getEntity('domains');
    const unit = admin.getEntity('units');
    const institute = admin.getEntity('institutes');

    inistAccount.listView()
        .actions(['filter', 'create'])
        .title('Compte INIST')
        .perPage(20)
        .fields([
            nga.field('username').isDetailLink(true).label('Login'),
            nga.field('name').isDetailLink(true).label('Nom'),
            nga.field('firstname').isDetailLink(true).label('Prénom'),
            nga.field('mail').isDetailLink(true).label('courriel'),
            nga.field('subscription_date', 'date').label('Date d\'inscription'),
            nga.field('expiration_date', 'date').label('Date d\'expiration'),
            nga.field('domains', 'choices').label('Domaines'),
            nga.field('all_domains', 'choices').label('Tous les domaines'),
            nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
            nga.field('units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités')
        ])
        .filters([
            nga.field('match').label('Recherche global').pinned(true),
            nga.field('like_username').label('Login'),
            nga.field('like_name').label('Nom'),
            nga.field('like_firstname').label('Prénom'),
            nga.field('like_mail').label('courriel'),
            nga.field('from_subscription_date', 'date').label('Date d\'inscription aprés'),
            nga.field('to_subscription_date', 'date').label('Date d\'inscription avant'),
            nga.field('from_expiration_date', 'date').label('Date d\'expiration aprés'),
            nga.field('to_expiration_date', 'date').label('Date d\'expiration avant')
        ])
        .sortField('username')
        .sortDir('DESC')
        .listActions(['edit']);

    inistAccount.editionView()
    .title('Compte INIST {{ entry.values.username }}')
    .fields([
        nga.field('username').label('Login'),
        nga.field('password'),
        nga.field('name'),
        nga.field('firstname'),
        nga.field('mail'),
        nga.field('phone'),
        nga.field('dr'),
        nga.field('comment').label('Commentaire'),
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
        nga.field('password'),
        nga.field('name'),
        nga.field('firstname'),
        nga.field('mail'),
        nga.field('phone'),
        nga.field('dr'),
        nga.field('comment').label('Commentaire'),
        nga.field('subscription_date', 'date').label('Date d\'inscription'),
        nga.field('expiration_date', 'date').label('Date d\'expiration'),
        nga.field('domains', 'reference_many').targetEntity(admin.getEntity('domains')).targetField(nga.field('name')).label('Domaines'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts'),
        nga.field('units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités')
    ])

    return inistAccount;
}
