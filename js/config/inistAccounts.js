export default function (nga, admin) {

    const inistAccount = admin.getEntity('inistAccounts').identifier(nga.field('id'));
    const domain = admin.getEntity('domains');
    const unit = admin.getEntity('units');
    const institute = admin.getEntity('institutes');

    inistAccount.listView()
        .actions(['export', 'filter', 'create'])
        .title('Compte INIST')
        .perPage(20)
        .fields([
            nga.field('inist_account.username').map((_, entry) => entry.username).isDetailLink(true).label('Login'),
            nga.field('inist_account.name').map((_, entry) => entry.name).isDetailLink(true).label('Nom'),
            nga.field('inist_account.firstname').map((_, entry) => entry.firstname).isDetailLink(true).label('Prénom'),
            nga.field('inist_account.mail').map((_, entry) => entry.mail).isDetailLink(true).label('courriel'),
            nga.field('inist_account.subscription_date', 'date').map((_, entry) => entry.subscription_date).label('Date d\'inscription'),
            nga.field('inist_account.expiration_date', 'date').map((_, entry) => entry.expiration_date).label('Date d\'expiration'),
            nga.field('domains', 'reference_many').targetEntity(domain).targetField(nga.field('name')).label('Domaines'),
            nga.field('all_domains', 'reference_many').targetEntity(domain).targetField(nga.field('name')).label('Tous les domaines'),
            nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts'),
            nga.field('units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités')
        ])
        .filters([
            nga.field('match').label('Recherche global').pinned(true),
            nga.field('inist_account.id', 'reference').targetEntity(inistAccount).targetField(nga.field('username')).remoteComplete(true).label('Login'),
            nga.field('like_inist_account.name').label('Nom'),
            nga.field('like_inist_account.firstname').label('Prénom'),
            nga.field('like_inist_account.mail').label('courriel'),
            nga.field('from_inist_account.subscription_date', 'date').label('Date d\'inscription aprés'),
            nga.field('to_inist_account.subscription_date', 'date').label('Date d\'inscription avant'),
            nga.field('from_inist_account.expiration_date', 'date').label('Date d\'expiration aprés'),
            nga.field('to_inist_account.expiration_date', 'date').label('Date d\'expiration avant'),
            nga.field('domain.name', 'reference').targetEntity(domain).targetField(nga.field('name')).label('Domaines'),
            nga.field('institute.id', 'reference')
            .targetEntity(institute)
            .targetField(nga.field('like_name').map((_, entry) => entry.name))
            .label('Instituts(Nom)'),
            nga.field('institute.id', 'reference')
            .targetEntity(institute)
            .targetField(nga.field('like_code').map((_, entry) => entry.code))
            .label('Instituts(Code)'),
            nga.field('unit.id', 'reference')
            .targetEntity(unit)
            .targetField(nga.field('like_name').map((_, entry) => entry.name))
            .remoteComplete(true)
            .label('Unités(Nom)'),
            nga.field('unit.id', 'reference')
            .targetEntity(unit)
            .targetField(nga.field('like_code').map((_, entry) => entry.code))
            .remoteComplete(true)
            .label('Unités(Code)')
        ])
        .exportFields([
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
            nga.field('domains').label('Domaines'),
            nga.field('all_domains').label('Tous les domaines'),
            nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts'),
            nga.field('units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités')
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
