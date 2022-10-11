import { Create, SimpleForm, TextInput } from "react-admin";
import { ListActions } from "../components/ListActions";

const AdminUserCreate = () => (
  <Create actions={<ListActions />} redirect="list">
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="password" />
      <TextInput source="comment" fullWidth />
    </SimpleForm>
  </Create>
);

export default AdminUserCreate;
