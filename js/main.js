import users from './config/users';
import adminUsers from './config/adminUsers';
import domains from './config/domains';

const bibAdmin = angular.module('bibAdmin', ['ng-admin']);

bibAdmin.config(['NgAdminConfigurationProvider', 'RestangularProvider', function (nga, RestangularProvider) {
    const token = window.sessionStorage.getItem('token');
    if (!token) {
        window.location.href = "./login.html";
    }

    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + token
    });

    // create the admin application
    const admin = nga.application('BibAdmin')
        .baseApiUrl('http://localhost:3000/admin/');

    admin.header(`<div class="navbar-header">
        <button type="button" class="navbar-toggle" ng-click="isCollapsed = !isCollapsed">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#" ng-click="appController.displayHome()">BibAdmin</a>
    </div>
    <ul class="nav navbar-top-links navbar-right hidden-xs">
        <li>
            <li><a href="#" onclick="logout()"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li>
        </li>
    </ul>`);

    // add entities
    admin.addEntity(nga.entity('users'));
    admin.addEntity(nga.entity('adminUsers'));
    admin.addEntity(nga.entity('domains'));

    // configure entities
    users(nga, admin);
    adminUsers(nga, admin);
    domains(nga, admin);

    // admin.dashboard(require('./dashboard/config')(nga, admin));
    // admin.header(require('./header.html'));
    // admin.menu(require('./menu')(nga, admin));

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);
