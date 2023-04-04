import Dashboard from './dashboard/dashboard';
import adminUsers from './adminUsers';
import inist from './inist';
import janus from './janus';
import institutes from './institutes';
import units from './units';
import communities from './communities';
import databases from './databases';
import sections from './sections';
import favoris from './favoris';
import licenses from './licenses';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import langFr from './i18n/fr';
import Pages from './cms/pages';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { Admin, Resource } from 'react-admin';
import React from 'react';

const i18nProvider = polyglotI18nProvider(() => langFr, 'fr', {
    allowMissing: true,
});

const App = () => (
    <Admin
        title="BibAdmin"
        dashboard={Dashboard}
        i18nProvider={i18nProvider}
        dataProvider={dataProvider}
        authProvider={authProvider}
        requireAuth
    >
        <Resource name="adminUsers" {...adminUsers} />
        <Resource name="inistAccounts" {...inist} />
        <Resource name="janusAccounts" {...janus} />
        <Resource name="institutes" {...institutes} />
        <Resource name="units" {...units} />
        <Resource name="communities" {...communities} />
        <Resource name="databases" {...databases} />
        <Resource name="section_cn" {...sections} />
        <Resource name="revues" {...favoris} />
        <Resource name="licenses" {...licenses} />
        <Resource name="pages" {...Pages} />
    </Admin>
);

export default App;
