export default function (nga, admin) {

    const janusAccount = admin.getEntity('janusAccounts').identifier(nga.field('id'));
    const community = admin.getEntity('communities');
    const unit = admin.getEntity('units');
    const institute = admin.getEntity('institutes');

    janusAccount.editionView()
    .title('Compte JANUS {{ entry.values.uid }}')
    .fields([
        nga.field('uid').editable(false).label('Uid'),
        nga.field('name').editable(false).label('Name'),
        nga.field('firstname').editable(false).label('First Name'),
        nga.field('mail').editable(false).label('Mail'),
        nga.field('janus_account.comment', 'text').label('Comment'),
        nga.field('last_connexion', 'date').format('dd/MM/yyyy').editable(false).label('Last Connexion'),
        nga.field('cnrs', 'boolean').editable(false).label('CNRS'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés'),
        nga.field('primary_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).editable(false).label('Institut Janus'),
        nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
        nga.field('primary_unit', 'reference').targetEntity(unit).targetField(nga.field('name')).editable(false).label('Unité Janus'),
        nga.field('additional_units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités secondaires')
    ]);

    janusAccount.listView()
    .actions(['export', 'filter', 'batch'])
    .title('Comptes JANUS')
    .perPage(20)
    .fields([
        nga.field('uid').isDetailLink(true).label('Uid'),
        nga.field('mail').isDetailLink(true).label('Mail'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés'),
        nga.field('all_communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés hérités'),
        nga.field('primary_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).label('Institut Janus'),
        nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
        nga.field('primary_unit', 'reference').targetEntity(unit).targetField(nga.field('name')).label('Unité Janus'),
        nga.field('additional_units', 'reference_many').targetEntity(unit).targetField(nga.field('name')).label('Unités secondaires')
    ])
    .filters([
        nga.field('match').label('Recherche globale').pinned(true),
        nga.field('like_janus_account.uid').label('Uid'),
        nga.field('like_janus_account.mail').label('Mail'),
        nga.field('janus_account.cnrs', 'boolean').label('Cnrs'),
        nga.field('community.name', 'reference')
        .targetEntity(community)
        .targetField(nga.field('name'))
        .remoteComplete(true)
        .label('Communautés'),
        nga.field('janus_account.primary_institute', 'reference')
        .targetEntity(institute)
        .targetField(nga.field('like_name').map((_, entry) => entry.name))
        .remoteComplete(true)
        .label('Institut Janus'),
        nga.field('janus_account.primary_unit', 'reference')
        .targetEntity(unit)
        .targetField(nga.field('like_name').map((_, entry) => entry.name))
        .remoteComplete(true)
        .label('Unité Janus'),
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
    .sortField('uid')
    .sortDir('DESC')
    .exportOptions({
        quotes: true,
        delimiter: ';',
        newline: '\r\n'
    })
    .exportFields([
        janusAccount.editionView().fields()
    ])
    .listActions(['edit', 'delete']);

    return janusAccount;
}
