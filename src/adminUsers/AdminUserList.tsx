import {
  BulkDeleteWithConfirmButton,
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  List,
  TextField,
  TextInput,
} from "react-admin";
import CustomPagination from "../utils/CustomPagination";

const UsersFilter = [<TextInput label="Rechercher" source="match" alwaysOn />];

const UsersBulkActionButtons = () => (
  <>
    <BulkDeleteWithConfirmButton mutationMode="pessimistic" />
  </>
);

const AdminUserList = () => (
  <List filters={UsersFilter} perPage={25} pagination={<CustomPagination />}>
    <Datagrid bulkActionButtons={<UsersBulkActionButtons />}>
      <TextField source="username" label="resources.adminUsers.fields.login" />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
);

export default AdminUserList;
