export default function (nga, admin) {

    const janusAccount = admin.getEntity('janusAccounts').identifier(nga.field('id'));
    const domain = admin.getEntity('domains');
    const unit = admin.getEntity('units');
    const institute = admin.getEntity('institutes');

    janusAccount.listView()
        .actions(['export', 'filter', 'create'])
        .title('Comptes JANUS')
        .perPage(20)
        .fields([
            nga.field('janus_account.username').map((_, entry) => entry.username).isDetailLink(true).label('Username'),
            nga.field('domains', 'reference_many').targetEntity(domain).targetField(nga.field('name')).label('Domaines'),
            nga.field('all_domains', 'reference_many').targetEntity(domain).targetField(nga.field('name')).label('Tous les domaines'),
            nga.field('primary_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).label('Institut principal'),
            nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
            nga.field('primary_unit', 'reference').targetEntity(unit).targetField(nga.field('name')).label('Unité principale'),
            nga.field('additional_units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités secondaires')
        ])
        .filters([
            nga.field('match').label('Recherche global').pinned(true),
            nga.field('like_janus_account.username').label('Login'),
            nga.field('domain.name', 'reference')
            .targetEntity(domain)
            .targetField(nga.field('name'))
            .remoteComplete(true)
            .label('Domaines'),
            nga.field('janus_account.primary_institute', 'reference')
            .targetEntity(institute)
            .targetField(nga.field('like_name').map((_, entry) => entry.name))
            .remoteComplete(true)
            .label('Institut principal'),
            nga.field('janus_account.primary_unit', 'reference')
            .targetEntity(unit)
            .targetField(nga.field('like_name').map((_, entry) => entry.name))
            .remoteComplete(true)
            .label('Unité principale'),
            nga.field('unit.id', 'reference')
            .targetEntity(unit)
            .targetField(nga.field('like_name').map((_, entry) => entry.name))
            .remoteComplete(true)
            .label('Unité(Nom)'),
            nga.field('unit.id', 'reference')
            .targetEntity(unit)
            .targetField(nga.field('like_code').map((_, entry) => entry.code))
            .remoteComplete(true)
            .label('Unité(Code)'),
            nga.field('institute.id', 'reference')
            .targetEntity(institute)
            .targetField(nga.field('like_name').map((_, entry) => entry.name))
            .remoteComplete(true)
            .label('Institut(Nom)'),
            nga.field('institute.id', 'reference')
            .targetEntity(institute)
            .targetField(nga.field('like_code').map((_, entry) => entry.code))
            .remoteComplete(true)
            .label('Institut(Code)')
        ])
        .sortField('username')
        .sortDir('DESC')
        .exportFields([
            janusAccount.listView().fields()
        ])
        .listActions(['edit']);
    janusAccount.editionView()
    .title('Compte JANUS {{ entry.values.username }}')
    .fields([
        nga.field('username').label('Username'),
        nga.field('domains', 'reference_many').targetEntity(domain).targetField(nga.field('name')).label('Domaines'),
        nga.field('primary_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).editable(false).label('Institut principal'),
        nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
        nga.field('primary_unit', 'reference').targetEntity(unit).targetField(nga.field('name')).editable(false).label('Unité principale'),
        nga.field('additional_units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités secondaires')
    ]);
    janusAccount.creationView()
    .title('Compte JANUS')
    .fields([
        nga.field('username').label('Username'),
        nga.field('domains', 'reference_many').targetEntity(admin.getEntity('domains')).targetField(nga.field('name')).label('Domaines'),
        nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
        nga.field('additional_units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités secondaires')
    ])

    return janusAccount;
}
