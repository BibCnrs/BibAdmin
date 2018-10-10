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
  BooleanInput,
  ReferenceField
} from "react-admin";

const CommunitiesFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput source="name" label="resources.communities.fields.name" />
    <TextInput source="gate" label="resources.communities.fields.gate" />
    <TextInput source="user_id" label="resources.communities.fields.user_id" />
    <TextInput
      source="password"
      label="resources.communities.fields.password"
    />
    <TextInput source="profile" label="resources.communities.fields.profile" />
    <BooleanInput source="ebsco" label="resources.communities.fields.ebsco" />
  </Filter>
);

export const CommunitiesList = ({ ...props }) => (
  <List {...props} filters={<CommunitiesFilter />} perPage={50}>
    <Datagrid>
      <ReferenceField
        label="resources.communities.fields.name"
        source="id"
        reference="communities"
      >
        <TextField source="name" />
      </ReferenceField>

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
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

const CommunitiesTitle = ({ record }) => {
  return record.name;
};

export const CommunitiesEdit = ({ ...props }) => (
  <Edit title={<CommunitiesTitle />} {...props}>
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
  <Create {...props}>
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
