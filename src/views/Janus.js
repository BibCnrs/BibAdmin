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
  Toolbar,
  BulkDeleteWithConfirmButton,
  DeleteWithConfirmButton
} from "react-admin";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { renameKeys } from "../utils/utils";
import { FrenchDateInput } from "../components/FrenchDateInput";
import LinkEdit from "../components/LinkEdit";
import { ListActions, ListEditActions } from "../components/ListActions";
import { PostPagination } from "../utils/pagination";
import AutoCompleteInput from "../components/AutoCompleteInput";

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

    <AutoCompleteInput
      label="resources.janusAccounts.fields.primary_institute"
      source="primary_institute"
      reference="institutes"
      field="institute"
      filter="janus_account.primary_institute"
      parent={props}
    />

    <AutoCompleteInput
      label="resources.janusAccounts.fields.additional_institutes"
      source="additional_institutes"
      reference="institutes"
      field="institute"
      filter="institutes.id"
      parent={props}
    />

    <AutoCompleteInput
      label="resources.janusAccounts.fields.primary_unit"
      source="primary_unit"
      reference="units"
      field="unit"
      filter="janus_account.primary_unit"
      optionText="code"
      parent={props}
    />

    <AutoCompleteInput
      label="resources.janusAccounts.fields.additional_units"
      source="additional_units"
      reference="units"
      field="unit"
      filter="units.id"
      optionText="code"
      parent={props}
    />

    <AutoCompleteInput
      label="resources.janusAccounts.fields.communities"
      source="communities"
      reference="communities"
      filter="community.id"
      parent={props}
    />

    <FrenchDateInput
      source="to_janus_account.last_connexion"
      label="resources.janusAccounts.fields.last_connexion_before"
    />

    <FrenchDateInput
      source="from_janus_account.last_connexion"
      label="resources.janusAccounts.fields.last_connexion_after"
    />
    <FrenchDateInput
      source="to_janus_account.first_connexion"
      label="resources.janusAccounts.fields.first_connexion_before"
    />
    <FrenchDateInput
      source="from_janus_account.first_connexion"
      label="resources.janusAccounts.fields.first_connexion_after"
    />

    <BooleanInput
      source="janus_account.cnrs"
      label="resources.janusAccounts.fields.cnrs"
    />
    <BooleanInput
      source="janus_account.active"
      label="resources.janusAccounts.fields.active"
    />
  </Filter>
);

const exporter = async records => {
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
    <BulkDeleteWithConfirmButton {...props} />
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
        link="show"
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
        link="show"
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
      <DeleteWithConfirmButton />
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

      <AutoCompleteInput
        label="resources.janusAccounts.fields.primary_institute"
        source="primary_institute"
        reference="institutes"
        field="institute"
      />

      <AutoCompleteInput
        label="resources.janusAccounts.fields.additional_institutes"
        source="additional_institutes"
        reference="institutes"
        field="institute"
        isMulti={true}
      />

      <AutoCompleteInput
        label="resources.janusAccounts.fields.primary_unit"
        source="primary_unit"
        reference="units"
        field="unit"
        optionText="code"
      />

      <AutoCompleteInput
        label="resources.janusAccounts.fields.additional_units"
        source="additional_units"
        reference="units"
        field="unit"
        optionText="code"
        isMulti={true}
      />

      <AutoCompleteInput
        label="resources.janusAccounts.fields.communities"
        source="communities"
        reference="communities"
        isMulti={true}
      />

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
      <TextInput
        multiline
        source="comment"
        label="resources.janusAccounts.fields.comment"
      />
    </SimpleForm>
  </Edit>
);

export const JanusCreate = ({ ...props }) => (
  <Create {...props} redirect="list" actions={<ListActions />}>
    <SimpleForm redirect="list">
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

      <AutoCompleteInput
        label="resources.janusAccounts.fields.primary_institute"
        source="primary_institute"
        reference="institutes"
        field="institute"
      />

      <AutoCompleteInput
        label="resources.janusAccounts.fields.additional_institutes"
        source="additional_institutes"
        reference="institutes"
        field="institute"
        isMulti={true}
      />

      <AutoCompleteInput
        label="resources.janusAccounts.fields.primary_unit"
        source="primary_unit"
        reference="units"
        field="unit"
        optionText="code"
      />

      <AutoCompleteInput
        label="resources.janusAccounts.fields.additional_units"
        source="additional_units"
        reference="units"
        field="unit"
        optionText="code"
        isMulti={true}
      />

      <AutoCompleteInput
        label="resources.janusAccounts.fields.communities"
        source="communities"
        reference="communities"
        isMulti={true}
      />

      <BooleanInput
        source="active"
        label="resources.janusAccounts.fields.active"
      />
      <TextInput
        multiline
        source="comment"
        label="resources.janusAccounts.fields.comment"
      />
    </SimpleForm>
  </Create>
);
