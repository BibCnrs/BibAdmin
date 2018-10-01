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
  BooleanInput
} from "react-admin";

const TagsField = ({ record }) => (
  <div>
    {record.communities.map(item => (
      <span key={item} className="chip">
        {item}
      </span>
    ))}
  </div>
);

const InistFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="match" alwaysOn />
  </Filter>
);

export const InistList = ({ ...props }) => (
  <List
    {...props}
    filters={<InistFilter />}
    sort={{ field: "username", order: "DESC" }}
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
      <TextField
        source="main_institute"
        label="resources.inistAccounts.fields.main_institute"
      />
      <TextField
        source="secondary_institute"
        label="resources.inistAccounts.fields.secondary_institute"
      />
      <TextField
        source="main_unit"
        label="resources.inistAccounts.fields.main_unit"
      />
      <TextField
        source="secondary_unit"
        label="resources.inistAccounts.fields.secondary_unit"
      />
      <TagsField
        source="communities"
        label="resources.inistAccounts.fields.communities"
      />
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
      <TextInput
        source="subscription_date"
        label="resources.inistAccounts.fields.subscription_date"
      />
      <TextInput
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
      <TextInput
        source="subscription_date"
        label="resources.inistAccounts.fields.subscription_date"
      />
      <TextInput
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
