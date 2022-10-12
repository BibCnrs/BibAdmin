import React from "react";
import { Admin, Resource } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import Dashboard from "./dashboard/dashboard";
import adminUsers from "./adminUsers";
import institutes from "./institutes";
import communities from "./communities";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import langFr from "./i18n/fr";
import databases from "./databases";

const i18nProvider = polyglotI18nProvider(() => langFr, "fr", {
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
    <Resource name="institutes" {...institutes} />
    <Resource name="communities" {...communities} />
    <Resource name="databases" {...databases} />
  </Admin>
);

export default App;
