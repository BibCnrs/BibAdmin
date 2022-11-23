import {
  AutocompleteInput,
  BooleanField,
  BooleanInput,
  ChipField,
  Datagrid,
  DeleteWithConfirmButton,
  downloadCSV,
  EditButton,
  FieldProps,
  List,
  RaRecord,
  ReferenceArrayField,
  ReferenceField,
  ReferenceInput,
  SingleFieldList,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";
import { ListActions } from "../components/Actions";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { Link } from "react-router-dom";
import { renameKeys } from "../utils/renameKeys";
import jsonExport from "jsonexport/dist";

const UnitsFilter = [
  <TextInput label="Rechercher" source="match" alwaysOn />,
  <TextInput source="code" label="resources.units.fields.code" />,
  <TextInput source="name" label="resources.units.fields.name" />,
  <ReferenceInput
    label="resources.units.fields.communities"
    source="unit_community.community_id"
    reference="communities"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ name: searchText })}
      optionText="name"
      label="resources.units.fields.communities"
    />
  </ReferenceInput>,
  <ReferenceInput
    label="resources.units.fields.main_institute"
    source="main_institute"
    reference="institutes"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ name: searchText })}
      optionText="name"
      label="resources.units.fields.main_institute"
    />
  </ReferenceInput>,
  <ReferenceInput
    label="resources.units.fields.institutes"
    source="unit_institute.institute_id"
    reference="institutes"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ name: searchText })}
      optionText="name"
      label="resources.units.fields.institutes"
    />
  </ReferenceInput>,
  <ReferenceInput
    label="resources.units.fields.section_cn"
    source="unit_section_cn.section_cn_id"
    reference="section_cn"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ name: searchText })}
      optionText="name"
      label="resources.units.fields.section_cn"
    />
  </ReferenceInput>,
  <BooleanInput
    source="active"
    label="resources.inistAccounts.fields.active"
  />,
];

const exporter = async (
  records: RaRecord[],
  fetchRelatedRecords: (
    data: any,
    field: string,
    resource: string
  ) => Promise<any>
) => {
  const listPrincipalIt = await fetchRelatedRecords(
    records,
    "main_institute",
    "institutes"
  );
  const listCommunities = await fetchRelatedRecords(
    records,
    "communities",
    "communities"
  );
  const listInstitutes = await fetchRelatedRecords(
    records,
    "institutes",
    "institutes"
  );
  const listSections = await fetchRelatedRecords(
    records,
    "sections_cn",
    "section_cn"
  );
  const dataWithRelation = records.map((record) => ({
    ...record,
    main_institute:
      listPrincipalIt[record.main_institute] &&
      listPrincipalIt[record.main_institute].name,
    communities: record.communities.map((n: number) => listCommunities[n].name),
    institutes: record.institutes.map((n: number) => listInstitutes[n].name),
    sections_cn: record.sections_cn.map((n: number) => listSections[n].name),
  }));
  const data = dataWithRelation.map((record) => renameKeys(record, "units"));
  jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
    downloadCSV(csv, "units");
  });
};

export const UrlSearchInist = (props: FieldProps) => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <Link
      to={{
        pathname: "/inistAccounts",
        search: `filter=${JSON.stringify({
          main_unit: record.id,
        })}`,
      }}
    >
      {record.nb_inist_account}
    </Link>
  );
};

export const UrlSearchJanus = (props: FieldProps) => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <Link
      to={{
        pathname: "/janusAccounts",
        search: `filter=${JSON.stringify({
          "primary_unit": record.id,
        })}`,
      }}
    >
      {record.nb_janus_account}
    </Link>
  );
};

const UnitsList = () => (
  <List
    filters={UnitsFilter}
    perPage={10}
    pagination={<CustomPagination />}
    exporter={exporter}
    bulkActionButtons={<BulkActionButtons />}
    actions={<ListActions />}
  >
    <Datagrid>
      <LinkEdit source="code" label="resources.units.fields.code" />

      <LinkEdit source="name" label="resources.units.fields.name" />

      <ReferenceField
        label="resources.units.fields.main_institute"
        source="main_institute"
        reference="institutes"
        sortBy="institute.name"
      >
        <TextField source="name" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.units.fields.institutes"
        reference="institutes"
        source="institutes"
        sortable={false}
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <UrlSearchInist label="Nombre de compte Inist" />
      <UrlSearchJanus label="Nombre de compte Janus" />

      <ReferenceArrayField
        label="resources.units.fields.communities"
        reference="communities"
        source="communities"
        sortable={false}
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <ReferenceArrayField
        label="resources.units.fields.section_cn"
        reference="section_cn"
        source="sections_cn"
        sortable={false}
      >
        <SingleFieldList>
          <ChipField source="code" />
        </SingleFieldList>
      </ReferenceArrayField>

      <BooleanField source="active" label="resources.units.fields.active" />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
);

export default UnitsList;
