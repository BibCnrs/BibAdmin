import React, { Fragment } from "react";
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
  BooleanInput,
  NullableBooleanInput,
  LongTextInput,
  ReferenceArrayInput,
  AutocompleteInput,
  SelectArrayInput,
  downloadCSV,
  ExportButton,
  SaveButton,
  Toolbar
} from "react-admin";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { renameKeys } from "../utils/utils";
import { DateInput } from "react-admin-date-inputs";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import LinkEdit from "../components/LinkEdit";
import { ListActions, ListEditActions } from "../components/ListActions";
import { PostPagination } from "../utils/pagination";
import { AutoCompleteReferenceInput } from "../components/AutoCompleteReferenceInput";

const JanusFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput
      source="like_janus_account.uid"
      label="resources.janusAccounts.fields.uid"
    />

    <TextInput
      type="email"
      source="like_janus_account.mail"
      label="resources.janusAccounts.fields.mail"
    />

    <AutoCompleteReferenceInput
      label="resources.janusAccounts.fields.primary_institute"
      element="janus_account.primary_institute"
      source="primary_institute"
      reference="institutes"
      field="institute"
      optionText="name"
      isFilter={true}
    />

    <AutoCompleteReferenceInput
      label="resources.janusAccounts.fields.additional_institutes"
      element="janus_account.additional_institutes"
      source="additional_institutes"
      reference="institutes"
      field="institute"
      optionText="name"
      isFilter={true}
    />

    <AutoCompleteReferenceInput
      label="resources.janusAccounts.fields.primary_unit"
      element="janus_account.primary_unit"
      source="primary_unit"
      reference="units"
      field="unit"
      optionText="code"
      isFilter={true}
    />

    <AutoCompleteReferenceInput
      label="resources.janusAccounts.fields.additional_units"
      element="janus_account.additional_units"
      source="additional_units"
      reference="units"
      field="unit"
      optionText="code"
      isFilter={true}
    />

    <AutoCompleteReferenceInput
      label="resources.janusAccounts.fields.communities"
      element="community.id"
      source="communities"
      reference="communities"
      field="communities"
      optionText="name"
      isFilter={true}
    />

    <DateInput
      source="to_janus_account.last_connexion"
      label="resources.janusAccounts.fields.last_connexion_before"
      options={{ format: "MM-dd-yyyy" }}
    />

    <DateInput
      source="from_janus_account.last_connexion"
      label="resources.janusAccounts.fields.last_connexion_after"
      options={{ format: "MM-dd-yyyy" }}
    />
    <DateInput
      source="to_janus_account.first_connexion"
      label="resources.janusAccounts.fields.first_connexion_before"
      options={{ format: "MM-dd-yyyy" }}
    />
    <DateInput
      source="from_janus_account.first_connexion"
      label="resources.janusAccounts.fields.first_connexion_after"
      options={{ format: "MM-dd-yyyy" }}
    />

    <BooleanInput
      source="janus_account.cnrs"
      label="resources.janusAccounts.fields.cnrs"
    />
    <BooleanInput
      source="janus_account"
      label="resources.janusAccounts.fields.active"
      defaultValue
    />
  </Filter>
);

const exporter = async (records, fetchRelatedRecords) => {
  const data = records.map(record => renameKeys(record, "janusAccounts"));
  const csv = convertToCSV(data, {
    delimiter: ";"
  });
  downloadCSV(csv, "janusAccounts");
};

ExportButton.defaultProps = {
  label: "ra.action.export",
  maxResults: 100000
};

const PostBulkActionButtons = props => (
  <Fragment>
    <DeleteButtonWithConfirmation label="Supprimer" {...props} />
  </Fragment>
);

export const JanusList = props => (
  <List
    {...props}
    filters={<JanusFilter />}
    perPage={10}
    pagination={<PostPagination />}
    exporter={exporter}
    bulkActionButtons={<PostBulkActionButtons />}
  >
    <Datagrid>
      <LinkEdit source="uid" label="resources.janusAccounts.fields.uid" />
      <LinkEdit source="mail" label="resources.janusAccounts.fields.mail" />

      <ReferenceField
        label="resources.janusAccounts.fields.primary_institute"
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
        source="active"
        label="resources.janusAccounts.fields.active"
      />
      <EditButton />
      <DeleteButtonWithConfirmation />
    </Datagrid>
  </List>
);

const JanusTitle = ({ record }) => {
  return record.uid;
};

const PostEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const JanusEdit = ({ ...props }) => (
  <Edit title={<JanusTitle />} {...props} actions={<ListEditActions />}>
    <SimpleForm toolbar={<PostEditToolbar />}>
      <TextField source="uid" label="resources.janusAccounts.fields.uid" />
      <BooleanField source="cnrs" label="resources.janusAccounts.fields.cnrs" />

      <TextInput source="name" label="resources.janusAccounts.fields.name" />

      <TextInput
        source="firstname"
        label="resources.janusAccounts.fields.firstname"
      />

      <TextInput
        type="email"
        source="mail"
        label="resources.janusAccounts.fields.mail"
      />

      <AutoCompleteReferenceInput
        label="resources.janusAccounts.fields.primary_institute"
        element="primary_institute"
        source="primary_institute"
        reference="institutes"
        field="institutes"
        optionText="code"
      />

      <ReferenceArrayInput
        label="resources.janusAccounts.fields.additional_institutes"
        reference="institutes"
        source="additional_institutes"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <AutoCompleteReferenceInput
        label="resources.janusAccounts.fields.primary_unit"
        element="primary_unit"
        source="primary_unit"
        reference="units"
        field="unit"
        optionText="code"
      />

      <ReferenceArrayInput
        label="resources.janusAccounts.fields.additional_units"
        reference="units"
        source="additional_units"
      >
        <SelectArrayInput optionText="code" />
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="resources.janusAccounts.fields.communities"
        reference="communities"
        source="communities"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceArrayField
        label="resources.janusAccounts.fields.all_communities"
        reference="communities"
        source="all_communities"
        className="tags"
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
      <BooleanInput
        source="active"
        label="resources.janusAccounts.fields.active"
      />
      <LongTextInput
        source="comment"
        label="resources.janusAccounts.fields.comment"
      />
    </SimpleForm>
  </Edit>
);

export const JanusCreate = ({ ...props }) => (
  <Create {...props} redirect="list" actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextField source="uid" label="resources.janusAccounts.fields.uid" />
      <BooleanField source="cnrs" label="resources.janusAccounts.fields.cnrs" />

      <TextInput source="name" label="resources.janusAccounts.fields.name" />

      <TextInput
        source="firstname"
        label="resources.janusAccounts.fields.firstname"
      />

      <TextInput
        type="email"
        source="mail"
        label="resources.janusAccounts.fields.mail"
      />

      <AutoCompleteReferenceInput
        label="resources.janusAccounts.fields.primary_institute"
        element="primary_institute"
        source="primary_institute"
        reference="institutes"
        field="institutes"
        optionText="code"
      />

      <ReferenceArrayInput
        label="resources.janusAccounts.fields.additional_institutes"
        reference="institutes"
        source="additional_institutes"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <AutoCompleteReferenceInput
        label="resources.janusAccounts.fields.primary_unit"
        element="primary_unit"
        source="primary_unit"
        reference="units"
        field="unit"
        optionText="code"
      />

      <ReferenceArrayInput
        label="resources.janusAccounts.fields.additional_units"
        reference="units"
        source="additional_units"
      >
        <SelectArrayInput optionText="code" />
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="resources.janusAccounts.fields.communities"
        reference="communities"
        source="communities"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceArrayField
        label="resources.janusAccounts.fields.all_communities"
        reference="communities"
        source="all_communities"
        className="tags"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <BooleanInput
        source="active"
        label="resources.janusAccounts.fields.active"
      />
      <LongTextInput
        source="comment"
        label="resources.janusAccounts.fields.comment"
      />
    </SimpleForm>
  </Create>
);
