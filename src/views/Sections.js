import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Filter,
  SimpleForm,
  TextInput,
  LongTextInput,
  ReferenceArrayInput,
  SelectArrayInput,
  downloadCSV,
  ExportButton
} from "react-admin";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { renameKeys } from "../utils/utils";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import LinkEdit from "../components/LinkEdit";
import ListActions from "../components/ListActions";
import { PostPagination } from "../utils/pagination";

const SectionsFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput source="name" label="resources.section_cn.fields.name" />
    <TextInput source="code" label="resources.section_cn.fields.code" />
    <LongTextInput
      source="comment"
      label="resources.section_cn.fields.comment"
    />
    <ReferenceArrayInput
      label="resources.section_cn.fields.primary_institutes"
      source="primary_institutes"
      reference="institutes"
      className="tags"
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>
    <ReferenceArrayInput
      label="resources.section_cn.fields.secondary_institutes"
      source="secondary_institutes"
      reference="institutes"
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>
  </Filter>
);

const exporter = async (records, fetchRelatedRecords) => {
  console.log(records[0]);
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

export const SectionsList = ({ ...props }) => (
  <List
    {...props}
    filters={<SectionsFilter />}
    perPage={10}
    pagination={<PostPagination />}
    exporter={exporter}
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

export const SectionsEdit = ({ ...props }) => (
  <Edit title={<SectionsTitle />} {...props} actions={<ListActions />}>
    <SimpleForm>
      <TextInput source="name" label="resources.section_cn.fields.name" />
      <TextInput source="code" label="resources.section_cn.fields.code" />
      <LongTextInput
        source="comment"
        label="resources.section_cn.fields.comment"
      />
      <ReferenceArrayInput
        label="resources.section_cn.fields.primary_institutes"
        source="primary_institutes"
        reference="institutes"
        className="tags"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="resources.section_cn.fields.secondary_institutes"
        source="secondary_institutes"
        reference="institutes"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export const SectionsCreate = ({ ...props }) => (
  <Create {...props} actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextInput source="name" label="resources.section_cn.fields.name" />
      <TextInput source="code" label="resources.section_cn.fields.code" />
      <LongTextInput
        source="comment"
        label="resources.section_cn.fields.comment"
      />
      <ReferenceArrayInput
        label="resources.section_cn.fields.primary_institutes"
        source="primary_institutes"
        reference="institutes"
        className="tags"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="resources.section_cn.fields.secondary_institutes"
        source="secondary_institutes"
        reference="institutes"
        className="tags"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);
