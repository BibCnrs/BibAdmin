import { Create, required, SimpleForm, TextInput } from "react-admin";
import { CreateActions } from "../components/Actions";

const AdminUserCreate = () => (
  <Create actions={<CreateActions />} redirect="list">
    <SimpleForm>
      <TextInput source="username" validate={required()} />
      <TextInput source="password" validate={required()} />
      <TextInput source="comment" fullWidth />
    </SimpleForm>
  </Create>
);

export default AdminUserCreate;
