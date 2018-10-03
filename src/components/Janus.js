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
  EmailField,
  DateField,
  BooleanField,
  TextInput,
  DateInput,
  BooleanInput
} from "react-admin";

const TagsField = ({ record }) => (
  <div>
    {record.all_communities.map(item => (
      <span key={item} className="chip">
        {item}
      </span>
    ))}
  </div>
);

const JanusFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="match" alwaysOn />
  </Filter>
);

export const JanusList = props => (
  <List
    {...props}
    filters={<JanusFilter />}
    sort={{ field: "mail" }}
    perPage={10}
  >
    <Datagrid>
      <TextField source="uid" label="resources.janusAccounts.fields.uid" />
      <EmailField source="mail" label="resources.janusAccounts.fields.email" />
      <TextField
        source="primary_institute"
        label="resources.janusAccounts.fields.main_institute"
      />
      <TextField
        source="secondary_institute"
        label="resources.janusAccounts.fields.secondary_institute"
      />
      <TextField
        source="primary_unit"
        label="resources.janusAccounts.fields.main_unit"
      />
      <TextField
        source="secondary_unit"
        label="resources.janusAccounts.fields.secondary_unit"
      />
      <TagsField
        source="all_communities"
        label="resources.janusAccounts.fields.all_communities"
      />
      <DateField
        source="last_connexion"
        label="resources.janusAccounts.fields.last_connexion"
      />
      <DateField
        source="first_connexion"
        label="resources.janusAccounts.fields.first_connexion"
      />
      <BooleanField
        source="enable"
        label="resources.janusAccounts.fields.enable"
      />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

const JanusTitle = ({ record }) => {
  return record.username;
};

export const JanusEdit = ({ ...props }) => (
  <Edit title={<JanusTitle />} {...props}>
    <SimpleForm>
      <TextInput source="uid" label="resources.janusAccounts.fields.uid" />
      <TextInput
        type="mail"
        source="mail"
        label="resources.janusAccounts.fields.email"
      />
      <TextInput
        source="primary_institute"
        label="resources.janusAccounts.fields.main_institute"
      />
      <TextInput
        source="secondary_institute"
        label="resources.janusAccounts.fields.secondary_institute"
      />
      <TextInput
        source="primary_unit"
        label="resources.janusAccounts.fields.main_unit"
      />
      <TextInput
        source="secondary_unit"
        label="resources.janusAccounts.fields.secondary_unit"
      />
      <TextInput
        source="all_communities"
        label="resources.janusAccounts.fields.all_communities"
      />
      <DateInput
        source="last_connexion"
        label="resources.janusAccounts.fields.last_connexion"
      />
      <DateInput
        source="first_connexion"
        label="resources.janusAccounts.fields.first_connexion"
      />
      <BooleanInput
        source="enable"
        label="resources.janusAccounts.fields.enable"
      />
    </SimpleForm>
  </Edit>
);

export const JanusCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="uid" label="resources.janusAccounts.fields.uid" />
      <TextInput
        type="mail"
        source="mail"
        label="resources.janusAccounts.fields.email"
      />
      <TextInput
        source="primary_institute"
        label="resources.janusAccounts.fields.main_institute"
      />
      <TextInput
        source="secondary_institute"
        label="resources.janusAccounts.fields.secondary_institute"
      />
      <TextInput
        source="primary_unit"
        label="resources.janusAccounts.fields.main_unit"
      />
      <TextInput
        source="secondary_unit"
        label="resources.janusAccounts.fields.secondary_unit"
      />
      <TextInput
        source="all_communities"
        label="resources.janusAccounts.fields.all_communities"
      />
      <DateInput
        source="last_connexion"
        label="resources.janusAccounts.fields.last_connexion"
      />
      <DateInput
        source="first_connexion"
        label="resources.janusAccounts.fields.first_connexion"
      />
      <BooleanInput
        source="enable"
        label="resources.janusAccounts.fields.enable"
      />
    </SimpleForm>
  </Create>
);
