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
        nga.field('cnrs', 'boolean').editable(false).label('CNRS'),
        nga.field('primary_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).editable(false).label('Institut Janus'),
        nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
        nga.field('primary_unit', 'reference').targetEntity(unit).targetField(nga.field('code')).editable(false).label('Unité Janus'),
        nga.field('additional_units', 'reference_many')
        .targetEntity(unit)
        .targetField(nga.field('like_unit.code').map((_, entry) => entry.code))
        .remoteComplete(true)
        .label('Unités secondaires'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés propres'),
        nga.field('all_communities', 'reference_many').editable(false).targetEntity(community).targetField(nga.field('name')).label('Toutes les communautés'),
        nga.field('last_connexion', 'date').format('dd/MM/yyyy').editable(false).label('Last Connexion'),
        nga.field('janus_account.comment', 'text').label('Comment')
    ]);

    janusAccount.listView()
    .actions(['filter', 'export' , 'batch'])
    .title('Comptes JANUS')
    .perPage(20)
    .fields([
        nga.field('janus_account.uid').map((_, entry) => entry.uid).isDetailLink(true).label('Uid'),
        nga.field('janus_account.mail').map((_, entry) => entry.mail).isDetailLink(true).label('Mail'),
        nga.field('primary_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).label('Institut Janus'),
        nga.field('additional_institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaire'),
        nga.field('primary_unit', 'reference').targetEntity(unit).targetField(nga.field('code')).label('Unité Janus'),
        nga.field('additional_units', 'reference_many').targetEntity(unit).targetField(nga.field('code')).label('Unités secondaires'),
        nga.field('all_communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Toutes les communautés'),
        nga.field('janus_account.last_connexion', 'date').map((_, entry) => entry.last_connexion).format('dd/MM/yyyy').label('Last Connexion'),
    ])
    .filters([
        nga.field('match').label('Recherche globale').pinned(true),
        nga.field('like_janus_account.uid').label('Uid'),
        nga.field('like_janus_account.mail').label('Mail'),
        nga.field('janus_account.cnrs', 'boolean').label('Cnrs'),
        nga.field('from_janus_account.last_connexion', 'date').label('Derniére connection aprés'),
        nga.field('to_janus_account.last_connexion', 'date').label('Derniére connection avant'),
        nga.field('community.id', 'reference')
        .label('Communautés')
        .targetEntity(community)
        .targetField(nga.field('name'))
        .remoteComplete(true),
        nga.field('janus_account.primary_institute', 'reference')
        .label('Institut Janus')
        .targetEntity(institute)
        .targetField(nga.field('like_institute.name').map((_, entry) => entry.name))
        .remoteComplete(true),
        nga.field('institutes.id', 'reference')
        .label('Instituts secondaires')
        .targetEntity(institute)
        .targetField(nga.field('like_name').map((_, entry) => entry.name))
        .remoteComplete(true),
        nga.field('janus_account.primary_unit', 'reference')
        .label('Unité Janus')
        .targetEntity(unit)
        .targetField(nga.field('like_unit.code').map((_, entry) => entry.code))
        .remoteComplete(true),
        nga.field('units.id', 'reference')
        .label('Unités secondaires')
        .targetEntity(unit)
        .targetField(nga.field('like_unit.code').map((_, entry) => entry.code))
        .remoteComplete(true),
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
