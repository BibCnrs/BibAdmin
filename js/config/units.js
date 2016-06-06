export default function (nga, admin) {

    const unit = admin.getEntity('units').identifier(nga.field('id'));
    const domain = admin.getEntity('domains');
    const institute = admin.getEntity('institutes');

    unit.listView()
        .actions(['create'])
        .title('Unités')
        .perPage(20)
        .fields([
            nga.field('code').isDetailLink(true),
            nga.field('name'),
            nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')),
            nga.field('domains', 'choices')
        ])
        .filters([
        ])
        .sortField('name')
        .sortDir('DESC')
        .listActions(['edit']);

    unit.editionView()
    .title('Unité {{ entry.values.name }}')
    .fields([
        nga.field('code'),
        nga.field('name'),
        nga.field('body'),
        nga.field('building'),
        nga.field('street'),
        nga.field('post_office_box'),
        nga.field('postal_code'),
        nga.field('town'),
        nga.field('country'),
        nga.field('unit_dr'),
        nga.field('nb_researcher_cnrs'),
        nga.field('nb_researcher_nocnrs'),
        nga.field('nb_doctorant'),
        nga.field('nb_post_doctorant'),
        nga.field('director_name'),
        nga.field('director_firstname'),
        nga.field('director_mail'),
        nga.field('correspondant_documentaire'),
        nga.field('cd_phone'),
        nga.field('cd_mail'),
        nga.field('correspondant_informatique'),
        nga.field('ci_phone'),
        nga.field('ci_mail'),
        nga.field('comment'),
        nga.field('nb_unit_account'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')),
        nga.field('domains', 'reference_many').targetEntity(domain).targetField(nga.field('name'))
    ]);

    unit.creationView()
    .title('Nouvel Unité')
    .fields([
        nga.field('code'),
        nga.field('name'),
        nga.field('body'),
        nga.field('building'),
        nga.field('street'),
        nga.field('post_office_box'),
        nga.field('postal_code'),
        nga.field('town'),
        nga.field('country'),
        nga.field('unit_dr'),
        nga.field('nb_researcher_cnrs'),
        nga.field('nb_researcher_nocnrs'),
        nga.field('nb_doctorant'),
        nga.field('nb_post_doctorant'),
        nga.field('director_name'),
        nga.field('director_firstname'),
        nga.field('director_mail'),
        nga.field('correspondant_documentaire'),
        nga.field('cd_phone'),
        nga.field('cd_mail'),
        nga.field('correspondant_informatique'),
        nga.field('ci_phone'),
        nga.field('ci_mail'),
        nga.field('comment'),
        nga.field('nb_unit_account'),
        nga.field('institutes', 'reference_many').targetEntity(institute).targetField(nga.field('name')),
        nga.field('domains', 'reference_many').targetEntity(domain).targetField(nga.field('name'))
    ])

    return unit;
}
