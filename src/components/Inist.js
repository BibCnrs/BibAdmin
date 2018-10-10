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
  SelectArrayInput,
  AutocompleteInput
} from "react-admin";

const InistFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput
      source="like_inist_account.username"
      label="resources.inistAccounts.fields.username"
    />
    <TextInput
      source="like_inist_account.name"
      label="resources.inistAccounts.fields.name"
    />
    <TextInput
      source="like_inist_account.firstname"
      label="resources.inistAccounts.fields.firstname"
    />
    <TextInput
      type="email"
      source="like_inist_account.mail"
      label="resources.inistAccounts.fields.mail"
    />

    <ReferenceInput
      label="resources.inistAccounts.fields.main_institute"
      source="main_institute"
      reference="institutes"
      perPage={50}
      className="scollbar"
    >
      <AutocompleteInput optionText="name" />
    </ReferenceInput>

    <ReferenceArrayInput
      label="resources.inistAccounts.fields.institutes"
      source="institutes"
      reference="institutes"
      perPage={50}
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

    <ReferenceInput
      label="resources.inistAccounts.fields.main_unit"
      source="main_unit"
      reference="units"
      perPage={50}
      sort={{ field: "code", order: "ASC" }}
    >
      <AutocompleteInput optionText="code" />
    </ReferenceInput>

    <ReferenceArrayInput
      label="resources.inistAccounts.fields.units"
      source="units"
      reference="units"
      perPage={50}
    >
      <SelectArrayInput optionText="code" />
    </ReferenceArrayInput>

    <ReferenceArrayInput
      label="resources.inistAccounts.fields.communities"
      source="communities"
      reference="communities"
      perPage={50}
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

    <DateInput
      source="from_inist_account.subscription_date_before"
      label="resources.inistAccounts.fields.subscription_date_before"
    />
    <DateInput
      source="from_inist_account.subscription_date_after"
      label="resources.inistAccounts.fields.subscription_date_after"
    />
    <DateInput
      source="from_inist_account.expiration_date_before"
      label="resources.inistAccounts.fields.expiration_date_before"
    />
    <DateInput
      source="from_inist_account.expiration_date_date_after"
      label="resources.inistAccounts.fields.expiration_date_after"
    />

    <BooleanInput
      source="active"
      label="resources.inistAccounts.fields.active"
    />
  </Filter>
);

export const InistList = ({ ...props }) => (
  <List {...props} filters={<InistFilter />} perPage={50}>
    <Datagrid>
      <ReferenceField
        label="resources.inistAccounts.fields.username"
        source="id"
        reference="inistAccounts"
      >
        <TextField source="username" />
      </ReferenceField>

      <ReferenceField
        label="resources.inistAccounts.fields.password"
        source="id"
        reference="inistAccounts"
      >
        <TextField source="password" />
      </ReferenceField>

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
        allowEmpty={true}
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
        allowEmpty={true}
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
        label="resources.inistAccounts.fields.all_communities"
        reference="communities"
        source="all_communities"
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

const passwordValue = Math.random()
  .toString(36)
  .slice(-6);

const GeneratePasswordButton = () => {
  return (
    <span>
      <TextInput
        type="password"
        id="passwordInput"
        source="password"
        label="resources.inistAccounts.fields.password"
        defaultValue={passwordValue}
      />
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
        sort={{ field: "name" }}
        perPage={50}
      >
        <AutocompleteInput className="scrollbar" optionText="name" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.institutes"
        source="institutes"
        reference="institutes"
        sort={{ field: "name" }}
        perPage={50}
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceInput
        label="resources.inistAccounts.fields.main_unit"
        source="main_unit"
        reference="units"
        sort={{ field: "code" }}
        perPage={50}
      >
        <AutocompleteInput className="scrollbar" optionText="code" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.units"
        source="units"
        reference="units"
        sort={{ field: "code" }}
        perPage={50}
      >
        <SelectArrayInput optionText="code" />
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.communities"
        source="communities"
        reference="communities"
        perPage={50}
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceArrayField
        label="resources.inistAccounts.fields.all_communities"
        source="all_communities"
        reference="communities"
        perPage={50}
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

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
        sort={{ field: "name" }}
        perPage={50}
      >
        <AutocompleteInput className="scrollbar" optionText="name" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.institutes"
        source="institutes"
        reference="institutes"
        sort={{ field: "name" }}
        perPage={50}
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceInput
        label="resources.inistAccounts.fields.main_unit"
        source="main_unit"
        reference="units"
        sort={{ field: "code" }}
        perPage={50}
      >
        <AutocompleteInput className="scrollbar" optionText="code" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.units"
        source="units"
        reference="units"
        sort={{ field: "code" }}
        perPage={50}
      >
        <SelectArrayInput optionText="code" />
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.communities"
        source="communities"
        reference="communities"
        perPage={50}
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceArrayField
        label="resources.inistAccounts.fields.all_communities"
        source="all_communities"
        reference="communities"
        perPage={50}
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

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
