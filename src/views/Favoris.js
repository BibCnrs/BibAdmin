import React from "react";
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
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceArrayField,
  ReferenceInput,
  AutocompleteInput,
  ChipField,
  downloadCSV,
  ExportButton
} from "react-admin";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { renameKeys } from "../utils/utils";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import LinkEdit from "../components/LinkEdit";
import ListActions from "../components/ListActions";
import { PostPagination } from "../utils/pagination";
import { AutoCompleteReferenceInput } from "../components/AutoCompleteReferenceInput";

const FavorisFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />

    <TextInput
      label="resources.revues.fields.title"
      source="like_revue.title"
    />

    <AutoCompleteReferenceInput
      label="resources.revues.fields.communities"
      element="community_id"
      source="community_id"
      reference="communities"
      optionText="name"
      isFilter={true}
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

export const FavorisList = ({ ...props }) => (
  <List
    {...props}
    filters={<FavorisFilter />}
    perPage={10}
    pagination={<PostPagination />}
    sort={{ field: "title" }}
    exporter={exporter}
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

export const FavorisEdit = ({ ...props }) => (
  <Edit title={<FavorisTitle />} {...props} actions={<ListActions />}>
    <SimpleForm>
      <TextInput source="title" label="resources.revues.fields.title" />
      <TextInput source="url" label="resources.revues.fields.url" />

      <ReferenceArrayInput
        label="resources.revues.fields.communities"
        reference="communities"
        source="communities"
        perPage={100}
      >
        <SelectArrayInput>
          <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export const FavorisCreate = ({ ...props }) => (
  <Create {...props} actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextInput source="title" label="resources.revues.fields.title" />
      <TextInput source="url" label="resources.revues.fields.url" />

      <ReferenceArrayInput
        label="resources.revues.fields.communities"
        reference="communities"
        source="communities"
        perPage={100}
      >
        <SelectArrayInput>
          <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);
