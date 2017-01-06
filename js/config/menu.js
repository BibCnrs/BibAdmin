export default function (nga) {
    return nga.menu()
    .addChild(nga.menu()
        .title('Administrateurs')
        .icon('<span class="fa fa-user-plus fa-fw"></span>')
        .link('/adminUsers/list')
        .active(path => path.indexOf('/adminUsers') === 0)
    )
    .addChild(nga.menu()
        .title('Compte INIST')
        .icon('<span class="fa fa-user fa-fw"></span>')
        .link('/inistAccounts/list')
        .active(path => path.indexOf('/inistAccounts') === 0)
    )
    .addChild(nga.menu()
        .title('Compte Janus')
        .icon('<span class="fa fa-user fa-fw"></span>')
        .link('/janusAccounts/list')
        .active(path => path.indexOf('/janusAccounts') === 0)
    )
    .addChild(nga.menu()
        .title('Instituts')
        .icon('<span class="fa fa-university fa-fw"></span>')
        .link('/institutes/list')
        .active(path => path.indexOf('/institutes') === 0)
    )
    .addChild(nga.menu()
        .title('Unités')
        .icon('<span class="fa fa-group fa-fw"></span>')
        .link('/units/list')
        .active(path => path.indexOf('/units') === 0)
    )
    .addChild(nga.menu()
        .title('Communautés')
        .icon('<span class="fa fa-folder fa-fw"></span>')
        .link('/communities/list')
        .active(path => path.indexOf('/communities') === 0)
    )
    .addChild(nga.menu()
        .title('Base de données')
        .icon('<span class="fa fa-folder fa-fw"></span>')
        .link('/databases/list')
        .active(path => path.indexOf('/databases') === 0)
    );
}
