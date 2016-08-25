import 'babel-polyfill';
import crypto from 'crypto';

import janusAccounts from './config/janusAccounts';
import inistAccounts from './config/inistAccounts';
import adminUsers from './config/adminUsers';
import domains from './config/domains';
import renaterHeaders from './config/renaterHeaders';
import institutes from './config/institutes';
import units from './config/units';
import menu from './config/menu';
import services from './services';
import directives from './directives';

const bibAdmin = angular.module('bibAdmin', ['ng-admin']);

bibAdmin.factory('crypto', [function () {
    return crypto;
}]);

services(bibAdmin);
directives(bibAdmin);

bibAdmin.config(['NgAdminConfigurationProvider', 'RestangularProvider', function (nga, RestangularProvider) {
    const token = window.sessionStorage.getItem('token');

    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + token
    });

    // create the admin application
    const admin = nga.application('BibAdmin')
    .baseApiUrl(`${__BIBAPI_HOST__}/`);

    // add entities
    admin.addEntity(nga.entity('janusAccounts'));
    admin.addEntity(nga.entity('inistAccounts'));
    admin.addEntity(nga.entity('adminUsers'));
    admin.addEntity(nga.entity('domains'));
    admin.addEntity(nga.entity('renaterHeaders'));
    admin.addEntity(nga.entity('institutes'));
    admin.addEntity(nga.entity('units'));

    // configure entities
    janusAccounts(nga, admin);
    inistAccounts(nga, admin);
    adminUsers(nga, admin);
    domains(nga, admin);
    renaterHeaders(nga, admin);
    institutes(nga, admin);
    units(nga, admin);

    window.logout = function logout() {

        window.sessionStorage.clear();
        window.location.href = './login.html';
    };

    admin.header(
`<div class="navbar-header">
    <a class="navbar-brand" href="#" ng-click="appController.displayHome()">BibAdmin</a>
</div>
<ul class="nav navbar-top-links navbar-right hidden-xs">
    <li>
        <li><a href="#" onclick="logout()"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li>
    </li>
</ul>`
    );

    admin.menu(menu(nga, admin));

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);
