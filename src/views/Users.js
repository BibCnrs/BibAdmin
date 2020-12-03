import React, { Fragment } from "react";
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
  SaveButton,
  Toolbar,
  BulkDeleteWithConfirmButton,
  DeleteWithConfirmButton
} from "react-admin";
import { ListActions, ListEditActions } from "../components/ListActions";
import { PostPagination } from "../utils/pagination";

const UsersFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
  </Filter>
);

const PostBulkActionButtons = props => (
  <Fragment>
    <BulkDeleteWithConfirmButton {...props} />
  </Fragment>
);

export const UsersList = ({ ...props }) => (
  <List
    undoable={false}
    {...props}
    filters={<UsersFilter />}
    perPage={25}
    pagination={<PostPagination />}
    bulkActionButtons={<PostBulkActionButtons />}
  >
    <Datagrid>
      <TextField source="username" label="resources.adminUsers.fields.login" />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
);

const UsersTitle = ({ record }) => {
  return record.username;
};

const PostEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const UsersEdit = ({ ...props }) => (
  <Edit title={<UsersTitle />} {...props} actions={<ListEditActions />}>
    <SimpleForm toolbar={<PostEditToolbar />}>
      <TextInput source="username" />
      <TextInput source="password" />
      <TextInput source="comment" />
    </SimpleForm>
  </Edit>
);

export const UsersCreate = ({ ...props }) => (
  <Create {...props} actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextInput source="username" />
      <TextInput source="password" />
      <TextInput source="comment" />
    </SimpleForm>
  </Create>
);
