import 'babel-polyfill';
import crypto from 'crypto';

import janusAccounts from './config/janusAccounts';
import inistAccounts from './config/inistAccounts';
import adminUsers from './config/adminUsers';
import communities from './config/communities';
import institutes from './config/institutes';
import units from './config/units';
import database from './config/database';
import sectionCN from './config/sectionCN';
import revue from './config/revue';
import menu from './config/menu';
import services from './services';
import directives from './directives';
import loadImage from 'blueimp-load-image';

const bibAdmin = angular.module('bibAdmin', ['ng-admin']);

bibAdmin.factory('crypto', [function () {
    return crypto;
}]);
bibAdmin.factory('blueimp-load-image', [function () {
    return loadImage;
}]);

services(bibAdmin);
directives(bibAdmin);

bibAdmin.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('fr', {
        BACK: 'Retour',
        DELETE: 'Supprimer',
        CREATE: 'Ajouter',
        EDIT: 'Modifier',
        EXPORT: 'Exporter',
        ADD_FILTER: 'Filtrer',
        SEE_RELATED: 'Voir les {{ entityName }} liés',
        LIST: 'Liste',
        SHOW: 'Détails',
        SAVE: 'Enregistrer',
        N_SELECTED: '{{ length }} sélectionnés',
        ARE_YOU_SURE: 'Cette modification est définitive. Confirmez-vous ?',
        YES: 'Oui',
        NO: 'Non',
        FILTER_VALUES: 'Filtrer',
        CLOSE: 'Fermer',
        CLEAR: 'Vider',
        CURRENT: 'Aujourd\'hui',
        REMOVE: 'Retirer',
        ADD_NEW: 'Ajouter un nouveau {{ name }}',
        BROWSE: 'Parcourir',
        N_COMPLETE: '{{ progress }}% terminé',
        CREATE_NEW: 'Créer',
        SUBMIT: 'Valider',
        SAVE_CHANGES: 'Enregistrer',
        BATCH_DELETE_SUCCESS: 'Suppression enregistrée',
        DELETE_SUCCESS: 'Suppression enregistrée',
        ERROR_MESSAGE: 'Erreur serveur (code: {{ status }})',
        INVALID_FORM: 'Formulaire invalide',
        CREATION_SUCCESS: 'Création enregistrée',
        EDITION_SUCCESS: 'Modifications enregistrées',
        ACTIONS: 'Actions',
        PAGINATION: '<strong>{{ begin }}</strong> - <strong>{{ end }}</strong> sur <strong>{{ total }}</strong>',
        NO_PAGINATION: 'Aucun résultat',
        PREVIOUS: '« Précédent',
        NEXT: 'Suivant »',
        DETAIL: 'Détail',
        STATE_CHANGE_ERROR: 'Erreur de routage: {{ message }}',
        NOT_FOUND: 'Page non trouvée',
        NOT_FOUND_DETAILS: 'La page demandée n\'existe pas. Revenez à la page précédente et essayez autre chose.',
    });
    $translateProvider.preferredLanguage('fr');
}]);

bibAdmin.factory('noCacheInterceptor', function () {
    return {
        request: function (config) {
            if(config.method=='GET'){
                // HACK: detect IE to disable its ajax caching
                if (document.documentMode) {
                    const separator = config.url.indexOf('?') === -1 ? '?' : '&';
                    config.url = config.url+separator + 'noCache=' + new Date().getTime();
                }
            }

            return config;
        },
    };
});

bibAdmin.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('noCacheInterceptor');
}]);

bibAdmin.config(['NgAdminConfigurationProvider', 'RestangularProvider', function (nga, RestangularProvider) {
    const token = window.sessionStorage.getItem('token');

    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + token
    });

    RestangularProvider.addFullRequestInterceptor((element, operation, what, url, headers, params, httpConfig) => {
        if (operation === 'getList' && !params._page && !params._perPage) {
            return {
                params: {
                    ...params,
                    export: true,
                },
                httpConfig: {
                    ...httpConfig,
                    timeout: 60000,
                },
            };
        }
    });

    // create the admin application
    const admin = nga.application('BibAdmin')
    .baseApiUrl(`${__BIBAPI_HOST__}/`);

    admin.dashboard(nga.dashboard());

    // add entities
    admin.addEntity(nga.entity('janusAccounts'));
    admin.addEntity(nga.entity('inistAccounts'));
    admin.addEntity(nga.entity('adminUsers'));
    admin.addEntity(nga.entity('communities'));
    admin.addEntity(nga.entity('renaterHeaders'));
    admin.addEntity(nga.entity('institutes'));
    admin.addEntity(nga.entity('units'));
    admin.addEntity(nga.entity('databases'));
    admin.addEntity(nga.entity('section_cn'));
    admin.addEntity(nga.entity('revues'));

    // configure entities
    communities(nga, admin);
    institutes(nga, admin);
    units(nga, admin);
    janusAccounts(nga, admin);
    inistAccounts(nga, admin);
    adminUsers(nga, admin);
    database(nga, admin);
    sectionCN(nga, admin);
    revue(nga, admin);

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
