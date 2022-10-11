import { BooleanInput, Create, SimpleForm, TextInput } from "react-admin";
import { ListActions } from "../components/ListActions";

const CommunitiesCreate = () => (
  <Create actions={<ListActions />} redirect="list">
    <SimpleForm>
      <TextInput
        source="name"
        label="resources.communities.fields.name"
        fullWidth
      />
      <TextInput
        source="gate"
        label="resources.communities.fields.gate"
        fullWidth
      />
      <TextInput
        source="user_id"
        label="resources.communities.fields.user_id"
        fullWidth
      />
      <TextInput
        source="password"
        label="resources.communities.fields.password"
        fullWidth
      />
      <TextInput
        source="profile"
        label="resources.communities.fields.profile"
        fullWidth
      />
      <BooleanInput source="ebsco" label="resources.communities.fields.ebsco" />
    </SimpleForm>
  </Create>
);

export default CommunitiesCreate;
