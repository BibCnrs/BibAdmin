import React, { Fragment } from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Filter,
  SimpleForm,
  TextInput,
  downloadCSV,
  ExportButton,
  SaveButton,
  Toolbar
} from "react-admin";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { renameKeys } from "../utils/utils";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import LinkEdit from "../components/LinkEdit";
import { ListActions, ListEditActions } from "../components/ListActions";
import { PostPagination } from "../utils/pagination";
import AutoCompleteInput from "../components/AutoCompleteInput";

const SectionsFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput
      source="like_section_cn.name"
      label="resources.section_cn.fields.name"
    />
    <TextInput source="code" label="resources.section_cn.fields.code" />
    <TextInput source="comment" label="resources.section_cn.fields.comment" />
    <AutoCompleteInput
      label="resources.section_cn.fields.primary_institutes"
      source="primary_institutes"
      reference="institutes"
      field="institute"
      filter="primary_institute.institute_id"
    />
    <AutoCompleteInput
      label="resources.section_cn.fields.secondary_institutes"
      source="secondary_institutes"
      reference="institutes"
      field="institute"
      filter="secondary_institute.institute_id"
    />
  </Filter>
);

const exporter = async (records, fetchRelatedRecords) => {
  const listPrincipalUnit = await fetchRelatedRecords(
    records,
    "primary_institutes",
    "institutes"
  );
  const listSecondaryUnit = await fetchRelatedRecords(
    records,
    "secondary_institutes",
    "institutes"
  );
  const dataWithRelation = records.map(record => ({
    ...record,
    primary_institutes: record.primary_institutes.map(
      n => listPrincipalUnit[n].name
    ),
    secondary_institutes: record.secondary_institutes.map(
      n => listSecondaryUnit[n].name
    )
  }));
  const data = dataWithRelation.map(record => renameKeys(record, "section_cn"));
  const csv = convertToCSV(data, {
    delimiter: ";"
  });
  downloadCSV(csv, "section_cn");
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

export const SectionsList = ({ ...props }) => (
  <List
    {...props}
    filters={<SectionsFilter />}
    perPage={10}
    pagination={<PostPagination />}
    exporter={exporter}
    bulkActionButtons={<PostBulkActionButtons />}
  >
    <Datagrid>
      <LinkEdit label="resources.section_cn.fields.name" source="name" />
      <LinkEdit label="resources.section_cn.fields.code" source="code" />
      <EditButton />
      <DeleteButtonWithConfirmation />
    </Datagrid>
  </List>
);

const SectionsTitle = ({ record }) => {
  return record.name;
};

const PostEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const SectionsEdit = ({ ...props }) => (
  <Edit title={<SectionsTitle />} {...props} actions={<ListEditActions />}>
    <SimpleForm toolbar={<PostEditToolbar />}>
      <TextInput source="name" label="resources.section_cn.fields.name" />
      <TextInput source="code" label="resources.section_cn.fields.code" />
      <TextInput source="comment" label="resources.section_cn.fields.comment" />
      <AutoCompleteInput
        label="resources.section_cn.fields.primary_institutes"
        source="primary_institutes"
        reference="institutes"
        field="institute"
      />
      <AutoCompleteInput
        label="resources.section_cn.fields.secondary_institutes"
        source="secondary_institutes"
        reference="institutes"
        field="institute"
        isMulti={true}
      />
    </SimpleForm>
  </Edit>
);

export const SectionsCreate = ({ ...props }) => (
  <Create {...props} actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextInput source="name" label="resources.section_cn.fields.name" />
      <TextInput source="code" label="resources.section_cn.fields.code" />
      <TextInput source="comment" label="resources.section_cn.fields.comment" />
      <AutoCompleteInput
        label="resources.section_cn.fields.primary_institutes"
        source="primary_institutes"
        reference="institutes"
        field="institute"
      />
      <AutoCompleteInput
        label="resources.section_cn.fields.secondary_institutes"
        source="secondary_institutes"
        reference="institutes"
        field="institute"
        isMulti={true}
      />
    </SimpleForm>
  </Create>
);
