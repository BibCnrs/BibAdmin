import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  Filter,
  List,
  SimpleForm,
  TextField,
  TextInput,
  LongTextInput
} from "react-admin";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import ListActions from "../components/ListActions";

const UsersFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
  </Filter>
);

export const UsersList = ({ ...props }) => (
  <List {...props} filters={<UsersFilter />} perPage={25}>
    <Datagrid>
      <TextField source="username" label="resources.adminUsers.fields.login" />
      <EditButton />
      <DeleteButtonWithConfirmation />
    </Datagrid>
  </List>
);

const UsersTitle = ({ record }) => {
  return record.username;
};

export const UsersEdit = ({ ...props }) => (
  <Edit title={<UsersTitle />} {...props} actions={<ListActions />}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput type="password" source="password" />
      <LongTextInput source="comment" />
    </SimpleForm>
  </Edit>
);

export const UsersCreate = ({ ...props }) => (
  <Create {...props} actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextInput source="username" />
      <TextInput type="password" source="password" />
      <LongTextInput source="comment" />
    </SimpleForm>
  </Create>
);
