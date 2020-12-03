import React, { Fragment } from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Filter,
  SimpleForm,
  BooleanField,
  TextInput,
  BooleanInput,
  FileInput,
  ImageField,
  downloadCSV,
  ExportButton,
  SaveButton,
  Toolbar,
  BulkDeleteWithConfirmButton,
  DeleteWithConfirmButton
} from "react-admin";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { renameKeys } from "../utils/utils";
import LinkEdit from "../components/LinkEdit";
import { ListActions, ListEditActions } from "../components/ListActions";
import { PostPagination } from "../utils/pagination";
import AutoCompleteInput from "../components/AutoCompleteInput";

const DatabasesFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
  </Filter>
);

const exporter = async (records, fetchRelatedRecords) => {
  const listCommunities = await fetchRelatedRecords(
    records,
    "communities",
    "communities"
  );
  const dataWithRelation = records.map(record => ({
    ...record,
    communities: record.communities.map(n => listCommunities[n].name)
  }));
  const data = dataWithRelation.map(record => renameKeys(record, "databases"));
  const csv = convertToCSV(data, {
    delimiter: ";"
  });
  downloadCSV(csv, "databases");
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

export const DatabasesList = ({ ...props }) => (
  <List
    {...props}
    filters={<DatabasesFilter />}
    sort={{ field: "name_fr", order: "ASC" }}
    perPage={10}
    pagination={<PostPagination />}
    exporter={exporter}
    bulkActionButtons={<PostBulkActionButtons />}
  >
    <Datagrid>
      <LinkEdit source="name_fr" label="resources.databases.fields.name_fr" />
      <LinkEdit source="name_en" label="resources.databases.fields.name_en" />
      <BooleanField source="active" label="resources.databases.fields.active" />
      <BooleanField
        source="oa"
        label="resources.databases.fields.open_access"
      />
      <BooleanField
        source="use_proxy"
        label="resources.databases.fields.has_proxy"
      />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
);

const DatabasesTitle = ({ record }) => {
  return record.name_fr;
};

const PostEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const DatabasesEdit = ({ ...props }) => (
  <Edit title={<DatabasesTitle />} {...props} actions={<ListEditActions />}>
    <SimpleForm toolbar={<PostEditToolbar />}>
      <TextInput source="name_fr" label="resources.databases.fields.name_fr" />
      <TextInput source="name_en" label="resources.databases.fields.name_en" />
      <TextInput source="url_fr" label="resources.databases.fields.url_fr" />
      <TextInput source="url_en" label="resources.databases.fields.url_en" />
      <TextInput
        multiline
        source="text_fr"
        label="resources.databases.fields.text_fr"
      />
      <TextInput
        multiline
        source="text_en"
        label="resources.databases.fields.text_en"
      />
      <AutoCompleteInput
        label="resources.databases.fields.communities"
        source="communities"
        reference="communities"
        isMulti={true}
      />
      <FileInput
        source="image"
        label="resources.databases.fields.image"
        placeholder={<p>Glisser déposer l&apos;image</p>}
      >
        <ImageField source="image" title="title_database" />
      </FileInput>
      <ImageField source="image" label="Image actuelle" title="current_image" />
      <BooleanInput source="active" label="resources.databases.fields.active" />
      <BooleanInput
        source="oa"
        label="resources.databases.fields.open_access"
      />
      <BooleanInput
        source="use_proxy"
        label="resources.databases.fields.use_proxy"
      />
    </SimpleForm>
  </Edit>
);

export const DatabasesCreate = ({ ...props }) => (
  <Create {...props} actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextInput source="name_fr" label="resources.databases.fields.name_fr" />
      <TextInput source="name_en" label="resources.databases.fields.name_en" />
      <TextInput source="url_fr" label="resources.databases.fields.url_fr" />
      <TextInput source="url_en" label="resources.databases.fields.url_en" />
      <TextInput
        multiline
        source="text_fr"
        label="resources.databases.fields.text_fr"
      />
      <TextInput
        multiline
        source="text_en"
        label="resources.databases.fields.text_en"
      />
      <AutoCompleteInput
        label="resources.databases.fields.communities"
        source="communities"
        reference="communities"
        isMulti={true}
      />
      <FileInput
        source="image"
        label="resources.databases.fields.image"
        placeholder={<p>Glisser déposer l&apos;image</p>}
      >
        <ImageField source="image" title="title_database" />
      </FileInput>
      <BooleanInput
        source="active"
        label="resources.databases.fields.active"
        defaultValue="true"
      />
      <BooleanInput
        source="oa"
        label="resources.databases.fields.open_access"
      />
      <BooleanInput
        source="use_proxy"
        label="resources.databases.fields.use_proxy"
        defaultValue="true"
      />
    </SimpleForm>
  </Create>
);
