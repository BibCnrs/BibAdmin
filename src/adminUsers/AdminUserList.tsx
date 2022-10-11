import {
  BulkDeleteWithConfirmButton,
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  List,
  TextField,
  TextInput,
} from "react-admin";
import CustomPagination from "../components/CustomPagination";

const AdminUserFilter = [
  <TextInput label="Rechercher" source="match" alwaysOn />,
];

const AdminUserBulkActionButtons = () => (
  <>
    <BulkDeleteWithConfirmButton mutationMode="pessimistic" />
  </>
);

const AdminUserList = () => (
  <List
    filters={AdminUserFilter}
    perPage={25}
    pagination={<CustomPagination />}
  >
    <Datagrid bulkActionButtons={<AdminUserBulkActionButtons />}>
      <TextField source="username" label="resources.adminUsers.fields.login" />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
);

export default AdminUserList;
