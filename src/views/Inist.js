import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Filter,
  SimpleForm,
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  TextField,
  DateField,
  BooleanField,
  TextInput,
  LongTextInput,
  BooleanInput,
  ReferenceInput,
  ReferenceArrayInput,
  SelectArrayInput,
  AutocompleteInput
} from "react-admin";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import LinkEdit from "../components/LinkEdit";
import { DateInput } from "react-admin-date-inputs";

const InistFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput
      source="like_inist_account.username"
      label="resources.inistAccounts.fields.username"
    />
    <TextInput source="like_inist_account.name" label="resources.inistAccounts.fields.name" />
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
      perPage={100}
      className="scollbar"
    >
      <AutocompleteInput optionText="name" />
    </ReferenceInput>

    <ReferenceArrayInput
      label="resources.inistAccounts.fields.institutes"
      source="institutes"
      reference="institutes"
      perPage={100}
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

    <ReferenceInput
      label="resources.inistAccounts.fields.main_unit"
      source="like_unit.code"
      reference="units"
      perPage={100}
      sort={{ field: "code", order: "ASC" }}
    >
      <AutocompleteInput optionText="code" />
    </ReferenceInput>

    <ReferenceInput
      label="resources.inistAccounts.fields.units"
      source="units.id"
      reference="units"
      perPage={100}
    >
      <AutocompleteInput optionText="code" />
    </ReferenceInput>

    <ReferenceInput
      label="resources.inistAccounts.fields.communities"
      source="community.id"
      reference="communities"
      perPage={100}
    >
      <AutocompleteInput optionText="name" />
    </ReferenceInput>

    <DateInput
      source="to_inist_account.subscription_date"
      label="resources.inistAccounts.fields.subscription_date_before"
      options={{ format: "MM-dd-yyyy" }}
    />
    <DateInput
      source="from_inist_account.subscription_date"
      label="resources.inistAccounts.fields.subscription_date_after"
      options={{ format: "MM-dd-yyyy" }}
    />
    <DateInput
      source="to_inist_account.expiration_date"
      label="resources.inistAccounts.fields.expiration_date_before"
      options={{ format: "MM-dd-yyyy" }}
    />
    <DateInput
      source="from_inist_account.expiration_date"
      label="resources.inistAccounts.fields.expiration_date_after"
      options={{ format: "MM-dd-yyyy" }}
    />

    <BooleanInput source="active" label="resources.inistAccounts.fields.active" />
  </Filter>
);

export const InistList = ({ ...props }) => (
  <List {...props} filters={<InistFilter />} perPage={10}>
    <Datagrid>
      <LinkEdit source="username" label="resources.inistAccounts.fields.username" />
      <LinkEdit source="password" label="resources.inistAccounts.fields.password" />

      <LinkEdit source="name" label="resources.inistAccounts.fields.name" />
      <LinkEdit source="firstname" label="resources.inistAccounts.fields.firstname" />
      <LinkEdit source="mail" label="resources.inistAccounts.fields.mail" />

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
      <DateField source="expiration_date" label="resources.inistAccounts.fields.expiration_date" />
      <BooleanField source="active" label="resources.inistAccounts.fields.active" />
      <EditButton />
      <DeleteButtonWithConfirmation />
    </Datagrid>
  </List>
);

const passwordValue = Math.random()
  .toString(36)
  .slice(-6)
  .toUpperCase();

const GeneratePasswordButton = ({ ...rest }) => {
  return (
    <span>
      <TextInput type="password" id="passwordInput" defaultValue={passwordValue} {...rest} />
    </span>
  );
};

const InistTitle = ({ record }) => {
  return record.username;
};

export const InistEdit = ({ ...props }) => (
  <Edit title={<InistTitle />} {...props}>
    <SimpleForm>
      <TextInput source="username" label="resources.inistAccounts.fields.username" />
      <GeneratePasswordButton />
      <TextInput source="name" label="resources.inistAccounts.fields.name" />
      <TextInput source="firstname" label="resources.inistAccounts.fields.firstname" />
      <TextInput type="email" source="mail" label="resources.inistAccounts.fields.mail" />

      <TextInput source="phone" label="resources.inistAccounts.fields.phone" />

      <TextInput source="dr" label="resources.inistAccounts.fields.dr" />

      <ReferenceInput
        label="resources.inistAccounts.fields.main_institute"
        source="main_institute"
        reference="institutes"
        sort={{ field: "name" }}
        perPage={100}
      >
        <AutocompleteInput className="scrollbar" optionText="name" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.institutes"
        source="institutes"
        reference="institutes"
        sort={{ field: "name" }}
        perPage={100}
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceInput
        label="resources.inistAccounts.fields.main_unit"
        source="main_unit"
        reference="units"
        sort={{ field: "code" }}
        perPage={100}
      >
        <AutocompleteInput className="scrollbar" optionText="code" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.units"
        source="units"
        reference="units"
        sort={{ field: "code" }}
        perPage={100}
      >
        <SelectArrayInput optionText="code" />
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.communities"
        source="communities"
        reference="communities"
        perPage={100}
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceArrayField
        label="resources.inistAccounts.fields.all_communities"
        source="all_communities"
        reference="communities"
        perPage={100}
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <DateInput
        source="subscription_date"
        label="resources.inistAccounts.fields.subscription_date"
        options={{ format: "MM-dd-yyyy" }}
      />
      <DateInput
        source="expiration_date"
        label="resources.inistAccounts.fields.expiration_date"
        options={{ format: "MM-dd-yyyy" }}
      />
      <BooleanInput source="active" label="resources.inistAccounts.fields.active" />
      <LongTextInput source="comment" label="resources.inistAccounts.fields.comment" />
    </SimpleForm>
  </Edit>
);

export const InistCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="username" label="resources.inistAccounts.fields.username" />
      <GeneratePasswordButton source="password" label="resources.inistAccounts.fields.password" />
      <TextInput source="name" label="resources.inistAccounts.fields.name" />
      <TextInput source="firstname" label="resources.inistAccounts.fields.firstname" />
      <TextInput type="email" source="mail" label="resources.inistAccounts.fields.mail" />

      <TextInput source="phone" label="resources.inistAccounts.fields.phone" />

      <TextInput source="dr" label="resources.inistAccounts.fields.dr" />

      <ReferenceInput
        label="resources.inistAccounts.fields.main_institute"
        source="main_institute"
        reference="institutes"
        sort={{ field: "name" }}
        perPage={100}
      >
        <AutocompleteInput className="scrollbar" optionText="name" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.institutes"
        source="institutes"
        reference="institutes"
        sort={{ field: "name" }}
        perPage={100}
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceInput
        label="resources.inistAccounts.fields.main_unit"
        source="main_unit"
        reference="units"
        sort={{ field: "code" }}
        perPage={100}
      >
        <AutocompleteInput className="scrollbar" optionText="code" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.units"
        source="units"
        reference="units"
        sort={{ field: "code" }}
        perPage={100}
      >
        <SelectArrayInput optionText="code" />
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.communities"
        source="communities"
        reference="communities"
        perPage={100}
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceArrayField
        label="resources.inistAccounts.fields.all_communities"
        source="all_communities"
        reference="communities"
        perPage={100}
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <DateInput
        source="subscription_date"
        label="resources.inistAccounts.fields.subscription_date"
        options={{ format: "MM-dd-yyyy" }}
      />
      <DateInput
        source="expiration_date"
        label="resources.inistAccounts.fields.expiration_date"
        options={{ format: "MM-dd-yyyy" }}
      />
      <BooleanInput source="active" label="resources.inistAccounts.fields.active" />
      <LongTextInput source="comment" label="resources.inistAccounts.fields.comment" />
    </SimpleForm>
  </Create>
);
