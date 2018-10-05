import React, { Component } from "react";
import { Admin, Resource, fetchUtils } from "react-admin";
import jsonServerProvider from "./utils/jsonServerProvider";

// import icon
import UserAddIcon from "@material-ui/icons/PersonAdd";
import UserIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import InstituteIcon from "@material-ui/icons/AccountBalance";
import FolderIcon from "@material-ui/icons/Folder";

// import components
import Dashboard from "./components/Dashboard";
import { UsersList, UsersEdit, UsersCreate } from "./components/Users";
import { InistList, InistEdit, InistCreate } from "./components/Inist";
import { JanusList, JanusEdit } from "./components/Janus";
import {
  InstitutsList,
  InstitutsEdit,
  InstitutsCreate
} from "./components/Instituts";
import { UnitsList, UnitsEdit, UnitsCreate } from "./components/Units";
import {
  CommunitiesList,
  CommunitiesEdit,
  CommunitiesCreate
} from "./components/Communities";
import {
  DatabasesList,
  DatabasesEdit,
  DatabasesCreate
} from "./components/Databases";
import {
  SectionsList,
  SectionsEdit,
  SectionsCreate
} from "./components/Sections";

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
      options.headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
      return fetchUtils.fetchJson(url, options);
    };

    const dataProvider = jsonServerProvider(
      process.env.REACT_APP_BIBAPI_HOST,
      httpClient
    );

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
        <Resource
          name="janusAccounts"
          list={JanusList}
          edit={JanusEdit}
          icon={UserIcon}
        />
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
      </Admin>
    );
  }
}

export default App;
