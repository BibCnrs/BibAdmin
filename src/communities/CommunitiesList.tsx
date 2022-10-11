import {
  BooleanField,
  BooleanInput,
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  List,
  TextField,
  TextInput,
} from "react-admin";
import BulkActionButtons from "../components/BulkActionButtons";
import CustomPagination from "../components/CustomPagination";
import LinkEdit from "../components/LinkEdit";

const CommunitiesFilter = [
  <TextInput label="Rechercher" source="match" alwaysOn />,
  <TextInput source="like_gate" label="resources.communities.fields.gate" />,
  <TextInput
    source="like_user_id"
    label="resources.communities.fields.user_id"
  />,
  <TextInput
    source="like_password"
    label="resources.communities.fields.password"
  />,
  <TextInput
    source="like_profile"
    label="resources.communities.fields.profile"
  />,
  <BooleanInput source="ebsco" label="resources.communities.fields.ebsco" />,
];

const CommunitiesList = () => (
  <List
    filters={CommunitiesFilter}
    perPage={10}
    pagination={<CustomPagination />}
    // exporter={exporter}
    bulkActionButtons={<BulkActionButtons />}
  >
    <Datagrid>
      <LinkEdit source="name" label="resources.communities.fields.name" />

      <TextField source="gate" label="resources.communities.fields.gate" />
      <TextField
        source="user_id"
        label="resources.communities.fields.user_id"
      />
      <TextField
        source="profile"
        label="resources.communities.fields.profile"
      />
      <BooleanField source="ebsco" label="resources.communities.fields.ebsco" />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
);

export default CommunitiesList;
