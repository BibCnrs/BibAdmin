import users from './config/users';

const bibAdmin = angular.module('bibAdmin', ['ng-admin']);

bibAdmin.config(['NgAdminConfigurationProvider', function (nga) {
    // create the admin application
    var admin = nga.application('BibAdmin')
        .baseApiUrl('http://localhost:3000/admin/');

    // add entities
    admin.addEntity(nga.entity('users'));

    // configure entities
    users(nga, admin);

    // admin.dashboard(require('./dashboard/config')(nga, admin));
    // admin.header(require('./header.html'));
    // admin.menu(require('./menu')(nga, admin));

    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);
