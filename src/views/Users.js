import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  Filter,
  List,
  NumberField,
  SimpleForm,
  TextField,
  TextInput,
  LongTextInput
} from "react-admin";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";

const UsersFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
  </Filter>
);

export const UsersList = ({ ...props }) => (
  <List {...props} filters={<UsersFilter />} perPage={25}>
    <Datagrid>
      <NumberField type="number" source="id" />
      <TextField source="username" label="resources.adminUsers.fields.login" />
      <EditButton label="" />
      <DeleteButtonWithConfirmation />
    </Datagrid>
  </List>
);

const UsersTitle = ({ record }) => {
  return record.username;
};

export const UsersEdit = ({ ...props }) => (
  <Edit title={<UsersTitle />} {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput type="password" source="password" />
      <LongTextInput source="comment" />
    </SimpleForm>
  </Edit>
);

export const UsersCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="username" />
      <TextInput type="password" source="password" />
      <LongTextInput source="comment" />
    </SimpleForm>
  </Create>
);
