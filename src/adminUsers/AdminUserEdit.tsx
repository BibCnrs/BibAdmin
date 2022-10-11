import {
  Edit,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useRecordContext,
} from "react-admin";
import { ListEditActions } from "../components/ListActions";

const AdminUserTitle = () => {
  const record = useRecordContext();
  return record ? record.username : "";
};

const AdminUserEditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const AdminUserEdit = () => (
  <Edit title={<AdminUserTitle />} actions={<ListEditActions />}>
    <SimpleForm toolbar={<AdminUserEditToolbar />} sanitizeEmptyValues>
      <TextInput source="username" />
      <TextInput source="password" />
      <TextInput source="comment" fullWidth />
    </SimpleForm>
  </Edit>
);

export default AdminUserEdit;
