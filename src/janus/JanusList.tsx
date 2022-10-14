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
import { renameKeys } from "../utils/renameKeys";
import jsonExport from "jsonexport/dist";
import CustomPagination from "../components/CustomPagination";
import BulkActionButtons from "../components/BulkActionButtons";
import { ListActions } from "../components/Actions";
import LinkEdit from "../components/LinkEdit";

const JanusFilter = [
  <TextInput label="Rechercher" source="match" alwaysOn />,
  <TextInput
    source="like_janus_account.uid"
    label="resources.janusAccounts.fields.uid"
  />,

  <TextInput
    type="email"
    source="like_janus_account.mail"
    label="resources.janusAccounts.fields.mail"
  />,

  <ReferenceInput
    label="resources.janusAccounts.fields.primary_institute"
    source="janus_account.primary_institute"
    reference="institutes"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ "like_institute.name": searchText })}
      optionText="name"
      label="resources.janusAccounts.fields.primary_institute"
    />
  </ReferenceInput>,
  <ReferenceInput
    label="resources.janusAccounts.fields.additional_institutes"
    source="institutes.id"
    reference="institutes"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ "like_institute.name": searchText })}
      optionText="name"
      label="resources.janusAccounts.fields.additional_institutes"
    />
  </ReferenceInput>,
  <ReferenceInput
    label="resources.janusAccounts.fields.primary_unit"
    source="janus_account.primary_unit"
    reference="units"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ "like_unit.code": searchText })}
      optionText="code"
      label="resources.janusAccounts.fields.primary_unit"
    />
  </ReferenceInput>,
  <ReferenceInput
    label="resources.janusAccounts.fields.additional_units"
    source="units.id"
    reference="units"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ "like_unit.code": searchText })}
      optionText="code"
      label="resources.janusAccounts.fields.additional_units"
    />
  </ReferenceInput>,
  <ReferenceInput
    label="resources.janusAccounts.fields.communities"
    source="community.id"
    reference="communities"
  >
    <AutocompleteInput
      filterToQuery={(searchText) => ({ like_name: searchText })}
      optionText="name"
      label="resources.janusAccounts.fields.communities"
    />
  </ReferenceInput>,
  <DateInput
    source="to_janus_account.last_connexion"
    label="resources.janusAccounts.fields.last_connexion_before"
  />,

  <DateInput
    source="from_janus_account.last_connexion"
    label="resources.janusAccounts.fields.last_connexion_after"
  />,
  <DateInput
    source="to_janus_account.first_connexion"
    label="resources.janusAccounts.fields.first_connexion_before"
  />,
  <DateInput
    source="from_janus_account.first_connexion"
    label="resources.janusAccounts.fields.first_connexion_after"
  />,

  <BooleanInput
    source="janus_account.cnrs"
    label="resources.janusAccounts.fields.cnrs"
  />,
  <BooleanInput
    source="janus_account.active"
    label="resources.janusAccounts.fields.active"
  />,
];

const exporter = async (records: RaRecord[]) => {
  const data = records.map((record) => renameKeys(record, "janusAccounts"));
  jsonExport(data, { rowDelimiter: ";" }, (err, csv) => {
    downloadCSV(csv, "janusAccounts");
  });
};

const JanusList = () => (
  <List
    filters={JanusFilter}
    perPage={10}
    pagination={<CustomPagination />}
    exporter={exporter}
    bulkActionButtons={<BulkActionButtons />}
    actions={<ListActions />}
  >
    <Datagrid>
      <LinkEdit source="uid" label="resources.janusAccounts.fields.uid" />
      <LinkEdit source="mail" label="resources.janusAccounts.fields.mail" />

      <ReferenceField
        label="resources.janusAccounts.fields.primary_institute"
        source="primary_institute"
        reference="institutes"
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.janusAccounts.fields.additional_institutes"
        reference="institutes"
        source="additional_institutes"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <ReferenceField
        label="resources.janusAccounts.fields.primary_unit"
        source="primary_unit"
        reference="units"
        link="show"
      >
        <TextField source="code" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.janusAccounts.fields.all_communities"
        reference="communities"
        source="all_communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <DateField
        source="last_connexion"
        label="resources.janusAccounts.fields.last_connexion"
      />
      <DateField
        source="first_connexion"
        label="resources.janusAccounts.fields.first_connexion"
      />
      <BooleanField
        source="active"
        label="resources.janusAccounts.fields.active"
      />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
);

export default JanusList;
