export default function (nga, admin) {

    const unit = admin.getEntity('units').identifier(nga.field('id'));
    const community = admin.getEntity('communities');
    const institute = admin.getEntity('institutes');

    unit.listView()
    .actions(['filter', 'export', 'create', 'batch'])
    .title('Unités')
    .perPage(20)
    .fields([
        nga.field('unit.code').map((_, entry) => entry.code).isDetailLink(true),
        nga.field('unit.name').map((_, entry) => entry.name).label('Nom'),
        nga.field('main_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).label('Institut principal'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaires'),
        nga.field('nb_inist_account').label('Nb de comptes Inist'),
        nga.field('nb_janus_account').label('Nb de comptes Janus'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés')
    ])
    .filters([
        nga.field('match').label('Recherche globale').pinned(true),
        nga.field('like_unit.name').label('Nom'),
        nga.field('like_unit.code').label('Code'),
        nga.field('community.id', 'reference').targetEntity(community).targetField(nga.field('name')).label('Communautés'),
        nga.field('unit.main_institute', 'reference')
        .targetEntity(institute)
        .targetField(nga.field('like_institute.name').map((_, entry) => entry.name))
        .remoteComplete(true)
        .label('Institut principal'),
        nga.field('institute.id', 'reference')
        .targetEntity(institute)
        .targetField(nga.field('like_institute.name').map((_, entry) => entry.name))
        .remoteComplete(true)
        .label('Instituts secondaires')
    ])
    .sortField('name')
    .sortDir('DESC')
    .exportOptions({
        quotes: true,
        delimiter: ';',
        newline: '\r\n'
    })
    .exportFields([
        nga.field('code'),
        nga.field('name').label('Nom'),
        nga.field('body').label('Corps de rattachement'),
        nga.field('building').label('Bâtiment'),
        nga.field('street').label('rue'),
        nga.field('post_office_box').label('Boîte postal'),
        nga.field('postal_code').label('Code postal'),
        nga.field('town').label('Ville'),
        nga.field('country').label('Pays'),
        nga.field('unit_dr').label('Délégation regionale d\'appartenance'),
        nga.field('nb_researcher_cnrs').label('Nb chercheurs CNRS'),
        nga.field('nb_researcher_nocnrs').label('Nb chercheurs NON CNRS'),
        nga.field('nb_doctorant').label('Nb doctorant'),
        nga.field('nb_post_doctorant').label('Nb post-doctorant'),
        nga.field('director_name').label('Nom directeur'),
        nga.field('director_firstname').label('Prénom directeur'),
        nga.field('director_mail').label('Courriel directeur'),
        nga.field('correspondant_documentaire').label('Correspondant documentaire'),
        nga.field('cd_phone').label('Tél correspondant documentaire'),
        nga.field('cd_mail').label('Courriel correspondant documentaire'),
        nga.field('correspondant_informatique').label('Autre correspondant'),
        nga.field('ci_phone').label('Tél autre correspondant'),
        nga.field('ci_mail').label('Courriel autre correspondant'),
        nga.field('comment').label('Commentaire'),
        nga.field('nb_unit_account').label('Nb compte unités'),
        nga.field('main_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).label('Institut principal'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaires'),
        nga.field('communities').label('Communautés')
    ])
    .listActions(['edit', 'delete']);

    unit.editionView()
    .title('Unité {{ entry.values.name }}')
    .fields([
        nga.field('code'),
        nga.field('name').label('Nom'),
        nga.field('body').label('Corps de rattachement'),
        nga.field('building').label('Bâtiment'),
        nga.field('street').label('rue'),
        nga.field('post_office_box').label('Boîte postal'),
        nga.field('postal_code').label('Code postal'),
        nga.field('town').label('Ville'),
        nga.field('country').label('Pays'),
        nga.field('unit_dr').label('Délégation regionale d\'appartenance'),
        nga.field('nb_researcher_cnrs').label('Nb chercheurs CNRS'),
        nga.field('nb_researcher_nocnrs').label('Nb chercheurs NON CNRS'),
        nga.field('nb_doctorant').label('Nb doctorant'),
        nga.field('nb_post_doctorant').label('Nb post-doctorant'),
        nga.field('director_name').label('Nom directeur'),
        nga.field('director_firstname').label('Prénom directeur'),
        nga.field('director_mail').label('Courriel directeur'),
        nga.field('correspondant_documentaire').label('Correspondant documentaire'),
        nga.field('cd_phone').label('Tél correspondant documentaire'),
        nga.field('cd_mail').label('Courriel correspondant documentaire'),
        nga.field('correspondant_informatique').label('Autre correspondant'),
        nga.field('ci_phone').label('Tél autre correspondant'),
        nga.field('ci_mail').label('Courriel autre correspondant'),
        nga.field('comment').label('Commentaire'),
        nga.field('nb_unit_account').label('Nb compte unités'),
        nga.field('main_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).label('Institut principal'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts secondaires'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés')
    ]);

    unit.creationView()
    .title('Nouvel Unité')
    .fields([
        nga.field('code'),
        nga.field('name').label('Nom'),
        nga.field('body').label('Corps de rattachement'),
        nga.field('building').label('Bâtiment'),
        nga.field('street').label('rue'),
        nga.field('post_office_box').label('Boîte postal'),
        nga.field('postal_code').label('Code postal'),
        nga.field('town').label('Ville'),
        nga.field('country').label('Pays'),
        nga.field('unit_dr').label('Délégation regionale d\'appartenance'),
        nga.field('nb_researcher_cnrs').label('Nb chercheurs CNRS'),
        nga.field('nb_researcher_nocnrs').label('Nb chercheurs NON CNRS'),
        nga.field('nb_doctorant').label('Nb doctorant'),
        nga.field('nb_post_doctorant').label('Nb post-doctorant'),
        nga.field('director_name').label('Nom directeur'),
        nga.field('director_firstname').label('Prénom directeur'),
        nga.field('director_mail').label('Courriel directeur'),
        nga.field('correspondant_documentaire').label('Correspondant documentaire'),
        nga.field('cd_phone').label('Tél correspondant documentaire'),
        nga.field('cd_mail').label('Courriel correspondant documentaire'),
        nga.field('correspondant_informatique').label('Autre correspondant'),
        nga.field('ci_phone').label('Tél autre correspondant'),
        nga.field('ci_mail').label('Courriel autre correspondant'),
        nga.field('comment').label('Commentaire'),
        nga.field('nb_unit_account').label('Nb compte unités'),
        nga.field('main_institute', 'reference').targetEntity(institute).targetField(nga.field('name')).label('Institut principal'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts socondaires'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communautés')
    ]);

    return unit;
}
