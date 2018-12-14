import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Filter,
  SimpleForm,
  TextField,
  BooleanField,
  TextInput,
  BooleanInput,
  downloadCSV
} from "react-admin";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { renameKeys } from "../utils/utils";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import LinkEdit from "../components/LinkEdit";
import ListActions from "../components/ListActions";
import { PostPagination } from "../utils/pagination";

const CommunitiesFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput source="gate" label="resources.communities.fields.gate" />
    <TextInput source="user_id" label="resources.communities.fields.user_id" />
    <TextInput
      source="password"
      label="resources.communities.fields.password"
    />
    <TextInput
      source="like_profile"
      label="resources.communities.fields.profile"
    />
    <BooleanInput source="ebsco" label="resources.communities.fields.ebsco" />
  </Filter>
);

const exporter = async records => {
  const data = records.map(record => renameKeys(record, "communities"));
  const csv = convertToCSV(data, {
    delimiter: ";"
  });
  downloadCSV(csv, "communities");
};

export const CommunitiesList = ({ ...props }) => (
  <List
    {...props}
    filters={<CommunitiesFilter />}
    perPage={10}
    pagination={<PostPagination />}
    exporter={exporter}
  >
    <Datagrid>
      <LinkEdit source="name" label="resources.communities.fields.name" />

      <TextField source="gate" label="resources.communities.fields.gate" />
      <TextField
        source="user_id"
        label="resources.communities.fields.user_id"
      />
      <TextField
        source="profile"
        label="resources.communities.fields.profile"
      />
      <BooleanField source="ebsco" label="resources.communities.fields.ebsco" />
      <EditButton />
      <DeleteButtonWithConfirmation />
    </Datagrid>
  </List>
);

const CommunitiesTitle = ({ record }) => {
  return record.name;
};

export const CommunitiesEdit = ({ ...props }) => (
  <Edit title={<CommunitiesTitle />} {...props} actions={<ListActions />}>
    <SimpleForm>
      <TextInput source="name" label="resources.communities.fields.name" />
      <TextInput source="gate" label="resources.communities.fields.gate" />
      <TextInput
        source="user_id"
        label="resources.communities.fields.user_id"
      />
      <TextInput
        source="password"
        label="resources.communities.fields.password"
      />
      <TextInput
        source="profile"
        label="resources.communities.fields.profile"
      />
      <BooleanInput source="ebsco" label="resources.communities.fields.ebsco" />
    </SimpleForm>
  </Edit>
);

export const CommunitiesCreate = ({ ...props }) => (
  <Create {...props} actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextInput source="name" label="resources.communities.fields.name" />
      <TextInput source="gate" label="resources.communities.fields.gate" />
      <TextInput
        source="user_id"
        label="resources.communities.fields.user_id"
      />
      <TextInput
        source="password"
        label="resources.communities.fields.password"
      />
      <TextInput
        source="profile"
        label="resources.communities.fields.profile"
      />
      <BooleanInput source="ebsco" label="resources.communities.fields.ebsco" />
    </SimpleForm>
  </Create>
);
