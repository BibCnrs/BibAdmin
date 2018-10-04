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

const InistFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="match" alwaysOn />
  </Filter>
);

export const InistList = ({ ...props }) => (
  <List
    {...props}
    filters={<InistFilter />}
    sort={{ field: "username", order: "ASC" }}
    perPage={10}
  >
    <Datagrid>
      <TextField
        source="username"
        label="resources.inistAccounts.fields.username"
      />
      <TextField
        source="password"
        label="resources.inistAccounts.fields.password"
      />
      <TextField source="name" label="resources.inistAccounts.fields.name" />
      <TextField
        source="firstname"
        label="resources.inistAccounts.fields.firstname"
      />
      <EmailField source="mail" label="resources.inistAccounts.fields.email" />

      <ReferenceField
        label="resources.inistAccounts.fields.main_institute"
        source="main_institute"
        reference="institutes"
        linkType="show"
      >
        <TextField source="code" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.inistAccounts.fields.institutes"
        reference="institutes"
        source="institutes"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <ReferenceField
        label="resources.inistAccounts.fields.main_unit"
        source="main_unit"
        reference="units"
        linkType="show"
      >
        <TextField source="code" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.inistAccounts.fields.units"
        reference="units"
        source="units"
      >
        <SingleFieldList>
          <ChipField source="code" />
        </SingleFieldList>
      </ReferenceArrayField>

      <ReferenceArrayField
        label="resources.inistAccounts.fields.communities"
        reference="communities"
        source="communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <DateField
        source="subscription_date"
        label="resources.inistAccounts.fields.subscription_date"
      />
      <DateField
        source="expiration_date"
        label="resources.inistAccounts.fields.expiration_date"
      />
      <BooleanField
        source="active"
        label="resources.inistAccounts.fields.enable"
      />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

const InistTitle = ({ record }) => {
  return record.username;
};

export const InistEdit = ({ ...props }) => (
  <Edit title={<InistTitle />} {...props}>
    <SimpleForm>
      <TextInput
        source="username"
        label="resources.inistAccounts.fields.username"
      />
      <TextInput
        source="password"
        label="resources.inistAccounts.fields.password"
      />
      <TextInput source="name" label="resources.inistAccounts.fields.name" />
      <TextInput
        source="firstname"
        label="resources.inistAccounts.fields.firstname"
      />
      <TextInput
        type="email"
        source="mail"
        label="resources.inistAccounts.fields.email"
      />
      <TextInput
        source="main_institute"
        label="resources.inistAccounts.fields.main_institute"
      />
      <TextInput
        source="secondary_institute"
        label="resources.inistAccounts.fields.secondary_institute"
      />
      <TextInput
        source="main_unit"
        label="resources.inistAccounts.fields.main_unit"
      />
      <TextInput
        source="secondary_unit"
        label="resources.inistAccounts.fields.secondary_unit"
      />
      <TextInput
        source="communities"
        label="resources.inistAccounts.fields.communities"
      />
      <DateInput
        source="subscription_date"
        label="resources.inistAccounts.fields.subscription_date"
      />
      <DateInput
        source="expiration_date"
        label="resources.inistAccounts.fields.expiration_date"
      />
      <BooleanInput
        source="active"
        label="resources.inistAccounts.fields.enable"
      />
    </SimpleForm>
  </Edit>
);

export const InistCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput
        source="username"
        label="resources.inistAccounts.fields.username"
      />
      <TextInput
        source="password"
        label="resources.inistAccounts.fields.password"
      />
      <TextInput source="name" label="resources.inistAccounts.fields.name" />
      <TextInput
        source="firstname"
        label="resources.inistAccounts.fields.firstname"
      />
      <TextInput
        type="email"
        source="mail"
        label="resources.inistAccounts.fields.email"
      />
      <TextInput
        source="main_institute"
        label="resources.inistAccounts.fields.main_institute"
      />
      <TextInput
        source="secondary_institute"
        label="resources.inistAccounts.fields.secondary_institute"
      />
      <TextInput
        source="main_unit"
        label="resources.inistAccounts.fields.main_unit"
      />
      <TextInput
        source="secondary_unit"
        label="resources.inistAccounts.fields.secondary_unit"
      />
      <TextInput
        source="communities"
        label="resources.inistAccounts.fields.communities"
      />
      <DateInput
        source="subscription_date"
        label="resources.inistAccounts.fields.subscription_date"
      />
      <DateInput
        source="expiration_date"
        label="resources.inistAccounts.fields.expiration_date"
      />
      <BooleanInput
        source="active"
        label="resources.inistAccounts.fields.enable"
      />
    </SimpleForm>
  </Create>
);
