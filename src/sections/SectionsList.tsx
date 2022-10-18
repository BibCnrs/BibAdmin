import {
  AutocompleteInput,
  Datagrid,
  DeleteWithConfirmButton,
  downloadCSV,
  EditButton,
  List,
  RaRecord,
  ReferenceInput,
  TextInput,
} from "react-admin";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { renameKeys } from "../utils/renameKeys";
import jsonExport from "jsonexport/dist";
import { ListActions } from "../components/Actions";

const SectionsFilter = [
  <TextInput label="Rechercher" source="match" alwaysOn />,
  <TextInput
    source="section_cn.name"
    label="resources.section_cn.fields.name"
  />,
  <TextInput source="code" label="resources.section_cn.fields.code" />,
  <TextInput source="comment" label="resources.section_cn.fields.comment" />,
  <ReferenceInput
    label="resources.section_cn.fields.primary_institutes"
    source="section_cn_primary_institute.institute_id"
    reference="institutes"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ name: searchText })}
      optionText="name"
      label="resources.section_cn.fields.primary_institutes"
    />
  </ReferenceInput>,
  <ReferenceInput
    label="resources.section_cn.fields.secondary_institutes"
    source="section_cn_secondary_institute.institute_id"
    reference="institutes"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ name: searchText })}
      optionText="name"
      label="resources.section_cn.fields.secondary_institutes"
    />
  </ReferenceInput>,
];

const exporter = async (
  records: RaRecord[],
  fetchRelatedRecords: (
    data: any,
    field: string,
    resource: string
  ) => Promise<any>
) => {
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
  const dataWithRelation = records.map((record) => ({
    ...record,
    primary_institutes: record.primary_institutes.map(
      (n: number) => listPrincipalUnit[n].name
    ),
    secondary_institutes: record.secondary_institutes.map(
      (n: number) => listSecondaryUnit[n].name
    ),
  }));
  const data = dataWithRelation.map((record) =>
    renameKeys(record, "section_cn")
  );
  jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
    downloadCSV(csv, "section_cn");
  });
};

const SectionsList = () => (
  <List
    filters={SectionsFilter}
    perPage={10}
    pagination={<CustomPagination />}
    exporter={exporter}
    bulkActionButtons={<BulkActionButtons />}
    actions={<ListActions />}
  >
    <Datagrid>
      <LinkEdit label="resources.section_cn.fields.name" source="name" />
      <LinkEdit label="resources.section_cn.fields.code" source="code" />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
);

export default SectionsList;
