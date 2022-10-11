import {
  AutocompleteInput,
  ChipField,
  Datagrid,
  DeleteWithConfirmButton,
  downloadCSV,
  EditButton,
  List,
  RaRecord,
  ReferenceArrayField,
  ReferenceInput,
  SingleFieldList,
  TextInput,
} from "react-admin";
import jsonExport from "jsonexport/dist";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { renameKeys } from "../utils/renameKeys";

const InstitutesFilter = [
  <TextInput label="Rechercher" source="match" alwaysOn />,
  <TextInput source="id" label="resources.institutes.fields.id" />,
  <TextInput
    source="like_institute.code"
    label="resources.institutes.fields.code"
  />,
  <TextInput
    source="like_institute.name"
    label="resources.institutes.fields.name"
  />,
  <ReferenceInput
    label="resources.institutes.fields.communities"
    source="community.id"
    reference="communities"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ like_name: searchText })}
      optionText="name"
      label="resources.institutes.fields.communities"
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
  const listCommunities = await fetchRelatedRecords(
    records,
    "communities",
    "communities"
  );
  const dataWithRelation = records.map((record) => ({
    ...record,
    communities: record.communities.map((n: number) => listCommunities[n].name),
  }));
  const data = dataWithRelation.map((record) =>
    renameKeys(record, "institutes")
  );
  jsonExport(data, (err, csv) => {
    downloadCSV(csv, "institutes");
  });
};

const InstitutesList = () => (
  <List
    filters={InstitutesFilter}
    perPage={10}
    pagination={<CustomPagination />}
    exporter={exporter}
    bulkActionButtons={<BulkActionButtons />}
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
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
);

export default InstitutesList;
