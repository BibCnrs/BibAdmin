import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  DeleteButton,
  List,
  Filter,
  SimpleForm,
  TextField,
  BooleanField,
  TextInput,
  BooleanInput
} from "react-admin";

const DatabasesFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="match" alwaysOn />
  </Filter>
);

export const DatabasesList = ({ ...props }) => (
  <List
    {...props}
    filters={<DatabasesFilter />}
    sort={{ field: "name" }}
    perPage={10}
  >
    <Datagrid>
      <TextField source="name_fr" label="resources.databases.fields.name_fr" />
      <TextField source="name_en" label="resources.databases.fields.name_en" />
      <BooleanField source="active" label="resources.databases.fields.active" />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

const DatabasesTitle = ({ record }) => {
  return record.name_fr;
};

export const DatabasesEdit = ({ ...props }) => (
  <Edit title={<DatabasesTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name_fr" label="resources.databases.fields.name_fr" />
      <TextInput source="name_en" label="resources.databases.fields.name_en" />
      <BooleanInput source="active" label="resources.databases.fields.active" />
    </SimpleForm>
  </Edit>
);

export const DatabasesCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name_fr" label="resources.databases.fields.name_fr" />
      <TextInput source="name_en" label="resources.databases.fields.name_en" />
      <BooleanInput source="active" label="resources.databases.fields.active" />
    </SimpleForm>
  </Create>
);
