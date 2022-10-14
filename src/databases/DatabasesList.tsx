import {
  BooleanField,
  Datagrid,
  DeleteWithConfirmButton,
  downloadCSV,
  EditButton,
  List,
  RaRecord,
  TextInput,
} from "react-admin";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { renameKeys } from "../utils/renameKeys";
import jsonExport from "jsonexport/dist";
import { ListActions } from "../components/Actions";

const DatabasesFilter = [
  <TextInput label="Rechercher" source="match" alwaysOn />,
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
    renameKeys(record, "databases")
  );
  jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
    downloadCSV(csv, "databases");
  });
};

const DatabasesList = () => (
  <List
    filters={DatabasesFilter}
    sort={{ field: "name_fr", order: "ASC" }}
    perPage={10}
    pagination={<CustomPagination />}
    exporter={exporter}
    bulkActionButtons={<BulkActionButtons />}
    actions={<ListActions />}
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

export default DatabasesList;
