import users from './config/users';
import adminUsers from './config/adminUsers';
import domains from './config/domains';
import menu from './config/menu';

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


    // add entities
    admin.addEntity(nga.entity('users'));
    admin.addEntity(nga.entity('adminUsers'));
    admin.addEntity(nga.entity('domains'));

    // configure entities
    users(nga, admin);
    adminUsers(nga, admin);
    domains(nga, admin);
    window.logout = function logout() {

        window.sessionStorage.clear();
        window.location.href = "./login.html";
    }
    admin.header(`<div class="navbar-header">
        <a class="navbar-brand" href="#" ng-click="appController.displayHome()">BibAdmin</a>
    </div>
    <ul class="nav navbar-top-links navbar-right hidden-xs">
        <li>
            <li><a href="#" onclick="logout()"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li>
        </li>
    </ul>
    `);
    admin.menu(menu(nga, admin));

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);
