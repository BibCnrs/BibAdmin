import React from "react";
import { Admin, ListGuesser, Resource } from "react-admin";
import adminUsers from "./adminUsers";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="adminUsers" {...adminUsers} />
  </Admin>
);

export default App;
