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
  downloadCSV,
  ExportButton,
  SaveButton,
  Toolbar
} from "react-admin";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { renameKeys } from "../utils/utils";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import RandomPasswordGenerator from "../components/RandomPasswordGenerator";
import LinkEdit from "../components/LinkEdit";
import { ListActions, ListEditActions } from "../components/ListActions";
import { PostPagination } from "../utils/pagination";
import { FrenchDateInput } from "../components/FrenchDateInput";
import AutoCompleteInput from "../components/AutoCompleteInput";

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

    <AutoCompleteInput
      label="resources.inistAccounts.fields.main_institute"
      source="main_institute"
      reference="institutes"
      field="institute"
      filter="main_institute"
      parent={props}
    />

    <AutoCompleteInput
      label="resources.inistAccounts.fields.institutes"
      source="institutes"
      reference="institutes"
      field="institute"
      filter="institutes.id"
      parent={props}
    />

    <AutoCompleteInput
      label="resources.inistAccounts.fields.main_unit"
      source="main_unit"
      reference="units"
      field="unit"
      filter="main_unit"
      optionText="code"
      parent={props}
    />

    <AutoCompleteInput
      label="resources.inistAccounts.fields.units"
      source="units"
      reference="units"
      field="unit"
      filter="units.id"
      optionText="code"
      parent={props}
    />

    <AutoCompleteInput
      label="resources.inistAccounts.fields.communities"
      source="communities"
      reference="communities"
      filter="community.id"
      parent={props}
    />

    <FrenchDateInput
      source="to_inist_account.subscription_date"
      label="resources.inistAccounts.fields.subscription_date_before"
    />
    <FrenchDateInput
      source="from_inist_account.subscription_date"
      label="resources.inistAccounts.fields.subscription_date_after"
    />
    <FrenchDateInput
      source="to_inist_account.expiration_date"
      label="resources.inistAccounts.fields.expiration_date_before"
    />
    <FrenchDateInput
      source="from_inist_account.expiration_date"
      label="resources.inistAccounts.fields.expiration_date_after"
    />
    <FrenchDateInput
      source="to_inist_account.last_connexion"
      label="resources.inistAccounts.fields.last_connexion_before"
    />
    <FrenchDateInput
      source="from_inist_account.last_connexion"
      label="resources.inistAccounts.fields.last_connexion_after"
    />
    <BooleanInput
      source="active"
      label="resources.inistAccounts.fields.active"
      defaultValue={true}
    />
  </Filter>
);

const exporter = async records => {
  const data = records.map(record => renameKeys(record, "inistAccounts"));
  const csv = convertToCSV(data, {
    delimiter: ";"
  });
  downloadCSV(csv, "inistAccounts");
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

export const InistList = ({ ...props }) => (
  <List
    {...props}
    filters={<InistFilter />}
    perPage={10}
    pagination={<PostPagination />}
    exporter={exporter}
    bulkActionButtons={<PostBulkActionButtons />}
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
        link="show"
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
        link="show"
        allowEmpty={true}
      >
        <TextField source="code" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.inistAccounts.fields.all_communities"
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
      <DateField
        source="last_connexion"
        label="resources.inistAccounts.fields.last_connexion"
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

const PostEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const InistEdit = ({ ...props }) => (
  <Edit title={<InistTitle />} {...props} actions={<ListEditActions />}>
    <SimpleForm toolbar={<PostEditToolbar />}>
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

      <AutoCompleteInput
        label="resources.inistAccounts.fields.main_institute"
        source="main_institute"
        reference="institutes"
        field="institute"
      />

      <AutoCompleteInput
        label="resources.inistAccounts.fields.institutes"
        source="institutes"
        reference="institutes"
        field="institute"
        isMulti={true}
      />

      <AutoCompleteInput
        label="resources.inistAccounts.fields.main_unit"
        source="main_unit"
        reference="units"
        field="unit"
        optionText="code"
      />

      <AutoCompleteInput
        label="resources.inistAccounts.fields.units"
        source="units"
        reference="units"
        field="unit"
        optionText="code"
        isMulti={true}
      />

      <AutoCompleteInput
        label="resources.inistAccounts.fields.communities"
        source="communities"
        reference="communities"
        isMulti={true}
      />

      <ReferenceArrayField
        label="resources.inistAccounts.fields.all_communities"
        source="communities"
        reference="communities"
        perPage={100}
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <FrenchDateInput
        source="subscription_date"
        label="resources.inistAccounts.fields.subscription_date"
      />
      <FrenchDateInput
        source="expiration_date"
        label="resources.inistAccounts.fields.expiration_date"
      />
      <DateField
        source="last_connexion"
        label="resources.inistAccounts.fields.last_connexion"
      />
      <BooleanInput
        source="active"
        label="resources.inistAccounts.fields.active"
      />
      <TextInput
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

      <AutoCompleteInput
        label="resources.inistAccounts.fields.main_institute"
        source="main_institute"
        reference="institutes"
        field="institute"
      />

      <AutoCompleteInput
        label="resources.inistAccounts.fields.institutes"
        source="institutes"
        reference="institutes"
        field="institute"
        isMulti={true}
      />

      <AutoCompleteInput
        label="resources.inistAccounts.fields.main_unit"
        source="main_unit"
        reference="units"
        field="unit"
        optionText="code"
      />

      <AutoCompleteInput
        label="resources.inistAccounts.fields.units"
        source="units"
        reference="units"
        field="unit"
        optionText="code"
        isMulti={true}
      />

      <AutoCompleteInput
        label="resources.inistAccounts.fields.communities"
        source="communities"
        reference="communities"
        isMulti={true}
      />

      <FrenchDateInput
        source="subscription_date"
        label="resources.inistAccounts.fields.subscription_date"
      />
      <FrenchDateInput
        source="expiration_date"
        label="resources.inistAccounts.fields.expiration_date"
      />
      <BooleanInput
        source="active"
        label="resources.inistAccounts.fields.active"
      />
      <TextInput
        source="comment"
        label="resources.inistAccounts.fields.comment"
      />
    </SimpleForm>
  </Create>
);
