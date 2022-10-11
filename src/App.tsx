import React from "react";
import { Admin, ListGuesser, Resource } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import adminUsers from "./adminUsers";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import langFr from "./i18n/fr";

const i18nProvider = polyglotI18nProvider(() => langFr, "fr", {
  allowMissing: true,
});

const App = () => (
  <Admin
    i18nProvider={i18nProvider}
    dataProvider={dataProvider}
    authProvider={authProvider}
    requireAuth
  >
    <Resource name="adminUsers" {...adminUsers} />
  </Admin>
);

export default App;
