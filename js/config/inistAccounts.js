export default function (nga, admin) {

    const inistAccount = admin.getEntity('inistAccounts').identifier(nga.field('id'));
    const community = admin.getEntity('communities');
    const unit = admin.getEntity('units');
    const institute = admin.getEntity('institutes');

    inistAccount.listView()
    .actions(['filter', 'export', 'create', 'batch'])
    .title('Compte INIST')
    .perPage(20)
    .fields([
        nga.field('inist_account.username').map((_, entry) => entry.username).isDetailLink(true).label('Login'),
        nga.field('inist_account.password').map((_, entry) => entry.password).isDetailLink(true).label('Password'),
        nga.field('inist_account.name').map((_, entry) => entry.name).isDetailLink(true).label('Nom'),
        nga.field('inist_account.firstname').map((_, entry) => entry.firstname).isDetailLink(true).label('Prénom'),
        nga.field('inist_account.mail').map((_, entry) => entry.mail).isDetailLink(true).label('courriel'),
        nga.field('main_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).label('Institut Principal'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
        nga.field('main_unit', 'reference').targetEntity(unit).targetField(nga.field('code')).label('Unité Principale'),
        nga.field('units', 'reference_many').targetEntity(unit).targetField(nga.field('code')).label('Unités secondaires'),
        nga.field('all_communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés'),
        nga.field('inist_account.subscription_date', 'date').map((_, entry) => entry.subscription_date).label('Date d\'inscription'),
        nga.field('inist_account.expiration_date', 'date').map((_, entry) => entry.expiration_date).label('Date d\'expiration'),
        nga.field('active', 'boolean').label('Active'),
    ])
    .filters([
        nga.field('match').label('Recherche globale').pinned(true),
        nga.field('like_inist_account.name').label('Nom'),
        nga.field('like_inist_account.firstname').label('Prénom'),
        nga.field('like_inist_account.username').label('Login'),
        nga.field('like_inist_account.mail').label('Courriel'),
        nga.field('from_inist_account.subscription_date', 'date').label('Date d\'inscription aprés'),
        nga.field('to_inist_account.subscription_date', 'date').label('Date d\'inscription avant'),
        nga.field('from_inist_account.expiration_date', 'date').label('Date d\'expiration aprés'),
        nga.field('to_inist_account.expiration_date', 'date').label('Date d\'expiration avant'),
        nga.field('community.id', 'reference')
        .targetEntity(community)
        .targetField(nga.field('name'))
        .remoteComplete(true)
        .label('Communautés'),
        nga.field('main_institute.id', 'reference')
        .label('Institut principal')
        .targetEntity(institute)
        .targetField(nga.field('like_institute.name').map((_, entry) => entry.name))
        .remoteComplete(true),
        nga.field('institutes.id', 'reference')
        .label('Instituts Secondaires')
        .targetEntity(institute)
        .targetField(nga.field('like_institute.name').map((_, entry) => entry.name))
        .remoteComplete(true),
        nga.field('main_unit.id', 'reference')
        .label('Unité principale')
        .targetEntity(unit)
        .targetField(nga.field('like_unit.code').map((_, entry) => entry.code))
        .remoteComplete(true),
        nga.field('units.id', 'reference')
        .label('Unités secondaires')
        .targetEntity(unit)
        .targetField(nga.field('like_unit.code').map((_, entry) => entry.code))
        .remoteComplete(true),
        nga.field('active', 'boolean').label('Active'),
    ])
    .exportOptions({
        quotes: false,
        delimiter: ';',
        newline: /\r?\n/
    })
    .exportFields([
        nga.field('username').label('Login'),
        nga.field('password').label('Mot de passe'),
        nga.field('name').label('Nom'),
        nga.field('firstname').label('Prénom'),
        nga.field('mail'),
        nga.field('phone').label('Tél'),
        nga.field('dr'),
        nga.field('main_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).label('Institut Principal'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
        nga.field('main_unit', 'reference').targetEntity(unit).targetField(nga.field('code')).label('Unité Principale'),
        nga.field('units', 'reference_many').targetEntity(unit).targetField(nga.field('code')).label('Unités secondaires'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés propres'),
        nga.field('all_communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés'),
        nga.field('subscription_date', 'date').label('Date d\'inscription'),
        nga.field('expiration_date', 'date').label('Date d\'expiration'),
        nga.field('comment').label('Commentaire'),
        nga.field('active', 'boolean').label('Active'),
    ])
    .sortField('username')
    .sortDir('DESC')
    .listActions(['edit', 'delete']);

    inistAccount.editionView()
    .title('Compte INIST {{ entry.values.username }}')
    .fields([
        nga.field('username').label('Login'),
        nga.field('password', 'template').template('<bib-password></bib-password>'),
        nga.field('name'),
        nga.field('firstname'),
        nga.field('mail'),
        nga.field('phone'),
        nga.field('dr'),
        nga.field('main_institute', 'reference')
        .remoteComplete(true)
        .targetEntity(institute)
        .targetField(nga.field('name'))
        .label('Institut principal'),
        nga.field('institutes', 'reference_many')
        .targetEntity(institute)
        .targetField(nga.field('name'))
        .label('Instituts secondaires'),
        nga.field('main_unit', 'reference')
        .targetEntity(unit)
        .targetField(nga.field('like_unit.code').map((_, entry) => entry.code))
        .remoteComplete(true)
        .label('Unité principale'),
        nga.field('units', 'reference_many')
        .targetEntity(unit)
        .targetField(nga.field('like_unit.code').map((_, entry) => entry.code))
        .remoteComplete(true)
        .label('Unités secondaires'),
        nga.field('communities', 'reference_many')
        .targetEntity(community)
        .targetField(nga.field('name'))
        .label('Communautés propres'),
        nga.field('all_communities', 'reference_many')
        .targetEntity(community)
        .targetField(nga.field('name'))
        .editable(false)
        .label('Toutes les communautés'),
        nga.field('subscription_date', 'date').label('Date d\'inscription'),
        nga.field('expiration_date', 'date').label('Date d\'expiration'),
        nga.field('comment', 'text').label('Commentaire'),
        nga.field('active', 'boolean').validation({
            required: true,
        }).label('Active'),
    ]);

    inistAccount.creationView()
    .title('Nouveau compte INIST')
    .fields([
        nga.field('username').label('Login'),
        nga.field('password', 'template').template('<bib-password></bib-password>'),
        nga.field('name'),
        nga.field('firstname'),
        nga.field('mail'),
        nga.field('phone'),
        nga.field('dr'),
        nga.field('main_institute', 'reference')
        .targetEntity(institute)
        .targetField(nga.field('name'))
        .remoteComplete(true)
        .label('Institut principal'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaires'),
        nga.field('main_unit', 'reference')
        .targetEntity(unit)
        .targetField(nga.field('like_unit.code').map((_, entry) => entry.code))
        .remoteComplete(true)
        .label('Unité principale'),
        nga.field('units', 'reference_many')
        .targetEntity(unit)
        .targetField(nga.field('like_unit.code').map((_, entry) => entry.code))
        .remoteComplete(true)
        .label('Unités secondaires'),
        nga.field('communities', 'reference_many').targetEntity(admin.getEntity('communities')).targetField(nga.field('name')).label('Communautés'),
        nga.field('subscription_date', 'date').label('Date d\'inscription'),
        nga.field('expiration_date', 'date').label('Date d\'expiration'),
        nga.field('comment', 'text').label('Commentaire')
    ]);

    return inistAccount;
}
