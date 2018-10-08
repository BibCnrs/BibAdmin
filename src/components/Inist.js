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
  LongTextInput,
  DateInput,
  BooleanInput,
  ReferenceInput,
  ReferenceArrayInput,
  SelectInput,
  SelectArrayInput
} from "react-admin";
import Button from "@material-ui/core/Button";

const InistFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput
      source="username"
      label="resources.inistAccounts.fields.username"
    />
    <TextInput source="name" label="resources.inistAccounts.fields.name" />
    <TextInput
      source="firstname"
      label="resources.inistAccounts.fields.firstname"
    />
    <TextInput
      type="email"
      source="mail"
      label="resources.inistAccounts.fields.mail"
    />

    <ReferenceInput
      label="resources.inistAccounts.fields.main_institute"
      source="main_institute"
      reference="institutes"
    >
      <SelectInput optionText="name" />
    </ReferenceInput>

    <ReferenceArrayInput
      perPage={1000}
      label="resources.inistAccounts.fields.institutes"
      source="institutes"
      reference="institutes"
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

    <ReferenceInput
      label="resources.inistAccounts.fields.main_unit"
      source="main_unit"
      reference="units"
    >
      <SelectInput optionText="code" />
    </ReferenceInput>

    <ReferenceArrayInput
      perPage={10}
      label="resources.inistAccounts.fields.units"
      source="units"
      reference="units"
    >
      <SelectArrayInput optionText="code" />
    </ReferenceArrayInput>

    <ReferenceArrayInput
      perPage={1000}
      label="resources.inistAccounts.fields.communities"
      source="communities"
      reference="communities"
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

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
      label="resources.inistAccounts.fields.active"
    />
  </Filter>
);

export const InistList = ({ ...props }) => (
  <List {...props} filters={<InistFilter />} perPage={10}>
    <Datagrid>
      <TextField
        label="resources.inistAccounts.fields.username"
        source="username"
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
      <EmailField source="mail" label="resources.inistAccounts.fields.mail" />

      <ReferenceField
        label="resources.inistAccounts.fields.main_institute"
        source="main_institute"
        reference="institutes"
        linkType="show"
      >
        <TextField source="name" />
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
        label="resources.inistAccounts.fields.active"
      />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

const GeneratePassword = () => {
  document.getElementById("generatePassword").value = Math.random()
    .toString(36)
    .slice(-6);
};

const GeneratePasswordButton = () => {
  return (
    <span>
      <TextInput
        id="generatePassword"
        source="password"
        label="resources.inistAccounts.fields.password"
      />
      <Button variant="contained" onClick={GeneratePassword}>
        Générer
      </Button>
    </span>
  );
};

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
      <GeneratePasswordButton />
      <TextInput source="name" label="resources.inistAccounts.fields.name" />
      <TextInput
        source="firstname"
        label="resources.inistAccounts.fields.firstname"
      />
      <TextInput
        type="email"
        source="mail"
        label="resources.inistAccounts.fields.mail"
      />

      <TextInput source="phone" label="resources.inistAccounts.fields.phone" />

      <TextInput source="dr" label="resources.inistAccounts.fields.dr" />

      <ReferenceInput
        label="resources.inistAccounts.fields.main_institute"
        source="main_institute"
        reference="institutes"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.institutes"
        source="institutes"
        reference="institutes"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceInput
        label="resources.inistAccounts.fields.main_unit"
        source="main_unit"
        reference="units"
      >
        <SelectInput optionText="code" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.units"
        source="units"
        reference="units"
      >
        <SelectArrayInput optionText="code" />
      </ReferenceArrayInput>

      <ReferenceArrayField
        label="resources.inistAccounts.fields.all_communities"
        source="all_communities"
        reference="communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.communities"
        source="communities"
        reference="communities"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

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
        label="resources.inistAccounts.fields.active"
      />
      <LongTextInput
        source="comment"
        label="resources.inistAccounts.fields.comment"
      />
    </SimpleForm>
  </Edit>
);

export const InistCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput
        source="username"
        label="resources.inistAccounts.fields.username"
      />

      <GeneratePasswordButton />
      <TextInput
        source="firstname"
        label="resources.inistAccounts.fields.firstname"
      />
      <TextInput
        type="email"
        source="mail"
        label="resources.inistAccounts.fields.mail"
      />

      <TextInput source="phone" label="resources.inistAccounts.fields.phone" />

      <TextInput source="dr" label="resources.inistAccounts.fields.dr" />

      <ReferenceInput
        label="resources.inistAccounts.fields.main_institute"
        source="main_institute"
        reference="institutes"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.institutes"
        source="institutes"
        reference="institutes"
        className="tags"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceInput
        label="resources.inistAccounts.fields.main_unit"
        source="main_unit"
        reference="units"
      >
        <SelectInput optionText="code" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.units"
        source="units"
        reference="units"
        className="tags"
      >
        <SelectArrayInput optionText="code" />
      </ReferenceArrayInput>

      <ReferenceArrayField
        label="resources.inistAccounts.fields.all_communities"
        source="all_communities"
        reference="communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.communities"
        source="communities"
        reference="communities"
        className="tags"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

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
        label="resources.inistAccounts.fields.active"
      />
      <LongTextInput
        source="comment"
        label="resources.inistAccounts.fields.comment"
      />
    </SimpleForm>
  </Create>
);
