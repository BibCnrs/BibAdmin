import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Filter,
  SimpleForm,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceInput,
  downloadCSV
} from "react-admin";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { renameKeys } from "../utils/utils";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import LinkEdit from "../components/LinkEdit";
import ListActions from "../components/ListActions";
import { AutoCompleteReferenceInput } from "../components/AutoCompleteReferenceInput";
import { PostPagination } from "../utils/pagination";

const InstitutsFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput source="id" label="resources.institutes.fields.id" />
    <TextInput
      source="like_institute.code"
      label="resources.institutes.fields.code"
    />
    <TextInput
      source="like_institute.name"
      label="resources.institutes.fields.name"
    />
    <ReferenceInput
      label="resources.institutes.fields.communities"
      source="community.id"
      reference="communities"
      perPage={100}
    >
      <AutoCompleteReferenceInput />
    </ReferenceInput>
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
  const data = dataWithRelation.map(record => renameKeys(record, "institutes"));
  const csv = convertToCSV(data, {
    delimiter: ";"
  });
  downloadCSV(csv, "institutes");
};

export const InstitutsList = ({ ...props }) => (
  <List
    {...props}
    filters={<InstitutsFilter />}
    perPage={10}
    pagination={<PostPagination />}
    exporter={exporter}
  >
    <Datagrid>
      <LinkEdit source="id" label="resources.institutes.fields.id" />
      <LinkEdit label="resources.institutes.fields.code" source="code" />
      <LinkEdit source="name" label="resources.institutes.fields.name" />
      <ReferenceArrayField
        label="resources.institutes.fields.communities"
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

const InstitutsTitle = ({ record }) => {
  return record.name;
};

export const InstitutsEdit = ({ ...props }) => (
  <Edit title={<InstitutsTitle />} {...props} actions={<ListActions />}>
    <SimpleForm>
      <TextInput source="id" label="resources.institutes.fields.id" />
      <TextInput source="code" label="resources.institutes.fields.code" />
      <TextInput source="name" label="resources.institutes.fields.name" />
      <ReferenceArrayInput
        label="resources.institutes.fields.communities"
        reference="communities"
        source="communities"
        className="tags"
      >
        <SelectArrayInput source="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export const InstitutsCreate = ({ ...props }) => (
  <Create {...props} actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextInput source="id" label="resources.institutes.fields.id" />
      <TextInput source="code" label="resources.institutes.fields.code" />
      <TextInput source="name" label="resources.institutes.fields.name" />
      <ReferenceArrayInput
        label="resources.institutes.fields.communities"
        reference="communities"
        source="communities"
        className="tags"
      >
        <SelectArrayInput source="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);
