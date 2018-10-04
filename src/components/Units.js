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
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  BooleanField,
  ChipField,
  TextInput,
  DateInput,
  BooleanInput
} from "react-admin";

const UnitsFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="match" alwaysOn />
  </Filter>
);

export const UnitsList = ({ ...props }) => (
  <List
    {...props}
    filters={<UnitsFilter />}
    sort={{ field: "code" }}
    perPage={10}
  >
    <Datagrid>
      <TextField source="code" label="resources.units.fields.code" />
      <TextField source="name" label="resources.units.fields.name" />
      <TextField
        source="main_institute"
        label="resources.units.fields.main_institute"
      />

      <ReferenceField
        label="resources.units.fields.institutes"
        source="main_institute"
        reference="institutes"
        linkType="show"
      >
        <TextField source="name" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.units.fields.institutes"
        reference="institutes"
        source="institutes"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <TextField
        source="nb_inist_account"
        label="resources.units.fields.nb_inist_account"
      />
      <TextField
        source="nb_janus_account"
        label="resources.units.fields.nb_janus_account"
      />

      <ReferenceArrayField
        label="resources.units.fields.communities"
        reference="communities"
        source="communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <ReferenceArrayField
        label="resources.units.fields.section_cn"
        reference="section_cn"
        source="sections_cn"
      >
        <SingleFieldList>
          <ChipField source="code" />
        </SingleFieldList>
      </ReferenceArrayField>

      <BooleanField source="active" label="resources.units.fields.enable" />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

const UnitsTitle = ({ record }) => {
  return record.username;
};

export const UnitsEdit = ({ ...props }) => (
  <Edit title={<UnitsTitle />} {...props}>
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

export const UnitsCreate = ({ ...props }) => (
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
