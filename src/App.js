import React, { Component } from "react";
import { Admin, Resource, fetchUtils } from "react-admin";
import jsonServerProvider from "./utils/jsonServerProvider";

// import icon
import UserAddIcon from "@material-ui/icons/PersonAdd";
import UserIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import InstituteIcon from "@material-ui/icons/AccountBalance";
import FolderIcon from "@material-ui/icons/Folder";

// import views
import Dashboard from "./views/Dashboard";
import { UsersList, UsersEdit, UsersCreate } from "./views/Users";
import { InistList, InistEdit, InistCreate } from "./views/Inist";
import { JanusList, JanusEdit } from "./views/Janus";
import { InstitutsList, InstitutsEdit, InstitutsCreate } from "./views/Instituts";
import { UnitsList, UnitsEdit, UnitsCreate } from "./views/Units";
import { CommunitiesList, CommunitiesEdit, CommunitiesCreate } from "./views/Communities";
import { DatabasesList, DatabasesEdit, DatabasesCreate } from "./views/Databases";
import { SectionsList, SectionsEdit, SectionsCreate } from "./views/Sections";
import { FavorisList, FavorisEdit, FavorisCreate } from "./views/Favoris";

import authProvider from "./authProvider";
import langFr from "./i18n/fr";

const i18nProvider = locale => {
  return langFr;
};

class App extends Component {
  state = {
    dataProvider: null
  };

  async componentWillMount() {
    const httpClient = (url, options = {}) => {
      if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
      }
      options.headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return fetchUtils.fetchJson(url, options);
    };

    const dataProvider = jsonServerProvider(process.env.REACT_APP_BIBAPI_HOST, httpClient);

    this.setState({ dataProvider });
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return (
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      );
    }

    return (
      <Admin
        title="BibAdmin"
        dashboard={Dashboard}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        authProvider={authProvider}
        locale="fr"
      >
        <Resource
          name="adminUsers"
          list={UsersList}
          create={UsersCreate}
          edit={UsersEdit}
          icon={UserAddIcon}
        />
        <Resource
          name="inistAccounts"
          list={InistList}
          create={InistCreate}
          edit={InistEdit}
          icon={UserIcon}
        />
        <Resource name="janusAccounts" list={JanusList} edit={JanusEdit} icon={UserIcon} />
        <Resource
          name="institutes"
          list={InstitutsList}
          create={InstitutsCreate}
          edit={InstitutsEdit}
          icon={InstituteIcon}
        />
        <Resource
          name="units"
          list={UnitsList}
          create={UnitsCreate}
          edit={UnitsEdit}
          icon={GroupIcon}
        />
        <Resource
          name="communities"
          list={CommunitiesList}
          create={CommunitiesCreate}
          edit={CommunitiesEdit}
          icon={FolderIcon}
        />
        <Resource
          name="databases"
          list={DatabasesList}
          create={DatabasesCreate}
          edit={DatabasesEdit}
          icon={FolderIcon}
        />
        <Resource
          name="section_cn"
          list={SectionsList}
          create={SectionsCreate}
          edit={SectionsEdit}
          icon={FolderIcon}
        />
        <Resource
          name="revues"
          list={FavorisList}
          create={FavorisCreate}
          edit={FavorisEdit}
          icon={FolderIcon}
        />
      </Admin>
    );
  }
}

export default App;
