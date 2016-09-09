export default function (nga, admin) {

    const unit = admin.getEntity('units').identifier(nga.field('id'));
    const community = admin.getEntity('communities');
    const institute = admin.getEntity('institutes');

    unit.listView()
    .actions(['export', 'filter', 'create', 'batch'])
    .title('Unités')
    .perPage(20)
    .fields([
        nga.field('unit.code').map((_, entry) => entry.code).isDetailLink(true),
        nga.field('unit.name').map((_, entry) => entry.name).label('Nom'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communauté')
    ])
    .filters([
        nga.field('match').label('Recherche globale').pinned(true),
        nga.field('like_unit.name').label('Nom'),
        nga.field('like_unit.code').label('Code'),
        nga.field('community.name', 'reference').targetEntity(community).targetField(nga.field('name')).label('Communauté'),
        nga.field('institute.id', 'reference')
        .targetEntity(institute)
        .targetField(nga.field('like_institute.name').map((_, entry) => entry.name))
        .remoteComplete(true)
        .label('Instituts(Nom)'),
        nga.field('institute.id', 'reference')
        .targetEntity(institute)
        .targetField(nga.field('like_institute.code').map((_, entry) => entry.code))
        .remoteComplete(true)
        .label('Instituts(Code)')
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
        nga.field('correspondant_informatique').label('Correspondant informatique'),
        nga.field('ci_phone').label('Tél correspondant informatique'),
        nga.field('ci_mail').label('Courriel correspondant informatique'),
        nga.field('comment').label('Commentaire'),
        nga.field('nb_unit_account').label('Nb compte unités'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')).label('Instituts'),
        nga.field('communities').label('Communauté')
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
        nga.field('correspondant_informatique').label('Correspondant informatique'),
        nga.field('ci_phone').label('Tél correspondant informatique'),
        nga.field('ci_mail').label('Courriel correspondant informatique'),
        nga.field('comment').label('Commentaire'),
        nga.field('nb_unit_account').label('Nb compte unités'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('code')).label('Instituts'),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name')).label('Communauté')
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
        nga.field('correspondant_informatique').label('Correspondant informatique'),
        nga.field('ci_phone').label('Tél correspondant informatique'),
        nga.field('ci_mail').label('Courriel correspondant informatique'),
        nga.field('comment').label('Commentaire'),
        nga.field('nb_unit_account').label('Nb compte unités'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')),
        nga.field('communities', 'reference_many').targetEntity(community).targetField(nga.field('name'))
    ]);

    return unit;
}
