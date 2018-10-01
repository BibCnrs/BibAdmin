import React from "react";
import { List, Datagrid, TextField } from "react-admin";

export const JanusList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="mail" />
    </Datagrid>
  </List>
);
