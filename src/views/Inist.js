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
  AutocompleteInput,
  downloadCSV,
  ExportButton
} from "react-admin";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { renameKeys } from "../utils/utils";
import { DateInput } from "react-admin-date-inputs";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import RandomPasswordGenerator from "../components/RandomPasswordGenerator";
import LinkEdit from "../components/LinkEdit";
import ListActions from "../components/ListActions";
import { PostPagination } from "../utils/pagination";
import { AutoCompleteReferenceInput } from "../components/AutoCompleteReferenceInput";

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

    <AutoCompleteReferenceInput
      label="resources.inistAccounts.fields.main_institute"
      element="main_institute"
      source="main_institute"
      reference="institutes"
      field="institute"
      optionText="name"
      isFilter={true}
    />

    <AutoCompleteReferenceInput
      label="resources.inistAccounts.fields.institutes"
      element="institutes"
      source="institutes"
      reference="institutes"
      field="institute"
      optionText="name"
      isFilter={true}
    />

    <AutoCompleteReferenceInput
      label="resources.inistAccounts.fields.main_unit"
      element="main_unit"
      source="main_unit"
      reference="units"
      field="unit"
      optionText="code"
      isFilter={true}
    />

    <AutoCompleteReferenceInput
      label="resources.inistAccounts.fields.units"
      element="units"
      source="units"
      reference="units"
      field="unit"
      optionText="code"
      isFilter={true}
    />

    <AutoCompleteReferenceInput
      label="resources.inistAccounts.fields.communities"
      element="community.id"
      source="communities"
      reference="communities"
      optionText="name"
      isFilter={true}
    />

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

    <BooleanInput
      source="active"
      label="resources.inistAccounts.fields.active"
      defaultValue={true}
    />
  </Filter>
);

const exporter = async (records, fetchRelatedRecords) => {
  const listPrincipalUnit = await fetchRelatedRecords(
    records,
    "main_unit",
    "units"
  );
  const listAllCommunities = await fetchRelatedRecords(
    records,
    "all_communities",
    "communities"
  );
  const listCommunities = await fetchRelatedRecords(
    records,
    "communities",
    "communities"
  );
  const listMainCommunities = await fetchRelatedRecords(
    records,
    "main_unit_communities",
    "communities"
  );
  const listPrincipalIt = await fetchRelatedRecords(
    records,
    "main_institute",
    "institutes"
  );
  const dataWithRelation = records.map(record => ({
    ...record,
    main_unit:
      listPrincipalUnit[record.main_unit] &&
      listPrincipalUnit[record.main_unit].code,
    main_institute:
      listPrincipalIt[record.main_institute] &&
      listPrincipalIt[record.main_institute].name,
    all_communities: record.communities.map(n => listAllCommunities[n].name),
    communities: record.communities.map(n => listCommunities[n].name),
    main_unit_communities: record.communities.map(
      n => listMainCommunities[n].name
    )
  }));
  const data = dataWithRelation.map(record =>
    renameKeys(record, "inistAccounts")
  );
  const csv = convertToCSV(data, {
    delimiter: ";"
  });
  downloadCSV(csv, "inistAccounts");
};

ExportButton.defaultProps = {
  label: "ra.action.export",
  maxResults: 100000
};

export const InistList = ({ ...props }) => (
  <List
    {...props}
    filters={<InistFilter />}
    perPage={10}
    pagination={<PostPagination />}
    exporter={exporter}
  >
    <Datagrid>
      <LinkEdit
        source="username"
        label="resources.inistAccounts.fields.username"
      />
      <LinkEdit
        source="password"
        label="resources.inistAccounts.fields.password"
      />

      <LinkEdit source="name" label="resources.inistAccounts.fields.name" />
      <LinkEdit
        source="firstname"
        label="resources.inistAccounts.fields.firstname"
      />
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
      <EditButton />
      <DeleteButtonWithConfirmation />
    </Datagrid>
  </List>
);

const InistTitle = ({ record }) => {
  return record.username;
};

export const InistEdit = ({ ...props }) => (
  <Edit title={<InistTitle />} {...props} actions={<ListActions />}>
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
        label="resources.inistAccounts.fields.mail"
      />

      <TextInput source="phone" label="resources.inistAccounts.fields.phone" />

      <TextInput source="dr" label="resources.inistAccounts.fields.dr" />

      <AutoCompleteReferenceInput
        label="resources.inistAccounts.fields.main_institute"
        element="main_institute"
        source="main_institute"
        reference="institutes"
        field="institute"
        optionText="name"
      />

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.institutes"
        element="institutes"
        source="institutes"
        reference="institutes"
        sort={{ field: "name" }}
        perPage={100}
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <AutoCompleteReferenceInput
        label="resources.inistAccounts.fields.main_unit"
        element="main_unit"
        source="main_unit"
        reference="units"
        field="unit"
        optionText="code"
      />

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.units"
        element="units"
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
  <Create {...props} actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextInput
        source="username"
        label="resources.inistAccounts.fields.username"
      />
      <RandomPasswordGenerator
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
        label="resources.inistAccounts.fields.mail"
      />

      <TextInput source="phone" label="resources.inistAccounts.fields.phone" />

      <TextInput source="dr" label="resources.inistAccounts.fields.dr" />

      <AutoCompleteReferenceInput
        label="resources.inistAccounts.fields.main_institute"
        element="main_institute"
        source="main_institute"
        reference="institutes"
        field="institute"
        optionText="name"
      />

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.institutes"
        element="institutes"
        source="institutes"
        reference="institutes"
        sort={{ field: "name" }}
        perPage={100}
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <AutoCompleteReferenceInput
        label="resources.inistAccounts.fields.main_unit"
        element="main_unit"
        source="main_unit"
        reference="units"
        field="unit"
        optionText="code"
      />

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.units"
        element="units"
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
