import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  DeleteButton,
  List,
  NumberField,
  SimpleForm,
  TextField,
  TextInput
} from "react-admin";

export const UserList = ({ ...props }) => (
  <List {...props} sort={{ field: "id" }} perPage={25}>
    <Datagrid>
      <NumberField source="id" type="number" />
      <TextField source="username" label="resources.adminUsers.fields.login" />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }) => {
  return record.username;
};

export const UserEdit = ({ ...props }) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput type="password" source="password" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput type="password" source="password" />
    </SimpleForm>
  </Create>
);
