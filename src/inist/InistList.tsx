import {
  AutocompleteInput,
  BooleanField,
  BooleanInput,
  ChipField,
  Datagrid,
  DateField,
  DateInput,
  DeleteWithConfirmButton,
  downloadCSV,
  EditButton,
  List,
  RaRecord,
  ReferenceArrayField,
  ReferenceField,
  ReferenceInput,
  SingleFieldList,
  TextField,
  TextInput,
} from "react-admin";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";
import { renameKeys } from "../utils/renameKeys";
import jsonExport from "jsonexport/dist";
import { ListActions } from "../components/Actions";

const InistFilter = [
  <TextInput label="Rechercher" source="match" alwaysOn />,
  <TextInput
    source="username"
    label="resources.inistAccounts.fields.username"
  />,
  <TextInput
    source="name"
    label="resources.inistAccounts.fields.name"
  />,
  <TextInput
    source="firstname"
    label="resources.inistAccounts.fields.firstname"
  />,
  <TextInput
    type="email"
    source="mail"
    label="resources.inistAccounts.fields.mail"
  />,
  <ReferenceInput
    label="resources.inistAccounts.fields.main_institute"
    source="main_institute"
    reference="institutes"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ name: searchText })}
      optionText="name"
      label="resources.inistAccounts.fields.main_institute"
    />
  </ReferenceInput>,
  <ReferenceInput
    label="resources.inistAccounts.fields.institutes"
    source="inist_account_institute.institute_id"
    reference="institutes"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ name: searchText })}
      optionText="name"
      label="resources.inistAccounts.fields.institutes"
    />
  </ReferenceInput>,
  <ReferenceInput
    label="resources.inistAccounts.fields.main_unit"
    source="main_unit"
    reference="units"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ code: searchText })}
      optionText="code"
      label="resources.inistAccounts.fields.main_unit"
    />
  </ReferenceInput>,
  <ReferenceInput
    label="resources.inistAccounts.fields.units"
    source="inist_account_unit.unit_id"
    reference="units"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ code: searchText })}
      optionText="code"
      label="resources.inistAccounts.fields.units"
    />
  </ReferenceInput>,
  <ReferenceInput
    label="resources.inistAccounts.fields.communities"
    source="inist_account_community.community_id"
    reference="communities"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ name: searchText })}
      optionText="name"
      label="resources.inistAccounts.fields.communities"
    />
  </ReferenceInput>,
  <DateInput
    source="subscription_date_lte"
    label="resources.inistAccounts.fields.subscription_date_before"
  />,
  <DateInput
    source="subscription_date_gte"
    label="resources.inistAccounts.fields.subscription_date_after"
  />,
  <DateInput
    source="expiration_date_lte"
    label="resources.inistAccounts.fields.expiration_date_before"
  />,
  <DateInput
    source="expiration_date_gte"
    label="resources.inistAccounts.fields.expiration_date_after"
  />,
  <DateInput
    source="last_connexion_lte"
    label="resources.inistAccounts.fields.last_connexion_before"
  />,
  <DateInput
    source="last_connexion_gte"
    label="resources.inistAccounts.fields.last_connexion_after"
  />,
  <BooleanInput
    source="active"
    label="resources.inistAccounts.fields.active"
    defaultValue={true}
  />,
];

const exporter = async (records: RaRecord[]) => {
  const data = records.map((record) => renameKeys(record, "inistAccounts"));
  jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
    downloadCSV(csv, "inistAccounts");
  });
};

const InistList = () => (
  <List
    filters={InistFilter}
    perPage={10}
    pagination={<CustomPagination />}
    exporter={exporter}
    bulkActionButtons={<BulkActionButtons />}
    actions={<ListActions />}
  >
    <Datagrid>
      <LinkEdit
        source="username"
        label="resources.inistAccounts.fields.username"
      />
      <LinkEdit
        source="password"
        label="resources.inistAccounts.fields.password"
      />

      <LinkEdit source="name" label="resources.inistAccounts.fields.name" />
      <LinkEdit
        source="firstname"
        label="resources.inistAccounts.fields.firstname"
      />
      <LinkEdit source="mail" label="resources.inistAccounts.fields.mail" />

      <ReferenceField
        label="resources.inistAccounts.fields.main_institute"
        source="main_institute"
        reference="institutes"
      >
        <TextField source="name" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.inistAccounts.fields.institutes"
        reference="institutes"
        source="institutes"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <ReferenceField
        label="resources.inistAccounts.fields.main_unit"
        source="main_unit"
        reference="units"
      >
        <TextField source="code" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.inistAccounts.fields.all_communities"
        reference="communities"
        source="communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <DateField
        source="subscription_date"
        label="resources.inistAccounts.fields.subscription_date"
      />
      <DateField
        source="expiration_date"
        label="resources.inistAccounts.fields.expiration_date"
      />
      <DateField
        source="last_connexion"
        label="resources.inistAccounts.fields.last_connexion"
      />
      <BooleanField
        source="active"
        label="resources.inistAccounts.fields.active"
      />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
);

export default InistList;
