import React, { Fragment } from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Filter,
  SimpleForm,
  SingleFieldList,
  TextInput,
  ReferenceArrayField,
  ChipField,
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

const FavorisFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />

    <TextInput
      label="resources.revues.fields.title"
      source="like_revue.title"
    />

    <AutoCompleteInput
      label="resources.revues.fields.communities"
      source="communities"
      reference="communities"
      filter="community_id"
    />
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
  const data = dataWithRelation.map(record => renameKeys(record, "revues"));
  const csv = convertToCSV(data, {
    delimiter: ";"
  });
  downloadCSV(csv, "revues");
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

export const FavorisList = ({ ...props }) => (
  <List
    {...props}
    filters={<FavorisFilter />}
    perPage={10}
    pagination={<PostPagination />}
    sort={{ field: "title" }}
    exporter={exporter}
    bulkActionButtons={<PostBulkActionButtons />}
  >
    <Datagrid>
      <LinkEdit source="title" label="resources.revues.fields.title" />

      <ReferenceArrayField
        label="resources.revues.fields.communities"
        reference="communities"
        source="communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <EditButton />
      <DeleteButtonWithConfirmation />
    </Datagrid>
  </List>
);

const FavorisTitle = ({ record }) => {
  return record.title;
};

const PostEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const FavorisEdit = ({ ...props }) => (
  <Edit title={<FavorisTitle />} {...props} actions={<ListEditActions />}>
    <SimpleForm toolbar={<PostEditToolbar />}>
      <TextInput source="title" label="resources.revues.fields.title" />
      <TextInput source="url" label="resources.revues.fields.url" />

      <AutoCompleteInput
        label="resources.revues.fields.communities"
        source="communities"
        reference="communities"
        isMulti={true}
      />
    </SimpleForm>
  </Edit>
);

export const FavorisCreate = ({ ...props }) => (
  <Create {...props} actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextInput source="title" label="resources.revues.fields.title" />
      <TextInput source="url" label="resources.revues.fields.url" />

      <AutoCompleteInput
        label="resources.revues.fields.communities"
        source="communities"
        reference="communities"
        isMulti={true}
      />
    </SimpleForm>
  </Create>
);
