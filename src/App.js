import React, { Component } from "react";
import { Admin, Resource, fetchUtils } from "react-admin";
import jsonServerProvider from "./utils/jsonServerProvider";

// import icon
import UserAddIcon from "@material-ui/icons/PersonAdd";
import UserIcon from "@material-ui/icons/Person";

// import components
import { UserList, UserEdit, UserCreate } from "./components/Users";
import { InistList, InistEdit, InistCreate } from "./components/Inist";
import { JanusList } from "./components/Janus";

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
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        authProvider={authProvider}
        locale="fr"
      >
        <Resource
          name="adminUsers"
          list={UserList}
          create={UserCreate}
          edit={UserEdit}
          icon={UserAddIcon}
        />
        <Resource
          name="inistAccounts"
          list={InistList}
          edit={InistEdit}
          create={InistCreate}
          icon={UserIcon}
        />
        <Resource name="janusAccounts" list={JanusList} icon={UserIcon} />
        {/*<Resource
          name="institutes"
          list={AdminList}
          edit={AdminEdit}
          icon={CategoryIcon}
        />
        <Resource
          name="units"
          list={StructuresList}
          create={StructuresCreate}
          edit={StructuresEdit}
          icon={StructuresIcon}
        />*/}
      </Admin>
    );
  }
}

export default App;
