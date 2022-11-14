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
import { ListActions } from "../components/Actions";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { renameKeys } from "../utils/renameKeys";
import jsonExport from "jsonexport/dist";

const FavorisFilter = [
  <TextInput label="Rechercher" source="match" alwaysOn />,
  <TextInput label="resources.revues.fields.title" source="title" />,
  <ReferenceInput
    label="resources.revues.fields.communities"
    source="community_id"
    reference="communities"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ name: searchText })}
      optionText="name"
      label="resources.revues.fields.communities"
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
  const data = dataWithRelation.map((record) => renameKeys(record, "revues"));
  jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
    downloadCSV(csv, "revues");
  });
};

const FavorisList = () => (
  <List
    filters={FavorisFilter}
    perPage={10}
    pagination={<CustomPagination />}
    sort={{ field: "title", order: "ASC" }}
    exporter={exporter}
    bulkActionButtons={<BulkActionButtons />}
    actions={<ListActions />}
  >
    <Datagrid>
      <LinkEdit source="title" label="resources.revues.fields.title" />

      <ReferenceArrayField
        label="resources.revues.fields.communities"
        reference="communities"
        source="communities"
        sortable={false}
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

export default FavorisList;
