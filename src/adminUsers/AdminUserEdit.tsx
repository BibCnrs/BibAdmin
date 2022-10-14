import {
  Edit,
  required,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";
import EditToolbar from "../components/EditToolbar";
import { EditActions } from "../components/Actions";

const AdminUserTitle = () => {
  const record = useRecordContext();
  return record ? record.username : "";
};

const AdminUserEdit = () => (
  <Edit title={<AdminUserTitle />} actions={<EditActions />}>
    <SimpleForm toolbar={<EditToolbar />} sanitizeEmptyValues>
      <TextInput source="username" validate={required()} />
      <TextInput source="password" />
      <TextInput source="comment" fullWidth />
    </SimpleForm>
  </Edit>
);

export default AdminUserEdit;
