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
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  TextField,
  EmailField,
  DateField,
  BooleanField,
  TextInput,
  DateInput,
  BooleanInput
} from "react-admin";

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

      <ReferenceField
        label="resources.janusAccounts.fields.main_institute"
        source="primary_institute"
        reference="institutes"
        linkType="show"
      >
        <TextField source="name" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.janusAccounts.fields.additional_institutes"
        reference="institutes"
        source="additional_institutes"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <ReferenceField
        label="resources.janusAccounts.fields.primary_unit"
        source="primary_unit"
        reference="units"
        linkType="show"
      >
        <TextField source="code" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.janusAccounts.fields.additional_units"
        reference="units"
        source="additional_units"
      >
        <SingleFieldList>
          <ChipField source="code" />
        </SingleFieldList>
      </ReferenceArrayField>

      <ReferenceArrayField
        label="resources.janusAccounts.fields.all_communities"
        reference="communities"
        source="all_communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

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
